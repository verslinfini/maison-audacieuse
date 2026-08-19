# Audit maquette C, La ferme

Fichier audité : `maquettes/home/c-la-ferme.html` (dépôt `maison-audacieuse-maquettes`, 1113 lignes, 44,8 Ko, CSS et JS en ligne).
Date : 19/08/2026. Passe 1 sur 3. Auditeur tiers, non producteur.
États testés : campagne (défaut, compteur 218) et `?etat=avant`.
Largeurs testées : 375, 768, 1024, 1080, 1100, 1152, 1200, 1250, 1280, 1366, 1440, 1920. Hauteurs 720, 768, 800, 812, 900, 1024.
Outils : `maquettes/verif.mjs` (deux états), `maquettes/copy-check.mjs` (deux états), quatre scripts Playwright écrits pour cet audit dans `maquettes/_verif/audit-c/` (balayage de largeurs, parcours de tabulation complet, contraste composité mesuré au pixel sur le rendu réel, séquence de la révélation au défilement, menu mobile ouvert, `prefers-reduced-motion`). Lecture visuelle de 24 captures.
Référentiels : `BRIEF-maquettes.md`, `docs/charte.md`, `contenu/pages/accueil.md`, `contenu/pages/chiffres-autorises.md`, `assets/SOURCES.md`, doc de beats du 18/08, `anti-slop.md`, `variantes-ui.md`, `grilles.md`.

## Score

**71 / 100.** Brut 71, aucun plafond appliqué.

| Axe | Points | Note |
|---|---|---|
| Respect de la charte (intrant fermé) | 16 / 20 | les 7 couleurs et les 3 fonds sont là, Onest partout, grain SVG `feTurbulence` en ligne sur les cinq aplats prévus. Retiré pour six teintes hors palette et pour l'emploi de Meow Script en cinq amorces de liste dans le rendu dégradé. |
| Hiérarchie et lisibilité | 13 / 20 | une seule action principale, couleur de CTA constante sur toute la page, une seule zone chaude par vue tenue écran par écran. Retiré pour la colonne du beat 4 réduite à 90 px entre 1080 et 1200, l'absence de CTA au premier écran entre 768 et 1079, les deux CTA violets identiques dans une même vue, les grandes surfaces vides du rail, du beat 6 et du haut du beat 8. |
| Cohérence des composants et du rythme | 8 / 10 | un seul système de rayon justifié, paddings de section variés, aucune carte, aucun eyebrow. Retiré pour le pied qui s'arrête à 1128 px sous un rail qui continue jusqu'au bord. |
| Accessibilité | 10 / 15 | focus visible sur les 28 arrêts de tabulation, ordre logique au desktop, `alt` repris de la copy, `width`/`height` partout, hiérarchie de titres sans saut. Retiré pour deux contrastes mesurés sous le seuil et une cible tombant à 28 px. |
| Responsive réel, vérifié au navigateur | 4 / 10 | 375, 768, 1024, 1250, 1366, 1440 et 1920 propres, aucun débordement horizontal nulle part. Retiré pour la bande 1080 à 1200 qui casse et pour le menu mobile qui s'ouvre de travers. |
| Âme, la page est reconnaissable comme celle de CETTE structure (non compensable, seuil 20) | 20 / 25 | seuil franchi d'un point. La ferme réelle annotée au feutre par usage, la cascade manuscrite, le grain, le violet en aplat franc : personne n'aurait fait cette page pour un autre client. Mais le geste central n'existe que sous une condition de navigateur, et la moitié basse de la page perd toute signature. |

Vetos :
- **SLOP : levé.** Aucune rangée de cartes, aucun eyebrow, aucune numérotation 01/02/03, aucun dégradé décoratif ni halo, aucune ombre molle sur cartes, aucun séparateur en vague, rien de centré section après section, paddings de section réellement variés, aucun emoji, aucune icône cliché, aucun faux tableau de bord, aucun compteur animé, aucun indicateur de défilement, aucun Title Case. Le rail fixe, la photo annotée et les indentations asymétriques sont des décisions, pas un gabarit.
- **FIABILITÉ : levé.** Tous les chiffres rendus (218 badgé comme exemple, 100 €, 650, 99 ans, 10 juillet, 2025, mars, avril et juillet 2026, 666, 1 700, 3 000, 5 000, 66 %, 34 €, 19 septembre) figurent dans `chiffres-autorises.md`. Aucune promesse fiscale sur la part, le 66 % est explicitement attaché au don. Aucun nom de structure exploitante, le trou est rendu. « la Ville d'Annecy a signé la promesse de bail de 99 ans », jamais « sous bail ». Trois images seulement, toutes autorisées : `exterieur3-1.jpg` et `dessin.jpg` (collectif), `visuel-dauphine-1.jpg` (© Basa, crédit affiché). Ni `ferme.png` ni `ferme-1024x575.png` (France 3), ni les captures du Dauphiné, ni le GIF.
- **CADRATIN : levé.** Zéro occurrence de `—` dans le fichier, zéro dans le texte rendu, zéro point d'exclamation dans le texte visible.

Verdict : sous la cible de 95, itération requise. Deux `Critical` à traiter avant que Romain regarde.

## Constats

### Critical

Critical | `.epine__grille` (`@media min-width:1080px`), largeurs 1080 à 1200, état campagne, capture `part-zoom-1080.png` | La première colonne est figée à 536 px alors que le rail fixe prend déjà 312 px : la colonne du beat 4 tombe à 90 px à 1080 (9 caractères par ligne mesurés), 108 px à 1100, 156 px à 1152, 200 px à 1200. Le titre « La part sociale » se casse en trois lignes d'un mot et la définition de ce qui est vendu devient illisible sur toute la bande de largeurs des portables courants. | Remplacer `grid-template-columns: 536px minmax(0, 1fr)` par `grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr)` et remonter la bascule du rail fixe de `min-width: 1080px` à `min-width: 1240px` (les trois blocs `@media (min-width: 1080px)` et le bloc `@supports` interne).

Critical | `.entete__rang` (`@media max-width:767px`), 375, capture `menu-375-ouvert.png` | Le conteneur du bandeau d'en-tête n'a pas de `flex-wrap` : à l'ouverture, la nav (`width:100%`, `flex-direction:column`) se pose en colonne de 207 px à droite du bouton au lieu de descendre sous l'en-tête. Le logo est écrasé de 122 à 76 px et le bouton de menu passe de 44x44 à 28x44, sous le minimum de cible tactile, sur le seul organe de navigation de la version mobile. | Ajouter dans `@media (max-width: 767px)` : `.entete__rang { flex-wrap: wrap; }` puis `.nav { order: 3; flex: 0 0 100%; }` et `.menu-bouton { flex: 0 0 44px; }`.

### Major

Major | `.heros` et `.rail`, largeurs 768 à 1079, premier écran, capture `fold-768.png` et mesure `rail.y = 763` pour une fenêtre de 768 de haut | Sous 1080 le rail redevient un bandeau horizontal placé sous un héros de `clamp(560px, calc(100vh - 104px), 800px)` : à 1024x768 le bloc prix plus CTA commence à 763 px, donc hors du premier écran. Aucun appel à l'action n'est visible à l'arrivée sur toute cette bande de largeurs. | Sous `min-width: 1080px`, ramener le héros à `height: clamp(480px, calc(100vh - 260px), 720px)` pour que le haut du rail entre dans le premier écran, ou remonter le bloc `À partir de 100 € la part` plus CTA dans `.heros__mots` tant que le rail n'est pas fixe.

Major | `.plan__vue--demain figcaption`, 1440, mode superposé, mesure de contraste composité | Le crédit « © Basa Architecture » est en `#F2F0F7` à 13 px posé en bas à droite du rendu Basa, qui est une image claire : contraste mesuré 4,25:1 en pire cas et 4,66:1 en moyenne, sous le seuil de 4,5:1. Le crédit obligatoire de l'agence est le texte le moins lisible de la page. | Donner au `figcaption` en mode superposé un fond `background: rgba(56, 54, 72, .78)`, `padding: .2rem .5rem`, `border-radius: 4px`, et retirer le `text-shadow` devenu inutile.

Major | `.notes .mot`, tous rendus hors `@supports (animation-timeline: view())` avec `min-width: 1080px` et `prefers-reduced-motion: no-preference`, captures `notes-375.png` et `rm-1440-lieu.png` | Dès qu'on descend sous 1080, qu'on active la réduction de mouvement ou qu'on ouvre la page dans un navigateur sans `animation-timeline`, les cinq briques cessent d'être des annotations posées sur la photo et deviennent une liste dont les cinq amorces (17 mots au total) restent en Meow Script. La charte réserve Meow Script aux mots d'accent et interdit le paragraphe : cinq amorces manuscrites d'affilée sur fond uni ne sont plus une annotation. | Poser `.notes .mot { font-family: "Onest", system-ui, sans-serif; font-weight: 600; color: var(--violet-sombre); font-size: 1.125rem; }` par défaut, et ne rétablir `font-family: "Meow Script", cursive` que dans le bloc `@supports` où les notes sont en `position: absolute` sur la photo.

