# Audit tiers, maquette définitive de la home

Fichier audité : `maison-audacieuse-maquettes/maquettes/home/a-recit.html` (1 266 lignes, HTML autonome, polices `../assets/fonts.css`, images `../assets/img/`).
Date de la passe : 20/08/2026. Auditeur tiers, module m9, passe 1/3. L'agent qui a produit la maquette n'a pas participé à cet audit.
Référentiel de copy et d'architecture : `2026.08.20 - Copy home validée écran par écran - LMA.md` (8 écrans, décisions transverses, notes d'intégration, 9 trous).
Autres intrants : `docs/charte.md` (intrant fermé), `contenu/pages/chiffres-autorises.md` (version du 20/08 au matin), `maquettes/assets/SOURCES.md`, `references/grilles.md`, `references/anti-slop.md`.

États testés : défaut « campagne » (compteur 812 visible) et `?etat=avant`.
Largeurs testées en navigateur : 1440, 768, 375. Captures pleine page, captures par position de défilement sur les 8 ancres, recadrages à 3x sur le marqueur, la jauge, la pièce, les équations, l'encart de frise, les étiquettes et les gestes.
Outils : `verif.mjs` (deux états), `copy-check.mjs` (deux états), plus quatre scripts de mesure écrits pour cette passe dans `maquettes/_verif/audit-def/` (contraste au pixel de glyphe, géométrie de l'anneau, vides de composition, parcours clavier et texte hors copy). Aucune commande git, aucun fichier du dépôt modifié, la maquette n'a pas été touchée.

## Score par axe

| Axe | Score | Veto | Justification en une ligne |
|---|---|---|---|
| 1. Exactitude du contenu | 92/100 | veto FIABILITÉ non armé | Chaque chiffre rendu est dans `chiffres-autorises.md`, aucune structure exploitante nommée, aucun 66 %, chaîne remboursement au mot près ; le crédit © Basa est visible mais posé sous les deux images alors que la photo « avant » est du collectif. |
| 2. Design dans la charte | 84/100 | veto SLOP non armé | Charte tenue (7 couleurs, Onest, Meow Script en mots d'accent, une seule zone chaude par vue, teintes sourdes), gestes singuliers et non transposables ; l'anneau tourne à l'envers et l'écran 6 se creuse. Critère âme 22/25, au dessus du seuil de 20. |
| 3. Accessibilité | 93/100 | aucun plafond déclenché | Contrastes mesurés au pixel de glyphe : tout passe AA sauf un `·` décoratif à 4,28:1 ; focus visible sur 26 arrêts sur 26, aucune cible sous 44 px à aucune largeur, menu clavier complet avec Échap et retour de focus, `prefers-reduced-motion` honoré. |
| 4. Technique | 95/100 | aucun | Zéro erreur console, zéro requête externe, zéro requête en échec, zéro débordement horizontal en 375, 768 et 1440, les deux états vérifiés en navigateur ; les 5 CTA pointent une ancre au lieu de `/prendre-part/`. |
| 5. SEO | 90/100 | aucun | Title et description écrits, un seul h1, hiérarchie sans saut, `noindex, nofollow` présent, `lang=fr`, alt rédigés, dimensions sur toutes les images ; canonique, sitemap et 301 sont **non testés**, ils n'existent pas sur un fichier autonome. |

**Global : 91/100.** Cible de gate : 95. Cinq corrections requises, aucune Critical.

## Constats par sévérité

Format : `Sévérité | où | quoi | correction prescrite`.

| Sévérité | Où | Quoi | Correction prescrite |
|---|---|---|---|
| Critical | néant | Aucun fait faux, aucune image à droits tiers, aucun cadratin, aucune exclamation, aucune fonction cassée, aucun échec WCAG bloquant. | sans objet |
| correction requise | `.jauge__anneau svg`, ligne 366 | L'anneau se remplit dans le sens antihoraire : mesure angulaire, l'arc couvre 184° à 360° depuis midi, soit de 12 h vers 6 h par la gauche, à l'inverse de toute jauge de collecte ; le commentaire CSS de la ligne 364 affirme le contraire, donc l'intention était bien horaire. | Remplacer `transform: scaleX(-1) rotate(-90deg)` par `transform: rotate(-90deg)`. Vérifié : l'arc passe alors de 0° à 176° en sens horaire. |
| correction requise | `.jauge__point`, ligne 997 | Le point médian ouvre la ligne « · prochain palier : 1 700 » au lieu de séparer deux items : un séparateur en tête de ligne n'est plus un séparateur, et il mesure 4,28:1 pour un seuil de 4,5. | Supprimer `<span class="jauge__point">·</span>`. Vérifié sur copie hors dépôt : `copy-check` reste à 73/73 dans les deux états, la jauge décompose déjà la ligne. |
| correction requise | `.part__grille`, ligne 632 | Écran 6, écran de conversion : `align-items: center` décale la colonne gauche de 125 px sous la colonne droite, ce qui creuse 156 px de vide sous le titre puis 125 px sous le texte, sur un écran de 707 px. La page paraît inachevée là où elle demande l'argent. | Passer à `align-items: start`. Vérifié : les deux colonnes partagent alors une ligne haute à 31 px sous le titre, le vide restant descend en pied de colonne où il est neutre. |
| correction requise | `.ferme__visuel .credit`, ligne 1066 | Le crédit « © Basa Architecture » est posé sous la paire d'images, or `exterieur3-1.jpg` (l'« avant ») est du collectif selon `SOURCES.md` : le crédit attribue à Basa un visuel qui n'est pas le sien. | Attacher le crédit à la seule figure « après », ou écrire « Projet : © Basa Architecture · Photo actuelle : La Maison Audacieuse ». |
| correction requise | `.ferme__visuel .trou`, ligne 1067 | Le second bloc pointillé n'est pas un manque de contenu (l'image est là, le crédit aussi) : c'est une réserve juridique affichée sur l'objet que Romain va regarder, et elle fait passer la page pour deux fois plus inachevée qu'elle ne l'est. | Passer ce texte en commentaire HTML et le porter dans la note de gate. Garder le seul trou de l'écran 2, qui, lui, occupe la place d'un visuel manquant. |
| Nit | `.jauge__arc`, ligne 372 | `stroke-linecap: round` ajoute un demi contour à chaque extrémité : l'anneau lit 50,6 % là où 812 sur 1 700 valent 47,8 %. | Accepter (2,8 points d'écart) ou passer en `butt` si le chiffre doit être exact au degré. |
| Nit | `.gestes`, lignes 1152 à 1164 | Les trois gestes sont des `div` et les chiffres sont `aria-hidden` : au lecteur d'écran il ne reste ni ordre ni groupe. | `<ol class="gestes">` avec `list-style: none` : rendu identique, séquence rendue au clavier et au lecteur d'écran. |
| Nit | `.pari__ouverture`, à 768 px | « celui-ci » se coupe au trait d'union en fin de ligne dans la phrase d'ouverture de l'écran 5. | `<span style="white-space: nowrap">celui-ci</span>` ou élargir `max-width` de 34ch à 36ch au palier 1080. |
| Nit | `.piece::after`, ligne 658 | Le tenon violet colle au « au » qui suit dans « Prendre part au projet ». | Porter la marge droite de la pièce de `.1em` à `.22em`. |
| Nit | `.menu-mobile` | L'ouverture du menu ne verrouille pas le défilement du corps : le panneau reste fixe pendant que la page glisse derrière. | `document.body.style.overflow = 'hidden'` à l'ouverture, restauré à la fermeture. |
| Nit | `.barre-mobile`, ligne 1215 | À 375, la barre CTA fixe est le dernier arrêt de tabulation, après le pied. | Déplacer le `div` avant `<main>` dans le DOM, la position `fixed` ne change pas. |
| Nit | écrans 2, 3 et 6 | Le même partage texte à gauche, objet à droite revient trois fois sur six écrans ; jamais deux fois de suite, donc au seuil de l'anti slop, pas au delà. | Facultatif : inverser l'écran 3 (visuels à gauche, texte à droite), ce qui met aussi l'« avant » côté marge. |
| FYI | `.jauge__nombre`, ligne 993 | 812 est marqué valeur d'exemple en commentaire HTML et n'est autorisé qu'en maquette : `chiffres-autorises.md` l'interdit en production. | Rappel pour la session tunnel : figer au chiffre réel le 07/09. |
| FYI | 5 occurrences de `href="#prendre-part"` | Les CTA pointent l'ancre de l'écran 6 avec un `title` explicite « Tunnel /prendre-part/ en construction », et non `/prendre-part/`. Libellé et couleur identiques aux 5 endroits, mesurés `rgb(118,109,160)` sur blanc. | À basculer sur `/prendre-part/` à l'intégration. |
| FYI | `.etapes__lien`, ligne 1092 | `/prochaines-etapes/` n'existe pas ; le repli du doc (projet architectural ou omission) est documenté dans le `title`. | Trancher après le collectif du 24/08. |
| FYI | écrans 5 et 7 | Les deux arbitrages laissés ouverts par le doc sont tranchés dans le même sens : la chute de l'écran 5 n'est pas cliquable, le geste 1 non plus, avec le motif écrit en commentaire (ne pas créer un second chemin au libellé différent du CTA unique). | Aucune action, cohérent avec la décision transverse du CTA unique. |
| FYI | contrastes serrés mais conformes | Encart terracotta 4,10:1 (20 px gras, seuil 3), Meow Script violet 4,04:1 (25,6 à 32 px, seuil 3), signe `=` 4,04:1, CTA blanc sur violet 4,70:1 pour un seuil de 4,5. Tous passent, aucun n'a de marge. | Ne pas réduire ces corps ni éclaircir ces fonds à l'intégration. |
| FYI | `.marqueur` | 0,2 à 0,3 % des pixels de glyphe sortent du tracé jaune, soit 18 à 22 pixels à 3x, en bord de lettre. C'est de l'anticrénelage, pas une perte de lisibilité. | Aucune action. |
| FYI | écran 4 | La chute de la frise porte aussi la classe `manifeste`, que le doc ne prescrit qu'à l'écran 5. La hiérarchie tient (40 px contre 46,4 px), l'écho ne se casse pas. | Aucune action. |

