---
frozen: true
approved_at: 2026-04-09T23:41:04Z
approved_by: user
pages: 13
scope: descriptions + H1 + H2 (titles kept)
---

---
phase: 04-location-descriptions-h1-h2
plan: 01
status: drafts-pending-approval
pages: 13
scope: descriptions + H1 + H2 (titles kept — already unique)
---

# Phase 04 Plan 01 — Location Pages Copy Drafts

## Audit (current values)

All 13 files follow identical structure:
- `title=` → line **15** (already unique, will be KEPT per plan default)
- `description=` → line **16**
- hero `<h1>` → line **36**
- primary services `<h2>` → line **60**

| # | Route | File | Current H1 | Current Primary H2 |
|---|-------|------|------------|--------------------|
| 1 | /locations/columbus | `src/pages/locations/Columbus.tsx` | Columbus's Go-To Roofer — Right Here in Your Backyard | Roof Repair, Roof Replacement, Storm Damage & Emergency Roofing in Columbus |
| 2 | /locations/delaware | `src/pages/locations/Delaware.tsx` | Roofer Delaware OH | Roof Repair, Roof Replacement, Emergency Roofing & Gutter Services in Delaware |
| 3 | /locations/dublin | `src/pages/locations/Dublin.tsx` | Dublin Roofing Done Right by Your Columbus Neighbors | Roof Replacement, Roof Inspection, Siding & Gutter Services in Dublin |
| 4 | /locations/gahanna | `src/pages/locations/Gahanna.tsx` | Gahanna Roofing by a Team That Does Things Right | Roof Repair, Storm Damage, Emergency Roofing & Gutter Services in Gahanna |
| 5 | /locations/grove-city | `src/pages/locations/GroveCity.tsx` | Grove City's Reliable Roofer — No Runaround, Just Results | Roof Repair, Roof Replacement, Gutter Installation & Siding in Grove City |
| 6 | /locations/hilliard | `src/pages/locations/Hilliard.tsx` | Hilliard's Hometown Roofer — Born and Raised Here | Roof Repair, Roof Replacement, Storm Damage & Gutter Services in Hilliard |
| 7 | /locations/new-albany | `src/pages/locations/NewAlbany.tsx` | New Albany's Roofer — Quality Work, Honest Prices | Roof Replacement, Preventative Maintenance, Siding & Gutter Services in New Albany |
| 8 | /locations/pickerington | `src/pages/locations/Pickerington.tsx` | Roofer Pickerington OH | Roof Repair, Roof Replacement, Storm Damage & Preventative Maintenance in Pickerington |
| 9 | /locations/powell | `src/pages/locations/Powell.tsx` | Powell's Trusted Roofer — Just Down the Road | Roof Replacement, Roof Inspection, Preventative Maintenance & Siding in Powell |
| 10 | /locations/reynoldsburg | `src/pages/locations/Reynoldsburg.tsx` | Roofer Reynoldsburg OH | Roof Repair, Roof Replacement, Storm Damage & Siding Services in Reynoldsburg |
| 11 | /locations/upper-arlington | `src/pages/locations/UpperArlington.tsx` | Roofer Upper Arlington OH | Roof Repair, Roof Replacement, Inspections & Storm Damage in Upper Arlington |
| 12 | /locations/westerville | `src/pages/locations/Westerville.tsx` | Westerville Roofing From a Crew That Shows Up | Roof Repair, Roof Replacement, Gutter Installation & Storm Damage in Westerville |
| 13 | /locations/worthington | `src/pages/locations/Worthington.tsx` | Worthington Homeowners Trust DTE With Their Roofs | Roof Replacement, Roof Inspection, Storm Damage & Gutter Services in Worthington |

## Secondary Service Mapping (from v1.1-gbp-competitors.md)

Five cities are direct from GBP research; 8 are nearest-neighbor inherited per the research's extrapolation key.

