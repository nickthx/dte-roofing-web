# DTE Roofing — Local Authority & Service Area SEO Overhaul

## What This Is

A structural/technical SEO overhaul of the /locations hub and 13 location subpages on dteroofingllc.com. The existing content is strong and approved — this milestone fixes schema markup, internal linking, hub page structure, and footer coverage to establish proper local SEO authority across all service areas.

## Core Value

Establish DTE Roofing as the authoritative local roofing contractor across all 13 Central Ohio service areas through proper schema, cross-linking, and page structure — without touching approved content.

## Current Milestone: v1.1 — Per-Page SEO Metadata Overhaul

**Goal:** Every prerendered page on dteroofingllc.com ships a unique, descriptive `<title>` and `<meta description>`, plus H1/H2 structured as `primary category + city` / `secondary categories + services` informed by competitor GBP research — eliminating the current site-wide duplicate-title and duplicate-description problem that nullifies per-page SEO.

**Target features:**
- Unique `<title>` on all 35 sitemap URLs (current: 21 share one 166-char default)
- Unique `<meta description>` on all 35 sitemap URLs (current: all 35 share homepage description)
- H1/H2 rewrite to primary+city / secondary+services format, driven by competitor GBP Services/Categories research
- Fix `/blog` prerender — currently ships empty `<title>` and empty `<h1>`
- Plumb `<SEO>` props correctly across all page components (diagnose shared-template vs per-page)

**Batched execution plan:** 5 reviewable batches, each gated on user approval of drafted copy before edits land.

**Constraint exception:** The v1.0 "do not modify content" rule is explicitly lifted for H1/H2 headings in this milestone only — at user direction.

## Requirements

### Validated

- ✓ 13 location subpages with unique, high-quality localized content — existing
- ✓ /locations hub page with links to all 13 subpages — existing
- ✓ RoofingContractor JSON-LD schema on all 13 subpages — existing (needs fixing)
- ✓ Service pages with lead capture forms — existing
- ✓ Footer with location links — existing (incomplete)
- ✓ SEO component with meta tag manipulation — existing
- ✓ SchemaMarkup component for JSON-LD generation — existing

### Active

- [x] Hub page H1 differentiated from /locations/columbus (no cannibalization) — Validated in Phase 1
- [x] Hub page has its own RoofingContractor JSON-LD schema with all 13 cities — Validated in Phase 1
- [x] Each subpage has page-specific areaServed (primary city + 2-3 neighbors) — Validated in Phase 1
- [x] Each subpage has unique @id in schema — Validated in Phase 1
- [x] No non-page cities in any areaServed array (only the 13 with pages) — Validated in Phase 1
- [x] Breadcrumb / "back to hub" link on all 13 subpages — Validated in Phase 2
- [x] "Nearby Areas We Serve" cross-linking section on all 13 subpages — Validated in Phase 2
- [x] Footer lists all 13 locations (not just 5) — Validated in Phase 2
- [x] Service area map on /locations hub page — Validated in Phase 3
- [x] Service pages link to relevant location pages where natural — Validated in Phase 3

### Out of Scope

- Content rewrites — all page content is audited and approved
- URL changes — no slugs or routing changes
- NAP changes — address/phone/email are audited separately
- New location pages — only the existing 13 are in scope
- Adding back removed cities to areaServed — only when pages exist for them

## Context

**Site:** dteroofingllc.com — React SPA (Vite + TypeScript + Tailwind), deployed on Vercel
**Canonical NAP:**
- Business Name: DTE Roofing
- Legal Name: DTE Roofing LLC
- Address: 615 Hilliard Rome Rd, Columbus, OH 43228
- Phone: 614-971-6028
- Email: experience@dteroofing.com

**Current Issues Identified:**
- Schema is generic/duplicated — same RoofingContractor block with same 23-city areaServed on every subpage
- Hub page has ZERO schema
- Hub page H1 "Roofing Contractor Columbus OH" cannibalizes /locations/columbus
- No breadcrumb or "back to hub" links on subpages
- Only 1 cross-link found between location pages (Dublin→Columbus)
- Footer links to only 5 of 13 locations
- New Albany may be missing from its own page's areaServed

**The 13 Location Subpages:**
1. /locations/columbus
2. /locations/hilliard
3. /locations/dublin
4. /locations/new-albany
5. /locations/upper-arlington
6. /locations/westerville
7. /locations/gahanna
8. /locations/reynoldsburg
9. /locations/grove-city
10. /locations/pickerington
11. /locations/worthington
12. /locations/delaware
13. /locations/powell

**Neighbor Mapping (for areaServed and cross-links):**
- Columbus: Hilliard, Dublin, Upper Arlington, Westerville, Gahanna, Reynoldsburg, Grove City, Worthington
- Hilliard: Columbus, Dublin, Upper Arlington, Grove City
- Dublin: Columbus, Hilliard, Powell, Worthington, Upper Arlington
- New Albany: Columbus, Westerville, Gahanna
- Upper Arlington: Columbus, Hilliard, Dublin, Worthington, Grove City
- Westerville: Columbus, Powell, Gahanna, Worthington, New Albany
- Gahanna: Columbus, Westerville, New Albany, Reynoldsburg
- Reynoldsburg: Columbus, Gahanna, Pickerington
- Grove City: Columbus, Hilliard, Pickerington
- Pickerington: Columbus, Reynoldsburg, Grove City, Gahanna
- Worthington: Columbus, Dublin, Powell, Westerville, Upper Arlington
- Delaware: Powell, Westerville, Worthington
- Powell: Dublin, Westerville, Delaware, Worthington

## Constraints

- **Content**: Do NOT rewrite or modify existing page content (paragraphs, testimonials, FAQs, service descriptions)
- **URLs**: Do NOT change any URLs or slugs
- **NAP**: Do NOT change business name, address, phone, or email anywhere
- **Design**: All new elements must match existing Tailwind design (charcoal/primary-700 color scheme)
- **Images**: Use existing /public/images/ assets only
- **Dependencies**: No new heavy dependencies — prefer CSS/lightweight JS solutions
- **Approval**: Complete each phase fully, verify, and get user approval before starting next phase

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Page-specific areaServed (primary + 2-3 neighbors) | Avoids diluting local relevance with 23-city generic list | ✓ Phase 1 |
| Remove 10 non-page cities from schema | Only cities with dedicated pages should be in areaServed | ✓ Phase 1 |
| Hub H1 → "Areas We Serve in Central Ohio" | Stops cannibalization of /locations/columbus keyword | ✓ Phase 1 |
| Unique @id per subpage schema | Prevents search engines treating all pages as same entity | ✓ Phase 1 |
| LocationBreadcrumb + NearbyAreas components | Reusable components driven by locations.ts data for navigation hierarchy and cross-link mesh | ✓ Phase 2 |
| Dynamic footer from LOCATIONS array | Ensures all 13 cities discoverable from every page, no hardcoded lists to maintain | ✓ Phase 2 |
| SVG service area map on hub | Lightweight, accessible map showing 13 city positions with clickable links — no external deps | ✓ Phase 3 |
| Plain-text to Link conversion for cross-links | Wraps existing city name mentions on service pages as links — adds linking without new content | ✓ Phase 3 |
| Hub card grid consumes LOCATIONS SSOT | Eliminates local duplicate array — all location data in one file | ✓ Phase 4 |
| Hub breadcrumb 2-item schema | Removes self-referencing third breadcrumb item on hub page | ✓ Phase 4 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-23 after Phase 4 completion — all milestone v1.0 phases complete, tech debt resolved*
