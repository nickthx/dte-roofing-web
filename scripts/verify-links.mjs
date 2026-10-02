// Internal-link gate over the prerendered dist/ output.
//
// Reads what crawlers actually receive (dist/<route>/index.html), not the React
// source: a link that only exists after a hover or click (e.g. a dropdown that is
// rendered only while open) never reaches a crawler, so it must fail here even
// when the component code looks correct.
//
// Checks (spec section 9):
//   a  header links /services + every SERVICES path; footer links /locations, every
//      city page, /services, every SERVICES path and the Facebook/Instagram/BBB profiles
//   b  main content: /services/* -> 13 cities + /locations; / and /contact -> 13 cities;
//      /locations -> every SERVICES path
//   c  each blog post's related-areas block has exactly 4 city links; /gallery main >= 10
//   d  (one data row) every city has >= 3 inbound neighbors and never lists itself
//   e  every internal href resolves to a prerendered route, / or a file in dist/;
//      no http:// and no apex https://dteroofingllc.com hrefs
//   f  the header's mobile menu button carries aria-label="Open menu"
//
// Usage: npm run build && node scripts/verify-links.mjs
//
// Zero dependencies on purpose: it must run on any checkout with only Node.

import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRERENDER_ROUTES } from '../src/routes.config.mjs';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..');
const DIST = resolve(ROOT, 'dist');
const SERVICES_SRC = resolve(ROOT, 'src/data/services.ts');
const LOCATIONS_SRC = resolve(ROOT, 'src/data/locations.ts');

const SITE_ORIGIN = 'https://www.dteroofingllc.com';
const APEX_ORIGIN = 'https://dteroofingllc.com';
const FACEBOOK_URL = 'https://www.facebook.com/people/DTE-Roofing/61556271692460/';
const INSTAGRAM_URL = 'https://www.instagram.com/dte_roofing/';
const BBB_URL = 'https://www.bbb.org/us/oh/columbus/profile/roofing-contractors/dte-roofing-llc-0302-70165482';
const SOCIAL_URLS = [FACEBOOK_URL, INSTAGRAM_URL, BBB_URL];

const EXPECTED_SERVICES = 10;
const EXPECTED_LOCATIONS = 13;
const MIN_INBOUND_NEIGHBORS = 3;
const BLOG_RELATED_CITY_LINKS = 4;
const GALLERY_MIN_CITY_LINKS = 10;
const MAX_LISTED = 5;

