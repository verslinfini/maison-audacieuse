// La home construite est-elle encore celle de la maquette validee ?
//
//   node verif/home-conforme.mjs [largeur]
//
// Pourquoi ce controle existe. La home a ete dessinee en maquette, arbitree
// ecran par ecran, puis validee. Le site a ensuite ete refactorise : socle
// commun, gabarit, partials. Un diff de fichiers ne dit donc plus rien, les
// fichiers different par construction. Ce qui doit rester identique, c'est le
// RENDU.
//
// Le 07/09/2026, deux derives ont ete trouvees a la main, l'une apres l'autre :
// la jauge du heros masquee par un « hidden », et le panneau de la Ferme de
// Novel grossi de 71 px par une regle de socle qui portait le meme nom de
// classe que la sienne. Aucune n'apparaissait dans un diff de fichiers, les
// deux se voyaient a l'oeil. Ce script les aurait vues toutes les deux.
//
// Il parcourt le <main> des deux pages en parallele et compare, pour chaque
// noeud, sa nature, son texte et ses styles calcules. Les ecarts voulus sont
// listes plus bas, avec leur date et leur raison : tout le reste est signale.

import { createRequire } from 'node:module';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const MAQUETTE = join(RACINE, 'maquettes');
const DIST = join(RACINE, 'dist');
const LARGEUR = Number(process.argv[2] || 1440);

// Les ecarts voulus entre la maquette et le site. Chacun porte sa raison :
// un ecart sans raison ecrite ici est une derive, pas une decision.
const VOULUS = [
  {
    // Le referentiel des chiffres autorises tient « 650+ » et fige le palier
    // a 666. Le 670 de la maquette n'y figure pas : il a ete corrige partout
    // ou il apparaissait, dans la legende de la jauge comme dans le recit.
    quoi: 'le palier et le nombre de contributeur·ices suivent chiffres-autorises.md',
    test: (c, p) => p === 'texte' && String(c.m).includes('670'),
  },
  {
    quoi: '« pres de » devient « plus de », formulation du referentiel',
    test: (c, p) => p === 'texte' && String(c.m).includes('près de') && String(c.d).includes('plus de'),
  },
  {
    // Le libelle promettait un calendrier que la page cible ne porte plus :
    // il doublait la frise de la home, situee juste au-dessus de ce lien.
    quoi: 'le lien vers le modele economique prend le libelle du pied',
    test: (c, p) => p === 'texte' && String(c.m).startsWith('Prochaines étapes'),
  },
  {
    // Meme lot : la legende de figure passe de 72 % a la couleur pleine du
    // corps de texte, elle tombait a 4,43 sur les fonds teintes.
    quoi: 'credit photo : opacite .72 vers la couleur pleine du corps de texte',
    test: (c, p) => p === 'couleur' && String(c.m).includes('0.72'),
  },
  {
    // Les fonds pleins des ecrans 5 et 7 ont ete assombris le 08/09 : le
    // blanc y mesurait 3,72 a 4,07 pour 4,5. Voir la note de « accueil.css ».
    quoi: 'fonds pleins des ecrans le-pari et agir, voile porte au seuil AA',
    test: (c, p) => p === 'image' && String(c.m).includes('radial-gradient'),
  },
  {
    // La liste des espaces se lisait comme une phrase : virgule apres chaque
    // item, point sur le dernier. Elle se lit maintenant comme une liste.
    // Demande de Romain le 09/09 sur les virgules ; le point final tombe avec
    // elles, une liste sans virgules ne se clot pas par un point.
    quoi: 'liste des espaces : plus de ponctuation en fin d item',
    test: (c, p, n) => p === 'texte' && n.tag === 'LI'
      && String(c.m).replace(/[,.]$/, '') === String(c.d).replace(/[,.]$/, ''),
  },
  {
    quoi: 'la structure exploitante du pole sante a quitte le projet, l espace est nomme par sa fonction',
    test: (c, p) => p === 'texte' && (String(c.m).startsWith('un pôle santé inclusif') || String(c.m) === 'Maison En-Santé'),
  },
  {
    quoi: 'largeur du nombre en gras, consequence du precedent',
    test: (c, p) => p === 'l' && Math.abs(Number(c.m) - Number(c.d)) <= 3,
  },
  {
    quoi: 'largeur du lien vers le modele economique, consequence de son libelle plus court',
    test: (c, p, n) => p === 'l' && n.classes === 'lien-texte' && Number(c.m) === 278 && Number(c.d) === 192,
  },
  {
    quoi: 'champs de formulaire : 16 px et 50 px de haut (sous 16 px, iOS zoome au focus ; 44 px etait le minimum tactile)',
    test: (c, p, n) => n.tag === 'INPUT' || n.tag === 'BUTTON' || n.classes.includes('infolettre'),
  },
  {
    quoi: 'hauteurs entrainees par la taille des champs',
    test: (c, p, n) => p === 'h' && Number(c.d) - Number(c.m) === 6,
  },
  {
    quoi: 'marge du lien sous le champ, meme lot',
    test: (c, p, n) => p === 'marge' && n.classes === 'lien-texte' && String(c.d).startsWith('6.28'),
  },
  {
    // « pour des femmes agees et isolees » devient « pour femmes agees
    // isolees » : la coordination faisait de l'isolement une seconde
    // condition d'entree, l'apposition en fait la situation qu'on adresse.
    // Reformulation de Romain, 09/09.
    quoi: 'beguinage : « pour femmes agees isolees » sans coordination',
    test: (c, p, n) => p === 'texte' && String(c.m).startsWith('un habitat partagé pour des femmes'),
  },
  {
    // Consequence de la chute des etapes passee sur deux lignes, voir
    // STRUCTURE_VOULUE : une ligne de plus, donc trente pixels de plus sur le
    // paragraphe, et autant sur le conteneur qui le porte.
    quoi: 'hauteurs entrainees par la chute des etapes sur deux lignes',
    test: (c, p, n) => p === 'h'
      && (n.chemin === 'main/section[3]/div[1]/p[2]' || n.chemin === 'main/section[3]/div[1]')
      && Number(c.d) - Number(c.m) >= 30 && Number(c.d) - Number(c.m) <= 32,
  },
];

