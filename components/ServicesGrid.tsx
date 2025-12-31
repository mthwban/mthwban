
import React from 'react';
import { CONSULAR_SERVICES } from '../constants';
import { Language } from '../types';

interface ServicesGridProps {
  language: Language;
  onStartService: (serviceId: string) => void;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ language, onStartService }) => {
  const isAr = language === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-mauritania-charcoal">
      <div className="text-center mb-20">
        <h3 className="text-4xl font-black text-white mb-6">
          {isAr ? 'الخدمات القنصلية الإلكترونية' : 'Digital Consular Services'}
        </h3>
        <div className="w-32 h-2 bg-mauritania-gold mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {CONSULAR_SERVICES.map((service) => (
          <div 
            key={service.id}
            onClick={() => onStartService(service.id)}
            className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 transform hover:-translate-y-3 cursor-pointer overflow-hidden hover:border-mauritania-gold/50 hover:bg-white/10"
          >
            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl text-2xl transition-all shadow-xl bg-mauritania-green text-mauritania-gold border border-white/10 group-hover:scale-110">
              <i className={`fas ${service.icon}`}></i>
            </div>

            <h4 className="text-xl font-black mb-4 text-white group-hover:text-mauritania-gold transition-colors">
              {isAr ? service.titleAr : service.titleEn}
            </h4>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">
              {isAr 
                ? 'خدمة إلكترونية متكاملة تهدف لتسهيل الإجراءات وتقليل وقت الانتظار للمواطنين.' 
                : 'A complete digital service aimed at streamlining procedures and reducing wait times for citizens.'}
            </p>

            <button 
              className={`font-black text-xs flex items-center group-hover:translate-x-2 transition-all rtl:group-hover:-translate-x-2 text-mauritania-gold opacity-0 group-hover:opacity-100`}
            >
              {isAr ? 'ابدأ الخدمة' : 'Start Service'}
              <i className={`fas ${isAr ? 'fa-arrow-left mr-3' : 'fa-arrow-right ml-3'}`}></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
