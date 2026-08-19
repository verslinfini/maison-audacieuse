# Audit maquette A, Le récit

Fichier audité : `C:\Users\romai\dev\maison-audacieuse-maquettes\maquettes\home\a-recit.html` (1 186 lignes, 46,3 Ko, CSS et JS inline).
Date : 19/08/2026. Passe 1 sur 3. Auditeur tiers, non producteur de la maquette.
États testés : campagne (par défaut) et `?etat=avant`.
Largeurs testées : 375 x 812, 768 x 900, 1024 x 900, 1366 x 768, 1440 x 900.
Outils : `maquettes/verif.mjs` (deux états, captures premier écran et pleine page, rapport JSON), `maquettes/copy-check.mjs` (deux états), trois scripts Playwright ad hoc dans `maquettes/_verif/` (menu clavier, sélecteur, fondu à huit positions de défilement, reduced-motion, 768 et 1024, hauteurs de héros, ordre des boutons du beat 8), lecture des captures à l'oeil, échantillonnage de pixels sur les captures pour les contrastes texte sur photo et pour le détachement des boutons.
Référentiels : `BRIEF-maquettes.md`, `contenu/pages/accueil.md`, `contenu/pages/chiffres-autorises.md`, `docs/charte.md`, `assets/SOURCES.md`, doc de beats du 18/08, `m9-audit.md`, `grilles.md`, `anti-slop.md`, `variantes-ui.md`.

## Score

**68 / 100.** Brut 68. Veto FIABILITÉ **armé** (plafond 75, non mordant puisque le brut est déjà en dessous). Veto SLOP **non armé**. Veto tiret cadratin **levé** (0 occurrence mesurée dans les deux états).

| Axe | Note | Justification en une ligne |
|---|---|---|
| Fidélité au brief et à la copy | 20 / 25 | Copy collée telle quelle, 80/80 segments dans les deux états, ancres, title Yoast, `noindex`, un seul h1, badge, barre CTA mobile, sélecteur complet et fonctionnel ; mais la meta description a été désaccentuée, le bandeau desktop casse à 768 px et le CTA du beat 8 sort de la maquette sur une 404. |
| Charte et anti-slop | 17 / 25 | Sept couleurs, Onest partout, grain SVG inline, une seule couleur chaude par écran, CTA de couleur constante, aucun motif interdit dans le markup du constructeur ; mais l'infographie importée au beat 7 est un autre système graphique, la grille du beat 8 laisse une cellule vide et inverse la hiérarchie des deux portes, et le CTA violet ne se détache pas du héros violet. |
| Fiabilité | 9 / 20 | Chiffres tous autorisés, « promesse de bail » correcte partout, aucune promesse fiscale sur la part, crédit Basa présent ; mais quatre noms de structures exploitantes, une personne physique nommée et une marque commerciale sont publiés par l'image du beat 7, en contradiction directe avec la décision du 18/08 et avec le trou affiché juste au-dessus. Veto armé. |
| Accessibilité et technique | 15 / 20 | Zéro console, zéro requête externe, zéro débordement de 375 à 1440, cibles toutes à 44 px ou plus, focus visible partout, menu mobile au clavier avec `aria-expanded`, Escape et retour de focus, reduced-motion et dégradation gracieuse traités, contrastes mesurés conformes ; mais un `alt` décrit une photo qui n'existe pas et les boutons principaux ne se détachent pas de leur fond. |
| Concept de variante | 7 / 10 | Fidèle au parti pris A et réellement distinct de B et de C ; mais le seul geste différenciant de A, le fondu du beat 2, est terminé avant que l'image soit cadrée et superpose deux cadrages qui ne se répondent pas. |

Cible du gate : 95. Non atteinte. Le veto fiabilité se lève avec le seul constat Critical 1.

## Constats

Sévérités : Critical bloque la mise en ligne. Major est une correction requise avant le gate. Minor est une correction souhaitable. Nit est cosmétique. FYI n'attend aucune action.

### Critical

| Sévérité | Où | Quoi | Correction prescrite |
|---|---|---|---|
| Critical | `#le-collectif figure.collectif__figure img[src="../assets/img/collectif-1.png"]`, 1440 et 375, les deux états, captures `a-recit-1440-full.png` (y ≈ 6 350) et `a-recit-375-full.png` (y ≈ 8 050) | Le fichier n'est pas une photo du collectif mais l'infographie « Les futures occupantes ». Elle publie les noms de quatre structures exploitantes (OSTARA, CAFÉ DES AUDACIEUSES, BANJO, MAISON EN-SANTÉ) avec leur objet, alors que la décision du 18/08 les interdit tant que la liste n'est pas figée le 24/08, et à deux centimètres du `[TROU: liste des exploitantes à figer au 24/08]` qui affirme l'inverse dans le même écran. Elle nomme en plus une personne physique (Marion Moenne-Loccoz) et une marque commerciale (Romain Bidot, stratégie et levée de fonds), et republie ce que la correction 3 du 18/08 avait retiré du texte. Elle porte une rangée de quatre cartes image plus titre plus texte, des capitales sur phrases entières, une palette et des polices hors charte. À 375 px son texte interne descend sous 9 px et devient illisible. | Supprimer l'élément `<img>` et la `<figure>` qui le porte. Ne laisser à cet emplacement que l'encadré pointillé déjà écrit dessous, `[TROU: photos de la Fête de l'Audace 1, Nextcloud 04 COM/01 Photos/2026.03 Fête de l'Audace, droit à l'image des personnes photographiées à vérifier avant mise en ligne]`, promu en bloc visuel de la largeur qu'occupait l'image. C'est exactement ce que rendent `b-compteur.html` (ligne 979) et `c-la-ferme.html` (ligne 1009). Ne remplacer par aucune autre image : aucun visuel du collectif utilisable n'est disponible dans `assets/img/`. |
| Critical | même `<img>`, attribut `alt`, les deux états | L'`alt` de la copy, « le collectif de la Maison Audacieuse réuni devant la ferme de Novel », a été collé sur un fichier qu'il ne décrit pas : une personne au lecteur d'écran reçoit la description d'une photo de groupe qui n'existe pas, et n'apprend rien des quatre noms qui, eux, sont bien publiés. | Disparaît avec la correction ci-dessus. Règle à tenir pour la suite : l'`alt` d'un `[TROU:]` n'existe pas, c'est le trou qui parle ; un `alt` de la copy ne se pose que sur l'image que la copy désigne. |

