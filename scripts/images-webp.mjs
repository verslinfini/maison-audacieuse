// Convertit les images du site en WebP et met a jour les references.
//
//   node scripts/images-webp.mjs --essai    dit ce qu'il ferait, n'ecrit rien
//   node scripts/images-webp.mjs            convertit et reecrit les pages
//
// Pourquoi. Le site sert 3,4 Mo d'images sur onze pages. En WebP a qualite
// 80, le meme jeu pese 1,8 Mo, soit 47 % de moins, sans difference visible.
// Le format est lu par tous les navigateurs depuis 2020, Safari compris :
// un repli en <picture> ajouterait du markup pour un cas qui n'existe plus.
//
// Le script ne touche qu'aux images REFERENCEES par une page. Une image que
// personne n'appelle n'est pas convertie, elle est signalee : c'est un
// meilleur signal que de la convertir en silence.

import { readFileSync, writeFileSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const sharp = require('sharp');

const RACINE = dirname(dirname(fileURLToPath(import.meta.url)));
const IMG = join(RACINE, 'src', 'assets', 'img');
const ESSAI = process.argv.includes('--essai');

// Les fichiers ou une image peut etre appelee.
const sources = [];
for (const [dossier, motif] of [[join(RACINE, 'src', 'pages'), /\.html$/], [join(RACINE, 'src', 'styles'), /\.css$/],
  [join(RACINE, 'src', 'partials'), /\.html$/], [join(RACINE, 'src'), /^gabarit\.html$/]]) {
  for (const f of readdirSync(dossier)) {
    if (motif.test(f) && statSync(join(dossier, f)).isFile()) sources.push(join(dossier, f));
  }
}

const textes = new Map(sources.map((f) => [f, readFileSync(f, 'utf8')]));
const appelee = (nom) => [...textes.values()].some((t) => t.includes(nom));

const images = readdirSync(IMG).filter((f) => /\.(jpe?g|png)$/i.test(f));
const aConvertir = images.filter((f) => appelee(f));
const orphelines = images.filter((f) => !appelee(f));

let avant = 0, apres = 0;
for (const f of aConvertir) {
  const source = join(IMG, f);
  const cible = join(IMG, basename(f, extname(f)) + '.webp');
  const poids = statSync(source).size;
  const buffer = await sharp(source).webp({ quality: 80 }).toBuffer();
  avant += poids; apres += buffer.length;
  console.log(`${f.padEnd(26)} ${(poids / 1024).toFixed(0).padStart(5)} Ko -> ${(buffer.length / 1024).toFixed(0).padStart(5)} Ko`);
  if (ESSAI) continue;
  writeFileSync(cible, buffer);
  unlinkSync(source);
  for (const [fichier, texte] of textes) {
    if (!texte.includes(f)) continue;
    textes.set(fichier, texte.replaceAll(f, basename(cible)));
  }
}

if (!ESSAI) {
  for (const [fichier, texte] of textes) {
    if (texte !== readFileSync(fichier, 'utf8')) writeFileSync(fichier, texte, 'utf8');
  }
}

console.log(`\n${aConvertir.length} image(s) : ${(avant / 1024).toFixed(0)} Ko -> ${(apres / 1024).toFixed(0)} Ko`
  + (avant ? `, ${(100 - apres / avant * 100).toFixed(0)} % de moins` : ''));

if (orphelines.length) {
  const poids = orphelines.reduce((s, f) => s + statSync(join(IMG, f)).size, 0);
  console.log(`\n${orphelines.length} image(s) qu'aucune page n'appelle, ${(poids / 1024).toFixed(0)} Ko, laissees telles quelles :`);
  for (const f of orphelines) console.log(`  ${f.padEnd(26)} ${(statSync(join(IMG, f)).size / 1024).toFixed(0)} Ko`);
  console.log('  Les retirer du depot allegerait le deploiement d autant.');
}

if (ESSAI) console.log('\nessai : rien n a ete ecrit.');
