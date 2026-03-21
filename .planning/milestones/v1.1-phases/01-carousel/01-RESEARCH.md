# Phase 1: Carousel - Research

**Researched:** 2026-03-17
**Domain:** React image carousel with autoplay, TypeScript, Tailwind CSS
**Confidence:** HIGH

## Summary

The "Our Recent Work" section in `Home.tsx` is currently a static 8-image CSS grid (lines 409–466). The goal is to replace that section with an interactive, auto-advancing carousel component. All project images are already present in `/public/images/` — the Gallery page (`Gallery.tsx`) already catalogues 26 of them with title and location metadata that can be directly reused.

The project runs React 18 + Vite + TypeScript + Tailwind with no existing carousel library. The standard pattern for this stack is **Embla Carousel** via `embla-carousel-react` and its companion `embla-carousel-autoplay` plugin. This is the same engine shadcn/ui's Carousel component wraps. Embla is lightweight (~8 KB gzipped), headless, touch-friendly, and has first-class TypeScript support — matching all stated constraints. The entire carousel can be implemented as a custom component that wraps Embla hooks directly, requiring zero additional UI library overhead.

The Gallery page's `projects` array is the single source of truth for image metadata. The carousel should draw from that data (or a curated subset) rather than duplicating the image list. The title/location overlay pattern already exists on the Gallery hover cards and can be adapted for a persistent bottom-overlay style on the carousel.

**Primary recommendation:** Use `embla-carousel-react` + `embla-carousel-autoplay` as two lightweight packages, implement a bespoke `WorkCarousel` component in `src/components/`, draw image data from `Gallery.tsx`'s project list (extract to a shared data file), and replace the grid section in `Home.tsx` with `<WorkCarousel />`.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CARO-01 | User sees a smooth, auto-advancing image carousel in the "Our Recent Work" section | Embla Autoplay plugin (`embla-carousel-autoplay`) provides configurable interval auto-advance with `stopOnInteraction` |
| CARO-02 | User can manually navigate between images (prev/next arrows) | Embla `scrollPrev`/`scrollNext` API; lucide-react `ChevronLeft`/`ChevronRight` icons already in project |
| CARO-03 | Carousel displays project photos from existing `/public/images/` assets | 26 images catalogued in `Gallery.tsx`'s `projects` array; extract to shared data file and import in carousel |
| CARO-04 | Carousel is responsive and looks clean on mobile, tablet, and desktop viewports | Embla is natively touch-swipe capable; single-slide basis-full view scales to any viewport; Tailwind responsive utilities cover layout |
| CARO-05 | Carousel visually integrates with the Home page design (colors, spacing, typography) | Design tokens: `primary-700` (#b91c1c red), `charcoal-900` (#3d3d3d) — same palette used throughout Home.tsx |
| CARO-06 | User can see project title/location overlaid on each carousel image | Absolute-positioned bottom overlay with gradient scrim; pattern already established in Gallery.tsx hover overlay |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| embla-carousel-react | 8.6.0 | React carousel engine (hooks-based) | Lightweight, headless, best-in-class touch support, powers shadcn/ui Carousel |
| embla-carousel-autoplay | 8.6.0 | Auto-advance plugin for Embla | Official plugin, same package family, `stopOnInteraction` built-in |

### Supporting (already in project — no new installs needed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | ^0.344.0 | `ChevronLeft`/`ChevronRight` arrow icons | Already imported in Gallery.tsx for nav arrows |
| tailwindcss | ^3.4.1 | Responsive layout, overlay, transition classes | All styling — no CSS files needed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| embla-carousel-react | CSS-only (scroll-snap + JS timers) | Scroll-snap carousels require significant custom JS for cross-browser arrow nav and autoplay pause-on-hover; higher maintenance burden |
| embla-carousel-react | react-slick / swiper | Both are heavier (50–150 KB); swiper requires its own CSS; react-slick has known React 18 issues |
| embla-carousel-react | Framer Motion | Adds 120+ KB for animation only; overkill for a slide carousel |

**Installation:**
```bash
npm install embla-carousel-react embla-carousel-autoplay
```

**Version verification:** Confirmed against npm registry on 2026-03-17. Both at `8.6.0`.

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   └── WorkCarousel.tsx     # New: the carousel component
├── data/
│   └── projects.ts          # New: extracted project image/metadata list
├── pages/
│   └── Home.tsx             # Modified: replace grid section with <WorkCarousel />
│   └── Gallery.tsx          # Modified: import projects from data/projects.ts
```

### Pattern 1: Embla Hook-Based Carousel with Autoplay

**What:** Use `useEmblaCarousel` directly in a custom component. Pass the autoplay plugin via the `plugins` array. Attach `scrollPrev`/`scrollNext` to custom arrow buttons.

**When to use:** When you need full control over markup (for the overlay, responsive sizing, and brand styling) without adopting shadcn's full Button/Card component system.

**Example:**
```typescript
// Source: shadcn-ui design repo — apps/v4/examples/base/carousel-plugin.tsx
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useCallback } from 'react';

