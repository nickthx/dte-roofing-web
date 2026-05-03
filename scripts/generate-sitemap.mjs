#!/usr/bin/env node
// Sitemap generator for dteroofingllc.com
// Mirrors routes from src/App.tsx. Run via `npm run generate-sitemap`.

import { execSync } from 'node:child_process';
import { writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from '../src/routes.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BASE = 'https://www.dteroofingllc.com';
const TODAY = new Date().toISOString().slice(0, 10);

// Routes sourced from src/routes.config.mjs (SSOT shared with prerender script).

const GLOBAL_TOUCH_FILES = [
  'index.html',
  'src/main.tsx',
  'src/App.tsx',
  'src/entry-server.tsx',
  'src/index.css',
  'src/components/SEO.tsx',
  'src/components/SchemaMarkup.tsx',
  'src/components/Footer.tsx',
  'src/components/Navigation.tsx',
];

/**
 * Returns the last-commit date (YYYY-MM-DD) for a tracked file, or null if
 * the file doesn't exist or has no git history.
 * @param {string} relPath
 * @returns {string|null}
 */
function fileLastCommitDate(relPath) {
  const full = resolve(ROOT, relPath);
  if (!existsSync(full)) return null;
  const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
    cwd: ROOT,
    encoding: 'utf8',
  }).trim();
  if (!out) return null;
  return out.slice(0, 10);
}

// lastmod = max(routeFile, ...GLOBAL_TOUCH_FILES) so changes to shared
// components (SEO, Schema, Footer, Nav, layout shell, root stylesheet)
// bump every page's lastmod, not just edits to the route's own .tsx file.
// Excludes build config (tailwind/postcss/vite) and platform config
// (vercel.json) — those don't change rendered content. See 2026-05-03
// SEO audit, item S1.
/**
 * @param {string} source
 * @returns {string}
 */
function gitLastmod(source) {
  try {
    const sourceDate = fileLastCommitDate(source) ?? TODAY;
    const globalDates = GLOBAL_TOUCH_FILES
      .map(fileLastCommitDate)
      .filter((d) => d !== null);
    return [sourceDate, ...globalDates].reduce((a, b) => (a > b ? a : b));
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
