import { Helmet } from 'react-helmet-async';
import reviewStats from '../data/review-stats.json';
import { getAreaServedForLocation, LOCATIONS, type LocationConfig } from '../data/locations';

interface FAQ {
  question: string;
  answer: string;
}

interface Service {
  name: string;
  description: string;
  url?: string;
}

interface BlogMeta {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  url: string;
}

interface SchemaMarkupProps {
  type: 'home' | 'service' | 'faq' | 'location' | 'hub' | 'general' | 'blog';
  service?: Service;
  faqs?: FAQ[];
  locationName?: string;
  locationSlug?: string;
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  blog?: BlogMeta;
}

const BUSINESS_INFO = {
  name: 'DTE Roofing',
  legalName: 'DTE Roofing LLC',
  url: 'https://www.dteroofingllc.com',
  logo: 'https://www.dteroofingllc.com/images/DTE-Roofing-Logo-two-Men.png',
  telephone: '+16149716028',
  email: 'experience@dteroofing.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '615 Hilliard Rome Rd',
    addressLocality: 'Columbus',
    addressRegion: 'OH',
    postalCode: '43228',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.9637153,
    longitude: -83.1477371
  },
  areaServed: LOCATIONS.map((loc) => ({
    '@type': 'City' as const,
    'name': loc.cityName,
    'containedInPlace': {
      '@type': 'State' as const,
      'name': 'Ohio'
    }
  })),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '14:00'
    }
  ]
};

// Real, verified 5-star customer reviews (also displayed on /reviews) used to back the
// aggregateRating so it is policy-compliant and eligible for review stars.
const BUSINESS_REVIEWS = [
  {
    author: 'Sarah M.',
    datePublished: '2025-11-01',
    reviewBody:
      "Andrew was fantastic! He went above and beyond inspecting the cause of my leak on my roof. We weren't able to replace the roof at this time but he was more than willing to fix all areas of concern. Would high recommend them to do any roof work!"
  },
  {
    author: 'Ryan R.',
    datePublished: '2025-11-01',
    reviewBody:
      "Wonderful experience with DTE and Mitch! The whole process was seamless start to finish. It's hard to make a decision when choosing a Roofing company and I am extremely happy I chose DTE. Would recommend to anyone who needs an honest opinion on anything on the exterior of your home."
  },
  {
    author: 'Ron M.',
    datePublished: '2025-11-01',
    reviewBody:
      'I had Mitch and Chandler from DTE roofing company come and do a free roof inspection. I had a new roof installed 2 years ago, they let me know what problems they have found. I am so glad I was able to get them repaired before it became a bigger problem. Thanks for your help.'
  },
  {
    author: 'Tim H.',
    datePublished: '2025-09-01',
    reviewBody:
      'I had an excellent experience with DTE Roofing. Very good communication, helped with Insurance claim and overall very knowledgeable and professional. Andrew is honest and hardworking, would definitely use them again.'
  },
  {
    author: 'Kortnie Y.',
    datePublished: '2025-09-01',
    reviewBody:
      'I had the pleasure of working with DTE and I cannot recommend them enough. They are a company that provides top notch customer service, quality work, and educates along the way. We will use their services again while selecting our next home.'
  }
];

