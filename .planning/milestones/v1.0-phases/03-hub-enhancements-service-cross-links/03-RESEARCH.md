# Phase 3: Hub Enhancements & Service Cross-Links - Research

**Researched:** 2026-03-23
**Domain:** Frontend React components, SEO internal linking, service area visualization
**Confidence:** HIGH

## Summary

Phase 3 has two deliverables: (1) a service area map on the /locations hub page, and (2) contextual location links on every service page. Both requirements are purely frontend work with no external dependencies.

The service area map (HUB-03) should be an inline SVG component showing the 13 Central Ohio cities. This is the lightest option that satisfies the constraint of no new heavy dependencies. A Google Maps embed is an alternative but introduces third-party script loading and API key management.

For service-to-location cross-links (LINK-04), most service pages already contain 1-3 contextual links to location pages in their opening paragraphs. However, only RoofRepair.tsx uses the ServicePageTemplate which includes a hardcoded "We Serve These Areas" section (5 cities). The 11 custom-layout service pages lack this section entirely. The work is: audit each page's existing links, add missing contextual links where needed, and ensure all 12 service pages have at least 2-3 location links.

**Primary recommendation:** Create an SVG-based ServiceAreaMap component for the hub page, audit and supplement existing location links on service pages, and ensure all 13 cities get cross-link coverage across the service pages.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HUB-03 | Service area map visible on /locations hub page (Google Maps embed, SVG, or static image) | SVG component recommended -- lightweight, no dependencies, matches Tailwind design system, interactive hover possible with CSS only |
| LINK-04 | Service pages (/services/*) link to relevant location pages where contextually natural (2-3 links per service page) | Most pages already have 1-3 inline links; audit needed to identify gaps and add missing links |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- Do NOT rewrite or modify existing page content (paragraphs, testimonials, FAQs, service descriptions)
- Do NOT change any URLs or slugs
- Do NOT change business name, address, phone, or email anywhere
- All new elements must match existing Tailwind design (charcoal/primary-700 color scheme)
- Use existing /public/images/ assets only
- No new heavy dependencies -- prefer CSS/lightweight JS solutions
- Complete each phase fully, verify, and get user approval before starting next phase

## Architecture Patterns

### Current Codebase Structure (Relevant Files)

```
src/
  pages/
    Locations.tsx              # Hub page -- map goes here
    services/
      RoofRepair.tsx           # Uses ServicePageTemplate (has "We Serve These Areas")
      RoofReplacement.tsx      # Custom layout (no serve-areas section)
      RoofInstallation.tsx     # Custom layout
      RoofInspection.tsx       # Custom layout
      RoofMaintenance.tsx      # Custom layout
      PreventativeMaintenance.tsx # Custom layout
      EmergencyServices.tsx    # Custom layout
      StormDamage.tsx          # Custom layout
      CommercialRoofing.tsx    # Custom layout
      Gutters.tsx              # Custom layout
      GutterServices.tsx       # Custom layout
      Siding.tsx               # Custom layout
  components/
    ServicePageTemplate.tsx    # Template with hardcoded 5-city "We Serve These Areas"
  data/
    locations.ts               # LOCATIONS array with all 13 cities, slugs, neighbors
```

### Service Page Types

There are two distinct service page patterns:

1. **ServicePageTemplate pages** (1 page: RoofRepair.tsx) -- Uses the shared template component which includes a "We Serve These Areas" section hardcoded to 5 cities (Hilliard, Dublin, Columbus, Westerville, Powell). The `problemPromise` prop already contains inline `<Link>` components to Dublin, Hilliard, and Columbus.

2. **Custom layout pages** (11 pages) -- Each has its own JSX structure. Most already have inline contextual location links in their opening paragraphs. None have a dedicated "We Serve These Areas" section.

### Existing Location Link Audit

Current inline location links per service page (counted from content):

| Service Page | Inline Links | Cities Linked | Has Serve-Areas Section |
|--------------|-------------|---------------|------------------------|
| RoofRepair.tsx | 4 (2 in content + 2 template) | Dublin, Hilliard, Columbus + template 5 | Yes (template) |
| RoofReplacement.tsx | 12+ | Columbus, Hilliard, Dublin, Grove City, many more | No |
| RoofInstallation.tsx | 1 | Opening paragraph link | No |
| RoofInspection.tsx | 1 | Opening paragraph link | No |
| RoofMaintenance.tsx | 3 | Westerville, Powell, Gahanna | No |
| PreventativeMaintenance.tsx | 1 | Opening paragraph link | No |
| EmergencyServices.tsx | 3 | Pickerington, Reynoldsburg, Upper Arlington | No |
| StormDamage.tsx | 4 | Columbus, Hilliard, Dublin, Grove City | No |
| CommercialRoofing.tsx | 3 | Columbus, Hilliard, Grove City | No |
| Gutters.tsx | 3 | Columbus, Hilliard, Dublin | No |
| GutterServices.tsx | 1 | Opening paragraph link | No |
| Siding.tsx | 3 | Columbus, Hilliard, Dublin | No |

**Key finding:** Pages with only 1 link typically have it clustered in the opening "Serving [cities]" paragraph. The pattern is `<Link to="/locations/{slug}" className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2">{anchor text}</Link>`.

### Inline Link Style Pattern (Existing)

All existing contextual location links use this exact styling:

```tsx
<Link
  to="/locations/{slug}"
  className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2"
>
  {anchor text}
</Link>
```

This pattern MUST be maintained for consistency.

### Hub Page Structure

The /locations hub page (Locations.tsx) has 5 sections:
1. Hero section (charcoal gradient, H1, CTA)
2. City grid (13 location cards in 3-column grid)
3. "Local Expertise" stats section
4. "Understanding Central Ohio's Roofing Environment" (4 info cards)
5. Final CTA

The service area map should be placed between sections 1 and 2 (after hero, before the city grid) or within section 3 (the "Local Expertise" area). Placing it between hero and grid gives it immediate visibility and visual context before users browse the city cards.

## Standard Stack

No new libraries needed. This phase uses only existing project dependencies:

| Library | Version | Purpose | Already Installed |
|---------|---------|---------|-------------------|
| React | 18.3.1 | Component framework | Yes |
| React Router DOM | 7.9.4 | `<Link>` components for cross-links | Yes |
| Tailwind CSS | 3.4.1 | Styling for map component | Yes |
| lucide-react | 0.344.0 | Icons (MapPin already used on hub page) | Yes |

**No new dependencies required.**

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Interactive Google Map | Custom Google Maps API integration | Static SVG or simple iframe embed | No API key management, no JS dependency, faster load, better for SEO |
| City coordinate math | Manual pixel positioning for SVG | Approximate relative positions from real geo coordinates | The 13 cities span a small area (~30 miles); rough proportional placement is sufficient |

## Common Pitfalls

### Pitfall 1: Content Modification Violation
**What goes wrong:** Adding location links in a way that modifies existing approved content text
**Why it happens:** The LINK-04 requirement says "within existing content sections" which could be misread as editing content
**How to avoid:** Only add NEW links where city names are already mentioned as plain text, or add a new "Service Areas" section at the bottom of pages. Never change existing paragraph wording.
**Warning signs:** Diff shows changed text strings in `<p>` tags

### Pitfall 2: Inconsistent Link Styling
**What goes wrong:** New location links use different className than existing ones
**Why it happens:** Copy-paste from different component
**How to avoid:** Use the exact pattern: `className="text-primary-700 hover:text-primary-800 font-semibold underline decoration-2 underline-offset-2"`
**Warning signs:** Visual inconsistency between old and new links

### Pitfall 3: SVG Map Accessibility
**What goes wrong:** SVG map has no alt text, no aria labels, screen readers skip it
**Why it happens:** SVG accessibility is often overlooked
**How to avoid:** Add `role="img"`, `aria-label`, and `<title>` element inside SVG. Optionally include text labels for city names.
**Warning signs:** No ARIA attributes on SVG element

### Pitfall 4: Same Cities Linked Everywhere
**What goes wrong:** Every service page links to Columbus, Hilliard, Dublin -- ignoring other 10 cities
**Why it happens:** These are the most prominent cities and easiest to fit contextually
**How to avoid:** Create a deliberate distribution plan ensuring all 13 cities get cross-link coverage across the 12 service pages. Each city should appear on at least 2 service pages.
**Warning signs:** Some cities (Delaware, Powell, Worthington, New Albany) have zero inbound links from service pages

### Pitfall 5: Heavy SVG File
**What goes wrong:** SVG map is overly detailed, large file size, slow rendering
**Why it happens:** Using actual county/city boundary GeoJSON data converted to SVG
**How to avoid:** Use simplified shapes -- circles/dots for city positions with labels, a simple outline shape for the service area boundary. The map is illustrative, not cartographic.
**Warning signs:** SVG file over 10KB, complex path data

## Code Examples

### SVG Map Component Pattern

A lightweight service area map component using positioned city dots:

```tsx
// src/components/ServiceAreaMap.tsx
import { Link } from 'react-router-dom';
import { LOCATIONS } from '../data/locations';

// Approximate relative positions for 13 Central Ohio cities
// Based on real geographic positions, normalized to viewBox
const CITY_POSITIONS: Record<string, { x: number; y: number }> = {
  'delaware': { x: 50, y: 10 },
  'powell': { x: 45, y: 25 },
  'westerville': { x: 60, y: 30 },
  'dublin': { x: 30, y: 35 },
  'worthington': { x: 50, y: 35 },
  'new-albany': { x: 75, y: 40 },
  'upper-arlington': { x: 35, y: 45 },
  'gahanna': { x: 65, y: 45 },
  'columbus': { x: 50, y: 50 },
  'hilliard': { x: 25, y: 50 },
  'reynoldsburg': { x: 70, y: 55 },
  'grove-city': { x: 35, y: 65 },
  'pickerington': { x: 70, y: 65 },
};

export default function ServiceAreaMap(): JSX.Element {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
      <svg
        viewBox="0 0 100 80"
        role="img"
        aria-label="Map of DTE Roofing service areas across 13 Central Ohio cities"
        className="w-full max-w-2xl mx-auto"
      >
        <title>DTE Roofing Service Area Map</title>
        {/* Service area boundary (simplified ellipse) */}
        <ellipse cx="50" cy="40" rx="35" ry="30"
          className="fill-primary-50 stroke-primary-200" strokeWidth="0.5" />
        {/* City dots and labels */}
        {LOCATIONS.map((loc) => {
          const pos = CITY_POSITIONS[loc.slug];
          if (!pos) return null;
          return (
            <Link key={loc.slug} to={`/locations/${loc.slug}`}>
              <circle cx={pos.x} cy={pos.y} r="1.5"
                className="fill-primary-700 hover:fill-primary-500 cursor-pointer transition-colors" />
              <text x={pos.x} y={pos.y + 4} textAnchor="middle"
                className="fill-charcoal-700 text-[2.5px] font-semibold">
                {loc.cityName}
              </text>
            </Link>
          );
        })}
      </svg>
    </div>
  );
}
```

### Location Link Distribution Strategy

To ensure all 13 cities get cross-link coverage:

```
Service Page              -> Cities to Link (2-3 per page)
-----------------------------------------------------------
RoofRepair               -> Dublin, Hilliard (already has), Columbus (already has)
RoofReplacement          -> Columbus, Hilliard, Dublin, Grove City (already has many)
RoofInstallation         -> New Albany, Westerville, Worthington
RoofInspection           -> Delaware, Powell, Upper Arlington
RoofMaintenance          -> Westerville, Powell, Gahanna (already has)
PreventativeMaintenance  -> Worthington, Dublin, Reynoldsburg
EmergencyServices        -> Pickerington, Reynoldsburg, Upper Arlington (already has)
StormDamage              -> Columbus, Hilliard, Dublin, Grove City (already has)
CommercialRoofing        -> Columbus, Hilliard, Grove City (already has)
Gutters                  -> Columbus, Hilliard, Dublin (already has)
GutterServices           -> Westerville, New Albany, Gahanna
Siding                   -> Columbus, Hilliard, Dublin (already has)
```

This ensures every city appears on at least 2-3 service pages.

### ServicePageTemplate "We Serve These Areas" Section

The template currently hardcodes 5 cities:

```tsx
// Current (hardcoded in ServicePageTemplate.tsx lines 258-305)
<section>
  <h2>We Serve These Areas</h2>
  <div className="grid md:grid-cols-3 gap-4">
    {/* Hilliard, Dublin, Columbus, Westerville, Powell -- hardcoded */}
  </div>