const SERVICE_ROUTE_RE = /^\/services\/[^/]+$/;
const BLOG_POST_RE = /^\/blog\/[^/]+$/;
const CITY_PATH_RE = /^\/locations\/[^/]+$/;
const A_TAG_RE = /<a\b[^>]*>/g;
const LINK_TAG_RE = /<link\b[^>]*>/g;
// Leading whitespace so data-href / hreflang / imagesrcset can never match.
const HREF_ATTR_RE = /\shref="([^"]*)"/;
const SKIP_HREF_RE = /^(?:tel:|mailto:|sms:|data:|#)/i;
const RELATED_AREAS_MARKER = 'id="related-areas-heading"';

// Text-parse rather than import: the .ts files cannot be loaded by plain Node.
function readServicePaths() {
  const source = readFileSync(SERVICES_SRC, 'utf8');
  return [...source.matchAll(/path:\s*(['"])(\/services\/[^'"]+)\1/g)].map((m) => m[2]);
}

// `slug: string` in the helper signatures has no quote, so only data objects match.
function readLocations() {
  const source = readFileSync(LOCATIONS_SRC, 'utf8');
  const objectRe = /slug:\s*(['"])([^'"]+)\1[\s\S]*?neighbors:\s*\[([^\]]*)\]/g;
  return [...source.matchAll(objectRe)].map((m) => ({
    slug: m[2],
    neighbors: [...m[3].matchAll(/(['"])([^'"]+)\1/g)].map((n) => n[2]),
  }));
}

function htmlPathFor(route) {
  return route === '/' ? resolve(DIST, 'index.html') : resolve(DIST, '.' + route, 'index.html');
}

// Inner HTML of the first <tag>…</tag>, or null so the check that needs it can fail cleanly.
function region(html, tag) {
  const match = html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? match[1] : null;
}

function hrefsOf(fragment, tagRe) {
  const hrefs = [];
  for (const tag of fragment.matchAll(tagRe)) {
    const attr = tag[0].match(HREF_ATTR_RE);
    if (attr) hrefs.push(attr[1].replace(/&amp;/g, '&'));
  }
  return hrefs;
}

// "Links to X" means exact path equality after dropping #fragment, ?query and one
// trailing slash, so /services can never be satisfied by /services/roof-repair.
function normalise(href) {
  const path = href.split(/[#?]/)[0];
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

function missingFrom(targets, hrefs) {
  const normalised = new Set(hrefs.map(normalise));
  const raw = new Set(hrefs);
  // External profile URLs are compared character-for-character, not normalised.
  return targets.filter((t) => (SOCIAL_URLS.includes(t) ? !raw.has(t) : !normalised.has(t)));
}

function describeMissing(prefix, missing) {
  const shown = missing.slice(0, MAX_LISTED).join(', ');
  const more = missing.length > MAX_LISTED ? ` (+${missing.length - MAX_LISTED} more)` : '';
  return `${prefix} missing ${shown}${more}`;
}

function countCityLinks(fragment) {
  return hrefsOf(fragment, A_TAG_RE).filter((h) => CITY_PATH_RE.test(normalise(h))).length;
}

// Returns a failure string, or null when the href is fine or not ours to judge.
function checkHref(href, routeSet) {
  if (SKIP_HREF_RE.test(href)) return null;
  const lower = href.toLowerCase();
  if (lower.startsWith('http://')) return `e: http href ${href}`;
  if (lower.startsWith(APEX_ORIGIN)) return `e: apex href ${href}`;

  let rest;
  if (href.startsWith('/') && !href.startsWith('//')) rest = href;
  else if (href.startsWith(SITE_ORIGIN)) rest = href.slice(SITE_ORIGIN.length);
  else return null; // other hosts are out of scope

  let path = rest.split(/[#?]/)[0];
  if (path === '') path = '/';
  try {
    path = decodeURIComponent(path);
  } catch {
    return `e: undecodable href ${href}`;
  }
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  if (path === '/' || routeSet.has(path)) return null;
  if (!path.startsWith('/')) return `e: unresolved ${href}`;

  // Existence check only, never a read; anything resolving outside dist/ is refused
  // so a crafted "/../" href cannot probe the rest of the filesystem.
  const file = resolve(DIST, '.' + path);
  if (!file.startsWith(DIST + sep)) return `e: outside dist ${href}`;
  try {
    if (existsSync(file) && statSync(file).isFile()) return null;
  } catch {
    // fall through: an unreadable path is as broken as a missing one
  }
  return `e: unresolved ${href}`;
}

function checkPage(route, html, ctx) {
  const failures = [];
  const header = region(html, 'header');
  const footer = region(html, 'footer');
  const main = region(html, 'main');

  // a: site-wide navigation must expose every service and city on every page
  if (header === null) {
    failures.push('a: no <header>');
  } else {
    const missing = missingFrom(['/services', ...ctx.servicePaths], hrefsOf(header, A_TAG_RE));
    if (missing.length > 0) failures.push(describeMissing('a: header', missing));
  }
  if (footer === null) {
    failures.push('a: no <footer>');
  } else {
    const targets = ['/locations', ...ctx.cityPaths, '/services', ...ctx.servicePaths, ...SOCIAL_URLS];
    const missing = missingFrom(targets, hrefsOf(footer, A_TAG_RE));
    if (missing.length > 0) failures.push(describeMissing('a: footer', missing));
  }

  // b: in-content lists, which carry more weight than boilerplate nav links
  let mainTargets = null;
  if (SERVICE_ROUTE_RE.test(route)) mainTargets = [...ctx.cityPaths, '/locations'];
  else if (route === '/' || route === '/contact') mainTargets = ctx.cityPaths;
  else if (route === '/locations') mainTargets = ctx.servicePaths;
  if (mainTargets) {
    if (main === null) {
      failures.push('b: no <main>');
    } else {
      const missing = missingFrom(mainTargets, hrefsOf(main, A_TAG_RE));
      if (missing.length > 0) failures.push(describeMissing('b: main', missing));
    }
  }

  // c: blog posts and the gallery must hand authority to specific city pages
  if (BLOG_POST_RE.test(route)) {
    const at = main === null ? -1 : main.indexOf(RELATED_AREAS_MARKER);
    if (at === -1) {
      failures.push('c: no related-areas block');
    } else {
      const start = main.lastIndexOf('<section', at);
      const end = main.indexOf('</section>', at);
      if (start === -1 || end === -1) {
        failures.push('c: related-areas block has no enclosing <section>');
      } else {
        const count = countCityLinks(main.slice(start, end));
        if (count !== BLOG_RELATED_CITY_LINKS) {
          failures.push(`c: related-areas block has ${count} city links (expected ${BLOG_RELATED_CITY_LINKS})`);
        }
      }
    }
  } else if (route === '/gallery') {
    // Counted in main only, so the footer's 13 city links can never satisfy it.
    const count = main === null ? 0 : countCityLinks(main);
    if (count < GALLERY_MIN_CITY_LINKS) {
      failures.push(`c: main has ${count} city links (min ${GALLERY_MIN_CITY_LINKS})`);
    }
  }

  // e: every internal href on the page, including <link> canonicals and preloads
  const pageHrefs = [...hrefsOf(html, A_TAG_RE), ...hrefsOf(html, LINK_TAG_RE)];
  const hrefFailures = new Set();
  for (const href of pageHrefs) {
    const failure = checkHref(href, ctx.routeSet);
    if (failure) hrefFailures.add(failure);
  }
  failures.push(...hrefFailures);

  // f: an icon-only menu button needs an accessible name in the prerendered HTML
  if (header === null) {
    failures.push('f: no <header>');
  } else {
    const buttons = header.match(/<button\b[^>]*>/g) ?? [];
    if (!buttons.some((b) => b.includes(' aria-label="Open menu"'))) {
      failures.push('f: no header <button> with aria-label="Open menu"');
    }
  }

  return failures;
}

// d: a city that few neighbors point at is effectively orphaned in the NearbyAreas graph.
function checkNeighbors(locations) {
  const failures = [];
  const inbound = new Map(locations.map((loc) => [loc.slug, new Set()]));
  for (const loc of locations) {
    for (const neighbor of loc.neighbors) {
      if (neighbor === loc.slug) failures.push(`d: ${loc.slug} lists itself`);
      else if (!inbound.has(neighbor)) failures.push(`d: ${loc.slug} lists unknown city ${neighbor}`);
      else inbound.get(neighbor).add(loc.slug);
    }
  }
  for (const [slug, sources] of inbound) {
    if (sources.size < MIN_INBOUND_NEIGHBORS) {
      failures.push(`d: ${slug} has ${sources.size} inbound (min ${MIN_INBOUND_NEIGHBORS})`);
    }
  }
  return failures;
}

function main() {
  const servicePaths = readServicePaths();
  const locations = readLocations();
  // A silent mis-parse would make every check vacuous, so refuse to print a table at all.
  if (servicePaths.length !== EXPECTED_SERVICES || locations.length !== EXPECTED_LOCATIONS) {
    console.error(
      `SSOT parse failed: ${servicePaths.length} service paths in src/data/services.ts (expected ${EXPECTED_SERVICES}), ` +
        `${locations.length} locations in src/data/locations.ts (expected ${EXPECTED_LOCATIONS})`,
    );
    process.exit(1);
  }
  const ctx = {
    servicePaths,
    cityPaths: locations.map((loc) => `/locations/${loc.slug}`),
    routeSet: new Set(PRERENDER_ROUTES),
  };

  const rows = [];
  for (const route of PRERENDER_ROUTES) {
    const file = htmlPathFor(route);
    if (!existsSync(file)) {
      rows.push({ route, links: '0', status: 'FAIL', details: `missing: ${file}` });
      continue;
    }
    const html = readFileSync(file, 'utf8');
    const failures = checkPage(route, html, ctx);
    rows.push({
      route,
      links: String(hrefsOf(html, A_TAG_RE).length),
      status: failures.length > 0 ? 'FAIL' : 'PASS',
      details: failures.join('; '),
    });
  }
  const neighborFailures = checkNeighbors(locations);
  rows.push({
    route: 'data: neighbors',
    links: '-',
    status: neighborFailures.length > 0 ? 'FAIL' : 'PASS',
    details: neighborFailures.join('; '),
  });

  const routeWidth = Math.max('route'.length, ...rows.map((r) => r.route.length));
  const linksWidth = Math.max('links'.length, ...rows.map((r) => r.links.length));
  console.log(`${'route'.padEnd(routeWidth)} | ${'links'.padStart(linksWidth)} | status | details`);
  for (const r of rows) {
    console.log(`${r.route.padEnd(routeWidth)} | ${r.links.padStart(linksWidth)} | ${r.status.padEnd(6)} | ${r.details}`);
  }

  const pass = rows.filter((r) => r.status === 'PASS').length;
  const fail = rows.filter((r) => r.status === 'FAIL').length;
  console.log(`checked ${rows.length}, pass ${pass}, fail ${fail}`);
  process.exit(fail > 0 ? 1 : 0);
}

main();
