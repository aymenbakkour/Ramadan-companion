import { useState } from 'react';
import { clsx } from 'clsx';

type Currency = 'EUR' | 'SYP';

export default function Zakat() {
  const [activeTab, setActiveTab] = useState<'info' | 'calc'>('info');
  const [currency, setCurrency] = useState<Currency>('EUR');
  
  // Calculator State
  const [cash, setCash] = useState<number | ''>('');
  const [gold, setGold] = useState<number | ''>('');
  const [silver, setSilver] = useState<number | ''>('');
  const [assets, setAssets] = useState<number | ''>('');
  const [debts, setDebts] = useState<number | ''>('');
  
  // Prices per GRAM
  const [goldPrice, setGoldPrice] = useState<number | ''>(''); 
  const [silverPrice, setSilverPrice] = useState<number | ''>('');
  
  const calculateZakat = () => {
    const totalCash = Number(cash) || 0;
    const gPrice = Number(goldPrice) || 0;
    const sPrice = Number(silverPrice) || 0;
    
    const totalGold = (Number(gold) || 0) * gPrice;
    const totalSilver = (Number(silver) || 0) * sPrice;
    const totalAssets = Number(assets) || 0;
    const totalDebts = Number(debts) || 0;

    const netAssets = (totalCash + totalGold + totalSilver + totalAssets) - totalDebts;
    // Nisab is value of 85g Gold
    const nisabGold = 85 * gPrice;
    
    return {
      netAssets,
      zakatAmount: netAssets >= nisabGold ? netAssets * 0.025 : 0,
      isEligible: netAssets >= nisabGold && nisabGold > 0,
      nisab: nisabGold
    };
  };

  const result = calculateZakat();
  const currencySymbol = currency === 'EUR' ? '€' : 'ل.س';

  return (
    <div className="p-6 max-w-4xl mx-auto animate__animated animate__fadeIn">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-amiri text-ramadan-gold mb-4">الزكاة</h1>
        <p className="text-gray-300 font-tajawal">ركن الإسلام الثالث، طهرة للمال وتزكية للنفس</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 bg-white/5 p-1 rounded-xl w-fit mx-auto">
        <button
          onClick={() => setActiveTab('info')}
          className={clsx(
            "px-6 py-2 rounded-lg font-tajawal transition-all",
            activeTab === 'info' ? "bg-ramadan-gold text-ramadan-dark font-bold" : "text-gray-400 hover:text-white"
          )}
        >
          <i className="fa-solid fa-book-open ml-2"></i>
          أحكام الزكاة
        </button>
        <button
          onClick={() => setActiveTab('calc')}
          className={clsx(
            "px-6 py-2 rounded-lg font-tajawal transition-all",
            activeTab === 'calc' ? "bg-ramadan-gold text-ramadan-dark font-bold" : "text-gray-400 hover:text-white"
          )}
        >
          <i className="fa-solid fa-calculator ml-2"></i>
          حاسبة الزكاة
        </button>
      </div>

      {activeTab === 'info' ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-ramadan-accent/30 p-6 rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400">
              <i className="fa-solid fa-hand-holding-dollar text-2xl"></i>
            </div>
            <h3 className="text-2xl font-amiri text-white mb-3">ما هي الزكاة؟</h3>
            <p className="text-gray-300 font-tajawal leading-relaxed">
              الزكاة هي حق واجب في مال خاص، لطائفة مخصوصة، في وقت مخصوص. وهي الركن الثالث من أركان الإسلام، قرنها الله بالصلاة في مواضع كثيرة في القرآن الكريم.
            </p>
          </div>

          <div className="bg-ramadan-accent/30 p-6 rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 text-amber-400">
              <i className="fa-solid fa-scale-balanced text-2xl"></i>
            </div>
            <h3 className="text-2xl font-amiri text-white mb-3">شروط وجوبها</h3>
            <ul className="text-gray-300 font-tajawal space-y-2 list-disc list-inside">
              <li>الإسلام: فلا تجب على الكافر.</li>
              <li>الحرية: فلا تجب على العبد.</li>
              <li>الملك التام: أن يكون المال مملوكاً لصاحبه ملكاً تاماً.</li>
              <li>النصاب: بلوغ المال حداً معيناً (85 جرام ذهب).</li>
              <li>حولان الحول: مرور سنة هجرية كاملة على امتلاك النصاب.</li>
            </ul>
          </div>

          <div className="bg-ramadan-accent/30 p-6 rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400">
              <i className="fa-solid fa-users text-2xl"></i>
            </div>
            <h3 className="text-2xl font-amiri text-white mb-3">مصارف الزكاة</h3>
            <p className="text-gray-300 font-tajawal mb-2">حددت الآية 60 من سورة التوبة المستحقين للزكاة في ثمانية أصناف:</p>
            <div className="flex flex-wrap gap-2">
              {['الفقراء', 'المساكين', 'العاملين عليها', 'المؤلفة قلوبهم', 'في الرقاب', 'الغارمين', 'في سبيل الله', 'ابن السبيل'].map(item => (
                <span key={item} className="bg-white/5 px-3 py-1 rounded-full text-xs text-gray-300 border border-white/10">{item}</span>
              ))}
            </div>
          </div>

          <div className="bg-ramadan-accent/30 p-6 rounded-2xl border border-white/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400">
              <i className="fa-solid fa-wheat-awn text-2xl"></i>
            </div>
            <h3 className="text-2xl font-amiri text-white mb-3">زكاة الفطر</h3>
            <p className="text-gray-300 font-tajawal leading-relaxed">
              واجبة على كل مسلم، صغيراً أو كبيراً، ذكراً أو أنثى. تخرج صاعاً من طعام (أرز، تمر، قمح) أو قيمتها نقداً (حسب الفتوى). وقتها: من غروب شمس آخر يوم رمضان إلى قبيل صلاة العيد.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-ramadan-accent/20 p-6 md:p-8 rounded-3xl border border-white/10">
          {/* Currency Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/40 p-1 rounded-lg flex gap-1">
              <button
                onClick={() => setCurrency('EUR')}
                className={clsx(
                  "px-4 py-1.5 rounded-md text-sm font-tajawal transition-colors",
                  currency === 'EUR' ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-200"
                )}
              >
                يورو (€)
              </button>
              <button
                onClick={() => setCurrency('SYP')}
                className={clsx(
                  "px-4 py-1.5 rounded-md text-sm font-tajawal transition-colors",
                  currency === 'SYP' ? "bg-green-600 text-white" : "text-gray-400 hover:text-gray-200"
                )}
              >
                ليرة سورية (ل.س)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                 <h3 className="text-2xl font-amiri text-white">أدخل ممتلكاتك</h3>
              </div>
              
              <div>
                <label className="block text-gray-400 font-tajawal text-sm mb-2">النقد (رصيد البنك + السيولة)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={cash}
                    onChange={(e) => setCash(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-ramadan-gold focus:outline-none transition-colors pl-12"
                    placeholder="0"
                  />
                  <span className="absolute left-4 top-3 text-gray-500">{currencySymbol}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-tajawal text-sm mb-2">الذهب (جرام)</label>
                  <input
                    type="number"
                    value={gold}
                    onChange={(e) => setGold(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-ramadan-gold focus:outline-none transition-colors"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-tajawal text-sm mb-2">سعر جرام الذهب</label>
                  <input
                    type="number"
                    value={goldPrice}
                    onChange={(e) => setGoldPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-gray-300 focus:border-ramadan-gold focus:outline-none transition-colors text-sm"
                    placeholder="أدخل السعر يدوياً"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 font-tajawal text-sm mb-2">الفضة (جرام)</label>
                  <input
                    type="number"
                    value={silver}
                    onChange={(e) => setSilver(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-ramadan-gold focus:outline-none transition-colors"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-tajawal text-sm mb-2">سعر جرام الفضة</label>
                  <input
                    type="number"
                    value={silverPrice}
                    onChange={(e) => setSilverPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-gray-300 focus:border-ramadan-gold focus:outline-none transition-colors text-sm"
                    placeholder="أدخل السعر يدوياً"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-tajawal text-sm mb-2">عروض التجارة (قيمة البضائع)</label>
                <input
                  type="number"
                  value={assets}
                  onChange={(e) => setAssets(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-ramadan-gold focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-tajawal text-sm mb-2">الديون (التي عليك)</label>
                <input
                  type="number"
                  value={debts}
                  onChange={(e) => setDebts(e.target.value ? Number(e.target.value) : '')}
                  className="w-full bg-black/20 border border-red-500/20 rounded-xl p-3 text-white focus:border-red-500/50 focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-white/5">
              <div className="mb-8 w-full">
                <p className="text-gray-400 font-tajawal text-sm mb-1">إجمالي الأصول الصافية</p>
                <p className="text-3xl font-mono text-white">{result.netAssets.toLocaleString()} {currencySymbol}</p>
              </div>

              <div className="mb-8 w-full">
                <p className="text-gray-400 font-tajawal text-sm mb-1">قيمة النصاب (85 جرام ذهب)</p>
                <p className="text-xl font-mono text-gray-500">{result.nisab.toLocaleString()} {currencySymbol}</p>
              </div>

              <div className={clsx(
                "w-full p-6 rounded-xl border-2 transition-all",
                result.isEligible 
                  ? "bg-green-500/10 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]" 
                  : "bg-white/5 border-white/10"
              )}>
                <p className="text-gray-300 font-tajawal mb-2">
                  {result.isEligible ? "الزكاة الواجبة عليك" : "لم تبلغ النصاب"}
                </p>
                <p className={clsx(
                  "text-4xl font-bold font-mono",
                  result.isEligible ? "text-green-400" : "text-gray-500"
                )}>
                  {result.zakatAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {currencySymbol}
                </p>
                {result.isEligible && (
                  <p className="text-xs text-green-300/70 mt-2 font-tajawal">
                    (2.5% من إجمالي المال)
                  </p>
                )}
              </div>
              
              <p className="text-xs text-gray-500 mt-6 font-tajawal max-w-xs">
                * يرجى إدخال أسعار الذهب والفضة يدوياً حسب السعر المحلي اليومي لضمان الدقة.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
