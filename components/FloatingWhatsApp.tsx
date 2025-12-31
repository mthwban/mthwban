
import React from 'react';
import { WHATSAPP_URL } from '../constants';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      title="Contact us on WhatsApp"
    >
      <i className="fab fa-whatsapp text-3xl"></i>
      {/* Tooltip for desktop */}
      <span className="absolute right-20 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block border border-gray-100">
        تحدث معنا عبر واتساب
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
