# Audit tiers, maquette B « Le compteur »

Fichier audité : `C:\Users\romai\dev\maison-audacieuse-maquettes\maquettes\home\b-compteur.html` (1125 lignes, 44,1 Ko, CSS et JS inline).
Date : 19/08/2026. Passe 1 sur 3. Auditeur tiers, non producteur de la maquette.
États testés : campagne (défaut, compteur d'exemple 218) et `?etat=avant`.
Largeurs testées : 360, 375, 768, 1024, 1239, 1240 et 1440 px. Modes testés : défaut, `prefers-reduced-motion: reduce`, navigateur sans `animation-timeline` (branche `@supports not`).

Outils : `maquettes/verif.mjs` (deux états), `maquettes/copy-check.mjs` (deux états), trois scripts Playwright écrits pour cet audit dans `maquettes/_verif/` (`audit-b.mjs`, `audit-b2.mjs`, `audit-b3.mjs`), lecture du source, lecture à l'oeil de 14 captures (folds 1440 et 375 dans les deux états, pleine page 1440 et 375 découpée écran par écran, 768 fold et pleine page, menu mobile ouvert, rail latéral, zone d'appel, repli reduced-motion, focus clavier). Contrastes calculés, pas estimés. Aucun outil Playwright MCP employé.

Référentiels : `BRIEF-maquettes.md`, `docs/charte.md`, `contenu/pages/accueil.md`, `contenu/pages/chiffres-autorises.md`, `2026.08.18 - Beats et arborescence home - LMA.md` (section « Les trois variantes »), `maquettes/assets/SOURCES.md`, `references/anti-slop.md`, `references/grilles.md`, `references/variantes-ui.md`.

## Score

**76 / 100.** Score brut, aucun plafond appliqué.

| Axe (grille DESIGN) | Points | Note |
|---|---|---|
| Respect de la charte, intrant fermé | 15 / 20 | Onest partout, Meow Script tenu à trois emplois légitimes, grain SVG inline sur l'aplat sombre et sur le pastel, violet en aplat franc, CTA de couleur constante, une seule zone chaude par écran vérifiée écran par écran. Deux fonds de section hors liste et un dégradé sombre recomposé, voir M7. |
| Hiérarchie et lisibilité | 14 / 20 | Une seule action principale, chemin de l'oeil net au premier écran, rythme de padding varié, rail qui s'efface sur la zone d'appel. Quatre vides mesurés en bas de colonne courte, voir M5 et M6. |
| Cohérence des composants et des espacements | 9 / 10 | Un seul système de rayon, mixte et documenté en tête de feuille (999 px pour le CTA et le chrome flottant, 4 px partout ailleurs), transitions à 170 ms constantes, vocabulaire de filets homogène, échelle typographique à 1,26 entre corps et chapo. |
| Accessibilité mesurée | 11 / 15 | Tous les contrastes de texte entre 4,70 et 9,36, focus visible sur 100 % des éléments interactifs, menu mobile clavier exemplaire, ordre de tabulation logique, alt et dimensions complets. Deux échecs, voir M3 et M4. |
| Responsive réel, vérifié au navigateur | 6 / 10 | Zéro débordement horizontal mesuré aux sept largeurs, recadrage réel des images en mobile et pas seulement réduction. En-tête cassé à 768 px, largeur exigée par le brief, voir M1. |
| Âme, la page est reconnaissable comme celle de CETTE structure | 21 / 25 | Seuil de 20 franchi, critère non compensable satisfait. Le 218 posé nu, la cascade sur violet sombre grainé, « nôtre » au feutre dans le H1, l'annotation « 99 ans, promesse de bail », le fondu ferme vers Basa avec son repli étiqueté à la main sont des gestes de ce projet. Trois images réelles seulement sur toute la page, dont une manquante alors qu'elle est nommée et disponible. |

### Vetos

**VETO SLOP : non armé.** Aucun interdit de l'anti-slop relevé au rendu (pas de rangée de trois cartes icône titre texte, aucun eyebrow, aucune numérotation 01/02/03, aucun dégradé décoratif ni halo ni bouton en dégradé, aucune ombre molle sur cartes empilées, rayon mixte documenté, aucun séparateur en vague ni en biseau, rien de centré section après section, padding variable, alternance texte image limitée à deux, aucune carte dans une carte, zéro emoji, zéro icône cliché, aucun texte blanc sur photo, aucun faux tableau de bord, compteur strictement typographique et non animé, aucun indicateur de défilement, aucun Title Case, 0 point d'exclamation). La page ne pourrait pas être celle de n'importe qui : le nombre nu à 140 px, la cascade en quatre paliers sur aplat sombre grainé et le mot manuscrit dans le titre la signent.

**VETO FIABILITÉ : non armé.** Tous les chiffres du rendu figurent dans `chiffres-autorises.md` (100 €, 650+, 666, 1 700, 3 000, 5 000, 99 ans, 10 juillet 2026, 2025 lauréat AMI, 19 septembre, 66 %, 34 €), le 218 est badgé « Maquette, chiffres d'exemple », aucun chiffre interdit ne paraît (ni 88 900 €, ni 3,2 M€, ni le seuil de 5 000 € ni le délai de 5 ans, ni 54 000, ni 300, ni 15 %, ni 25 ou 18 %), les 66 % sont rattachés au don seul et jamais à la part, aucune exploitante n'est nommée (le trou du beat 7 est rendu), « promesse de bail » est employé et « sous bail » ne paraît nulle part, et les trois images du rendu sont toutes créditées collectif ou Basa dans SOURCES.md, sans capture de presse, sans GIF, sans `ferme.png`. Le seul défaut de cette famille est le **placement** d'un crédit exact, pas la subsistance d'un fait non sourcé : je n'étire pas le veto pour le couvrir, mais le constat C1 bloque à lui seul la mise en ligne.

**VETO TIRET CADRATIN : non armé.** 0 occurrence dans le source, 0 dans le rendu aux deux largeurs et dans les deux états. Aucun renvoi.

## Constats

### Critical

