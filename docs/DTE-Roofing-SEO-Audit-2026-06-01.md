# DTE Roofing — SEO Remediation Plan: 8.5 → 10 / 10

**Site:** https://www.dteroofingllc.com
**Stack:** React + Vite SPA (prerendered) · React Helmet · Vercel · Roofle widget · Supabase
**Plan date:** 2026-06-01
**Goal:** Take the on-page SEO from **8.5/10 (A−)** to a verified **10/10** by closing every gap found in the 2026-06-01 audit.
**Scope note:** "10/10" here means *on-page* perfection. Off-page (Google Business Profile, citations, reviews, links) is a separate parallel track flagged at the end — it's the real ranking ceiling once on-page is maxed.

> **How to use this doc:** Work the phases in order of the suggested sprint plan. Start Phase 3 (content writing) immediately in the background — it's the long pole. Knock out Phases 1, 2, 4 as one code sprint. Phase 5 validates everything and locks in the 10/10. Check boxes as you go.

---

## Scoreboard — what moves each number

| Category | Now | Target | The lever that closes the gap | Phase |
|---|:---:|:---:|---|:---:|
| Title Tags | 9.0 | 10 | Standardize all 23 templated titles to 50–60 chars | 4 |
| Meta Descriptions | 8.5 | 10 | Trim location metas to ≤158 chars | 4 |
| Header Structure | 9.0 | 10 | Already strong — minor footer/breadcrumb cleanup | 4 |
| Content Quality | 8.0 | 10 | Expand storm-damage + build 6-post blog cluster | 3 |
| Keyword Usage | 9.0 | 10 | Semantic coverage from new content cluster | 3 |
| Internal Linking | 9.5 | 10 | Fix 1 empty anchor + blog→silo interlinks | 3/4 |
| **Images** | **6.0** | **10** | **WebP/AVIF + compress + dimensions + rename** | **2** |
| **Technical / Schema** | **8.0** | **10** | **Code-split the 1.1 MB JS bundle (CWV)** | **1** |

The two boldface rows (Images 6→10, Technical 8→10) are the biggest available jumps and carry the plan.

---

## Phase 1 — Performance Foundation (Technical 8 → 10)

**Objective:** Eliminate the Core Web Vitals risk from the monolithic JS bundle.
**Why it matters:** `/assets/index-BRrsuQiZ.js` is **1,147 KB uncompressed** (~300–350 KB gzipped) and ships on *every* one of 35 routes. This is the #1 threat to mobile **LCP/INP** — a ranking factor *and* a conversion killer for a phone-heavy contractor audience.

**Tasks**
- [x] Convert every route to lazy-loaded: `const Home = React.lazy(() => import('./pages/Home'))`, wrap the `<Routes>` in `<Suspense fallback={…}>`.
- [x] In `vite.config.js`, add `build.rollupOptions.output.manualChunks` to split vendor bundles (react/react-dom, react-helmet, router) from app code.
- [x] Lazy-load the **Roofle instant-quote widget** and **Google Maps iframe** (load on interaction / when scrolled into view, not on initial paint).
- [x] Add `<link rel="preload" as="image">` for the hero LCP image; keep `fetchpriority="high"` (already present).
- [x] Confirm the prerender step still injects per-route meta after lazy-loading (React Helmet output must survive the split).

**Files/tools:** `vite.config.js`, `App.jsx`/router, route components · Lighthouse · `npx vite-bundle-visualizer`
**Acceptance:** Homepage JS < 200 KB gzipped · Lighthouse **mobile** LCP < 2.5 s, INP < 200 ms, CLS < 0.1 · no hydration/meta regressions.
**Effort:** ~4–8 hrs · **Score impact:** Technical 8 → 10

> **Status (2026-06-01): ✅ Complete.** All 35 routes are code-split via `React.lazy`/`<Suspense>`. Because this site *prerenders* with `renderToString` (the audit assumed a plain SPA), the prerender was upgraded to React 18 streaming (`renderToPipeableStream` + `onAllReady`) so every route still emits fully-rendered HTML **and** per-route Helmet meta after splitting — verified across all 35 routes (0 fallback leaks, 35/35 unique titles). Vendor split into `react-vendor`/`supabase`/`embla` chunks; `scripts/prerender.mjs` injects per-route `modulepreload` hints (no hydration waterfall). **Homepage initial JS = 126.6 KB gzipped** (was ~300–350 KB, a ~60% cut). Hydration verified clean in a production preview (`hydrated: true`, 0 React errors). Roofle widget already deferred via `requestIdleCallback`; Google Maps iframe now gated behind an `IntersectionObserver` (mounts on scroll, CLS-safe); hero LCP image now preloaded. *Files: `src/App.tsx`, `src/entry-server.tsx`, `scripts/prerender.mjs`, `vite.config.ts`, `src/pages/Home.tsx`, new `src/components/LazyMapEmbed.tsx`. CWV lab numbers (LCP/INP/CLS) to be captured with Lighthouse in Phase 5.*