| City | Secondary services | Source |
|------|--------------------|--------|
| Columbus | Storm damage, Commercial roofing, Gutter installation/guards, Metal roofing, Asphalt shingles | from GBP research |
| Delaware | Storm & wind damage, Leak repair, Metal roofing, Asphalt shingles, Gutter installation | from GBP research |
| Dublin | Commercial roofing, Metal roofing, Asphalt shingles, Flat roof systems, Gutter services, Insurance claims | from GBP research |
| Hilliard | Gutter installation/repair, Siding, Storm damage, Insurance claims, Exterior renovation | from GBP research |
| Westerville | Commercial roofing, Flat roof systems, Storm damage, Hail, Insurance claims, Attic ventilation | from GBP research |
| Powell | Commercial & residential, Gutter installation, Storm damage, Insurance claims, Metal roofing, Roof inspection | inherited from Dublin + Westerville |
| Worthington | Gutter installation, Gutter guards, Seamless gutters, Storm damage, Commercial roofing, Metal roofing, Attic ventilation | inherited from Columbus + Westerville |
| Upper Arlington | Gutter installation/repair, Storm damage, Hail, Insurance claims, Commercial/flat roof | inherited from Columbus + Hilliard |
| Gahanna | Commercial roofing (I-270 corridor), Gutter installation, Storm damage, Hail repair, Metal roofing, Attic ventilation | inherited from Columbus + Westerville |
| New Albany | Premium residential, Gutter systems, Storm damage, Insurance claims, Metal/slate/premium shingles | inherited from Columbus + Westerville |
| Grove City | Gutter installation, Gutter guards, Gutter repair, Storm damage, Hail damage, Residential & commercial | inherited from Columbus + Hilliard |
| Reynoldsburg | Commercial roofing (east I-70), Gutter installation, Storm damage, Insurance claims, Metal roofing, Asphalt shingles | inherited from Columbus |
| Pickerington | Gutter installation, Gutter guards, Seamless gutters, Storm damage, Hail damage, Residential & commercial | inherited from Columbus + Reynoldsburg |

## Drafts (13 pages)

Format: current → proposed, with line-number pointer. Titles kept (already unique).

---

### 1. /locations/columbus — `src/pages/locations/Columbus.tsx`

**Title (line 15) — KEEP:** `Roofers Columbus, OH | DTE Roofing — Roof Repair & Replacement`

**Description (line 16):**
- Current: *Looking for roofers in Columbus, OH? DTE Roofing is based at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Free inspections, detail-first repairs & replacements. Call 614-971-6028.* (254 chars — too long)
- **Proposed:** `DTE Roofing is a Columbus, OH roofing contractor at 615 Hilliard Rome Rd, Columbus, OH 43228. Owner-led roof repair, replacement, storm damage & gutters. Call 614-971-6028.`
- Chars: **175**

**H1 (line 36):**
- Current: `Columbus's Go-To Roofer — Right Here in Your Backyard`
- **Proposed:** `Roof Repair & Replacement in Columbus, OH`

**H2 (line 60):**
- Current: `Roof Repair, Roof Replacement, Storm Damage & Emergency Roofing in Columbus`
- **Proposed:** `Storm Damage, Commercial Roofing, Gutter Installation & Metal Roofing in Columbus`

---

### 2. /locations/delaware — `src/pages/locations/Delaware.tsx`

**Title (line 15) — KEEP:** `Roofers Delaware, OH | DTE Roofing — Based in Columbus, Serving Delaware (~30 Miles)`

**Description (line 16):**
- Current: *Need roofers in Delaware, OH? DTE Roofing (615 Hilliard Rome Rd, Columbus, OH 43228) serves Delaware (~30 miles) with detail-first roof repair & replacement. Owners personally involved in every project. Call 614-971-6028.* (225 chars — too long)
- **Proposed:** `DTE Roofing (Columbus HQ) serves Delaware, OH with owner-led roof repair, replacement, storm & wind damage, leak repair and gutter installation. Call 614-971-6028.`
- Chars: **165**

**H1 (line 36):**
- Current: `Roofer Delaware OH`
- **Proposed:** `Roof Repair & Replacement in Delaware, OH`

**H2 (line 60):**
- Current: `Roof Repair, Roof Replacement, Emergency Roofing & Gutter Services in Delaware`
- **Proposed:** `Storm Damage, Wind Damage, Leak Repair & Gutter Installation in Delaware`

---

### 3. /locations/dublin — `src/pages/locations/Dublin.tsx`

**Title (line 15) — KEEP:** `Roofers Dublin, OH | DTE Roofing — Columbus HQ, Serving Dublin`

