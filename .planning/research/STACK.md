# Technology Stack: Local SEO Schema & Service Area Optimization

**Project:** DTE Roofing — Local Authority & Service Area SEO Overhaul
**Researched:** 2026-03-21
**Focus:** Schema markup types, JSON-LD implementation patterns, and validation tooling for local business SEO on a React SPA

## Recommended Stack

No new dependencies are needed. The existing codebase already has the correct delivery mechanism (client-side JSON-LD injection via `useEffect` in `SchemaMarkup.tsx`). The work is about fixing schema data quality, not adding libraries.

### Schema.org Types to Implement

| Schema Type | Where Used | Purpose | Confidence |
|-------------|-----------|---------|------------|
| `RoofingContractor` | Every location subpage + hub page | Primary business entity, inherits from LocalBusiness | HIGH - verified schema.org |
| `BreadcrumbList` | Every location subpage | Navigation hierarchy for search display | HIGH - verified Google docs |
| `WebPage` | Every location subpage + hub page | Page-level metadata linking to business entity | HIGH - already implemented |
| `Service` | Service pages linking to locations | Service offerings with provider reference | HIGH - already implemented |

### Schema.org Properties: What to Use and Why

#### RoofingContractor (per location subpage)

| Property | Value Pattern | Why | Confidence |
|----------|--------------|-----|------------|
| `@context` | `"https://schema.org"` | Required | HIGH |
| `@type` | `"RoofingContractor"` | Most specific type for this business; Google prefers specific subtypes over generic `LocalBusiness` | HIGH |
| `@id` | `"{CANONICAL_DOMAIN}/locations/{slug}#business"` | **Unique per page.** This is the critical fix -- the current schema uses the same `@id` on every page, which tells Google they are all the same entity. Each subpage needs its own `@id` so Google treats them as distinct location-specific entries. | HIGH - verified via schema.org @id spec and multi-location best practices |
| `name` | `"DTE Roofing"` | Business name, consistent across all pages (NAP consistency) | HIGH |
| `url` | `"{CANONICAL_DOMAIN}/locations/{slug}"` | Points to the specific location page, not the root domain | HIGH |
| `telephone` | `"+1-614-971-6028"` | Single phone number, consistent NAP | HIGH |
| `address` | Same `PostalAddress` object (single physical location) | Google requires `address` for LocalBusiness rich results. DTE has one HQ. | HIGH - Google docs: address is required |
| `geo` | `GeoCoordinates` with lat/lng | Google recommends 5+ decimal precision for coordinates | HIGH |
| `areaServed` | Array of `City` objects -- **primary city + 2-3 neighbors only** | The critical fix: current schema dumps 23 cities on every page. Per-page scoping with only cities that have dedicated pages signals local relevance. | HIGH - verified schema.org property; scoping strategy is MEDIUM (industry best practice, not Google-mandated) |
| `aggregateRating` | Dynamic from Supabase review data | Already implemented; keep as-is | HIGH |
| `openingHoursSpecification` | Standard hours array | Already implemented correctly | HIGH |
| `sameAs` | Social profile URLs | Already implemented; consider adding Google Maps URL | MEDIUM |

#### RoofingContractor (hub page `/locations`)

| Property | Value Pattern | Why |
|----------|--------------|-----|
| `@id` | `"{CANONICAL_DOMAIN}/locations#business"` | Distinct from any subpage |
| `areaServed` | Array of all 13 cities with pages | Hub page represents the full service area |
| All other props | Same as subpages | Consistent NAP |

#### BreadcrumbList (per location subpage)

| Property | Value Pattern | Why | Confidence |
|----------|--------------|-----|------------|
| `itemListElement[0]` | `{position: 1, name: "Home", item: "{CANONICAL_DOMAIN}"}` | Root of hierarchy | HIGH - Google docs |
| `itemListElement[1]` | `{position: 2, name: "Service Areas", item: "{CANONICAL_DOMAIN}/locations"}` | Hub page as parent | HIGH |
| `itemListElement[2]` | `{position: 3, name: "{City Name}"}` | Current page -- no `item` URL needed for final breadcrumb per Google spec | HIGH - verified Google docs |

