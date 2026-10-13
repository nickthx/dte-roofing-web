---
phase: quick-261013-j8a
plan: 01
subsystem: maps / local SEO
tags: [google-maps, embed, nap, location-pages]
requires: []
provides: [src/data/business.ts (HQ_PLACE_ID, HQ_GEO, HQ_MAP_EMBED_SRC, HQ_GOOGLE_MAPS_URL)]
affects: [13 location pages, Home, Contact, Footer, Reviews, /locations hub map]
key-files:
  created: [src/data/business.ts]
  modified:
    - src/components/ServiceAreaMap.tsx
    - src/pages/Home.tsx
    - src/pages/Contact.tsx
    - src/components/Footer.tsx
    - src/pages/Reviews.tsx
    - src/pages/locations/*.tsx (13 files)
decisions:
  - "Dropped the now-unused isHQ field from CityMarker; HQ is its own marker at HQ_GEO"
metrics:
  completed: 2026-10-13
  tasks: 3
  files: 19
---

# Quick 261013-j8a: Standardize Google Maps embed Summary

All site map iframes (13 location pages, Home, Contact) now use one verified business-listing embed (place id 0x883897c3548f20bf:0xdd1da18d4d7ccf43), and all 7 "Google Maps" place links use one shared URL. Both come from the new `src/data/business.ts`. The /locations hub map star now sits at the real HQ (39.9637636, -83.1476323).

## Commits

| Task | Commit | Message |
|------|--------|---------|
| 1 | aa4c895 | fix(maps): add shared business listing constants and real hq marker on hub map |
| 2 | 1d70162 | fix(maps): use shared listing embed and maps link on home, contact, footer and reviews |
| 3 | 8caffee | fix(maps): use the verified business-listing embed on every location page |

## Numstat vs 23dfeb1 (added / removed)

- src/data/business.ts 7/0 (new, LF)
- src/components/ServiceAreaMap.tsx: hub map HQ marker rewrite (Hilliard is now a plain marker; new "DTE Roofing — Headquarters" star marker at HQ_GEO with address and /contact link, added to bounds before fitBounds)
- Home 6/5, Contact 3/2, Footer 2/1, Reviews 2/1
- Delaware, Dublin, NewAlbany 3/2 (embed + title); the other 10 location pages 2/1

## Verification

- All three tasks' automated verify blocks passed: the URLs match Home.tsx at 23dfeb1 byte-for-byte, CRLF is intact on all 18 .tsx files, business.ts is LF, and the filtered type gate prints nothing.
- 15 pages use HQ_MAP_EMBED_SRC. No `maps/embed?pb=` or `maps?q=615` literals and no `href="…maps/place…"` literals remain in src. All 12 `maps/dir/` Get Directions links are untouched.
- The Dublin, Delaware and New Albany titles now read "Map showing DTE Roofing headquarters at 615 Hilliard Rome Rd, Columbus, OH 43228, serving {City}, OH".
- The build, verify-links and verify-schema were not run, per the constraints; the orchestrator runs them.

## Deviations from Plan

None. The plan was executed as written. Note: the repo has `core.autocrlf=true`, so git warns that LF will become CRLF for business.ts in the working copy. The committed blob and the current working file are both LF.

## Self-Check: PASSED

- src/data/business.ts exists. Commits aa4c895, 1d70162 and 8caffee are present in git log.
