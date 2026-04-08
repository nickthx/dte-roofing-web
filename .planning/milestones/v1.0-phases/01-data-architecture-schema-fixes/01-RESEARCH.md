# Phase 1: Data Architecture & Schema Fixes - Research

**Researched:** 2026-03-21
**Domain:** JSON-LD schema markup, centralized data architecture, local SEO for multi-area service contractor
**Confidence:** HIGH

## Summary

This phase fixes the schema foundation for 13 location pages plus a hub page. The core problems are well-understood and verified by codebase inspection: (1) no centralized location data file exists, (2) all 13 subpages share identical `@id` and a 23-city `areaServed` array including 10 cities without pages, (3) the hub page passes invalid props to SchemaMarkup so it has effectively zero useful schema, (4) the hub H1 cannibalizes the Columbus subpage, and (5) breadcrumb schema for location pages incorrectly points to `/services` instead of `/locations`.

The solution is straightforward: create `src/data/locations.ts` as a single source of truth, refactor `SchemaMarkup.tsx` to accept a `locationSlug` prop and derive per-page `areaServed` from the centralized data, fix the hub page to use proper RoofingContractor schema with all 13 cities, fix the breadcrumb parent path, and update the hub H1/meta title.

**Primary recommendation:** Build locations.ts first, then refactor SchemaMarkup.tsx to consume it, then fix the hub page. This ordering ensures each subsequent task has its dependencies in place.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DATA-01 | Centralized `src/data/locations.ts` with all 13 cities, slugs, neighbor mappings, and areaServed arrays | Architecture Pattern 1 below; neighbor mapping verified in PROJECT.md; interface design documented |
| SCHEMA-01 | Hub page has RoofingContractor JSON-LD with correct NAP, hours, and 13-city areaServed | Hub page currently passes invalid props (serviceName, serviceDescription, areaServed are not in SchemaMarkup interface); needs type="location" with new hub-specific logic |
| SCHEMA-02 | Each subpage has page-specific areaServed (primary city + 2-3 neighbors, only cities with pages) | Current: all pages share BUSINESS_INFO.areaServed (23 cities). Fix: SchemaMarkup reads from locations.ts via locationSlug prop |
| SCHEMA-03 | Each subpage has unique @id (`{domain}/locations/{slug}#business`) | Current: all use `{domain}#business`. Fix: derive from locationSlug or pageUrl prop |
| SCHEMA-04 | No non-page cities in any areaServed array | Current: 10 extra cities (Canal Winchester, Lancaster, Newark, Marysville, Marion, Circleville, Chillicothe, Springfield, London, West Jefferson, Plain City). Fix: locations.ts only contains 13 page cities; SchemaMarkup reads from it |
| SCHEMA-05 | Each subpage's primary city appears in its own areaServed | getAreaServedForLocation() helper includes primary city first, then neighbors |
| SCHEMA-06 | Breadcrumb schema on location subpages points to /locations (not /services) | Lines 197-209 of SchemaMarkup.tsx: location branch hardcodes `/services` as parent. Fix: change to `/locations` |
| SCHEMA-07 | Geo coordinates consistent between SchemaMarkup.tsx and schemas.ts | SchemaMarkup.tsx: lat 39.9612, lng -83.1565. schemas.ts: lat 39.9637153, lng -83.1477371. These differ. Must reconcile to one correct value. |
| SCHEMA-08 | All JSON-LD syntactically valid | Verified by testing with Chrome DevTools + Rich Results Test after changes |
| HUB-01 | Hub H1 changed to "Areas We Serve in Central Ohio" | Line 111 of Locations.tsx: currently "Roofing Contractor Columbus OH". Direct text change. |
| HUB-02 | Hub meta title updated to match | Line 91 of Locations.tsx: SEO title prop. Change to "Areas We Serve in Central Ohio \| DTE Roofing Service Areas" |
</phase_requirements>

## Standard Stack

### Core

No new dependencies. Everything needed is already in the codebase.

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 18.3.1 | Component rendering, useEffect for JSON-LD injection | Already installed |
| TypeScript | 5.5.3 | Type-safe location config and schema objects | Already installed |
| React Router DOM | 7.9.4 | Internal links in breadcrumbs and cross-links | Already installed |

### Installation

```bash
# No new packages required.
```

## Architecture Patterns

### Recommended File Structure (changes only)

```
src/
  data/
    locations.ts          # NEW: centralized location config (DATA-01)
  components/
    SchemaMarkup.tsx      # MODIFY: accept locationSlug, derive per-page areaServed
  pages/
    Locations.tsx          # MODIFY: hub H1, meta title, proper schema
  seo/
    schemas.ts            # MODIFY: reconcile geo coordinates (or deprecate in favor of SchemaMarkup.tsx)
    constants.ts           # NO CHANGE: CANONICAL_DOMAIN stays as-is
```

