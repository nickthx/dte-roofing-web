---
phase: 5
plan: "05-01"
title: "Fix /blog SSR empty title and h1"
status: complete
commit: e4c38bd
duration: 3min
tasks_completed: 2
files_changed: 2
---

# Summary: 05-01 — Fix /blog SSR empty title and h1

## What Changed

### Blog.tsx
- Removed early-return loading guard that prevented SEO/hero from rendering during SSR prerender
- Replaced 166-char "BEST Roofer in Columbus..." title with "Roofing Tips & News | DTE Roofing Blog"
- Updated meta description to Central Ohio-focused copy
- Moved loading spinner inline to blog posts grid section only

### BlogPost.tsx
- Added computed SEO variables (pageTitle, pageDescription, pageCanonical, pageKeywords) with static fallbacks
- Added `<SEO>` component to loading and not-found code paths (now 3 total)
- All code paths render proper metadata for SPA shell

## Verification Results

| Check | Result |
|-------|--------|
| `npm run build` | PASS |
| `npx tsc --noEmit` | PASS |
| Blog title in dist HTML | PASS — "Roofing Tips & News | DTE Roofing Blog" |
| Blog h1 in dist HTML | PASS — "Roofing Tips & Insights for Central Ohio Homeowners" |
| "BEST Roofer" removed | PASS — not found in dist/blog/index.html |
| Blog description updated | PASS — "Expert roofing advice for Central Ohio" |
| BlogPost.tsx SEO count | PASS — 3 instances (loading, not-found, post-loaded) |
