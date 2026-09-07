import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const sharp = require('sharp');

// Les sept vues du batiment sortent d'un telephone tenu a bout de bras dans
// un interieur sombre, sous une bache plastique : chacune porte une dominante
// differente, la fenetre vire au magenta. Un meme traitement leger sur les
// sept leur rend une unite de serie et retire la dominante sans les blanchir.
// Reglage retenu apres comparaison de quatre : desaturation a 72 %, contraste
// leger. Les dessins de Basa et le visuel de synthese n'y passent pas, leurs
// couleurs sont voulues.
const SRC = 'C:/Users/romai/LMA_La Maison Audacieuse/04 COM/01 Photos/2025 Bâtiment';
const DST = process.argv[2];
const PHOTOS = {
  'ferme-rue': 'IMG_20250307_154453.jpg',
  'voute': 'IMG_20250307_154439.jpg',
  'charpente': 'IMG_20250307_154521.jpg',
  'grange': 'IMG_20250307_154617.jpg',
  'charpente-2': 'IMG_20250307_154651.jpg',
  'fenetre': 'IMG_20250307_154434.jpg',
  'porte': 'IMG_20250307_154804.jpg',
};
for (const [nom, src] of Object.entries(PHOTOS)) {
  const cible = path.join(DST, nom + '.webp');
  const avant = fs.existsSync(cible) ? fs.statSync(cible).size : 0;
  await sharp(path.join(SRC, src))
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .modulate({ saturation: .72 })
    .linear(1.08, -10)
    .webp({ quality: 80 })
    .toFile(cible);
  const m = await sharp(cible).metadata();
  console.log(`${(nom + '.webp').padEnd(18)} ${m.width}x${m.height}  ${(avant / 1024).toFixed(0)} -> ${(fs.statSync(cible).size / 1024).toFixed(0)} Ko`);
}
