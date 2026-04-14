import { Helmet } from 'react-helmet-async';

const DEFAULT_OG_IMAGE = 'https://www.dteroofingllc.com/images/hero-roofing-professional.jpg';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  geoPlacename?: string;
  twitterSite?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
  geoPlacename,
  twitterSite,
}: SEOProps): JSX.Element {
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalOgImage = ogImage || DEFAULT_OG_IMAGE;

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
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}

      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="geo.placename" content={geoPlacename || "Columbus, OH"} />
    </Helmet>
  );
}