### Major

| Sévérité | Où | Quoi | Correction prescrite |
|---|---|---|---|
| Major | `<meta name="description">`, ligne 8 du fichier | La description Yoast a été désaccentuée et son symbole euro remplacé : « Prenez une part a 100 EUR et devenez cooperatrice ou cooperateur du lieu ». C'est une réécriture de la copy validée, que le brief interdit, et elle partirait telle quelle dans les résultats de recherche. `b-compteur.html` et `c-la-ferme.html` portent la chaîne correcte : A est seul à l'avoir abîmée. | Recopier la chaîne de `accueil.md` sans y toucher : `Une ferme d'Annecy devient un lieu de vie solidaire. Prenez une part à 100 € et devenez coopératrice ou coopérateur du lieu.` |
| Major | `#et-vous .vous__grille`, au-dessus de 1080 px, capture `a-recit-1440-full.png` | `.porte--une { align-self: center }` fait descendre la porte 1 : « Je fais un don » se pose à y = 7 159 et « Je prends ma part » à y = 7 504. Le lecteur rencontre le bouton secondaire 345 px avant le seul CTA d'intention souscrire de la page, ce qui inverse l'ordre des deux portes fixé par la copy. La cellule haut gauche de la grille reste vide sous le H2, motif que l'anti-slop nomme explicitement. En colonne unique, sous 1080 px, l'ordre est correct : le défaut est propre au desktop. | Sur `.porte--une`, remplacer `align-self: center` par `align-self: start`, et retirer `padding-top: .3rem` de `.porte--deux`. Les deux portes partent alors de la même ligne, la cellule ne reste plus vide et « Je prends ma part » se lit avant « Je fais un don ». |
| Major | `.entete__cta` et `.hero .bouton--primaire`, 1440 et 1024, les deux états, capture `a-recit-1440-fold.png` | Le CTA violet `#766DA0` posé sur le héros violet ne se détache pas de son fond. Mesuré au pixel sur la capture : 1,30:1 entre le fond du bouton d'en-tête et la photo voisine, 2,30:1 pour celui du héros, contre 3:1 attendus d'un élément d'interface. Le libellé blanc reste lisible (4,70:1 sur le violet, conforme), mais l'objet bouton ne se voit pas. C'est la seule action de la page, et elle est la moins visible du premier écran. | Ajouter un liseré clair aux seuls boutons posés sur du sombre, sans toucher à la couleur du CTA qui doit rester constante : `.hero .bouton--primaire, .entete .bouton--primaire { box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, .72); }`. Vérifier ensuite que le contraste du liseré contre la photo dépasse 3:1 aux deux emplacements. |
| Major | `.revele__bloc--apres`, règle `animation-range: cover 20% cover 52%`, 1440, état campagne, captures `_verif/a-recit-sondes/fondu-*.png` | Le seul moment de défilement de la page se joue trop tôt. Mesuré à huit positions : opacité 0 jusqu'à un défilement de 796, 0,32 à 996, 0,67 à 1 146, 1 à 1 296. La figure fait 593 px de haut et n'est entièrement dans l'écran qu'à partir d'un défilement de 1 190 : quand le lecteur la cadre enfin, le fondu est déjà terminé et il ne voit que le rendu Basa. Le croisement lui-même, saisi à mi-course, superpose deux cadrages qui ne se répondent pas (toiture rapprochée contre vue d'ensemble en trois quarts) et se lit comme un défaut d'affichage plutôt que comme une transformation. | Décaler la plage pour que le fondu se joue pendant que la figure est centrée : `animation-range: cover 40% cover 72%`, et aligner la sortie de l'étiquette « aujourd'hui » sur `cover 40% cover 62%`. Rapprocher les deux cadrages en posant sur `.revele__bloc--avant .revele__img` un `object-position` qui recule le bâtiment (essayer `50% 72%`) pour que la toiture d'aujourd'hui tombe à peu près là où tombe celle du rendu. |
| Major | Les cinq boutons « Je prends ma part », les deux états | Quatre pointent sur `#prendre-part` (ancre du beat 8, conforme au brief) et le cinquième, celui du beat 8 lui-même, pointe sur `/prendre-part/`. Sur GitHub Pages comme en `file://`, ce cinquième sort de la maquette sur une 404 au milieu de la comparaison. Cinq boutons de même libellé pour deux comportements distincts, dont un cul-de-sac. | Donner au bouton du beat 8 le même `href="#prendre-part"` que les autres, en conservant son `title="Tunnel /prendre-part/ en construction"`. Aucun CTA de la maquette ne doit alors quitter la page. La cible réelle `/prendre-part/` se remettra à l'intégration, elle n'a rien à faire dans un objet de décision. |
| Major | `.nav`, 768 px exactement, capture `_verif/a-recit-sondes/w768-fold.png` | À 768 px le bandeau desktop est encore actif (bouton menu et barre CTA basculent à 767 px) mais les entrées ne tiennent pas : « Le projet » et « La part sociale » passent à la ligne et le bandeau devient bancal, avec des éléments sur une et sur deux lignes. Mesuré : il manque environ 27 px de largeur. Le brief impose 768 px comme largeur de contrôle. | Ajouter `@media (max-width: 900px) and (min-width: 768px) { .nav ul { gap: .45rem; } .nav a { white-space: nowrap; padding: 0 .15rem; } .entete__cta { margin-left: .5rem; } .entete__cta.bouton { padding: 0 1.1rem; } }`, ce qui libère environ 50 px. Solution de repli si le rendu reste serré : faire basculer le bouton menu et la barre CTA à `max-width: 900px`. |

