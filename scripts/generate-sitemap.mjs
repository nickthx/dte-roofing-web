#!/usr/bin/env node
// Sitemap generator for dteroofingllc.com
// Mirrors routes from src/App.tsx.
//
// Runs on every build (local and Vercel). lastmod for each URL comes from the
// last git commit that touched the route's page source.
//
// On Vercel the clone is usually shallow, and shallow history gives uniform or
// wrong lastmod values. So on Vercel this script:
//   1. Detects a shallow clone (`git rev-parse --is-shallow-repository`).
//   2. Tries `git fetch --unshallow` against origin, then against the public
//      GitHub URL (45s timeout each, no credential prompts).
//   3. Regenerates only if full history is confirmed afterwards.
//   4. Otherwise keeps the committed public/sitemap.xml as the fallback and
//      logs why. It never fails the build.
//
// Keep committing a locally regenerated public/sitemap.xml as a safety net,
// since that file is what ships whenever the Vercel fallback kicks in.

import { execSync } from 'node:child_process';
import { writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from '../src/routes.config.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BASE = 'https://www.dteroofingllc.com';
const TODAY = new Date().toISOString().slice(0, 10);
const IS_VERCEL = process.env.VERCEL === '1';
const LOG = '[generate-sitemap]';

/**
 * @param {unknown} err
 * @returns {string}
 */
function errText(err) {
  const e = /** @type {{ stderr?: Buffer | string, message?: string }} */ (err);
  const stderr = e?.stderr ? e.stderr.toString().trim() : '';
  return stderr || e?.message || String(err);
}

/**
 * true = shallow, false = full history, null = cannot verify (no git).
 * @returns {boolean|null}
 */
function isShallow() {
  try {
    const out = execSync('git rev-parse --is-shallow-repository', {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim();
    return out === 'true';
  } catch {
    return null;
  }
}

function tryUnshallow() {
  const owner = process.env.VERCEL_GIT_REPO_OWNER || 'nickthx';
  const slug = process.env.VERCEL_GIT_REPO_SLUG || 'dte-roofing-web';
  const remotes = ['origin', `https://github.com/${owner}/${slug}.git`];
  for (const remote of remotes) {
    try {
      execSync(`git fetch --unshallow --quiet ${remote}`, {
        cwd: ROOT,
        timeout: 45000,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
      });
      console.log(`${LOG} Unshallowed clone via ${remote}`);
      return;
    } catch (err) {
      console.log(`${LOG} git fetch --unshallow ${remote} failed: ${errText(err)}`);
    }
  }
}

if (IS_VERCEL) {
  try {
    let shallow = isShallow();
    if (shallow === true) {
      tryUnshallow();
      shallow = isShallow();
    }
    if (shallow !== false) {
      const reason = shallow === null ? 'git is unavailable' : 'clone is still shallow';
      console.log(
        `${LOG} Keeping committed public/sitemap.xml unchanged on Vercel: ${reason} ` +
          '(shallow history breaks git-based lastmod).'
      );
      process.exit(0);
    }
    console.log(`${LOG} Full history available on Vercel, regenerating.`);
  } catch (err) {
    console.log(
      `${LOG} Unexpected error checking git history, keeping committed public/sitemap.xml: ${errText(err)}`
    );
    process.exit(0);
  }
}

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

const outPath = resolve(ROOT, 'public/sitemap.xml');
if (IS_VERCEL) {
  try {
    const xml = buildXml();
    writeFileSync(outPath, xml, 'utf8');
  } catch (err) {
    console.log(
      `${LOG} Generation failed on Vercel, keeping committed public/sitemap.xml: ${errText(err)}`
    );
    process.exit(0);
  }
} else {
  const xml = buildXml();
  writeFileSync(outPath, xml, 'utf8');
}
console.log(`Generated sitemap with ${ROUTES.length} urls -> ${outPath}`);