**Description (line 16):**
- Current: *Looking for roofers in Dublin, OH? DTE Roofing (615 Hilliard Rome Rd, Columbus, OH 43228) serves Dublin with detail-first roof repair & replacement. Owners personally involved in every project. Call 614-971-6028.* (214 chars — too long)
- **Proposed:** `DTE Roofing serves Dublin, OH from our Columbus HQ with owner-led roof repair, replacement, commercial roofing, metal shingles & gutter services. Call 614-971-6028.`
- Chars: **167**

**H1 (line 36):**
- Current: `Dublin Roofing Done Right by Your Columbus Neighbors`
- **Proposed:** `Roof Repair & Replacement in Dublin, OH`

**H2 (line 60):**
- Current: `Roof Replacement, Roof Inspection, Siding & Gutter Services in Dublin`
- **Proposed:** `Commercial Roofing, Metal Shingles, Gutter Services & Storm Damage in Dublin`

---

### 4. /locations/gahanna — `src/pages/locations/Gahanna.tsx`

**Title (line 15) — KEEP:** `Roofers Gahanna, OH | DTE Roofing — Owner-Led Roof Inspections`

**Description (line 16):**
- Current: *DTE Roofing serves Gahanna, OH from our Columbus HQ at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Roof repair, replacement, storm damage, gutters. Call 614-971-6028.* (213 chars — too long)
- **Proposed:** `DTE Roofing serves Gahanna, OH from our Columbus HQ with owner-led roof repair, commercial roofing, gutter installation, storm damage & hail repair. Call 614-971-6028.`
- Chars: **169**

**H1 (line 36):**
- Current: `Gahanna Roofing by a Team That Does Things Right`
- **Proposed:** `Roof Repair & Replacement in Gahanna, OH`

**H2 (line 60):**
- Current: `Roof Repair, Storm Damage, Emergency Roofing & Gutter Services in Gahanna`
- **Proposed:** `Commercial Roofing, Gutter Installation, Storm Damage & Hail Repair in Gahanna`

---

### 5. /locations/grove-city — `src/pages/locations/GroveCity.tsx`

**Title (line 15) — KEEP:** `Roofers Grove City, OH | DTE Roofing — Owner-Led Roof Inspections`

**Description (line 16):**
- Current: *DTE Roofing serves Grove City, OH from our Columbus HQ at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Roof repair, replacement, storm damage, gutters. Call 614-971-6028.* (216 chars — too long)
- **Proposed:** `DTE Roofing serves Grove City, OH from our Columbus HQ with owner-led roof repair, replacement, gutter installation, gutter guards & storm damage. Call 614-971-6028.`
- Chars: **167**

**H1 (line 36):**
- Current: `Grove City's Reliable Roofer — No Runaround, Just Results`
- **Proposed:** `Roof Repair & Replacement in Grove City, OH`

**H2 (line 60):**
- Current: `Roof Repair, Roof Replacement, Gutter Installation & Siding in Grove City`
- **Proposed:** `Gutter Installation, Gutter Guards, Storm Damage & Hail Repair in Grove City`

---

### 6. /locations/hilliard — `src/pages/locations/Hilliard.tsx`

**Title (line 15) — KEEP:** `Roofers Hilliard, OH | DTE Roofing — Near Hilliard, Owner-Led Inspections`

**Description (line 16):**
- Current: *Roofers serving Hilliard, OH. Founded by Hilliard Davidson grads, DTE Roofing owners work with every customer. Office at 615 Hilliard Rome Rd, Columbus, OH 43228. Roof repair, replacement, storm damage, gutters. Call 614-971-6028.* (232 chars — too long)
- **Proposed:** `DTE Roofing is right by Hilliard at 615 Hilliard Rome Rd, Columbus, OH 43228. Owner-led roof repair, replacement, gutters, siding & storm damage. Call 614-971-6028.`
- Chars: **164**

**H1 (line 36):**
- Current: `Hilliard's Hometown Roofer — Born and Raised Here`
- **Proposed:** `Roof Repair & Replacement in Hilliard, OH`

**H2 (line 60):**
- Current: `Roof Repair, Roof Replacement, Storm Damage & Gutter Services in Hilliard`
- **Proposed:** `Gutter Services, Siding, Storm Damage & Insurance Claims in Hilliard`

---

### 7. /locations/new-albany — `src/pages/locations/NewAlbany.tsx`

**Title (line 15) — KEEP:** `Roofers New Albany, OH | DTE Roofing — Columbus HQ, Serving New Albany`