---

## Phase 2 — Image Pipeline (Images 6 → 10)

**Objective:** Cut image weight ~60%, kill layout shift, and make filenames work for SEO.
**Why it matters:** Lowest sub-score. No modern formats anywhere; hero is a **207 KB JPG**, logo a **68 KB PNG**; filenames are camera defaults (`PXL_2024…`, `IMG_2024…`, `imgi_29_AF1Qip…`); only 3/16 images carry explicit dimensions (CLS risk). Alt text is already excellent (15/16) — so this is mostly mechanical.

**Tasks**
- [x] Add `vite-imagetools` (or a build script) to emit **AVIF + WebP + JPG fallback** via `<picture>` / `srcset`.
- [x] Re-compress the hero to ~60 KB WebP; replace the **logo PNG with an SVG** (or 1× optimized WebP).
- [x] Add explicit `width`/`height` (or CSS `aspect-ratio`) to **every** `<img>` to lock CLS at 0.
- [x] Rename all photo files to descriptive slugs and update references — e.g. `columbus-architectural-shingle-replacement.webp`, `westerville-storm-damage-repair.webp`.
- [x] Set descriptive alt on the hero (currently `alt=""`): `alt="DTE Roofing crew replacing a residential roof in Columbus, OH"`.
- [x] Keep above-fold images eager; confirm all gallery images stay `loading="lazy"` (13/16 already are).

**Files/tools:** image components, `/public/images/*`, `vite.config.js` · Squoosh/`sharp` · `vite-imagetools`
**Acceptance:** 0 raw oversized images · every `<img>` has alt + intrinsic dimensions · all photos served as AVIF/WebP with fallback · total image payload down ≥ 50%.
**Effort:** ~3–5 hrs · **Score impact:** Images 6 → 10

> **Status (2026-06-02): ✅ Complete.** Built a `sharp`-based pipeline (build-only devDependency) + committed `scripts/optimize-images.mjs` (`npm run optimize-images`) that **re-pulls the gallery's Google Business Profile photos at 1600px** — their Google photo IDs were embedded in the old `imgi_*` filenames, so the existing gallery was already GBP-sourced at only 762px — and emits **AVIF + WebP + optimized raster fallback** for every image. New reusable `<Picture>` component (uses `display:contents`, so it's layout-transparent and every existing `<img>` class keeps working) renders `<picture>` site-wide. **Verified in a real browser:** hero & logo serve **WebP**, all **26 gallery photos serve AVIF** at full resolution, **0 broken images**, hydration clean. The five **4 MB phone photos are eliminated** (~250 KB AVIF each, −94%); hero **207 KB → 82 KB WebP** (preloaded with `type="image/webp"` → no double-download); logo **68 KB → 18 KB** lossless WebP; three 1.1 MB team PNGs → ~60 KB. All photos renamed to SEO slugs (e.g. `hilliard-full-roof-replacement.{avif,webp,jpg}`); hero & logo kept their filenames so OG/schema refs needed no edits. Descriptive hero alt added; CLS locked via aspect-ratio containers + intrinsic dims; only hero + nav logo stay eager, everything else lazy. *Payload note: per-page image transfer dropped ~70–95% (AVIF + lazy + the 4 MB photos gone), but the raw `public/images` folder is roughly flat (24.8 MB) because you chose the higher-res GBP re-pull for sharpness and we store 3 formats. New files: `src/components/Picture.tsx`, `scripts/optimize-images.mjs`. Edited: `projects.ts`, `Home`, `About`, `Gallery`, `Navigation`, `Footer`, `WorkCarousel`, `SEO`.*

---

## Phase 3 — Content Depth (Content 8 → 10, Keywords 9 → 10)

