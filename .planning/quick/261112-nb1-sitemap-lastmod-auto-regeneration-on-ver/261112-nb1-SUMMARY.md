---
phase: quick-261112-nb1
plan: 01
subsystem: seo-build, locations-map
tags: [sitemap, vercel, google-maps, advanced-markers]
requires: []
provides:
  - Self-maintaining sitemap lastmod on Vercel (unshallow + regenerate, else committed fallback)
  - ServiceAreaMap on AdvancedMarkerElement/PinElement with loading=async callback loader
affects: [public/sitemap.xml, /locations]
tech-stack:
  added: []
  patterns: [build-step never-fail fallback, memoized script-loader promise resolved by callback]
key-files:
  created: []
  modified:
    - scripts/generate-sitemap.mjs
    - src/components/ServiceAreaMap.tsx
    - public/sitemap.xml
decisions:
  - Vercel sitemap regenerates only when is-shallow-repository is strictly false after unshallow attempts; otherwise committed file ships
  - Map uses mapId DEMO_MAP_ID; old styles array removed (POI/transit hiding now needs a cloud-styled Map ID)
metrics:
  completed: 2026-11-12
  tasks: 3
  files: 3
---

# Quick 261112-nb1: Sitemap lastmod auto-regeneration + Maps advanced markers Summary

On Vercel the sitemap generator now unshallows the clone (origin, then the public GitHub URL, 45s each, no prompts) and regenerates real per-page lastmod values. If that fails it keeps the committed sitemap and exits 0. ServiceAreaMap moved from the deprecated `google.maps.Marker` to `AdvancedMarkerElement` + `PinElement`, with a `loading=async` + `callback=` loader.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 88c5ebf | fix: unshallow on Vercel so sitemap lastmod regenerates |
| 2 | ede7352 | fix: advanced markers and async Maps loader on /locations |
| 3 | 5927a0b | chore: regenerate sitemap with current lastmod |

## Verification

- Task 1: `node --check` passes. `VERCEL=1` on the full repo logs "Full history available on Vercel, regenerating." FALLBACK_OK: in a shallow clone with both fetches blocked, both failures were logged, the build exited 0, and the sitemap stayed byte-identical. UNSHALLOW_OK: a shallow clone unshallowed via origin and regenerated with varied dates.
- Task 2: GREP_OK on all gates, no new non-'google' tsc errors in ServiceAreaMap.tsx, and `npm run build` passes.
- Task 3: SITEMAP_OK (only lastmod lines changed, 41 URLs, `/` = 2026-11-12) and SITEMAP_STABLE across `npm run build`. Distribution is now 19 URLs at 2026-11-12, 19 at 2026-10-13, 2 at 2026-10-02 and 1 at 2026-10-27.
- Nothing pushed.

## Deviations from Plan

None that change behavior. Small additions the plan didn't spell out: `isMapsReady()` also checks `typeof window !== 'undefined'` as an extra SSR guard, the HQ marker also sets `gmpClickable: true`, and a successful unshallow logs "Unshallowed clone via <remote>". If the marker library isn't ready and `importLibrary` is missing, the Maps callback still resolves as a last resort. That can't happen in practice while the script URL includes `libraries=marker`. The plan's list of dirty files (Home.tsx, WorkCarousel.tsx, index.css) was out of date. At execution time only `.claude/settings.local.json` and the untracked `.planning/` dirs were dirty, and none of them were staged.

## Notes / Follow-ups

- Post-deploy checks: the /locations console should show no Marker deprecation or loading=async warnings, and pins and info windows should work. The API key is referrer-restricted, so this can't be checked locally. The Vercel build log should show either "regenerating" or a logged fallback reason.
- Visual change: with a mapId set, the old custom styling (hidden POIs/transit, tinted water and highways) no longer applies. Getting it back needs a cloud-styled Map ID.
- Pins are now Google's standard balloon PinElement, not the old circle symbols.

## Self-Check: PASSED

- scripts/generate-sitemap.mjs, src/components/ServiceAreaMap.tsx, public/sitemap.xml: modified and committed
- Commits 88c5ebf, ede7352, 5927a0b present in git log
