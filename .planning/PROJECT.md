# DTE Roofing — Local Authority & Service Area SEO Overhaul

## What This Is

An ongoing SEO and site-quality program for dteroofingllc.com, a React + Vite + Tailwind marketing site prerendered to static HTML and deployed on Vercel. v1.0 (shipped 2026-03-23) built the local-authority structure: centralized location data, per-page schema, breadcrumbs, nearby-area cross-links, full footer coverage and a hub map. v1.1 (shipped 2026-04-10) gave every one of the 35 sitemap URLs a unique title and description, rewrote service and location H1/H2 to a `primary service + city` / `secondary services + city` format informed by competitor Google Business Profile research, and fixed the empty `/blog` head. Since then, quick tasks have consolidated schema into a single business entity, made navigation and footer links crawlable from one source of truth, and hardened chunk loading.

## Core Value

Establish DTE Roofing as the authoritative local roofing contractor across all 13 Central Ohio service areas through proper schema, cross-linking, page structure and per-page metadata — without rewriting approved body content.

## Current State (as of 2026-10-12)

**Shipped:** v1.0 and v1.1. Both archived under `.planning/milestones/`. No milestone is active.

**Production (www.dteroofingllc.com):**
- 41 prerendered routes pass `npm run verify-schema` (JSON-LD on every route, 10-item ItemList on /services, 13-item ItemList on /locations)
- 42 pages pass `npm run verify-links` (header dropdown and footer carry all 10 services and 13 cities)
- Every page shares one `https://www.dteroofingllc.com/#business` entity; city pages add WebPage `spatialCoverage` + `mentions` + 7 city-scoped Service nodes
- Route-level error boundary plus one-shot reload on `vite:preloadError`: a failed JS chunk shows a branded fallback with header and footer intact instead of a blank page
- Location meta descriptions run 127-152 chars (shortened 2026-06-06, accepted 2026-10-12); location H1s all read `Roof Repair & Replacement in {City}, OH`

**Known debt:** `npm run typecheck` and `npm run lint` are pre-existing red (build is the gate). Old Google Maps key still needs rotating in Cloud Console. Four cosmetic items from the Week 2B review are open (see ROADMAP.md candidate scope).

## Next Milestone Goals

Not yet defined. Candidates are listed in `.planning/ROADMAP.md` → "Candidate scope for the next milestone". Define with `/gsd:new-milestone`.

<details>
<summary>Archived: v1.1 milestone statement (2026-04-08 → 2026-04-10)</summary>

**Goal:** Every prerendered page on dteroofingllc.com ships a unique, descriptive `<title>` and `<meta description>`, plus H1/H2 structured as `primary category + city` / `secondary categories + services` informed by competitor GBP research — eliminating the site-wide duplicate-title and duplicate-description problem that nullified per-page SEO.

**Target features (all delivered):**
- Unique `<title>` on all 35 sitemap URLs (was: 21 shared one 166-char default)
- Unique `<meta description>` on all 35 sitemap URLs (was: all 35 shared the homepage description)
- H1/H2 rewrite to primary+city / secondary+services format, driven by competitor GBP Services/Categories research
- Fix `/blog` prerender — shipped empty `<title>` and empty `<h1>`
- Plumb `<SEO>` props correctly across all page components (root cause: per-page props missing, fixed per page — "S3 Hybrid")

**Execution:** 5 batches, each gated on user approval of drafted copy before edits landed. Atomic commits per page.

**Constraint exception:** The v1.0 "do not modify content" rule was lifted for H1/H2 headings in this milestone only, at user direction.

</details>

## Requirements

### Validated

