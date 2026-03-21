# Architecture Patterns: Local SEO Schema & Service Area Optimization

**Domain:** Local business SEO for multi-area service contractor (React SPA)
**Researched:** 2026-03-21

## Recommended Architecture

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `src/data/locations.ts` | Single source of truth for all 13 locations: slug, city name, neighbor mapping | SchemaMarkup, NearbyAreas, Footer, Breadcrumb |
| `src/components/SchemaMarkup.tsx` | Generates and injects JSON-LD scripts into `<head>` | `locations.ts` for per-page areaServed; `useReviewData` for ratings |
| `src/components/Breadcrumb.tsx` (new) | Visible breadcrumb navigation UI | React Router for current path; `locations.ts` for city name |
| `src/components/NearbyAreas.tsx` (new) | "Nearby Areas We Serve" cross-linking section | `locations.ts` for neighbor list |
| `src/components/Footer.tsx` (modify) | Footer location links -- all 13 cities | `locations.ts` for complete list |
| `src/pages/locations/*.tsx` | Location subpages -- consume new components | SchemaMarkup, Breadcrumb, NearbyAreas |
| `src/pages/Locations.tsx` (hub) | Hub page with differentiated H1 and comprehensive schema | SchemaMarkup with all-city areaServed |

### Data Flow

```
locations.ts (static config)
    |
    +--> SchemaMarkup.tsx
    |       Reads: slug, cityName, neighbors
    |       Generates: RoofingContractor JSON-LD with scoped areaServed
    |       Generates: BreadcrumbList JSON-LD
    |       Injects: <script type="application/ld+json"> into <head>
    |
    +--> NearbyAreas.tsx
    |       Reads: neighbors for current city
    |       Renders: Grid of <Link> components to neighbor pages
    |
    +--> Breadcrumb.tsx
    |       Reads: cityName for current page
    |       Renders: Home > Service Areas > {City} navigation
    |
    +--> Footer.tsx
            Reads: all locations
            Renders: Complete list of 13 location links
```

## Patterns to Follow

### Pattern 1: Centralized Location Config

**What:** Single TypeScript data file defining all location metadata and relationships.
**When:** Any time location data is needed (schema, links, navigation, footer).
**Why:** Prevents the current problem where schema data is duplicated/inconsistent across 13 files.

```typescript
// src/data/locations.ts
export interface LocationConfig {
  slug: string;
  cityName: string;
  stateAbbr: string;
  neighbors: string[];  // slugs -- only cities with dedicated pages
}

export const LOCATIONS: LocationConfig[] = [
  {
    slug: 'columbus',
    cityName: 'Columbus',
    stateAbbr: 'OH',
    neighbors: ['hilliard', 'dublin', 'upper-arlington', 'westerville', 'gahanna', 'reynoldsburg', 'grove-city', 'worthington'],
  },
  // ... 12 more
];

// Helper functions
export const getLocationBySlug = (slug: string): LocationConfig | undefined =>
  LOCATIONS.find(loc => loc.slug === slug);

export const getAreaServedForLocation = (slug: string): LocationConfig[] => {
  const location = getLocationBySlug(slug);
  if (!location) return [];
  const neighborLocations = location.neighbors
    .map(n => getLocationBySlug(n))
    .filter(Boolean) as LocationConfig[];
  return [location, ...neighborLocations];
};
```

### Pattern 2: Schema Composition (not Monolithic)

**What:** SchemaMarkup generates multiple independent JSON-LD blocks, not one giant object.
**When:** A page needs multiple schema types (RoofingContractor + BreadcrumbList + WebPage).
**Why:** Google recommends separate JSON-LD blocks for independent entities. Easier to debug and validate.

```typescript
// Each schema type gets its own <script type="application/ld+json">
// This is already the existing pattern in SchemaMarkup.tsx -- keep it.
const schemas = [
  generateLocalBusinessSchema(),   // RoofingContractor
  generateBreadcrumbSchema(),      // BreadcrumbList
  generateWebPageSchema(),         // WebPage
].filter(Boolean);
```

### Pattern 3: Schema Props Instead of Global State

**What:** Pass location-specific data as props to SchemaMarkup, not as a global config lookup.
**When:** Rendering SchemaMarkup in a location page component.
**Why:** Explicit data flow; each page declares exactly what schema data it needs.

```typescript
// In Columbus.tsx:
<SchemaMarkup
  type="location"
  locationSlug="columbus"        // NEW: drives areaServed lookup
  locationName="Columbus"
  pageTitle="Roofers in Columbus, OH"
  pageUrl="https://www.dteroofingllc.com/locations/columbus"
/>

// SchemaMarkup internally:
// Uses locationSlug to call getAreaServedForLocation('columbus')
// Returns [Columbus, Hilliard, Dublin, Upper Arlington, ...]
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Schema Data in Page Components

**What:** Defining areaServed arrays, neighbor lists, or schema properties inside each of the 13 page components.
**Why bad:** This is exactly the current problem. When schema needs updating, you must touch 13 files. Inconsistencies creep in (e.g., New Albany missing from its own areaServed).
**Instead:** Centralize in `locations.ts`, consume via props or lookup functions.

### Anti-Pattern 2: Single @id Across All Location Pages

**What:** Using `{domain}/#business` as the `@id` on every location page.
**Why bad:** Tells Google all pages describe the same entity. Google may ignore "duplicate" structured data and only index one page's schema.
**Instead:** Use `{domain}/locations/{slug}#business` for unique per-page identity.

### Anti-Pattern 3: Including Cities Without Pages in areaServed

**What:** Listing Canal Winchester, Lancaster, Newark, etc. in areaServed when no dedicated page exists for them.
**Why bad:** Creates a promise to Google that you have content about those areas. When users search for "roofing contractor Newark OH" and land on a generic page, it signals low relevance. Dilutes authority for cities you DO have pages for.
**Instead:** Only include the 13 cities with dedicated location pages.

### Anti-Pattern 4: Breadcrumb Schema Without Visible Breadcrumb

**What:** Having BreadcrumbList JSON-LD but no visible breadcrumb navigation on the page.
**Why bad:** Google guidelines state to "only markup content that is visible on your web page." Schema without visible content risks being flagged as misleading.
**Instead:** Add a visible breadcrumb UI component that matches the schema exactly.

## Scalability Considerations

| Concern | Current (13 cities) | Future (20+ cities) |
|---------|---------------------|---------------------|
| Adding a new location | Add entry to `LOCATIONS` array, create page component, schema/links auto-generate | Same process, O(1) effort per city |
| Neighbor relationship changes | Update `neighbors` array in config, all components reflect change | Same -- single data source |
| Schema property changes | Update `SchemaMarkup.tsx` once, all 13+ pages updated | Same -- centralized generation |
| Validation | Test 2-3 representative pages with Rich Results Test | Consider automated schema validation in CI |

## Sources

- [Google: Generate structured data with JavaScript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- Existing codebase analysis: `src/components/SchemaMarkup.tsx`, `src/seo/schemas.ts`, `src/pages/locations/*.tsx`