### Copy et fidélité au doc du 20/08

`copy-check` : **73 segments sur 73 présents, 0 manquant, dans les deux états.** Contre vérifié à la main sur 12 segments pris dans les 8 écrans (titre h1, lead, phrase surlignée, constat de l'écran 2, item café, phrase des 99 ans, jalon d'avril avec sa flèche, chute manifeste de l'écran 5, chaîne remboursement, ligne de la Fête de l'Audace, geste 3, équations) : verbatim, mot pour mot, ponctuation comprise. Le parseur est neuf mais ne surévalue pas : ses tolérances (frise scindée date et fait, flèche en glyphe, ligne compteur décomposée par la jauge) correspondent à des traitements graphiques réellement présents, et aucun segment ne passe uniquement par un `alt` ou un `title`.

Texte visible hors copy, relevé exhaustivement : les deux blocs `[TROU: ...]`, les étiquettes « avant » et « après », le crédit « © Basa Architecture », le bouton « Menu » en mobile. Les étiquettes entrent dans les exceptions (étiquettes descriptives d'images, et le doc nomme lui même le bloc « Avant/après ») : **autorisées**. Aucune mention de maquette, de variante ou de gate ne subsiste.

Notes d'intégration, une par une : kicker en petites capitales discret et unique de la page ✓ · surlignage exactement sur « bousculer les inégalités de genre » et sur rien d'autre ✓ · « C'est quoi, une part sociale ? » en lien texte 14 px sous un bouton plein de 52 px, nettement moins visible ✓ · un seul enrichissement par item à l'écran 2, aucune sous liste ✓ · case « D'ici le 31 décembre » seule en couleur de toute la frise ✓ · flèche d'avril en glyphe ✓ · chute de l'écran 5 en manifeste isolé ✓ · 100 € présent une seule fois sur la page, dans l'équation de l'écran 6 ✓ · écho « qui partagent nos valeurs » vers « Vous partagez nos valeurs » préservé ✓ · portes douces en `#383648` et en bouton secondaire, jamais dans le violet du CTA ✓ · pas de 66 %, pas de WhatsApp, pas de collège des soutiens, pas de 5 000, pas d'« investisseurs privés », pas de « récupérer à tout moment » ✓ · point médian partout, pronoms en toutes lettres ✓ · CTA unique, même libellé et même couleur aux 5 emplacements ✓ · architecture des 8 écrans dans l'ordre ✓.

### Les quatre points signalés d'office

**(a) Point médian orphelin sous la jauge : à corriger.** Ce n'est pas un artefact acceptable, c'est un séparateur qui ouvre une ligne, et il est dans les cent premiers pixels que Romain regardera. Le retrait est vérifié sans effet sur la copy.

**(b) Étiquettes « avant » et « après » : autorisées.** Ce sont des étiquettes descriptives d'images, exception nommée, et le doc titre lui même le bloc « Avant/après ou plans ». Meow Script sur deux mots respecte la charte (mots d'accent, jamais un paragraphe). Contraste mesuré 4,04:1 à 25,6 et 32 px, conforme au seuil texte large. Rien à changer, sinon savoir que la marge est nulle.

