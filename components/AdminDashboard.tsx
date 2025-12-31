import React, { useState, useEffect } from 'react';
import { Language, Appointment } from '../types';
import { getStoredBookings, CONSULAR_SERVICES, STORAGE_KEY, saveNews, getStoredNews, ASSETS, AVAILABLE_TIME_SLOTS, MAX_BOOKINGS_PER_SLOT } from '../constants';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ language, onLogout, onNewsUpdate }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'list' | 'timeline' | 'analytics'>('list');
  const [bookings, setBookings] = useState<Appointment[]>([]);
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [newsInput, setNewsInput] = useState(getStoredNews());

  useEffect(() => { refreshData(); }, []);
  const refreshData = () => { setBookings(getStoredBookings().reverse()); };

  const updateStatus = (id: string, newStatus: Appointment['status']) => {
    const all = getStoredBookings().map(b => b.id === id ? { ...b, status: newStatus } : b);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    refreshData();
  };

  const getDayBookings = (date: string) => bookings.filter(b => b.date === date);

  // Phase 3: Analytics Heatmap Data Generation
  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans text-slate-900">
      <header className="bg-mauritania-green text-white py-6 px-12 flex justify-between items-center shadow-2xl border-b-8 border-mauritania-gold no-print">
        <div className="flex items-center gap-8">
          <div className="p-4 bg-white rounded-[2rem] shadow-2xl transform hover:rotate-3 transition-transform">
            <img src={ASSETS.seal} alt="RIM" className="h-16 w-16" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter">{isAr ? 'مركز التحكم والعمليات' : 'Consular Command Center'}</h1>
            <div className="flex items-center gap-3 mt-1">
               <span className="w-2 h-2 bg-mauritania-gold rounded-full"></span>
               <p className="text-[10px] text-mauritania-gold font-black uppercase tracking-[0.4em]">{isAr ? 'النظام الرقمي السيادي' : 'Sovereign Digital System'}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <nav className="flex bg-black/20 backdrop-blur-md rounded-2xl p-1.5 border border-white/10">
            {['list', 'timeline', 'analytics'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)} 
                className={`px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-mauritania-gold text-mauritania-charcoal shadow-xl' : 'text-white/70 hover:text-white'}`}
              >
                {tab === 'list' && (isAr ? 'المراجعات' : 'List')}
                {tab === 'timeline' && (isAr ? 'الجدول الزمني' : 'Timeline')}
                {tab === 'analytics' && (isAr ? 'التحليلات' : 'Heatmap')}
              </button>
            ))}
          </nav>
          <button onClick={onLogout} className="bg-mauritania-red text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 shadow-lg active:scale-95">
             {isAr ? 'خروج' : 'Logout'}
          </button>
        </div>
      </header>

      <main className="max-w-[1700px] mx-auto w-full p-12 flex-grow">
        {activeTab === 'list' && (
          <div className="animate-fade-in space-y-12">
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-200 flex items-center gap-12 relative overflow-hidden">
               <div className="w-24 h-24 bg-mauritania-gold/10 text-mauritania-gold rounded-[2rem] flex items-center justify-center text-4xl shadow-inner border border-mauritania-gold/10">
                 <i className="fas fa-broadcast-tower"></i>
               </div>
               <div className="flex-grow">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{isAr ? 'بث رسالة الشريط الإخباري' : 'Broadcast Message'}</label>
                 <textarea value={newsInput} onChange={(e) => setNewsInput(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 font-bold text-xl outline-none focus:border-mauritania-green focus:bg-white min-h-[100px] resize-none" />
               </div>
               <button onClick={() => { saveNews(newsInput); onNewsUpdate?.(newsInput); }} className="bg-mauritania-green text-white px-12 py-6 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-green-800 transition-all">
                  {isAr ? 'تحديث البث' : 'Update'}
                </button>
            </div>

            <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-slate-200">
               <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="text-2xl font-black text-slate-800">{isAr ? 'سجل المراجعات' : 'Booking Ledger'}</h3>
                  <span className="bg-white px-6 py-2 rounded-full border border-slate-200 text-xs font-black text-slate-500 shadow-sm">Total: {bookings.length}</span>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-right">
                   <thead>
                     <tr className="bg-slate-100/50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-200">
                       <th className="px-12 py-8">{isAr ? 'المواطن' : 'Citizen'}</th>
                       <th className="px-12 py-8">{isAr ? 'الخدمة' : 'Service'}</th>
                       <th className="px-12 py-8">{isAr ? 'التوقيت' : 'Time'}</th>
                       <th className="px-12 py-8 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {bookings.map(b => (
                       <tr key={b.id} className="hover:bg-mauritania-green/5 transition-colors group">
                         <td className="px-12 py-10">
                           <div className="font-black text-2xl text-slate-800 tracking-tight">{b.name}</div>
                           <div className="text-xs font-bold text-slate-400">#{b.id} | {b.passportNumber}</div>
                         </td>
                         <td className="px-12 py-10">
                            <span className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-black text-xs uppercase">
                              {CONSULAR_SERVICES.find(s => s.id === b.serviceId)?.titleAr || b.serviceId}
                            </span>
                         </td>
                         <td className="px-12 py-10">
                           <div className="font-black text-slate-800 text-lg">{b.date}</div>
                           <div className="text-sm font-bold text-mauritania-green">{b.time}</div>
                         </td>
                         <td className="px-12 py-10 text-center">
                           <div className="flex justify-center gap-2">
                              {['pending', 'confirmed', 'completed'].map((status) => (
                                <button key={status} onClick={() => updateStatus(b.id, status as any)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all border-2 ${b.status === status ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-400'}`}>
                                  {status}
                                </button>
                              ))}
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="animate-fade-in space-y-12">
            <div className="flex justify-between items-center mb-10 bg-white p-10 rounded-[3rem] shadow-xl">
               <h3 className="text-3xl font-black text-slate-800">{isAr ? 'عرض السعة التشغيلية' : 'Capacity Timeline'}</h3>
               <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="bg-slate-50 px-8 py-4 rounded-2xl border-2 border-slate-100 font-black text-mauritania-green" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {AVAILABLE_TIME_SLOTS.map(slot => {
                const slotBookings = getDayBookings(dateFilter).filter(b => b.time === slot);
                const isFull = slotBookings.length >= MAX_BOOKINGS_PER_SLOT;
                return (
                  <div key={slot} className={`bg-white p-10 rounded-[3.5rem] border-4 transition-all shadow-xl ${isFull ? 'border-red-100 opacity-60' : 'border-white hover:border-mauritania-gold/20'}`}>
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-3xl font-black text-slate-800">{slot}</span>
                      <span className={`text-[10px] font-black px-4 py-2 rounded-full shadow-md ${isFull ? 'bg-red-500 text-white' : 'bg-mauritania-gold'}`}>
                        {slotBookings.length} / {MAX_BOOKINGS_PER_SLOT}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {[0, 1, 2].map(i => (
                        <div key={i} className={`h-20 rounded-2xl flex items-center px-6 transition-all border-2 ${slotBookings[i] ? 'bg-mauritania-green/5 border-mauritania-green/20' : 'bg-slate-50 border-dashed border-slate-200'}`}>
                          {slotBookings[i] ? (
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-mauritania-green text-white rounded-full flex items-center justify-center"><i className="fas fa-check"></i></div>
                              <p className="font-black text-xs truncate max-w-[120px]">{slotBookings[i].name}</p>
                            </div>
                          ) : (
                            <p className="font-bold text-[10px] text-slate-300 uppercase">{isAr ? 'شاغر' : 'Empty'}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="animate-fade-in space-y-12">
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-200">
              <h3 className="text-3xl font-black text-slate-800 mb-12 flex items-center gap-4">
                <i className="fas fa-chart-line text-mauritania-gold"></i>
                {isAr ? 'خريطة الذروة والضغط التشغيلي' : 'Peak Traffic Heatmap Analysis'}
              </h3>
              <div className="overflow-x-auto">
                <div className="min-w-[1000px]">
                  <div className="grid grid-cols-8 gap-4 mb-8">
                    <div className="col-span-1"></div>
                    {getNext7Days().map(day => (
                      <div key={day} className="text-center">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day.split('-').slice(1).join('/')}</p>
                        <p className="font-black text-slate-700 text-sm">{new Date(day).toLocaleDateString(isAr ? 'ar' : 'en', { weekday: 'short' })}</p>
                      </div>
                    ))}
                  </div>
                  {AVAILABLE_TIME_SLOTS.map(slot => (
                    <div key={slot} className="grid grid-cols-8 gap-4 mb-4">
                      <div className="col-span-1 flex items-center font-black text-slate-400 text-sm uppercase">{slot}</div>
                      {getNext7Days().map(day => {
                        const count = bookings.filter(b => b.date === day && b.time === slot).length;
                        const intensity = (count / MAX_BOOKINGS_PER_SLOT) * 100;
                        const bgColor = intensity >= 100 ? 'bg-red-500' : intensity >= 66 ? 'bg-orange-400' : intensity >= 33 ? 'bg-mauritania-gold' : intensity > 0 ? 'bg-mauritania-green' : 'bg-slate-50';
                        return (
                          <div key={day} className={`h-16 rounded-2xl flex items-center justify-center transition-all hover:scale-105 shadow-inner cursor-pointer group relative ${bgColor}`}>
                            {count > 0 && <span className="text-white font-black text-lg">{count}</span>}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                              {count} Bookings / {intensity}% Capacity
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 flex justify-center gap-10">
                <div className="flex items-center gap-3"><div className="w-4 h-4 bg-slate-50 rounded shadow-inner"></div><span className="text-[10px] font-black uppercase text-slate-400">Empty</span></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 bg-mauritania-green rounded shadow-inner"></div><span className="text-[10px] font-black uppercase text-slate-400">Low</span></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 bg-mauritania-gold rounded shadow-inner"></div><span className="text-[10px] font-black uppercase text-slate-400">Moderate</span></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 bg-orange-400 rounded shadow-inner"></div><span className="text-[10px] font-black uppercase text-slate-400">Heavy</span></div>
                <div className="flex items-center gap-3"><div className="w-4 h-4 bg-red-500 rounded shadow-inner"></div><span className="text-[10px] font-black uppercase text-slate-400">Full</span></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

interface AdminDashboardProps {
  language: Language;
  onLogout: () => void;
  onNewsUpdate?: (news: string) => void;
}

export default AdminDashboard;