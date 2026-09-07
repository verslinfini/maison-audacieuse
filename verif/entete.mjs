// La barre de navigation tient-elle sur une ligne, a toutes les largeurs ?
//
//   node verif/entete.mjs
//
// Pourquoi ce controle existe. La nav de bureau demande 880 px pour tenir :
// six liens, le logo et le bouton d'appel. Le basculement en menu depliant
// etait regle a 767 px. Entre les deux, sur une bande de 112 px qui couvre
// l'iPad en portrait, trois liens sur six passaient a la ligne : la barre
// etait cassee sur les onze pages, et aucun des autres controles ne le
// voyait. Un audit tiers l'a trouve en balayant par pas de 8 px.
//
// Le balayage verifie trois choses a chaque largeur : que les liens de la
// nav tiennent sur une seule ligne, qu'un appel reste atteignable (bouton
// d'entete ou barre du bas, jamais aucun des deux), et que la page ne
// deborde pas horizontalement.

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));

import { createRequire } from 'node:module';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');
const R = join(RACINE, 'dist');
const T = { '.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.ttf':'font/ttf','.ico':'image/x-icon','.txt':'text/plain','.xml':'application/xml' };
const s = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(R, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
await new Promise((ok) => s.listen(0, ok));
const port = s.address().port;
const nav = await chromium.launch();
let casse = 0;
for (let w = 320; w <= 1600; w += 8) {
  const c = await nav.newContext({ viewport: { width: w, height: 800 } });
  const pg = await c.newPage();
  await pg.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
  const r = await pg.evaluate(() => {
    const items = [...document.querySelectorAll('.nav a')].filter((a) => a.offsetHeight > 0);
    const lignes = new Set(items.map((a) => Math.round(a.getBoundingClientRect().top)));
    const cta = document.querySelector('.entete__cta');
    const barre = document.querySelector('.barre-mobile');
    return { liens: items.length, lignes: lignes.size,
      cta: cta && cta.offsetHeight > 0, barre: barre && barre.offsetHeight > 0,
      deborde: document.documentElement.scrollWidth > window.innerWidth + 1 };
  });
  const mauvais = r.lignes > 1 || (!r.cta && !r.barre) || r.deborde;
  if (mauvais) { casse++; if (casse < 6) console.log(`${w}px  liens:${r.liens} lignes:${r.lignes} cta:${r.cta} barre:${r.barre} deborde:${r.deborde}`); }
  await c.close();
}
console.log(casse === 0
  ? 'entete : aucune largeur cassee de 320 a 1600'
  : `entete : ${casse} largeur(s) cassee(s)`);
if (casse > 0) process.exitCode = 1;
await nav.close(); s.close();
