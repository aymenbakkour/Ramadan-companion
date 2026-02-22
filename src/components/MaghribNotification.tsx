import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useSettings } from '../hooks/useSettings';
import { translations } from '../lib/translations';
import { AnimatePresence, motion } from 'motion/react';

export default function MaghribNotification() {
  const { settings } = useSettings();
  const t = translations[settings.language];
  const [maghribTime, setMaghribTime] = useState<Date | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showAdhan, setShowAdhan] = useState(false);
  const [showDua, setShowDua] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [hasNotified, setHasNotified] = useState(false);

  // Fetch Maghrib time
  useEffect(() => {
    const fetchMaghrib = async () => {
      try {
        const date = new Date();
        const response = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
          params: {
            city: settings.location.city,
            country: settings.location.country,
            method: 2,
            date: format(date, 'dd-MM-yyyy')
          }
        });
        
        const timeStr = response.data.data.timings.Maghrib;
        const [hours, minutes] = timeStr.split(':').map(Number);
        const maghrib = new Date();
        maghrib.setHours(hours, minutes, 0, 0);
        
        // If Maghrib passed, ignore for today
        if (maghrib.getTime() < new Date().getTime()) {
           setMaghribTime(null);
        } else {
           setMaghribTime(maghrib);
           setHasNotified(false); // Reset for new time
        }
      } catch (err) {
        console.error("Failed to fetch Maghrib time", err);
      }
    };

    fetchMaghrib();
    // Refresh every hour just in case
    const interval = setInterval(fetchMaghrib, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [settings.location]);

  // Timer Logic
  useEffect(() => {
    if (!maghribTime || hasNotified) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = maghribTime.getTime() - now.getTime();

      // 1 minute before (60000ms)
      if (diff <= 60000 && diff > 0) {
        setShowPopup(true);
        const seconds = Math.floor(diff / 1000);
        setTimeLeft(`${seconds}`);
      } 
      // Adhan Time
      else if (diff <= 0 && diff > -5000) { // 5s buffer
        setShowPopup(false);
        setShowAdhan(true);
        setHasNotified(true);
        
        // Transition to Dua after 5s
        setTimeout(() => {
          setShowAdhan(false);
          setShowDua(true);
          
          // Hide everything after 15s
          setTimeout(() => {
            setShowDua(false);
          }, 15000);
        }, 5000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [maghribTime, hasNotified]);

  return (
    <AnimatePresence>
      {/* 1 Minute Warning Popup */}
      {showPopup && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 right-6 z-50 bg-ramadan-dark/90 backdrop-blur-md border border-ramadan-gold p-6 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.3)] max-w-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-ramadan-gold/20 flex items-center justify-center animate-pulse">
              <i className="fa-solid fa-moon text-ramadan-gold text-xl"></i>
            </div>
            <div>
              <h3 className="text-white font-amiri text-lg mb-1">{t.maghrib} {t.soon}</h3>
              <p className="text-ramadan-gold font-mono text-2xl font-bold">{timeLeft}s</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Adhan Full Screen Overlay */}
      {showAdhan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8"
            >
              <i className="fa-solid fa-mosque text-8xl text-ramadan-gold"></i>
            </motion.div>
            <motion.h1 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl md:text-8xl font-amiri text-white font-bold mb-4 text-shadow-gold"
            >
              الله أكبر
            </motion.h1>
            <p className="text-2xl text-gray-300 font-tajawal">{t.maghrib} - {t.iftarTime}</p>
          </div>
        </motion.div>
      )}

      {/* Iftar Dua Popup */}
      {showDua && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
        >
          <div className="bg-ramadan-accent border-2 border-ramadan-gold p-8 rounded-3xl max-w-lg w-full text-center shadow-[0_0_50px_rgba(255,215,0,0.2)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-ramadan-gold to-transparent"></div>
            
            <h3 className="text-3xl font-amiri text-ramadan-gold mb-6">{t.iftarDuaTitle}</h3>
            <p className="text-2xl md:text-3xl text-white font-amiri leading-loose mb-6">
              "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ"
            </p>
            <p className="text-gray-400 font-tajawal text-sm">{t.iftarDuaNote}</p>
            
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 15, ease: "linear" }}
              className="h-1 bg-ramadan-gold/50 mt-8 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
