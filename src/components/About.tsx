import { useSettings } from '../hooks/useSettings';
import { translations } from '../lib/translations';

export default function About() {
  const { settings } = useSettings();
  const t = translations[settings.language];

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 animate__animated animate__fadeIn">
      <div className="bg-white dark:bg-ramadan-accent/30 p-10 rounded-3xl border border-gray-200 dark:border-white/10 max-w-md w-full text-center backdrop-blur-sm shadow-xl">
        <div className="w-24 h-24 bg-ramadan-gold rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-ramadan-gold/20">
          <i className="fa-solid fa-code text-4xl text-ramadan-dark"></i>
        </div>
        
        <h2 className="text-3xl font-amiri text-gray-900 dark:text-white mb-2">أيمن بكور</h2>
        <p className="text-ramadan-gold font-tajawal text-sm mb-8 tracking-widest uppercase">مطور برمجيات</p>
        
        <p className="text-gray-600 dark:text-gray-300 font-tajawal leading-relaxed mb-8">
          {t.appDesc}
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="https://www.behance.net/aymenbakkour" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center transition-colors text-gray-900 dark:text-white">
            <i className="fa-brands fa-behance"></i>
          </a>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5">
          <p className="text-xs text-gray-500 font-mono">v1.0.0 • Ramadan 2026</p>
        </div>
      </div>
    </div>
  );
}
