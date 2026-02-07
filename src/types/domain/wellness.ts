export interface WellnessEntry {
  id: string;
  date: string;
  mood: number; // 1-5
  energy: number; // 1-5
  sleepHours: number;
  notes?: string;
}

export interface Habit {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  color: string;
}
