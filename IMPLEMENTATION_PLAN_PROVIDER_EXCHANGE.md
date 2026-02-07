# Implementation Plan: Provider Exchange (Resource Hub)

## Overview
This plan outlines the architecture and implementation steps for the "Provider Exchange," a professional resource hub where verified providers can share digital tools, guides, and templates. The focus is on a professional, clinical-adjacent aesthetic with equal support for free and paid content.

## 1. Data Model & Schema
We will introduce a new core entity `Resource` to the system.

### Types (`src/types.ts`)
```typescript
export type ResourceType = 'course' | 'template' | 'worksheet' | 'mood_board' | 'toolkit' | 'guide' | 'assessment' | 'audio';
export type ResourceAccess = 'free' | 'paid';
export type ResourceVisibility = 'public' | 'providers_only';
export type ResourceStatus = 'draft' | 'published' | 'archived';

export interface Resource {
  id: string;
  providerId: string;
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
  visibility: ResourceVisibility;
  createdAt: string;
  updatedAt: string;
  downloads: number;
  views: number;
}
```

### Database Schema (Supabase)
New table `public.resources` with RLS policies:
-   `SELECT`: Public for `visibility='public'`, Auth for `visibility='providers_only'`.
-   `INSERT/UPDATE`: Owner (Provider) only.
-   `DELETE`: Owner only.

## 2. Architecture Components

### Service Layer (`src/services/resource.service.ts`)
-   **Interfaces**: `IResourceService`
-   **Implementations**: `MockResourceService` (for current dev) and `SupabaseResourceService` (future/prod).
-   **Methods**:
    -   `createResource(data)`
    -   `updateResource(id, data)`
    -   `deleteResource(id)`
    -   `getResourceById(id)`
    -   `getResourcesByProvider(providerId)`
    -   `searchResources(filters)` (Complex filtering logic)

### UI Components
-   **Provider Dashboard**:
    -   `ProviderResourcesTab`: Table view of owned resources.
    -   `ResourceEditor`: Multi-step wizard for creating/editing resources.
-   **Public Exchange**:
    -   `ExchangeView`: Main landing page with hero and filter sidebar.
    -   `ResourceCard`: Display component.
    -   `ResourceDetailView`: Individual resource page.
    -   **Admin Dashboard**: Add `ResourceReview` tab for moderation.

## 3. Implementation Steps
>>>>>>>

### Phase 1: Core Foundation
- [ ] Define TypeScript interfaces and Enums in `src/types.ts`.
- [ ] Create `src/services/resource.service.ts` with Mock implementation and seeded data.
- [ ] Update `src/services/api.ts` to expose `resourceService`.

### Phase 2: Provider Dashboard (CRUD)
- [ ] Add "Resources" to `ProviderDashboardLayout` navigation.
- [ ] Implement `ProviderResourcesTab.tsx` (Table View).
- [ ] Implement `ResourceEditor.tsx` (The 4-step wizard: Basic Info, Access, Preview, Review).

### Phase 3: Public Exchange (Frontend)
- [ ] Create route `/exchange` in `App.tsx`.
- [ ] Implement `ExchangeView.tsx` with Sidebar Filters (Type, Category, Price, Language).
- [ ] Implement `ResourceCard.tsx` (Polish UI: 16-20px rounded, soft shadows).

### Phase 4: Resource Detail & Interaction
- [ ] Create route `/exchange/:resourceId`.
- [ ] Implement `ResourceDetailView.tsx`.
- [ ] Implement Access Logic (Free vs Paid mock flow).

## 4. Technical Considerations
-   **Mock Data**: We need to generate realistic seed data for the "Provider Exchange" to look populated.
-   **Filtering**: The `searchResources` method in `MockResourceService` needs to handle multi-select filtering efficiently.
-   **Routing**: `/exchange` is public, but `/console/resources` is protected.

## 5. Success Criteria
-   Providers can create, edit, and delete resources.
-   Public users can browse resources with working filters.
-   The design matches the "Clinical Soft" aesthetic (Calm, Professional).
-   No "Buy Now" aggressive CTA; use "Access" or "View".
