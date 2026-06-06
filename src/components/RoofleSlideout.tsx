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
  // Classic (non-overlay) scrollbars eat into the viewport that position:fixed
  // anchors to; the widget's own launcher anchors at the content edge
  // (clientWidth). Offset by the gutter so the swap doesn't shift sideways.
  const [gutter, setGutter] = useState(0);
  useEffect(() => {
    setGutter(Math.max(0, window.innerWidth - document.documentElement.clientWidth));
  }, []);
  const clickedRef = useRef(false);
  const pollingRef = useRef(false);
  const openedRef = useRef(false);

  const handOff = useCallback(() => {
    if (pollingRef.current) return;
    pollingRef.current = true;
    injectScript();
    const startedAt = Date.now();
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
      // open() exists long before the widget can actually open (its slideout
      // iframe cold-loads for many seconds); early calls are silently
      // swallowed — verified on production — and isSlideOutWidgetOpened stays
      // undefined until the first successful open. So keep re-calling until
      // the flag flips true or the window expires.
      if (apiReady && clickedRef.current && !openedRef.current) {
        if (rq!.isSlideOutWidgetOpened === true) {
          openedRef.current = true;
        } else {
          rq!.open!();
        }
      }
      const done = apiReady && (!clickedRef.current || openedRef.current);
      if (done || Date.now() - startedAt > 30000) {
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

  // Pixel-faithful clone of the widget's own launcher so the placeholder→widget
  // swap is invisible: same anchor (0-width wrapper at right edge, top 50%),
  // same transform, same flex bar, and the same two swoosh-cap SVGs absolutely
  // positioned beyond each end of the bar. Paths are #b80100 to match the
  // widget's CSS override of its inline #EF7E45 fills.
  return (
    <div className="fixed top-1/2 z-40 w-0" style={{ right: gutter, WebkitTapHighlightColor: 'transparent' }}>
      <button
        type="button"
        onPointerEnter={handOff}
        onFocus={handOff}
        onClick={handleClick}
        aria-label="Get an instant roof quote"
        className="absolute flex items-center whitespace-nowrap border-0 cursor-pointer hover:brightness-110 transition"
        style={{
          backgroundColor: '#b80100',
          color: '#ffffff',
          font: "500 22px / 26px Rubik, sans-serif",
          height: 43,
          padding: '0 1px',
          transform: 'translate(-50%, -100%) rotate(270deg)',
          opacity: loading ? 0.85 : 1,
        }}
      >
        <svg
          aria-hidden="true"
          width="69"
          height="43"
          fill="none"
          style={{ position: 'absolute', right: 1, top: 0, transform: 'translateX(100%)' }}
        >
          <path
            d="M0 0v43h68.4a38 38 0 0 1-32.71-18.66l-3.36-5.68A38 38 0 0 0 0 0Z"
            fill="#b80100"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        <div>Instant Roof Quote</div>
        <svg
          aria-hidden="true"
          width="69"
          height="43"
          fill="none"
          style={{ position: 'absolute', left: 1, top: 0, transform: 'translateX(calc(-100% + 1px))' }}
        >
          <path
            d="M68.4 0v43H0a38 38 0 0 0 32.7-18.66l3.37-5.68A38 38 0 0 1 68.4 0Z"
            fill="#b80100"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
