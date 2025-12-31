
import React from 'react';
import { Appointment, Language } from '../types';
import { ASSETS, CONSULAR_SERVICES } from '../constants';

interface CardProps {
  appointment: Appointment;
  language: Language;
}

const DigitalAppointmentCard: React.FC<CardProps> = ({ appointment, language }) => {
  const isAr = language === 'ar';
  
  const getServiceName = (id: string) => {
    const s = CONSULAR_SERVICES.find(x => x.id === id);
    return isAr ? s?.titleAr : s?.titleEn;
  };

  // Professional Dynamic QR with Custom Mauritanian styling
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`APP-ID:${appointment.id}|NAME:${appointment.name}|SERVICE:${appointment.serviceId}`)}&bgcolor=FFFFFF&color=006233&margin=15&format=png`;

  return (
    <div className="animate-fade-in flex flex-col items-center">
      <div className="w-[450px] bg-white rounded-[4rem] shadow-[0_60px_150px_rgba(0,0,0,0.25)] border-[12px] border-slate-50 overflow-hidden relative no-print transform hover:scale-[1.02] transition-transform duration-500">
        
        {/* Elite Security Header */}
        <div className="bg-mauritania-green p-10 text-center text-white relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24 blur-2xl"></div>
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white rounded-[2rem] p-3 mx-auto mb-6 border-4 border-mauritania-gold shadow-2xl flex items-center justify-center rotate-3 transform hover:rotate-0 transition-transform">
               <img src={ASSETS.seal} alt="RIM" className="w-16 h-16 object-contain" />
            </div>
            <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">
              {isAr ? 'البطاقة القنصلية الرقمية الموحدة' : 'Unified Digital Consular Card'}
            </h4>
            <div className="flex items-center justify-center gap-3">
               <div className="w-2 h-2 bg-mauritania-gold rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black text-mauritania-gold uppercase tracking-[0.5em]">{isAr ? 'وثيقة أمنية معتمدة' : 'Official Security Clearance'}</span>
            </div>
          </div>
        </div>

        {/* Card Body with Detailed Info */}
        <div className="p-12">
          <div className="flex justify-between items-start mb-12 border-b-2 border-slate-50 pb-10">
            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{isAr ? 'حامل الوثيقة' : 'Document Holder'}</p>
              <p className="text-3xl font-black text-slate-800 leading-none tracking-tight mb-2">{appointment.name}</p>
              <p className="text-sm font-bold text-mauritania-green">{appointment.passportNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{isAr ? 'رقم المرجع' : 'REF NUMBER'}</p>
              <p className="text-2xl font-mono font-black text-slate-900 tracking-tighter bg-slate-100 px-4 py-1 rounded-xl shadow-inner">#{appointment.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mb-14">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{isAr ? 'نوع الخدمة' : 'Service'}</p>
                <p className="text-md font-black text-slate-700">{getServiceName(appointment.serviceId)}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{isAr ? 'توقيت الحجز' : 'Scheduled'}</p>
                <div className="flex flex-col gap-1">
                   <p className="text-md font-black text-mauritania-green">{appointment.date}</p>
                   <p className="text-sm font-bold text-slate-400">{appointment.time}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center">
               <div className="p-4 bg-white rounded-[2.5rem] border-4 border-slate-50 shadow-2xl relative group overflow-hidden">
                  <div className="absolute inset-0 bg-mauritania-green/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img src={qrUrl} alt="QR Code" className="w-32 h-32 mix-blend-multiply relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
               </div>
               <p className="mt-3 text-[8px] font-black text-slate-300 uppercase tracking-widest">{isAr ? 'امسح للتحقق' : 'Scan to Verify'}</p>
            </div>
          </div>

          <div className="bg-mauritania-charcoal/5 rounded-[2.5rem] p-8 border-2 border-slate-100 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-mauritania-green/5 rounded-full translate-x-12 -translate-y-12"></div>
             <div className="flex items-start gap-5 relative z-10">
                <div className="w-12 h-12 bg-mauritania-green text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shrink-0">
                  <i className="fas fa-fingerprint"></i>
                </div>
                <div>
                   <p className="text-[10px] font-black text-mauritania-charcoal/80 leading-relaxed uppercase tracking-tight">
                    {isAr 
                      ? 'هذه البطاقة مرتبطة بنظامنا القنصلي المركزي. يرجى إبرازها عند مدخل القنصلية في جدة لتأكيد هويتك.' 
                      : 'This card is synchronized with our Central Consular System. Present it at the entrance in Jeddah for identity confirmation.'}
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-slate-50 py-4 text-center border-t border-slate-100">
           <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.4em]">Official Republic of Mauritania Consular Document</p>
        </div>
      </div>

      <div className="mt-14 flex gap-8 no-print">
        <button 
          onClick={() => window.print()} 
          className="group bg-slate-900 text-white px-12 py-6 rounded-[2rem] font-black text-xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-5 border border-white/10"
        >
          <i className="fas fa-print group-hover:animate-bounce"></i>
          {isAr ? 'طباعة الوثيقة الرسمية' : 'Print Official Doc'}
        </button>
        <button 
           onClick={() => {
             const text = encodeURIComponent(`Consular Appointment Secured: ${appointment.id} | ${appointment.date} @ ${appointment.time}. Please check my digital card for verification.`);
             window.open(`https://wa.me/?text=${text}`, '_blank');
           }}
           className="bg-[#25D366] text-white px-12 py-6 rounded-[2rem] font-black text-xl shadow-[0_25px_60px_rgba(37,211,102,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-5 border border-white/10"
        >
          <i className="fab fa-whatsapp"></i>
          {isAr ? 'مشاركة عبر واتساب' : 'Share to WhatsApp'}
        </button>
      </div>
    </div>
  );
};

export default DigitalAppointmentCard;
