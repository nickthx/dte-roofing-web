#!/usr/bin/env node
// Sitemap generator for dteroofingllc.com
// Mirrors routes from src/App.tsx. Run via `npm run generate-sitemap`.

import { execSync } from 'node:child_process';
import { writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from '../src/routes.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BASE = 'https://www.dteroofingllc.com';
const TODAY = new Date().toISOString().slice(0, 10);

// Routes sourced from src/routes.config.mjs (SSOT shared with prerender script).
// lastmod is per-route only — no global-dep merge. Sitemap lastmod is a hint
// about a specific page's content change; SEO/schema template edits are
// surfaced to Google by its own recrawl heuristics, not by bumping every URL.

let gitAvailable = false;

function probeGit() {
  try {
    execSync('git rev-parse --git-dir', { cwd: ROOT, stdio: 'ignore' });
    gitAvailable = true;
  } catch {
    gitAvailable = false;
    return;
  }
  try {
    const shallow = execSync('git rev-parse --is-shallow-repository', {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
    if (shallow === 'true') {
      console.warn(
        'WARNING: Running in a shallow git clone. Some files may fall back to ' +
          'filesystem mtime, which will produce inaccurate lastmod values. ' +
          'Set VERCEL_DEEP_CLONE=1 or prepend `git fetch --unshallow` to the build command.'
      );
    }
  } catch {
    // non-fatal — we already have git availability confirmed
  }
}

/**
 * @param {string} relPath
 * @returns {string|null}
 */
function gitLastCommitDate(relPath) {
  if (!gitAvailable) return null;
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
    return out ? out.slice(0, 10) : null;
  } catch {
    return null;
  }
}

/**
 * @param {string} relPath
 * @returns {string|null}
 */
function fsMtimeDate(relPath) {
  try {
    const full = resolve(ROOT, relPath);
    if (!existsSync(full)) return null;
    return statSync(full).mtime.toISOString().slice(0, 10);
  } catch {
    return null;
  }
}

// Fallback chain: git log -1 -> fs mtime -> build time.
/**
 * @param {string} relPath
 * @returns {string}
 */
function lastmodFor(relPath) {
  return gitLastCommitDate(relPath) ?? fsMtimeDate(relPath) ?? TODAY;
}

function buildXml() {
  probeGit();

  const urls = ROUTES.map((r) => {
    const lastmod = lastmodFor(r.source);
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
