#!/usr/bin/env node
// Phase 5 — Full-Site Verification (DTE Roofing SEO Audit 2026-06-01)
// Deterministic crawler over the PRERENDERED HTML in dist/.
// Confirms, for every sitemap route: unique title/meta/H1, correct length,
// self-canonical, no thin content, valid JSON-LD, no broken internal links,
// no orphan pages, full image alt+dimension coverage, no empty anchors,
// and that the legacy keywords meta is gone.
//
// Usage: npm run build  (then)  node scripts/verify-phase-05.mjs
// Exits non-zero if any hard check fails. Writes dist/phase-05-report.json.

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from '../src/routes.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const DOMAIN = 'https://www.dteroofingllc.com';

// ── thresholds ───────────────────────────────────────────────────────────
const TITLE_MIN = 50, TITLE_MAX = 60;     // 23 templated pages
const META_MAX = 158;                      // all pages
const SERVICE_MIN_WORDS = 600;
const LOCATION_MIN_WORDS = 800;

// vercel.json 301 sources — valid internal link targets (they redirect, not 404)
const REDIRECT_SOURCES = new Set([
  '/home', '/team', '/faqs', '/careers', '/book-a-consultation', '/cart',
  '/services/gutter-services', '/services/roof-maintenance',
]);

// ── helpers ────────────────────────────────────────────────────────────────
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d));
}
function distFileFor(routePath) {
  return routePath === '/' ? join(DIST, 'index.html') : join(DIST, routePath, 'index.html');
}
function normalizePath(p) {
  // strip hash/query, drop trailing slash (except root)
  let x = p.split('#')[0].split('?')[0];
  if (x.length > 1 && x.endsWith('/')) x = x.slice(0, -1);
  return x || '/';
}
// crude but reliable attribute reader for a single tag string
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, 'i'));
  return m ? m[1] : null;
}
function stripTags(html) {
  return decodeEntities(
    html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ').trim();
}
function wordCount(text) { return text ? text.split(/\s+/).filter(Boolean).length : 0; }

// page classification
function kindOf(route) {
  if (route.path === '/') return 'home';
  if (route.path.startsWith('/services/')) return 'service';
  if (route.path.startsWith('/locations/')) return 'location';
  if (route.path.startsWith('/blog/')) return 'blog';
  if (['/services'].includes(route.path)) return 'services-hub';
  if (['/locations'].includes(route.path)) return 'locations-hub';
  if (route.path === '/blog') return 'blog-hub';
  if (route.path === '/faq') return 'faq';
  return 'utility';
}
const TEMPLATED = new Set(['service', 'location']); // the 23 with strict 50–60 titles

// expected JSON-LD @types per kind (presence required)
const EXPECTED_TYPES = {
  home: ['RoofingContractor', 'WebPage'],
  service: ['Service', 'BreadcrumbList', 'FAQPage'],
  location: ['BreadcrumbList'],            // + a LocalBusiness/RoofingContractor variant (checked loosely)
  blog: ['BlogPosting', 'BreadcrumbList', 'FAQPage'],
  faq: ['FAQPage'],
};

// ── collect valid internal targets ─────────────────────────────────────────
const routePaths = new Set(ROUTES.map(r => normalizePath(r.path)));
function isValidInternalTarget(p) {
  const norm = normalizePath(p);
  if (norm === '/') return true;
  if (routePaths.has(norm)) return true;
  if (REDIRECT_SOURCES.has(norm)) return true;
  // static asset / file that ships in dist (e.g. /sitemap.xml, /robots.txt, /images/..)
  const f = join(DIST, norm);
  if (existsSync(f)) return true;
  if (existsSync(f + '/index.html')) return true;
  // dynamic blog slug fallback (SPA) — any /blog/* handled, but we prerender known ones
  return false;
}

// ── per-page parse ───────────────────────────────────────────────────────────
const pages = [];
const inbound = new Map(); // normalizedPath -> count of inbound internal links

for (const route of ROUTES) {
  const file = distFileFor(route.path);
  const rec = { path: route.path, kind: kindOf(route), issues: [], file };
  if (!existsSync(file)) {
    rec.issues.push({ sev: 'HIGH', msg: `missing prerendered file ${file}` });
    pages.push(rec);
    continue;
  }
  const html = readFileSync(file, 'utf8');

  // title
  const tm = html.match(/<title[^>]*data-rh="true"[^>]*>([\s\S]*?)<\/title>/i)
          || html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  rec.title = tm ? decodeEntities(tm[1].trim()) : null;
  rec.titleLen = rec.title ? rec.title.length : 0;
  if (!rec.title) rec.issues.push({ sev: 'HIGH', msg: 'no <title>' });
  else if (TEMPLATED.has(rec.kind) && (rec.titleLen < TITLE_MIN || rec.titleLen > TITLE_MAX))
    rec.issues.push({ sev: 'MED', msg: `title ${rec.titleLen} chars (want ${TITLE_MIN}-${TITLE_MAX}): "${rec.title}"` });
  else if (!TEMPLATED.has(rec.kind) && rec.titleLen > 65)
    rec.issues.push({ sev: 'LOW', msg: `title ${rec.titleLen} chars >65 (non-templated): "${rec.title}"` });

  // meta description
  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  let desc = null, hasKeywords = false;
  for (const mt of metas) {
    const nm = (attr(mt, 'name') || '').toLowerCase();
    if (nm === 'description') desc = decodeEntities(attr(mt, 'content') || '');
    if (nm === 'keywords') hasKeywords = true;
  }
  rec.desc = desc; rec.descLen = desc ? desc.length : 0;
  if (!desc) rec.issues.push({ sev: 'HIGH', msg: 'no meta description' });
  else if (rec.descLen > META_MAX) rec.issues.push({ sev: 'MED', msg: `meta ${rec.descLen} chars >${META_MAX}` });
  if (hasKeywords) rec.issues.push({ sev: 'MED', msg: 'legacy <meta name="keywords"> present (should be removed)' });

  // canonical
  const cm = html.match(/<link\b[^>]*rel="canonical"[^>]*>/i);
  rec.canonical = cm ? attr(cm[0], 'href') : null;
  const expectedCanon = DOMAIN + (route.path === '/' ? '/' : route.path);
  if (!rec.canonical) rec.issues.push({ sev: 'HIGH', msg: 'no canonical' });
  else if (normalizePath(rec.canonical.replace(DOMAIN, '') || '/') !== normalizePath(route.path))
    rec.issues.push({ sev: 'HIGH', msg: `canonical "${rec.canonical}" != self "${expectedCanon}"` });

  // H1
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => stripTags(m[1]));
  rec.h1s = h1s;
  if (h1s.length === 0) rec.issues.push({ sev: 'HIGH', msg: 'no <h1>' });
  else if (h1s.length > 1) rec.issues.push({ sev: 'MED', msg: `${h1s.length} <h1> tags (want 1)` });
  if (h1s.length && !h1s[0].trim()) rec.issues.push({ sev: 'HIGH', msg: 'empty <h1>' });

  // word count (main content only)
  const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const mainText = stripTags(mainMatch ? mainMatch[1] : html);
  rec.words = wordCount(mainText);
  if (rec.kind === 'service' && rec.words < SERVICE_MIN_WORDS)
    rec.issues.push({ sev: 'HIGH', msg: `thin: ${rec.words} words <${SERVICE_MIN_WORDS} (service)` });
  if (rec.kind === 'location' && rec.words < LOCATION_MIN_WORDS)
    rec.issues.push({ sev: 'HIGH', msg: `thin: ${rec.words} words <${LOCATION_MIN_WORDS} (location)` });

  // JSON-LD
  const ldBlocks = [...html.matchAll(/<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  rec.ldCount = ldBlocks.length;
  rec.ldTypes = [];
  rec.ldValid = true;
  for (const block of ldBlocks) {
    try {
      const json = JSON.parse(block.trim());
      const collect = (o) => {
        if (Array.isArray(o)) return o.forEach(collect);
        if (o && typeof o === 'object') {
          if (o['@type']) ([]).concat(o['@type']).forEach(t => rec.ldTypes.push(t));
          if (o['@graph']) collect(o['@graph']);
          for (const k of Object.keys(o)) if (typeof o[k] === 'object') collect(o[k]);
        }
      };
      collect(json);
    } catch (e) {
      rec.ldValid = false;
      rec.issues.push({ sev: 'HIGH', msg: `invalid JSON-LD: ${e.message}` });
    }
  }
  const typeSet = new Set(rec.ldTypes);
  const want = EXPECTED_TYPES[rec.kind];
  if (want) for (const t of want) if (!typeSet.has(t))
    rec.issues.push({ sev: 'HIGH', msg: `missing JSON-LD @type "${t}"` });
  if (rec.kind === 'location' && !(typeSet.has('LocalBusiness') || typeSet.has('RoofingContractor')))
    rec.issues.push({ sev: 'MED', msg: 'location missing LocalBusiness/RoofingContractor JSON-LD' });

  // internal links + inbound graph
  const anchors = [...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)];
  rec.brokenLinks = [];
  rec.emptyAnchors = 0;
  for (const a of anchors) {
    const tag = a[0].slice(0, a[0].indexOf('>') + 1);
    const inner = a[1];
    const href = attr(tag, 'href');
    // empty-anchor check
    const text = stripTags(inner);
    const hasImgAlt = /<img\b[^>]*\balt="[^"]+"/i.test(inner);
    const hasLabel = attr(tag, 'aria-label') || attr(tag, 'title');
    if (!text && !hasImgAlt && !hasLabel)
      rec.emptyAnchors++;
    if (!href) continue;
    if (/^(https?:)?\/\//i.test(href) || /^(mailto:|tel:|#)/i.test(href)) continue; // external/anchor
    const norm = normalizePath(href);
    inbound.set(norm, (inbound.get(norm) || 0) + 1);
    if (!isValidInternalTarget(href)) rec.brokenLinks.push(href);
  }
  if (rec.emptyAnchors) rec.issues.push({ sev: 'MED', msg: `${rec.emptyAnchors} empty anchor(s) (no text/alt/aria-label)` });
  for (const bl of rec.brokenLinks) rec.issues.push({ sev: 'HIGH', msg: `broken internal link → ${bl}` });

  // images: alt + intrinsic dimensions
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
  rec.imgTotal = imgs.length;
  rec.imgNoAlt = 0; rec.imgNoDim = 0;
  for (const img of imgs) {
    const alt = attr(img, 'alt');
    if (alt === null || alt.trim() === '') rec.imgNoAlt++;
    const w = attr(img, 'width'), h = attr(img, 'height');
    const style = attr(img, 'style') || '';
    if (!(w && h) && !/aspect-ratio/i.test(style)) rec.imgNoDim++;
  }
  if (rec.imgNoAlt) rec.issues.push({ sev: 'MED', msg: `${rec.imgNoAlt}/${rec.imgTotal} <img> missing alt` });
  if (rec.imgNoDim) rec.issues.push({ sev: 'MED', msg: `${rec.imgNoDim}/${rec.imgTotal} <img> missing width/height (CLS risk)` });

  pages.push(rec);
}

// ── cross-page checks ─────────────────────────────────────────────────────────
function dupCheck(field, label) {
  const seen = new Map();
  for (const p of pages) {
    const v = (p[field] || '').trim().toLowerCase();
    if (!v) continue;
    if (!seen.has(v)) seen.set(v, []);
    seen.get(v).push(p.path);
  }
  const dups = [...seen.entries()].filter(([, ps]) => ps.length > 1);
  return dups.map(([v, ps]) => ({ value: v, paths: ps, label }));
}
const dupTitles = dupCheck('title', 'title');
const dupDescs = dupCheck('desc', 'description');
const dupH1 = (() => {
  const seen = new Map();
  for (const p of pages) {
    const v = (p.h1s && p.h1s[0] || '').trim().toLowerCase();
    if (!v) continue;
    if (!seen.has(v)) seen.set(v, []);
    seen.get(v).push(p.path);
  }
  return [...seen.entries()].filter(([, ps]) => ps.length > 1).map(([v, ps]) => ({ value: v, paths: ps }));
})();

// orphans: routes with 0 inbound internal links (exclude home)
const orphans = ROUTES.map(r => normalizePath(r.path))
  .filter(p => p !== '/' && !(inbound.get(p) > 0));

// ── image payload audit (public/images) ─────────────────────────────────────
const IMG_DIR = join(ROOT, 'public', 'images');
const heavyRasters = [];
if (existsSync(IMG_DIR)) {
  for (const f of readdirSync(IMG_DIR)) {
    if (!/\.(jpe?g|png)$/i.test(f)) continue;
    const sz = statSync(join(IMG_DIR, f)).size;
    const base = f.replace(/\.(jpe?g|png)$/i, '');
    const hasWebp = existsSync(join(IMG_DIR, base + '.webp'));
    const hasAvif = existsSync(join(IMG_DIR, base + '.avif'));
    if (sz > 250 * 1024 && !(hasWebp || hasAvif))
      heavyRasters.push({ file: f, kb: Math.round(sz / 1024), webp: hasWebp, avif: hasAvif });
  }
}

// ── report ───────────────────────────────────────────────────────────────────
let HARD = 0, SOFT = 0;
const sevCount = (p, s) => p.issues.filter(i => i.sev === s).length;
console.log('═══════════════════════════════════════════════════════════════');
console.log(' Phase 5 — Full-Site Verification  (' + pages.length + ' prerendered routes)');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('PAGE                                       kind       title meta  words  ld  img  issues');
console.log('─'.repeat(95));
for (const p of pages) {
  const hi = sevCount(p, 'HIGH'), me = sevCount(p, 'MED');
  HARD += hi; SOFT += me + sevCount(p, 'LOW');
  const flag = hi ? '✖' : (me ? '!' : '✓');
  console.log(
    `${flag} ${p.path.padEnd(40).slice(0, 40)} ${(p.kind || '').padEnd(10)} ` +
    `${String(p.titleLen).padStart(3)}  ${String(p.descLen).padStart(3)} ` +
    `${String(p.words).padStart(6)} ${String(p.ldCount).padStart(2)} ${String(p.imgTotal).padStart(3)}  ` +
    `${hi ? hi + ' HIGH ' : ''}${me ? me + ' MED' : ''}`
  );
}

function section(title, fn) { console.log('\n── ' + title + ' ' + '─'.repeat(Math.max(0, 60 - title.length))); fn(); }

section('Uniqueness', () => {
  console.log(`Titles:       ${pages.length} total, ${pages.length - dupTitles.reduce((n, d) => n + d.paths.length - 1, 0)} unique`);
  dupTitles.forEach(d => { console.log(`  ✖ DUP TITLE on ${d.paths.join(', ')} → "${d.value}"`); HARD++; });
  console.log(`Descriptions: ${pages.length - dupDescs.reduce((n, d) => n + d.paths.length - 1, 0)} unique`);
  dupDescs.forEach(d => { console.log(`  ✖ DUP DESC on ${d.paths.join(', ')}`); HARD++; });
  console.log(`H1s:          ${pages.length - dupH1.reduce((n, d) => n + d.paths.length - 1, 0)} unique`);
  dupH1.forEach(d => { console.log(`  ✖ DUP H1 on ${d.paths.join(', ')} → "${d.value}"`); HARD++; });
});

section('Orphan pages (0 inbound internal links)', () => {
  if (!orphans.length) console.log('  ✓ none');
  else orphans.forEach(o => { console.log(`  ! orphan: ${o}`); SOFT++; });
});

section('Image payload (public/images raster >250KB w/o webp/avif sibling)', () => {
  if (!heavyRasters.length) console.log('  ✓ none');
  else heavyRasters.forEach(h => { console.log(`  ✖ ${h.file} ${h.kb}KB (webp:${h.webp} avif:${h.avif})`); HARD++; });
});

section('Per-page issues', () => {
  const withIssues = pages.filter(p => p.issues.length);
  if (!withIssues.length) console.log('  ✓ no per-page issues');
  for (const p of withIssues) {
    console.log(`  ${p.path}`);
    p.issues.forEach(i => console.log(`      [${i.sev}] ${i.msg}`));
  }
});

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(` HARD failures: ${HARD}    Soft warnings: ${SOFT}`);
console.log('═══════════════════════════════════════════════════════════════');

// machine-readable report
const report = {
  generatedFrom: 'dist/', domain: DOMAIN, routeCount: pages.length,
  hard: HARD, soft: SOFT,
  pages: pages.map(p => ({
    path: p.path, kind: p.kind, titleLen: p.titleLen, descLen: p.descLen,
    words: p.words, ldCount: p.ldCount, ldTypes: [...new Set(p.ldTypes)],
    imgTotal: p.imgTotal, imgNoAlt: p.imgNoAlt, imgNoDim: p.imgNoDim,
    h1: p.h1s, canonical: p.canonical, title: p.title, descLength: p.descLen,
    issues: p.issues,
  })),
  dupTitles, dupDescs, dupH1, orphans, heavyRasters,
};
import('node:fs').then(fs => fs.writeFileSync(join(DIST, 'phase-05-report.json'), JSON.stringify(report, null, 2)));

process.exit(HARD > 0 ? 1 : 0);