// Les ecarts de STRUCTURE voulus : un noeud present d'un seul cote. Ils se
// declarent a part parce qu'ils coutent plus cher que les autres : un noeud
// declare ici n'est plus compare du tout, ni son texte ni ses styles. On n'en
// inscrit donc que pour une decision prise, jamais pour faire taire le
// controle.
const STRUCTURE_VOULUE = [
  {
    // La chute de l'ecran des etapes passe sur deux lignes : « Le don a lance
    // les etudes. » puis « La part sociale nous rassemble dans un projet
    // commun. » Le <br> insere decale l'index du <strong> qui suit, d'ou
    // trois lignes de structure pour une seule decision. Demande de Romain,
    // 09/09. Prix paye : le <strong> de cette chute n'est plus compare.
    quoi: 'la chute des etapes passe sur deux lignes',
    test: (chemin) => [
      'main/section[3]/div[1]/p[2]/br[0]',
      'main/section[3]/div[1]/p[2]/strong[0]',
      'main/section[3]/div[1]/p[2]/strong[1]',
    ].includes(chemin),
  },
];

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif',
  '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml' };

function servir(racine) {
  const s = http.createServer((q, r) => {
    let p = decodeURIComponent(q.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(racine, p);
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(r);
  });
  return new Promise((ok) => s.listen(0, () => ok([s, s.address().port])));
}

const RELEVE = `(el) => {
  const s = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    tag: el.tagName,
    classes: [...el.classList].sort().join(' '),
    texte: [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').replace(/\\s+/g, ' ').trim(),
    l: Math.round(r.width), h: Math.round(r.height),
    couleur: s.color, fond: s.backgroundColor,
    image: s.backgroundImage === 'none' ? '' : s.backgroundImage.slice(0, 120),
    police: s.fontFamily.split(',')[0].replace(/"/g, ''),
    taille: s.fontSize, graisse: s.fontWeight, ligne: s.lineHeight,
    aff: s.display, pos: s.position, marge: s.margin, creux: s.padding,
    grille: s.gridTemplateColumns,
    visible: s.visibility + '/' + s.opacity + '/' + (el.hasAttribute('hidden') ? 'HIDDEN' : 'affiche'),
  };
}`;

const arbre = async (page) => page.evaluate(`(() => {
  const releve = ${RELEVE};
  const out = [];
  const marche = (el, chemin) => {
    out.push({ chemin, ...releve(el) });
    [...el.children].forEach((e, i) => marche(e, chemin + '/' + e.tagName.toLowerCase() + '[' + i + ']'));
  };
  marche(document.querySelector('main'), 'main');
  return out;
})()`);

if (!fs.existsSync(join(DIST, 'index.html'))) {
  console.error('dist/ est vide. Lancer « node build.mjs » d abord.');
  process.exitCode = 1;
} else {
  const [sm, pm] = await servir(MAQUETTE);
  const [sd, pd] = await servir(DIST);
  const nav = await chromium.launch();
  const ctx = await nav.newContext({ viewport: { width: LARGEUR, height: 900 } });

  const pageM = await ctx.newPage();
  await pageM.goto(`http://127.0.0.1:${pm}/home/v2.html`, { waitUntil: 'networkidle' });
  await pageM.waitForTimeout(400);
  const aM = await arbre(pageM);

  const pageD = await ctx.newPage();
  await pageD.goto(`http://127.0.0.1:${pd}/`, { waitUntil: 'networkidle' });
  await pageD.waitForTimeout(400);
  const aD = await arbre(pageD);

  const parChemin = (a) => Object.fromEntries(a.map((n) => [n.chemin, n]));
  const M = parChemin(aM);
  const D = parChemin(aD);

  const derives = [];
  const declare = (c) => STRUCTURE_VOULUE.some((v) => { try { return v.test(c); } catch { return false; } });
  const manquants = Object.keys(M).filter((c) => !(c in D) && !declare(c));
  const enPlus = Object.keys(D).filter((c) => !(c in M) && !declare(c));

  for (const chemin of Object.keys(M)) {
    if (!(chemin in D)) continue;
    const m = M[chemin], d = D[chemin];
    for (const p of Object.keys(m)) {
      if (p === 'chemin') continue;
      if (String(m[p]) === String(d[p])) continue;
      const couple = { m: m[p], d: d[p] };
      if (VOULUS.some((v) => { try { return v.test(couple, p, d); } catch { return false; } })) continue;
      derives.push({ chemin, quoi: `${d.tag}.${d.classes || '(sans classe)'}`, p, m: m[p], d: d[p] });
    }
  }

  console.log(`maquette ${aM.length} noeuds, home ${aD.length} noeuds, largeur ${LARGEUR}`);

  for (const l of manquants) console.log(`ABSENT de la home   ${l}  ${M[l].tag}.${M[l].classes}`);
  for (const l of enPlus) console.log(`EN PLUS dans la home ${l}  ${D[l].tag}.${D[l].classes}`);
  for (const e of derives) {
    console.log(`\nDERIVE  ${e.chemin}\n  ${e.quoi}\n  ${e.p} : maquette « ${e.m} »\n  ${' '.repeat(e.p.length)}   home     « ${e.d} »`);
  }

  const total = manquants.length + enPlus.length + derives.length;
  console.log(total === 0
    ? `\nla home est conforme a la maquette validee (${VOULUS.length} ecart(s) voulu(s) et ${STRUCTURE_VOULUE.length} ecart(s) de structure ignore(s))`
    : `\n${total} derive(s). Chacune est soit a corriger, soit a inscrire dans VOULUS avec sa raison.`);
  if (total > 0) process.exitCode = 1;

  await nav.close(); sm.close(); sd.close();
}
