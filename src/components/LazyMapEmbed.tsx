import { useEffect, useRef, useState } from 'react';

interface LazyMapEmbedProps {
  src: string;
  title: string;
  height?: number;
}

// Defers the (heavy, third-party) Google Maps embed until it is about to scroll
// into view. The placeholder reserves the exact final height so swapping in the
// iframe causes zero layout shift. On the server / before intersection it renders
// only the lightweight placeholder, so it never costs anything on initial paint.
export default function LazyMapEmbed({ src, title, height = 450 }: LazyMapEmbedProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || visible) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={containerRef} style={{ height }}>
      {visible ? (
        <iframe
          src={src}
          title={title}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      ) : (
        <div
          aria-hidden="true"
          className="w-full h-full bg-gray-100 flex items-center justify-center"
        >
          <span className="text-gray-400 text-sm">Loading map…</span>
        </div>
      )}
    </div>
  );
}
