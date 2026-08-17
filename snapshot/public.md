# Snapshot public (maison-audacieuse.fr)

## En-tête

Date du snapshot : 2026-08-17
Méthode : REST API publique WordPress (curl, User-Agent navigateur) + Playwright (rendu réel, captures, métriques)
Accès : A (public, aucune authentification)
Domaine canonique testé : https://www.maison-audacieuse.fr (www ; l'apex redirige en 301 selon la consigne, non re-testé ici)
Hébergeur observé : o2switch (en-tête Server : o2switch-PowerBoost-v3), protection Tiger Protect contournée via User-Agent navigateur sur tous les appels curl

## Inventaire des pages

Source : `GET /wp-json/wp/v2/pages?per_page=100&_fields=id,slug,link,title,modified,parent,menu_order` (HTTP 200, 6 pages, toutes parent=0, menu_order=0)

| id | slug | titre | modifié | URL |
|---|---|---|---|---|
| 1901 | la-maison-audacieuse | Accueil | 2026-06-09T09:17:23 | https://www.maison-audacieuse.fr/ |
| 1967 | contacts | Contacts | 2026-06-09T09:41:35 | https://www.maison-audacieuse.fr/contacts/ |
| 1970 | lequipe-projet | L'équipe projet | 2026-06-15T08:55:39 | https://www.maison-audacieuse.fr/lequipe-projet/ |
| 1973 | le-projet-architectural | Le projet architectural | 2026-06-09T09:31:22 | https://www.maison-audacieuse.fr/le-projet-architectural/ |
| 1975 | les-medias | Les médias | 2026-06-09T09:36:18 | https://www.maison-audacieuse.fr/les-medias/ |
| 1980 | politique-de-confidentialite-mentions-legales | Politique de confidentialité – Mentions légales | 2026-06-09T09:45:51 | https://www.maison-audacieuse.fr/politique-de-confidentialite-mentions-legales/ |

Page la plus récemment modifiée : lequipe-projet (15/06). Les 5 autres datent toutes du 09/06, probablement une mise à jour groupée.

## Inventaire des articles

Source : `GET /wp-json/wp/v2/posts?per_page=100&_fields=...` (HTTP 200)

| id | slug | titre | modifié | URL |
|---|---|---|---|---|
| 1872 | soutenir | soutenir | 2026-02-19T17:12:25 | https://www.maison-audacieuse.fr/2026/02/19/soutenir/ |

Un seul article publié. Il n'apparaît dans aucun des menus visibles de la home (ni header, ni footer, ni mobile) : probablement un contenu orphelin, accessible seulement par URL directe ou par le sitemap.

## Réglages publics (GET /wp-json/)

