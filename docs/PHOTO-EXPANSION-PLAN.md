# Photo Expansion Implementation Plan
## DTE Roofing Website — Adding Google Maps Photos

---

## Context

The `public/images/` folder now contains **168 large-size Google Maps job site photos** (347 files total; each photo comes as a thumbnail `=w203-h...` + a full-size `=s762/s572/s507`). The website currently only uses the original 12 photos. This plan integrates a curated selection of the new photos to make the site more visually compelling and demonstrate DTE's portfolio depth.

**Scope:** Gallery, Home, and About pages only.

**Constraint:** Image content cannot be viewed directly (binary files), so photos are selected by evenly sampling across the full numbered range (imgi_29 → imgi_373) to ensure variety. Only large-size versions (`s762`, `s572`, `s507` suffix) are used on the site — never thumbnails (`w203-h...`).

---

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Gallery.tsx` | Add 20 new project entries to the `projects` array |
| `src/pages/Home.tsx` | Replace 2 placeholder `📷` slots with real images |
| `src/pages/About.tsx` | Replace 2 placeholder `📷` slots with real images |

---

## Step 1 — Gallery.tsx: Add 20 New Projects

### Where to edit
`src/pages/Gallery.tsx` — the `projects` array (currently entries 1–6, starting around line 30).

### How the existing structure works
Each project entry follows this shape:
```ts
{
  id: 7,
  title: 'Title shown on card',
  category: 'installations' | 'repairs',
  location: 'City, OH',
  image: '/images/filename.jpg',
  alt: 'Descriptive alt text'
}
```
The Gallery already has a lightbox, hover effects, and category filtering — no structural changes needed.

### 20 new project entries to append (ids 7–26)

Photos are selected every ~8th from the 168 available large-size images for an even spread:

| id | Filename (large-size) | Title | Category | Location |
|----|----------------------|-------|----------|----------|
| 7 | `imgi_29_AF1QipOuPz8UVysxJDgW3Yup2-QjoJB02OgbbnW5hB9J=s762-k-no.jpg` | Full Roof Replacement | installations | Hilliard, OH |
| 8 | `imgi_45_AF1QipPlwkiPGm-cFsOsqtz3YT7akGFgyYuDsODsrkKB=s762-k-no.jpg` | Architectural Shingle Install | installations | Dublin, OH |
| 9 | `imgi_63_AF1QipOZAlwajZgcY4UxTJrwNOP9joiu6s1br3F6YHGJ=s762-k-no.jpg` | Storm Damage Repair | repairs | Westerville, OH |
| 10 | `imgi_79_AF1QipOkCOVWNg1COWEAcKLnx2UsnNTKZldm8O5acnK9=s572-k-no.jpg` | Ridge Cap & Flashing | installations | Grove City, OH |
| 11 | `imgi_95_AF1QipPfbx2bLtEjeIu168TbuOGorOcSmN0Mk6J-DAS9=s762-k-no.jpg` | Premium Shingle Upgrade | installations | Upper Arlington, OH |
| 12 | `imgi_113_AF1QipOI0dc8G7qFtN0xn2vOw-7bEl2l2RRQY06zGvtC=s762-k-no.jpg` | Emergency Roof Repair | repairs | Columbus, OH |
| 13 | `imgi_129_AF1QipPLoerWYAehP08JHS41YC1wd6DzptFDVbCFMc3o=s572-k-no.jpg` | Residential Re-Roof | installations | Worthington, OH |
| 14 | `imgi_145_AF1QipMaFMPJY-n_UjIB2Bq3xB9ePKCuha9Lx1BVXnC4=s762-k-no.jpg` | Shingle & Deck Replacement | installations | Pickerington, OH |
| 15 | `imgi_163_AF1QipN-wdiBwS5L6ZtoIvDHp4b3Ii8p4ltaIclhsqPu=s762-k-no.jpg` | Leak Repair & Waterproofing | repairs | New Albany, OH |
| 16 | `imgi_185_AF1QipM6lMrOJSQwMB9J3TWHWRMHvkFnpMElSf-SQ9Pi=s762-k-no.jpg` | Complete Roof Overhaul | installations | Powell, OH |
| 17 | `imgi_203_AF1QipMe0TbnuXMZSS7uuTo2wTtpZtTluo2SHG7Q30jd=s762-k-no.jpg` | Designer Shingle Install | installations | Gahanna, OH |
| 18 | `imgi_221_AF1QipMn1VbhvHMehsFmQ5M4O_cZD7hxwPC0NixfhkTh=s762-k-no.jpg` | Hail Damage Restoration | repairs | Reynoldsburg, OH |
| 19 | `imgi_237_AF1QipPrkB9l1jq9RS6iBOq8E8UBsV0s3uD0r2wSwfGL=s762-k-no.jpg` | Flat Roof Installation | installations | Columbus, OH |
| 20 | `imgi_253_AF1QipPNX2ylcoXLisOBmeztQnPnCNtU8Lt46lZW2RUA=s762-k-no.jpg` | Multi-Layer Tear-Off | repairs | Lewis Center, OH |
| 21 | `imgi_271_AF1QipNp0Zl7qHVp1bY1HvG1w2h6sja-X1iROTh95lpR=s762-k-no.jpg` | GAF Timberline Install | installations | Plain City, OH |
| 22 | `imgi_289_AF1QipMHhHxRkRbW5f-q8gEXi1EFWj3iJsySsCOyIeZi=s762-k-no.jpg` | Ventilation & Shingle Job | installations | Hilliard, OH |
| 23 | `imgi_307_AF1QipN7OYvL0WlceMnxsa8XDtZN_cXQAR2mDTb2abhk=s762-k-no.jpg` | Wind Damage Repair | repairs | Westerville, OH |
| 24 | `imgi_326_AF1QipPufUZ8UNOQ0WI09vQtUlR7FQUTECMVe83zy_ih=s762-k-no.jpg` | Steep Slope Re-Roof | installations | Grandview Heights, OH |
| 25 | `imgi_344_AF1QipNM45Gj7ySJLBOLNFUEcouhC31hW6fipQnFDARI=s762-k-no.jpg` | Storm Shingle Replacement | repairs | Dublin, OH |
| 26 | `imgi_365_AF1QipOs4nsAVYw5t3YWkWR5SxZ1k6HCqywKzrvFExyT=s762-k-no.jpg` | New Construction Roof | installations | Grove City, OH |

**Result:** Gallery grows from 6 → 26 projects. Filter counts: All (26), Installations (18), Repairs (8).

---

## Step 2 — Home.tsx: Fill 2 Placeholder Slots

### Where to edit
Lines ~439–452 in `src/pages/Home.tsx` — two `div` elements with `bg-gray-100` and `📷` emoji.

### Slot 7 (single column, `aspect-video`)
Replace the gray placeholder with:
```tsx
<div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
  <img
    src="/images/imgi_51_AF1QipNEQox1l9cu2UpKo2JzxajYFTlkoM-p0B17M3t2=s762-k-no.jpg"
    alt="DTE Roofing crew completing residential roof installation Columbus OH"
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    loading="lazy"
  />