- ✓ 13 location subpages with unique, high-quality localized content — existing
- ✓ /locations hub page with links to all 13 subpages — existing
- ✓ Service pages with lead capture forms — existing
- ✓ SEO component with meta tag manipulation — existing
- ✓ SchemaMarkup component for JSON-LD generation — existing
- ✓ Hub page H1 differentiated from /locations/columbus — v1.0 Phase 1
- ✓ No non-page cities in any areaServed array — v1.0 Phase 1
- ✓ Breadcrumb / "back to hub" link on all 13 subpages — v1.0 Phase 2
- ✓ "Nearby Areas We Serve" cross-linking on all 13 subpages — v1.0 Phase 2
- ✓ Footer lists all 13 locations — v1.0 Phase 2; all 10 services added 261002-j0z
- ✓ Service area map on /locations hub — v1.0 Phase 3
- ✓ Service pages link to relevant location pages — v1.0 Phase 3; made SSOT-driven 261002-j0z
- ✓ Unique title and description on all 35 sitemap URLs — v1.1 Phases 2, 3, 5 (VERIFY-01)
- ✓ Service page H1 `Primary Service + Columbus region`, location page H1 `Roof Repair & Replacement in {City}, OH` — v1.1 Phases 2, 4
- ✓ H2s list GBP-researched secondary services per page — v1.1 Phases 2, 4
- ✓ /blog ships non-empty title and H1 in prerendered HTML — v1.1 Phase 5
- ✓ Hub schema and per-page areaServed — v1.0 Phase 1, superseded 2026-10-02 by the single `#business` entity + WebPage/Service nodes model (261002-fqk / 261002-j0z)
- ✓ Unique @id per subpage — v1.0 Phase 1, reversed 2026-10-02 to one `#business` @id (261002-fqk)
- ✓ Failed JS chunk never blanks a page — 261012-lje

### Active

- (none — the next milestone defines its own requirements in `/gsd:new-milestone`)

### Out of Scope

- Body content rewrites (paragraphs, testimonials, FAQs, service descriptions) — audited and approved; the v1.1 H1/H2 exception is closed. Title/description edits are allowed only through a draft → approve → freeze gate (the 2026-06-06 description shortening bypassed it; accepted after the fact, not to be repeated)
- URL changes — no slugs or routing changes
- NAP changes — address/phone/email are audited separately
- New location pages — only the existing 13 are in scope until a milestone says otherwise
- Adding back removed cities to areaServed — only when pages exist for them

## Context

**Site:** dteroofingllc.com (apex 308s to www) — React 18 SPA (Vite 5 + TypeScript + Tailwind), prerendered per route via `renderToPipeableStream` (`onAllReady`) in `scripts/prerender.mjs`, deployed on Vercel project `dte-roofing-demo` (push to `main` = live deploy).
**Size:** ~19,700 lines of TS/TSX in `src/`.
**Gates:** `npm run build` (sitemap + client + SSR + prerender), `npm run verify-schema` (41 routes), `npm run verify-links` (42 pages). `typecheck`/`lint` are pre-existing red.

**Canonical NAP:**
- Business Name: DTE Roofing
- Legal Name: DTE Roofing LLC
- Address: 615 Hilliard Rome Rd, Columbus, OH 43228
- Phone: 614-971-6028
- Email: experience@dteroofing.com

**The 13 Location Subpages:**
1. /locations/columbus
2. /locations/hilliard
3. /locations/dublin
4. /locations/new-albany
5. /locations/upper-arlington
6. /locations/westerville
7. /locations/gahanna
8. /locations/reynoldsburg
9. /locations/grove-city
10. /locations/pickerington
11. /locations/worthington
12. /locations/delaware
13. /locations/powell

**Neighbor Mapping (drives `mentions` and cross-links; source of truth is `src/data/locations.ts`):**
- Columbus: Hilliard, Dublin, Upper Arlington, Westerville, Gahanna, Reynoldsburg, Grove City, Worthington
- Hilliard: Columbus, Dublin, Upper Arlington, Grove City
- Dublin: Columbus, Hilliard, Powell, Worthington, Upper Arlington
- New Albany: Columbus, Westerville, Gahanna
- Upper Arlington: Columbus, Hilliard, Dublin, Worthington, Grove City
- Westerville: Columbus, Powell, Gahanna, Worthington, New Albany
- Gahanna: Columbus, Westerville, New Albany, Reynoldsburg
- Reynoldsburg: Columbus, Gahanna, Pickerington
- Grove City: Columbus, Hilliard, Pickerington
- Pickerington: Columbus, Reynoldsburg, Grove City, Gahanna
- Worthington: Columbus, Dublin, Powell, Westerville, Upper Arlington
- Delaware: Powell, Westerville, Worthington
- Powell: Dublin, Westerville, Delaware, Worthington

## Constraints

