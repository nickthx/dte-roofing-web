<!-- GSD:project-start source:PROJECT.md -->
## Project

**DTE Roofing — Local Authority & Service Area SEO Overhaul**

A structural/technical SEO overhaul of the /locations hub and 13 location subpages on dteroofingllc.com. The existing content is strong and approved — this milestone fixes schema markup, internal linking, hub page structure, and footer coverage to establish proper local SEO authority across all service areas.

**Core Value:** Establish DTE Roofing as the authoritative local roofing contractor across all 13 Central Ohio service areas through proper schema, cross-linking, and page structure — without touching approved content.

### Constraints

- **Content**: Do NOT rewrite or modify existing page content (paragraphs, testimonials, FAQs, service descriptions)
- **URLs**: Do NOT change any URLs or slugs
- **NAP**: Do NOT change business name, address, phone, or email anywhere
- **Design**: All new elements must match existing Tailwind design (charcoal/primary-700 color scheme)
- **Images**: Use existing /public/images/ assets only
- **Dependencies**: No new heavy dependencies — prefer CSS/lightweight JS solutions
- **Approval**: Complete each phase fully, verify, and get user approval before starting next phase
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.5.3 - All application code, configuration, and components (`src/` directory)
- JSX/TSX - React component markup in `src/components/` and `src/pages/`
- JavaScript - Configuration files (`eslint.config.js`, `tailwind.config.js`, `postcss.config.js`)
- HTML - Static markup in `index.html`
- CSS - Tailwind utility classes and custom styles in `src/index.css`
## Runtime
- Node.js v24.11.0 (recommended)
- Browser-based React application (ESM module format)
- npm 11.6.2
- Lockfile: `package-lock.json` (present)
## Frameworks
- React 18.3.1 - UI library and component framework
- React Router DOM 7.9.4 - Client-side routing with 40+ routes for services, locations, and pages (implemented in `src/App.tsx`)
- Tailwind CSS 3.4.1 - Utility-first CSS framework with custom color extensions (charcoal and primary red)
- Vite 5.4.2 - Build tool and dev server
- @vitejs/plugin-react 4.3.1 - React plugin for Vite
- ESLint 9.9.1 - Code linting with TypeScript support
- typescript-eslint 8.3.0 - TypeScript linting rules
- eslint-plugin-react-hooks 5.1.0-rc.0 - React hooks linting rules
- eslint-plugin-react-refresh 0.4.11 - React fast refresh linting
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- PostCSS 8.4.35 - CSS transformation tool
- autoprefixer 10.4.18 - Vendor prefix auto-insertion
- TypeScript 5.5.3 - Static type checking
## Key Dependencies
- @supabase/supabase-js 2.57.4 - PostgreSQL database client for dynamic content and review data (`src/lib/supabase.ts`)
- lucide-react 0.344.0 - Icon library (excluded from Vite optimization in `vite.config.ts`)
- embla-carousel-react 8.6.0 - Carousel/slider component library
- embla-carousel-autoplay 8.6.0 - Auto-play plugin for embla carousels
- React Hooks only - useState, useRef, useEffect, useCallback (no Redux or Context API)
## Configuration
- Supabase credentials hardcoded in `src/lib/supabase.ts` (URL: `https://ujasdbelviyamnwxjgth.supabase.co`)
- Webhook URLs hardcoded in source files (not env-based)
- Roofle widget CDN loaded in `index.html` with ID: `zEGtbFpfjh6Snz6t4Tz23`
- Vite config: `vite.config.ts`
- TypeScript configs:
- ESLint config: `eslint.config.js` with TypeScript, React hooks, and React refresh plugins
- Tailwind config: `tailwind.config.js` with custom color theme (charcoal and primary red)
- PostCSS config: `postcss.config.js` with Tailwind and autoprefixer
- Vercel config: `vercel.json`
## Platform Requirements
- Node.js 24.11.0 or compatible LTS version
- npm 11.6.2 or yarn
- TypeScript knowledge for modifications to `src/` files
- Vite development server (included in dependencies)
- Deployment target: Vercel (via `vercel.json` configuration)
- CDN for static assets (Vite handles bundling to `dist/`)
- Roofle widget loaded via CDN: `https://app.roofle.com/roof-quote-pro-widget.js` (async script in `index.html`)
- Google Fonts CDN preconnected in `index.html`
## TypeScript Configuration
- Target: ES2020
- Module: ESNext
- Strict mode: enabled
- No unused locals/parameters: enforced
- No fallthrough cases in switch: enforced
- JSX: react-jsx (automatic runtime)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Components: PascalCase (e.g., `FormField.tsx`, `Navigation.tsx`, `SEO.tsx`)
- Pages: PascalCase (e.g., `Home.tsx`, `Contact.tsx`, `BlogPost.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useMultiStepForm.ts`, `useReviewData.ts`)
- Utilities: camelCase (e.g., `formatPhone.ts`, `formValidation.ts`)
- Data files: camelCase (e.g., `projects.ts`)
- Directories: kebab-case for multi-word dirs (e.g., `lead-form/`, `pages/services/`, `pages/locations/`)
- Component functions: PascalCase (e.g., `export default function FormField()`, `export default function Navigation()`)
- Hook functions: camelCase with `use` prefix (e.g., `export function useMultiStepForm()`, `export const useReviewData = () => {}`)
- Regular utility functions: camelCase (e.g., `formatPhoneNumber()`, `validateEmail()`, `validatePhone()`)
- Internal helper functions: camelCase (e.g., `getOrCreateSessionId()`, `getLandingPage()`, `getDeviceType()`, `updateOrCreateMetaTag()`)
- State variables: camelCase (e.g., `formData`, `currentStep`, `isSubmitting`, `reviewData`)
- Boolean variables: prefixed with `is`, `has`, or `should` (e.g., `isSubmitting`, `isServicesOpen`, `isMobileMenuOpen`, `error` for error states)
- Refs: suffixed with `Ref` (e.g., `closeTimeoutRef`, `emblaRef`, `dataRef`)
- Constants (all caps): UPPER_SNAKE_CASE (e.g., `WEBHOOK_URL`, `CANONICAL_DOMAIN`, `DEFAULT_REVIEW_COUNT`)
- Interfaces: PascalCase with suffix for clarity (e.g., `FormFieldProps`, `LeadFormData`, `TrackingData`, `ReviewData`)
- Type aliases: PascalCase (e.g., `FormErrors`)
- Discriminant unions: Use string literals (e.g., `'forward' | 'backward'`, `'idle' | 'success' | 'error'`, `'mobile' | 'tablet' | 'desktop'`)
## Code Style
- Indentation: 2 spaces (observed consistently across all files)
- Line length: Flexible, no strict limit enforced
- Semicolons: Always used
- Trailing commas: Used in multi-line objects/arrays
- No explicit formatter like Prettier (no `.prettierrc` found)
- Tool: ESLint with TypeScript support
- Config: `eslint.config.js`
- Enabled plugins:
- React hooks dependency arrays enforced (`react-hooks/exhaustive-deps`)
- React components must be PascalCase and exported directly (enforced via `react-refresh/only-export-components`)
- TypeScript strict mode enabled (via `tsconfig.app.json`)
## Import Organization
- No path aliases configured (all imports use relative paths)
- Import order observed:
- Components: `../components/`, `./components/`
- Hooks: `../hooks/`
- Utilities: `../utils/`
- Data: `../data/`
- Library: `../lib/`
- Pages: `./` for same-level or `../pages/` for cross-directory
## TypeScript Strictness
- `strict: true` - All strict type checking options enabled
- `noUnusedLocals: true` - Error on unused variables
- `noUnusedParameters: true` - Error on unused function parameters
- `noFallthroughCasesInSwitch: true` - Error on missing switch cases
- All function parameters must have explicit types
- All exported function return types explicitly annotated
- Component props defined via interfaces (e.g., `FormFieldProps`, `ServicePageProps`)
- Generic types used where appropriate (e.g., `Record<string, string>`, `Partial<Record<keyof LeadFormData, string>>`)
## Error Handling
- Validators return `string | null` (error message or null for valid)
- Example from `formValidation.ts`:
- Step-based validation stored in `stepValidators` object mapping step number to validator function
- Form errors stored in state: `errors` object of type `FormErrors` (partial record of field errors)
- Try-catch blocks for async operations (e.g., fetch, Supabase queries)
- AbortController used for fetch requests with timeout (10000ms)
- Example from `useMultiStepForm.ts`:
- Separate error/loading state variables (e.g., `loading`, `error` in `useReviewData`)
- Fallback values used on error: `DEFAULT_REVIEW_COUNT = 92` in `useReviewData.ts`
- Errors logged to console: `console.error('Failed to load reviews:', err)`
- Field-level error messages displayed below inputs
- Error styling applied to inputs: `border-red-500` when `error` prop present
- Accessibility: `aria-invalid` and `aria-describedby` attributes on inputs with errors
## Logging
- Error logging only: `console.error('Failed to load reviews:', err)` in `useReviewData.ts`
- Errors logged at point of failure for development debugging
- No info/warning/debug logging observed
- Minimal logging in general (errors only)
## Comments
- Generally minimize comments; code is self-documenting
- Comments explain "why" not "what"
- Example from `Navigation.tsx` - complex dropdown fix with detailed explanation:
- Used sparingly for complex utility functions
- Example from `SEO.tsx` - inline comment for helper function:
- Interface properties documented in interface definition, not comment blocks
## Function Design
- Hook functions keep setup logic concise
- Utility functions single-purpose
- Example: `formatPhoneNumber()` handles only phone formatting:
- Props destructured in function signature: `function FormField({ label, name, type = 'text', ... })`
- Callback props follow naming: `onNext`, `onBack`, `onSubmit`, `onChange`, `onMouseEnter`, `onMouseLeave`
- Default parameter values used (e.g., `type = 'text'`, `required = false`)
- All return types explicitly annotated
- Components return JSX or null
- Hooks return objects with named properties
- Utility functions return primitives (string, boolean, number) or typed objects
- Example from `useMultiStepForm()`:
## Module Design
- Components: `export default function ComponentName()`
- Hooks: `export function useHookName()` or `export const useHookName = () => {}`
- Data: `export const dataArray: Type[] = [...]`
- Types/Interfaces: `export interface InterfaceName {}` or `export type TypeName = ...`
- Utilities: `export function utilityName()` or `export const utilityName = () => {}`
- One component per file (except index files)
- Utilities grouped by domain (e.g., all form validation in `formValidation.ts`, phone formatting in `formatPhone.ts`)
- Not used in this codebase
- Direct imports from specific files preferred
- Module-level constants defined above components/functions
- Example from `useMultiStepForm.ts`:
## State Management
- State updates with setter functions: `const [state, setState] = useState(initialValue)`
- Callback memoization with `useCallback` for event handlers that are passed as props
- Refs used for non-state values (timeouts, carousel refs, session storage)
- useEffect for side effects (fetching data, setting up listeners)
- Direct state mutations avoided
## JSX Patterns
- Ternary operators for binary conditions: `{error ? <ErrorMsg /> : <Input />}`
- Logical AND (`&&`) for single branch: `{isLoading && <Spinner />}`
- Switch statements for multi-step scenarios (e.g., form step rendering)
- Arrow functions inline for simple handlers: `onClick={() => setIsOpen(!isOpen)}`
- `useCallback` for handlers passed to child components: prevents unnecessary re-renders
- Example from `useMultiStepForm.ts`:
- Tailwind CSS utility classes exclusively
- No inline styles (except background-image in Hero section for dynamic content)
- Example from `FormField.tsx`:
- Form inputs have `aria-invalid` and `aria-describedby` attributes
- Images have `alt` attributes (e.g., `alt="DTE Roofing Logo"`)
- Navigation landmarks: `<header>`, `<main>`, `<nav>` semantic elements
- Color contrast enforced via Tailwind classes
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Hook-based state management (no Redux/Context API)
- Multi-step form abstraction for lead capture
- Service page template pattern for DRY service/location pages
- SEO-first design with meta tag manipulation and JSON-LD schema
- Supabase + webhook integration for lead persistence and external processing
## Layers
- Purpose: Display UI and handle user interaction
- Location: `src/components/`, `src/pages/`
- Contains: React components (page components, form steps, reusable UI elements)
- Depends on: Hooks (for state/data), utilities (for formatting), Tailwind CSS
- Used by: React Router and parent components
- Purpose: Route-specific page compositions that map to URL paths
- Location: `src/pages/`, `src/pages/services/`, `src/pages/locations/`
- Contains: Page components (Home.tsx, Services.tsx, 12+ service pages, 13+ location pages)
- Depends on: Presentation components, hooks (useReviewData, useLeadTracking), SEO utilities
- Used by: React Router in `src/App.tsx`
- Purpose: Complex state handling, API calls, form logic, tracking
- Location: `src/hooks/`
- Contains:
- Depends on: Utils (validation, formatting), Supabase client
- Used by: Components and pages
- Purpose: Third-party service clients and configuration
- Location: `src/lib/`
- Contains: Supabase client initialization (`supabase.ts`), type definitions (BlogPost)
- Depends on: @supabase/supabase-js SDK
- Used by: Hooks (useReviewData)
- Purpose: Reusable functions and validators
- Location: `src/utils/`
- Contains:
- Depends on: None
- Used by: Hooks and components
- Purpose: Static data, constants, and SEO config
- Location: `src/data/`, `src/seo/`
- Contains:
- Depends on: None
- Used by: Components, pages, SEO components
- Purpose: Meta tag manipulation and structured data markup
- Location: `src/components/SEO.tsx`, `src/components/SchemaMarkup.tsx`, `src/components/seo/SeoSchema.tsx`
- Contains: SEO component (meta tags), schema markup generators (JSON-LD)
- Depends on: React effects, utility components
- Used by: Pages and service page templates
## Data Flow
- React hooks only: useState for form data, errors, submission status, UI state
- useRef for non-state values: timeouts (Navigation), carousel refs (WorkCarousel)
- useCallback for memoized callbacks: form field updates, step navigation
- Custom hooks abstract complex logic: useMultiStepForm, useReviewData, useLeadTracking
- No Context API or Redux: form data passed as props through component tree
## Key Abstractions
- Purpose: Generate 25+ identical page structures (12 services + 13 locations) from config
- Examples: `src/pages/services/RoofRepair.tsx`, `src/pages/locations/Columbus.tsx`
- Pattern:
- Purpose: Encapsulate multi-step form logic without coupling to UI
- Location: `src/hooks/useMultiStepForm.ts`
- Exports: Form data object, errors object, step navigation functions, submit handler
- Pattern:
- Purpose: Centralize meta tag and schema generation
- Components:
- Pattern: Pass config props (title, description, schema type) to components; effects handle DOM manipulation
- Purpose: Abstract data source (Supabase vs Google Sheets) from consumers
- Location: `src/hooks/useReviewData.ts`
- Pattern:
## Entry Points
- Location: `src/main.tsx`
- Triggers: Browser page load
- Responsibilities:
- Location: `src/App.tsx`
- Triggers: After React initialization
- Responsibilities:
- Location: `src/pages/Home.tsx`
- Triggers: Route "/"
- Responsibilities:
- Location: `src/pages/services/*.tsx` (12 pages)
- Triggers: Routes like "/services/roof-repair"
- Responsibilities:
- Location: `src/pages/locations/*.tsx` (13 pages)
- Triggers: Routes like "/locations/columbus"
- Responsibilities:
- Location: `src/components/lead-form/` (MultiStepLeadForm, steps/)
- Triggers: User clicks "Get Quote" or navigates to form page
- Responsibilities:
## Error Handling
- stepValidators object validates each step's fields
- setErrors tracks field-level error messages
- User cannot proceed to next step until errors cleared
- Error messages display below affected fields
- Examples in `src/hooks/useMultiStepForm.ts`:
- useReviewData tries Supabase first, catches with try-catch
- Falls back to Google Sheets fetch if Supabase fails
- Falls back to hardcoded defaults if both fail
- Error logged to console; user sees default value (92 reviews)
- Example in `src/hooks/useReviewData.ts`:
- useMultiStepForm wraps submission in try-catch
- AbortController with 10-second timeout prevents hanging
- Network errors caught; submitStatus set to 'error'
- User sees StepResult component with retry button
- Example in `src/hooks/useMultiStepForm.ts`:
- SEO component safely creates/updates meta tags with null checks
- Schema injection in try-catch wraps JSON.stringify
- No unhandled promise rejections; all async operations wrapped
## Cross-Cutting Concerns
- Error logging to console only: `console.error('Failed to load reviews:', err)`
- No info/warning/debug logging in production
- Errors logged for developer visibility during dev
- Form validation centralized in `src/utils/formValidation.ts`
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Phone: 10-digit format validation
- Required fields: trim and check non-empty
- Validators reusable across hooks and components
- Every page/service/location wrapped with SEO component
- Canonical URLs set via CANONICAL_DOMAIN constant + route slug
- Open Graph and Twitter meta tags auto-populated
- JSON-LD schema injected for Google rich results
- Schema types: Organization, Service, LocalBusiness, FAQPage
- None currently: Supabase client uses anonymous key
- Webhook URLs and Supabase credentials hardcoded in source
- No API authentication or JWT tokens
- useLeadTracking captures on first render: UTM params, referrer, landing page, device type, screen resolution, user agent, session ID
- Session ID generated with crypto.randomUUID() and stored in sessionStorage
- Landing page stored in sessionStorage on first form load (persists across steps)
- All tracking data included in webhook payload for CRM integration
- Tailwind CSS utility classes (primary-700, charcoal-900, etc.)
- Custom color scheme: primary (primary-700, primary-800), charcoal (charcoal-600, charcoal-900)
- Responsive design: sm (640px), md (768px), lg (1024px) breakpoints
- Lucide-react icons throughout (Phone, Shield, Star, ChevronRight, etc.)
- Images located in `public/images/` (project photos, hero images, logo)
- Roofle widget loaded via CDN: `https://app.roofle.com/roof-quote-pro-widget.js`
- Google Fonts preconnected in index.html
- Embla carousel for image galleries and work showcase
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