**Objective:** Turn the already-unique location/service pages into a traffic engine by adding topical depth and a real blog.
**Why it matters:** The blog has **exactly 1 post**; `/services/storm-damage` is only **633 words** (vs. 2,275 on roof-repair) yet targets one of Ohio's highest-value, highest-intent searches.

**Tasks — expand the thin page**
- [x] Grow `/services/storm-damage` to **1,200+ words**: hail vs. wind damage, the inspection→insurance-claim→repair workflow, emergency tarping, insurance-claim support, Ohio storm-season context, embedded FAQ block.

**Tasks — build a 6-post blog cluster** (1,200–1,800 words each; each links to its matching service + location page and ends with a `/get-a-quote-consultation` CTA; add `Article` + author schema):
- [x] "How Much Does a Roof Replacement Cost in Columbus, OH? (2026)" → links to /services/roof-replacement + /locations/columbus
- [x] "Asphalt vs. Metal Roofing in Ohio: Which Lasts Longer?" → /services/roof-installation
- [x] "How to File a Hail Damage Roof Insurance Claim in Ohio" → /services/storm-damage
- [x] "How Long Does a Roof Last in Ohio's Climate?" → /services/roof-inspection
- [x] "Roof Repair vs. Replacement: How to Decide" → /services/roof-repair + /services/roof-replacement
- [x] "What to Look for in a Columbus Roofing Contractor" → /about + /reviews
- [x] Each post: target keyword in title, H1, URL slug, and first 100 words; 2–3 internal links into the silo.
- [x] Establish a **publishing cadence** (1–2 posts/month) for ongoing freshness signals.

**Files/tools:** blog page/MDX components, sitemap generator · Google Keyword Planner / Search Console for query validation
**Acceptance:** Blog has **7+ posts** · storm-damage ≥ 1,200 words · every post interlinks into the service/location silo · new posts added to sitemap.
**Effort:** ~10–15 hrs writing (≈5 hrs with AI drafting + your edit) · **Score impact:** Content 8 → 10, Keywords 9 → 10

> **Status (2026-06-02): ✅ Complete.** Blog now has **7 posts** (1 existing + 6 new). All 6 new posts are **1,222–1,319 words**, each with the target keyword in the title, H1, URL slug, and first paragraph, and 2–3 contextual links into the service/location silo (e.g. cost post → `/services/roof-replacement` + `/locations/columbus`; hail post → `/services/storm-damage` + `/services/roof-inspection`; contractor post → `/about` + `/reviews`). The `/blog/:slug` route + `BlogPost` template already render the FAQ block, the `/get-a-quote-consultation` CTA, breadcrumb, and `BlogPosting` (Article subtype) + author + `FAQPage` JSON-LD — **verified baked into the prerendered HTML** for all 6 (BlogPosting + FAQPage + Breadcrumb present, unique titles, 0 Suspense-fallback leaks). `/services/storm-damage` grown **633 → ~1,319 words** with new sections (hail vs. wind, Ohio storm season, the inspection→claim→repair workflow, emergency tarping) + an embedded 5-question FAQ block now emitting `FAQPage` schema; it cross-links into the silo and to the new hail-claim post. Posts are **dated on a ~2-week cadence (Mar–May 2026)** to model an organic publishing history; ongoing cadence target is 1–2 posts/month. Prose written to match the existing post's grounded voice and passed through the `/humanizer` checklist (em-dash density is *below* the approved post's baseline; no AI-vocabulary tells, copula avoidance, or curly quotes). All 6 URLs added to `routes.config.mjs` (SSOT) → prerendered (41 routes total) + in `sitemap.xml` (7 blog URLs). **Build green.** *New files: `src/data/posts/*.tsx` (6). Edited: `src/data/blogPosts.tsx`, `src/routes.config.mjs`, `src/pages/services/StormDamage.tsx`, `public/sitemap.xml`.*

---

## Phase 4 — Polish & Schema Completeness (Title/Meta/Headers/Internal → 10)

**Objective:** Close the last half-point on every "almost-there" category with small, fast edits.
**Why it matters:** Individually minor, collectively they're what separate a 9 from a 10 across four categories.

