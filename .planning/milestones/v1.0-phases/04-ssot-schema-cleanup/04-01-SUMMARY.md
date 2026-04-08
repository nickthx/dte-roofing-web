---
phase: 04-ssot-schema-cleanup
plan: 01
subsystem: data, seo
tags: [typescript, react, json-ld, schema, ssot, breadcrumb]

requires:
  - phase: 01-schema-data-foundation
    provides: LocationConfig interface and LOCATIONS array in src/data/locations.ts
  - phase: 02-linking-footer-breadcrumb
    provides: SchemaMarkup hub breadcrumb logic
provides:
  - Centralized LocationConfig with description and highlight fields for hub card grid
  - Correct 2-item hub breadcrumb schema (no self-reference)
  - Complete useEffect dependency array in SchemaMarkup
  - Removal of unused getAllLocationSlugs export
affects: []

tech-stack:
  added: []
  patterns:
    - "Hub page card grid driven by LOCATIONS SSOT import rather than local duplicate array"

key-files:
  created: []
  modified:
    - src/data/locations.ts
    - src/pages/Locations.tsx
    - src/components/SchemaMarkup.tsx

key-decisions:
  - "Extended LocationConfig with optional description/highlight fields to keep backward compatibility"
  - "Split hub/location breadcrumb into separate conditional branches for correct item counts"

patterns-established:
  - "All page-level display data (description, highlight) lives in LOCATIONS SSOT, not in page components"

requirements-completed: [DATA-01, SCHEMA-06]

duration: 4min
completed: 2026-03-23
---

# Phase 04 Plan 01: SSOT Schema Cleanup Summary

**Hub card grid migrated to LOCATIONS SSOT with description/highlight fields, hub breadcrumb fixed to 2-item chain, useEffect deps completed, unused export removed**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-23T21:25:09Z
- **Completed:** 2026-03-23T21:29:19Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Hub page city card grid now consumes LOCATIONS from centralized data file -- no local duplicate array
- Hub breadcrumb schema produces correct 2-item chain [Home, Service Areas] instead of self-referencing 3-item chain
- SchemaMarkup useEffect dependency array includes locationName and pageDescription
- Removed unused getAllLocationSlugs export from locations.ts

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend LocationConfig and migrate hub card grid to LOCATIONS SSOT** - `0bcddf2` (feat)
2. **Task 2: Fix hub breadcrumb schema and useEffect dependency array in SchemaMarkup.tsx** - `fdf5d1c` (fix)

## Files Created/Modified
- `src/data/locations.ts` - Extended LocationConfig with description/highlight, added values to all 13 entries, removed getAllLocationSlugs
- `src/pages/Locations.tsx` - Replaced local duplicate array with LOCATIONS import, updated card grid to use location.cityName
- `src/components/SchemaMarkup.tsx` - Split hub/location breadcrumb branches, added locationName and pageDescription to useEffect deps

## Decisions Made
- Extended LocationConfig with optional description/highlight fields to maintain backward compatibility with existing consumers
- Split the combined hub/location breadcrumb conditional into two separate branches for correct schema output

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 4 tech debt items from v1.0-MILESTONE-AUDIT.md are resolved
- Zero TypeScript errors, production build succeeds
- No remaining tech debt items for this milestone

---
*Phase: 04-ssot-schema-cleanup*
*Completed: 2026-03-23*
