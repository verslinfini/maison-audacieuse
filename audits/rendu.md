# Audit de rendu, onze pages

Relevé du 2026-09-08 sur la refonte des dix pages intérieures. Auditeur tiers : aucune de ces pages n'a été écrite par moi.

## Méthode

Build `node build.mjs --sortie .previsu/audit-rendu`, servi par un serveur HTTP local, ouvert sous Chromium par Playwright. Capture pleine page des onze adresses à 1440, 768 et 375 px, découpée en tranches de 1 500 px et regardée une à une. Mesures mécaniques prises dans le navigateur : hauteur de document, sections et leurs fonds, images et leurs dimensions rendues, grilles à cellules égales, sur-titres en capitales espacées, rayons de coin effectifs, largeur de défilement à dix-sept largeurs entre 320 et 1600.

Le contraste est mesuré sur les pixels rendus, élément par élément, chaque cible amenée au centre de l'écran puis photographiée **en capture d'écran de viewport, jamais en capture pleine page**. Ce point n'est pas un détail : voir la section suivante.

Aucune valeur de ce rapport n'est estimée. Quand une mesure existe, elle est donnée.

Deux artefacts de capture rencontrés et écartés, pour que personne ne les rapporte comme des défauts : en capture pleine page à 375 px, la barre d'appel fixe se recompose au milieu de la page et paraît trancher un paragraphe de `part-sociale` en deux ; et l'en-tête fixe couvre les 76 px hauts de chaque bande capturée. Les deux disparaissent en capture de viewport. Les captures 375 du dossier d'audit ont été refaites avec `.entete`, `.barre-mobile` et `.menu-mobile` masqués.

## Ce que voient les trois contrôles, et ce qu'ils ne voient pas

Les quatre contrôles passent au vert à l'heure où j'écris : `verif/pages.mjs` (11 pages, 0 écart, 46 trous nommés), `verif/ancres.mjs` (71 fragments, 0 mort), `verif/home-conforme.mjs` (216 nœuds contre 216), `verif/contraste.mjs` (« tout le texte tient son seuil »).

**`verif/contraste.mjs` ne mesure pas la page d'accueil.** Il ne retient une cible que si son parent a un ancêtre qui répond à `.bloc--violet, .bloc--terracotta, .bloc--sombre, .bloc--aube, .bloc--claire, .bloc--nappe, .bloc--ouvert, .page-tete, .bloc--photo, .bloc--blanc, .bloc--gris, .bloc--violace`. Les écrans de l'accueil s'appellent `#hero`, `#le-lieu`, `#la-ferme`, `#les-etapes`, `#le-pari`, `#prendre-part`, `#agir` et ne portent aucune de ces classes. Le « aucun texte sous son seuil » affiché pour `/` signifie qu'il n'a trouvé presque aucun texte à mesurer, pas qu'il l'a mesuré.

Trois autres angles morts de la même famille :

- **L'entête, le pied, la barre mobile et le menu mobile** sont hors du sélecteur sur les onze pages. Je les ai mesurés séparément (`.pied__titre`, `.pied__liste a`, `.pied__bas`, `.nav a`, à 1440 et à 375) et aucun ne ressort sous son seuil. Mais aucun n'est contrôlé, et la teinte du pied est une couche `mix-blend-mode: overlay` sur un dégradé : elle ne se calcule pas, elle se mesure.
- **Une seule largeur.** Le contrôle tourne à 1440. Sept défauts de contraste de ce rapport n'existent qu'à 375, où les dégradés se recomposent.
- **`fullPage: true`.** L'accueil dimensionne ses sept écrans en `min-height: 100vh` puis `100svh` (`accueil.css` lignes 16, 140, 221, 315, 432 et suivantes). Une capture pleine page redimensionne le viewport à la hauteur du document : `100vh` vaut alors 6 668 px, la mise en page explose, et tout échantillonnage par coordonnées lit un pixel qui n'existe pas à l'écran. Même en corrigeant le sélecteur, l'outil mesurerait faux sur la seule page qu'il ne mesure pas.

**Ce que ces angles morts cachent : cinq défauts de contraste réels, tous sur la page validée.** Détail en R9.

## Les treize manquements, verdict mécanique

| Règle | Verdict | Mesure |
|---|---|---|
| R1 trois cartes identiques | **passe** | grilles à 3 cellules égales : 1 sur `le-projet-architectural` (galerie), 1 sur `prendre-part` (parcours), 0 partout ailleurs. Plafond 1, jamais dépassé |
| R2 alternance image-texte au-delà de deux | **passe** | plus longue suite de `.duo` consécutifs : 2, sur `le-projet-architectural`, et les deux alternent |
| R3 sur-titre sur chaque section | **échoue** | comptage : 1 par page partout, 2 sur `prendre-part`. Mais 7 pages sur 10 posent l'étiquette du menu au-dessus du h1 sans rien ajouter |
| R4 famille de mise en page réemployée | **échoue** | 4 pages sur 8 : `le-projet-architectural`, `part-sociale`, `lequipe-projet`, `les-medias` |
| R5 grand titre à gauche, paragraphe à droite | **échoue** | 1 cas net : `part-sociale` `#ce-que-ce-nest-pas`, 427 px de colonne gauche vide |
| R6 rayons de coin mélangés | **échoue** | 11 valeurs distinctes sur le site, hors 50 % : 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 999 px |
| R7 libellé de bouton sur deux lignes | **passe** | 0 libellé sur deux lignes à 320, 375, 414, 768, 880, 1024 et 1440 |
| R8 deux libellés pour la même intention | **échoue** | 43 liens vers `/prendre-part/`, trois libellés : 31 « Je prends ma part », 11 « Souscrire une part sociale », 1 « Déclarer mon intention de souscrire » |
| R9 contraste non mesuré | **échoue** | 5 défauts sur l'accueil, 7 défauts à 375 sur les pages intérieures. Aucun contour de champ en défaut (violet sur blanc à 4,64 pour un seuil de 3) |
| R10 aucune image | **échoue** | `cgv` 0 image sur 17 563 px, `politique` 0 sur 9 589 px, `prendre-part` 1 pour 5 sections, `contacts` 1 pour 5 |
| R11 deux fonds identiques qui se suivent | **passe** | aucune répétition adjacente sur les onze pages |
| R12 deux zones chaudes | **passe sur les dix pages intérieures** | 1 fond plein maximum partout. L'accueil en porte deux, voir l'objection |
| R13 débordement horizontal | **passe** | `scrollWidth` égale la largeur du viewport à 320, 360, 375, 414, 480, 600, 700, 767, 768, 820, 900, 1024, 1100, 1200, 1280, 1440 et 1600, sur les onze pages |

