# External Integrations

**Analysis Date:** 2026-03-21

## APIs & External Services

**Form Processing & Workflow Automation:**
- n8n (Whitflow) - Form submission webhooks for lead capture and workflow automation
  - Lead form webhook: `https://n8n.whitflow.com/webhook/dte-form-submissions`
    - Implementation: `src/hooks/useMultiStepForm.ts` (lines 17, 107-112)
    - Receives: Service, urgency, address, contact info, tracking data, form source, device info
  - Financing form webhook: `https://n8n.whitflow.com/webhook/dte-financing-submissions`
    - Implementation: `src/pages/Financing.tsx` (line 7, 70-74)
    - Receives: Financing product, name, email, phone, project description, tracking data

**Quote/Assessment Tools:**
- Roofle - Roof measurement and quote widget
  - Widget ID: `zEGtbFpfjh6Snz6t4Tz23`
  - Integration: Async script in `index.html` (line 36)
  - Provides: Interactive roof quote estimation interface
  - Pre-connection: `https://app.roofle.com` in HTML head

**Maps & Location Services:**
- Google Maps - Directions and location services
  - Integration: Location pages use Google Maps Directions API links
  - Endpoints in: `src/pages/locations/*.tsx` files
  - Format: `https://www.google.com/maps/dir/?api=1&origin={origin}&destination={destination}`
  - Example: `src/pages/locations/Columbus.tsx` - Directions from city to office (615 Hilliard Rome Rd, Columbus, OH 43228)
  - Maps Business Profile: `https://www.google.com/maps/place/DTE+Roofing+LLC`

**Google Sheets - Review Data (Fallback):**
- Google Sheets API - Fallback source for review aggregation
  - Spreadsheet ID: `1ZZ3-sLfyRXhls8tPGe6hxK_W5vEfkO0XnHCxbwBNtCY`
  - Implementation: `src/hooks/useReviewData.ts` (line 53)
  - Query: Range A2:D2 (total reviews, average rating)
  - When used: Falls back when Supabase review_data table is unavailable
  - Default fallback: 92 reviews at 5.0 rating

## Data Storage

**Databases:**
- Supabase (PostgreSQL)
  - Project URL: `https://ujasdbelviyamnwxjgth.supabase.co`
  - Client: `@supabase/supabase-js` 2.57.4
  - Initialized: `src/lib/supabase.ts`
  - Tables:
    - `review_data` - Stores aggregated review metrics (total_reviews, average_rating, star counts)
    - `blog_posts` - Expected for blog functionality (schema in `src/lib/supabase.ts` BlogPost interface)
  - Auth: Anon key (public key for read-only/client operations)

**Blog Content:**
- Supabase database table: `blog_posts`
  - Query implementation: `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`
  - Fields: id, title, slug, excerpt, content_html, tags, city, state, published_at, created_at, status
  - Use: Blog listing and individual post pages with routing via slug

**File Storage:**
- Local filesystem only - No cloud file storage configured
- Static assets: Served from `public/` directory (favicon, manifest)
- Image hosting: Assumed external (not configured in codebase - verify setup separately)

**Caching:**
- Session storage only - Uses browser sessionStorage for:
  - Session ID tracking: `dte_session_id` in `src/hooks/useLeadTracking.ts`
  - Landing page capture: `dte_landing_page` in `src/hooks/useLeadTracking.ts`
- No server-side caching layer detected

## Authentication & Identity

**Auth Provider:**
- Supabase Auth - Implicit (anon key allows public read access)
  - No explicit login/authentication flow detected
  - Anon key: Public key in `src/lib/supabase.ts` (hardcoded)
  - RLS (Row Level Security): Not enforced in sample queries - public read access

**User Tracking:**
- Custom tracking via UTM parameters and session data
  - Implementation: `src/hooks/useLeadTracking.ts`
  - Captured: UTM source/medium/campaign/term/content, referrer, landing page, device type, screen resolution, user agent, session ID
  - Passed to: Form webhooks (n8n) for lead attribution

## Monitoring & Observability

**Error Tracking:**
- Not detected (no Sentry, Rollbar, or similar integration)

**Logs:**
- Console logging only (development via `console.error` in `src/hooks/useReviewData.ts`)
- No application performance monitoring configured
- Form submission errors logged to console on failure

## CI/CD & Deployment

**Hosting:**
- Vercel - Static site hosting
  - Configuration: `vercel.json`
  - Rewrites: All requests routed to `index.html` for SPA routing
  - Redirect: `/home` → `/` (permanent)

**CI Pipeline:**
- Not detected in codebase (likely configured in Vercel dashboard or GitHub)

## Environment Configuration

**Required env vars:**
- Currently not env-based (hardcoded in source files - security concern)
- Should be externalized:
  - `VITE_SUPABASE_URL` - Supabase project URL
  - `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
  - `VITE_N8N_WEBHOOK_FORM` - Lead form webhook URL
  - `VITE_N8N_WEBHOOK_FINANCING` - Financing form webhook URL
  - `VITE_ROOFLE_WIDGET_ID` - Roofle widget identifier

**Secrets location:**
- `.env` file is gitignored (listed in `.gitignore`)
- Currently not implemented - credentials hardcoded in source

## Webhooks & Callbacks

**Incoming:**
- n8n webhooks receive form submissions (POST)
  - Lead form: `https://n8n.whitflow.com/webhook/dte-form-submissions`
  - Financing form: `https://n8n.whitflow.com/webhook/dte-financing-submissions`
  - Payload format: JSON with form data, UTM params, device info, timestamps

**Outgoing:**
- Not detected (n8n may trigger outgoing webhooks internally, but frontend doesn't initiate them)

## Third-Party Scripts

**Third-party integrations loaded:**
- Roofle quote widget: `https://app.roofle.com/roof-quote-pro-widget.js` (async)
- Google Fonts: Preconnected at `https://fonts.googleapis.com`

---

*Integration audit: 2026-03-21*
