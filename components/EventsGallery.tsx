
import React from 'react';
import { Language } from '../types';
import { CONSULATE_EVENTS, ASSETS } from '../constants';

interface EventsGalleryProps {
  language: Language;
}

const EventsGallery: React.FC<EventsGalleryProps> = ({ language }) => {
  const isAr = language === 'ar';
  const hasEvents = CONSULATE_EVENTS.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-mauritania-charcoal">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="text-right rtl:text-right ltr:text-left">
          <h3 className="text-4xl font-black text-white mb-4">
            {isAr ? 'أنشطة وفعاليات القنصلية' : 'Consulate Activities & Events'}
          </h3>
          <div className="w-24 h-2 bg-mauritania-gold rounded-full"></div>
        </div>
        <p className="text-gray-400 font-medium max-w-md">
          {isAr ? 'البوابة الرسمية لتوثيق الفعاليات والأنشطة الدبلوماسية.' : 'Official portal for documenting diplomatic events and activities.'}
        </p>
      </div>

      {!hasEvents ? (
        <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem] p-20 text-center">
          <div className="w-24 h-24 bg-mauritania-green/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl border border-mauritania-gold/20">
             <img src={ASSETS.seal} alt="Emblem" className="w-16 h-16 object-contain opacity-40" />
          </div>
          <h4 className="text-2xl font-black text-white mb-4">
            {isAr ? 'سيتم نشر آخر التحديثات وصور الفعاليات هنا قريباً' : 'Latest updates and event photos will be posted here soon'}
          </h4>
          <p className="text-gray-500 font-bold max-w-lg mx-auto leading-relaxed">
            {isAr 
              ? 'يرجى متابعة هذه المساحة للاطلاع على التغطية الرسمية لكافة الأنشطة والفعاليات التي تنظمها القنصلية العامة بجدة.' 
              : 'Please follow this space for official coverage of all activities and events organized by the Consulate General in Jeddah.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CONSULATE_EVENTS.map((event) => (
            <div 
              key={event.id}
              className="group relative bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-mauritania-gold/30 transition-all cursor-pointer shadow-2xl"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.titleEn} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 text-mauritania-gold text-xs font-black uppercase tracking-widest mb-4">
                  <i className="fas fa-calendar-day"></i>
                  <span>{event.date}</span>
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-mauritania-gold transition-colors leading-relaxed">
                  {isAr ? event.titleAr : event.titleEn}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsGallery;
