# Domain Pitfalls: Local SEO Schema & Service Area Optimization

**Domain:** Local business SEO for multi-area service contractor (React SPA)
**Researched:** 2026-03-21

## Critical Pitfalls

Mistakes that cause ranking loss or Google penalties.

### Pitfall 1: Same @id Across All Location Pages (CURRENT BUG)

**What goes wrong:** Every location subpage uses `@id: "{domain}/#business"`, telling Google all 13 pages describe the identical entity.
**Why it happens:** Schema was originally written for a single-page setup and copy-pasted to subpages without updating the identifier.
**Consequences:** Google may deduplicate schema and only process one page's structured data. The other 12 pages lose their local business rich result eligibility.
**Prevention:** Use `@id: "{domain}/locations/{slug}#business"` per page. The hub page gets `@id: "{domain}/locations#business"`.
**Detection:** Paste any two location page URLs into the Rich Results Test. If the `@id` is identical, this bug is present.

### Pitfall 2: areaServed Containing Non-Page Cities (CURRENT BUG)

**What goes wrong:** Current schema lists 23 cities including Canal Winchester, Lancaster, Newark, etc. -- cities with no dedicated page.
**Why it happens:** The areaServed was built from the full service area, not the page structure.
**Consequences:** Dilutes local relevance signals for the 13 cities that DO have pages. Google cannot find authoritative content for the listed cities, weakening trust in the schema accuracy.
**Prevention:** Only include cities in areaServed that have a corresponding `/locations/{city}` page. Use the centralized LOCATIONS config to enforce this constraint programmatically.
**Detection:** Compare the areaServed array in schema output against the actual route definitions in `App.tsx`.

### Pitfall 3: Breadcrumb Schema Mismatched with Visible UI

**What goes wrong:** Adding BreadcrumbList JSON-LD without a corresponding visible breadcrumb navigation element.
**Why it happens:** Developers implement schema in code without adding the UI component.
**Consequences:** Google guidelines state structured data must reflect visible content. Mismatch can lead to manual actions or schema being ignored.
**Prevention:** Implement breadcrumb UI component in the same phase as the breadcrumb schema fix. Test that the text and URLs in schema match what the user sees.
**Detection:** Visual inspection of the page vs. the JSON-LD output in DevTools.

### Pitfall 4: Hub Page H1 Cannibalizing Subpage (CURRENT BUG)

**What goes wrong:** Hub page H1 "Roofing Contractor Columbus OH" directly competes with `/locations/columbus` for the same keyword.
**Why it happens:** Hub was created with a Columbus-focused heading without considering keyword competition with the dedicated Columbus page.
**Consequences:** Google doesn't know which page to rank for "roofing contractor Columbus OH." Both pages may rank lower than they should (keyword cannibalization).
**Prevention:** Change hub H1 to a non-location-specific heading like "Areas We Serve in Central Ohio."
**Detection:** Search `site:dteroofingllc.com roofing contractor columbus` -- if both pages appear, cannibalization is occurring.

## Moderate Pitfalls

### Pitfall 5: Inconsistent NAP in Schema vs. Page Content

**What goes wrong:** Schema address/phone/name doesn't match what's visible on the page or what's in Google Business Profile.
**Prevention:** All schema NAP data should come from a single constant (`BUSINESS_INFO` in SchemaMarkup.tsx). Never hardcode NAP in individual page components. Cross-reference with Google Business Profile.

### Pitfall 6: Breaking Schema During Refactor

**What goes wrong:** Refactoring SchemaMarkup.tsx introduces a syntax error in JSON-LD that goes unnoticed.
**Prevention:** After every schema change, test at least 3 representative pages with the Rich Results Test: the hub page, Columbus (HQ city), and one smaller city like Delaware. Check both "valid" status and specific warnings.
**Detection:** Rich Results Test shows errors or "no structured data found."

### Pitfall 7: Async aggregateRating Missing on Crawl

**What goes wrong:** The review data from Supabase loads asynchronously. If the fetch is slow or fails during a Googlebot crawl, the schema renders without `aggregateRating`.
**Prevention:** Either add a hardcoded fallback rating to the schema object (not just the UI), or accept intermittent missing ratings. The current UI fallback of "92+ reviews" doesn't propagate to the schema.
**Detection:** Check schema output in DevTools with network throttling enabled.

### Pitfall 8: Location Breadcrumb Pointing to /services (CURRENT BUG)

**What goes wrong:** The existing `generateBreadcrumbSchema()` uses `/services` as the parent for location pages instead of `/locations`.
**Prevention:** Fix the breadcrumb generation logic to use `/locations` as position 2 for `type === 'location'` pages.
**Detection:** Run any location page through Rich Results Test and inspect the breadcrumb trail.

## Minor Pitfalls

### Pitfall 9: Missing `geo` Precision

**What goes wrong:** Coordinates with fewer than 5 decimal places may not be precise enough for Google.
**Prevention:** Google recommends at least 5 decimal places for latitude and longitude. Current values (`39.9612`, `-83.1565`) have only 4. Consider updating to full precision.

### Pitfall 10: `sameAs` Missing Key Profiles

**What goes wrong:** The `sameAs` property in different files references different social profiles. `schemas.ts` has Facebook and Instagram; `SchemaMarkup.tsx` only has Google Maps.
**Prevention:** Consolidate all social/profile URLs into one authoritative list. Include Google Maps, Facebook, Instagram, and any BBB or Yelp profiles.

### Pitfall 11: Cross-Links Creating Orphan Loops

**What goes wrong:** If "Nearby Areas" only links to immediate neighbors, some cities (like Delaware, which only neighbors Powell, Westerville, Worthington) may have very few cross-links, creating weak link equity distribution.
**Prevention:** Ensure every location page has at least 3 cross-links. If a city has fewer than 3 neighbors, consider adding Columbus as a default cross-link (since it's the hub city/HQ).

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Schema @id refactor | Breaking existing schema that Google has already indexed | Deploy and re-submit affected pages to Google Search Console for re-crawling |
| areaServed scoping | Accidentally removing a city that should be included | Validate against the 13-city list in PROJECT.md before deploying |
| Breadcrumb schema + UI | Schema text not matching visible breadcrumb text exactly | Use the same data source for both schema and UI rendering |
| Footer expansion | Layout breaking with 13 links instead of 5 | Test responsive layout at mobile breakpoints |
| Cross-linking component | Linking to a city slug that doesn't match the route | Derive all slugs from the centralized LOCATIONS config, validate against App.tsx routes |
| Hub page changes | Removing Columbus keyword from hub without proper redirect signals | Ensure `/locations/columbus` has strong internal linking to compensate |

## Sources

- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) -- Required properties and compliance
- [Google: Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) -- Breadcrumb format requirements
- [Google Rich Results Test](https://search.google.com/test/rich-results) -- Primary validation tool
- [Schema App: @id best practices](https://www.schemaapp.com/schema-markup/what-is-an-id-in-structured-data/) -- Unique @id guidance
- Existing codebase analysis: identified bugs in SchemaMarkup.tsx, schemas.ts
