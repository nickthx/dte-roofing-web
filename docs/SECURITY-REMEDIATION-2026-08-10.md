# Security Remediation Plan — dteroofingllc.com

**Audit date:** 2026-08-10
**Overall score:** 2 / 5 (Major)
**Audit method:** `firebase-security-rules-auditor` red-team rubric, mapped onto this site's real attack surface (no Firestore/Supabase exists), plus the `security-review` OWASP checklist.

> **Do not commit real API keys into this file.** Keys below are shown truncated on purpose.

---

## Priority order

| # | Finding | Severity | Time | Blocking? |
|---|---------|----------|------|-----------|
| 1 | Unrestricted Google Maps API key | **Critical** | 20 min | Do today |
| 2 | Unauthenticated lead webhooks | **High** | 45 min | This week |
| 3 | No length caps on form fields | Medium | 20 min | This week |
| 4 | `react-router` advisory | Low | 10 min | Next routine pass |
| 5 | CSP `unsafe-inline` / `unsafe-eval` | Low | — | Accept, document |

---

## Step 1 — Rotate and restrict the Google Maps API key (Critical)

**Why:** The key `AIzaSyC1iV…MHOS4g` is committed in git history (commit `b421423`) on a GitHub-hosted repo, and is inlined into the production bundle at `/assets/Locations-*.js`. Verified 2026-08-10: a Geocoding REST call with **no** `Referer` header returned real data, and the Maps JS API loaded under a forged `Referer: https://evil-example-test.com`. The key has **no application restriction and no API restriction**. Anyone can bill your Google Cloud account.

Moving it to `VITE_GOOGLE_MAPS_API_KEY` did not fix this. Vite inlines every `VITE_*` variable into the client bundle at build time, so a browser key is always publicly readable. **Restriction is the control, not secrecy.**

### 1.1 — Check for existing abuse

1. Open https://console.cloud.google.com/google/maps-apis/metrics
2. Select the project that owns the key.
3. Set the date range to the last 90 days.
4. Look for request spikes, traffic from unexpected APIs, or usage on days the site had no traffic.
5. If you see abuse, also open **Billing → Reports** and check for unexpected charges. Google will sometimes waive fraudulent charges if you open a support case promptly.

### 1.2 — Create the replacement key

1. Open https://console.cloud.google.com/apis/credentials
2. Click **+ Create credentials → API key**.
3. Click **Edit API key** on the new key.
4. Under **Application restrictions**, select **Websites**.
5. Add exactly one referrer:
   - `https://www.dteroofingllc.com/*`

   > **Do not add `https://*.vercel.app/*`.** Anyone can deploy to a `*.vercel.app` subdomain, so that pattern would let any stranger's Vercel project use your key — it re-opens most of what this estep fixes. Preview deploys will render a blank map instead; `ServiceAreaMap.tsx:135` returns `null` cleanly when the key is rejected.
6. Under **API restrictions**, select **Restrict key**, then check **only**:
   - Maps JavaScript API
7. Click **Save**. Restriction changes can take up to 5 minutes to propagate.

> Do **not** enable Geocoding API on this key. The audit confirmed Geocoding is currently reachable with this key and the site does not use it.

### 1.3 — Roll the new key into the app

1. Update the local file `.env` (already gitignored — never `git add` it):
   ```
   VITE_GOOGLE_MAPS_API_KEY=<new_key_here>
   ```
2. Update the Vercel environment variable:
   ```bash
   vercel env rm VITE_GOOGLE_MAPS_API_KEY production
   vercel env add VITE_GOOGLE_MAPS_API_KEY production
   ```
   (Or set it in the Vercel dashboard: Project → Settings → Environment Variables.)
   Note: the Vercel project is named **dte-roofing-demo** but serves production `dteroofingllc.com`.
3. Verify the build still passes — this repo's `typecheck` and `lint` are pre-existing red, so `build` is the gate:
   ```bash
   npm run build
   ```
4. Deploy (push to `main` deploys live), then confirm the new key shipped:
   ```bash
   curl -sS https://www.dteroofingllc.com/locations \
     | grep -oE '/assets/Locations-[A-Za-z0-9._-]+\.js'
   # then fetch that asset and confirm it contains the NEW key, not the old one
   ```
5. Load https://www.dteroofingllc.com/locations in a browser and confirm the service-area map renders. `ServiceAreaMap.tsx:135` returns `null` when the key is missing, so a blank map means the env var did not reach the build.

