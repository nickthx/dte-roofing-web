# Research Summary: Local SEO Schema & Service Area Optimization

**Domain:** Local business SEO for multi-area roofing contractor (React SPA)
**Researched:** 2026-03-21
**Overall confidence:** HIGH

## Executive Summary

The DTE Roofing website has a solid content foundation with 13 unique location subpages, but the structured data implementation has several critical bugs that undermine local SEO authority. The most damaging issue is that every location page uses the same `@id` in its JSON-LD schema, which tells Google all 13 pages describe the same entity. Combined with a bloated 23-city `areaServed` array (only 13 have pages) and a location breadcrumb that incorrectly points to `/services`, the structured data is actively working against the site's local ranking potential.

The good news: no new dependencies or architectural migrations are needed. The existing `SchemaMarkup.tsx` component already handles client-side JSON-LD injection correctly, and Google explicitly supports JavaScript-generated structured data. The work is about fixing data quality, not rebuilding infrastructure. A centralized location config file will eliminate the root cause (duplicated/inconsistent data across 13 files) and enable schema, cross-linking, and navigation features to stay in sync.

One notable finding: Google restricted FAQPage rich results to government and health sites in August 2023. The existing FAQ schema generates valid markup but will never produce rich results for a commercial roofing site. However, FAQ structured data still has value for AI search citation (ChatGPT, Perplexity, AI Overviews), so it should be kept but not optimized further.

The client-side rendering approach (useEffect injecting script tags) is validated by Google's documentation, with one caveat: the async `aggregateRating` data from Supabase may not always be available during Googlebot's render pass. This is a minor risk, not a blocker.

## Key Findings

**Stack:** No new dependencies. Fix schema data quality in existing `SchemaMarkup.tsx` using a centralized `locations.ts` config. Zero new npm packages.

**Architecture:** Centralized location config (`src/data/locations.ts`) drives schema, cross-links, breadcrumbs, and footer. Single data source prevents the duplication that caused current bugs.

**Critical pitfall:** Same `@id` on all 13 location pages tells Google they are the same entity. This is the highest-priority fix.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Foundation: Data + Schema Fixes** - Create centralized location config, fix @id uniqueness, scope areaServed per page, add hub page schema
   - Addresses: Unique @id, page-specific areaServed, hub page schema, removal of non-page cities
   - Avoids: Pitfall 1 (same @id), Pitfall 2 (non-page cities), Pitfall 6 (breaking schema during refactor -- test after each change)

2. **Navigation: Breadcrumbs + Footer + Hub H1** - Fix breadcrumb schema, add breadcrumb UI, expand footer to 13 cities, differentiate hub H1
   - Addresses: Breadcrumb schema/UI, footer completeness, H1 cannibalization
   - Avoids: Pitfall 3 (schema without visible UI), Pitfall 4 (H1 cannibalization), Pitfall 8 (breadcrumb pointing to /services)

3. **Authority: Cross-Linking + Service Links** - Add "Nearby Areas" component, add service-to-location links
   - Addresses: Internal linking mesh, topical authority signals
   - Avoids: Pitfall 11 (orphan loops -- ensure minimum 3 cross-links per page)

**Phase ordering rationale:**
- Phase 1 must come first because the centralized data config is a dependency for all subsequent features
- Phase 2 before Phase 3 because breadcrumbs and footer are simpler, higher-certainty wins that should be validated before building the cross-linking mesh
- Each phase should be validated with Rich Results Test before proceeding

**Research flags for phases:**
- Phase 1: Standard implementation, unlikely to need further research. Validate with Rich Results Test after deployment.
- Phase 2: Standard implementation. Only concern is responsive footer layout with 13 links (test at mobile breakpoints).
- Phase 3: Service area map component (if included) may need research for lightweight implementation options. Cross-linking is straightforward.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | No new dependencies; schema.org types verified against official docs; Google JS rendering confirmed |
| Features | HIGH | Clear list of current bugs to fix; table stakes well-defined |
| Architecture | HIGH | Centralized config pattern is standard DRY practice; data flow is simple |
| Pitfalls | HIGH | 4 critical bugs identified from codebase analysis; prevention strategies are concrete |
| areaServed scoping strategy | MEDIUM | Schema.org supports it, industry consensus recommends it, but Google has not explicitly stated per-page scoping improves rankings vs. a comprehensive list |
| FAQPage deprecation | HIGH | Verified against Google's August 2023 announcement and current documentation |
| Client-side JSON-LD support | HIGH | Verified against Google's official developer documentation |

## Gaps to Address

- **aggregateRating reliability:** The async Supabase fetch for review data may not complete before Googlebot renders. Decide whether to add a hardcoded fallback to schema (not just UI) or accept intermittent missing ratings. Low priority -- most crawls will succeed.
- **Service area map:** If the hub page map is in scope, a separate research spike may be needed for lightweight map component options (static SVG vs. interactive). Deferred to Phase 3 scope discussion.
- **Google Business Profile alignment:** Schema should match GBP data. A manual audit of GBP vs. schema NAP and categories is recommended but is outside this codebase work.
