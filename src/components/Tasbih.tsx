import { useState, useEffect } from 'react';
import { db } from '../lib/db';
import { useSettings } from '../hooks/useSettings';
import { translations } from '../lib/translations';

export default function Tasbih() {
  const [count, setCount] = useState(0);
  const { settings } = useSettings();
  const t = translations[settings.language];

  useEffect(() => {
    db.tasbih.get(1).then((record) => {
      if (record) setCount(record.count);
    });
  }, []);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    // Vibrate
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    // Save
    db.tasbih.put({ id: 1, count: newCount });
  };

  const reset = () => {
    if (confirm(t.reset + '?')) {
      setCount(0);
      db.tasbih.put({ id: 1, count: 0 });
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 animate__animated animate__fadeIn">
      <h2 className="text-3xl font-amiri text-ramadan-gold mb-12">{t.tasbihTitle}</h2>
      
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-ramadan-gold/20 blur-3xl rounded-full"></div>
        <button 
          onClick={increment}
          className="relative w-64 h-64 rounded-full bg-gradient-to-b from-white to-gray-100 dark:from-ramadan-accent dark:to-[#0a1128] border-4 border-gray-200 dark:border-ramadan-gold/30 shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center active:scale-95 transition-transform duration-100 group"
        >
          <span className="text-6xl font-mono font-bold text-gray-900 dark:text-white mb-2 group-hover:text-ramadan-gold transition-colors">
            {count}
          </span>
          <span className="text-gray-500 dark:text-gray-400 font-tajawal text-sm">{t.tasbih}</span>
        </button>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={reset}
          className="px-6 py-2 rounded-full border border-red-500/30 text-red-500 dark:text-red-400 hover:bg-red-500/10 transition-colors font-tajawal"
        >
          <i className="fa-solid fa-rotate-right ml-2"></i>
          {t.reset}
        </button>
      </div>
    </div>
  );
}
