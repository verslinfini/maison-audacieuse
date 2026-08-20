// Vérification autonome d'une maquette HTML (Playwright global, sans le navigateur MCP partagé).
// Usage : node maquettes/verif.mjs maquettes/home/a-recit.html [--etat avant] [--out DIR]
// Sorties : captures PNG (pleine page + premier écran) à 1440 et 375, rapport JSON sur stdout et dans DIR.
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';
const require = createRequire('C:/Users/romai/AppData/Roaming/npm/node_modules/');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const fichier = args.find(a => a.endsWith('.html') || a.startsWith('http'));
if (!fichier) { console.error('usage : node maquettes/verif.mjs <fichier.html> [--etat avant] [--out DIR]'); process.exit(2); }
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
const etat = opt('etat', null);
const distant = fichier.startsWith('http');
const abs = distant ? fichier : path.resolve(fichier);
const base = (distant ? fichier.replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/gi, '-').replace(/-+$/, '') : path.basename(abs, '.html')) + (etat ? '-' + etat : '');
const out = path.resolve(opt('out', distant ? path.join('maquettes', '_verif', base) : path.join(path.dirname(abs), '..', '_verif', base)));
fs.mkdirSync(out, { recursive: true });
const url = (distant ? fichier : pathToFileURL(abs).href) + (etat ? '?etat=' + etat : '');

