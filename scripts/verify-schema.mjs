// JSON-LD gate over the prerendered dist/ output.
//
// Reads what crawlers actually receive (dist/<route>/index.html), not the React
// source, so a lazy/Suspense regression that drops helmet output from the
// prerendered HTML is caught here even when the components look correct.
//
// Usage:
//   node scripts/verify-schema.mjs             check every PRERENDER_ROUTES page
//   node scripts/verify-schema.mjs --snapshot  write scripts/schema-baseline.json
//
// Zero dependencies on purpose: it must run on any checkout with only Node.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { PRERENDER_ROUTES } from '../src/routes.config.mjs';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..');
const DIST = resolve(ROOT, 'dist');
const LOCATIONS_SRC = resolve(ROOT, 'src/data/locations.ts');
const BASELINE_PATH = resolve(ROOT, 'scripts/schema-baseline.json');

const BUSINESS_ID = 'https://www.dteroofingllc.com/#business';
const EXPECTED_SAME_AS = [
  'https://www.google.com/maps?cid=15933068684969168707',
  'https://www.facebook.com/people/DTE-Roofing/61556271692460/',
  'https://www.instagram.com/dte_roofing/',
  'https://www.bbb.org/us/oh/columbus/profile/roofing-contractors/dte-roofing-llc-0302-70165482',
  'https://www.gaf.com/en-us/roofing-contractors/residential/usa/oh/columbus/dte-roofing-llc-1146165',
  'https://www.yelp.com/biz/dte-roofing-lincoln-village',
  'https://nextdoor.com/pages/dte-roofing-llc-hilliard-oh/',
];
const WEB_PAGE_TYPES = ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage'];

// These routes render no <SchemaMarkup> by design. Listing them explicitly means
// any OTHER route with zero JSON-LD is treated as a regression, not a pass.
const NO_SCHEMA_ROUTES = ['/services', '/gallery', '/blog', '/financing', '/get-a-quote-consultation'];

const JSON_LD_RE = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
const TITLE_RE = /<title[^>]*>([\s\S]*?)<\/title>/;
const LOCATION_ROUTE_RE = /^\/locations\/([^/]+)$/;

const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

// Single pass so an encoded entity like "&amp;lt;" decodes to "&lt;", not "<".
function decodeEntities(text) {
  return text.replace(/&(#[xX][0-9a-fA-F]+|#[0-9]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === '#') {
      const isHex = entity[1] === 'x' || entity[1] === 'X';
      const code = isHex ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, entity) ? NAMED_ENTITIES[entity] : match;
  });
}

function htmlPathFor(route) {
  return route === '/' ? resolve(DIST, 'index.html') : resolve(DIST, '.' + route, 'index.html');
}

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function typesOf(node) {
  const raw = node['@type'];
  if (typeof raw === 'string') return [raw];
  if (Array.isArray(raw)) return raw.filter((t) => typeof t === 'string');
  return [];
}

function hasType(node, type) {
  return typesOf(node).includes(type);
}

// A block may be a single node, an array of nodes, or an @graph container;
// all three are valid JSON-LD and must count the same.
function topLevelNodes(parsed) {
  if (Array.isArray(parsed)) return parsed.filter(isPlainObject);
  if (isPlainObject(parsed) && Array.isArray(parsed['@graph'])) {
    return parsed['@graph'].filter(isPlainObject);
  }
  return isPlainObject(parsed) ? [parsed] : [];
}

function collectObjects(value, out = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectObjects(item, out);
  } else if (isPlainObject(value)) {
    out.push(value);
    for (const child of Object.values(value)) collectObjects(child, out);
  }
  return out;
}

function listLength(value) {
  if (Array.isArray(value)) return value.length;
  return isPlainObject(value) ? 1 : 0;
}

