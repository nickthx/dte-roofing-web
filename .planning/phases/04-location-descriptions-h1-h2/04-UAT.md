---
status: testing
phase: 04-location-descriptions-h1-h2
source:
  - 04-02-SUMMARY.md
started: 2026-04-09T21:45:00.000Z
updated: 2026-04-09T21:45:00.000Z
---

## Current Test

number: 1
name: Location H1 — Primary Service + City format
expected: |
  Visit /locations/columbus (and any 1-2 other cities). The page H1 shows the primary
  roofing service followed by the city name (e.g., "Roof Replacement in Columbus"),
  matching the approved copy in 04-COPY-APPROVED.md.
awaiting: user response

## Tests

### 1. Location H1 — Primary Service + City format
expected: Visit /locations/columbus and 1-2 others. H1 reads "Primary Service + City" per approved copy.
result: [pending]

### 2. Location H2 — Secondary services list
expected: Same pages show an H2 listing the city-specific secondary services from the approved packet.
result: [pending]

### 3. Unique meta descriptions per city
expected: View-source on 2-3 location pages shows distinct <meta name="description"> text (140-200 chars), matching approved copy — no duplicates across cities.
result: [pending]

### 4. No superlatives in visible copy
expected: Scan any 2-3 location pages. No "best", "#1", "most trusted", "highest-rated" wording in H1/H2/description.
result: [pending]

### 5. Sitemap lastmod reflects update
expected: /sitemap.xml loads and the 13 /locations/* entries show today's lastmod date.
result: [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0

## Gaps

[none yet]
