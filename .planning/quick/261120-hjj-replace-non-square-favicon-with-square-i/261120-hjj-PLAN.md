---
phase: quick-261120-hjj
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - public/favicon-48.png
  - public/apple-touch-icon.png
  - public/icon-192.png
  - public/icon-512.png
  - index.html
  - public/site.webmanifest
autonomous: true
requirements: [QUICK-261120-hjj]

must_haves:
  truths:
    - "Every page's rel=icon points at a square icon (/favicon.svg, with a 48x48 PNG fallback)"
    - "iOS apple-touch-icon is a 180x180 PNG"
    - "The web manifest lists square 192x192 and 512x512 PNG icons"
    - "No built HTML references /dte_favicon.png, but the file still exists in public/"
  artifacts:
    - path: "public/favicon-48.png"
      provides: "48x48 PNG favicon fallback rendered from public/favicon.svg"
    - path: "public/apple-touch-icon.png"
      provides: "180x180 apple-touch-icon rendered from public/apple-touch-icon.svg"
    - path: "public/icon-192.png"
      provides: "192x192 manifest icon rendered from public/apple-touch-icon.svg"
    - path: "public/icon-512.png"
      provides: "512x512 manifest icon rendered from public/apple-touch-icon.svg"
    - path: "index.html"
      provides: "Favicon link tags"
      contains: "/favicon.svg"
    - path: "public/site.webmanifest"
      provides: "Manifest icon list"
      contains: "/icon-512.png"
  key_links:
    - from: "index.html"
      to: "public/favicon.svg, public/favicon-48.png, public/apple-touch-icon.png"
      via: "link rel=icon / rel=apple-touch-icon, copied into every prerendered page"
      pattern: "favicon\\.svg|favicon-48\\.png|apple-touch-icon\\.png"
    - from: "public/site.webmanifest"
      to: "public/icon-192.png, public/icon-512.png"
      via: "icons array"
      pattern: "icon-(192|512)\\.png"
---

<objective>
Replace the non-square favicon (`public/dte_favicon.png`, 2400x1800) with square icons derived from the existing square SVG marks, so Google's square-favicon requirement is met and iOS / PWA icons are correct.

Purpose: Google ignores non-square favicons in search results; the current icon is the wide logo.
Output: four square PNGs in `public/`, updated `index.html` link tags, updated `public/site.webmanifest` icons array. No page content, URL, or NAP changes. No push.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@./CLAUDE.md
@index.html
@public/site.webmanifest

<interfaces>
Current index.html lines 6-9 (CRLF line endings; an Edit mismatch is line endings, not content):
  <!-- Favicons -->
  <link rel="icon" type="image/png" href="/dte_favicon.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/dte_favicon.png" />
  <link rel="manifest" href="/site.webmanifest" />

Current public/site.webmanifest icons array: entry 1 = /favicon.svg, sizes "any", type image/svg+xml, purpose "any maskable"; entry 2 = /apple-touch-icon.svg, sizes "180x180", type image/svg+xml.

