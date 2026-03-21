---
phase: 01-data-architecture-schema-fixes
plan: 01
subsystem: seo
tags: [json-ld, schema-markup, local-seo, structured-data, typescript]

requires: []
provides:
  - "Centralized location data (src/data/locations.ts) with 13 cities, neighbor mappings, and helper functions"
  - "SchemaMarkup.tsx with per-page @id, page-specific areaServed, hub type, and breadcrumb fix"
  - "Reconciled geo coordinates across SchemaMarkup.tsx and schemas.ts"
affects: [01-02, 02-location-pages, 03-hub-page]

tech-stack:
  added: []
  patterns:
    - "Centralized location config pattern: single source of truth for all city data"
    - "Dynamic schema generation: locationSlug prop drives per-page JSON-LD output"

key-files:
  created:
    - src/data/locations.ts
  modified:
    - src/components/SchemaMarkup.tsx
    - src/seo/schemas.ts

key-decisions:
  - "Used containedInPlace State nesting in areaServed City objects for richer schema"
  - "BUSINESS_INFO.areaServed computed from LOCATIONS at module level for fallback paths"
  - "Geo coordinates standardized to 39.9637153, -83.1477371 (schemas.ts values, more precise)"

patterns-established:
  - "Location data access: import from src/data/locations.ts, never hardcode city lists"
  - "Schema per-page pattern: pass locationSlug to SchemaMarkup for unique @id and areaServed"

requirements-completed: [DATA-01, SCHEMA-02, SCHEMA-03, SCHEMA-04, SCHEMA-05, SCHEMA-06, SCHEMA-07]

duration: 3min
completed: 2026-03-21
---

# Phase 01 Plan 01: Data Architecture & Schema Fixes Summary

**Centralized 13-city location config with per-page JSON-LD schema generation, unique @id, page-specific areaServed, and breadcrumb/geo fixes**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-21T22:50:14Z
- **Completed:** 2026-03-21T22:53:35Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created src/data/locations.ts as single source of truth for all 13 Central Ohio cities with neighbor mappings and helper functions
- Refactored SchemaMarkup.tsx to generate unique @id and page-specific areaServed when given locationSlug
- Removed 10 non-page cities (Canal Winchester, Lancaster, Newark, etc.) from all schema output
- Fixed breadcrumb location branch to point to /locations instead of /services (SCHEMA-06)
- Reconciled geo coordinates to 39.9637153, -83.1477371 across both schema files (SCHEMA-07)
- Added Facebook and Instagram to sameAs social links

## Task Commits

Each task was committed atomically:

1. **Task 1: Create src/data/locations.ts with all 13 cities and helper functions** - `142b6de` (feat)
2. **Task 2: Refactor SchemaMarkup.tsx for per-page schema and fix breadcrumb/geo bugs** - `927b9a7` (feat)

## Files Created/Modified
- `src/data/locations.ts` - Centralized location config with 13 cities, neighbor mappings, getLocationBySlug, getAreaServedForLocation, getAllLocationSlugs
- `src/components/SchemaMarkup.tsx` - Extended with locationSlug prop, hub type, per-page @id, dynamic areaServed, breadcrumb fix, geo fix, sameAs update
- `src/seo/schemas.ts` - Added Google Maps to sameAs array (geo already correct)

## Decisions Made
- Used `containedInPlace: { @type: State, name: Ohio }` nesting in City areaServed objects for richer structured data
- Computed BUSINESS_INFO.areaServed from LOCATIONS at module level so fallback paths (home, general) also use only 13 page cities
- Standardized geo to schemas.ts values (39.9637153, -83.1477371) as they are more precise than SchemaMarkup's previous values

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all data is wired and functional. Location pages need to pass `locationSlug` prop to SchemaMarkup (handled in Plan 01-02).

## Next Phase Readiness
- locations.ts is ready for import by location page components (Plan 01-02)
- SchemaMarkup.tsx accepts locationSlug -- location pages just need to pass it
- Hub page can use type='hub' for all-13-city schema

---
*Phase: 01-data-architecture-schema-fixes*
*Completed: 2026-03-21*
