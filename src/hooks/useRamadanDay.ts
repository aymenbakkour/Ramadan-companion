import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

export function useRamadanDay() {
  const [day, setDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHijriDate = async () => {
      try {
        const date = format(new Date(), 'dd-MM-yyyy');
        const response = await axios.get(`https://api.aladhan.com/v1/gToH?date=${date}`);
        const hijri = response.data.data.hijri;
        
        const month = hijri.month.number;
        const dayNum = parseInt(hijri.day);

        if (month === 9) {
          setDay(dayNum);
        } else if (month === 10 && dayNum === 1) {
          setDay(100); // Eid
        } else if (month < 9) {
          setDay(-1); // Before Ramadan
        } else {
          setDay(31); // After Ramadan
        }
      } catch (err) {
        console.error('Failed to fetch Hijri date:', err);
        setError('Failed to fetch date');
        // Fallback to local calculation if API fails
        // We can import the local calculation function here if we export it, 
        // or just leave it null/error. 
        // For robustness, let's just set a fallback based on local calculation?
        // For now, let's just leave it as is or handle in UI.
      } finally {
        setLoading(false);
      }
    };

    fetchHijriDate();
  }, []);

  return { day, loading, error };
}
