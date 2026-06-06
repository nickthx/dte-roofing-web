import { useCallback, useEffect, useRef, useState } from 'react';

const SLIDEOUT_SRC = 'https://app.roofle.com/roof-quote-pro-widget.js?id=zEGtbFpfjh6Snz6t4Tz23';

declare global {
  interface Window {
    RoofQuotePro?: { open?: () => void };
  }
}

function injectScript(): void {
  if (document.querySelector('script[src*="roof-quote-pro-widget.js"]')) return;
  const script = document.createElement('script');
  script.src = SLIDEOUT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

// The Roofle slideout widget costs ~197KB of JS + a 50KB gif and was the largest
// main-thread contributor blocking LCP. Instead of injecting it at idle on every
// page, render a zero-JS placeholder tab that mimics the widget's own launcher
// (left edge, vertically centered, rotated, "Instant Roof Quote", Roofle-config
// red #b80100). The real script loads on first hover/focus (warm-up) or click
// (load + open via window.RoofQuotePro.open()); once the widget's launcher
// (#quick-quote-button-wrapper) renders, the placeholder unmounts.
// The embedded-widget variant on /get-a-quote-consultation is separate and
// still loads on page mount (see src/pages/InstantQuote.tsx).
export default function RoofleSlideout() {
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const clickedRef = useRef(false);
  const handedOffRef = useRef(false);
  const openedRef = useRef(false);

  const handOff = useCallback(() => {
    if (handedOffRef.current) return;
    injectScript();
    const startedAt = Date.now();
    const poll = window.setInterval(() => {
      const widgetReady = document.getElementById('quick-quote-button-wrapper') !== null;
      const apiReady = typeof window.RoofQuotePro?.open === 'function';
      if (widgetReady || apiReady) {
        window.clearInterval(poll);
        if (clickedRef.current && apiReady && !openedRef.current) {
          openedRef.current = true;
          window.RoofQuotePro!.open!();
        }
        setHidden(true);
        setLoading(false);
      } else if (Date.now() - startedAt > 15000) {
        // Widget never came up (offline/blocked) — stop polling, keep the
        // placeholder so the CTA still retries on the next click.
        window.clearInterval(poll);
        handedOffRef.current = false;
        setLoading(false);
      }
    }, 150);
    handedOffRef.current = true;
  }, []);

  const handleWarmup = useCallback(() => {
    if (!handedOffRef.current) handOff();
  }, [handOff]);

  const handleClick = useCallback(() => {
    clickedRef.current = true;
    setLoading(true);
    handedOffRef.current = false; // re-enter handOff so a failed warm-up retries
    handOff();
  }, [handOff]);

  // If another tab/page already injected the widget in this session, skip the
  // placeholder as soon as its launcher shows up.
  useEffect(() => {
    if (document.getElementById('quick-quote-button-wrapper')) setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <button
      type="button"
      onPointerEnter={handleWarmup}
      onFocus={handleWarmup}
      onClick={handleClick}
      aria-label="Get an instant roof quote"
      className="fixed left-0 top-1/2 z-40 whitespace-nowrap rounded-b-lg px-5 py-2.5 text-white font-medium text-lg shadow-lg hover:brightness-110 transition"
      style={{ backgroundColor: '#b80100', transform: 'rotate(270deg) translate(-50%, 0)', transformOrigin: 'top left' }}
    >
      {loading ? 'Loading…' : 'Instant Roof Quote'}
    </button>
  );
}
