import { getRamadanDay, ramadanEvents } from '../lib/ramadan';
import { recommendedDeeds, islamicStories, dailyHadiths, dailyAyahs } from '../lib/content';

export default function Home() {
  const day = getRamadanDay();
  // Ensure day is within 1-30 range for demo purposes, or show "Not Ramadan" message
  const displayDay = Math.max(1, Math.min(30, day));
  const event = ramadanEvents.find(e => e.day === displayDay);
  const deed = recommendedDeeds.find(d => d.day === displayDay);
  const story = islamicStories.find(s => s.day === displayDay);
  const hadith = dailyHadiths.find(h => h.day === displayDay);
  const ayah = dailyAyahs.find(a => a.day === displayDay);
  
  const isBefore = day < 1;
  const isAfter = day > 30;

  return (
    <div className="p-6 max-w-4xl mx-auto animate__animated animate__fadeIn space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-amiri text-ramadan-gold mb-4 leading-relaxed">
          مرافق رمضان
        </h1>
        <p className="text-xl text-gray-300 font-tajawal">
          {isBefore ? 'ننتظر هلال الخير' : isAfter ? 'تقبل الله طاعتكم' : `اليوم ${day} من رمضان ١٤٤٧`}
        </p>
      </div>

      {isBefore && (
         <div className="text-center p-12 bg-ramadan-accent/20 rounded-2xl border border-white/5">
           <i className="fa-solid fa-hourglass-half text-4xl text-ramadan-gold mb-4"></i>
           <p className="text-lg">اللهم بلغنا رمضان لا فاقدين ولا مفقودين</p>
           <p className="text-sm text-gray-400 mt-2">يبدأ في 19 فبراير 2026</p>
         </div>
      )}

      {!isBefore && !isAfter && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recommended Deed */}
            {deed && (
              <div className="bg-gradient-to-l from-emerald-900/40 to-ramadan-accent/40 rounded-2xl p-6 border border-emerald-500/20 shadow-lg relative overflow-hidden">
                 <div className="absolute top-0 left-0 p-4 opacity-10">
                  <i className="fa-solid fa-hand-holding-heart text-8xl text-emerald-400"></i>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="fa-solid fa-star text-ramadan-gold text-sm"></i>
                    <span className="text-emerald-400 font-bold font-tajawal text-sm uppercase tracking-wider">عمل مستحب اليوم</span>
                  </div>
                  <h3 className="text-2xl font-amiri text-white mb-2">{deed.title}</h3>
                  <p className="text-gray-300 font-tajawal leading-relaxed">{deed.description}</p>
                </div>
              </div>
            )}

            {/* Daily Hadith */}
            {hadith && (
              <div className="bg-gradient-to-r from-amber-900/40 to-ramadan-accent/40 rounded-2xl p-6 border border-amber-500/20 shadow-lg relative overflow-hidden">
                 <div className="absolute top-0 left-0 p-4 opacity-10">
                  <i className="fa-solid fa-scroll text-8xl text-amber-400"></i>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <i className="fa-solid fa-quote-right text-amber-400 text-sm"></i>
                    <span className="text-amber-400 font-bold font-tajawal text-sm uppercase tracking-wider">حديث اليوم</span>
                  </div>
                  <p className="text-xl font-amiri text-white mb-3 leading-loose">
                    {hadith.text}
                  </p>
                  <p className="text-xs text-gray-400 font-tajawal text-left pl-2">
                    — {hadith.source}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Daily Ayah */}
          {ayah && (
            <div className="bg-ramadan-accent/30 rounded-2xl p-8 border border-white/10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5"></div>
              <div className="relative z-10">
                <i className="fa-solid fa-quran text-3xl text-ramadan-gold mb-4 block"></i>
                <p className="text-2xl md:text-3xl font-amiri text-white mb-4 leading-loose">
                  ﴾ {ayah.text} ﴿
                </p>
                <p className="text-sm text-ramadan-gold font-tajawal mb-6 block">
                  {ayah.surah}
                </p>
                <div className="bg-white/5 inline-block px-6 py-3 rounded-xl border border-white/5">
                  <span className="text-gray-400 text-xs block mb-1 font-tajawal">وقفة تدبر</span>
                  <p className="text-gray-200 font-tajawal text-sm">{ayah.lesson}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Historical Event */}
            {event && (
              <div className="bg-gradient-to-br from-ramadan-accent to-[#0a1128] rounded-2xl p-6 border border-ramadan-gold/20 shadow-xl relative overflow-hidden group hover:border-ramadan-gold/40 transition-all duration-500 h-full">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <i className="fa-solid fa-clock-rotate-left text-8xl text-white"></i>
                </div>
                
                <div className="relative z-10">
                  <span className="bg-ramadan-gold text-black text-xs font-bold px-3 py-1 rounded-full font-tajawal mb-4 inline-block">
                    حدث في مثل هذا اليوم
                  </span>
                  
                  <h2 className="text-2xl font-amiri text-white mb-4 leading-normal">
                    {event.title}
                  </h2>
                  
                  <p className="text-gray-300 font-tajawal leading-loose text-justify text-sm">
                    {event.event}
                  </p>
                </div>
              </div>
            )}

            {/* Islamic Story */}
            {story && (
              <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0a1128] rounded-2xl p-6 border border-indigo-500/20 shadow-xl relative overflow-hidden group hover:border-indigo-400/40 transition-all duration-500 h-full">
                <div className="absolute bottom-0 left-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <i className="fa-solid fa-book-open text-8xl text-indigo-300"></i>
                </div>
                
                <div className="relative z-10">
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full font-tajawal mb-4 inline-block">
                    قصة وعبرة
                  </span>
                  
                  <h2 className="text-2xl font-amiri text-white mb-4 leading-normal">
                    {story.title}
                  </h2>
                  
                  <p className="text-gray-300 font-tajawal leading-loose text-justify text-sm">
                    {story.content}
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
