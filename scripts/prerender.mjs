#!/usr/bin/env node
// Post-build prerender: walks PRERENDER_ROUTES and writes dist/<route>/index.html
// with SSR-rendered body + react-helmet-async head tags baked in.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PRERENDER_ROUTES } from '../src/routes.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const SSR_ENTRY = resolve(ROOT, 'dist/server/entry-server.js');
const TEMPLATE_PATH = resolve(DIST, 'index.html');

const { render } = await import(pathToFileURL(SSR_ENTRY).href);
const template = readFileSync(TEMPLATE_PATH, 'utf8');

const written = [];

for (const route of PRERENDER_ROUTES) {
  if (route.includes(':')) continue; // defensive skip of dynamic routes

  const { html, helmet } = render(route);

  const headTags = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ');

  // Strip the default <title> and <meta name="description"> from the template
  // so helmet's title/description tags are the only ones in the head.
  let page = template.replace(/<title>[^<]*<\/title>/i, '');
  page = page.replace(/<meta name="description"[^>]*>/i, '');
  page = page.replace('</head>', `    ${headTags}\n  </head>`);

  // Inject SSR body into the root container.
  page = page.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  );

  const outDir = route === '/' ? DIST : resolve(DIST, '.' + route);
  mkdirSync(outDir, { recursive: true });
  const outFile = resolve(outDir, 'index.html');
  writeFileSync(outFile, page, 'utf8');
  written.push(outFile.replace(ROOT + '\\', '').replace(ROOT + '/', ''));
}

console.log(`\nPrerendered ${written.length} routes:`);
for (const f of written) console.log('  ' + f);
