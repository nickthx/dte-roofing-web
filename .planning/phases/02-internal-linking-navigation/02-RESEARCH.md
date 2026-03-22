# Phase 2: Internal Linking & Navigation - Research

**Researched:** 2026-03-21
**Domain:** React component development, internal SEO linking, footer navigation
**Confidence:** HIGH

## Summary

Phase 2 adds three navigation/linking elements to the DTE Roofing site: (1) a breadcrumb or back-link on every location subpage pointing to /locations, (2) a "Nearby Areas We Serve" cross-link section on every location subpage using the neighbor mapping already defined in `src/data/locations.ts`, and (3) expanding the footer's "Areas We Serve" column from 5 hardcoded cities to all 13.

All data infrastructure is already in place from Phase 1. The `LOCATIONS` array in `src/data/locations.ts` has each city's slug, name, and neighbor list. The work is purely component creation and insertion -- no data architecture, schema changes, or content rewrites are needed.

**Primary recommendation:** Create two new reusable components (`LocationBreadcrumb` and `NearbyAreas`), insert them into each of the 13 location page files at the correct positions, and update `Footer.tsx` to import and iterate over the `LOCATIONS` array instead of hardcoding 5 cities.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LINK-01 | All 13 subpages have visible breadcrumb or "All Service Areas" link below hero, above first content section | Breadcrumb component placed between hero section and main content section; uses React Router `Link` to /locations |
| LINK-02 | All 13 subpages have "Nearby Areas We Serve" section with 3-5 links to geographically adjacent location pages | Component reads neighbors from `locations.ts` via `getLocationBySlug()`; renders linked cards to neighbor pages |
| LINK-03 | Footer lists all 13 location pages with "All Service Areas" link to /locations, visible on every page | Footer.tsx imports `LOCATIONS` array and maps over it instead of hardcoding 5 cities |
</phase_requirements>

## Standard Stack

### Core (already installed -- no new dependencies)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react | 18.3.1 | UI framework | Already in project |
| react-router-dom | 7.9.4 | `Link` component for internal navigation | Already in project |
| lucide-react | 0.344.0 | Icons (ChevronRight, ArrowLeft, MapPin) | Already in project |
| tailwindcss | 3.4.1 | Styling all new elements | Already in project |

### Supporting
No new libraries needed. All work uses existing dependencies.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom breadcrumb component | react-breadcrumbs library | Overkill for a single back-link; custom is 10 lines |
| Hardcoded neighbor lists per page | Already centralized in locations.ts | locations.ts is the single source of truth from Phase 1 |

**Installation:**
```bash
# No new packages needed
```

## Architecture Patterns

### Component Placement Strategy

Each location subpage follows the same structure:
```
<div className="min-h-screen bg-white">
  <SEO ... />
  <SchemaMarkup ... />
  <section> <!-- HERO: dark gradient bg, py-20 --> </section>
  <section> <!-- MAIN CONTENT: py-20 bg-white --> </section>
  <section> <!-- CTA: py-20 bg-gray-50 --> </section>
</div>
```

**LINK-01 insertion point:** Immediately after the hero `</section>` and before the main content `<section className="py-20 bg-white">`. A small breadcrumb bar with light background.

**LINK-02 insertion point:** Inside the main content section, as a new block before the final CTA section. Placed after the existing content (reviews, FAQ, maps) but before the bottom CTA.

### Pattern 1: Breadcrumb / Back-Link Component
**What:** A lightweight horizontal bar below the hero showing "All Service Areas > {City Name}" or a simple "< All Service Areas" back-link.
**When to use:** On all 13 location subpages.
**Example:**
```typescript
// src/components/LocationBreadcrumb.tsx
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface LocationBreadcrumbProps {
  cityName: string;
}

export default function LocationBreadcrumb({ cityName }: LocationBreadcrumbProps): JSX.Element {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
          <Link
            to="/locations"
            className="text-primary-700 hover:text-primary-800 font-medium transition-colors"
          >
            All Service Areas
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-charcoal-700 font-medium">{cityName}</span>
        </nav>
      </div>
    </div>
  );
}
```

