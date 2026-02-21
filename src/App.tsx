import { useState } from 'react';
import Home from './components/Home';
import Quran from './components/Quran';
import Khatma from './components/Khatma';
import PrayerTimes from './components/PrayerTimes';
import Tasbih from './components/Tasbih';
import Zakat from './components/Zakat';
import About from './components/About';
import { clsx } from 'clsx';

type Tab = 'home' | 'quran' | 'khatma' | 'prayer' | 'tasbih' | 'zakat' | 'about';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home />;
      case 'quran': return <Quran />;
      case 'khatma': return <Khatma />;
      case 'prayer': return <PrayerTimes />;
      case 'tasbih': return <Tasbih />;
      case 'zakat': return <Zakat />;
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
          ? "bg-white/5 border-ramadan-gold text-white" 
          : "border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200"
      )}
    >
      <i className={`fa-solid ${icon} w-6 text-center text-xl ${activeTab === id ? 'text-ramadan-gold' : ''}`}></i>
      <span className="font-tajawal font-medium text-lg">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-ramadan-dark text-white flex overflow-hidden" dir="rtl">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-ramadan-dark/90 backdrop-blur-md z-50 p-4 border-b border-white/5 flex justify-between items-center">
        <h1 className="text-xl font-amiri text-ramadan-gold">مرافق رمضان</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white p-2">
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
        "fixed md:relative z-50 w-72 h-full bg-[#030712] border-l border-white/5 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
        isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        "right-0" // Fixed to right for mobile, relative for desktop handled by flex
      )}>
        <div className="p-8 text-center border-b border-white/5">
          <div className="w-16 h-16 bg-ramadan-gold rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            <i className="fa-solid fa-moon text-3xl text-ramadan-dark"></i>
          </div>
          <h1 className="text-2xl font-amiri font-bold text-white">مرافق رمضان</h1>
          <p className="text-xs text-gray-500 font-mono mt-2">1447 AH</p>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto">
          <NavItem id="home" icon="fa-home" label="الرئيسية" />
          <NavItem id="quran" icon="fa-book-quran" label="ورد القرآن" />
          <NavItem id="khatma" icon="fa-calendar-check" label="سجل الختمة" />
          <NavItem id="prayer" icon="fa-mosque" label="مواقيت الصلاة" />
          <NavItem id="tasbih" icon="fa-hands-praying" label="السبحة" />
          <NavItem id="zakat" icon="fa-hand-holding-dollar" label="الزكاة" />
          <NavItem id="about" icon="fa-user" label="عن المطور" />
        </nav>

        <div className="p-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600 font-tajawal">برمجة: أيمن بكور</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative scroll-smooth pt-20 md:pt-0">
        <div className="max-w-5xl mx-auto min-h-full">
           {renderContent()}
        </div>
      </main>
    </div>
  );
}