### Pattern 1: Centralized Location Config (DATA-01)

**What:** Single TypeScript data file defining all 13 locations with slugs, city names, and neighbor relationships.
**When to use:** Any component that needs location data (schema, cross-links, footer, breadcrumb).

```typescript
// src/data/locations.ts
export interface LocationConfig {
  slug: string;
  cityName: string;
  stateAbbr: string;
  neighbors: string[];  // slugs of neighboring cities (ONLY cities with pages)
}

export const LOCATIONS: LocationConfig[] = [
  {
    slug: 'columbus',
    cityName: 'Columbus',
    stateAbbr: 'OH',
    neighbors: ['hilliard', 'dublin', 'upper-arlington', 'westerville', 'gahanna', 'reynoldsburg', 'grove-city', 'worthington'],
  },
  {
    slug: 'hilliard',
    cityName: 'Hilliard',
    stateAbbr: 'OH',
    neighbors: ['columbus', 'dublin', 'upper-arlington', 'grove-city'],
  },
  // ... all 13
];

// Lookup helpers
export const getLocationBySlug = (slug: string): LocationConfig | undefined =>
  LOCATIONS.find(loc => loc.slug === slug);

export const getAreaServedForLocation = (slug: string): LocationConfig[] => {
  const location = getLocationBySlug(slug);
  if (!location) return [];
  const neighborLocations = location.neighbors
    .map(n => getLocationBySlug(n))
    .filter((loc): loc is LocationConfig => loc !== undefined);
  return [location, ...neighborLocations];
};

export const getAllLocationSlugs = (): string[] =>
  LOCATIONS.map(loc => loc.slug);
```

**Complete neighbor mapping (from PROJECT.md, verified):**

| City | Neighbors (slugs) |
|------|-------------------|
| columbus | hilliard, dublin, upper-arlington, westerville, gahanna, reynoldsburg, grove-city, worthington |
| hilliard | columbus, dublin, upper-arlington, grove-city |
| dublin | columbus, hilliard, powell, worthington, upper-arlington |
| new-albany | columbus, westerville, gahanna |
| upper-arlington | columbus, hilliard, dublin, worthington, grove-city |
| westerville | columbus, powell, gahanna, worthington, new-albany |
| gahanna | columbus, westerville, new-albany, reynoldsburg |
| reynoldsburg | columbus, gahanna, pickerington |
| grove-city | columbus, hilliard, pickerington |
| pickerington | columbus, reynoldsburg, grove-city, gahanna |
| worthington | columbus, dublin, powell, westerville, upper-arlington |
| delaware | powell, westerville, worthington |
| powell | dublin, westerville, delaware, worthington |

### Pattern 2: SchemaMarkup Accepts locationSlug Prop

**What:** Add optional `locationSlug` prop to SchemaMarkup. When present, derive areaServed from locations.ts instead of using the hardcoded 23-city BUSINESS_INFO.areaServed.

```typescript
// Updated SchemaMarkupProps interface
interface SchemaMarkupProps {
  type: 'home' | 'service' | 'faq' | 'location' | 'hub' | 'general';  // ADD 'hub'
  service?: Service;
  faqs?: FAQ[];
  locationName?: string;
  locationSlug?: string;     // NEW: drives per-page areaServed lookup
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
}
```

**Schema generation changes:**

- `type === 'location'` + `locationSlug` present: use `getAreaServedForLocation(locationSlug)` for scoped areaServed, set `@id` to `{domain}/locations/{slug}#business`
- `type === 'hub'` (new): use all 13 LOCATIONS for areaServed, set `@id` to `{domain}/locations#business`
- `type === 'home'` / `type === 'general'`: keep existing behavior (or also scope to all 13)

### Pattern 3: areaServed City Object Format

**What:** Each city in areaServed should include `containedInPlace` for disambiguation.

```typescript
// Generated from LocationConfig:
const cityToAreaServed = (loc: LocationConfig) => ({
  '@type': 'City',
  'name': loc.cityName,
  'containedInPlace': {
    '@type': 'State',
    'name': 'Ohio'
  }
});
```

This disambiguates Dublin (OH vs Ireland vs CA), Columbus (OH vs GA), Delaware (OH vs DE state), and Powell (OH vs others).

### Anti-Patterns to Avoid

