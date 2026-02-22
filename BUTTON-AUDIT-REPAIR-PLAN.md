# Implementation Plan: Button & Link Audit Fixes

## 1. Unified Google Maps Location
Standardize all Google Maps links to point to the verified "DTE Roofing LLC" profile at 615 Hilliard Rome Rd.
- **Target Files:** `src/pages/Home.tsx`, `src/components/Footer.tsx`, `src/pages/Reviews.tsx`, `src/pages/Contact.tsx`.
- **Action:** Update all `href` values to use the consistent CID (Customer ID) link: `https://www.google.com/maps/place/DTE+Roofing+LLC/@39.9637636,-83.1476323,17z/data=!3m1!4b1!4m6!3m5!1s0x883897c3548f20bf:0xdd1da18d4d7ccf43!8m2!3d39.9637636!4d-83.1476323!16s%2Fg%2F11vrcm8sdz`.

## 2. Standardized Communication
Unify the contact email to match the canonical domain `dteroofingllc.com`.
- **Target Files:** `src/pages/Contact.tsx`, `src/components/ServiceLeadForm.tsx`, `src/pages/FAQ.tsx`.
- **Action:** Change `experience@dteroofing.com` to `experience@dteroofingllc.com`.

## 3. Link Standardizations
- **Phone Links:** Update all `tel:` links to use the `tel:6149716028` format (no dashes) for maximum device compatibility. Standardize the display format to (614) 971-6028 where applicable.
- **Internal Links:** Verify all internal route links (`to="/..."`) match the paths defined in `App.tsx`. All routes were verified during the audit and are currently functional.

## 4. Verification Step
- Click-test every button in the `Navigation` (including mobile).
- Verify every link in the `Footer` across different page types.
- Confirm the `RoofQuoteButton` component leads to the correct lead funnel.
