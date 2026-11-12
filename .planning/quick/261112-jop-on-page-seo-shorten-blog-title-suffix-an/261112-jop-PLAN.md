---
phase: quick-261112-jop
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/data/blogPosts.tsx
  - src/data/posts/roof-replacement-cost-columbus-ohio.tsx
  - src/pages/BlogPost.tsx
  - src/pages/Home.tsx
  - src/pages/Services.tsx
  - src/pages/Blog.tsx
autonomous: true
requirements: [QUICK-261112-JOP]

must_haves:
  truths:
    - "Every blog post <title> ends with ' | DTE Roofing' (not ' | DTE Roofing Blog')"
    - "The roof-replacement-cost post <title> is 'Roof Replacement Cost in Columbus, OH (2026) | DTE Roofing' (58 chars)"
    - "Blog post H1, breadcrumb, visible content and BlogPosting JSON-LD headline are unchanged"
    - "WebPage JSON-LD name still equals the <title> on every blog post (verify-schema check e passes)"
    - "Home service cards (6) and Services cards (7) have anchor text 'Learn More About {service title}'"
    - "Blog hub 'Read More' buttons (7) carry the post title as sr-only text inside the link"
  artifacts:
    - path: "src/data/blogPosts.tsx"
      provides: "BlogPost.seoTitle optional field"
      contains: "seoTitle?: string"
    - path: "src/pages/BlogPost.tsx"
      provides: "documentTitle built from seoTitle ?? title with | DTE Roofing suffix"
      contains: "| DTE Roofing`"
  key_links:
    - from: "src/pages/BlogPost.tsx documentTitle"
      to: "SEO title + SchemaMarkup documentTitle (WebPage name)"
      via: "same documentTitle variable passed to both"
      pattern: "documentTitle=\\{documentTitle\\}"
---

<objective>
On-page SEO fixes from the 2026-11-12 audit of the live site:
1. Shorten blog post `<title>` tags. Change the suffix to ` | DTE Roofing` and add an optional `seoTitle` override, set for the cost post only.
2. Replace the generic "Learn More" / "Read More" anchors on Home, Services and the Blog hub with descriptive anchor text.

Purpose: titles under ~70 chars stop getting truncated in SERPs, and descriptive anchors give crawlers and screen readers context for internal links.
Output: 6 edited source files, plus build/verify-schema evidence in the SUMMARY.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@./CLAUDE.md

Project gotchas (from memory, all confirmed relevant):
- src/ files are CRLF. If an Edit fails to match, the cause is line endings, not content.
- The verification gate is `npm run build`. `typecheck` and `lint` were already failing before this task, so ignore them.
- `npm run build` rewrites the tracked `public/sitemap.xml`. Restore it afterwards with `git checkout public/sitemap.xml`.
- Prerendered dist HTML is a single line, so `grep -c` undercounts. Use `grep -o ... | wc -l` instead.
- The schema gate is `npm run verify-schema`. Its check "e" requires WebPage `name` === `<title>`.
- Executor runs on the main working tree. node_modules and dist already exist.

<interfaces>
src/data/blogPosts.tsx (lines 15-35): `export interface BlogPost { id; slug; title: string; headline: string; excerpt; metaDescription; keywords; tags; city; state; published_at; created_at; status; image; readingMinutes; content: () => ReactNode; faqs; relatedAreas?; relatedPosts? }`

src/data/posts/roof-replacement-cost-columbus-ohio.tsx: `export const roofReplacementCostColumbus: BlogPost = { id, slug: 'roof-replacement-cost-columbus-ohio', title: 'How Much Does a Roof Replacement Cost in Columbus, OH? (2026)', headline: (same string), ... }`

src/pages/BlogPost.tsx:
- line 20: `title="Post Not Found | DTE Roofing Blog"`
- line 46: `` const documentTitle = `${post.title} | DTE Roofing Blog`; ``
- line 51: `<SEO title={documentTitle} ...>`. SEO derives og:title/twitter:title as `ogTitle || title`, so og:title follows automatically.
- line 59: `<SchemaMarkup documentTitle={documentTitle} pageTitle={post.title} blog={{ headline: post.headline, ... }}>`. SchemaMarkup uses documentTitle only for WebPage `name` (line 378). The BlogPosting headline comes from `blog.headline` (post.headline) and is unaffected.
- H1 (line 100) and breadcrumb (line 84) render `post.title`. Leave them alone.

src/pages/Home.tsx ~233-239 (inside services.map, `service.title` available, titles: Roof Inspection, Roof Repair, Roof Replacement, Emergency Services, Siding Services, Maintenance Plans):
  `<Link to={service.link} className="inline-flex items-center justify-center ... gap-1">` / `Learn More` / `<ChevronRight .../>` / `</Link>`

