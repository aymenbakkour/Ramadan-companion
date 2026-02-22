import { quranJuz } from '../lib/ramadan';
import { useRamadanDay } from '../hooks/useRamadanDay';
import { useSettings } from '../hooks/useSettings';
import { translations } from '../lib/translations';

export default function Quran() {
  const { day } = useRamadanDay();
  const { settings } = useSettings();
  const t = translations[settings.language];
  const currentRamadanDay = day || 1;
  const displayDay = Math.max(1, Math.min(30, currentRamadanDay));
  const juzData = quranJuz.find(j => j.juz === displayDay);

  return (
    <div className="p-6 max-w-3xl mx-auto animate__animated animate__fadeIn">
      <h2 className="text-3xl font-amiri text-ramadan-gold mb-8 text-center">{t.quranDaily}</h2>

      {juzData ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-ramadan-accent/40 p-8 rounded-2xl border border-gray-200 dark:border-white/10 text-center shadow-md">
            <p className="text-gray-500 dark:text-gray-400 font-tajawal mb-2">{t.juz}</p>
            <h3 className="text-6xl font-amiri text-gray-900 dark:text-white mb-4">{juzData.juz}</h3>
            <div className="w-16 h-1 bg-ramadan-gold mx-auto rounded-full mb-6"></div>
            <p className="text-2xl text-gray-700 dark:text-gray-200 font-amiri">{juzData.surahs}</p>
          </div>

          {juzData.keyVerse && (
            <div className="bg-white dark:bg-ramadan-accent/30 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
              <h4 className="text-ramadan-gold font-bold font-tajawal mb-4 flex items-center gap-2">
                <i className="fa-solid fa-book-open"></i>
                {settings.language === 'ar' ? 'آية وتفسير' : 'Verse & Tafsir'}
              </h4>
              
              <div className="mb-6 text-center">
                <p className="text-2xl md:text-3xl font-amiri text-gray-900 dark:text-white leading-loose mb-3">
                  ﴿ {juzData.keyVerse.text} ﴾
                </p>
                <p className="text-sm text-ramadan-gold font-tajawal">{juzData.keyVerse.reference}</p>
              </div>

              <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-200 dark:border-white/5">
                <p className="text-gray-600 dark:text-gray-300 font-tajawal leading-relaxed text-justify">
                  <span className="text-ramadan-gold font-bold ml-1">التفسير:</span>
                  {juzData.tafsir}
                </p>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-amber-50 to-transparent dark:from-ramadan-gold/10 dark:to-transparent p-6 rounded-xl border-r-4 border-ramadan-gold">
            <h4 className="text-ramadan-gold font-bold font-tajawal mb-2 flex items-center gap-2">
              <i className="fa-solid fa-hands-praying"></i>
              {t.juzDua}
            </h4>
            <p className="text-xl text-gray-800 dark:text-white font-amiri leading-loose">
              "{juzData.dua}"
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>لا يوجد ورد محدد لهذا اليوم.</p>
        </div>
      )}
    </div>
  );
}
