---
phase: quick-261012-lje
plan: 01
status: complete
subsystem: app-shell
tags: [error-boundary, code-splitting, resilience, vite]
requires: []
provides:
  - RouteErrorBoundary (route-level error boundary inside <main>)
  - installChunkReloadHandler (one-shot reload on vite:preloadError)
affects: [src/App.tsx, src/main.tsx]
tech-stack:
  added: []
  patterns: [class error boundary keyed by pathname, sessionStorage-guarded reload]
key-files:
  created:
    - src/components/RouteErrorBoundary.tsx
    - src/utils/chunkReload.ts
  modified:
    - src/App.tsx
    - src/main.tsx
decisions:
  - Fallback uses h2 (never h1) and only renders after a client error, so it never shows up in prerendered HTML
  - The reload handler does not reload when sessionStorage is unavailable, so it cannot loop; it falls through to the boundary instead
  - chunkReload.ts is imported only by main.tsx, which keeps it out of the SSR graph
commit: 1b06499
completed: 2026-10-12
---

# Quick 261012-lje: Route Error Boundary + One-Shot Chunk Reload Summary

If a lazy route chunk fails to load, the page now reloads once automatically. If it fails again, a branded fallback appears inside `<main>`. Navigation and Footer stay mounted throughout, so the page never goes blank.

## Commit

- `1b06499` fix(app): add route error boundary and one-shot chunk reload. It contains exactly 4 files: RouteErrorBoundary.tsx, chunkReload.ts, App.tsx, main.tsx. Not pushed.

## What Changed

- **src/components/RouteErrorBoundary.tsx** (new): a class boundary (`getDerivedStateFromError`, `componentDidCatch` -> console.error). The default export wraps it with `key={pathname}`, so it resets when you navigate to another route. The fallback has an h2 "This page didn't finish loading", a "Reload page" button, a "Go to homepage" link and a `tel:6149716028` link.
- **src/utils/chunkReload.ts** (new): `installChunkReloadHandler()` listens for `vite:preloadError`. It allows one reload per 10 s window, tracked under the sessionStorage key `dte:chunk-reload-at`. Every storage access is wrapped in try/catch.
- **src/App.tsx**: added the import, and `<RouteErrorBoundary>` now wraps the existing Suspense. `git diff -w` shows only 3 added lines (import + open/close tags). The rest of the diff is re-indentation; no Route lines changed.
- **src/main.tsx**: added the import and a call to `installChunkReloadHandler()` before the hydrate/create branch.

## Verification

| Check | Result |
|---|---|
| tsc filtered to the 4 files | no errors |
| `npm run build` | exit 0 |
| `npm run verify-schema` | checked 41, pass 41, fail 0, skip 0 |
| `<h1` count, dist/locations/dublin/index.html | 1 |
| `<h1` count, dist/services/roof-repair/index.html | 1 |
| "Reload page" in Dublin + RoofRepair HTML | 0 (also 0 across all dist HTML) |
| `dte:chunk-reload-at` in client bundle | dist/assets/index-CxW5fiLO.js |
| public/sitemap.xml restored | yes, `git status --short public/sitemap.xml` is empty |

## Deviations from Plan

- The fallback's phone text is `614-971-6028`, the number shown in Footer.tsx. The Footer prefixes it with "Call/Text: ". That prefix was dropped because the sentence before the link already reads "Call us at". The href is unchanged (`tel:6149716028`).
- `readLastReload()` uses `Number.isFinite` to treat NaN/garbage as 0, as the plan asked.
- The commit trailer uses the orchestrator-specified `Co-Authored-By: Claude Fable 5.1` line instead of the line in the plan.

## Known Stubs

None.

## Self-Check: PASSED

- src/components/RouteErrorBoundary.tsx: FOUND
- src/utils/chunkReload.ts: FOUND
- commit 1b06499: FOUND
