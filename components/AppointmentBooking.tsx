
import React, { useState, useEffect } from 'react';
import { Language, Appointment } from '../types';
import { CONSULAR_SERVICES, saveBooking, AVAILABLE_TIME_SLOTS, isSlotFull, getStoredBookings, processImage } from '../constants';
import DigitalAppointmentCard from './DigitalAppointmentCard';
import { GoogleGenAI, Type } from "@google/genai";

interface AppointmentBookingProps {
  language: Language;
}

const SecurityScanOverlay: React.FC = () => (
  <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-10 animate-fade-in">
    <div className="relative w-64 h-80 border-2 border-mauritania-gold/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.2)]">
      <div className="absolute top-0 left-0 w-full h-1 bg-mauritania-gold shadow-[0_0_15px_#FFD700] animate-scan-line"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-mauritania-green/20 to-transparent"></div>
    </div>
    <div className="mt-8 text-center">
      <h4 className="text-white font-black text-xl mb-2 animate-pulse uppercase tracking-widest">
        Security Scanning...
      </h4>
      <p className="text-mauritania-gold text-[10px] font-bold uppercase tracking-[0.3em]">AI Document Analysis in Progress</p>
    </div>
    <style>{`
      @keyframes scan-line {
        0% { top: 0; }
        100% { top: 100%; }
      }
      .animate-scan-line {
        animation: scan-line 2s ease-in-out infinite alternate;
      }
    `}</style>
  </div>
);

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [loading, setLoading] = useState(false);
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [bookedData, setBookedData] = useState<Appointment | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [suggestedSlots, setSuggestedSlots] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    passportNumber: '',
    phone: '',
    email: '',
    service: 'passport'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'time') setSelectedTime(value);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Phase 3 Enhancement: Immediate processing with compression
    setIsOcrLoading(true);
    try {
      // Process & Resize Image immediately for Preview and OCR
      const optimizedBase64 = await processImage(file);
      setPassportPreview(optimizedBase64);
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Structured OCR responseSchema implementation following GenAI guidelines
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { text: "Extract the full name and passport/ID number from this document image." },
            { inlineData: { mimeType: 'image/webp', data: optimizedBase64.split(',')[1] } }
          ]
        },
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: "The full name of the citizen extracted from the ID document."
              },
              passportNumber: {
                type: Type.STRING,
                description: "The unique identifier or passport number from the document."
              }
            },
            required: ["name", "passportNumber"]
          }
        }
      });

      const text = response.text;
      if (text) {
        const extracted = JSON.parse(text);
        setFormData(prev => ({
          ...prev,
          name: extracted.name || prev.name,
          passportNumber: extracted.passportNumber || prev.passportNumber
        }));
      }
    } catch (err) {
      console.error("OCR/Upload Error:", err);
    } finally {
      setTimeout(() => setIsOcrLoading(false), 2000);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      const nextAvailable = AVAILABLE_TIME_SLOTS.filter(slot => !isSlotFull(selectedDate, slot)).slice(0, 3);
      setSuggestedSlots(nextAvailable);
    }
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (isSlotFull(selectedDate, selectedTime)) {
      alert(isAr ? 'عذراً، هذا الموعد ممتلئ.' : 'Sorry, this slot is full.');
      setLoading(false);
      return;
    }

    const refNumber = 'RIM-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const newAppointment: Appointment = {
      id: refNumber,
      ...formData,
      passportPhoto: passportPreview || undefined,
      serviceId: formData.service,
      date: selectedDate,
      time: selectedTime,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    saveBooking(newAppointment);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setSyncing(false);
    setBookedData(newAppointment);
  };

  if (syncing) {
    return (
      <div className="max-w-4xl mx-auto text-center py-24 px-6 animate-pulse">
        <div className="w-24 h-24 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-10 text-5xl shadow-[0_0_30px_rgba(37,211,102,0.3)]">
          <i className="fab fa-whatsapp"></i>
        </div>
        <h3 className="text-3xl font-black text-gray-900 mb-4">
          {isAr ? 'جاري ربط الموعد بالواتساب...' : 'Syncing with WhatsApp...'}
        </h3>
        <p className="text-gray-500 font-bold">{isAr ? 'يرجى الانتظار قليلاً لتأكيد وصول الإشعار الرقمي' : 'Please wait while we secure your digital notification'}</p>
      </div>
    );
  }

  if (bookedData) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16 px-6 animate-fade-in flex flex-col items-center">
        <DigitalAppointmentCard appointment={bookedData} language={language} />
        <button 
          onClick={() => { setBookedData(null); setPassportPreview(null); }}
          className="mt-16 bg-white border-2 border-gray-100 text-gray-500 px-12 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all no-print"
        >
          {isAr ? 'تقديم طلب جديد' : 'Submit Another Request'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-[3.5rem] p-10 md:p-20 shadow-[0_40px_120px_rgba(0,0,0,0.06)] border border-gray-100 relative overflow-hidden">
        {isOcrLoading && <SecurityScanOverlay />}
        <div className="absolute top-0 right-0 left-0 h-4 bg-gradient-to-r from-mauritania-red via-mauritania-gold to-mauritania-green rounded-t-[3.5rem]"></div>
        
        <div className="mb-16 text-center">
          <h3 className="text-5xl font-black text-mauritania-green mb-6">
            {isAr ? 'بوابة المواعيد الرقمية' : 'Digital Booking Portal'}
          </h3>
          <p className="text-gray-400 font-bold max-w-xl mx-auto text-lg leading-relaxed">
            {isAr 
              ? 'نظام الجدولة القنصلي الموحد لضمان سرعة الإنجاز وخدمة المواطنين بأعلى معايير الكفاءة.' 
              : 'Unified consular scheduling system ensuring swift processing and high-efficiency service.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { name: 'name', labelAr: 'الاسم الكامل', labelEn: 'Full Name', type: 'text', icon: 'fa-user' },
            { name: 'passportNumber', labelAr: 'رقم الجواز', labelEn: 'Passport No', type: 'text', icon: 'fa-id-badge' },
            { name: 'phone', labelAr: 'رقم الجوال', labelEn: 'Mobile', type: 'tel', icon: 'fa-phone' },
            { name: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email', type: 'email', icon: 'fa-envelope' }
          ].map((field) => (
            <div key={field.name} className="group">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-mauritania-green transition-colors">
                {isAr ? field.labelAr : field.labelEn}
              </label>
              <div className="relative">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-mauritania-green transition-colors">
                   <i className={`fas ${field.icon}`}></i>
                 </div>
                 <input 
                    name={field.name}
                    required
                    type={field.type} 
                    value={(formData as any)[field.name]}
                    onChange={handleInputChange}
                    className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] border-2 border-gray-100 focus:border-mauritania-green focus:bg-white bg-gray-50/50 outline-none transition-all font-black text-gray-800 shadow-inner"
                  />
              </div>
            </div>
          ))}

          <div className="space-y-3">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{isAr ? 'تاريخ الزيارة' : 'Visit Date'}</label>
            <input name="date" required type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-6 py-5 rounded-[1.5rem] border-2 border-gray-100 font-black text-mauritania-green bg-gray-50 shadow-inner outline-none focus:border-mauritania-green" />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{isAr ? 'الوقت المتاح' : 'Slot'}</label>
            <select name="time" value={selectedTime} onChange={handleInputChange} required className="w-full px-6 py-5 rounded-[1.5rem] border-2 border-gray-100 font-black bg-gray-50 shadow-inner outline-none focus:border-mauritania-green">
              <option value="">{isAr ? 'اختر الوقت...' : 'Select time...'}</option>
              {AVAILABLE_TIME_SLOTS.map(slot => (
                <option key={slot} value={slot} disabled={selectedDate ? isSlotFull(selectedDate, slot) : false}>
                  {slot} {selectedDate && isSlotFull(selectedDate, slot) ? (isAr ? '(مكتمل)' : '(Full)') : ''}
                </option>
              ))}
            </select>
            
            {/* Phase 3: Smart Slot Suggestions */}
            {selectedDate && isSlotFull(selectedDate, selectedTime) && suggestedSlots.length > 0 && (
              <div className="mt-3 animate-fade-in">
                <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-2">{isAr ? 'مواعيد بديلة مقترحة:' : 'Suggested Alternative Slots:'}</p>
                <div className="flex gap-2">
                  {suggestedSlots.map(s => (
                    <button key={s} type="button" onClick={() => setSelectedTime(s)} className="px-3 py-1 bg-mauritania-green/5 border border-mauritania-green/20 rounded-lg text-xs font-black text-mauritania-green hover:bg-mauritania-green hover:text-white transition-all">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2 space-y-4">
             <div className="flex justify-between items-end">
               <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{isAr ? 'صورة الجواز / الهوية (تعبئة تلقائية ذكية)' : 'ID/Passport Scan (Smart Auto-fill)'}</label>
               {isOcrLoading && <span className="text-[10px] font-black text-mauritania-gold animate-pulse mb-3 uppercase tracking-widest">AI Vision Active</span>}
             </div>
             <div className="flex items-center gap-6">
               <label className="flex-grow flex flex-col items-center justify-center border-4 border-dashed border-gray-100 rounded-[2rem] p-10 cursor-pointer hover:border-mauritania-green/30 hover:bg-mauritania-green/5 transition-all">
                 <i className="fas fa-magic text-4xl text-mauritania-gold mb-4"></i>
                 <span className="font-bold text-gray-500">{isAr ? 'ارفع صورة الجواز للتعبئة التلقائية' : 'Upload Passport for Auto-fill'}</span>
                 <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
               </label>
               {passportPreview && (
                 <div className="w-48 h-48 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center group relative">
                    <img src={passportPreview} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <i className="fas fa-eye text-white text-3xl"></i>
                    </div>
                 </div>
               )}
             </div>
          </div>

          <div className="md:col-span-2 pt-10">
            <button 
              disabled={loading || isOcrLoading}
              type="submit"
              className="w-full bg-mauritania-green text-white py-8 rounded-[2rem] font-black text-2xl shadow-[0_25px_60px_rgba(0,98,51,0.4)] hover:bg-green-800 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 border border-white/10"
            >
              {loading ? <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : (isAr ? 'حجز موعد رسمي ومؤمن' : 'Secure Official Booking')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBooking;