- **Schema data in page components:** Do NOT define areaServed arrays in each of the 13 page files. All schema data comes from locations.ts via SchemaMarkup.
- **Same @id across pages:** Each location page MUST have a unique `@id`.
- **Non-page cities in areaServed:** Only the 13 cities with dedicated pages appear. The 10+ extra cities (Canal Winchester, Lancaster, etc.) must be removed.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON-LD generation | Schema template library | Hand-built objects in SchemaMarkup.tsx | Only 3 schema types needed (RoofingContractor, BreadcrumbList, WebPage). The existing hand-built approach is correct and simple. |
| Schema validation | Build-time validator | Google Rich Results Test (manual) | No npm package needed for 13 pages. Manual validation after changes is sufficient. |

## Common Pitfalls

### Pitfall 1: Hub Page SchemaMarkup Currently Broken

**What goes wrong:** The hub page (Locations.tsx line 96-101) passes `serviceName`, `serviceDescription`, and `areaServed` as props -- but these DO NOT EXIST on SchemaMarkup's interface. TypeScript may not catch this if the component uses `any` internally. The result is the hub renders with `type="service"` but no `service` object, so `generateServiceSchema()` returns null and the hub gets no business schema at all.
**How to avoid:** When fixing the hub schema, replace the entire SchemaMarkup invocation with proper props: `type="hub"`, `pageTitle`, `pageDescription`, `pageUrl`.

### Pitfall 2: Geo Coordinate Inconsistency (SCHEMA-07)

**What goes wrong:** Two files define different coordinates for the business:
- `SchemaMarkup.tsx` BUSINESS_INFO: lat 39.9612, lng -83.1565
- `schemas.ts` localBusinessSchema: lat 39.9637153, lng -83.1477371

**How to avoid:** Verify correct coordinates for 615 Hilliard Rome Rd, Columbus, OH 43228. Use Google Maps to get the precise lat/lng (5+ decimal places per Google recommendation). Update both files to match, or consolidate to one source of truth.
**Recommendation:** The schemas.ts values (39.9637153, -83.1477371) appear more precise (7 decimal places vs 4). Verify against Google Maps and use the more precise values.

### Pitfall 3: Breadcrumb Parent Path Bug (SCHEMA-06)

**What goes wrong:** In SchemaMarkup.tsx lines 197-209, when `type === 'location'`, the breadcrumb position 2 uses:
```typescript
item: `${BUSINESS_INFO.url}/services`  // BUG: should be /locations
```
**How to avoid:** Change to `${BUSINESS_INFO.url}/locations` and update the name from "Service Areas" to "Service Areas" (name is fine, URL is wrong).

### Pitfall 4: Breaking Existing Schema During Refactor

**What goes wrong:** Changing SchemaMarkup.tsx could break schema on non-location pages (home, service pages) that also use it.
**How to avoid:** The refactor must be additive -- add new props and logic branches without removing existing functionality. The `type === 'home'` and `type === 'service'` paths must continue working unchanged. Test representative pages from each type after changes.

### Pitfall 5: schemas.ts Dual Source of Truth

**What goes wrong:** `src/seo/schemas.ts` defines a `localBusinessSchema` object that duplicates information from `SchemaMarkup.tsx`'s `BUSINESS_INFO`. Changes to one file may not propagate to the other.
**How to avoid:** Check if schemas.ts is actually consumed anywhere. If it is only used for reference or by components that should use SchemaMarkup instead, consider deprecating it or having it import from a shared constant. At minimum, ensure geo coordinates are reconciled.

## Code Examples

### Example 1: Hub Page SchemaMarkup Fix

```typescript
// In Locations.tsx -- replace the broken SchemaMarkup call:
<SchemaMarkup
  type="hub"                    // NEW type for hub-specific logic
  pageTitle="Areas We Serve in Central Ohio | DTE Roofing Service Areas"
  pageDescription="DTE Roofing serves 13 Central Ohio communities..."
  pageUrl="https://www.dteroofingllc.com/locations"
/>

// In SchemaMarkup.tsx -- hub generates RoofingContractor with all 13 cities:
if (type === 'hub') {
  schema['@id'] = `${BUSINESS_INFO.url}/locations#business`;
  schema.areaServed = LOCATIONS.map(cityToAreaServed);
}
```

### Example 2: Location Subpage SchemaMarkup Usage

```typescript
// In Columbus.tsx:
<SchemaMarkup
  type="location"
  locationSlug="columbus"       // NEW prop
  locationName="Columbus"
  pageTitle="Roofers in Columbus, OH | DTE Roofing"
  pageDescription="..."
  pageUrl="https://www.dteroofingllc.com/locations/columbus"
/>

