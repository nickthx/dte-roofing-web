# Roadmap: DTE Roofing SEO Overhaul

## Current Milestone: v1.1 — Per-Page SEO Metadata Overhaul

**Started:** 2026-04-08
**Phase numbering:** Reset (starts at Phase 1; v1.0 phases archived to `.planning/milestones/v1.0-phases/`)

### Overview (v1.1)

The v1.0 milestone built the schema, linking, and structural SEO foundation. A 2026-04-08 technical+on-page audit revealed the infrastructure is working but **page metadata is broken**: 21 of 35 pages share one 166-char default title, all 35 share the homepage meta description, and `/blog` ships an empty `<title>` and empty `<h1>`. This milestone fixes per-page metadata and rewrites H1/H2 to a `primary category + city` / `secondary + services` format informed by competitor GBP research.

**Execution model:** 5 batches, each gated on user approval of drafted copy before edits land. Atomic commits per page.

### Phases (v1.1)

- [ ] **Phase 1: Diagnosis & Competitor Research** — Root-cause the duplicate-metadata issue (shared template vs per-page), diagnose `/blog` empty head, scrape competitor GBP Services/Categories for the 13 cities
- [ ] **Phase 2: Service Pages Metadata** — Rewrite titles, descriptions, and H1/H2 for 12 service pages (Batch B2)
- [ ] **Phase 3: Core Pages Metadata** — Rewrite titles and descriptions for 6 core pages: /about, /gallery, /reviews, /faq, /contact, /get-a-quote-consultation (Batch B3)
- [ ] **Phase 4: Location Descriptions & H1/H2** — Unique meta descriptions + H1/H2 rewrites for 13 location pages (titles already unique) (Batch B4)
- [ ] **Phase 5: /blog SSR Fix & Final Verification** — Fix /blog empty head, deploy, site-wide audit, on-page-seo-auditor re-run (Batch B5)

## Phase Details (v1.1)

### Phase 1: Diagnosis & Competitor Research
**Goal:** Understand *why* metadata is duplicated (one fix point vs 22 fix points) and gather the GBP competitor data that informs all H2 content in subsequent phases
**Depends on:** Nothing (first phase of v1.1)
**Requirements:** META-03, HEAD-04, BLOG-03
**Success Criteria** (what must be TRUE):
  1. A diagnosis note in `.planning/phases/01-*/RESEARCH.md` identifies the exact root cause of duplicate titles/descriptions and names the file(s) that need editing
  2. `.planning/research/v1.1-gbp-competitors.md` contains top 3 competitor GBP Services/Categories for at least 5 representative cities (Columbus, Hilliard, Dublin, Westerville, Delaware — geographic spread)
  3. `/blog` empty-head root cause is documented with the specific code path (e.g., "Blog.tsx returns null during SSR while awaiting Supabase")
  4. Fix strategy is one-liner clear: "edit ServicePageTemplate" OR "edit 22 individual page files" OR "fix SEO component default"
**Plans:** 2 plans expected
  - 01-01-PLAN.md — Root-cause diagnosis (duplicate metadata + /blog SSR)
  - 01-02-PLAN.md — Competitor GBP research via claude-in-chrome

### Phase 2: Service Pages Metadata (Batch B2)
**Goal:** All 12 service pages have unique, descriptive titles, descriptions, and H1/H2 that reflect page intent and rank for their primary service keyword
**Depends on:** Phase 1 (root cause + competitor data)
**Requirements:** META-01, META-02, META-04, META-05, HEAD-02, HEAD-03
**Success Criteria:**
  1. All 12 `/services/*` pages have unique titles containing the service + Columbus region
  2. All 12 have unique 140-200 char descriptions mentioning the service and city
  3. All 12 have H1 in `Primary Service + Columbus, OH` format
  4. All 12 have H2s listing secondary services sourced from Phase 1 competitor research
  5. `npm run build && npm run lint` pass; prerendered `dist/services/*/index.html` contain the new titles/descriptions/headings
**Plans:** 1 plan
  - 02-01-PLAN.md — Draft copy for 12 service pages, user approval, atomic per-page commits

