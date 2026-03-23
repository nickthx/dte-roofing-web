# Requirements: DTE Roofing — Local Authority & Service Area SEO Overhaul

**Defined:** 2026-03-21
**Core Value:** Establish DTE Roofing as the authoritative local roofing contractor across all 13 Central Ohio service areas through proper schema, cross-linking, and page structure.

## v1 Requirements

### Schema Fixes

- [x] **SCHEMA-01**: Hub page (/locations) has RoofingContractor JSON-LD schema with correct NAP, hours, and 13-city areaServed
- [x] **SCHEMA-02**: Each of 13 subpages has page-specific areaServed (primary city + 2-3 geographic neighbors, only from the 13 with pages)
- [x] **SCHEMA-03**: Each subpage schema has unique @id (e.g., `https://www.dteroofingllc.com/locations/hilliard#business`)
- [x] **SCHEMA-04**: No non-page cities remain in any areaServed array (remove ~10 cities without pages)
- [x] **SCHEMA-05**: Each subpage's primary city appears in its own areaServed array (including New Albany fix)
- [x] **SCHEMA-06**: Breadcrumb schema on location subpages points to /locations (not /services)
- [x] **SCHEMA-07**: Geo coordinates are consistent between SchemaMarkup.tsx and schemas.ts
- [x] **SCHEMA-08**: All JSON-LD is syntactically valid across all location pages

### Hub Page

- [x] **HUB-01**: Hub page H1 changed from "Roofing Contractor Columbus OH" to "Areas We Serve in Central Ohio"
- [x] **HUB-02**: Hub page meta title updated to match new H1 (e.g., "Areas We Serve in Central Ohio | DTE Roofing Service Areas")
- [ ] **HUB-03**: Service area map visible on /locations hub page (Google Maps embed, SVG, or static image)

### Internal Linking

- [x] **LINK-01**: All 13 subpages have visible breadcrumb or "← All Service Areas" link in main content (below hero, above first content section)
- [x] **LINK-02**: All 13 subpages have "Nearby Areas We Serve" section with 3-5 links to geographically adjacent location pages
- [x] **LINK-03**: Footer lists all 13 location pages (not just 5), with "All Service Areas →" link to /locations
- [ ] **LINK-04**: Service pages (/services/*) link to relevant location pages where contextually natural (2-3 links per service page)

### Data Architecture

- [x] **DATA-01**: Centralized `src/data/locations.ts` file with all 13 cities, slugs, neighbor mappings, and areaServed arrays as single source of truth

## v2 Requirements

### Schema Enhancements

- **SCHEMA-V2-01**: Add GeoCoordinates (lat/lng) for each of the 13 city centers in schema
- **SCHEMA-V2-02**: Add Wikipedia/Wikidata sameAs links per city
- **SCHEMA-V2-03**: Add aggregateRating hardcoded fallback to schema for Googlebot reliability

### Content Enhancements

- **CONTENT-V2-01**: Build location pages for removed cities (Canal Winchester, Lancaster, etc.) when ready
- **CONTENT-V2-02**: Add LocalBusiness schema to service pages
- **CONTENT-V2-03**: Implement prerendering for AI search engine compatibility

## Out of Scope

| Feature | Reason |
|---------|--------|
| Content rewrites on any page | All content is audited and approved |
| URL changes | Slugs and routing are locked |
| NAP changes | Address/phone/email audited separately |
| New location pages | Only existing 13 in scope; others deferred to v2 |
| FAQPage rich result optimization | Google restricted to gov/health sites Aug 2023 |
| Google Business Profile audit | Outside codebase work |
| SSR/prerendering migration | Client-side JSON-LD is Google-validated; AI search is v2 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 1 | Complete |
| SCHEMA-01 | Phase 1 | Complete |
| SCHEMA-02 | Phase 1 | Complete |
| SCHEMA-03 | Phase 1 | Complete |
| SCHEMA-04 | Phase 1 | Complete |
| SCHEMA-05 | Phase 1 | Complete |
| SCHEMA-06 | Phase 1 | Complete |
| SCHEMA-07 | Phase 1 | Complete |
| SCHEMA-08 | Phase 1 | Complete |
| HUB-01 | Phase 1 | Complete |
| HUB-02 | Phase 1 | Complete |
| LINK-01 | Phase 2 | Complete |
| LINK-02 | Phase 2 | Complete |
| LINK-03 | Phase 2 | Complete |
| LINK-04 | Phase 3 | Pending |
| HUB-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-21*
*Last updated: 2026-03-21 after initial definition*