| Champ | Valeur |
|---|---|
| name | La Maison Audacieuse - Annecy |
| description | Tiers lieu pour les femmes et l'égalité |
| url / home | https://www.maison-audacieuse.fr |
| show_on_front | page (page statique) |
| page_on_front | 1901 (= la-maison-audacieuse, cohérent avec l'inventaire) |
| page_for_posts | 0 (pas de page dédiée aux articles) |
| gmt_offset | 0 |
| timezone_string | (vide, pas de fuseau nommé exposé, réglage probable en décalage UTC manuel) |
| site_logo (ID média) | 1945 |

Espaces de noms exposés par l'API (indicateur de la stack de plugins active) : oembed, jetpack-boost-ds, litespeed/v1 et v3, mailin/v1 (Brevo/Sendinblue), redirection/v1, yoast/v1, jetpack-boost/v1, jetpack/v4 (+ explat), my-jetpack/v1, kb-mailerlite, kb-getresponse, kb-fluentcrm, kbp, kb-lottieanimation, kb-vector, kb-design-library, kb-image-picker (suite Kadence Blocks Pro), hub-connector, forminator/v1, wpmudev_pcs/v1, wpforms/v1, wp/v2. Thème identifié par les classes CSS de la home : Kadence.

## Menus visibles (extraits du HTML de la home)

Menu principal (header, 5 liens) :
Accueil → /, Le projet architectural → /le-projet-architectural/, L'équipe projet → /lequipe-projet/, Les médias → /les-medias/, Contacts → /contacts/

Menu pied de page (footer, 6 liens) :
mêmes 5 liens que le header, plus Politique de confidentialité – Mentions légales → /politique-de-confidentialite-mentions-legales/

Menu mobile (drawer, 5 liens) :
Le projet architectural, L'équipe projet, Les médias, Contacts, plus un lien personnalisé "Inscription newsletter" → /contacts#newsletter/ (absent du header et du footer desktop)

Les 6 pages de l'inventaire REST sont donc toutes rattachées à au moins un menu visible.

## En-têtes HTTP de la home (curl -sI, UA navigateur)

Présents :

| En-tête | Valeur |
|---|---|
| Status | HTTP/1.1 200 OK |
| Content-Type | text/html; charset=UTF-8 |
| Content-Length | 252858 |
| Vary | Accept-Encoding |
| Cache-Control | max-age=0, no-cache, s-maxage=10 |
| ETag | "16152-1786938800;;;" |
| Server | o2switch-PowerBoost-v3 |
| x-jetpack-boost-cache | miss |
| x-lsadc-cache | hit |
| x-dns-prefetch-control | on |
| link | 10 en-têtes `rel=preload` (CSS/JS LiteSpeed combinés) + `rel="https://api.w.org/"` + shortlink |

Manquants (aucun des en-têtes de sécurité usuels n'est présent) :

Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-XSS-Protection

Le HTML est servi en HTTPS mais sans aucune couche d'en-têtes de sécurité applicative : à considérer pour un premier lot de durcissement.

## Sitemap

`GET /sitemap_index.xml` → HTTP 200, généré par Yoast SEO, 5 sous-sitemaps :

| Sitemap | Dernière modification |
|---|---|
| post-sitemap.xml | 2026-02-19T17:12:25+00:00 |
| page-sitemap.xml | 2026-06-15T08:55:39+00:00 |
| cx_widget-sitemap.xml | 2026-06-09T08:44:10+00:00 |
| category-sitemap.xml | 2026-02-19T17:12:25+00:00 |
| author-sitemap.xml | 2026-04-04T07:46:19+00:00 |

Note de méthode : seul l'index a été récolté (les 5 sous-sitemaps n'ont pas été dépouillés individuellement, pour limiter le nombre d'appels au serveur). Le contenu réel des pages/articles est déjà couvert par l'inventaire REST ci-dessus. `cx_widget-sitemap.xml` est un sitemap de type inhabituel, probablement généré par un des plugins Kadence ou par hub-connector ; non investigué plus avant.

## robots.txt

```
# START WPFORMS BLOCK
User-agent: *
Disallow: /wp-content/uploads/wpforms/
# END WPFORMS BLOCK

# START YOAST BLOCK
User-agent: *
Disallow:

Sitemap: https://www.maison-audacieuse.fr/sitemap_index.xml
# END YOAST BLOCK
```

Crawl entièrement ouvert à part le dossier d'uploads WPForms (fichiers déposés via formulaires). Sitemap correctement déclaré.

## Performance de la home (Playwright, 1440x900, réseau par défaut du runner)

| Métrique | Valeur |
|---|---|
| TTFB | 117 ms |
| DOMContentLoaded | 570 ms |
| Load | 1011 ms |
| First Paint / First Contentful Paint | 1248 ms |
| LCP (approximatif, via PerformanceObserver bufferisé) | ≈ 1248 ms, élément DIV (image de fond hero1.jpg) |
| CLS | 0 (aucun layout-shift détecté sur la fenêtre de mesure) |
| Requêtes réseau (doc + ressources statiques) | 46 |
| Poids transféré approximatif | ≈ 538 Ko (compressé) / ≈ 1141 Ko (décodé) |
| Erreurs console | 6 (voir Anomalies) |

Note de méthode : `performance.getEntriesByType('largest-contentful-paint')` renvoyait un tableau vide après le chargement complet (possible artefact du contexte Playwright/CDP) ; la valeur LCP ci-dessus a été obtenue via un `PerformanceObserver` rétroactif avec `buffered: true`, ce qui a fonctionné. Elle est identique au FCP, cohérent avec un hero en image de fond visible dès le premier rendu.

## Captures (`snapshot/captures/`)

12 fichiers, 6 pages × 2 formats, pleine page :

| Page | Desktop (1440×900) | Mobile (375×812) |
|---|---|---|
| la-maison-audacieuse (home) | la-maison-audacieuse-desktop.png (1,29 Mo) | la-maison-audacieuse-mobile.png (933 Ko) |
| contacts | contacts-desktop.png (248 Ko) | contacts-mobile.png (155 Ko) |
| lequipe-projet | lequipe-projet-desktop.png (724 Ko) | lequipe-projet-mobile.png (573 Ko) |
| le-projet-architectural | le-projet-architectural-desktop.png (872 Ko) | le-projet-architectural-mobile.png (640 Ko) |
| les-medias | les-medias-desktop.png (533 Ko) | les-medias-mobile.png (286 Ko) |
| politique-de-confidentialite-mentions-legales | politique-de-confidentialite-mentions-legales-desktop.png (582 Ko) | politique-de-confidentialite-mentions-legales-mobile.png (402 Ko) |

Les 12 captures ont réussi, aucun échec de navigation.

## Anomalies constatées

Anomalie transversale la plus significative : le pipeline d'optimisation d'images/CSS mod_pagespeed (LiteSpeed) échoue systématiquement. Sur 4 des 6 pages, une ou plusieurs variantes générées automatiquement (motif `x<nom>.<ext>.pagespeed.ic.<hash>.<ext|webp>` pour les images, `pagespeed.cf.<hash>.css` pour le CSS combiné) renvoient 404. Le navigateur se rabat alors sur l'original, avec parfois un double appel réseau (variante 404 puis original). Sur le-projet-architectural, une feuille CSS optimisée est en plus préchargée (`rel=preload`) puis jamais utilisée puisqu'elle échoue, ce qui déclenche un avertissement navigateur supplémentaire.

Erreurs console par page (niveau error uniquement, hors les 2 avertissements "Deprecated API for given entry type" sur la home qui sont un artefact du script de mesure injecté pour ce snapshot, pas une erreur du site) :

Home (/) : 6 erreurs. `newsletter.png` (404, uploads/2026/05), `xdessin-691x1024.jpg.pagespeed.ic.*.jpg` (404, demandé 3 fois), `xlogo-accueil-300x92.png.pagespeed.ic.*.png` (404), `xplan-petit-1-300x146.png.pagespeed.ic.*.jpg` (404).

Contacts : 2 erreurs. `newsletter.png` (404, récurrent) et `bat.bing.com/bat.js` en `ERR_CONNECTION_RESET` (pixel Microsoft/Bing Ads qui ne charge pas, tracking publicitaire potentiellement impacté). Egalement 2 avertissements Datadog Browser SDK ("loaded more than once", "no storage available") émis par le script tiers HelloAsso (`dcac850.js`) intégré sur la page, hors contrôle direct du site.

Lequipe-projet : 4 erreurs. `xlogo-accueil.png.pagespeed.ic.*.webp` (404, demandé 3 fois) et `newsletter.png` (404).

Le-projet-architectural : 3 erreurs. Variante CSS `A.*.pagespeed.cf.*.css` (404), `newsletter.png` (404), `xEsquisse-3-768x543.png.pagespeed.ic.*.png` (404). Plus 1 avertissement de preload inutilisé (conséquence directe du 404 CSS ci-dessus).

Les-medias : 5 erreurs, la page la plus touchée. `xarticle-_05-768x778.jpg.pagespeed.ic.*.webp` (404, demandé 2 fois), `xarticle-_04-296x300.jpg.pagespeed.ic.*.webp` (404), `reportage_tv.png` (404, uploads/2026/04, image source manquante, pas une variante pagespeed), `newsletter.png` (404).

Politique de confidentialité – Mentions légales : 1 erreur seulement, `newsletter.png` (404). Page la plus propre du site.

Constat récurrent sur toutes les pages : `wp-content/uploads/2026/05/newsletter.png` est appelé et renvoie 404 sur les 6 pages sans exception. Vu la récurrence (probablement un widget ou bloc global, footer ou zone newsletter), c'est le correctif le plus rentable si un nettoyage est engagé.

Aucun contenu mixte (http:// sur une page https) détecté dans le HTML de la home. Pas de balise `<meta name="generator">` WordPress exposée (probablement retirée par Yoast ou le thème).

Aucune commande n'a échoué : les 7 appels curl (pages, posts, wp-json racine, HTML home, headers home, sitemap index, robots.txt) ont tous répondu HTTP 200 du premier coup, sans blocage Tiger Protect. Les 6 navigations Playwright et les 12 captures ont toutes abouti.
