// Controle mecanique de toutes les pages construites.
//
//   node verif/pages.mjs                 controle dist/
//   node verif/pages.mjs .previsu/x      controle un autre dossier
//
// Ce script ne juge pas la qualite d'une page : il verifie ce qui se verifie
// sans jugement, pour que la relecture humaine porte sur le reste. Un point
// rouge ici est un fait, pas une opinion.
//
// Aucune dependance hors Playwright global.

import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(RACINE, process.argv[2] || 'dist');
const LARGEURS = [1440, 768, 375];

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.txt': 'text/plain',
};

/* ------------------------------------------------------- interdits du projet */

// Termes proscrits par la strategie de campagne. Une part sociale n'est ni un
// produit d'epargne ni un placement : le dire serait faux et, sur une levee
// de fonds, juridiquement dangereux.
const MOTS_PROSCRITS = [
  'placement', 'rendement', 'epargne', 'épargne', 'investissement rentable',
  'acheter une part', 'achetez une part', 'reduction d\'impot', 'réduction d\'impôt',
  'defiscalisation', 'défiscalisation', 'recuperable a tout moment', 'récupérable à tout moment',
];

// Chiffres retires par le collectif ou non sources. La liste de reference est
// contenu/pages/chiffres-autorises.md ; ceux-ci en sont les interdits explicites.
const CHIFFRES_PROSCRITS = [
  '3,81', '3 701 184', '400 k', '400 000 €', '480 k', '900 k',
  '80 000 €', '100 000 €', '15 % d\'apport', '54 000', '18 %', '25 %',
];

/* Dire ce que la part sociale n'est pas fait partie du discours : « ce n'est
   pas un placement » est la phrase la plus utile de la page part sociale.
   On ne signale donc un mot proscrit que s'il n'est pas nie autour. C'est une
   heuristique : elle rate une tournure retorse, elle evite surtout de crier
   sur chaque phrase honnete, ce qui apprendrait a ignorer l'alerte. */
const NEGATIONS = ['pas', 'plus', 'jamais', 'ni', 'aucun', 'aucune', 'sans', 'rien'];

function* occurrences(texte, mot) {
  let i = -1;
  while ((i = texte.indexOf(mot, i + 1)) >= 0) {
    yield texte.slice(Math.max(0, i - 90), i + mot.length + 70);
  }
}

// Comparaison mot a mot plutot que par expression : « pas » ne doit pas se
// reconnaitre dans « passage ».
const nie = (passage) => {
  const mots = ' ' + passage.replace(/[^a-zà-ÿ]+/gi, ' ').trim().toLowerCase() + ' ';
  return NEGATIONS.some((n) => mots.includes(' ' + n + ' '));
};

/* ------------------------------------------------------------------ serveur */

const serveur = createServer((req, res) => {
  let chemin = join(DIST, decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(chemin) && statSync(chemin).isDirectory()) chemin = join(chemin, 'index.html');
  if (!existsSync(chemin)) { res.writeHead(404).end('introuvable'); return; }
  res.writeHead(200, { 'content-type': TYPES[extname(chemin)] || 'application/octet-stream' });
  res.end(readFileSync(chemin));
});
await new Promise((ok) => serveur.listen(0, '127.0.0.1', ok));
const base = `http://127.0.0.1:${serveur.address().port}`;

/* -------------------------------------------------------------- les pages */

const pages = [];
(function balayer(dossier) {
  for (const e of readdirSync(dossier, { withFileTypes: true })) {
    const p = join(dossier, e.name);
    if (e.isDirectory()) balayer(p);
    else if (e.name === 'index.html') {
      const sous = relative(DIST, dirname(p)).split('\\').join('/');
      pages.push({ url: sous ? `/${sous}/` : '/', fichier: p });
    }
  }
})(DIST);
pages.sort((a, b) => a.url.localeCompare(b.url));

if (!pages.length) {
  console.error(`Aucune page dans ${DIST}. Construis d'abord.`);
  process.exit(1);
}

const connues = new Set(pages.map((p) => p.url));

// Redirections servies par le serveur, pas par une page du site. Les compter
// comme absentes ferait un faux positif a chaque controle.
const REDIRIGEES = new Set(['/soutenir/']);

/* ------------------------------------------------------------- controles */

const navigateur = await chromium.launch();
const contexte = await navigateur.newContext({ deviceScaleFactor: 1 });

let rouge = 0;
const resume = [];

