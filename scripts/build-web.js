/* =====================================================================
   build-web.js — assemble the static web app into ./www for Capacitor.
   The web app lives at the repo root (so GitHub Pages can serve it). This
   copies only the files the app actually needs into a clean ./www folder,
   which capacitor.config.json points at (webDir). Run before `cap sync`.
     node scripts/build-web.js      (or: npm run build:web)
   ===================================================================== */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'www');
// everything the app loads (see index.html) — nothing else (no node_modules, ios, .git…)
const INCLUDE = ['index.html', 'styles', 'data', 'src', 'assets'];

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let copied = 0;
for (const item of INCLUDE) {
  const from = path.join(ROOT, item);
  const to = path.join(OUT, item);
  if (!fs.existsSync(from)) { console.warn('  skip (missing):', item); continue; }
  fs.cpSync(from, to, { recursive: true });
  copied++;
}
console.log(`Built www/ (${copied} items):`, INCLUDE.join(', '));