`Critical` | `figure.fondu > figcaption.credit`, section `#le-lieu` | 1440 et 375, état campagne au repos (`_verif/b-compteur/b-compteur-1440-full.png` bas de page, `crop-4.png`, `m-5.png`) et dans les deux replis (`_verif/b-reducedmotion-fondu.png`, branche `@supports not (animation-timeline: view())`) | le crédit « © Basa Architecture » est la légende du `<figure>` qui contient les DEUX images : au repos, avant tout défilement, il s'affiche directement sous `exterieur3-1.jpg`, photo créditée « collectif La Maison Audacieuse » dans SOURCES.md, et dans les modes empilés il légende la paire. La page attribue donc à Basa Architecture une photo qui n'est pas d'eux, sur un fichier destiné à GitHub Pages, alors même que l'autorisation d'usage web du visuel Basa est encore un trou de la copy | remplacer le contenu du `figcaption` par le crédit des deux images, qui reste du texte de crédit donc autorisé hors copy : `aujourd'hui, collectif La Maison Audacieuse · demain, © Basa Architecture`. Variante équivalente si la légende doit rester courte : sortir le crédit du `<figure>` commun et le poser dans un `<span class="credit">` placé sous `.fondu-demain` seulement, visible en permanence dans les deux replis et révélé avec le fondu en mode animé.

### Major

`Major` | `.entete .nav-liens a`, media query `max-width: 767px` | 768 px, deux états (`_verif/b-768-campagne-fold.png`) | à 768 px, largeur explicitement exigée par le brief, le menu horizontal est encore affiché mais ne tient pas : « La part sociale » passe sur 3 lignes (71 x 73 px), « Le projet » sur 2 lignes (64 x 49 px), et l'en-tête, qui est sticky dans la plage 768 à 1239 px, monte à 124 px de haut. Le brief interdit le libellé qui passe à la ligne en desktop | porter le seuil du menu replié de `max-width: 767px` à `max-width: 899px` : le hamburger et la pastille CTA du header tiennent largement en 768 px (logo 156 + bascule 110 + CTA 205 + gouttières, contre 720 px disponibles). Garder la barre CTA fixe basse sous 768 px seulement, comme le brief l'exige. Ajouter `white-space: nowrap` sur `.nav-liens a` pour interdire le cas à toute autre largeur.

`Major` | `#le-collectif .trou-bande` | 1440 et 375, campagne (`_verif/crop-5.png`, `m-5.png`) | `collectif-1.png` (860 x 534, crédit collectif La Maison Audacieuse), que la copy désigne nommément comme le visuel du beat 7 et qui est disponible dans `assets/img/`, est absent. La section chargée d'incarner le collectif n'a aucune image : 321 px de vide sous son texte et un rectangle en pointillé vide à droite. C'est aussi la cellule vide que l'anti-slop nomme | insérer l'image dans `.trou-bande` avec l'alt de la copy : `<img src="../assets/img/collectif-1.png" width="860" height="534" loading="lazy" alt="le collectif de la Maison Audacieuse réuni devant la ferme de Novel">`, et faire descendre le trou des photos de la Fête de l'Audace sous l'image, en légende pointillée.

`Major` | `.champ-lettre input`, section `#et-vous` | 1440 et 375, campagne (`_verif/crop-6.png`) | la bordure `#A29DB7` du champ email est le seul élément qui identifie le contrôle, sans label visible ni placeholder, et elle mesure 2,61:1 sur son fond blanc et 2,24:1 sur le fond de section `#EDEDF5`. WCAG 1.4.11 exige 3:1 pour la limite visuelle d'un champ de saisie, et le brief le reprend | remplacer `border: 1.5px solid #A29DB7` par `border: 1.5px solid var(--violet-lien)` : `#5F5788` mesure 6,55:1 sur blanc et 5,63:1 sur `#EDEDF5`.

`Major` | `.hero-lien a`, `.part-lien a`, `.lieu-lien a`, `.collectif-lien a` | 1440 (260 x 27 px) et 375 (232 x 24 px), deux états, relevé par `verif.mjs` | quatre liens texte seuls sur leur ligne, donc hors de l'exception « inline » de WCAG 2.5.8, mesurent 24 à 27 px de haut alors que le brief impose 44 px de cible tactile. Les liens réellement inclus dans une phrase ne sont pas concernés | agrandir la cible sans toucher au dessin du lien : `.lien-texte { position: relative } .hero-lien .lien-texte::after, .part-lien .lien-texte::after, .lieu-lien .lien-texte::after, .collectif-lien .lien-texte::after { content: ""; position: absolute; inset: -10px -6px }`.

`Major` | `[data-etat="avant"] .hero`, `.hero-grille` | 1440, état avant lancement (`_verif/b-compteur-avant/b-compteur-avant-1440-fold.png`) | le compteur éteint, la grille du héros garde ses deux rangées et sa cellule de compteur : il reste un encadré en pointillé de 40 px de haut suivi de 171 px de crème vide, sur un héros de 579 px. Trente pour cent de la hauteur du premier écran est un trou. C'est exactement le cas que le doc de beats demandait de tester, « la variante B étant la plus exposée puisque son héros est le compteur », et B le rate visuellement | en état avant, sortir de la grille à deux rangées et repasser en flux d'une colonne : `[data-etat="avant"] .hero-grille { grid-template-columns: minmax(0, 1fr); grid-template-areas: "titre" "definition" "compteur" "actions"; }` avec `[data-etat="avant"] .hero-filet { display: none }` et `[data-etat="avant"] .hero-definition { border-left: 0; padding-left: 0; max-width: 46rem }`. Le héros redevient un bloc plein, sans trou au milieu.

`Major` | `.hero-grille`, `.portes`, `#le-collectif .env` | 1440, campagne (`b-compteur-1440-fold.png`, `crop-5.png`, `crop-6.png`) | trois vides de composition mesurés en bas de colonne courte : 314 px à droite de la phrase du compteur dans le héros, 461 px sous la colonne gauche de « Et vous ? », 321 px sous le texte du collectif. S'y ajoute la gouttière droite de 208 px imposée à toutes les boîtes de contenu au-dessus de 1240 px, vide partout sauf pendant la fenêtre où le rail paraît. La page se lit comme composée par le haut et abandonnée par le bas de chaque section | resserrer les trois grilles : `.hero-grille` colonne 1 ramenée de `1.55fr` à `1.15fr` pour que la phrase du compteur atteigne la colonne d'action ; `.portes` passé en `align-items: stretch` avec un filet vertical `border-left` sur `.porte-second` pour que la colonne courte soit tenue par un trait au lieu de flotter ; `#le-collectif` passé en une colonne avec l'image de M2 en pleine largeur sous le texte.

