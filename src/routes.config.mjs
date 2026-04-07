// Single source of truth for routes used by both the sitemap generator
// and the prerender script. Keep in sync with src/App.tsx.
// <Navigate> routes and dynamic :slug routes are NOT included here — those are
// handled via vercel.json 301s and SPA fallback respectively.

/**
 * @typedef {Object} RouteConfig
 * @property {string} path
 * @property {string} source
 * @property {'weekly'|'monthly'|'yearly'} changefreq
 * @property {string} priority
 * @property {boolean} prerender
 */

/** @type {RouteConfig[]} */
export const ROUTES = [
  { path: '/', source: 'src/pages/Home.tsx', changefreq: 'weekly', priority: '1.0', prerender: true },
  { path: '/about', source: 'src/pages/About.tsx', changefreq: 'monthly', priority: '0.8', prerender: true },
  { path: '/services', source: 'src/pages/Services.tsx', changefreq: 'monthly', priority: '0.9', prerender: true },
  { path: '/services/roof-installation', source: 'src/pages/services/RoofInstallation.tsx', changefreq: 'monthly', priority: '0.8', prerender: true },
  { path: '/services/roof-repair', source: 'src/pages/services/RoofRepair.tsx', changefreq: 'monthly', priority: '0.8', prerender: true },
  { path: '/services/roof-replacement', source: 'src/pages/services/RoofReplacement.tsx', changefreq: 'monthly', priority: '0.8', prerender: true },
  { path: '/services/roof-inspection', source: 'src/pages/services/RoofInspection.tsx', changefreq: 'monthly', priority: '0.8', prerender: true },
  { path: '/services/gutters', source: 'src/pages/services/Gutters.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/services/emergency-services', source: 'src/pages/services/EmergencyServices.tsx', changefreq: 'monthly', priority: '0.8', prerender: true },
  { path: '/services/storm-damage', source: 'src/pages/services/StormDamage.tsx', changefreq: 'monthly', priority: '0.8', prerender: true },
  { path: '/services/roof-maintenance', source: 'src/pages/services/RoofMaintenance.tsx', changefreq: 'monthly', priority: '0.8', prerender: true },
  { path: '/services/preventative-maintenance', source: 'src/pages/services/PreventativeMaintenance.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/services/siding', source: 'src/pages/services/Siding.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/services/commercial-roofing', source: 'src/pages/services/CommercialRoofing.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/gallery', source: 'src/pages/Gallery.tsx', changefreq: 'monthly', priority: '0.6', prerender: true },
  { path: '/reviews', source: 'src/pages/Reviews.tsx', changefreq: 'weekly', priority: '0.8', prerender: true },
  { path: '/blog', source: 'src/pages/Blog.tsx', changefreq: 'weekly', priority: '0.6', prerender: true },
  { path: '/faq', source: 'src/pages/FAQ.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/financing', source: 'src/pages/Financing.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/contact', source: 'src/pages/Contact.tsx', changefreq: 'monthly', priority: '0.9', prerender: true },
  { path: '/locations', source: 'src/pages/Locations.tsx', changefreq: 'monthly', priority: '0.8', prerender: true },
  { path: '/locations/columbus', source: 'src/pages/locations/Columbus.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/hilliard', source: 'src/pages/locations/Hilliard.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/dublin', source: 'src/pages/locations/Dublin.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/new-albany', source: 'src/pages/locations/NewAlbany.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/upper-arlington', source: 'src/pages/locations/UpperArlington.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/westerville', source: 'src/pages/locations/Westerville.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/gahanna', source: 'src/pages/locations/Gahanna.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/reynoldsburg', source: 'src/pages/locations/Reynoldsburg.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/grove-city', source: 'src/pages/locations/GroveCity.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/pickerington', source: 'src/pages/locations/Pickerington.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/worthington', source: 'src/pages/locations/Worthington.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/delaware', source: 'src/pages/locations/Delaware.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/locations/powell', source: 'src/pages/locations/Powell.tsx', changefreq: 'monthly', priority: '0.7', prerender: true },
  { path: '/get-a-quote-consultation', source: 'src/pages/InstantQuote.tsx', changefreq: 'monthly', priority: '0.8', prerender: true },
];

export const PRERENDER_ROUTES = ROUTES.filter((r) => r.prerender).map((r) => r.path);