### 1.4 — Delete the old key

1. Return to https://console.cloud.google.com/apis/credentials
2. **Only after step 1.3 is verified live**, delete `AIzaSyC1iV…MHOS4g`.
3. Deleting is better than restricting here — the key is in public git history permanently, so it will keep being scraped.

### 1.5 — Do NOT bother rewriting git history

Rewriting history to purge the key is high-effort, breaks every existing clone, and is pointless once the key is deleted in step 1.4. Skip it. Deletion is the fix.

**Done when:** the old key returns `REQUEST_DENIED` on a no-Referer Geocoding call, the map still renders on `/locations`, and no `AIzaSy` literal appears in tracked source (`grep -r "AIzaSy" src/` → no matches).

---

## Step 2 — Lock down the lead webhooks (High)

**Why:** Both webhooks accept unauthenticated POSTs from anywhere. Verified 2026-08-10: an `OPTIONS` preflight with `Origin: https://evil-example-test.com` returned `Access-Control-Allow-Origin: https://evil-example-test.com` — the endpoint reflects any origin. There is no auth header, no CAPTCHA, no honeypot, and no rate limit anywhere in `src/` or `index.html`.

Affected endpoints:
- `src/hooks/useMultiStepForm.ts:17` → `https://n8n.whitflow.com/webhook/dte-form-submissions`
- `src/pages/Financing.tsx:7` → `https://n8n.whitflow.com/webhook/dte-financing-submissions`

**Impact:** scripted junk leads into the CRM, wasted n8n executions, and the sales team calling fabricated phone numbers.

> CORS is not the fix. A CORS policy only constrains browsers — `curl` ignores it entirely. Filter on the n8n side.

### 2.1 — Add a honeypot field (cheapest, catches most bots)

1. In `src/components/lead-form/steps/StepContact.tsx`, add a decoy input that real users never see and never focus:
   ```tsx
   <input
     type="text"
     name="company_website"
     tabIndex={-1}
     autoComplete="off"
     aria-hidden="true"
     value={formData.company_website ?? ''}
     onChange={(e) => updateField('company_website', e.target.value)}
     style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
   />
   ```
   Use CSS off-screen positioning, **not** `display: none` — many bots skip hidden inputs but do fill off-screen ones.
2. Add `company_website: string` to the `LeadFormData` interface in `src/hooks/useMultiStepForm.ts:5` and to the initial state at line 46.
3. Repeat both for `src/pages/Financing.tsx` (its own local `formData` state at line 24).
4. In each n8n workflow, add an **IF** node immediately after the Webhook node: if `company_website` is non-empty, route to **NoOp** and stop. Only the empty branch continues to the CRM.
5. Test: submit the real form normally (should arrive), then `curl` a payload with `company_website` filled (should be silently dropped).

### 2.2 — Rate-limit by IP in n8n

1. In each workflow, add a **Code** node after the honeypot check.
2. Key on `$json.headers['x-forwarded-for']`, store a timestamp per IP in n8n static data, and reject when an IP submits more than ~3 times in 10 minutes.
3. Route rejections to NoOp so the attacker gets no signal about the limit.

### 2.3 — Add Cloudflare Turnstile (only if spam actually starts)

Do not do this pre-emptively — it adds friction to a working lead form on a site whose entire purpose is lead capture. Hold it in reserve. If steps 2.1 and 2.2 stop being enough:

1. Create a Turnstile widget at https://dash.cloudflare.com → Turnstile.
2. Add the site key as `VITE_TURNSTILE_SITE_KEY`; keep the **secret key** in n8n only, never in the frontend.
3. Render the widget on the final form step and send the token in the payload.
4. In n8n, verify the token against `https://challenges.cloudflare.com/turnstile/v0/siteverify` before processing.
5. Add `https://challenges.cloudflare.com` to both `script-src` and `frame-src` in the CSP in `vercel.json:35`.

**Done when:** a `curl` POST with the honeypot filled produces no CRM record, and repeated rapid POSTs from one IP get dropped.

---

## Step 3 — Cap form field lengths (Medium)

**Why:** The audit's "storage abuse / resource exhaustion" check. Only the phone field has a cap (`StepContact.tsx:48`, `maxLength={14}`). `name`, `email`, `address`, and `message` are unbounded — combined with Step 2, an attacker POSTs megabyte strings straight into the n8n workflow and CRM.

