---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: — Per-Page SEO Metadata Overhaul
status: complete
stopped_at: Milestone v1.1 complete
last_updated: "2026-08-14"
last_activity: 2026-08-14 -- Completed quick task 260814-k1s: deleted 9 verified-dead paths (6 unreferenced files served from public/, plus SeoSchema.tsx, routes.config.ts, dead-code/)
progress:
  total_phases: 5
  completed_phases: 5
  total_plans: 10
  completed_plans: 10
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-08)

**Core value:** Establish DTE Roofing as the authoritative local roofing contractor across all 13 Central Ohio service areas through proper schema, cross-linking, and page structure.
**Current focus:** Milestone v1.1 complete

## Current Position

Phase: 05 (blog-ssr-fix-final-verification) — COMPLETE
Plan: 2 of 2 — All plans executed
Status: Milestone v1.1 complete — deployed to Vercel production
Last activity: 2026-04-10 -- Phase 5 deployed and verified on production

## Performance Metrics

**Velocity:**

- Total plans completed: 2
- Average duration: -
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01 | 2 | - | - |

**Recent Trend:**

- Last 5 plans: -
- Trend: -

*Updated after each plan completion*
| Phase 01 P01 | 3min | 2 tasks | 3 files |
| Phase 01 P02 | 2min | 2 tasks | 14 files |
| Phase 02 P02 | 85s | 1 tasks | 2 files |
| Phase 02 P01 | 3min | 2 tasks | 15 files |
| Phase 03 P01 | 133s | 2 tasks | 3 files |
| Phase 03 P02 | 3min | 2 tasks | 3 files |
| Phase 04 P01 | 4min | 2 tasks | 3 files |
| Phase 03 P01 | 5min | 3 tasks | 2 files |
| Phase 05 P01 | 3min | 2 tasks | 2 files |
| Phase 05 P02 | 10min | 6 tasks | verification + deploy |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Roadmap]: 3-phase structure -- data/schema first, then linking, then hub enhancements
- [Roadmap]: Hub H1 change to "Areas We Serve in Central Ohio" to stop Columbus cannibalization
- [Phase 01]: Geo coordinates standardized to 39.9637153, -83.1477371 across schema files
- [Phase 01]: BUSINESS_INFO.areaServed computed from LOCATIONS array at module level for consistent 13-city-only output
- [Phase 01]: Hub H1 changed to 'Areas We Serve in Central Ohio' to stop Columbus cannibalization
- [Phase 02]: 2-column sub-grid layout for 13-city footer keeps vertical height balanced with adjacent columns
- [Phase 03]: GutterServices.tsx confirmed LINK-04 compliant with 3 existing links; research audit was inaccurate about 1 link
- [Phase 03]: Used static CITY_POSITIONS constant for SVG map coordinates rather than computed layout
- [Phase 04]: Extended LocationConfig with optional description/highlight fields for hub card grid SSOT
- [Phase 04]: Split hub/location breadcrumb into separate branches for correct 2-item vs 3-item schema output
- [Phase 03]: Core pages copy packet approved (approve-all, zero mods)

### Pending Todos

None yet.

### Blockers/Concerns

- [Research]: Service area map implementation (Phase 3) may need a research spike for lightweight options (static SVG vs interactive)
- [Research]: aggregateRating async fetch may miss Googlebot render -- low priority, deferred to v2

### Quick Tasks Completed

