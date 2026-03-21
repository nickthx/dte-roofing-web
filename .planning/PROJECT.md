# DTE Roofing Website

## What This Is

A marketing website for DTE Roofing LLC, a roofing company founded by two brothers in Hilliard, Ohio serving the Columbus metro area. The site drives leads through service pages, location pages, an instant quote tool (Roofle), financing info, and a contact/lead form backed by Supabase.

## Core Value

Generate qualified roofing leads by building trust through professional presentation, real project photos, and verified reviews.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Home page with hero, services, process, reviews, and project photos — v1
- ✓ 11 service pages (installation, repair, replacement, gutters, siding, etc.) — v1
- ✓ 13 location pages (Columbus metro area) — v1
- ✓ Blog with posts — v1
- ✓ Gallery page with filtering and lightbox — v1
- ✓ Contact/lead form with Supabase backend — v1
- ✓ Instant Quote via Roofle embed — v1
- ✓ Financing page — v1
- ✓ SEO metadata and schema markup — v1
- ✓ Mobile sticky call button — v1
- ✓ Home page "Our Recent Work" carousel with auto-advance, nav arrows, title/location overlays — v1.1

### Active

<!-- Current scope. Building toward these. -->

(None yet — next milestone TBD)

### Out of Scope

<!-- Explicit boundaries. -->

- Pulling new images from Google Business Profile — using existing downloaded images
- Video content in carousel — photos only for now

## Context

- React 18 + Vite + TypeScript + Tailwind CSS
- Deployed on Vercel
- ~30 project images already in `/public/images/`, many sourced from Google Business Profile
- "Our Recent Work" section now uses Embla carousel (embla-carousel-react + embla-carousel-autoplay)
- Shared project data extracted to `src/data/projects.ts` (used by both Home carousel and Gallery page)

## Constraints

- **Tech stack**: React + Tailwind CSS, no new heavy dependencies (prefer CSS/lightweight JS solutions)
- **Images**: Use existing `/public/images/` assets only
- **Design**: Must integrate cleanly with existing page aesthetic (charcoal/primary-700 color scheme)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Carousel over grid | User wants smooth, clean presentation; grid looks clunky | ✓ Good |
| Embla Carousel library | Lightweight, composable, good React integration | ✓ Good |
| Shared project data file | Extracted from Gallery to `src/data/projects.ts` for reuse | ✓ Good |

---
*Last updated: 2026-03-21 after v1.1 milestone completion*
