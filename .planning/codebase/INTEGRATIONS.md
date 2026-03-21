# External Integrations

**Analysis Date:** 2026-03-21

## APIs & External Services

**Quote & Lead Capture:**
- Roofle - Instant roof quote widget
  - SDK/Widget: Async script loaded from `https://app.roofle.com/roof-quote-pro-widget.js`
  - Widget ID: `zEGtbFpfjh6Snz6t4Tz23` (configured in `index.html`)
  - Integration: Embedded slideout quote widget on site

**Automation & Webhooks:**
- n8n (Whitflow) - Lead form automation and email workflow
  - Lead Form Submissions: `https://n8n.whitflow.com/webhook/dte-form-submissions`
    - Endpoint used in `src/hooks/useMultiStepForm.ts` (line 17)
    - Timeout: 10 seconds with AbortController
    - Payload includes form data, source, tracking data, and timestamps
  - Financing Submissions: `https://n8n.whitflow.com/webhook/dte-financing-submissions`
    - Endpoint used in `src/pages/Financing.tsx` (line 7)
    - Timeout: 10 seconds with AbortController
    - Payload includes financing product selection and tracking data

## Data Storage

**Databases:**
- Supabase PostgreSQL - Dynamic content and review data
  - Connection: `https://ujasdbelviyamnwxjgth.supabase.co`
  - Client: @supabase/supabase-js 2.57.4 (initialized in `src/lib/supabase.ts`)
  - Anon Key: Hardcoded in `src/lib/supabase.ts`
  - Tables accessed:
    - `review_data` - Review counts and ratings (queried in `src/hooks/useReviewData.ts`)
      - Columns: `total_reviews`, `average_rating`, `five_star_count`, `four_star_count`, `three_star_count`, `two_star_count`, `one_star_count`, `updated_at`
      - Used for displaying review statistics on site
    - `blog_posts` (implied) - Blog content with fields: `id`, `title`, `slug`, `excerpt`, `content_html`, `tags`, `city`, `state`, `published_at`, `created_at`, `status`

**File Storage:**
- Local filesystem only
  - Static assets in `/public/images/` - Project photos, featured work carousel
  - Favicons in `/public/` (dte_favicon.png)
  - Web manifest in `/public/site.webmanifest`

**Caching:**
- None detected

## Authentication & Identity

**Auth Provider:**
- Custom implementation - No dedicated auth provider (Supabase anon key for public read access only)
  - Implementation: Supabase anon public client for reading review data and blog posts
  - No user login system - Public-facing marketing site with public read access

## Monitoring & Observability

**Error Tracking:**
- None detected - No error tracking service integrated (Sentry, Rollbar, etc.)

**Logs:**
- Console logging only
  - Error logging in `src/hooks/useReviewData.ts`: `console.error('Failed to load reviews:', err)`
  - Development visibility only, minimal logging in production

## CI/CD & Deployment

**Hosting:**
- Vercel - Platform for deployment and hosting
  - Configuration file: `vercel.json`
  - Handles rewriting all routes to `index.html` for SPA routing
  - Permanent redirect from `/home` to `/`

**CI Pipeline:**
- None detected - No GitHub Actions, GitLab CI, or other CI/CD automation in repo

## Environment Configuration

**Hardcoded Configuration:**
- Supabase credentials in source code (public anon key):
  - URL: `https://ujasdbelviyamnwxjgth.supabase.co`
  - Anon Key: Hardcoded in `src/lib/supabase.ts`
- Webhook URLs hardcoded in source:
  - `src/hooks/useMultiStepForm.ts` - n8n lead form endpoint
  - `src/pages/Financing.tsx` - n8n financing endpoint
- Roofle Widget ID hardcoded in `index.html`

**Environment Variables:**
- Not currently used - All critical config is hardcoded
- Deployment target (Vercel) supports env vars but none are configured in codebase

## Webhooks & Callbacks

**Incoming:**
- None - Application does not receive webhooks

**Outgoing:**
- Lead Form Webhook: `POST https://n8n.whitflow.com/webhook/dte-form-submissions`
  - Trigger: User submits lead form with service request
  - Payload includes:
    - Form fields: service, urgency, address, name, phone, email, message
    - Tracking: utm_source, utm_medium, utm_campaign, referrer, landingPage, deviceType
    - Session: sessionId, landingPage, timestamp, currentPage
    - Metadata: formVersion, formCompletedAt
  - Response handling: Sets submitStatus to 'success' or 'error' based on HTTP response

- Financing Webhook: `POST https://n8n.whitflow.com/webhook/dte-financing-submissions`
  - Trigger: User submits financing inquiry form
  - Payload includes:
    - Form fields: name, email, phone, financingProduct, projectDescription
    - Tracking: utm parameters, referrer, landingPage, deviceType
    - Session: sessionId, timestamp, currentPage
    - Metadata: formVersion, formCompletedAt
  - Response handling: Sets submitStatus to 'success' or 'error' based on HTTP response

## Third-Party CDNs

**Google Fonts:**
- Preconnected in `index.html` via `https://fonts.googleapis.com`
- Used for custom typography (preconnect optimization)

**Roofle CDN:**
- Preconnected in `index.html` via `https://app.roofle.com`
- Async script load for quote widget

## Data Flow Summary

1. **Review Data Flow:**
   - First attempt: Query Supabase `review_data` table via `src/hooks/useReviewData.ts`
   - Fallback: Parse Google Sheets JSON export from `https://docs.google.com/spreadsheets/d/1ZZ3-sLfyRXhls8tPGe6hxK_W5vEfkO0XnHCxbwBNtCY/gviz/tq?tqx=out:json&range=A2:D2`
   - Final fallback: Default review count (92) if both sources fail
   - Timeout: None specified for Google Sheets fallback

2. **Lead Capture Flow:**
   - User fills multi-step form (Service → Address → Contact Info) via `src/components/lead-form/`
   - Form validates each step with validators in `src/hooks/useMultiStepForm.ts`
   - On submission: POST to n8n webhook with form data + tracking data
   - Response determines result page shown to user

3. **Financing Inquiry Flow:**
   - User selects financing product and submits form on `src/pages/Financing.tsx`
   - Form validates required fields
   - On submission: POST to separate n8n webhook with financing selection + tracking data
   - Response determines success/error state

---

*Integration audit: 2026-03-21*