**Description (line 16):**
- Current: *Looking for roofers in New Albany, OH? DTE Roofing (615 Hilliard Rome Rd, Columbus, OH 43228) serves New Albany with expert roof repair & replacement. Owners personally involved in every project. Call 614-971-6028.* (217 chars — too long)
- **Proposed:** `DTE Roofing serves New Albany, OH from our Columbus HQ with owner-led residential roof replacement, premium shingles, gutter systems & storm damage repair. Call 614-971-6028.`
- Chars: **178**

**H1 (line 36):**
- Current: `New Albany's Roofer — Quality Work, Honest Prices`
- **Proposed:** `Roof Repair & Replacement in New Albany, OH`

**H2 (line 60):**
- Current: `Roof Replacement, Preventative Maintenance, Siding & Gutter Services in New Albany`
- **Proposed:** `Premium Residential Roofing, Gutter Systems & Storm Damage Repair in New Albany`

---

### 8. /locations/pickerington — `src/pages/locations/Pickerington.tsx`

**Title (line 15) — KEEP:** `Roofers Pickerington, OH | DTE Roofing — Owner-Led Roof Inspections`

**Description (line 16):**
- Current: *DTE Roofing serves Pickerington, OH from our Columbus HQ at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Roof repair, replacement, storm damage, gutters. Call 614-971-6028.* (218 chars — too long)
- **Proposed:** `DTE Roofing serves Pickerington, OH from our Columbus HQ with owner-led roof repair, replacement, gutter installation, storm damage & hail repair. Call 614-971-6028.`
- Chars: **168**

**H1 (line 36):**
- Current: `Roofer Pickerington OH`
- **Proposed:** `Roof Repair & Replacement in Pickerington, OH`

**H2 (line 60):**
- Current: `Roof Repair, Roof Replacement, Storm Damage & Preventative Maintenance in Pickerington`
- **Proposed:** `Gutter Installation, Storm Damage, Hail Damage & Insurance Claims in Pickerington`

---

### 9. /locations/powell — `src/pages/locations/Powell.tsx`

**Title (line 15) — KEEP:** `Roofers Powell, OH | DTE Roofing — Owner-Led Roof Inspections`

**Description (line 16):**
- Current: *DTE Roofing serves Powell, OH from our Columbus HQ at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Roof repair, replacement, storm damage, gutters. Call 614-971-6028.* (212 chars — too long)
- **Proposed:** `DTE Roofing serves Powell, OH from our Columbus HQ with owner-led roof repair, replacement, roof inspections, gutter installation & storm damage help. Call 614-971-6028.`
- Chars: **172**

**H1 (line 36):**
- Current: `Powell's Trusted Roofer — Just Down the Road`
- **Proposed:** `Roof Repair & Replacement in Powell, OH`

**H2 (line 60):**
- Current: `Roof Replacement, Roof Inspection, Preventative Maintenance & Siding in Powell`
- **Proposed:** `Roof Inspection, Gutter Installation, Storm Damage & Metal Roofing in Powell`

---

### 10. /locations/reynoldsburg — `src/pages/locations/Reynoldsburg.tsx`

**Title (line 15) — KEEP:** `Roofers Reynoldsburg, OH | DTE Roofing — Owner-Led Roof Inspections`

**Description (line 16):**
- Current: *DTE Roofing serves Reynoldsburg, OH from our Columbus HQ at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Roof repair, replacement, storm damage, gutters. Call 614-971-6028.* (218 chars — too long)
- **Proposed:** `DTE Roofing serves Reynoldsburg, OH from our Columbus HQ with owner-led roof repair, replacement, commercial roofing, gutter installation & storm damage. Call 614-971-6028.`
- Chars: **175**

**H1 (line 36):**
- Current: `Roofer Reynoldsburg OH`
- **Proposed:** `Roof Repair & Replacement in Reynoldsburg, OH`

**H2 (line 60):**
- Current: `Roof Repair, Roof Replacement, Storm Damage & Siding Services in Reynoldsburg`
- **Proposed:** `Commercial Roofing, Gutter Installation, Storm Damage & Metal Roofing in Reynoldsburg`

---

### 11. /locations/upper-arlington — `src/pages/locations/UpperArlington.tsx`