### Minor

| Sévérité | Où | Quoi | Correction prescrite |
|---|---|---|---|
| Minor | `figcaption.credit` du beat 2, 1440 et 375, les deux états | Le crédit « © Basa Architecture. » est posé sous la figure entière. Avant le fondu, et sur toute la hauteur de défilement où l'image visible est la photo du collectif, le crédit attribue à Basa un visuel qui n'est pas de Basa. À 375 px, où les deux images sont empilées, il tombe sous la photo d'aujourd'hui. | Déplacer le crédit dans `.revele__bloc--apres`, en petit sur l'angle bas droit de l'image Basa, pour qu'il apparaisse et disparaisse avec elle. À défaut, préfixer la légende par le sujet : « Le lieu projeté, © Basa Architecture. » |
| Minor | `.hero__img[src="../assets/img/hero1.jpg"]` avec `filter: brightness(1.24)`, 1440 et 1024 | Le traitement violet du fichier, encore éclairci par le filtre, réduit les deux tiers hauts du premier écran à une brume violette où la ferme n'est plus lisible. Le premier écran d'une variante qui s'appelle « Le récit » ne montre pas son sujet, et la brume frôle le dégradé violet décoratif que l'anti-slop proscrit. | Essayer `exterieur3-1.jpg`, que la copy autorise explicitement au beat 1 comme « variante sans traitement violet, même alt », et ramener le filtre à `brightness(1.06) contrast(1.1)`, réglage déjà retenu par le constructeur pour la bande mobile. Vérifier ensuite que le contraste du texte blanc reste au-dessus de 4,5:1. |
| Minor | `.selecteur`, 375, les deux états, capture `a-recit-375-fold.png` | Le sélecteur flottant recouvre une ligne de copy du héros : « Le lieu appartient à celles et ceux qui le financent » est masqué au premier écran. Le brief demande qu'il ne cache jamais le contenu de façon gênante. La contrainte pèse probablement sur les trois variantes. | Sous 768 px, réduire le sélecteur à sa forme compacte : `.selecteur__toutes { display: none; }`, ce qui ramène la pastille d'environ 330 px à environ 180 px, et la caler à droite (`left: auto; right: 12px; transform: none;`). Garder les flèches à 44 px. |
| Minor | `.revele__img` de `visuel-dauphine-1.jpg`, 1440 | Le fichier fait 900 px de large et l'emplacement en fait 1 440 sur 620 : agrandissement d'environ 1,6 fois, doublé sur écran à haute densité. Le rendu Basa, seule image de projection de la page, est le visuel le plus mou de la maquette. | Récupérer une version plus large auprès de l'agence, ou, à défaut pour la maquette, limiter la figure à `max-width: 1100px` centrée plutôt que pleine largeur. À signaler dans le gate quelle que soit la variante retenue. |
| Minor | `.palier__nb` et `.annotation`, en Meow Script terracotta `#A3716A` | Contrastes calculés : 3,76:1 pour les chiffres de cascade sur `#F5F5F6`, 3,33:1 pour l'annotation sur son encadré pointillé. Les deux passent le seuil de 3:1 parce que les tailles rendues (38 à 62 px pour les chiffres, 27 à 40 px pour l'annotation) relèvent du texte large, mais une écriture scripte à traits fins n'a pas la même lisibilité qu'un sans-serif de 24 px au même ratio. La règle est tenue, la marge est mince. | Aucune correction obligatoire. Si une passe de finition a lieu, foncer le terracotta des seuls usages Meow vers `#8E5F58` (environ 4,4:1 sur `#F5F5F6`) sans toucher à la couleur de charte ailleurs. |
| Minor | `.paliers li:nth-child(3)`, 1440 et 375 | Le point final de la ligne « 3 000 » reste orphelin après l'encadré pointillé en ligne, ce qui donne « 3 000 : [TROU: lecture à valider le 24/08] . » avec un point isolé. | Intégrer le point dans l'encadré ou le coller au `</span>` sans espace. |
| Minor | `.hero h1`, 768 et 1024 | Le point d'interrogation du H1 tombe seul sur la deuxième ligne, faute de `max-width: 18ch` trop serrée à ces largeurs. | Ajouter `text-wrap: balance` sur `.hero h1` et porter la contrainte à `max-width: 22ch` dans la requête `max-width: 1080px`. |

