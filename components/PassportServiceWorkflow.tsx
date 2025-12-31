import React, { useState, useRef } from 'react';
import { Language, Appointment, PassportServiceType } from '../types';
// Fixed: Removed MAURITANIA_COLORS (does not exist) and ASSETS (unused)
import { PASSPORT_CHECKLIST, saveBooking, AVAILABLE_TIME_SLOTS, isSlotFull } from '../constants';

interface PassportServiceWorkflowProps {
  language: Language;
  onComplete: () => void;
  onCancel: () => void;
}

const PassportServiceWorkflow: React.FC<PassportServiceWorkflowProps> = ({ language, onComplete, onCancel }) => {
  const isAr = language === 'ar';
  const [step, setStep] = useState(1);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: '',
    nationalNumber: '',
    phone: '',
    email: '',
    serviceType: 'renewal' as PassportServiceType,
    date: '',
    time: '',
  });
  const [loading, setLoading] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  const totalSteps = 4;

  const handleChecklistChange = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isChecklistComplete = PASSPORT_CHECKLIST.every(item => checklist[item.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (isSlotFull(formData.date, formData.time)) {
      alert(isAr ? 'عذراً، هذا الموعد لم يعد متاحاً. يرجى اختيار وقت آخر.' : 'Sorry, this slot is no longer available. Please choose another time.');
      return;
    }

    setLoading(true);
    // Simulate API bridge delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const refNumber = 'PAS-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    const newAppointment: Appointment = {
      id: refNumber,
      serviceId: 'passport',
      name: formData.name,
      passportNumber: formData.nationalNumber,
      phone: formData.phone,
      email: formData.email,
      date: formData.date,
      time: formData.time,
      status: 'pending',
      createdAt: new Date().toISOString(),
      passportServiceType: formData.serviceType
    };

    saveBooking(newAppointment);
    setBookedAppointment(newAppointment);
    setLoading(false);
    setStep(5);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        {step < 5 && (
          <div className="mb-12 flex justify-between items-center no-print">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center flex-1 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black z-10 ${
                  step >= s ? 'bg-mauritania-green text-white' : 'bg-white border-2 border-gray-200 text-gray-300'
                }`}>
                  {s}
                </div>
                <div className="absolute top-5 w-full h-0.5 bg-gray-200 -left-1/2"></div>
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {s === 1 ? (isAr ? 'الشروط' : 'Requirements') :
                   s === 2 ? (isAr ? 'البيانات' : 'Details') :
                   s === 3 ? (isAr ? 'الموعد' : 'Date') :
                   (isAr ? 'تأكيد' : 'Confirm')}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 border border-gray-100">
          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-3xl font-black text-mauritania-green mb-8">{isAr ? 'متطلبات جواز السفر' : 'Passport Requirements'}</h3>
              <div className="space-y-4 mb-10">
                {PASSPORT_CHECKLIST.map(item => (
                  <label key={item.id} className="flex items-center p-5 rounded-2xl bg-gray-50 hover:bg-mauritania-green/5 transition-colors cursor-pointer border-2 border-transparent hover:border-mauritania-green/20">
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded accent-mauritania-green ml-4 rtl:ml-4 ltr:mr-4"
                      checked={checklist[item.id] || false}
                      onChange={() => handleChecklistChange(item.id)}
                    />
                    <span className="font-bold text-gray-700">{isAr ? item.ar : item.en}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between">
                <button onClick={onCancel} className="px-8 py-4 font-black text-gray-400">{isAr ? 'إلغاء' : 'Cancel'}</button>
                <button 
                  disabled={!isChecklistComplete}
                  onClick={() => setStep(2)}
                  className="bg-mauritania-green text-white px-12 py-4 rounded-2xl font-black disabled:opacity-30 shadow-xl"
                >
                  {isAr ? 'المتابعة للبيانات' : 'Continue to Details'}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-8">
              <h3 className="text-3xl font-black text-mauritania-green mb-4">{isAr ? 'بيانات المواطن' : 'Citizen Details'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="name" placeholder={isAr ? 'الاسم بالكامل' : 'Full Name'} className="p-4 rounded-xl border-2 border-gray-100 font-bold" value={formData.name} onChange={handleInputChange} />
                <input name="nationalNumber" placeholder={isAr ? 'الرقم الوطني / رقم الجواز' : 'National ID / Passport No'} className="p-4 rounded-xl border-2 border-gray-100 font-bold" value={formData.nationalNumber} onChange={handleInputChange} />
                <input name="phone" placeholder={isAr ? 'رقم الجوال' : 'Phone Number'} className="p-4 rounded-xl border-2 border-gray-100 font-bold" value={formData.phone} onChange={handleInputChange} />
                <input name="email" placeholder={isAr ? 'البريد الإلكتروني' : 'Email'} className="p-4 rounded-xl border-2 border-gray-100 font-bold" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="flex justify-between mt-10">
                <button onClick={() => setStep(1)} className="px-8 py-4 font-black text-gray-400">{isAr ? 'السابق' : 'Back'}</button>
                <button onClick={() => setStep(3)} className="bg-mauritania-green text-white px-12 py-4 rounded-2xl font-black shadow-xl">{isAr ? 'اختيار الموعد' : 'Choose Date'}</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in space-y-8">
              <h3 className="text-3xl font-black text-mauritania-green mb-4">{isAr ? 'حجز موعد المراجعة' : 'Booking Visit Slot'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black mb-2 uppercase">{isAr ? 'التاريخ' : 'Date'}</label>
                  <input name="date" type="date" className="w-full p-4 rounded-xl border-2 border-gray-100 font-bold" value={formData.date} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-xs font-black mb-2 uppercase">{isAr ? 'الوقت (كل 30 دقيقة)' : 'Time (30 min intervals)'}</label>
                  <select name="time" className="w-full p-4 rounded-xl border-2 border-gray-100 font-bold" value={formData.time} onChange={handleInputChange}>
                    <option value="">{isAr ? 'اختر الوقت...' : 'Select time...'}</option>
                    {AVAILABLE_TIME_SLOTS.map(slot => {
                      const full = formData.date ? isSlotFull(formData.date, slot) : false;
                      return <option key={slot} value={slot} disabled={full}>{slot} {full ? (isAr ? '(غير متاح)' : '(Unavailable)') : ''}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-10">
                <button onClick={() => setStep(2)} className="px-8 py-4 font-black text-gray-400">{isAr ? 'السابق' : 'Back'}</button>
                <button onClick={() => setStep(4)} className="bg-mauritania-green text-white px-12 py-4 rounded-2xl font-black shadow-xl">{isAr ? 'مراجعة الطلب' : 'Review'}</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-in space-y-8">
              <h3 className="text-3xl font-black text-mauritania-green mb-4">{isAr ? 'مراجعة وتأكيد الطلب' : 'Review & Confirm'}</h3>
              <div className="bg-gray-50 p-8 rounded-3xl space-y-4">
                <div className="flex justify-between border-b pb-4"><span className="font-bold opacity-50">{isAr ? 'الاسم' : 'Name'}:</span><span className="font-black">{formData.name}</span></div>
                <div className="flex justify-between border-b pb-4"><span className="font-bold opacity-50">{isAr ? 'الموعد' : 'Slot'}:</span><span className="font-black text-mauritania-green">{formData.date} | {formData.time}</span></div>
              </div>
              <button 
                disabled={loading}
                onClick={handleSubmit} 
                className="w-full bg-mauritania-green text-white py-6 rounded-3xl font-black text-2xl shadow-2xl disabled:opacity-50"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : (isAr ? 'تأكيد الحجز النهائي' : 'Final Confirmation')}
              </button>
            </div>
          )}

          {step === 5 && bookedAppointment && (
            <div className="animate-fade-in text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner">
                <i className="fas fa-check"></i>
              </div>
              <h3 className="text-3xl font-black mb-8">{isAr ? 'تم حجز موعد الجوازات بنجاح' : 'Passport Slot Confirmed!'}</h3>
              <button onClick={onComplete} className="bg-mauritania-charcoal text-white px-12 py-4 rounded-2xl font-black shadow-xl">
                {isAr ? 'العودة للرئيسية' : 'Back to Portal'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassportServiceWorkflow;