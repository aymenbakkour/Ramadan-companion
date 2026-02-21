import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface HijriDate {
  day: string;
  month: { en: string; ar: string };
  year: string;
  weekday: { en: string; ar: string };
}

const locations: Record<string, string[]> = {
  "Syria": ["Damascus", "Aleppo", "Homs", "Latakia", "Hama", "Deir ez-Zor"],
  "Germany": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Gera", "Cologne", "Stuttgart"],
  "Saudi Arabia": ["Makkah", "Madinah", "Riyadh", "Jeddah", "Dammam", "Khobar"],
  "Egypt": ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan", "Sharm El Sheikh"],
  "Turkey": ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
  "UAE": ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  "Jordan": ["Amman", "Zarqa", "Irbid", "Aqaba"],
  "Palestine": ["Jerusalem", "Gaza", "Hebron", "Nablus", "Ramallah", "Bethlehem"],
  "Iraq": ["Baghdad", "Basra", "Mosul", "Erbil", "Najaf"],
  "Kuwait": ["Kuwait City", "Al Ahmadi", "Hawalli"],
  "Qatar": ["Doha", "Al Rayyan", "Al Wakrah"],
  "Bahrain": ["Manama", "Riffa", "Muharraq"],
  "Oman": ["Muscat", "Salalah", "Sohar"],
  "Lebanon": ["Beirut", "Tripoli", "Sidon"],
  "Morocco": ["Casablanca", "Rabat", "Fes", "Marrakesh", "Tangier"],
  "Algeria": ["Algiers", "Oran", "Constantine"],
  "Tunisia": ["Tunis", "Sfax", "Sousse"],
  "Libya": ["Tripoli", "Benghazi", "Misrata"],
  "Sudan": ["Khartoum", "Omdurman", "Port Sudan"],
  "Yemen": ["Sanaa", "Aden", "Taiz"],
  "France": ["Paris", "Marseille", "Lyon"],
  "UK": ["London", "Manchester", "Birmingham", "Glasgow"],
  "USA": ["New York", "Los Angeles", "Chicago", "Houston", "Washington"],
  "Canada": ["Toronto", "Montreal", "Vancouver", "Ottawa"],
  "Malaysia": ["Kuala Lumpur", "George Town", "Johor Bahru"],
  "Indonesia": ["Jakarta", "Surabaya", "Bandung"],
  "Netherlands": ["Amsterdam", "Rotterdam", "The Hague"],
  "Sweden": ["Stockholm", "Gothenburg", "Malmo"],
  "Austria": ["Vienna", "Graz", "Linz"],
  "Belgium": ["Brussels", "Antwerp", "Ghent"]
};

