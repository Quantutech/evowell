# Implementation Plan - UI Cleanup & Branding Alignment

## Problem
1. A "Demo Mode Active" banner persists at the top of the application, which should be removed for the production-ready feel.
2. Dropdown inputs (select elements) in the `SearchView` and potentially other areas do not align with the centralized design system defined in `src/styles/design-system.ts`.

## Solution

### 1. Remove Demo Mode Active Bar
- **Root Cause**: The `DemoBanner` component is rendered in `src/App.tsx`.
- **Action**: Remove the `DemoBanner` component import and usage from `src/App.tsx`.
- **Files**: `src/App.tsx`

### 2. Update Dropdown Styles
- **Root Cause**: Dropdowns in `src/views/SearchView.tsx` use ad-hoc Tailwind classes that differ from the design system's input definition.
- **Action**: Update the `<select>` elements to match `designSystem.components.input` styles.
- **Style Comparison**:
  - **Current**: `w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-brand-300 transition-colors`
  - **Target**: `w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all`
- **Files**: `src/views/SearchView.tsx`

## Proposed Changes

### `src/App.tsx`
- Remove `import { DemoBanner } from './components/DemoIndicator';`
- Remove `<DemoBanner />` from the JSX.

### `src/views/SearchView.tsx`
- Update all `<select>` elements (Specialty, Language, Gender, Day, Mobile Sort) to use the standardized classes:
  ```css
  w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all
  ```

## Verification Plan
1. **Build**: Run `npm run type-check` (or build) to ensure no errors.
2. **Visual Check**:
   - Verify the top banner is gone.
   - Verify dropdowns in Search View look larger, cleaner, and have the correct focus states (ring, border color).

## Side Effects
- Minimal. Styling changes are scoped to specific elements. Removal of DemoBanner only affects visual layout (shifts content up).