### Pattern 2: Nearby Areas Component
**What:** A section with heading "Nearby Areas We Serve" and 3-5 linked cards to neighbor location pages.
**When to use:** On all 13 location subpages.
**Example:**
```typescript
// src/components/NearbyAreas.tsx
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { getLocationBySlug, LOCATIONS } from '../data/locations';
import type { LocationConfig } from '../data/locations';

interface NearbyAreasProps {
  locationSlug: string;
}

export default function NearbyAreas({ locationSlug }: NearbyAreasProps): JSX.Element | null {
  const location = getLocationBySlug(locationSlug);
  if (!location) return null;

  // Get neighbor configs, limit to 5 max
  const neighbors: LocationConfig[] = location.neighbors
    .slice(0, 5)
    .map((slug) => LOCATIONS.find((loc) => loc.slug === slug))
    .filter((loc): loc is LocationConfig => loc !== undefined);

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-charcoal-900 mb-8 text-center">
        Nearby Areas We Serve
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {neighbors.map((neighbor) => (
          <Link
            key={neighbor.slug}
            to={`/locations/${neighbor.slug}`}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-primary-700 hover:bg-primary-50 transition-all group text-center"
          >
            <MapPin className="w-6 h-6 text-primary-700 mx-auto mb-3" />
            <h3 className="font-bold text-charcoal-900 group-hover:text-primary-700 transition-colors">
              {neighbor.cityName}
            </h3>
            <span className="text-sm text-primary-700 mt-2 inline-flex items-center">
              View Services <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

### Pattern 3: Footer Update
**What:** Replace the hardcoded 5-city list with all 13 cities from the LOCATIONS array.
**When to use:** Single update to Footer.tsx.
**Key consideration:** The footer grid is currently `md:grid-cols-5` with 5 columns. The "Areas We Serve" column will grow from 6 items (5 cities + "All Service Areas") to 14 items (13 cities + "All Service Areas"). This may need the column to be split into two sub-columns or use smaller text to avoid an overly long footer column.
**Example approach:**
```typescript
// In Footer.tsx, replace hardcoded list with:
import { LOCATIONS } from '../data/locations';

// Inside the "Areas We Serve" div:
<ul className="space-y-1.5 text-gray-400 text-sm">
  {LOCATIONS.map((loc) => (
    <li key={loc.slug}>
      <Link to={`/locations/${loc.slug}`} className="hover:text-white transition-colors">
        {loc.cityName}
      </Link>
    </li>
  ))}
  <li className="pt-1">
    <Link to="/locations" className="hover:text-white transition-colors font-medium">
      All Service Areas &rarr;
    </Link>
  </li>
</ul>
```

### Anti-Patterns to Avoid
- **Duplicating neighbor data:** Do NOT hardcode neighbor lists in each page file. Always consume from `locations.ts`.
- **Breaking content constraint:** Do NOT modify existing paragraphs, testimonials, FAQs, or service descriptions. Only ADD new navigation elements.
- **Changing URLs:** Do NOT alter any slugs or route paths.
- **Adding heavy dependencies:** No breadcrumb libraries, no new icon packs. Use existing lucide-react and react-router-dom.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Neighbor resolution | Manual neighbor arrays per page | `getLocationBySlug()` from locations.ts | Already built in Phase 1, single source of truth |
| Internal links | `<a href>` tags | React Router `<Link to>` | SPA navigation, no full page reload |
| Icon rendering | Custom SVGs | lucide-react icons (MapPin, ChevronRight, ArrowRight) | Already in project, consistent styling |

## Common Pitfalls

### Pitfall 1: Breadcrumb Placement Breaks Page Layout
**What goes wrong:** Inserting the breadcrumb at the wrong nesting level disrupts the hero-to-content flow.
**Why it happens:** Each location page has a specific JSX structure with the hero as a sibling `<section>` to the content section.
**How to avoid:** Place breadcrumb component as a sibling element between the hero `</section>` and the content `<section>`, NOT inside either section.
**Warning signs:** Hero padding looks wrong, breadcrumb overlaps hero gradient, content section has unexpected gap.

### Pitfall 2: Footer Column Overflow with 13 Cities
**What goes wrong:** The footer "Areas We Serve" column becomes much taller than other columns, creating visual imbalance.
**Why it happens:** Going from 6 items to 14 items nearly triples column height.
**How to avoid:** Use two sub-columns within the footer area, reduce `space-y` from `space-y-2` to `space-y-1.5`, and/or use `text-sm` instead of default text size. Alternatively, split into a 2-column grid within the "Areas We Serve" section.
**Warning signs:** Footer looks lopsided on desktop, excessive scrolling on mobile.

### Pitfall 3: Missing Pages in Neighbor Links
**What goes wrong:** A neighbor slug in locations.ts does not match any existing page, producing a dead link.
**Why it happens:** Data entry error or removed page.
**How to avoid:** All 13 slugs in locations.ts already have matching pages (verified). The `getLocationBySlug` filter returns undefined for missing slugs, and the `.filter()` pattern safely excludes them.
**Warning signs:** Clicking a neighbor link shows a blank page or 404.

### Pitfall 4: Repeating Components Across 13 Files
**What goes wrong:** Copy-pasting component code into each location file instead of importing a reusable component.
**Why it happens:** Rushing to complete the task.
**How to avoid:** Create `LocationBreadcrumb` and `NearbyAreas` as separate component files. Each location page imports them and passes only `cityName`/`locationSlug` as props.
**Warning signs:** Duplicate code across 13 files, maintenance burden for any style change.

## Code Examples

### Location Page Integration Pattern
```typescript
// Example: How Columbus.tsx should look after integration
import LocationBreadcrumb from '../../components/LocationBreadcrumb';
import NearbyAreas from '../../components/NearbyAreas';

// ... existing imports ...