**Important fix:** The existing breadcrumb schema points position 2 to `/services` instead of `/locations` for location pages. This is incorrect and must be changed to reference the locations hub.

#### areaServed City Objects -- Enhanced Format

```typescript
// Current (too generic, no disambiguation):
{ "@type": "City", "name": "Dublin" }

// Recommended (disambiguated with state context):
{
  "@type": "City",
  "name": "Dublin",
  "containedInPlace": {
    "@type": "State",
    "name": "Ohio"
  }
}
```

Adding `containedInPlace` disambiguates city names (Dublin, OH vs Dublin, Ireland vs Dublin, CA). This is especially relevant for Columbus, Dublin, Delaware, and Powell which are common city names nationwide. Confidence: MEDIUM -- schema.org supports this, but Google has not stated it improves local rankings specifically.

### What NOT to Implement

| Anti-Pattern | Why Avoid | What to Do Instead |
|-------------|-----------|-------------------|
| `FAQPage` schema for rich results | **Google restricted FAQ rich results to government and health sites in August 2023.** Commercial sites no longer get FAQ rich snippets. The existing `generateFAQSchema()` in `SchemaMarkup.tsx` generates valid markup but will never produce rich results for DTE. | Keep the FAQPage markup anyway -- it has high citation rates in AI search (ChatGPT, Perplexity, AI Overviews) even without rich results. But do not invest optimization effort here. |
| `serviceArea` property | **Deprecated** in favor of `areaServed` per schema.org. Some guides still reference it. | Use `areaServed` exclusively. Already correct in current implementation. |
| `subOrganization` / `parentOrganization` | DTE is a single-location business serving multiple areas, NOT a multi-location franchise. Using org hierarchy would misrepresent the business structure to Google. | Use a single `RoofingContractor` entity with per-page `areaServed` scoping. The `@id` differentiation handles the per-page uniqueness. |
| `hasMap` with embedded Google Maps | Adds no schema value; Google already knows your Maps listing from GMB. Embedded maps slow page load. | Link to Google Maps in visible page content instead. |
| SSR / Next.js migration for schema | Massive effort for marginal gain. Google explicitly states it processes client-side JavaScript-generated structured data: "Google Search can understand and process structured data that's available in the DOM when it renders the page." The existing `useEffect` injection pattern is fine. | Keep current client-side injection via `SchemaMarkup.tsx`. Test with Rich Results Test to confirm rendering. |

### Client-Side JSON-LD: Why It Works (and One Caveat)

Google's official documentation at [developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript) explicitly supports JavaScript-injected JSON-LD:

> "Google Search can understand and process structured data that's available in the DOM when it renders the page."

**The existing pattern in `SchemaMarkup.tsx` is correct:** it uses `useEffect` to inject `<script type="application/ld+json">` tags into `document.head`, and cleans them up on unmount. This works because:

1. Googlebot uses a Chrome-based renderer (WRS) that executes JavaScript
2. The JSON-LD is synchronously available after React hydration
3. No async data fetching delays the schema (except `aggregateRating` from Supabase, which is acceptable)

**One caveat:** The `aggregateRating` data comes from `useReviewData()` which fetches from Supabase asynchronously. If this fetch is slow or fails, the initial render will have no rating data. Google may or may not wait for it. The fallback of 92 reviews in the UI is fine for users, but the schema should either:
- Include a hardcoded fallback rating in the schema (not just the UI), OR
- Accept that `aggregateRating` may be missing from some crawls

Confidence: HIGH that Google processes the JS-rendered schema. MEDIUM on whether async rating data is reliably captured.

## Validation Tools

| Tool | URL | Purpose | When to Use |
|------|-----|---------|-------------|
| Google Rich Results Test | https://search.google.com/test/rich-results | Verifies what rich results Google can generate from your page | After every schema change. This is the authoritative test. |
| Schema Markup Validator | https://validator.schema.org/ | Validates conformity to schema.org spec (all types, not just Google-supported ones) | For validating `areaServed`, `containedInPlace`, and other properties Google doesn't surface as rich results |
| Chrome DevTools | Built into browser | Inspect injected `<script>` tags in `<head>` to verify JSON-LD renders correctly | During development, before deploying |

