export type ResourceType = 'course' | 'template' | 'worksheet' | 'mood_board' | 'toolkit' | 'guide' | 'assessment' | 'audio';
export type ResourceAccess = 'free' | 'paid';
export type ResourceVisibility = 'public' | 'providers_only';
export type ResourceStatus = 'draft' | 'published' | 'archived';
export type ResourceModerationStatus = 'pending' | 'approved' | 'rejected';

export interface Resource {
  id: string;
  providerId: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string; // Markdown
  type: ResourceType;
  categories: string[]; // IDs from detailed category list
  languages: string[];
  accessType: ResourceAccess;
  price?: number;
  currency: string;
  deliveryType: 'download' | 'external_link' | 'embedded' | 'notion';
  externalUrl?: string;
  fileUrl?: string;
  thumbnailUrl: string;
  previewImages: string[];
  tags: string[];
  status: ResourceStatus;
  moderationStatus: ResourceModerationStatus;
  visibility: ResourceVisibility;
  createdAt: string;
  updatedAt: string;
  downloads: number;
  views: number;
  provider?: { // Enriched
      firstName: string;
      lastName: string;
      professionalTitle: string;
      imageUrl: string;
      bio?: string;
      email?: string;
  }
}
