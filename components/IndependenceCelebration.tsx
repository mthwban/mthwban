import React, { useEffect, useState } from 'react';
import { Language } from '../types';

export const IndependenceCelebration: React.FC<{ language: Language }> = ({ language }) => {
  const isAr = language === 'ar';
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Confetti cleanup
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Independence Banner */}
      <div className="bg-gradient-to-r from-mauritania-green via-mauritania-red to-mauritania-green py-3 text-center text-white font-black text-sm md:text-lg shadow-2xl relative z-[100] border-b-2 border-mauritania-gold/30">
        <div className="flex items-center justify-center gap-4">
          <i className="fas fa-star text-mauritania-gold animate-pulse"></i>
          <p className="tracking-widest">
            {isAr ? 'نحتفل بذكرى عيد الاستقلال الموريتاني - 28 نوفمبر' : 'Celebrating Mauritanian Independence Day - November 28'}
          </p>
          <i className="fas fa-moon text-mauritania-gold animate-pulse"></i>
        </div>
      </div>

      {/* Confetti Effect Layer */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                backgroundColor: i % 2 === 0 ? '#006233' : '#FFD700',
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 20 + 10}px`,
                opacity: Math.random(),
                animationDuration: `${Math.random() * 3 + 4}s`,
                animationDelay: `${Math.random() * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            ></div>
          ))}
          <style>{`
            @keyframes confetti {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
            .animate-confetti {
              animation: confetti ease-in-out forwards;
            }
          `}</style>
        </div>
      )}
    </>
  );
};