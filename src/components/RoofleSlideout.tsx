import { useEffect } from 'react';

const SLIDEOUT_SRC = 'https://app.roofle.com/roof-quote-pro-widget.js?id=zEGtbFpfjh6Snz6t4Tz23';

export default function RoofleSlideout() {
  useEffect(() => {
    if (document.querySelector('script[src*="roof-quote-pro-widget.js"]')) {
      return;
    }

    const inject = () => {
      const script = document.createElement('script');
      script.src = SLIDEOUT_SRC;
      script.async = true;
      document.body.appendChild(script);
    };

    let idleHandle: number | undefined;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

    if ('requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(inject, { timeout: 3000 });
    } else {
      timeoutHandle = setTimeout(inject, 1500);
    }

    return () => {
      if (idleHandle !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) {
        clearTimeout(timeoutHandle);
      }
    };
  }, []);

  return null;
}