`Major` | `:root { --fond-hero: #FAF4D3 }` et `{ --fond-chaud: #E9E2E2 }`, plus les bornes du dégradé `.sombre` | 1440 et 375, toute la page | deux fonds de section sont hors de la liste du brief, qui autorise les 7 couleurs de la charte plus `#F5F5F6`, `#EDEDF5` et blanc. Le héros, plus grande surface de la page, porte une nuance inventée. Le dégradé sombre est recomposé en `#3F3C54` vers `#383648` vers `#2D2B3B` avec un voile kaki à 34 %, là où la charte décrit `#383648` vers `#766DA0` vers kaki : le violet principal est absent de l'aplat sombre. La charte nommant « crème » dans sa famille de fonds pastel, l'écart est défendable, mais il n'a pas été validé et l'intrant est fermé | deux issues, l'une ou l'autre avant le gate : soit revenir à `#FFF3A8` pour le héros et `#EDEDF5` pour le beat 7, soit faire acter les deux nuances par Romain en une ligne. Dans les deux cas, réintroduire `#766DA0` comme borne claire du dégradé sombre, en faible proportion, pour que le violet principal soit présent dans l'aplat.

### Minor

`Minor` | `.hero-grille`, media query `max-width: 1080px` | 375, deux états (`b-compteur-375-fold.png`, `m-0.png`) | l'ordre mobile place le compteur puis le CTA avant la définition : le lecteur reçoit « Je prends ma part » et « Vous choisissez votre nombre de parts à l'écran suivant » avant d'avoir lu « La Maison Audacieuse, c'est une ferme d'Annecy qui devient un lieu de vie solidaire » et avant « À partir de 100 € la part ». La copy du beat 1 donne définition et prix avant le compteur. Le choix est assumé en commentaire et cohérent avec le parti pris de B, mais on demande de cliquer avant d'avoir dit le prix | au minimum, remonter la seule ligne de prix au-dessus du compteur en mobile, en la sortant de `.hero-definition` dans un bloc propre placé en zone `compteur` haute. Solution complète si Romain préfère la copy à l'effet : `grid-template-areas: "titre" "definition" "compteur" "actions" "filet"`.

`Minor` | `.barre-mobile` | 375, campagne (`b-compteur-375-fold.png`) | au premier écran mobile, deux pastilles violettes « Je prends ma part » strictement identiques sont visibles à 220 px l'une de l'autre, celle du héros et celle de la barre fixe. C'est le cas que la note intégrateur du beat 8 demandait d'arbitrer sur maquette : il l'a été pour le rail desktop, qui s'efface proprement sur la zone d'appel, pas pour la barre mobile | appliquer à `.barre-mobile` la logique déjà écrite pour le rail : la révéler par `IntersectionObserver` quand `.hero-actions` est sortie de l'écran, la masquer quand `#et-vous` est visible, en réutilisant la fonction `majRail`.

`Minor` | `.nav-liens a`, `.pied-liens a` | 1440 et 375, deux états | les six entrées de nav et les huit libellés du pied pointent vers les chemins absolus de production (`/le-projet-architectural/`, `/contacts/`, `/politique-de-confidentialite-mentions-legales/`). Sur GitHub Pages, un clic sort de la maquette vers un 404 GitHub et Romain perd sa page de comparaison au milieu de la séance de décision | ajouter `target="_blank" rel="noopener"` sur ces liens : l'adresse réelle reste affichée et honnête, un clic accidentel ouvre un onglet et la maquette survit. Ne pas remplacer par un `#` nu, le brief l'interdit.