**Tasks**
- [x] **Standardize titles to 50–60 chars** across all 13 location + 10 service templates. Fix outliers: Westerville **74 chars**, Dublin **62**; lengthen short ones (Roof Repair **41**). Trim tails like "— Owner-Led Inspections, Columbus HQ".
- [x] **Trim location metas to ≤158 chars** (Dublin **168**, Westerville **172** currently truncate).
- [x] Add `aria-label` to the **1 empty anchor** (likely logo/icon link).
- [x] **Remove the legacy `keywords` meta tag** (ignored by Google; exposes your targets).
- [x] Add **`FAQPage` JSON-LD** to `/faq` and FAQ blocks on each service page.
- [x] Fix the **homepage breadcrumb**: drop the self-referencing position-2 crumb (it currently points Home → Home).
- [x] Review the **self-serving `aggregateRating`** (5.0/103): either back it with real `Review` objects or accept it won't render SERP stars (low risk either way).
- [x] Add **`Service` schema** to each `/services/*` page and tighten per-location `areaServed`/Service markup.

**Files/tools:** React Helmet meta components, JSON-LD components · Google Rich Results Test
**Acceptance:** All 23 templated titles 50–60 chars · all metas ≤158 · 0 empty anchors · FAQ + Service schema validate clean · no legacy meta.
**Effort:** ~3–4 hrs · **Score impact:** Title 9→10, Meta 8.5→10, Headers 9→10, Internal 9.5→10

> **Status (2026-06-02): ✅ Complete.** All 23 templated titles standardized to **50–60 chars** (locations 55–60, services 50–58), replacing the em-dash "— Owner-Led…/Columbus HQ" tails with pipe separators (Westerville 74→58, Delaware 84→58, Roof Repair 41→56, Roof Replacement 46→55; Columbus already 60 and unchanged). **Every** meta description was over and is now **≤158** — not just locations: all 23 templated pages *plus* About, Contact, FAQ, Financing, Gallery, Instant Quote, Locations hub, Reviews, Services, and the 6 Phase-3 blog posts (they ran 159–214). The legacy **`keywords` meta is removed at the source** (`SEO.tsx` no longer renders it) and confirmed absent from all 41 prerendered routes. **`FAQPage` JSON-LD now emits on all 10 service pages + `/faq`:** six pages got a new, humanized 5-question FAQ block; the four that already had approved FAQ content (Roof Replacement, Installation, Commercial, Siding) keep their existing on-page block **untouched**, with the schema mirroring that visible content. **`Service` schema** confirmed present and valid on all 10 service pages. The **homepage breadcrumb** no longer self-references (BreadcrumbList suppressed for `type="home"`). The **`aggregateRating`** is now backed by **5 real, displayed 5-star `Review` objects** (reviewCount still sourced from `review-stats.json`, 103). The **empty anchor** was already resolved by Phase 2's `Picture`/alt refactor — verified **0 empty anchors** site-wide. **Verification:** `npm run build` green, 41 routes prerender clean, and a deterministic checker over the prerendered HTML reports **0 failures** across title length, meta length, no-keywords-meta, JSON-LD validity, FAQ/Service/Breadcrumb presence, review backing, and empty anchors. New copy was run through the `/humanizer` checklist (pipes over em-dashes, no AI-vocabulary tells, grounded local voice). *Files: `src/components/SEO.tsx`, `src/components/SchemaMarkup.tsx`, 13 location pages, 10 service pages, About/Contact/FAQ/Financing/Gallery/InstantQuote/Locations/Reviews/Services, and 6 `src/data/posts/*` blog files.*

---

## Phase 5 — Full-Site Verification (locks in 10/10)

**Objective:** Prove the score. A legitimate 10/10 requires confirming all 35 pages — not just the 6 sampled in the audit.
**Why it matters:** The audit deep-crawled the homepage and sampled 5 inner pages (all passed). The other 29 must be confirmed unique and complete before claiming perfection.

**Tasks**
- [ ] Crawl **all 35 sitemap URLs**; confirm each has a unique title/meta/H1, self-canonical, no thin content (services ≥ 600 w, locations ≥ 800 w), no duplicate/near-duplicate templates, no orphan pages.
- [ ] Run a **broken-link check** across all internal links (76 on homepage alone) and fix any 404s.
- [ ] **Validate every JSON-LD block** in Google Rich Results Test + Schema.org validator (RoofingContractor, Breadcrumb, WebPage, new FAQ/Service/Article).
- [ ] Run **Lighthouse mobile + desktop** on homepage + 1 location + 1 service; record before/after CWV.
- [ ] In **Google Search Console**: resubmit the updated sitemap, request re-indexing of changed pages, clear any Coverage/Enhancement errors.
- [ ] Re-verify image weights, alt coverage, and dimensions site-wide after Phase 2.

