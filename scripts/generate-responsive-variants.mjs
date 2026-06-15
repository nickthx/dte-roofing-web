#!/usr/bin/env node
// Responsive variant generator for public/images.
//
// What it does:
//   - For the in-scope LCP hero + large on-page photos (homepage WorkCarousel,
//     Gallery grid, Home/About project grids), emits width-stepped variants
//     `slug-<w>.<fmt>` (e.g. columbus-...-800.webp) from the existing local base
//     files — network-free, no re-fetch, no upscaling.
//   - Writes src/data/imageVariants.ts: a typed manifest of each base image's
//     REAL emitted widths per present format, so Picture/SEO build srcSet only
//     from widths that physically exist (no srcSet lies, no double-download).
//
// Width descriptors are read back from sharp's toFile() info.width — the RENDERED
// width — never the requested ladder rung. Resize constrains the WIDTH only (with
// withoutEnlargement), so a portrait asked for 400 yields a 400-WIDE file (not a
// 400-tall one). A 900px-wide image asked for 1200 clamps to 900 and is dropped as
// a duplicate of the base, so the manifest and on-disk files always agree exactly.
//
// Idempotent: a second run overwrites the variants + rewrites the .ts byte-for-byte.
//
// Run: node scripts/generate-responsive-variants.mjs
// Requires: sharp (devDependency). Outputs into public/images/ and src/data/.

import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMG = resolve(ROOT, 'public/images');
const MANIFEST_OUT = resolve(ROOT, 'src/data/imageVariants.ts');

// New-variant quality (design spec): a touch tighter than the base files since
// these only ever serve smaller renders where artifacts are less visible.
const VARIANT_Q = { avif: 48, webp: 62, jpg: 78 };

// Width ladder. A rung is only emitted when it is strictly less than the base's
// intrinsic width AND the resized file's real width equals the rung (no clamp).
const LADDER = [400, 800, 1200, 1600];

// Never generate variants for these (headshots + logos are out of scope).
const SKIP_SLUGS = new Set([
  'donovan-davis-dte-roofing',
  'mitchell-davis-dte-roofing',
  'andrew-watts-dte-roofing',
]);
const isSkipped = (slug) => SKIP_SLUGS.has(slug) || /^DTE-Roofing-Logo/.test(slug);

// --- Build the in-scope base list -------------------------------------------

// Project slugs (carousel + gallery + the project photos About reuses) come from
// projects.ts — the single source of truth. Reuse optimize-images.mjs's path shape.
const projSrc = readFileSync(resolve(ROOT, 'src/data/projects.ts'), 'utf8');
const imgRe = /image:\s*'\/images\/([^']+)'/g;
const slugs = new Set();
let mm;
while ((mm = imgRe.exec(projSrc))) {
  slugs.add(mm[1].replace(/\.jpg$/i, ''));
}

// Hero (webp + jpg only) + the three About-only photos not in projects.ts.
slugs.add('hero-roofing-professional');
slugs.add('dte-roofing-job-site-columbus');
slugs.add('dte-roofing-completed-project-central-ohio');
slugs.add('dte-roofing-shingle-installation-columbus');

// Defensive: drop anything on the skip-list (none should be present, but guard).
const bases = [...slugs].filter((slug) => !isSkipped(slug)).sort();

// --- Generate ----------------------------------------------------------------

// Detect which modern siblings exist on disk; jpg is always the base/fallback.
function presentFormats(slug) {
  const formats = [];
  if (existsSync(resolve(IMG, `${slug}.avif`))) formats.push('avif');
  if (existsSync(resolve(IMG, `${slug}.webp`))) formats.push('webp');
  formats.push('jpg');
  return formats;
}

function variantOut(slug, w, fmt) {
  return resolve(IMG, `${slug}-${w}.${fmt}`);
}

async function encode(s, fmt) {
  if (fmt === 'avif') return s.avif({ quality: VARIANT_Q.avif });
  if (fmt === 'webp') return s.webp({ quality: VARIANT_Q.webp });
  return s.jpeg({ quality: VARIANT_Q.jpg, mozjpeg: true });
}

console.log(`Generating responsive variants for ${bases.length} base images -> public/images/\n`);

const manifest = {};

for (const slug of bases) {
  const jpgBase = resolve(IMG, `${slug}.jpg`);
  if (!existsSync(jpgBase)) {
    console.log(`– skip ${slug} (no .jpg base on disk)`);
    continue;
  }
  const formats = presentFormats(slug);
  const intrinsicWidth = (await sharp(jpgBase).metadata()).width;

  // Constrain the WIDTH only (so a portrait asked for 400 yields a 400-WIDE file),
  // read back the real width from the jpg encode, de-dup by the actual emitted
  // width, then emit the SAME width in every present format.
  const widths = [];
  for (const w of LADDER) {
    if (w >= intrinsicWidth) continue; // base is the full-size top of the set
    const probeOut = variantOut(slug, w, 'jpg');
    const info = await (await encode(
      sharp(jpgBase, { failOn: 'none' })
        .rotate()
        .resize({ width: w, withoutEnlargement: true }),
      'jpg'
    )).toFile(probeOut);

    // Only keep the rung when its real width == the requested rung (no clamp) and
    // it isn't a duplicate of an already-recorded width.
    if (info.width !== w || widths.includes(info.width)) {
      unlinkSync(probeOut); // duplicate / clamped — don't keep a width-lie file
      continue;
    }
    widths.push(w);

    // jpg already written above; emit the remaining present formats at this width.
    for (const fmt of formats) {
      if (fmt === 'jpg') continue;
      await (await encode(
        sharp(jpgBase, { failOn: 'none' })
          .rotate()
          .resize({ width: w, withoutEnlargement: true }),
        fmt
      )).toFile(variantOut(slug, w, fmt));
    }
  }

  widths.sort((a, b) => a - b);
  manifest[`/images/${slug}.jpg`] = { intrinsicWidth, widths, formats };
  console.log(
    `✓ ${slug}.jpg  [intrinsic ${intrinsicWidth}]  variants: ${widths.length ? widths.join(', ') : '(none)'}  formats: ${formats.join(',')}`
  );
}

// --- Write the typed manifest (stable key order for byte-identical re-runs) ---

const header =
  '// GENERATED by scripts/generate-responsive-variants.mjs — do not edit by hand.\n';
const lines = Object.keys(manifest)
  .sort()
  .map((key) => {
    const { intrinsicWidth, widths, formats } = manifest[key];
    const w = `[${widths.join(', ')}]`;
    const f = `[${formats.map((x) => `'${x}'`).join(', ')}]`;
    return `  '${key}': { intrinsicWidth: ${intrinsicWidth}, widths: ${w}, formats: ${f} },`;
  });

const body =
  header +
  '\n' +
  'export const imageVariants: Record<string, { intrinsicWidth: number; widths: number[]; formats: string[] }> = {\n' +
  lines.join('\n') +
  '\n};\n';

writeFileSync(MANIFEST_OUT, body, 'utf8');

const variantCount = Object.values(manifest).reduce(
  (n, e) => n + e.widths.length * e.formats.length,
  0
);
console.log(
  `\nWrote ${MANIFEST_OUT.replace(ROOT + '\\', '').replace(ROOT + '/', '')} — ` +
    `${Object.keys(manifest).length} base entries, ${variantCount} variant files.`
);
