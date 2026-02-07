import { 
  ProviderProfile, SearchFilters, ModerationStatus, UserRole
} from '../../types';
import { mockStore } from '../mockStore';
import { SEED_DATA } from '../../data/seed';

const TRUST_WEIGHTS = {
  evowell_boost: 50,
  peer_boost_per: 5,
  peer_boost_cap: 75,
};

function calculateTrustScore(evowell: boolean, peerCount: number): number {
  return (evowell ? TRUST_WEIGHTS.evowell_boost : 0) + 
         Math.min(peerCount * TRUST_WEIGHTS.peer_boost_per, TRUST_WEIGHTS.peer_boost_cap);
}

export async function fallbackMockSearch(filters: SearchFilters): Promise<{ providers: ProviderProfile[], total: number }> {
  let providers = [...SEED_DATA.providers, ...mockStore.store.providers];
  const users = [...SEED_DATA.users, ...mockStore.store.users];
  const allEndorsements = mockStore.store.endorsements || [];
  
  providers = providers.filter((p, index, self) => 
    index === self.findIndex(t => t.id === p.id)
  );
  
  providers = providers.filter(p => 
    p.onboardingComplete === true &&
    p.moderationStatus === ModerationStatus.APPROVED &&
    p.isPublished !== false
  );
  
  if (filters.query) {
     const q = filters.query.toLowerCase();
     providers = providers.filter(p => {
        const u = users.find(user => user.id === p.userId);
        const name = `${p.firstName || u?.firstName || ''} ${p.lastName || u?.lastName || ''}`.toLowerCase();
        return name.includes(q) || p.bio?.toLowerCase().includes(q) || p.professionalTitle?.toLowerCase().includes(q);
     });
  }
  if (filters.specialty) {
     providers = providers.filter(p => p.specialties?.includes(filters.specialty!));
  }
  if (filters.maxPrice) {
     providers = providers.filter(p => (p.pricing?.hourlyRate || 0) <= filters.maxPrice!);
  }
  if (filters.state) {
     providers = providers.filter(p => p.address?.state?.toLowerCase().includes(filters.state!.toLowerCase()));
  }

  // Enrich with endorsements
  let enriched = providers.map(p => {
    const relevant = allEndorsements.filter(e => e.endorsedProviderId === p.id && !e.deletedAt);
    const evowell = relevant.some(e => e.endorsementType === 'evowell');
    const peerCount = relevant.filter(e => e.endorsementType === 'peer').length;
    
    const u = users.find(user => user.id === p.userId);
    
    return { 
      ...p, 
      firstName: p.firstName || u?.firstName || 'Unknown', 
      lastName: p.lastName || u?.lastName || 'Provider',
      endorsements: {
          evowell,
          peerCount
      }
    };
  });

  // Filter by EvoWell Endorsed
  if (filters.evowellEndorsedOnly) {
    enriched = enriched.filter(p => p.endorsements?.evowell);
  }

  // Sort logic
  if (filters.sortBy === 'endorsements') {
    enriched.sort((a, b) => {
      const scoreA = calculateTrustScore(a.endorsements?.evowell || false, a.endorsements?.peerCount || 0);
      const scoreB = calculateTrustScore(b.endorsements?.evowell || false, b.endorsements?.peerCount || 0);
      return scoreB - scoreA;
    });
  } else if (filters.sortBy === 'price_low') {
    enriched.sort((a, b) => (a.pricing?.hourlyRate || 0) - (b.pricing?.hourlyRate || 0));
  } else if (filters.sortBy === 'price_high') {
    enriched.sort((a, b) => (b.pricing?.hourlyRate || 0) - (a.pricing?.hourlyRate || 0));
  } else if (filters.sortBy === 'experience') {
    enriched.sort((a, b) => (b.yearsExperience || 0) - (a.yearsExperience || 0));
  }
  
  return { providers: enriched, total: enriched.length };
}
