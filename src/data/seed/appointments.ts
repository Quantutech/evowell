import { Appointment, AppointmentStatus, AppointmentType } from '../../types';
import { PROV_ID_1, PROV_ID_2, PROV_ID_3, CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3 } from './constants';

export const appointments: Appointment[] = [
  {
    id: 'appt-1',
    providerId: `prov-${PROV_ID_1}`,
    clientId: CLIENT_ID_1,
    dateTime: '2026-03-15T09:00:00',
    status: AppointmentStatus.CONFIRMED,
    type: AppointmentType.VIDEO,
    paymentStatus: 'paid',
    durationMinutes: 60
  },
  {
    id: 'appt-2',
    providerId: `prov-${PROV_ID_1}`,
    clientId: CLIENT_ID_1,
    dateTime: '2026-02-01T09:00:00', // Past
    status: AppointmentStatus.COMPLETED,
    type: AppointmentType.IN_PERSON,
    paymentStatus: 'paid',
    durationMinutes: 60
  },
  {
    id: 'appt-3',
    providerId: `prov-${PROV_ID_2}`,
    clientId: CLIENT_ID_2,
    dateTime: '2026-03-20T14:00:00',
    status: AppointmentStatus.PENDING,
    type: AppointmentType.VIDEO,
    paymentStatus: 'pending',
    durationMinutes: 60
  },
  {
    id: 'appt-4',
    providerId: `prov-${PROV_ID_3}`,
    clientId: CLIENT_ID_3,
    dateTime: '2026-03-18T10:00:00',
    status: AppointmentStatus.CONFIRMED,
    type: AppointmentType.PHONE,
    paymentStatus: 'paid',
    durationMinutes: 45
  },
  {
    id: 'appt-5',
    providerId: `prov-${PROV_ID_1}`,
    clientId: CLIENT_ID_2,
    dateTime: '2026-02-02T15:00:00', // Past
    status: AppointmentStatus.CANCELLED,
    type: AppointmentType.VIDEO,
    paymentStatus: 'exempted',
    durationMinutes: 60
  },
  {
    id: 'appt-new-pending',
    providerId: `prov-${PROV_ID_1}`,
    clientId: CLIENT_ID_3,
    dateTime: '2026-04-01T10:00:00',
    status: AppointmentStatus.PENDING,
    type: AppointmentType.IN_PERSON,
    paymentStatus: 'pending',
    durationMinutes: 60
  },
  {
    id: 'appt-alice-past-1',
    providerId: `prov-${PROV_ID_1}`,
    clientId: CLIENT_ID_1,
    dateTime: '2026-01-15T14:00:00',
    status: AppointmentStatus.COMPLETED,
    type: AppointmentType.VIDEO,
    paymentStatus: 'paid',
    durationMinutes: 50
  },
  {
    id: 'appt-alice-past-2',
    providerId: `prov-${PROV_ID_2}`,
    clientId: CLIENT_ID_1,
    dateTime: '2026-01-20T10:00:00',
    status: AppointmentStatus.COMPLETED,
    type: AppointmentType.VIDEO,
    paymentStatus: 'paid',
    durationMinutes: 30
  },
  {
    id: 'appt-alice-future-2',
    providerId: `prov-${PROV_ID_1}`,
    clientId: CLIENT_ID_1,
    dateTime: '2026-03-25T11:00:00',
    status: AppointmentStatus.CONFIRMED,
    type: AppointmentType.VIDEO,
    paymentStatus: 'paid',
    durationMinutes: 50
  },
  // Ensure TEST_PROV_ID also has data for manual testing
  {
    id: 'appt-test-pending',
    providerId: 'prov-test',
    clientId: CLIENT_ID_1,
    dateTime: '2026-04-02T14:00:00',
    status: AppointmentStatus.PENDING,
    paymentStatus: 'pending',
    durationMinutes: 60
  },
  {
    id: 'appt-test-confirmed',
    providerId: 'prov-test',
    clientId: CLIENT_ID_2,
    dateTime: '2026-04-03T10:00:00',
    status: AppointmentStatus.CONFIRMED,
    paymentStatus: 'paid',
    durationMinutes: 60
  }
];
