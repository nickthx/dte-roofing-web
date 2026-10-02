---
phase: quick-261002-fqk
plan: 01
subsystem: seo/schema
tags: [json-ld, schema-org, local-seo, entity, verification]
requires:
  - src/seo/constants.ts (CANONICAL_DOMAIN)
  - src/data/locations.ts (LOCATIONS, getLocationBySlug, getAreaServedForLocation)
  - src/routes.config.mjs (PRERENDER_ROUTES)
provides:
  - Single RoofingContractor entity https://www.dteroofingllc.com/#business on every schema page
  - src/data/services.ts SERVICES SSOT (10 service pages)
  - scripts/verify-schema.mjs gate (npm run verify-schema) + committed pre-change baseline
affects:
  - All 36 prerendered pages that emit JSON-LD (JSON-LD only; titles, descriptions and bodies byte-identical)
tech-stack:
  added: []
  patterns:
    - Module-level business node built once (byte-identical across pages)
    - documentTitle shared const feeding both <SEO title> and WebPage name
    - Dependency-free dist/ JSON-LD gate with committed baseline
key-files:
  created:
    - scripts/verify-schema.mjs
    - scripts/schema-baseline.json
    - src/data/services.ts
    - .planning/quick/261002-fqk-schema-ssot/261002-fqk-heads-before.json
  modified:
    - package.json
    - src/components/SchemaMarkup.tsx
    - src/pages/{Home,About,Locations,Contact,Reviews,FAQ,BlogPost}.tsx
    - src/pages/locations/*.tsx (13)
    - src/pages/services/*.tsx (10)
    - .planning/PROJECT.md
decisions:
  - One business entity (SITE_URL/#business) on every page; per-page business @ids reversed (PROJECT.md updated)
  - aggregateRating and copied reviews removed from the business node (self-serving review markup)
  - Pre-change schema baseline committed at scripts/schema-baseline.json (D2) instead of a temp file
metrics:
  duration: ~12 min (2026-10-02T15:35:49Z to 15:47Z)
  completed: 2026-10-02
  tasks: 3
  commits: 7
---

# Quick 261002-fqk Plan 01: Schema single source of truth (Week 2A) Summary

All JSON-LD now describes ONE RoofingContractor (`https://www.dteroofingllc.com/#business`). The node is byte-identical on all 36 schema pages and carries no review/rating markup, 7 `sameAs` profiles, founders, the GAF credential and BBB membership. The WebPage/Service/BlogPosting nodes are enriched and every reference resolves on its own page. A dependency-free `npm run verify-schema` gate checked all of this against a committed pre-change baseline.

## (1) Final gate: four commands, run separately

| Command | Exit | Result | vs D5 baseline |
|---------|------|--------|----------------|
| `npm run build` | **0** | 41 routes + `dist/404.html` prerendered | n/a (must be 0) |
| `npm run verify-schema` | **0** | `checked 41, pass 36, fail 0, skip 5` | n/a (must be 0) |
| `npm run typecheck` | 2 | 12 `error TS` lines | **Identical to the 12 D5 errors** after normalising `(line,col)`: `diff` of the sorted normalised lists is empty. Only line numbers shifted (Reviews 58→60, RoofRepair 68→71) because consts were added above them. Zero errors in SchemaMarkup.tsx / services.ts. |
| `npm run lint` | 1 | `✖ 6 problems (5 errors, 1 warning)` | The D5 `SchemaMarkup.tsx no-explicit-any` error is **gone**. The remaining 6 are exactly the other D5 entries (ServicePageTemplate `_serviceName`, useLeadTracking rules-of-hooks, About `Users`, Gallery exhaustive-deps warning, Reviews `fiveStarPercentage` (now 60:9), EmergencyServices `ArrowRight`). Zero problems in SchemaMarkup.tsx, services.ts, verify-schema.mjs. |

typecheck and lint were **already red on db754d0** (D5). This task introduced **zero new problems** and removed one (the `any` in SchemaMarkup.tsx). The unrelated pre-existing errors were deliberately left alone, including those in files this task touched (About, Reviews, EmergencyServices, RoofRepair).

Additional dist sanity checks (counted with `grep -o | wc -l`, never `grep -c`):
- `aggregateRating` in dist HTML: **0**. `"review":` keys: **0**. `"offers"`: **0**.
- `/locations/<x>#business` or `/locations#business` ids: **0**. Every `"@id":"…#business"` in dist (230 occurrences) is `https://www.dteroofingllc.com/#business`.
- Distinct RoofingContractor JSON strings across schema pages: **1** (byte-identical node).
- `"priceRange":"$$"` appears 36 times (once per schema page, business node only).
- `grep -rn '#business' src` returns exactly 1 line: `src/components/SchemaMarkup.tsx:47` (`BUSINESS_ID`).
- `git log --oneline -- scripts/schema-baseline.json` shows exactly one commit (`08e9a62`). `--snapshot` was run once, on the untouched db754d0 build.

## (2) verify-schema table (final run, verbatim)

```
route                                              | nodes | status | details
/                                                  |     2 | PASS   | 
/about                                             |     3 | PASS   | note(g): new schema page
/services                                          |     0 | SKIP   | skip (no JSON-LD)
/services/roof-installation                        |     5 | PASS   | 
/services/roof-repair                              |     5 | PASS   | 
/services/roof-replacement                         |     5 | PASS   | 
/services/roof-inspection                          |     5 | PASS   | 
/services/gutters                                  |     5 | PASS   | 
/services/emergency-services                       |     5 | PASS   | 
/services/storm-damage                             |     5 | PASS   | 
/services/preventative-maintenance                 |     5 | PASS   | 
/services/siding                                   |     5 | PASS   | 
/services/commercial-roofing                       |     5 | PASS   | 
/gallery                                           |     0 | SKIP   | skip (no JSON-LD)
/reviews                                           |     3 | PASS   | 
/blog                                              |     0 | SKIP   | skip (no JSON-LD)
/blog/signs-you-need-a-new-roof                    |     5 | PASS   | 
/blog/roof-replacement-cost-columbus-ohio          |     5 | PASS   | 
/blog/asphalt-vs-metal-roofing-ohio                |     5 | PASS   | 
/blog/hail-damage-roof-insurance-claim-ohio        |     5 | PASS   | 
/blog/how-long-does-a-roof-last-ohio               |     5 | PASS   | 
/blog/roof-repair-vs-replacement                   |     5 | PASS   | 
/blog/what-to-look-for-columbus-roofing-contractor |     5 | PASS   | 
/faq                                               |     4 | PASS   | 
/financing                                         |     0 | SKIP   | skip (no JSON-LD)
/contact                                           |     3 | PASS   | 
/locations                                         |     3 | PASS   | 
/locations/columbus                                |    10 | PASS   | 
/locations/hilliard                                |    11 | PASS   | 
/locations/dublin                                  |    11 | PASS   | 
/locations/new-albany                              |    11 | PASS   | 
/locations/upper-arlington                         |    11 | PASS   | 
/locations/westerville                             |    11 | PASS   | 
/locations/gahanna                                 |    11 | PASS   | 
/locations/reynoldsburg                            |    11 | PASS   | 
/locations/grove-city                              |    11 | PASS   | 
/locations/pickerington                            |    11 | PASS   | 
/locations/worthington                             |    11 | PASS   | 
/locations/delaware                                |    11 | PASS   | 
/locations/powell                                  |    11 | PASS   | 
/get-a-quote-consultation                          |     0 | SKIP   | skip (no JSON-LD)
checked 41, pass 36, fail 0, skip 5
```

The gate was also proven red on the pre-change build (Task 1 Step 5): `checked 41, pass 0, fail 36, skip 5`, exit 1. It showed `a:` per-page/dangling `#business` failures on `/locations/hilliard`, `c: aggregateRating key present` on `/`, `none: no JSON-LD blocks` on `/about`, `b: unresolved reference` on /faq and the blog posts, and SKIP on the 5 D4 routes.

## (3) Heads comparison

```
heads: 42 compared, title diffs 0, description diffs 0, body diffs 0
```

The 41 PRERENDER_ROUTES plus `dist/404.html` were captured from the db754d0 build (`261002-fqk-heads-before.json`) and recomputed after the final build with byte-identical rules: the same scratchpad script run via `node --input-type=module -e`, with the raw first `<title>`, the raw `content` of the first `name="description"` meta, and the sha256 of `<body … </body>`.

## (4) `git diff --stat`

Committed on `feat/schema-ssot` (`git diff --stat origin/main...HEAD`, origin/main = db754d0):

```
 .planning/PROJECT.md                               |   4 +-
 .../261002-fqk-heads-before.json                   | 212 ++++++++++++
 package.json                                       |   3 +-
 scripts/schema-baseline.json                       | 210 ++++++++++++
 scripts/verify-schema.mjs                          | 357 +++++++++++++++++++++
 src/components/SchemaMarkup.tsx                    | 339 ++++++++++---------
 src/data/services.ts                               |  18 ++
 src/pages/About.tsx                                |  16 +-
 src/pages/BlogPost.tsx                             |   4 +-
 src/pages/Contact.tsx                              |   6 +-
 src/pages/FAQ.tsx                                  |   5 +-
 src/pages/Home.tsx                                 |   5 +-
 src/pages/Locations.tsx                            |   6 +-
 src/pages/Reviews.tsx                              |   5 +-
 src/pages/locations/Columbus.tsx                   |   5 +-
 src/pages/locations/Delaware.tsx                   |   5 +-
 src/pages/locations/Dublin.tsx                     |   5 +-
 src/pages/locations/Gahanna.tsx                    |   5 +-
 src/pages/locations/GroveCity.tsx                  |   5 +-
 src/pages/locations/Hilliard.tsx                   |   5 +-
 src/pages/locations/NewAlbany.tsx                  |   5 +-
 src/pages/locations/Pickerington.tsx               |   5 +-
 src/pages/locations/Powell.tsx                     |   5 +-
 src/pages/locations/Reynoldsburg.tsx               |   5 +-
 src/pages/locations/UpperArlington.tsx             |   5 +-
 src/pages/locations/Westerville.tsx                |   5 +-
 src/pages/locations/Worthington.tsx                |   5 +-
 src/pages/services/CommercialRoofing.tsx           |   5 +-
 src/pages/services/EmergencyServices.tsx           |   5 +-
 src/pages/services/Gutters.tsx                     |   5 +-
 src/pages/services/PreventativeMaintenance.tsx     |   5 +-
 src/pages/services/RoofInspection.tsx              |   5 +-
 src/pages/services/RoofInstallation.tsx            |   5 +-
 src/pages/services/RoofRepair.tsx                  |   5 +-
 src/pages/services/RoofReplacement.tsx             |   5 +-
 src/pages/services/Siding.tsx                      |   5 +-
 src/pages/services/StormDamage.tsx                 |   5 +-
 37 files changed, 1114 insertions(+), 191 deletions(-)
```

Working tree vs origin/main (`git diff --stat origin/main`):

```
 .claude/settings.local.json                        |  10 +-
 .planning/PROJECT.md                               |   4 +-
 .../261002-fqk-heads-before.json                   | 212 ++++++++++++
 package.json                                       |   3 +-
 scripts/schema-baseline.json                       | 210 ++++++++++++
 scripts/verify-schema.mjs                          | 357 +++++++++++++++++++++
 src/components/SchemaMarkup.tsx                    | 339 ++++++++++---------
 src/data/services.ts                               |  18 ++
 src/pages/About.tsx                                |  16 +-
 src/pages/BlogPost.tsx                             |   4 +-
 src/pages/Contact.tsx                              |   6 +-
 src/pages/FAQ.tsx                                  |   5 +-
 src/pages/Home.tsx                                 |   5 +-
 src/pages/Locations.tsx                            |   6 +-
 src/pages/Reviews.tsx                              |   5 +-
 src/pages/locations/Columbus.tsx                   |   5 +-
 src/pages/locations/Delaware.tsx                   |   5 +-
 src/pages/locations/Dublin.tsx                     |   5 +-
 src/pages/locations/Gahanna.tsx                    |   5 +-
 src/pages/locations/GroveCity.tsx                  |   5 +-
 src/pages/locations/Hilliard.tsx                   |   5 +-
 src/pages/locations/NewAlbany.tsx                  |   5 +-
 src/pages/locations/Pickerington.tsx               |   5 +-
 src/pages/locations/Powell.tsx                     |   5 +-
 src/pages/locations/Reynoldsburg.tsx               |   5 +-
 src/pages/locations/UpperArlington.tsx             |   5 +-
 src/pages/locations/Westerville.tsx                |   5 +-
 src/pages/locations/Worthington.tsx                |   5 +-
 src/pages/services/CommercialRoofing.tsx           |   5 +-
 src/pages/services/EmergencyServices.tsx           |   5 +-
 src/pages/services/Gutters.tsx                     |   5 +-
 src/pages/services/PreventativeMaintenance.tsx     |   5 +-
 src/pages/services/RoofInspection.tsx              |   5 +-
 src/pages/services/RoofInstallation.tsx            |   5 +-
 src/pages/services/RoofRepair.tsx                  |   5 +-
 src/pages/services/RoofReplacement.tsx             |   5 +-
 src/pages/services/Siding.tsx                      |   5 +-
 src/pages/services/StormDamage.tsx                 |   5 +-
 38 files changed, 1123 insertions(+), 192 deletions(-)
```

`.claude/settings.local.json` is a **pre-existing, unrelated, uncommitted** local change. It was present before this task and was never staged. `public/sitemap.xml` does not appear: every build regenerated it and it was restored each time (Planner fact 3). This SUMMARY and the other planning docs are untracked and are left for the orchestrator's docs commit.

## (5) JSON-LD of `dist/locations/hilliard/index.html` (all 11 blocks, page order)

Order: RoofingContractor, 7 × Service, FAQPage, BreadcrumbList, WebPage.

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://www.dteroofingllc.com/#business",
  "name": "DTE Roofing",
  "legalName": "DTE Roofing LLC",
  "foundingDate": "2023-10",
  "url": "https://www.dteroofingllc.com",
  "logo": "https://www.dteroofingllc.com/images/DTE-Roofing-Logo-two-Men.png",
  "image": "https://www.dteroofingllc.com/images/DTE-Roofing-Logo-two-Men.png",
  "telephone": "+16149716028",
  "email": "experience@dteroofing.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "615 Hilliard Rome Rd",
    "addressLocality": "Columbus",
    "addressRegion": "OH",
    "postalCode": "43228",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.9637153,
    "longitude": -83.1477371
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Columbus",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Hilliard",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Dublin",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "New Albany",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Upper Arlington",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Westerville",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Gahanna",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Reynoldsburg",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Grove City",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Pickerington",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Worthington",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Delaware",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Powell",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "https://www.google.com/maps?cid=15933068684969168707",
    "https://www.facebook.com/people/DTE-Roofing/61556271692460/",
    "https://www.instagram.com/dte_roofing/",
    "https://www.bbb.org/us/oh/columbus/profile/roofing-contractors/dte-roofing-llc-0302-70165482",
    "https://www.gaf.com/en-us/roofing-contractors/residential/usa/oh/columbus/dte-roofing-llc-1146165",
    "https://www.yelp.com/biz/dte-roofing-lincoln-village",
    "https://nextdoor.com/pages/dte-roofing-llc-hilliard-oh/"
  ],
  "founder": [
    {
      "@type": "Person",
      "name": "Donovan Davis"
    },
    {
      "@type": "Person",
      "name": "Mitchell Davis"
    }
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "GAF Certified Plus Contractor",
      "credentialCategory": "certification",
      "recognizedBy": {
        "@type": "Organization",
        "name": "GAF"
      },
      "url": "https://www.gaf.com/en-us/roofing-contractors/residential/usa/oh/columbus/dte-roofing-llc-1146165"
    }
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "Better Business Bureau",
    "url": "https://www.bbb.org/us/oh/columbus/profile/roofing-contractors/dte-roofing-llc-0302-70165482"
  },
  "award": "BBB Accredited Business, A+ rating"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.dteroofingllc.com/locations/hilliard#service-roof-repair",
  "name": "Roof Repair in Hilliard, OH",
  "serviceType": "Roof Repair",
  "provider": {
    "@id": "https://www.dteroofingllc.com/#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "Hilliard",
    "containedInPlace": {
      "@type": "State",
      "name": "Ohio"
    }
  },
  "url": "https://www.dteroofingllc.com/services/roof-repair"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.dteroofingllc.com/locations/hilliard#service-roof-replacement",
  "name": "Roof Replacement in Hilliard, OH",
  "serviceType": "Roof Replacement",
  "provider": {
    "@id": "https://www.dteroofingllc.com/#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "Hilliard",
    "containedInPlace": {
      "@type": "State",
      "name": "Ohio"
    }
  },
  "url": "https://www.dteroofingllc.com/services/roof-replacement"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.dteroofingllc.com/locations/hilliard#service-roof-installation",
  "name": "Roof Installation in Hilliard, OH",
  "serviceType": "Roof Installation",
  "provider": {
    "@id": "https://www.dteroofingllc.com/#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "Hilliard",
    "containedInPlace": {
      "@type": "State",
      "name": "Ohio"
    }
  },
  "url": "https://www.dteroofingllc.com/services/roof-installation"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.dteroofingllc.com/locations/hilliard#service-roof-inspection",
  "name": "Roof Inspection in Hilliard, OH",
  "serviceType": "Roof Inspection",
  "provider": {
    "@id": "https://www.dteroofingllc.com/#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "Hilliard",
    "containedInPlace": {
      "@type": "State",
      "name": "Ohio"
    }
  },
  "url": "https://www.dteroofingllc.com/services/roof-inspection"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.dteroofingllc.com/locations/hilliard#service-storm-damage",
  "name": "Storm Damage Repair in Hilliard, OH",
  "serviceType": "Storm Damage Repair",
  "provider": {
    "@id": "https://www.dteroofingllc.com/#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "Hilliard",
    "containedInPlace": {
      "@type": "State",
      "name": "Ohio"
    }
  },
  "url": "https://www.dteroofingllc.com/services/storm-damage"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.dteroofingllc.com/locations/hilliard#service-gutters",
  "name": "Gutter Services in Hilliard, OH",
  "serviceType": "Gutter Services",
  "provider": {
    "@id": "https://www.dteroofingllc.com/#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "Hilliard",
    "containedInPlace": {
      "@type": "State",
      "name": "Ohio"
    }
  },
  "url": "https://www.dteroofingllc.com/services/gutters"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.dteroofingllc.com/locations/hilliard#service-siding",
  "name": "Siding in Hilliard, OH",
  "serviceType": "Siding",
  "provider": {
    "@id": "https://www.dteroofingllc.com/#business"
  },
  "areaServed": {
    "@type": "City",
    "name": "Hilliard",
    "containedInPlace": {
      "@type": "State",
      "name": "Ohio"
    }
  },
  "url": "https://www.dteroofingllc.com/services/siding"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you serve Hilliard if your address shows Columbus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Our office is at 615 Hilliard Rome Rd with a Columbus mailing address (43228 zip code), but we're right on the west side, minutes from Old Hilliard, Britton Farms, Scioto Reserve, and all Hilliard neighborhoods. Both founders are Hilliard Davidson graduates—this is our hometown. We serve Hilliard regularly with the same detail-first approach we bring to every customer conversation."
      }
    },
    {
      "@type": "Question",
      "name": "Can you schedule around Center Street Market weekends or Freedom Fest traffic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We're locals who know that parking around Station Park and Old Hilliard gets tight during Center Street Market weekends, and that Freedom Fest at Roger A. Reynolds Municipal Park draws big crowds. We plan service schedules to work around community events and minimize disruption to your neighborhood. Just let us know your timing preferences when you call."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with HOAs in Hilliard subdivisions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we're experienced with HOA requirements in Hilliard neighborhoods. Many subdivisions have specific rules about shingle colors, architectural styles, and approval processes. We help you understand what approvals are needed and can provide documentation to your HOA board. We've worked successfully with HOAs throughout Heritage Lakes, Crossing at Scioto, Hayden Run, and other communities."
      }
    },
    {
      "@type": "Question",
      "name": "What causes leaks around chimneys and step flashing in older homes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flashing around chimneys, skylights, and along dormers (step flashing) is meant to direct water away from these vulnerable intersections. Over time, flashing seals degrade from weather exposure, especially with wind-driven rain common in Hilliard. Older homes in Old Hilliard and neighborhoods like Britton Farms often have original flashing that has lost its seal. We inspect flashing carefully during every roof assessment and repair or replace it with high-quality materials that last."
      }
    },
    {
      "@type": "Question",
      "name": "Is ice and water shield worth it here in Hilliard?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Ice and water shield is a self-sealing underlayment installed at vulnerable areas like eaves, valleys, and around penetrations. Ohio winters bring freeze-thaw cycles that can cause ice dams, especially on north-facing slopes. Ice and water shield provides extra protection against water backup under shingles. We recommend it for all roof replacements in this climate—it's an affordable upgrade that prevents expensive water damage."
      }
    },
    {
      "@type": "Question",
      "name": "How fast can you inspect after wind or hail?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We prioritize storm response for Hilliard customers. After major storms, we typically respond within 24-48 hours. If there's active leaking or emergency damage, we can often come same-day for temporary repairs or tarping. Once on-site, one of our owners inspects your roof thoroughly, documents any storm damage with photos for insurance purposes, and explains your options clearly. Call 614-971-6028 as soon as you suspect storm damage."
      }
    },
    {
      "@type": "Question",
      "name": "Do you handle gutters because of tree debris?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Hilliard's mature tree canopy is beautiful but causes constant debris in gutters. Clogged gutters overflow during rains, damaging fascia, soffit, and even foundation drainage. We provide gutter cleaning, repairs, and full gutter replacement. We can also install gutter guards in areas with heavy leaf accumulation. If tree debris has caused damage to your roof or gutters, we assess and repair all related issues in one visit."
      }
    },
    {
      "@type": "Question",
      "name": "How do you keep nails out of driveways?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We take cleanup seriously. During tear-off, we use tarps and magnetic sweepers to catch nails and debris. After the job, we make multiple passes with rolling magnets across your driveway, walkways, and yard. We inspect the entire property before we leave. Clean jobsites are part of our detail-first approach—you shouldn't have to worry about nails in your tires or your kids' feet."
      }
    },
    {
      "@type": "Question",
      "name": "Do you help with insurance documentation in 2025-2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. If your roof damage is from wind, hail, or storm events, your homeowner's insurance may cover repairs or replacement. We document storm damage with detailed photos and measurements, meet with adjusters on-site if needed, and provide written estimates that match insurance requirements. We explain the claims process and help you understand your policy coverage. We work with all major insurance companies and make the process as smooth as possible."
      }
    },
    {
      "@type": "Question",
      "name": "What's the fastest way to schedule?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Call us directly at 614-971-6028. You'll speak with one of our owners—no phone trees or call centers. We'll ask a few questions about your roof, schedule an inspection at your convenience, and one of our owners will come personally to assess your roof and discuss your options. Most inspections are scheduled within 2-3 days, and emergency situations get same-day or next-day priority."
      }
    }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.dteroofingllc.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Service Areas",
      "item": "https://www.dteroofingllc.com/locations"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Hilliard",
      "item": "https://www.dteroofingllc.com/locations/hilliard"
    }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.dteroofingllc.com/locations/hilliard#webpage",
  "url": "https://www.dteroofingllc.com/locations/hilliard",
  "name": "Roofers in Hilliard, OH | Roofing Contractor | DTE Roofing",
  "description": "Serving Hilliard, OH from our office on Hilliard Rome Rd (615 Hilliard Rome Rd, Columbus, OH 43228 mailing address). Detail-first roof repair and replacement with owners personally involved in every project.",
  "isPartOf": {
    "@type": "WebSite",
    "@id": "https://www.dteroofingllc.com/#website",
    "url": "https://www.dteroofingllc.com",
    "name": "DTE Roofing",
    "publisher": {
      "@id": "https://www.dteroofingllc.com/#business"
    }
  },
  "about": {
    "@id": "https://www.dteroofingllc.com/#business"
  },
  "primaryImageOfPage": {
    "@type": "ImageObject",
    "url": "https://www.dteroofingllc.com/images/DTE-Roofing-Logo-two-Men.png"
  },
  "spatialCoverage": {
    "@type": "City",
    "name": "Hilliard",
    "containedInPlace": {
      "@type": "State",
      "name": "Ohio"
    }
  },
  "mentions": [
    {
      "@type": "City",
      "name": "Columbus",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Dublin",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Upper Arlington",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    },
    {
      "@type": "City",
      "name": "Grove City",
      "containedInPlace": {
        "@type": "State",
        "name": "Ohio"
      }
    }
  ]
}
```

## (6) Commits

| # | Hash | Message |
|---|------|---------|
| 1 | `08e9a62` | chore(schema): add verify-schema script + pre-change baseline |
| 2 | `fac398a` | feat(schema): add services SSOT (src/data/services.ts) |
| 3 | `72ad4ae` | feat(schema): single business node, drop self-serving reviews, enrich WebPage/Service/BlogPosting |
| 4 | `65bda83` | feat(schema): documentTitle on top-level page call sites (+ About AboutPage schema) |
| 5 | `6dc14f5` | feat(schema): documentTitle on all 13 location page call sites |
| 6 | `d212143` | feat(schema): documentTitle on all 10 service page call sites |
| 7 | `d27b623` | docs(planning): record single business @id decision (261002-fqk) |

Nothing was merged, pushed or deployed.

## (7) Deviations and notes

**Spec / plan deviations (all pre-agreed):**
- **D2 committed baseline.** The spec asked for a "temp JSON". The pre-change snapshot is committed at `scripts/schema-baseline.json` (`baselineCommit: db754d0`) so `npm run verify-schema` check (g) works on any checkout. It has not been regenerated since.
- **Call-site split.** The call sites went in as 3 commits (top-level / locations / services), not 1. The plan allows 2–3.

**Planner-verified facts, as applied:**
1. Only `RoofRepair.tsx` uses `ServicePageTemplate`. Its `DOCUMENT_TITLE` is lifted from the template's `title` prop. The other 9 service pages lift their own `<SEO title>`. `ServicePageTemplate.tsx` is unmodified.
2. All 10 service pages already pass `service.url`. The D6 fallback expression is kept, and every service `@id` is `${SITE_URL}${service.url}#service`.
3. `npm run build` regenerated the tracked `public/sitemap.xml` on each of the 3 builds (baseline, after Task 2, final). It was `git restore`d each time and never staged.

**Implementation notes (no output impact, stated for review):**
- The 28 mechanical call-site edits were applied with an assertion-guarded scratchpad Node script rather than 28 individual Edit calls. Its guards: exactly one `<SEO`/`<ServicePageTemplate` anchor, a plain string-literal title, no quote/backslash/entity characters, `type=` directly after `<SchemaMarkup`, and each file's CRLF EOL preserved. A dry run printed every extracted title before writing, and all matched the plan's cross-check list. About.tsx and BlogPost.tsx were edited by hand. The heads comparison (0/0/0) proves titles, descriptions and bodies are unchanged.
- `generateServiceSchema` still gates on `service` being present, as the old code did, rather than on `type === 'service'`. Every call site that passes `service` uses `type="service"`, so the output is identical.
- Defensive fallbacks that never trigger with the current call sites: location Service `@id` base `pageUrl || ${SITE_URL}/locations/${slug}`, and BlogPosting `mainEntityOfPage` `${pageUrl || blog.url}#webpage`. All call sites pass `pageUrl`, so output is exactly the spec form.
- `eslint.config.js` only configures `**/*.{ts,tsx}`, so `npx eslint scripts/verify-schema.mjs` (exit 0) applies zero rules. To make "verify-schema.mjs fully clean" meaningful, it was also linted against `@eslint/js` recommended with Node globals via a temporary config in the scratchpad: exit 0.
- verify-schema check (f) counts **top-level** Service nodes (≥ 7) on city pages. Checks (a)–(d) and the FAQ/breadcrumb counts walk objects at any depth.
- Service-page Service nodes now carry the full 13-city `areaServed`, as §4 requires. This intentionally re-adds what quick task 260511-as1 removed (~1 KB per service page).

**PROJECT.md observation (not changed, per D9):** Only lines 43 and 125 were edited. Other lines still describe the old per-page model. The plan cited "lines 40–41 and 123", but the lines that actually contradict the new state are **41** ("Hub page has its own RoofingContractor JSON-LD schema"), **42** ("Each subpage has page-specific areaServed (primary city + 2-3 neighbors)") and **122** (Key Decision "Page-specific areaServed (primary + 2-3 neighbors)"). Line 123 ("Remove 10 non-page cities from schema") is still accurate. A follow-up docs touch may want to mark 41/42/122 superseded too.

## Threat Flags

None. No new network endpoints, auth paths or user-input surfaces. All JSON-LD is static, repo-authored content.

## Known Stubs

None.

## Self-Check: PASSED

- Files present: scripts/verify-schema.mjs, scripts/schema-baseline.json, src/data/services.ts, src/components/SchemaMarkup.tsx, 261002-fqk-heads-before.json, 261002-fqk-SUMMARY.md.
- Commits present on feat/schema-ssot: 08e9a62, fac398a, 72ad4ae, 65bda83, 6dc14f5, d212143, d27b623.
- Task 1 verify: baseline has 41 routes (baselineCommit db754d0), /about and /services have 0 blocks, /locations/hilliard has 3 breadcrumb items; heads-before has 42 entries.
- Task 3 verify: verify-schema exit 0 (`checked 41, pass 36, fail 0, skip 5`); 30 `documentTitle=` call sites; `git status --porcelain -- src scripts package.json public` is empty; PROJECT.md contains 261002-fqk.
- Out-of-scope files are unchanged vs db754d0: ServicePageTemplate.tsx, review-stats.json, index.html, vercel.json, public/sitemap.xml, package-lock.json. package.json diff is the verify-schema script line only.
- Completed 2026-10-02T15:47Z (about 12 min after the 15:35:49Z start).

## Shipped

Shipped by quick task 261002-h43 on 2026-10-02.

- **PR:** #2, https://github.com/nickthx/dte-roofing-web/pull/2 (merged with `--merge`; `feat/schema-ssot` kept locally and on origin)
- **Merge commit:** `f214c446f1d2d918f296b725bca97e7a318a4bcd` (parents `db754d0` + `8d88c8b`). All 7 commit hashes in section (6), plus `8d88c8b`, are ancestors of `main`, unchanged (no rebase was needed)
- **Merged at:** 2026-10-02T16:28:37Z (12:28:37 EDT)
- **Production flip:** 2026-10-02T16:29:23Z (12:29:23 EDT), 46.7 s after the merge (poll attempt 2; NTP-corrected, local clock is 14.1 s slow). `/locations/hilliard` serves `"@id":"https://www.dteroofingllc.com/#business"` and no `aggregateRating`
- **Deployment:** Vercel `EPxnT9YghNixTNFaKsAfBHJaixwF`, https://dte-roofing-demo-47by687jq-nick-whitsetts-projects.vercel.app (Production, Ready; GitHub deployment 6813160157)
- **Live verify:** `node scripts/verify-schema.mjs --base https://www.dteroofingllc.com`, `checked 41, pass 36, fail 0, skip 5`, exit 0, table byte-identical to the dist run in section (2)
- **Parity:** `<title>` and meta description on `/`, `/locations` and `/locations/hilliard` are byte-identical before and after the deploy (6/6 MATCH)
