// Deploie le site sur o2switch : construit, sauvegarde l'existant, envoie,
// verifie, et sait revenir en arriere.
//
//   node deploie.mjs              vers la preproduction
//   node deploie.mjs --retour     restaure la derniere sauvegarde
//   node deploie.mjs --liste      liste les sauvegardes du serveur
//
// Aucune dependance. Les coordonnees du serveur viennent du coffre local
// (~/.secrets/maison-audacieuse/.env), jamais du depot : ce fichier est public.
//
// Pourquoi pas GitHub Actions : le SSH d'o2switch est filtre par IP et les
// serveurs de GitHub changent d'adresse en permanence. Les contourner
// demanderait de confier un jeton d'API cPanel a un tiers, pour un gain de
// confort nul sur un site qu'on publie a la demande. Arbitrage du 07/09/2026.

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const RACINE = dirname(fileURLToPath(import.meta.url));
const COFFRE = join(homedir(), '.secrets', 'maison-audacieuse', '.env');
// Horodatage a la seconde, en UTC : a la minute, deux deploiements rapproches
// ecrasaient la meme sauvegarde, et le second effacait l'etat auquel on voulait
// revenir. C'est exactement le moment ou l'on en a besoin.
const HORODATAGE = new Date().toISOString().slice(0, 19).replace(/[-:T]/g, '').replace(/(\d{8})/, '$1-');

const RETOUR = process.argv.includes('--retour');
const LISTE = process.argv.includes('--liste');

// Ce qui appartient au serveur et ne doit jamais partir avec un --delete :
// la protection par mot de passe, la validation du certificat, les CGI.
const INTOUCHABLES = ['.htaccess', '.well-known', 'cgi-bin'];

/* ------------------------------------------------------------------ coffre */

