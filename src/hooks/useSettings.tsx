import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AppSettings {
  ramadanStartDate: string | null;
  eidDate: string | null;
  language: 'ar' | 'de';
  theme: 'dark' | 'light';
  location: {
    city: string;
    country: string;
  };
}

const DEFAULT_SETTINGS: AppSettings = {
  ramadanStartDate: null,
  eidDate: null,
  language: 'ar',
  theme: 'dark',
  location: { city: 'Gera', country: 'Germany' }
};

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  updateLocation: (city: string, country: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    const stored = localStorage.getItem('appSettings');
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    // Apply Theme
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Apply Language (Direction)
    root.dir = settings.language === 'ar' ? 'rtl' : 'ltr';
    root.lang = settings.language;

  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateLocation = (city: string, country: string) => {
    setSettings(prev => ({ ...prev, location: { city, country } }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateLocation }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
