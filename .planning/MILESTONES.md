# Milestones

## v1.1 Per-Page SEO Metadata Overhaul (Shipped: 2026-04-10, closed in GSD: 2026-10-12)

**Delivered:** Every one of the 35 sitemap URLs ships a unique title and description; service and location H1/H2 follow a `primary service + city` / `secondary services + city` format sourced from competitor GBP research; `/blog` prerenders a real head.

**Phases completed:** 5 phases, 10 plans (Phase 1 diagnosis + research, Phases 2-4 copy batches for 10 service / 6 core / 13 location pages, Phase 5 blog SSR fix + full verification)

**Timeline:** 2026-04-08 → 2026-04-10 (3 days, 67 commits; 37 files in `src/`, `public/`, `scripts/` changed, +549/-146). Phase 4 paperwork (04-01 summary, UAT) closed retroactively 2026-10-12.

**Key accomplishments:**

- Root-caused the duplicate-metadata problem (21 of 35 pages shared one 166-char default title, all 35 shared the homepage description) to missing per-page `<SEO>` props and chose the per-page fix strategy ("S3 Hybrid") before writing any copy
- Built a competitor GBP service inventory for Central Ohio (8 firms, 15 city-competitor assignments, 5 researched cities + extrapolation map) that drove every H2
- Rewrote titles, descriptions, H1 and first H2 on 10 service pages through a draft → approve → freeze → per-page-commit gate; removed every superlative (META-05); fixed `prerender.mjs` so helmet's description is the only one in dist HTML
- Rewrote titles and descriptions on 6 core pages (/about, /gallery, /reviews, /faq, /contact, /get-a-quote-consultation) through the same gate
- Drafted, approved and applied unique descriptions, `Roof Repair & Replacement in {City}, OH` H1s and city-specific secondary-service H2s on all 13 location pages
- Fixed `/blog` SSR (removed the early-return loading guard) so the prerendered page ships title and H1; deployed and verified: 35 unique descriptions, 34 unique titles + 1 known template duplicate, technical SEO 9.4/10, on-page title/description ≥8/10 on spot-checked pages

**Verification at ship (05-02):** `npm run build` PASS (35 routes), `tsc --noEmit` PASS, `verify-phase-05.sh` ALL CHECKS PASSED, Vercel production deploy + browser spot checks PASS.

**Re-verified at close (2026-10-12, live):** all 13 location H1s and H2s in format; 13 unique descriptions; zero superlatives; `verify-schema` 41/41; `verify-links` 42/42.

**Known deviations accepted at close:**
- Location descriptions were shortened to 127-152 chars by b9a514f (2026-06-06) outside the approval gate; 10 of 13 are under the 140-char floor from 04-01. Accepted 2026-10-12 as a SERP-truncation choice (04-UAT.md, test 3).
- The 2026-04-09 milestone audit (`milestones/v1.1-MILESTONE-AUDIT.md`, status `gaps_found`) was run before Phases 4-5 existed and was never re-run; Phase 5's verification suite superseded it.
- No `v1.1` git tag for this milestone: the tag name was already taken on 2026-03-21 by an unrelated Home carousel change (local → 126eadb, remote → 0358b33). Tag left untouched; see STATE.md Deferred Items.

**Known deferred items at close:** 27 (see STATE.md Deferred Items) — 25 quick-task summaries lacking a machine-readable `status` key, the stale audit, the tag collision.

**Archived:** `milestones/v1.1-ROADMAP.md`, `milestones/v1.1-REQUIREMENTS.md`, `milestones/v1.1-MILESTONE-AUDIT.md`, `milestones/v1.1-phases/` (5 phase directories).

---

## v1.0 Local Authority & Service Area SEO Overhaul (Shipped: 2026-03-23)

**Delivered:** Local-authority structure for the /locations hub and 13 city pages: centralized location data (`src/data/locations.ts`), per-page schema, breadcrumbs, nearby-area cross-links, full footer coverage, SVG service area map, service → location contextual links.

**Phases completed:** 4 phases (Data Architecture & Schema Fixes; Internal Linking & Navigation; Hub Enhancements & Service Cross-Links; SSOT & Schema Cleanup) plus two tech-SEO quick tasks (260407-lws apex 301 + security headers, 260407-m8b prerender all routes).

**Archived:** `milestones/v1.0-phases/` (phase directories with their own STATE.md). Closed before MILESTONES.md existed; this entry was back-filled 2026-10-12 from ROADMAP.md.

---
