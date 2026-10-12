# Roadmap: DTE Roofing SEO Overhaul

## Milestones

- ✅ **v1.0 Local Authority & Service Area SEO Overhaul** — Phases 1-4 (shipped 2026-03-23)
- ✅ **v1.1 Per-Page SEO Metadata Overhaul** — Phases 1-5 (shipped 2026-04-10, closed in GSD 2026-10-12)
- 📋 **Next milestone** — not yet defined. Start with `/gsd:new-milestone`.

## Phases

<details>
<summary>✅ v1.0 Local Authority & Service Area SEO Overhaul (Phases 1-4) — SHIPPED 2026-03-23</summary>

Phase directories archived to `.planning/milestones/v1.0-phases/`. See each phase's `STATE.md` there for original details.

- [x] Phase 1: Data Architecture & Schema Fixes — Centralized location config, unique schema per page, hub page schema and H1 fix
- [x] Phase 2: Internal Linking & Navigation — Breadcrumbs, nearby-area cross-links, full footer coverage
- [x] Phase 3: Hub Enhancements & Service Cross-Links — Service area map on hub, service-to-location contextual links
- [x] Phase 4: SSOT & Schema Cleanup — Closed DATA-01 SSOT gap on hub, fixed hub breadcrumb schema, resolved lint warnings
- [x] Quick 260407-lws — Tech SEO Phase A: apex 301, security headers, gutter-services 301, sitemap regen
- [x] Quick 260407-m8b — Tech SEO Phase B: prerender all routes (helmet refactor, SSG pipeline)

</details>

<details>
<summary>✅ v1.1 Per-Page SEO Metadata Overhaul (Phases 1-5) — SHIPPED 2026-04-10</summary>

Full phase details: `.planning/milestones/v1.1-ROADMAP.md`. Requirements: `.planning/milestones/v1.1-REQUIREMENTS.md`. Phase directories: `.planning/milestones/v1.1-phases/`. Mid-milestone audit (2026-04-09, superseded by Phase 5 verification): `.planning/milestones/v1.1-MILESTONE-AUDIT.md`.

- [x] Phase 1: Diagnosis & Competitor Research (2/2 plans) — completed 2026-04-08
- [x] Phase 2: Service Pages Metadata (2/2 plans) — completed 2026-04-09
- [x] Phase 3: Core Pages Metadata (2/2 plans) — completed 2026-04-09
- [x] Phase 4: Location Descriptions & H1/H2 (2/2 plans) — completed 2026-04-09, UAT closed 2026-10-12
- [x] Phase 5: /blog SSR Fix & Final Verification (2/2 plans) — completed 2026-04-10

</details>

## Post-v1.1 work (quick tasks, outside any milestone)

Tracked row by row in `.planning/STATE.md` → "Quick Tasks Completed" (25 tasks, 2026-03-25 → 2026-10-12). Largest items:

- Technical SEO and security headers (260407-lws, 260411-kct, 260411-m0s), social meta and OG images (260413-tb5, 260503-og1/og2), branded prerendered 404 (260606-m9k)
- Performance: responsive srcset variants (260615-g1y), interaction-loaded Roofle slideout (260606-knp), image cache headers (260814-jwp), dead-file cleanup (260814-k1s)
- Google Maps key moved to a Vercel env var (260701-p47); old key still needs rotating in Cloud Console
- Schema single source of truth: one `#business` entity on every page, city pages as WebPage + Service nodes, hub as CollectionPage + ItemList, `npm run verify-schema` gate (261002-fqk, 261002-h43)
- Week 2B internal links: crawlable nav dropdown, SSOT-driven city/service lists, city links from gallery and blog, `npm run verify-links` gate (261002-j0z, merged to main 2026-10-12)
- Route error boundary + one-shot chunk reload so a failed JS chunk no longer blanks a prerendered page (261012-lje, live 2026-10-12)

## Candidate scope for the next milestone

Not committed. Decide in `/gsd:new-milestone`.

- Four cosmetic follow-ups from the Week 2B preview review: service-area links spacing on service pages, 7-tile footer trust row wrapping, blog related-area card contrast, gallery hover city link on touch devices
- Rotate or restrict the old exposed Google Maps key in Google Cloud Console (env var side done 2026-07-27)
- Open content items from the June 2026 audit: C1 Columbus page content, P4 hub word count, P5 Home H1 reorder (needs owner input), I4/I5 image and filename SEO
- Deferred audit follow-up: keyed PageSpeed Insights / CrUX run and Rich Results field verification
- Pre-existing red `npm run typecheck` and `npm run lint`

## Progress

| Milestone | Phases | Plans | Status | Shipped |
|-----------|--------|-------|--------|---------|
| v1.0 Local Authority & Service Area SEO Overhaul | 4 | — | Complete | 2026-03-23 |
| v1.1 Per-Page SEO Metadata Overhaul | 5 | 10/10 | Complete | 2026-04-10 |
