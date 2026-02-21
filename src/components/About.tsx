export default function About() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 animate__animated animate__fadeIn">
      <div className="bg-ramadan-accent/30 p-10 rounded-3xl border border-white/10 max-w-md w-full text-center backdrop-blur-sm">
        <div className="w-24 h-24 bg-ramadan-gold rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-ramadan-gold/20">
          <i className="fa-solid fa-code text-4xl text-ramadan-dark"></i>
        </div>
        
        <h2 className="text-3xl font-amiri text-white mb-2">أيمن بكور</h2>
        <p className="text-ramadan-gold font-tajawal text-sm mb-8 tracking-widest uppercase">مطور برمجيات</p>
        
        <p className="text-gray-300 font-tajawal leading-relaxed mb-8">
          تم تطوير هذا التطبيق ليكون رفيقاً روحانياً في شهر رمضان المبارك،
          سائلاً المولى عز وجل أن يتقبل منا ومنكم صالح الأعمال.
        </p>
        
        <div className="flex justify-center gap-4">
          <a href="https://www.behance.net/aymenbakkour" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white">
            <i className="fa-brands fa-behance"></i>
          </a>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-gray-500 font-mono">v1.0.0 • Ramadan 2026</p>
        </div>
      </div>
    </div>
  );
}
