import { imageVariants } from '../data/imageVariants';

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
  /**
   * Layout-aware `sizes` (e.g. "100vw"). When provided AND `src` has generated
   * width variants in imageVariants, each <source> (and the <img>) emits a
   * width-descriptor srcSet so the browser fetches a resolution-appropriate file.
   * Omitted -> single full-size source, identical to the legacy markup.
   */
  sizes?: string;
}

function withExt(src: string, ext: string): string {
  return src.replace(/\.(jpe?g|png|webp|avif)$/i, `.${ext}`);
}

// /images/foo.jpg + 800 + 'webp' -> /images/foo-800.webp
function variantPath(src: string, w: number, ext: string): string {
  return src.replace(/\.(jpe?g|png|webp|avif)$/i, `-${w}.${ext}`);
}

// width-descriptor srcSet: each generated variant plus the full-size base at its
// intrinsic width (so large viewports still get the top resolution).
function buildSrcSet(src: string, widths: number[], intrinsicWidth: number, ext: string): string {
  return [
    ...widths.map((w) => `${variantPath(src, w, ext)} ${w}w`),
    `${withExt(src, ext)} ${intrinsicWidth}w`,
  ].join(', ');
}

// Renders a <picture> that serves AVIF/WebP with a raster fallback. Pure markup,
// so it prerenders into the static HTML and hydrates without any client work.
// When `sizes` is set and the image has generated width variants, each <source>
// (and the <img>) carries a responsive srcSet so mobile fetches a smaller file.
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
  sizes,
}: PictureProps): JSX.Element {
  const variant = sizes ? imageVariants[src] : undefined;
  const useAvif = avif && (!variant || variant.formats.includes('avif'));
  const useWebp = webp && (!variant || variant.formats.includes('webp'));

  return (
    // display:contents -> the <picture> generates no box, so the <img> below is
    // laid out exactly as a bare <img> would be (absolute, object-cover, filters…).
    <picture className="contents">
      {useAvif && (
        <source
          type="image/avif"
          srcSet={variant ? buildSrcSet(src, variant.widths, variant.intrinsicWidth, 'avif') : withExt(src, 'avif')}
          {...(variant ? { sizes } : {})}
        />
      )}
      {useWebp && (
        <source
          type="image/webp"
          srcSet={variant ? buildSrcSet(src, variant.widths, variant.intrinsicWidth, 'webp') : withExt(src, 'webp')}
          {...(variant ? { sizes } : {})}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        {...(variant
          ? { srcSet: buildSrcSet(src, variant.widths, variant.intrinsicWidth, 'jpg'), sizes }
          : {})}
        {...(fetchPriority ? ({ fetchpriority: fetchPriority } as Record<string, string>) : {})}
      />
    </picture>
  );
}