| # | Description | Date | Commit | Directory |
|---|-------------|------|--------|-----------|
| x50 | Replace BBB and Nextdoor placeholder logos with official logos | 2026-03-26 | fd1170d | [x50-replace-bbb-and-nextdoor-placeholder-log](./quick/260325-x50-replace-bbb-and-nextdoor-placeholder-log/) |
| 260407-lws | Tech SEO Phase A: apex 301, security headers, gutter-services 301, sitemap regen | 2026-04-07 | b3f4968 | [260407-lws-technical-seo-phase-a-vercel-json-301-re](./quick/260407-lws-technical-seo-phase-a-vercel-json-301-re/) |
| 260407-m8b | Tech SEO Phase B: prerender all routes (helmet refactor, SSG pipeline, Navigate→301) | 2026-04-07 | f144e2e | [260407-m8b-phase-b-prerender-react-router-routes-fo](./quick/260407-m8b-phase-b-prerender-react-router-routes-fo/) |
| 260411-kct | Critical SEO header + index.html cleanup (HSTS + static head neutralization) | 2026-04-11 | 1ee0b31 | [260411-kct-critical-seo-header-index-html-cleanup-a](./quick/260411-kct-critical-seo-header-index-html-cleanup-a/) |
| 260411-m0s | Security headers batch 2 (Permissions-Policy + CSP enforcing) | 2026-04-11 | 678e0f3 | [260411-m0s-security-headers-batch-2-add-permissions](./quick/260411-m0s-security-headers-batch-2-add-permissions/) |
| 260413-t5b | Refresh sitemap.xml home lastmod after footer/home overhaul | 2026-04-13 | a74d83f | [260413-t5b-update-sitemap-xml-lastmod-to-reflect-co](./quick/260413-t5b-update-sitemap-xml-lastmod-to-reflect-co/) |
| 260413-tb5 | Add missing social meta tags (og:image, og:url, twitter:image, twitter:site) to SEO.tsx + index.html | 2026-04-13 | c5cc9a2 | [260413-tb5-add-missing-social-meta-tags-og-image-og](./quick/260413-tb5-add-missing-social-meta-tags-og-image-og/) |
| 260413-tz5 | Remove dead /blog/:slug rewrite from vercel.json; close 308 audit item | 2026-04-13 | cde9d55 | [260413-tz5-remove-dead-blog-slug-rewrite-from-verce](./quick/260413-tz5-remove-dead-blog-slug-rewrite-from-verce/) |
| 260503-og1 | Add og:image:width/height/type/alt + twitter:image:alt to SEO.tsx + index.html | 2026-05-03 | dec36dd | [260503-og1-add-og-image-dimensions-and-alt-tags](./quick/260503-og1-add-og-image-dimensions-and-alt-tags/) |
| 260503-og2 | Dedupe og:* and twitter:* tags from index.html shell; drop dead twitter:site | 2026-05-03 | 1084d33 | [260503-og2-remove-duplicate-og-tags-from-index-html](./quick/260503-og2-remove-duplicate-og-tags-from-index-html/) |
| 260503-h1-pilot | Add RoofingContractor schema to service pages (whitelist 'service'); archive dead GutterServices/RoofMaintenance routes to /dead-code/ | 2026-05-03 | ab19287 | inline (no plan dir) |
| 260503-h1-hotfix | Decouple SchemaMarkup from useReviewData via build-time review-stats.json; fixes Rich Results "multiple aggregate ratings" error from Helmet SSR/hydration drift | 2026-05-03 | 491e3c3 | inline (no plan dir) |
| 260503-h1-rollout | Add `<SchemaMarkup type="service">` to 8 remaining service pages (inspection, installation, gutters, emergency-services, storm-damage, commercial-roofing, preventative-maintenance, siding); bump review-stats.json reviewCount 95→102 | 2026-05-03 | 2c1f729 | inline (no plan dir) |
| 260511-fq1 | Consolidate service-page FAQPage schema via SchemaMarkup; remove broken inline `<script>{JSON.stringify(faqSchema)}</script>` from ServicePageTemplate that rendered HTML-entity-escaped JSON-LD (only RoofRepair.tsx affected — sole consumer of the template) | 2026-05-11 | 771158b | inline (no plan dir) |
| 260511-rs1 | Defer Roofle slideout widget via RoofleSlideout.tsx: remove `<script>` from index.html, lazy-inject after `requestIdleCallback` (3000ms timeout) with 1500ms setTimeout fallback for Safari. Preconnect kept. InstantQuote.tsx (embedded variant) untouched. | 2026-05-11 | 92a67e3 | inline (no plan dir) |
| 260511-rv1 | Remove synthetic-date Review[] block from JSON-LD on /reviews; AggregateRating (sourced from review-stats.json) preserved. Delete unused ReviewItem interface + reviews prop from SchemaMarkup; drop reviews prop from Reviews.tsx call site. Visible testimonial UI unchanged. | 2026-05-11 | 7a6b8c2 | inline (no plan dir) |
| 260511-hb1 | Stop home hero from referencing empty stub `/images/hero-roofing-professional.jpg`: drop `preloadImage` prop on `<SEO>` (kills `<link rel="preload">` for an empty file) and delete the misleading `role="img"` background-image div from Home.tsx hero. Gradient + darkening overlay preserved (matches all 33 other routes). | 2026-05-11 | 270777f | inline (no plan dir) |
| 260511-as1 | Remove redundant `areaServed: BUSINESS_INFO.areaServed` from `generateServiceSchema` in SchemaMarkup.tsx. Service node still references its provider via `@id` → `#business`, and the RoofingContractor block on the same page already emits a per-page-scoped areaServed (13-city on hub/home/service, location-subset on /locations/<city>). Saves ~1 KB of JSON-LD per service page with no SEO regression. | 2026-05-11 | fe5ad64 | inline (no plan dir) |
| 260511-pf1 | Add FAQPage JSON-LD to /locations/powell by lifting the 10 hardcoded `<details>` FAQ blocks into a `powellFaqs` array, mapping the visible UI over it (DRY), and passing `faqs={powellFaqs}` to the existing `<SchemaMarkup type="location">` invocation. Prerendered output now emits a valid FAQPage with 10 Question/Answer entries; visible accordion unchanged; other 12 location pages have no FAQ content and are out of scope (audit item C2, Powell-only first pass). | 2026-05-11 | aa5d279 | inline (no plan dir) |
| 260511-mh1 | On-page audit I1/I2/I3: rewrite /services/roof-repair meta description (96→157 chars, adds leak fixes/shingle replacement/flashing/storm damage/phone) and home meta description (124→153 chars, leads with services + gutters/siding/storm damage/phone + free-inspections CTA). Add geo-led H1 to /services/roof-repair ("Roof Repair in Columbus, OH — Honest Repairs That Last") via a new optional `headline` prop on ServicePageTemplate; original copy preserved as a `??` fallback so future consumers can't regress. SchemaMarkup `pageDescription` left intact. | 2026-05-11 | 3c3b0c4 | inline (no plan dir) |
| 260511-tp1 | On-page audit P1/P2/P3 polish trio: trim /locations/columbus title 62→60 chars ("Roofers in Columbus, OH \| Repair & Replacement \| DTE Roofing", brand at tail); trim /locations/powell meta description 162→159 chars (drop "Call " prefix per Home convention; drop duplicate "roof " before "inspections"); replace generic "View All Areas →" anchor text with "View All Central Ohio Service Areas →" site-wide (Home.tsx + Contact.tsx, 2 occurrences). Zero schema/canonical/regression impact. | 2026-05-11 | c1aa992 | inline (no plan dir) |
| 260518-st1 | Promote `ServicePageTemplate` SEO title to a required `title: string` prop (was hardcoded `${serviceName} in Columbus, OH \| DTE Roofing` template literal — fine in shape but locked every consumer to one pattern with no per-page control). RoofRepair.tsx (sole consumer) now passes `title="Roof Repair in Columbus, OH \| DTE Roofing"`. Blog.tsx: drop trailing " from DTE Roofing." from meta description (158→150 chars) and add "Columbus roofing blog" to keywords. `serviceName` retained in the props interface for downstream callers; prefixed `_` in the destructure to satisfy noUnusedLocals. Other 9 standalone service pages (RoofReplacement, RoofInspection, RoofInstallation, Gutters, EmergencyServices, StormDamage, CommercialRoofing, PreventativeMaintenance, Siding) don't render ServicePageTemplate and were left untouched per spec; RoofMaintenance.tsx + GutterServices.tsx don't exist and were skipped. Build clean; typecheck delta vs HEAD: zero new errors. | 2026-05-18 | 57b03dd | inline (no plan dir) |
| 260606-jiy | Add vercel.json 301s for two indexed-404 pre-migration root-level blog slugs (`/best-asphalt-shingle-brands-on-the-market-today` → `/blog/asphalt-vs-metal-roofing-ohio`, `/my-claim-got-denied-or-partially-approved-what-should-i-do-next` → `/blog/hail-damage-roof-insurance-claim-ohio`; complete set per audit docx in commit 8d89245). Verified hero preload/render match in fresh build: dist/index.html head preloads the .webp that the `<picture>` WebP source actually fetches (fixed earlier today by 3595481); only Home emits an image preload. | 2026-06-06 | 902a3f5 | [260606-jiy-add-301-redirects-for-indexed-404-old-bl](./quick/260606-jiy-add-301-redirects-for-indexed-404-old-bl/) |
| 260606-jv8 | Right-size `DTE-Roofing-Logo-two-Men.{png,webp}` 500x277→231x128 (nav h-16 @2x; png 19.7→9.2KB, webp 18.2→8.5KB) and add `-large` (500x277) variant for Home founders section which renders the logo ~600px wide (flat resize would blur it — user chose two variants). optimize-images.mjs logo jobs read from `-large` so re-runs never upscale. Verified audit's "content images → WebP+srcset" was already shipped: zero raw `<img>` in src/, all consumers use Picture; dist counts — home 16 / about 11 / gallery 28 webp `<source>` tags. | 2026-06-06 | 942bce6 | [260606-jv8-right-size-dte-logo-232px-nav-footer-500](./quick/260606-jv8-right-size-dte-logo-232px-nav-footer-500/) |
| 260606-knp | Cut main-thread work blocking LCP: Roofle slideout now interaction-loaded (zero-JS placeholder tab → script on hover/click → auto-open via `RoofQuotePro.open()`; embedded variant on /get-a-quote-consultation untouched) and dead Supabase client removed (`useReviewData` returns static review-stats.json; @supabase/supabase-js uninstalled; CSP connect-src cleaned). Local LH mobile: 60→80 score, LCP 6.9→4.7s, TBT 450→30ms, Script Eval 1250→425ms, Roofle 3p 657KB→0. "103 drift" item verified already-fixed (all counts read review-stats.json; live sweep clean). NOT pushed pending user review. | 2026-06-06 | bad18f3, 09d1f99 | [260606-knp-interaction-load-roofle-slideout-and-rem](./quick/260606-knp-interaction-load-roofle-slideout-and-rem/) |
| 260606-m9k | Branded prerendered 404 page: NotFound.tsx + catch-all route + prerender writes root `dist/404.html` (served by Vercel with 404 status). `noindex` via new SEO prop (template robots stripped); `NOT_FOUND_ROUTE` kept outside ROUTES so sitemap untouched. Production-verified: bogus URLs → 404 + branded page with services/locations/blog/contact links. Closes 2026-06-06 audit finding #2. | 2026-06-06 | 64efae7 | [260606-m9k-add-branded-prerendered-404-page-served-](./quick/260606-m9k-add-branded-prerendered-404-page-served-/) |
| 260615-flf | Three SEO/perf quick wins from the 2026-06-15 technical audit: (1) remove the dead `fonts.googleapis.com` preconnect from index.html (site loads zero web fonts — Tailwind system stack, no @font-face/@import, dist CSS has no font URLs; roofle preconnect kept); (2) regenerate stale `public/sitemap.xml` lastmod via existing `npm run generate-sitemap` (script already git-derives dates — was not re-run after the 2026-06-06 source commits; now 40 routes → 2026-06-06, stale 04/05 dates gone, 41 urls intact); (3) new idempotent `scripts/reencode-webp.mjs` (+ `reencode-webp` npm script) re-encodes the bloated `.webp` files FROM their `.jpg` siblings at q60/effort6, same dimensions, overwrite-only-if-smaller — 26 re-encoded, 7 already fine, AVIF untouched (already < jpg in every case). Every `public/images/*.webp` now smaller than its jpg; ~2.29 MB saved (8067→5722 KB). Did NOT run optimize-images.mjs (re-fetches from Google / skips cleaned sources). `npm run build` clean (41 routes prerendered). NOT pushed — pending user review. | 2026-06-15 | afed6bf, 722960c, ef21681 | [260615-flf-implement-three-seo-perf-quick-wins-1-re](./quick/260615-flf-implement-three-seo-perf-quick-wins-1-re/) |
| 260615-g1y | Add responsive `srcset`/`sizes` to large images (medium-ROI item deferred from the 2026-06-15 audit). New `scripts/generate-responsive-variants.mjs` (sharp, idempotent, network-free) + generated typed manifest `src/data/imageVariants.ts` emit `slug-<w>.{avif,webp,jpg}` width variants (ladder 400/800/1200/1600 capped at each image's intrinsic width — reads back sharp `info.width` so clamped portraits never produce a width-lie; **178 variant files** across hero + 29 project photos). `Picture.tsx` gains an optional `sizes` prop → manifest-driven per-format `srcSet` (identical single-source markup when absent — backward compatible); `SEO.tsx` hero preload made responsive via lowercase `imagesrcset`/`imagesizes` spread (Helmet-safe, matches the `<source>` exactly — no double-download, LCP protected). Layout-derived `sizes` wired at hero (100vw), WorkCarousel (max-w-4xl→896px), Gallery grid, and the 6 About job-site photos; headshots/logos/lightbox left untouched. Verified: `npm run build` clean (41 routes), no upscales/width-lies, no 404s (277 image URLs), generator idempotent. Sitemap `/`,`/about`,`/gallery` lastmod → 2026-06-15. The gsd-executor hit a transient API-overload after Task 1 generation; orchestrator verified its output and finished Tasks 2–3 directly. NOT pushed pending user review. | 2026-06-15 | 0d2d5e1, e6eb836, 89db986, a9717c1 | [260615-g1y-add-responsive-srcset-sizes-to-large-ima](./quick/260615-g1y-add-responsive-srcset-sizes-to-large-ima/) |
| 260701-p47 | Security: move hardcoded Google Maps API key out of `ServiceAreaMap.tsx` (was exposed in the public GitHub repo) into `import.meta.env.VITE_GOOGLE_MAPS_API_KEY` — typed in `vite-env.d.ts`, graceful degradation when unset (no script injection with `key=undefined`; component returns null), real key in gitignored `.env` for local dev, `.env.example` placeholder committed. Full-repo secrets scan came back otherwise clean (no service-role keys/tokens/bearer creds; old Supabase anon key exists only in git history — rotation is a user action). ACTION REQUIRED before next push: add `VITE_GOOGLE_MAPS_API_KEY` in Vercel project "dte-roofing-demo" (Production + Preview) or the live service-area map silently disappears; also restrict/regenerate the key in Google Cloud Console. Build clean (41 routes). NOT pushed. | 2026-07-01 | 510fbd3, 101ecc2, a64cdf5 | [260701-p47-move-hardcoded-google-maps-api-key-to-vi](./quick/260701-p47-move-hardcoded-google-maps-api-key-to-vi/) |
| 260727-fji | Fix broken "Leave Us a Review" link on /reviews: the `g.page/r/CUPMfU2NGh3dEBM/review` short code encodes CID `0xdd1d1a8d4d7dcc43` (transposed chars vs the real `0xdd1da18d4d7ccf43` from the working Maps link on the same page), so it 302'd to the Google homepage. Replaced with canonical `https://search.google.com/local/writereview?placeid=ChIJvyCPVMOXOIgRQ898TY2hHd0` (place ID deterministically derived from the working link's ftid, encoding verified via Python; curl redirects to sign-in→writereview continue). One-line href change; target/rel/text/icon/classes untouched. Build clean (41 routes). Post-deploy: click the button signed-in to confirm the review dialog names DTE Roofing. NOT pushed. | 2026-07-27 | 4767b63 | [260727-fji-fix-broken-leave-us-a-review-link-on-rev](./quick/260727-fji-fix-broken-leave-us-a-review-link-on-rev/) |
| 260727-fast | Regenerate sitemap.xml lastmod dates via `npm run generate-sitemap` (13 routes updated: 12 stale June dates → 2026-06-30, /reviews → 2026-07-27 after the review-link fix). Pushed + verified live on production. Also this session: 260727-fji deployed live (writereview link verified in prod HTML), VITE_GOOGLE_MAPS_API_KEY set in Vercel (Prod+Preview) and confirmed baked into the deployed Locations bundle. | 2026-07-27 | f18b5e1 | inline (gsd-fast, no plan dir) |
| 260814-jwp | Add long-lived caching for `/images/*` in vercel.json. Vercel's default for `/public` static files is `max-age=0, must-revalidate`, so all 277 files in `public/images/` forced a 304 conditional round-trip on every repeat page view (20-40 per page). New `/images/(.*)` headers entry (first in the array, ahead of the existing `/assets/(.*)` rule) sets `public, max-age=2592000, stale-while-revalidate=86400`. Deliberately NOT `max-age=31536000, immutable` like `/assets/`: Vite content-hashes asset filenames but image filenames are stable and unhashed, so immutable would strand repeat visitors on a stale photo for up to a year after an in-place swap. 30d + SWR keeps essentially all the latency win and still propagates replacements. JSON parses clean, `npm run build` clean (41 routes). Header only takes effect at the Vercel edge post-deploy. DEPLOYED + VERIFIED live 2026-08-14: rebased onto remote `4b80c57` (n8n review-count bump to 114) before pushing, rebuilt clean; deployment `dpl_GTVgyATEkdSqb5sAkoganHnkNpAR` READY, target production, aliased to www.dteroofingllc.com. `curl -sI` on `/images/columbus-residential-roof-replacement.webp` returns `Cache-Control: public, max-age=2592000, stale-while-revalidate=86400`. | 2026-08-14 | c6c6d93, 662e44b | [260814-jwp-add-images-cache-control-header-to-verce](./quick/260814-jwp-add-images-cache-control-header-to-verce/) |
| 260814-k1s | Delete verified-dead public and src files — 9 paths / 11 files with zero references in shipping code, `dist/`, `index.html`, `site.webmanifest`, or `vercel.json`. From `public/` (all were being served in production): `favicon-preview.html` (dev-only preview page, publicly reachable), `favicon-16x16.svg` + `favicon-32x32.svg` (referenced only by that preview page), `browserconfig.xml` (no `msapplication-config` meta exists to fetch it), `data/blog-posts.json` (contained literally `[]`, Supabase-era leftover superseded by `src/data/blogPosts.tsx`), `roofle-embed.html` (standalone iframe page, never linked — the live widget loads via `RoofleSlideout.tsx` + CDN script). From source: `src/components/seo/SeoSchema.tsx` (zero imports; `SEO.tsx` + `SchemaMarkup.tsx` emit all schema), `src/routes.config.ts` (TS re-export wrapper — every consumer imports `routes.config.mjs` directly), and `dead-code/` (quarantined 2026-05-03, outside `tsconfig.app.json` include; the gutter-services and roof-maintenance 301s live in `vercel.json`, untouched). Retained deliberately: `favicon.svg` + `apple-touch-icon.svg` (referenced by `site.webmanifest`), `dte_favicon.png` (referenced by `index.html`), both `google*.html` GSC tokens. `npm run build` exits 0, 41 routes prerender, `dist/` has zero hits for any deleted basename. DEPLOYED + VERIFIED live 2026-08-14: pushed `662e44b..ed5e125`, deployment `dpl_9kmRYbqAYdbbCypu78rjGHG6UmkU` READY, target production, aliased to www.dteroofingllc.com. Live checks — all 6 deleted `public/` paths now 404 (the two `.html` ones return 308 first because `cleanUrls: true` strips the extension, then 404); `favicon.svg`, `apple-touch-icon.svg`, `dte_favicon.png`, `site.webmanifest`, `sitemap.xml`, `robots.txt` all 200; both `google*.html` GSC tokens still serve their verification string; `/`, `/blog`, `/get-a-quote-consultation`, `/locations/columbus`, `/services/roof-repair`, `/reviews` all 200; Roofle slideout launcher present in live homepage HTML and `#roof-quote-pro-embedded` present on `/get-a-quote-consultation`. | 2026-08-14 | fc7dffa, a5de0b5 | [260814-k1s-delete-verified-dead-public-and-src-file](./quick/260814-k1s-delete-verified-dead-public-and-src-file/) |

