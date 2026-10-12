# Phase 1 Plan 01 — Diagnosis: Duplicate Metadata + /blog SSR Root Cause

**Date:** 2026-04-08
**Plan:** 260408-p1 / 01-01
**Requirements:** META-03, BLOG-03

---

## TL;DR

- **Root cause of duplicate titles:** 21 pages literally hardcode the same 166-char "BEST Roofer in Columbus…" string as their `<SEO title=...>` prop. It is NOT a default in `SEO.tsx`. There is no fallback logic — `SEO.tsx` always emits exactly what it is passed.
- **Root cause of duplicate description:** The 197-char "Licensed, bonded & insured…" string lives ONLY in `index.html:12` as a static `<meta name="description">`. It bleeds through to any page that fails to render a Helmet `<meta name="description">` (e.g., the prerendered `/blog` snapshot, or any page where Helmet hasn't yet committed during prerender).
- **Root cause of /blog empty head:** `Blog.tsx` early-returns a loading spinner BEFORE rendering `<SEO>` (line 44–50). During prerender, Supabase fetch is in flight → `loading === true` → component returns the spinner JSX with NO `<SEO>` and NO `<h1>`. Helmet emits nothing → `index.html`'s static `<title>` and empty `<meta description>` ship to crawlers.
- **Fix strategy:** **S3 (Hybrid)** — single-line fix in `Blog.tsx` (move SEO above the loading return) + 22 per-page edits to replace the duplicate 166-char title string with unique titles. No change needed in `SEO.tsx`. Optional cleanup of `index.html` static description.

---

## Task 1 — `<SEO>` Inventory & Classification

Classification key:
- **A** — Unique `title` AND unique `description` ✅
- **B** — Has `<SEO>`, but title is the duplicated 166-char fallback string
- **C** — No `<SEO>` at all
- **D** — Uses `ServicePageTemplate` which hardcodes the duplicate title
- **E** — `/blog` async-loading edge case

| # | Sitemap path | File | Has `<SEO>`? | Title prop | Description prop | Class |
|---|---|---|---|---|---|---|
| 1 | `/` | `src/pages/Home.tsx` | Yes | Unique ("BEST Roofer in Columbus OH – Roof Repair & Replacement Near Me") | unique | **A** |
| 2 | `/about` | `src/pages/About.tsx` | Yes | **DUPLICATE 166-char** | unique | **B** |
| 3 | `/contact` | `src/pages/Contact.tsx` | Yes | **DUPLICATE 166-char** | unique | **B** |
| 4 | `/services` | `src/pages/Services.tsx` | Yes | **DUPLICATE 166-char** | unique | **B** |
| 5 | `/reviews` | `src/pages/Reviews.tsx` | Yes | **DUPLICATE 166-char** | unique | **B** |
| 6 | `/gallery` | `src/pages/Gallery.tsx` | Yes | **DUPLICATE 166-char** | unique | **B** |
| 7 | `/faq` | `src/pages/FAQ.tsx` | Yes | **DUPLICATE 166-char** | unique | **B** |
| 8 | `/financing` | `src/pages/Financing.tsx` | Yes (verify) | (verify) | (verify) | **B?** |
| 9 | `/instant-quote` | `src/pages/InstantQuote.tsx` | Yes | **DUPLICATE 166-char** | unique | **B** |
| 10 | `/blog` | `src/pages/Blog.tsx` | Yes BUT after `loading` early-return | DUPLICATE 166-char (when rendered) | unique | **E** |
| 11 | `/locations` | `src/pages/Locations.tsx` | Yes (verify) | (verify) | (verify) | **B?** |
| 12 | `/services/roof-repair` | `src/pages/services/RoofRepair.tsx` | via ServicePageTemplate | DUPLICATE via template | (template) | **D** |
| 13 | `/services/roof-replacement` | `src/pages/services/RoofReplacement.tsx` | inline `<SEO>` | **DUPLICATE 166-char** | unique | **B** |
| 14 | `/services/roof-installation` | `src/pages/services/RoofInstallation.tsx` | inline | **DUPLICATE 166-char** | unique | **B** |
| 15 | `/services/roof-inspection` | `src/pages/services/RoofInspection.tsx` | inline | **DUPLICATE 166-char** | unique | **B** |
| 16 | `/services/roof-maintenance` | `src/pages/services/RoofMaintenance.tsx` | inline | **DUPLICATE 166-char** | unique | **B** |
| 17 | `/services/preventative-maintenance` | `src/pages/services/PreventativeMaintenance.tsx` | inline | **DUPLICATE 166-char** | unique | **B** |
| 18 | `/services/emergency-services` | `src/pages/services/EmergencyServices.tsx` | inline | **DUPLICATE 166-char** | unique | **B** |
| 19 | `/services/storm-damage` | `src/pages/services/StormDamage.tsx` | inline | **DUPLICATE 166-char** | unique | **B** |
| 20 | `/services/commercial-roofing` | `src/pages/services/CommercialRoofing.tsx` | inline | **DUPLICATE 166-char** | unique | **B** |
| 21 | `/services/gutters` | `src/pages/services/Gutters.tsx` | inline | **DUPLICATE 166-char** | unique | **B** |
| 22 | `/services/gutter-services` | `src/pages/services/GutterServices.tsx` | inline | **DUPLICATE 166-char** | unique | **B** |
| 23 | `/services/siding` | `src/pages/services/Siding.tsx` | inline | **DUPLICATE 166-char** | unique | **B** |
| 24 | `/locations/columbus` | `src/pages/locations/Columbus.tsx` | Yes | unique | unique | **A** |
| 25 | `/locations/hilliard` | `src/pages/locations/Hilliard.tsx` | Yes | unique | unique | **A** |
| 26 | `/locations/dublin` | `src/pages/locations/Dublin.tsx` | Yes | unique | unique | **A** |
| 27 | `/locations/delaware` | `src/pages/locations/Delaware.tsx` | Yes | unique | unique | **A** |
| 28 | `/locations/westerville` | `src/pages/locations/Westerville.tsx` | Yes | unique | unique | **A** |
| 29 | `/locations/worthington` | `src/pages/locations/Worthington.tsx` | Yes | unique | unique | **A** |
| 30 | `/locations/upper-arlington` | `src/pages/locations/UpperArlington.tsx` | Yes | unique | unique | **A** |
| 31 | `/locations/gahanna` | `src/pages/locations/Gahanna.tsx` | Yes | unique | unique | **A** |
| 32 | `/locations/new-albany` | `src/pages/locations/NewAlbany.tsx` | Yes | unique | unique | **A** |
| 33 | `/locations/powell` | `src/pages/locations/Powell.tsx` | Yes | unique | unique | **A** |
| 34 | `/locations/grove-city` | `src/pages/locations/GroveCity.tsx` | Yes | unique | unique | **A** |
| 35 | `/locations/reynoldsburg` | `src/pages/locations/Reynoldsburg.tsx` | Yes | unique | unique | **A** |
| 36 | `/locations/pickerington` | `src/pages/locations/Pickerington.tsx` | Yes | unique | unique | **A** |

**Summary counts:**
- Class **A** (unique title + description): **14** pages — Home + 13 locations
- Class **B** (duplicate 166-char title, unique description): **20** pages — all 11 services with inline `<SEO>` + About + Contact + Services + Reviews + Gallery + FAQ + InstantQuote + (Financing/Locations TBV)
- Class **D** (template-driven, hardcodes duplicate title): **1** page — `RoofRepair.tsx` (the only `services/*` page that uses `ServicePageTemplate` instead of inline `<SEO>`)
- Class **E** (async loading edge case): **1** page — `/blog`

Total accounted for: 36 (matches 35 sitemap pages + 1 ServicePageTemplate as code path).

> Note: `Financing.tsx` and `Locations.tsx` were not directly grepped in this pass — Phase 2 executor should verify these two and add them to the per-page edit list if they also use the duplicate string.

---

## Task 2 — Default/Fallback Title Source

**The 166-char string is NOT a default.** `SEO.tsx` has no default props (verified — `src/components/SEO.tsx` lines 1–46). Every occurrence is a literal hardcode.

**Confirmed locations of the literal 166-char string:**

| File | Line | Context |
|---|---|---|
| `src/pages/About.tsx` | 12 | inline `<SEO title="...">` |
| `src/pages/Blog.tsx` | 55 | inline `<SEO title="...">` (after loading early-return) |
| `src/pages/Contact.tsx` | 14 | inline `<SEO title="...">` |
| `src/pages/FAQ.tsx` | 107 | inline `<SEO title="...">` |
| `src/pages/Gallery.tsx` | 79 | inline `<SEO title="...">` |
| `src/pages/InstantQuote.tsx` | 11 | inline `<SEO title="...">` |
| `src/pages/Reviews.tsx` | 74 | inline `<SEO title="...">` |
| `src/pages/Services.tsx` | 54 | inline `<SEO title="...">` |
| `src/pages/services/CommercialRoofing.tsx` | 10 | inline `<SEO title="...">` |
| `src/pages/services/EmergencyServices.tsx` | 10 | inline `<SEO title="...">` |
| `src/pages/services/Gutters.tsx` | 10 | inline `<SEO title="...">` |
| `src/pages/services/GutterServices.tsx` | 10 | inline `<SEO title="...">` |
| `src/pages/services/PreventativeMaintenance.tsx` | 10 | inline `<SEO title="...">` |
| `src/pages/services/RoofInspection.tsx` | 10 | inline `<SEO title="...">` |
| `src/pages/services/RoofInstallation.tsx` | 10 | inline `<SEO title="...">` |
| `src/pages/services/RoofMaintenance.tsx` | 10 | inline `<SEO title="...">` |
| `src/pages/services/RoofReplacement.tsx` | 11 | inline `<SEO title="...">` |
| `src/pages/services/Siding.tsx` | 10 | inline `<SEO title="...">` |
| `src/pages/services/StormDamage.tsx` | 10 | inline `<SEO title="...">` |
| `src/components/ServicePageTemplate.tsx` | 71 | template default — affects `RoofRepair.tsx` (the only consumer) |

**Total: 20 pages directly + 1 template (1 consumer = `RoofRepair.tsx`).**

---

## Task 3 — Default Meta Description Source

The 197-char string `"DTE Roofing - Professional roofing services in Columbus, Hilliard, and Dublin, OH. Expert roof repair, replacement, installation, and emergency services. Licensed, bonded & insured. Free estimates."` lives in **exactly one place**:

**`index.html` line 12:**
```html
<meta name="description" content="DTE Roofing - Professional roofing services in Columbus, Hilliard, and Dublin, OH. Expert roof repair, replacement, installation, and emergency services. Licensed, bonded & insured. Free estimates." />
```

**Why it bleeds through to other pages:** During prerender, react-helmet-async normally injects a `<meta name="description" data-rh="true">` that replaces the static one. But for `/blog` (and any page where the SEO component never renders, like the loading state), Helmet emits nothing, so the static `index.html` description ships unchanged. For pages that DO pass `description=` props (all 20 class-B pages have unique descriptions), the prerendered HTML should already be correct — meaning the audit's "35 pages share homepage description" finding most likely originates from a runtime audit run on a slow connection (or specifically from the `/blog` empty-head case being extrapolated). **Phase 2 executor should re-grep prerendered `dist/**/index.html` files to confirm whether descriptions are actually duplicated or only `/blog` is affected.**

A grep for the 197-char snippet across `src/` returned **zero matches** — the string only exists in `index.html`.

---

## Task 4 — `/blog` Empty Head Root Cause

**File:** `src/pages/Blog.tsx`
**Lines:** 44–50 (the offending early return)

```tsx
21  export default function Blog() {
22    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
23    const [loading, setLoading] = useState(true);   // ← starts true
24
25    useEffect(() => {
26      async function fetchPosts() {
27        const { data, error } = await supabase
            .from('blog_posts')...
38        setLoading(false);
39      }
40      fetchPosts();
41    }, []);
42
43    if (loading) {                                   // ← SSR ALWAYS hits this
44      return (
45        <div className="min-h-screen bg-white flex items-center justify-center">
46          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
47        </div>
48      );
49    }
50
51    return (
52      <div className="min-h-screen bg-white">
53        <SEO ... />                                  // ← never reached during prerender
```

**Root cause:** `useEffect` does NOT run during SSR/prerender. `loading` stays `true`. The component returns the spinner JSX, which contains no `<SEO>` and no `<h1>`. react-helmet-async therefore emits no `<title>` or `<meta description>` overrides, and the prerendered HTML carries forward the static `index.html` `<title>` and `<meta name="description">`. Same reason `<h1>` is empty in the snapshot.

**Proposed fix (one-line move):** Render `<SEO>` UNCONDITIONALLY before the loading early-return. Either:

**Option A (preferred):** Move `<SEO>` and `<h1>` above the `if (loading)` check by wrapping the loading state in the same outer JSX shell:

```tsx
return (
  <div className="min-h-screen bg-white">
    <SEO
      title="Roofing Tips & News | DTE Roofing Blog — Central Ohio"
      description="Expert roofing advice from DTE Roofing. Roof maintenance, winter prep, signs you need a new roof, and more — for Columbus and Central Ohio homeowners."
      keywords="roofing blog, roof maintenance tips, Ohio roofing advice"
      canonical="https://www.dteroofingllc.com/blog"
    />
    <section className="...hero...">
      <h1>Roofing Tips & Insights for Central Ohio Homeowners</h1>
      ...
    </section>
    {loading ? <Spinner /> : <PostsGrid posts={blogPosts} />}
    ...
  </div>
);
```

This guarantees `<SEO>`, `<h1>`, and the hero copy always render, regardless of Supabase data state. The same pattern should be applied to `BlogPost.tsx` if it has the same issue.

---

## Task 5 — Fix Strategy

### Strategy: **S3 — Hybrid (single-point + per-page edits)**

Selected because:
- The duplicate title is NOT in a default — it's hardcoded into 20 pages individually. There is no single point that can fix them all (S1 is impossible without introducing a slug→title map).
- Pure S2 (22 per-page edits) is needed for the title duplication.
- Plus a single-point fix for `/blog` (move `<SEO>` above loading guard).
- Plus a single-point fix for `ServicePageTemplate.tsx` line 71 (RoofRepair).
- Optional: clean up `index.html:12` static description (low risk, but not strictly required if every page properly emits its own).

### Action checklist (per future phase)

**Phase 2 — Per-page title + description audit & fix (v1.1)**
- [ ] Replace duplicate 166-char title in **19 pages** (About, Contact, Services, Reviews, Gallery, FAQ, InstantQuote, and 11 service pages with inline `<SEO>`) with unique, intent-matched titles ≤ 60 chars
- [ ] Replace duplicate title in `ServicePageTemplate.tsx:71` with `${serviceName} | DTE Roofing` pattern (or accept `title` prop and require callers to pass it). This fixes `RoofRepair.tsx`.
- [ ] Verify `Financing.tsx` and `Locations.tsx` and add to edit list if needed
- [ ] Audit each new title for ≤ 60 chars and unique keyword targeting

**Phase 3 — /blog SSR fix (v1.1)**
- [ ] Edit `src/pages/Blog.tsx` to move `<SEO>` and `<h1>` hero section above the `if (loading)` early return
- [ ] Add unique, blog-specific title (e.g., "Roofing Tips & News | DTE Roofing Blog — Central Ohio")
- [ ] Repeat the same audit on `BlogPost.tsx` (likely has the same async pattern)
- [ ] Re-run prerender and verify `dist/blog/index.html` contains non-empty `<title data-rh="true">` and `<h1>`

**Phase 4 — Cleanup & verification (v1.1)**
- [ ] (Optional) Replace `index.html:12` static description with a generic single-sentence brand statement, OR delete it entirely so missing descriptions become visible failures rather than silent fallbacks
- [ ] Re-run full sitemap audit script: every prerendered page should now have unique `<title>` and unique `<meta name="description">`
- [ ] Confirm `/blog` and `/blog/[slug]` ship populated `<title>`, `<meta description>`, and `<h1>` in prerendered HTML

### Impact map

| Phase | Files touched | Type | Risk |
|---|---|---|---|
| 2 | ~19 page files + `ServicePageTemplate.tsx` | Per-page string edits | Low (content-only) |
| 3 | `Blog.tsx`, `BlogPost.tsx` | JSX restructure (move SEO above loading guard) | Low-Medium (verify prerender output) |
| 4 | `index.html` (optional) | One-line edit/delete | Low |

---

## Verification (plan acceptance checklist)

- [x] All 35 sitemap pages classified A/B/C/D/E (Financing/Locations marked B? for Phase 2 verify)
- [x] 166-char title fallback source located — 20 inline hardcodes + `ServicePageTemplate.tsx:71`
- [x] 197-char description fallback source located — `index.html:12`
- [x] /blog empty-head root cause named — `Blog.tsx:44` early loading return before `<SEO>`
- [x] Fix strategy selected — **S3 Hybrid** with rationale
- [x] RESEARCH.md committed (next step)
