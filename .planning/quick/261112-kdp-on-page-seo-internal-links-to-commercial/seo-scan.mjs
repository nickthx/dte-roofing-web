// Quick-task 261112-kdp verification helper (planning artifact, not shipped).
// Usage:
//   node seo-scan.mjs dist                      -> in-link counts + heading-skip scan
//   node seo-scan.mjs dist --snapshot out.json  -> also write visible <main> text per route
//   node seo-scan.mjs dist --compare out.json   -> also diff visible <main> text vs snapshot
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const root = args[0] || 'dist';
const snapIdx = args.indexOf('--snapshot');
const cmpIdx = args.indexOf('--compare');
const targets = ['/services/commercial-roofing', '/services/roof-installation'];

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== 'assets' && e.name !== 'server') walk(p); }
    else if (e.name === 'index.html') files.push(p);
  }
})(root);

const counts = Object.fromEntries(targets.map((t) => [t, []]));
const skips = [];
const texts = {};
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  const m = html.match(/<main[\s\S]*?<\/main>/);
  if (!m) continue;
  const main = m[0];
  const route = '/' + path.relative(root, path.dirname(f)).split(path.sep).join('/');
  for (const t of targets) {
    const re = new RegExp(`<a[^>]*href="${t.replace(/\//g, '\\/')}/?"`, 'g');
    const n = (main.match(re) || []).length;
    if (n && route.replace(/\/$/, '') !== t) counts[t].push(`${route} x${n}`);
  }
  const levels = [...main.matchAll(/<h([1-6])[\s>]/g)].map((x) => +x[1]);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) { skips.push(`${route}: h${levels[i - 1]} -> h${levels[i]} (index ${i})`); break; }
  }
  texts[route] = main
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

for (const t of targets) console.log(`${t}: ${counts[t].length} pages\n  ${counts[t].join('\n  ')}`);
console.log(`\nHeading skips (${skips.length}):\n  ${skips.join('\n  ')}`);

if (snapIdx > -1) {
  fs.writeFileSync(args[snapIdx + 1], JSON.stringify(texts));
  console.log(`\nSnapshot of ${Object.keys(texts).length} routes written to ${args[snapIdx + 1]}`);
}
if (cmpIdx > -1) {
  const before = JSON.parse(fs.readFileSync(args[cmpIdx + 1], 'utf8'));
  const changed = [];
  for (const r of new Set([...Object.keys(before), ...Object.keys(texts)])) {
    if (before[r] !== texts[r]) {
      const a = before[r] || '';
      const b = texts[r] || '';
      let i = 0;
      while (i < a.length && a[i] === b[i]) i++;
      changed.push(`${r}\n    before: ...${a.slice(Math.max(0, i - 60), i + 60)}...\n    after:  ...${b.slice(Math.max(0, i - 60), i + 60)}...`);
    }
  }
  console.log(`\nVisible <main> text changes (${changed.length}):\n  ${changed.join('\n  ')}`);
}
