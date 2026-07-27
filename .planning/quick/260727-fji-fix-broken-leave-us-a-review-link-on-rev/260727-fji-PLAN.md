---
phase: quick-260727-fji
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/pages/Reviews.tsx
autonomous: true
requirements: [QUICK-FJI-01]

must_haves:
  truths:
    - "The 'Leave Us a Review' button on /reviews opens Google's write-a-review dialog for DTE Roofing instead of redirecting to the Google homepage"
    - "The adjacent 'Read All Google Reviews' button still points at the same working Google Maps place URL"
    - "Button text, icon, styling, and target/rel attributes are unchanged"
  artifacts:
    - path: "src/pages/Reviews.tsx"
      provides: "Google Reviews CTA section with a working review-submission link"
      contains: "search.google.com/local/writereview?placeid=ChIJvyCPVMOXOIgRQ898TY2hHd0"
  key_links:
    - from: "src/pages/Reviews.tsx"
      to: "search.google.com/local/writereview"
      via: "anchor href on the 'Leave Us a Review' button"
      pattern: "search\\.google\\.com/local/writereview\\?placeid=ChIJvyCPVMOXOIgRQ898TY2hHd0"
---

<objective>
Fix the broken "Leave Us a Review" outbound link on the /reviews page.

Purpose: The current `https://g.page/r/CUPMfU2NGh3dEBM/review` short code has transposed
characters — it base64-decodes to CID `0xdd1d1a8d4d7dcc43`, while the business's real CID
(from the WORKING Maps link at line 216 of the same file, ftid
`0x883897c3548f20bf:0xdd1da18d4d7ccf43`) is `0xdd1da18d4d7ccf43`. Google can't resolve the
place and silently redirects to the Google homepage, so every customer who clicks
"Leave Us a Review" lands nowhere. Review velocity is already a flagged concern.

Output: One `href` value changed in `src/pages/Reviews.tsx`.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/pages/Reviews.tsx

<interfaces>
<!-- Diagnosis is complete. Do NOT re-investigate the CID/place-ID derivation. -->

Current (broken), src/pages/Reviews.tsx line 226:
  href="https://g.page/r/CUPMfU2NGh3dEBM/review"

Replacement (verified: curl follows it to Google sign-in with a continue-back to the
writereview dialog — expected behavior for a valid place while signed out):
  href="https://search.google.com/local/writereview?placeid=ChIJvyCPVMOXOIgRQ898TY2hHd0"

The place ID `ChIJvyCPVMOXOIgRQ898TY2hHd0` was deterministically derived (protobuf +
base64 encoding, verified) from the two hex IDs in the working Maps link on line 216 of
the same file. Line 216 must NOT be modified.
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Replace the broken g.page review href with Google's canonical writereview URL</name>
  <files>src/pages/Reviews.tsx</files>
  <action>
In the "Google Reviews CTA Section", locate the second anchor (the one whose visible text is
"Leave Us a Review", currently at line 226). Change ONLY its `href` value from
`https://g.page/r/CUPMfU2NGh3dEBM/review` to
`https://search.google.com/local/writereview?placeid=ChIJvyCPVMOXOIgRQ898TY2hHd0`.

Do not touch anything else on that anchor: keep `target="_blank"`, keep
`rel="noopener noreferrer"`, keep the `className` string byte-for-byte, keep the
"Leave Us a Review" text and the `<MessageCircle className="ml-2 w-5 h-5" />` icon.

Do not modify the first anchor (line 216, "Read All {totalReviews} Google Reviews") — that
Maps URL works and is the source of truth the place ID was derived from. Do not modify any
other file; no other file in the repo references `g.page` or `writereview`. No content,
URL/slug, or NAP changes are involved — this is an outbound href correction only.
  </action>
  <verify>
    <automated>cd "$CLAUDE_PROJECT_DIR" && grep -c 'search\.google\.com/local/writereview?placeid=ChIJvyCPVMOXOIgRQ898TY2hHd0' src/pages/Reviews.tsx && ! grep -rq 'g\.page' src/ && grep -q '0x883897c3548f20bf:0xdd1da18d4d7ccf43' src/pages/Reviews.tsx && npm run build</automated>
  </verify>
  <done>
`src/pages/Reviews.tsx` contains exactly one `search.google.com/local/writereview?placeid=ChIJvyCPVMOXOIgRQ898TY2hHd0`
href; zero occurrences of `g.page` remain anywhere under `src/`; the working Maps link
(ftid `0x883897c3548f20bf:0xdd1da18d4d7ccf43`) is still present and unchanged; and
`npm run build` completes successfully.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| app → third-party (google.com) | User is navigated off-site to a Google-hosted URL |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-fji-01 | Tampering | "Leave Us a Review" anchor destination | mitigate | Destination is a hardcoded literal on a Google-owned host (`search.google.com`), not user- or data-derived; no interpolation, no query params from state |
| T-fji-02 | Information Disclosure | `target="_blank"` reverse-tabnabbing / referrer leak | mitigate | `rel="noopener noreferrer"` is preserved verbatim on the anchor |
| T-fji-SC | Tampering | npm/pip/cargo installs | accept | No dependency changes — this plan installs nothing |
</threat_model>

<verification>
1. `npm run build` succeeds (41 routes prerendered). Per project memory, `npm run typecheck`
   and `npm run lint` are pre-existing red and are NOT gates.
2. Grep the prerendered output for the corrected link. Caution: `dist/*.html` is emitted as a
   single line, so `grep -c` on it is unreliable — use `grep -o ... | wc -l` instead:
   `grep -o 'search.google.com/local/writereview' dist/reviews/index.html | wc -l` returns ≥ 1.
3. `grep -o 'g.page' dist/reviews/index.html | wc -l` returns 0.
</verification>

<success_criteria>
- Clicking "Leave Us a Review" on /reviews opens Google's write-a-review flow for DTE Roofing
  (or Google sign-in with a continue-back to it), never the Google homepage.
- Exactly one line of source changed; no visual, copy, URL/slug, or NAP change.
- `npm run build` clean.
</success_criteria>

<output>
Create `.planning/quick/260727-fji-fix-broken-leave-us-a-review-link-on-rev/260727-fji-SUMMARY.md` when done
</output>
