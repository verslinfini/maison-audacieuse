Catalogue des instances de blocs Kadence clonables sur maison-audacieuse.fr, en vue de la reconstruction de la home en page privée. Thème Kadence 1.5.1, Kadence Blocks LIBRE 3.7.9.1, Pro absent. Établi le 19/08/2026 depuis le pull du 18/08/2026.

Clé de lecture : chaque `uniqueID` commence par l'ID de la page WordPress qui le porte (ex. `1901_...` vit sur la home actuelle, ID 1901).

## Pages couvertes

| Slug | ID page | Fichier (`contenu/blocs/`) | Lignes | Modifié (WP) | sha256 (début) |
|---|---|---|---|---|---|
| la-maison-audacieuse | 1901 | la-maison-audacieuse.blocks.html | 456 | 2026-06-09T09:17:23 | b72cca0b8b49… |
| contacts | 1967 | contacts.blocks.html | 68 | 2026-06-09T09:41:35 | b78b16d9f1dd… |
| lequipe-projet | 1970 | lequipe-projet.blocks.html | 370 | 2026-06-15T08:55:39 | 97fba24f58f0… |
| le-projet-architectural | 1973 | le-projet-architectural.blocks.html | 292 | 2026-06-09T09:31:22 | b353c7993710… |
| les-medias | 1975 | les-medias.blocks.html | 116 | 2026-08-17T14:53:39 | d77cfe45ce34… |
| politique-de-confidentialite-mentions-legales | 1980 | politique-de-confidentialite-mentions-legales.blocks.html | 190 | 2026-06-09T09:45:51 | 20b09351d19e… |

Pull effectué le 18/08/2026 à 09:39. Avant toute écriture, revérifier le sha256 de la page cible contre `contenu/manifest.json` (`references/contenu-md-vers-wp.md`, section 3) : un jour s'est écoulé depuis ce catalogue, quelqu'un a pu écrire entre-temps.

## 1. Inventaire des blocs par page

| Fichier | Blocs Kadence (compte) | Blocs core WP (compte) | Hors Kadence libre |
|---|---|---|---|
| la-maison-audacieuse.blocks.html | column 58, rowlayout 22, advancedheading 12, image 7, singlebtn 5, advancedbtn 5 | paragraph 44, list 2, list-item 2 | aucun |
| contacts.blocks.html | column 9, advancedheading 6, rowlayout 3 | paragraph 1, social-links 1, social-link 3, shortcode 1 | **brad/border-box 1** |
| le-projet-architectural.blocks.html | column 29, rowlayout 14, advancedheading 14, singlebtn 1, advancedbtn 1, advancedgallery 1 | paragraph 33 | aucun (advancedgallery à vérifier, voir plus bas) |
| lequipe-projet.blocks.html | column 52, advancedheading 36, rowlayout 23, image 12, singlebtn 3, advancedbtn 3 | paragraph 3 | aucun |
| les-medias.blocks.html | column 15, rowlayout 8, advancedheading 8, singlebtn 1, advancedbtn 1, advancedgallery 1 | paragraph 6, video 1 | aucun (advancedgallery à vérifier) |
| politique-de-confidentialite-mentions-legales.blocks.html | advancedheading 13, column 9, rowlayout 3 | paragraph 29 | aucun |

Blocs Kadence utilisés au total sur le site : `kadence/column` (172), `kadence/advancedheading` (89), `kadence/rowlayout` (73), `kadence/image` (19), `kadence/advancedbtn` + `kadence/singlebtn` (10 chacun), `kadence/advancedgallery` (2). Aucune occurrence de `kadence/countup`, `kadence/progressbar`, `kadence/infobox`, `kadence/iconlist`, `kadence/icon`, `kadence/accordion`, `kadence/tabs`, `kadence/table`, `kadence/testimonials`, `kadence/form`, `kadence/countdown`, `kadence/lottie`, `kadence/googlemap`, `kadence/spacer`, ni de `core/separator`, sur aucune des 6 pages (vérifié par grep exhaustif).

