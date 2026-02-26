import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../hooks/useSettings';
import { translations } from '../lib/translations';

export default function PopupAdModal() {
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState(15);
  const adRef = useRef<HTMLDivElement>(null);
  const { settings } = useSettings();
  const t = translations[settings.language] as any;

  useEffect(() => {
    if (!isVisible) return;

    // Inject the ad script into the modal container
    if (adRef.current && adRef.current.childNodes.length === 0) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://pl28771948.effectivegatecpm.com/887ff2027f55d74a457e40d654a11fca/invoke.js';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      adRef.current.appendChild(script);
    }

    // Countdown logic
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        dir={settings.language === 'ar' ? 'rtl' : 'ltr'}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white dark:bg-ramadan-accent rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full relative flex flex-col border border-gray-200 dark:border-white/10"
        >
          {/* Header with skip button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20">
            <span className="text-sm font-tajawal text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <i className="fa-solid fa-rectangle-ad"></i>
              {t.sponsoredAd || "إعلان ممول"}
            </span>
            <button
              onClick={() => countdown === 0 && setIsVisible(false)}
              disabled={countdown > 0}
              className={`px-4 py-2 rounded-lg font-tajawal text-sm transition-all font-bold flex items-center gap-2 ${
                countdown > 0
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-ramadan-gold text-gray-900 hover:bg-yellow-500 cursor-pointer shadow-md'
              }`}
            >
              {countdown > 0 ? `${t.skipAdIn || "تخطي الإعلان بعد"} (${countdown})` : (
                <>
                  {t.skipAd || "تخطي الإعلان"}
                  <i className="fa-solid fa-xmark"></i>
                </>
              )}
            </button>
          </div>
          
          {/* Ad Container */}
          <div className="p-4 flex justify-center items-center min-h-[300px] bg-gray-100 dark:bg-gray-900/50 relative">
            {countdown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-ramadan-gold rounded-full animate-spin opacity-50"></div>
              </div>
            )}
            <div id="container-887ff2027f55d74a457e40d654a11fca" ref={adRef} className="relative z-10"></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
