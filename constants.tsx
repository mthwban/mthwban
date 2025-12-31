
import { ConsularService, Appointment } from './types';

// وضع التشغيل الكامل - تعطيل وضع التجربة
export const DEMO_MODE = false;

export const CONSULAR_SERVICES: ConsularService[] = [
  { id: 'passport', titleAr: 'تجديد جواز السفر', titleEn: 'Passport Renewal', icon: 'fa-calendar-check', isAvailable: true },
  { id: 'visa', titleAr: 'طلب تأشيرة دخول', titleEn: 'Visa Application', icon: 'fa-passport', isAvailable: true },
  { id: 'notary', titleAr: 'التوثيقات والوكالات', titleEn: 'Notary & Power of Attorney', icon: 'fa-file-signature', isAvailable: true },
  { id: 'civil', titleAr: 'الحالة المدنية', titleEn: 'Civil Status', icon: 'fa-users', isAvailable: true },
];

export const SERVICE_REQUIREMENTS: Record<string, { ar: string[]; en: string[] }> = {
  passport: {
    ar: ['أصل بطاقة التعريف الوطنية', 'جواز السفر القديم', '4 صور خلفية بيضاء', 'إثبات إقامة'],
    en: ['Original National ID', 'Old Passport', '4 Photos (White Background)', 'Proof of Residence']
  },
  visa: {
    ar: ['جواز سفر ساري (6 أشهر)', 'دعوة رسمية أو حجز فندق', 'تأمين طبي', 'صورتين شخصيتين'],
    en: ['Valid Passport (6 months)', 'Official Invitation/Hotel Booking', 'Medical Insurance', '2 Photos']
  },
  notary: {
    ar: ['أصل بطاقة التعريف أو الجواز', 'حضور صاحب العلاقة شخصياً', 'مسودة الوكالة المراد توثيقها'],
    en: ['Original ID or Passport', 'Personal Presence of the Applicant', 'Draft of the Power of Attorney']
  },
  civil: {
    ar: ['شهادة الميلاد الأصلية', 'دفتر العائلة', 'إفادة الزواج (في حال كانت المعاملة تخص الزواج)'],
    en: ['Original Birth Certificate', 'Family Book', 'Marriage Affidavit (for marriage-related tasks)']
  }
};

export const AVAILABLE_TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00'];
export const MAX_BOOKINGS_PER_SLOT = 3;
export const WHATSAPP_URL = 'https://wa.me/966566162529';
export const STORAGE_KEY = 'mauritanian_consulate_bookings';
export const NEWS_STORAGE_KEY = 'mauritanian_consulate_news_v3';
export const ADMIN_PASSWORD = 'rim-admin-2024';

export const getStoredBookings = (): Appointment[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

export const saveBooking = (appointment: Appointment) => {
  const existing = getStoredBookings();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, appointment]));
};

export const isSlotFull = (date: string, time: string): boolean => {
  const count = getStoredBookings().filter(b => b.date === date && b.time === time).length;
  return count >= MAX_BOOKINGS_PER_SLOT;
};

export const getBookingById = (id: string): Appointment | undefined => {
  return getStoredBookings().find(b => b.id.toUpperCase() === id.toUpperCase());
};

export const getStoredNews = (): string => {
  return localStorage.getItem(NEWS_STORAGE_KEY) || 'مرحباً بكم في البوابة الإلكترونية الرسمية للقنصلية الموريتانية بجدة. جميع الخدمات الرقمية متاحة الآن للمواطنين.';
};

export const saveNews = (news: string) => localStorage.setItem(NEWS_STORAGE_KEY, news);

export const ASSETS = {
  seal: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Seal_of_Mauritania.svg/1024px-Seal_of_Mauritania.svg.png',
  flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Mauritania.svg/1200px-Flag_of_Mauritania.svg.png',
  heroBg: 'https://images.unsplash.com/photo-1582653280607-ee77ff289c02?q=80&w=1470&auto=format&fit=crop',
  landscape: 'https://images.unsplash.com/photo-1571235962067-b52a11ad9c98?q=80&w=1470&auto=format&fit=crop',
};

export const processImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => resolve(e.target?.result as string);
  });
};

export const CONSULATE_EVENTS = [];
export const PASSPORT_CHECKLIST = [
  { id: 'id_card', ar: 'بطاقة التعريف الوطنية', en: 'National ID' },
  { id: 'old_passport', ar: 'جواز السفر القديم', en: 'Old Passport' },
  { id: 'residence_permit', ar: 'إقامة سارية المفعول', en: 'Valid Residence Permit' }
];