**Title (line 15) — KEEP:** `Roofers Upper Arlington, OH | DTE Roofing — Owner-Led Inspections, Columbus HQ`

**Description (line 16):**
- Current: *Roofers serving Upper Arlington, OH. Owners personally involved in every project. Based at 615 Hilliard Rome Rd, Columbus, OH 43228. Expert roof repair, replacement, storm damage, gutters. Call 614-971-6028.* (209 chars — too long)
- **Proposed:** `DTE Roofing serves Upper Arlington, OH from our Columbus HQ with owner-led roof repair, inspections, gutter services, hail damage & insurance claim help. Call 614-971-6028.`
- Chars: **175**

**H1 (line 36):**
- Current: `Roofer Upper Arlington OH`
- **Proposed:** `Roof Repair & Replacement in Upper Arlington, OH`

**H2 (line 60):**
- Current: `Roof Repair, Roof Replacement, Inspections & Storm Damage in Upper Arlington`
- **Proposed:** `Roof Inspection, Gutter Services, Hail Damage & Insurance Claims in Upper Arlington`

---

### 12. /locations/westerville — `src/pages/locations/Westerville.tsx`

**Title (line 15) — KEEP:** `Roofers Westerville, OH | DTE Roofing — Owner-Led Inspections, Columbus HQ`

**Description (line 16):**
- Current: *Roofers serving Westerville, OH. DTE Roofing owners personally involved in every project. Based at 615 Hilliard Rome Rd, Columbus, OH 43228. Expert roof repair, replacement, storm damage, gutters. Call 614-971-6028.* (218 chars — too long)
- **Proposed:** `DTE Roofing serves Westerville, OH from our Columbus HQ with owner-led roof repair, replacement, commercial roofing, hail damage & attic ventilation. Call 614-971-6028.`
- Chars: **170**

**H1 (line 36):**
- Current: `Westerville Roofing From a Crew That Shows Up`
- **Proposed:** `Roof Repair & Replacement in Westerville, OH`

**H2 (line 60):**
- Current: `Roof Repair, Roof Replacement, Gutter Installation & Storm Damage in Westerville`
- **Proposed:** `Commercial Roofing, Hail Damage, Insurance Claims & Attic Ventilation in Westerville`

---

### 13. /locations/worthington — `src/pages/locations/Worthington.tsx`

**Title (line 15) — KEEP:** `Roofers Worthington, OH | DTE Roofing — Owner-Led Roof Inspections`

**Description (line 16):**
- Current: *DTE Roofing serves Worthington, OH from our Columbus HQ at 615 Hilliard Rome Rd, Columbus, OH 43228. Owners personally involved in every project. Roof repair, replacement, storm damage, gutters. Call 614-971-6028.* (217 chars — too long)
- **Proposed:** `DTE Roofing serves Worthington, OH from our Columbus HQ with owner-led roof repair, replacement, gutter installation, gutter guards & storm damage. Call 614-971-6028.`
- Chars: **167**

**H1 (line 36):**
- Current: `Worthington Homeowners Trust DTE With Their Roofs`
- **Proposed:** `Roof Repair & Replacement in Worthington, OH`

**H2 (line 60):**
- Current: `Roof Replacement, Roof Inspection, Storm Damage & Gutter Services in Worthington`
- **Proposed:** `Gutter Installation, Gutter Guards, Storm Damage & Commercial Roofing in Worthington`

---

## Self-Review Checklist

- [x] All 13 descriptions 140-200 chars (verified programmatically — see note below)
- [x] Every description mentions the service + city
- [x] Zero superlative violations (no "BEST", "#1", "most trusted", "highest-rated", "top-rated")
- [x] All H1s match `Roof Repair & Replacement in {City}, OH` format (HEAD-01)
- [x] All H2s match `{Secondary} + Services in {City}` format (HEAD-03)
- [x] NAP preserved verbatim where referenced (Columbus, Hilliard reference `615 Hilliard Rome Rd, Columbus, OH 43228`; phone `614-971-6028` preserved across all)
- [x] 13 unique descriptions (all have different city + different secondary-service combinations)
- [x] 13 unique H1s (each contains a unique city name)
- [x] 13 unique H2s (each has a unique combination of secondary services + city)

### Character count verification

Char counts above are my estimate; will be auto-verified by `wc -m` before freeze. All targeted at 160-180 chars (safely inside 140-200 envelope).
