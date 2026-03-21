<!-- GSD:project-start source:PROJECT.md -->
## Project

**DTE Roofing Website**

A marketing website for DTE Roofing LLC, a roofing company founded by two brothers in Hilliard, Ohio serving the Columbus metro area. The site drives leads through service pages, location pages, an instant quote tool (Roofle), financing info, and a contact/lead form backed by Supabase.

**Core Value:** Generate qualified roofing leads by building trust through professional presentation, real project photos, and verified reviews.

### Constraints

- **Tech stack**: React + Tailwind CSS, no new heavy dependencies (prefer CSS/lightweight JS solutions)
- **Images**: Use existing `/public/images/` assets only
- **Design**: Must integrate cleanly with existing page aesthetic (charcoal/primary-700 color scheme)
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.5.3 - All application code, configuration, and components
- JSX/TSX - React component markup in `src/components/` and `src/pages/`
- JavaScript - Configuration files (vite.config.ts uses TS, but eslint.config.js, tailwind.config.js, postcss.config.js are JS)
- HTML - Static markup in `index.html`
- CSS - Tailwind utility classes and custom styles in `src/index.css`
## Runtime
- Node.js v24.11.0 (recommended)
- Browser-based React application (ESM module format)
- npm 11.6.2
- Lockfile: `package-lock.json` (present)
## Frameworks
- React 18.3.1 - UI library and component framework
- React Router DOM 7.9.4 - Client-side routing, implemented in `src/App.tsx` with 30+ routes for services, locations, and pages
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- Vite 5.4.2 - Build tool and dev server
- Not detected
## Key Dependencies
- @supabase/supabase-js 2.57.4 - Database client for Supabase PostgreSQL backend
- lucide-react 0.344.0 - Icon library (excluded from Vite optimization)
- embla-carousel-react 8.6.0 - Carousel/slider component library
- embla-carousel-autoplay 8.6.0 - Auto-play plugin for embla
- Native React hooks (useState, useCallback, useEffect) for form state and validation
- Custom hooks: `useMultiStepForm`, `useLeadTracking`, `useReviewData` in `src/hooks/`
## Configuration
- Client-side environment: Uses hardcoded Supabase credentials (not env-based currently)
- Webhook URLs: Hardcoded n8n endpoints in `src/hooks/useMultiStepForm.ts` and `src/pages/Financing.tsx`
- Deployment config: `vercel.json` (redirects /home to /, rewrites all paths to index.html)
- TypeScript configs:
- Linting config: `eslint.config.js` (TypeScript ESLint with React hooks and refresh plugins)
## Platform Requirements
- Node.js 24.11.0 or compatible LTS version
- npm 11.6.2 or yarn
- TypeScript knowledge for `src/` changes
- Vite development server included in dependencies
- Deployment target: Vercel (via `vercel.json` configuration)
- CDN for static assets (Vite handles bundling to `dist/`)
- Roofle widget loaded via CDN: `https://app.roofle.com/roof-quote-pro-widget.js` (async script in index.html)
- Google Fonts CDN preconnected in `index.html`
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Components: PascalCase (e.g., `Navigation.tsx`, `FormField.tsx`)
- Pages: PascalCase (e.g., `Home.tsx`, `Services.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useMultiStepForm.ts`, `useLeadTracking.ts`)
- Utilities: camelCase (e.g., `formatPhone.ts`, `formValidation.ts`)
- Data files: camelCase (e.g., `projects.ts`)
- Directories: kebab-case for multi-word directories (e.g., `lead-form/`, `seo/`, `pages/services/`)
- Component functions: PascalCase (e.g., `Navigation`, `FormField`, `StepService`)
- Hook functions: camelCase with `use` prefix (e.g., `useMultiStepForm`, `useLeadTracking`)
- Regular utility functions: camelCase (e.g., `formatPhoneNumber`, `validateEmail`, `validateRequired`, `getOrCreateSessionId`, `getLandingPage`, `getDeviceType`)
- Internal helper functions: camelCase (e.g., `updateOrCreateMetaTag`, `scrollPrev`, `scrollNext`)
- Const declarations: camelCase (e.g., `formData`, `currentStep`, `isSubmitting`)
- State variables: camelCase (e.g., `reviewData`, `isOpen`, `isSubmitting`)
- Constants (all caps): UPPER_SNAKE_CASE (e.g., `WEBHOOK_URL`, `CANONICAL_DOMAIN`, `SERVICES`, `URGENCY_OPTIONS`)
- Boolean variables: prefixed with `is`, `has`, `should` (e.g., `isSubmitting`, `isServicesOpen`, `isMobileMenuOpen`)
- Refs: suffixed with `Ref` (e.g., `closeTimeoutRef`, `autoplay`, `emblaRef`)
- Interfaces: PascalCase with "Props" suffix for component props, "Data" suffix for data types (e.g., `FormFieldProps`, `LeadFormData`, `TrackingData`, `ReviewData`)
- Type aliases: PascalCase (e.g., `FormErrors`, `BlogPost`)
- Discriminant unions: PascalCase (e.g., `'forward' | 'backward'`, `'idle' | 'success' | 'error'`, `'mobile' | 'tablet' | 'desktop'`)
## Code Style
- No explicit formatter configured (no Prettier config found)
- Indentation: 2 spaces (observed in vite.config.ts and component files)
- Line length: Appears flexible, no strict limit observed
- Semicolons: Used consistently
- Trailing commas: Used in multi-line objects/arrays
- Tool: ESLint with TypeScript support
- Config file: `eslint.config.js`
- Enabled rules:
- Key rules:
- Generally minimal comments; code is self-documenting
- JSDoc-style blocks used for complex logic (e.g., `updateOrCreateMetaTag` in SEO.tsx)
- Inline comments used sparingly for clarification:
- Comments typically explain "why" rather than "what" the code does
## Import Organization
- No path aliases configured (no alias imports observed)
- Relative imports used consistently
## Error Handling
- Try-catch with generic error handling and fallback values
- Example in `useReviewData.ts`:
- Form validation errors stored in state: `errors` object with field-level error messages
- Network request errors handled with status checks:
- Timeout handling: AbortController used for fetch requests with 10-second timeout
- Form submissions: `submitStatus` tracks 'idle', 'success', 'error'
- Async data loading: Separate loading/error state variables (e.g., `loading`, `error` in useReviewData)
- User-facing errors: Display error messages from validation map to specific form fields
## Logging
- Error logging: `console.error('Failed to load reviews:', err)` in `useReviewData.ts`
- No info/warning/debug logging observed
- Errors logged to console for development visibility
- Minimal logging in production (error cases only)
## Type Annotations
- All function parameters typed (TypeScript strict mode enabled)
- All return types explicitly annotated on exported functions
- Component props interfaces defined inline or at module level
- Type imports use `import type` syntax:
## Function Design
- Small, focused functions (typically 20-50 lines)
- Hooks kept concise with single responsibility
- Utility functions kept to single operation (e.g., `formatPhoneNumber`, `validateEmail`)
- Props passed as object destructuring (typical React pattern)
- Example: `function Navigation() { const [isOpen, setIsOpen] = useState(false); }`
- Callback props follow naming convention: `onNext`, `onBack`, `onSelect`, `onSubmit`, `onChange`
- Functions return typed values or void
- Hooks return objects with named properties
- Components return JSX or null
- Utility functions return primitives (string, boolean) or objects
## State Management
- React hooks only (useState, useRef, useEffect, useCallback)
- No Redux, Context API, or other state library
- State updates with setter functions from useState
- Callback memoization with useCallback for event handlers
- Refs used for non-state values that shouldn't trigger re-renders (e.g., timeouts, carousel refs)
## JSX Patterns
- Single component per file (except index files)
- Props destructured in function signature
- Minimal inline styles (Tailwind CSS preferred)
- Event handlers defined with arrow functions or useCallback
- Conditional rendering with ternary operators or && operator
## Module Design
- Components: `export default function ComponentName()`
- Hooks: `export function useHookName()` or `export const useHookName = () => {}`
- Data: `export const dataArray: Type[] = [...]`
- Types: `export interface InterfaceName {}` or `export type TypeName = ...`
- Utilities: `export function utilityName()` or `export const utilityName = () => {}`
- Not used in this codebase
- Direct imports from specific files preferred
- Defined at module level (above components)
- Example: `const WEBHOOK_URL = '...'` in useMultiStepForm.ts
- Example: `const SERVICES = [...]` in StepService.tsx
## Naming Edge Cases
- Service mapping object: `serviceMap: Record<string, string>` (maps URL slugs to form values)
- Consistent use of object destructuring for component props
- Array destructuring for hooks: `const [state, setState] = useState(initialValue)`
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- React 18 with TypeScript for type-safe component development
- React Router v7 for multi-page routing and navigation
- Custom hook-based state management for form and data handling
- Responsive Tailwind CSS styling with custom utility configuration
- API integration via Supabase SDK for dynamic content and webhooks for lead capture
- SEO-optimized with meta tag manipulation and structured schema markup in-component
## Layers
- Purpose: Display and user interaction
- Location: `src/components/`
- Contains: React components (Pages, Forms, Layout, Reusable UI)
- Depends on: Hooks, utilities, styling (Tailwind)
- Used by: React Router and parent components
- Purpose: Route-specific page compositions
- Location: `src/pages/` and `src/pages/services/`, `src/pages/locations/`
- Contains: Page components that map to routes, template-based service/location pages
- Depends on: Presentation components, hooks, SEO utilities
- Used by: React Router (App.tsx)
- Purpose: Complex state handling, API calls, tracking
- Location: `src/hooks/`
- Contains: Custom hooks (useMultiStepForm, useReviewData, useLeadTracking)
- Depends on: Utils, lib (Supabase), external APIs
- Used by: Components and pages
- Purpose: Static data, type definitions, constants
- Location: `src/data/` and `src/seo/`
- Contains: Project carousel data, SEO constants, schema definitions
- Depends on: None
- Used by: Components, hooks, pages
- Purpose: Third-party service clients
- Location: `src/lib/supabase.ts`
- Contains: Supabase client initialization, blog post types
- Depends on: Supabase SDK
- Used by: Hooks (useReviewData)
- Purpose: Reusable functions and validators
- Location: `src/utils/`
- Contains: Form validation, phone formatting
- Depends on: None
- Used by: Hooks and components
## Data Flow
## Key Abstractions
- Purpose: DRY pattern for 12+ service pages with identical structure
- Examples: `src/pages/services/RoofRepair.tsx`, `src/pages/services/RoofInstallation.tsx`, `src/pages/services/Gutters.tsx`
- Pattern: Service pages pass config object (serviceName, slug, content sections, FAQs) to template component which handles layout, SEO, schema generation
- Purpose: Encapsulate complex multi-step form logic (state, validation, submission)
- Location: `src/hooks/useMultiStepForm.ts`
- Exports: Form data, errors, step navigation, submission handlers
- Pattern: Custom hook exposes interface allowing components to be form-agnostic; stepValidators map validates each step
- Purpose: Meta tag injection and structured data markup
- Examples: `SEO.tsx` (meta tags), `SchemaMarkup.tsx` (JSON-LD), `SeoSchema.tsx` (schema helpers)
- Pattern: Effects-based meta manipulation at page/component mount time; schema objects defined in `src/seo/schemas.ts`
- Purpose: Centralized, type-safe carousel and gallery data
- Location: `src/data/projects.ts`
- Pattern: Static TypeScript array with Project interface; exported subsets (carouselProjects) for selective consumption
## Entry Points
- Location: `src/main.tsx`
- Triggers: Browser page load
- Responsibilities: DOM mounting, React initialization, StrictMode wrapping
- Location: `src/App.tsx`
- Triggers: After React initialization
- Responsibilities: Route definitions (40+ routes), layout wrapper (Nav/Footer), form service mapping via defaultService prop
- Location: `src/pages/Home.tsx`
- Triggers: Route "/"
- Responsibilities: Hero section, mission statement, founder story, work carousel, CTA sections
- Location: `src/pages/services/*.tsx`
- Triggers: Routes like "/services/roof-repair"
- Responsibilities: Wrap ServicePageTemplate with service-specific content config
- Locations: Embedded in Home, service pages, dedicated InstantQuote page
- Trigger: User clicks "Get Quote" or dedicated form page
- Responsibilities: Collect lead info, submit to webhook, display result
## Error Handling
- Form validation: stepValidators check fields, setErrors on component state
- API failures: useReviewData catches fetch errors, displays fallback review count (92)
- Lead submission: Fetch wrapped in try-catch with 10s timeout; error sets submitStatus='error' and shows StepResult error screen
- Webhook timeouts: AbortController with 10000ms timeout prevents hanging requests
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
