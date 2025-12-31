
import React from 'react';

interface NewsTickerProps {
  message: string;
}

const NewsTicker: React.FC<NewsTickerProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-[#fff1f0] border-y border-red-200 overflow-hidden py-3 relative flex items-center no-print shadow-sm">
      {/* Label Sticker */}
      <div className="absolute right-0 top-0 bottom-0 px-6 bg-red-600 text-white font-extrabold flex items-center z-10 shadow-[5px_0_15px_rgba(0,0,0,0.1)]">
        <i className="fas fa-exclamation-triangle ml-2 animate-pulse"></i>
        <span className="text-xs md:text-sm whitespace-nowrap">إعلان هام:</span>
      </div>
      
      {/* Marquee Content */}
      <div className="flex-1 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee-text pr-[100%]">
          <span className="text-red-900 font-bold text-sm md:text-base px-12">
            {message}
          </span>
          {/* Loop text */}
          <span className="text-red-900 font-bold text-sm md:text-base px-12">
            {message}
          </span>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee-animation {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee-text {
          display: inline-block;
          animation: marquee-animation 30s linear infinite;
        }
        [dir="ltr"] .animate-marquee-text {
          animation: marquee-animation-ltr 30s linear infinite;
        }
        @keyframes marquee-animation-ltr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