### Nit

| Sévérité | Où | Quoi | Correction prescrite |
|---|---|---|---|
| Nit | `.trou--suite` du beat 2 | L'encadré des cinq briques s'insère entre la liste et la phrase qui la referme, et sépare « Personne ne s'y enrichit, tout y vise l'équilibre et l'utilité. » de ce qu'elle conclut. | Déplacer l'encadré après la phrase de clôture, en fin de bloc. |
| Nit | Beats 3, 4, 5, 7 et 8 | Cinq sections consécutives emploient la même grille, texte à gauche et objet à droite, jamais inversée. La règle anti-slop vise l'alternance ; la répétition sans variation produit un effet voisin, un milieu de page rythmiquement plat. | Inverser une seule de ces sections, le beat 5 par exemple, pour rompre la répétition sans installer une alternance systématique. |
| Nit | `.annotation`, attribut `aria-hidden="true"` | L'annotation manuscrite « 99 ans, promesse de bail » n'est pas restituée à l'oral. Elle double le paragraphe voisin, donc rien n'est perdu, mais l'arbitrage mérite d'être conscient. | Aucune action. À reprendre si l'annotation porte un jour une information absente du texte. |
| Nit | `.etiquette`, textes « aujourd'hui » et « demain » | Ces deux libellés viennent des notes intégrateur de la copy, où ils sont prévus pour le cas de repli sans fondu ; ils sont ici présents aussi dans le cas animé. | Aucune action, le choix se défend. À mentionner au gate pour que Romain sache que ces deux mots ne sont pas du corps de copy. |

### FYI

