import { useSettings } from '../hooks/useSettings';
import { translations } from '../lib/translations';
import { locations } from './PrayerTimes'; // Re-use locations list
import { clsx } from 'clsx';

export default function Settings() {
  const { settings, updateSettings, updateLocation } = useSettings();
  const t = translations[settings.language];

  return (
    <div className="p-6 max-w-2xl mx-auto animate__animated animate__fadeIn">
      <h2 className="text-3xl font-amiri text-ramadan-gold mb-8 text-center">{t.settings}</h2>

      <div className="space-y-6">
        {/* Language & Theme */}
        <div className="bg-white dark:bg-ramadan-accent/30 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-tajawal flex items-center gap-2">
            <i className="fa-solid fa-palette text-ramadan-gold"></i> {t.appearance} & {t.language}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2 font-tajawal">{t.language}</label>
              <div className="flex bg-gray-100 dark:bg-black/20 rounded-lg p-1">
                <button
                  onClick={() => updateSettings({ language: 'ar' })}
                  className={clsx(
                    "flex-1 py-2 rounded-md text-sm font-tajawal transition-colors",
                    settings.language === 'ar' ? "bg-ramadan-gold text-black font-bold shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  العربية
                </button>
                <button
                  onClick={() => updateSettings({ language: 'de' })}
                  className={clsx(
                    "flex-1 py-2 rounded-md text-sm font-tajawal transition-colors",
                    settings.language === 'de' ? "bg-ramadan-gold text-black font-bold shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  Deutsch
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2 font-tajawal">{t.theme}</label>
              <div className="flex bg-gray-100 dark:bg-black/20 rounded-lg p-1">
                <button
                  onClick={() => updateSettings({ theme: 'dark' })}
                  className={clsx(
                    "flex-1 py-2 rounded-md text-sm font-tajawal transition-colors flex items-center justify-center gap-2",
                    settings.theme === 'dark' ? "bg-indigo-900 text-white shadow-sm" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <i className="fa-solid fa-moon"></i> {t.dark}
                </button>
                <button
                  onClick={() => updateSettings({ theme: 'light' })}
                  className={clsx(
                    "flex-1 py-2 rounded-md text-sm font-tajawal transition-colors flex items-center justify-center gap-2",
                    settings.theme === 'light' ? "bg-white text-yellow-600 shadow-sm border border-gray-200" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <i className="fa-solid fa-sun"></i> {t.light}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ramadan Dates */}
        <div className="bg-white dark:bg-ramadan-accent/30 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-tajawal flex items-center gap-2">
            <i className="fa-solid fa-calendar-days text-ramadan-gold"></i> {t.ramadanStart}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2 font-tajawal">{t.ramadanStart}</label>
              <input
                type="date"
                value={settings.ramadanStartDate || ''}
                onChange={(e) => updateSettings({ ramadanStartDate: e.target.value })}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:border-ramadan-gold focus:outline-none transition-colors"
              />
              <p className="text-xs text-gray-500 mt-1 font-tajawal">
                {settings.language === 'ar' ? 'اتركه فارغاً للاعتماد على الحساب التلقائي' : 'Leave empty for automatic calculation'}
              </p>
            </div>

            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2 font-tajawal">{t.eidDate}</label>
              <input
                type="date"
                value={settings.eidDate || ''}
                onChange={(e) => updateSettings({ eidDate: e.target.value })}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:border-ramadan-gold focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white dark:bg-ramadan-accent/30 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-tajawal flex items-center gap-2">
            <i className="fa-solid fa-location-dot text-ramadan-gold"></i> {t.location}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2 font-tajawal">{t.country}</label>
              <select 
                value={settings.location.country}
                onChange={(e) => updateLocation(settings.location.city, e.target.value)}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:border-ramadan-gold focus:outline-none [&>option]:text-black"
              >
                {Object.keys(locations).sort().map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-500 dark:text-gray-400 text-sm mb-2 font-tajawal">{t.city}</label>
              <select 
                value={settings.location.city}
                onChange={(e) => updateLocation(e.target.value, settings.location.country)}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:border-ramadan-gold focus:outline-none [&>option]:text-black"
              >
                {(locations[settings.location.country] || []).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
