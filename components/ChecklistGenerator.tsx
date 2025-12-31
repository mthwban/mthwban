
import React, { useState } from 'react';
import { Language } from '../types';
import { CONSULAR_SERVICES, SERVICE_REQUIREMENTS } from '../constants';

// Converting to named export to resolve the "no default export" error in App.tsx
export const ChecklistGenerator: React.FC<{ language: Language }> = ({ language }) => {
  const isAr = language === 'ar';
  const [selectedService, setSelectedService] = useState<string>('passport');

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 bg-white rounded-[3rem] shadow-2xl border border-gray-100 animate-fade-in">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-black text-mauritania-green mb-4">
          {isAr ? 'أداة التحقق من المستندات' : 'Document Checklist Tool'}
        </h3>
        <p className="text-gray-500 font-bold">
          {isAr ? 'اختر الخدمة لمعرفة المتطلبات الرسمية فوراً' : 'Select a service to see official requirements instantly'}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {CONSULAR_SERVICES.filter(s => s.isAvailable).map(service => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`px-8 py-4 rounded-2xl font-black text-sm transition-all ${
              selectedService === service.id 
                ? 'bg-mauritania-green text-white shadow-xl scale-105' 
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
            }`}
          >
            {isAr ? service.titleAr : service.titleEn}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICE_REQUIREMENTS[selectedService]?.[isAr ? 'ar' : 'en'].map((req, idx) => (
          <div key={idx} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-mauritania-gold/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center text-mauritania-green group-hover:bg-mauritania-gold transition-colors">
              <i className="fas fa-file-alt"></i>
            </div>
            <span className="font-bold text-gray-700">{req}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-mauritania-gold/10 rounded-2xl border border-mauritania-gold/20 flex items-center gap-4">
        <i className="fas fa-info-circle text-mauritania-gold text-xl"></i>
        <p className="text-xs font-black text-mauritania-charcoal/70 uppercase tracking-tight">
          {isAr ? 'ملاحظة: المتطلبات قد تتغير بناءً على الحالة الفردية للطلب.' : 'Note: Requirements may vary based on individual case status.'}
        </p>
      </div>
    </div>
  );
};
