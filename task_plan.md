# Task Plan: Capslock UI Overhaul

## Phase 1: Foundation (The Setup)
- [x] Analyze & Map: Confirm `capslock` tokens (Colors, Spacing, Typography).
- [ ] Update Globals: Replace `src/app/globals.css` with Capslock-inspired theme (Zinc/Emerald).
- [ ] Font Check: Ensure `Inter` and `Outfit` are properly loaded.

## Phase 2: Implementation (The Build)
- [ ] Layout: Update `src/app/layout.tsx` for the new dark theme (#020617).
- [ ] Navbar: Distinct "Capslock" style navbar (minimal, blurred, border-bottom).
- [ ] Page Content: Rebuild `src/app/page.tsx` with:
    - [ ] Hero Section (Large typography, minimal graphics).
    - [ ] Bento Grid / Features (Glass cards with specific borders).
    - [ ] Text styles (Zinc-400 for muted, White for headings).

## Phase 3: Refinement (The Polish)
- [ ] Components: Update `GlassCard`, `Button` to match the reference.
- [ ] Animations: Add subtle entry animations.