Major | `.plan__vue--auj`, mode dégradé, capture `rm-1440-lieu.png` | Les deux images se suivent sans légende : le visiteur en réduction de mouvement voit deux photos du même bâtiment sans savoir laquelle est aujourd'hui et laquelle est demain. La copy le prescrit explicitement au beat 2, Notes intégrateur : « sinon deux images empilées avec une légende aujourd'hui puis demain ». | Ajouter `<figcaption>aujourd'hui</figcaption>` dans `.plan__vue--auj` et `<figcaption>demain. © Basa Architecture</figcaption>` dans `--demain`, puis masquer la première dans le bloc `@supports` superposé (`.plan__vue--auj figcaption { display: none; }`).

Major | `.bouton--second` et `.bouton--tertiaire`, `#et-vous`, 1440 et 375, capture `beat8-1440.png` | « Je fais un don » et « Je m'inscris » sont deux rectangles bordés de `--violet-sombre` qui ne se distinguent que par 1 px d'épaisseur de trait et 1 px de taille de texte. La copy du beat 8 exige que les deux portes secondaires ne soient « jamais dans la même couleur ni la même forme ». | Garder « Je fais un don » en bouton bordé 2px `--violet-sombre` et rendre « Je m'inscris » en `.lien-texte` souligné accolé au champ, ou en bouton plein `--vert` `#5E9E85` avec texte blanc.

Major | En-tête plus `.rail .bouton--large` au premier écran, et `#et-vous .bouton` plus rail au beat 8, 1440, captures `c-la-ferme-1440-fold.png` et `beat8-1440.png` | Deux boutons violets strictement identiques, même libellé et même couleur, cohabitent dans la même vue à deux endroits de la page. Le doc de beats posait déjà l'arbitrage pour la variante B, il n'a pas été fait ici alors que le rail fixe produit exactement la même situation. | Masquer `.nav .bouton--compact` à partir de `min-width: 1080px` puisque le rail porte le CTA en permanence, et masquer `.rail .bouton--large` tant que `#et-vous` est dans la vue.

Major | `.rail`, 1440x900, états campagne et avant, captures `c-la-ferme-1440-fold.png` et `avant-1440.png` | Le contenu du rail s'arrête à 512 px sur 900 en état campagne et à environ 350 px sur 900 en `?etat=avant` : 312 px fixes, soit 22 % de chaque écran, dont plus de la moitié vide en permanence, et près des deux tiers vides pendant toute la fenêtre du 30/08 au 06/09 qui est justement celle de la mise en ligne. | En `?etat=avant`, repasser le rail en bandeau horizontal (`html[data-etat="avant"] .rail { position: static; width: auto; }` et `html[data-etat="avant"] .cadre { padding-right: 0; }`), et en état campagne remonter dans le rail la cascade des quatre paliers, que le doc de beats attribue justement au bandeau latéral fixe de la variante C.

Major | `.pied` dans `.cadre` (`padding-right: 312px`), 1440, capture `pied-bas.png` | Le pied violet sombre s'arrête à 1128 px pendant que le rail clair continue jusqu'au bord droit et garde son « 218 » et son bouton : la page n'a pas de fin, elle se termine par une colonne orpheline collée à un pied tronqué. | Sortir `.pied` de `.cadre`, ou lui donner `margin-right: calc(var(--rail) * -1); padding-right: var(--rail);` au dessus de 1080, et faire disparaître le rail (`opacity: 0; visibility: hidden`) quand `#pied` entre dans la vue.

### Minor

Minor | `.notes` (`@media min-width:768px`), mode dégradé, capture `rm-1440-lieu.png` | Cinq éléments dans une grille de deux colonnes laissent une cellule vide sous « Une maison de la créativité », interdit explicite de l'anti-slop. | Poser `.notes { grid-template-columns: 1fr; }` hors du bloc superposé, ou `.notes li:last-child { grid-column: 1 / -1; }`.

Minor | `.notes li:nth-child(2) .suite`, 1440, mode superposé, contraste composité mesuré | « pour des femmes âgées ou isolées. » tombe à 4,42:1 sur les 5 % de pixels les plus clairs du ciel derrière elle, sous le seuil de 4,5:1. L'ombre portée atténue mais le voile radial ne couvre pas assez cette note. | Pour `li:nth-child(2)`, porter le voile à `rgba(24, 22, 38, .96)` au centre et l'étendre à `inset: -70% -32%`, ou descendre la note sur la toiture (`top: 30%`).

Minor | Palette CSS, tout le fichier | Six teintes hors des dix codes autorisés par le brief : `#22203A` et `rgba(34,32,58,…)` pour le voile du héros, `#262436` pour le fond du panneau, `rgba(24,22,38,…)` pour le voile des notes, `#635B8C` au survol des boutons, `#DEDCE8` et `#C9C6D8` en filets et mentions, `#F2F0F7` en texte sur photo. Ce sont des voiles photographiques et des filets, pas des surfaces de marque : je ne déclenche pas le plafond charte, mais l'écart n'a pas été validé. | Remplacer les voiles par `rgba(56, 54, 72, …)` et le fond de panneau par `#383648`, les filets clairs par `#EDEDF5`, le texte sur photo par `#FFFFFF`, et conserver un seul dérivé documenté (`#635B8C`) pour le survol.

Minor | `.badge` (`position: fixed`), 375 et 1440, captures `m-beat8-375.png` et `pied-bas.png` | Le badge est opaque et fixe : il recouvre en permanence le coin haut gauche, donc une ligne de corps au défilement à 375 et le bouton « Je prends ma part » du beat 8 à 1440. | Le poser en bas à gauche (`top: auto; bottom: 18px;`) où il ne croise plus le fil de lecture, et ajouter `pointer-events: none`.

Minor | `.selecteur`, 768 et 1440, captures `fold-768.png` et `beat6-1440.png` | Le sélecteur flottant recouvre le CTA du rail à 768 et la chute « On ne donne pas à quelque chose, on devient quelque chose. » à 1440. Le brief demande qu'il ne cache jamais le contenu de façon gênante. | Au dessus de 768, le décaler à droite : `left: auto; right: 24px; transform: none;`.

Minor | `.barre-mobile`, 375, parcours de tabulation mesuré | Le CTA fixe permanent est le 20e arrêt sur 23, après les huit liens du pied. Un visiteur au clavier voit le bouton en bas de son écran et doit traverser toute la page pour l'atteindre. | Déplacer le bloc `.barre-mobile` dans le DOM juste après `</header>` : le rendu ne bouge pas, l'ordre de tabulation devient cohérent.

Minor | `.section-ou > .contenu { padding-left: 268px }`, 1440, capture `beat6-1440.png` | Cumulé au rail de 312 px, le beat 6 vit dans une bande de 545 px au centre d'un écran de 1440, avec 268 px vides à gauche. La rupture de rythme est voulue mais elle vide la section la plus décisive de la page. | Ramener l'indentation à 140 px et élargir `.section-ou .bloc p` de 52ch à 58ch.

Minor | `.rail__chiffre` et `#ou-on-en-est`, 1440, capture `beat6-1440.png` | Le nombre 218 paraît deux fois dans la même vue, en gros dans le rail fixe et en début de paragraphe du beat 6. | Masquer `.rail__chiffre` et `.rail__suite` tant que `#ou-on-en-est` est dans la vue, ou retirer le chiffre du rail à cet endroit.

Minor | `src="../assets/img/exterieur3-1.jpg"` employé deux fois, héros et beat 2 | La « grande image annotée » qui est le fil de la variante C est le même fichier que la photo du héros, au même cadrage : la promesse d'un lieu qui se déplie ne montre rien de neuf au deuxième écran. | Prendre `hero1.jpg` au héros (variante explicitement autorisée par la copy du beat 1) et garder `exterieur3-1.jpg` pour le fil, ou l'inverse.

Minor | `.pied__mention`, 1440, capture `pied-bas.png` | Statuts et CGV parts sont une phrase de bas de pied, pas des ancres mortes visiblement marquées comme le demande le brief. La règle `.pied__liens .mort` existe dans le CSS et n'est employée nulle part. | Remplacer la phrase par deux `<span class="mort">Statuts, à venir avec le tunnel</span>` et `<span class="mort">CGV parts, à venir avec le tunnel</span>` dans `.pied__liens`.

Minor | `dessin.jpg` et `logo/lma-blanc.png` | Deux images sous la ligne de flottaison sans `loading="lazy"` (relevé par `verif.mjs`, `lazy: auto`). | Ajouter `loading="lazy"` sur les deux.

