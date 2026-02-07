import { isConfigured } from '../supabase';
import { MockProviderService } from './mock.service';
import { SupabaseProviderService } from './supabase.service';
import { 
  ProviderProfile, SearchFilters, Specialty, InsuranceCompany, 
  ModerationStatus 
} from '../../types';

export interface IProviderService {
  search(filters: SearchFilters): Promise<{ providers: ProviderProfile[], total: number }>;
  getProviderById(id: string): Promise<ProviderProfile | undefined>;
  getProviderByUserId(userId: string): Promise<ProviderProfile | undefined>;
  updateProvider(id: string, data: Partial<ProviderProfile>): Promise<ProviderProfile>;
  getAllProviders(params?: { page?: number, limit?: number }): Promise<{ providers: ProviderProfile[], total: number }>;
  getProviderBySlug(slug: string): Promise<ProviderProfile | undefined>;
  fetchProviderBySlugOrId(slugOrId: string): Promise<ProviderProfile | undefined>;
  moderateProvider(id: string, status: ModerationStatus): Promise<void>;
  updateProviderSlug(providerId: string, firstName: string, lastName: string, specialty?: string, city?: string): Promise<string>;

  // Helpers exposed for Auth service
  createBlankProviderProfile(userId: string, firstName: string, lastName: string, email: string): ProviderProfile;
  createProvider(profile: ProviderProfile): Promise<void>; // For registration

  // Metadata
  getAllSpecialties(): Promise<Specialty[]>;
  createSpecialty(name: string): Promise<void>;
  deleteSpecialty(id: string): Promise<void>;
  getAllInsurance(): Promise<InsuranceCompany[]>;
  createInsurance(name: string): Promise<void>;
  deleteInsurance(id: string): Promise<void>;
  getAllLanguages(): Promise<string[]>;
  createLanguage(name: string): Promise<void>;
  deleteLanguage(name: string): Promise<void>;
  getAllGenders(): Promise<string[]>;
  createGender(name: string): Promise<void>;
  deleteGender(name: string): Promise<void>;
}

export const providerService: IProviderService = isConfigured 
  ? new SupabaseProviderService() 
  : new MockProviderService();

export * from './provider.api';
export * from './provider.profile';
export * from './provider.search';
export * from './mock.service';
export * from './supabase.service';
