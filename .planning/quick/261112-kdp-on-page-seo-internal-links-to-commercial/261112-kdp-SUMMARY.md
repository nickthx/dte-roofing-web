---
phase: quick-261112-kdp
plan: 01
status: complete
subsystem: seo/internal-linking
tags: [seo, internal-links, headings]
requirements: [QUICK-261112-KDP-LINKS, QUICK-261112-KDP-HEADINGS]
key-files:
  modified:
    - src/pages/Home.tsx
    - src/pages/services/RoofRepair.tsx
    - src/pages/locations/Dublin.tsx
    - src/pages/locations/Gahanna.tsx
    - src/pages/locations/Reynoldsburg.tsx
    - src/pages/locations/Westerville.tsx
    - src/pages/locations/Worthington.tsx
    - src/pages/locations/Columbus.tsx
    - src/pages/services/RoofReplacement.tsx
    - src/pages/services/StormDamage.tsx
    - src/pages/services/CommercialRoofing.tsx
    - src/pages/services/EmergencyServices.tsx
    - src/pages/Gallery.tsx
    - src/data/blogPosts.tsx
    - src/data/posts/roof-replacement-cost-columbus-ohio.tsx
    - src/data/posts/roof-repair-vs-replacement.tsx
    - src/data/posts/how-long-does-a-roof-last-ohio.tsx
decisions:
  - "Money-page in-links were added only by wrapping existing words or appending to existing data-driven link lists. No new copy."
  - "Home and /services get no roof-installation link: the only installation wording there is in card data strings, so a link would need new copy."
metrics:
  completed: 2026-11-12
  tasks: 3
  files: 17
---

# Quick 261112-kdp: Internal links to Commercial Roofing and Roof Installation, plus heading-skip fix

Contextual in-links to /services/commercial-roofing went from 3 to 10 pages and to /services/roof-installation from 6 to 15 pages. All were added by wrapping existing words or appending to existing related-service lists. Three H1-to-H3 skips were also fixed by retagging the headings, with classNames kept the same.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | f5a66b9 | Commercial-roofing links (Home wrap, RoofRepair relatedServices, 5 location lists) |
| 2 | a2d147a | Roof-installation links on existing words (4 service/location pages, 4 blog bodies) |
| 3 | 5e6de63 | h3 retagged to h2 on EmergencyServices, StormDamage and Gallery |

## In-link counts (seo-scan.mjs, links inside `<main>`, self-links excluded)

**/services/commercial-roofing: 3 pages before, 10 after**
- Before: /locations/columbus x2, /locations, /services
- After: those three plus /, /services/roof-repair, /locations/dublin, /locations/gahanna, /locations/reynoldsburg, /locations/westerville, /locations/worthington (each x1)

**/services/roof-installation: 6 pages before, 15 after**
- Before: /blog/asphalt-vs-metal-roofing-ohio, /financing, /locations/delaware, /locations/dublin, /locations, /locations/new-albany
- After: those six plus /services/roof-repair, /locations/columbus, /services/roof-replacement, /services/storm-damage, /services/commercial-roofing, /blog/signs-you-need-a-new-roof, /blog/roof-replacement-cost-columbus-ohio, /blog/roof-repair-vs-replacement, /blog/how-long-does-a-roof-last-ohio (each x1)

Each newly linked page links to a target only once. Columbus still links to commercial twice, as it did before this task. Neither target page links to itself. The anchors vary: "commercial properties", "install roofs built to handle them", "installing beautiful, long-lasting roofs", "a new roof", "expert installation", "brand-new roof" and "the installation".

## Heading-skip scan

- Before: 3 skips (/gallery, /services/emergency-services, /services/storm-damage, all h1 to h3)
- After: **0 skips** across all 41 dist routes. No later skips were hidden behind the first ones.

## Text-diff gate (compared with the baseline snapshot from HEAD cbc354c)

Visible `<main>` text changed on exactly 6 routes, all on the allowlist:
- /services/roof-repair: inserted the "Commercial Roofing" and "Roof Installation" related-service items
- /locations/dublin, /locations/gahanna, /locations/reynoldsburg, /locations/westerville, /locations/worthington: inserted the "Commercial Roofing" list item

All other routes are byte-identical, so no whitespace fusion or copy change occurred at the `{' '}` joins on RoofReplacement and CommercialRoofing.

## Other gates

- `npm run build`: passes, and public/sitemap.xml was restored after each build
- `npm run verify-schema`: 41/41 PASS, so FAQ/JSON-LD is untouched
- `npm run verify-links`: 42/42 PASS

## Deliberate gaps

- Home and /services have no roof-installation link. The only installation wording on those pages is in card `description`/`features` data strings. Adding a link or a card would need new copy, which the project forbids.
- The other 7 location pages get no commercial link because they never mention commercial work.

## Deviations from Plan

None in the source changes. One process note: Git Bash `sed -i` (used for the Task 3 retags) turned CRLF into LF in the three files. CRLF was restored before the commit, and the diff is the 6 changed lines only.

## Known Stubs

None.

## Self-Check: PASSED

- Commits f5a66b9, a2d147a and 5e6de63 are present in `git log`
- All 17 modified files are committed. The working tree shows only the pre-existing `.claude/settings.local.json` change and the planning dir.