Minor | `#courriel`, `#et-vous`, 1440 et 375 | Le champ porte un `placeholder` « Adresse email » et un `<label class="vh">` du même texte : deux textes hors copy et aucune étiquette visible. Le brief n'autorise hors copy que le badge, le sélecteur, les mentions « à venir », le `title` du CTA et les crédits. | Rendre l'étiquette visible au dessus du champ et supprimer le `placeholder`, ce qui retire un texte hors copy et supprime le doublon d'annonce vocale.

### Nit

Nit | `.cascade .nombre`, `#ou-on-en-est` | Les deux-points sont dans le `<span class="nombre">` donc rendus en Meow Script : la ponctuation manuscrite flotte après le chiffre. | Sortir « : » du span et le laisser en Onest.

Nit | `.heros h1 .manuscrit` | Le geste manuscrit du titre porte deux mots et la ponctuation (« le nôtre ? ») là où le brief dit « au plus un mot dans un titre ». C'est joli et lisible, mais c'est un écart au référentiel : à confirmer par Romain plutôt qu'à laisser passer.

Nit | `.chute` | `max-width: 22ch` est écrasé par `.bloc p { max-width: 58ch }` (spécificité) : les chutes des beats 3 et 5 s'étalent sur une ligne au lieu de se poser en deux ou trois. Si l'étalement est voulu, retirer la déclaration morte ; sinon passer en `.bloc p.chute`.

Nit | `.pied__liens .mort` | Règle CSS déclarée, aucun élément porteur.

Nit | Pied | « Mentions légales » et « Politique de confidentialité » pointent la même URL. Conforme au site actuel, à vérifier à l'intégration.

### FYI

FYI | `copy-check.mjs`, deux états | 79 segments présents sur 80. Le seul manquant est « © Basa Architecture. » avec point final : le point appartient à la phrase du doc de copy, pas au crédit, qui est bien rendu. Faux positif. Aucun mot changé, aucune phrase coupée, aucun texte réécrit. Les 11 trous du corps de copy sont rendus en encadrés pointillés lisibles.

FYI | `verif.mjs`, deux états, 375 et 1440 | Zéro erreur console, zéro erreur de page, zéro requête externe, zéro requête en échec, zéro image cassée, zéro image sans `alt`, zéro image sans dimensions, zéro débordement horizontal. Vérifié en plus sans débordement à 768, 1024, 1080, 1100, 1152, 1200, 1250, 1280, 1366 et 1920. `noindex, nofollow` présent, `lang="fr"`, title Yoast et meta description repris mot pour mot, un seul h1, huit titres sans saut de niveau, Onest et Meow Script chargées en local.

FYI | Sélecteur | Les deux flèches et les touches du clavier conservent `?etat=` (vérifié : `a-recit.html?etat=avant` après flèche droite). Boucle correcte pour C, précédent B et suivant A. Le lien « toutes les maquettes » ne conserve pas le paramètre, ce que le brief n'exige pas.

FYI | Révélation du beat 2 | Le fondu fonctionne : opacité mesurée 0 puis 0,11 puis 0,64 puis 1 au fil du défilement. Il se désarme correctement en `prefers-reduced-motion` et hors `@supports`. En cours de fondu, les deux prises de vue n'ayant ni le même angle ni la même échelle, l'image intermédiaire est une surimpression floue plutôt qu'un avant après. Sobre, conforme au brief, mais moins démonstratif qu'annoncé.

