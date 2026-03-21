# Coding Conventions

**Analysis Date:** 2026-03-21

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Navigation.tsx`, `FormField.tsx`, `ServicePageTemplate.tsx`)
- Pages: PascalCase (e.g., `Home.tsx`, `Contact.tsx`, `RoofRepair.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useMultiStepForm.ts`, `useReviewData.ts`, `useLeadTracking.ts`)
- Data files: camelCase (e.g., `projects.ts`)
- Config/util files: camelCase (e.g., `formValidation.ts`, `formatPhone.ts`)
- Constants: camelCase or UPPER_SNAKE_CASE depending on usage

**Functions:**
- Component functions: PascalCase (e.g., `export default function Home()`, `export default function FormField()`)
- Custom hooks: camelCase with `use` prefix (e.g., `export function useMultiStepForm()`, `export const useReviewData = ()`)
- Utility functions: camelCase (e.g., `validateEmail()`, `validatePhone()`, `formatPhoneNumber()`, `getOrCreateSessionId()`)
- Internal helper functions: camelCase (e.g., `updateOrCreateMetaTag()`, `getLandingPage()`, `getDeviceType()`)

**Variables:**
- State variables: camelCase (e.g., `formData`, `currentStep`, `reviewData`, `submitStatus`)
- Regular variables: camelCase (e.g., `phoneNumber`, `stepValidators`, `errors`)
- Boolean variables: prefixed with `is`, `has`, `should` (e.g., `isSubmitting`, `isOpen`, `multiline`)

**Types:**
- Interfaces: PascalCase with optional "Props" or "Data" suffix (e.g., `FormFieldProps`, `LeadFormData`, `ReviewData`, `ProcessStep`)
- Type aliases: PascalCase (e.g., `FormErrors`, `Project`)
- Discriminant unions: quoted strings in lowercase (e.g., `'forward' | 'backward'`, `'idle' | 'success' | 'error'`, `'mobile' | 'tablet' | 'desktop'`)

**Constants:**
- Module-level constants: camelCase or UPPER_SNAKE_CASE (e.g., `const DEFAULT_REVIEW_COUNT = 92`, `const WEBHOOK_URL = '...'`, `const CANONICAL_DOMAIN = "..."`)
- Constants in step validators: referenced by step number (e.g., `stepValidators[0]`, `stepValidators[2]`)

**Refs:**
- Refs: suffixed with `Ref` (e.g., `dataRef`)

## Code Style

**Formatting:**
- Indentation: 2 spaces (observed in all source files)
- Line length: Flexible, no strict limit enforced
- Semicolons: Used consistently at end of statements
- Trailing commas: Used in multi-line objects and arrays for consistency
- No explicit formatter (no `.prettierrc` detected), but code maintains consistent style

**Linting:**
- Tool: ESLint with TypeScript support
- Config file: `eslint.config.js` with flat config format
- Enabled plugins:
  - `@eslint/js` - Core JavaScript rules
  - `typescript-eslint` - TypeScript-specific rules with strict mode
  - `eslint-plugin-react-hooks` - React hooks rules (enforces dependencies arrays)
  - `eslint-plugin-react-refresh` - React refresh compatibility (warns on non-component exports)
- Key rules:
  - `react-hooks/exhaustive-deps` - Dependencies arrays must be complete
  - `react-refresh/only-export-components` - Main exports must be components (allows const exports with allowConstantExport)
  - `@typescript-eslint/no-unused-vars` - Enforced by TypeScript strict mode

**TypeScript Configuration:**
- Strict mode: Enabled (`"strict": true`)
- `noUnusedLocals`: Enabled - unused variables cause type errors
- `noUnusedParameters`: Enabled - unused function parameters cause type errors
- `noFallthroughCasesInSwitch`: Enabled - switch statements must have explicit break/return
- Module target: ES2020, ESNext modules
- JSX runtime: `react-jsx` (automatic JSX transform)

## Import Organization

**Order:**
1. React and third-party imports (`react`, `react-router-dom`, `lucide-react`)
2. Local component imports (`../components/`, `../../components/`)
3. Hook imports (`../hooks/`)
4. Utility and library imports (`../utils/`, `../lib/`)
5. Type-only imports (`import type`)

**Path Aliases:**
- No path aliases configured (`baseUrl` not set in tsconfig)
- Relative imports used consistently (e.g., `../hooks/`, `../../components/`)

**Type Imports:**
- Use `import type` for type-only imports to reduce runtime bundle size (observed in some files, should be applied consistently)

## Error Handling

**Patterns:**
- **Validation errors:** Field-level errors stored in state object mapping field names to error messages (e.g., `errors: FormErrors = {}` in `useMultiStepForm.ts`)
- **Async errors:** Try-catch blocks with generic error handling; errors set to state (e.g., `catch (err) { console.error(...); setError(true); }`)
- **Fetch errors:** Check response status (`if (!response.ok) throw new Error(...)`) and catch all exceptions
- **Timeout handling:** AbortController with explicit timeout duration (e.g., 10000ms in lead form submission)
- **Status tracking:** Submit operations use state like `submitStatus: 'idle' | 'success' | 'error'` to track submission state
- **Fallback values:** Default/fallback values provided on error (e.g., `DEFAULT_REVIEW_COUNT = 92` when Supabase/Sheets fetch fails)

Example from `useReviewData.ts`:
```typescript
try {
  const { data: dbData, error: dbError } = await supabase
    .from('review_data')
    .select('*')
    .limit(1)
    .maybeSingle();
  if (dbData && !dbError) {
    setReviewData({ /* ... */ });
    return;
  }
  // Fallback to Google Sheets
} catch (err) {
  console.error('Failed to load reviews:', err);
  setError(true);
  setReviewData({ /* default data */ });
}
```

## Logging

**Framework:** Browser `console` object

**Patterns:**
- Error logging only: `console.error()` used for exceptions and failed operations
- Example: `console.error('Failed to load reviews:', err)` in error catch blocks
- No info/warning/debug logging observed
- Minimal logging in production (error cases only)

## Comments

**When to Comment:**
- Comments explain "why" rather than "what"
- JSDoc-style blocks used for complex utility functions
- Inline comments used sparingly for clarification
- Section comments (e.g., `// Meta: description`) used to delineate logical blocks

