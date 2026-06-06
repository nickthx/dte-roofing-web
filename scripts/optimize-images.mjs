#!/usr/bin/env node
// One-time / repeatable image optimizer for public/images.
//
// What it does:
//   - Re-pulls the gallery's Google Business Profile photos at 1600px (their
//     Google photo IDs are embedded in the current filenames) and self-hosts them.
//   - Compresses the oversized phone photos + PNG screenshots.
//   - Emits modern formats (AVIF/WebP) + an optimized raster fallback for each,
//     named with descriptive SEO slugs.
//   - Hero & logo keep their filenames (so OG/schema refs stay valid); everything
//     else is renamed to slugs (update references in src to match the printed map).
//
// Run: node scripts/optimize-images.mjs
// Requires: sharp (devDependency). Outputs into public/images/.

import sharp from 'sharp';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMG = resolve(ROOT, 'public/images');

const PHOTO_Q = { avif: 50, webp: 74, jpg: 78 };

function slugify(location, title) {
  const loc = location.replace(/,?\s*OH$/i, '').trim();
  return (loc + ' ' + title)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchGbp(id) {
  const url = `https://lh3.googleusercontent.com/p/${id}=s1600`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`GBP fetch ${id}: HTTP ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

// imgi_<n>_<GooglePhotoId>=s<NNN>-k-no.jpg  ->  re-fetch by id; otherwise local file
async function resolveInput(file) {
  const m = file.match(/^imgi_\d+_(.+?)=s\d+/);
  if (m) return { buf: await fetchGbp(m[1]), origin: 'GBP@1600' };
  const p = resolve(IMG, file);
  if (!existsSync(p)) return null; // one-time local source already cleaned up — skip on re-run
  return { buf: readFileSync(p), origin: 'local' };
}

async function emit(buf, slug, fmt, maxWidth, q) {
  const out = resolve(IMG, `${slug}.${fmt}`);
  // Cap the LONGEST side at maxWidth (portrait phone photos must not stay tall).
  let s = sharp(buf, { failOn: 'none' }).rotate().resize({ width: maxWidth, height: maxWidth, fit: 'inside', withoutEnlargement: true });
  if (fmt === 'avif') s = s.avif({ quality: q.avif ?? 50 });
  else if (fmt === 'webp') s = s.webp(q.lossless ? { lossless: true, effort: 6 } : { quality: q.webp ?? 74 });
  else if (fmt === 'jpg') s = s.jpeg({ quality: q.jpg ?? 80, mozjpeg: true });
  else if (fmt === 'png') s = s.png({ compressionLevel: 9, palette: true });
  const info = await s.toFile(out);
  return { size: info.size, width: info.width, height: info.height };
}

// --- Build the job list -----------------------------------------------------

const jobs = [];

// Gallery projects: parsed from src/data/projects.ts (single source of truth for
// title/location -> slug). GBP entries (imgi_*) get re-pulled at 1600px.
const projSrc = readFileSync(resolve(ROOT, 'src/data/projects.ts'), 'utf8');
const projRe = /title:\s*'([^']*)',\s*category:\s*'[^']*',\s*location:\s*'([^']*)',\s*image:\s*'\/images\/([^']*)'/g;
let mm;
while ((mm = projRe.exec(projSrc))) {
  const [, title, location, file] = mm;
  jobs.push({ file, slug: slugify(location, title), formats: ['avif', 'webp', 'jpg'], maxWidth: 1600, q: PHOTO_Q });
}

// Hero & logo keep their base filenames (OG/schema references stay valid).
jobs.push({ file: 'hero-roofing-professional.jpg', slug: 'hero-roofing-professional', formats: ['webp', 'jpg'], maxWidth: 1920, q: { webp: 60, jpg: 72 } });
jobs.push({ file: 'DTE-Roofing-Logo-two-Men.png', slug: 'DTE-Roofing-Logo-two-Men', formats: ['webp', 'png'], maxWidth: 800, q: { lossless: true } });

// About: team headshots (renamed), one extra job-site webp, two GBP-only photos.
jobs.push({ file: 'Screenshot 2025-11-17 204715.png', slug: 'donovan-davis-dte-roofing', formats: ['webp', 'jpg'], maxWidth: 480, q: { webp: 82, jpg: 84 } });
jobs.push({ file: 'Screenshot 2025-11-17 204702.png', slug: 'mitchell-davis-dte-roofing', formats: ['webp', 'jpg'], maxWidth: 480, q: { webp: 82, jpg: 84 } });
jobs.push({ file: 'Screenshot 2025-11-17 204544.png', slug: 'andrew-watts-dte-roofing', formats: ['webp', 'jpg'], maxWidth: 480, q: { webp: 82, jpg: 84 } });
jobs.push({ file: 'DTE IMAGE 1.webp', slug: 'dte-roofing-job-site-columbus', formats: ['avif', 'webp', 'jpg'], maxWidth: 1600, q: PHOTO_Q });
jobs.push({ file: 'imgi_81_AF1QipMuTYobensZy6QrqXX1V5y281GMsqqLepuVrZWs=s762-k-no.jpg', slug: 'dte-roofing-shingle-installation-columbus', formats: ['avif', 'webp', 'jpg'], maxWidth: 1600, q: PHOTO_Q });
jobs.push({ file: 'imgi_93_AF1QipOu4xiP-Z7D2Q4LZIE0tOw4saa3L3J_vdZehUpC=s762-k-no.jpg', slug: 'dte-roofing-completed-project-central-ohio', formats: ['avif', 'webp', 'jpg'], maxWidth: 1600, q: PHOTO_Q });

// --- Run --------------------------------------------------------------------

console.log(`Optimizing ${jobs.length} images -> public/images/\n`);
let totalNew = 0;
const map = [];

for (const job of jobs) {
  const input = await resolveInput(job.file);
  if (!input) { console.log(`– skip ${job.slug} (local source ${job.file} not present)`); continue; }
  const { buf, origin } = input;
  const parts = [];
  let dims = null;
  for (const fmt of job.formats) {
    const r = await emit(buf, job.slug, fmt, job.maxWidth, job.q);
    totalNew += r.size;
    if (!dims) dims = { w: r.width, h: r.height };
    parts.push(`${fmt}:${(r.size / 1024).toFixed(0)}KB`);
  }
  map.push({ from: job.file, slug: job.slug, w: dims.w, h: dims.h });
  console.log(`✓ ${job.slug}.{${job.formats.join(',')}}  [${dims.w}x${dims.h}] (${origin})  ${parts.join('  ')}`);
}

console.log(`\nTotal optimized output: ${(totalNew / 1024 / 1024).toFixed(2)} MB across ${map.length} images`);
console.log('\nReference map (old file -> new slug [intrinsic w x h]):');
for (const m of map) console.log(`  ${m.from}  ->  ${m.slug}  [${m.w}x${m.h}]`);