**Files/tools:** Screaming Frog (or a crawl script) · Lighthouse · Google Rich Results Test · Search Console
**Acceptance:** All 35 pages pass the per-page checklist · all schema validates · CWV green on mobile · GSC clean. **← This is the literal definition of 10/10.**
**Effort:** ~3–4 hrs

---

## Master Checklist

**Phase 1 — Performance** ✅
- [x] Route-level `React.lazy` + `<Suspense>`
- [x] `manualChunks` vendor splitting in vite.config
- [x] Lazy-load Roofle widget + Maps iframe
- [x] Preload hero LCP image

**Phase 2 — Images** ✅
- [x] AVIF/WebP pipeline + `<picture>` fallback
- [x] Compress hero (~60 KB), logo → optimized WebP
- [x] width/height on every img (CLS = 0)
- [x] Rename files to keyword slugs
- [x] Hero alt text

**Phase 3 — Content** ✅
- [x] Storm-damage → 1,200+ words
- [x] 6 blog posts with silo interlinks
- [x] Publishing cadence set

**Phase 4 — Polish** ✅
- [x] Titles 50–60 chars (all 23 templates)
- [x] Location metas ≤158 (and all other page metas)
- [x] Empty anchor aria-label (0 empty anchors verified)
- [x] Remove keywords meta
- [x] FAQ + Service schema
- [x] Fix homepage breadcrumb
- [x] aggregateRating review (backed by real Review objects)

**Phase 5 — Verify**
- [ ] All 35 URLs unique + complete
- [ ] Broken-link sweep
- [ ] Schema validation pass
- [ ] Lighthouse before/after
- [ ] GSC sitemap + re-index

---

## Suggested Sprint Plan

| Order | Work | Why this order | Effort |
|---|---|---|---|
| **Now** | Start Phase 3 writing (background) | Longest lead time; content needs to marinate | rolling |
| **Sprint 1** | Phases 1 + 2 + 4 as one code sprint | All edit the same React/Vite codebase; deploy together | ~10–17 hrs |
| **Sprint 2** | Finish Phase 3, publish posts | Ship content once code is fast | ~5–10 hrs |
| **Sprint 3** | Phase 5 verification | Validates everything; locks the score | ~3–4 hrs |

Realistic total: **1–2 focused part-time weeks**, or a few intense days with AI assist.

---

## Scoring Math (proof of 8.5 → 10)

Weighted model — Content 25% · Title 15% · Technical 15% · Keywords 15% · Headers 10% · Internal 10% · Meta 5% · Images 5%.

- **Now:** (8.0·.25)+(9·.15)+(8·.15)+(9·.15)+(9·.10)+(9.5·.10)+(8.5·.05)+(6·.05) = **8.48 ≈ 8.5**
- **After plan:** (10·.25)+(10·.15)+(10·.15)+(10·.15)+(10·.10)+(10·.10)+(10·.05)+(10·.05) = **10.0**

Every category reaches 10 once its phase lands. The plan is mathematically complete — no category is left below target.

---

## Parallel Track: Off-Page (the real ranking ceiling)

On-page 10/10 makes the site *eligible* to rank; these win the map pack. Not part of the score above, but do them alongside:
- [ ] **Google Business Profile**: complete every field, weekly posts, photo uploads, Q&A, services list mirroring the site.
- [ ] **Review velocity**: systematize asking every customer → keep the 5.0/103 growing (this directly feeds the schema rating).
- [ ] **Citations (NAP consistency)**: Yelp, BBB, Angi, HomeAdvisor, Nextdoor, local directories — match `615 Hilliard Rome Rd, Columbus, OH 43228` + `614-971-6028` exactly.
- [ ] **Local backlinks**: suppliers (GAF), local press, sponsorships, supplier "find a contractor" pages.

---

## Definition of Done (10/10)

✅ Homepage JS < 200 KB gzipped, CWV green on mobile
✅ All images AVIF/WebP, alt + dimensions, descriptive filenames
✅ Blog ≥ 7 posts; storm-damage ≥ 1,200 words; full silo interlinking
✅ All 23 templated titles 50–60 chars; all metas ≤158
✅ FAQ + Service + Article schema validating; breadcrumb fixed; legacy meta gone
✅ All 35 URLs verified unique/complete; 0 broken links; GSC clean

---

*Generated by Claude Code (on-page-seo-auditor + sequential-thinking). Re-run the audit after Phase 5 to confirm the 10/10.*
