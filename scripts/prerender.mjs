#!/usr/bin/env node
// Post-build prerender: walks PRERENDER_ROUTES and writes dist/<route>/index.html
// with SSR-rendered body + react-helmet-async head tags baked in.
//
// Each route also gets <link rel="modulepreload"> hints for its own lazy chunk
// (plus that chunk's shared imports), read from the client build manifest. Route
// components are React.lazy (see src/App.tsx), so without these hints the browser
// would only discover the route chunk after the entry script ran — a hydration
// request waterfall. The hints let the chunk download in parallel with the entry.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ROUTES, PRERENDER_ROUTES, NOT_FOUND_ROUTE } from '../src/routes.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const SSR_ENTRY = resolve(ROOT, 'dist/server/entry-server.js');
const TEMPLATE_PATH = resolve(DIST, 'index.html');
const MANIFEST_PATH = resolve(DIST, '.vite/manifest.json');

const { render } = await import(pathToFileURL(SSR_ENTRY).href);
const template = readFileSync(TEMPLATE_PATH, 'utf8');

// route path -> source module (the SSOT already used by the sitemap generator),
// so we can find each route's chunk in the client manifest.
const sourceByPath = new Map(ROUTES.map((r) => [r.path, r.source]));
sourceByPath.set(NOT_FOUND_ROUTE.path, NOT_FOUND_ROUTE.source);

// Load the client manifest. Preload hints are an optimization, so a missing
// manifest degrades gracefully (routes still work, just with the small waterfall).
let manifest = {};
try {
  manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
} catch {
  console.warn('[prerender] No client manifest found — skipping modulepreload hints.');
}

// Walk a manifest entry's import graph and collect every JS chunk it needs.
function collectChunks(key) {
  const js = new Set();
  const seen = new Set();
  const visit = (k) => {
    if (!k || seen.has(k)) return;
    seen.add(k);
    const entry = manifest[k];
    if (!entry) return;
    if (entry.file && entry.file.endsWith('.js')) js.add(entry.file);
    for (const imp of entry.imports ?? []) visit(imp);
  };
  visit(key);
  return [...js];
}

function preloadLinksFor(routePath) {
  const source = sourceByPath.get(routePath);
  if (!source || !manifest[source]) return '';
  return collectChunks(source)
    .map((f) => `<link rel="modulepreload" href="/${f}">`)
    .join('\n    ');
}

async function buildPage(route, { stripRobots = false } = {}) {
  const { html, helmet } = await render(route);

  const headTags = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
    preloadLinksFor(route),
  ]
    .filter(Boolean)
    .join('\n    ');

  // Strip the default <title> and <meta name="description"> from the template
  // so helmet's title/description tags are the only ones in the head.
  let page = template.replace(/<title>[^<]*<\/title>/i, '');
  page = page.replace(/<meta name="description"[^>]*>/i, '');
  // The 404 page emits its own noindex robots meta — drop the template's
  // static index,follow so the signals don't conflict.
  if (stripRobots) page = page.replace(/<meta name="robots"[^>]*>/i, '');
  page = page.replace('</head>', `    ${headTags}\n  </head>`);

  // Inject SSR body into the root container.
  page = page.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  return page;
}

const written = [];

function writePage(outFile, page) {
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, page, 'utf8');
  written.push(outFile.replace(ROOT + '\\', '').replace(ROOT + '/', ''));
}

for (const route of PRERENDER_ROUTES) {
  if (route.includes(':')) continue; // defensive skip of dynamic routes
  const outDir = route === '/' ? DIST : resolve(DIST, '.' + route);
  writePage(resolve(outDir, 'index.html'), await buildPage(route));
}

// Branded 404: rendered through the App's catch-all route, written to the
// root-level dist/404.html that Vercel serves (with a 404 status) for any
// unmatched path. Not in ROUTES, so it never enters the sitemap.
writePage(resolve(DIST, '404.html'), await buildPage(NOT_FOUND_ROUTE.path, { stripRobots: true }));

console.log(`\nPrerendered ${written.length} routes:`);
for (const f of written) console.log('  ' + f);