export default function SchemaMarkup({
  type,
  service,
  faqs,
  locationName,
  locationSlug,
  pageTitle,
  pageDescription,
  pageUrl,
  blog
}: SchemaMarkupProps) {
  const cityToAreaServed = (loc: LocationConfig) => ({
    '@type': 'City' as const,
    'name': loc.cityName,
    'containedInPlace': {
      '@type': 'State' as const,
      'name': 'Ohio'
    }
  });

  const generateLocalBusinessSchema = () => {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'RoofingContractor',
      '@id': `${BUSINESS_INFO.url}#business`,
      name: BUSINESS_INFO.name,
      legalName: BUSINESS_INFO.legalName,
      url: BUSINESS_INFO.url,
      logo: BUSINESS_INFO.logo,
      image: BUSINESS_INFO.logo,
      telephone: BUSINESS_INFO.telephone,
      email: BUSINESS_INFO.email,
      priceRange: BUSINESS_INFO.priceRange,
      address: BUSINESS_INFO.address,
      geo: BUSINESS_INFO.geo,
      areaServed: BUSINESS_INFO.areaServed,
      openingHoursSpecification: BUSINESS_INFO.openingHoursSpecification,
      sameAs: [
        'https://www.google.com/maps/place/DTE+Roofing',
        'https://www.facebook.com/people/DTE-Roofing/61556271692460/',
        'https://www.instagram.com/dte_roofing/'
      ]
    };

    // Per-page areaServed and unique @id
    if (type === 'location' && locationSlug) {
      schema['@id'] = `${BUSINESS_INFO.url}/locations/${locationSlug}#business`;
      schema.areaServed = getAreaServedForLocation(locationSlug).map(cityToAreaServed);
    } else if (type === 'hub') {
      schema['@id'] = `${BUSINESS_INFO.url}/locations#business`;
      schema.areaServed = LOCATIONS.map(cityToAreaServed);
    } else {
      schema.areaServed = LOCATIONS.map(cityToAreaServed);
    }

    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviewStats.averageRating.toString(),
      reviewCount: reviewStats.reviewCount.toString(),
      bestRating: reviewStats.bestRating.toString(),
      worstRating: reviewStats.worstRating.toString()
    };

    schema.review = BUSINESS_REVIEWS.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.datePublished,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: r.reviewBody
    }));

    return schema;
  };

  const generateServiceSchema = () => {
    if (!service) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${service.url ? `${BUSINESS_INFO.url}${service.url}` : (pageUrl || BUSINESS_INFO.url)}#service`,
      name: service.name,
      description: service.description,
      provider: {
        '@id': `${BUSINESS_INFO.url}#business`
      },
      serviceType: service.name,
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceRange: BUSINESS_INFO.priceRange
      }
    };
  };

  const generateFAQSchema = () => {
    if (!faqs || faqs.length === 0) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  };

  const generateBreadcrumbSchema = () => {
    // The homepage is the breadcrumb root; a crumb here would self-reference Home → Home.
    if (!pageUrl || !pageTitle || type === 'home') return null;

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BUSINESS_INFO.url
      }
    ];

    if (type === 'service' && service) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${BUSINESS_INFO.url}/services`
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: pageTitle,
        item: pageUrl
      });
    } else if (type === 'hub') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: `${BUSINESS_INFO.url}/locations`
      });
    } else if (type === 'location' && locationName) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: `${BUSINESS_INFO.url}/locations`
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: locationName,
        item: pageUrl
      });
    } else if (type === 'blog') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${BUSINESS_INFO.url}/blog`
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: pageTitle,
        item: pageUrl
      });
    } else {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: pageTitle,
        item: pageUrl
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    };
  };

  const generateBlogPostingSchema = () => {
    if (type !== 'blog' || !blog) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.headline,
      description: blog.description,
      image: blog.image,
      datePublished: blog.datePublished,
      dateModified: blog.dateModified || blog.datePublished,
      author: {
        '@type': 'Organization',
        name: BUSINESS_INFO.name,
        url: BUSINESS_INFO.url
      },
      publisher: {
        '@type': 'Organization',
        name: BUSINESS_INFO.name,
        logo: {
          '@type': 'ImageObject',
          url: BUSINESS_INFO.logo
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': blog.url
      },
      about: {
        '@id': `${BUSINESS_INFO.url}#business`
      }
    };
  };

  const generateWebPageSchema = () => {
    if (!pageUrl) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle || BUSINESS_INFO.name,
      description: pageDescription,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${BUSINESS_INFO.url}#website`,
        url: BUSINESS_INFO.url,
        name: BUSINESS_INFO.name,
        publisher: {
          '@id': `${BUSINESS_INFO.url}#business`
        }
      },
      about: {
        '@id': `${BUSINESS_INFO.url}#business`
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: BUSINESS_INFO.logo
      }
    };
  };

  const schemas = [
  ...(['home', 'location', 'hub', 'general', 'service'].includes(type) ? [generateLocalBusinessSchema()] : []),
  generateServiceSchema(),
  generateBlogPostingSchema(),
  generateFAQSchema(),
  generateBreadcrumbSchema(),
  generateWebPageSchema()
].filter(Boolean);


  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={`${type}-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
