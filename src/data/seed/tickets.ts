import { SupportTicket, TicketStatus } from '../../types';
import { PROV_ID_1, PROV_ID_4, CLIENT_ID_1, CLIENT_ID_2, ADMIN_ID } from './constants';

export const tickets: SupportTicket[] = [
  {
    id: 'ticket-1',
    userId: PROV_ID_1,
    subject: 'Billing Issue',
    message: 'I am having trouble syncing my Stripe account.',
    status: TicketStatus.OPEN,
    createdAt: '2024-03-10T10:00:00Z',
    responses: []
  },
  {
    id: 'ticket-2',
    userId: CLIENT_ID_1,
    subject: 'Login Trouble',
    message: 'I forgot my password and the reset link is not working.',
    status: TicketStatus.CLOSED,
    createdAt: '2024-02-15T09:00:00Z',
    responses: [
      { id: 'resp-1', senderId: ADMIN_ID, message: 'Password reset manually. Check your email.', createdAt: '2024-02-15T10:00:00Z' }
    ]
  },
  {
    id: 'ticket-3',
    userId: PROV_ID_4,
    subject: 'Profile Verification',
    message: 'How long does the NPI check take?',
    status: TicketStatus.OPEN,
    createdAt: '2024-03-12T14:00:00Z'
  },
  {
    id: 'ticket-4',
    userId: CLIENT_ID_2,
    subject: 'Insurance Question',
    message: 'Do you accept Cigna for nutrition?',
    status: TicketStatus.OPEN,
    createdAt: '2024-03-11T11:00:00Z'
  }
];
