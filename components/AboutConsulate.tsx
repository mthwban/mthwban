
import React from 'react';
import { Language } from '../types';
import { ASSETS } from '../constants';
import { MauritaniaSealSVG } from './Header';

interface AboutConsulateProps {
  language: Language;
  onBack: () => void;
}

const AboutConsulate: React.FC<AboutConsulateProps> = ({ language, onBack }) => {
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen bg-white text-gray-900 animate-fade-in font-sans">
      <nav className="sticky top-0 z-50 bg-mauritania-green text-white py-6 px-10 flex justify-between items-center shadow-2xl border-b-8 border-mauritania-gold">
        <button onClick={onBack} className="flex items-center gap-4 font-black text-sm uppercase tracking-widest hover:text-mauritania-gold transition-all">
          <i className={`fas ${isAr ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
          {isAr ? 'العودة للرئيسية' : 'Back to Portal'}
        </button>
        <div className="flex items-center gap-4">
          <MauritaniaSealSVG className="w-10 h-10" />
          <span className="font-black text-xs md:text-sm uppercase tracking-tighter">
            {isAr ? 'القنصلية الموريتانية بجدة' : 'Mauritanian Consulate Jeddah'}
          </span>
        </div>
      </nav>

      <section className="relative h-[450px] flex items-center justify-center overflow-hidden bg-mauritania-deep">
        <img src={ASSETS.landscape} alt="Mauritania" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-mauritania-green/40 to-white"></div>
        <div className="relative z-10 text-center px-6">
          <div className="w-28 h-28 bg-white rounded-[2rem] p-5 mx-auto mb-10 shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-4 border-mauritania-gold flex items-center justify-center">
            <img src={ASSETS.seal} alt="Seal" className="w-20 h-20" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-mauritania-green mb-4 tracking-tighter drop-shadow-sm">
            {isAr ? 'هوية القنصلية العامة' : 'Consulate General Profile'}
          </h1>
          <p className="text-mauritania-gold font-black text-xl md:text-2xl uppercase tracking-[0.4em]">
            {isAr ? 'الجمهورية الإسلامية الموريتانية' : 'Islamic Republic of Mauritania'}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-black text-mauritania-green mb-8 flex items-center gap-5">
                <span className="w-12 h-1.5 bg-mauritania-gold rounded-full"></span>
                {isAr ? 'الرسالة الدبلوماسية' : 'Diplomatic Mission'}
              </h2>
              <p className="text-2xl font-bold text-gray-600 leading-relaxed italic">
                {isAr 
                  ? 'تقديم خدمات قنصلية انسيابية، تعزيز العلاقات الثنائية، ودعم الجالية الموريتانية وربطها بالوطن الأم عبر جسور رقمية حديثة.'
                  : 'Providing streamlined consular services, fostering bilateral relations, and supporting the Mauritanian diaspora while linking them to their homeland.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-gray-50 rounded-[3rem] border-2 border-slate-100 hover:border-mauritania-green/20 transition-all">
                  <i className="fas fa-passport text-3xl text-mauritania-gold mb-6"></i>
                  <h4 className="font-black text-xl mb-4 text-mauritania-green">{isAr ? 'الوثائق الوطنية' : 'Passports & ID'}</h4>
                  <p className="text-sm font-bold text-gray-500 leading-relaxed">{isAr ? 'إصدار وتجديد جوازات السفر البيومترية والمستندات الرسمية المعتمدة.' : 'Issuance and renewal of biometric passports and certified official documents.'}</p>
               </div>
               <div className="p-8 bg-gray-50 rounded-[3rem] border-2 border-slate-100 hover:border-mauritania-green/20 transition-all">
                  <i className="fas fa-handshake text-3xl text-mauritania-gold mb-6"></i>
                  <h4 className="font-black text-xl mb-4 text-mauritania-green">{isAr ? 'دعم المستثمرين' : 'Investment Hub'}</h4>
                  <p className="text-sm font-bold text-gray-500 leading-relaxed">{isAr ? 'تسهيل الحصول على التأشيرات لرجال الأعمال والمستثمرين لزيارة موريتانيا.' : 'Facilitating business visas for investors and entrepreneurs to visit Mauritania.'}</p>
               </div>
            </div>
          </div>

          <div className="bg-mauritania-green text-white p-14 md:p-20 rounded-[5rem] shadow-[0_50px_100px_rgba(0,98,51,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-32 -translate-y-32"></div>
            <h2 className="text-4xl font-black mb-16 flex items-center gap-6">
              <i className="fas fa-info-circle text-mauritania-gold"></i>
              {isAr ? 'ملف الدولة (موريتانيا)' : 'Country Profile (Mauritania)'}
            </h2>

            <div className="space-y-12 relative z-10">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">{isAr ? 'العاصمة' : 'Capital'}</p>
                  <p className="text-2xl font-black">{isAr ? 'نواكشوط' : 'Nouakchott'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">{isAr ? 'العملة' : 'Currency'}</p>
                  <p className="text-2xl font-black">{isAr ? 'أوقية (MRU)' : 'Ouguiya (MRU)'}</p>
                </div>
              </div>

              <div className="pt-12 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">{isAr ? 'الملف الاقتصادي' : 'Economic Highlights'}</p>
                <div className="space-y-6">
                  {[
                    { ar: 'قطاع التعدين: رائدة عالمياً في إنتاج الحديد والذهب.', en: 'Mining: Global leader in Iron and Gold production.' },
                    { ar: 'الطاقة: مركز مستقبلي للهيدروجين الأخضر والغاز الطبيعي.', en: 'Energy: Future hub for Green Hydrogen and Natural Gas.' },
                    { ar: 'الثروة السمكية: تمتلك أحد أغنى السواحل البحرية في العالم.', en: 'Fisheries: One of the richest coastlines globally.' }
                  ].map((fact, idx) => (
                    <div key={idx} className="flex items-center gap-5">
                      <div className="w-2 h-2 rounded-full bg-mauritania-gold"></div>
                      <p className="text-lg font-bold opacity-90">{isAr ? fact.ar : fact.en}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center pt-10">
                <img src={ASSETS.flag} alt="Flag" className="h-20 rounded-2xl shadow-2xl border-4 border-white/20" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutConsulate;
