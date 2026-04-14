---
quick_id: 260413-tb5
description: Add missing social meta tags (og:image, og:url, twitter:image, twitter:site) to SEO.tsx and index.html
date: 2026-04-13
commits:
  - 3d715f8 feat(260413-tb5-01): emit og:image, og:url, twitter:image, twitter:site in SEO component
  - c5cc9a2 feat(260413-tb5-02): add static fallback og:image, og:url, twitter:image, twitter:site to index.html
duration: 2m 25s
status: complete
---

# Quick Task 260413-tb5 — Summary

## What Shipped

Filled 4 missing social-share meta tags identified in the 2026-04-13 technical SEO audit. Non-JS bots and social crawlers (Facebook, LinkedIn, X) now receive `og:image`, `og:url`, `twitter:image`, and `twitter:site` on every prerendered page and on the static `index.html` shell.

## Changes

| File | Change |
|------|--------|
| `src/components/SEO.tsx` | +9/-1 — added `DEFAULT_OG_IMAGE` constant, `twitterSite` optional prop, rendered 4 previously missing tags. Fixes latent bug where `ogImage` prop was typed but never emitted. |
| `index.html` | +4/0 — static fallback tags so first-paint and bots without JS see values before react-helmet-async mounts. |

## Key Design Decisions

- **`og:url` derived from `canonical` prop** — every existing call site auto-gets `og:url` with no prop plumbing across ~25 pages.
- **`og:image` always emitted** (never gated on prop) — fixes site-wide "no social preview image" bug.
- **`twitter:image` mirrors resolved `og:image`** — single source of truth, no second default chain.
- **`twitter:site` opt-in via new prop + index.html fallback** — backwards-compatible with every existing SEO.tsx call site.

## Verification

Ran `npm run build` twice (after each task). Verified on prerendered output:

- `dist/index.html`, `dist/locations/columbus/index.html`, `dist/services/roof-repair/index.html` → all 4 new tags present
- `og:url` on `/locations/columbus` and `/services/roof-repair` matches their `canonical` exactly (no drift)
- 7 pre-existing tags (og:title, og:description, og:type, twitter:card, twitter:title, twitter:description, canonical) verified unchanged
- Static `index.html` contains all 4 fallback tags (grep count = 4)

## Audit Reference

Source: `memory/audits/technical-seo-checker/2026-04-13-dteroofingllc-technical-seo.md` — P1 "Missing social/share tags" line item. Remaining audit items (`/blog/:slug` 404, 308→301 redirect) are tracked separately.