export default function PrayerTimes() {
  const [timings, setTimings] = useState<Timings | null>(null);
  const [hijri, setHijri] = useState<HijriDate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextPrayer, setNextPrayer] = useState<{name: string, time: string} | null>(null);
  
  // Location State
  const [city, setCity] = useState(() => localStorage.getItem('prayerCity') || 'Gera');
  const [country, setCountry] = useState(() => localStorage.getItem('prayerCountry') || 'Germany');
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [tempCity, setTempCity] = useState(city);
  const [tempCountry, setTempCountry] = useState(country);

  // Update tempCity when tempCountry changes
  useEffect(() => {
    if (isEditingLocation) {
      const cities = locations[tempCountry] || [];
      if (cities.length > 0 && !cities.includes(tempCity)) {
        setTempCity(cities[0]);
      }
    }
  }, [tempCountry]);

  useEffect(() => {
    fetchTimes();
  }, [city, country]);

  const fetchTimes = async () => {
    setLoading(true);
    setError('');
    try {
      const date = new Date();
      const response = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: {
          city: city,
          country: country,
          method: 2, // ISNA
          date: format(date, 'dd-MM-yyyy')
        }
      });
      
      setTimings(response.data.data.timings);
      setHijri(response.data.data.date.hijri);
      setLoading(false);
    } catch (err) {
      setError('تعذر جلب مواقيت الصلاة، يرجى التأكد من اسم المدينة والدولة.');
      setLoading(false);
    }
  };

  const handleSaveLocation = () => {
    if (tempCity && tempCountry) {
      setCity(tempCity);
      setCountry(tempCountry);
      localStorage.setItem('prayerCity', tempCity);
      localStorage.setItem('prayerCountry', tempCountry);
      setIsEditingLocation(false);
    }
  };

  useEffect(() => {
    if (!timings) return;
    
    // Simple logic to find next prayer
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayerMinutes = Object.entries(timings).map(([name, time]) => {
      const [h, m] = (time as string).split(':').map(Number);
      return { name, minutes: h * 60 + m, time: time as string };
    }).sort((a, b) => a.minutes - b.minutes);

    const next = prayerMinutes.find(p => p.minutes > currentTime);
    if (next) {
      setNextPrayer({ name: translatePrayer(next.name), time: next.time });
    } else {
      // Next is Fajr tomorrow
      setNextPrayer({ name: 'الفجر', time: timings.Fajr });
    }

  }, [timings]);

  const translatePrayer = (name: string) => {
    const map: Record<string, string> = {
      Fajr: 'الفجر',
      Sunrise: 'الشروق',
      Dhuhr: 'الظهر',
      Asr: 'العصر',
      Maghrib: 'المغرب',
      Isha: 'العشاء'
    };
    return map[name] || name;
  };

  return (
    <div className="p-6 animate__animated animate__fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-amiri text-ramadan-gold mb-2">مواقيت الصلاة</h2>
        
        {isEditingLocation ? (
          <div className="flex flex-col items-center gap-2 mt-2 animate__animated animate__fadeIn">
            <div className="flex gap-2">
              <select 
                value={tempCountry}
                onChange={(e) => setTempCountry(e.target.value)}
                className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm w-32 focus:outline-none focus:border-ramadan-gold text-white [&>option]:text-black"
              >
                {Object.keys(locations).sort().map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              
              <select 
                value={tempCity}
                onChange={(e) => setTempCity(e.target.value)}
                className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm w-32 focus:outline-none focus:border-ramadan-gold text-white [&>option]:text-black"
              >
                {(locations[tempCountry] || []).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSaveLocation} className="text-xs bg-ramadan-gold text-black px-3 py-1 rounded hover:bg-yellow-400">حفظ</button>
              <button onClick={() => setIsEditingLocation(false)} className="text-xs bg-white/10 text-white px-3 py-1 rounded hover:bg-white/20">إلغاء</button>
            </div>
          </div>
        ) : (
          <div className="group relative inline-block cursor-pointer" onClick={() => {
             setTempCountry(country);
             setTempCity(city);
             setIsEditingLocation(true);
          }}>
            <p className="text-gray-400 font-tajawal text-sm border-b border-dashed border-gray-600 hover:border-ramadan-gold hover:text-ramadan-gold transition-colors pb-0.5">
              {city}, {country} <i className="fa-solid fa-pen-to-square text-xs ml-1 opacity-50 group-hover:opacity-100"></i>
            </p>
          </div>
        )}
        
        <div className="mt-4 bg-ramadan-accent/30 inline-block px-6 py-2 rounded-full border border-white/5">
          <span className="text-lg font-amiri text-white mx-2">
            {hijri?.day} {hijri?.month.ar} {hijri?.year}
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-lg font-tajawal text-gray-300 mx-2">
            {format(new Date(), 'EEEE d MMMM', { locale: ar })}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64"><i className="fa-solid fa-circle-notch fa-spin text-3xl text-ramadan-gold"></i></div>
      ) : error ? (
        <div className="text-center text-red-400 p-6 bg-red-500/10 rounded-xl border border-red-500/20">
          <i className="fa-solid fa-triangle-exclamation text-2xl mb-2 block"></i>
          {error}
          <button onClick={() => setIsEditingLocation(true)} className="block mx-auto mt-4 text-sm text-white underline">تغيير الموقع</button>
        </div>
      ) : (
        <>
          {nextPrayer && (
            <div className="mb-8 bg-gradient-to-r from-ramadan-gold/20 to-transparent p-4 rounded-xl border-r-4 border-ramadan-gold">
              <p className="text-sm text-gray-300 mb-1">الصلاة القادمة</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{nextPrayer.name}</span>
                <span className="text-xl text-ramadan-gold font-mono">{nextPrayer.time}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {timings && ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer) => (
              <div key={prayer} className="bg-ramadan-accent/40 p-4 rounded-xl border border-white/5 hover:border-ramadan-gold/30 transition-colors text-center group">
                <div className="mb-2 text-gray-400 group-hover:text-ramadan-gold transition-colors">
                  <i className={`fa-solid ${getPrayerIcon(prayer)} text-xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{translatePrayer(prayer)}</h3>
                <p className="text-2xl font-mono text-gray-300">{timings[prayer as keyof Timings]}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function getPrayerIcon(prayer: string) {
  switch(prayer) {
    case 'Fajr': return 'fa-cloud-sun';
    case 'Sunrise': return 'fa-sun';
    case 'Dhuhr': return 'fa-sun'; // High noon
    case 'Asr': return 'fa-cloud-sun'; // Afternoon
    case 'Maghrib': return 'fa-moon'; // Sunset
    case 'Isha': return 'fa-star'; // Night
    default: return 'fa-clock';
  }
}
