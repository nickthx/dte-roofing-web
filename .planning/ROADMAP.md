# Roadmap: DTE Roofing — Local Authority & Service Area SEO Overhaul

## Overview

This milestone fixes the structural SEO foundation of DTE Roofing's 13 location pages and hub. Phase 1 creates a centralized location data source and fixes all schema markup (the highest-impact SEO issues). Phase 2 builds the internal linking mesh -- breadcrumbs, nearby-area cross-links, and full footer coverage. Phase 3 adds hub page enhancements and service-to-location cross-links to complete the local authority signal chain.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Data Architecture & Schema Fixes** - Centralized location config, unique schema per page, hub page schema and H1 fix
- [ ] **Phase 2: Internal Linking & Navigation** - Breadcrumbs, nearby-area cross-links, full footer coverage
- [ ] **Phase 3: Hub Enhancements & Service Cross-Links** - Service area map on hub, service-to-location contextual links

## Phase Details

### Phase 1: Data Architecture & Schema Fixes
**Goal**: Every location page has correct, unique, page-specific JSON-LD schema driven from a single source of truth, and the hub page stops cannibalizing the Columbus subpage
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, SCHEMA-01, SCHEMA-02, SCHEMA-03, SCHEMA-04, SCHEMA-05, SCHEMA-06, SCHEMA-07, SCHEMA-08, HUB-01, HUB-02
**Success Criteria** (what must be TRUE):
  1. A centralized locations.ts file exists with all 13 cities, slugs, neighbors, and areaServed arrays -- and all location pages consume it
  2. Google Rich Results Test passes valid RoofingContractor JSON-LD on the /locations hub page (with all 13 cities in areaServed)
  3. Google Rich Results Test passes valid RoofingContractor JSON-LD on each of the 13 subpages, each with a unique @id and page-specific areaServed (primary city + 2-3 neighbors only)
  4. No non-page city names appear in any areaServed array across the entire site
  5. The /locations hub page H1 reads "Areas We Serve in Central Ohio" (not "Roofing Contractor Columbus OH") and the meta title matches
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Create locations.ts data file and refactor SchemaMarkup.tsx for per-page schema
- [ ] 01-02-PLAN.md — Fix hub page H1/title/schema and wire locationSlug into all 13 subpages

### Phase 2: Internal Linking & Navigation
**Goal**: Every location subpage is connected to its neighbors and the hub through visible navigation elements, and all 13 locations are discoverable from the footer
**Depends on**: Phase 1
**Requirements**: LINK-01, LINK-02, LINK-03
**Success Criteria** (what must be TRUE):
  1. Every location subpage displays a breadcrumb or "All Service Areas" link below the hero that navigates to /locations
  2. Every location subpage has a "Nearby Areas We Serve" section with 3-5 links to geographically adjacent location pages (matching the neighbor mapping from locations.ts)
  3. The site footer lists all 13 location pages with an "All Service Areas" link to /locations, visible on every page
**Plans**: TBD

Plans:
- [ ] 02-01: TBD

### Phase 3: Hub Enhancements & Service Cross-Links
**Goal**: The /locations hub page has a visual service area map, and service pages link naturally to relevant location pages to complete the internal linking mesh
**Depends on**: Phase 2
**Requirements**: HUB-03, LINK-04
**Success Criteria** (what must be TRUE):
  1. The /locations hub page displays a service area map (Google Maps embed, SVG, or static image) showing coverage across the 13 Central Ohio cities
  2. Each service page (/services/*) contains 2-3 contextual links to relevant location pages within existing content sections
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Data Architecture & Schema Fixes | 0/2 | Planning complete | - |
| 2. Internal Linking & Navigation | 0/TBD | Not started | - |
| 3. Hub Enhancements & Service Cross-Links | 0/TBD | Not started | - |
