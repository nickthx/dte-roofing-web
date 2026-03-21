---
phase: 01-data-architecture-schema-fixes
plan: 02
subsystem: seo
tags: [schema, json-ld, react, local-seo, roofing-contractor]

# Dependency graph
requires:
  - phase: 01-data-architecture-schema-fixes/01
    provides: "SchemaMarkup refactor with locationSlug prop and hub type support, locations.ts data"
provides:
  - "Hub page uses type='hub' SchemaMarkup producing RoofingContractor JSON-LD with all 13 cities"
  - "All 13 location subpages wired with locationSlug for unique @id and page-specific areaServed"
  - "Hub H1 differentiated from /locations/columbus to prevent cannibalization"
affects: [02-internal-linking, 03-hub-enhancements]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "locationSlug prop pattern: each location page passes its URL slug to SchemaMarkup"
    - "Hub page uses type='hub' for aggregate schema covering all 13 cities"

key-files:
  created: []
  modified:
    - src/pages/Locations.tsx
    - src/pages/locations/Columbus.tsx
    - src/pages/locations/Hilliard.tsx
    - src/pages/locations/Dublin.tsx
    - src/pages/locations/NewAlbany.tsx
    - src/pages/locations/UpperArlington.tsx
    - src/pages/locations/Westerville.tsx
    - src/pages/locations/Gahanna.tsx
    - src/pages/locations/Reynoldsburg.tsx
    - src/pages/locations/GroveCity.tsx
    - src/pages/locations/Pickerington.tsx
    - src/pages/locations/Worthington.tsx
    - src/pages/locations/Delaware.tsx
    - src/pages/locations/Powell.tsx

key-decisions:
  - "Hub H1 changed to 'Areas We Serve in Central Ohio' to stop Columbus keyword cannibalization"
  - "Hub SchemaMarkup uses type='hub' with locationName='Central Ohio' for aggregate coverage"

patterns-established:
  - "locationSlug prop: every location subpage passes its URL-matching slug to SchemaMarkup"

requirements-completed: [SCHEMA-01, SCHEMA-08, HUB-01, HUB-02]

# Metrics
duration: 2min
completed: 2026-03-21
---

# Phase 01 Plan 02: Wire Page Components to SchemaMarkup Summary

**Hub page fixed with type='hub' schema and differentiated H1; all 13 location subpages wired with locationSlug for unique @id and page-specific areaServed**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-21T22:56:05Z
- **Completed:** 2026-03-21T22:58:27Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments
- Hub page H1 changed from "Roofing Contractor Columbus OH" to "Areas We Serve in Central Ohio" (stops cannibalization)
- Hub page SchemaMarkup switched from broken type="service" with invalid props to type="hub" producing valid RoofingContractor JSON-LD
- All 13 location subpages now pass locationSlug to SchemaMarkup, enabling unique @id and page-specific areaServed

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix hub page H1, meta title, and SchemaMarkup props** - `9bbd752` (feat)
2. **Task 2: Add locationSlug prop to all 13 location subpages** - `f823faf` (feat)

## Files Created/Modified
- `src/pages/Locations.tsx` - Hub page: fixed H1, meta title, and SchemaMarkup type="hub" with valid props
- `src/pages/locations/Columbus.tsx` - Added locationSlug="columbus"
- `src/pages/locations/Hilliard.tsx` - Added locationSlug="hilliard"
- `src/pages/locations/Dublin.tsx` - Added locationSlug="dublin"
- `src/pages/locations/NewAlbany.tsx` - Added locationSlug="new-albany"
- `src/pages/locations/UpperArlington.tsx` - Added locationSlug="upper-arlington"
- `src/pages/locations/Westerville.tsx` - Added locationSlug="westerville"
- `src/pages/locations/Gahanna.tsx` - Added locationSlug="gahanna"
- `src/pages/locations/Reynoldsburg.tsx` - Added locationSlug="reynoldsburg"
- `src/pages/locations/GroveCity.tsx` - Added locationSlug="grove-city"
- `src/pages/locations/Pickerington.tsx` - Added locationSlug="pickerington"
- `src/pages/locations/Worthington.tsx` - Added locationSlug="worthington"
- `src/pages/locations/Delaware.tsx` - Added locationSlug="delaware"
- `src/pages/locations/Powell.tsx` - Added locationSlug="powell"

## Decisions Made
- Hub H1 changed to "Areas We Serve in Central Ohio" per plan (stops /locations/columbus cannibalization)
- Hub meta title set to "Areas We Serve in Central Ohio | DTE Roofing Service Areas"
- Hub SchemaMarkup uses type="hub" with locationName="Central Ohio" for aggregate 13-city schema

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 01 (data-architecture-schema-fixes) is now complete with both plans finished
- All schema foundations in place: centralized location data, refactored SchemaMarkup, hub + subpage wiring
- Ready for Phase 02 (internal-linking) which will add breadcrumbs, cross-links, and footer coverage

## Self-Check: PASSED

All key files verified present. All commit hashes found in git log.

---
*Phase: 01-data-architecture-schema-fixes*
*Completed: 2026-03-21*
