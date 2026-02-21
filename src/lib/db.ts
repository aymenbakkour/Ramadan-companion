import Dexie, { type EntityTable } from 'dexie';

interface KhatmaDay {
  day: number;
  completed: boolean;
  date: string;
}

interface TasbihState {
  id: number;
  count: number;
}

const db = new Dexie('Ramadan2026DB') as Dexie & {
  khatma: EntityTable<KhatmaDay, 'day'>;
  tasbih: EntityTable<TasbihState, 'id'>;
};

db.version(1).stores({
  khatma: 'day, completed, date',
  tasbih: 'id, count'
});

export { db };
