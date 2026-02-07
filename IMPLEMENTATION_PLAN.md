# Implementation Plan - Provider Exchange Enhancements

## Problem / Task
1. Add more mock resources to the Provider Exchange.
2. Refactor filters in `ExchangeView.tsx` to be a sticky horizontal bar above the featured tools section.
3. Ensure "Notion-style" branding while keeping EvoWell's identity.
4. Dynamically connect provider details (name, bio, email) in the digital product (resource) detail pages.

## Files Modified
- `src/services/seedData.ts`: Added 10 new mock resources across various categories and access types.
- `src/views/ExchangeView.tsx`: Refactored filters from sidebar to a horizontal, sticky, blurred-background bar. Added new sections for Clinical Templates and Worksheets & Guides.
- `src/services/resource.service.ts`: Updated `getResourceById` to enrich the resource with provider's `bio` and `email`.
- `src/views/ResourceDetailView.tsx`: Dynamically displaying the provider's `bio` and `email` (mailto link) in the sidebar expert card.
- `src/types.ts`: Updated `Resource` interface to include `bio` and `email` in the enriched `provider` object.

## Side Effects
- Users may need to clear local storage or trigger a data reset to see the new mock resources if they have existing data in `evowell_mock_store`.
- The `ExchangeView` layout is now more focused on content with filters taking up less vertical space in the sidebar.

## Verification
- Run `npm run build` to ensure type safety and successful compilation.
- Manually verified the layout changes in `ExchangeView.tsx`.
- Confirmed that provider details are correctly passed and displayed in `ResourceDetailView.tsx`.