export default function Columbus() {
  // ... existing code ...
  return (
    <div className="min-h-screen bg-white">
      <SEO ... />
      <SchemaMarkup ... />

      {/* HERO SECTION - unchanged */}
      <section className="relative bg-gradient-to-br from-charcoal-900 ...">
        ...
      </section>

      {/* NEW: Breadcrumb below hero (LINK-01) */}
      <LocationBreadcrumb cityName="Columbus" />

      {/* MAIN CONTENT SECTION - structure unchanged */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* ... existing content blocks unchanged ... */}

          {/* NEW: Nearby Areas before final CTA (LINK-02) */}
          <NearbyAreas locationSlug="columbus" />

          {/* ... existing CTA block ... */}
        </div>
      </section>

      {/* BOTTOM CTA SECTION - unchanged */}
      <section className="py-20 bg-gray-50">...</section>
    </div>
  );
}
```

### Footer Cities from LOCATIONS Array
```typescript
// Footer.tsx - relevant section replacement
import { LOCATIONS } from '../data/locations';

// Replace the hardcoded "Areas We Serve" <ul> with:
<div>
  <h4 className="font-bold text-lg mb-4">Areas We Serve</h4>
  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-gray-400 text-sm">
    {LOCATIONS.map((loc) => (
      <Link
        key={loc.slug}
        to={`/locations/${loc.slug}`}
        className="hover:text-white transition-colors"
      >
        {loc.cityName}
      </Link>
    ))}
  </div>
  <Link
    to="/locations"
    className="text-gray-400 hover:text-white transition-colors text-sm font-medium mt-3 inline-block"
  >
    All Service Areas &rarr;
  </Link>
</div>
```

## Neighbor Mapping Reference

All neighbor data from `src/data/locations.ts` (verified):

| City | Neighbors (3-8) |
|------|-----------------|
| Columbus | hilliard, dublin, upper-arlington, westerville, gahanna, reynoldsburg, grove-city, worthington |
| Hilliard | columbus, dublin, upper-arlington, grove-city |
| Dublin | columbus, hilliard, powell, worthington, upper-arlington |
| New Albany | columbus, westerville, gahanna |
| Upper Arlington | columbus, hilliard, dublin, worthington, grove-city |
| Westerville | columbus, powell, gahanna, worthington, new-albany |
| Gahanna | columbus, westerville, new-albany, reynoldsburg |
| Reynoldsburg | columbus, gahanna, pickerington |
| Grove City | columbus, hilliard, pickerington |
| Pickerington | columbus, reynoldsburg, grove-city, gahanna |
| Worthington | columbus, dublin, powell, westerville, upper-arlington |
| Delaware | powell, westerville, worthington |
| Powell | dublin, westerville, delaware, worthington |

Note: Columbus has 8 neighbors. The component should `.slice(0, 5)` to cap at 5 for visual consistency, or display all if the grid handles it well. All other cities have 3-5 neighbors which is within the required range.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hardcoded footer with 5 cities | Dynamic footer from LOCATIONS array | This phase | All 13 cities visible site-wide |
| No cross-linking between location pages | Neighbor-based cross-links | This phase | SEO internal linking mesh established |
| No breadcrumb on location pages | Breadcrumb/back-link to hub | This phase | Clear navigation hierarchy for users and crawlers |

## Open Questions

1. **Breadcrumb style: full breadcrumb vs. back-link?**
   - What we know: The requirement says "breadcrumb or All Service Areas link." Both satisfy it.
   - Recommendation: Use a breadcrumb style ("All Service Areas > Columbus") because it establishes page hierarchy for both users and search engines. The breadcrumb JSON-LD schema is already in place from Phase 1 (SCHEMA-06).

2. **Columbus neighbor count (8) exceeds the 3-5 guideline**
   - What we know: Columbus is the hub city with the most geographic adjacency.
   - Recommendation: Show all 8 for Columbus or cap at 5. Since the requirement says "3-5 links," capping at 5 is safest. The first 5 in the array (hilliard, dublin, upper-arlington, westerville, gahanna) cover the most important neighbors.

3. **Footer layout with 13 cities**
   - What we know: Current footer uses `md:grid-cols-5` with 5 equal columns. The Areas column going from 6 to 14 items will be taller.
   - Recommendation: Use a 2-column sub-grid within the Areas We Serve section to keep vertical height manageable. This is purely visual and does not affect functionality.

## Sources

### Primary (HIGH confidence)
- `src/data/locations.ts` - Verified all 13 cities, slugs, and neighbor mappings
- `src/components/Footer.tsx` - Current footer structure with hardcoded 5 cities
- `src/pages/locations/Columbus.tsx` - Location page structure pattern (hero > content > CTA)
- `src/pages/locations/Hilliard.tsx` - Confirmed identical structure pattern
- `src/pages/locations/Delaware.tsx` - Confirmed identical structure pattern

### Secondary (MEDIUM confidence)
- Project CLAUDE.md - Constraints (no content changes, no URL changes, match existing Tailwind design)
- `.planning/REQUIREMENTS.md` - LINK-01, LINK-02, LINK-03 requirement definitions

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new dependencies, all existing libraries verified
- Architecture: HIGH - Inspected all 3 location page files, structure is identical across all 13
- Pitfalls: HIGH - Direct codebase inspection, no external research needed

**Research date:** 2026-03-21
**Valid until:** 2026-04-21 (stable -- no external dependencies or fast-moving APIs)
