// Assemble le site : chaque page de src/pages/ est injectee dans le gabarit,
// les partials sont recopies, les fichiers statiques suivent. Sortie dans dist/.
//
//   node build.mjs           site de recette : noindex, nofollow
//   node build.mjs --prod    site public : indexable
//
// Aucune dependance. Ce fichier est la seule mecanique du site : s'il devient
// illisible, c'est qu'il fait trop, et il faut lui retirer quelque chose.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync, cpSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = dirname(fileURLToPath(import.meta.url));
const SRC = join(RACINE, 'src');
const PROD = process.argv.includes('--prod');

// --sortie <dossier> construit ailleurs que dans dist/. Sert quand plusieurs
// travaux tournent en parallele : chacun batit chez lui sans effacer l'autre.
const iSortie = process.argv.indexOf('--sortie');
const DIST = join(RACINE, iSortie > 0 && process.argv[iSortie + 1] ? process.argv[iSortie + 1] : 'dist');

const lire = (p) => readFileSync(p, 'utf8');

/** Entete de page : les lignes « cle: valeur » entre deux --- en tete de fichier. */
function entete(texte) {
  const m = texte.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return [{}, texte];
  const champs = {};
  for (const ligne of m[1].split(/\r?\n/)) {
    const sep = ligne.indexOf(':');
    if (sep > 0) champs[ligne.slice(0, sep).trim()] = ligne.slice(sep + 1).trim();
  }
  return [champs, texte.slice(m[0].length)];
}

/** Les partials, charges une fois : {{> entete }} devient partials/entete.html. */
const partials = Object.fromEntries(
  readdirSync(join(SRC, 'partials'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => [basename(f, '.html'), lire(join(SRC, 'partials', f)).trim()])
);

const gabarit = lire(join(SRC, 'gabarit.html'));

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

// Feuilles de style, scripts et fichiers statiques : recopies tels quels.
for (const dossier of ['styles', 'scripts', 'assets']) {
  const source = join(SRC, dossier);
  if (existe(source)) cpSync(source, join(DIST, dossier), { recursive: true });
}

// robots.txt : la recette se ferme aux moteurs, la production s'ouvre. Le fichier
// est produit, jamais ecrit a la main : un robots.txt de recette parti en
// production couterait des semaines de reindexation.
const ROBOTS = PROD
  ? `User-agent: *
Allow: /

Sitemap: https://www.maison-audacieuse.fr/sitemap.xml
`
  : `User-agent: *
Disallow: /
`;
writeFileSync(join(DIST, 'robots.txt'), ROBOTS, 'utf8');

// Un fichier prefixe par _ est un brouillon : present dans src, absent du site.
const produites = [];
const pages = readdirSync(join(SRC, 'pages')).filter((f) => f.endsWith('.html') && !f.startsWith('_'));
for (const fichier of pages) {
  const nom = basename(fichier, '.html');
  const [champs, contenu] = entete(lire(join(SRC, 'pages', fichier)));

  if (!champs.titre || !champs.description) {
    throw new Error(`${fichier} : il manque « titre » ou « description » dans l'entete de page.`);
  }

  let page = gabarit
    .replaceAll('{{ contenu }}', contenu.trim())
    .replaceAll('{{ titre }}', champs.titre)
    .replaceAll('{{ description }}', champs.description)
    .replaceAll('{{ feuille }}', champs.feuille || nom)
    .replaceAll('{{ robots }}', PROD ? 'index, follow' : 'noindex, nofollow');

  // « barre: non » retire l'appel permanent du bas d'ecran. Une page legale
  // ou une page de conditions ne vend rien : lui coller un bouton de
  // souscription en permanence est au mieux inutile, au pire deplace.
  if ((champs.barre || '').toLowerCase() === 'non') {
    page = page.replace(/\{\{>\s*barre-mobile\s*\}\}\s*/g, '');
  }

  // Les partials apres le contenu : une page peut en appeler un.
  page = page.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, cle) => {
    if (!(cle in partials)) throw new Error(`${fichier} : partial « ${cle} » introuvable.`);
    return partials[cle];
  });

  const reste = page.match(/\{\{[^}]*\}\}/);
  if (reste) throw new Error(`${fichier} : variable non remplie ${reste[0]}`);

  // Une valeur d'exemple porte « data-a-remplir » : elle vit en preproduction,
  // jamais en production. Le compteur de la home en est une. Sans ce garde,
  // le site s'ouvre au public en annoncant un nombre de cooperateur ices faux,
  // et c'est le premier chiffre que voit un visiteur.
  if (PROD) {
    const exemple = page.match(/data-a-remplir="([^"]*)"/);
    if (exemple) {
      throw new Error(`${fichier} : valeur d'exemple encore en place, « ${exemple[1]} ». `
        + `La remplacer par la valeur reelle et retirer l'attribut avant de construire en production.`);
    }
  }

  const adresse = '/' + (champs.sortie || `${nom}/index.html`).replace(/index\.html$/, '');
  produites.push({ adresse, titre: champs.titre, description: champs.description });

  const sortie = join(DIST, champs.sortie || `${nom}/index.html`);
  mkdirSync(dirname(sortie), { recursive: true });
  writeFileSync(sortie, page, 'utf8');
  console.log(`${(champs.sortie || `${nom}/index.html`).padEnd(30)} ${page.split('\n').length} lignes`);
}

const NL = `
`;
const SITE = 'https://www.maison-audacieuse.fr';
const jour = new Date().toISOString().slice(0, 10);
produites.sort((a, b) => a.adresse.localeCompare(b.adresse));

// Le sitemap se deduit des pages construites. Ecrit a la main, il oublie une
// page le jour ou l'on est presse, c'est-a-dire le jour de la mise en ligne.
writeFileSync(join(DIST, 'sitemap.xml'), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...produites.map((p) => `  <url><loc>${SITE}${p.adresse}</loc><lastmod>${jour}</lastmod></url>`),
  '</urlset>',
  '',
].join(NL), 'utf8');

// llms.txt : ce que le site dit de lui-meme a une IA qui le lit. Il reprend
// les metadonnees des pages, donc il ne peut pas les contredire.
writeFileSync(join(DIST, 'llms.txt'), [
  '# La Maison Audacieuse',
  '',
  "> Tiers-lieu dédié aux femmes à Annecy, dans la Ferme de Novel : béguinage pour seniors, maison de santé, café associatif, bureaux associatifs, maison de la créativité. Le lieu est porté par la SCIC La Coop Audacieuse, sous promesse de bail emphytéotique de 99 ans avec la Ville d'Annecy. Une campagne de parts sociales à 100 € est en cours pour réunir les fonds propres du projet.",
  '',
  "La part sociale n'est ni un placement ni un produit d'épargne : elle ne rapporte pas d'intérêts, personne ne s'enrichit, et une personne vaut une voix quel que soit le nombre de parts détenues. Aucun avantage fiscal n'est acquis à ce jour, la demande d'agrément ESUS étant en instruction.",
  '',
  '## Pages',
  '',
  ...produites.map((p) => `- [${p.titre.split(' | ')[0]}](${SITE}${p.adresse}) : ${p.description}`),
  '',
].join(NL), 'utf8');

function existe(p) {
  try { statSync(p); return true; } catch { return false; }
}

console.log(`\n${pages.length} page(s) dans dist/${PROD ? '' : '  (noindex)'}`);
