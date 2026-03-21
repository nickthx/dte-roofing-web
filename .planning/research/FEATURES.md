# Feature Landscape: Local SEO Schema & Service Area Optimization

**Domain:** Local business SEO for multi-area service contractor
**Researched:** 2026-03-21

## Table Stakes

Features that must exist for proper local SEO authority. Missing = leaving rankings on the table.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Unique `@id` per location schema | Without it, Google treats all 13 pages as the same entity. Current site has this bug. | Low | Change `@id` from `{url}#business` to `{url}/locations/{slug}#business` |
| Page-specific `areaServed` | Generic 23-city list on every page dilutes local relevance signals. Google can't determine which page is authoritative for which city. | Med | Requires neighbor mapping data structure + SchemaMarkup refactor |
| Hub page schema | `/locations` currently has ZERO schema. Google has no structured data for the main service area page. | Low | Add RoofingContractor schema with all 13 cities in areaServed |
| Breadcrumb schema (JSON-LD) | Google displays breadcrumb trails in search results. Currently the location breadcrumb points to `/services` instead of `/locations`. | Low | Fix the `generateBreadcrumbSchema()` location branch |
| Breadcrumb UI component | Schema must reflect visible page content (Google guideline). Need a visible breadcrumb nav on location subpages. | Low | Simple `Home > Service Areas > {City}` nav element |
| Footer with all 13 locations | Currently only 5 of 13 are in the footer. Footer links are site-wide internal linking signals. | Low | Update footer component to list all 13 |
| Hub H1 differentiation | Current hub H1 "Roofing Contractor Columbus OH" cannibalizes `/locations/columbus`. | Low | Change to "Areas We Serve in Central Ohio" per PROJECT.md |

## Differentiators

Features that improve local SEO authority beyond the basics. Not required but high-value.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| "Nearby Areas We Serve" cross-links | Internal links between related location pages pass PageRank and signal topical clusters to Google. Only 1 cross-link exists currently (Dublin to Columbus). | Med | Component that reads neighbor data and renders links on each subpage |
| `containedInPlace` disambiguation | Adding `"containedInPlace": {"@type": "State", "name": "Ohio"}` to City objects helps disambiguate common names (Columbus, Dublin, Delaware, Powell) | Low | Small schema enhancement, especially valuable for Dublin and Delaware |
| Service-to-location cross-links | Service pages linking to relevant location pages creates a mesh topology that strengthens both page types | Med | Natural anchor text links within service page content |
| Service area map on hub | Visual representation of coverage area; increases time on page and engagement signals | Med-High | Requires either static image map or lightweight interactive component |

## Anti-Features

Features to explicitly NOT build for this milestone.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| FAQPage schema optimization | Google restricted FAQ rich results to government/health sites in Aug 2023. No ROI for commercial roofing site. | Keep existing FAQ schema for AI search citation value but don't invest optimization time |
| SSR/Next.js migration for SEO | Massive effort, marginal gain. Google confirms JS-injected JSON-LD works. | Test client-side rendering with Rich Results Test; fix only if it fails |
| `subOrganization`/`parentOrganization` hierarchy | DTE is one business with one location serving multiple areas, not a franchise. Wrong schema pattern. | Single entity with per-page `areaServed` scoping |
| New location pages beyond the 13 | Out of scope per PROJECT.md. Remove non-page cities from areaServed. | Only reference cities that have dedicated pages |
| Google Maps embed on every subpage | Heavy iframe, slows page load, no schema value | Static directions link or Google Maps URL in content |

## Feature Dependencies

```
Centralized location data (LOCATIONS config)
  --> Page-specific areaServed schema
  --> "Nearby Areas" cross-linking component
  --> Footer location list (all 13)

Breadcrumb schema fix --> Breadcrumb UI component (schema must match visible content)

Hub page H1 fix --> Hub page schema (should happen together to avoid partial state)
```

## MVP Recommendation

**Phase 1 (foundation):** Centralized location data config + unique @id + page-specific areaServed + hub page schema
- Highest SEO impact: fixes the core schema duplication problem
- Enables all subsequent features

**Phase 2 (navigation & linking):** Breadcrumb schema fix + breadcrumb UI + footer update + hub H1 fix
- Visible user-facing changes + schema corrections

**Phase 3 (authority building):** Cross-linking component + service-to-location links + optional map
- Internal linking mesh that builds topical authority

**Defer:** Service area map (complexity vs value tradeoff; consider for future milestone)
