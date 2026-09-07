// Compare la page produite par build.mjs a la maquette validee.
// Controle de fin du module M2 : le decoupage en gabarit, partials et
// feuilles de style ne doit rien avoir change au rendu.
//
//   node verif/identique.mjs
//
// Deux mesures, la seconde etant la plus severe :
//   1. les pixels, avec une tolerance d'un cran sur 255. Comparer au pixel
//      strict signale des ecarts d'arrondi de composition, invisibles, qui
//      feraient echouer le test sans rien vouloir dire.
//   2. les styles calcules de chaque element, ou aucun ecart n'est tolere.

import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(RACINE, 'dist');
const REFERENCE = pathToFileURL(join(RACINE, 'maquettes/home/v2.html')).href;
const SORTIE = join(RACINE, '.verif-sorties');
const LARGEURS = [1600, 1440, 1280, 1024, 900, 768, 430, 375, 320];
const CRAN = 2; // en deca, c'est de l'arrondi de composition, pas un ecart de rendu

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.ttf': 'font/ttf',
};

/** Sert dist/ en local : les chemins du site sont absolus, file:// ne suffit pas. */
const serveur = createServer((req, res) => {
  let chemin = join(DIST, decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(chemin) && statSync(chemin).isDirectory()) chemin = join(chemin, 'index.html');
  if (!existsSync(chemin)) { res.writeHead(404).end('introuvable'); return; }
  res.writeHead(200, { 'content-type': TYPES[extname(chemin)] || 'application/octet-stream' });
  res.end(readFileSync(chemin));
});
await new Promise((ok) => serveur.listen(0, '127.0.0.1', ok));
const base = `http://127.0.0.1:${serveur.address().port}`;

const navigateur = await chromium.launch();
const contexte = await navigateur.newContext({ deviceScaleFactor: 1 });
mkdirSync(SORTIE, { recursive: true });

async function ouvrir(url, largeur) {
  const page = await contexte.newPage();
  await page.setViewportSize({ width: largeur, height: 900 });
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(220);
  return page;
}

/** Toutes les proprietes calculees de chaque element, dans l'ordre du DOM. */
const styles = (page) => page.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
    const cs = getComputedStyle(el);
    const v = {};
    for (let i = 0; i < cs.length; i++) v[cs[i]] = cs.getPropertyValue(cs[i]);
    const nom = el.tagName.toLowerCase() + (el.id ? '#' + el.id : '')
      + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).join('.') : '');
    out.push({ nom, v });
  }
  return out;
});

/** Compare deux PNG dans le navigateur : le canvas est le seul decodeur disponible. */
const outil = await contexte.newPage();
await outil.setContent('<body></body>');
const comparer = (a, b) => outil.evaluate(async ([x, y, cran]) => {
  const charger = (d) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = 'data:image/png;base64,' + d; });
  const [ia, ib] = await Promise.all([charger(x), charger(y)]);
  if (ia.width !== ib.width || ia.height !== ib.height) {
    return { dimensions: [ia.width, ia.height, ib.width, ib.height], notables: -1 };
  }
  const px = (im) => { const c = document.createElement('canvas'); c.width = im.width; c.height = im.height;
    c.getContext('2d').drawImage(im, 0, 0); return c.getContext('2d').getImageData(0, 0, im.width, im.height).data; };
  const [pa, pb] = [px(ia), px(ib)];
  let notables = 0, arrondis = 0, max = 0, y1 = -1, y2 = -1;
  for (let i = 0; i < pa.length; i += 4) {
    const d = Math.max(Math.abs(pa[i] - pb[i]), Math.abs(pa[i+1] - pb[i+1]), Math.abs(pa[i+2] - pb[i+2]));
    if (!d) continue;
    if (d > max) max = d;
    if (d <= cran) { arrondis++; continue; }
    notables++;
    const ligne = Math.floor((i / 4) / ia.width);
    if (y1 < 0) y1 = ligne;
    y2 = ligne;
  }
  return { notables, arrondis, max, y1, y2, hauteur: ia.height };
}, [a.toString('base64'), b.toString('base64'), CRAN]);

let rouge = 0;
for (const l of LARGEURS) {
  const [pa, pb] = [await ouvrir(REFERENCE, l), await ouvrir(`${base}/`, l)];
  const [ia, ib] = [await pa.screenshot({ fullPage: true }), await pb.screenshot({ fullPage: true })];
  const [sa, sb] = [await styles(pa), await styles(pb)];
  await pa.close(); await pb.close();

  const image = await comparer(ia, ib);

  let ecartsStyle = 0, premier = null;
  if (sa.length !== sb.length) {
    ecartsStyle++;
    premier = `nombre d'elements : ${sa.length} contre ${sb.length}`;
  } else {
    for (let i = 0; i < sa.length; i++) {
      if (sa[i].nom !== sb[i].nom) { ecartsStyle++; premier ||= `ordre : ${sa[i].nom} contre ${sb[i].nom}`; continue; }
      for (const k of Object.keys(sa[i].v)) {
        if (sa[i].v[k] !== sb[i].v[k]) {
          ecartsStyle++;
          premier ||= `${sa[i].nom} ${k} : « ${sa[i].v[k]} » contre « ${sb[i].v[k]} »`;
        }
      }
    }
  }

  const ko = image.notables !== 0 || ecartsStyle > 0;
  if (ko) rouge++;
  const detail = image.notables > 0 ? `, lignes ${image.y1} a ${image.y2}` : '';
  console.log(
    `${String(l).padStart(4)}px  ${ko ? 'ECART   ' : 'conforme'}  `
    + `${sa.length} elements, ${ecartsStyle} ecart(s) de style  |  `
    + `${image.notables} pixel(s) notable(s)${detail}, ${image.arrondis} d'arrondi, amplitude max ${image.max}/255`
  );
  if (premier) console.log(`          premier ecart : ${premier}`);
  if (ko) {
    writeFileSync(join(SORTIE, `ref-${l}.png`), ia);
    writeFileSync(join(SORTIE, `new-${l}.png`), ib);
  }
}

await navigateur.close();
serveur.close();

if (rouge) {
  console.log(`\n${rouge} largeur(s) en ecart. Captures dans .verif-sorties/.`);
  process.exitCode = 1;
} else {
  console.log(`\nLes ${LARGEURS.length} largeurs sont conformes : aucun ecart de style, aucun pixel au-dela de ${CRAN}/255.`);
}