src/pages/Services.tsx ~104-109 (inside map, `service.title` available, titles include 'Siding Installation & Repair', 'Storm Damage Restoration', 'Preventative Maintenance', 'Commercial Roofing'):
  `<Link to={service.link} className="inline-flex items-center text-primary-700 ...">Learn More <ArrowRight className="ml-2 w-5 h-5" /></Link>`

src/pages/Blog.tsx ~119-124 (inside posts map, `post.title` available; the button sits in a `flex items-center justify-between` row next to the "DTE Roofing" author label):
  `<Link to={`/blog/${post.slug}`} className="bg-primary-700 text-white px-6 py-2 rounded-lg ... inline-flex items-center text-sm ...">Read More <ChevronRight className="w-4 h-4 ml-1" /></Link>`

Existing pattern to match: src/pages/locations/Columbus.tsx:280, "Learn More About Roof Repair".
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Shorten blog post document titles with seoTitle override</name>
  <files>src/data/blogPosts.tsx, src/data/posts/roof-replacement-cost-columbus-ohio.tsx, src/pages/BlogPost.tsx</files>
  <action>
1. In the `BlogPost` interface in src/data/blogPosts.tsx, add an optional `seoTitle?: string;` field directly after `headline: string;`. Give it a short comment saying it overrides only the document `<title>`, not the H1 or headline.
2. In src/data/posts/roof-replacement-cost-columbus-ohio.tsx, add `seoTitle: 'Roof Replacement Cost in Columbus, OH (2026)',` right after the `headline` line. Do NOT change `title`, `headline` or any content.
3. In src/pages/BlogPost.tsx:
   - Change line 46 to build `documentTitle` from `post.seoTitle ?? post.title` plus the suffix ` | DTE Roofing`.
   - Change line 20's not-found title to `Post Not Found | DTE Roofing`.
   - Keep passing the same `documentTitle` variable to both `<SEO title>` and `<SchemaMarkup documentTitle>`. That keeps WebPage name === `<title>` so verify-schema check e passes.
   - Leave `pageTitle={post.title}`, `headline: post.headline`, the H1 and the breadcrumb untouched.

Leave src/pages/Blog.tsx hub title "Roofing Tips & News | DTE Roofing Blog" as is (task scope decision).
  </action>
  <verify>
    <automated>cd /c/Users/geoca/OneDrive/Desktop/dte-roofing-web && grep -q "seoTitle?: string" src/data/blogPosts.tsx && grep -q "seoTitle: 'Roof Replacement Cost in Columbus, OH (2026)'" src/data/posts/roof-replacement-cost-columbus-ohio.tsx && grep -q "post.seoTitle ?? post.title" src/pages/BlogPost.tsx && ! grep -v '^\s*//' src/pages/BlogPost.tsx | grep -q "DTE Roofing Blog" && echo OK</automated>
  </verify>
  <done>seoTitle exists in the interface and on the cost post. BlogPost.tsx uses `post.seoTitle ?? post.title` with ` | DTE Roofing`. Zero "DTE Roofing Blog" strings remain in BlogPost.tsx. title, headline and H1 are untouched.</done>
</task>

<task type="auto">
  <name>Task 2: Descriptive anchors on Home, Services and Blog hub cards</name>
  <files>src/pages/Home.tsx, src/pages/Services.tsx, src/pages/Blog.tsx</files>
  <action>
1. Home.tsx service card Link (~line 237): replace the `Learn More` text with Learn More About {service.title}, written as a single template-literal expression (see the SSR rule below). Keep the ChevronRight icon, the className and the `to`.
2. Services.tsx card Link (~line 108): replace `Learn More` with `Learn More About {service.title}`, keeping the ArrowRight icon.
3. Executor judgment on mobile wrapping. The longest label is "Learn More About Siding Installation & Repair" on Services, and Home cards sit in a 3-col grid. If the full visible text would wrap badly or push the icon onto its own line, use visible `Learn More` followed by an sr-only span containing " About " + service.title. The anchor text stays descriptive for crawlers either way. Prefer fully visible text, which matches Columbus.tsx:280. Record the choice in the SUMMARY.
4. Blog.tsx hub "Read More" Link (~line 123): keep the visible `Read More` and the ChevronRight. Immediately after "Read More", add an sr-only span containing ": " + post.title inside the Link (template-literal form below), so the anchor's text content reads "Read More: {title}". Use the sr-only span, not aria-label, because crawlers read text and aria-label would override it. Do not touch other card content (title, excerpt, tags, author).

SSR text-node rule: write each label as ONE template-literal expression so the prerendered HTML has no `<!-- -->` split, and the anchor text appears as one contiguous string for crawlers and dist greps:
- Home/Services, visible form: `` {`Learn More About ${service.title}`} ``
- Home/Services, sr-only form: `` <span className="sr-only">{` About ${service.title}`}</span> ``
- Blog: `` <span className="sr-only">{`: ${post.title}`}</span> ``

