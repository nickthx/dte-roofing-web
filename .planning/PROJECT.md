# DTE Roofing — Local Authority & Service Area SEO Overhaul

## What This Is

A structural/technical SEO overhaul of the /locations hub and 13 location subpages on dteroofingllc.com. The existing content is strong and approved — this milestone fixes schema markup, internal linking, hub page structure, and footer coverage to establish proper local SEO authority across all service areas.

## Core Value

Establish DTE Roofing as the authoritative local roofing contractor across all 13 Central Ohio service areas through proper schema, cross-linking, and page structure — without touching approved content.

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

- [ ] Hub page H1 differentiated from /locations/columbus (no cannibalization)
- [ ] Hub page has its own RoofingContractor JSON-LD schema with all 13 cities
- [ ] Each subpage has page-specific areaServed (primary city + 2-3 neighbors)
- [ ] Each subpage has unique @id in schema
- [ ] No non-page cities in any areaServed array (only the 13 with pages)
- [ ] Breadcrumb / "back to hub" link on all 13 subpages
- [ ] "Nearby Areas We Serve" cross-linking section on all 13 subpages
- [ ] Footer lists all 13 locations (not just 5)
- [ ] Service area map on /locations hub page
- [ ] Service pages link to relevant location pages where natural

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
| Page-specific areaServed (primary + 2-3 neighbors) | Avoids diluting local relevance with 23-city generic list | — Pending |
| Remove 10 non-page cities from schema | Only cities with dedicated pages should be in areaServed | — Pending |
| Hub H1 → "Areas We Serve in Central Ohio" | Stops cannibalization of /locations/columbus keyword | — Pending |
| Unique @id per subpage schema | Prevents search engines treating all pages as same entity | — Pending |

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
*Last updated: 2026-03-21 after initialization*