FYI | Zones chaudes | Comptées écran par écran sur les captures pleine page à 1440 et 375, rail fixe compris : héros jaune seul, épine menthe seule (les filets kaki du beat 4 sont des traits de 1 px à 55 % d'opacité, pas un aplat), beat 5 terracotta seul, beat 3 vert seul, beat 6 jaune seul, beats 7 et 8 sans accent, pied sans accent hors survol. La règle d'une seule zone chaude par vue est tenue partout. Le CTA garde la même couleur violette du haut de page au pied.

FYI | Ordre des beats | 0, 1, 2 et 4 côte à côte, 5, 3, 6, 7, 8, 9. Conforme à l'ordre annoncé pour C, la simultanéité de 2 et 4 étant ce que le doc de beats prescrit (« les 4 faits en marge de la grande image »).

## Ce qui est bien, à ne pas casser en corrigeant

1. La photo réelle de la ferme annotée au feutre menthe, une annotation par usage, avec voile radial par note : c'est le seul geste des trois maquettes qui ne pourrait pas servir à un autre projet, et il est propre, lisible et mesuré (8,1 à 11,4:1 sur quatre des cinq notes).
2. La fidélité à la copy est totale : 79 segments sur 80, aucun mot changé, les 11 trous rendus visiblement, les deux états du compteur câblés proprement sur un seul réglage.
3. La discipline chromatique : une seule zone chaude par vue tenue sur toute la page, un CTA violet constant, aucun eyebrow, aucune carte, aucune numérotation, aucun interdit de l'anti-slop.
4. Le beat 4 en quatre lignes de texte séparées par des filets kaki, sans icône ni carte : c'est exactement ce que la copy demandait et c'est réussi.
5. La propreté technique : zéro console, zéro requête externe, focus visible sur les 28 arrêts de tabulation, rail atteint au bon moment au clavier, dégradation du fondu réellement écrite et non promise.

## Objection de fond

La variante C repose sur deux gestes, et chacun des deux est conditionnel. La photo annotée n'existe que dans un navigateur qui supporte `animation-timeline`, au dessus de 1080 px, et avec les animations activées : partout ailleurs, c'est-à-dire sur tout le trafic mobile et sur toute personne en réduction de mouvement, la page devient deux photos empilées et une liste, soit la variante A avec une colonne latérale. Le rail de campagne, lui, n'a de contenu que quand le compteur est allumé, or l'état dans lequel le site part réellement en ligne est `?etat=avant`, du 30/08 jusqu'à l'allumage : pendant cette semaine, 22 % de chaque écran desktop sera une colonne grise portant quatre lignes et un bouton. Autrement dit, C demande à Romain de choisir la page dont les deux signatures sont absentes le jour de la bascule et sur la moitié du trafic. Ce n'est pas une raison de l'écarter, c'est une décision à prendre avec elle : si C est retenue, il faut trancher lequel des deux gestes mérite d'être inconditionnel. Ma lecture est que c'est la photo annotée, parce qu'elle porte l'âme et qu'elle est intégrable en blocs Kadence avec du CSS additionnel (une image, une couche de spans positionnés en pourcentages, un fondu au défilement facultatif). Le rail fixe, lui, coûte cher à l'intégration, vide le pied, écrase le beat 4 sur les portables et n'apporte rien tant que le compteur dort : il gagnerait à redevenir ce qu'il est déjà sous 1080, un bandeau horizontal sous le héros, quitte à perdre le mot « fixe » du concept pour garder la page dans tous ses états.

## Passe 2 (19/08/2026)

Passe 2 sur 3. Auditeur tiers, ni producteur ni correcteur de cette maquette. Vérification des corrections annoncées, recherche de régression, rescore.
Fichier relu : `maquettes/home/c-la-ferme.html`, 1241 lignes (1113 en passe 1), 51,7 Ko. Commit des corrections : `b830985`.
Outils : `verif.mjs` deux états, `copy-check.mjs`, sept scripts Playwright écrits pour cette passe dans `maquettes/_verif/` (balayage de 13 fenêtres croisées avec les deux états, séquence de défilement à 1440x900, 1366x768 et 1440x720, menu mobile ouvert, rendu sans JavaScript, bascule répétée 1239 puis 1240, contraste composite mesuré au pixel glyphes retirés, sonde du fondu). Lecture visuelle de 22 captures dans `maquettes/_verif/c2-tiers/`.
Fenêtres mesurées : 375x812, 768x768, 1024x768, 1080x800, 1152x800, 1200x800, 1239x800, 1240x800, 1280x800, 1366x768, 1440x720, 1440x900, 1920x1080, chacune en campagne et en `?etat=avant`.

### Score

**82 / 100** (passe 1 : 71). Brut 82, aucun plafond appliqué.

| Axe | Passe 1 | Passe 2 | Note |
|---|---|---|---|
| Respect de la charte (intrant fermé) | 16 / 20 | 19 / 20 | palette entièrement rentrée : 11 codes hexadécimaux dans le fichier, tous autorisés, et les quatre `rgba()` restants dérivent de couleurs de la charte (56,54,72 puis 157,150,105 puis 237,237,245 puis 118,109,160). `#635B8C` remplacé par un `color-mix` documenté. Meow Script ne sert plus les cinq amorces de liste. Retiré un point pour les quatre nombres manuscrits empilés dans le rail, qui frôlent l'accumulation que la charte écarte. |
| Hiérarchie et lisibilité | 13 / 20 | 15 / 20 | colonne du beat 4 réparée, CTA au premier écran partout, doublon d'en-tête et doublon du beat 8 levés, indentation du beat 6 ramenée à 140 px. Retiré pour les deux boutons violets identiques toujours présents ensemble au beat 6, pour les deux creux laissés dans le rail par `visibility: hidden`, et pour le badge et le sélecteur qui recouvrent le texte du rail à 768 et 1024. |
| Cohérence des composants et du rythme | 8 / 10 | 8 / 10 | le pied va enfin au bord et le rail s'efface devant lui. Mais le rail lui même se coupe sur les fenêtres courtes, laisse deux trous en cours de page, et une couture de ton reste visible entre la section et la gouttière. |
| Accessibilité | 10 / 15 | 13 / 15 | les deux contrastes sous le seuil sont levés et mesurés très au dessus, la cible de 28 px est redevenue 44x44, 27 arrêts de tabulation à 1440 et 23 à 375 tous avec indicateur visible, aucune cible sous 44 px, la barre mobile est atteinte au 3e arrêt. Retiré parce que le dernier palier du rail est hors de vue sur 1366x768 sans aucune affordance de défilement. |
| Responsive réel, vérifié au navigateur | 4 / 10 | 7 / 10 | zéro débordement horizontal sur 13 fenêtres croisées avec les deux états, la bande 1080 à 1200 est réparée, le menu mobile s'ouvre droit. Retiré pour l'axe vertical : le rail déborde de 42 à 122 px sur 1240x800, 1280x800, 1366x768 et 1440x720. |
| Âme, la page est reconnaissable comme celle de CETTE structure (non compensable, seuil 20) | 20 / 25 | 20 / 25 | seuil toujours franchi d'un point, sans progression nette. La photo annotée est plus lisible et dégrade proprement, le rail n'est plus une colonne vide au jour de la bascule. En regard, le geste central recule de 1080 à 1240 px et le contenu qui remplit le rail est tronqué sur le format de portable le plus répandu. |

Vetos :
- **SLOP : levé.** Recontrôlé sur les captures de cette passe. Aucune rangée de cartes, aucun eyebrow, aucune numérotation 01/02/03, aucun dégradé décoratif, aucune ombre molle, aucun séparateur en vague, paddings de section réellement variés, aucun emoji, aucune icône cliché, aucun faux tableau de bord, aucun compteur animé, aucun indicateur de défilement, aucun Title Case. Rien d'introduit par les corrections.
- **FIABILITÉ : levé.** `copy-check.mjs` : 79 segments sur 80, le seul manquant reste le faux positif connu du crédit avec point final. Aucun chiffre modifié. La cascade déplacée par JS rend un texte strictement identique dans les deux emplacements, dans l'ordre, `[TROU]` compris. Images inchangées et toutes autorisées, crédit Basa affiché et désormais lisible.
- **CADRATIN : levé.** Zéro tiret cadratin dans le fichier, zéro point d'exclamation.

Verdict : **NON PUBLIABLE.** 82 sous la cible de 85, les deux `Critical` sont levés mais deux `Major` restent, dont un régressif. Passe 3 requise.

### Vérification des constats de la passe 1

#### Les deux Critical

**Critical 1, colonne du beat 4 : corrigé.** Largeur mesurée de `#la-part` en campagne : 994 px à 1080, 1028 à 1152, 1024 à 1200, 1021 à 1239 (empilement pleine largeur, le rail est encore un bandeau), puis 329 à 1240, 345 à 1280, 379 à 1366, 405 à 1440 et 1920. La colonne à 90 px n'existe plus à aucune largeur. Le titre « La part sociale » tient sur une ligne partout (hauteur mesurée 33 à 43 px). Grille en `minmax(0, 1.35fr) minmax(0, 1fr)` et bascule du rail à 1240 px confirmées dans le CSS et à la mesure.

**Critical 2, en-tête mobile : corrigé.** À 375 menu ouvert : logo 122 px (76 en passe 1), bouton de menu 44x44 (28x44 en passe 1), nav en `flex: 0 0 100%` posée sous l'en-tête à y=92 sur toute la largeur, cinq liens à 335x44. Aucun débordement, `scrollWidth` égal à `clientWidth`. Capture `menu-375-ouvert.png`.

#### Les huit Major

**Héros raccourci, CTA au premier écran : corrigé.** Bas du bouton du rail mesuré à 692 px sur une fenêtre de 768 de haut à 768 et à 1024 de large, à 724 px sur 800 à 1080, 1152, 1200 et 1239. En `?etat=avant` : 766 sur 800 à 1240, 734 sur 768 à 1366, 706 sur 720 à 1440. Le CTA entre dans le premier écran à toutes les largeurs testées, dans les deux états.

**Cartouche du crédit Basa : corrigé.** Blanc sur `rgba(56, 54, 72, .86)`, mesuré au pixel fond isolé glyphes retirés : 10,09:1 sur les 5 % de pixels les plus clairs et 10,42:1 en moyenne, contre le rendu Basa pleinement opaque, c'est à dire le seul état où le crédit est visible. Le 4,59:1 annoncé par le correcteur est plus sévère que ma mesure. Seuil 4,5 franchi largement.

**Amorces des notes en Onest : corrigé.** `.notes .mot` est en Onest 600 `#383648` par défaut, Meow Script n'est rétabli que dans le bloc `@supports (animation-timeline)` avec `no-preference` et `min-width: 1240px`. Vérifié à la valeur calculée en `prefers-reduced-motion: reduce` à 1440 : `Onest`.

**Légendes aujourd'hui et demain : corrigé.** Les deux `figcaption` sont présentes, en `display: block` toutes deux en rendu dégradé, et celle de la vue « aujourd'hui » est masquée dans le bloc superposé. Textes rendus : « aujourd'hui » et « demain. © Basa Architecture ».

**Beat 8, deux portes distinctes : corrigé.** « Je fais un don » reste un bouton bordé 2 px `--violet-sombre`, « Je m'inscris » est devenu un `button` de classe `lien-texte lien-bouton` souligné, sans bordure ni aplat, accolé au champ. Ni la même couleur ni la même forme. Vérifié à l'œil sur `defil-1440-et-vous.png`.

**Un seul CTA violet par vue : PARTIELLEMENT corrigé, reste Major.** L'en-tête et le beat 8 sont réglés : au premier écran un seul bouton violet est en vue à toutes les largeurs, et à `#et-vous` le CTA du rail passe bien en `visibility: hidden`, un seul bouton mesuré en vue à 1440x900, 1366x768 et 1440x720. En revanche le beat 6 n'a pas été traité : `beat6-en-vue` ne masque que `.rail__chiffre` et `.rail__suite`. Mesure des boutons violets réellement dans le viewport quand `#ou-on-en-est` est à l'écran, à 1240 et au dessus : deux, `rail y=307` et `ou-on-en-est y=627`. Deux rectangles violets strictement identiques, même libellé, même couleur, dans la vue la plus décisive de la page. Capture `defil-1440-ou-on-en-est.png`.

**Rail vide : corrigé en `?etat=avant`, régressif en campagne, reste Major.** En `?etat=avant` le rail redevient un bandeau horizontal (mesuré y=740, hauteur 268, largeur 1440), le bloc du compteur est en `display: none` et la cascade reste au beat 6 : la colonne grise de 22 % de l'écran au jour de la bascule a disparu, c'est acquis. En campagne au dessus de 1240, la cascade est bien déposée dans le rail par le JS, mais le contenu du rail atteint désormais 842 px alors qu'il en faisait 512 en passe 1. Le rail étant haut comme la fenêtre, `overflow-y: auto` se déclenche sur toute fenêtre plus courte que 842 px : 42 px hors champ à 1240x800 et 1280x800, 74 px à 1366x768, 122 px à 1440x720. Mesure du dernier palier : bas à 818 px pour un rail qui s'arrête à 768, coupe confirmée. Sur `defil-1366-hero.png` le « 5 000 : » pend au ras du bord et sa ligne de lecture est entièrement hors champ. La coupe est permanente, le rail est `position: fixed` et aucun défilement de page ne la révèle. La seule façon de lire la fin est de faire défiler l'intérieur d'une colonne de 312 px qui porte `overscroll-behavior: contain`, donc 23 % de la largeur d'un portable 1366 devient une zone morte à la molette, sans barre de défilement visible pour l'annoncer.

**Pied pleine largeur : corrigé.** Bornes du pied mesurées de 0 à la largeur de fenêtre à 1240, 1366, 1440 et 1920, dans les deux états. `html.pied-en-vue .rail` passe bien en `visibility: hidden` et `opacity: 0`. Capture `defil-1440-pied.png`.

#### Les onze Minor

| Constat de la passe 1 | État | Preuve |
|---|---|---|
| Palette hors charte, six teintes | corrigé | 11 codes hexadécimaux, tous de la charte, quatre `rgba()` tous dérivés de couleurs de la charte |
| Cellule vide sous la cinquième note | corrigé | cellules mesurées 253, 253, 253, 253, 547 |
| Note 2 à 4,42:1 | corrigé | 11,08:1 sur le rendu Basa, 10,87:1 sur la photo actuelle, les dix mesures de notes au dessus du seuil |
| Badge opaque en haut à gauche | partiellement | posé en bas à gauche avec `pointer-events: none`, dégagé du texte à 375 et à 1440, mais il recouvre le texte du rail à 768 (« coopératrices et coopérateurs. ») et à 1024 (« que de donatrices. ») |
| Sélecteur qui recouvre le contenu | partiellement | décalé à droite puis derrière le rail, il ne cache plus la chute du beat 6, mais il recouvre « Vous choisissez votre nombre de parts à l'écran suivant. » à 768 et 1024, le crédit « demain. © Basa Architecture » en rendu dégradé à 1440, et le 218 du rail à 375 |
| `.barre-mobile` en fin de tabulation | corrigé | 3e arrêt à 375, juste après le logo et le bouton de menu |
| Beat 6 indenté de 268 px | corrigé | `padding-left: 140px` au dessus de 1240 |
| 218 rendu deux fois dans la même vue | corrigé en lettre, régressif en effet | le doublon a disparu, mais voir la régression 2 ci dessous |
| Héros et beat 2 sur la même image | corrigé | héros en `hero1.jpg`, beat 2 en `exterieur3-1.jpg`, cadrages nettement différents |
| Mentions du pied non marquées | corrigé | deux `span` de classe `mort`, contraste 9,03:1 |
| `loading="lazy"` manquant | corrigé | présent sur `dessin.jpg` et `lma-blanc.png` |
| Étiquette du champ courriel | corrigé | `label` de classe `etiquette` visible portant « Adresse email », zéro `placeholder` dans le fichier |

Les cinq `Nit` de la passe 1 ne sont pas appliqués, comme annoncé. L'un d'eux s'est réglé de lui même : `.pied__liens .mort` porte désormais deux éléments.

### Les écarts assumés par le correcteur, tranchés

1. **CTA d'en-tête masqué dès 768 : accepté.** Le rail porte le CTA au premier écran à toutes les largeurs et la barre mobile le porte en permanence sous 768, c'est mesuré. Réserve de forme : la règle est écrite deux fois, au dessus et au dessous de 768, si bien que `.nav .bouton--compact` n'est rendu à aucune largeur. Un élément jamais affiché se retire du markup, il ne se masque pas deux fois.
2. **`visibility: hidden` plutôt que `display: none` : refusé.** C'est la cause directe des deux creux décrits plus bas. Les boîtes masquées gardent leur place et laissent le rail troué au milieu de la page.
3. **Cascade déplacée par JS plutôt que dupliquée : accepté, et c'est le bon choix.** Contrôlé sur six changements de fenêtre enchaînés (1239, 1240, 1400, 1239, 1240, 1000, 1440) : toujours une seule `.cascade`, toujours quatre `li`, jamais de duplication. Sans JavaScript, la cascade reste au beat 6 avec ses quatre paliers et son texte intact, et le CTA du rail reste visible : rien ne disparaît. Dupliquer aurait doublé la copy dans le DOM et dans l'arbre d'accessibilité.
4. **Cartouche à .86 plutôt que .78 : accepté.** La mesure porte l'écart, 10,09:1 en pire cas utile.
5. **Surlignage jaune du 666 retiré dans le rail : accepté, et c'est nécessaire.** Un rail fixe visible en permanence portant un aplat jaune poserait une seconde zone chaude dans chaque vue de la page. Le violet du rail est un texte, pas un aplat.

### Régressions et défauts nouveaux

1. **Rail tronqué sur les fenêtres courtes.** Décrit ci dessus. Introduit par la correction : le contenu du rail est passé de 512 à 842 px, ce qui déclenche un `overflow-y: auto` qui ne se déclenchait jamais en passe 1. Touche 1240x800, 1280x800, 1366x768 et 1440x720. **Major.**
2. **Creux de 88 px et ligne orpheline dans le rail au beat 6.** `.rail__chiffre` et `.rail__suite` passent en `visibility: hidden` mais gardent leur boîte : le rail s'ouvre sur 88 px de vide, sous lesquels `.rail__palier` reste affiché. Le visiteur lit « Premier palier : autant que de donatrices. » sans le nombre auquel la phrase se rapporte. La copy n'est pas altérée dans le fichier, mais la phrase perd son référent à l'écran. Correction requise.
3. **Creux d'environ 130 px et prix en cul de sac dans le rail au beat 8.** Même mécanisme : le bouton et « Vous choisissez votre nombre de parts à l'écran suivant. » gardent leurs boîtes. Entre « À partir de 100 € la part. » et « C'est quoi, une part sociale ? » s'ouvre un blanc mesuré de l'ordre de 150 px, et la ligne de prix reste seule, sans bouton derrière elle. Capture `defil-1440-et-vous.png`. Correction requise.
4. **Badge et sélecteur déplacés sur le texte du rail à 768 et 1024.** Le défaut de la passe 1 n'est pas supprimé, il a changé d'endroit : entre 768 et 1239 le rail est un bandeau collé sous le héros, donc le coin bas gauche et le coin bas droit de l'écran tombent exactement dessus. Captures `fold-768-campagne.png` et `fold-1024-campagne.png`. Minor.
5. **Couture de ton à la gouttière.** À `#et-vous`, mesure au pixel : `rgb(226, 226, 234)` dans la section contre `rgb(237, 237, 245)` dans la gouttière, pour un même `#EDEDF5` nominal. La section porte le grain, la gouttière peinte par `.cadre` ne le porte pas, d'où un joint vertical visible sur toute la hauteur de la section. Nit.
6. **Portée du geste central réduite.** Le bloc `@supports` qui pose les notes au feutre sur la photo est passé de `min-width: 1080px` à `min-width: 1240px`, conséquence directe et assumée du correctif du Critical 1. Entre 1080 et 1239, la maquette perd les annotations qu'elle avait en passe 1 et ne montre plus qu'une image pleine largeur de 1024 px avec une liste dessous. Ce n'est pas un défaut, c'est un troc : une mise en page cassée contre un geste absent, et le troc est le bon. Il faut simplement le nommer, parce qu'il affaiblit l'axe Âme sans que personne l'ait décidé.

### Ce qui a été contrôlé et ne bouge pas

- Copy : 79 segments sur 80, seul manquant le faux positif connu. La cascade rend exactement le même texte au beat 6 et dans le rail, même ordre, aucun mot changé, `[TROU]` compris. Le beat 6 garde ses trois paragraphes.
- Sans JavaScript : la cascade reste au beat 6, quatre paliers, texte intact, CTA du rail visible.
- Zéro erreur console, zéro erreur de page, zéro requête externe, zéro requête en échec, sur 13 fenêtres croisées avec les deux états.
- Zéro débordement horizontal sur 375, 768, 1024, 1080, 1152, 1200, 1239, 1240, 1280, 1366, 1440 et 1920, dans les deux états.
- Clavier : 27 arrêts à 1440, 23 à 375, aucun sans indicateur de focus, aucune cible sous 44 px, ordre logique dans les deux cas.
- Les six images se chargent réellement, dimensions naturelles relevées après défilement cadencé. Les « 1 à 2 images cassées » rendues par `verif.mjs` sont bien l'artefact de son défilement rapide sur les images en `loading="lazy"`, contrôlé à l'œil sur la pleine page et sur `defil-1440-pied.png` où le logo blanc du pied s'affiche normalement.
- `noindex, nofollow`, `lang="fr"`, un seul h1, huit titres sans saut de niveau, title et meta description inchangés.

### Ce qui reste à corriger avant le gate

1. **Major, `#ou-on-en-est` et `.rail .bouton--large`, 1240 et au dessus.** Deux boutons violets identiques dans la même vue. Dans le bloc `@media (min-width: 1240px)`, ajouter `html.beat6-en-vue .rail .bouton--large, html.beat6-en-vue .rail__apres { opacity: 0; visibility: hidden; }`. Plus simple encore : faire porter au beat 6 la même classe que `#et-vous` dans l'objet `veilles` du script, et masquer le chiffre du rail par cette classe unique.
2. **Major, `.rail` en campagne, fenêtres de moins de 842 px de haut.** Le dernier palier est hors champ à 1240x800, 1280x800, 1366x768 et 1440x720. Trois voies, par ordre de préférence : ne déposer la cascade dans le rail que si la place existe, en conditionnant le JS à `window.matchMedia('(min-width: 1240px) and (min-height: 900px)')` et en la laissant au beat 6 sinon ; ou compacter le bloc de campagne au dessus de la cascade, `padding: 72px 30px 24px`, `.rail__chiffre { font-size: 2.75rem }`, `.rail__apres { display: none }`, ce qui ramène le contenu sous 720 px ; ou renoncer à la cascade dans le rail et n'y porter que les deux premiers paliers.
3. **Correction requise, `.rail`, beats 6 et 8.** Remplacer `visibility: hidden` par `display: none` sur les blocs masqués, pour que le rail se referme au lieu de se trouer. Au beat 6, masquer aussi `.rail__palier` avec le chiffre et la suite, sans quoi « Premier palier : autant que de donatrices. » reste seul, sans le nombre auquel il se rapporte.
4. **Minor, `.badge` et `.selecteur`, 768 à 1239.** Les remonter au dessus du bandeau du rail sur cette bande : `@media (min-width: 768px) and (max-width: 1239px) { .badge { bottom: auto; top: 12px; } .selecteur { bottom: auto; top: 12px; right: 24px; } }`. Ou plus sobre, ne les poser en bas de fenêtre que quand le rail est fixe.
5. **Nit, `.nav .bouton--compact`.** Masqué à toutes les largeurs par deux règles distinctes : le retirer du markup.
6. **Nit, `.cadre` et `.bande-pale`.** Porter le grain sur la gouttière du rail, ou retirer le `background-image` de `.cadre` et donner son fond au rail seul, pour supprimer la couture de ton à `#et-vous`.

Les cinq `Nit` de la passe 1 restent ouverts et restent optionnels.

### À trancher avec Romain au gate 2

1. **La cascade dans le rail, ou au beat 6 ?** Elle remplit le rail, c'est ce que la passe 1 demandait, mais elle le fait déborder sur 1366x768 et 1440x720 et elle vide le beat 6, qui devient trois paragraphes et une chute. La ramener au beat 6 rouvre le Major du rail vide, l'y laisser impose de couper ailleurs. C'est un arbitrage de mise en page, pas une correction : l'audit peut mesurer les deux, pas choisir.
2. **La bande 768 à 1239 sans CTA persistant.** Une fois le bandeau du rail passé, la page n'offre plus aucun « Je prends ma part » pendant 5 055 px à 768, 5 077 à 1024 et 5 200 à 1200, soit les deux tiers de la page. Ce n'était pas mieux en passe 1, l'en-tête n'étant pas collant, donc ce n'est pas une régression, mais c'est le dernier trou fonctionnel de la variante. Le combler demande un choix de forme : en-tête collant au dessus de 768, ou barre basse à la mobile étendue jusqu'à 1239.

## Passe 3 (19/08/2026)

Passe 3 sur 3, la dernière autorisée par m9. Auditeur tiers, ni producteur ni correcteur de cette maquette. Vérification des corrections annoncées pour la passe 2, recherche de régression, rescore, arbitrage des écarts assumés.
Fichier relu : `maquettes/home/c-la-ferme.html`, 1308 lignes (1241 en passe 2, 1113 en passe 1), 54,6 Ko.
Outils : `verif.mjs` deux états, `copy-check.mjs`, six scripts Playwright écrits pour cette passe dans `maquettes/_verif/` (géométrie sur 16 combinaisons fenêtre par état et 6 positions de défilement chacune, sondes de flottants, ancres activées, stabilité de l'en-tête collante, bascules de fenêtre enchaînées, rendu sans JavaScript, réduction de mouvement, mesure de grain au pixel avec `sharp`). Lecture visuelle de 14 captures dans `maquettes/_verif/c3-tiers/`.
Fenêtres mesurées : 375x812, 768x1024, 1024x768, 1240x800, 1280x800, 1366x768, 1440x720, 1440x900, chacune en campagne et en `?etat=avant`, plus 1200x800, 1239x900, 1240x819, 1240x821, 1440x800, 1920x1080 en bascule.
Note de méthode : `scroll-behavior: smooth` fausse toute mesure prise après un `scrollTo` scripté. Toutes les sondes de cette passe injectent `scroll-behavior: auto` avant de mesurer. Une première série faite sans cette précaution donnait des positions de défilement inexactes et a été refaite.

### Score

**85 / 100** (passe 1 : 71, passe 2 : 82). Brut 85, aucun plafond appliqué.

| Axe | P1 | P2 | P3 | Note |
|---|---|---|---|---|
| Respect de la charte (intrant fermé) | 16 | 19 | 17 / 20 | palette toujours entièrement rentrée : 11 codes hexadécimaux, tous de la charte, 4 bases `rgba()` toutes dérivées de couleurs de la charte, aucune teinte ajoutée par cette passe. Meow Script à sa place. Retiré 2 points de plus pour le grain des fonds clairs, que le brief nomme explicitement et qui ne se rend plus : écart-type 0,67 contre 3,94 en passe 2, indiscernable d'un aplat sans grain. Trois des cinq aplats prévus sont concernés. |
| Hiérarchie et lisibilité | 13 | 15 | 18 / 20 | le doublon de boutons violets du beat 6 est levé et mesuré sur 96 relevés, les deux creux du rail sont refermés, les groupes masqués partent entiers. Retiré pour le sélecteur et le badge qui mordent encore sur le prix et sur le bouton du rail dès que le bandeau atteint le haut de la fenêtre, et pour le beat 6 qui devient une colonne étroite dans un champ vide quand la cascade part dans le rail. |
| Cohérence des composants et du rythme | 8 | 8 | 9 / 10 | le rail ne se coupe plus, ne se troue plus, la couture de ton est levée (1 niveau contre 11). L'en-tête collante est stable, sans saut de mise en page. Retiré parce que le traitement de surface n'est plus uniforme : les aplats sombres portent le grain, les clairs sont lisses. |
| Accessibilité | 10 | 13 | 12 / 15 | le motif du retrait de la passe 2 est levé : zéro débordement du rail sur les 16 combinaisons. 27 arrêts de tabulation à 1440 et 1024, 23 à 375, tous avec indicateur visible, aucune cible sous 44 px. Retiré parce que l'ancre de l'action principale dépose le visiteur sur un titre de section entièrement masqué par l'en-tête collante, sur toute la bande 768 à 1239 et dans l'état de mise en ligne. |
| Responsive réel, vérifié au navigateur | 4 | 7 | 9 / 10 | l'axe vertical est réparé : aucun défilement interne du rail nulle part, seuil de dépôt de la cascade exact au pixel, dix bascules de fenêtre enchaînées sans duplication ni débordement. Zéro débordement horizontal. Retiré pour les recouvrements de flottants aux positions intermédiaires. |
| Âme, la page est reconnaissable comme celle de CETTE structure (non compensable, seuil 20) | 20 | 20 | 20 / 25 | seuil franchi d'un point pour la troisième fois. La photo annotée est intacte et dégrade proprement, le rail se remplit vraiment quand il en a la place. En regard, le grain des fonds clairs est perdu et le rail plein n'existe qu'au dessus de 1240 de large et 820 de haut, donc pas sur le portable de référence. Rien n'a été gagné en signature depuis la passe 2 et une texture de marque a été perdue. Si le grain n'est pas rétabli, la prochaine lecture de cet axe passe sous le seuil : la page ne tiendrait plus son identité que par la photo annotée, elle même conditionnée à 1240 px. |

Vetos :
- **SLOP : levé.** Recontrôlé sur les captures de cette passe. Les six corrections de la passe 3 (en-tête collante, repositionnement des flottants, mode de fusion du grain, `display: none`, dépôt conditionnel de la cascade, CTA compact) n'introduisent aucun motif de gabarit. Aucune rangée de cartes, aucun eyebrow, aucune numérotation, aucun dégradé décoratif, aucune ombre molle, aucun séparateur en vague, paddings réellement variés, aucun emoji, aucune icône cliché, aucun faux tableau de bord, aucun compteur animé, aucun indicateur de défilement, aucun Title Case.
- **FIABILITÉ : levé.** `copy-check.mjs` : 79 segments sur 80, le seul manquant reste le faux positif connu du crédit avec point final. Aucun chiffre modifié, aucun mot changé. Images inchangées et toutes autorisées, crédit Basa affiché.
- **CADRATIN : levé.** Zéro tiret cadratin dans le fichier, zéro point d'exclamation dans le texte visible.

Verdict : **NON PUBLIABLE.** Le score atteint la cible de 85, mais un `Major` bloquant subsiste et il est régressif, plus une correction requise sur la charte. Troisième passe atteinte : pas de quatrième passe, escalade à Romain.

### Vérification des constats de la passe 2

**Major 1, deux boutons violets identiques au beat 6 : corrigé.** 96 relevés, 16 combinaisons de fenêtre et d'état par 6 positions de défilement. Jamais plus d'un bouton « Je prends ma part » visible dans la vue, à aucune position, à aucune largeur, dans aucun des deux états. À la position où `#cta-beat6` est à l'écran : un seul bouton, classe `cta-en-vue` posée, CTA du rail en `display: none` au dessus de 1240, CTA compact d'en-tête masqué entre 768 et 1239 et en `?etat=avant`, barre basse masquée sous 768.
Un seul cas à zéro CTA : au pied, sur 1240x800, 1280x800, 1366x768 et 1440x720 en campagne, le rail s'efface devant le pied et `#cta-beat8` est déjà sorti. C'est la fin de la page et c'était déjà le cas en passe 2.

**Major 2, rail tronqué sur les fenêtres courtes : corrigé.** `scrollHeight - clientHeight = 0` sur les 16 combinaisons, aux 6 positions, dans les deux états. Bas du contenu du rail mesuré : 734 sur 900 à 1440x900 cascade comprise, 431 sur 720, 431 sur 768, 431 sur 800 partout ailleurs. Aucun défilement interne nulle part, donc plus aucune zone morte à la molette. `overscroll-behavior` retiré, zéro occurrence dans le fichier. `scrollbar-gutter: stable` présent.
Le dépôt conditionnel de la cascade est exact au pixel de seuil : 1240x819 la laisse au beat 6, 1240x821 la dépose dans le rail. Dix changements de fenêtre enchaînés (1440x900, 1440x800, 1239x900, 1240x900, 1240x819, 1240x821, 1000x900, 1920x1080, 1366x768, 1440x900) : toujours une seule `.cascade`, toujours quatre `li`, jamais de duplication, rail jamais en débordement.
Réserve mesurée : le rail plein n'existe qu'au dessus de 1240 de large ET 820 de haut. Sur un portable 1440x900 réel, la fenêtre utile d'un navigateur avec onglets et favoris tourne autour de 810 px : la cascade y reste au beat 6. Le geste « rail rempli » est en pratique réservé aux écrans 1080p et plus. La dégradation est propre, mais l'axe Âme n'y gagne pas ce que la correction en attendait.

**Correction requise, creux dans le rail : corrigée.** Plus grand écart mesuré entre deux blocs visibles du rail : 16 px, qui est la marge propre de `.rail__lien`. Aucun écart supérieur à 20 px sur les 6 positions, les 5 fenêtres à rail fixe et les deux états. Le correcteur annonçait 15 à 17 px, c'est confirmé.
Groupes masqués entiers vérifiés à la mesure. Au beat 6, `.rail__compteur` part avec `.rail__chiffre`, `.rail__suite` et `.rail__palier` : la ligne « Premier palier : autant que de donatrices. » ne reste jamais seule sans le nombre auquel elle se rapporte. À `#et-vous`, `.rail__prix`, `#cta-rail` et `.rail__apres` partent ensemble : le prix ne reste jamais sans son bouton. Capture `beat6-1440-cascade-au-rail.png`.
`#paliers-beat6` vidé de sa cascade mesure 0 px de haut : aucun trou laissé au beat 6, aucune cellule vide.

**Minor, badge et sélecteur sur le texte du rail à 768 et 1024 : partiellement.** Au premier écran, qui est le cas décrit en passe 2, corrigé : aucun recouvrement mesuré à 768x1024 ni à 1024x768 au défilement zéro, dans les deux états. Les deux flottants sont remontés à `top: 88px`, sur la photo du héros, sous l'en-tête collante de 75 px.
Le défaut se reporte à une autre position. Dès que le bandeau du rail atteint le haut de la fenêtre, le sélecteur recouvre « À partir de 100 € la part. » et mord 11 px sur le haut du bouton « Je prends ma part » : chevauchement mesuré 380x11 à 1024, 332x11 à 768. Capture `flottants-1024x768.png`. Même mécanique en `?etat=avant` au dessus de 1240 : le badge tombe sur le bouton du rail, chevauchement 137x28 sur un bouton de 340x56, soit 40 pour cent de sa largeur et la moitié de sa hauteur.

**Nit, `.nav .bouton--compact` jamais rendu : corrigé.** Le bouton est désormais rendu entre 768 et 1239 et en `?etat=avant` au dessus de 1240, dès que `html.js` est posée et qu'aucun autre CTA n'est en vue. Il n'est plus masqué deux fois pour rien.

**Nit, couture de ton à la gouttière : corrigée, mais au prix du grain.** Profil horizontal mesuré à travers la couture, à `#et-vous`, 1440x900 : 238 dans la section de x=1108 à x=1126, 222 sur le filet de 1 px à x=1128, 237 dans la gouttière et le rail de x=1130 à x=1152. Écart de 1 niveau contre 11 en passe 2. La couture est levée, voir le détail au chapitre des écarts tranchés.

**Trou fonctionnel 768 à 1239, CTA persistant : corrigé avec JavaScript, ouvert sans.** Avec JS, un CTA à toutes les positions et à toutes les largeurs : l'en-tête devient collante à 75 px et reprend l'appel dès que le bandeau du rail est passé, puis s'efface quand un CTA de beat entre dans la vue. Stabilité vérifiée : hauteur d'en-tête 75 px constante (76 en `?etat=avant`), hauteur de page inchangée quand le bouton compact paraît et disparaît, écart mesuré 0 px sur les deux, à 768, 1024, 1200 et 1440 avant. Aucun saut de mise en page.
Sans JS, la règle est derrière `html.js` : à 768, 1024 et 1200, entre 30 et 50 pour cent de la page, zéro CTA à l'écran. Voir l'arbitrage plus bas.

**Barre basse sous 768 : correcte.** Un seul CTA aux trois positions testées, la barre s'efface quand `#cta-beat6` ou `#cta-beat8` est à l'écran et revient au pied. Capture `mobile-beat6.png`.

**Non appliqué, comme annoncé.** Sélecteur sur le « 218 » à 375x812 : recouvrement mesuré 335x5, inchangé. Les cinq `Nit` de la passe 1 restent ouverts.

### Les écarts assumés par le correcteur, tranchés

1. **Veille portée sur les boutons et non sur les sections : accepté, et c'est le bon choix.** Le raisonnement du correcteur tient à la mesure. `beat6-en-vue` et `cta-en-vue` sont deux classes distinctes portées par deux observateurs différents : la première masque le compteur du rail pendant que la section défile, la seconde masque le prix et le bouton seulement quand un second bouton est réellement à l'écran. Veiller la section aurait effacé le CTA du rail dès l'entrée de `#ou-on-en-est`, soit environ 1 100 px avant que le bouton du beat 6 paraisse, laissant la vue sans appel. L'accumulation de porteurs est correctement écrite : `porteurs[classe]` est un dictionnaire d'identifiants, la classe ne tombe qu'au départ du dernier porteur. Aucun clignotement, aucune boucle de bascule observée sur les 96 relevés.
2. **CTA compact derrière `html.js` : accepté.** Sans JavaScript, aucun observateur ne peut effacer le bouton compact quand le bandeau du rail est encore à l'écran : on retomberait sur deux boutons violets identiques dans la même vue, exactement le `Major` que la passe 2 demandait de lever. Trois « Je prends ma part » restent atteignables sans JS (bandeau du rail, beat 6, beat 8) et l'en-tête collante garde la navigation. Ce n'est pas non plus une régression : la passe 2 n'offrait aucun CTA persistant sur cette bande, avec ou sans JS. Reste à savoir : sans JS, l'en-tête collante coûte 75 px de fenêtre sans rien apporter de plus qu'une nav. À noter, pas à corriger.
3. **Grain en `overlay` : refusé.** Mesure au pixel sur le même patch de `#deja-fait`, 190x110 px, trois états forcés :

| état du grain clair | rgb moyen | écart-type de luminance | étendue |
|---|---|---|---|
| aucun grain | 237,237,245 | 0 | 0 |
| `overlay`, état actuel | 238,238,245 | 0,67 | 5 |
| `multiply`, état passe 2 | 224,224,232 | 3,94 | 39 |

Le grain des fonds sombres, pour comparaison, mesure 1,45 d'écart-type. En `overlay`, le grain des surfaces claires a donc une amplitude six fois moindre qu'en `multiply` et deux fois moindre que celle du grain sombre, sur un fond où l'oeil est bien moins sensible. Sur les crops `grain-clair-overlay.png` et `grain-clair-multiply.png`, le premier est un aplat parfaitement lisse, le second une surface papier nettement grainée. Le risque signalé par le correcteur est confirmé et plus fort qu'annoncé : ce n'est pas « plus fin », c'est absent.
Le brief demande le grain « sur les aplats violet sombre et sur un fond pastel clair ». Sur fond clair il n'est plus rendu. Et la passe 2 indiquait pour la même couture une autre voie qui garde les deux : « porter le grain sur la gouttière du rail, ou retirer le `background-image` de `.cadre` et donner son fond au rail seul ». Cette voie n'a pas été prise. On a supprimé la couture en supprimant le grain.
4. **Dépôt de la cascade conditionné à 1240 par 820 : accepté sur la mécanique, à trancher sur le fond.** La mécanique est irréprochable, seuil exact, aucune duplication, aucun débordement. Ce qui reste à décider est de composition et revient à Romain, voir le dernier chapitre.

### Régressions et défauts nouveaux

1. **L'en-tête collante recouvre entièrement le titre du beat 8 quand on clique le CTA. `Major`.**
`#prendre-part` est un `<span>` sans `scroll-margin-top` : la règle `section, #le-lieu, #la-part { scroll-margin-top: 88px }` ne l'atteint pas. Or c'est la cible des quatre boutons « Je prends ma part » de la page.
Mesures après activation de l'ancre :

| fenêtre et état | bas de l'en-tête | h2 « Et vous ? » | masqué | chute |
|---|---|---|---|---|
| 1024x768 campagne | 75 | 0 à 34 | 34 px, en entier | commence à 56, coupée |
| 768x1024 campagne | 75 | 0 à 34 | 34 px, en entier | commence à 56, coupée |
| 1440x900 `?etat=avant` | 76 | 0 à 43 | 43 px, en entier | commence à 65, coupée |
| 1440x900 campagne | non collante | 0 à 43 | 0 | correcte |
| 375x812 | non collante | 0 à 33 | 0 | correcte |

Sur les captures `ancre-1024x768.png` et `ancre-1440x900-avant.png` on lit la moitié basse des lettres de « Prenez part à la Maison Audacieuse. » et le titre de section n'existe plus à l'écran.
Les deux autres ancres de la page sont correctes : `#et-vous`, cible du lien « Newsletter » du pied, pose le h2 à 170 px à 1024 et à 192 px en avant ; `#hero`, cible du logo, est correcte aussi. Seule l'ancre de l'action principale est cassée.
Portée : toute la bande 768 à 1239 dans les deux états, et `?etat=avant` au dessus de 1240, c'est à dire l'état dans lequel le site part en ligne le 30/08. Le brief demande des « liens d'ancre fonctionnels ». Introduit par la correction de la passe 3, l'en-tête n'étant pas collante avant.
Correctif d'une ligne : ajouter `#prendre-part` aux deux règles `scroll-margin-top: 88px` déjà écrites, celle du bloc 768 à 1239 et celle du bloc `html[data-etat="avant"]` au dessus de 1240.
2. **Grain des fonds clairs perdu.** Décrit ci dessus. Correction requise.
3. **Sélecteur et badge déplacés sur le prix et sur le bouton du rail.** Décrit ci dessus. `Minor`.
4. **Bouton compact de l'en-tête non atteignable au clavier depuis le haut de page, entre 768 et 1239.** Il est en `display: none` tant que `#cta-rail` est à l'écran, donc au moment précis où le curseur de tabulation passe sur lui dans l'ordre du DOM. Trois autres « Je prends ma part » restent atteignables et l'ordre reste logique. `Nit`.
5. **Position du badge incohérente d'une largeur à l'autre.** En haut à gauche entre 768 et 1239 et en `?etat=avant` au dessus de 1240, en bas à gauche partout ailleurs, alors que le brief le veut « en haut à gauche ». `Nit`.

### Ce qui a été contrôlé et ne bouge pas

- Copy : 79 segments sur 80, seul manquant le faux positif connu. Aucun mot changé, aucune phrase coupée. Les 11 trous du corps de copy restent rendus.
- Palette : 11 codes hexadécimaux, tous de la charte ; 4 bases `rgba()`, toutes dérivées de couleurs de la charte (56,54,72 puis 157,150,105 puis 237,237,245 puis 118,109,160). Aucune teinte ajoutée par cette passe.
- Zéro erreur console, zéro erreur de page, zéro requête externe, zéro requête en échec, sur les 16 combinaisons de fenêtre et d'état.
- Zéro débordement horizontal sur 375, 768, 1024, 1240, 1280, 1366 et 1440, dans les deux états, aux 6 positions de défilement.
- Clavier : 27 arrêts à 1440 et à 1024, 23 à 375, aucun sans indicateur de focus, aucune cible sous 44 px, CTA au 7e arrêt en desktop et au 3e à 375.
- Réduction de mouvement : `.notes .mot` en Onest `#383648`, les deux légendes « aujourd'hui » et « demain. © Basa Architecture » affichées, notes en flux, cellules mesurées 253, 253, 253, 253, 547, aucune cellule vide. Sans réduction : Meow Script menthe, notes en absolu, seule la légende « demain » affichée. Les deux dégradations obtenues en passe 2 tiennent.
- En-tête collante : hauteur et hauteur de page strictement constantes quand le CTA compact paraît et disparaît. Aucun saut.
- Pied pleine largeur et rail qui s'efface devant lui : inchangés, corrects.
- Zone chaude : une seule par vue sur toutes les captures relues, le jaune du 666 reste retiré dans le rail, le CTA garde le même violet du haut au pied.
- Contraste des notes au feutre et du cartouche Basa : aucune règle de compositing les concernant n'a bougé, le `.grain--clair` ne touche ni `.plan` ni `.notes`. Les mesures de la passe 2 (10,09:1 pour le crédit, 11,08:1 et 10,87:1 pour la note 2) restent valides. Non remesuré au pixel dans cette passe.

### Ce qui reste avant que le gate puisse être franchi

1. **`Major`, `#prendre-part`, bande 768 à 1239 dans les deux états et `?etat=avant` au dessus de 1240.** Le h2 « Et vous ? » est entièrement sous l'en-tête collante après clic sur le CTA. Ajouter `#prendre-part` aux deux règles `scroll-margin-top: 88px` existantes.
2. **Correction requise, `.grain--clair`.** Revenir à `mix-blend-mode: multiply` et supprimer la couture par la voie que la passe 2 indiquait : porter le grain sur la gouttière du rail, ou retirer le `background-image` de `.cadre` et donner son fond au rail seul.
3. **`Minor`, `.selecteur` et `.badge`, 768 à 1239 et `?etat=avant` au dessus de 1240.** Ils mordent sur « À partir de 100 € la part. » et sur le bouton du rail dès que le bandeau atteint le haut de la fenêtre. Les caler sous le bandeau plutôt que sous l'en-tête, ou ne les poser en haut que tant que le héros est à l'écran.
4. **`Nit`, badge.** Position incohérente d'une bande à l'autre et contraire à la lettre du brief.
5. **`Nit`, bouton compact de l'en-tête.** Non atteignable au clavier depuis le haut de page entre 768 et 1239.
6. Les cinq `Nit` de la passe 1 restent ouverts et restent optionnels.

### À trancher avec Romain au gate 2

1. **La cascade dans le rail, ou au beat 6 ?** La question de la passe 2 n'est pas close, elle est seulement devenue mesurable. La cascade ne monte dans le rail qu'au dessus de 1240 de large et 820 de haut, donc sur écran 1080p et plus, pas sur le portable de référence. Quand elle y monte, le beat 6 devient une colonne de texte étroite dans un champ vide, ce que la passe 1 reprochait déjà à cette section. Quand elle reste au beat 6, le rail tient en 431 px sur une colonne haute comme la fenêtre. Les deux états sont propres et aucun ne déborde : c'est un choix de composition, pas une correction, et l'audit peut mesurer les deux sans choisir.
2. **Le grain des fonds clairs contre la couture de ton.** Les deux sont mesurés et la troisième voie, qui garde les deux, n'a pas été prise. Si Romain préfère la surface lisse, l'écart au brief doit être validé explicitement, sans quoi le plafond charte redevient discutable à la prochaine lecture de cette page.

### Escalade

Troisième passe atteinte, verdict toujours pas au vert, pas de quatrième passe.
Axe en cause : accessibilité et technique, sur un point unique et récent.
Constat exact : l'ancre `#prendre-part`, cible des quatre CTA de la page, dépose le visiteur sur un titre de section entièrement masqué par l'en-tête collante introduite en passe 3, sur toute la bande 768 à 1239 et dans l'état `?etat=avant` qui est celui de la mise en ligne.
Ce qui a été tenté : trois passes, deux `Critical` et huit `Major` de la passe 1 levés, les deux `Major` de la passe 2 levés et mesurés. Le score est passé de 71 à 82 puis à 85. Le seul point bloquant restant est né de la dernière correction et se règle en une ligne de CSS.
Option de repli : si Romain ne veut pas d'une quatrième intervention sur cette maquette, retirer l'en-tête collante de la bande 768 à 1239 et de `?etat=avant` rend l'ancre correcte immédiatement, au prix du trou fonctionnel de CTA que la passe 2 avait signalé et qui n'était pas bloquant. Le choix entre les deux lui revient : une ligne de CSS pour garder le CTA persistant et réparer l'ancre, ou un retour en arrière sur la correction.

## Hotfix du principal apres la passe 3 (19/08/2026, non re-audite)

Trois passes atteintes, escalade a Romain. Deux correctifs d une ligne poses par le contexte principal, commit `maquettes-home` suivant `f81d5ae` : `#prendre-part` ajoute aux deux regles `scroll-margin-top: 88px` (ancre mesuree a 88 px sous une en-tete de 75 px a 1024, 768 et 1440 avant) ; `.grain--clair` repasse en `multiply` (la couture de ton de la gouttiere revient, 13 niveaux, acceptee comme Nit). Verif.mjs apres hotfix : console 0, externes 0, debordement 0, contrastes 0, copy 79/80. Restent ouverts : Minor flottants aux positions intermediaires, Nit badge, Nit bouton compact au clavier, arbitrages cascade et grain a gate 2.
