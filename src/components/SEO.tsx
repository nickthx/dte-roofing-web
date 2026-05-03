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
  twitterSite?: string;
  preloadImage?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogImageAlt,
  canonical,
  geoPlacename,
  twitterSite,
  preloadImage,
}: SEOProps): JSX.Element {
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgImage = ogImage || DEFAULT_OG_IMAGE;
  const finalOgImageAlt = ogImageAlt || DEFAULT_OG_IMAGE_ALT;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

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
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}

      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="geo.placename" content={geoPlacename || "Columbus, OH"} />

      {preloadImage && (
        <link
          rel="preload"
          as="image"
          href={preloadImage}
          {...({ fetchpriority: 'high' } as Record<string, string>)}
        />
      )}
    </Helmet>
  );
}