const VIEWPORTS = [{ w: 1440, h: 900 }, { w: 375, h: 812 }];
const rapport = { fichier: abs, url, viewports: {} };

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const console_ = [], externes = [], echecs = [], erreursPage = [];
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) console_.push(m.type() + ' : ' + m.text()); });
  page.on('pageerror', e => erreursPage.push(String(e)));
  page.on('request', r => { if (!r.url().startsWith('file://') && !(distant && r.url().startsWith(new URL(fichier).origin))) externes.push(r.url()); });
  page.on('requestfailed', r => echecs.push(r.url() + ' : ' + (r.failure() && r.failure().errorText)));
  page.on('response', r => { if (r.status() >= 400) echecs.push(r.url() + ' : ' + r.status()); });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(800);
  // Force le chargement des images lazy et les animations liées au défilement : on parcourt la page.
  await page.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(out, base + '-' + vp.w + '-fold.png') });
  await page.screenshot({ path: path.join(out, base + '-' + vp.w + '-full.png'), fullPage: true });

  const mesures = await page.evaluate(() => {
    const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const parse = s => { const m = s && s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number); return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 }; };
    const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
    const visible = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0'; };
    const fond = el => { let e = el; while (e && e !== document.documentElement) { const cs = getComputedStyle(e); if (cs.backgroundImage && cs.backgroundImage !== 'none') return { image: true }; const c = parse(cs.backgroundColor); if (c && c.a >= 0.99) return { rgb: c.rgb }; e = e.parentElement; } const c = parse(getComputedStyle(document.body).backgroundColor); return c && c.a >= 0.99 ? { rgb: c.rgb } : { rgb: [255, 255, 255] }; };
    const desc = el => (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + ' « ' + (el.textContent || '').trim().slice(0, 40) + ' »');
    // Contraste
    const contrastes = [];
    for (const el of document.querySelectorAll('p, li, a, h1, h2, h3, h4, h5, h6, button, span, small, figcaption, label, dt, dd, td, th')) {
      if (!visible(el)) continue;
      const texte = Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('');
      if (!texte) continue;
      const cs = getComputedStyle(el); const c = parse(cs.color); if (!c) continue;
      const f = fond(el); if (f.image) { contrastes.push({ el: desc(el), ratio: null, note: 'sur image, à juger sur capture' }); continue; }
      const taille = parseFloat(cs.fontSize); const gras = parseInt(cs.fontWeight) >= 700;
      const large = taille >= 24 || (taille >= 18.66 && gras);
      const r = ratio(c.rgb, f.rgb); const seuil = large ? 3 : 4.5;
      if (r < seuil) contrastes.push({ el: desc(el), ratio: Math.round(r * 100) / 100, seuil, couleur: cs.color, fond: 'rgb(' + f.rgb.join(',') + ')' });
    }
    // Débordement horizontal
    const largeur = document.documentElement.scrollWidth, ecran = window.innerWidth;
    const debordent = [];
    if (largeur > ecran + 1) for (const el of document.querySelectorAll('body *')) { const r = el.getBoundingClientRect(); if (r.right > ecran + 1 && r.width > 0) { debordent.push(desc(el)); if (debordent.length >= 10) break; } }
    // Cibles tactiles
    const petites = [];
    for (const el of document.querySelectorAll('a, button, [role=button], input, select, textarea, summary')) { if (!visible(el)) continue; const r = el.getBoundingClientRect(); if (r.width < 44 || r.height < 44) petites.push(desc(el) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); }
    // Typo interdite
    const t = document.body.innerText || '';
    const cadratins = (t.match(/\u2014/g) || []).length; const exclam = (t.match(/!/g) || []).length;
    const ctxCad = []; let i = -1; while ((i = t.indexOf('\u2014', i + 1)) >= 0 && ctxCad.length < 5) ctxCad.push(t.slice(Math.max(0, i - 30), i + 30).replace(/\s+/g, ' '));
    const ctxEx = []; i = -1; while ((i = t.indexOf('!', i + 1)) >= 0 && ctxEx.length < 5) ctxEx.push(t.slice(Math.max(0, i - 30), i + 30).replace(/\s+/g, ' '));
    // Titres
    const titres = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => h.tagName + ' ' + (h.textContent || '').trim().slice(0, 60));
    let saut = false; let prev = 0; for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) { const n = +h.tagName[1]; if (prev && n > prev + 1) saut = true; prev = n; }
    const robots = document.querySelector('meta[name=robots]'); const vpm = document.querySelector('meta[name=viewport]');
    const imgs = Array.from(document.images).map(im => ({ src: (im.getAttribute('src') || '').slice(-50), alt: im.alt, w: im.getAttribute('width'), h: im.getAttribute('height'), lazy: im.loading, ok: im.complete && im.naturalWidth > 0 }));
    return {
      lang: document.documentElement.lang, title: document.title, robots: robots && robots.content, viewport: vpm && vpm.content,
      h1: document.querySelectorAll('h1').length, titres, sautDeNiveau: saut,
      largeurPage: largeur, largeurEcran: ecran, debordent,
      contrastesInsuffisants: contrastes.filter(c => c.ratio !== null), textesSurImage: contrastes.filter(c => c.ratio === null).length,
      ciblesPetites: petites.slice(0, 15), nbCiblesPetites: petites.length,
      cadratins, contexteCadratins: ctxCad, exclamations: exclam, contexteExclamations: ctxEx,
      polices: { onest: document.fonts.check('16px Onest'), meow: document.fonts.check('16px "Meow Script"') },
      images: imgs, imagesCassees: imgs.filter(x => !x.ok).length, imagesSansAlt: imgs.filter(x => !x.alt).length, imagesSansDimensions: imgs.filter(x => !x.w || !x.h).length,
      texteCompteurExemple: t.includes('812'),
      liensNus: Array.from(document.querySelectorAll('a[href="#"]')).length,
    };
  });
  // Parcours clavier jusqu'au CTA principal
  await page.evaluate(() => window.scrollTo(0, 0));
  const parcours = [];
  let ctaIndex = null;
  for (let k = 1; k <= 40; k++) {
    await page.keyboard.press('Tab');
    const f = await page.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return null; const cs = getComputedStyle(a); return { tag: a.tagName.toLowerCase(), texte: (a.textContent || a.getAttribute('aria-label') || '').trim().slice(0, 40), outline: cs.outlineStyle + ' ' + cs.outlineWidth, boxShadow: cs.boxShadow !== 'none' }; });
    parcours.push(f);
    if (f && /je prends ma part/i.test(f.texte) && ctaIndex === null) { ctaIndex = k; }
    if (ctaIndex !== null && k >= ctaIndex + 2) break;
  }
  const focusInvisible = parcours.filter(f => f && f.outline.startsWith('none') && !f.boxShadow).length;
  rapport.viewports[vp.w] = { console: console_, erreursPage, requetesExternes: externes, requetesEnEchec: echecs, ...mesures, tabJusquAuCta: ctaIndex, focusSansIndicateurVisible: focusInvisible, parcoursTab: parcours.slice(0, 12).map(f => f && (f.tag + ' « ' + f.texte + ' »')) };
  await ctx.close();
}
await browser.close();
fs.writeFileSync(path.join(out, 'rapport.json'), JSON.stringify(rapport, null, 2));
console.log(JSON.stringify(rapport, null, 2));
console.error('captures et rapport dans ' + out);
