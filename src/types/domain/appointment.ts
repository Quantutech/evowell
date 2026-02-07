import { AppointmentStatus, AppointmentType } from '../../data/types/enums';

export interface Appointment {
  id: string;
  providerId: string;
  clientId: string;
  dateTime: string;
  durationMinutes: number;
  status: AppointmentStatus;
  type?: AppointmentType;
  providerTimezone?: string;
  clientTimezone?: string;
  servicePackageId?: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'exempted';
  paymentIntentId?: string;
  amountCents?: number;
  amount?: number;
  currency?: string;
  notes?: string;
  meetingLink?: string;
  createdAt?: string;
  client?: {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl?: string;
  };
  provider?: {
    professionalTitle: string;
    imageUrl?: string;
  };
}

export interface AvailabilitySlot {
  start: Date;
  end: Date;
  available: boolean;
}
