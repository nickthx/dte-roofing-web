---
phase: quick-261120-hjj
plan: 01
subsystem: seo
tags: [favicon, manifest, seo, ios]
requires: []
provides: [square favicons, apple-touch-icon PNG, manifest PNG icons]
affects: [index.html (every prerendered page head), public/site.webmanifest]
tech-stack:
  added: []
  patterns: [one-off sharp rasterization of repo SVG marks]
key-files:
  created:
    - public/favicon-48.png
    - public/apple-touch-icon.png
    - public/icon-192.png
    - public/icon-512.png
  modified:
    - index.html
    - public/site.webmanifest
decisions:
  - Keep public/dte_favicon.png on disk (unreferenced) so cached external requests do not 404
  - Flatten apple-touch/manifest PNGs onto #ffffff to avoid iOS black corners
metrics:
  completed: 2026-11-20
  tasks: 3
  files: 6
---

# Quick 261120-hjj: Replace non-square favicon with square icons Summary

Swapped the 2400x1800 wide-logo favicon for square icons rasterized with sharp from the existing square SVG marks: /favicon.svg plus a 48x48 PNG fallback for rel=icon, a 180x180 PNG apple-touch-icon, and 192/512 PNG manifest icons.

## Tasks

| Task | Name | Commit |
| ---- | ---- | ------ |
| 1 | Render four square PNGs with sharp | 6795e63 |
| 2 | Point index.html and site.webmanifest at square icons | 6795e63 |
| 3 | Build, verify dist, restore sitemap, commit | 6795e63 |

The plan specified a single commit for all six paths. That commit is 6795e63.

## Verification

- Task 1 check: favicon-48 48x48 (1531 B), apple-touch-icon 180x180 (4189 B), icon-192 192x192 (4827 B), icon-512 512x512 (12751 B), all PNG. dte_favicon.png is still present.
- Task 2 check passed. Manifest icons: /favicon.svg, /icon-192.png, /icon-512.png. CRLF is preserved in both files.
- `npm run build` exited 0. The Task 3 dist check passed for dist/index.html and dist/locations/columbus/index.html. No dist HTML references dte_favicon.png. public/sitemap.xml was restored and is clean.
- Visual check: icon-512.png shows the red DTE house on a light rounded square.

## Deviations from Plan

The commit trailer uses the session-attribution line (`Claude Opus 5.5`) because the plan says to use "the Co-Authored-By trailer from the session attribution". The orchestrator prompt gave a different trailer. Nothing else deviated from the plan.

## Self-Check: PASSED

The four PNGs exist in public/ and dist/, and commit 6795e63 is present on main. Nothing was pushed.
