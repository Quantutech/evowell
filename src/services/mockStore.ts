import { User, ProviderProfile, ClientProfile } from '../data/types';
import { UserRole } from '../data/types/enums';
import { persistence } from './persistence';
import { loadInitialData } from '../data/utils/loader';

interface MockStoreData {
  users: User[];
  providers: ProviderProfile[];
  blogs: any[];
  specialties: any[];
  testimonials: any[];
  clientProfiles: ClientProfile[];
  languages: string[];
  genders: string[];
  lastUpdated?: number;
  isDemoMode?: boolean;
}

class MockStoreService {
  public store: MockStoreData;

  constructor() {
    this.store = this.initializeStore();
  }

  private initializeStore(): MockStoreData {
    const initialData = loadInitialData();
    const stored = persistence.loadStore();

    // If persistence has data, merge it with initial seed/mock data 
    // but prefer persistence for stateful changes
    const store: MockStoreData = {
      ...initialData,
      clientProfiles: stored.clientProfiles || [],
      languages: stored.languages || ['English', 'Spanish', 'Mandarin', 'French', 'German'],
      genders: stored.genders || ['Male', 'Female', 'Non-Binary', 'Prefer not to say']
    };

    // Auto-generate client profiles if missing for seed/mock clients
    if (store.clientProfiles.length === 0) {
      const clients = store.users.filter(u => u.role === UserRole.CLIENT);
      store.clientProfiles = clients.map(u => ({
        id: `cp-${u.id}`,
        userId: u.id,
        intakeStatus: 'COMPLETED',
        documents: [],
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
        preferences: { communication: 'email', language: 'English' }
      }));
    }

    return store;
  }

  public resetData() {
    localStorage.removeItem('evowell_mock_store');
    this.store = this.initializeStore();
    this.save();
    window.location.reload();
  }

  public save() {
    persistence.saveStore(this.store);
    // Also update the loader's source
    localStorage.setItem('evowell_mock_store', JSON.stringify({
      ...this.store,
      lastUpdated: Date.now()
    }));
  }
}

export const mockStore = new MockStoreService();