Example from `SEO.tsx`:
```typescript
// Helper for OG/Twitter tags
const updateOrCreateMetaTag = (property: string, content: string) => {
  // ...
};

// Open Graph
updateOrCreateMetaTag('og:title', ogTitle || title);
```

**JSDoc/TSDoc:**
- Used in utility functions and complex logic (e.g., `useMultiStepForm.ts`, `SEO.tsx`)
- Not consistently applied throughout, but present for complex operations

## Function Design

**Size:**
- Functions kept relatively small and focused (typically 15-60 lines)
- Hooks stay concise with single responsibility
- Utility functions perform single operations (e.g., `validateEmail()`, `formatPhoneNumber()`)

**Parameters:**
- Props passed as object destructuring in component signatures (e.g., `export default function FormField({ label, name, type, ... })`)
- Callback props use descriptive names: `onChange`, `onNext`, `onBack`, `onSubmit`, `onSelect`
- Utility functions accept necessary primitives or objects (e.g., `validateEmail(email: string)`)

**Return Values:**
- Component functions return JSX or null
- Hooks return objects with named properties (e.g., `useMultiStepForm()` returns `{ currentStep, formData, errors, ... }`)
- Utility functions return primitives (string, boolean, number) or objects
- Validator functions return errors object or null (e.g., `validateEmail()` returns `string | null`)

## Module Design

**Exports:**
- Components: `export default function ComponentName() { ... }`
- Hooks: `export function useHookName() { ... }` or `export const useHookName = () => { ... }`
- Data: `export const dataArray: Type[] = [...]`
- Types/Interfaces: `export interface InterfaceName {}` or `export type TypeName = ...`
- Utilities: `export function utilityName()` or `export const utilityName = () => {}`

**Barrel Files:**
- Not used in this codebase
- Direct imports from specific files preferred (e.g., `import { useMultiStepForm } from '../hooks/useMultiStepForm'` not from index)

**Single Responsibility:**
- One component per file (except index.html)
- Hook files contain single hook and related types/constants
- Utility files contain related utility functions (e.g., `formValidation.ts` contains all form validators)
- Data files contain related data exports (e.g., `projects.ts` contains Project interface and projects array)

## Component Patterns

**Props Pattern:**
```typescript
interface ComponentProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export default function Component({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
}: ComponentProps) {
  // ...
}
```

**State Management:**
- React hooks only (useState, useRef, useEffect, useCallback)
- No external state library (Redux, Zustand, Context API not used)
- Form state: `{ fieldName: value }` object pattern
- Error state: `{ fieldName: errorMessage }` object pattern with `Partial<Record<keyof DataType, string>>`

**Conditional Rendering:**
- Ternary operators for simple conditions: `{condition ? <A /> : <B />}`
- `&&` operator for single branch: `{condition && <A />}`
- Avoid nested ternaries

**Event Handlers:**
- Defined with arrow functions or useCallback for dependencies
- Memoized with useCallback when passed to child components
- Example: `onClick={() => scrollToForm()}` or `onClick={handleNext}`

**Styling:**
- Tailwind CSS utility classes preferred
- Template literals for conditional classes: `` className={`base ${condition ? 'active' : ''}`} ``
- Inline styles avoided (use Tailwind only)

## Testing & Type Safety

**Type Annotations:**
- All function parameters must be typed (enforced by TypeScript strict mode)
- All return types explicitly annotated on exported functions
- Interface/Type definitions at module top level or inline for component props
- Use `import type` for type-only imports

**Example:**
```typescript
export interface LeadFormData {
  service: string;
  urgency: string;
  address: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

export type FormErrors = Partial<Record<keyof LeadFormData, string>>;

export function useMultiStepForm(formSource: string) {
  // ... implementation
  return { /* ... */ };
}
```

---

*Convention analysis: 2026-03-21*