**Important:** The Rich Results Test can test live URLs or paste code snippets. For a React SPA, always test the **live URL** (not pasted code) because the test needs to execute JavaScript to see the client-side injected schema.

## Data Architecture for Schema

### Recommended: Centralized Location Config

Instead of hardcoding schema data in each of the 13 location page components, create a single data file:

```typescript
// src/data/locations.ts
export interface LocationConfig {
  slug: string;
  cityName: string;
  neighbors: string[];  // slugs of neighboring cities (only cities with pages)
  // ... other location-specific data
}

export const LOCATIONS: LocationConfig[] = [
  {
    slug: 'columbus',
    cityName: 'Columbus',
    neighbors: ['hilliard', 'dublin', 'upper-arlington', 'westerville', 'gahanna', 'reynoldsburg', 'grove-city', 'worthington'],
  },
  {
    slug: 'hilliard',
    cityName: 'Hilliard',
    neighbors: ['columbus', 'dublin', 'upper-arlington', 'grove-city'],
  },
  // ... all 13
];
```

This feeds into:
1. `SchemaMarkup` -- per-page `areaServed` derived from `[primaryCity, ...neighbors]`
2. "Nearby Areas" cross-linking component -- links generated from `neighbors`
3. Footer location list -- generated from `LOCATIONS` array
4. Breadcrumb schema -- `cityName` for display, `slug` for URL

**Why centralized:** The neighbor mapping already exists in PROJECT.md. Encoding it once in TypeScript prevents the 13-file duplication that caused the current "same schema everywhere" problem. Changes to neighbor relationships update schema, cross-links, and navigation simultaneously.

Confidence: HIGH -- this is standard DRY practice, not speculative.

## No New Dependencies Required

| Category | Current | Needed | Verdict |
|----------|---------|--------|---------|
| JSON-LD generation | Hand-built objects in `SchemaMarkup.tsx` | Same approach | No library needed. `schema-dts` (TypeScript types for schema.org) exists but adds complexity for 3 schema types. Not worth it. |
| Schema validation | Manual via Rich Results Test | Same approach | No build-time validation library needed. Validate manually after changes. |
| Breadcrumb UI | None | Simple Tailwind component | No library. A `<nav>` with `<ol>` and Tailwind styling. |
| Cross-linking | None | Simple component reading from `LOCATIONS` data | No library. Map over neighbors, render `<Link>` components. |

## Installation

```bash
# No new packages required.
# The existing stack handles everything:
# - React 18.3.1 for component rendering
# - TypeScript 5.5.3 for type-safe schema objects
# - React Router DOM 7.9.4 for internal links
# - Tailwind CSS 3.4.1 for breadcrumb/cross-link styling
```

## Sources

- [schema.org/RoofingContractor](https://schema.org/RoofingContractor) -- Schema type hierarchy and available properties
- [schema.org/BreadcrumbList](https://schema.org/BreadcrumbList) -- Breadcrumb structured data spec
- [schema.org/areaServed](https://schema.org/areaServed) -- areaServed property definition
- [Google: Generate structured data with JavaScript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript) -- Official confirmation that JS-injected JSON-LD is supported
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) -- Required/recommended properties for rich results
- [Google: Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) -- JSON-LD format and requirements
- [Google: FAQ/HowTo rich result changes (Aug 2023)](https://developers.google.com/search/blog/2023/08/howto-faq-changes) -- FAQ schema restricted to government/health sites
- [Google Rich Results Test](https://search.google.com/test/rich-results) -- Primary validation tool
- [Schema.org Validator](https://validator.schema.org/) -- Full schema.org conformance testing
- [Schema App: What is @id in Structured Data](https://www.schemaapp.com/schema-markup/what-is-an-id-in-structured-data/) -- @id best practices
- [Multi-location schema patterns](https://postelniak.com/blog/local-business-schema-for-multiple-locations/) -- subOrganization vs single-entity patterns
- [Whitespark: JSON-LD Local Business Guide](https://whitespark.ca/blog/the-json-ld-markup-guide-to-local-business-schema/) -- Community best practices
