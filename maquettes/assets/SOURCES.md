# Sources des assets, maquettes home

Inventaire des fichiers copiés dans `maquettes/assets/` pour les maquettes HTML de la
nouvelle home. Polices en licence libre (OFL), logo du projet, images déjà publiées sur
maison-audacieuse.fr uniquement (aucune image du Nextcloud copiée à ce stade).

Extraction des URLs d'images faite par recherche dans les 6 fichiers
`contenu/blocs/*.blocks.html` du clone, dédoublonnée. Téléchargement le 2026.08.18 avec
un user-agent Chrome complet (obligatoire, Tiger Protect renvoie 403 sinon).

## Polices (OFL)

| Fichier | Source | Poids | Licence |
| --- | --- | --- | --- |
| `fonts/Onest-VariableFont_wght.ttf` | Nextcloud, `04 COM/00 Charte graphique/Onest/Onest-VariableFont_wght.ttf` | 120,5 Ko | OFL, voir `fonts/OFL-Onest.txt` |
| `fonts/static/Onest-Regular.ttf` | Nextcloud, `04 COM/00 Charte graphique/Onest/static/Onest-Regular.ttf` | 62,8 Ko | OFL |
| `fonts/static/Onest-Medium.ttf` | idem, `static/Onest-Medium.ttf` | 62,9 Ko | OFL |
| `fonts/static/Onest-SemiBold.ttf` | idem, `static/Onest-SemiBold.ttf` | 62,9 Ko | OFL |
| `fonts/static/Onest-Bold.ttf` | idem, `static/Onest-Bold.ttf` | 62,9 Ko | OFL |
| `fonts/MeowScript-Regular.ttf` | Nextcloud, `04 COM/00 Charte graphique/Meow_Script,Onest/Meow_Script/MeowScript-Regular.ttf` | 573,4 Ko | OFL, voir `fonts/OFL-MeowScript.txt` |
| `fonts/OFL-Onest.txt` | idem, `Onest/OFL.txt` (renommé) | 4,4 Ko | texte de licence |
| `fonts/OFL-MeowScript.txt` | idem, `Meow_Script/OFL.txt` (renommé) | 4,4 Ko | texte de licence |

Statiques copiées : Regular, Medium, SemiBold, Bold (les seules demandées). Thin,
ExtraLight, Light, ExtraBold et Black existent aussi sur le Nextcloud mais n'ont pas été
copiées, hors périmètre de la consigne.

## Logo

| Fichier | Source | Dimensions | Poids | Crédit |
| --- | --- | --- | --- | --- |
| `logo/lma.svg` | Nextcloud, `04 COM/03 Logo projet/lma.svg` | vectoriel | 71,8 Ko | collectif La Maison Audacieuse |
| `logo/lma-blanc.png` | Nextcloud, `04 COM/03 Logo projet/LMA white.png` (renommé, la plus grande variante blanche : `LMA white.png` et `LMA white@3x.png` font toutes deux 584x720 malgré le nom, `LMA white.png` retenue) | 584x720 | 25,7 Ko | collectif La Maison Audacieuse |
| `logo/lma-noir.png` | Nextcloud, `04 COM/03 Logo projet/LMA black@2x.png` (renommé, la plus grande variante noire : 584x720 contre 292x360 pour `LMA black.png`) | 584x720 | 27,3 Ko | collectif La Maison Audacieuse |

Renommage lma-blanc.png / lma-noir.png choisi pour lisibilité et pour retirer les espaces
des noms de fichiers d'origine (convention appliquée à l'ensemble des assets).

## Images (déjà publiées sur maison-audacieuse.fr)

Toutes en `maquettes/assets/img/`, nom de fichier d'origine conservé en minuscules,
téléchargées depuis `https://www.maison-audacieuse.fr/wp-content/uploads/...`.
Licence ou droit d'usage pour toutes : déjà publié sur maison-audacieuse.fr.

