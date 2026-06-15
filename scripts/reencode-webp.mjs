#!/usr/bin/env node
// Idempotent webp re-encoder for public/images.
//
// Why this exists:
//   optimize-images.mjs encoded the gallery/phone photos at webp quality 74,
//   which is too high for these particular sources — many .webp siblings ended
//   up >= their .jpg fallback. A WebP that is larger than its JPEG fallback is
//   strictly worse: the <picture> in src/components/Picture.tsx prefers the webp
//   <source>, so we ship more bytes than the jpg the browser would otherwise use.
//
//   This script re-encodes each bloated .webp FROM its .jpg sibling at a lower
//   webp quality, preserving the jpg's intrinsic dimensions, and only overwrites
//   when the result is actually smaller than the jpg.
//
// Behavior (per public/images/*.jpg):
//   1. No sibling .webp        -> skip (nothing to fix).
//   2. webp already < jpg      -> skip, untouched (idempotent on re-run).
//   3. webp >= jpg             -> re-encode from the jpg at webp q60/effort6,
//                                 same width/height (no resize/enlarge), and
//                                 overwrite ONLY if the new webp < jpg.
//   4. new encode still >= jpg -> leave existing file, log it so it's visible.
//
// Network-free: operates purely on local files. AVIF files are never touched
// (every flagged .avif is already smaller than its jpg).
//
// Run: node scripts/reencode-webp.mjs
// Requires: sharp (devDependency). Operates in place on public/images/.

import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const IMG = resolve(ROOT, 'public/images');

const WEBP_QUALITY = 60;
const WEBP_EFFORT = 6;

const kb = (bytes) => (bytes / 1024).toFixed(1);

// Re-encode a jpg buffer to webp at the jpg's intrinsic dimensions (no resize,
// no enlarge). `rotate()` bakes in EXIF orientation so the output matches what
// the browser would render for the jpg.
async function encodeWebp(jpgBuf) {
  return sharp(jpgBuf, { failOn: 'none' })
    .rotate()
    .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT })
    .toBuffer();
}

const jpgs = readdirSync(IMG)
  .filter((f) => f.toLowerCase().endsWith('.jpg'))
  .sort();

console.log(`Scanning ${jpgs.length} jpg sources in public/images/\n`);

let reencoded = 0;
let alreadySmaller = 0;
let noSibling = 0;
let stillLarger = 0;
let bytesBefore = 0;
let bytesAfter = 0;

for (const jpgName of jpgs) {
  const jpgPath = join(IMG, jpgName);
  const webpName = jpgName.replace(/\.jpg$/i, '.webp');
  const webpPath = join(IMG, webpName);

  if (!existsSync(webpPath)) {
    noSibling++;
    continue;
  }

  const jpgSize = statSync(jpgPath).size;
  const webpSize = statSync(webpPath).size;

  // Already smaller — leave it untouched. This is the idempotent re-run branch.
  if (webpSize < jpgSize) {
    alreadySmaller++;
    console.log(`– skip ${webpName}  (webp ${kb(webpSize)}KB < jpg ${kb(jpgSize)}KB)`);
    continue;
  }

  // Bloated: re-encode from the jpg, keep the jpg's dimensions.
  const jpgBuf = readFileSync(jpgPath);
  const newWebp = await encodeWebp(jpgBuf);

  if (newWebp.length < jpgSize) {
    writeFileSync(webpPath, newWebp);
    reencoded++;
    bytesBefore += webpSize;
    bytesAfter += newWebp.length;
    console.log(
      `✓ ${webpName}  ${kb(webpSize)}KB -> ${kb(newWebp.length)}KB  (jpg ${kb(jpgSize)}KB)`
    );
  } else {
    // Rare: even at q60 the webp can't beat the jpg. Leave the existing file.
    stillLarger++;
    console.log(
      `! keep ${webpName}  re-encode ${kb(newWebp.length)}KB still >= jpg ${kb(jpgSize)}KB — left untouched`
    );
  }
}

console.log(
  `\nDone. re-encoded: ${reencoded}, already-smaller: ${alreadySmaller}, ` +
    `no-webp-sibling: ${noSibling}, still-larger (left): ${stillLarger}`
);
if (reencoded > 0) {
  console.log(
    `Re-encoded webp total: ${kb(bytesBefore)}KB -> ${kb(bytesAfter)}KB ` +
      `(saved ${kb(bytesBefore - bytesAfter)}KB)`
  );
}