for (const { url, fichier } of pages) {
  const ennuis = [];
  const brut = readFileSync(fichier, 'utf8');
  const sansBalises = brut.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');

  // 1. Interdits de langue et de chiffres, sur le texte rendu seulement :
  //    un commentaire de code n'atteint pas le lecteur.
  const minuscules = sansBalises.toLowerCase();
  for (const m of MOTS_PROSCRITS) for (const passage of occurrences(minuscules, m)) {
    if (!nie(passage)) ennuis.push(`mot proscrit : « ${m} », dans « ...${passage.trim()}... »`);
  }
  for (const c of CHIFFRES_PROSCRITS) if (sansBalises.includes(c)) ennuis.push(`chiffre proscrit : « ${c} »`);
  if (sansBalises.includes('\u2014')) ennuis.push('tiret cadratin dans le texte');

  // 2. Metadonnees. Google coupe le titre vers 60 signes et la description
  //    vers 155 : au-dela, la fin ne sert a personne.
  const titre = (brut.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const desc = (brut.match(/<meta name="description" content="([^"]*)"/i) || [])[1] || '';
  if (!titre.trim()) ennuis.push('titre vide');
  else if (titre.length > 65) ennuis.push(`titre de ${titre.length} signes, coupe vers 60`);
  if (!desc.trim()) ennuis.push('description vide');
  else if (desc.length < 70 || desc.length > 160) ennuis.push(`description de ${desc.length} signes, viser 70 a 160`);

  // 3. Rendu reel, a trois largeurs.
  const page = await contexte.newPage();
  const erreurs = [];
  const externes = new Set();
  const manquants = new Set();
  page.on('console', (m) => { if (m.type() === 'error') erreurs.push(m.text().slice(0, 120)); });
  page.on('pageerror', (e) => erreurs.push(String(e.message).slice(0, 120)));
  page.on('request', (r) => { if (!r.url().startsWith(base) && !r.url().startsWith('data:')) externes.add(new URL(r.url()).host); });
  page.on('response', (r) => { if (r.status() === 404) manquants.add(new URL(r.url()).pathname); });

  for (const l of LARGEURS) {
    await page.setViewportSize({ width: l, height: 900 });
    await page.goto(base + url, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(180);

    const debord = await page.evaluate(() => {
      const de = document.documentElement;
      const large = de.scrollWidth > de.clientWidth ? de.scrollWidth - de.clientWidth : 0;
      const coupables = [];
      if (large) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > de.clientWidth + 1 || r.left < -1)) {
            coupables.push(el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/)[0] : ''));
          }
        }
      }
      return { large, coupables: [...new Set(coupables)].slice(0, 3) };
    });
    if (debord.large) ennuis.push(`${l}px : deborde de ${debord.large}px (${debord.coupables.join(', ') || 'origine non isolee'})`);
  }

  // 4. Structure, une seule fois : elle ne depend pas de la largeur.
  const structure = await page.evaluate(() => {
    const titres = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
    const sauts = [];
    for (let i = 1; i < titres.length; i++) if (titres[i] > titres[i - 1] + 1) sauts.push(`h${titres[i - 1]} puis h${titres[i]}`);
    const sansAlt = [...document.querySelectorAll('img')].filter((i) => i.getAttribute('alt') === null).length;
    const altVide = [...document.querySelectorAll('img:not([alt=""])')].filter((i) => !i.getAttribute('alt').trim()).length;
    const sansTaille = [...document.querySelectorAll('img')].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length;
    const liens = [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href'));
    const vides = [...document.querySelectorAll('a')].filter((a) => !a.textContent.trim() && !a.querySelector('img[alt]:not([alt=""])') && !a.getAttribute('aria-label')).length;
    const champs = [...document.querySelectorAll('input:not([type=hidden]):not([type=submit]), textarea, select')];
    const sansLabel = champs.filter((c) => !c.labels?.length && !c.getAttribute('aria-label') && !c.getAttribute('aria-labelledby')).length;
    return {
      h1: document.querySelectorAll('h1').length,
      main: document.querySelectorAll('main').length,
      sauts, sansAlt, altVide, sansTaille, vides, sansLabel,
      liens: [...new Set(liens)],
      lang: document.documentElement.lang,
      mots: (document.querySelector('main')?.innerText || '').trim().split(/\s+/).length,
      aSourcer: (document.body.innerText.match(/\[(À SOURCER|À TRANCHER|À BRANCHER)[^\]]*\]/g) || []).length,
    };
  });

  if (structure.h1 !== 1) ennuis.push(`${structure.h1} balise h1, il en faut exactement une`);
  if (structure.main !== 1) ennuis.push(`${structure.main} balise main, il en faut exactement une`);
  for (const s of structure.sauts) ennuis.push(`niveau de titre saute : ${s}`);
  if (structure.sansAlt) ennuis.push(`${structure.sansAlt} image sans attribut alt`);
  if (structure.altVide) ennuis.push(`${structure.altVide} image avec un alt vide non decoratif`);
  if (structure.sansTaille) ennuis.push(`${structure.sansTaille} image sans width/height (la page sautera au chargement)`);
  if (structure.vides) ennuis.push(`${structure.vides} lien sans texte lisible`);
  if (structure.sansLabel) ennuis.push(`${structure.sansLabel} champ de formulaire sans etiquette`);
  if (structure.lang !== 'fr') ennuis.push(`langue du document : « ${structure.lang} »`);
  if (erreurs.length) ennuis.push(`console : ${erreurs[0]}`);
  if (externes.size) ennuis.push(`requete externe vers ${[...externes].join(', ')}`);
  for (const m of manquants) if (m !== url) ennuis.push(`404 sur ${m}`);

  // 5. Liens internes : une page qui pointe vers le vide est un cul-de-sac.
  for (const l of structure.liens) {
    const cible = l.split('#')[0];
    if (!cible || cible === '/') continue;
    if (cible.startsWith('/assets') || cible.startsWith('/styles') || cible.startsWith('/scripts')) continue;
    if (!connues.has(cible) && !REDIRIGEES.has(cible)) ennuis.push(`lien vers une page absente : ${cible}`);
  }

  await page.close();

  const ko = ennuis.length > 0;
  if (ko) rouge++;
  resume.push({ url, mots: structure.mots, aSourcer: structure.aSourcer, ennuis });

  console.log(`${ko ? 'ECART  ' : 'conforme'}  ${url.padEnd(48)} ${String(structure.mots).padStart(5)} mots${structure.aSourcer ? `, ${structure.aSourcer} trou(s) nomme(s)` : ''}`);
  for (const e of ennuis) console.log(`           - ${e}`);
}

await navigateur.close();
serveur.close();

const trous = resume.reduce((s, r) => s + r.aSourcer, 0);
console.log(`\n${pages.length} page(s), ${rouge} en ecart, ${trous} trou(s) nomme(s) au total.`);
if (rouge) process.exitCode = 1;
