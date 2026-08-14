---
quick_id: 260814-jwp
description: Add /images cache-control header to vercel.json
date: 2026-08-14
mode: quick
---

# Quick Task 260814-jwp: Add /images cache-control header to vercel.json

## Problem

Vercel's default for static files in `/public` is `Cache-Control: public, max-age=0, must-revalidate`.
Every image under `/images/` therefore triggers a conditional request (304 round-trip) on every
repeat page view. With 277 files in `public/images/` and multiple images per page, that is 20-40
avoidable round-trips per repeat visit.

`vercel.json` already sets 1-year immutable caching for `/assets/(.*)` (Vite content-hashed
bundles), but nothing covers `/images/`.

## Decision

Use `public, max-age=2592000, stale-while-revalidate=86400` (30 days + 1 day SWR) rather than
`max-age=31536000, immutable`.

Rationale: image filenames in `public/images/` are stable and unhashed
(`columbus-emergency-roof-repair.jpg`). A 1-year immutable header means overwriting a photo in
place leaves prior visitors stuck on the old file for up to a year with no cache-bust path.
30 days + SWR keeps ~all of the latency win while allowing in-place image replacement to
propagate within a month.

## Tasks

### Task 1: Add the header rule

- **files**: `vercel.json`
- **action**: Insert a new entry as the first element of the existing `headers` array,
  before the `/assets/(.*)` rule:
  ```json
  {
    "source": "/images/(.*)",
    "headers": [
      { "key": "Cache-Control", "value": "public, max-age=2592000, stale-while-revalidate=86400" }
    ]
  }
  ```
- **verify**: `node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf8'))"` parses
  clean; `npm run build` succeeds.
- **done**: `vercel.json` contains the `/images/(.*)` rule and no other content changed.

## Non-goals

- No change to the existing `/assets/(.*)` rule (correct as-is — Vite hashes those filenames).
- No change to the `/(.*)` security-header rule (sets no `Cache-Control`, so no conflict).
- No change to HTML caching — prerendered pages must stay revalidating.

## must_haves

- **truths**: `/images/*` responses carry a long-lived `Cache-Control` after deploy.
- **artifacts**: `vercel.json` with a `/images/(.*)` headers entry.
- **key_links**: `vercel.json`
