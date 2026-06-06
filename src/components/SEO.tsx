import { Helmet } from 'react-helmet-async';

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
  /** Emit a noindex robots meta (e.g. the 404 page). Overrides the template's index,follow. */
  noindex?: boolean;
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
  noindex,
}: SEOProps): JSX.Element {
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgImage = ogImage || DEFAULT_OG_IMAGE;
  const finalOgImageAlt = ogImageAlt || DEFAULT_OG_IMAGE_ALT;

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

      {preloadImage && (
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
