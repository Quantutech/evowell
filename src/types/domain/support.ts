import { TicketStatus } from '../../data/types/enums';

export interface SupportTicketResponse {
  id: string;
  senderId: string;
  message: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: TicketStatus;
  createdAt: string;
  responses?: SupportTicketResponse[];
}