Décompte des défauts qui suivent : **4 Bloquants, 20 Majeurs, 10 Mineurs**.

## Bloquants

### B1. Socle, entête, les onze pages : la navigation casse sur deux lignes de 768 à 872 px

`src/partials/entete.html` et `src/styles/base.css`. Le passage au menu mobile est déclaré `@media (max-width: 767px)`. À 768 px, la navigation de bureau réapparaît alors qu'elle ne tient pas : « Le lieu », « Le projet » et « La part sociale » passent chacun sur deux lignes, « L'équipe », « Médias » et « Contact » restent sur une. L'entête devient une rangée en escalier.

Mesure, balayage de 768 à 1120 par pas de 8 px : trois liens sur deux lignes de **768 à 872 px inclus**, une seule ligne à partir de **880 px**. Bande cassée de 105 px, qui couvre l'iPad en portrait et la plupart des portables 13 pouces en fenêtre réduite. Sur les onze pages, accueil comprise.

Remplacement : passer le bloc mobile de `base.css` de `@media (max-width: 767px)` à `@media (max-width: 879px)`, et remonter en conséquence les trois autres `@media (max-width: 767px)` du socle (`.galerie` qui défile, `.duo` qui s'empile, `.coupe` qui bascule sur sa légende) ainsi que le seuil de `.barre-mobile`. Ne pas raccourcir les libellés du menu : ils sont ceux du référentiel d'intentions.

### B2. `lequipe-projet`, `#le-collectif` : quatre cadres gris vides ouvrent la page de la confiance

Le premier écran après l'entête de page montre quatre rectangles gris identiques portant « PHOTO À VENIR », suivis de trois marqueurs `[À SOURCER : prénom, fonction et une ligne]` en pointillé rouge, d'un quatrième `[À SOURCER : une ligne sur ce qu'elle fait dans le lieu]` et d'un cinquième `[À SOURCER : les prénoms, les fonctions et les portraits du collectif fondateur]`. Six boîtes en pointillé et quatre cadres vides dans une hauteur de 470 px, sur la page dont le job déclaré est « mettre des visages sur les noms ».

`intentions.md` demande des emplacements nommés qui se remplissent sans refonte. Un emplacement nommé n'a pas besoin d'être un cadre d'image vide : c'est le cadre vide, pas le marqueur, qui fait le dégât. Un site qui demande 100 € à un particulier ne peut pas montrer quatre trous à la place de son équipe.

Mesure : `.portraits` rend 4 cellules de 200 px dans 5 pistes de 258 px ; le seul contenu réel de la section est un nom, « Morgane Craye ».

Remplacement : supprimer `.portrait__cadre` tant qu'aucune image n'existe et rendre les quatre emplacements en cartes de texte (`.grille--2` du socle, nom en `strong`, fonction en dessous), une seule boîte `[À SOURCER]` pour toute la section au lieu de cinq. Le jour où les portraits arrivent, `.portrait__cadre` revient et accueille l'image sans que la structure bouge.

### B3. Accueil : cinq défauts de contraste mesurés, sur la page validée

R9 nomme « le texte blanc sur les deux fonds pleins » parmi ce qui doit être mesuré. Il l'est ici, et il est en défaut. Mesures prises au deuxième pire de quinze points échantillonnés sous chaque ligne, à 1440 et à 375.

| Élément | Section | Taille | Mesuré 1440 | Mesuré 375 | Seuil |
|---|---|---|---|---|---|
| `.jauge__nombre` « 124 » | `#hero` | 40,8 px / 700 | **2,49** | 2,55 | 3 |
| `.nom-structure` (5 étiquettes vertes) | `#le-lieu` | 13,6 px / 700 | **2,85 à 2,92** | 2,87 à 2,92 | 4,5 |
| `#le-pari p` (3 paragraphes) | `#le-pari`, violet plein | 16,8 à 20,88 px | **3,93 à 4,07** | 3,94 à 4,09 | 4,5 |
| `#agir .geste h3` (3 titres) | `#agir`, terracotta plein | 17,28 px / 700 | **3,63 à 4,16** | 3,79 à 3,90 | 4,5 |
| `#agir .geste p` (3 paragraphes) | `#agir`, terracotta plein | 15,2 px / 400 | **3,64 à 3,99** | 3,79 à 3,97 | 4,5 |

Le blanc pur sur `--terracotta` `#A3716A` vaut 4,08 en théorie, avant même le grain et les dégradés radiaux qui l'éclaircissent par endroits. `--vert` `#5E9E85` sur blanc vaut 3,13 : cette couleur ne peut pas porter du texte de 13,6 px, quelle que soit sa graisse.

L'accueil est gelée et sert d'étalon. Le gel ne couvre pas le plancher WCAG AA : c'est une obligation, pas un goût. Trois corrections qui ne rouvrent pas la charte et ne touchent à aucune composition :

- `#agir` : porter la couche `linear-gradient(rgba(56,54,72,.16), rgba(56,54,72,.16))` de `.16` à `.30`. Le blanc passe alors au-dessus de 4,5 sur toute la surface, la teinte reste terracotta, le bouton jaune reste à 10,4.
- `#le-pari` : même geste sur la couche sombre du dégradé violet.
- `.nom-structure` et `.jauge__nombre` : passer le texte à `--violet-sombre` et garder `--vert` sur le filet et sur l'arc de la jauge, qui sont des éléments graphiques et relèvent du seuil 3.

### B4. Socle, `.bloc--photo` à 375 px : le panneau mange la photo sur cinq pages

Le composant « section en photo pleine largeur » est le principal moyen dont dispose une page intérieure pour avoir une image. À 375 px il n'en montre plus.

Part de la section couverte par le panneau opaque, mesurée sur les cinq pages qui l'emploient :

| Page | Section | 1440 | 768 | 375 |
|---|---|---|---|---|
| `le-projet-architectural` | `#ce-qui-tient` | 25 % | 51 % | **67 %** |
| `le-modele-economique` | `#votre-part` | 31 % | 61 % | **77 %** |
| `part-sociale` | `#a-quoi-ca-sert` | 28 % | 58 % | **74 %** |
| `lequipe-projet` | `#les-espaces` | 26 % | 57 % | **71 %** |
| `contacts` | `#venir-voir` | 31 % | 62 % | **75 %** |

À 375 px, le panneau fait 335 px de large dans une section de 375 : la photo se réduit à deux liserés de 20 px et à une bande au-dessus. Le lecteur au téléphone lit une carte blanche, pas une photographie.

Remplacement, dans le `@media` mobile de `base.css` : sortir le panneau de par-dessus la photo et l'empiler dessous. `.bloc--photo { display: grid; grid-template-rows: 220px auto; }`, `.bloc--photo .bloc__fond { position: static; height: 220px; }`, `.bloc--photo .panneau { margin: 0; }`. La photo garde 220 px pleins, le panneau garde son opacité et son texte, `.bloc__credit` se pose sous la bande photo.

## Majeurs

### M1. R3, sept pages posent l'étiquette du menu au-dessus du h1

R3 exige que le sur-titre porte une information que le titre ne porte pas, et cite en contre-exemple « L'ÉQUIPE PROJET » au-dessus de « Qui fait la Maison Audacieuse ». Huit agents ont rempli le même emplacement de la même façon.

| Page | Sur-titre | h1 | Verdict |
|---|---|---|---|
| accueil | À ANNECY, QUARTIER DE NOVEL | Et si ce lieu était le nôtre ? | situe, tient |
| `le-projet-architectural` | ANNECY, QUARTIER DE NOVEL | Ce qu'il y a derrière la porte | situe, tient, mais reprend celui de l'accueil au mot près |
| `cgv-parts-sociales` | LA COOP AUDACIEUSE | Conditions de souscription des parts sociales | nomme l'émetteur, tient |
| `prendre-part` | SOUSCRIPTION DE PARTS SOCIALES | Devenir coopérateur·ice | ajoute l'objet, tient |
| `contacts` | CONTACT | Dites-nous ce qui vous amène | étiquette de menu, limite |
| `le-modele-economique` | LE PROJET | Comment ce lieu tient debout | **étiquette de menu, ne dit rien** |
| `part-sociale` | LA PART SOCIALE | C'est quoi, une part sociale ? | **redit le titre au mot près** |
| `lequipe-projet` | L'ÉQUIPE | Qui fait la Maison Audacieuse | **le cas exact que R3 nomme** |
| `les-medias` | PRESSE ET MÉDIAS | Le projet dans la presse | **redit le titre** |
| `soutenir` | SOUTENIR | Trois façons de soutenir la Maison Audacieuse | **redit le verbe du titre** |
| `politique` | INFORMATIONS LÉGALES | Mentions légales et confidentialité | **redit le titre** |

Remplacement : sur les six pages en gras, le sur-titre porte un fait que le titre ne porte pas, ou il disparaît. Par exemple `part-sociale` : « 100 €, REMBOURSABLE À TOUT MOMENT ». `lequipe-projet` : « UN COLLECTIF ANNÉCIEN, CINQ STRUCTURES ». `les-medias` : « QUATRE MÉDIAS DEPUIS MARS 2025 ». `soutenir` : « LA CAMPAGNE DE DONS EST CLOSE DEPUIS AVRIL 2026 ». `le-modele-economique` et `politique` : supprimer le `.page-tete__sur`, le h1 suffit.

### M2. R3, `prendre-part` porte deux sur-titres

`.page-tete__sur` « SOUSCRIPTION DE PARTS SOCIALES » à 14 px, interlettrage 1,4 px, puis `#votre-argent` ouvre sur un `<h2 class="promesse__sur">` « AVANT DE REMPLIR » à 20 px, interlettrage 2,0 px, posé au-dessus de la promesse de remboursement. Deux petits intitulés en capitales espacées au-dessus d'un titre, plafond de R3 : un.

Remplacement : supprimer « AVANT DE REMPLIR ». La phrase « Votre argent reste le vôtre. Vous pouvez demander le remboursement de vos parts à tout moment. » est déjà le titre de sa section, en 48 px blanc sur terracotta. Rien ne se perd.

### M3. R4, `le-projet-architectural` : deux `.duo` consécutifs

`#la-rue-interieure` (fond violet, texte à gauche, dessin à droite) est immédiatement suivi de `#renover-sans-abimer` (fond clair, image à gauche, texte à droite). Deux écrans de suite sur la même famille « moitié image, moitié texte ». R2 admet deux consécutifs quand ils alternent, ce qu'ils font ; R4 interdit la famille réemployée dans la page. La page compte 5 familles distinctes sur 6 sections de corps.

Remplacement : garder `#la-rue-interieure` en duo, le dessin a besoin de son cadre. Passer `#renover-sans-abimer` en colonne de lecture pleine largeur (`.mesure .prose`) avec les trois points de la rénovation en `.puces`, et déplacer `visuel-dauphine-1.webp` en bande pleine largeur juste avant l'appel, où la page se termine aujourd'hui sur du texte.

### M4. R4 et R5, `part-sociale` : `.colonnes` deux fois, et la colonne gauche reste vide

`#ce-que-ce-nest-pas` et `#faq` emploient le même composant `.colonnes` : titre plus chapeau dans la colonne de gauche, contenu dans celle de droite. Deux sections de la même page sur la même famille.

Mesures à 1440, deux colonnes de 536 et 537 px :

- `#ce-que-ce-nest-pas` : contenu de gauche haut de 128 px, contenu de droite haut de 555 px. **427 px de colonne gauche vide.** La colonne de droite ne porte que du texte courant, trois blocs séparés par des filets : l'exception de R5 (« si la colonne de droite porte autre chose que du texte ») ne s'applique pas.
- `#faq` : contenu de gauche haut de 202 px, contenu de droite haut de 536 px. **334 px de colonne gauche vide.** Ici la colonne de droite porte des `details`, l'exception de R5 s'applique, mais la répétition de famille reste.

Remplacement : `#ce-que-ce-nest-pas` passe en colonne de lecture pleine largeur, titre et chapeau empilés, les trois refus en trois blocs à la file. `#faq` garde `.colonnes`, qui devient alors le seul emploi de la famille dans la page.

### M5. R4, `lequipe-projet` : deux grilles de cartes

`#le-collectif` porte `.portraits`, grille de 4 cellules. `#les-metiers` porte `.cartouches`, grille de 5 cellules à filet haut, logo et texte. Deux grilles de cartes dans la même page.

Remplacement : `#les-metiers` passe en liste plate à deux colonnes, filet entre les entrées, sans cadre ni logo encadré, ce qui la distingue nettement des portraits et raccourcit la section.

### M6. R4, `les-medias` : deux listes en colonnes filetées consécutives

`#qui-en-parle` rend 4 cellules de 256 px, chacune avec un filet au-dessus, un nom de média en jaune et une ligne de précision. `#parutions`, la section immédiatement suivante, rend 6 entrées en deux colonnes, chacune avec un filet au-dessus, une source en petit gris et un titre. Même geste, deux fois de suite, seule la couleur de fond change.

Remplacement : `#qui-en-parle` perd ses filets et ses colonnes et devient une phrase suivie des quatre noms sur une ligne, séparés par des points médians. La section fait 424 px pour quatre noms : elle peut en faire 200.

### M7. R8, trois libellés pour une seule intention

Comptage sur les onze pages construites : **43 liens vers `/prendre-part/`**, sous trois libellés.

| Libellé | Occurrences | Où |
|---|---|---|
| Je prends ma part | 31 | entête, corps, barre mobile |
| Souscrire une part sociale | 11 | **pied de page, les onze pages** |
| Déclarer mon intention de souscrire | 1 | `cgv-parts-sociales`, partie 6 |

R8 nomme explicitement le pied et interdit explicitement « Souscrire ». Sur `part-sociale` le lecteur voit, dans le même écran, un bouton jaune « Je prends ma part » et, dix centimètres plus bas, un lien « Souscrire une part sociale » qui va au même endroit.

Le pied porte en plus deux libellés pour deux autres pages du menu : « Le lieu et son architecture » contre « Le lieu » dans l'entête, « Le projet et son financement » contre « Le projet ».

Remplacement : dans `src/partials/pied.html`, la colonne « Prendre part » commence par `<a href="/prendre-part/">Je prends ma part</a>`. Dans `cgv-parts-sociales.html`, le lien de fin de partie 6 devient « Je prends ma part ». Aligner aussi les deux libellés de la colonne « Le site » sur ceux de l'entête.

### M8. R10, quatre pages sous le minimum d'une image toutes les deux sections

Comptage des images de contenu rendues à plus de 60 px, fond de `.bloc--photo` compris, et plus long intervalle vertical sans aucune image.

| Page | Images | Sections | Minimum R10 | Plus long trou sans image |
|---|---|---|---|---|
| `cgv-parts-sociales` | **0** | 9 | 4 | **17 195 px** |
| `politique` | **0** | 6 | 3 | **9 221 px** |
| `prendre-part` | **1** | 5 | 3 | 2 509 px |
| `contacts` | **1** | 5 | 3 | 1 260 px |
| `part-sociale` | 2 | 7 | 4 | 2 525 px |
| `le-modele-economique` | 2 | 7 | 4 | 1 930 px |
| `lequipe-projet` | 2 | 7 | 4 | 1 826 px |
| `soutenir` | 2 | 5 | 3 | 1 613 px |
| accueil | 3 | 7 | 4 | 3 600 px |
| `les-medias` | 4 | 5 | 3 | 2 516 px |
| `le-projet-architectural` | 7 | 7 | 4 | 1 061 px |

`intentions.md` dispense les deux pages légales d'être séduisantes, pas d'être tenues. Vingt-six mille pixels cumulés sans une seule respiration visuelle, dans une colonne de 547 px posée à gauche d'un conteneur de 1 240 px, c'est le mur que R10 décrit.

Remplacement, sans photographie et sans rendre un contrat séduisant : le composant `.cgv__reperage` (« PARTIE 3 SUR 6 | Sommaire »), qui existe déjà et flotte aujourd'hui en haut de chaque partie, devient un rail collant dans les 544 px vides à droite, `position: sticky; top: calc(var(--h-entete) + 1.5rem)`, portant les six parties avec la courante marquée. Le lecteur sait où il est et combien il reste, ce qui est exactement le travail de tenue demandé.

Pour `prendre-part` et `contacts`, le fonds converti ne compte que neuf photographies et elles sont toutes employées ailleurs. Atteindre le minimum de R10 sur ces deux pages demande de convertir en webp deux fichiers restés dans `contenu/images-heritees/`, `porte.jpg` en premier, comme les sept du 07/09. Sans cette conversion, la règle est inatteignable et le constat reste ouvert.

### M9. Collision d'images : neuf photographies pour onze pages, et la même en fond sur trois

Le site n'emploie que neuf fichiers. Répartition relevée :

| Fichier | Pages | Rôle |
|---|---|---|
| `grange.webp` | **5** | fond de `.bloc--photo` sur `le-modele-economique`, `part-sociale`, `lequipe-projet` ; vignette de galerie sur `le-projet-architectural` et `les-medias` |
| `ferme-rue.webp` | 4 | galerie, duo, galerie, entête de page |
| `visuel-dauphine-1.webp` | 4 (5 occurrences) | accueil deux fois, `le-projet-architectural`, `prendre-part`, `soutenir`, toujours dans le même cadre blanc incliné |
| `voute.webp`, `charpente-2.webp` | 2 chacun | |
| `charpente.webp`, `coupe-espaces.webp`, `rue-interieure.webp`, `fenetre.webp` | 1 chacun | |

Le cas grave est `grange.webp` : **trois pages portent la même photographie, en fond pleine largeur, avec le panneau blanc opaque au même endroit et à la même taille**. Deux de ces pages, `le-modele-economique` et `part-sociale`, se suivent dans le menu et dans le parcours. Le lecteur qui les enchaîne voit deux fois le même écran.

Second cas : la bande de quatre photos de `les-medias` `#espace-presse` reprend trois des quatre vignettes de la galerie de `le-projet-architectural` `#la-ferme-aujourd-hui`, au même format et avec des légendes voisines.

La grille dit que réemployer un composant du socle sur des pages différentes n'est pas un manquement, et c'est juste. Réemployer la même photographie dans le même composant sur trois pages en est un.

Remplacement, avec les seuls fichiers déjà présents dans `src/assets/img/`. Les cinq fonds de `.bloc--photo` deviennent cinq photographies distinctes :

| Page | Section | Aujourd'hui | À la place |
|---|---|---|---|
| `le-projet-architectural` | `#ce-qui-tient` | `charpente.webp` | inchangé |
| `le-modele-economique` | `#votre-part` | `grange.webp` | inchangé, le volume vide sert le propos |
| `part-sociale` | `#a-quoi-ca-sert` | `grange.webp` | `charpente-2.webp` |
| `lequipe-projet` | `#les-espaces` | `grange.webp` | `voute.webp` |
| `contacts` | `#venir-voir` | `fenetre.webp` | inchangé |

La bande de quatre photos de `les-medias` remplace `grange` par `rue-interieure.webp`, ce qui la distingue de la galerie de `le-projet-architectural`. Pour `prendre-part`, qui n'a qu'une image, la seule photographie encore inemployée du fonds est `porte.jpg`, restée dans `contenu/images-heritees/` : elle demande le même passage en webp que les sept autres du 07/09 avant de pouvoir servir.

### M10. Collision de composition : les onze pages ouvrent sur deux images seulement

Toutes les pages intérieures ouvrent sur `page-tete page-tete--aube`, ce qui est le but d'un socle. Mais huit d'entre elles ouvrent exactement pareil, titre à gauche et chapeau dessous, sans rien d'autre : `le-projet-architectural`, `le-modele-economique`, `part-sociale`, `lequipe-projet`, `les-medias`, `contacts`, `cgv-parts-sociales`, `politique`.

Les deux autres, `prendre-part` et `soutenir`, ouvrent sur la même composition l'une que l'autre : titre à gauche, photographie en cadre blanc incliné en haut à droite, légende dessous. **C'est la composition du héros de l'accueil**, et sur `prendre-part` c'est en plus la même photographie, `visuel-dauphine-1.webp`, dans le même cadre, à la même place.

Remplacement : `soutenir` change de photographie d'entête, `ferme-rue.webp` y est déjà employé quatre fois ailleurs sur le site. Deux des huit pages sans image d'entête en reçoivent une, pour que l'ouverture ne se réduise pas à deux formes. Le reste tient.

### M11. R6, onze rayons de coin pour un barème qui devrait en compter deux

Relevé des `border-radius` effectivement rendus, hors `50 %` :

| Valeur | Où |
|---|---|
| 1 px | accueil `.apres img` |
| 2 px | `:focus-visible`, `.coupe img`, `.coupe__etiquette`, `le-projet-architectural` cadre de dessin, `les-medias` `.visuels img` |
| 3 px | `.figure img`, `.panneau`, `.a-sourcer` |
| 4 px | accueil `.ferme__credit`, `lequipe-projet` `.portrait__cadre`, `contacts` case à cocher |
| 5 px | `prendre-part` case à cocher |
| 6 px | `.bouton`, `.menu-bouton`, champs de formulaire |
| 7 px | accueil champ d'infolettre |
| 8 px | accueil `.jalon__bloc`, `prendre-part` `.repli`, `cgv` `.cgv__reperage`, `lequipe-projet` `.cartouche__logo`, `les-medias` `.apropos` en `0 8px 8px 0` |
| 10 px | `.carte` du socle, accueil `.equations li`, `cgv` `.foi`, `lequipe-projet` `.fiche`, `politique` `.legal__tableau` |
| 12 px | accueil `.porte`, `contacts` `.porte`, `prendre-part` `.declaration` |
| 999 px | `prendre-part` `.parcours__ici`, seule occurrence du site |

Rayons distincts par page : accueil 9, `prendre-part` 7, `lequipe-projet` 5, `les-medias` 5, `contacts` 4, `cgv` 4, `le-projet-architectural` 3, `soutenir` 3, `le-modele-economique` 2, `part-sociale` 2, `politique` 2.

Les trois divergences à corriger d'abord, parce qu'elles portent sur le **même objet rendu deux fois différemment** :

- **La case à cocher** : 4 px sur `contacts`, 5 px sur `prendre-part`. Deux formulaires, deux cases.
- **Le champ d'infolettre** : 7 px sur l'accueil, 6 px sur `contacts`. C'est le même formulaire, réécrit deux fois.
- **Le cadre d'image** : 1 px sur `.apres img`, 2 px sur `.coupe img` et `.visuels img`, 3 px sur `.figure img`.

Remplacement : un barème à trois crans, écrit une fois dans `base.css` en variables, `--r-image: 2px`, `--r-carte: 10px`, `--r-champ: 6px`, plus les boutons à 6 px et les pastilles à 50 %. Tout ce qui vaut 1, 3, 4, 5, 7, 8 ou 12 px se range dans l'un des trois. `.parcours__ici` à 999 px devient une pastille assumée ou repasse à `--r-champ`.

### M12. `lequipe-projet`, `#les-metiers` : 235 px de colonne vide et une photo hors sujet

Le titre « Les métiers du chantier » est posé en haut de la colonne gauche, le premier paragraphe commence 235 px plus bas parce que le texte est centré verticalement contre une image de 559 par 730 px. Un trou net entre le titre et son texte.

L'image est `ferme-rue.webp`, une vue de la rue avec des voitures garées, pour illustrer les métiers du chantier. Elle est par ailleurs employée sur trois autres pages.

La section fait 1 425 px, soit 27 % de la page, pour cinq prestataires dont un porte un logo vide et un marqueur `[À SOURCER : le rôle de WeCo]`.

Remplacement : aligner le contenu du duo en haut (`align-items: start`) pour supprimer le trou, remplacer l'image par `charpente-2.webp` qui montre un ouvrage et non une rue, et passer les cinq cartouches en liste à deux colonnes sans cadre. La section descend sous 900 px et la page rentre dans sa cible.

### M13. `lequipe-projet` dépasse sa cible de hauteur de 21 %

5 187 px à 1440 pour une cible de 4 300 px déclarée dans `intentions.md`, soit 887 px de trop. C'est la seule des dix pages intérieures qui dépasse : toutes les autres sont dans leur cible ou en dessous.

Répartition : `#les-metiers` 1 425 px, `#le-collectif` 800 px pour un seul nom, `#une-voix` 674 px, `#la-cooperative` 584 px.

Remplacement : les corrections B2 et M12 rendent environ 900 px et ramènent la page à sa cible sans rien supprimer d'autre.

### M14. `.sommaire__titre` et `.sommaire__grille` écrits deux fois, rendus différemment

Les deux pages légales, voisines dans le pied et dans le parcours, portent un sommaire sous le même nom de classe, écrit dans deux feuilles.

| | `cgv-parts-sociales.css` | `politique-...css` |
|---|---|---|
| `.sommaire__titre` | `h3`, 16,3 px, interlettrage 1,31 px | `h2`, 12,5 px, interlettrage 1,25 px |
| `.sommaire__grille` | 6 cellules, rangs « PARTIE N », entrées numérotées, filets | 4 colonnes, sans rang, sans numéro, sans filet |

`docs/conventions.md`, section « Ce qui ne se fait pas », interdit de dupliquer une règle CSS dans deux feuilles, précisément parce qu'elle divergera. Elle a divergé avant même la mise en ligne.

Remplacement : monter `.sommaire`, `.sommaire__titre`, `.sommaire__grille` et `.sommaire__rang` dans `base.css` dans la version de `cgv-parts-sociales.css`, qui est la plus complète, et supprimer les deux blocs des feuilles de page. La page `politique` gagne les rangs et les filets, ce qui est le bon sens pour un sommaire de six parties.

### M15. `.porte` désigne deux composants différents dans deux feuilles

`accueil.css` ligne 818 : `.porte` est une carte blanche à 12 px de rayon, dans l'écran `#agir`. `contacts.css` ligne 27 : `.porte` est le bloc d'adresse, à 12 px de rayon aussi. Deux composants sans rapport sous un seul nom. Rien ne casse aujourd'hui parce que chaque page ne charge que sa feuille ; la première règle qui remonte dans `base.css` cassera l'autre page.

Remplacement : renommer le bloc d'adresse de `contacts` en `.adresse`, et laisser `.porte` à l'accueil.

### M16. `.kicker` et `.page-tete__sur` : le même sur-titre sous deux noms et deux réglages

| | Accueil, `.kicker` | Dix pages intérieures, `.page-tete__sur` |
|---|---|---|
| Taille | 12,8 px | 14 px |
| Graisse | 600 | 400 |
| Interlettrage | 0,16 em, soit 2,05 px | 0,10 em, soit 1,4 px |

Même rôle, même position, même couleur, deux rendus. Le lecteur qui passe de l'accueil à `part-sociale` voit le sur-titre grossir et maigrir. `.kicker` est en outre le seul nom de classe anglais du site, contre la convention « classes en français » de `docs/conventions.md`.

Remplacement : `.kicker` disparaît, l'accueil emploie `.page-tete__sur`, et le réglage retenu est celui de l'accueil, plus assuré : 12,8 px, graisse 600, interlettrage 0,16 em, dans `base.css`.

### M17. `cgv-parts-sociales` : deux fonds sombres, dont 1 206 px de contrat en clair sur sombre

L'ordre des fonds est `tete > blanc > nappe > blanc > aube > blanc > sombre > claire > sombre`. Le `bloc--sombre` de `#partie-5` (« Ce que vous risquez ») fait 1 206 px et porte du texte contractuel dense, puis la page repasse en clair pour `#partie-6`, puis redevient sombre pour `#coordonnees`.

`docs/conventions.md` dit du `bloc--sombre` qu'il est « l'appel de fin, toujours en dernier », et `intentions.md` qu'un fond plein « porte l'idée qu'on veut faire retenir, jamais un texte long ». Ici il porte 1 206 px de clauses.

Remplacement : `#partie-5` repasse en `bloc--claire` comme les autres parties, et garde son poids par son titre et par un encadré `.foi` sombre de 300 px au plus, portant la seule phrase du risque. `#coordonnees` reste le seul bloc sombre, en dernier.

### M18. `les-medias` : l'espace presse occupe 39 % d'une page dont le premier job est la preuve sociale

`#espace-presse` fait 1 407 px sur 3 572, et concentre à lui seul trois familles de mise en page (un encadré à filet, deux cartes, une bande de quatre photos) et la seule ligne de repères de la page. La preuve sociale, elle, tient en 424 px de noms et 677 px de parutions.

`intentions.md` fixe l'ordre : « preuve sociale et service à la presse, dans cet ordre ».

Remplacement : `#espace-presse` perd la bande de quatre photos et la ligne de repères, qui redit des chiffres déjà portés par trois autres pages. La section descend sous 900 px et l'ordre des poids suit l'ordre des sections.

Ce que la bande de photos devient : `contenu/presse/` contient cinq captures d'articles, `article-_01.jpg` à `article-_05.jpg`, sorties de `src/assets/img/` le 08/09 avec les autres fichiers hérités. Ce sont les seules images du dépôt qui parlent du sujet de la page. Les remonter dans `#parutions`, en vignettes cliquables à côté de chaque entrée, donne à la page ses images et déplace le poids vers la preuve sociale. Leur publication est une question de droits à trancher, pas une décision de rendu : je signale qu'elles existent, l'arbitrage n'est pas le mien.

### M19. `prendre-part` : le bouton jaune de l'appel final ne mène pas où il mène ailleurs

Sur huit pages, le `.bloc--sombre` de fin porte un bouton jaune « Je prends ma part ». Sur `prendre-part`, le même bouton jaune, au même endroit, à la même taille, porte « Nous écrire » et ouvre un courriel. Le lecteur a appris la forme sur les pages précédentes.

Remplacement : le bouton de `#une-question` passe en `.bouton--contour`, et le lien « C'est quoi, une part sociale ? » qui l'accompagne garde sa forme de lien. La forme pleine jaune reste réservée à l'intention de souscrire.

### M20. `cgv` et `politique` : 547 px de texte dans 1 240 px de conteneur

Le titre de partie, la barre `.cgv__reperage`, les boîtes `[À SOURCER]` et le texte sont tous confinés dans la colonne de lecture de 547 px, alignée à gauche. À 1440 px, 544 px de la largeur utile restent vides sur toute la hauteur, soit 17 563 px pour la première page et 9 589 pour la seconde.

La colonne de lecture est juste et ne bouge pas. Ce qui ne l'est pas, c'est que rien d'autre ne l'accompagne.

Remplacement : celui de M8, le rail collant des six parties dans la colonne de droite.

## Mineurs

- **m1. `.annote` sous le seuil à 375** : `le-projet-architectural` « cinq usages, un seul toit » à 3,84, `lequipe-projet` « quel que soit le montant » à 4,21, `contacts` « on répond nous-mêmes » à 4,15, pour un seuil de 4,5. Le violet `#766DA0` vaut 4,64 sur blanc pur et passe dessous sur les fonds teintés. Porter la Meow Script à `--violet-sombre` sur les fonds clairs.
- **m2. `les-medias` `.nom__titre`** : jaune sur violet à 4,29 et 4,35 à 375 px, seuil 4,5, taille 20 px graisse 600 donc pas de dérogation grand texte. Passer à 700 pour bénéficier du seuil 3, ou éclaircir d'un cran le fond du bloc.
- **m3. `prendre-part`** : `figcaption` à 4,41 à 375, bouton « Je déclare mon intention » à 4,47 à 1440. Deux ratés de moins de 0,1.
- **m4. `.bouton--primaire` mesuré à 4,70 partout ailleurs.** Blanc sur `--violet` `#766DA0` vaut 4,64 en théorie : le bouton principal du site vit à 0,14 au-dessus du plancher. Toute couche de grain ou tout survol le fait passer dessous, ce qui explique m3. Assombrir `--violet` du bouton d'un cran vers `--violet-sombre` mettrait la marge à 6 et réglerait m3 par la même occasion.
- **m5. `lequipe-projet` `.portraits`** : 4 cellules de 200 px dans 5 pistes de 258 px. Chaque portrait laisse 58 px morts dans sa piste et la rangée s'arrête 60 px avant le bord droit de la colonne.
- **m6. `lequipe-projet`** : le cartouche WeCo porte un carré de logo blanc et vide à côté de quatre logos réels, sous un marqueur `[À SOURCER]`. Supprimer le carré tant que le fichier n'existe pas.
- **m7. `999px`** n'apparaît qu'une fois sur le site entier, sur la pastille « VOUS ÊTES ICI » de `prendre-part`.
- **m8. `le-projet-architectural`** : cinq étiquettes `.lieu-espace__ou` en capitales espacées répétant trois valeurs (« REZ-DE-CHAUSSÉE » trois fois). Elles ne sont pas des sur-titres au sens de R3, elles suivent leur texte, mais elles ajoutent cinq blocs de capitales à une page qui en porte déjà un.
- **m9. `soutenir`** : l'appel de fin reprend au mot près le h1 de l'accueil, « Et si ce lieu était le nôtre ? ». La phrase est bonne ; elle appartient à la page d'accueil.
- **m10. `.reperes` sur quatre pages**, dont trois portent « 99 ans » et trois portent « 100 € » : `le-modele-economique` (99 ans, Juillet 2026, 100 €), `lequipe-projet` (100 €, 1 voix, 99 ans), `les-medias` (99 ans, 3,2 M€, 100 €), `soutenir` (88 900 €, plus de 650, 100 €). Le même composant, presque les mêmes nombres, quatre fois. En retirer deux.

## L'écart avec l'étalon

L'accueil et les dix pages intérieures partagent l'entête, le pied, la typographie, les couleurs et les fonds. Ce qui les sépare tient en quatre points mesurables.

**Sept sections, sept compositions.** L'accueil ne réemploie aucune composition d'un écran à l'autre : héros composé, colonne de titre plus texte plus cinq étiquettes, photo pleine largeur avec panneau et photo rapportée en surimpression, frise à sept jalons, écran violet de prose, écran de conversion à équations, écran terracotta à trois gestes et deux portes. Quatre des huit pages intérieures réemploient une famille dans la page (M3 à M6).

**La photo pleine largeur y est composée, ailleurs elle est plate.** Sur `#la-ferme`, le panneau blanc opaque est doublé d'une seconde photographie inclinée qui le chevauche, d'un mot en Meow Script (« demain ») et d'une étiquette sombre (« La ferme aujourd'hui ») : la section raconte l'avant et l'après en une image. Les cinq `.bloc--photo` des pages intérieures sont un panneau blanc sur une photo, sans second plan.

