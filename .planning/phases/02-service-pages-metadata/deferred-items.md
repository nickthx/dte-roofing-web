# Deferred Items — Phase 02-02 Execution

Pre-existing lint and typecheck errors in unrelated files discovered during Phase 02-02 verification. Per scope boundary rule, these are NOT auto-fixed because they are not caused by the plan's edits (confirmed via `git stash && npm run lint` on pre-edit state — identical error set).

## Pre-existing lint errors (npm run lint exit 1)

1. `src/components/seo/SeoSchema.tsx:4:26` — `@typescript-eslint/no-explicit-any` — Unexpected any
2. `src/hooks/useLeadTracking.ts:85:3` — `react-hooks/rules-of-hooks` — useEffect called conditionally after early return
3. `src/pages/About.tsx:2:30` — `@typescript-eslint/no-unused-vars` — 'Users' imported but never used
4. `src/pages/Gallery.tsx:69:39` — `react-hooks/exhaustive-deps` — ref cleanup warning
5. `src/pages/Reviews.tsx:56:9` — `@typescript-eslint/no-unused-vars` — 'fiveStarPercentage' unused
6. `src/pages/services/EmergencyServices.tsx:2:23` — `@typescript-eslint/no-unused-vars` — 'ArrowRight' unused (pre-existing; EmergencyServices never used ArrowRight in the pre-edit state)

## Pre-existing typecheck errors (npm run typecheck exit 2)

1. `src/components/ServiceAreaMap.tsx:31, 52, 57, 81, 82, 88, 93, 105` — Missing `google` global / namespace (Google Maps type definitions not installed)
2. `src/components/ServicePageTemplate.tsx:34` — TS6133 'serviceName' unused
3. `src/entry-server.tsx:4` — TS2305 'FilledContext' not exported from react-helmet-async (library type drift)
4. `src/pages/About.tsx:2` — TS6133 'Users' unused
5. `src/pages/Reviews.tsx:56` — TS6133 'fiveStarPercentage' unused
6. `src/pages/services/EmergencyServices.tsx:2` — TS6133 'ArrowRight' unused
7. `src/pages/services/RoofRepair.tsx:27` — TS2322 Type 'Element' not assignable to 'string' (pre-existing; RoofRepair is deferred to Phase 3a per D-01)

## Verification that these are pre-existing

Running `git stash && npm run lint` on the pre-edit state returned identical output: `✖ 8 problems (7 errors, 1 warning)`. These were introduced before Phase 02 started and are tracked in a separate hygiene backlog.

## Recommendation

Create a dedicated cleanup plan (suggest Phase 5 or a standalone lint-hygiene plan) to address these. Do NOT attach them to Phase 02 which is scoped to service page metadata only.
