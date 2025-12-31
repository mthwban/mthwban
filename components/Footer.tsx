
import React from 'react';
import { Language } from '../types';
import { ASSETS } from '../constants';
import { MauritaniaSealSVG } from './Header';

interface FooterProps {
  language: Language;
  onAdminClick?: () => void;
  onAboutClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ language, onAdminClick, onAboutClick }) => {
  const isAr = language === 'ar';

  return (
    <footer className="bg-mauritania-deep text-white pt-24 pb-12 border-t-8 border-mauritania-gold relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mauritania-gold/5 rounded-full translate-y-32 translate-x-32 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-8 mb-10">
              <div className="p-3 bg-white rounded-full shadow-2xl h-28 w-28 flex items-center justify-center border-4 border-mauritania-gold">
                <MauritaniaSealSVG className="h-full w-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-3xl text-white tracking-tighter">
                  {isAr ? 'القنصلية الموريتانية' : 'Mauritanian Consulate'}
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-mauritania-gold text-xs font-black tracking-widest uppercase">
                    {isAr ? 'جدة' : 'Jeddah'}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-mauritania-red"></div>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                    {isAr ? 'البوابة الرقمية' : 'Digital Portal'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-lg font-medium text-lg">
              {isAr 
                ? 'الممثلية الدبلوماسية الرسمية للجمهورية الإسلامية الموريتانية بجدة. نعمل على تقديم أرقى الخدمات القنصلية لمواطنينا في المملكة العربية السعودية.' 
                : 'The official diplomatic mission of Mauritania in Jeddah. We work on providing the highest consular services to our citizens in the Kingdom of Saudi Arabia.'}
            </p>
          </div>

          <div>
            <h4 className="text-white font-black mb-10 text-xl border-b-4 border-mauritania-red pb-4 inline-block">
              {isAr ? 'روابط سريعة' : 'Quick Access'}
            </h4>
            <ul className="space-y-5 text-gray-400 font-bold">
              <li><a href="/" className="hover:text-mauritania-gold transition-colors flex items-center gap-3 group">
                <i className="fas fa-chevron-left rtl:hidden group-hover:translate-x-1 transition-transform"></i>
                <i className="fas fa-chevron-right ltr:hidden group-hover:-translate-x-1 transition-transform"></i>
                {isAr ? 'الرئيسية' : 'Home'}
              </a></li>
              <li><button onClick={onAdminClick} className="hover:text-mauritania-gold transition-colors flex items-center gap-3 group">
                <i className="fas fa-user-shield text-xs opacity-50"></i>
                {isAr ? 'بوابة الموظفين' : 'Staff Portal'}
              </button></li>
              <li><button onClick={onAboutClick} className="hover:text-mauritania-gold transition-colors flex items-center gap-3 group">
                <i className="fas fa-info-circle text-xs opacity-50"></i>
                {isAr ? 'عن القنصلية' : 'About Us'}
              </button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-10 text-xl border-b-4 border-mauritania-gold pb-4 inline-block">
              {isAr ? 'معلومات التواصل' : 'Contact'}
            </h4>
            <ul className="space-y-8 text-gray-400 font-medium">
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-mauritania-gold border border-white/10 text-xl">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <span className="text-sm pt-1 leading-relaxed">{isAr ? 'حي الروضة، شارع الأمير فيصل بن فهد، جدة' : 'Al-Rawdah Dist, Prince Faisal St, Jeddah'}</span>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-mauritania-gold border border-white/10 text-xl">
                  <i className="fas fa-phone"></i>
                </div>
                <span dir="ltr" className="text-lg text-white font-black">+966 12 660 0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6">
             <img src={ASSETS.flag} alt="Flag" className="h-8 rounded shadow-lg" />
             <p className="text-gray-500 text-sm font-bold tracking-tight">
              © {new Date().getFullYear()} {isAr ? 'القنصلية الموريتانية بجدة - جميع الحقوق محفوظة' : 'Mauritanian Consulate Jeddah - All Rights Reserved'}
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-mauritania-gold hover:text-mauritania-charcoal transition-all border border-white/10 shadow-xl"><i className="fab fa-twitter text-xl"></i></a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-mauritania-green hover:text-white transition-all border border-white/10 shadow-xl"><i className="fab fa-facebook-f text-xl"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