- **Content**: Do NOT rewrite or modify existing page content (paragraphs, testimonials, FAQs, service descriptions). Titles, descriptions and headings change only through an approved copy packet.
- **URLs**: Do NOT change any URLs or slugs
- **NAP**: Do NOT change business name, address, phone, or email anywhere
- **Design**: All new elements must match existing Tailwind design (charcoal/primary-700 color scheme)
- **Images**: Use existing /public/images/ assets only
- **Dependencies**: No new heavy dependencies — prefer CSS/lightweight JS solutions
- **Approval**: Complete each phase fully, verify, and get user approval before starting next phase
- **Deploy**: `main` is production. Verify on the Vercel preview before merging.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| ~~Page-specific areaServed (primary + 2-3 neighbors)~~ → One `https://www.dteroofingllc.com/#business` entity on every page; city pages carry WebPage `spatialCoverage` + `mentions` + 7 Service nodes; hub is CollectionPage + 13-item ItemList (2026-10-02, quick tasks 261002-fqk / 261002-j0z) | City relevance lives on each page's WebPage and Service nodes, so one business entity serves all 13 cities without duplicate contractors | ✓ 261002-fqk / 261002-j0z (supersedes v1.0 Phase 1) |
| Remove 10 non-page cities from schema | Only cities with dedicated pages should be in areaServed | ✓ v1.0 Phase 1 |
| Hub H1 → "Areas We Serve in Central Ohio" | Stops cannibalization of /locations/columbus keyword | ✓ v1.0 Phase 1 |
| ~~Unique @id per subpage schema~~ → Single `#business` entity on every page (reversed 2026-10-02, 261002-fqk) | Per-page @ids made 15 business entities for one company, and city pages referenced an undefined `#business` node | ✓ 261002-fqk (supersedes v1.0 Phase 1) |
| LocationBreadcrumb + NearbyAreas components | Reusable components driven by locations.ts data for navigation hierarchy and cross-link mesh | ✓ v1.0 Phase 2 |
| Dynamic footer from LOCATIONS array | Ensures all 13 cities discoverable from every page, no hardcoded lists to maintain | ✓ v1.0 Phase 2 |
| SVG service area map on hub | Lightweight, accessible map showing 13 city positions with clickable links — no external deps | ✓ v1.0 Phase 3 |
| Plain-text to Link conversion for cross-links | Wraps existing city name mentions on service pages as links — adds linking without new content | ✓ v1.0 Phase 3 |
| Hub card grid consumes LOCATIONS SSOT | Eliminates local duplicate array — all location data in one file | ✓ v1.0 Phase 4 |
| Hub breadcrumb 2-item schema | Removes self-referencing third breadcrumb item on hub page | ✓ v1.0 Phase 4 |
| Metadata fix strategy "S3 Hybrid": per-page `<SEO>` props, not a template default | Diagnosis showed 21 pages inheriting one default; per-page props give each page intent-matching copy and keep the template generic | ✓ v1.1 Phase 1 |
| Copy approval gate per batch: draft → user approval → frozen packet → mechanical per-page commits | Keeps every title/description/H1/H2 change reviewable and reversible; no source edits before approval | ✓ v1.1 Phases 2-4 |
| Zero superlatives in metadata and headings (META-05) | Avoids Helpful Content signals; removed "BEST", "most trusted", "highest-rated" | ✓ v1.1 Phases 2-3 |
| prerender.mjs strips the template `<meta description>` | Helmet's per-page description becomes the only one in prerendered HTML | ✓ v1.1 Phase 2 (02-02) |
| /blog: remove the early-return loading guard | SSR rendered an empty state while awaiting Supabase; head and hero now render on the server, spinner moved inline | ✓ v1.1 Phase 5 |
| Location descriptions shortened to 127-152 chars (b9a514f, 2026-06-06); accepted 2026-10-12 | Stays under the ~155-char SERP truncation point; retires the 140-char floor from 04-01 | ⚠️ Revisit if location-page CTR drops; future edits go through the gate |
| Route error boundary inside `<main>` + one-shot `vite:preloadError` reload | A failed lazy chunk during hydration unmounted the whole root; boundary keeps header/footer, reload recovers stale-hash 404s and transient 502s | ✓ 261012-lje |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-10-12 after v1.1 milestone close (shipped 2026-04-10; paperwork, archive and PROJECT review completed 2026-10-12)*
