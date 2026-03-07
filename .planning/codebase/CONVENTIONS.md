# Coding Conventions

**Analysis Date:** 2026-03-07

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `src/components/ServicePageTemplate.tsx`, `src/pages/services/RoofRepair.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `src/hooks/useMultiStepForm.ts`, `src/hooks/useReviewData.ts`)
- Utility functions: camelCase (e.g., `src/utils/formatPhone.ts`, `src/utils/formValidation.ts`)
- Library/client files: camelCase (e.g., `src/lib/supabase.ts`)
- SEO files: camelCase (e.g., `src/seo/constants.ts`, `src/seo/schemas.ts`)

**Functions:**
- React components: PascalCase function declarations with `export default` (e.g., `export default function Navigation()`)
- Hooks: camelCase with `use` prefix (e.g., `useMultiStepForm`, `useLeadTracking`)
- Utility functions: camelCase (e.g., `validateEmail`, `formatPhoneNumber`)
- Event handlers: camelCase with `handle` prefix (e.g., `handleMouseEnter`, `handleMouseLeave`)
- Internal helpers: camelCase (e.g., `getOrCreateSessionId`, `getLandingPage`, `getDeviceType`)

**Variables:**
- Constants: UPPER_SNAKE_CASE for module-level constants (e.g., `WEBHOOK_URL`, `DEFAULT_REVIEW_COUNT`, `CANONICAL_DOMAIN`, `BUSINESS_INFO`, `SERVICES`, `URGENCY_OPTIONS`)
- State variables: camelCase (e.g., `isServicesOpen`, `isMobileMenuOpen`, `currentStep`)
- Boolean state: `is` prefix (e.g., `isSubmitting`, `isServicesOpen`)

**Types/Interfaces:**
- PascalCase (e.g., `LeadFormData`, `FormErrors`, `TrackingData`, `ReviewData`, `ServicePageProps`)
- Props interfaces: `{ComponentName}Props` suffix (e.g., `MultiStepLeadFormProps`, `FormFieldProps`, `StepServiceProps`)

## Code Style

**Formatting:**
- No Prettier config detected; relies on editor defaults
- 2-space indentation
- Single quotes for string literals
- Semicolons at end of statements
- Trailing commas in function parameters and object literals

**Linting:**
- ESLint flat config at `eslint.config.js`
- Extends: `@eslint/js` recommended + `typescript-eslint` recommended
- Plugins: `react-hooks` (recommended rules), `react-refresh` (warn on non-component exports)
- One `eslint-disable-line` usage observed at `src/components/lead-form/MultiStepLeadForm.tsx:47` for `react-hooks/exhaustive-deps`

**TypeScript:**
- Strict mode enabled in `tsconfig.app.json`
- `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`
- Target: ES2020, Module: ESNext, JSX: react-jsx
- No path aliases configured; all imports use relative paths

## Import Organization

**Order:**
1. React imports (`import { useState, useEffect } from 'react'`)
2. Third-party libraries (`react-router-dom`, `lucide-react`, `@supabase/supabase-js`)
3. Internal components (`../components/SEO`, `./Navigation`)
4. Internal hooks (`../hooks/useReviewData`)
5. Internal utilities/constants (`../seo/constants`, `../utils/formValidation`)
6. Types (imported inline via `import type` or standard import)
7. CSS imports (`./index.css`) -- only in entry point `src/main.tsx`

**Path Aliases:**
- None configured. Use relative paths only (e.g., `../../components/ServicePageTemplate`, `../hooks/useMultiStepForm`)

## Component Patterns

**Page Components:**
- One default export per file: `export default function PageName() { ... }`
- Located in `src/pages/` or `src/pages/{category}/`
- Include `<SEO>` and `<SchemaMarkup>` components at the top of every page for SEO
- Include `<MobileStickyCall />` at the top for mobile CTA
- Wrap content in `<div className="min-h-screen bg-white">`
- Use `useReviewData()` hook to display dynamic review counts

**Service Pages:**
- Use the `ServicePageTemplate` component from `src/components/ServicePageTemplate.tsx`
- Pass structured data props: `serviceName`, `slug`, `subheadline`, `metaDescription`, `keywords`, `problemPromise`, `whatWeDo`, `processSteps`, `faqs`, `relatedServices`
- Include `SchemaMarkup` with `type="service"` before the template

**Location Pages:**
- Self-contained JSX (no shared template yet)
- Include `<SEO>`, `<SchemaMarkup type="location">`, and location-specific content
- Follow same layout pattern: hero section, content sections, CTAs

**Reusable Components:**
- Props defined via TypeScript `interface` directly above the component
- Default export only (no named exports alongside default)
- Render `null` for invisible utility components (e.g., `SEO`, `ScrollToTop`, `SchemaMarkup`)

## Tailwind CSS Usage

**Custom Color Palette:** (defined in `tailwind.config.js`)
- `primary-{shade}`: Red tones (700 = `#b91c1c` is the brand color)
- `charcoal-{shade}`: Gray tones (900 = `#3d3d3d` for dark text)

