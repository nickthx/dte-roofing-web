---
quick_id: 260503-og2
description: Remove duplicate og:* / twitter:* tags from index.html shell; drop dead twitter:site
date: 2026-05-03
commits:
  - 1084d33 fix(seo): dedupe og:* and twitter:* tags, drop dead twitter:site (260503-og2)
status: complete
---

# Quick Task 260503-og2 — Summary

## What Shipped

Eliminated duplicate Open Graph and Twitter Card tags on every prerendered page. The 2026-05-03 technical SEO audit caught that `index.html` was hardcoding page-specific og/twitter tags that react-helmet-async (via `SEO.tsx`) was already emitting per-page during prerender — so every page shipped two `og:url` tags (one always pointing at `/`, one correct), two `og:image`, two `og:type`, and two `twitter:card`. Social scrapers (Facebook, LinkedIn, iMessage) typically pick the first occurrence, which meant share cards across the site could link back to the homepage instead of the actual page.

Also dropped the `twitter:site="@DTERoofing"` tag entirely — DTE Roofing has no X/Twitter account, so the tag was a meaningless lie to crawlers.

## Changes

| File | Change |
|------|--------|
| `index.html` | -14/+1 — removed 11 page-specific tags (og:type, og:image bundle ×5, og:url, twitter:card, twitter:image, twitter:image:alt, twitter:site). Kept og:locale and og:site_name as the only page-agnostic shell tags. Helmet now owns every per-page og/twitter tag. |
| `src/components/SEO.tsx` | -3 — dropped `twitterSite` prop from `SEOProps`, function destructure, and the conditional `<meta name="twitter:site">` render. `DEFAULT_OG_IMAGE` and `DEFAULT_OG_IMAGE_ALT` constants preserved (Helmet still uses them as fallbacks when no `ogImage` prop is passed). |

No page components were touched — `twitterSite` had never been passed by any caller.

## Key Design Decisions

- **Index.html shell becomes truly page-agnostic** — only og:locale + og:site_name remain. Anything per-page is sourced from Helmet, eliminating any chance of future drift between hardcoded fallback and rendered value.
- **Removed prop instead of deprecating it** — `twitterSite` was never used by any call site. No backwards-compat shim needed.
- **Reverses the redundant half of 260413-tb5** — that task added static fallback tags before prerender was bulletproof. Now that all 34 routes prerender successfully through `scripts/prerender.mjs`, Helmet's per-page output is the single source of truth and the static fallbacks are net-negative.
- **Did not modify `scripts/prerender.mjs`** — the cleaner alternative would extend the prerender's strip regex to remove og/twitter tags from the template, but removing them at the source is simpler and matches the "Helmet is canonical" model.

## Verification

Ran `npm run build` — clean, all 34 routes prerendered.

Grep counts on prerendered output:

| Tag | Pages checked | Count expected | Count actual |
|-----|---------------|----------------|--------------|
| `og:url` | 7 (home, columbus, dublin, roof-repair, storm-damage, about, contact) | 1 each | 1 each |
| `og:type` | 5 | 1 each | 1 each |
| `og:image` (without `:width`/`:height`/etc.) | 5 | 1 each | 1 each |
| `twitter:card` | 5 | 1 each | 1 each |
| `twitter:site` | site-wide (HTML) | 0 | 0 |

Two `twitter:site` literals remain in `dist/assets/index-*.js` and `dist/server/entry-server.js` — these are react-helmet-async's internal list of recognized meta tag names (string constants used for canonicalization), not emitted output. No `<meta name="twitter:site">` is rendered on any page.

Visual spot-check of `dist/locations/columbus/index.html` head confirms the expected layout: shell ships only `og:locale` + `og:site_name`; Helmet ships title, description, keywords, full per-page og + twitter set with `og:url=https://www.dteroofingllc.com/locations/columbus`, canonical, geo.placename, and 3 JSON-LD blocks (RoofingContractor, BreadcrumbList, WebPage).

## Audit Reference

Source: 2026-05-03 technical SEO audit (handoff to be saved at `memory/audits/technical-seo-checker/`). Closes the C1 critical item. Other open items from that audit (H1 service pages missing LocalBusiness schema, M1–M5) remain tracked.
