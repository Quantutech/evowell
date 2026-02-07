import { Specialty } from '../../types';
import { SPECIALTY_ANXIETY, SPECIALTY_DEPRESSION, SPECIALTY_TRAUMA, SPECIALTY_NUTRITION, SPECIALTY_ADHD, SPECIALTY_RELATIONSHIPS, SPECIALTY_SLEEP, SPECIALTY_PERFORMANCE } from './constants';

export const specialties: Specialty[] = [
  { id: SPECIALTY_ANXIETY, name: 'Anxiety & Panic Disorders', slug: 'anxiety' },
  { id: SPECIALTY_DEPRESSION, name: 'Depression & Mood', slug: 'depression' },
  { id: SPECIALTY_TRAUMA, name: 'Trauma & PTSD', slug: 'trauma' },
  { id: SPECIALTY_NUTRITION, name: 'Integrative Nutrition', slug: 'nutrition' },
  { id: SPECIALTY_ADHD, name: 'ADHD & Neurodivergence', slug: 'adhd' },
  { id: SPECIALTY_RELATIONSHIPS, name: 'Couples & Relationships', slug: 'relationships' },
  { id: SPECIALTY_SLEEP, name: 'Sleep Medicine', slug: 'sleep' },
  { id: SPECIALTY_PERFORMANCE, name: 'Peak Performance', slug: 'performance' }
];