**Le surlignage.** 5 `.marqueur` sur l'accueil. `le-modele-economique` 1, `part-sociale` 2, `les-medias` 1, `soutenir` 1, et **0 sur `le-projet-architectural` (5 588 px), `prendre-part`, `lequipe-projet`, `contacts`, `cgv`, `politique`**. Six pages sur onze n'ont pas un seul mot surligné. La convention dit « rare, un mot ou deux par page au maximum » : zéro n'est pas la même chose que rare.

**La Meow Script.** L'accueil la pose trois fois (« déjà », « demain », l'annotation fléchée du compteur). Les pages intérieures ont `.annote` : 1 sur six d'entre elles, 2 sur `part-sociale`, 0 sur `les-medias`, `cgv` et `politique`. Le geste existe, il est bien employé quand il l'est (« cinq usages, un seul toit », « c'est la vôtre », « une voix chacune »), il manque simplement là où il manque.

Le sur-titre est le seul élément où l'écart est un défaut de fabrication plutôt qu'un défaut d'ambition : deux noms de classe, deux réglages, pour un élément présent en haut des onze pages (M16).

## Les collisions entre pages

Huit agents en parallèle, six collisions relevées :

1. `grange.webp` en fond de `.bloc--photo` sur trois pages, dont deux consécutives dans le parcours (M9).
2. `visuel-dauphine-1.webp` dans le même cadre blanc incliné sur quatre pages, cinq occurrences (M9).
3. `prendre-part` et `soutenir` ouvrent sur la composition du héros de l'accueil, et `prendre-part` avec la même photographie (M10).
4. `.sommaire__titre` et `.sommaire__grille` écrits deux fois, rendus différemment, sur deux pages voisines (M14).
5. `.porte` désigne deux composants sans rapport dans deux feuilles (M15).
6. Le sur-titre existe sous deux noms, `.kicker` et `.page-tete__sur`, avec deux réglages (M16).

Et une septième, plus diffuse : sept pages sur dix ont rempli le `.page-tete__sur` avec l'étiquette du menu (M1). Personne ne l'a copié sur personne ; c'est ce que produit un emplacement nommé « sur-titre » quand on le remplit sans voir les neuf autres.

## Le parcours

**Accueil, part sociale, prendre part.** Le fil tient. L'accueil pose le prix et la voix, `part-sociale` les reprend en 48 px sur violet, `prendre-part` exécute. Deux accrocs : `part-sociale` porte le même fond photo que `le-modele-economique`, que beaucoup de visiteurs auront vu juste avant, et l'appel final de `prendre-part` détourne le bouton jaune vers un courriel (M19). Le sur-titre « LA PART SOCIALE » au-dessus de « C'est quoi, une part sociale ? » casse l'élan à la première ligne de la page qui doit rassurer.

**Accueil, le lieu, le projet.** Le fil tient mieux. `le-projet-architectural` est la page la mieux servie du site : sept images, une coupe annotée, une galerie, un fond photo, une seule répétition de famille. `le-modele-economique` prend la suite avec sa phrase pivot en blanc sur violet, qui est le meilleur écran des dix pages intérieures. L'accroc est en sortie : les deux pages se terminent sur un `bloc--sombre` de 311 et 339 px, presque identiques, avec le même bouton et les mêmes deux liens.

**Ce qui ne tient pas d'un bout à l'autre**, c'est le pied. Il est le même sur les onze pages, il est vu onze fois, et il dit « Souscrire une part sociale » là où tout le reste du site dit « Je prends ma part » (M7). C'est le seul endroit du parcours où le site se contredit lui-même à chaque page.

## Tableau page par page

Hauteurs en pixels, document complet. Images de contenu rendues à plus de 60 px, fond de `.bloc--photo` compris. Familles de mise en page comptées sur les sections de corps, l'appel exclu. Sur-titres au sens strict de R3 : petit intitulé en capitales espacées au-dessus d'un titre.

| Page | h 1440 | h 768 | h 375 | Images | Familles distinctes / sections | Sur-titres | Fonds dans l'ordre |
|---|---|---|---|---|---|---|---|
| `/` | 6 668 | 6 900 | 8 086 | 3 | 7 / 7 | 1 | clair > clair > photo pleine largeur > clair > **violet plein** > clair > **terracotta plein** |
| `/le-projet-architectural/` | 5 588 | 5 451 | 7 228 | 7 | 5 / 6, duo x2 | 1 | tête > blanc > photo > nappe > violet > claire > sombre |
| `/le-modele-economique/` | 4 468 | 4 028 | 6 115 | 2 | 6 / 6 | 1 | tête > blanc > violet > photo > claire > nappe > sombre |
| `/part-sociale/` | 4 577 | 4 398 | 5 984 | 2 | 5 / 6, colonnes x2 | 1 | tête > violet > blanc > claire > photo > gris > sombre |
| `/prendre-part/` | 3 287 | 3 688 | 5 230 | 1 | 4 / 4 | **2** | tête > nappe > terracotta > ouvert > sombre |
| `/lequipe-projet/` | **5 187** | 5 401 | 6 931 | 2 | 5 / 6, grille de cartes x2 | 1 | tête > blanc > photo > violet > nappe > claire > sombre |
| `/les-medias/` | 3 572 | 3 553 | 5 668 | 4 | 3 / 4, liste filetée x2 | 1 | tête > violet > blanc > claire > sombre |
| `/contacts/` | 3 052 | 2 771 | 4 284 | 1 | 4 / 4 | 1 | tête > blanc > photo > claire > sombre |
| `/soutenir/` | 3 302 | 3 744 | 4 974 | 2 | 4 / 4 | 1 | tête > ouvert > violacé > claire > sombre |
| `/cgv-parts-sociales/` | 17 563 | 16 218 | 22 854 | **0** | 3 / 8 | 1 | tête > blanc > nappe > blanc > aube > blanc > **sombre** > claire > **sombre** |
| `/politique-de-confidentialite-mentions-legales/` | 9 589 | 9 400 | 13 157 | **0** | 3 / 5 | 1 | tête > blanc > nappe > blanc > aube > sombre |

Écarts aux cibles de `intentions.md` : `lequipe-projet` +887 px (+21 %), seul dépassement. `part-sociale` 4 577 pour 5 000, `le-projet-architectural` 5 588 pour 5 500, `le-modele-economique` 4 468 pour 4 500, `prendre-part` 3 287 pour 3 500, `les-medias` 3 572 pour 3 500, `contacts` 3 052 pour 3 000, `soutenir` 3 302 pour 3 300. Neuf pages sur dix sont dans leur cible ou à moins de 2 % au-dessus.

## Les trois défauts qui changeraient le plus le site

**1. La navigation qui casse de 768 à 872 px (B1).** Une ligne de CSS, onze pages, une bande de 105 px de largeurs courantes. C'est le seul défaut de ce rapport qui se voit avant d'avoir lu un mot, et il se voit sur la page d'accueil validée comme sur les autres. Rien d'autre dans le site n'a ce rapport entre le coût de la correction et la surface du dégât.

**2. Le sur-titre qui redit le titre, sur sept pages (M1).** Le premier mot de sept pages sur dix est l'étiquette du menu. Le lecteur qui arrive lit deux fois la même chose avant d'avoir commencé, sur la page de la confiance comme sur celle de l'équipe. Corriger sept lignes de HTML rend sept ouvertures de page. C'est le meilleur rapport travail sur effet du rapport.

**3. Les quatre cadres vides de la page équipe (B2).** C'est la page que consulte quelqu'un qui hésite à mettre 100 €. Elle lui montre quatre trous et six marqueurs de matière manquante. La matière ne viendra pas avant la mise en ligne ; la façon de la manquer, elle, se choisit aujourd'hui. Quatre cartes de texte nommées ne mentent pas davantage que quatre cadres vides, et ne se lisent pas comme un chantier abandonné.

Mention hors classement pour B3, le contraste de l'accueil : ce n'est pas un défaut de goût, c'est un plancher légal, et il est le seul point de ce rapport que la validation du commanditaire ne peut pas couvrir.

## Une objection à ma propre grille

**R6, R10 et R12, tels qu'ils sont écrits, condamnent l'étalon.**

R6 pose que le site est « à 3 px sur les cartes et les panneaux, 999 px sur les boutons » et que toute autre valeur est un défaut. Le site ne fait ni l'un ni l'autre : ses boutons sont à 6 px depuis `base.css` ligne 96, et 999 px n'existe qu'une fois sur onze pages. La page d'accueil validée porte neuf rayons distincts, du 1 px de `.apres img` au 12 px de `.porte`. Appliquée à la lettre, R6 déclare en défaut chaque carte de la page qui sert de référence. J'ai donc appliqué son intention, qui est juste (un seul barème par site), et non sa lettre, qui décrit un site qui n'existe pas. Le barème réel à écrire est celui que je propose en M11.

R10 demande une image toutes les deux sections. L'accueil en a trois pour sept sections et son plus long intervalle sans image fait 3 600 px, plus que `part-sociale`, `prendre-part` et `lequipe-projet`. Elle tient quand même, parce que ses écrans pleins de couleur et sa frise font le travail qu'une image ferait ailleurs. La règle mesure la fréquence des images ; ce qu'elle veut mesurer, c'est la fréquence des respirations non textuelles. Un `bloc--violet` de 546 px portant une seule phrase en est une.

R12 interdit deux fonds pleins par page. L'accueil en porte deux, `#le-pari` en violet et `#agir` en terracotta, séparés par un écran clair de 900 px, et personne ne les voit ensemble : ce sont deux vues, pas une. La règle dit « une seule zone chaude par vue » dans son intitulé et « par page » dans son texte. Sur une page de 6 668 px les deux ne sont pas la même chose. Les dix pages intérieures respectent la version stricte, ce qui les prive d'un ressort dont l'étalon se sert.

Une objection de forme, enfin, sur R3. Sa partie comptable (un sur-titre par page) est satisfaite partout sauf sur `prendre-part`, et sa partie qualitative (le sur-titre doit ajouter une information) est violée sept fois. C'est la seconde qui fait le dégât, et c'est la seule des treize règles dont le contrôle ne peut pas être mécanique. Une grille qui promet treize manquements « qui se comptent mécaniquement » en compte douze, et le treizième est celui qui abîme le plus de pages.
