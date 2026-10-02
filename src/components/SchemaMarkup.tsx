import { Helmet } from 'react-helmet-async';
import { CANONICAL_DOMAIN as SITE_URL } from '../seo/constants';
import { getAreaServedForLocation, getLocationBySlug, LOCATIONS, type LocationConfig } from '../data/locations';
import { SERVICES } from '../data/services';

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

interface ItemListEntry {
  name: string;
  url: string;
}

type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

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
  webPageType?: WebPageType;
  documentTitle?: string;
  itemList?: ItemListEntry[];
}

type JsonLdNode = Record<string, unknown>;

// One entity for the whole company. Per-page business ids made Google see a
// separate contractor on every city page, and references to the business only
// resolve when this exact id is defined on the same page, so every page emits it.
const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const GAF_URL = 'https://www.gaf.com/en-us/roofing-contractors/residential/usa/oh/columbus/dte-roofing-llc-1146165';
const BBB_URL = 'https://www.bbb.org/us/oh/columbus/profile/roofing-contractors/dte-roofing-llc-0302-70165482';

const SAME_AS = [
  'https://www.google.com/maps?cid=15933068684969168707',
  'https://www.facebook.com/people/DTE-Roofing/61556271692460/',
  'https://www.instagram.com/dte_roofing/',
  BBB_URL,
  GAF_URL,
  'https://www.yelp.com/biz/dte-roofing-lincoln-village',
  'https://nextdoor.com/pages/dte-roofing-llc-hilliard-oh/',
];

// Location pages list these as city-scoped Service nodes, in this order.
const LOCATION_CORE_SERVICE_SLUGS = [
  'roof-repair',
  'roof-replacement',
  'roof-installation',
  'roof-inspection',
  'storm-damage',
  'gutters',
  'siding',
];

const BUSINESS_INFO = {
  name: 'DTE Roofing',
  legalName: 'DTE Roofing LLC',
  foundingDate: '2023-10',
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

function cityNodeFromName(name: string): JsonLdNode {
  return {
    '@type': 'City',
    name,
    containedInPlace: {
      '@type': 'State',
      name: 'Ohio'
    }
  };
}

function cityNode(loc: LocationConfig): JsonLdNode {
  return cityNodeFromName(loc.cityName);
}

const ALL_CITY_NODES = LOCATIONS.map(cityNode);

const LOCATION_CORE_SERVICES = LOCATION_CORE_SERVICE_SLUGS.flatMap((slug) =>
  SERVICES.filter((svc) => svc.slug === slug)
);

// Built once so the business node is byte-identical on every page. Review and
// rating markup is intentionally absent: Google treats ratings a business
// publishes about itself as self-serving and ineligible for review snippets.
const BUSINESS_NODE: JsonLdNode = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  '@id': BUSINESS_ID,
  name: BUSINESS_INFO.name,
  legalName: BUSINESS_INFO.legalName,
  foundingDate: BUSINESS_INFO.foundingDate,
  url: BUSINESS_INFO.url,
  logo: BUSINESS_INFO.logo,
  image: BUSINESS_INFO.logo,
  telephone: BUSINESS_INFO.telephone,
  email: BUSINESS_INFO.email,
  priceRange: BUSINESS_INFO.priceRange,
  address: BUSINESS_INFO.address,
  geo: BUSINESS_INFO.geo,
  areaServed: ALL_CITY_NODES,
  openingHoursSpecification: BUSINESS_INFO.openingHoursSpecification,
  sameAs: SAME_AS,
  founder: [
    { '@type': 'Person', name: 'Donovan Davis' },
    { '@type': 'Person', name: 'Mitchell Davis' }
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'GAF Certified Plus Contractor',
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: 'GAF' },
      url: GAF_URL
    }
  ],
  memberOf: {
    '@type': 'Organization',
    name: 'Better Business Bureau',
    url: BBB_URL
  },
  award: 'BBB Accredited Business, A+ rating'
};

