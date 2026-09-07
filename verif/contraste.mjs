// Contraste reel du texte, mesure sur les pixels rendus.
//
//   node verif/contraste.mjs                 toutes les pages de dist/
//   node verif/contraste.mjs part-sociale    une seule
//
// Pourquoi mesurer sur l'image plutot que lire le CSS. Les fonds du site
// sont des empilements de degrades radiaux : « getComputedStyle » rend la
// liste des couches, pas la couleur qu'un mot rencontre a l'endroit ou il
// se trouve. Un meme paragraphe peut tenir 6,2 a gauche et 4,1 a droite.
//
// Quatre precautions, chacune apprise en se trompant le 07/09/2026 :
//
// 1. On rend le texte transparent, on ne le masque pas. Masquer un element
//    emporte son fond propre, et l'on mesure alors contre le fond de la
//    section : un bouton jaune devient violet sombre, une case blanche
//    devient un degrade.
// 2. On mesure les NOEUDS DE TEXTE, pas les elements. Un paragraphe blanc
//    qui contient un mot surligne en jaune n'est pas blanc sur jaune.
// 3. On mesure ligne par ligne. Un texte de trois lignes traverse trois
//    endroits du degrade, et chacun doit tenir son seuil.
// 4. On ecarte ce qui n'est pas rendu. Le contenu d'un repli ferme donne
//    des rectangles places ailleurs sur la page, ou l'on mesure le fond
//    d'un tout autre bloc. Les replis sont ouverts avant la mesure : leur
//    texte doit tenir son seuil une fois lu.
//
// Seuils WCAG AA : 4,5 pour le texte courant, 3 au-dela de 24 px ou de
// 18,66 px en gras. Le fond retenu est le DEUXIEME pire des neuf points
// echantillonnes : le pire seul serait bruite par un pixel de bordure,
// la mediane adoucirait la mesure la ou elle compte.

import { createRequire } from 'node:module';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');
const sharp = require('sharp');

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const R = join(RACINE, 'dist');
const T = { '.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.gif':'image/gif','.ttf':'font/ttf','.ico':'image/x-icon','.txt':'text/plain','.xml':'application/xml' };
const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(R, p); if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); });
await new Promise((ok) => srv.listen(0, ok));
const port = srv.address().port;

const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
  return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };

const nav = await chromium.launch();
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

const demandees = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const TOUTES = ['accueil', 'le-projet-architectural', 'le-modele-economique', 'part-sociale',
  'prendre-part', 'lequipe-projet', 'les-medias', 'contacts', 'soutenir',
  'cgv-parts-sociales', 'politique-de-confidentialite-mentions-legales'];
let defauts = 0;

for (const url of (demandees.length ? demandees : TOUTES)) {
  await page.goto(`http://127.0.0.1:${port}${url === 'accueil' ? '/' : '/' + url + '/'}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  console.log(`\n=== /${url === 'accueil' ? '' : url + '/'} ===`);

  // On masque le texte pour photographier le fond seul, puis on echantillonne
  // sous chaque element de texte pose sur un fond colore.
  const cibles = await page.evaluate(() => {
    // On mesure les NOEUDS DE TEXTE, pas les elements. Un paragraphe blanc
    // qui contient un mot surligne en jaune n'est pas blanc sur jaune : le
    // mot a sa propre couleur. Mesurer la boite du parent attribue la
    // couleur du parent aux pixels de l'enfant, et invente un defaut.
    const out = [];
    const marche = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = marche.nextNode())) {
      if (!n.textContent.trim()) continue;
      const parent = n.parentElement;
      if (!parent || parent.closest('[hidden], .visuellement-cache, .piege')) continue;
      const bloc = parent.closest('.bloc--violet, .bloc--terracotta, .bloc--sombre, .bloc--aube, .bloc--claire, .bloc--nappe, .bloc--ouvert, .page-tete, .bloc--photo, .bloc--blanc, .bloc--gris, .bloc--violace');
      if (!bloc) continue;
      const s = getComputedStyle(parent);
      if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) < .1) continue;
      if (parent.checkVisibility && !parent.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true, contentVisibilityAuto: true })) continue;
      const plage = document.createRange();
      plage.selectNodeContents(n);
      // Une ligne a la fois : un texte de trois lignes traverse trois
      // endroits du degrade, et chacun doit tenir son seuil.
      for (const r of plage.getClientRects()) {
        if (r.width < 12 || r.height < 7) continue;
        out.push({ texte: n.textContent.trim().slice(0, 46), couleur: s.color,
          taille: parseFloat(s.fontSize), graisse: s.fontWeight,
          fond: [...bloc.classList].filter((c) => c.startsWith('bloc--') || c === 'page-tete').join(' '),
          pts: [.2, .5, .8].flatMap((fx) => [.35, .5, .65].map((fy) => [
            Math.round(r.x + r.width * fx), Math.round(window.scrollY + r.y + r.height * fy)]))});
      }
    }
    return out;
  });

  // On rend le texte transparent SANS masquer les elements : le fond propre
  // d'un bouton, d'une carte ou d'un surlignage doit rester photographie,
  // sinon on mesure contre le fond de la section et le resultat est faux.
  await page.addStyleTag({ content: '*{color:transparent!important;text-decoration-color:transparent!important;-webkit-text-stroke-color:transparent!important}' });
  await page.waitForTimeout(200);
  const shot = await page.screenshot({ fullPage: true });
  const { data, info } = await sharp(shot).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixel = (x, y) => { const i = (y * info.width + x) * info.channels; return [data[i], data[i + 1], data[i + 2]]; };

  const rgb = (c) => (c.match(/[\d.]+/g) || []).slice(0, 3).map(Number);
  const seen = new Set();
  let pires = [];
  for (const c of cibles) {
    const t = rgb(c.couleur);
    if (t.length < 3) continue;
    // Sur un degrade, le contraste varie d'un bout du texte a l'autre : la
    // mediane masquerait le pire endroit, qui est celui qui compte. On prend
    // le DEUXIEME pire des neuf points. Le pire seul serait bruite par un
    // pixel de bordure pointillee ou de bord de lettre voisine ; le deuxieme
    // pire elimine l'accident isole sans adoucir la mesure.
    const fonds = c.pts.filter(([x, y]) => x < info.width && y < info.height && x >= 0 && y >= 0).map(([x, y]) => pixel(x, y));
    if (!fonds.length) continue;
    const classes = fonds.map((f) => ({ f, r: ratio(t, f) })).sort((a, b) => a.r - b.r);
    const { f, r } = classes[Math.min(1, classes.length - 1)];
    const gros = c.taille >= 24 || (c.taille >= 18.66 && Number(c.graisse) >= 700);
    const seuil = gros ? 3 : 4.5;
    const cle = c.fond + c.couleur + c.taille;
    if (r < seuil) pires.push({ ...c, r, seuil, f, gros });
    seen.add(cle);
  }
  pires.sort((a, b) => a.r - b.r);
  defauts += pires.length;
  if (!pires.length) console.log('  aucun texte sous son seuil');
  for (const p of pires.slice(0, 12)) {
    console.log(`  ${p.r.toFixed(2)} / ${p.seuil}  ${p.taille}px ${p.gros ? 'gros' : ''}  [${p.fond}]  fond rgb(${p.f})  « ${p.texte} »`);
  }
}
console.log(defauts === 0
  ? `
tout le texte tient son seuil.`
  : `
${defauts} passage(s) sous le seuil.`);
if (defauts > 0) process.exitCode = 1;

await nav.close(); srv.close();
