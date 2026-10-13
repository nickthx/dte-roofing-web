---
phase: quick-261013-gsu
plan: 01
status: complete
subsystem: app-shell / error handling
tags: [prerender, hydration, error-boundary, chunk-load]
requires: [chunkReload one-shot reload handler, RouteErrorBoundary]
provides: [prerendered <main> snapshot fallback on route chunk failure]
affects: [src/main.tsx, src/components/RouteErrorBoundary.tsx]
tech-stack:
  added: []
  patterns: [snapshot SSR innerHTML before hydrateRoot, pathname-matched fallback render]
key-files:
  created: [src/utils/prerenderSnapshot.ts]
  modified: [src/main.tsx, src/components/RouteErrorBoundary.tsx]
decisions:
  - "Snapshot is pathname-matched (trailing slashes normalized); any other route falls back to the unchanged error section"
metrics:
  completed: 2026-10-13
  tasks: 2
  files: 3
  commit: 89f7418
---

# Quick 261013-gsu: Keep prerendered HTML on screen when a route chunk fails

The prerendered `<main>` innerHTML is now captured before `hydrateRoot`. When RouteErrorBoundary catches a failure on that same pathname, it re-renders the captured markup under a `role="status"` banner that says "Part of this page didn't load." with a Reload button. With no matching snapshot, the original error section renders unchanged.

## Tasks

| # | Task | Commit |
|---|------|--------|
| 1 | prerenderSnapshot util, capture in main.tsx, snapshot rendering in boundary | 89f7418 |
| 2 | Build and headless-browser proof of both branches, then commit | 89f7418 (single commit, as instructed) |

## Verification

- `npm run build` exit 0 (prerender imports the util, so it is SSR-safe); public/sitemap.xml restored
- dist/locations/dublin/index.html: 1 `<h1`, 0 "Part of this page"
- Dublin chunk hidden, headless Chrome dump of /locations/dublin/: banner=1, role="status"=1, Dublin H1=1, "This page didn"=0 (90 KB DOM, full section markup follows the banner)
- NotFound chunk hidden, empty-#root shell built from 404.html at /zz-shell-test/: "This page didn"=1, banner=0
- Cleanup: chunks restored, dist/zz-shell-test removed, port 4199 freed

## Deviations from Plan

- Working-tree files use CRLF line endings, so I made the edits with a CRLF-aware script. No change to behaviour.
- Commit trailer is `Co-Authored-By: Claude Fable 5.1`, as the orchestrator instructed in place of the plan's line.

## Known Stubs

None.

## Self-Check: PASSED
- src/utils/prerenderSnapshot.ts exists; commit 89f7418 contains exactly the 3 source files; not pushed.
