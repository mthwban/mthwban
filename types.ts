
export type Language = 'ar' | 'en';

export interface ConsularService {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  isAvailable: boolean;
}

export type PassportServiceType = 'new' | 'renewal' | 'lost';

export interface Appointment {
  id: string;
  serviceId: string;
  name: string;
  passportNumber: string;
  passportPhoto?: string; // Base64 Data URL (Simulates Google Drive link)
  phone: string;
  email: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
  passportServiceType?: PassportServiceType;
}

export type View = 'portal' | 'admin-login' | 'admin-dashboard' | 'passport-workflow' | 'tracking' | 'about';
