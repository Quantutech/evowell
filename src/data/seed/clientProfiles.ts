import { ClientProfile, WellnessEntry, Habit } from '../../types';
import { CLIENT_ID_1 } from './constants';

const MOCK_WELLNESS_LOG: WellnessEntry[] = [
  { id: 'w1', date: '2026-02-01', mood: 4, energy: 3, sleepHours: 7, notes: 'Felt a bit anxious in the morning.' },
  { id: 'w2', date: '2026-02-02', mood: 5, energy: 4, sleepHours: 8, notes: 'Great sleep, productive day.' },
  { id: 'w3', date: '2026-02-03', mood: 3, energy: 2, sleepHours: 6, notes: 'Stressful meeting today.' },
  { id: 'w4', date: '2026-02-04', mood: 4, energy: 5, sleepHours: 7.5 },
  { id: 'w5', date: '2026-02-05', mood: 5, energy: 4, sleepHours: 8 },
  { id: 'w6', date: '2026-02-06', mood: 4, energy: 4, sleepHours: 7 },
];

const MOCK_HABITS: Habit[] = [
  { id: 'h1', name: 'Water Intake', target: 8, current: 6, unit: 'glasses', color: '#3b82f6' },
  { id: 'h2', name: 'Exercise', target: 30, current: 45, unit: 'mins', color: '#10b981' },
  { id: 'h3', name: 'Meditation', target: 10, current: 5, unit: 'mins', color: '#8b5cf6' },
  { id: 'h4', name: 'Reading', target: 20, current: 15, unit: 'pages', color: '#f59e0b' },
];

export const clientProfiles: ClientProfile[] = [
  {
    id: `cp-${CLIENT_ID_1}`,
    userId: CLIENT_ID_1,
    intakeStatus: 'COMPLETED',
    documents: [],
    bio: 'Looking for holistic wellness strategies.',
    dateOfBirth: '1992-05-15',
    gender: 'Female',
    pronouns: 'She/Her',
    wellnessLog: MOCK_WELLNESS_LOG,
    habits: MOCK_HABITS,
    preferences: { communication: 'email', language: 'English' },
    createdAt: '2023-06-01T12:00:00Z',
    updatedAt: '2023-06-01T12:00:00Z'
  }
];
