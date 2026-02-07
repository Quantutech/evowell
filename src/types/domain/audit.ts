import { AuditActionType, AuditResourceType } from '../../data/types/enums';

export interface AuditLog {
  id: string;
  user_id: string;
  action_type: AuditActionType;
  resource_type: AuditResourceType;
  resource_id?: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: any;
  created_at: string;
  user_email?: string;
}

export interface DailyMetric {
  date: string;
  views: number;
  inquiries: number;
}