export function WorkCarousel() {
  const autoplayPlugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayPlugin.current]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {projects.map((project) => (
          <div key={project.id} className="min-w-0 shrink-0 grow-0 basis-full relative">
            <img src={project.image} alt={project.alt} className="w-full aspect-video object-cover" />
            {/* Title/location overlay — CARO-06 */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-charcoal-900/90 to-transparent px-6 py-5">
              <p className="text-white font-bold text-xl">{project.title}</p>
              <p className="text-primary-300 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" />{project.location}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Arrow buttons */}
    </div>
  );
}
```

### Pattern 2: Shared Project Data File

**What:** Extract the `projects` array from `Gallery.tsx` into `src/data/projects.ts` and import it in both `Gallery.tsx` and `WorkCarousel.tsx`.

**When to use:** Always — avoids duplicating 26 image paths and metadata entries.

**Example:**
```typescript
// src/data/projects.ts
export interface Project {
  id: number;
  title: string;
  category: 'installations' | 'repairs';
  location: string;
  image: string;
  alt: string;
}

export const projects: Project[] = [
  // ... (lifted verbatim from Gallery.tsx)
];

// Curated subset for carousel (best visual images)
export const carouselProjects = projects.slice(0, 10);
```

### Pattern 3: Overlay Title/Location (CARO-06)

**What:** Persistent (always-visible) gradient overlay at the bottom of each slide showing title and location, matching the charcoal/red palette.

**When to use:** Carousels auto-advance — hover-reveal patterns from Gallery.tsx do not work here since images change without user hover.

```typescript
// Persistent overlay — not hover-based like Gallery.tsx
<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/30 to-transparent p-6">
  <h3 className="text-white font-bold text-lg md:text-xl drop-shadow">{project.title}</h3>
  <div className="flex items-center gap-1 text-primary-300 text-sm mt-1">
    <MapPin className="w-4 h-4" />
    <span>{project.location}</span>
  </div>
</div>
```

### Anti-Patterns to Avoid

- **CSS scroll-snap without a library:** Requires significant custom JS for autoplay timers, pause-on-hover, and cross-browser arrow button wiring. Higher maintenance cost than Embla.
- **Hover-reveal overlays on carousel slides:** Users never hover mid-transition; titles must be always-visible (persistent overlay) unlike Gallery.tsx's hover pattern.
- **`loading="lazy"` on all carousel images:** The first 1–2 visible slides should use `loading="eager"` to avoid a blank flash on page load.
- **`setInterval` for autoplay:** Embla Autoplay plugin handles this correctly (pausing on user interaction, cleaning up on unmount). Do not hand-roll timers.
- **Overriding `overflow: hidden` on the Embla root:** Embla's scroll mechanism requires `overflow: hidden` on the viewport element — do not remove it for "rounded corners" effects; apply `rounded-xl overflow-hidden` to a wrapper div instead.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Auto-advance timer | `setInterval` + `clearInterval` in `useEffect` | `embla-carousel-autoplay` | Must handle pause-on-hover, pause-on-focus, cleanup on unmount, interaction reset — all built into the plugin |
| Touch/swipe support | `touchstart`/`touchend` delta tracking | Embla (built-in) | Velocity-based momentum, multi-pointer handling, scroll direction detection are non-trivial |
| Loop logic | Manual index modulo math | Embla `{ loop: true }` option | Embla handles infinite loop without DOM clones causing re-render flicker |
| Current slide indicator | Manual state tracking | `emblaApi.on('select', ...)` | Embla fires `select` event reliably after scroll settling, not on scroll start |

---

## Common Pitfalls

### Pitfall 1: Arrow Buttons Positioned Outside Overflow Container

**What goes wrong:** Arrow buttons disappear because the carousel root has `overflow: hidden`.

**Why it happens:** Embla's scroll container must have `overflow: hidden`. Arrows positioned absolute inside that element get clipped.

**How to avoid:** Wrap the Embla root in a `relative` positioned parent div. Position arrows absolutely on that outer wrapper, not inside the Embla ref element.

**Warning signs:** Arrow buttons render in dev tools but are invisible in the browser.

### Pitfall 2: Autoplay Plugin Ref Stale on Re-render

**What goes wrong:** Autoplay doesn't start or behaves erratically after state changes.

**Why it happens:** Passing `Autoplay({...})` inline as a prop creates a new plugin instance on every render.

**How to avoid:** Use `useRef` to hold the plugin instance, matching the shadcn/ui example pattern: `const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))`.

**Warning signs:** Autoplay works on first load but breaks after navigation or re-render.

### Pitfall 3: `aspect-video` Breaking on Small Mobile

**What goes wrong:** Carousel images are too short on narrow phones (e.g., 320px wide — 16:9 gives only 180px height).

**Why it happens:** `aspect-video` (16:9) is applied unconditionally.

**How to avoid:** Use responsive aspect ratios: `aspect-[4/3] md:aspect-video` to give slightly more height on mobile.

**Warning signs:** Images look letterboxed or empty-feeling on iPhone SE viewport.

### Pitfall 4: First Slide Blank Flash (Lazy Loading)

**What goes wrong:** First carousel image shows a grey placeholder for 1–2 seconds on page load.

**Why it happens:** `loading="lazy"` is applied to all images including the immediately visible one.

**How to avoid:** Apply `loading="eager"` to `index === 0` slide; `loading="lazy"` to all others.

### Pitfall 5: Missing `loop: true` with Auto-Advance

**What goes wrong:** Carousel auto-advances to the last slide, then stops.

**Why it happens:** Without `{ loop: true }`, Embla stops scrolling at the end of the slide list.

**How to avoid:** Always pass `{ loop: true }` in the options when using autoplay.

---

## Code Examples

Verified patterns from official sources and the local shadcn-ui design repo:

### Full WorkCarousel Component Skeleton

```typescript
// Source: shadcn-ui design repo — carousel-plugin.tsx + carousel.tsx
import { useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { projects } from '../data/projects';

export default function WorkCarousel() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.reset()}
    >
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="min-w-0 shrink-0 grow-0 basis-full relative aspect-[4/3] md:aspect-video"
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${projects.length}`}
            >
              <img
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
              {/* Persistent title/location overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent px-6 py-6">
                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-primary-300 text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next arrows — outside overflow:hidden container */}
      <button
        onClick={scrollPrev}
        aria-label="Previous project"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-charcoal-900/70 hover:bg-charcoal-900/90 text-white rounded-full p-2 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next project"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-charcoal-900/70 hover:bg-charcoal-900/90 text-white rounded-full p-2 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
```

