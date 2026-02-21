import { getRamadanDay, quranJuz } from '../lib/ramadan';

export default function Quran() {
  const day = getRamadanDay();
  const displayDay = Math.max(1, Math.min(30, day));
  const juzData = quranJuz.find(j => j.juz === displayDay);

  return (
    <div className="p-6 max-w-3xl mx-auto animate__animated animate__fadeIn">
      <h2 className="text-3xl font-amiri text-ramadan-gold mb-8 text-center">ورد القرآن اليومي</h2>

      {juzData ? (
        <div className="space-y-6">
          <div className="bg-ramadan-accent/40 p-8 rounded-2xl border border-white/10 text-center">
            <p className="text-gray-400 font-tajawal mb-2">الجزء</p>
            <h3 className="text-6xl font-amiri text-white mb-4">{juzData.juz}</h3>
            <div className="w-16 h-1 bg-ramadan-gold mx-auto rounded-full mb-6"></div>
            <p className="text-2xl text-gray-200 font-amiri">{juzData.surahs}</p>
          </div>

          <div className="bg-gradient-to-r from-ramadan-gold/10 to-transparent p-6 rounded-xl border-r-4 border-ramadan-gold">
            <h4 className="text-ramadan-gold font-bold font-tajawal mb-2 flex items-center gap-2">
              <i className="fa-solid fa-hands-praying"></i>
              دعاء مقترح
            </h4>
            <p className="text-xl text-white font-amiri leading-loose">
              "{juzData.dua}"
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <p>لا يوجد ورد محدد لهذا اليوم.</p>
        </div>
      )}
    </div>
  );
}