Sources: public/favicon.svg (viewBox 0 0 100 100, red house + "DTE", transparent bg), public/apple-touch-icon.svg (viewBox 0 0 180 180, same mark on #f5f5f5 rounded rect).
sharp ^0.34.5 is already a devDependency. Verified working call shape: sharp('public/favicon.svg', { density: 300 }).resize(48, 48).png().toFile(...)
Build: `npm run build` (generate-sitemap + vite client build + SSR build + scripts/prerender.mjs). Prerendered pages live at dist/<route>/index.html (e.g. dist/locations/columbus/index.html).
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Render the four square PNG icons with sharp</name>
  <files>public/favicon-48.png, public/apple-touch-icon.png, public/icon-192.png, public/icon-512.png</files>
  <action>
Generate the PNGs with a one-off `node --input-type=module -e "..."` command run from the project root (do NOT add a script to scripts/ — this is a one-time asset generation and adds nothing else to the repo; no new dependencies, sharp is already installed). Import sharp, then:
- favicon-48.png: sharp('public/favicon.svg', { density: 300 }).resize(48, 48).png({ compressionLevel: 9 }).toFile('public/favicon-48.png')
- apple-touch-icon.png: from public/apple-touch-icon.svg, density 300, resize 180x180. Flatten onto #ffffff (`.flatten({ background: '#ffffff' })`) because iOS renders transparent corners of apple-touch-icons as black.
- icon-192.png and icon-512.png: from public/apple-touch-icon.svg, resize 192x192 and 512x512. Use density 300 for 192 and density 1000 for 512 so the raster is not upscaled (the 180-unit viewBox needs more than 205 dpi to reach 512px natively; 1000 leaves headroom). Flatten onto #ffffff as well.
Await all four (Promise.all). Do NOT touch or delete public/dte_favicon.png (external caches may still request that URL), and do not modify the SVG sources.
After generating, print each file's dimensions and byte size via sharp(...).metadata() plus fs.statSync to confirm.
  </action>
  <verify>
    <automated>node --input-type=module -e "import sharp from 'sharp'; import fs from 'fs'; const want={'public/favicon-48.png':48,'public/apple-touch-icon.png':180,'public/icon-192.png':192,'public/icon-512.png':512}; let ok=true; for (const [f,s] of Object.entries(want)) { const m=await sharp(f).metadata(); const b=fs.statSync(f).size; console.log(f,m.width+'x'+m.height,m.format,b); if (m.width!==s||m.height!==s||m.format!=='png'||b>=50000) ok=false; } if(!fs.existsSync('public/dte_favicon.png')) ok=false; process.exit(ok?0:1)"</automated>
  </verify>
  <done>All four PNGs exist in public/ at exactly 48, 180, 192, 512 square pixels, PNG format, each under 50 KB; public/dte_favicon.png still exists.</done>
</task>

<task type="auto">
  <name>Task 2: Point index.html and site.webmanifest at the square icons</name>
  <files>index.html, public/site.webmanifest</files>
  <action>
index.html (CRLF; keep CRLF): replace lines 7-8 with three lines, keeping the comment on line 6 and the manifest link on line 9 unchanged:
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
- `<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />`
- `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`
Touch nothing else in index.html.

public/site.webmanifest: edit only the "icons" array. Keep entry 1 (/favicon.svg, sizes "any", image/svg+xml, purpose "any maskable") exactly as is. Replace the /apple-touch-icon.svg 180x180 entry (wrong: an SVG labelled with a fixed raster size) with two entries: { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" } and { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" }. Do not change name, short_name, description, theme_color, background_color, display, start_url or scope. Preserve the file's existing indentation (2 spaces) and line endings. Result must be valid JSON.
  </action>
  <verify>
    <automated>node -e "const fs=require('fs');const h=fs.readFileSync('index.html','utf8');const m=JSON.parse(fs.readFileSync('public/site.webmanifest','utf8'));const s=m.icons.map(i=>i.src);const ok=h.includes('href=\"/favicon.svg\"')&&h.includes('type=\"image/svg+xml\"')&&h.includes('href=\"/favicon-48.png\"')&&h.includes('href=\"/apple-touch-icon.png\"')&&!h.includes('dte_favicon.png')&&s.includes('/favicon.svg')&&s.includes('/icon-192.png')&&s.includes('/icon-512.png')&&!s.includes('/apple-touch-icon.svg')&&m.start_url==='/'&&m.theme_color==='#8B0000';console.log(s);process.exit(ok?0:1)"</automated>
  </verify>
  <done>index.html references /favicon.svg (svg+xml), /favicon-48.png (48x48) and /apple-touch-icon.png, with no dte_favicon.png reference; manifest is valid JSON listing /favicon.svg, /icon-192.png, /icon-512.png and its other fields are unchanged.</done>
</task>

<task type="auto">
  <name>Task 3: Build, verify prerendered output, restore sitemap, commit</name>
  <files>(no source edits; verifies dist/ and commits Task 1-2 files)</files>
  <action>
Run `npm run build` (the only verification gate; do NOT use `npm run typecheck` or `npm run lint` as gates — both are pre-existing red). Then verify with a node check (dist HTML is a single line, so do not rely on `grep -c`):
- dist/index.html and dist/locations/columbus/index.html each contain `/favicon.svg`, `/favicon-48.png` and `/apple-touch-icon.png`, and do not contain `dte_favicon.png`.
- dist/favicon-48.png, dist/apple-touch-icon.png, dist/icon-192.png, dist/icon-512.png exist with dimensions 48/180/192/512 and each is under 50 KB; dist/site.webmanifest lists /icon-192.png and /icon-512.png.
Then run `git restore public/sitemap.xml` (the build rewrites the tracked sitemap and this task changes no page content).
Commit with explicit paths only: `git add index.html public/site.webmanifest public/favicon-48.png public/apple-touch-icon.png public/icon-192.png public/icon-512.png` then commit with message `fix(seo): replace non-square favicon with square icons` and a body noting the old 2400x1800 dte_favicon.png is kept on disk but unreferenced, ending with the Co-Authored-By trailer from the session attribution. NEVER stage `.claude/settings.local.json` or `.planning/debug/` (do not use `git add -A` or `git add .`). Check `git status --short` before committing to confirm only the six intended paths are staged and public/sitemap.xml is clean. Do NOT push (push to main deploys production).
  </action>
  <verify>
    <automated>node --input-type=module -e "import sharp from 'sharp'; import fs from 'fs'; let ok=true; for (const p of ['dist/index.html','dist/locations/columbus/index.html']) { const h=fs.readFileSync(p,'utf8'); const r=['/favicon.svg','/favicon-48.png','/apple-touch-icon.png'].every(t=>h.includes(t)) && !h.includes('dte_favicon.png'); console.log(p,r); ok=ok&&r; } for (const [f,s] of Object.entries({'dist/favicon-48.png':48,'dist/apple-touch-icon.png':180,'dist/icon-192.png':192,'dist/icon-512.png':512})) { const m=await sharp(f).metadata(); const b=fs.statSync(f).size; console.log(f,m.width,m.height,b); if(m.width!==s||m.height!==s||b>=50000) ok=false; } const mf=fs.readFileSync('dist/site.webmanifest','utf8'); ok=ok&&mf.includes('/icon-192.png')&&mf.includes('/icon-512.png'); process.exit(ok?0:1)" && git diff --quiet -- public/sitemap.xml && echo SITEMAP_CLEAN</automated>
  </verify>
  <done>`npm run build` succeeds; root and Columbus prerendered pages reference only the square icons; four PNGs in dist/ at correct sizes under 50 KB; public/sitemap.xml restored; one commit containing exactly the six intended paths; nothing pushed.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| repo -> production | Push to main deploys live; this plan does not push |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-hjj-01 | Information Disclosure | git commit | mitigate | Stage the six explicit paths only; never stage .claude/settings.local.json or .planning/debug/; verify with git status before commit |
| T-hjj-02 | Tampering | static icon assets | accept | Rendered locally from repo-owned SVGs with an already-installed dependency; no external input |
| T-hjj-SC | Tampering | npm installs | accept | No package installs in this plan (sharp already a devDependency) |
</threat_model>

<verification>
- Task 1 and Task 2 automated checks pass.
- `npm run build` succeeds and Task 3 dist check passes.
- `git status --short` after commit shows only the pre-existing `.claude/settings.local.json` modification and untracked `.planning/debug/`.
</verification>

<success_criteria>
- rel=icon on every page points at square icons (/favicon.svg + /favicon-48.png fallback).
- apple-touch-icon is a 180x180 PNG; manifest lists 192 and 512 PNG icons.
- public/dte_favicon.png kept, unreferenced.
- No content, URL, or NAP changes; no new dependencies; not pushed.
</success_criteria>

<output>
Create `.planning/quick/261120-hjj-replace-non-square-favicon-with-square-i/261120-hjj-SUMMARY.md` when done
</output>
