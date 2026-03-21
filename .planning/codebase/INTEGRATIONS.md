# External Integrations

**Analysis Date:** 2026-03-21

## APIs & External Services

**Quote Generation:**
- Roofle - Instant roofing quote widget
  - Widget: `https://app.roofle.com/roof-quote-pro-widget.js?id=zEGtbFpfjh6Snz6t4Tz23`
  - Async script loaded in `index.html`
  - Provides embedded quote tool accessible via dedicated InstantQuote page and button CTAs
  - Status: Active integration, no SDK required

**Automation & Webhook Processing:**
- n8n (whitflow.com) - Lead form automation and workflow processing
  - Primary webhook: `https://n8n.whitflow.com/webhook/dte-form-submissions`
    - Used in: `src/hooks/useMultiStepForm.ts`
    - Receives: Multi-step lead form data (service, urgency, address, contact info, tracking)
  - Financing webhook: `https://n8n.whitflow.com/webhook/dte-financing-submissions`
    - Used in: `src/pages/Financing.tsx`
    - Receives: Financing inquiry data (product type, name, contact, project description)
  - Timeout: 10000ms (10 seconds) via AbortController
  - Method: POST with JSON payload

## Data Storage

**Primary Database:**
- Supabase (PostgreSQL backend)
  - Client: `@supabase/supabase-js` 2.57.4
  - Initialization: `src/lib/supabase.ts`
  - URL: `https://ujasdbelviyamnwxjgth.supabase.co`
  - Auth: Anonymous client key (public frontend key)
  - Tables accessed:
    - `review_data` - Aggregated review metrics (total_reviews, average_rating, star counts)
    - Blog posts table (schema defined in `src/lib/supabase.ts` BlogPost interface)

**Review Data Fallback:**
- Google Sheets (spreadsheet-based fallback)
  - URL: `https://docs.google.com/spreadsheets/d/1ZZ3-sLfyRXhls8tPGe6hxK_W5vEfkO0XnHCxbwBNtCY/gviz/tq?tqx=out:json&range=A2:D2`
  - Used in: `src/hooks/useReviewData.ts`
  - Fallback: When Supabase unavailable, reads review count and rating from public Google Sheet
  - Default fallback: 92 reviews, 5.0 rating
  - Purpose: Display review metrics on website (used in Home page and testimonial sections)

**File Storage:**
- Hardcoded image assets in `/public/images/` (static)
  - Logo: `/dte_favicon.png`
  - Manifests: `/site.webmanifest`
  - No dynamic file upload/storage integrated

**Caching:**
- Browser sessionStorage only:
  - `dte_session_id` - Session tracking ID generated via `crypto.randomUUID()`
  - `dte_landing_page` - First page user visited in session
  - Used in: `src/hooks/useLeadTracking.ts`

## Authentication & Identity

**Auth Provider:**
- None (public/anonymous access)
  - Supabase anon key used for read-only access to public tables
  - No user authentication layer implemented
  - Form submissions tracked via sessionId (not user accounts)

**User Tracking:**
- Custom session tracking without authentication:
  - Session ID: Generated on first form interaction, stored in sessionStorage
  - Tracking data captured: `src/hooks/useLeadTracking.ts`
    - UTM parameters (source, medium, campaign, term, content)
    - Referrer URL
    - Landing page
    - Device type (mobile/tablet/desktop)
    - Screen resolution
    - User agent
    - Form start timestamp
  - Sent with every form submission to n8n webhooks

## Monitoring & Observability

**Error Tracking:**
- None (no third-party error tracking service)

**Logs:**
- Browser console only (development and production):
  - Example: `console.error('Failed to load reviews:', err)` in `src/hooks/useReviewData.ts`
  - Errors logged on catch blocks in data fetching functions
  - No log aggregation or external monitoring

**Performance:**
- No analytics integration (Google Analytics, etc. not configured)

## CI/CD & Deployment

**Hosting:**
- Vercel (production deployment platform)
  - Configuration: `vercel.json`
  - Behavior:
    - All routes rewrites to `/index.html` for client-side routing
    - /home redirects to / (permanent redirect)
    - Static asset bundling via Vite

**CI Pipeline:**
- Not detected (no GitHub Actions, GitLab CI, or similar configured)
- Manual deployment to Vercel via git push

**Build Process:**
- Vite development server (local dev): `npm run dev`
- Vite production build: `npm run build` → outputs to `dist/`
- Type checking: `npm run typecheck` (strict mode)
- Linting: `npm run lint`

## Environment Configuration

**Required env vars:**
- None currently enforced
- All configuration is hardcoded in source:
  - Supabase credentials in `src/lib/supabase.ts`
  - Webhook URLs in `src/hooks/useMultiStepForm.ts` and `src/pages/Financing.tsx`
  - Roofle widget ID in `index.html`

**Secrets location:**
- Supabase anon key: `src/lib/supabase.ts` (line 4)
  - Note: Anon keys are public-safe (frontend keys, not service role keys)
- No other secrets detected in codebase

**Recommended migration:**
- Move hardcoded URLs to environment variables:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
  - VITE_WEBHOOK_FORM_URL
  - VITE_WEBHOOK_FINANCING_URL
  - VITE_ROOFLE_WIDGET_ID

## Webhooks & Callbacks

**Incoming:**
- None (no webhook receivers implemented)

**Outgoing:**
- n8n webhook for lead form submissions:
  - Endpoint: `https://n8n.whitflow.com/webhook/dte-form-submissions`
  - Trigger: User submits multi-step lead form (Service → Address → Contact Info → Confirmation)
  - Payload includes: Form data, source page, tracking data, timestamps
  - Used by: `src/hooks/useMultiStepForm.ts` (line 107-112)

- n8n webhook for financing inquiries:
  - Endpoint: `https://n8n.whitflow.com/webhook/dte-financing-submissions`
  - Trigger: User submits financing form on `/financing` page
  - Payload includes: Financing product, name, email, phone, project description, tracking
  - Used by: `src/pages/Financing.tsx` (line 70-75)

## Third-Party CDN Resources

**Google Fonts:**
- Preconnected in `index.html` for performance
- Actual font imports in `src/index.css` (if Tailwind default fonts not overridden)

**Roofle Widget CDN:**
- Widget script: `https://app.roofle.com/roof-quote-pro-widget.js?id=zEGtbFpfjh6Snz6t4Tz23`
- Loads asynchronously in `index.html`
- Provides embedded quote tool widget

---

*Integration audit: 2026-03-21*
