---
phase: "01-carousel"
plan: "01"
status: "complete"
started: "2026-03-17"
completed: "2026-03-17"
---

## Summary

Built and integrated an Embla-based image carousel into the Home page "Our Recent Work" section, replacing the static grid.

**One-liner:** Auto-advancing, responsive image carousel with prev/next navigation and project title/location overlays on the Home page.

## What Was Done

1. Extracted shared project data to `src/data/projects.ts` with `Project` interface, `projects` array, and `carouselProjects` subset
2. Installed `embla-carousel-react` and `embla-carousel-autoplay` dependencies
3. Created `src/components/WorkCarousel.tsx` — Embla carousel with:
   - Auto-advance every 4 seconds with pause on hover
   - Prev/next arrow navigation (ChevronLeft/ChevronRight from lucide-react)
   - Responsive aspect ratios (4:3 mobile, 16:9 desktop)
   - Project title and MapPin location overlays
   - Loop mode enabled
   - Accessible ARIA labels and roles
4. Wired WorkCarousel into Home page's "Our Recent Work" section

## Commits

- `dcc4a4d` feat(01-01): extract shared project data and install Embla carousel
- `8b25e1f` feat(01-01): create WorkCarousel component and wire into Home page

## Requirements Covered

- CARO-01: Auto-advancing carousel ✓
- CARO-02: Prev/next arrow navigation ✓
- CARO-03: Project photos from /public/images/ ✓
- CARO-04: Responsive across viewports ✓
- CARO-05: Visual integration with site design ✓
- CARO-06: Title/location overlays ✓
