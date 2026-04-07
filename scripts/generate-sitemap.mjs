#!/usr/bin/env node
// Sitemap generator for dteroofingllc.com
// Mirrors routes from src/App.tsx. Run via `npm run generate-sitemap`.

import { execSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BASE = 'https://www.dteroofingllc.com';
const TODAY = new Date().toISOString().slice(0, 10);

/** @type {{path:string, source:string, changefreq:string, priority:string}[]} */
const ROUTES = [
  { path: '/', source: 'src/pages/Home.tsx', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', source: 'src/pages/About.tsx', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', source: 'src/pages/Services.tsx', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/roof-installation', source: 'src/pages/services/RoofInstallation.tsx', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/roof-repair', source: 'src/pages/services/RoofRepair.tsx', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/roof-replacement', source: 'src/pages/services/RoofReplacement.tsx', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/roof-inspection', source: 'src/pages/services/RoofInspection.tsx', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/gutters', source: 'src/pages/services/Gutters.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/services/emergency-services', source: 'src/pages/services/EmergencyServices.tsx', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/storm-damage', source: 'src/pages/services/StormDamage.tsx', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/roof-maintenance', source: 'src/pages/services/RoofMaintenance.tsx', changefreq: 'monthly', priority: '0.8' },
  { path: '/services/preventative-maintenance', source: 'src/pages/services/PreventativeMaintenance.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/services/siding', source: 'src/pages/services/Siding.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/services/commercial-roofing', source: 'src/pages/services/CommercialRoofing.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/gallery', source: 'src/pages/Gallery.tsx', changefreq: 'monthly', priority: '0.6' },
  { path: '/reviews', source: 'src/pages/Reviews.tsx', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', source: 'src/pages/Blog.tsx', changefreq: 'weekly', priority: '0.6' },
  { path: '/faq', source: 'src/pages/FAQ.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/financing', source: 'src/pages/Financing.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', source: 'src/pages/Contact.tsx', changefreq: 'monthly', priority: '0.9' },
  { path: '/locations', source: 'src/pages/Locations.tsx', changefreq: 'monthly', priority: '0.8' },
  { path: '/locations/columbus', source: 'src/pages/locations/Columbus.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/hilliard', source: 'src/pages/locations/Hilliard.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/dublin', source: 'src/pages/locations/Dublin.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/new-albany', source: 'src/pages/locations/NewAlbany.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/upper-arlington', source: 'src/pages/locations/UpperArlington.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/westerville', source: 'src/pages/locations/Westerville.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/gahanna', source: 'src/pages/locations/Gahanna.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/reynoldsburg', source: 'src/pages/locations/Reynoldsburg.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/grove-city', source: 'src/pages/locations/GroveCity.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/pickerington', source: 'src/pages/locations/Pickerington.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/worthington', source: 'src/pages/locations/Worthington.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/delaware', source: 'src/pages/locations/Delaware.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/locations/powell', source: 'src/pages/locations/Powell.tsx', changefreq: 'monthly', priority: '0.7' },
  { path: '/get-a-quote-consultation', source: 'src/pages/InstantQuote.tsx', changefreq: 'monthly', priority: '0.8' },
];

/**
 * @param {string} source
 * @returns {string}
 */
function gitLastmod(source) {
  try {
    const full = resolve(ROOT, source);
    if (!existsSync(full)) return TODAY;
    const out = execSync(`git log -1 --format=%cI -- "${source}"`, {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
    if (!out) return TODAY;
    return out.slice(0, 10);
  } catch {
    return TODAY;
  }
}

function buildXml() {
  const urls = ROUTES.map((r) => {
    const lastmod = gitLastmod(r.source);
    return [
      '  <url>',
      `    <loc>${BASE}${r.path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority}</priority>`,
      '  </url>',
    ].join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const xml = buildXml();
const outPath = resolve(ROOT, 'public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`Generated sitemap with ${ROUTES.length} urls -> ${outPath}`);
