export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  lat?: number;
  lng?: number;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface DaySchedule {
  day: string;
  active: boolean;
  timeRanges: TimeRange[];
}

export interface Availability {
  days: string[];
  hours: string[];
  schedule: DaySchedule[];
  blockedDates: string[];
  timezone?: string;
}

export interface MediaItem {
  id: string;
  type: 'video' | 'audio' | 'link';
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

export interface Education {
  degree: string;
  university: string;
  year: string;
}

export interface License {
  state: string;
  number: string;
  verified: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  imageUrl: string;
  page: 'home' | 'partners';
}