### Phase 3: Core Pages Metadata (Batch B3)
**Goal:** 6 non-location/non-service pages have unique, accurate titles and descriptions matching their actual content
**Depends on:** Phase 2 (establishes the SEO prop pattern)
**Requirements:** META-01, META-02, META-04, META-05
**Success Criteria:**
  1. /about, /gallery, /reviews, /faq, /contact, /get-a-quote-consultation all have unique titles
  2. All 6 have unique 140-200 char descriptions
  3. No "BEST" superlatives; descriptions match page intent
  4. Build passes; prerendered HTML contains new metadata
**Plans:** 1 plan
  - 03-01-PLAN.md — Draft copy for 6 core pages, user approval, atomic per-page commits

### Phase 4: Location Descriptions & H1/H2 (Batch B4)
**Goal:** All 13 location pages have unique descriptions (titles were already fixed in v1.0) and rewritten H1/H2 in `Primary Service + City` / `Secondary + Services` format
**Depends on:** Phase 3
**Requirements:** META-02, META-04, META-05, HEAD-01, HEAD-03
**Success Criteria:**
  1. All 13 `/locations/*` pages have unique 140-200 char meta descriptions
  2. All 13 have H1 in `Primary Service + City` format (overrides brand voice H1s from v1.0 per user direction)
  3. All 13 have H2s listing secondary services sourced from Phase 1 per-city GBP research
  4. Build passes; prerendered HTML contains new metadata
**Plans:** 1 plan
  - 04-01-PLAN.md — Draft copy for 13 locations, user approval, atomic per-page commits

### Phase 5: /blog SSR Fix & Final Verification (Batch B5)
**Goal:** /blog ships non-empty `<title>` and `<h1>` in prerendered HTML, full milestone verifies against acceptance criteria
**Depends on:** Phase 4
**Requirements:** BLOG-01, BLOG-02, VERIFY-01, VERIFY-02, VERIFY-03, VERIFY-04, VERIFY-05
**Success Criteria:**
  1. `/blog` prerendered HTML has non-empty `<title>` and non-empty `<h1>`
  2. Site-wide curl audit of all 35 URLs returns 35 unique titles + 35 unique descriptions
  3. `on-page-seo-auditor` title + description scores ≥8/10
  4. `technical-seo-checker` overall health ≥9/10
  5. Vercel production deploy succeeds; `claude-in-chrome` spot-checks pass
**Plans:** 2 plans
  - 05-01-PLAN.md — Fix /blog SSR root cause from Phase 1 diagnosis
  - 05-02-PLAN.md — Deploy and run full verification suite

## Progress (v1.1)

**Execution Order:** Phases execute sequentially 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Diagnosis & Competitor Research | 0/2 | Pending | — |
| 2. Service Pages Metadata (B2) | 0/1 | Pending | — |
| 3. Core Pages Metadata (B3) | 0/1 | Pending | — |
| 4. Location Descriptions & H1/H2 (B4) | 0/1 | Pending | — |
| 5. /blog Fix & Final Verification (B5) | 0/2 | Pending | — |

---

## Archived: Milestone v1.0 — Local Authority & Service Area SEO Overhaul

**Completed:** 2026-03-23
**Phases archived to:** `.planning/milestones/v1.0-phases/`

- [x] **Phase 1: Data Architecture & Schema Fixes** — Centralized location config, unique schema per page, hub page schema and H1 fix
- [x] **Phase 2: Internal Linking & Navigation** — Breadcrumbs, nearby-area cross-links, full footer coverage
- [x] **Phase 3: Hub Enhancements & Service Cross-Links** — Service area map on hub, service-to-location contextual links
- [x] **Phase 4: SSOT & Schema Cleanup** — Closed DATA-01 SSOT gap on hub, fixed hub breadcrumb schema, resolved lint warnings
- [x] **Quick 260407-lws** — Tech SEO Phase A: apex 301, security headers, gutter-services 301, sitemap regen
- [x] **Quick 260407-m8b** — Tech SEO Phase B: prerender all routes (helmet refactor, SSG pipeline)

See `.planning/milestones/v1.0-phases/*/STATE.md` for original phase details.
