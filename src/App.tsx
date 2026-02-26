import { useState, useEffect } from 'react';
import Home from './components/Home';
import Quran from './components/Quran';
import Khatma from './components/Khatma';
import PrayerTimes from './components/PrayerTimes';
import Tasbih from './components/Tasbih';
import Zakat from './components/Zakat';
import About from './components/About';
import Settings from './components/Settings';
import { clsx } from 'clsx';
import { useSettings } from './hooks/useSettings';
import { translations } from './lib/translations';
import { format } from 'date-fns';
import { ar, de } from 'date-fns/locale';
import MaghribNotification from './components/MaghribNotification';
import AdBanner from './components/AdBanner';
import PopupAdModal from './components/PopupAdModal';

type Tab = 'home' | 'quran' | 'khatma' | 'prayer' | 'tasbih' | 'zakat' | 'settings' | 'about';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { settings } = useSettings();
  const t = translations[settings.language];
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'quran': return <Quran />;
      case 'khatma': return <Khatma />;
      case 'prayer': return <PrayerTimes />;
      case 'tasbih': return <Tasbih />;
      case 'zakat': return <Zakat />;
      case 'settings': return <Settings />;
      case 'about': return <About />;
      default: return <Home />;
    }
  };

  const NavItem = ({ id, icon, label }: { id: Tab, icon: string, label: string }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsSidebarOpen(false);
      }}
      className={clsx(
        "w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 border-r-4",
        activeTab === id 
          ? "bg-black/5 dark:bg-white/5 border-ramadan-gold text-gray-900 dark:text-white" 
          : "border-transparent text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
      )}
    >
      <i className={`fa-solid ${icon} w-6 text-center text-xl ${activeTab === id ? 'text-ramadan-gold' : ''}`}></i>
      <span className="font-tajawal font-medium text-lg">{label}</span>
    </button>
  );

  return (
    <div className={clsx("min-h-screen flex overflow-hidden transition-colors duration-300", "bg-gray-100 dark:bg-ramadan-dark text-gray-900 dark:text-white")} dir={settings.language === 'ar' ? 'rtl' : 'ltr'}>
      <MaghribNotification />
      <PopupAdModal />
      {/* Mobile Header */}
      <div className={clsx("md:hidden fixed top-0 w-full backdrop-blur-md z-50 p-4 border-b flex justify-between items-center", "bg-white/90 dark:bg-ramadan-dark/90 border-gray-200 dark:border-white/5")}>
        <h1 className="text-xl font-amiri text-ramadan-gold">مرافق رمضان</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-900 dark:text-white">
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={clsx(
        "fixed md:relative z-50 w-72 h-full shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
        "bg-white dark:bg-[#030712] border-gray-200 dark:border-white/5",
        settings.language === 'ar' ? 'border-l' : 'border-r',
        isSidebarOpen ? "translate-x-0" : (settings.language === 'ar' ? "translate-x-full md:translate-x-0" : "-translate-x-full md:translate-x-0"),
        settings.language === 'ar' ? "right-0" : "left-0"
      )}>
        <div className={clsx("p-8 text-center border-b", "border-gray-200 dark:border-white/5")}>
          <div className="w-16 h-16 bg-ramadan-gold rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            <i className="fa-solid fa-moon text-3xl text-ramadan-dark"></i>
          </div>
          <h1 className="text-2xl font-amiri font-bold text-gray-900 dark:text-white">مرافق رمضان</h1>
          
          {/* Live Date & Time */}
          <div className="mt-4 space-y-1">
            <p className="text-lg font-mono font-bold text-ramadan-gold">
              {format(currentTime, 'HH:mm:ss')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-tajawal">
              {format(currentTime, 'EEEE d MMMM yyyy', { locale: settings.language === 'ar' ? ar : de })}
            </p>
          </div>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto">
          <NavItem id="home" icon="fa-home" label={t.home} />
          <NavItem id="quran" icon="fa-book-quran" label={t.quran} />
          <NavItem id="khatma" icon="fa-calendar-check" label={t.khatma} />
          <NavItem id="prayer" icon="fa-mosque" label={t.prayer} />
          <NavItem id="tasbih" icon="fa-hands-praying" label={t.tasbih} />
          <NavItem id="zakat" icon="fa-hand-holding-dollar" label={t.zakat} />
          <NavItem id="settings" icon="fa-gear" label={t.settings} />
          <NavItem id="about" icon="fa-user" label={t.about} />
        </nav>

        <div className={clsx("p-6 border-t text-center", "border-gray-200 dark:border-white/5")}>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-tajawal">{t.developedBy}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative scroll-smooth pt-20 md:pt-0">
        <div className="max-w-5xl mx-auto min-h-full flex flex-col">
           <div className="flex-1">
             {renderContent()}
           </div>
           <AdBanner />
        </div>
      </main>
    </div>
  );
}