`Minor` | `.bouton-tiers` (« Je m'inscris ») face à `.bouton-second` (« Je fais un don ») | 1440, campagne (`crop-6.png`) | le bouton de la lettre d'information est un aplat plein `#383648`, visuellement plus lourd que le bouton du don qui est en contour, alors que la copy classe le don en deuxième porte et la lettre en repli de dernier recours. La hiérarchie des deux actions secondaires est inversée | donner à « Je m'inscris » le contour de `.bouton-second` et garder l'aplat pour le don, ou mettre les deux en contour et différencier par la place seule.

### Nit

`Nit` | `.selecteur` | 375, deux états (`b-compteur-375-fold.png`) | la pastille flottante recouvre 6 px du soulignement de « C'est quoi, une part sociale ? » au premier écran. Aucun pixel cliquable perdu, `elementFromPoint` sous la pilule renvoie la section et non le lien, et l'écart avec la barre CTA est de 7 px sans chevauchement | porter `bottom` de `calc(var(--h-barre-mobile) + 0.85rem)` à `calc(var(--h-barre-mobile) + 1.4rem)` en mobile, ou laisser tel quel.

`Nit` | `.trou`, `.trou-visuel`, `.trou-bande` | toutes largeurs | la bordure pointillée `#918CA6` mesure 2,91:1 sur le héros et 2,96:1 sur `#F5F5F6`. Ce sont des cadres d'annotation d'auteur, pas des composants d'interface, donc hors obligation, mais un cran plus foncé rendrait les trous plus lisibles à l'écran de Romain | passer `--pointille` à `#7C7694`.

`Nit` | `.pied img` | 1440, campagne (`crop-6.png`) | le logo du pied est blanchi par `filter: brightness(0) invert(1)`, ce qui donne maison ET lettrage blancs, aucun des deux verrouillages décrits par la charte, alors que `assets/logo/lma-blanc.png` existe et est crédité | sans conséquence à 168 x 52 px. Si on passe par là, tester `lma-blanc.png` et retenir celui qui tient le mieux dans le gabarit horizontal.

`Nit` | `figcaption.credit` | le crédit rendu est « © Basa Architecture » sans le point final que porte la copy. Le point appartient à la phrase d'instruction, pas au crédit | aucune action.

### FYI

`FYI` | copy | zéro mot inventé sur toute la page. L'extraction complète du texte rendu se recompose intégralement à partir de la copy, des 10 trous, du badge, du sélecteur, du crédit image et des deux étiquettes « aujourd'hui » et « demain », que la note intégrateur du beat 2 autorise explicitement pour le repli du fondu. Les huit segments signalés manquants par `copy-check` sont analysés en fin de rapport : aucun mot perdu, aucun mot changé.

`FYI` | technique | 0 message de console, 0 erreur de page, 0 requête vers un hôte externe, 0 requête en échec, 0 débordement horizontal mesuré élément par élément à 360, 375, 768, 1024, 1239, 1240 et 1440 px, un seul H1, aucun saut de niveau de titre, `noindex, nofollow` présent, `<title>` strictement égal au title Yoast de la copy, `lang="fr"`, 5 images toutes avec alt et dimensions, `loading="lazy"` sur les 4 images sous la ligne de flottaison et absent du logo d'en-tête.

`FYI` | mécanique du sélecteur et des états | `?etat=` est conservé sur les trois liens du sélecteur et sur les deux touches flèches, vérifié par navigation réelle (`ArrowRight` depuis `?etat=avant` arrive sur `c-la-ferme.html?etat=avant`). Les flèches ne se déclenchent pas depuis le champ email, ni avec Alt, Ctrl ou Meta. Le menu mobile passe `aria-expanded` de `false` à `true`, le focus entre dans le menu, Échap referme et rend le focus au bouton. Le rail latéral est `visibility: hidden` en haut de page, visible au milieu, masqué sur `#et-vous`, donc jamais deux boutons identiques dans la même vue en desktop. Le fondu mesure une opacité de 1 puis 0,91 puis 0,40 puis 0 le long du défilement. En `prefers-reduced-motion` et dans la branche `@supports not`, les deux images s'empilent avec leurs étiquettes manuscrites.

`FYI` | ce qui ne survivra pas tel quel à l'intégration Kadence | la gouttière droite de 13 rem posée sur toutes les boîtes de contenu au-dessus de 1240 px est une grille asymétrique que les lignes et colonnes Kadence ne produisent pas sans CSS global sur la page entière. Le rail latéral demande du JS à écrire (deux `IntersectionObserver`). Le fondu demande un bloc HTML personnalisé, parce qu'il superpose deux images en position absolue dans un cadre à ratio fixe, plus du CSS additionnel pour `animation-timeline`. La bascule `?etat=` doit devenir un réglage serveur, pas un paramètre d'URL, comme la copy le prévoit déjà. Aucun de ces quatre points n'est irréalisable, mais B est la variante dont l'intégration coûtera le plus de CSS additionnel.

`FYI` | zone chaude | comptée écran par écran sur la pleine page 1440 et sur la pleine page 375 : héros jaune crème, bloc sombre voilé de kaki, frise et preuves sans accent, part sociale sans accent, notre choix sans accent, ferme de Novel portée par la terracotta du toit sur la photo, collectif en gris chaud, et vous sans accent, pied sombre. Jamais deux accents chauds dans la même vue. Le revers est que le tiers médian de la page est entièrement gris et lilas, sans une seule couleur, sur quatre écrans consécutifs.

## Ce qui est bien, à ne pas casser

Le compteur : nombre nu à 140 px, en chiffres tabulaires, palier nommé en phrase juste dessous, aucune barre, aucune fraction, aucun défilement animé. C'est exactement la recommandation du beat 6 et c'est la meilleure chose de la maquette.
La discipline du Meow Script : un seul mot dans le H1, une annotation manuscrite sur l'emplacement photo du beat 3, deux étiquettes dans le repli du fondu. Jamais un paragraphe, jamais une répétition.
Le repli du moment de scroll : `@supports not` et `prefers-reduced-motion` donnent tous deux les deux images empilées avec « aujourd'hui » puis « demain » au feutre. C'est la dégradation demandée, réellement implémentée et réellement vérifiée.
Le clavier : focus visible sur tout, jaune sur les fonds sombres, menu mobile avec `aria-expanded`, Échap et retour du focus au bouton, flèches du sélecteur neutralisées dans le champ de saisie. Rien de tout cela n'était acquis.
Le rail latéral qui s'efface sur la zone d'appel : la note intégrateur du beat 8 posait l'arbitrage, la maquette y répond au lieu de le contourner.

## Objection de fond

B fait du compteur son héros, et le compteur sera éteint pendant les huit premiers jours de la page, du 30/08 au 07/09. Ce sont les seuls jours dont on est certain aujourd'hui, et ce sont ceux où la page doit convertir un warm-up qui n'a rien d'autre à regarder. L'état `?etat=avant` de cette maquette montre ce qui reste alors : un titre, trois phrases, un bouton, et 171 px de crème vide à l'endroit exact où le sujet de la page devrait se trouver. On peut corriger le trou visuel, M6 dit comment, mais on ne corrige pas le fond : le premier écran de B n'a de raison d'être que quand le nombre monte. Tout ce qui le remplirait vraiment pendant la fenêtre d'attente, la cascade remontée, la photo de la ferme, le palier visé en gros, transformerait B en A ou en C. Autrement dit, B n'est pas une mise en page qui traverse la campagne, c'est une mise en page de régime établi, et elle demande d'assumer un premier écran différent pendant sa première semaine. Le vrai critère de décision n'est donc pas « le chiffre pèse-t-il assez », c'est « accepte-t-on de livrer deux héros ». Si la réponse est non, B se choisit contre elle-même.

## Verdict par axe, format m9

Exactitude du contenu : `corriger`. Tous les faits sont sourcés et conformes, un crédit d'image est posé sur la mauvaise photo (C1).
Design dans la charte : `corriger`. Anti-slop intégralement respecté, deux fonds de section hors liste et un dégradé sombre recomposé à valider ou à ramener (M7), composition à resserrer (M5, M6).
Accessibilité : `corriger`. Base très solide, deux échecs mesurés (M3, M4).
Technique : `corriger`. Console, réseau et débordements irréprochables, en-tête cassé à 768 px (M1).
SEO : `pass`. Title et description écrits, un seul H1, hiérarchie sans saut, `noindex, nofollow` conforme au statut de maquette, ancres du doc de copy toutes présentes (`#hero`, `#ou-on-en-est`, `#deja-fait`, `#la-part`, `#notre-choix`, `#le-lieu`, `#le-collectif`, `#et-vous`, `#pied`).

Verdict global : **corriger**, passe 1 sur 3. Un `Critical` et sept `Major` à traiter avant que la maquette soit montrée en plein écran. Aucun n'est structurel : C1, M1, M2, M3 et M4 sont des corrections de moins de dix lignes chacune.

## Verdict sur les segments signalés par copy-check

`copy-check` rend 72 segments sur 80 en état campagne et 73 sur 80 en état avant. Les huit manquants, vérifiés un par un dans le source :

Beat 1, « {{compteur}} coopératrices et coopérateurs. Premier palier : autant que de donatrices. » : **légitime**. Le doc de beats impose à B « un seul héros, un seul emplacement de compteur », le beat 6 absorbant le beat 1. Le rendu porte la formulation du beat 6, « 218 coopératrices et coopérateurs ont déjà pris leur part de la Maison Audacieuse. », suivie de la seconde phrase du beat 1 mot pour mot, « Premier palier : autant que de donatrices. ». Aucun mot changé, aucune information perdue.

Beat 2, « © Basa Architecture. » : **présent**, sans le point final. Le point appartient à la phrase d'instruction de la copy. Voir C1 pour le problème réel, qui est le placement et non le texte.

Beat 3, les quatre items de frise « 2025 : lauréat de l'appel à projets d'Annecy », « Mars 2026 : promesse de bail de 99 ans signée », « Avril 2026 : la campagne de dons se referme », « Juillet 2026 : la coopérative est immatriculée » : **légitimes**. Le deux-points est rendu par la mise en page, la date en graisse au-dessus, le fait en dessous, ce qui est la « frise de faits datés, 4 items » que la copy demande. Aucun mot changé.

Beat 6, « 666 : celles qui ont donné reprennent leur part du lieu. » et « 1 700 : celles qui ont signé en 2025 en deviennent copropriétaires. » : **légitimes**. Même mécanique, le deux-points est rendu par les deux colonnes de la cascade, nombre à gauche, lecture à droite. Aucun mot changé.

Aucun manquant réel. Zéro mot changé sur les 80 segments.

## Passe 2 (19/08/2026)

Passe 2 sur 3. Auditeur tiers, ni producteur ni correcteur de la maquette. Vérification une par une des corrections annoncées, recherche de régression, rescore.
Fichier audité : même chemin, 1219 lignes (1125 en passe 1).
États testés : campagne et `?etat=avant`. Largeurs testées : 375, 768, 820, 900, 1000, 1023, 1024, 1100, 1180, 1239, 1240, 1300, 1440. Modes testés : défaut, `prefers-reduced-motion: reduce`, et par lecture du source la branche `@supports not (animation-timeline: view())` ainsi que le cas d'un moteur qui connaît `view()` sans connaître `timeline-scope`.

Outils : `maquettes/verif.mjs` (deux états), `maquettes/copy-check.mjs` (deux états), cinq scripts Playwright écrits pour cette passe dans `maquettes/_verif/` (`audit2-b.mjs` mesures d'en-tête, de menu, de fondu, de vides et de hit-test, `audit2-b-pixels.mjs` contraste sur le fond rendu seul, `audit2-b-crops.mjs` crops du fondu et cible au quart de pixel, `audit2-b-ecrans.mjs` la page écran par écran, `audit2-b-final.mjs` contrôles de non régression), lecture intégrale du source, lecture à l'oeil de 20 captures produites pour cette passe dans `_verif/b-passe2/`. Contrastes recalculés à la main sur les couleurs réelles, aucun repris de `verif.mjs`. Aucun outil Playwright MCP employé. Aucune écriture dans la maquette.

## Score de la passe 2

**90 / 100** (passe 1 : 76). Score brut, aucun plafond appliqué, aucun veto armé.

| Axe (grille DESIGN) | Passe 1 | Passe 2 | Note |
|---|---|---|---|
| Respect de la charte, intrant fermé | 15 / 20 | 18 / 20 | Dégradé sombre remis aux trois bornes de la charte, `#766DA0` présent en `rgba(118, 109, 160, 0.22)` sur base `#383648` avec pointe kaki `#9D9669`. Les deux fonds de section sortent encore de la liste littérale du brief mais ne sont plus des nuances inventées : `color-mix` de deux couleurs autorisées, repli en aplat de charte sous `@supports`, et la famille obtenue est celle que la charte décrit. Manque l'acquiescement d'une ligne. |
| Hiérarchie et lisibilité | 14 / 20 | 17 / 20 | Les trois vides prescrits sont résorbés, le héros en état avant est refait. Reste le CTA principal dédoublé en mobile, deux fois dans la page, et l'ordre mobile du héros non tranché. |
| Cohérence des composants et des espacements | 9 / 10 | 9 / 10 | Les deux actions secondaires portent enfin le même contour. Reste un traitement inégal des liens sortants : nav et pied en nouvel onglet, CTA et liens de corps non. |
| Accessibilité mesurée | 11 / 15 | 15 / 15 | Les deux échecs de la passe 1 sont corrigés et vérifiés par mesure et par hit-test. Aucun échec mesuré, y compris au pire pixel de grain de l'aplat sombre. |
| Responsive réel, vérifié au navigateur | 6 / 10 | 10 / 10 | En-tête à 79 px de 768 à 1239 px, menu replié sous 1024 px, zéro débordement horizontal aux 13 largeurs testées, dans les deux états. |
| Âme, la page est reconnaissable comme celle de CETTE structure | 21 / 25 | 21 / 25 | Inchangé, seuil de 20 franchi, critère non compensable satisfait. Les gestes de la passe 1 sont tous intacts, le croisement des deux crédits en ajoute un. La page reste à trois images réelles et le beat 7 n'en porte aucune, cette fois par décision. |

### Vetos

**VETO SLOP : non armé.** Recherché de nouveau écran par écran sur les 8 vues de 1440 et les 12 de 375. Aucun interdit relevé : pas de rangée de trois cartes, aucun eyebrow, aucune numérotation, aucun dégradé décoratif ni halo ni bouton en dégradé, aucune ombre molle sur carte de contenu (les trois seules ombres portent le chrome flottant, rail, pilule et tiroir de menu), rayon mixte documenté, aucun séparateur en vague ni en biseau, rien de centré section après section, padding variable, alternance texte image limitée à deux, aucune cellule de grille vide, aucune carte dans une carte, zéro emoji, zéro icône cliché, aucun texte blanc sur photo, aucun faux tableau de bord, compteur typographique et non animé, aucun indicateur de défilement, aucun Title Case, 0 point d'exclamation.

**VETO FIABILITÉ : non armé, et consolidé.** Le seul défaut de cette famille en passe 1 était le placement du crédit Basa : il est levé, vérifié dans les trois modes de rendu. Aucun chiffre interdit ne paraît, contrôlé au grep sur le source : 0 occurrence de « sous bail », 88 900, 3,2, 54 000, « 5 ans », « 15 % », « 25 % », « 18 % », « 300 personnes », « 5 000 € ». Aucune exploitante n'est nommée, la liste reste un trou visible.

**VETO TIRET CADRATIN : non armé.** 0 occurrence dans le source, 0 dans le rendu aux deux largeurs et dans les deux états (`verif.mjs`, `cadratins: 0`).

## Reprise des constats de la passe 1

### C1, crédit Basa posé sur une photo du collectif : CORRIGÉ

Vérifié, pas cru sur parole. Le `figcaption` porte deux crédits nommés, `aujourd'hui, collectif La Maison Audacieuse` et `demain, © Basa Architecture`, empilés dans la même cellule de grille et croisés sur la même `view-timeline` que les images. Opacités relevées à sept positions de défilement (fractions 0 / 0,2 / 0,38 / 0,48 / 0,58 / 0,8 / 1) : image d'hier 1 / 1 / 1 / 0,4999 / 0 / 0 / 0 et crédit d'hier exactement les mêmes valeurs, crédit de demain 0 / 0 / 0 / 0,5001 / 1 / 1 / 1. Au repos, avant tout défilement, seul le crédit du collectif est peint. En `prefers-reduced-motion` les deux paraissent sur une ligne, séparés par un point médian, chacun nommant son image (`_verif/b-passe2/fondu-reduced-complet.png`). La branche `@supports not (animation-timeline: view())` donne le même rendu par construction, les deux règles d'animation des crédits vivant à l'intérieur du bloc `@supports (animation-timeline: view()) and (timeline-scope: --fondu)`. Le cas d'un moteur qui connaîtrait `view()` sans `timeline-scope` a été examiné : les images se fondent, les deux crédits restent affichés côte à côte, chacun avec le nom de son image, donc aucune attribution fausse dans ce cas non plus.

### M1, en-tête cassé à 768 px : CORRIGÉ

Hauteur d'en-tête mesurée à onze largeurs : 79 px à 768, 820, 900, 1000, 1023, 1024, 1100, 1180 et 1239 px, `position: sticky` sur toute cette plage, 119 px et `position: relative` à partir de 1240 px. Le menu se replie en bouton sous 1024 px, la pastille CTA de l'en-tête reste affichée dès 768 px, la barre fixe basse ne paraît que sous 768 px. De 1024 à 1300 px les cinq libellés tiennent chacun sur une seule ligne à 44 px de haut (`Le projet` 86, `La part sociale` 126, `L'équipe` 82, `Médias` 73, `Contact` 79), `white-space: nowrap` posé. Débordement horizontal nul aux treize largeurs, `.entete-rangee` sans dépassement de contenu. Menu ouvert vérifié à 768 et à 375 : `aria-expanded` passe de false à true, cinq entrées à 48 px, panneau opaque, Échap referme et rend le focus au bouton (`_verif/b-passe2/menu-768-ouvert.png`, `menu-375-ouvert.png`).

### M2, image du collectif absente : CLOS PAR DÉCISION, refus accepté et fondé

Le refus est le bon appel, et il vaut mieux que le constat de la passe 1. `SOURCES.md` qualifie `collectif-1.png` d'infographie des futures occupantes : l'insérer aurait publié la liste des exploitantes que la copy tient encore explicitement en trou, `[TROU: liste des exploitantes à figer au 24/08]`. Sur une page de levée, c'était armer le veto fiabilité pour combler un vide de mise en page. La passe 1 avait raison de voir le vide, tort de nommer ce fichier comme sa réponse.
Vide résiduel jugé résorbé : la bande passe de 277 à 71 px, le rectangle en pointillé vide a disparu au profit d'une bande de largeur de contenu portant son texte de trou, et le vide sous le dernier élément de la section tombe à 60 px, soit exactement le padding bas (`_verif/b-passe2/collectif-1440.png`, `m8.png`).

### M3, bordure du champ email : CORRIGÉ

Couleur calculée de la bordure : `rgb(95, 87, 136)`, soit `#5F5788`. Recalculé à la main : 6,55:1 sur le blanc du champ, 5,63:1 sur le `#EDEDF5` de la section. Le seuil de WCAG 1.4.11 est 3:1, il est franchi du double.

### M4, cibles tactiles des quatre liens texte : CORRIGÉ

Vérifié par hit-test au quart de pixel, `elementFromPoint` balayé sur toute la hauteur et toute la largeur de chaque lien, et non par lecture du rect. Cible réelle atteignable : 48,75 x 272,5 px à 1440 px sur les quatre liens (`hero-lien`, `part-lien`, `lieu-lien`, `collectif-lien`), 45,75 x 245,25 px à 375 px. Les 44 px du brief sont tenus dans les deux dimensions et aux deux largeurs. `verif.mjs` continue de lister ces quatre liens dans `ciblesPetites` : faux positif confirmé, il mesure le rect de l'élément et ignore le `::after`.

### M5, héros en état avant : CORRIGÉ

Grille du héros calculée `1180px` à 1440 et `335px` à 375, donc une seule colonne, filet masqué, compteur masqué, trou du palier visé en pleine largeur. Sous le bloc d'actions il reste 64 px à 1440 et 44 px à 375, soit exactement le padding bas de la section : plus aucun trou de composition. Les 171 px de crème vide au milieu du premier écran ont disparu (`_verif/b-passe2/avant-375-fold.png`, `b-compteur-avant/b-compteur-avant-1440-fold.png`).

### M6, vides de composition : CORRIGÉ sur les trois points prescrits

Vide à droite de la phrase du compteur : 314 px en passe 1, 69 px mesurés, la phrase atteint la colonne d'action. Colonnes de la zone d'appel : `align-items: stretch` et filet vertical sur `.porte-second`, les deux colonnes finissent sur la même ligne, vide résiduel 0 px sous chacune, la colonne courte est tenue par un trait exactement comme la passe 1 le demandait. Collectif : 321 px de vide sous le texte en passe 1, 60 px mesurés.
La gouttière de 208 px au-dessus de 1240 px n'est pas traitée. Elle n'est pas un vide accidentel mais le logement du rail latéral, documenté en tête de feuille de style et occupé pendant toute la fenêtre où le rail paraît. Parti pris accepté, aucune correction demandée.

### M7, deux fonds hors liste et dégradé sombre recomposé : PARTIELLEMENT CORRIGÉ, sévérité ramenée à un point de gate

Deuxième moitié du constat, corrigée : le dégradé sombre est `#383648` en base, `rgba(118, 109, 160, 0.22)` en linéaire et `rgba(157, 150, 105, 0.34)` en radial. Le violet principal `#766DA0` est de retour dans l'aplat, les trois bornes sont celles que la charte décrit.
Première moitié, non corrigée mais transformée : les deux fonds restent hors de la liste littérale du brief, mais ils ne sont plus des valeurs inventées. Ils sont dérivés par `color-mix(in srgb, #FFF3A8 35%, #F5F5F6)` et `color-mix(in srgb, #A3716A 12%, #F5F5F6)`, donc de deux couleurs autorisées chacun, avec repli en aplat de charte pur pour les moteurs sans `color-mix`. Valeurs rendues relevées : `color(srgb 0.97451 0.958039 0.857647)` soit `#F8F4DB`, et `color(srgb 0.922196 0.898667 0.898823)` soit `#EBE5E5`. C'est très exactement la famille que `docs/charte.md` nomme « clair pastel : dégradé bleu pâle / rose / crème, pour les fonds de page et les tuiles douces ».
Je tranche : le PLAFOND « écart à la charte non validé par Romain » ne se déclenche pas, parce qu'il n'y a pas d'écart à la charte, seulement au raccourci que le brief en avait fait. Il reste une formalité, une ligne d'acquiescement au gate, pas une correction.
Contrôle du repli : sans `color-mix`, le héros repasse en `#FFF3A8` plein et le beat 7 en `#F5F5F6`. Contraste du corps `#56546B` sur ces deux aplats, recalculé : 6,48:1 et 6,70:1. Le repli est sûr.

### Minor, liens vers les chemins de production : PARTIELLEMENT CORRIGÉ

`target="_blank" rel="noopener"` posé sur les cinq entrées de nav et les sept liens sortants du pied, douze occurrences. Vérifié qu'il n'a rien cassé : il n'est posé ni sur les flèches du sélecteur, ni sur le lien du hub, ni sur l'ancre `#et-vous` du pied. Clic réel sur « Newsletter » depuis `?etat=avant` : on reste sur `b-compteur.html?etat=avant#et-vous`, défilement à 6112 px, zéro réponse en échec. Le paramètre d'état est conservé sur les trois liens du sélecteur.
Reste ouvert : les cinq CTA `/prendre-part/`, les quatre liens texte du corps et le bouton HelloAsso n'ont pas reçu le même traitement. Voir N1.

### Minor, poids du bouton « Je m'inscris » : CORRIGÉ

`.bouton-second` et `.bouton-tiers` partagent le même contour, fond transparent, texte et bordure `#383648`. L'aplat plein reste au seul CTA principal. La hiérarchie des deux actions secondaires se lit à la place, comme la passe 1 le proposait en seconde option.

### Minor, doublon du CTA en barre mobile : NON CORRIGÉ, refus refusé

Le motif invoqué, « JS », ne tient pas : `majRail` et deux `IntersectionObserver` sont déjà écrits dans la page, la barre mobile demande six lignes de plus.
Le défaut est mesuré et il ne se produit pas une fois mais deux. Au premier écran de 375 px, deux pastilles violettes strictement identiques sont visibles ensemble, celle du héros à y=520 et celle de la barre fixe à y=749, 229 px d'écart (`_verif/b-passe2/mobile-375-fold.png`). Dans la zone d'appel, le même doublon revient, CTA de la porte principale à y=393 et barre fixe à y=774 (`m9.png`). Le rail desktop, lui, s'efface correctement sur `#et-vous`. Correction exigée, voir R1.

### Minor, ordre mobile du héros : NON CORRIGÉ, arbitrage porté au gate

Refus accepté comme arbitrage, pas comme correction. La passe 1 offrait un minimum qui ne touchait pas au parti pris de B, remonter la seule ligne de prix au-dessus du compteur. Il n'a pas été pris. En l'état, le premier écran mobile demande de cliquer « Je prends ma part » avant d'avoir dit « à partir de 100 € la part ». Point porté au gate, c'est à Romain de choisir entre la copy et l'effet.

### Nit, sélecteur qui mord sur le soulignement en mobile : NON APPLIQUÉ, refus confirmé par la mesure

Le correcteur écrit « mesuré contre-productif », et il a raison. La pilule est à `top: 676`, le lien à `top: 658`. La monter de 1,4 rem la porterait à 654, donc par dessus le texte du lien au lieu de son soulignement. Refus accepté.
Constat neuf que la correction M4 fait apparaître : la cible agrandie du lien du héros descend maintenant sous la pilule. Balayage au quart de pixel à 375 px sans défilement, la hauteur de cible atteignable tombe à 29 px sur la plus grande part de la largeur du lien et ne vaut 45,75 px que sur ses 16 derniers pixels. Cela reste au dessus des 24 px de WCAG 2.5.8 AA, cela ne concerne que la position initiale, et la cause est le sélecteur de maquette, qui n'existera pas en production. Aucune action, aucun point retiré, mais le chiffre est écrit ici, il nest pas tu.

### Nit, contraste des pointillés : CORRIGÉ au delà de la demande

`--pointille` passe à `var(--violet)`, soit `#766DA0`. Mesuré sur le fond rendu : 4,18:1 sur le héros et 3,74:1 sur le fond du beat 7, contre 2,91:1 et 2,96:1 en passe 1. La passe 1 proposait `#7C7694`, le correcteur a fait mieux.

### Nit, logo blanchi du pied et point final du crédit : non traités, conformes à la passe 1

La passe 1 écrivait « aucune action » et « si on passe par là ». Rien à ajouter.

## Contrastes, recalculés à la main

`verif.mjs` rend `contrastesInsuffisants: []` dans les deux états et aux deux largeurs, mais Chrome sérialise `color-mix()` en `color(srgb …)`, forme que l'outil ne parse pas : ses valeurs sur le héros et sur le beat 7 sont donc à écarter. Recalcul complet, sur le fond réellement peint, contenu masqué, grain compris, par échantillonnage pixel du rendu.

Héros, fond réel `#F8F4DB` : corps `#56546B` 6,49:1, titres et texte de définition `#383648` 10,43:1, liens `#5F5788` 5,82:1, pointillé `#766DA0` 4,18:1.
Beat 7, fond réel `#EBE5E5` : corps 5,81:1, titres 9,34:1, liens 5,22:1, pointillé 3,74:1.
Aplat sombre, cascade et pied, fond moyen relevé `rgb(68, 65, 81)` : `#E7E4F0` 7,90:1 et blanc 9,90:1. Au point le plus clair de la section, bloc de 8 x 8 px `rgb(97, 93, 91)` : 5,19:1 et 6,51:1. Au pixel de grain le plus clair, `rgb(103, 100, 98)` : 4,69:1 et 5,87:1.
Tout tient AA, y compris au pire point de l'aplat le plus clair et sur le grain isolé. Le correcteur annonçait 5,79:1 en pire cas ; je mesure 5,19:1 au pire bloc de fond, ce qui passe quand même. C'est sa mesure qui était optimiste, pas le rendu qui est faux.
Champ email : bordure `#5F5788`, 6,55:1 sur blanc et 5,63:1 sur `#EDEDF5`.

## Régressions

Cherchées, aucune trouvée.

Console : 0 message, 0 erreur de page, aux deux largeurs et dans les deux états. Réseau : 0 requête vers un hôte externe, 0 requête en échec, 0 réponse à 400 ou plus. Débordement horizontal : nul aux treize largeurs testées, `debordent: []` élément par élément à 375 et 1440 dans les deux états. Texte coupé : aucun, y compris les cinq libellés de nav de 1024 à 1300 px et les cinq entrées du menu replié.
Copy : 72 segments sur 80 en campagne et 73 sur 80 en avant, exactement les mêmes chiffres qu'en passe 1, et exactement les mêmes huit manquants, tous analysés et jugés légitimes en fin de rapport de passe 1. Aucun nouveau manquant, aucun mot altéré. Un seul H1, aucun saut de niveau de titre, `noindex, nofollow` et `<title>` inchangés, cinq images toutes avec alt et dimensions, `loading="lazy"` correctement réparti.
`target="_blank"` : ne casse ni le sélecteur, ni les touches flèches, ni l'ancre `#et-vous` du pied, vérifié par clic réel et par lecture des `href` reconstruits en `?etat=avant`.
Zone chaude : recomptée écran par écran sur les 8 vues de 1440 et les 12 vues de 375. Jamais deux accents chauds dans la même vue. Les deux fonds retouchés gardent leur teinte d'origine, ils n'ajoutent aucun accent.
Deux portes du beat 8 : le filet vertical ajouté n'introduit aucun chevauchement et bascule bien en filet horizontal sous 1080 px. Fondu du beat 2 : aucun saut, aucune image manquante, le repli empilé est intact.

## Constats de la passe 2

### Corrections requises

`R1` | `.barre-mobile`, script en pied de page | 375, campagne (`_verif/b-passe2/mobile-375-fold.png`, `m9.png`) | le CTA principal est dédoublé dans la même vue à deux endroits de la page, premier écran du héros et zone d'appel, deux pastilles violettes strictement identiques à 229 px puis à 381 px l'une de l'autre. Le rail desktop résout déjà ce cas, la barre mobile non. C'est le critère « une seule action principale » de l'axe hiérarchie | réutiliser la mécanique déjà écrite : ajouter `barre.classList.toggle('est-cachee', !herosSorti || appelVisible)` dans `majRail`, poser un troisième `IntersectionObserver` sur `.hero-actions` si l'on préfère un seuil plus précis que la sortie du héros, et déclarer `.barre-mobile.est-cachee { transform: translateY(100%); transition: transform 200ms ease }` pour que la barre glisse au lieu de disparaître sèchement.

`R2` | les cinq `a.cta[href="/prendre-part/"]`, les quatre `a.lien-texte` du corps, `.bloc-don .bouton-second` | toutes largeurs, deux états | la correction des liens de production s'est arrêtée à la nav et au pied. Les neuf liens du corps et le bouton HelloAsso sortent toujours de la maquette, dont les cinq exemplaires du bouton principal, qui est le lien que Romain cliquera le plus probablement pendant la séance de comparaison plein écran. Le motif de la passe 1, « Romain perd sa page de comparaison », vaut plus fort ici que sur la nav. S'y ajoute un écart au brief que la passe 1 n'avait pas relevé : le brief demande que le bouton d'en-tête pointe sur l'ancre du beat 8, pas sur le chemin du tunnel | poser `target="_blank" rel="noopener"` sur ces dix liens, ce qui donne une règle unique et lisible, tout lien qui quitte la maquette ouvre un onglet. Variante pour le seul bouton d'en-tête si l'on veut aussi rendre le brief : `href="#et-vous"` en gardant le `title` « Tunnel /prendre-part/ en construction ».

### Nit

`Nit` | `.hero-lien .lien-texte` sous `.selecteur` | 375, position initiale | la cible agrandie par le `::after` descend sous la pilule du sélecteur : 29 px atteignables sur la plus grande part de la largeur du lien, 45,75 px sur ses 16 derniers pixels. Au dessus des 24 px de WCAG 2.5.8, cause propre à la maquette, disparaît en production | aucune action. Ne pas remonter la pilule, la mesure montre que cela la poserait sur le texte du lien.

### FYI

`FYI` | intégration | les quatre points de la passe 1 sur ce qui ne survivra pas tel quel à Kadence restent valables et le croisement des crédits en ajoute un cinquième, léger : la légende du fondu demande maintenant `timeline-scope` en plus de `animation-timeline`, donc un bloc HTML personnalisé et du CSS additionnel, pas un bloc Kadence. Le repli est écrit et vérifié, le coût reste du CSS, pas du risque.

`FYI` | objection de fond de la passe 1 | elle n'est pas levée par les corrections et elle ne pouvait pas l'être. Le trou visuel de l'état avant est réparé, le fait que le premier écran de B n'a de raison d'être que quand le nombre monte ne l'est pas. La question du gate reste « accepte-t-on de livrer deux héros pendant la première semaine ».

## Verdict par axe, format m9

Exactitude du contenu : `pass`. Le seul défaut de la famille est levé et vérifié dans les trois modes de rendu, aucun chiffre interdit, aucune exploitante nommée, tous les crédits d'image à leur place.
Design dans la charte : `pass`. Anti-slop intégralement respecté, dégradé sombre remis aux bornes de la charte, fonds dérivés de couleurs autorisées, composition resserrée. Une ligne d'acquiescement à obtenir au gate, pas une correction.
Accessibilité : `pass`. Les deux échecs mesurés de la passe 1 sont corrigés et vérifiés par mesure et hit-test, tous les contrastes recalculés à la main tiennent AA.
Technique : `pass`. Console, réseau et débordements irréprochables aux treize largeurs, en-tête réparé, aucun effet de bord des liens en nouvel onglet.
SEO : `pass`. Inchangé et conforme.

Verdict global : **PUBLIABLE**, passe 2 sur 3. 90 / 100, aucun `Critical`, aucun `Major` bloquant, critère âme au dessus de son seuil, aucun veto armé. Les deux corrections requises R1 et R2 sont des corrections de moins de dix lignes chacune, à passer avant la séance plein écran mais qui n'empêchent ni la mise en ligne du fichier ni la comparaison.
Pour mémoire, la cible générique des grilles est 95 pour un livrable de production. La maquette est un objet de décision, pas la page ; le seuil retenu pour ce gate est 85.

## À trancher au gate 2

Deux points que l'audit ne peut pas trancher seul.

1. Les deux nuances de fond. Le héros en crème `#F8F4DB` et le beat 7 en rose grisé `#EBE5E5`, tous deux obtenus par mélange de deux couleurs autorisées et conformes à la famille « clair pastel » de la charte, mais absents de la liste littérale du brief. Une ligne suffit : soit Romain les acte, soit on revient à `#FFF3A8` et `#EDEDF5` purs, ce que le repli `@supports` produit déjà et dont le contraste est vérifié.
2. L'ordre du héros en mobile. En l'état, on demande de cliquer avant d'avoir dit le prix. Trois issues : laisser ainsi et assumer l'effet, remonter la seule ligne « à partir de 100 € la part » au dessus du compteur, ou repasser à l'ordre de la copy, définition puis compteur puis actions.