</section>
```

This should be refactored to use the LOCATIONS array for dynamic rendering, but since only RoofRepair uses this template, the impact is limited. Alternatively, leave it as-is and focus on inline contextual links.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Google Maps embed | SVG or static image maps | 2024+ | Better Core Web Vitals, no third-party JS, no API costs |
| Manual link insertion | Data-driven link components | - | Consistency, maintainability |

## Open Questions

1. **SVG Map Visual Fidelity**
   - What we know: Simple dot-and-label SVG is lightweight and accessible
   - What's unclear: User may want a more visually impressive map (county outlines, road network hints)
   - Recommendation: Start with the simple dot map. It can be enhanced later. The requirement says "Google Maps embed, SVG, or static image" -- all are acceptable. Simple SVG is the safest choice given the "no heavy dependencies" constraint.

2. **Pages with Sufficient Links Already**
   - What we know: RoofReplacement already has 12+ location links; StormDamage, CommercialRoofing, Gutters, Siding each have 3
   - What's unclear: Whether the requirement "2-3 links per service page" means those pages are already done
   - Recommendation: Pages with 2+ contextual location links in their content already satisfy LINK-04. Focus effort on pages with 0-1 links (RoofInstallation, RoofInspection, PreventativeMaintenance, GutterServices).

3. **Content Modification Boundary**
   - What we know: CLAUDE.md says "Do NOT rewrite or modify existing page content"
   - What's unclear: Whether adding a new `<Link>` wrapper around an existing plain-text city name counts as "modifying content"
   - Recommendation: Converting a plain text city name to a `<Link>` (same visible text, just now clickable) is not a content modification -- it's a structural enhancement. This is the safest approach. Adding completely new sentences would violate the constraint.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new dependencies, all existing tools
- Architecture: HIGH - Codebase fully examined, patterns well understood
- Pitfalls: HIGH - Content constraint is the main risk, well-documented
- Map approach: MEDIUM - SVG positioning will need manual coordinate tuning

**Research date:** 2026-03-23
**Valid until:** 2026-04-23 (stable -- no moving parts)

## Sources

### Primary (HIGH confidence)
- Direct codebase examination of all 12 service pages, Locations.tsx, ServicePageTemplate.tsx, locations.ts
- Grep audit of all existing `/locations/` links across service pages
