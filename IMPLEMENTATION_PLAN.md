# Implementation Plan - Navbar Background Fix

The main navbar remains transparent or has visibility issues when scrolling. The goal is to ensure the navbar has a solid, legible background (with optional blur/glassmorphism) as soon as the user scrolls away from the top of the page.

## Root Cause Analysis
1. **Scroll Detection Failure**: Global styles in `src/styles/design-system.css` set `html, body { height: 100%; }` and `body { overflow-y: auto; }`. This can cause `window.scrollY` to remain at 0 while the body element scrolls, preventing the navbar from ever entering its "scrolled" state.
2. **Redundant Background Logic**: `Navbar.tsx` uses both Tailwind classes on the `nav` element and an absolute `div` for background, which is unnecessary and can lead to flickering or transparency issues.
3. **Layout Jumps**: The conditional spacer `{scrolled && <div className="h-20"></div>}` causes the page content to jump by 20px when the scroll threshold is crossed, as the navbar is `fixed` and already out of the document flow.
4. **Transparency at Top**: On some pages, the transparent background makes the dark text hard to read against certain hero content.

## Proposed Changes

### `src/components/Navbar.tsx`
- **Robust Scroll Detection**: Update `handleScroll` to check `document.documentElement.scrollTop` and `document.body.scrollTop` in addition to `window.scrollY`.
- **Background Consolidation**: Use a single background strategy on the `nav` element using `backdrop-blur-md` and semi-transparent white (`bg-white/80` or `bg-white/90`) when scrolled.
- **Remove Conditional Spacer**: Delete the `{scrolled && <div className="h-20"></div>}` spacer. Instead, rely on a constant top padding/margin in the layout or a fixed-height spacer.
- **Glassmorphism**: Apply `backdrop-blur-xl` to the scrolled state for better readability over varied content.
- **Smooth Transitions**: Ensure height and background transitions are synchronized.

### `src/styles/design-system.css`
- **Overflow Cleanup**: Review and potentially simplify the `html, body` overflow rules to ensure standard window scroll behavior if possible, or at least ensure consistency.

## Potential Side Effects
- Layout shifts: The navbar height changes from `h-20` to `h-16` on scroll. I will ensure this transition is smooth and doesn't cause content to "jump".
- Visibility on dark-themed pages: Need to ensure that pages with dark headers (like Provider Profile) still look good during the transition.

## Implementation Steps
1. **Analyze** all routes where `Navbar` is used to understand the various background contexts (light vs dark hero sections).
2. **Modify `src/components/Navbar.tsx`**:
    - Update the `nav` container to use a consistent background strategy.
    - Add `backdrop-blur-md` to the scrolled state.
    - Optimize the scroll threshold (currently 10px).
3. **Verify** that the `isDarkMode` logic correctly toggles text colors based on both the route and the scroll state.
4. **Test** on Home, Provider Profile, and Search views.
5. **Run build/lint** to ensure no regressions.

## Success Criteria
- Navbar is transparent at the very top (scrollY < 10 or similar) IF the page design calls for it.
- Navbar becomes solid white (or blurred white) with a subtle shadow as soon as the user scrolls.
- Text remains readable at all times.
- No layout "jumps" or flickering during transition.
