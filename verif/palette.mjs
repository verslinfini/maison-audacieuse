// Aucune couleur hors charte, ni dans la palette, ni sur du texte, ni sur un aplat.
//
//   node verif/palette.mjs
//
// LA REGLE, en une phrase : la charte donne les couleurs, le CSS n'en invente
// aucune, et une variation de valeur se fait par traitement et non par
// nouvelle teinte.
//
// Pourquoi ce controle existe. Le 08/09/2026 un « --vert-sombre » #416F5C a
// ete introduit pour que les textes verts tiennent leur seuil de contraste :
// le vert de la charte vaut 3,13 sur blanc, il en faut 4,5. La couleur etait
// juste au regard de WCAG et fausse au regard de la charte. Romain a tranche
// le 09/09 : la charte prime, le vert ne se decline pas, l'ecart de contraste
// s'assume et s'inscrit dans « verif/contraste.mjs ». Le meme geste dormait
// depuis plus longtemps sur un jaune de survol, #FFEB7E, invente a cote du
// #FFF3A8 de la charte. Deux fois le meme reflexe, aucune alerte : d'ou ce
// fichier.
//
// Il verifie DEUX choses, et la premiere compte autant que la seconde :
//
//   1. La palette elle-meme. Chaque couleur declaree dans le « :root » de
//      base.css doit figurer dans « docs/charte.md ». Une teinte inventee ne
//      se blanchit pas en se donnant un nom de variable : c'est exactement
//      ainsi que --vert-sombre est passe, et un controle qui lirait la
//      palette dans le « :root » l'aurait laisse passer aussi.
//   2. Les declarations qui peignent : « color », « background »,
//      « background-color », « border-color », « fill », « stroke »… Elles se
//      servent dans le « :root », jamais dans une valeur ecrite a la main.
//
// Ce qu'il laisse passer, et pourquoi. Il ne regarde pas l'interieur des
// degrades. Les fonds du site sont des empilements de nappes radiales dont
// plusieurs arrets sont des virages de teinte assumes, documentes ligne a
// ligne dans les feuilles : les signaler tous produirait un mur
// d'avertissements qu'on apprendrait a ignorer, et un controle qu'on ignore
// ne controle rien.
//
// Comment faire varier une couleur de charte sans en inventer une :
// « filter: brightness(.94) » sur un survol, une opacite, une superposition.
// Le traitement garde la couleur de la charte, il n'en declare pas une autre.

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const STYLES = join(RACINE, 'src', 'styles');
const CHARTE = join(RACINE, 'docs', 'charte.md');

// Les seules valeurs autorisees en dehors de la palette, chacune avec sa
// raison. Une entree sans raison n'a rien a faire ici.
const TOLEREES = {
  transparent: 'mot-cle, pas une couleur',
  currentcolor: 'reprend la couleur deja en place',
  inherit: 'reprend la couleur du parent',
  none: 'absence de peinture',
  unset: 'valeur par defaut',
  initial: 'valeur par defaut',
  'rgba(0,0,0,0)': 'transparent ecrit en rgba',
};

const PROPRIETES = ['color', 'background', 'background-color', 'border-color',
  'fill', 'stroke', 'outline-color', 'caret-color', 'accent-color',
  'text-decoration-color', 'border-top-color', 'border-bottom-color',
  'border-left-color', 'border-right-color'];

const sansCommentaires = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

const enRgb = (v) => {
  const t = v.trim().toLowerCase();
  let m = t.match(/^#([0-9a-f]{3})$/);
  if (m) return m[1].split('').map((c) => parseInt(c + c, 16));
  m = t.match(/^#([0-9a-f]{6})$/);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
  m = t.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  if (m) return [1, 2, 3].map((i) => Math.round(Number(m[i])));
  return null;
};

const fautes = [];

// 1. La charte : la seule source de verite des teintes.
const charte = new Set();
for (const m of readFileSync(CHARTE, 'utf8').matchAll(/#[0-9a-fA-F]{6}\b/g)) {
  charte.add(enRgb(m[0]).join(','));
}
if (charte.size < 5) {
  console.error('docs/charte.md ne donne pas de couleurs : la charte est introuvable.');
  process.exit(1);
}

// 2. La palette declaree, verifiee contre la charte.
const base = sansCommentaires(readFileSync(join(STYLES, 'base.css'), 'utf8'));
const root = base.match(/:root\s*\{([\s\S]*?)\}/);
if (!root) {
  console.error('Aucun « :root » dans base.css : la palette est introuvable.');
  process.exit(1);
}

const palette = new Map();
for (const m of root[1].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
  const rgb = enRgb(m[2]);
  if (!rgb) continue;
  palette.set(rgb.join(','), m[1]);
  if (!charte.has(rgb.join(','))) {
    fautes.push({ f: 'base.css', l: 0, prop: m[1], c: m[2].trim(),
      quoi: 'couleur inventee dans la palette, absente de docs/charte.md' });
  }
}

// 3. Les declarations qui peignent.
const feuilles = readdirSync(STYLES).filter((x) => x.endsWith('.css'));
let vues = 0;

for (const f of feuilles) {
  const lignes = sansCommentaires(readFileSync(join(STYLES, f), 'utf8')).split('\n');
  lignes.forEach((ligne, i) => {
    for (const m of ligne.matchAll(/(^|[;{\s])([a-z-]+)\s*:\s*([^;{}]+)/g)) {
      const prop = m[2];
      if (!PROPRIETES.includes(prop)) continue;
      const valeur = m[3].trim();
      // Le contenu des degrades sort du perimetre, voir l'en-tete.
      if (/gradient\(/i.test(valeur)) continue;
      if (valeur.startsWith('var(')) { vues++; continue; }
      if (TOLEREES[valeur.toLowerCase().replace(/\s+/g, '')]) { vues++; continue; }

      // Une valeur composee, « 2px solid #ABC » : on lit les couleurs dedans.
      const morceaux = valeur.match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi) || [];
      if (!morceaux.length) { vues++; continue; }
      for (const c of morceaux) {
        vues++;
        if (TOLEREES[c.toLowerCase().replace(/\s+/g, '')]) continue;
        const rgb = enRgb(c);
        if (!rgb) { fautes.push({ f, l: i + 1, prop, c, quoi: 'couleur illisible' }); continue; }
        if (palette.has(rgb.join(','))) continue;
        fautes.push({ f, l: i + 1, prop, c, quoi: 'hors palette' });
      }
    }
  });
}

console.log(`${charte.size} couleur(s) de charte, ${palette.size} dans la palette, ${vues} declaration(s) qui peignent, ${feuilles.length} feuille(s).`);

if (!fautes.length) {
  console.log('\naucune couleur hors charte, ni dans la palette ni sur ce qu on voit.');
} else {
  console.log('');
  for (const x of fautes) {
    const ou = x.l ? `src/styles/${x.f}:${x.l}` : `src/styles/${x.f} (:root)`;
    console.log(`HORS CHARTE  ${ou}  ${x.prop}: ${x.c}  (${x.quoi})`);
  }
  console.log(`\n${fautes.length} couleur(s) hors charte. Se servir dans le « :root » de base.css,`);
  console.log('ou faire varier la valeur par traitement (« filter: brightness(.94) »),');
  console.log('jamais en declarant une teinte de plus.');
  process.exitCode = 1;
}
