# External Integrations

**Analysis Date:** 2026-03-07

## APIs & External Services

**Roofle (Roof Quote Widget):**
- Purpose: Instant satellite-based roof quote calculator
- Widget ID: `zEGtbFpfjh6Snz6t4Tz23`
- Two integration modes:
  1. **Slideout widget** - Loaded globally via `index.html` script tag (`https://app.roofle.com/roof-quote-pro-widget.js`)
  2. **Embedded widget** - Loaded in iframe via `public/roofle-embed.html` (`https://app.roofle.com/roof-quote-pro-embedded-widget.js`), rendered on `/get-a-quote-consultation` page (`src/pages/InstantQuote.tsx`)
- Auth: None (public widget, keyed by widget ID in URL)
- Preconnect configured in `index.html`: `https://app.roofle.com`

**n8n Webhook (Form Submissions):**
- Purpose: Receives all lead form submissions
- Endpoint: `https://n8n.whitflow.com/webhook/dte-form-submissions`
- Method: POST with JSON payload
- Called from: `src/hooks/useMultiStepForm.ts` (line 107)
- Payload includes: form data, UTM parameters, referrer, device type, session ID, landing page, timestamps
- Auth: None (open webhook endpoint)
- Timeout: 10 seconds with `AbortController`

**Google Sheets (Fallback Review Data):**
- Purpose: Fallback source for review counts when Supabase is unavailable
- Spreadsheet: `https://docs.google.com/spreadsheets/d/1ZZ3-sLfyRXhls8tPGe6hxK_W5vEfkO0XnHCxbwBNtCY`
- Access: Public read via Google Visualization API (`/gviz/tq?tqx=out:json`)
- Called from: `src/hooks/useReviewData.ts` (line 53)
- Data extracted: Total reviews count and average rating from row A2:D2
- Auth: None (publicly shared sheet)

## Data Storage

**Supabase (PostgreSQL):**
- Project URL: `https://ujasdbelviyamnwxjgth.supabase.co`
- Client: `@supabase/supabase-js` v2, initialized in `src/lib/supabase.ts`
- Auth: Anon key (public, hardcoded in `src/lib/supabase.ts`)
- RLS: Enabled on all tables

**Tables:**

| Table | Purpose | Read By | Write By |
|-------|---------|---------|----------|
| `review_data` | Stores review statistics (count, rating, star breakdown) | Frontend (`src/hooks/useReviewData.ts`), anon role | Edge Function (`supabase/functions/update-reviews/index.ts`), service_role |
| `blog_posts` | Blog content (title, slug, excerpt, content_html, tags, city, state) | Frontend (`src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`), anon role | Not written by app code |

**Migration:** `supabase/migrations/20260104060111_create_review_data_table.sql`

**File Storage:**
- Local filesystem only via `public/images/` and `public/data/`
- Static blog data fallback: `public/data/blog-posts.json`
- No Supabase Storage or S3 integration

**Caching:**
- None - No client-side or server-side caching layer

## Supabase Edge Functions

**`update-reviews`** (`supabase/functions/update-reviews/index.ts`):
- Runtime: Deno (Supabase Edge Functions)
- Purpose: CRUD endpoint for review data
- Methods: GET (read latest), POST (upsert review stats)
- Auth: Uses `SUPABASE_SERVICE_ROLE_KEY` env var (server-side only)
- CORS: Open (`*`)
- Accepts optional `api_key` field in payload (not validated - appears unused)

## Authentication & Identity

**Auth Provider:**
- None - No user authentication system
- Supabase anon key used for public read access
- No login, registration, or session management

## Monitoring & Observability

**Error Tracking:**
- None - No Sentry, LogRocket, or similar service

**Logs:**
- `console.error` only, used sparingly in catch blocks
- No structured logging framework

**Analytics:**
- Google Search Console verified via `public/google8b9154de5f852879.html` and `public/google9705395f5d9904eb.html`
- No Google Analytics, Plausible, or similar detected in codebase
- UTM parameter tracking captured in lead form submissions (`src/hooks/useLeadTracking.ts`) and sent to n8n webhook

## CI/CD & Deployment

**Hosting:**
- Vercel - SPA deployment
- Config: `vercel.json` with SPA rewrite fallback and `/home -> /` redirect
- Domain: `www.dteroofingllc.com`

**CI Pipeline:**
- None detected - No GitHub Actions, Vercel build hooks, or CI config files

## Environment Configuration

**Required env vars (Supabase Edge Functions only):**
- `SUPABASE_URL` - Supabase project URL (auto-injected in Edge Functions)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for write access (auto-injected in Edge Functions)

**Client-side config:**
- Supabase URL and anon key are hardcoded in `src/lib/supabase.ts` (not environment variables)
- No `.env` files detected in repo

**Secrets location:**
- Supabase Edge Function secrets managed via Supabase dashboard
- Vercel environment variables (if any) managed via Vercel dashboard

## Webhooks & Callbacks

**Incoming:**
- `supabase/functions/update-reviews` - POST endpoint accepts review data updates from external systems (e.g., review aggregator, manual trigger)

**Outgoing:**
- Lead form submissions POST to `https://n8n.whitflow.com/webhook/dte-form-submissions` from `src/hooks/useMultiStepForm.ts`

## SEO Integrations

**Schema.org Structured Data:**
- `RoofingContractor` local business schema defined in `src/seo/schemas.ts`
- Rendered by `src/components/SchemaMarkup.tsx` and `src/components/seo/SeoSchema.tsx`
- Dynamic meta tags managed by `src/components/SEO.tsx` (imperative DOM manipulation)

**Social Media Profiles:**
- Facebook: `https://www.facebook.com/people/DTE-Roofing/61556271692460/`
- Instagram: `https://www.instagram.com/dte_roofing/`
- Referenced in `src/seo/schemas.ts` `sameAs` array

---

*Integration audit: 2026-03-07*