### Parking Lot (Path B — content work, out of scope here)

- **DEFAULT_OG_IMAGE points at empty stub** (`src/components/SEO.tsx:3` → `https://www.dteroofingllc.com/images/hero-roofing-professional.jpg`). Used as `og:image` + `twitter:image` fallback on all 34 prerendered routes — social-share previews are likely broken (empty body, 200 OK). Fix requires sourcing/optimizing a real hero image, not a code change. Stub file in `public/images/` retained intentionally so the URL doesn't 404 until real image lands.

## Session Continuity

Last activity: 2026-08-14 - Completed quick task 260814-k1s: deleted 9 verified-dead paths (11 files) — 6 from `public/` that were being served in production (`favicon-preview.html`, `favicon-16x16.svg`, `favicon-32x32.svg`, `browserconfig.xml`, `data/blog-posts.json`, `roofle-embed.html`) and 3 from source (`src/components/seo/SeoSchema.tsx`, `src/routes.config.ts`, `dead-code/`). All confirmed zero-reference before deletion via repo-wide grep + `dist/` grep + full read of `index.html`, `site.webmanifest`, `vercel.json`. Commits fc7dffa + a5de0b5, build clean (41 routes), PUSHED and DEPLOYED — `dpl_9kmRYbqAYdbbCypu78rjGHG6UmkU` READY on production, aliased to www.dteroofingllc.com. Verified live: all 6 deleted `public/` paths 404, all retained favicons/manifest/sitemap/robots 200, both GSC tokens still serving, 6 sampled routes 200, Roofle slideout launcher + `#roof-quote-pro-embedded` both present in live HTML. Deferred: `public/dte_favicon.png` is 344 KB and loaded on every page as both favicon and apple-touch-icon — replacing it with the existing 803-byte `favicon.svg` is the obvious follow-up.
Previous: 2026-08-14 - Completed quick task 260814-jwp: added a `/images/(.*)` Cache-Control rule to vercel.json (`public, max-age=2592000, stale-while-revalidate=86400`), removing the 304-per-image round-trips Vercel's `max-age=0, must-revalidate` default caused on every repeat visit. Chose 30d+SWR over 1y immutable because image filenames are unhashed. Commits c6c6d93 + 662e44b (rebased onto remote 4b80c57 n8n review bump before push), build clean, PUSHED and DEPLOYED — `dpl_GTVgyATEkdSqb5sAkoganHnkNpAR` READY on production. Verified live: `curl -sI https://www.dteroofingllc.com/images/columbus-residential-roof-replacement.webp` → `Cache-Control: public, max-age=2592000, stale-while-revalidate=86400`.
Earlier: 2026-07-27 - Completed quick task 260727-fji: fixed the broken "Leave Us a Review" button on /reviews (corrupted g.page short code redirected to Google homepage; now uses canonical writereview URL with verified place ID). Commit 4767b63, build clean, NOT pushed (push to main = live deploy). Post-deploy check: click the button while signed in to Google and confirm the review dialog is for DTE Roofing.
Earlier: 2026-06-15 - Completed quick task 260615-g1y: responsive srcset/sizes for the LCP hero + large on-page photos (homepage WorkCarousel, Gallery, About job-site grid). New sharp variant generator + typed manifest (178 files), responsive Picture + responsive hero preload (imagesrcset/imagesizes matches the <source> exactly — LCP-safe), layout-derived sizes wired; headshots/logos/lightbox untouched. Build clean. Earlier today: 260615-flf (dead preconnect removal, sitemap refresh, webp re-encode ~2.29 MB saved). NOT pushed — pending user review.
Stopped at: 260814-jwp and 260814-k1s both DEPLOYED and verified live on production (jwp: c6c6d93, 662e44b; k1s: fc7dffa, a5de0b5, ed5e125 — all pushed 2026-08-14). Local main is level with origin/main; working tree clean apart from `.claude/settings.local.json`. Earlier context — two quick tasks done 2026-06-15, all local-only on main, NOT pushed (push to main = live deploy). g1y commits: 0d2d5e1, e6eb836, 89db986, a9717c1. flf commits: afed6bf, 722960c, ef21681, 58a823a. Note: the gsd-executor for g1y crashed on a transient API overload after generating the variants; the orchestrator verified the output (no upscales/width-lies, idempotent) and finished the component + wiring tasks directly. Remaining deferred audit follow-up: keyed PSI/CrUX + Rich Results field verification (PSI keyless API is quota-0 — couldn't run from CLI). Prior open content items unchanged: C1 (Columbus content), P4 (hub word count), P5 (Home H1 reorder — needs owner input), I4/I5 (image/filename SEO).
Resume file: None
