# Coding Conventions

**Analysis Date:** 2026-03-21

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Navigation.tsx`, `FormField.tsx`)
- Pages: PascalCase (e.g., `Home.tsx`, `Services.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useMultiStepForm.ts`, `useLeadTracking.ts`)
- Utilities: camelCase (e.g., `formatPhone.ts`, `formValidation.ts`)
- Data files: camelCase (e.g., `projects.ts`)
- Directories: kebab-case for multi-word directories (e.g., `lead-form/`, `seo/`, `pages/services/`)

**Functions:**
- Component functions: PascalCase (e.g., `Navigation`, `FormField`, `StepService`)
- Hook functions: camelCase with `use` prefix (e.g., `useMultiStepForm`, `useLeadTracking`)
- Regular utility functions: camelCase (e.g., `formatPhoneNumber`, `validateEmail`, `validateRequired`, `getOrCreateSessionId`, `getLandingPage`, `getDeviceType`)
- Internal helper functions: camelCase (e.g., `updateOrCreateMetaTag`, `scrollPrev`, `scrollNext`)

**Variables:**
- Const declarations: camelCase (e.g., `formData`, `currentStep`, `isSubmitting`)
- State variables: camelCase (e.g., `reviewData`, `isOpen`, `isSubmitting`)
- Constants (all caps): UPPER_SNAKE_CASE (e.g., `WEBHOOK_URL`, `CANONICAL_DOMAIN`, `SERVICES`, `URGENCY_OPTIONS`)
- Boolean variables: prefixed with `is`, `has`, `should` (e.g., `isSubmitting`, `isServicesOpen`, `isMobileMenuOpen`)
- Refs: suffixed with `Ref` (e.g., `closeTimeoutRef`, `autoplay`, `emblaRef`)

**Types:**
- Interfaces: PascalCase with "Props" suffix for component props, "Data" suffix for data types (e.g., `FormFieldProps`, `LeadFormData`, `TrackingData`, `ReviewData`)
- Type aliases: PascalCase (e.g., `FormErrors`, `BlogPost`)
- Discriminant unions: PascalCase (e.g., `'forward' | 'backward'`, `'idle' | 'success' | 'error'`, `'mobile' | 'tablet' | 'desktop'`)

## Code Style

**Formatting:**
- No explicit formatter configured (no Prettier config found)
- Indentation: 2 spaces (observed in vite.config.ts and component files)
- Line length: Appears flexible, no strict limit observed
- Semicolons: Used consistently
- Trailing commas: Used in multi-line objects/arrays

**Linting:**
- Tool: ESLint with TypeScript support
- Config file: `eslint.config.js`
- Enabled rules:
  - ESLint recommended rules
  - TypeScript ESLint recommended rules
  - React Hooks rules (enforces rules of hooks)
  - React Refresh rules (only-export-components with allowConstantExport)
- Key rules:
  - React components should only export components by default
  - Constant exports from component files are allowed
  - Follows React Hooks rules of hooks

**Comments:**
- Generally minimal comments; code is self-documenting
- JSDoc-style blocks used for complex logic (e.g., `updateOrCreateMetaTag` in SEO.tsx)
- Inline comments used sparingly for clarification:
  - Example: `// Meta: description` in SEO.tsx
  - Example: `// Pre-select service based on current page` in MultiStepLeadForm.tsx
  - Example: `// Store landing page on first load` in useLeadTracking.ts
- Comments typically explain "why" rather than "what" the code does

## Import Organization

**Order:**
1. React and React-related imports (React, hooks, Router components)
2. Third-party libraries (lucide-react, embla-carousel)
3. Internal components (relative imports from `./components/`)
4. Internal hooks (relative imports from `./hooks/`)
5. Internal utilities (relative imports from `./utils/`)
6. Internal data (relative imports from `./data/`)
7. SEO/constants (relative imports from `./seo/`)
8. Type imports (using `import type` when importing only types)

**Examples from codebase:**
```typescript
// App.tsx pattern
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
// ... more component imports

// Component pattern
import { useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { carouselProjects } from '../data/projects';

// Hook pattern
import { useState, useCallback } from 'react';
import { validateRequired, validateEmail, validatePhone } from '../utils/formValidation';
import { useLeadTracking } from './useLeadTracking';
```

**Path Aliases:**
- No path aliases configured (no alias imports observed)
- Relative imports used consistently

