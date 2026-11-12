---
phase: quick-261112-jop
plan: 01
status: complete
subsystem: seo
tags: [on-page-seo, titles, anchor-text, blog]
requires: []
provides: [BlogPost.seoTitle override, descriptive card anchors]
affects: [blog post <title>/og:title/WebPage name, Home/Services/Blog hub card links]
key-files:
  created: []
  modified:
    - src/data/blogPosts.tsx
    - src/data/posts/roof-replacement-cost-columbus-ohio.tsx
    - src/pages/BlogPost.tsx
    - src/pages/Home.tsx
    - src/pages/Services.tsx
    - src/pages/Blog.tsx
decisions:
  - "Blog post title suffix is now ' | DTE Roofing'. An optional seoTitle overrides the document title only. The Blog hub title stays 'Roofing Tips & News | DTE Roofing Blog' (scope decision)."
  - "Home and Services anchors use the fully visible 'Learn More About {title}', matching Columbus.tsx:280. No sr-only fallback was needed."
metrics:
  completed: 2026-11-12
  tasks: 3
  files: 6
---

# Quick 261112-jop: Shorten blog titles and use descriptive anchors

Blog post `<title>` tags now end in ` | DTE Roofing` instead of ` | DTE Roofing Blog`. The cost post uses a new `seoTitle` override, which brings its title from 80 to 58 chars. The generic "Learn More" and "Read More" card links on Home, Services and the Blog hub now carry descriptive anchor text.

## Commits

- `0198171` feat: shorten blog post titles with seoTitle override (Task 1)
- `c259617` feat: descriptive anchor text on Home, Services and Blog cards (Task 2)
- Task 3 (build and verification) made no file changes. `public/sitemap.xml` was restored after the build.

## Title lengths (character counts from the prerendered dist `<title>`)

| Post | Before | After |
|------|-------:|------:|
| roof-replacement-cost-columbus-ohio (seoTitle) | 80 | 58 |
| asphalt-vs-metal | 73 | 68 |
| hail-damage claim | 73 | 68 |
| how-long-does-a-roof-last | 63 | 58 |
| what-to-look-for in a contractor | 68 | 63 |
| repair-vs-replacement | 61 | 56 |
| 7-signs | 54 | 49 |

The how-long post counts the apostrophe as 1 character. In the raw dist HTML it appears as `&#x27;`. Every post title is now 70 characters or less. No dist blog post contains "DTE Roofing Blog".

## Verification

- `npm run build`: exit 0. `public/sitemap.xml` restored with `git checkout`.
- `npm run verify-schema`: checked 41, pass 41, fail 0, skip 0. Check e (WebPage name === `<title>`) passes on all 7 posts.
- Cost post: the `<title>`, `og:title` and WebPage `name` all read "Roof Replacement Cost in Columbus, OH (2026) | DTE Roofing". The H1 and BlogPosting `headline` are unchanged ("How Much Does a Roof Replacement Cost in Columbus, OH? (2026)").
- dist/index.html: 6 "Learn More About ..." anchors, each a single text node.
- dist/services/index.html: 7 "Learn More About ..." anchors, including "Siding Installation &amp; Repair" and "Gutters".
- dist/blog/index.html: 7 `Read More<span class="sr-only">: {title}` anchors.
- `git status`: only the pre-existing `.claude/settings.local.json` change and the untracked plan directory remain.

## Visible vs sr-only decision

Fully visible text was used on Home and Services. Both Links are `inline-flex`, so a long label such as "Learn More About Siding Installation & Repair" on a narrow screen wraps inside its own flex item and the arrow/chevron icon stays beside it. The icon never drops onto its own line.

## Deviations from Plan

None. The plan was executed as written.

## Known Stubs

None.

## Self-Check: PASSED

- All 6 modified files are present in commits 0198171 and c259617 (verified with `git log`).
- The dist checks above were run after the build.