| Fichier | Dimensions | Poids | Crédit |
| --- | --- | --- | --- |
| `annecy.png` | 600x602 | 3,2 Ko | Logo Ville d'Annecy, marque du partenaire |
| `article-_01.jpg` | 889x900 | 68,4 Ko | Capture d'écran d'article, Le Dauphiné Libéré, photo Jean-Baptiste Serron / Le DL |
| `article-_02.jpg` | 889x900 | 82,7 Ko | idem |
| `article-_03.jpg` | 889x900 | 72,0 Ko | idem |
| `article-_04.jpg` | 889x900 | 59,1 Ko | idem |
| `article-_05.jpg` | 889x900 | 61,1 Ko | idem |
| `collectif-1.png` | 860x534 | 58,5 Ko | collectif La Maison Audacieuse (infographie futures occupantes) |
| `color_blanc.png` | 645x59 | 0,6 Ko | collectif La Maison Audacieuse (bandeau couleur, éditeur de blocs du site) |
| `color_bleu.png` | 645x59 | 0,6 Ko | idem |
| `color_jaune.png` | 645x59 | 0,5 Ko | idem |
| `color_rose.png` | 645x59 | 0,5 Ko | idem |
| `color_vert.png` | 645x59 | 0,5 Ko | idem |
| `cordee.png` | 600x602 | 21,5 Ko | Logo La Cordée, marque du partenaire |
| `dessin.jpg` | 747x1107 | 64,4 Ko | collectif La Maison Audacieuse (illustration, auteur précis non identifié) |
| `esquisse-1.jpg` | 1000x707 | 53,0 Ko | © Basa Architecture (plan, filigrane « propriété de Basa architecture » visible sur l'image) |
| `esquisse-2.jpg` | 1000x707 | 59,6 Ko | © Basa Architecture (idem, filigrane visible) |
| `esquisse-3.png` | 1000x707 | 43,6 Ko | © Basa Architecture (idem, filigrane visible) |
| `exterieur3-1.jpg` | 1368x857 | 187,3 Ko | collectif La Maison Audacieuse (photo du bâtiment) |
| `ferme-1024x575.png` | 1024x575 | 341,4 Ko | Voir point d'attention ci-dessous, capture TV, pas collectif ni Basa |
| `ferme.png` | 1500x842 | 348,0 Ko | Original sans suffixe de taille, servi par le serveur, téléchargé en plus. Voir point d'attention |
| `hero1.jpg` | 1368x857 | 37,4 Ko | collectif La Maison Audacieuse (photo du bâtiment, traitement violet) |
| `hero2.jpg` | 1368x857 | 33,3 Ko | idem |
| `hero3.jpg` | 1368x857 | 29,1 Ko | idem |
| `hero4.jpg` | 1368x857 | 18,3 Ko | idem |
| `hero5.jpg` | 1368x857 | 21,0 Ko | idem |
| `hero6.jpg` | 1368x857 | 20,6 Ko | idem |
| `part_banjo.jpg` | 440x440 | 57,9 Ko | collectif La Maison Audacieuse (photo activité Banjo) |
| `part_beguinage.jpg` | 440x440 | 16,1 Ko | collectif La Maison Audacieuse (portraits Béguinage) |
| `part_cafe.jpg` | 440x440 | 46,2 Ko | collectif La Maison Audacieuse (logo Café des Audacieuses) |
| `part_ostara.jpg` | 440x440 | 18,6 Ko | Logo Ostara, marque du partenaire |
| `part_sante.jpg` | 440x440 | 54,8 Ko | collectif La Maison Audacieuse (illustration Maison en-santé) |
| `pas-d-palais.gif` | 480x270 | 2,6 Mo | Voir point d'attention ci-dessous, extrait de film, ni collectif ni Basa |
| `plan-petit-1.png` | 800x390 | 48,2 Ko | © Basa Architecture (probable : coupe isométrique de même style que les plans signés, filigrane non visible sur ce format réduit, à confirmer auprès de l'agence) |
| `pro_basa.png` | 600x602 | 13,7 Ko | © Basa Architecture (logo de l'agence) |
| `pro_ekola.png` | 600x602 | 17,6 Ko | Logo Ekola Énergie et Environnement, marque du partenaire |
| `pro_lafaye.png` | 600x602 | 15,7 Ko | Logo partenaire (monogramme LG), à confirmer |
| `pro_unitoit.png` | 600x602 | 22,9 Ko | Logo Unitoit, marque du partenaire |
| `pro_weco.png` | 600x602 | 9,5 Ko | Logos Weco et Immolocal, marques des partenaires |
| `prochaines_etapes.png` | 1138x618 | 24,3 Ko | collectif La Maison Audacieuse (infographie frise chronologique) |
| `visuel-dauphine-1.jpg` | 900x563 | 80,7 Ko | © Basa Architecture (rendu 3D extérieur) |

Total du dossier `img/` : 4,8 Mo pour 40 fichiers. Aucun fichier individuel au-dessus de
3 Mo, aucun redimensionnement nécessaire (le plus lourd est `pas-d-palais.gif` à 2,6 Mo).

### Points d'attention sur les crédits

Le classement « Basa Architecture / collectif » de la consigne ne couvre pas tout ce qui
a été trouvé. Trois cas particuliers, à traiter avant tout usage dans les maquettes
définitives :

- **`pas-d-palais.gif`** : ce n'est pas un visuel du collectif. C'est un extrait du film *Astérix et Obélix : Mission Cléopâtre* (2002) utilisé en image de réaction sur le site actuel. Droits tiers (Pathé), pas de licence libre identifiée. Téléchargé pour l'inventaire mais à ne pas réutiliser dans une maquette destinée à être montrée hors du cercle de travail.
- **`article-_01.jpg` à `article-_05.jpg`** : captures d'écran d'un article du Dauphiné Libéré (28 mars 2025, « Ils veulent transformer une ancienne ferme en un lieu dédié à la place des femmes »), avec mention photo « Le DL / Jean-Baptiste Serron » visible dans la capture. Propriété du Dauphiné Libéré, pas du collectif.
- **`ferme-1024x575.png`** et **`ferme.png`** : capture d'écran d'un reportage France 3 Alpes, journal du 19/20 (« Un lieu pour les femmes victimes de violences », bandeau visible dans l'image). Propriété de France Télévisions, pas du collectif.

Les logos partenaires (`annecy.png`, `cordee.png`, `part_ostara.jpg`, `pro_ekola.png`,
`pro_lafaye.png`, `pro_unitoit.png`, `pro_weco.png`, et `pro_basa.png` pour Basa) sont des
marques déposées de tiers, déjà publiées sur le site en tant que logos partenaires : usage
identique dans une maquette interne, mais pas de réattribution au collectif.

### Image non disponible

`reportage_tv.png` (`2026/04/reportage_tv.png`) est référencée dans
`contenu/blocs/les-medias.blocks.html` mais renvoie 404 sur le serveur : image supprimée
ou déplacée côté WordPress. Non copiée, faute de source.

## Disponibles sur le Nextcloud, non copiés, à valider avec Solène

Listés seulement, rien copié. Chemins locaux sous
`C:\Users\romai\LMA_La Maison Audacieuse\04 COM\`.

### 01 Photos/ (186 fichiers, non copiés)

- **`2025 Bâtiment/`**, 95 fichiers `.jpg` à la racine : photos de chantier prises en continu le 7 mars 2025, nommées `IMG_20250307_HHMMSS.jpg` de `154404` à `163802` (2h13 de prise de vue). Dimensions 2448x3264 px, environ 1,5 à 2 Mo chacune.
  - **`_archives/Chateau de novel - Asters/`**, 34 fichiers `.jpg` supplémentaires : sous-dossier distinct qui semble être une visite de référence architecturale (Château de Novel, Asters) plutôt que le chantier de La Maison Audacieuse elle-même. À clarifier avant tout usage, le nom suggère un autre site.
  - Poids total du dossier (avec `_archives`) : 307 Mo.
- **`2026.03 Fête de l'Audace/`**, 57 fichiers, 1,8 Go au total : photos et vidéos de l'événement « Fête de l'Audace » du 21 mars 2026.
  - 48 fichiers `.jpeg` nommés `WhatsApp Image 2026-03-21 at HH.MM.SS(.jpeg)`, pris entre 10h23 et 18h59. Dimensions variables (1200x1600 à 2040x1148 px vus en échantillon), 300 à 400 Ko chacun.
  - 9 fichiers `.mp4` nommés `20260321_HHMMSS.mp4`, entre 11h50 et 11h58, environ 55 à 58 Mo chacun (courts clips vidéo de l'événement).
  - Sous-dossier `lkn/` (6 fichiers) : doublons de certaines photos WhatsApp ci-dessus (suffixe « - Copie »), sélection déjà faite côté LinkedIn, signal utile pour savoir lesquelles sont déjà jugées publiables.

Compte tenu du volume (186 fichiers, dont 129 quasi identiques par le nom), cette section
est un résumé par dossier et non un inventaire fichier par fichier. Liste complète
disponible sur demande.

### 02 Visuels bâtiment/ (8 fichiers, non copiés)

Plans et coupes techniques du bâtiment, hors PDF et fichier source `.ai` non redimensionnables.

| Fichier | Dimensions | Poids | Ce qu'il semble montrer |
| --- | --- | --- | --- |
| `26-03-21 09-31-30 0043.png` | 3000x5000 | 938,1 Ko | Visuel du bâtiment daté du 21/03/26, format portrait |
| `283-LMA Coupe pers a jour-01 v2.png` | 3455x1964 | 1109,3 Ko | Coupe perspective du bâtiment, version 2 (la plus récente des deux) |
| `283-LMA Coupe pers a jour-01.png` | 3455x1964 | 973,1 Ko | Coupe perspective du bâtiment, version 1 |
| `Coupe pers 26 02 04.pdf` | (PDF) | 2,8 Mo | Coupe perspective en PDF, datée du 04/02/26 |
| `Coupe technique.pdf` | (PDF) | 106,6 Ko | Coupe technique en PDF |
| `LMA_Coupe pers.ai` | (fichier source Illustrator) | 2,8 Mo | Fichier source de la coupe perspective |
| `coupe pers-01 26 02 04.png` | 14393x8183 | 2,2 Mo | Coupe perspective haute résolution, datée du 04/02/26 |
| `vue chassis.jpg` | 1920x1080 | 1,2 Mo | Vue rapprochée d'un châssis (fenêtre) du bâtiment |

Tous ces fichiers portent le même style que les plans déjà copiés (`esquisse-*`,
`plan-petit-1.png`, `visuel-dauphine-1.jpg`) : probablement © Basa Architecture également,
à confirmer avant usage.
