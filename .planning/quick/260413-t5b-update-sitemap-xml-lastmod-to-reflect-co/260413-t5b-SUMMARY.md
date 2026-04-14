---
id: 260413-t5b
mode: quick
description: Update sitemap.xml lastmod to reflect content changes from footer/home overhaul commit
status: complete
date: 2026-04-13
commit: a74d83f
---

# Summary — Update sitemap.xml lastmod

## What changed

`public/sitemap.xml` — home URL `lastmod` bumped from `2026-04-10` to `2026-04-13` to reflect the substantive restructure of `src/pages/Home.tsx` in commit `bdcc348`.

## What was NOT changed (and why)

Footer.tsx is also part of `bdcc348` and is rendered site-wide. Other URLs in the sitemap were left alone: the footer is navigational chrome, not main page content. Mass-updating lastmod on unchanged main content dilutes the signal — the user explicitly flagged this risk ("stale lastmod loses signal value," which implies the converse: false-positive lastmod also loses signal value).

If the user wants footer-change-as-lastmod policy applied across all URLs, that's a separate decision worth making once, not inferred from this task.

## Verification

```
$ git show HEAD --stat
fix(seo): refresh sitemap lastmod for home URL
 public/sitemap.xml | 2 +-
```

Sitemap home entry now shows `<lastmod>2026-04-13</lastmod>`.

## Commits

- `a74d83f` — fix(seo): refresh sitemap lastmod for home URL
