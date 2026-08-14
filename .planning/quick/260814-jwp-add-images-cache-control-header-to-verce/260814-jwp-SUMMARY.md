---
quick_id: 260814-jwp
status: complete
date: 2026-08-14
commit: 7977922
---

# Quick Task 260814-jwp — Summary

**Status:** complete

## What changed

`vercel.json` — added a `/images/(.*)` entry as the first element of the `headers` array:

```json
{
  "source": "/images/(.*)",
  "headers": [
    { "key": "Cache-Control", "value": "public, max-age=2592000, stale-while-revalidate=86400" }
  ]
}
```

Nothing else in the file changed.

## Verification

- `JSON.parse(vercel.json)` — clean, 3 header rules (`/images/`, `/assets/`, `/(.*)`).
- `npm run build` — succeeded, all 40+ routes prerendered.
- Header behavior itself is only observable after deploy (Vercel applies `vercel.json` at the
  edge, not at build time). Confirm post-deploy with:
  `curl -sI https://www.dteroofingllc.com/images/columbus-residential-roof-replacement.webp | grep -i cache-control`

## Decisions

Chose 30 days + `stale-while-revalidate=86400` over the more aggressive
`max-age=31536000, immutable`. Filenames in `public/images/` are stable and unhashed, so
immutable caching would strand repeat visitors on a stale photo for up to a year after an
in-place image swap. The existing `/assets/(.*)` 1-year immutable rule stays as-is — Vite
content-hashes those filenames, so it is safe there.

## Follow-up (not done)

If image caching is later tightened to 1-year immutable, adopt a rename-on-replace convention
(`-v2` suffix) and update the `<img>` src rather than overwriting files in place.
