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

### Active

<!-- Current scope. Building toward these. -->

- [ ] Replace "Our Recent Work" grid with a clean carousel on Home page

### Out of Scope

<!-- Explicit boundaries. -->

- Pulling new images from Google Business Profile — using existing downloaded images
- Redesigning other sections of the Home page
- Changes to the standalone Gallery page

## Context

- React 18 + Vite + TypeScript + Tailwind CSS
- Deployed on Vercel
- ~30 project images already in `/public/images/`, many sourced from Google Business Profile
- Current "Our Recent Work" section uses a static grid with uneven last row (1 + double-wide)

## Constraints

- **Tech stack**: React + Tailwind CSS, no new heavy dependencies (prefer CSS/lightweight JS solutions)
- **Images**: Use existing `/public/images/` assets only
- **Design**: Must integrate cleanly with existing page aesthetic (charcoal/primary-700 color scheme)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Carousel over grid | User wants smooth, clean presentation; grid looks clunky | — Pending |

---
*Last updated: 2026-03-17 after milestone v1.1 initialization*