// Text-parse rather than import: the .ts file cannot be loaded by plain Node.
function readCityNames() {
  const source = readFileSync(LOCATIONS_SRC, 'utf8');
  const pairRe = /slug:\s*(['"])([^'"]+)\1\s*,\s*cityName:\s*(['"])([^'"]+)\3/g;
  const cities = new Map();
  for (const match of source.matchAll(pairRe)) cities.set(match[2], match[4]);
  return cities;
}

function loadPage(route) {
  const file = htmlPathFor(route);
  if (!existsSync(file)) return { missing: file };
  const html = readFileSync(file, 'utf8');
  const blocks = [...html.matchAll(JSON_LD_RE)].map((m) => m[1]);
  const parsed = [];
  const parseErrors = [];
  blocks.forEach((block, i) => {
    try {
      parsed.push(JSON.parse(block));
    } catch (err) {
      parseErrors.push(`parse: block ${i} ${err.message}`);
    }
  });
  const titleMatch = html.match(TITLE_RE);
  const title = titleMatch ? decodeEntities(titleMatch[1]) : null;
  const topLevel = parsed.flatMap(topLevelNodes);
  const objects = collectObjects(parsed);
  return { blockCount: blocks.length, parseErrors, title, topLevel, objects };
}

function countFaqQuestions(objects) {
  return objects
    .filter((o) => hasType(o, 'FAQPage'))
    .reduce((sum, o) => sum + listLength(o.mainEntity), 0);
}

function countBreadcrumbItems(objects) {
  return objects
    .filter((o) => hasType(o, 'BreadcrumbList'))
    .reduce((sum, o) => sum + listLength(o.itemListElement), 0);
}

function gitShortHead() {
  try {
    return execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

function runSnapshot() {
  const routes = {};
  for (const route of PRERENDER_ROUTES) {
    const page = loadPage(route);
    // A broken build must never become the reference, so refuse rather than record zeros.
    if (page.missing) {
      console.error(`snapshot aborted, missing: ${page.missing}`);
      process.exit(1);
    }
    if (page.parseErrors.length > 0) {
      console.error(`snapshot aborted on ${route}: ${page.parseErrors.join('; ')}`);
      process.exit(1);
    }
    routes[route] = {
      jsonLdBlocks: page.blockCount,
      faqQuestions: countFaqQuestions(page.objects),
      breadcrumbItems: countBreadcrumbItems(page.objects),
    };
  }
  const baseline = { baselineCommit: gitShortHead(), routes };
  writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + '\n', 'utf8');
  console.log(`wrote ${Object.keys(routes).length} routes`);
  process.exit(0);
}

function checkPage(route, page, cities, baseline) {
  const failures = [];
  const notes = [];
  const { topLevel, objects } = page;

  // a: one business entity per page, and nothing else posing as it
  const contractors = objects.filter((o) => hasType(o, 'RoofingContractor'));
  if (contractors.length !== 1) {
    failures.push(`a: ${contractors.length} RoofingContractor nodes (expected 1)`);
  }
  if (contractors.length >= 1 && contractors[0]['@id'] !== BUSINESS_ID) {
    failures.push(`a: RoofingContractor @id is ${JSON.stringify(contractors[0]['@id'])}`);
  }
  const strayBusinessIds = new Set(
    objects
      .map((o) => o['@id'])
      .filter((id) => typeof id === 'string' && id.endsWith('#business') && id !== BUSINESS_ID),
  );
  for (const id of strayBusinessIds) failures.push(`a: stray business id ${id}`);

  // b: a reference only helps if the target is defined on the page Google is reading
  const definedIds = new Set(
    objects
      .filter((o) => typeof o['@id'] === 'string' && Object.keys(o).length > 1)
      .map((o) => o['@id']),
  );
  const unresolved = new Set(
    objects
      .filter((o) => Object.keys(o).length === 1 && '@id' in o)
      .map((o) => o['@id'])
      .filter((id) => !definedIds.has(id)),
  );
  for (const id of unresolved) failures.push(`b: unresolved reference ${JSON.stringify(id)}`);

  // c: review markup on the business itself is self-serving and ineligible
  if (objects.some((o) => 'aggregateRating' in o)) failures.push('c: aggregateRating key present');
  if (objects.some((o) => 'review' in o)) failures.push('c: review key present');
  const offerObjects = objects.filter((o) => 'offers' in o).flatMap((o) => collectObjects(o.offers));
  if (offerObjects.some((o) => 'priceRange' in o)) failures.push('c: priceRange inside offers');

  // d: every Service must point back at the single business and say where it applies
  for (const svc of objects.filter((o) => hasType(o, 'Service'))) {
    const label = svc['@id'] ?? svc.name ?? '(unnamed)';
    const providerId = isPlainObject(svc.provider) ? svc.provider['@id'] : undefined;
    if (providerId !== BUSINESS_ID) {
      failures.push(`d: Service ${label} provider @id is ${JSON.stringify(providerId)}`);
    }
    const area = svc.areaServed;
    const hasArea = Array.isArray(area) ? area.length > 0 : isPlainObject(area);
    if (!hasArea) failures.push(`d: Service ${label} has empty areaServed`);
  }

  // e: WebPage name must mirror the <title> so the two never drift apart again
  const webPages = topLevel.filter((n) => typesOf(n).some((t) => WEB_PAGE_TYPES.includes(t)));
  if (webPages.length !== 1) {
    failures.push(`e: ${webPages.length} top-level WebPage-family nodes (expected 1)`);
  } else if (page.title === null) {
    failures.push('e: page has no <title>');
  } else if (webPages[0].name !== page.title) {
    failures.push(`e: name mismatch (expected ${JSON.stringify(page.title)}, got ${JSON.stringify(webPages[0].name)})`);
  }

  // f: page-type specific structure
  const locationMatch = route.match(LOCATION_ROUTE_RE);
  if (locationMatch) {
    const cityName = cities.get(locationMatch[1]);
    const serviceCount = topLevel.filter((n) => hasType(n, 'Service')).length;
    if (serviceCount < 7) failures.push(`f: ${serviceCount} Service nodes (expected >= 7)`);
    if (!cityName) {
      failures.push(`f: no cityName for slug ${locationMatch[1]} in src/data/locations.ts`);
    } else {
      const coverage = webPages[0] && isPlainObject(webPages[0].spatialCoverage) ? webPages[0].spatialCoverage.name : undefined;
      if (coverage !== cityName) {
        failures.push(`f: spatialCoverage.name is ${JSON.stringify(coverage)} (expected ${JSON.stringify(cityName)})`);
      }
    }
  } else if (route === '/locations') {
    const lists = objects.filter((o) => hasType(o, 'ItemList'));
    if (!lists.some((l) => Array.isArray(l.itemListElement) && l.itemListElement.length === 13)) {
      const sizes = lists.map((l) => listLength(l.itemListElement));
      failures.push(`f: no ItemList with 13 items (found ${sizes.length ? sizes.join(',') : 'none'})`);
    }
  } else if (route === '/about') {
    if (!topLevel.some((n) => hasType(n, 'AboutPage'))) failures.push('f: no top-level AboutPage');
  } else if (route === '/contact') {
    if (!topLevel.some((n) => hasType(n, 'ContactPage'))) failures.push('f: no top-level ContactPage');
  }

  // g: the refactor must not lose FAQ or breadcrumb entries that were already live
  const before = baseline.routes[route];
  if (before && before.jsonLdBlocks >= 1) {
    const faqNow = countFaqQuestions(objects);
    const crumbsNow = countBreadcrumbItems(objects);
    if (faqNow !== before.faqQuestions) failures.push(`g: faqQuestions ${before.faqQuestions} -> ${faqNow}`);
    if (crumbsNow !== before.breadcrumbItems) {
      failures.push(`g: breadcrumbItems ${before.breadcrumbItems} -> ${crumbsNow}`);
    }
  } else {
    notes.push('note(g): new schema page');
  }

  // h: entity-reconciliation signals on the business node
  if (contractors.length >= 1) {
    const business = contractors[0];
    const sameAs = Array.isArray(business.sameAs) ? business.sameAs : [];
    for (const url of EXPECTED_SAME_AS) {
      if (!sameAs.includes(url)) failures.push(`h: sameAs missing ${url}`);
    }
    const founderCount = Array.isArray(business.founder) ? business.founder.length : 0;
    if (founderCount !== 2) failures.push(`h: founder has ${founderCount} entries (expected 2)`);
  } else {
    failures.push('h: no RoofingContractor node to check');
  }

  return { failures, notes };
}

function runCheck() {
  if (!existsSync(BASELINE_PATH)) {
    console.error('no scripts/schema-baseline.json: run --snapshot on the pre-change build first');
    process.exit(1);
  }
  const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));

  const cities = readCityNames();
  const locationRouteCount = PRERENDER_ROUTES.filter((r) => LOCATION_ROUTE_RE.test(r)).length;
  if (cities.size !== locationRouteCount) {
    console.error(
      `city extraction failed: ${cities.size} slug/cityName pairs in src/data/locations.ts ` +
        `but ${locationRouteCount} /locations/<city> routes in PRERENDER_ROUTES`,
    );
    process.exit(1);
  }

  const rows = [];
  for (const route of PRERENDER_ROUTES) {
    const page = loadPage(route);
    if (page.missing) {
      rows.push({ route, nodes: 0, status: 'FAIL', details: `missing: ${page.missing}` });
      continue;
    }
    if (page.blockCount === 0) {
      const skip = NO_SCHEMA_ROUTES.includes(route);
      rows.push({
        route,
        nodes: 0,
        status: skip ? 'SKIP' : 'FAIL',
        details: skip ? 'skip (no JSON-LD)' : 'none: no JSON-LD blocks',
      });
      continue;
    }
    const { failures, notes } = checkPage(route, page, cities, baseline);
    const allFailures = [...page.parseErrors, ...failures];
    rows.push({
      route,
      nodes: page.topLevel.length,
      status: allFailures.length > 0 ? 'FAIL' : 'PASS',
      details: [...allFailures, ...notes].join('; '),
    });
  }

  const routeWidth = Math.max('route'.length, ...rows.map((r) => r.route.length));
  const nodesWidth = Math.max('nodes'.length, ...rows.map((r) => String(r.nodes).length));
  console.log(`${'route'.padEnd(routeWidth)} | ${'nodes'.padStart(nodesWidth)} | status | details`);
  for (const r of rows) {
    console.log(`${r.route.padEnd(routeWidth)} | ${String(r.nodes).padStart(nodesWidth)} | ${r.status.padEnd(6)} | ${r.details}`);
  }

  const pass = rows.filter((r) => r.status === 'PASS').length;
  const fail = rows.filter((r) => r.status === 'FAIL').length;
  const skip = rows.filter((r) => r.status === 'SKIP').length;
  console.log(`checked ${rows.length}, pass ${pass}, fail ${fail}, skip ${skip}`);
  process.exit(fail > 0 ? 1 : 0);
}

if (process.argv.includes('--snapshot')) {
  runSnapshot();
} else {
  runCheck();
}
