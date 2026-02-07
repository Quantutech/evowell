import { SessionFormat, AppointmentType } from '../../data/types/enums';

export interface SearchFilters {
  specialty?: string;
  query?: string;
  state?: string;
  format?: SessionFormat;
  appointmentTypes?: AppointmentType[];
  gender?: string;
  language?: string;
  maxPrice?: number;
  agesServed?: string[];
  day?: string;
  evowellEndorsedOnly?: boolean;
  sortBy?: 'relevance' | 'endorsements' | 'price_low' | 'price_high' | 'experience' | 'name_asc';
  limit?: number;
  offset?: number;
}
