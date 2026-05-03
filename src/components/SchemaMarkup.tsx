import { Helmet } from 'react-helmet-async';
import { useReviewData } from '../hooks/useReviewData';
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

interface ReviewItem {
  name: string;
  rating: number;
  date: string;
  text: string;
}

interface SchemaMarkupProps {
  type: 'home' | 'service' | 'faq' | 'location' | 'hub' | 'general';
  service?: Service;
  faqs?: FAQ[];
  reviews?: ReviewItem[];
  locationName?: string;
  locationSlug?: string;
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
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

export default function SchemaMarkup({
  type,
  service,
  faqs,
  reviews,
  locationName,
  locationSlug,
  pageTitle,
  pageDescription,
  pageUrl
}: SchemaMarkupProps) {
  const { reviewData } = useReviewData();

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

    if (reviewData) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: reviewData.averageRating.toString(),
        reviewCount: reviewData.totalReviews.toString(),
        bestRating: '5',
        worstRating: '1'
      };
    }

    if (reviews && reviews.length > 0) {
      schema.review = reviews.map(r => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.name },
        datePublished: r.date.includes('November 2025') ? '2025-11-01' :
                       r.date.includes('September 2025') ? '2025-09-01' : '2025-01-01',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating.toString(),
          bestRating: '5',
          worstRating: '1'
        },
        reviewBody: r.text
      }));
    }

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
      areaServed: BUSINESS_INFO.areaServed,
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
    if (!pageUrl || !pageTitle) return null;

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
