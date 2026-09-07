// Contraste reel du texte, mesure sur les pixels rendus.
//
//   node verif/contraste.mjs                 toutes les pages, trois largeurs
//   node verif/contraste.mjs part-sociale    une seule page
//   node verif/contraste.mjs --largeur 375   une seule largeur
//
// Pourquoi mesurer sur l'image plutot que lire le CSS. Les fonds du site sont
// des empilements de degrades radiaux : « getComputedStyle » rend la liste des
// couches, pas la couleur qu'un mot rencontre a l'endroit ou il se trouve. Un
// meme paragraphe peut tenir 6,2 a gauche et 4,1 a droite.
//
// Six precautions, chacune apprise en se trompant les 07 et 08/09/2026 :
//
// 1. On rend le texte transparent, on ne le masque pas. Masquer un element
//    emporte son fond propre, et l'on mesure alors contre le fond de la
//    section : un bouton jaune devient violet sombre.
// 2. On mesure les NOEUDS DE TEXTE, pas les elements. Un paragraphe blanc qui
//    contient un mot surligne en jaune n'est pas blanc sur jaune.
// 3. On mesure ligne par ligne. Un texte de trois lignes traverse trois
//    endroits du degrade, et chacun doit tenir son seuil.
// 4. On ecarte ce qui n'est pas rendu. Le contenu d'un repli ferme donne des
//    rectangles places ailleurs sur la page. Les replis sont ouverts avant la
//    mesure : leur texte doit tenir son seuil une fois lu.
// 5. On mesure TOUT le texte de la page, entete et pied compris. La premiere
//    version de ce fichier exigeait un ancetre « .bloc--* » ou « .page-tete » :
//    la page d'accueil n'en porte aucun, elle n'etait donc pas mesuree du tout,
//    et le script annoncait « aucun texte sous son seuil » pour une page qu'il
//    n'avait pas regardee. Un auditeur tiers l'a trouve, et cinq defauts reels
//    dormaient derriere, sur la page la plus vue du site.
// 6. On capture ecran par ecran, jamais en pleine page. La home dimensionne
//    ses sections en « 100vh » : une capture pleine page vaut 100vh a la
//    hauteur du document entier et detruit la mise en page qu'on mesure.
//
// Seuils WCAG AA : 4,5 pour le texte courant, 3 au-dela de 24 px ou de
// 18,66 px en gras. Le fond retenu est le DEUXIEME pire des neuf points
// echantillonnes : le pire seul serait bruite par un pixel de bordure, la
// mediane adoucirait la mesure la ou elle compte.

import { createRequire } from 'node:module';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');
const sharp = require('sharp');

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(RACINE, 'dist');

const args = process.argv.slice(2);
const iL = args.indexOf('--largeur');
const LARGEURS = iL >= 0 ? [Number(args[iL + 1])] : [1440, 768, 375];
const demandees = args.filter((a, i) => !a.startsWith('--') && i !== iL + 1);

const TOUTES = ['accueil', 'le-projet-architectural', 'le-modele-economique', 'part-sociale',
  'prendre-part', 'lequipe-projet', 'les-medias', 'contacts', 'soutenir',
  'cgv-parts-sociales', 'politique-de-confidentialite-mentions-legales'];

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ttf': 'font/ttf', '.woff2': 'font/woff2',
  '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml' };

