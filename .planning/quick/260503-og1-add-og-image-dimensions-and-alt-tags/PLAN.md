---
slug: og1-add-og-image-dimensions-and-alt-tags
date: 2026-05-03
status: in-progress
---

# Add og:image dimension + alt meta tags

## Goal
Eliminate Facebook Sharing Debugger warnings by declaring `og:image:width`,
`og:image:height`, `og:image:type`, `og:image:alt`, and `twitter:image:alt`
on every prerendered page and in the static `index.html` shell.

Independent of the placeholder hero image replacement (separate task).

## Scope
- `src/components/SEO.tsx` — add tags to Helmet output, add `ogImageAlt` prop
- `index.html` — add tags to static fallback shell

## Out of scope
- Replacing `public/images/hero-roofing-professional.jpg` (placeholder content)
- Modifying `DEFAULT_OG_IMAGE` constant
- Changing the preload tag

## Default values
- width: `1200`
- height: `630`
- type: `image/jpeg`
- alt: `"DTE Roofing — professional roofing services in Central Ohio"`

## Verification
1. `npm run build` succeeds
2. `grep -E "og:image:(width|height|alt)" dist/index.html dist/locations/*/index.html`
   shows the new tags on prerendered pages
