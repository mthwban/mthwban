
import React from 'react';
import { Language } from '../types';

const LocationMap: React.FC<{ language: Language }> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-mauritania-charcoal">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-10">
        <div className="flex-1 text-right rtl:text-right ltr:text-left">
          <h3 className="text-4xl font-black text-white mb-4">
            {isAr ? 'موقع القنصلية في جدة' : 'Consulate Location in Jeddah'}
          </h3>
          <div className="w-24 h-2 bg-mauritania-gold rounded-full mb-8"></div>
          <p className="text-gray-400 font-bold text-lg mb-8 leading-relaxed">
            {isAr 
              ? 'تقع القنصلية العامة للجمهورية الإسلامية الموريتانية في أرقى أحياء مدينة جدة لتسهيل الوصول لجميع مراجعينا.' 
              : 'The Consulate General of Mauritania is located in a prime district of Jeddah for easy access to all visitors.'}
          </p>
          <div className="space-y-4">
             <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-xl bg-mauritania-green flex items-center justify-center text-mauritania-gold">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <span className="font-bold">{isAr ? 'حي الروضة، شارع الأمير فيصل بن فهد' : 'Al Rawdah District, Prince Faisal St'}</span>
             </div>
             <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-xl bg-mauritania-green flex items-center justify-center text-mauritania-gold">
                  <i className="fas fa-clock"></i>
                </div>
                <span className="font-bold">{isAr ? 'من الأحد إلى الخميس: 9 صباحاً - 2 ظهراً' : 'Sun to Thu: 9 AM - 2 PM'}</span>
             </div>
          </div>
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-10 px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-white border border-white/10 transition-all active:scale-95"
          >
            <i className="fas fa-external-link-alt text-mauritania-gold"></i>
            {isAr ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
          </a>
        </div>
        
        <div className="flex-1 w-full h-[400px] bg-white/5 rounded-[3rem] overflow-hidden border border-white/10 relative shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center bg-mauritania-deep/40 backdrop-blur-sm z-10 pointer-events-none">
             <div className="text-center">
                <i className="fas fa-map-marker-alt text-6xl text-mauritania-gold mb-4 animate-bounce"></i>
                <p className="font-black text-white text-xl tracking-widest">{isAr ? 'حي الروضة - جدة' : 'Al Rawdah - Jeddah'}</p>
             </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1474&auto=format&fit=crop" 
            alt="Map Mock" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
