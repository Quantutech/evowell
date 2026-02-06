# Comprehensive Responsiveness & Accessibility Plan

This plan outlines the steps to optimize the EvoWell webapp for all devices, specifically focusing on mobile devices where large elements currently dominate the screen.

## Root Causes of Poor Mobile Experience
1.  **Massive Typography**: Headlines and display text are hard-coded with large sizes that don't scale down aggressively enough on small screens.
2.  **Excessive Vertical Spacing**: Section paddings are too generous for mobile, leading to excessive scrolling.
3.  **Fixed-Size Elements**: Some cards, images, and buttons have large fixed paddings or rounded corners that take up valuable real estate.
4.  **Desktop-First Grid Layouts**: Some grids don't collapse logically or maintain too many columns on tablets.
5.  **Navigation Clutter**: Fixed bars and sticky elements can stack up and reduce the visible content area.

## Proposed Changes

### 1. Design System Refresh (`src/styles/design-system.ts`)
- **Fluid Typography**: Update `typography` tokens to use mobile-first sizes (e.g., `text-3xl` for display on mobile, `text-5xl` on desktop).
- **Responsive Spacing**: Update `spacing.section` tokens to use smaller paddings on mobile (e.g., `py-10` mobile vs `py-24` desktop).
- **Component Scaling**: Reduce default button and input paddings for small screens.

### 2. Layout Components Optimization
- **`PageHero.tsx`**: Adjust title scaling and vertical padding. Ensure visual elements (images/charts) hide or scale down significantly on small phones.
- **`Section.tsx`**: Apply the new responsive spacing tokens.
- **`Container.tsx`**: Ensure consistent horizontal padding across all views.

### 3. Component Improvements
- **Cards**: Update card radius and padding to be more space-efficient on mobile.
- **Buttons**: Use fluid width buttons in mobile forms/actions.
- **Navbar**: Ensure the mobile dropdown menu is robust and handles long lists gracefully.
- **Footer**: 
    - Reduce the massive top margin (`mt-40` -> `mt-16` on mobile).
    - Fix the curved SVG top to scale appropriately for narrow widths.
    - Improve the layout of links and social icons to prevent wrapping issues on small screens.
    - Center-align newsletter elements for better mobile symmetry.

### 4. View-Specific Fixes
- **`HomeView.tsx`**: 
    - Reduce hero height.
    - Stack "Meet Evo" section elements earlier.
    - Ensure featured providers grid is legible on 320px screens.
- **`SearchView.tsx` & `DirectoryView.tsx`**:
    - Optimize the sticky filters and specialty bars to minimize height.
    - Ensure card images use `aspect-video` or similar to save vertical space.
- **Dashboards (`DashboardLayout.tsx`)**:
    - **Fix Mobile Menu**: The current hamburger menu lacks a functional drawer/modal. I will implement a proper mobile navigation drawer.
    - **Mobile Header**: Reduce header height and padding.
    - **Content Padding**: Reduce content area padding from `p-8` to `p-4` on mobile.

### 5. Smooth Transitions & UX
- **Page Transitions**: Implement a lightweight transition effect using CSS animations or Framer Motion for smooth screen switching.
- **Loading States**: Improve skeleton screens to match the new responsive layouts.

## Implementation Steps
1.  **Modify `design-system.ts`**: Update typography and spacing tokens with responsive Tailwind classes (`sm:`, `md:`, `lg:`).
2.  **Refactor `PageHero` and `Section`**: Ensure they consume the updated tokens correctly.
3.  **Audit `HomeView`**: Apply responsive classes to custom layout sections.
4.  **Audit `DirectoryView` & `SearchView`**: Refine the unified sticky bar for mobile.
5.  **Test on multiple breakpoints**: (320px, 375px, 768px, 1024px, 1440px).
6.  **Verify Accessibility**: Check color contrast, touch target sizes, and heading levels.

## Success Criteria
- No horizontal scrolling on any page.
- "Display" text doesn't wrap awkwardly or dominate more than 30% of the mobile viewport.
- Buttons have a minimum touch target of 44x44px but don't look "massive".
- Smooth transitions between routes (no sudden flickering).
- Total vertical scroll length reduced on mobile Home page.
