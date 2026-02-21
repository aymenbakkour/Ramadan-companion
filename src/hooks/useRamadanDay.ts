import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, differenceInDays, startOfDay } from 'date-fns';
import { useSettings } from './useSettings';

export function useRamadanDay() {
  const [day, setDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { settings } = useSettings();

  useEffect(() => {
    const calculateDay = async () => {
      setLoading(true);
      
      // 1. Check if manual start date is set in settings
      if (settings.ramadanStartDate) {
        const start = startOfDay(new Date(settings.ramadanStartDate));
        const today = startOfDay(new Date());
        const diff = differenceInDays(today, start);
        
        // If diff is negative, it's before Ramadan
        if (diff < 0) {
           setDay(diff); // Negative value indicates days before
        } else if (diff >= 0 && diff < 30) {
           setDay(diff + 1); // Day 1 to 30
        } else {
           // Check if it's Eid (Day 31 or set manually)
           if (settings.eidDate) {
             const eid = startOfDay(new Date(settings.eidDate));
             const diffEid = differenceInDays(today, eid);
             if (diffEid === 0) {
               setDay(100); // Eid Code
             } else if (diffEid > 0) {
               setDay(31 + diffEid); // Days after Eid
             } else {
               setDay(30); // Still Ramadan? Or just after 30 days
             }
           } else {
             // Default Eid is after 30 days
             if (diff === 30) setDay(100);
             else setDay(31);
           }
        }
        setLoading(false);
        return;
      }

      // 2. Fallback to API if no manual date
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
        setDay(1); // Default fallback
      } finally {
        setLoading(false);
      }
    };

    calculateDay();
  }, [settings.ramadanStartDate, settings.eidDate]);

  return { day, loading, error };
}