const HUB_ITEM_LIST: JsonLdNode = {
  '@type': 'ItemList',
  itemListElement: LOCATIONS.map((loc, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${loc.cityName}, OH`,
    url: `${SITE_URL}/locations/${loc.slug}`
  }))
};

export default function SchemaMarkup({
  type,
  service,
  faqs,
  locationName,
  locationSlug,
  pageTitle,
  pageDescription,
  pageUrl,
  blog,
  webPageType = 'WebPage',
  documentTitle,
  itemList
}: SchemaMarkupProps): JSX.Element {
  const location = locationSlug ? getLocationBySlug(locationSlug) : undefined;
  const locationCityNode = location
    ? cityNode(location)
    : locationName
      ? cityNodeFromName(locationName)
      : null;

  const generateServiceSchema = (): JsonLdNode | null => {
    if (!service) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${service.url ? `${SITE_URL}${service.url}` : (pageUrl || SITE_URL)}#service`,
      name: service.name,
      description: service.description,
      provider: {
        '@id': BUSINESS_ID
      },
      serviceType: service.name,
      areaServed: ALL_CITY_NODES
    };
  };

  const generateLocationServiceSchemas = (): JsonLdNode[] => {
    if (type !== 'location' || !locationSlug || !locationCityNode) return [];

    const cityName = location ? location.cityName : locationName;
    const baseUrl = pageUrl || `${SITE_URL}/locations/${locationSlug}`;

    return LOCATION_CORE_SERVICES.map((svc) => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${baseUrl}#service-${svc.slug}`,
      name: `${svc.name} in ${cityName}, OH`,
      serviceType: svc.name,
      provider: {
        '@id': BUSINESS_ID
      },
      areaServed: locationCityNode,
      url: `${SITE_URL}${svc.path}`
    }));
  };

  const generateFAQSchema = (): JsonLdNode | null => {
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

  const generateBreadcrumbSchema = (): JsonLdNode | null => {
    // The homepage is the breadcrumb root; a crumb here would self-reference Home → Home.
    if (!pageUrl || !pageTitle || type === 'home') return null;

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL
      }
    ];

    if (type === 'service' && service) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SITE_URL}/services`
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
        item: `${SITE_URL}/locations`
      });
    } else if (type === 'location' && locationName) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: `${SITE_URL}/locations`
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
        item: `${SITE_URL}/blog`
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

  const generateBlogPostingSchema = (): JsonLdNode | null => {
    if (type !== 'blog' || !blog) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${blog.url}#blogposting`,
      headline: blog.headline,
      description: blog.description,
      image: blog.image,
      datePublished: blog.datePublished,
      dateModified: blog.dateModified || blog.datePublished,
      author: {
        '@id': BUSINESS_ID
      },
      publisher: {
        '@id': BUSINESS_ID
      },
      mainEntityOfPage: {
        '@id': `${pageUrl || blog.url}#webpage`
      },
      about: {
        '@id': BUSINESS_ID
      }
    };
  };

  const generateWebPageSchema = (): JsonLdNode | null => {
    if (!pageUrl) return null;

    const isLocationPage = type === 'location' && Boolean(locationSlug) && locationCityNode !== null;

    return {
      '@context': 'https://schema.org',
      '@type': webPageType,
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: documentTitle ?? (pageTitle || BUSINESS_INFO.name),
      description: pageDescription,
      isPartOf: {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: BUSINESS_INFO.name,
        publisher: {
          '@id': BUSINESS_ID
        }
      },
      about: {
        '@id': BUSINESS_ID
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: BUSINESS_INFO.logo
      },
      ...(isLocationPage && locationSlug
        ? {
            spatialCoverage: locationCityNode,
            mentions: getAreaServedForLocation(locationSlug).slice(1).map(cityNode)
          }
        : {}),
      ...(type === 'hub' ? { mainEntity: HUB_ITEM_LIST } : {}),
      ...(type !== 'hub' && itemList && itemList.length > 0
        ? {
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: itemList.map((item, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: item.name,
                url: item.url
              }))
            }
          }
        : {})
    };
  };

  const schemas = [
    BUSINESS_NODE,
    generateServiceSchema(),
    ...generateLocationServiceSchemas(),
    generateBlogPostingSchema(),
    generateFAQSchema(),
    generateBreadcrumbSchema(),
    generateWebPageSchema()
  ].filter((n): n is JsonLdNode => n !== null);

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
