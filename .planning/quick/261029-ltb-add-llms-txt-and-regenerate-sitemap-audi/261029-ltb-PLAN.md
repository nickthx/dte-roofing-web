---
phase: quick-261029-ltb
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - public/llms.txt
  - public/sitemap.xml
autonomous: true
requirements: [QUICK-261029-ltb]

must_haves:
  truths:
    - "After `npm run build`, dist/llms.txt exists and is byte-identical to public/llms.txt, which is byte-identical to the approved draft (3231 bytes, LF, ASCII)"
    - "public/sitemap.xml still has exactly 41 <loc> entries and the only lines that differ from the previous commit are <lastmod> lines"
    - "The six city pages rewritten on 2026-10-13 (columbus, reynoldsburg, grove-city, pickerington, gahanna, dublin) have <lastmod>2026-10-13</lastmod>"
    - "No <lastmod> in public/sitemap.xml equals 2026-10-29 (today), which proves every route resolved its date from git log, not the mtime/build-time fallback"
    - "`npm run verify-schema` prints a summary line with `fail 0`"
    - "Exactly one new local commit on main contains exactly public/llms.txt and public/sitemap.xml, and it is NOT pushed"
  artifacts:
    - path: "public/llms.txt"
      provides: "Approved llms.txt served at https://www.dteroofingllc.com/llms.txt"
      contains: "# DTE Roofing"
    - path: "public/sitemap.xml"
      provides: "Sitemap with lastmod values regenerated from per-route git history"
      contains: "<loc>https://www.dteroofingllc.com/locations/columbus</loc>"
  key_links:
    - from: "public/llms.txt"
      to: "dist/llms.txt"
      via: "Vite copies public/ into dist/ verbatim during the client build"
      pattern: "llms.txt"
    - from: "scripts/generate-sitemap.mjs"
      to: "src/routes.config.mjs"
      via: "ROUTES[].source -> git log -1 --format=%cI per route"
      pattern: "lastmodFor\\(r\\.source\\)"
---

<objective>
Quick task 261029-ltb, audit fix 4 from the 2026-10-29 search/AI-visibility audit. One task, one code commit, two files.

1. Publish the approved `llms.txt` at `/llms.txt` (it currently returns 404) by copying the final draft verbatim into `public/llms.txt`.
2. Refresh the stale `lastmod` dates in the committed `public/sitemap.xml`. Production serves the committed file because `scripts/generate-sitemap.mjs` exits early when `VERCEL === '1'`. The team habit of running `git restore public/sitemap.xml` after every build froze the June dates, so city pages rewritten on 2026-10-13 still say 2026-06-06 / 2026-06-30.

Purpose: give AI crawlers a clean, accurate summary of the business, and give search engines correct change dates for the rewritten pages.
Output: `public/llms.txt` (new), `public/sitemap.xml` (regenerated), and one local commit. The commit is not pushed.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@./CLAUDE.md
@scripts/generate-sitemap.mjs

## Executor rules (easy to break)
- You run on the MAIN working tree (no worktree). Do not switch branches, stash, reset, or run `git add -A` / `git add .`. Never stage `.claude/settings.local.json`, any untracked root draft file, or anything under `dist/`.
- `npm run build` is the verification gate. `npm run typecheck` and `npm run lint` are already red on main and are NOT part of this task. Do not try to fix them.
- Approved draft, absolute path: `C:/Users/geoca/AppData/Local/Temp/claude/C--Users-geoca-OneDrive-Desktop-dte-roofing-web/1303c715-9c9b-450c-81bf-27d8402e1399/scratchpad/llms-draft.txt` (3231 bytes, ASCII, LF line endings). This path is in a session scratchpad. If it does not exist when you start, STOP and report. Never retype or reconstruct the draft from memory. The wording is final and must not drift by one character.
- Line endings: `core.autocrlf=true`. The index stores LF and the working tree has CRLF (`git ls-files --eol public/sitemap.xml` shows `i/lf w/crlf`). The generator writes LF, and the draft is LF. Leave both as they are. Do not run dos2unix/unix2dos, do not open either file in an editor, and do not use the Write/Edit tools on them. Git prints "LF will be replaced by CRLF the next time Git touches it" when you add them. That warning is harmless; ignore it.
- `npm run verify-schema` reads `dist/`, so run it only after the build. Its summary line looks like `checked N, pass P, fail F, skip S`. Only `fail` > 0 blocks. Pass and skip counts may differ from older baselines.

