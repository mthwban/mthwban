import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import AppointmentBooking from './components/AppointmentBooking';
import EventsGallery from './components/EventsGallery';
import PassportServiceWorkflow from './components/PassportServiceWorkflow';
import LocationMap from './components/LocationMap';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import NewsTicker from './components/NewsTicker';
import AIChatAssistant from './components/AIChatAssistant';
import StatusTracker from './components/StatusTracker';
import AboutConsulate from './components/AboutConsulate';
import { ChecklistGenerator } from './components/ChecklistGenerator';
import { IndependenceCelebration } from './components/IndependenceCelebration';
import { Language, View } from './types';
import { getStoredNews, ASSETS, DEMO_MODE } from './constants';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [view, setView] = useState<View>('portal');
  const [newsMessage, setNewsMessage] = useState<string>('');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    setNewsMessage(getStoredNews());
  }, [language]);

  const toggleLanguage = () => setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStartService = (id: string) => {
    if (id === 'passport') {
      setView('passport-workflow');
    } else {
      scrollToBooking();
    }
  };

  if (view === 'admin-login') return <AdminLogin language={language} onLoginSuccess={() => setView('admin-dashboard')} onCancel={() => setView('portal')} />;
  if (view === 'admin-dashboard') return <AdminDashboard language={language} onLogout={() => setView('portal')} onNewsUpdate={(msg) => setNewsMessage(msg)} />;
  if (view === 'passport-workflow') return <PassportServiceWorkflow language={language} onComplete={() => setView('portal')} onCancel={() => setView('portal')} />;
  if (view === 'tracking') return <StatusTracker language={language} onBack={() => setView('portal')} />;
  if (view === 'about') return <AboutConsulate language={language} onBack={() => setView('portal')} />;

  return (
    <div className="min-h-screen flex flex-col bg-mauritania-charcoal/50 text-gray-100 overflow-x-hidden">
      <IndependenceCelebration language={language} />
      <Header language={language} onToggleLanguage={toggleLanguage} />
      <NewsTicker message={newsMessage} />
      
      <main className="flex-grow">
        {view === 'portal' ? (
          <>
            <Hero 
              language={language} 
              onBookClick={scrollToBooking} 
              onTrackClick={() => setView('tracking')}
              onAboutClick={() => setView('about')}
            />
            
            <ServicesGrid 
              language={language} 
              onStartService={handleStartService}
            />

            <section className="py-24 bg-gray-50/10 backdrop-blur-md">
              <ChecklistGenerator language={language} />
            </section>

            <section id="booking-section" className="py-24 bg-white/5 backdrop-blur-lg text-white border-y-8 border-mauritania-gold/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-mauritania-green/10 rounded-full -translate-y-32 translate-x-32"></div>
              <AppointmentBooking language={language} />
            </section>

            <EventsGallery language={language} />
            <LocationMap language={language} />
          </>
        ) : null}
      </main>

      <Footer 
        language={language} 
        onAdminClick={() => setView('admin-login')} 
        onAboutClick={() => setView('about')}
      />
      
      <FloatingWhatsApp />
      <AIChatAssistant language={language} />
    </div>
  );
};

export default App;