### Dot Indicator (optional enhancement — not in requirements)

```typescript
// If dot indicators are wanted, use emblaApi.on('select', ...) pattern
const [selectedIndex, setSelectedIndex] = useState(0);
useEffect(() => {
  if (!emblaApi) return;
  emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()));
}, [emblaApi]);
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| react-slick (jQuery-era API) | embla-carousel-react | ~2020 | Smaller bundle, no jQuery dep, hooks-based |
| Swiper.js (full feature set) | Embla for simple use cases | ~2021 | Embla is ~8 KB vs Swiper's ~80 KB |
| Manual `setInterval` autoplay | embla-carousel-autoplay plugin | 2019 | Plugin handles pause, cleanup, interaction correctly |
| CSS scroll-snap only | Embla for interactive carousels | ~2022 | CSS scroll-snap lacks JS-controllable arrow API in older browsers |

**Deprecated/outdated:**
- `react-slick`: Uses class components, jQuery-era patterns, known issues with React 18 StrictMode double-render — do not use.
- `react-responsive-carousel`: Unmaintained since 2023, no TypeScript generics.

---

## Open Questions

1. **How many slides to include in the carousel?**
   - What we know: Gallery.tsx has 26 images with metadata. Home.tsx grid currently shows 8.
   - What's unclear: Whether to use all 26 or a curated ~10 "best" images for the home page carousel.
   - Recommendation: Use ~10–12 curated images. Too many slides dilutes impact; the gallery link below the carousel drives users to see more.

2. **Dot indicators / slide counter?**
   - What we know: Requirements (CARO-01 through CARO-06) do not mention dots or a counter.
   - What's unclear: Whether the planner/user expects a "4 / 12" counter or dot nav.
   - Recommendation: Omit from initial plan (not in requirements). Arrows alone satisfy CARO-02. Can be a fast follow.

3. **Pause on mobile touch?**
   - What we know: `stopOnInteraction: true` stops autoplay on Embla drag. Embla handles touch natively.
   - What's unclear: Whether autoplay should resume after a touch swipe on mobile.
   - Recommendation: Use `stopOnInteraction: false` + Autoplay's `stopOnMouseEnter` to allow autoplay to resume after swipe but pause on desktop hover. This is a detail for the implementation task.

---

## Validation Architecture

No test framework is configured in this project (no `vitest.config.*`, `jest.config.*`, `pytest.ini`, or `tests/` directory detected). The project has no `test` script in `package.json`. Nyquist validation is not applicable without a test framework, and setting one up is outside scope for this phase.

**Wave 0 Gaps:**
- No test infrastructure exists. If testing is desired, `vitest` + `@testing-library/react` would be the appropriate stack for this Vite + React project. This is out of scope for Phase 1.

---

## Sources

### Primary (HIGH confidence)
- Local design repo: `~/design-repos/shadcn-ui/apps/v4/registry/bases/base/ui/carousel.tsx` — full Embla-based carousel component implementation
- Local design repo: `~/design-repos/shadcn-ui/apps/v4/examples/base/carousel-plugin.tsx` — autoplay plugin usage pattern
- `package.json` — confirmed current dependency versions
- `tailwind.config.js` — confirmed color tokens (`primary-700`, `charcoal-900`)
- `src/pages/Gallery.tsx` — confirmed 26 project images with title/location metadata

### Secondary (MEDIUM confidence)
- npm registry: `npm view embla-carousel-react version` → `8.6.0` (verified 2026-03-17)
- npm registry: `npm view embla-carousel-autoplay version` → `8.6.0` (verified 2026-03-17)

### Tertiary (LOW confidence)
- None — all critical claims verified against local repos or npm registry.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — versions verified against npm registry; implementation pattern verified in local design repo
- Architecture: HIGH — derived directly from existing Gallery.tsx patterns and Embla source in design repo
- Pitfalls: MEDIUM — derived from Embla docs patterns and common React carousel failure modes; not exhaustively tested in this specific project

**Research date:** 2026-03-17
**Valid until:** 2026-06-17 (Embla is a stable library; 90-day validity is conservative)
