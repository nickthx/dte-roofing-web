import { useCallback, useEffect, useRef, useState } from 'react';

const SLIDEOUT_SRC = 'https://app.roofle.com/roof-quote-pro-widget.js?id=zEGtbFpfjh6Snz6t4Tz23';

declare global {
  interface Window {
    RoofQuotePro?: { open?: () => void; isSlideOutWidgetOpened?: boolean };
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
// (right edge, vertically centered, rotated, "Instant Roof Quote", Roofle-config
// red #b80100). The real script loads on first hover/focus (warm-up) or click
// (load + open via window.RoofQuotePro.open()); the placeholder unmounts as soon
// as the widget's launcher (#quick-quote-button-wrapper) renders, but polling
// continues until the open() API is ready so a click always opens the panel.
// The embedded-widget variant on /get-a-quote-consultation is separate and
// still loads on page mount (see src/pages/InstantQuote.tsx).
export default function RoofleSlideout() {
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const clickedRef = useRef(false);
  const pollingRef = useRef(false);
  const openedRef = useRef(false);

  const handOff = useCallback(() => {
    if (pollingRef.current) return;
    pollingRef.current = true;
    injectScript();
    const startedAt = Date.now();
    let openAttempts = 0;
    const poll = window.setInterval(() => {
      const rq = window.RoofQuotePro;
      const widgetReady = document.getElementById('quick-quote-button-wrapper') !== null;
      const apiReady = typeof rq?.open === 'function';
      // Hand the UI over as soon as the real launcher exists…
      if (widgetReady) {
        setHidden(true);
        setLoading(false);
      }
      // …and after a click, retry open() until the widget confirms it opened.
      // open() exists before the widget finishes initializing — a single early
      // call gets swallowed (verified on production), so re-call until
      // isSlideOutWidgetOpened flips true (max ~5s of attempts).
      if (apiReady && clickedRef.current && !openedRef.current) {
        if (rq!.isSlideOutWidgetOpened === true || openAttempts >= 16) {
          openedRef.current = true;
        } else {
          openAttempts++;
          rq!.open!();
        }
      }
      const done = apiReady && (!clickedRef.current || openedRef.current);
      if (done || Date.now() - startedAt > 20000) {
        // On timeout without even a launcher (offline/blocked), keep the
        // placeholder so a click can retry.
        window.clearInterval(poll);
        pollingRef.current = false;
        setLoading(false);
        if (widgetReady || apiReady) setHidden(true);
      }
    }, 300);
  }, []);

  const handleClick = useCallback(() => {
    clickedRef.current = true;
    setLoading(true);
    handOff();
  }, [handOff]);

  // If another page in this SPA session already injected the widget, skip the
  // placeholder as soon as its launcher shows up.
  useEffect(() => {
    if (document.getElementById('quick-quote-button-wrapper')) setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <button
      type="button"
      onPointerEnter={handOff}
      onFocus={handOff}
      onClick={handleClick}
      aria-label="Get an instant roof quote"
      className="fixed right-0 top-1/2 z-40 whitespace-nowrap rounded-b-lg px-5 py-2.5 text-white font-medium text-lg shadow-lg hover:brightness-110 transition"
      style={{ backgroundColor: '#b80100', transform: 'rotate(90deg) translate(50%, 0)', transformOrigin: 'top right' }}
    >
      {loading ? 'Loading…' : 'Instant Roof Quote'}
    </button>
  );
}
