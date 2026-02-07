export type EndorsementType = 'evowell' | 'peer';

export type EndorsementReason =
  | 'clinical_expertise'
  | 'professional_collaboration'
  | 'ethical_practice'
  | 'strong_outcomes'
  | 'community_contribution';

export interface Endorsement {
  id: string;
  endorsedProviderId: string;
  endorserUserId: string;
  endorserRole: 'admin' | 'provider';
  endorsementType: EndorsementType;
  reason?: EndorsementReason;
  createdAt: string;
  deletedAt?: string;
  endorser?: { // Enriched
      firstName: string;
      lastName: string;
      professionalTitle?: string;
      imageUrl?: string;
      profileSlug?: string;
  }
}
