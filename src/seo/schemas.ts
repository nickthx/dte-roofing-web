/**
 * Schema.org structured data definitions for DTE Roofing
 */

import { CANONICAL_DOMAIN } from './constants';

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": `${CANONICAL_DOMAIN}/#business`,
  "name": "DTE Roofing",
  "url": `${CANONICAL_DOMAIN}/`,
  "telephone": "+1-614-971-6028",
  "priceRange": "$$",
  "image": `${CANONICAL_DOMAIN}/images/DTE-Roofing-Logo-two-Men.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "615 Hilliard Rome Rd",
    "addressLocality": "Columbus",
    "addressRegion": "OH",
    "postalCode": "43228",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.9637153,
    "longitude": -83.1477371
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/people/DTE-Roofing/61556271692460/",
    "https://www.instagram.com/dte_roofing/"
  ]
};
