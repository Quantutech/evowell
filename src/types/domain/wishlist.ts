import { ProviderProfile } from './provider';

export interface WishlistEntry {
  id: string;
  providerId: string;
  clientId: string;
  createdAt: string;
  provider?: ProviderProfile;
  client?: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
    location?: string;
  };
}