## Error Handling

**Patterns:**
- Try-catch with generic error handling and fallback values
- Example in `useReviewData.ts`:
  ```typescript
  try {
    // Attempt to fetch from Supabase
    // Fall back to Google Sheets if needed
  } catch (err) {
    console.error('Failed to load reviews:', err);
    setError(true);
    // Use DEFAULT_REVIEW_COUNT fallback
  }
  ```
- Form validation errors stored in state: `errors` object with field-level error messages
- Network request errors handled with status checks:
  ```typescript
  if (!response.ok) throw new Error('Submission failed');
  ```
- Timeout handling: AbortController used for fetch requests with 10-second timeout

**Error States:**
- Form submissions: `submitStatus` tracks 'idle', 'success', 'error'
- Async data loading: Separate loading/error state variables (e.g., `loading`, `error` in useReviewData)
- User-facing errors: Display error messages from validation map to specific form fields

## Logging

**Framework:** `console.error()` (no structured logging library)

**Patterns:**
- Error logging: `console.error('Failed to load reviews:', err)` in `useReviewData.ts`
- No info/warning/debug logging observed
- Errors logged to console for development visibility
- Minimal logging in production (error cases only)

## Type Annotations

**Pattern:**
- All function parameters typed (TypeScript strict mode enabled)
- All return types explicitly annotated on exported functions
- Component props interfaces defined inline or at module level
- Type imports use `import type` syntax:
  ```typescript
  import type { LeadFormData, FormErrors } from '../../../hooks/useMultiStepForm';
  ```

## Function Design

**Size:**
- Small, focused functions (typically 20-50 lines)
- Hooks kept concise with single responsibility
- Utility functions kept to single operation (e.g., `formatPhoneNumber`, `validateEmail`)

**Parameters:**
- Props passed as object destructuring (typical React pattern)
- Example: `function Navigation() { const [isOpen, setIsOpen] = useState(false); }`
- Callback props follow naming convention: `onNext`, `onBack`, `onSelect`, `onSubmit`, `onChange`

**Return Values:**
- Functions return typed values or void
- Hooks return objects with named properties
- Components return JSX or null
- Utility functions return primitives (string, boolean) or objects

## State Management

**Pattern:**
- React hooks only (useState, useRef, useEffect, useCallback)
- No Redux, Context API, or other state library
- State updates with setter functions from useState
- Callback memoization with useCallback for event handlers
- Refs used for non-state values that shouldn't trigger re-renders (e.g., timeouts, carousel refs)

**Example pattern:**
```typescript
const [currentStep, setCurrentStep] = useState(0);
const [errors, setErrors] = useState<FormErrors>({});
const updateField = useCallback((name: keyof LeadFormData, value: string) => {
  setFormData(prev => ({ ...prev, [name]: value }));
}, [errors]);
```

## JSX Patterns

**Component Structure:**
- Single component per file (except index files)
- Props destructured in function signature
- Minimal inline styles (Tailwind CSS preferred)
- Event handlers defined with arrow functions or useCallback
- Conditional rendering with ternary operators or && operator

**Example:**
```typescript
export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
}: FormFieldProps) {
  const inputClass = `w-full px-4 py-3 rounded-lg border-2 ${
    error ? 'border-red-500' : 'border-gray-300'
  }`;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {multiline ? (
        <textarea ... />
      ) : (
        <input ... />
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
```

## Module Design

**Exports:**
- Components: `export default function ComponentName()`
- Hooks: `export function useHookName()` or `export const useHookName = () => {}`
- Data: `export const dataArray: Type[] = [...]`
- Types: `export interface InterfaceName {}` or `export type TypeName = ...`
- Utilities: `export function utilityName()` or `export const utilityName = () => {}`

**Barrel Files:**
- Not used in this codebase
- Direct imports from specific files preferred

**Constants:**
- Defined at module level (above components)
- Example: `const WEBHOOK_URL = '...'` in useMultiStepForm.ts
- Example: `const SERVICES = [...]` in StepService.tsx

## Naming Edge Cases

**Map fields:**
- Service mapping object: `serviceMap: Record<string, string>` (maps URL slugs to form values)

**Destructuring:**
- Consistent use of object destructuring for component props
- Array destructuring for hooks: `const [state, setState] = useState(initialValue)`

---

*Convention analysis: 2026-03-21*
