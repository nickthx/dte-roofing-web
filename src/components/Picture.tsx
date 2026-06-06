interface PictureProps {
  /** Raster fallback path (.jpg/.png). The .avif/.webp siblings are derived from it. */
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  /** Set false when no .avif sibling was generated (e.g. flat-color logo, headshots). */
  avif?: boolean;
  webp?: boolean;
}

function withExt(src: string, ext: string): string {
  return src.replace(/\.(jpe?g|png|webp|avif)$/i, `.${ext}`);
}

// Renders a <picture> that serves AVIF/WebP with a raster fallback. Pure markup,
// so it prerenders into the static HTML and hydrates without any client work.
export default function Picture({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  avif = true,
  webp = true,
}: PictureProps): JSX.Element {
  return (
    // display:contents -> the <picture> generates no box, so the <img> below is
    // laid out exactly as a bare <img> would be (absolute, object-cover, filters…).
    <picture className="contents">
      {avif && <source type="image/avif" srcSet={withExt(src, 'avif')} />}
      {webp && <source type="image/webp" srcSet={withExt(src, 'webp')} />}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        {...(fetchPriority ? ({ fetchpriority: fetchPriority } as Record<string, string>) : {})}
      />
    </picture>
  );
}