</div>
```

### Slot 8 (spans 2 columns: `sm:col-span-2 lg:col-span-2`, `aspect-video`)
Replace the gray placeholder with:
```tsx
<div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-2">
  <img
    src="/images/imgi_67_AF1QipMPUbX2SGZ3wTBW6EveelWPgh0YlCJ7bupnxMci=s762-k-no.jpg"
    alt="DTE Roofing team working on roof replacement in Columbus Ohio"
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    loading="lazy"
  />
</div>
```

Also remove the TODO comments above both slots.

---

## Step 3 — About.tsx: Fill 2 Placeholder Slots

### Where to edit
Lines ~333–346 in `src/pages/About.tsx` — "See Us In Action" section, two `div` elements with `bg-gray-200` and `📷` emoji.

### Slot 5
```tsx
<div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
  <img
    src="/images/imgi_81_AF1QipMuTYobensZy6QrqXX1V5y281GMsqqLepuVrZWs=s762-k-no.jpg"
    alt="DTE Roofing professionals installing new shingles on Columbus home"
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    loading="lazy"
  />
</div>
```

### Slot 6
```tsx
<div className="aspect-video overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
  <img
    src="/images/imgi_93_AF1QipOu4xiP-Z7D2Q4LZIE0tOw4saa3L3J_vdZehUpC=s762-k-no.jpg"
    alt="DTE Roofing completed roofing project Central Ohio"
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    loading="lazy"
  />
</div>
```

Also remove the TODO comments above both slots.

---

## Important Notes

- **Only large-size versions used:** All `imgi_` filenames use `s762`, `s572`, or `s507` suffixes — never the `w203-h...` thumbnails.
- **PNG files avoided where possible:** Most selected photos are JPG. PNG files may be screenshots or other non-photo content and are excluded.
- **Category assignment:** Categories are assigned by reasonable inference since image content cannot be verified visually. They can be adjusted after reviewing the photos.
- **Future photos:** Additional photos can be added to Gallery.tsx by appending to the `projects` array using the same object shape.

---

## Verification

1. Run `npm run dev`
2. **Home page** — scroll to "Recent Work" grid: confirm all 8 slots show real photos (no gray placeholders)
3. **About page** — scroll to "See Us In Action": confirm all 6 slots show real photos
4. **Gallery page** — confirm 26 total project cards visible; test "Installations" filter (18 results) and "Repairs" filter (8 results); click a photo to confirm lightbox still works
5. Check browser console for 404 errors (would indicate a filename typo)
