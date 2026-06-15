import { Helmet } from 'react-helmet-async';
import { imageVariants } from '../data/imageVariants';

const DEFAULT_OG_IMAGE = 'https://www.dteroofingllc.com/images/hero-roofing-professional.jpg';
const DEFAULT_OG_IMAGE_ALT = 'DTE Roofing — professional roofing services in Central Ohio';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  canonical?: string;
  geoPlacename?: string;
  preloadImage?: string;
  /** `sizes` for the preloaded hero (must match the hero <Picture> sizes). Default "100vw". */
  preloadImageSizes?: string;
  /** Emit a noindex robots meta (e.g. the 404 page). Overrides the template's index,follow. */
  noindex?: boolean;
}

// /images/foo.jpg + 800 -> /images/foo-800.webp
function heroWebpVariant(jpgKey: string, w: number): string {
  return jpgKey.replace(/\.jpg$/i, `-${w}.webp`);
}

export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageAlt,
  canonical,
  geoPlacename,
  preloadImage,
  preloadImageSizes,
  noindex,
}: SEOProps): JSX.Element {
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgImage = ogImage || DEFAULT_OG_IMAGE;
  const finalOgImageAlt = ogImageAlt || DEFAULT_OG_IMAGE_ALT;

  // Responsive hero preload: when the preloaded image has generated webp variants,
  // preload via imagesrcset/imagesizes so the scanner fetches the SAME variant the
  // <picture> <source> picks (no double-download — protects LCP). Lowercase attrs
  // via spread (same proven path as fetchpriority) so react-helmet-async passes
  // them through. Falls back to the legacy single-file preload otherwise.
  const preloadJpgKey = preloadImage ? preloadImage.replace(/\.(jpe?g|png|webp|avif)$/i, '.jpg') : undefined;
  const preloadVariant = preloadJpgKey ? imageVariants[preloadJpgKey] : undefined;
  const useResponsivePreload = !!(preloadVariant && preloadVariant.formats.includes('webp'));

  let heroImageSrcSet = '';
  let heroFallbackHref = '';
  if (useResponsivePreload && preloadVariant && preloadJpgKey) {
    heroImageSrcSet = [
      ...preloadVariant.widths.map((w) => `${heroWebpVariant(preloadJpgKey, w)} ${w}w`),
      `${preloadJpgKey.replace(/\.jpg$/i, '.webp')} ${preloadVariant.intrinsicWidth}w`,
    ].join(', ');
    heroFallbackHref = preloadVariant.widths.length
      ? heroWebpVariant(preloadJpgKey, preloadVariant.widths[Math.floor(preloadVariant.widths.length / 2)])
      : preloadJpgKey.replace(/\.jpg$/i, '.webp');
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={finalOgImageAlt} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={finalOgImageAlt} />

      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="geo.placename" content={geoPlacename || "Columbus, OH"} />

      {preloadImage && useResponsivePreload && (
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href={heroFallbackHref}
          {...({
            imagesrcset: heroImageSrcSet,
            imagesizes: preloadImageSizes || '100vw',
            fetchpriority: 'high',
          } as Record<string, string>)}
        />
      )}
      {preloadImage && !useResponsivePreload && (
        <link
          rel="preload"
          as="image"
          href={preloadImage}
          type={preloadImage.endsWith('.webp') ? 'image/webp' : preloadImage.endsWith('.avif') ? 'image/avif' : undefined}
          {...({ fetchpriority: 'high' } as Record<string, string>)}
        />
      )}
    </Helmet>
  );
}