**Common Utility Patterns:**
- Container: `container mx-auto px-4`
- Section spacing: `py-12`, `py-16`, `py-20`
- Cards: `bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-primary-600 transition-all`
- Primary buttons: `bg-primary-700 text-white px-8 py-4 rounded-lg hover:bg-primary-800 transition-all font-semibold`
- Text hierarchy: `text-charcoal-900` (headings), `text-charcoal-700` (body), `text-charcoal-600` (secondary)
- Responsive breakpoints: `md:` and `lg:` prefixes for tablet/desktop
- Hero sections: `bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white`

**Icon Library:**
- Use `lucide-react` for all icons
- Standard sizing: `w-4 h-4` (inline), `w-5 h-5` (nav), `w-6 h-6` (features), `w-12 h-12` (large cards)

## Error Handling

**Patterns:**
- Validation functions return `string | null` (null = valid): see `src/utils/formValidation.ts`
- Form validation returns `FormErrors` (partial record of field names to error strings): see `src/hooks/useMultiStepForm.ts`
- Async operations use try/catch with fallback defaults (e.g., `useReviewData` falls back to `DEFAULT_REVIEW_COUNT`)
- Network requests use `AbortController` with 10-second timeout: see `src/hooks/useMultiStepForm.ts:92-93`
- Errors logged to `console.error` only

**Form Error Display:**
- Inline error messages below fields using `<p className="text-sm text-red-600">` with `AlertCircle` icon
- ARIA attributes: `aria-invalid` and `aria-describedby` on form inputs: see `src/components/lead-form/FormField.tsx`
- Errors cleared when user updates the corresponding field

## Logging

**Framework:** `console` (browser native)

**Patterns:**
- `console.error` for caught exceptions (e.g., `console.error('Failed to load reviews:', err)` in `src/hooks/useReviewData.ts:69`)
- No structured logging framework
- No debug/info level logging observed

## Comments

**When to Comment:**
- Block comments for complex UI behavior explanations (see `src/components/Navigation.tsx:68-75` dropdown fix documentation)
- JSDoc-style block comments for component purpose documentation (see `src/components/ScrollToTop.tsx:4-22`)
- Inline `// TODO:` comments for planned work (see `src/components/ServicePageTemplate.tsx:192`)

**JSDoc/TSDoc:**
- Sparingly used; only on utility modules (`src/seo/schemas.ts:1-3`, `src/seo/constants.ts:1-3`)
- Not required on components or hooks

## Function Design

**Size:** Components are typically 30-350 lines. Large page components (Home, ServicePageTemplate) can reach 300+ lines of JSX.

**Parameters:**
- Components receive props via destructured interface objects
- Hooks accept primitive configuration parameters (e.g., `formSource: string`)
- Callbacks pass values directly, not events (e.g., `onChange: (value: string) => void` not `onChange: (e: ChangeEvent) => void`)

**Return Values:**
- Components return JSX or `null`
- Hooks return object with named properties (e.g., `{ reviewData, loading, error }`)
- Validation functions return `string | null`

## Module Design

**Exports:**
- One `export default` per component file
- Named exports for types/interfaces alongside default (e.g., `export interface LeadFormData` in `src/hooks/useMultiStepForm.ts`)
- Named exports for utility functions (e.g., `export function validateEmail` in `src/utils/formValidation.ts`)
- Named exports for constants (e.g., `export const CANONICAL_DOMAIN` in `src/seo/constants.ts`)

**Barrel Files:**
- Not used. Import directly from the file.

## SEO Conventions

**Every page must include:**
1. `<SEO>` component with `title`, `description`, `keywords`, and `canonical` props
2. `<SchemaMarkup>` component with appropriate `type` and page metadata
3. Canonical URLs use `CANONICAL_DOMAIN` constant from `src/seo/constants.ts`

**Schema.org patterns:**
- Business info centralized in `BUSINESS_INFO` constant in `src/components/SchemaMarkup.tsx`
- Schema types: `RoofingContractor`, `Service`, `FAQPage`, `BreadcrumbList`, `WebPage`
- Schemas injected via `useEffect` DOM manipulation (not SSR)

## Routing Conventions

**URL patterns:**
- Services: `/services/{kebab-case-name}` (e.g., `/services/roof-repair`)
- Locations: `/locations/{kebab-case-city}` (e.g., `/locations/grove-city`)
- Redirects: Use `<Navigate to="/target" replace />` for legacy/alternate URLs
- All routes defined in `src/App.tsx` -- no lazy loading

---

*Convention analysis: 2026-03-07*
