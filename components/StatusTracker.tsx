
import React, { useState } from 'react';
import { Language, Appointment } from '../types';
import { getStoredBookings, CONSULAR_SERVICES } from '../constants';

const StatusTracker: React.FC<{ language: Language; onBack: () => void }> = ({ language, onBack }) => {
  const isAr = language === 'ar';
  const [refId, setRefId] = useState('');
  const [result, setResult] = useState<Appointment | null>(null);
  const [error, setError] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const bookings = getStoredBookings();
    const found = bookings.find(b => b.id.toUpperCase() === refId.trim().toUpperCase());
    
    if (found) {
      setResult(found);
      setError(false);
    } else {
      setResult(null);
      setError(true);
    }
  };

  const getServiceName = (id: string) => {
    const s = CONSULAR_SERVICES.find(x => x.id === id);
    return isAr ? s?.titleAr : s?.titleEn;
  };

  return (
    <div className="py-24 bg-mauritania-charcoal min-h-[60vh] flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="max-w-2xl w-full">
        <button onClick={onBack} className="mb-8 text-gray-400 hover:text-white flex items-center gap-2 font-bold transition-all">
          <i className={`fas ${isAr ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
          {isAr ? 'العودة للرئيسية' : 'Back to Home'}
        </button>

        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl text-gray-900 border border-white/10">
          <h3 className="text-3xl font-black text-mauritania-green mb-4 text-center">
            {isAr ? 'تتبع حالة المعاملة' : 'Track Application Status'}
          </h3>
          <p className="text-gray-500 font-bold mb-10 text-center">
            {isAr ? 'أدخل الرقم المرجعي لمتابعة حالة طلبك القنصلي:' : 'Enter reference ID to follow your consular request:'}
          </p>

          <form onSubmit={handleTrack} className="flex flex-col gap-6 mb-12">
            <input 
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
              placeholder={isAr ? 'مثال: RIM-XXXXXX' : 'Example: RIM-XXXXXX'}
              className="w-full px-8 py-5 rounded-2xl border-2 border-gray-100 focus:border-mauritania-green focus:ring-4 focus:ring-mauritania-green/5 outline-none font-mono font-black text-center text-2xl uppercase tracking-widest text-mauritania-green"
            />
            <button className="bg-mauritania-green text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-green-800 transition-all active:scale-95">
              {isAr ? 'بحث عن الطلب' : 'Track Now'}
            </button>
          </form>

          {error && (
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl font-bold flex items-center gap-4 animate-shake">
              <i className="fas fa-exclamation-circle text-2xl"></i>
              {isAr ? 'الرقم المرجعي غير موجود في النظام. يرجى التأكد من الرقم.' : 'Reference ID not found. Please verify the number.'}
            </div>
          )}

          {result && (
            <div className="animate-fade-in space-y-8">
              <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{isAr ? 'اسم المواطن' : 'Citizen Name'}</p>
                    <p className="text-xl font-black">{result.name}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                    result.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                    result.status === 'confirmed' ? 'bg-blue-100 text-blue-600' : 
                    'bg-green-100 text-green-600'
                  }`}>
                    {result.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{isAr ? 'نوع الخدمة' : 'Service Type'}</p>
                    <p className="font-bold">{getServiceName(result.serviceId)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{isAr ? 'تاريخ الموعد' : 'Date'}</p>
                    <p className="font-bold">{result.date}</p>
                  </div>
                </div>
              </div>

              <div className="relative pt-12">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 rounded-full"></div>
                <div className={`absolute top-0 left-0 h-1 bg-mauritania-green rounded-full transition-all duration-1000 ${
                  result.status === 'pending' ? 'w-1/3' : result.status === 'confirmed' ? 'w-2/3' : 'w-full'
                }`}></div>
                
                <div className="flex justify-between items-center relative -top-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full border-4 border-white shadow-md ${result.status ? 'bg-mauritania-green' : 'bg-gray-200'}`}></div>
                    <span className="text-[10px] font-black mt-2">{isAr ? 'تم الاستلام' : 'Received'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full border-4 border-white shadow-md ${['confirmed', 'completed'].includes(result.status) ? 'bg-mauritania-green' : 'bg-gray-200'}`}></div>
                    <span className="text-[10px] font-black mt-2">{isAr ? 'تم التدقيق' : 'Processed'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full border-4 border-white shadow-md ${result.status === 'completed' ? 'bg-mauritania-green' : 'bg-gray-200'}`}></div>
                    <span className="text-[10px] font-black mt-2">{isAr ? 'اكتمل' : 'Completed'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusTracker;
