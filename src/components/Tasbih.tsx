import { useState, useEffect } from 'react';
import { db } from '../lib/db';

export default function Tasbih() {
  const [count, setCount] = useState(0);

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
    if (confirm('هل أنت متأكد من تصفير العداد؟')) {
      setCount(0);
      db.tasbih.put({ id: 1, count: 0 });
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 animate__animated animate__fadeIn">
      <h2 className="text-3xl font-amiri text-ramadan-gold mb-12">السبحة الإلكترونية</h2>
      
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-ramadan-gold/20 blur-3xl rounded-full"></div>
        <button 
          onClick={increment}
          className="relative w-64 h-64 rounded-full bg-gradient-to-b from-ramadan-accent to-[#0a1128] border-4 border-ramadan-gold/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center active:scale-95 transition-transform duration-100 group"
        >
          <span className="text-6xl font-mono font-bold text-white mb-2 group-hover:text-ramadan-gold transition-colors">
            {count}
          </span>
          <span className="text-gray-400 font-tajawal text-sm">اضغط للتسبيح</span>
        </button>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={reset}
          className="px-6 py-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors font-tajawal"
        >
          <i className="fa-solid fa-rotate-right ml-2"></i>
          تصفير
        </button>
      </div>
    </div>
  );
}
