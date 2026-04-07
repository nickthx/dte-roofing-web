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
