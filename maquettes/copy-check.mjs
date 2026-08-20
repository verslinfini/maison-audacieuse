// Contrôle de fidélité de la copy : chaque segment de la copy home validée (doc du 20/08, écrans 0 à 8)
// doit se retrouver tel quel dans le texte rendu de la maquette (espaces, apostrophes et flèches
// normalisés, casse conservée). Décisions transverses, Trous à figer et chaque bloc « Notes
// d'intégration » sont hors copy : exclus de l'extraction.
// Usage : node maquettes/copy-check.mjs maquettes/home/a-recit.html [--copy CHEMIN] [--etat avant] [--dump]
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';
const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const fichier = args.find(a => a.endsWith('.html'));
if (!fichier) { console.error('usage : node maquettes/copy-check.mjs <fichier.html> [--copy CHEMIN] [--etat avant] [--dump]'); process.exit(2); }
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
const etat = opt('etat', null);
const dump = args.includes('--dump');
const copyPath = opt('copy', "C:/Users/romai/OneDrive/04 L'univers v2/02 Projets/LMA - Maison Audacieuse/05 Site web/2026.08.20 - Copy home validée écran par écran - LMA.md");

const norm = s => s
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/[\u2019\u2018\u02BC]/g, "'")
  .replace(/[\u00AB\u00BB\u201C\u201D]/g, '"')
  .replace(/[\u00A0\u202F\u2009]/g, ' ')
  .replace(/\u2026/g, '...')
  .replace(/-->/g, ' ')
  .replace(/[→⟶➜⭢]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

// 1. Segments attendus, extraits des écrans validés du doc de copy.
const md = fs.readFileSync(copyPath, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const lignes = md.split(/\r?\n/);
const headingIdx = [];
lignes.forEach((l, i) => { if (/^#\s+\S/.test(l)) headingIdx.push(i); });
headingIdx.push(lignes.length);

// Nombre d'items dans « # Trous à figer avant mise en ligne (consolidé) », pour le rapport.
const mTrous = md.match(/#\s*Trous à figer[\s\S]*/);
const nbTrousCopy = mTrous ? (mTrous[0].match(/^\d+\.\s/gm) || []).length : 0;

const META_EXCLURE = /^(Photo de la ferme plein écran|Frise chronologique graphique|Avant\/après ou plans, crédit|Titre avec.*traité graphiquement|Header transparent)/;
const segments = [];

const pousseParagraphe = (beat, texte) => {
  const seg = { beat, type: 'paragraphe', texte };
  if (norm(texte).toLowerCase() === norm('À ANNECY, QUARTIER DE NOVEL').toLowerCase()) seg.ci = true;
  segments.push(seg);
};

for (let h = 0; h < headingIdx.length - 1; h++) {
  const idxH = headingIdx[h];
  const heading = lignes[idxH].trim();
  const mEcran = heading.match(/^#\s*Écran\s+(\d+)\s*:\s*(.*)$/);
  if (!mEcran) continue; // exclut Décisions transverses, Trous à figer, etc.
  const num = parseInt(mEcran[1], 10);
  let beat = 'Écran ' + num;
  if (num >= 2 && num <= 7) {
    const mt = mEcran[2].match(/^(.*?)\.\s*VALIDÉ(?:\s|$)/);
    if (mt && mt[1].trim()) segments.push({ beat, type: 'titre', texte: mt[1].trim() });
  }
  let skipNotes = false;
  for (let i = idxH + 1; i < headingIdx[h + 1]; i++) {
    const l = lignes[i].trim();
    if (!l) continue;
    if (/^##\s*Notes d.int.gration/i.test(l)) { skipNotes = true; continue; }
    if (/^##\s+/.test(l)) { skipNotes = false; beat = 'Écran ' + num + ' / ' + l.replace(/^##\s+/, '').trim(); continue; }
    if (skipNotes) continue;
    if (/^Libellés seulement,?\s*inchangés\s*:/i.test(l)) {
      l.replace(/^Libellés seulement,?\s*inchangés\s*:\s*/i, '').replace(/\.\s*$/, '')
        .split('·').map(s => s.trim()).filter(Boolean).forEach(t => segments.push({ beat, type: 'pied', texte: t }));
      continue;
    }
    if (/^Libellés\s*:/.test(l)) {
      l.replace(/^Libellés\s*:\s*/, '').replace(/\.\s*$/, '').split('·').forEach(chunk => {
        const c = chunk.split('-->')[0].trim().replace(/^bouton\s+/i, '').replace(/^\[|\]$/g, '');
        if (c) segments.push({ beat, type: 'nav', texte: c });
      });
      continue;
    }
    if (META_EXCLURE.test(l)) continue;
    if (l.includes('812') && /prochain palier/i.test(l)) { segments.push({ beat, type: 'compteur', texte: l }); continue; }
    const mBracket = l.match(/\[([^\]]+)\]/);
    if (mBracket) {
      let bTxt = mBracket[1].trim();
      if (/^champ email Brevo/i.test(bTxt)) bTxt = "Je m'inscris";
      else if (bTxt.includes('-->')) bTxt = bTxt.split('-->')[0].trim();
      const reste = (l.slice(0, mBracket.index) + l.slice(mBracket.index + mBracket[0].length)).trim();
      if (reste) pousseParagraphe(beat, reste);
      segments.push({ beat, type: 'bouton', texte: bTxt });
      continue;
    }
    pousseParagraphe(beat, l);
  }
}

if (dump) {
  console.log(JSON.stringify(segments.map(s => ({ beat: s.beat, type: s.type, texte: s.texte })), null, 2));
  process.exit(0);
}

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
const compteur812Present = texteN.includes('812');
const resultats = segments.map(s => {
  if (s.type === 'compteur') {
    if (etat === 'avant') {
      const absent = !texteN.includes('812') && !texteN.includes(norm('prochain palier'));
      ligneCompteurAbsenteEnAvant = (ligneCompteurAbsenteEnAvant !== false) && absent;
      return { ...s, attendu: false, present: true };
    }
    const parties = ['812', 'coopérateur·ices', 'prochain palier', '1 700'].map(norm);
    return { ...s, present: parties.every(p => tout.includes(p)) };
  }
  if (/\/ La frise$/.test(s.beat) && s.type === 'paragraphe') {
    const t = norm(s.texte);
    if (tout.includes(t)) return { ...s, present: true };
    const mDF = s.texte.match(/^(.+?)\s*:\s*(.+)$/);
    if (mDF) return { ...s, present: tout.includes(norm(mDF[1])) && tout.includes(norm(mDF[2])) };
    return { ...s, present: false };
  }
  const t = s.ci ? norm(s.texte).toLowerCase() : norm(s.texte);
  const cible = s.ci ? tout.toLowerCase() : tout;
  return { ...s, present: cible.includes(t) };
});
const manquants = resultats.filter(r => r.attendu !== false && !r.present);
const rapport = {
  fichier: abs, etat: etat || 'campagne', segmentsAttendus: segments.length, presents: resultats.filter(r => r.present || r.attendu === false).length,
  manquants: manquants.map(m => ({ beat: m.beat, type: m.type, texte: m.texte })),
  trousCopy: nbTrousCopy, trousRendus: rendu.trous, titleRendu: rendu.title,
  compteur812Present, ligneCompteurAbsenteEnAvant,
};
console.log(JSON.stringify(rapport, null, 2));
process.exitCode = manquants.length ? 1 : 0;
