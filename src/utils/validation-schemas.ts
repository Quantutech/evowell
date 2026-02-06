import { z } from 'zod';
import { UserRole, ModerationStatus, SubscriptionTier, SubscriptionStatus, AppointmentType } from '../types';

export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(5, 'Zip code must be at least 5 characters'),
  country: z.string().default('USA')
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.nativeEnum(UserRole)
});

export const providerProfileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  professionalTitle: z.string().min(1, 'Title is required'),
  professionalCategory: z.string().min(1, 'Category is required'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  tagline: z.string().min(1, 'Tagline is required'),
  imageUrl: z.string().url('Invalid image URL'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  address: addressSchema,
  phone: z.string().min(10, 'Invalid phone number'),
  pricing: z.object({
    hourlyRate: z.number().min(0),
    slidingScale: z.boolean(),
    minFee: z.number().optional(),
    maxFee: z.number().optional()
  }),
  onboardingComplete: z.boolean(),
  moderationStatus: z.nativeEnum(ModerationStatus)
});

export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.string().min(1, 'Category is required'),
  status: z.enum(['DRAFT', 'PENDING', 'APPROVED', 'REJECTED'])
});