**(c) Bloc gauche du héros qui descend de 165 px en `?etat=avant` : acceptable.** Mesure : la ligne de pied commune est à 792 px dans les deux états, seule la hauteur du bloc gauche change (la jauge fait 135 px plus 30 px de marge). Sur mobile le décalage n'existe pas, les blocs s'empilent. Aucun visiteur ne voit les deux états, la composition de l'état `avant` tient (deux blocs sur une bande basse, la photo respire au dessus) et aucun contenu ne bouge, ce que visait le « rien d'autre ne bouge » du doc. Pas de correction.

**(d) Avant/après statique : choix sain, pas une régression.** Un fondu au défilement rend l'« après » illisible au repos, impose du mouvement sur un écran de preuve et complique `prefers-reduced-motion`. Deux figures côte à côte, étiquetées, lisibles à l'arrêt, c'est ce qu'il faut à un objet de décision, et c'est aussi la seule des deux versions qui survit à l'intégration sans JavaScript.

## Ce qui est bien

Les gestes graphiques sont singuliers et non transposables : la ligne de faîtage qui coiffe « Sous un même toit », l'escalier des chiffres 1 plein, 2 et 3 en contour de taille décroissante, la pièce qui s'emboîte sur le mot « part », les équations dont les signes tombent sur un axe commun avec le point médian devenu respiration.
Aucun réflexe d'IA : pas de rangée de trois cartes, pas de triptyque d'icônes, pas de dégradé décoratif, un seul eyebrow sur toute la page, un rythme de fonds varié (photo, blanc, violacé, blanc, sombre, blanc, violacé, sombre) et non un padding uniforme.
La discipline de couleur est tenue écran par écran : une seule zone chaude par vue (jaune au héros, vert à l'écran 2, terracotta à la frise, violet ailleurs), teintes sourdes, aucun empilement d'accents.
Le socle technique est propre de bout en bout : zéro console, zéro requête externe, zéro débordement aux trois largeurs, focus visible sur les 26 arrêts, aucune cible sous 44 px, menu clavier avec Échap et retour de focus, `prefers-reduced-motion` réellement câblé.
Les arbitrages ouverts par le doc ont été tranchés et motivés en commentaire dans le code, au lieu d'être laissés à la session suivante.

## Objection de fond

La jauge a été validée sur un chiffre qui ne sera jamais affiché. La maquette montre le seul état flatteur du compteur, 812 sur 1 700, soit un anneau à moitié plein. Or les deux états qui existeront réellement sont ceux de la cascade actée : au lancement du 07/09, 666 sur un palier de 666, donc un anneau **plein**, qui dit « c'est fait, on n'a pas besoin de moi » ; puis, dès la bascule au palier 1 700, le même anneau retombe à 39 %. Le seul élément de la page chargé de dire « ça monte » va publiquement reculer, d'un tour complet à un tiers, dans les jours qui suivent le lancement. Le garde fou du doc n'anticipait qu'un anneau presque vide, pas un anneau qui se vide. Il faut donc voir dessinés les deux états réels, 666 sur 666 et 666 sur 1 700, avant de figer la jauge : c'est là que se décide le repli sur le nombre nu, pas sur une valeur d'exemple choisie parce qu'elle tombe bien.

## Ce qui ne survivra pas tel quel à l'intégration Kadence

Kadence libre plus CSS scopé ne reproduit nativement aucun des gestes qui font l'identité de cette page. Ce qui exigera un bloc HTML personnalisé, ou du CSS que l'éditeur ne saura plus modifier :

La jauge SVG, arc en `stroke-dasharray` et nombre superposé, qui doit en plus devenir dynamique (compteur réel, palier courant).
Le surlignage marqueur : `background-image` en SVG inline sur un `span`, avec `box-decoration-break: clone` pour tenir sur deux lignes. L'éditeur Kadence casse le `span` au premier reformatage.
La pièce du mot « part » : deux pseudo éléments circulaires dont l'encoche est blanche, donc dépendante du fond exact de la section. Elle casse sur tout fond non blanc.
Les équations : grille à trois colonnes avec placement explicite de huit `span` par `grid-area`. Aucun équivalent de bloc.
La frise : grille de sept colonnes aux largeurs calées à la main, axe et pastilles en pseudo éléments, bascule en frise verticale sous 960 px. Le thème libre n'a pas de bloc chronologie.
L'escalier des gestes : `-webkit-text-stroke` sur les chiffres 2 et 3, tailles décroissantes.
La ligne de faîtage de l'écran 2 : `polyline` SVG en `preserveAspectRatio="none"`.
Le héros : grille deux colonnes alignées sur une ligne de pied commune, image plein cadre à double voile dégradé, et surtout le traitement mobile (bande photo de 300 px puis texte sur aplat violet), qui n'est pas un simple empilement responsive.
Le grain : `feTurbulence` en data URI avec `mix-blend-mode: overlay` sur les deux sections sombres et le pied.
L'en tête transparent qui bascule en solide, avec inversion du logo par `filter`, piloté par `IntersectionObserver` : Kadence a bien un en tête transparent, mais pas ce point de bascule ni l'inversion du logo.
La barre CTA fixe en bas d'écran mobile.
Le commutateur `?etat=avant`, qui devra devenir un vrai mécanisme (condition de date côté serveur, ou classe posée sur le `body`).

Conséquence à connaître avant de donner ses retours : la page telle qu'elle est dessinée est atteignable, mais au prix d'un bloc HTML personnalisé par écran distinctif et d'une feuille de style scopée. Ce que l'équipe pourra encore modifier depuis l'éditeur après l'intégration, ce sont les textes, les images et les boutons ; pas la jauge, pas la frise, pas les équations, pas le surlignage.

## Verdict

**À corriger d'abord**, puis présentable. Cinq corrections requises, aucune Critical, environ un quart d'heure de travail, aucune ne touche à la copy ni à l'architecture. Deux d'entre elles fausseraient la lecture de Romain s'il regardait la maquette en l'état : une jauge qui tourne à l'envers, et un écran de conversion qui paraît vide alors qu'il s'agit d'un défaut d'alignement. Corriger ces cinq points, refaire tourner `verif.mjs` et `copy-check.mjs` sur les deux états, puis présenter.
