export enum UserRole {
  ADMIN = 'ADMIN',
  PROVIDER = 'PROVIDER',
  CLIENT = 'CLIENT'
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PROFESSIONAL = 'PROFESSIONAL',
  PREMIUM = 'PREMIUM'
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TRIAL = 'TRIAL'
}

export enum ModerationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum AppointmentType {
  VIDEO = 'Video',
  PHONE = 'Phone',
  IN_PERSON = 'In Person',
  CHAT = 'Chat'
}

export enum SessionFormat {
  IN_PERSON = 'IN_PERSON',
  REMOTE = 'REMOTE'
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
  PAID = 'PAID',
  REJECTED = 'REJECTED'
}

export enum TicketStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export enum AuditActionType {
  VIEW = 'VIEW',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  EXPORT = 'EXPORT',
  SEARCH = 'SEARCH',
  ACCESS_DENIED = 'ACCESS_DENIED'
}

export enum AuditResourceType {
  USER = 'user',
  PROVIDER = 'provider',
  APPOINTMENT = 'appointment',
  MESSAGE = 'message',
  PATIENT_RECORD = 'patient_record',
  SYSTEM = 'system',
  BLOG = 'blog'
}