Do not alter any paragraph or description text (project content constraint).
  </action>
  <verify>
    <automated>cd /c/Users/geoca/OneDrive/Desktop/dte-roofing-web && grep -q "About \${service.title}" src/pages/Home.tsx && grep -q "About \${service.title}" src/pages/Services.tsx && grep -q "sr-only" src/pages/Blog.tsx && grep -q "\${post.title}" src/pages/Blog.tsx && echo OK</automated>
  </verify>
  <done>Home and Services anchors include "About {service.title}", either visible or sr-only. The Blog hub Read More link contains an sr-only post title span. Visual classes are unchanged.</done>
</task>

<task type="auto">
  <name>Task 3: Build, verify prerendered output, restore sitemap</name>
  <files>public/sitemap.xml</files>
  <action>
1. Run `npm run build`. It must succeed. Then ALWAYS run `git checkout public/sitemap.xml`, even if the build failed (the sitemap is regenerated before vite runs, and a push to main deploys live). This task only restores public/sitemap.xml; it must not end up modified. Leave the regenerated dist in place; it is not tracked.
2. Run `npm run verify-schema`. It must pass, especially check e (WebPage name === title) on all 7 blog posts.
3. Inspect the dist HTML with `grep -o`, since `grep -c` is unreliable on single-line files:
   - For each dir in dist/blog/*/, extract the `<title>` with `grep -o '<title[^>]*>[^<]*</title>'` and print each title with its character length. Expected: all end with " | DTE Roofing", none contain "DTE Roofing Blog", and the cost post is exactly "Roof Replacement Cost in Columbus, OH (2026) | DTE Roofing". Also confirm `og:title` matches the `<title>` on the cost post. Helmet output may put `data-rh` before other attributes, so grep loosely (`grep -o 'og:title"[^>]*'` or `grep -o '<meta[^>]*og:title[^>]*>'`).
   - Confirm the cost post H1 still contains "How Much Does a Roof Replacement Cost in Columbus, OH? (2026)" and the JSON-LD `"headline":"How Much Does a Roof Replacement Cost..."` is unchanged (`grep -o '"headline":"[^"]*"'`).
   - dist/index.html: `grep -o 'Learn More[^<]*<[^>]*>[^<]*' | head` should show 6 "Learn More About ..." anchors, or Learn More plus sr-only spans.
   - dist/services/index.html: 7 descriptive anchors, same check.
   - dist/blog/index.html: `grep -o 'sr-only">[^<]*' | wc -l` should be at least 7. If other sr-only spans exist, also grep `'Read More<!-- -->'` / `'Read More'` near each.
4. Run `git status` to confirm only the 6 source files changed and sitemap.xml is clean.
5. In the SUMMARY, record: the before/after title lengths per post, the visible-vs-sr-only choice for Home and Services, and the verify-schema result.
  </action>
  <verify>
    <automated>cd /c/Users/geoca/OneDrive/Desktop/dte-roofing-web && { npm run build; rc=$?; git checkout public/sitemap.xml; [ $rc -eq 0 ]; } && npm run verify-schema && for f in dist/blog/*/index.html; do t=$(grep -o '<title[^>]*>[^<]*</title>' "$f" | sed 's/<[^>]*>//g'); echo "${#t} $t"; done</automated>
  </verify>
  <done>Build succeeds and verify-schema passes. All 7 blog titles end with " | DTE Roofing" and the cost post title is 58 chars. Home, Services and Blog dist HTML show descriptive anchor text. public/sitemap.xml is restored, and git status shows only the planned source files modified.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| none new | Static, build-time content changes only. No user input, network or auth surface is touched. |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-261112-01 | Tampering | Title/JSON-LD consistency (WebPage name vs `<title>`) | mitigate | Single `documentTitle` variable feeds both SEO and SchemaMarkup; `npm run verify-schema` check e enforces equality |
| T-261112-02 | Information disclosure | Page copy | accept | Only static marketing strings change; no data exposure |
</threat_model>

<verification>
- `npm run build` succeeds and `npm run verify-schema` passes
- Blog titles in dist end with " | DTE Roofing"; the cost post uses seoTitle (58 chars)
- H1 and JSON-LD headline on the cost post are unchanged
- Descriptive anchors are present in dist/index.html, dist/services/index.html and dist/blog/index.html
- public/sitemap.xml is restored
</verification>

<success_criteria>
- No blog post `<title>` is longer than 70 chars except where post.title alone forces it. Record the lengths in the SUMMARY.
- 6 Home, 7 Services and 7 Blog hub card links have descriptive anchor text
- No page content paragraphs, URLs or NAP changed
</success_criteria>

<output>
Create `.planning/quick/261112-jop-on-page-seo-shorten-blog-title-suffix-an/261112-jop-SUMMARY.md` when done
</output>