## Expected sitemap diff (predicted at plan time from `git log -1 --format=%cI -- <route source>` for all 41 routes)
All 41 `<lastmod>` lines are expected to change. That is NOT a failure. Quick task 261013-hp7 touched nearly every page source on 2026-10-13, and the committed file still holds May/June/July dates. Expected new values:
- `2026-10-02`: `/services`, `/gallery`, `/faq`, `/locations`
- `2026-10-27`: `/financing` (honeypot commit)
- `2026-10-13`: every other route (36 of them), including all 13 `/locations/<city>` pages, `/`, `/about`, the 10 service pages, `/reviews`, `/blog` and the 7 posts, `/contact`, and `/get-a-quote-consultation`
- `2026-10-29`: NONE. No route source has a commit dated today, so a `2026-10-29` value means the git lookup failed and the mtime/build-time fallback fired.

If a route's new value differs from this table but is NOT 2026-10-29, run `git log -1 --format=%cI -- <that route's source from src/routes.config.mjs>`. If the sitemap value matches git's date, accept it and record it in the SUMMARY.
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add public/llms.txt, regenerate and COMMIT public/sitemap.xml, verify, single local commit</name>
  <files>public/llms.txt, public/sitemap.xml</files>
  <action>
Work in Git Bash from `/c/Users/geoca/OneDrive/Desktop/dte-roofing-web`. Do the steps in order and stop at the first failed gate.

Step 1, preflight. Confirm the draft file exists at the absolute path in the context section. If it is missing, STOP and report. Confirm `public/llms.txt` does not exist yet. Confirm `git status --porcelain public/` prints nothing, so the sitemap starts clean. Save the full `git status --porcelain` output to the session scratchpad as a baseline (it should show only ` M .claude/settings.local.json`, plus any untracked root drafts).

Step 2, copy the draft verbatim. Use `cp` (not the Write tool, so the bytes are preserved exactly) to copy the draft to `public/llms.txt`. Then `cmp` the draft against `public/llms.txt`, which must print nothing and exit 0, and confirm `wc -c < public/llms.txt` is 3231. Do not add, remove, or reword anything. It intentionally has no review count (n8n bumps that weekly) and no pricing (a price conflict is still open).

Step 3, build. Run `npm run build`. It must exit 0. The build runs `npm run generate-sitemap` first, so a separate generate-sitemap run is optional. Locally `VERCEL` is unset, so the generator really runs and rewrites `public/sitemap.xml` from per-route git history.

Step 4, the sitemap exception. This task is the ONE exception to the usual rule of restoring the sitemap after a build. Here the regenerated `public/sitemap.xml` IS the deliverable and must be committed. Do NOT run `git restore public/sitemap.xml` or `git checkout -- public/sitemap.xml`.

Step 5, pre-commit gates (all must pass):
(a) `cmp public/llms.txt dist/llms.txt` exits 0.
(b) `git diff public/sitemap.xml` shows lastmod moving forward. The six cities columbus, reynoldsburg, grove-city, pickerington, gahanna, and dublin must now read `<lastmod>2026-10-13</lastmod>`. Compare the other routes against the "Expected sitemap diff" table in the context section. HARD STOP: if `grep -c '<lastmod>2026-10-29</lastmod>' public/sitemap.xml` is not 0 (and especially if every URL now reads 2026-10-29), the route-to-source mapping or git lookup is broken. Do NOT commit. Report the output and leave the working tree as it is for the user.
(c) `grep -c '<loc>' public/sitemap.xml` is 41, and `git diff -U0 public/sitemap.xml | grep -E '^[+-] ' | grep -v '<lastmod>'` prints nothing. That proves no `<loc>`, changefreq, or priority line was added, removed, or changed.
(d) `npm run verify-schema` prints a summary line containing `fail 0`.
(e) `npm run build` exited 0 in step 3.
(f) Cleanliness: compared with the step-1 baseline, `git status --porcelain` shows exactly two new entries, ` M public/sitemap.xml` and `?? public/llms.txt`. If anything else changed (for example a tracked file under src/ or scripts/), STOP and investigate. Do not commit.

Step 6, commit. Stage by explicit path only: `git add public/llms.txt public/sitemap.xml`. Ignore the LF/CRLF warning. Confirm `git diff --cached --name-only` lists exactly those two files. Commit with repeated `-m` flags (no heredoc). Subject: `feat(seo): add llms.txt and refresh sitemap lastmod (quick-261029-ltb)`. Body: one short paragraph saying /llms.txt was a 404 and the sitemap lastmod values were frozen at June because of the post-build restore habit, then list the six city pages now at 2026-10-13. Final line, as its own `-m`: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Do not use `--no-verify` or `--amend`.

Step 7, do NOT push. A push to main is a live production deploy on Vercel (project "dte-roofing-demo" serves dteroofingllc.com), and the user approves that separately. Leave `dist/` as built. Do not touch any page content, URLs, NAP, schema, `scripts/schema-baseline.json`, `robots.txt`, or any other file.

Step 8, write the SUMMARY (see output section). Do NOT include it in the code commit.
  </action>
  <verify>
    <automated>cd /c/Users/geoca/OneDrive/Desktop/dte-roofing-web && D="C:/Users/geoca/AppData/Local/Temp/claude/C--Users-geoca-OneDrive-Desktop-dte-roofing-web/1303c715-9c9b-450c-81bf-27d8402e1399/scratchpad/llms-draft.txt" && cmp "$D" public/llms.txt && cmp public/llms.txt dist/llms.txt && test "$(wc -c < public/llms.txt)" -eq 3231 && test "$(grep -c '<loc>' public/sitemap.xml)" -eq 41 && test "$(grep -c '<lastmod>2026-10-29</lastmod>' public/sitemap.xml)" -eq 0 && for s in columbus reynoldsburg grove-city pickerington gahanna dublin; do grep -A1 "<loc>https://www.dteroofingllc.com/locations/$s</loc>" public/sitemap.xml | grep -q '<lastmod>2026-10-13</lastmod>' || { echo "FAIL city $s"; exit 1; }; done && C=$(git log -1 --format=%H -- public/llms.txt) && test -n "$C" && test -z "$(git diff -U0 "$C~1" "$C" -- public/sitemap.xml | grep -E '^[+-] ' | grep -v '<lastmod>')" && test "$(git show --name-only --format= "$C" | sort | tr '\n' ' ')" = "public/llms.txt public/sitemap.xml " && test -z "$(git status --porcelain public/)" && test "$(git rev-list --count origin/main.."$C")" -ge 1 && npm run verify-schema 2>&1 | grep -qE 'checked [0-9]+, pass [0-9]+, fail 0, skip [0-9]+' && echo ALL-CHECKS-PASS</automated>
  </verify>
  <done>
The verify chain prints `ALL-CHECKS-PASS`: public/llms.txt is byte-identical to the draft and to dist/llms.txt (3231 bytes). The sitemap has 41 locs, zero 2026-10-29 values, and all six rewritten cities at 2026-10-13. HEAD changes only lastmod lines in the sitemap, and HEAD contains exactly public/llms.txt and public/sitemap.xml. public/ is clean. HEAD is ahead of origin/main (not pushed). verify-schema reports fail 0.
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| repo -> public web (Vercel static) | public/llms.txt and public/sitemap.xml are published verbatim to anonymous crawlers |
| local git history -> sitemap | lastmod values come from local `git log`, and the committed file is what production serves |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-261029-01 | Information disclosure | public/llms.txt | accept | Republishes only NAP, hours, and URLs already public on the live site and in SchemaMarkup.tsx. No review count, pricing, credentials, webhook URLs, or keys. Copied byte-for-byte from the approved draft and checked with `cmp`. |
| T-261029-02 | Tampering | public/sitemap.xml lastmod | mitigate | Gates check: 41 locs unchanged, only `<lastmod>` lines differ, no value equals today (a fallback signal), six city pages at 2026-10-13. Any 2026-10-29 value blocks the commit. |
| T-261029-03 | Tampering | git staging | mitigate | Stage by explicit path only. The cached file list must be exactly the two files, so `.claude/settings.local.json`, root drafts, and `dist/` are never committed. |
| T-261029-04 | Denial of service | production deploy | mitigate | No push. Push to main is a live Vercel deploy, and the user approves it separately. |
</threat_model>

<verification>
- `npm run build` exits 0. This is the gate; typecheck and lint are pre-existing red and out of scope.
- dist/llms.txt == public/llms.txt == the approved draft (cmp).
- public/sitemap.xml has 41 `<loc>` entries, no `2026-10-29` lastmod, the six 2026-10-13 cities, and only lastmod lines changed vs HEAD~1.
- `npm run verify-schema` reports `fail 0`.
- One new local commit containing exactly the two files, not pushed.
</verification>

<success_criteria>
- `/llms.txt` will be served with the approved content on the next deploy, which the user approves.
- The committed sitemap carries real per-route git dates. The 2026-10-13 location rewrites are no longer advertised as June.
- No other file, URL, NAP, schema, or page content changed.
</success_criteria>

<output>
Create `.planning/quick/261029-ltb-add-llms-txt-and-regenerate-sitemap-audi/261029-ltb-SUMMARY.md` when done. Do NOT commit it, and do NOT include it in the code commit. Include the commit hash, the full old -> new lastmod table for all 41 routes (from `git diff HEAD~1 HEAD -- public/sitemap.xml`), any route whose new date differed from the plan's expected table plus the git date that justified it, the verify-schema summary line, and the statement "not pushed — push to main = live deploy, awaiting user approval".
</output>
