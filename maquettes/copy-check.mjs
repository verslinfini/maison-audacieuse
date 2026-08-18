// Contrôle de fidélité de la copy : chaque segment de texte de contenu/pages/accueil.md doit se retrouver
// tel quel dans le texte rendu de la maquette (espaces et apostrophes normalisés, casse conservée).
// Usage : node maquettes/copy-check.mjs maquettes/home/a-recit.html [--copy CHEMIN] [--etat avant]
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';
const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const fichier = args.find(a => a.endsWith('.html'));
if (!fichier) { console.error('usage : node maquettes/copy-check.mjs <fichier.html> [--copy CHEMIN] [--etat avant]'); process.exit(2); }
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
const etat = opt('etat', null);
const copyPath = opt('copy', 'C:/Users/romai/dev/maison-audacieuse/contenu/pages/accueil.md');

const norm = s => s
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/[\u2019\u2018\u02BC]/g, "'")
  .replace(/[\u00AB\u00BB\u201C\u201D]/g, '"')
  .replace(/[\u00A0\u202F\u2009]/g, ' ')
  .replace(/\u2026/g, '...')
  .replace(/\s+/g, ' ')
  .trim();

// 1. Segments attendus, extraits de la copy
const md = fs.readFileSync(copyPath, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const lignes = md.split(/\r?\n/);
const debut = lignes.findIndex(l => l.startsWith('## Nav'));
const fin = lignes.findIndex(l => l.startsWith('## Notes de rédaction'));
const corps = lignes.slice(debut, fin < 0 ? undefined : fin);
const IGNORER = /^(Ancre|Niveau de titre|Visuel|Notes intégrateur|Mots|Action|Alt à écrire|Corps|Frise de faits|Point de vigilance|Les deux autres phrases|Total|Barre CTA mobile|Identique, moins)/;
const segments = [];
let beat = 'Nav';
for (let l of corps) {
  l = l.trim();
  if (!l) continue;
  if (l.startsWith('## ')) { beat = l.slice(3); continue; }
  if (l.startsWith('|')) {
    if (/^\|\s*-+/.test(l) || /Libellé/.test(l)) continue;
    const cell = l.split('|')[1].trim().replace(/\s*\(bouton\)\s*$/, '');
    if (cell) segments.push({ beat, type: 'nav', texte: cell });
    continue;
  }
  if (IGNORER.test(l)) continue;
  if (/^Titre :/.test(l)) { const t = l.replace(/^Titre :\s*/, ''); if (t && t !== 'aucun') segments.push({ beat, type: 'titre', texte: t }); continue; }
  if (/^Libellés :/.test(l)) { l.replace(/^Libellés :\s*/, '').replace(/\.$/, '').split('·').map(s => s.trim()).filter(Boolean).forEach(t => segments.push({ beat, type: 'pied', texte: t })); continue; }
  if (/^(Alt image \d|Crédit visible[^:]*) :/.test(l)) { const t = l.replace(/^[^:]+:\s*/, '').replace(/^«\s*|\s*»\.?$/g, ''); if (t) segments.push({ beat, type: l.startsWith('Alt') ? 'alt' : 'credit', texte: t }); continue; }
  if (/\[TROU:/.test(l)) continue;
  if (/^\[[^\]]+\]$/.test(l)) { segments.push({ beat, type: 'bouton', texte: l.slice(1, -1) }); continue; }
  if (/^- /.test(l)) { segments.push({ beat, type: 'liste', texte: l.slice(2) }); continue; }
  segments.push({ beat, type: 'paragraphe', texte: l });
}
const nbTrousCopy = (md.match(/\[TROU:/g) || []).length;

// 2. Texte rendu de la maquette
const abs = path.resolve(fichier);
const url = pathToFileURL(abs).href + (etat ? '?etat=' + etat : '');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'load' });
await page.waitForTimeout(500);
const rendu = await page.evaluate(() => {
  const alts = Array.from(document.images).map(i => i.alt).join('\n');
  const titres = Array.from(document.querySelectorAll('[title]')).map(e => e.getAttribute('title')).join('\n');
  return { texte: document.body.innerText, alts, titres, title: document.title, trous: (document.body.innerText.match(/TROU/g) || []).length };
});
await browser.close();
const texteN = norm(rendu.texte);
const altsN = norm(rendu.alts);
const tout = texteN + ' ' + altsN + ' ' + norm(rendu.titres);

// 3. Comparaison
let ligneCompteurAbsenteEnAvant = null;
const resultats = segments.map(s => {
  let t = norm(s.texte);
  if (/\{\{compteur\}\}/.test(t)) {
    const avecChiffre = t.replace('{{compteur}}', '218');
    if (etat === 'avant') { ligneCompteurAbsenteEnAvant = (ligneCompteurAbsenteEnAvant !== false) && !texteN.includes(avecChiffre); return { ...s, attendu: false, present: true }; }
    t = avecChiffre;
  }
  const cible = s.type === 'alt' ? altsN : tout;
  return { ...s, present: cible.includes(t) };
});
const manquants = resultats.filter(r => r.attendu !== false && !r.present);
const rapport = {
  fichier: abs, etat: etat || 'campagne', segmentsAttendus: segments.length, presents: resultats.filter(r => r.present || r.attendu === false).length,
  manquants: manquants.map(m => ({ beat: m.beat, type: m.type, texte: m.texte })),
  trousCopy: nbTrousCopy, trousRendus: rendu.trous, titleRendu: rendu.title,
  compteur218Present: texteN.includes('218'), ligneCompteurAbsenteEnAvant,
};
console.log(JSON.stringify(rapport, null, 2));
process.exitCode = manquants.length ? 1 : 0;
