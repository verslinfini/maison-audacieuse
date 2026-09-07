// Les liens a fragment pointent-ils vers une ancre qui existe ?
//
//   node verif/ancres.mjs
//
// Pourquoi ce controle existe. « verif/pages.mjs » verifie qu'un lien interne
// mene a une page qui existe, pas que le fragment apres le « # » designe
// quelque chose. Un lien vers « /part-sociale/#faq » reste donc vert quand la
// section « faq » a ete renommee : le visiteur arrive en haut de la page,
// personne ne s'en apercoit, et le lien casse en silence sur toutes les pages
// qui le portent. La home validee en porte un, et elle est gelee : si une
// refonte deplace l'ancre, c'est la home qu'il faudrait rouvrir.
//
// Le controle liste aussi les ancres declarees que personne n'appelle. Ce
// n'est pas une faute, une ancre sert aussi a etre partagee dans un courriel :
// c'est une information, pas un defaut.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(RACINE, 'dist');

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/ est vide. Lancer « node build.mjs » d abord.');
  process.exitCode = 1;
} else {
  const pages = [];
  (function marche(d) {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) marche(p);
      else if (f === 'index.html') pages.push(p);
    }
  })(DIST);

  const ids = {};
  const liens = [];

  for (const p of pages) {
    const html = readFileSync(p, 'utf8');
    const rel = relative(DIST, dirname(p)).split(/[\\/]/).filter(Boolean).join('/');
    const url = rel ? `/${rel}/` : '/';
    ids[url] = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    for (const m of html.matchAll(/href="([^"]*#[^"]+)"/g)) liens.push({ de: url, href: m[1] });
  }

  let morts = 0;
  for (const l of liens) {
    const [chemin, frag] = l.href.split('#');
    if (/^(https?:)?\/\//.test(chemin)) continue;
    const cible = chemin === '' ? l.de : (chemin.endsWith('/') ? chemin : `${chemin}/`);
    if (!(cible in ids)) {
      console.log(`PAGE INCONNUE  ${l.de.padEnd(48)} -> ${l.href}`);
      morts++;
    } else if (!ids[cible].has(frag)) {
      console.log(`ANCRE MORTE    ${l.de.padEnd(48)} -> ${l.href}`);
      morts++;
    }
  }

  const appelees = new Set(liens.map((l) => {
    const [c, f] = l.href.split('#');
    return `${c === '' ? l.de : (c.endsWith('/') ? c : c + '/')}#${f}`;
  }));
  const orphelines = [];
  for (const [url, jeu] of Object.entries(ids)) {
    for (const id of jeu) {
      if (id.startsWith('q-') || id === 'entete' || id === 'pied' || id === 'menu-mobile'
        || id === 'menu-bouton' || id === 'infolettre' || id.startsWith('champ')) continue;
      if (!appelees.has(`${url}#${id}`)) orphelines.push(`${url}#${id}`);
    }
  }

  console.log(`\n${liens.length} lien(s) a fragment, ${morts} mort(s)`);
  if (orphelines.length) {
    console.log(`${orphelines.length} ancre(s) declaree(s) que personne n'appelle, ce qui est normal pour une ancre a partager :`);
    console.log('  ' + orphelines.join('  '));
  }
  if (morts > 0) process.exitCode = 1;
}