function coffre() {
  if (!existsSync(COFFRE)) {
    throw new Error(`coffre introuvable : ${COFFRE}\nLance d'abord le wizard d'acces.`);
  }
  const env = {};
  for (const ligne of readFileSync(COFFRE, 'utf8').split(/\r?\n/)) {
    const m = ligne.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  for (const cle of ['O2_HOST', 'O2_USER', 'O2_SSH_KEY_PATH', 'O2_PATH_PREPROD']) {
    if (!env[cle]) throw new Error(`${cle} manque dans le coffre.`);
  }
  return env;
}

// Le coffre peut porter un chemin au format Git Bash (/c/Users/...), que le ssh
// de Windows ne sait pas ouvrir. On le ramene a la forme C:/Users/...
const normaliser = (p) => p.replace(/^\/([A-Za-z])\//, (_, l) => l.toUpperCase() + ':/');

/* -------------------------------------------------------------------- outils */

const env = coffre();
const CLE = normaliser(env.O2_SSH_KEY_PATH);
const CIBLE = env.O2_PATH_PREPROD;
const HOTE = `${env.O2_USER}@${env.O2_HOST}`;
const PORT = env.O2_PORT || '22';
const SAUVEGARDES = 'sauvegardes-site';

// scp veut -P majuscule la ou ssh veut -p. D'ou deux listes plutot qu'un filtre.
const BASE_SSH = ['-i', CLE, '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=accept-new'];
const OPTIONS_SSH = [...BASE_SSH, '-p', PORT];
const OPTIONS_SCP = [...BASE_SSH, '-P', PORT];

/** Execute une commande sur le serveur. Renvoie sa sortie, leve si elle echoue. */
function distant(commande, silencieux = false) {
  const sortie = execFileSync('ssh', [...OPTIONS_SSH, HOTE, commande], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  if (!silencieux && sortie.trim()) console.log(sortie.trimEnd());
  return sortie;
}

function local(commande, args, options = {}) {
  return execFileSync(commande, args, { encoding: 'utf8', cwd: RACINE, ...options });
}

const dire = (s) => console.log(s);
const etape = (n, s) => console.log(`\n[${n}] ${s}`);

/* ------------------------------------------------------------------ lecture */

if (LISTE) {
  dire(`Sauvegardes sur le serveur (~/${SAUVEGARDES}/) :\n`);
  distant(`ls -lh ~/${SAUVEGARDES}/*.tgz 2>/dev/null | awk '{print "  " $9 "  " $5}' || echo "  aucune"`);
  process.exit(0);
}

/* ------------------------------------------------------------------- retour */

if (RETOUR) {
  const derniere = distant(`ls -1t ~/${SAUVEGARDES}/*.tgz 2>/dev/null | head -1`, true).trim();
  if (!derniere) {
    console.error('Aucune sauvegarde a restaurer.');
    process.exit(1);
  }
  etape(1, `restauration de ${derniere.split('/').pop()}`);
  const gardes = INTOUCHABLES.map((f) => `--exclude='${f}'`).join(' ');
  distant([
    `set -e`,
    `TMP=$(mktemp -d)`,
    `tar xzf "${derniere}" -C "$TMP"`,
    `rsync -a --delete ${gardes} "$TMP"/ "${CIBLE}/"`,
    `rm -rf "$TMP"`,
    `echo "  restaure : $(ls -1 "${CIBLE}" | wc -l) entrees a la racine"`,
  ].join(' && '));
  dire('\nRetour arriere fait.');
  process.exit(0);
}

/* ---------------------------------------------------------------- deploiement */

dire(`Cible : preproduction  ${env.O2_HOST}:${CIBLE}`);

// 1. L'arbre git doit etre propre : deployer du travail non commite, c'est
// deployer quelque chose qu'on ne saura pas reproduire.
etape(1, 'etat du depot');
const sale = local('git', ['status', '--porcelain']).trim();
if (sale) {
  dire('  Attention : des changements ne sont pas commites.');
  for (const l of sale.split('\n').slice(0, 8)) dire(`    ${l}`);
} else {
  dire(`  propre, sur ${local('git', ['rev-parse', '--short', 'HEAD']).trim()}`);
}

// 2. Construction. La recette porte noindex et un robots.txt bloquant.
etape(2, 'construction');
dire(local('node', ['build.mjs']).trimEnd());

const DIST = join(RACINE, 'dist');
if (!existsSync(join(DIST, 'index.html'))) throw new Error('dist/index.html absent apres construction.');

// 3. Sauvegarde de ce qui est en ligne, avant d'y toucher.
etape(3, 'sauvegarde de l existant');
distant([
  `mkdir -p ~/${SAUVEGARDES}`,
  `if [ -n "$(ls -A '${CIBLE}' 2>/dev/null)" ]; then` +
  ` tar czf ~/${SAUVEGARDES}/${HORODATAGE}.tgz -C '${CIBLE}' . 2>/dev/null;` +
  ` echo "  sauvegarde : ${HORODATAGE}.tgz ($(du -h ~/${SAUVEGARDES}/${HORODATAGE}.tgz | cut -f1))";` +
  ` else echo "  rien a sauvegarder, la cible est vide"; fi`,
  // On ne garde que les dix dernieres : au dela, c'est du poids sans usage.
  `ls -1t ~/${SAUVEGARDES}/*.tgz 2>/dev/null | tail -n +11 | xargs -r rm -f`,
].join(' && '));

// 4. Envoi. Une archive plutot qu'un rsync : rsync n'existe pas sous Windows,
// il existe sur le serveur, donc la synchronisation se fait la-bas.
etape(4, 'envoi');
// Chemins relatifs : le tar de Git Bash lit « C:\... » comme un hote distant
// et refuse d'ecrire. L'archive nait donc dans le depot, et en repart aussitot.
const ARCHIVE = '.envoi.tgz';
local('tar', ['czf', ARCHIVE, '-C', 'dist', '.']);
local('scp', [...OPTIONS_SCP, ARCHIVE, `${HOTE}:~/site-en-cours.tgz`], { stdio: ['ignore', 'pipe', 'pipe'] });
rmSync(join(RACINE, ARCHIVE), { force: true });
dire('  archive envoyee');

// 5. Extraction puis synchronisation, avec --delete pour que le serveur soit
// le miroir exact de dist/, sauf ce qui appartient au serveur.
etape(5, 'mise en place');
const gardes = INTOUCHABLES.map((f) => `--exclude='${f}'`).join(' ');
distant([
  `set -e`,
  `TMP=$(mktemp -d)`,
  `tar xzf ~/site-en-cours.tgz -C "$TMP"`,
  `rsync -a --delete ${gardes} "$TMP"/ '${CIBLE}/'`,
  `rm -rf "$TMP" ~/site-en-cours.tgz`,
  `echo "  $(find '${CIBLE}' -type f | wc -l) fichiers en place"`,
].join(' && '));

// 6. Controle. On compare les empreintes plutot que d'appeler le site en HTTP :
// la preproduction demande un mot de passe, que ce script n'a pas et ne doit
// pas avoir. Les empreintes disent la verite sans secret.
etape(6, 'controle');
const exclusions = INTOUCHABLES.map((f) => `-not -path './${f}*'`).join(' ');

// Deux dialectes de sha256sum : Git Bash ecrit « hash *./x » (etoile du mode
// binaire, un espace), le serveur « hash  ./x » (deux espaces). Meme contenu,
// lignes differentes. On retire l'etoile puis on remet un espace unique, sinon
// deux copies identiques donnent deux empreintes differentes.
const EMPREINTE = (dossier) =>
  `cd '${dossier}' && find . -type f ${exclusions} -exec sha256sum {} +`
  + ` | tr -d '*' | awk '{h=$1; $1=""; sub(/^ +/, ""); print h " " $0}'`
  + ` | sort -k2 | sha256sum | cut -c1-16`;

const attendu = local('bash', ['-c', EMPREINTE('dist')]).trim();
const obtenu = distant(EMPREINTE(CIBLE), true).trim();

dire(`  empreinte locale   ${attendu}`);
dire(`  empreinte distante ${obtenu}`);

if (attendu !== obtenu) {
  console.error('\nECART : le serveur ne sert pas ce qui a ete construit.');
  console.error('Retour arriere : node deploie.mjs --retour');
  process.exitCode = 1;
} else {
  // Le site doit aussi repondre. 401 est la bonne reponse d'une preproduction
  // protegee : elle prouve que le serveur est vivant et que la porte est fermee.
  const code = distant(`curl -s -o /dev/null -w '%{http_code}' https://preprod.maison-audacieuse.fr/ --max-time 15`, true).trim();
  dire(`  reponse HTTP ${code}${code === '401' ? ' (protege, comme attendu)' : ''}`);
  if (code !== '401') {
    console.error('\nATTENTION : la preproduction ne demande plus de mot de passe.');
    process.exitCode = 1;
  } else {
    dire('\nDeploiement conforme.');
  }
}