| Sévérité | Où | Quoi | Correction prescrite |
|---|---|---|---|
| FYI | `copy-check.mjs`, les deux états | 80 segments attendus, 80 présents, 0 manquant, en campagne comme en `?etat=avant`. Le compteur d'exemple 218 est bien présent en campagne et bien absent en avant lancement. Dix trous rendus, ceux du corps de la copy. | Aucune. |
| FYI | `verif.mjs`, 375 et 1440, les deux états | Zéro erreur et zéro avertissement de console, zéro requête externe, zéro requête en échec, zéro débordement horizontal, zéro cible sous 44 px, zéro tiret cadratin, zéro point d'exclamation, un seul h1, aucun saut de niveau de titre, aucun élément focusable sans indicateur visible, Tab atteint le CTA en 7 pas à 1440 et en 3 pas à 375. Contrôles complémentaires : aucun débordement à 768 ni à 1024. | Aucune. |
| FYI | Menu mobile et sélecteur, 375 et 1440 | Entrée ouvre le menu, `aria-expanded` bascule à `true`, les cinq liens deviennent tabulables, Escape referme et rend le focus au bouton. Le sélecteur conserve `?etat=avant` sur les deux flèches, sur les touches fléchées et après un clic d'ancre (vérifié : l'URL devient `...html?etat=avant#prendre-part`). | Aucune. |
| FYI | `@media (prefers-reduced-motion: reduce)` et `@supports (animation-timeline: view())` | En mouvement réduit, les deux images se posent côte à côte, toutes deux visibles, sans animation : dégradation conforme au brief. Mais `animation-timeline` n'est disponible que sur les moteurs récents ; les navigateurs qui ne le portent pas, dont les Safari qui ne sont pas à jour, affichent le repli. Une part notable des visiteurs, en particulier sur iPhone, ne verra jamais le fondu, c'est-à-dire le seul geste qui distingue A. | Aucune correction technique. À dire à voix haute avant de choisir A pour ce geste. |
| FYI | Chiffres de la page | 218 (exemple, badge « Maquette, chiffres d'exemple » présent), 100 €, 650, 99 ans, 10 juillet, 2025, mars, avril et juillet 2026, 666, 1 700, 3 000, 5 000, 19 septembre, 66 %, 34 €. Tous figurent à `chiffres-autorises.md` et au beat où ils sont autorisés. « Promesse de bail » est écrit aux trois occurrences, « sous bail » n'apparaît nulle part, la déduction de 66 % est rattachée au don et à lui seul, aucune promesse fiscale ne pèse sur la part. | Aucune. |
| FYI | `dessin.jpg`, beat 5 | Publié sans ligne de crédit dans les trois variantes, alors que la copy porte `[TROU: auteur précis de dessin.jpg pour le crédit]` et que SOURCES.md note « auteur précis non identifié ». Convention partagée, pas un écart propre à A. | À trancher au gate, pour les trois variantes ensemble. |
| FYI | Trous non rendus par A | A ne rend pas `[TROU: palier visé à afficher dans l'état avant lancement du héros]` (B le rend) ni `[TROU: visuel de cascade à produire, brief Solène]` (C le rend). Dans les deux cas le corps de la copy fournit une consigne de repli explicite (« identique, moins la ligne de compteur » au beat 1, « en attendant, cascade en typographie seule » au beat 6). A est donc conforme, la divergence est signalée pour qu'elle ne se lise pas comme un oubli. | Aucune. |
| FYI | Liens absolus du site | `/le-projet-architectural/`, `/part-sociale/`, `/lequipe-projet/`, `/les-medias/`, `/contacts/`, `/politique-de-confidentialite-mentions-legales/` renvoient une 404 sur GitHub Pages. Contrainte commune aux trois variantes, à la différence du CTA du beat 8 traité plus haut. | Aucune, sauf si Romain veut cliquer partout pendant la comparaison. |
| FYI | Portage en blocs Kadence | Survivent sans difficulté : la grille, les aplats, le grain SVG en donnée URI, la typographie, la barre CTA mobile, la police Meow Script à ajouter au thème. Demandent du CSS additionnel plus un bloc HTML : le fondu piloté par le défilement. Ne relève pas du CSS mais d'un réglage de thème : l'en-tête transparent sur le héros qui devient opaque au défilement, fonction d'en-tête Kadence et non simple habillage. Dépend du serveur : la valeur du compteur. Rien dans cette maquette ne promet un effet intenable. | Aucune. |

## Ce qui est bien, à ne pas casser

La copy est collée telle quelle, 80 segments sur 80 dans les deux états, et les dix trous du corps sont rendus en pointillé sans être maquillés.
La charte tient sans effort visible : sept couleurs, Onest partout, grain SVG en donnée URI sur les deux aplats sombres, une seule couleur chaude par écran, CTA d'une seule couleur du haut en bas de la page.
La cascade de paliers en Meow Script terracotta et la ligne de compteur à 14 px donnent une voix qui n'est celle d'aucun gabarit, et le beat 4 tient ses quatre faits en lignes filetées sans une seule carte.
Le socle technique est propre : zéro console, zéro requête externe, zéro débordement de 375 à 1440, focus visible partout, menu mobile pilotable au clavier avec Escape et retour de focus.
L'état `?etat=avant` tient debout : le héros perd sa ligne et la composition reste juste, ce qui est exactement la fenêtre du 30/08 au 07/09.

## Objection de fond

Le seul geste qui distingue A de la mise en page sage que la copy produirait toute seule est le fondu du beat 2, et ce geste est deux fois fragile : dans son réglage actuel il est terminé avant que l'image soit cadrée, et il ne s'affiche pas du tout sur les navigateurs qui ne portent pas les animations pilotées par le défilement, iPhone compris. Retirez-le et il reste l'ordre nominal des beats dans une page bien composée, ce qui est le mérite de A et son risque : c'est la variante qui convainc et qui ne pousse pas. Le nombre que toute la campagne doit faire monter est le plus petit texte du premier écran, et le seul bouton de la page est un violet posé sur un violet où l'oeil ne le trouve pas. Ce n'est pas une erreur du constructeur, c'est le parti pris de A poussé jusqu'à son bord. La décision de demain matin n'est donc pas « quelle mise en page » mais « la home doit-elle convaincre ou faire pression ». Si Romain choisit A, il doit exiger les deux corrections qui rendent le parti pris tenable, détacher le CTA de son fond et donner au compteur sa propre ligne plutôt qu'une note de bas de titre, sinon il choisit à la fois l'option sobre et l'appel faible.

## Passe 2 (19/08/2026)

Passe 2 sur 3. Auditeur tiers, ni producteur ni correcteur de la maquette. Objet : vérifier que les corrections annoncées après la passe 1 sont réellement faites, chercher les régressions, rescorer.

États testés : campagne (par défaut) et `?etat=avant`. Largeurs mesurées : 375, 600, 768, 800, 860, 900, 1024, 1080, 1100, 1200, 1366, 1440.
Outils : `maquettes/verif.mjs` (deux états), `maquettes/copy-check.mjs` (deux états), cinq scripts Playwright écrits pour cette passe dans `maquettes/_verif/` (`audit2-tiers.mjs`, `audit2-entete.mjs`, `audit2-lisere.mjs`, `audit2-etiquette.mjs`, `audit2-crops.mjs`), mesures et captures dans `maquettes/_verif/a2-tiers/`. Les contrastes du liseré sont échantillonnés sur les pixels réellement rendus, par décodage PNG des captures à deux fois la densité, pas estimés depuis le CSS.

### Score

**92 / 100.** Brut 92. Veto FIABILITÉ **levé** (la seule cause d'armement est corrigée et vérifiée). Veto SLOP **non armé**. Veto tiret cadratin **levé** (0 occurrence dans la source, 0 dans le rendu, deux états, deux largeurs).

| Axe | Passe 1 | Passe 2 | Ce qui a bougé |
|---|---|---|---|
| Fidélité au brief et à la copy | 20 / 25 | 23 / 25 | Meta description recopiée à l'identique, bandeau qui tient à 768, plus aucun CTA qui sort de la maquette ; reste le sélecteur qui masque trois mots à 375. |
| Charte et anti-slop | 17 / 25 | 22 / 25 | L'infographie d'un autre système graphique a disparu, la cellule vide de la grille du beat 8 aussi, le CTA se détache enfin de son fond ; reste l'ordre vertical des deux boutons du beat 8 au-dessus de 1100 px et deux Nit de rythme. |
| Fiabilité | 9 / 20 | 19 / 20 | Aucun nom de structure exploitante, aucune personne physique, aucune marque commerciale nulle part dans le fichier ; reste `dessin.jpg` publié sans ligne de crédit, écart commun aux trois variantes. |
| Accessibilité et technique | 15 / 20 | 19 / 20 | L'`alt` orphelin est parti avec l'image, les boutons principaux sont mesurés à 4,81:1 au pire contre leur voisinage ; reste une timeline d'étiquette qui ne pointe pas sur la bonne boîte. |
| Concept de variante | 7 / 10 | 9 / 10 | Le fondu se joue maintenant pendant que la figure est cadrée et les deux cadrages se répondent vraiment ; reste que `animation-timeline` n'est pas porté par les moteurs anciens, ce qui plafonne le geste et ne se corrige pas en CSS. |

Cible du module : 95. Non atteinte, l'écart tient aux points listés plus bas, aucun n'est bloquant.

### Vérification constat par constat

Verdicts : **corrigé**, **partiel**, **non corrigé**, **refus accepté**, **refus rejeté**.

#### Critical

| Constat de la passe 1 | Verdict | Preuve |
|---|---|---|
| Infographie `collectif-1.png` publiant quatre structures exploitantes, une personne physique et une marque commerciale | **corrigé** | Zéro occurrence de `collectif-1` dans le fichier. Images référencées, liste complète : `lma.svg`, `hero1.jpg`, `exterieur3-1.jpg`, `visuel-dauphine-1.jpg`, `dessin.jpg`. Recherche plein texte de OSTARA, CAFÉ DES AUDACIEUSES, BANJO, EN-SANTÉ, Moenne, Loccoz, Bidot, `part_` : aucune occurrence. Le trou est promu en bloc visuel (`.trou--visuel`, `max-width: 820px`, `min-height: clamp(180px, 24vw, 250px)`), ce que rendent déjà B et C. Captures `a2-tiers/sec-1440-le-collectif.png` et `sec-375-le-collectif.png`. |
| `alt` de la copy posé sur un fichier qu'il ne décrit pas | **corrigé** | Disparaît avec la figure. `imagesSansAlt: 0`, et les cinq `alt` restants décrivent bien leur fichier. |

Veto FIABILITÉ levé.

#### Major

| Constat de la passe 1 | Verdict | Preuve |
|---|---|---|
| Meta description désaccentuée | **corrigé** | Comparaison caractère par caractère avec `accueil.md` ligne 16 : identique. Identique aussi à `b-compteur.html` et `c-la-ferme.html`. |
| Grille du beat 8 : cellule vide et ordre des deux portes inversé | **partiel** | `align-self: start` posé, `padding-top` retiré, `align-items: start` sur la grille : les deux portes démarrent à la même ligne (y = 6 728 à 1440), la cellule vide sous le H2 a disparu. Mais les boutons n'ont pas suivi : « Je fais un don » tombe à y = 6 799 et « Je prends ma part » à y = 6 935, soit 136 px d'écart au lieu de 345. Mesuré à 1100, 1200, 1366 et 1440, toujours dans le même sens. Sous 1080 px, colonne unique, ordre correct (« Je prends ma part » 163 px avant). L'écart ne vient plus de la mise en page mais de la hauteur du texte au-dessus du bouton dans la porte 1. Voir « À trancher au gate ». |
| CTA violet posé sur héros violet, ne se détache pas | **corrigé** | Liseré `rgba(255, 255, 255, .86)` en `box-shadow` interne. Mesuré sur les pixels rendus à densité 2, valeur réelle du liseré `[236, 234, 242]`. Contre le fond voisin : CTA du héros 8,73 / 9,14 / 9,06 à 1440 et 10,34 / 10,16 / 10,22 à 1024 ; CTA d'en-tête 7,24 / 4,81 / 6,20 à 1440 et 7,55 / 6,12 / 6,59 à 1024. Pire valeur 4,81:1, pour 3:1 attendus. Liseré contre le violet du bouton 3,95:1, l'arête se voit aussi de l'intérieur. Le correcteur a fait mieux que la prescription en portant le liseré sur `.entete:not([data-solide="oui"])` : vérifié à 1440, 1024 et 768, il disparaît dès que l'en-tête devient blanche. |
| Fondu du beat 2 terminé avant que l'image soit cadrée, deux cadrages qui ne se répondent pas | **corrigé** | `animation-range: cover 40% cover 72%`. Figure haute de 593 px, sommet à 1 496 : elle est entièrement dans l'écran de 1 189 à 1 496 de défilement. Opacité mesurée : 0 à 1 140, 0,16 à 1 196, 0,52 à 1 346, 0,87 à 1 496, 1 vers 1 550. Le fondu se joue donc en entier dans la fenêtre où la figure est cadrée. Mi-course à 1 340, figure à 156 px du haut et 151 px du bas d'un écran de 900, soit centrée. `object-position: 50% 72%` sur l'image d'aujourd'hui : à mi-course la ligne de faîtage, la porte cintrée et la ligne de sol des deux images coïncident, cela se lit comme une transformation du même bâtiment et non comme un défaut d'affichage. Capture `a2-tiers/fondu-micourse.png`. |
| CTA du beat 8 pointant sur `/prendre-part/`, 404 | **corrigé** | Les cinq boutons portent `href="#prendre-part"`, `title` conservé. Aucun CTA ne quitte la page. |
| Bandeau desktop qui casse à 768 px | **corrigé** | Requête `max-width: 900px and min-width: 768px` appliquée. Mesuré à 768, 800, 860, 900 et 1024 : les cinq entrées sur une seule ligne (toutes à y = 46), aucun chevauchement avec le logo ni avec le CTA, marge restante de 27 à 39 px. La bascule mobile reste à 767 px, vérifiée. Captures `a2-tiers/fold-768.png` et `entete-solide-768.png`. |

#### Minor

| Constat de la passe 1 | Verdict | Preuve |
|---|---|---|
| Crédit Basa attribuant à Basa une image qui n'est pas de lui | **corrigé** | Option de repli retenue : « Le lieu projeté, © Basa Architecture. » Le sujet est nommé, l'attribution ne porte plus sur la photo. |
| `hero1.jpg` et `brightness(1.24)`, la ferme illisible sous la brume | **partiel, refus accepté** | Le filtre est ramené à `brightness(1.06) contrast(1.1)` à toutes les largeurs, valeur que la passe 1 proposait elle-même. La ferme se lit : grand toit de tuiles, murs de pierre, portes cintrées, véhicule. Le refus du swap est vérifié en ouvrant les deux fichiers : `hero1.jpg` est `exterieur3-1.jpg` avec le traitement violet, même prise de vue, même jour, même véhicule, mêmes bacs. L'échanger poserait deux fois le même cadrage sur la page et priverait l'« avant » du fondu de son identité. Refus accepté. |
| Sélecteur qui recouvre une ligne de copy à 375 | **partiel** | `.selecteur__toutes { display: none }`, pastille calée à droite, largeur ramenée de 330 à 183 px, flèches toujours à 44 px, `?etat=avant` conservé sur les deux. Mais le recouvrement subsiste : pastille de x 180 à 363, paragraphe de x 20 à 355, trois mots de « appartient à celles et ceux qui le financent » restent masqués au premier écran. Chrome de comparaison et non contenu de la page future, contrainte commune aux trois variantes. |
| `visuel-dauphine-1.jpg` agrandi 1,6 fois | **corrigé** | Option de repli retenue : `.lieu__figure { max-width: 1100px }` centrée. Agrandissement ramené à 1,22 fois. |
| Terracotta Meow `#A3716A`, marge de contraste mince | **refus accepté** | La charte ferme la palette à sept couleurs et `#A3716A` est le terracotta de charte (`docs/charte.md`, ligne 13). `#8E5F58` serait une huitième couleur, donc un écart à la charte non validé par Romain, que la grille DESIGN sanctionne d'un plafond. La passe 1 écrivait elle-même « aucune correction obligatoire » et les deux ratios, 3,76:1 et 3,33:1, restent au-dessus du seuil de 3:1 du texte large. Refus accepté. |
| Point orphelin après l'encadré de la ligne « 3 000 » | **corrigé** | Le point est passé dans l'encadré, plus rien ne flotte après. |
| Point d'interrogation du H1 seul en deuxième ligne à 768 et 1024 | **corrigé** | `text-wrap: balance` et `max-width: 22ch` sous 1080. Mesuré à 375, 600, 768, 900, 1024, 1080, 1200, 1366 et 1440 : le point d'interrogation n'ouvre jamais une ligne, et à 768 comme à 1024 le H1 tient sur une seule ligne. |

#### Nit

| Constat de la passe 1 | Verdict |
|---|---|
| Encadré des cinq briques inséré entre la liste et sa phrase de clôture | **non corrigé** |
| Cinq sections consécutives sur la même grille, jamais inversée | **non corrigé** |
| `annotation` en `aria-hidden` | inchangé, aucune action attendue |
| Étiquettes « aujourd'hui » et « demain » présentes aussi dans le cas animé | inchangé, aucune action attendue |

### Régressions

Cherchées : débordement, contraste, texte coupé, zone chaude doublée, copy altérée, requête externe, console, ordre de lecture, dégradation.

**Aucune régression.**

Copy : 80 segments sur 80 présents dans les deux états, 10 trous rendus, title inchangé, compteur 218 présent en campagne et absent en avant lancement. Aucune altération.
`verif.mjs` à 375 et 1440, deux états : 0 message de console, 0 erreur de page, 0 requête externe, 0 requête en échec, 0 débordement horizontal, 0 cible sous 44 px, 0 tiret cadratin, 0 point d'exclamation, un seul h1, aucun saut de niveau, 0 élément focusable sans indicateur visible, 0 image cassée, sans `alt` ou sans dimensions.
Aucun débordement non plus à 768, 800, 860, 900, 1024, 1200 et 1366 : largeur du document égale à la largeur d'écran partout.
En-tête au défilement, vérifiée à 1440, 1024 et 768 : transparente sur le héros, puis blanche opaque avec navigation sombre et logo violet dès 900 px de défilement, liseré du CTA correctement retiré dans l'état opaque. Rien ne se dégrade.
Texte blanc du héros sur la photo : 12,67:1 pour le H1, 12,53:1 pour le chapô, 12,02:1 pour la ligne de compteur.
Menu mobile : `aria-expanded` passe à `true` à l'entrée, les cinq liens s'affichent, Escape referme et rend le focus au bouton, aucune erreur de console.
Mouvement réduit : les deux images se posent côte à côte, `grid-template-columns: 548.5px 548.5px`, opacité 1. Dégradation conforme, inchangée.
État `?etat=avant` : la composition tient, les deux CTA portent leur liseré.

Une observation qui n'est pas une régression : le CTA du beat 8 pointe sur `#prendre-part`, identifiant porté par son propre conteneur, donc le clic fait défiler la page sur elle-même. C'est exactement ce que prescrivait la passe 1, la cible réelle se remet à l'intégration, aucun cul-de-sac.

### Verdict

**PUBLIABLE.** 92 sur 100, aucun Critical, aucun Major bloquant, veto fiabilité levé, veto slop non armé, veto tiret cadratin levé. La maquette peut aller au gate de comparaison.

### Reste à corriger, aucun bloquant

| Sévérité | Où | Correction exécutable |
|---|---|---|
| Minor | `.selecteur`, sous 768 px | Trois mots de copy restent masqués au premier écran. Soit masquer aussi `.selecteur__nom` sous 480 px pour ne garder que les deux flèches, soit remonter la pastille à `bottom: calc(70px + 3.2rem + env(safe-area-inset-bottom, 0px))`. À décider pour les trois variantes ensemble, la contrainte est commune. |
| Nit | `.revele__bloc--avant .etiquette` | Sa `animation-timeline: view()` se résout sur la boîte de l'étiquette, pas sur celle de la figure : `cover 40% cover 62%` tombe donc dans une autre fenêtre de défilement. Mesuré : l'étiquette « aujourd'hui » ne commence à s'effacer qu'à 1 420 et vaut encore 0,32 à 1 546, quand l'image est à 0,99 de « demain ». Poser `view-timeline-name: --revele` sur `.revele__bloc--avant` et `animation-timeline: --revele` sur l'étiquette, la plage existante devient alors celle qui était voulue. |
| Nit | `.trou--suite` du beat 2 | Déplacer l'encadré après « Personne ne s'y enrichit, tout y vise l'équilibre et l'utilité. », en fin de bloc. Non fait à la passe 1. |
| Nit | Beat 5, `.choix__grille` | Inverser cette seule section pour rompre la répétition de cinq grilles identiques. Non fait à la passe 1. |
| FYI | `dessin.jpg`, beat 5 | Toujours publié sans ligne de crédit alors que `SOURCES.md` note « auteur précis non identifié » et que la copy porte un trou pour lui. Écart commun aux trois variantes, à trancher au gate pour les trois ensemble. |

### À trancher au gate

**1. Beat 8 au-dessus de 1100 px, ordre des deux boutons.** Le défaut anti-slop est réglé : les deux portes partent de la même ligne, plus aucune cellule vide. Reste que « Je fais un don » se lit 136 px au-dessus de « Je prends ma part », parce que la porte 1 porte une accroche de trois lignes avant son bouton. Ce qui joue en sens inverse : la porte 1 est la colonne de gauche, donc lue en premier, elle ouvre sur le texte le plus fort de la section, et son bouton est plein quand le second n'est que cerné. Les trois façons de supprimer l'écart coûtent quelque chose : remonter le bouton dans la porte 1 change l'ordre de la copy, élargir la porte 1 ne gagne qu'une quarantaine de pixels, décaler la porte 2 vers le bas réinstalle le vide en haut à droite que la passe 1 avait fait retirer. L'audit ne tranche pas un arbitrage de hiérarchie visuelle qui n'a plus de bonne réponse mécanique.

**2. Premier écran, le traitement violet de `hero1.jpg`.** Le refus du swap est fondé, les deux fichiers sont la même prise de vue. Le filtre adouci rend la ferme lisible dans le tiers bas. Reste que le tiers haut du premier écran est une brume violette. Question de goût, pas de conformité : garder cette prise de vue traitée comme signature d'ouverture, ou demander un autre cadrage de la ferme pour le beat 1 afin que la variante qui s'appelle « Le récit » ouvre franchement sur son sujet.

### Ce que la passe 2 confirme comme acquis

Le fondu du beat 2 est devenu ce que la passe 1 demandait : il se joue quand la figure est cadrée et les deux cadrages se répondent. C'est le seul geste qui distingue A, et il fonctionne maintenant.
Le CTA se voit. Mesuré à 4,81:1 au pire contre son voisinage, il n'est plus le violet perdu sur le violet que décrivait la passe 1.
Le socle technique n'a pas bougé d'un pouce : zéro console, zéro requête externe, zéro débordement de 375 à 1440, focus visible partout, clavier complet, mouvement réduit traité.
La copy reste collée telle quelle, 80 sur 80, et les dix trous du corps sont rendus sans être maquillés.

L'objection de fond de la passe 1 tient toujours, elle ne relève pas de la correction : A convainc et ne pousse pas, et `animation-timeline` prive une part des visiteurs, iPhone en tête, du seul geste qui la distingue. Cela se dit à voix haute avant de choisir A, cela ne se corrige pas dans le fichier.
