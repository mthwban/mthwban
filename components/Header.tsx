import React from 'react';
import { Language } from '../types';

export const MauritaniaSealSVG: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`${className} flex items-center justify-center overflow-hidden`}>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
      <circle cx="50" cy="50" r="48" fill="#d21628" stroke="#FFD700" strokeWidth="2" />
      <circle cx="50" cy="50" r="40" fill="#006233" stroke="#FFD700" strokeWidth="1.5" />
      <g fill="#FFD700">
        <path d="M50 75c-14.4 0-26-11.6-26-26 0-2.3.3-3.9.8-5.4 4 8.4 11.6 14.4 25.2 14.4s21.2-6 25.2-14.4c.5 1.5.8 3.1.8 5.4 0 14.4-11.6 26-26 26z" />
        <path d="M50 25l2.5 7.5h7.5l-6 4.5 2 7.5-6-4.5-6 4.5 2-7.5-6-4.5h7.5z" />
      </g>
    </svg>
  </div>
);

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, onToggleLanguage }) => {
  const isAr = language === 'ar';
  
  return (
    <header className="sticky top-0 z-50 bg-mauritania-charcoal/80 backdrop-blur-xl border-b border-white/5 no-print">
      <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-mauritania-red"></div>
        <div className="flex-1 bg-mauritania-gold"></div>
        <div className="flex-1 bg-mauritania-green"></div>
        <div className="flex-1 bg-mauritania-gold"></div>
        <div className="flex-1 bg-mauritania-red"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-32">
          
          <div className="flex items-center gap-4 ltr:order-1 rtl:order-3">
             <div className="h-12 w-12 md:h-16 md:w-16 flex items-center justify-center bg-white rounded-2xl border border-white/10 shadow-inner overflow-hidden">
               <i className="fas fa-landmark text-mauritania-green text-2xl md:text-3xl"></i>
            </div>
            <button
              onClick={onToggleLanguage}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-mauritania-gold/30 text-mauritania-gold font-bold text-xs hover:bg-mauritania-gold hover:text-mauritania-charcoal transition-all shadow-lg"
            >
              <i className="fas fa-globe"></i>
              <span>{isAr ? 'English' : 'عربي'}</span>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 ltr:order-2 rtl:order-2">
            <h1 className="text-sm md:text-2xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-md">
              {isAr ? 'القنصلية العامة للجمهورية الإسلامية الموريتانية' : 'Consulate General of Mauritania'}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] md:text-xs font-black text-mauritania-charcoal bg-mauritania-gold px-4 py-1 rounded-full shadow-lg">
                {isAr ? 'جدة - المملكة العربية السعودية' : 'Jeddah - Saudi Arabia'}
              </span>
            </div>
          </div>

          <div className="flex items-center ltr:order-3 rtl:order-1 relative">
            {/* Celebratory Floating Icons */}
            <i className="fas fa-star absolute -top-4 -right-2 text-mauritania-gold text-lg animate-bounce delay-100"></i>
            <i className="fas fa-moon absolute -bottom-4 -left-2 text-mauritania-gold text-lg animate-bounce rotate-45"></i>
            
            <div className="relative p-1 bg-white rounded-full shadow-2xl flex items-center justify-center h-16 w-16 md:h-28 md:w-28 logo-glow overflow-hidden z-10">
              <MauritaniaSealSVG className="h-full w-full p-2" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;