Blocs qui ne sont pas dans Kadence libre :
- **`brad/border-box`** (contacts.blocks.html, lignes 65-67) : widget bouton HelloAsso, shortcode `[helloasso campaign="..." type="widget-bouton" height="70px"]` encapsulé par le plugin HelloAsso pour WordPress. Namespace `brad/`, aucun rapport avec Kadence. Non clonable comme motif de mise en page ; si la home veut le même bouton HelloAsso, cloner le shortcode tel quel suppose que le plugin HelloAsso reste actif.
- **`kadence/advancedgallery`** (le-projet-architectural ligne 110, type `slider` ; les-medias ligne 65, type `carousel`) : très probablement inclus dans Kadence Blocks Libre (Advanced Gallery gère plusieurs types d'affichage dans un seul bloc libre), mais absent de la liste des blocs courants de `references/wordpress-kadence.md`. À confirmer en ouvrant une des deux pages dans l'éditeur avant de s'appuyer dessus pour la home.
- **`wp:shortcode`** avec `[sibwp_form id=3]` (contacts.blocks.html, lignes 35-37) : bloc core (donc valide), mais le rendu dépend du plugin Brevo/Sendinblue (formulaire id 3). Pas un motif Kadence, à signaler si la home doit réutiliser ce formulaire.

## 2. Motifs de mise en page clonables

Convention commune à toutes les instances ci-dessous : le `uniqueID` du JSON réapparaît dans le HTML sauvegardé à trois endroits types, qu'il faut changer ensemble si jamais un `uniqueID` doit être régénéré (en pratique on ne le régénère pas à la main, voir section 6) : l'`id` ou la `class` du wrapper (`id="kt-layout-id_XXXX"` pour une rangée, `class="kadence-columnXXXX"` pour une colonne), l'attribut `data-kb-block="kb-adv-headingXXXX"` et la `class="kt-adv-headingXXXX"` pour un titre, `class="kb-imageXXXX"` pour une image, `class="kb-btnsXXXX"` pour un bouton.

Note transverse : la quasi-totalité des titres de section (H2) du site ne sont pas un bloc isolé mais un motif décoratif répété **32 fois** sur les 6 pages : une rangée `kadence/rowlayout` en `colLayout":"right-golden"` contenant deux colonnes, une vide à 10 % de largeur avec une image de couleur en overlay (l'accent), une à 90 % avec le `kadence/advancedheading` et une marge négative (`margin` `-80` desktop, `-50` tablette) qui fait chevaucher le titre sur l'accent. Cloner un titre de section sur ce site, c'est cloner ces deux colonnes imbriquées, pas juste le heading.

### 2.1 Section pleine largeur, 1 colonne, fond coloré

Instance canonique : bande de CTA finale, `uniqueID` **1901_0d0b37-7f**, `la-maison-audacieuse.blocks.html` lignes 439-453. Même motif exact (mêmes attributs de rangée) répété tel quel sur 3 autres pages : `le-projet-architectural.blocks.html` lignes 279-293 (`1973_8bcb7e-22`), `lequipe-projet.blocks.html` lignes 357-371 (`1970_f0822e-aa`), `les-medias.blocks.html` lignes 103-117 (`1975_2b8c2d-dc`).

| Attribut | Valeur |
|---|---|
| columns / colLayout | 1 / equal |
| align | full |
| bgColor | palette2 (+ `overlayOpacity":20`, `overlayBlendMode":"multiply"`, `gradient` en dégradé palette1→palette2) |
| padding / mobilePadding | `["xl","","xl",""]` / `["md","","md",""]` |
| Contenu | colonne `1901_a28cf7-b5` (lignes 440-452) : kicker (span uppercase palette8) + H2 (palette9) + `kadence/advancedbtn` |

Répétition de l'id : `id="kt-layout-id_1901_0d0b37-7f"` sur le wrapper de rangée, `class="kadence-column1901_a28cf7-b5"` sur la colonne, `data-kb-block="kb-adv-heading..."` sur chaque heading.

### 2.2 Deux colonnes, texte puis image

Deux instances utilisables selon le besoin.

**Riche (liste + grande image)** : `uniqueID` **1901_e183f4-db**, `la-maison-audacieuse.blocks.html` lignes 75-109. Seule instance du site en `colLayout":"left-golden"` (34 rangées en `equal`, 32 en `right-golden`, 5 en `row`, 1 en `last-row`, 1 seule en `left-golden`). Colonne texte (`1901_e14aa6-fa`, lignes 77-101, la liste des « cinq briques », voir 2.8) puis colonne image (`1901_e0fb7b-2b`, lignes 104-108, `dessin.jpg`, `imgMaxWidth` vide donc 100 % de sa colonne, `ratio":"port34"`).

**Simple (paragraphes + image légendée)** : `uniqueID` **1901_3ea81b-65**, `la-maison-audacieuse.blocks.html` lignes 189-209. `colLayout":"equal"` sans `firstColumnWidth`/`secondColumnWidth` figés (vrai 50/50), `tabletLayout":"row"`. Colonne 1 = 3 paragraphes (lignes 191-201), colonne 2 = `kadence/image` avec `figcaption` (« Visuel © Basa Architecture », lignes 204-208). C'est aussi la base recommandée pour adapter le motif à 3 colonnes (2.4) et pour l'inverser en image + texte (2.3).

### 2.3 Deux colonnes, image puis texte

Motif présent, mais pas sur la home : instance canonique **1970_175cba-f2**, `lequipe-projet.blocks.html` lignes 35-59 (carte « Ostara »). `colLayout":"right-golden"`, `firstColumnWidth":18` / `secondColumnWidth":82`, `bgColor":"#ffffff"` (carte blanche, couleur en dur, voir section 3), `boxShadow` porté par la rangée elle-même. Colonne image étroite (`1970_4295dc-94`, lignes 36-40, `kadence/image` `imgMaxWidth":122`, `ratio":"land43"`) puis colonne texte large (`1970_040918-8c`, lignes 42-58 : kicker H6 uppercase, H3 palette3, paragraphe-titre palette5, `kadence/advancedbtn`). Ce motif se répète 12 fois sur `lequipe-projet.blocks.html` (une carte par personne ou association) : `2be614-55`, `1c7e45-c5`, `5f56bf-ac`, `b6dafa-ed`, `f73aaf-53`, `a9c713-f9`, `b595e8-63`, `eb0004-e0`, `5639ef-f7`, `c30bb3-19`, `54c542-69`, plus `175cba-f2`, toutes avec la même forme.

Alternative sans carte blanche : partir de **1901_3ea81b-65** (2.2) et permuter le contenu des deux colonnes enfants (l'image dans la première, le texte dans la seconde) ; ni `colLayout`, ni `columns`, ni les largeurs ne changent, seul l'ordre du contenu bouge.

### 2.4 Trois colonnes

**Absent au sens de 3 colonnes de contenu équivalentes.** Les deux seules rangées à 3 colonnes du site (grep `"columns":3` : une seule occurrence explicite, plus une rangée à 3 colonnes enfants sans attribut `columns` déclaré) sont asymétriques et jouent un rôle de bandeau, pas de grille de cartes :
- `1901_5fa2d4-52` (`la-maison-audacieuse.blocks.html`, lignes 13-39), `columns":3`, `colLayout":"last-row"` : colonne 1 = titre, colonne 2 = image (`plan-petit-1.png`), colonne 3 = texte.
- `1901_223077-8f` (même fichier, lignes 223-261), `colLayout":"row"`, pas d'attribut `columns` explicite malgré 3 `kadence/column` enfants réels : colonne 1 = titre décoratif, colonne 2 = image (`prochaines_etapes.png`), colonne 3 = texte.

Clone le plus proche à adapter : **1901_3ea81b-65** (2.2), qui est le seul `colLayout":"equal"` du site sans largeurs de colonnes figées. Attribut à changer : dupliquer son 2ᵉ bloc `kadence/column` pour en obtenir 3 (via l'éditeur, pas en copiant le JSON à la main, section 6). `colLayout` reste `"equal"` : Kadence répartit la largeur selon le nombre de colonnes enfants réellement présentes, pas selon un attribut `columns` figé (confirmé par `223077-8f` ci-dessus, qui a 3 enfants sans le déclarer). Aucune autre instance `equal` du site (34 au total) ne dépasse 2 colonnes : ce sera un motif inédit sur cette page, pas la reprise d'un précédent.

### 2.5 Titre + paragraphe + bouton

Instance canonique en deux blocs adjacents (le motif de titre de section, note transverse ci-dessus, n'est jamais dans la même colonne que le corps de texte) : titre `1901_73e266-86` dans la colonne `1901_bfb0e0-3b` (`la-maison-audacieuse.blocks.html`, lignes 133-137, H2 « Un collectif de personnes engagées », `fontSize":["lg","",26]`) puis corps `1901_1aa648-93` (lignes 148-160 : 2 paragraphes + `kadence/advancedbtn` `1901_d55631-8a` lignes 157-159, bouton « Découvrir l'équipe projet et les partenaires »).

Variante à un seul bouton après un bloc de texte plus long : colonne `1901_db1bbd-80` (lignes 212-220, 1 paragraphe + `kadence/advancedbtn` `1901_3d1418-ed` lignes 217-219, « Découvrir le projet architectural »), précédée du même motif de titre.

Les boutons de ce motif utilisent tous `"inheritStyles":"inherit"` (style hérité du thème, pas de couleur en dur) : à distinguer du bouton principal (2.10) qui est intégralement stylé.

### 2.6 Image seule pleine largeur

**Absent au sens strict.** Aucun `kadence/image` du site ne porte `"align":"full"` (grep vérifié sur les 6 fichiers) : les seuls alignements observés sur des images sont `"align":"center"` (4 occurrences). L'image la plus proche d'un usage « seule » est `1901_59f4b1-67` (`la-maison-audacieuse.blocks.html`, lignes 239-241, `prochaines_etapes.png`, `imgMaxWidth":600`, dans la colonne `1901_5541c8-b5` lignes 238-242), mais elle vit comme 2ᵉ enfant d'une rangée à 3 colonnes (2.4), pas seule dans sa rangée.

Clone à adapter : prendre une rangée 1 colonne `align:"full"` existante (par exemple **1901_493921-ea**, lignes 41-121) et n'y garder qu'une seule colonne contenant un unique `kadence/image` sans `imgMaxWidth` (ou avec `"align":"full"` posé sur le bloc image lui-même, réglage que Kadence propose mais qu'aucune instance du site n'utilise aujourd'hui). Attribut à vérifier après clonage : supprimer le titre décoratif imbriqué et le texte, qui ne font pas partie du motif « image seule ».

### 2.7 Bloc chiffre / titre grand format (compteur, classe `lma-compteur`)

**Absent.** Zéro occurrence de `kadence/countup`, `kadence/progressbar` ou d'un `advancedheading` affichant un nombre sur les 6 pages. La taille de police la plus grande relevée sur tout le site est `fontSize":[70,60,40]` (ou `34` selon la page), portée par les H1 de hero, et rien au-delà.

Clone le plus proche à adapter : le duo H1 + sous-titre du hero de la home, `1901_5b8b86-0f` (lignes 3-5, `fontSize":[70,60,40]`, `align":"center"`, `textTransform":"uppercase"`) et `1901_956350-a7` (lignes 7-9, `fontSize":[22,"",17]`, span). Attributs à changer : retirer `"textTransform":"uppercase"` (inutile sur un chiffre), remplacer le texte du H1 par le nombre, celui du span par le libellé de palier, et ajouter `"className":"lma-compteur"` au JSON du H1 **et** dans la liste de classes du `<h1>` rendu (le mécanisme est le même que pour `"className":"inner-column-1"` observé sur les colonnes du hero, lignes 2-3 : la valeur du JSON est recopiée telle quelle dans l'attribut `class` du HTML sauvegardé, les deux doivent rester synchrones). Garder les deux `uniqueID` sources comme base de duplication dans l'éditeur, pas en JSON à la main (section 6).

### 2.8 Liste

Deux conventions coexistent sur le site, aucune des deux n'est une vraie liste `<ul>`/`<li>` pour les énumérations de contenu.

**Pseudo-liste à puce manuelle** (dominante, utilisée pour toute énumération de type « ce que contient le lieu ») : colonne `1901_e14aa6-fa`, `la-maison-audacieuse.blocks.html` lignes 77-101, 5 blocs `wp:paragraph` commençant chacun par le caractère `▶︎` suivi d'une espace insécable, avec `padding-left` sur `var:preset|spacing|30` (ou `50`). Même convention avec 3 items sur `le-projet-architectural.blocks.html` (colonne `1973_39442b-78`, lignes 86-97).

**Liste numérotée réelle** (`core/list`/`core/list-item`, utilisée une seule fois pour les 2 étapes d'action) : `la-maison-audacieuse.blocks.html` lignes 375-379 (`<ol>`, item 1, « Je participe à la campagne citoyenne ») et lignes 391-395 (`<ol start="2">`, item 2). C'est dans le 1er item que vit une partie du bleu hors charte (section 3).

### 2.9 Séparateur / espacement

**Absent comme bloc dédié.** Zéro `kadence/spacer` et zéro `core/separator` sur les 6 pages (grep exhaustif). L'attribut de diviseur SVG intégré aux rangées (`topSep`/`bottomSep`) est présent dans le JSON de presque toutes les rangées pleine largeur mais toujours avec une valeur vide (`"topSep":""`), donc désactivé : aucune instance active à cloner non plus de ce côté.

Le rythme vertical du site est entièrement porté par les attributs `padding`, `mobilePadding`, `tabletPadding`, `margin` et `rowGap` des rangées et colonnes (exemple concret : `1901_493921-ea` porte `"padding":["md","","sm",""]` et `"mobilePadding":["sm","","md",""]`). Pour la nouvelle home, ajuster ces mêmes attributs sur les rangées clonées plutôt que d'insérer un bloc spacer inconnu du site. Si un vrai bloc spacer est nécessaire, le poser une fois depuis l'éditeur Gutenberg pour obtenir un `uniqueID` et un schéma d'attributs valides pour cette version de Kadence Blocks, puis s'en servir comme instance canonique pour la suite plutôt que d'écrire son JSON à l'aveugle.

### 2.10 Bouton principal

Instance canonique : `kadence/singlebtn` **1901_16eeef-30**, dans `kadence/advancedbtn` **1901_540e01-90**, `la-maison-audacieuse.blocks.html` lignes 386-388 (bouton lui-même ligne 387), texte « Je soutiens le projet ! », lien HelloAsso, `target":"_blank"`. C'est le seul bouton entièrement stylé en dur de tout le site (tous les autres boutons du site utilisent `"inheritStyles":"inherit"`, un simple habillage du style par défaut du thème) : fond `#159cff`, `colorHover`, 4 côtés de `borderStyle` et de `borderHoverStyle` en desktop et mobile, `borderRadius":[8,8,8,8]`, `iconColor`, ombre portée (`shadow`, `shadowHover`). C'est exactement le profil attendu pour le CTA unique « Je prends ma part » du beat 0/1/6/8 de la nouvelle home : mêmes réglages, texte, lien et couleur à changer (section 3).

## 3. Couleurs hors charte

| Fichier | #159cff | #00B5E2 | #ffffff | #eef2f5 | #EDF2F7 | #000000 | #1b202c |
|---|---|---|---|---|---|---|---|
| contacts.blocks.html | 0 | 2 | 2 | 1 | 1 | 1 | 0 |
| la-maison-audacieuse.blocks.html | **23** | 14 | 1 | 1 | 0 | 9 | 1 |
| le-projet-architectural.blocks.html | 0 | 14 | 2 | 1 | 1 | 4 | 0 |
| lequipe-projet.blocks.html | 0 | 6 | 14 | 1 | 1 | 24 | 0 |
| les-medias.blocks.html | 0 | 6 | 3 | 2 | 1 | 0 | 0 |
| politique...legales.blocks.html | 0 | 0 | 2 | 1 | 1 | 0 | 0 |
| **Total** | **23** | **42** | **24** | **7** | **5** | **38** | **1** |

**#159cff** (bleu hors charte, 23 occurrences, toutes concentrées dans `la-maison-audacieuse.blocks.html` lignes 375-389) : 20 occurrences dans le bouton principal `1901_540e01-90` (attributs `background`, `colorHover`, 4× `borderStyle`, 4× `mobileBorderStyle`, 4× `borderHoverStyle`, 4× `mobileBorderHoverStyle`, `iconColor`, `iconColorHover`) et 3 dans le 1er item de la liste numérotée (2 dans le JSON du `list-item` : `color.text` et `elements.link.color.text`, 1 dans le `style="color:#159cff"` rendu sur le `<li>`, ligne 377). C'est la seule zone du site à toucher pour ce bleu : elle correspond directement au bouton principal (2.10) à cloner pour la home.

**#00B5E2** (42 occurrences, sur les 6 pages) : toujours à l'intérieur du JSON boilerplate du motif de titre décoratif (`"overlaySecond":"#00B5E2"` dans `tabletOverlay`/`mobileOverlay`), un dégradé de secours qu'une image d'overlay (`color_rose.png`, `color_bleu.png`, `color_vert.png`, `color_jaune.png`, `color_blanc.png`) recouvre visuellement. Impact visuel probablement nul, mais couleur en dur à connaître avant de dupliquer ce motif en masse.

**#ffffff** (24 occurrences) : deux usages distincts. Fond de secours dans les dégradés CSS (`var(--global-palette1,#ffffff)`, cosmétique, sans impact si la variable est définie) et **fond de carte réel** sur `lequipe-projet.blocks.html` (12 occurrences, `"bgColor":"#ffffff"` sur chaque rangée-carte du motif 2.3). Si les cartes du motif 2.3 sont reprises sur la home, ce blanc franc est un choix à trancher (garder blanc pur ou glisser vers `#F5F5F6`/`#EDEDF5` de la nouvelle charte).

**#eef2f5 / #EDF2F7** (7 + 5 occurrences) : uniquement des couleurs de secours dans les mêmes dégradés CSS que `#ffffff` (`var(--global-palette2,#eef2f5)`), jamais un `bgColor` direct. Basse priorité.

**#000000 / #1b202c** (38 + 1) : exclusivement des couleurs d'ombre portée (`shadow`, `boxShadow`), jamais un fond ou un texte. Pas de substitution charte nécessaire à proprement parler ; à adoucir seulement si un choix esthétique le demande.

La plupart des autres couleurs du site ne sont pas en dur : elles référencent la palette globale Kadence par numéro (`"colorClass":"theme-palette9"`, `"bgColor":"palette7"`, etc., slots 1 à 11 rencontrés dans ce catalogue : 1,2,3,5,6,7,8,9,11). Cette palette est définie une fois dans le Customizer (`theme_mods_kadence`, `references/wordpress-kadence.md` section 5) : changer la charte pour tout ce qui est symbolique se fait à cet endroit, pas bloc par bloc. Seules les exceptions de ce tableau demandent une édition dans le markup de page.

## 4. Références aux images

Chaque `kadence/image` référence un média de trois façons cohérentes à conserver ensemble : `"id":NNNN` dans le JSON (ID de l'attachment WordPress), l'URL complète dans `src="https://www.maison-audacieuse.fr/wp-content/uploads/AAAA/MM/fichier.ext"`, et la classe `wp-image-NNNN` sur la balise `<img>` (le même ID que le JSON). Exemple : `1901_8f3da3-7d` (dessin.jpg) porte `"id":1934`, `src=".../2026/04/dessin.jpg"`, `class="kb-img wp-image-1934"`.

**Aucun `srcset` nulle part sur les 6 pages** (grep exhaustif) : le bloc image Kadence sauvegarde une seule URL fixe, pas de jeu d'images responsive au niveau du markup. Le nom de fichier peut déjà porter un suffixe de taille générée par WordPress (`ferme-1024x575.png` pour `"sizeSlug":"large"`) : c'est WordPress qui a résolu la taille au moment de l'enregistrement du bloc, il n'y a rien de dynamique à l'affichage.

**Alt text : quasiment toujours vide.** Sur l'ensemble des 6 pages, seules 2 images ont un `alt` renseigné (`visuel-Dauphine-1.jpg` : « Le projet architectural de la maison Audacieuse » ; `ferme-1024x575.png` : « Reportage TV », `la-maison-audacieuse.blocks.html`). Toutes les autres images du site ont `alt=""`. Ne pas reproduire cette convention par mimétisme : chaque image de la nouvelle home doit recevoir un alt réel.

Pour une image neuve, l'intégrateur doit : 1) la téléverser dans la médiathèque WordPress ; 2) récupérer son ID d'attachment (visible dans l'URL de la médiathèque ou via l'API `/wp/v2/media`) et l'URL du fichier à la taille voulue (`sizeSlug` `full` ou `large` selon le rendu souhaité) ; 3) poser ces deux valeurs ensemble dans le bloc cloné (`id` du JSON, `src` et `class="... wp-image-ID"` du HTML, mêmes chiffres des deux côtés) ; 4) écrire un `alt` descriptif réel ; 5) garder le `uniqueID` du bloc `kadence/image` inchangé (il identifie le bloc, pas l'image).

## 5. Hors périmètre de la home (ne pas toucher)

- **En-tête, pied de page, menus** : vivent dans `theme_mods_kadence` (Customizer) et `nav_menu_locations`, pas dans `post_content`. Preuve : aucune balise `<header>`, `<nav>`, `<footer>` ni bloc `wp:navigation` dans les 6 fichiers `.blocks.html` (grep exhaustif, `references/wordpress-kadence.md` section 5).
- **Palette globale Kadence (les 11 slots `palette1`…`palette11`) et styles par défaut des blocs** : options `kadence_blocks_*`, indépendantes du thème. Preuve : les blocs de page ne font que référencer ces slots par nom (`"colorClass":"theme-palette9"`), jamais leur définition (`references/wordpress-kadence.md` section 5).
- **CSS additionnel du Customizer** : post `custom_css` séparé, pointé depuis `theme_mods`. Preuve : absent des 6 fichiers ; la seule trace de CSS par bloc rencontrée est `"kadenceBlockCSS":"selector {\n\n}\n"` sur une colonne de `contacts.blocks.html` (ligne 28), un sélecteur vide sans règle, sans effet.
- **Les 5 autres pages existantes** (`le-projet-architectural`, `lequipe-projet`, `les-medias`, `contacts`, `politique-de-confidentialite-mentions-legales`) : lues ici uniquement pour en extraire des motifs, aucune n'est modifiée par ce travail.

## 6. Pièges connus

- **Bloc invalide à l'ouverture dans Gutenberg.** Gutenberg recalcule le HTML attendu à partir du type de bloc et de ses attributs, puis le compare au HTML sauvegardé. Le moindre écart (entité différente, guillemet mal échappé, `<br>` non reflété dans les deux) déclenche « Ce bloc contient du contenu inattendu » et propose de convertir en HTML, ce qui fige la section. Contrôle éditeur obligatoire après tout clonage, avant tout push.
- **`uniqueID` dupliqués.** Aucun doublon aujourd'hui dans les 6 fichiers (vérifié). Le risque apparaît uniquement si un `uniqueID` est copié à la main plutôt que régénéré par l'éditeur (Dupliquer, ou copier-coller dans l'éditeur) : deux blocs partageant le même `uniqueID` partagent le même CSS généré, et l'un des deux se fait silencieusement re-clé à l'enregistrement suivant.
- **Séquences `--` dans le JSON.** Toutes les valeurs CSS du type `var(--global-palette1,#ffffff)` sont enregistrées avec les deux tirets de `--` échappés en `--` (visible dans tous les attributs `gradient`/`overlayGradient` de ce catalogue). Si une valeur de ce type doit être modifiée, préserver cet encodage plutôt que le remplacer par des tirets littéraux : un résultat visuellement identique mais différent de ce que Gutenberg regénérerait peut suffire à invalider le bloc.
- **Guillemets et apostrophes dans les attributs JSON.** Exemple réel sur le site : le shortcode HelloAsso de `contacts.blocks.html` (ligne 65) encode ses guillemets internes en `"` plutôt qu'en `\"`. Les apostrophes françaises du corps de texte utilisent presque partout le caractère typographique `’` (ex. « d’un tiers-lieu ») sauf dans quelques H1 qui gardent l'apostrophe droite (`l'équipe projet`, `lequipe-projet.blocks.html` ligne 4) : reproduire le style déjà présent autour du texte remplacé, ne pas uniformiser à l'aveugle.
- **`&nbsp;` et entités.** Omniprésent dans les titres et paragraphes pour contrôler les césures françaises avant `:`, `!`, `?` et entre mots courts (dizaines d'occurrences sur chaque page). À préserver à l'identique dans tout texte de substitution qui suit la même construction.
- **Sauts de ligne dans les attributs.** Un attribut JSON peut légitimement contenir un `\n` littéral échappé, ex. `"kadenceBlockCSS":"selector {\n\n}\n"` (`contacts.blocks.html` ligne 28). ne jamais introduire un vrai retour à la ligne non échappé à l'intérieur d'une chaîne JSON : cela casse le parsing du commentaire de bloc.
- **`<br>` dans les titres.** Convention observée sur ce site : les `kadence/advancedheading` n'utilisent jamais `<br>`, seulement des `&nbsp;` pour orienter les césures responsive. Les `<br>` réels n'apparaissent que dans des `wp:paragraph`. Ne pas introduire de `<br>` dans un titre cloné sans vérifier que le rendu attendu par le bloc (souvent une seule chaîne sans balise interne) le tolère.