const lum = ([r, g, b]) => {
  const f = (v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
  return .2126 * f(r) + .7152 * f(g) + .0722 * f(b);
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
const rgb = (c) => (c.match(/[\d.]+/g) || []).slice(0, 3).map(Number);

if (!fs.existsSync(join(DIST, 'index.html'))) {
  console.error('dist/ est vide. Lancer « node build.mjs » d abord.');
  process.exitCode = 1;
} else {
  const srv = http.createServer((q, r) => {
    let p = decodeURIComponent(q.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(DIST, p);
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(r);
  });
  await new Promise((ok) => srv.listen(0, ok));
  const port = srv.address().port;

  const nav = await chromium.launch();
  let defauts = 0;

  for (const url of (demandees.length ? demandees : TOUTES)) {
    const adresse = `http://127.0.0.1:${port}${url === 'accueil' ? '/' : '/' + url + '/'}`;
    const pires = [];
    const doutes = [];

    for (const largeur of LARGEURS) {
      const ctx = await nav.newContext({ viewport: { width: largeur, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(adresse, { waitUntil: 'networkidle' });
      await page.evaluate(() => { for (const d of document.querySelectorAll('details')) d.open = true; });
      await page.waitForTimeout(300);

      const hauteur = await page.evaluate(() => document.documentElement.scrollHeight);

      // Le releve des COULEURS se fait avant l'injection de la transparence,
      // sinon « getComputedStyle » rend « transparent » pour tout le monde et
      // l'on mesure du noir sur chaque fond. Les rectangles sont pris en
      // coordonnees du document, et convertis en coordonnees d'ecran au
      // moment de la mesure : c'est le seul releve qui survive au defilement.
      const cibles = await page.evaluate(() => {
        const out = [];
        const marche = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = marche.nextNode())) {
          if (!n.textContent.trim()) continue;
          const parent = n.parentElement;
          if (!parent || parent.closest('.visuellement-cache, .piege')) continue;
          const s = getComputedStyle(parent);
          if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) < .1) continue;
          if (parent.checkVisibility && !parent.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, contentVisibilityAuto: true })) continue;
          // Un element fixe ne suit pas le document : il se mesure une fois,
          // en haut de page, la ou il se trouve reellement.
          const fixe = !!parent.closest('.entete, .barre-mobile, .menu-mobile');
          const zone = parent.closest('.entete, .pied, footer, .barre-mobile, .menu-mobile');
          const plage = document.createRange();
          plage.selectNodeContents(n);
          for (const r of plage.getClientRects()) {
            if (r.width < 12 || r.height < 7) continue;
            out.push({ texte: n.textContent.trim().slice(0, 44), couleur: s.color,
              taille: parseFloat(s.fontSize), graisse: s.fontWeight, fixe,
              ou: zone ? (zone.tagName === 'FOOTER' ? 'pied' : [...zone.classList][0]) : 'corps',
              x: r.x, y: r.y + window.scrollY, l: r.width, h: r.height });
          }
        }
        return out;
      });

      await page.addStyleTag({ content: '*{color:transparent!important;text-decoration-color:transparent!important;-webkit-text-stroke-color:transparent!important}' });
      await page.waitForTimeout(120);

      for (let haut = 0; haut < hauteur; haut += 860) {
        await page.evaluate((y) => window.scrollTo(0, y), haut);
        await page.waitForTimeout(120);
        const defile = await page.evaluate(() => window.scrollY);

        const dedans = cibles.filter((c) => {
          const y = c.fixe ? c.y : c.y - defile;
          if (c.fixe && defile > 0) return false;
          return y > 2 && y + c.h < 898;
        });
        if (!dedans.length) continue;

        // La barre d'appel et l'entete sont fixes : elles se dessinent
        // PAR-DESSUS le contenu. Un texte du corps qui passe dessous serait
        // mesure contre elles. A 375 px, la barre du bas mangeait ainsi trois
        // passages de la page contacts, qui tiennent leur seuil a 1440.
        const zonesFixes = await page.evaluate(() => [...document.querySelectorAll('body *')]
          .filter((el) => { const s = getComputedStyle(el);
            return (s.position === 'fixed' || s.position === 'sticky') && s.display !== 'none' && el.offsetHeight > 0; })
          .map((el) => { const r = el.getBoundingClientRect(); return { t: r.top, b: r.bottom, l: r.left, r: r.right }; }));

        const shot = await page.screenshot();
        const { data, info } = await sharp(shot).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        const pixel = (x, y) => { const i = (y * info.width + x) * info.channels; return [data[i], data[i + 1], data[i + 2]]; };

        for (const c of dedans) {
          const t = rgb(c.couleur);
          if (t.length < 3 || (c.couleur.includes('rgba') && /,\s*0\s*\)$/.test(c.couleur))) continue;
          const yv = c.fixe ? c.y : c.y - defile;
          const pts = [.2, .5, .8].flatMap((fx) => [.35, .5, .65].map((fy) => [
            Math.round(c.x + c.l * fx), Math.round(yv + c.h * fy)]));
          const couvert = ([x, y]) => !c.fixe && zonesFixes.some((z) => x >= z.l && x <= z.r && y >= z.t && y <= z.b);
          const fonds = pts
            .filter(([x, y]) => x >= 0 && y >= 0 && x < info.width && y < info.height)
            .filter((pt) => !couvert(pt))
            .map(([x, y]) => pixel(x, y));
          if (!fonds.length) continue;
          const classes = fonds.map((f) => ({ f, r: ratio(t, f) })).sort((a, b) => a.r - b.r);
          const { f, r } = classes[Math.min(1, classes.length - 1)];
          const gros = c.taille >= 24 || (c.taille >= 18.66 && Number(c.graisse) >= 700);
          const seuil = gros ? 3 : 4.5;
          // Quand le fond releve est la couleur du texte a quelques unites
          // pres, on n'a pas mesure un fond : on a mesure le texte lui-meme,
          // ou un rectangle mal place. Ces cas sont mis de cote et COMPTES,
          // jamais ecartes en silence : un vrai « blanc sur blanc » aurait la
          // meme signature, et il doit rester visible.
          if (f.every((v, i) => Math.abs(v - t[i]) < 6)) { doutes.push({ ...c, r, f, largeur }); continue; }
          if (r < seuil) pires.push({ ...c, r, seuil, f, largeur });
        }
      }
      await ctx.close();
    }

    // Un meme texte ressort a chaque largeur : on ne le compte qu'une fois,
    // a sa pire mesure.
    const vus = new Map();
    for (const p of pires) {
      const cle = `${p.texte}|${p.ou}|${Math.round(p.taille)}`;
      if (!vus.has(cle) || vus.get(cle).r > p.r) vus.set(cle, p);
    }
    const liste = [...vus.values()].sort((a, b) => a.r - b.r);
    defauts += liste.length;

    console.log(`\n=== /${url === 'accueil' ? '' : url + '/'} ===`);
    if (!liste.length) console.log('  aucun texte sous son seuil');
    for (const p of liste.slice(0, 14)) {
      console.log(`  ${p.r.toFixed(2)} / ${p.seuil}  ${String(Math.round(p.taille)).padStart(3)}px  ${p.largeur}  [${p.ou}]  fond rgb(${p.f})  « ${p.texte} »`);
    }
    if (liste.length > 14) console.log(`  et ${liste.length - 14} autre(s)`);
    if (doutes.length) {
      const t = new Set(doutes.map((d) => d.texte));
      console.log(`  ${doutes.length} mesure(s) non concluante(s), fond releve identique a la couleur du texte, a verifier a l oeil :`);
      console.log('    ' + [...t].slice(0, 6).map((x) => `« ${x} »`).join('  ') + (t.size > 6 ? ` et ${t.size - 6} autre(s)` : ''));
    }
  }

  console.log(defauts === 0
    ? `\ntout le texte tient son seuil, sur ${LARGEURS.join(', ')} px.`
    : `\n${defauts} passage(s) sous le seuil.`);
  if (defauts > 0) process.exitCode = 1;

  await nav.close();
  srv.close();
}
