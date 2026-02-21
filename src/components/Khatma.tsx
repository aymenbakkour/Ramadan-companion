import { useState, useEffect } from 'react';
import { db } from '../lib/db';
import confetti from 'canvas-confetti';
import { useRamadanDay } from '../hooks/useRamadanDay';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSettings } from '../hooks/useSettings';
import { translations } from '../lib/translations';

export default function Khatma() {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const { day } = useRamadanDay();
  const { settings } = useSettings();
  const t = translations[settings.language];
  const currentRamadanDay = day || 1;

  useEffect(() => {
    const loadData = async () => {
      const days = await db.khatma.toArray();
      setCompletedDays(days.filter(d => d.completed).map(d => d.day));
    };
    loadData();
  }, []);

  const toggleDay = async (day: number) => {
    const isCompleted = completedDays.includes(day);
    
    if (!isCompleted) {
      // Celebrate!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#ffffff', '#050A18']
      });
      
      await db.khatma.put({ day, completed: true, date: new Date().toISOString() });
      setCompletedDays([...completedDays, day]);
    } else {
      await db.khatma.delete(day);
      setCompletedDays(completedDays.filter(d => d !== day));
    }
  };

  return (
    <div className="p-6 animate__animated animate__fadeIn">
      <h2 className="text-3xl font-amiri text-ramadan-gold mb-6 text-center">{t.khatmaTitle}</h2>
      <div className="grid grid-cols-5 gap-3 md:gap-4 max-w-2xl mx-auto">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
          const isCompleted = completedDays.includes(day);
          const isToday = day === currentRamadanDay;
          
          return (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={twMerge(
                "aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-300 border-2",
                isCompleted 
                  ? "bg-green-600 border-green-400 text-white shadow-[0_0_15px_rgba(22,163,74,0.5)]" 
                  : "bg-white dark:bg-ramadan-accent/50 border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-ramadan-accent",
                isToday && !isCompleted && "border-ramadan-gold shadow-[0_0_15px_rgba(255,215,0,0.3)] animate-pulse",
                "relative overflow-hidden group"
              )}
            >
              <span className={clsx("text-lg font-bold font-tajawal", isCompleted ? "text-white" : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white")}>
                {day}
              </span>
              <span className="text-[10px] mt-1 opacity-60">{t.ramadanDay}</span>
              {isCompleted && <i className="fa-solid fa-check absolute top-2 right-2 text-xs opacity-50"></i>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