// SchemaMarkup internally:
// @id = "https://www.dteroofingllc.com/locations/columbus#business"
// areaServed = [Columbus, Hilliard, Dublin, Upper Arlington, Westerville, Gahanna, Reynoldsburg, Grove City, Worthington]
```

### Example 3: Breadcrumb Schema Fix

```typescript
// Current (BUGGY):
} else if (type === 'location' && locationName) {
  breadcrumbItems.push({
    '@type': 'ListItem',
    position: 2,
    name: 'Service Areas',
    item: `${BUSINESS_INFO.url}/services`    // WRONG
  });

// Fixed:
} else if ((type === 'location' || type === 'hub') && locationName) {
  breadcrumbItems.push({
    '@type': 'ListItem',
    position: 2,
    name: 'Service Areas',
    item: `${BUSINESS_INFO.url}/locations`   // CORRECT
  });
```

## Current State Inventory

### Files That Need Modification

| File | Change Type | Scope |
|------|------------|-------|
| `src/data/locations.ts` | NEW FILE | Create with all 13 locations, neighbor mapping, helper functions |
| `src/components/SchemaMarkup.tsx` | MODIFY | Add locationSlug prop, hub type, per-page areaServed, fix breadcrumb, fix @id, reconcile geo |
| `src/pages/Locations.tsx` | MODIFY | Fix H1, meta title, SchemaMarkup props |
| `src/pages/locations/Columbus.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/Hilliard.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/Dublin.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/NewAlbany.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/UpperArlington.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/Westerville.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/Gahanna.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/Reynoldsburg.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/GroveCity.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/Pickerington.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/Worthington.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/Delaware.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/pages/locations/Powell.tsx` | MODIFY | Add locationSlug prop to SchemaMarkup |
| `src/seo/schemas.ts` | MODIFY | Reconcile geo coordinates with SchemaMarkup.tsx |

### Non-Page Cities to Remove from areaServed (10 cities)

These currently appear in BUSINESS_INFO.areaServed but have no dedicated pages:
1. Canal Winchester
2. Lancaster
3. Newark
4. Marysville
5. Marion
6. Circleville
7. Chillicothe
8. Springfield
9. London
10. West Jefferson
11. Plain City

(11 cities total, not 10 as originally estimated in PROJECT.md)

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Hardcoded areaServed in SchemaMarkup | Centralized data file + per-page derivation | Single source of truth, DRY |
| Same @id on all pages | Unique @id per page URL | Google treats each page as distinct entity |
| 23-city generic areaServed | Page-specific (primary + neighbors) | Stronger local relevance signals |
| No hub page schema | RoofingContractor with all 13 cities | Hub page eligible for rich results |

## Open Questions

1. **Correct geo coordinates for 615 Hilliard Rome Rd**
   - What we know: Two different values exist in the codebase (see Pitfall 2)
   - What's unclear: Which is correct
   - Recommendation: Verify via Google Maps during implementation. Use 5+ decimal precision.

2. **schemas.ts usage**
   - What we know: It exports `localBusinessSchema` with different data than SchemaMarkup.tsx's BUSINESS_INFO
   - What's unclear: Whether any component imports from schemas.ts for active use
   - Recommendation: Grep for imports during implementation. If unused, consider deprecating.

3. **sameAs consolidation**
   - What we know: SchemaMarkup.tsx has Google Maps. schemas.ts has Facebook and Instagram.
   - Recommendation: Consolidate all social URLs into SchemaMarkup.tsx during this phase (low effort, high correctness value).

## Sources

### Primary (HIGH confidence)
- Codebase inspection: `src/components/SchemaMarkup.tsx` -- verified current bugs (same @id, 23-city areaServed, breadcrumb /services bug, broken hub props)
- Codebase inspection: `src/pages/Locations.tsx` -- verified hub H1 cannibalization and broken schema props
- Codebase inspection: `src/seo/schemas.ts` -- verified geo coordinate inconsistency
- PROJECT.md -- neighbor mapping verified against 13 city list

### Secondary (MEDIUM confidence)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) -- required properties
- [Google: Generate structured data with JavaScript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript) -- client-side JSON-LD is supported
- [Google: Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) -- breadcrumb format
- [schema.org/RoofingContractor](https://schema.org/RoofingContractor) -- type hierarchy
- [schema.org/areaServed](https://schema.org/areaServed) -- property definition

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - no new dependencies, existing codebase verified
- Architecture: HIGH - centralized data pattern is standard DRY practice, verified against codebase
- Pitfalls: HIGH - all bugs verified by direct codebase inspection
- Schema format: HIGH for structure, MEDIUM for areaServed scoping strategy (industry best practice, not Google-mandated)

**Research date:** 2026-03-21
**Valid until:** 2026-04-21 (stable domain, schema.org types rarely change)
