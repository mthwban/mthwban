
import React, { useState } from 'react';
import { Language } from '../types';
import { ADMIN_PASSWORD, ASSETS } from '../constants';

interface AdminLoginProps {
  language: Language;
  onLoginSuccess: () => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ language, onLoginSuccess, onCancel }) => {
  const isAr = language === 'ar';
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-mauritania-green"></div>
        
        <div className="text-center mb-8">
          <img src={ASSETS.seal} alt="RIM" className="h-20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">{isAr ? 'بوابة المسؤولين' : 'Admin Portal Access'}</h2>
          <p className="text-gray-500 text-sm mt-1">{isAr ? 'يرجى إدخال كلمة المرور للمتابعة' : 'Please enter password to continue'}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isAr ? 'كلمة المرور' : 'Password'}
              className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200'} focus:ring-2 focus:ring-mauritania-green outline-none transition-all text-center`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2 text-center">{isAr ? 'كلمة المرور خاطئة' : 'Invalid password'}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit"
              className="w-full bg-mauritania-green text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-800 transition-all active:scale-95"
            >
              {isAr ? 'تسجيل الدخول' : 'Login'}
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full text-gray-500 py-2 text-sm font-medium hover:text-gray-700 transition-colors"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
