# Audit de rendu graphique — onze pages

Relevé du 2026-09-07. Build `node build.mjs --sortie .previsu/audit-rendu`, servi en HTTP local, ouvert sous Chromium (Playwright) à 375, 768, 900, 1100 et 1440 px. Captures pleine page et par tranche d'écran, regardées une à une. Contrastes calculés sur le fond réellement peint : pour les sections à dégradé et grain, la cible est masquée, la zone photographiée, la couleur moyenne relevée, puis l'encre la plus dense mesurée contre elle. Aucune valeur de ce rapport n'est estimée.

Onze pages et non dix : `soutenir` est apparue dans `src/pages/` à 18:57, pendant l'audit. Elle est incluse. `cgv-parts-sociales.html` et `politique-...html` ont bougé à 18:58 et `base.css` à 18:56 : tout a été rebâti et remesuré après ces écritures.

## Verdict

Les dix pages intérieures se reconnaissent : même en-tête de page, même échelle de titres (h1 48 px / 600, titre de bloc 48 px, titre d'appel 36,8 px), même alternance blanc / violacé / gris, même porte sombre en fin de page à deux gestes. Le socle a tenu.

Il a tenu sur la structure et lâché sur trois points que personne n'a vus parce que personne n'avait les dix pages sous les yeux : `.mesure` promet 68 signes et en livre 99 à 105, `.etapes` n'a aucune colonne de lecture et laisse filer des lignes à 135 signes, et quatre pages ont réinventé le champ de formulaire avec quatre contours différents dont deux échouent au 3:1 de la WCAG 1.4.11.

La charte est respectée sur le texte courant à trois exceptions près : deux pages ont inventé leur propre gris (`#66647A`, `#676579`), une troisième pose le violet `#766DA0` en texte sur fond violacé à 4,04 sous 1440 px. Les cinq couleurs chaudes ne vivent que sur l'accueil, qui y gagne son caractère et y perd trois combinaisons sous le seuil AA.

Deux pages déclenchent le veto slop : `cgv-parts-sociales`, quinze sections identiques dans un seul fond violacé de 11 005 px sans une seule respiration, et `soutenir`, trois blocs de prose interchangeables sans un accent ni une image. Deux autres en approchent.

Le défaut le plus lourd n'est pas dans une page mais dans le socle, et il touche les onze : la colonne de lecture est fausse de 46 %.

Décompte : **3 Critical, 40 Major, 33 Minor**, une entrée par sélecteur et par page. Une bonne moitié des Major remonte à quatre causes de socle seulement (`.mesure`, `.etapes`, le champ de formulaire, le marqueur de trou) : les corriger une fois en efface une vingtaine.

## Page par page

### accueil — 72/100

La page la plus aboutie du lot, et celle qui porte le plus de manquements mesurés. Sept écrans pleine hauteur, six ambiances, un vrai geste dans chacune. C'est la référence de famille et elle mérite de le rester. Ce qui suit ne demande pas de la refaire.

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Critical | `#agir .gestes` | 768 → 1100 | La grille garde ses trois colonnes jusqu'à 768 px. Colonnes mesurées : 190 px à 768, 205 à 820, 227 à 900, 253 à 1000, 278 à 1100, soit **24 à 35 signes par ligne**. Le troisième geste fait 160 px de haut contre 68 pour le premier. L'écran de conversion du site se lit en rubans. | Basculer en une colonne sous 1000 px : `@media (max-width: 999px) { .gestes { grid-template-columns: minmax(0,1fr); } .fleche--a, .fleche--b { display: none; } }`. Trois colonnes ne redeviennent lisibles qu'à 1200 px (38 signes). |
| Critical | `#infolettre .infolettre input` | toutes | Contour `1px solid var(--filet)` = `rgba(56,54,72,.16)` → `#DFDFE2` sur blanc : **1,33** pour un seuil de 3 (WCAG 1.4.11). Le champ ne se voit pas, alors que le bouton juste dessous porte un contour violet plein. `contacts.css` documente déjà ce calcul et l'a corrigé chez lui. | `border: 1.5px solid var(--violet)` (4,70), comme `.inscription__bloc input`. Puis monter la règle dans le socle. |
| Major | `#agir .geste h3` | 1440 | Blanc sur terracotta peint `#A2766D` : **3,91** pour 4,5. Titre à 17,28 px 700, sous le seuil du grand texte (18,66 px). | Assombrir le fond de `#agir` d'un voile de violet sombre à 10 % (le même procédé que `#le-pari`) ou passer les titres de geste à 19 px / 700 pour basculer au seuil 3. |
| Major | `#agir .geste p` | 1440 | Blanc sur terracotta peint `#A3776D` : **3,88** pour 4,5. Quinze éléments de texte concernés. | Idem. Le voile est la seule correction qui traite les deux lignes d'un coup. |
| Major | `#hero .jauge__nombre` | 375 et 1440 | `#5E9E85` sur fond peint `#E2E4EA` : **2,45** pour 3 (grand texte, 40,8 px 700). C'est le compteur de la campagne, le chiffre le plus regardé du site. | `color: var(--violet-sombre)` sur le nombre (10,1 sur ce fond) et garder le vert sur l'arc de la jauge, qui est un élément graphique et non du texte. |
| Major | `#le-lieu .niveaux .nom-structure` | 375 et 1440 | `#5E9E85` 13,6 px 700 sur fond peint `#F9F9F9` : **2,97** pour 4,5. Cinq noms de structures. | `color: var(--violet-sombre)`. Le vert reste sur les puces, où le seuil est 3. |
| Major | `#le-pari .pari__fort` | 1440 | Blanc 16,8 px 700 sur violet peint `#7A74AB` : **4,29** pour 4,5. Le commentaire d'`accueil.css` ligne 511 annonce 4,04 et renvoie l'arbitrage à l'audit : arbitré ici, c'est non. | Porter le voile de violet sombre de 8 % à 14 %. Le fond descend à `#6E689B`, le blanc passe 4,6. La perte de saturation est réelle mais le violet reste celui de la charte, seulement assombri. |
| Minor | `#les-etapes .jalon__fleche` | 900 et 1440 | `#5E9E85` sur fond peint `#F4F4F6` : **2,84** pour 3 même traité en élément graphique. | `color: var(--violet-sombre)`, ou `var(--kaki)` si l'on tient à la couleur (3,0 tout juste). |
| Minor | `.infolettre input::placeholder` | toutes | `#8a889c` en dur, hors charte, **3,45** sur blanc. | `color: rgba(86, 84, 107, .78)` → 4,53. |
| Minor | `.marqueur` (5 occurrences) | toutes | Cinq surlignages sur une page. `conventions.md` : « Un mot ou deux par page au maximum, sinon il ne surligne plus rien. » | En garder deux : le heros et `#le-pari`. Les trois autres passent en `<strong>`. |
| Minor | `#agir .porte` | 820 | Les deux encarts blancs de fin d'écran ont des hauteurs très inégales ; le lien « Je fais un don » flotte à 90 px sous son texte. | `align-items: start` sur la grille des encarts, ou retirer le `margin-top: auto` hérité sur le second. |

### le-projet-architectural — 82/100

La page intérieure la mieux composée. Trois images, alternance texte/image inversée d'un bloc à l'autre, deux variantes de figure qui méritent le socle. Rien de générique ici.

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Major | `#chantier .etapes > li` | 1440 | `max-width: none` : la ligne la plus longue fait **127 signes** sur 1136 px. Le socle ne pose aucune colonne sur `.etapes`. | Corriger dans le socle (voir « ce qui monte »), pas ici. |
| Minor | `.a-sourcer--bloc` | 1440 | Ligne à 94 signes dans un encart déjà signalé comme trou. | Hérite de la correction de `.mesure`. |
| Minor | `@media (min-width: 880px)` | 880 | Sixième valeur de point de rupture du site, propre à cette page. | Aligner sur 900, valeur déjà utilisée par `lequipe-projet`. |
| Minor | `.figure--large`, `.figure--dessin` | toutes | Deux variantes de figure inventées dans la feuille de page alors que trois autres pages ont besoin d'images plus grandes ou plus hautes que les 268 px du socle. | Monter dans `base.css`. |

### contacts — 82/100

Correcte, sobre, la seule page dont le champ de formulaire passe les seuils sans discussion, et qui l'a écrit dans son commentaire.

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Major | `.inscription__bloc input::placeholder` | toutes | `#8a889c` en dur, hors charte, **3,45** sur blanc. | `rgba(86, 84, 107, .78)` → 4,53. |
| Major | `.inscription` | toutes | Troisième implémentation d'un formulaire d'infolettre sur le site (`accueil.css` et `part-sociale.css` en portent deux autres sous le nom `.infolettre`). | Un seul composant dans le socle. Celui-ci est le bon point de départ : c'est le seul dont le contour tient 4,70. |
| Minor | `#message .bloc__intro` | 1440 | 85 signes sur la ligne la plus longue, `max-width: 62ch` du socle. | Hérite de la correction de `.bloc__intro`. |
| Minor | `.voies .voie` | 1440 | Les six rangées de « Où va votre message » n'ont pas de filet de séparation en haut de la première : la liste commence sans se déclarer. | `border-top` sur `.voies` ou `border-top` sur `.voie:first-child`. |
| Minor | `.inscription__accord a` | 375 | Lien de 216 × 17 px, cible sous 44 px, sans pseudo-élément d'agrandissement. | Ajouter le motif du socle : `.inscription__accord a::after { content:""; position:absolute; inset:-12px -4px; }`. |

### lequipe-projet — 78/100

Bien tenue, la fiche latérale de la coopérative est le meilleur objet de la page. Mais six trous à sourcer visibles et pas une image, alors que dix visuels correspondants dorment dans `assets/img/`.

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Major | `.a-sourcer` (6 occurrences) | toutes | Six encadrés tiretés terracotta, dont un au milieu d'une définition de structure (`.exploitantes`) qui casse la lecture de la liste. | Ce sont des trous légitimes en recette. Le nombre, lui, ne l'est pas sur une page de 5 blocs : regrouper en un seul bloc de manques en pied de section. |
| Major | `.exploitantes`, `.metiers` | toutes | Zéro image sur toute la page, avec `[À SOURCER : photo du collectif]` en tête, alors que `part_ostara.jpg`, `part_beguinage.jpg`, `part_cafe.jpg`, `part_sante.jpg`, `part_banjo.jpg`, `pro_basa.png`, `pro_ekola.png`, `pro_lafaye.png`, `pro_unitoit.png`, `pro_weco.png` existent dans `src/assets/img/` et ne sont référencés nulle part. | Poser les cinq visuels de structures et les cinq logos de métiers. La page passe de liste à galerie sans changer un mot. |
| Major | `.a-sourcer` (règle) | — | Classe du socle redéfinie dans la feuille de page. `conventions.md` : « Une regle presente a deux endroits est une regle qui divergera. » | Supprimer la redéfinition locale. |
| Minor | `.mesure > p` | 1440 | 99 signes sur la ligne la plus longue. | Hérite de la correction de `.mesure`. |
| Minor | `@media (max-width: 899px)` | 899 | Point de rupture propre à la page. | Aligner sur la valeur retenue pour le site. |

### le-modele-economique — 78/100

Alternance nette, `.faits` bien posés, la démonstration se suit. Le seul reproche visuel est la grille de trois cartes en ouverture, sauvée par le fait que le titre annonce littéralement « Trois piliers, pas un seul ».

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Major | `#etapes .etapes > li` | 1440 | 99 à 101 signes par ligne. | Hérite de la correction de `.etapes`. |
| Major | `.a-sourcer`, `.etapes` (règles) | — | Deux classes du socle redéfinies dans la feuille de page. | Supprimer les redéfinitions. |
| Minor | `#piliers .piliers .carte` | 1440 | Trois cartes strictement identiques, même longueur de texte, même note en pied. Le contenu les justifie, la forme ne les distingue pas. | Donner au pilier « fonds propres » le poids qui lui revient : c'est le seul des trois que la campagne alimente. Un fond `var(--jaune)` ou un `.carte` en pleine largeur au-dessus des deux autres. |
| Minor | `#vivre .puces` | 1440 | Cinq puces sans colonne de lecture dans `.contenu`, 101 signes. | Envelopper dans `.mesure`. |
| Minor | — | toutes | Zéro image sur 2 279 px de page. | `plan-petit-1.png` ou `esquisse-1.jpg` dans « Comment le lieu vivra une fois ouvert ». |

### prendre-part — 76/100

Le formulaire le mieux construit du site : contour à 3,48, aide sous chaque champ, honeypot hors écran, encart menthe qui dit ce que la page ne demande pas. Deux défauts de mise en page l'abîment.

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Major | `#parcours .etapes > li p` | 1440 | **135 signes** sur la ligne la plus longue, 1059 px de large. Record du site. La grille à deux colonnes n'arrive qu'à 980 px et n'affecte pas cette section. | `max-width` sur le `li` de `.etapes` dans le socle. |
| Major | `#declaration .declaration` | 768 → 979 | `max-width: 40rem` (640 px) alors que `.declaration-grille` est encore à une colonne de 836 px : la carte du formulaire est calée à gauche avec **196 px de fond violacé mort** à sa droite sur 900 px de haut, sous un encart menthe qui, lui, fait toute la largeur. Rien ne s'aligne. | `@media (max-width: 979px) { .declaration { margin-inline: auto; } .garde { max-width: 40rem; margin-inline: auto; } }`. |
| Major | `.champ input` `.champ textarea` | toutes | `border: 1.5px solid #8A8896` : couleur en dur hors charte. Le contour tient (3,48) mais la valeur n'existe pas dans la charte. | Déclarer `--contour-champ: #8A8896` dans `base.css` avec le calcul en commentaire, ou retenir `var(--violet)` de `contacts`. |
| Major | `.champ__aide`, `.champ__option`, `.declaration__note` | toutes | `color: #676579` : gris inventé, hors charte, 15 occurrences. | `rgba(86, 84, 107, .86)`, valeur déjà utilisée par `.carte__note` dans le socle (5,11 sur blanc). |
| Major | `.etapes`, `.bloc--sombre` (règles) | — | Deux classes du socle redéfinies dans la feuille de page. | Supprimer les redéfinitions. |
| Minor | `#consentement` | 375 | Case à cocher de 24 × 24 px. Passe le minimum WCAG 2.5.8 mais reste sous la cible de 44 px pour un pouce, sur la seule case qui conditionne l'envoi. | `width: 24px; height: 24px;` conservés, et zone étendue par le label : `.champ--case label { padding: 10px 0; }`. |
| Minor | `#consentement-aide a.lien-doux` | 375 | Cible de 218 × 37 px. | Même pseudo-élément d'agrandissement. |
| Minor | `@media (min-width: 640px)` `(min-width: 980px)` | — | Deux points de rupture propres à la page, aucun partagé. | Aligner sur l'échelle du site. |
| Minor | `.lien-doux` | toutes | Troisième classe de lien en ligne du site, après `.lien-texte` du socle et `.lien` de `part-sociale`. | Une seule. |

### les-medias — 70/100 (veto slop, `#espace-presse`)

La grille des parutions est une grille de cartes identiques, mais elle liste six parutions : la forme suit le contenu, je ne la retiens pas contre la page. Le veto se déclenche sur `#espace-presse`, qui empile chiffres, trois lignes de projet, contact, visuels et repères dans un seul bloc violacé de 1 739 px, sans un changement de fond ni un filet : cinq idées dans un bloc, là où la règle du socle en veut une.

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Major | `#espace-presse` | toutes | 1 739 px d'un seul fond, cinq sous-parties de nature différente, aucune séparation. Déclenche le veto. | Couper en deux blocs : `#espace-presse` (faits + les trois lignes) sur `--blanc`, `#ressources` (contact + visuels + repères) sur `--violace`. La page passe de 4 à 5 sections et retrouve le rythme des autres. |
| Major | `.presse .figure img` | 1440 | Affichée en 768 × 268, soit un rapport de **2,87** contre 1,60 natif. `object-fit: cover` ne déforme pas mais **coupe 44 % de la hauteur du rendu** : le toit du bâtiment est tranché. Le plafond de 268 px du socle est calibré sur les 494 px de la home, pas sur les 768 px d'ici. | `max-height: 430px` sur cette figure (rapport 1,79), ou la variante `.figure--large` de `le-projet-architectural` montée dans le socle. |
| Major | `.parutions .carte` | toutes | Six cartes sans une vignette, alors que `article-_01.jpg` à `article-_05.jpg` existent dans `src/assets/img/` et ne sont référencés nulle part. | Poser les cinq visuels en tête de carte, ou à défaut le nom du titre de presse en composition typographique. |
| Major | `.a-sourcer`, `.fait__nombre--date` (règles) | — | Classe du socle redéfinie, et variante d'un composant du socle déclarée dans une feuille de page. | Redéfinition supprimée, variante montée dans le socle. |
| Minor | `.parutions .carte` | 900 | Le `[À SOURCER : date exacte de diffusion]` dans la carte France 3 pousse son titre une ligne plus bas que celui de sa voisine : les deux cartes de la rangée ne s'alignent plus. | Placer le trou sous la description plutôt que dans la ligne de source. |
| Minor | `.presse-contact a` | 375 | Cible de 274 × 30 px. | Pseudo-élément d'agrandissement. |
| Minor | `.mesure > p` | 1440 | 99 signes. | Hérite de `.mesure`. |

### part-sociale — 68/100

Dix blocs, 10 900 px, la meilleure transformation de tableau du site (le comparatif don/part devient des cartes empilées à 375, parfaitement lisible) et pas une image sur toute la longueur. Seize encadrés `.arbitrage` rythment la page à la place d'un vrai accent. La page ne déclenche pas le veto : le tableau, les étapes et la FAQ cassent la répétition. Elle en est proche.

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Major | `.arbitrage` (16 occurrences) | toutes | Seize encadrés violets tiretés, un par sous-section, qui deviennent de fait la seule structure visuelle de la page. Ligne la plus longue mesurée : **125 signes**. | Corps de l'encadré à `.86rem` avec `max-width: 60ch`. Et sur le fond : seize arbitrages ouverts sur une page de vente signalent que la page a été écrite avant d'être décidée. |
| Major | `#comment .bloc--gris` | 1440 | Un seul bloc de **2 429 px** de fond gris, le plus long du site après les CGV. | Couper après « Comment on souscrit » et remettre la FAQ sur `--blanc`. |
| Major | `.infolettre input` | 1440 | `border: 1px solid rgba(255,255,255,.4)` sur `background: var(--blanc)` : le contour est blanc sur blanc, **1,00**. Règle morte. Le champ ne se voit que par son aplat contre le bloc sombre (11,74), donc rien n'est cassé, mais la déclaration ment. | Supprimer le contour, ou le porter à `rgba(255,255,255,.8)` sur un champ à fond `rgba(255,255,255,.07)` pour un vrai champ sur fond sombre. |
| Major | `.arbitrage__texte`, `.apres-tableau`, `.faq__sortie` | toutes | `color: #66647A` : gris inventé, hors charte, 30 occurrences. | `rgba(86, 84, 107, .86)`. |
| Major | `.prose`, `.puces`, `.question`, `.question__reponse`, `.infolettre`, `.sommaire` (règles) | — | Six classes du socle ou d'une autre feuille redéfinies ici. `.infolettre` et `.sommaire` portent le même nom que dans deux autres feuilles avec des règles différentes. | Voir « ce qui monte ». |
| Minor | `.sommaire` | 900 | Rangée de sept liens soulignés sans libellé ni cadre, posée sur le gris de `.page-tete` : elle se lit comme une seconde navigation et non comme un sommaire. | Lui donner le libellé « SOMMAIRE » de `cgv-parts-sociales`. |
| Minor | `.lien` | toutes | Quatrième classe de lien en ligne du site. | Utiliser `.lien-texte`. |
| Minor | `p > a.lien` | 375 | Cinq liens de 20 à 21 px de haut. | Liens en ligne, exemptés de la cible de 44 px : rien à faire, noté pour mémoire. |
| Minor | — | toutes | Zéro image sur 10 900 px. | `esquisse-2.jpg` ou `cordee.png` en respiration au milieu de la page. |

### politique-de-confidentialite-mentions-legales — 62/100

Bien structurée, sommaire en quatre groupes réussi, mais c'est la seule page du site qui ne se ferme pas, et son tableau de conservation n'est pas lisible sur un téléphone.

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Critical | `#durees .tableau-cadre .tableau--durees` | 375 | Tableau de 5 colonnes dans un cadre à défilement horizontal de 375 px : **2,5 colonnes visibles**, rangées de 200 à 260 px de haut pour un ou deux mots par cellule, et une note sous le tableau qui admet qu'il faut le faire défiler. `part-sociale` a résolu exactement ce problème en empilant le tableau en cartes. | Reprendre le motif de `.comparatif` : `@media (max-width: 767px)` qui passe `thead` en `visuellement-cache`, `tr` en carte, et chaque `td` précédé de son intitulé en `::before` depuis un `data-libelle`. Et monter ce motif dans le socle. |
| Major | `main.legal > section:last-child` | toutes | La page se termine sur `.prose.legal__rubrique`, fond transparent : **aucun bloc sombre de fin**. Le blanc du contenu touche directement le violet sombre du pied. Les neuf autres pages ferment sur `.bloc--sombre`. La page sœur `cgv-parts-sociales`, qui a le même statut légal, ferme bien, elle, sur un bloc sombre. | Ajouter un `.bloc--sombre` de clôture. Sans `.appel` commercial : le motif « L'émetteur » de `cgv-parts-sociales` convient exactement, avec le `.retour` dedans. |
| Major | `.legal__version` | 1440 | `rgba(86,84,107,.8)` → `#767487` sur `#F5F5F6` peint `#E6E6E7` : **3,83** pour 4,5. | Porter l'opacité à `.92` (4,74) ou utiliser `var(--texte)` plein. |
| Major | `.legal__note-tableau` | 375 | `rgba(86,84,107,.82)` → `#737184` sur `#F5F5F6` : **4,36** pour 4,5. | Opacité à `.88` → 4,63. |
| Major | `.sommaire__grille li > a`, `.sommaire__partie > a` | 375 | Vingt liens de sommaire de **27 à 28 px de haut**, sans pseudo-élément d'agrandissement, dans une liste dense. Le socle applique ce motif au pied ; le sommaire ne l'a pas repris. | `.sommaire a { display: flex; align-items: center; min-height: 44px; }` sous 768 px. |
| Major | `.a-sourcer` (11 occurrences) | toutes | Onze encadrés tiretés terracotta, dont huit dans le seul bloc « Mentions légales » : le bloc se lit comme un formulaire à remplir. C'est le plus grand nombre de trous du site. | Légitime en recette. Mais un bloc où le manquant domine le rédigé doit porter un avertissement en tête plutôt que onze marques. |
| Minor | `h2#sommaire-titre` | 1440 | `h2` rendu à **12,48 px** alors que les `h3` de la même page font 24,48 px. Inversion de hiérarchie visuelle. | Garder le `h2` pour la structure et le styler à 14 px en capitales espacées assumées, ou le passer en `p` avec `aria-label` sur la `nav`. |
| Minor | `.sommaire` | 900 | Troisième implémentation de sommaire du site. | Voir « ce qui monte ». |
| Minor | `span.a-sourcer` | 1440 | 106 signes sur la ligne la plus longue. | Hérite de `.mesure`. |

### soutenir — 66/100 (veto slop, `#part` / `#don` / `#circuler`)

Feuille de style exemplaire : sept lignes, une classe, tout vient du socle. C'est le modèle que les autres devraient suivre pour le code. Et c'est précisément pour cela que la page est un gabarit : trois sections identiques, chacune un `bloc__titre`, trois paragraphes et un lien, sans une image, un chiffre, une puce, un surlignage ni une carte. Le veto se déclenche sur la succession `#part` / `#don` / `#circuler` : trois blocs interchangeables au même rythme, aucun accent sur toute la page.

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Major | `#part`, `#don`, `#circuler` | toutes | Trois unités strictement identiques, aucun accent, aucune image, aucun composant du socle au-delà de `.mesure` et `.prose`. Déclenche le veto. | La page compare trois gestes : c'est un usage de `.grille--3` avec `.carte`, ou d'un `.faits` (100 €, 66 %, 0 €) qui donne à voir la différence entre les trois. En l'état, elle dit trois fois la même chose de la même façon. |
| Major | `#part .mesure > p` | 1440 | 103 signes sur la ligne la plus longue. | Hérite de `.mesure`. |
| Minor | `.soutenir__geste` | toutes | Marge posée dans la feuille de page pour un espacement que `.prose > * + *` couvre déjà. | Supprimer, la page n'a alors plus de feuille du tout. |

### cgv-parts-sociales — 58/100 (veto slop, `#conditions`)

Quinze articles numérotés dans **un seul `.bloc--violace` de 11 005 px**, sans un changement de fond, sans une image, sans un accent de couleur, sans un chiffre mis en avant. La règle du socle — « deux blocs de meme fond qui se suivent sont un seul bloc » — a été respectée à la lettre en n'en faisant qu'un, et le résultat est onze mètres de la même chose. Le veto se déclenche sur `#conditions`. Le sommaire d'ouverture est le meilleur du site et la page se ferme correctement sur un bloc sombre : c'est ce qui la maintient au-dessus de 50.

| Sév. | Sélecteur | Largeur | Défaut | Correction |
|---|---|---|---|---|
| Major | `#conditions` | toutes | Un bloc de 11 005 px, quinze sections au rythme identique, séparées par un simple filet. Aucune respiration sur 92 % de la page. Déclenche le veto. | Découper en quatre blocs alternés selon les groupes que le sommaire annonce déjà : ce qu'est une part (1-4) sur `--blanc`, souscrire (5-8) sur `--violace`, sortir (9-12) sur `--gris`, le cadre (13-15) sur `--blanc`. Le sommaire devient alors une carte de la page et non une liste. |
| Major | `.cgv__titre` | toutes | Titres de section rendus à **27,2 px / 600** à 1440 px, contre 48 px sur les neuf autres pages. Le commentaire assume un titre « plus petit que `.bloc__titre` » mais l'écart est de moitié : la page paraît d'un autre site. | Si le découpage en quatre blocs est fait, les quatre titres passent en `.bloc__titre` à 48 px et les quinze articles en `h3` : la hiérarchie redevient celle du site. |
| Major | `.cgv__num` | 375 → 1100 | `#766DA0` sur `#EDEDF5` : **4,04** pour 4,5. À 1440 px la taille monte à 27,2 px et le seuil tombe à 3, donc le défaut n'existe qu'en dessous — c'est-à-dire sur tous les téléphones et la plupart des portables. Exactement le cas annoncé : le violet ne tient pas comme texte sur fond clair. | `color: var(--violet-sombre)` (10,08 sur violacé). Le numéro reste distinct par sa graisse tabulaire et sa colonne. |
| Major | `.cgv__article` | 1440 | `max-width: none` sur le conteneur ; les paragraphes tiennent par `.mesure` mais montent à **105 signes**, le maximum du site parmi les pages qui utilisent la colonne du socle. | Hérite de la correction de `.mesure`. |
| Major | `.trou` (20 occurrences) | toutes | Vingt encadrés à filet jaune, troisième nom pour la même chose que `.a-sourcer` (socle) et `.arbitrage` (`part-sociale`). | Un seul composant, celui du socle. |
| Major | `.tableau`, `.tableau-cadre`, `.prose`, `.sommaire` (règles) | — | Quatre classes du socle ou d'une autre feuille redéfinies ici. | Voir « ce qui monte ». |
| Minor | `.sommaire li > a` | 375 | Liens de sommaire de 42 px de haut, deux pixels sous la cible. | `min-height: 44px`. |
| Minor | `#emetteur` | toutes | Le bloc de clôture est bien sombre mais ne porte pas `.appel` : pas de titre d'appel, un seul geste au lieu de deux. Neuf pages sur onze ferment sur `.appel` à deux gestes. | Structurer en `.appel` avec « Revenir à la page La part sociale » en `.lien-texte` et l'identité de l'émetteur en `.appel__sous`. |
| Minor | `@media (max-width: 479px)` | 479 | Point de rupture propre à la page. | Aligner. |

## Incohérences entre pages

| Ce qui diverge | Les états observés | Aligner sur |
|---|---|---|
| **Champ de formulaire** | Quatre implémentations : `accueil .infolettre input` (contour `--filet`, **1,33**, hauteur 44, rayon 7), `part-sociale .infolettre input` (contour blanc sur blanc, **1,00**, hauteur 48, rayon 6), `contacts .inscription__bloc input` (contour `--violet`, **4,70**, hauteur 48, rayon 7), `prendre-part .champ input` (contour `#8A8896`, **3,48**, hauteur 50, rayon 8). Deux placeholders différents. | `contacts` : c'est la seule dont le contour tient sans discussion, et sa feuille porte déjà le calcul en commentaire. Un composant `.champ` unique dans `base.css`, hauteur 48, rayon 8, contour `var(--violet)`. |
| **Marqueur de ce qui n'est pas tranché** | Trois noms, trois dessins, un seul métier : `.a-sourcer` (socle, tiret terracotta, 4 pages, 20 usages), `.trou` (`cgv`, filet jaune sur fond gris, 20 usages), `.arbitrage` (`part-sociale`, tiret violet sur fond violet clair, 16 usages). | `.a-sourcer` du socle, avec deux variantes déclarées là-bas : `--bloc` pour un paragraphe entier et `--arbitrage` pour une décision en attente. Trois pages redéfinissent en plus `.a-sourcer` dans leur feuille. |
| **Sommaire de page** | Trois implémentations sous le **même nom de classe** `.sommaire`, dans trois feuilles : `cgv` (liste numérotée deux colonnes, libellé « SOMMAIRE »), `politique` (grille de quatre groupes, libellé « SUR CETTE PAGE »), `part-sociale` (rangée de liens soulignés, sans libellé). | Le modèle de `politique` : c'est le seul qui hiérarchise. Monter en `.sommaire` + `.sommaire__groupe`, avec `min-height: 44px` sur les liens en dessous de 768 px. |
| **Formulaire d'infolettre** | `.infolettre` déclaré dans `accueil.css` (lignes 823-860) **et** dans `part-sociale.css` (lignes 176-192), règles différentes ; `.inscription` dans `contacts.css` fait le même travail sous un autre nom. Trois formulaires d'inscription, trois looks. | Un `.infolettre` dans le socle, avec une variante `--sombre` pour le bloc de fin de `part-sociale`. |
| **Tableau sur téléphone** | `part-sociale .comparatif` s'empile en cartes lisibles à 375 ; `politique .tableau--durees` reste un tableau de 5 colonnes dans un cadre à défilement, illisible ; `cgv` s'en tire avec 3 colonnes qui tiennent. | Le motif d'empilement de `part-sociale`, monté dans le socle en `.tableau--empile`. |
| **Lien en ligne** | `.lien-texte` (socle), `.lien` (`part-sociale`), `.lien-doux` (`prendre-part`), plus la règle `a:not([class])` du socle. Quatre traitements. | `.lien-texte` du socle et `a:not([class])` pour le fil du texte. Supprimer les deux autres. |
| **`.etapes`** | Composant du socle redéfini dans trois feuilles (`le-modele-economique`, `le-projet-architectural`, `prendre-part`), avec trois largeurs de texte résultantes : 99, 127 et 135 signes. | Une colonne de lecture posée une fois dans le socle. Supprimer les trois redéfinitions. |
| **Points de rupture** | Le socle en déclare un (767). Les pages en ajoutent six autres, tous différents : 359 et 1080 (`accueil`), 479 (`cgv`), 640 et 980 (`prendre-part`), 880 (`le-projet-architectural`), 899 (`lequipe-projet`). | Une échelle de trois valeurs écrite dans `conventions.md` : 640, 900, 1200. Sept pages n'ont alors plus besoin de leur point propre. |
| **Fin de page** | Neuf pages ferment sur `.bloc--sombre` + `.appel` à deux gestes. `cgv` ferme sur `.bloc--sombre` sans `.appel` et à un seul geste. `politique` ne ferme pas du tout : son dernier bloc est transparent et touche le pied. | La porte sombre sur les onze. Une variante `.appel--sobre` sans bouton pour les deux pages légales, qui ne vendent rien. |
| **Images** | Quatre pages sur onze portent une image : `accueil` (2), `le-projet-architectural` (3), `les-medias` (1), `contacts` (1). Sept pages n'en ont aucune, dont `part-sociale` sur 10 900 px et `cgv` sur 12 900 px. **31 fichiers de `src/assets/img/` ne sont référencés nulle part**, dont les cinq visuels de parutions et les dix logos de structures et de métiers. | Au minimum une image par page de plus de 3 000 px. Les fichiers existent déjà, la charge de production est nulle. |
| **Graisse des titres** | `accueil` compose tous ses titres en 700. Les dix autres en 600. | 600 partout, ou 700 partout. L'écart se voit quand on passe de la home à une page intérieure. |
| **Gris de texte secondaire** | `--texte` `#56546B` (socle), `rgba(86,84,107,.86)` (socle, `.carte__note`), `#66647A` (`part-sociale`, 30 usages), `#676579` (`prendre-part`, 15 usages). | `rgba(86, 84, 107, .86)`, valeur déjà dans le socle. Les deux gris inventés disparaissent. |

## Contrastes mesurés

Rapports WCAG 2.x calculés sur la couleur composée après application de l'opacité et, pour les fonds à dégradé et grain, sur le fond réellement peint relevé au pixel. Seuil 4,5 pour du texte, 3 pour du grand texte (≥ 24 px, ou ≥ 18,66 px en 700) et pour un élément graphique ou un contour de champ (WCAG 1.4.11).

### Le socle

| Combinaison | Rapport | Seuil | Verdict |
|---|---|---|---|
| `--violet-sombre` `#383648` sur `--blanc` | 11,74 | 4,5 | OK |
| `--violet-sombre` sur `--gris` `#F5F5F6` | 10,77 | 4,5 | OK |
| `--violet-sombre` sur `--violace` `#EDEDF5` | 10,08 | 4,5 | OK |
| `--texte` `#56546B` sur `--blanc` | 7,30 | 4,5 | OK |
| `--texte` sur `--gris` | 6,70 | 4,5 | OK |
| `--texte` sur `--violace` | 6,27 | 4,5 | OK |
| `--blanc` sur `--violet-sombre` | 11,74 | 4,5 | OK |
| `--jaune` `#FFF3A8` sur `--violet-sombre` | 10,42 | 4,5 | OK |
| `--menthe` `#BAFFE4` sur `--violet-sombre` | 10,35 | 4,5 | OK |
| `--violet-sombre` sur `--jaune` (bouton d'appel) | 10,42 | 4,5 | OK |
| `--violet-sombre` sur trace du `.marqueur` `#FFF3A8` | 10,42 | 4,5 | OK |
| `rgba(255,255,255,.88)` → `#E7E7E9` sur `--violet-sombre` (`.bloc--sombre`) | 9,50 | 4,5 | OK |
| `rgba(255,255,255,.86)` → `#E3E3E5` sur `--violet-sombre` (pied) | 9,15 | 4,5 | OK |
| `rgba(255,255,255,.70)` → `#C3C3C8` sur `--violet-sombre` (`.pied__bas`) | 6,67 | 4,5 | OK |
| `rgba(255,255,255,.66)` → `#BBBBC1` sur `--violet-sombre` (`.carte__note`) | 6,13 | 4,5 | OK |
| `rgba(86,84,107,.86)` → `#6E6C80` sur `--blanc` (`.carte__note`) | 5,11 | 4,5 | OK |
| `rgba(86,84,107,.86)` → `#6C6B7E` sur `--gris` | 4,78 | 4,5 | OK |
| `rgba(86,84,107,.88)` → `#69677C` sur `--gris` (`.figure figcaption`) | 5,01 | 4,5 | OK |
| `--violet` `#766DA0` sur `--blanc` | 4,70 | 4,5 | OK, sans marge |
| `--violet` sur `--gris` | 4,32 | 4,5 | **Échec** |
| `--violet` sur `--violace` | 4,04 | 4,5 | **Échec** |
| `--filet` `rgba(56,54,72,.16)` → `#DFDFE2` sur `--blanc`, en contour de champ | 1,33 | 3 | **Échec** |
| `--vert` `#5E9E85` sur `--blanc` | 3,13 | 4,5 | Échec en texte, OK en graphique |
| `--kaki` `#9D9669` sur `--blanc` | 3,00 | 4,5 | Échec en texte, limite en graphique |
| `--terracotta` `#A3716A` sur `--blanc` | 4,10 | 4,5 | Échec en texte |
| `--vert` sur `--gris` | 2,87 | 3 | **Échec, y compris en graphique** |
| `--kaki` sur `--gris` | 2,75 | 3 | **Échec, y compris en graphique** |

Le violet de la charte ne tient comme texte que sur le blanc pur, et de justesse. Sur les deux autres fonds clairs du site il échoue. Aucune page ne l'emploie comme corps de texte : la seule occurrence est `cgv-parts-sociales .cgv__num`, relevée ci-dessous. La consigne est donc tenue, à une exception près, mais il faut l'écrire dans le socle avant qu'une douzième page ne l'oublie.

### Les pages

| Page, sélecteur | Combinaison mesurée | Rapport | Seuil | Verdict |
|---|---|---|---|---|
| `accueil #hero .jauge__nombre` | `#5E9E85` 40,8 px 700 sur fond peint `#E2E4EA` | **2,45** | 3 | Échec |
| `accueil #les-etapes .jalon__fleche` | `#5E9E85` sur fond peint `#F4F4F6` | **2,84** | 3 | Échec |
| `accueil #le-lieu .nom-structure` | `#5E9E85` 13,6 px 700 sur fond peint `#F9F9F9` | **2,97** | 4,5 | Échec |
| `accueil .infolettre input::placeholder` | `#8a889c` sur `#FFFFFF` | **3,45** | 4,5 | Échec |
| `contacts .inscription__bloc input::placeholder` | `#8a889c` sur `#FFFFFF` | **3,45** | 4,5 | Échec |
| `accueil #agir .geste p` | `#FFFFFF` 15,2 px sur terracotta peint `#A3776D` | **3,88** | 4,5 | Échec |
| `accueil #agir .geste h3` | `#FFFFFF` 17,28 px 700 sur terracotta peint `#A2766D` | **3,91** | 4,5 | Échec |
| `politique .legal__version` | `rgba(86,84,107,.8)` → `#767487` sur `#E6E6E7` peint | **3,83** | 4,5 | Échec |
| `cgv .cgv__num` (≤ 1100 px) | `#766DA0` 21,12 px 600 sur `#EDEDF5` | **4,04** | 4,5 | Échec |
| `cgv .cgv__num` (1440 px) | `#766DA0` 27,2 px 600 sur `#EDEDF5` | 4,04 | 3 | OK |
| `accueil #le-pari .pari__fort` | `#FFFFFF` 16,8 px 700 sur violet peint `#7A74AB` | **4,29** | 4,5 | Échec |
| `politique .legal__note-tableau` | `rgba(86,84,107,.82)` → `#737184` sur `#F5F5F6` | **4,36** | 4,5 | Échec |
| `accueil li > .eq` | `#766DA0` 21,6 px 700 sur `#EDEDF5` | 4,04 | 3 (signe graphique) | OK |
| `accueil #le-pari h2` | `#FFFFFF` 48 px 700 sur violet peint `#8374A1` | 4,21 | 3 | OK |
| `part-sociale .arbitrage--sombre` | `rgba(255,255,255,.9)` → `#F2F2F3` sur `#383648` | 10,42 | 4,5 | OK |
| `part-sociale .infolettre input::placeholder` | `#6B697F` sur `#FFFFFF` | 5,31 | 4,5 | OK, hors charte |
| `part-sociale` textes secondaires | `#66647A` sur `#FFFFFF` | 5,72 | 4,5 | OK, hors charte |
| `prendre-part .champ__aide` | `#676579` sur `#FFFFFF` | 5,65 | 4,5 | OK, hors charte |

### Contours de champ (WCAG 1.4.11, seuil 3)

| Page, sélecteur | Contour composé sur son fond | Rapport | Verdict |
|---|---|---|---|
| `accueil .infolettre input` | `#DFDFE2` sur `#FFFFFF` | **1,33** | Échec |
| `part-sociale .infolettre input` | `#FFFFFF` sur `#FFFFFF` (contour blanc sur champ blanc) | **1,00** | Règle morte ; le champ reste visible par son aplat contre le bloc sombre (11,74) |
| `prendre-part .champ input` | `#8A8896` sur `#FFFFFF` | 3,48 | OK |
| `contacts .inscription__bloc input` | `#766DA0` sur `#FFFFFF` | 4,70 | OK |
| `prendre-part`, `contacts` champs pièges | `#767676` sur `#FFFFFF` | 4,54 | OK, hors écran |

## Ce qui mérite de monter dans le socle

Par ordre de ce que ça répare.

**1. `.mesure`, corrigée.** `max-width: 68ch` compute à 768,74 px et rend **99 à 105 signes** en Onest à 17 px, mesuré au `Range.getClientRects()` sur les onze pages. L'unité `ch` vaut la largeur du zéro, qui fait 11,3 px là où le signe moyen d'Onest fait 7,24 px : le composant dépasse sa propre promesse de 46 %. Toutes les pages qui obéissent à la convention lisent à 100 signes. Correction : `max-width: 48ch` donne 75 signes, la borne haute du confort typographique ; `44ch` donne les 68 annoncés. Et écrire la mesure en commentaire pour que la prochaine génération ne refasse pas le calcul.

**2. Une colonne de lecture sur `.etapes`.** `.etapes > li` n'a aucun plafond : 135 signes sur `prendre-part`, 127 sur `le-projet-architectural`, 99 sur `le-modele-economique` — les trois pages qui l'emploient, avec trois résultats parce que chacune l'a redéfinie dans sa feuille. `.etapes > li { max-width: calc(48ch + 3.4rem); }` règle les trois d'un coup et rend les trois redéfinitions inutiles.

**3. `.champ`, le champ de formulaire.** Quatre pages l'ont réinventé, deux échouent au 3:1. C'est le composant le plus dupliqué du site et le seul dont la duplication produise une faute d'accessibilité. Un `.champ`, un `.champ__aide`, un `.champ--case` dans `base.css`, sur le modèle de `contacts` pour le contour et de `prendre-part` pour l'aide et les hauteurs. `contacts.css` porte déjà le raisonnement complet en commentaire : il n'y a rien à redécouvrir, seulement à déplacer.

**4. `.sommaire`.** Trois pages, trois implémentations, **le même nom de classe**. Le modèle de `politique` (groupes titrés) est le seul qui hiérarchise ; celui de `cgv` (numéroté) en est la variante `--numerote`. Avec `min-height: 44px` sur les liens sous 768 px, ce que ni l'un ni l'autre n'a.

**5. `.tableau--empile`.** `part-sociale` a écrit la seule transformation de tableau qui rende un tableau lisible sur 375 px. `politique` en a besoin aujourd'hui et l'a raté. Monter le motif : `thead` en `visuellement-cache`, `tr` en carte, `td::before` alimenté par `data-libelle`.

**6. `.a-sourcer`, avec ses variantes.** Trois noms pour un métier — `.a-sourcer` (socle), `.trou` (`cgv`), `.arbitrage` (`part-sociale`) — plus trois redéfinitions locales de la classe du socle. Deux variantes déclarées une fois : `--bloc` pour un paragraphe entier, `--decision` pour un arbitrage en attente.

**7. `.figure--large` et `.figure--dessin`.** `le-projet-architectural` les a écrites parce que les 268 px du socle sont calibrés sur le cadrage du heros de la home. `les-medias` en avait besoin et s'en est passée : sa seule image est coupée à 2,87 de rapport. `contacts` en aurait l'usage aussi.

**8. `.infolettre`.** Le même nom de classe vit dans `accueil.css` et `part-sociale.css` avec des règles divergentes, et `contacts.css` fait le même objet sous le nom `.inscription`. Un composant, une variante `--sombre`.

**9. L'échelle des points de rupture.** Le socle en déclare un, les pages en ajoutent six. Écrire 640 / 900 / 1200 dans `conventions.md` et dans `base.css` en commentaire ; sept pages perdent alors leur point propre.

## Objection de fond

Le socle a fait exactement ce qu'on lui demandait — dix pages qui se ressemblent — et c'est précisément pour ça qu'il n'a pas été relu. Les neuf agents ont pris les composants, s'en sont servis correctement, et aucun n'a mesuré ce qu'ils rendaient. Résultat : `.mesure` promet une colonne de 68 signes et en livre 100, sur les onze pages à la fois, et personne ne l'a vu parce que tout le monde a fait confiance au nom de la classe. Un composant nommé d'après son intention, jamais vérifié contre son rendu, propage sa faute avec l'autorité du socle. `.etapes` fait pire : le socle n'y a pas mis de colonne du tout, alors trois pages en ont chacune inventé une, et le même composant rend 99, 127 et 135 signes selon la page qui l'appelle. La convention « une règle qui sert à deux pages monte dans base.css » a été appliquée à l'envers seize fois : `.sommaire` existe trois fois sous le même nom, `.infolettre` deux fois, `.a-sourcer` a trois noms et trois dessins, le champ de formulaire quatre implémentations dont deux échouent à la WCAG — et `contacts.css` porte en commentaire, depuis sa rédaction, le calcul exact qui condamne le champ de l'accueil, sans que personne n'ait remonté la correction d'un cran.

Mais l'objection n'est pas là. Elle est que ce dispositif a produit onze pages sages et deux pages mortes. `cgv-parts-sociales` aligne quinze articles dans un fond unique de onze mètres ; `soutenir` répète trois fois le même bloc de prose. Aucune des deux n'a de défaut technique grave. Les deux respectent le socle mieux que la moyenne — la feuille de `soutenir` fait sept lignes, c'est la meilleure du dépôt. Elles sont vides parce que le socle offre `.bloc`, `.mesure` et `.prose`, que ces trois-là suffisent à produire une page qui passe tous les contrôles, et que rien dans le dispositif ne demande jamais : qu'est-ce que cet écran donne à voir ? Sept pages sur onze n'ont pas une image, pendant que trente et un fichiers dorment dans `src/assets/img/` — dont les cinq visuels de parutions que `les-medias` réclame et les dix logos que `lequipe-projet` remplace par un trou à sourcer. Ce n'est pas un oubli de production, c'est ce qui arrive quand la conformité au socle devient le seul critère : personne n'a ouvert le dossier des images parce qu'aucune règle ne le nommait.

La correction technique de ce rapport prend une journée. Elle laissera onze pages conformes et deux pages toujours mortes. Le vrai chantier est ailleurs : décider, écran par écran, ce que chacun doit faire voir, et n'accepter le socle qu'une fois cette question tranchée.
