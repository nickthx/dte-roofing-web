# Quick Task 261013-j8a: Standardize the Google Maps embed on every page - Context

**Gathered:** 2026-10-13
**Status:** Ready for planning

<domain>
## Task Boundary

User ask: "ensure the google maps embed is correct on all pages."

Audit result (orchestrator, read from the code on 2026-10-13, HEAD 23dfeb1):

- **Correct, verified embed** (Google's own Share → Embed URL for the business listing; place id `0x883897c3548f20bf:0xdd1da18d4d7ccf43` = Google CID 15933068684969168707, the same listing the footer/contact/home/reviews "Google Maps" links and the GBP review link point at; pin at 39.9637636, -83.1476323, matching the RoofingContractor `geo` in SchemaMarkup to ~10 m). Used today only on `src/pages/Home.tsx` (via `<LazyMapEmbed src=…>`) and `src/pages/Contact.tsx` (plain `<iframe>`):
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3057.999330164663!2d-83.15021258867671!3d39.96376768296525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883897c3548f20bf%3A0xdd1da18d4d7ccf43!2sDTE%20Roofing!5e0!3m2!1sen!2sus!4v1774114841530!5m2!1sen!2sus`
- **The 13 location pages use four other hand-made variants, none of which is the business listing:**
  1. Columbus: a bare dropped pin at 39.957915, -83.15987 (`1s0x0%3A0x0`), about 1.2 km from the listing, no business name.
  2. Reynoldsburg, Gahanna, Hilliard, Upper Arlington, Westerville: fabricated place id `0x88388e4a4b0be8a3:0x6a7a18f7f4b7e8a0` centred at 39.998, -83.169 (about 4 km north-west of the listing), fake `4v1234567890123` timestamp.
  3. Grove City, Pickerington, Powell, Worthington: `https://www.google.com/maps?q=615+Hilliard+Rome+Rd,+Columbus,+OH+43228&output=embed` (address geocode, no listing card).
  4. Dublin, Delaware, New Albany: directions-mode embeds (`!1m28 … !4m13!3e0`) with fabricated place ids (`0x883889e3e3e3e3e3:0x3e3e3e3e3e3e3e3e`, `0x88388f3f3f3f3f3f:0x3e3e3e3e3e3e3e3e`, destination `0x8838f36c5f8d7f45:0x7b4d8f8f8f8f8f8f`) and a wrong destination point (39.957915, -83.1577).
- **/locations hub** (`src/components/ServiceAreaMap.tsx`, Google Maps JS API): the "★ Headquarters" marker is the Hilliard city-centre point (40.0334, -83.1585), about 8 km from the real HQ, and labelled "Hilliard — Headquarters" although the business address is 615 Hilliard Rome Rd, Columbus, OH 43228.
- The same Google Maps place URL is hard-coded 7 times as link `href`s (Footer ×1, Contact ×1, Home ×4, Reviews ×1).

Hard constraints (CLAUDE.md, still in force): no URL/slug changes, no NAP changes, existing Tailwind design, no new dependencies, CRLF line endings in `src/` (`src/data/*.ts` files are LF), add/replace only what this task names.

</domain>

<decisions>
## Implementation Decisions

### 1. One source of truth: new `src/data/business.ts` (LF, like `projects.ts`)

```ts
/** Google Business Profile listing for DTE Roofing (CID 15933068684969168707). */
export const HQ_PLACE_ID = '0x883897c3548f20bf:0xdd1da18d4d7ccf43';
export const HQ_GEO = { lat: 39.9637636, lng: -83.1476323 } as const;
/** Share → Embed URL from Google Maps for the listing. Must be used inside an <iframe>. */
export const HQ_MAP_EMBED_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3057.999330164663!2d-83.15021258867671!3d39.96376768296525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883897c3548f20bf%3A0xdd1da18d4d7ccf43!2sDTE%20Roofing!5e0!3m2!1sen!2sus!4v1774114841530!5m2!1sen!2sus';
/** Public listing link (the href used for "Open in Google Maps" / "Google Maps" links). */
export const HQ_GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/DTE+Roofing/@39.9637636,-83.1476323,17z/data=!3m1!4b1!4m6!3m5!1s0x883897c3548f20bf:0xdd1da18d4d7ccf43!8m2!3d39.9637636!4d-83.1476323!16s%2Fg%2F11vrcm8sdz';
```

Copy the two URL strings byte-for-byte from `src/pages/Home.tsx` (embed src at the `<LazyMapEmbed`, place href at the "Google Maps" links); do not retype them.

### 2. Every map iframe uses `HQ_MAP_EMBED_SRC`

- 13 location pages (`src/pages/locations/*.tsx`): replace the `src="https://www.google.com/maps…"` attribute of the one map `<iframe>` with `src={HQ_MAP_EMBED_SRC}` and add `import { HQ_MAP_EMBED_SRC } from '../../data/business';`. Keep every other iframe attribute (`width`, `height`, `style`, `allowFullScreen`, `loading="lazy"`, `referrerPolicy`, `className`) and the surrounding markup/headings exactly as they are. Do not touch the "Get Directions from {City}" `maps/dir/` links; they are correct (destination is the street address).
- Dublin, Delaware, New Albany: their iframe `title` says "Map showing route from {City}, OH to DTE Roofing headquarters at 615 Hilliard Rome Rd, Columbus, OH 43228". Since the embed is no longer a route, change those three titles to `Map showing DTE Roofing headquarters at 615 Hilliard Rome Rd, Columbus, OH 43228, serving {City}, OH`. All other pages' titles stay.
- `src/pages/Home.tsx`: `<LazyMapEmbed src={HQ_MAP_EMBED_SRC} …>`; `src/pages/Contact.tsx`: `<iframe src={HQ_MAP_EMBED_SRC} …>`. Import from `'../data/business'`.

### 3. Every Google Maps place link uses `HQ_GOOGLE_MAPS_URL`

Replace the 7 hard-coded `href="https://www.google.com/maps/place/DTE+Roofing/…"` occurrences (Footer.tsx, Contact.tsx, Home.tsx ×4, Reviews.tsx) with `href={HQ_GOOGLE_MAPS_URL}` (+ import). No other attribute changes. `scripts/verify-links.mjs` only checks internal hrefs, so this is safe for the gate.

### 4. Hub map HQ marker (`src/components/ServiceAreaMap.tsx`)

- Remove `isHQ: true` from the Hilliard entry (Hilliard becomes a normal city marker; keep the `isHQ?` field on the interface only if something still uses it — otherwise drop it).
- Add a dedicated HQ marker, rendered after the cities: position `HQ_GEO`, `title: 'DTE Roofing — Headquarters'`, the existing HQ style (scale 10, fill `#991b1b`, white `★` label), info window `<strong>DTE Roofing</strong><div …>★ Headquarters</div><div style="font-size:12px;color:#3d3d3d;">615 Hilliard Rome Rd, Columbus, OH 43228</div>` plus an `<a href="/contact" …>Contact Us →</a>` link in the same style as the city links. Include it in `bounds.extend`.
- Keep the city markers, styling, info windows and `fitBounds` otherwise unchanged. Import `HQ_GEO` from `'../data/business'`. The component still returns `null` without `VITE_GOOGLE_MAPS_API_KEY`; that behaviour is unchanged.

### 5. Execution mechanics

- One plan, one executor, main working tree (no worktree). Commit with explicit paths.
- Executor must NOT run `npm run build`; it runs the per-file type gate (`npx tsc --noEmit -p tsconfig.app.json 2>&1 | grep -E "<touched files>"` must print nothing except the pre-existing About.tsx `'Users'` unused error if About is not touched — it is not) and the CRLF check for `.tsx` files; `src/data/business.ts` is LF.
- Content greps the plan should use: `grep -rl "HQ_MAP_EMBED_SRC" src/pages | wc -l` → 15; `grep -rn "google.com/maps/embed?pb=\|maps?q=615" src --include=*.tsx` → no matches; `grep -rn 'href="https://www.google.com/maps/place' src` → no matches; `grep -c "HQ_GEO" src/components/ServiceAreaMap.tsx` ≥ 1; `grep -c "isHQ: true" src/components/ServiceAreaMap.tsx` → 0.
- Orchestrator gates after the executor: `npm run build` (+ `git checkout public/sitemap.xml`), `npm run verify-links`, `npm run verify-schema`, then a browser check of the deployed pages.
- Commit message: `fix(maps): use the verified business-listing embed and hq marker on every page` with the session's `Co-Authored-By` trailer.

### Claude's Discretion
Exact placement of the import lines; whether to keep the `isHQ` field on the interface.

</decisions>

<specifics>
## Specific Ideas

- Place of truth for the two URL strings: `src/pages/Home.tsx` lines ~409 (href) and ~537 (embed src) at HEAD 23dfeb1.
- Iframe markup pattern on location pages: `src/pages/locations/Hilliard.tsx` lines 283-293.

</specifics>

<canonical_refs>
## Canonical References

- `CLAUDE.md` (constraints); `scripts/verify-links.mjs`; `scripts/verify-schema.mjs`.
- Memory: build is the verification gate; `npm run build` dirties `public/sitemap.xml`; source files are CRLF; GBP listing FID 0x883897c3548f20bf:0xdd1da18d4d7ccf43 (/g/11vrcm8sdz).

</canonical_refs>