1. In `src/components/lead-form/steps/StepContact.tsx`, add `maxLength` to each `FormField`. The prop already exists and is wired through (`FormField.tsx:12,26,60`) — no component changes needed:
   - `name` → `maxLength={100}`
   - `email` → `maxLength={254}` (RFC 5321 maximum)
   - `address` → `maxLength={200}`
   - `message` → `maxLength={2000}`
2. Apply the same caps to the corresponding inputs in `src/pages/Financing.tsx` (`name`, `email`, `projectDescription`).
3. Add matching server-side checks in both n8n workflows. **This is the step that actually matters** — `maxLength` is a DOM attribute an attacker bypasses trivially. Reject or truncate oversized fields in the Code node from step 2.2.
4. Verify: `npm run build`, then submit the form normally to confirm nothing broke.

**Done when:** an oversized `curl` payload is rejected by n8n, not just by the browser.

---

## Step 4 — Patch `react-router` (Low)

**Why:** `npm audit` flags GHSA-qwww-vcr4-c8h2 as high severity across `react-router` 7.12.0–7.18.1. The advisory is specific to **RSC mode**. This app is a client-side SPA with no RSC and no server actions, so it is **not exploitable as currently configured**. Patch it on the next routine pass, not as an emergency.

1. ```bash
   npm audit fix
   ```
2. ```bash
   npm run build
   ```
3. Smoke-test routing in the dev server — click through `/`, `/locations`, `/locations/columbus`, `/blog`, and one service page:
   ```bash
   npm run dev
   ```
4. Confirm prerendering still works after the router bump. This repo uses streaming SSR; lazy/Suspense boundaries must resolve under `onAllReady` or content and meta tags silently vanish from the prerendered HTML:
   ```bash
   npm run build
   # then grep dist/ for expected <title> and body copy on a few routes
   ```
5. Do **not** run `npm audit fix --force`. The remaining 10 advisories are dev-only (build tooling) and `--force` will introduce breaking major-version bumps.

**Done when:** `npm audit --omit=dev` reports 0 vulnerabilities and the prerendered HTML still contains page content and meta tags.

---

## Step 5 — Document the CSP exception (Low, accept)

**Why:** `vercel.json:35` ships `script-src` with both `'unsafe-inline'` and `'unsafe-eval'` (confirmed live in response headers). This means CSP will not stop an injected script. Both are almost certainly required by the Roofle widget.

This is an **accepted risk**, not a bug to fix. The rest of the header set is genuinely strong: HSTS with preload, `nosniff`, `X-Frame-Options: SAMEORIGIN`, a tight `Permissions-Policy`, `object-src 'none'`, `base-uri 'self'`, and `form-action 'self'`.

1. Add a comment above the CSP entry in `vercel.json` noting that `unsafe-inline`/`unsafe-eval` exist for the Roofle widget.
2. Re-test annually: remove both directives locally, run `npm run build && npm run preview`, and load `/get-a-quote-consultation`. If the Roofle widget still works, drop them permanently.
3. If you ever add a nonce-based CSP, the Cloudflare beacon in `index.html:28` and the Roofle loader in `src/components/RoofleSlideout.tsx:3` both need nonces.

---

## Verified clean — no action needed

- **XSS:** one `dangerouslySetInnerHTML` at `src/components/seo/SeoSchema.tsx:20`, fed only author-controlled static schema objects via `JSON.stringify`. No user input reaches it. No `eval`, no `innerHTML`, no `document.write` anywhere in `src/`.
- **Secrets:** `.env` is gitignored; only `.env.example` with a placeholder is tracked. The Cloudflare beacon token (`index.html:28`) and Roofle widget ID are public-by-design identifiers, not secrets.
- **Injection / SSRF / path traversal:** no server code, no API routes, no dynamic URLs built from user input.
- **Data layer:** Supabase is fully removed — not in `package.json`, zero references in `src/`. Review counts now come from the static `src/data/review-stats.json` (`useReviewData.ts`). There is no database, no auth, no user accounts, and no file uploads, so most of the auditor rubric (update bypass, role escalation, ownership checks, type safety on stored fields) has no surface to apply to.

### Stale documentation to correct

`CLAUDE.md` still states *"Supabase credentials hardcoded in `src/lib/supabase.ts`"* and lists `@supabase/supabase-js` as a key dependency. That file no longer exists and the package is uninstalled. Update `CLAUDE.md` so future audits do not chase a risk that was already eliminated.
