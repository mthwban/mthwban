
import React from 'react';
import { Language } from '../types';
import { ASSETS } from '../constants';
import { MauritaniaSealSVG } from './Header';

interface HeroProps {
  language: Language;
  onBookClick: () => void;
  onTrackClick: () => void;
  onAboutClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ language, onBookClick, onTrackClick, onAboutClick }) => {
  const isAr = language === 'ar';

  return (
    <div className="relative min-h-[90vh] flex items-center bg-mauritania-deep overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-mauritania-charcoal via-mauritania-deep/90 to-transparent z-10"></div>
        <img 
          src={ASSETS.heroBg} 
          alt="Consulate Background" 
          className="w-full h-full object-cover opacity-30 scale-105"
          loading="lazy"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 text-center md:text-right rtl:md:text-right ltr:md:text-left">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-mauritania-gold text-mauritania-charcoal text-[10px] font-black mb-8 shadow-xl uppercase tracking-widest">
              <i className="fas fa-landmark"></i>
              {isAr ? 'البوابة القنصلية الرسمية' : 'Official Consular Gateway'}
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1] drop-shadow-2xl tracking-tighter">
              {isAr ? 'نحو خدمات' : 'Towards Future'}
              <br />
              <span className="text-mauritania-gold">{isAr ? 'دبلوماسية ذكية' : 'Digital Excellence'}</span>
            </h2>
            
            <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-bold">
              {isAr 
                ? 'مرحباً بكم في الموقع الرسمي للقنصلية الموريتانية بجدة. نلتزم بتقديم أرقى الخدمات الرقمية للجالية الموريتانية.' 
                : 'Welcome to the official portal of the Mauritanian Consulate in Jeddah. We are committed to providing premium digital services.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start rtl:md:justify-start">
              <button 
                onClick={onBookClick}
                className="group bg-mauritania-green text-white px-10 py-6 rounded-[2rem] font-black text-xl shadow-[0_20px_60px_rgba(0,98,51,0.4)] hover:bg-green-800 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 border border-white/10"
              >
                <span>{isAr ? 'حجز موعد إلكتروني' : 'Book Appointment'}</span>
                <i className="fas fa-calendar-check text-mauritania-gold"></i>
              </button>
              <button 
                onClick={onAboutClick}
                className="group bg-white/5 backdrop-blur-xl text-white px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-4 border border-white/10"
              >
                <span>{isAr ? 'عن القنصلية' : 'About Us'}</span>
                <i className="fas fa-info-circle text-mauritania-gold"></i>
              </button>
              <button 
                onClick={onTrackClick}
                className="group bg-white/5 backdrop-blur-xl text-white px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-4 border border-white/10"
              >
                <span>{isAr ? 'تتبع الطلب' : 'Track Request'}</span>
                <i className="fas fa-search text-mauritania-gold"></i>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 justify-center relative">
            <div className="absolute inset-0 bg-mauritania-gold/10 blur-[150px] rounded-full"></div>
            <div className="relative z-10 p-6 rounded-[5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl flex items-center justify-center">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-[4.5rem] bg-white p-14 flex items-center justify-center shadow-inner border-8 border-mauritania-gold/10">
                 <MauritaniaSealSVG className="w-full h-full transform hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
