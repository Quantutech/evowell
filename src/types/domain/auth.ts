import { User } from './user';
import { ProviderProfile } from './provider';

export interface AuthContextType {
  user: User | null;
  provider: ProviderProfile | null;
  token: string | null;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
