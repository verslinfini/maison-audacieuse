# Audit du document de beats, home maison-audacieuse.fr

Cible auditée : `02 Projets/LMA - Maison Audacieuse/05 Site web/2026.08.18 - Beats et arborescence home - LMA.md` (290 lignes).
Grille : SPECS (`references/grilles.md`), module `m3-page-nouvelle.md`, `references/anti-slop.md`.
Cadre : plan de session approuvé, sections Cadrage, Direction stratégique, Ce que l'exploration a établi.
Auditeur tiers, non producteur du document. Passe **1/3**. Date : 18/08/2026.

Sources contrôlées au mot près : landing V1 du 05/06, spec architecture du 05/06, plan de campagne du 14/08, baselines, flyer V1 archivé, `contenu/pages/chiffres-autorises.md`, fiche de site, `voice-dna.md`, `never-say.md`, et le texte de vérité Weco de v1 (`03_Activités/WCO_weco-direction/site-weco-2/livrables/4-contenu/accueil.md`).

## Ce qui cloche, d'abord

### Critical: L137, la formulation de remboursement d'avant délibération n'existe dans aucune source

Le beat 5 pose deux états de la formule de remboursement. L'état « avant la délibération du 31/08 » est cité ainsi : « remboursables à leur valeur d'origine, selon les statuts » avec la source (Landing juin, bloc 3). Cette chaîne n'est pas dans la landing. Le bloc 3 dit : « Vous pouvez demander le remboursement de vos parts, à leur valeur d'origine, selon les statuts. » La forme adjectivale « remboursables » est une recomposition du rédacteur.

Aggravant : le document porte au L233 une seconde variante de la même formule, au singulier, « remboursable à sa valeur d'origine, selon les statuts », qui vient du plan de session et non d'une source validée. Deux chaînes différentes pour la même phrase juridique, aucune verbatim, et c'est exactement celle qui part en ligne le 30/08 si le Conseil Coopératif n'a pas délibéré.

Correctif : retenir une seule chaîne et la sourcer honnêtement. Soit la citation exacte de la landing bloc 3, soit une chaîne neuve assumée comme telle et validée par Romain à la gate 1, marquée « formulation à valider, non issue de la matière de juin ». Aligner L137 et L233 sur la même chaîne, au mot près.

### Critical: L137 et L233, « 5 000 € » et « 5 ans » partent sur la page sans entrée dans `chiffres-autorises.md`

La formulation post-délibération retenue par Romain le 14/08, reprise verbatim et correctement sourcée, contient deux chiffres destinés à l'affichage public : les demandes « de moins de 5 000 € » et le délai « pouvant aller jusqu'à 5 ans ». Ni l'un ni l'autre ne figure dans `contenu/pages/chiffres-autorises.md`, dont la règle d'entrée est sans échappatoire : « un chiffre absent de ce fichier ou marqué interdit est RETIRÉ de la page, jamais nuancé ». Le document programme donc l'affichage de deux chiffres que la règle armée oblige à retirer. Veto fiabilité armé, plafond 75.

Correctif : deux lignes à ajouter à `chiffres-autorises.md` avant la gate 1, source « statuts constitutifs signés, article 15 » et « délibération du Conseil Coopératif visée le 31/08 », statut « autorisé après délibération seulement ». À défaut, retirer la formulation post-délibération du beat 5 et n'y laisser que l'état d'avant.

## Axe 1, aucune phrase de copy neuve

Tenu. Passe en revue des lignes 71 à 195 : chaque énoncé destiné à la page est entre guillemets avec sa source, tout le reste est étiquette fonctionnelle (Fonction, Ce que le lecteur sait en sortant, Preuves autorisées, Action, Visuel, Longueur cible, Variantes, Trous nommés). Les libellés de beats reprennent mot pour mot le tableau de Direction stratégique du plan. Les libellés de nav reprennent la nav du plan. Aucune accroche, aucun titre, aucune phrase de page inventée.

Une seule réserve, et elle ne porte pas sur le fond.

### Nit: L122, une ligne de fonction écrite dans le registre de la page

« Ce que le lecteur comprend en sortant : la moitié qui manque n'est pas un trou, c'est une décision, et elle fait les loyers. » C'est un énoncé d'état de lecteur, pas de la copy, donc pas une infraction. Mais il est écrit à la voix de la page et il emploie le parallélisme négatif « ce n'est pas X, c'est Y » que le document lui même interdit en tic au L273, avec une seule dérogation nommée, au beat 5. Risque réel que la session copy le relève tel quel.

Correctif : reformuler en constat neutre, du type « le lecteur comprend que le niveau de fonds propres est un choix du collectif et qu'il détermine le niveau des loyers ».

## Axe 2, fidélité des citations

71 citations de matière de dix huit caractères ou plus extraites des beats et contrôlées une à une contre leur fichier source. **64 exactes, 7 écarts.** Les six citations Weco, contrôlées séparément contre le texte de vérité de v1, sont toutes exactes, sections comprises (hero, section 4, section 5, section 7).

| # | Ligne | Citation | Écart | Correctif |
|---|---|---|---|---|
| 1 | L137 | « remboursables à leur valeur d'origine, selon les statuts » | absente de la source citée | voir Critical ci dessus |
| 2 | L99 | les cinq briques du lieu (Landing juin, bloc 5) | liste de cinq items aplatie en phrase à virgules | citer la liste comme liste, ou noter « liste de 5, rendue à plat » |
| 3 | L75 | « Attention, ce bandeau n'est pas sur le violet... (fond, séparation). » | tronquée avant « pour qu'on ne confonde pas le header et le héros », point final ajouté | rétablir la fin de phrase ou marquer la troncature |
| 4 | L150 | « 666 (le chiffre exact des donateurs au jour du lancement) : "Déjà autant de..." » | deux cellules de tableau jointes par un deux points, présentées comme une chaîne unique | citer la cellule « Lecture publique » seule, le chiffre hors guillemets |
| 5 | L150 | « 1 700 : "Autant que les signataires de 2025..." » | même recomposition | idem |
| 6 | L150 | « 3 000 : le palier du poids, "un projet porté par..." (proposé, lecture à valider) » | trois colonnes jointes, « Proposition : » supprimé, le statut absorbé dans les guillemets | idem, statut hors guillemets |
| 7 | L150 | « 5 000 : l'objectif audacieux (proposé, lecture à valider) » | paraphrase de cellule, l'équivalence source est supprimée sans marque | citer « L'objectif audacieux. » et renvoyer au piège du L152 |

Sur l'écart 7, le choix éditorial est juste : sortir « une Annécienne sur dix » de la matière et la basculer au piège de reprise du L152 est exactement ce qu'il fallait faire. C'est la forme qui pèche, pas la décision.

Le reste tient. Les attributions fines sont bonnes, y compris les plus faciles à rater : bloc 2 contre bloc 3 de la landing, section 2 contre section 3 du plan, Pédago juin bloc 4 pour les trois limites, Flyer V1 pour la version courte des briques et pour « Récupérable sur demande. », Spec juin section 8 pour l'obsolescence du bandeau newsletter. Vérifié, exact.

### Nit: L237, le comptage de « copropriétaire » est faux

« la copy de juin l'emploie huit fois ». Comptage réel dans le fichier de juin : 9 occurrences de « copropriétaire » et « copropriétaires », dont 6 dans la landing et 3 dans la pédago, 11 si l'on compte la racine « copropri » avec « copropriété ». Chiffre interne, sans enjeu public, mais c'est un chiffre non sourcé et faux dans un document dont toute la discipline est le sourçage.

Correctif : écrire « neuf fois dans le doc de juin, dont six dans la landing », ou retirer le nombre.

## Axe 3, chiffres et interdits

Le tableau des chiffres autorisés du L206 est en correspondance exacte avec `chiffres-autorises.md` : mêmes onze entrées autorisées, mêmes sources, 666 correctement traité comme précision du 650+. La liste des interdits du L224 couvre les neuf familles interdites du fichier. Aucun chiffre interdit ne traîne dans la matière retenue sans marquage : les 15 % d'apport sont armés en piège au L125, les 54 000 Annéciennes au L152, les 300 personnes de la fête au L165. Bon travail, c'est la partie la plus solide du document.

Les dix interdits de formulation demandés sont tous présents au L226 : acheter et achetez, placement, rendement, épargne, promesse fiscale, « sans vous le projet ne verra pas le jour », multiple de levier chiffré, « récupérable à tout moment » et « récupérable sur demande » nu, statistiques de violences, institution locale en négatif, « référendum », tiret cadratin. Rien ne manque.

### Nit: L224, deux interdits de `chiffres-autorises.md` non repris

La liste omet « 3 701 184 € » (emplois déposés DDETS) et l'exemple « 1 € en débloque 5 ». Le second est couvert par l'interdit « multiple de levier chiffré » du L232, le premier n'est couvert nulle part.

Correctif : ajouter « 3 701 184 € » à la liste du L224.

### FYI: L236, « référendum » n'a pas de surface sur la home

L'interdit vient de la vigilance 2 du plan 14/08 et vise le niveau 2 de l'arbre de participation, absent de cette page. Le lister ne coûte rien et protège la session pédago. Aucune action.

## Axe 4, cohérence intention, preuve, action

Structure tenue beat par beat : les dix beats portent une fonction, une matière ou une preuve, une action ou la mention explicite « aucune ». L'action principale unique est tenue, « Je prends ma part », même libellé aux beats 0, 1, 6 et 8, avec la règle rappelée deux fois. Les beats 3 et 4 se ferment sans bouton, ce qui est la bonne décision et correspond au plan.

Quatre ruptures.

### L89 et L140, deux libellés différents vers `/part-sociale/`

Le beat 1 pose un lien texte « C'est quoi, une part sociale ? », le beat 5 un lien texte « Tout comprendre sur les parts sociales ». Même destination, même intention de lecture, deux libellés sur la même page. C'est l'interdit anti-slop « deux CTA de même intention avec deux libellés différents sur la même page ». Les deux libellés sont fidèlement cités, le document est irréprochable sur la source et muet sur la collision.

Correctif : nommer l'arbitrage en trou du beat 5, retenir un seul libellé pour les deux emplacements, ou faire disparaître le second lien puisque le beat 5 précède déjà la définition.

### L92, L156 et L201, la variante B se donne deux héros

La variante B ordonne les beats 0, 6, 1, 3, 4, 5, 2, 7, 8, 9. Au L156, le beat 6 « remonte en position 1 et devient le héros de la page ». Au L92, la variante B du beat 1 dit que « le compteur EST le héros, cascade et CTA visibles d'emblée ». Les deux beats revendiquent le même rôle et le même compteur, en positions 1 et 2, et la décision du L25 place déjà le compteur « dans le héros et au beat 6 ». En B, il apparaîtrait deux fois de suite.

Correctif : trancher, en B le beat 6 absorbe le beat 1 et le beat 1 disparaît de la liste, ou le beat 1 subsiste réduit à l'affirmation sans compteur. La sortie de cette contradiction conditionne le brief de la maquette B.

### L104 et L201, contradiction sur le moment de scroll en variante B

Le beat 2 dit pour B « pas de fondu, deux images posées côte à côte dans une section dense ». La fiche de variante B dit « Ce qui reste : la charte, la copy, le moment de scroll (déplacé plus bas) ». L'un supprime le fondu, l'autre le conserve. Le moment de scroll unique est une décision transposée de Weco au L24, elle mérite mieux qu'une contradiction interne.

Correctif : aligner les deux lignes, B sans fondu ou B avec fondu déplacé, une seule version.

### L113, action conditionnelle non décidable

« Lien texte en fin de bloc vers `/le-projet-architectural/` si le beat 2 n'a pas déjà consommé ce lien. » Or le beat 2 pose ce lien fermement au L101. La condition est donc déjà résolue et la formulation laisse croire à un arbitrage ouvert, sans dire qui tranche ni quand.

Correctif : écrire « aucun lien, le beat 2 porte déjà le lien vers le projet ».

### Nit: L178, la porte 2 du beat 8 n'a pas de libellé de soumission

Le plan prévoyait pour le beat 8 les actions « Je prends ma part · M'inscrire ». Le document garde la première et réduit la seconde à « champ email newsletter (Brevo) », sans libellé. La règle 2 des contraintes de voix du L246 impose pourtant un bouton à la première personne du lecteur.

Correctif : nommer le trou, ou reprendre « M'inscrire » du plan.

## Axe 5, arborescence, slugs, nav, parcours

Vérifié ligne à ligne contre la fiche de site et le plan. Les six identifiants WordPress sont exacts (1901, 1967, 1970, 1973, 1975, 1980), les slugs aussi, y compris `politique-de-confidentialite-mentions-legales`. `/prendre-part/` et `/part-sociale/` conformes, pages existantes marquées inchangées, slug `accueil` avec URL `/` par `page_on_front`, 301 posée avant bascule, 1901 en privé jamais supprimée, `/soutenir/` et sa 301 conservées. Nav à cinq entrées plus le bouton, identique à la nav du plan. Sorties du menu justifiées, entrée de « L'équipe » justifiée. La règle dure « jamais une home dont le CTA renvoie une 404 » avec deux moments de vérification est le meilleur critère testable du document.

### L48, le compte de clics ne correspond pas au chemin énuméré

« Puis trois clics de l'écran 1 au paiement : écran 1 → écran 2 (bulletin) → écran 3 (paiement) → écran 4 (confirmation) ». Le chemin énuméré compte trois transitions mais s'achève à la confirmation. Atteindre l'écran de paiement demande deux clics, le troisième est l'acte de paiement lui même. L'énoncé et l'énumération se contredisent, et le compte de clics est justement le critère que le plan met en avant.

Correctif : « deux clics de l'écran 1 à l'écran de paiement, trois jusqu'à la confirmation », l'énumération reste inchangée.

### FYI: L65, la justification de la sortie de « Newsletter » ne cite pas la source contraire

La justification s'appuie sur la spec de juin section 8, exacte, qui déclasse le bandeau newsletter en CTA principal. Mais la landing de juin section A pose explicitement « La newsletter reste dans le menu, simplement distinguée ». Le document ne mentionne pas cette décision contraire. Le raisonnement de concurrence avec le CTA unique reste le bon, et c'est de toute façon la question fermée 1b.

Correctif facultatif : une incise « la landing de juin la gardait au menu, la règle du CTA unique la déclasse ».

## Axe 6, complétude vis à vis du plan, et rien de plus

Les douze sections sont là et dans un ordre lisible : Intention, Décisions actées, Arborescence, Parcours, Nav et pied, Beats, Variantes, Chiffres autorisés, Interdits armés, Contraintes de voix, Ce qu'on ne fait pas, Questions fermées. Les trois variantes sont décrites structurellement, chacune avec parti pris, ordre complet des beats, ce qui change et ce qui reste, plus une liste de points d'attention pour la comparaison. Les contraintes de voix portent les listes de mots interdits en entier, et les points contrôlés contre `voice-dna.md` et `never-say.md` sont exacts (bloc de 13 à 17 mots, phrase de 12 à 15, zéro exclamation sur 416 mots, « Mais nous devons rester lucides : », flèche ASCII, « chouette », « point d'équilibre »). Les deux questions de gate sont fidèles au plan, mot pour mot.

### L67 et L194, le document renvoie deux fois à une objection qu'il ne contient pas

« Voir l'objection en fin de document » au L67, « Décision requise, voir l'objection » au L194. Aucune section d'objection n'existe dans le fichier, qui s'achève au L291 sur les questions fermées. Deux renvois morts, et l'objection est une pièce exigée par la gate 1 du plan (« synthèse 5 lignes, objection, DEUX questions fermées »).

C'est le manque le plus visible du document. Il ne s'agit pas d'un détail de forme : la gate 1 se joue sur une objection nommée, et le lecteur est envoyé deux fois vers du vide.

Correctif : ajouter une section « Objections » avant les questions fermées, portant au minimum l'objection du pied de page et celle du filet, ou retirer les deux renvois si l'objection est portée hors document par le principal. Dans ce second cas, l'écrire au L67 et au L194.

### FYI: L35 et L48, le détail d'écrans relève de la session tunnel

Le rôle de `/prendre-part/` détaille « parts + adhésion + consentement horodaté, bulletin, paiement, confirmation », et le parcours énumère les quatre écrans avec le kit de partage. C'est le chemin de clics demandé par le plan, donc dans le périmètre, mais les mentions de consentement horodaté et de kit de partage sont des éléments de spec de tunnel. Aucun risque tant qu'elles restent descriptives et non prescriptives. Aucune action.

Aucune copy de pédago ne s'est glissée dans le document. Vérifié.

## Axe 7, trous nommés plutôt que comblés

Tenu, et c'est le second point fort du document. Vingt trois trous nommés répartis sur les dix beats, dont les quatre attendus : photos (héros à départager, photo intérieure pour C, photo datable de la campagne de dons, aucun visuel pour les beats 4 et 5, droit à l'image), INSEE non sourcé avec conséquence explicite sur la lecture du palier 5 000, lieu et horaires de la Fête du 19/09 déclarés absents des docs lus, délibération du Conseil Coopératif du 31/08 posée comme ce qui décide la formulation en ligne. Aucun trou n'est comblé par une invention, aucun aplat proposé en remplacement d'image.

Deux trous ont une valeur particulière et méritent d'être signalés au producteur comme des trouvailles : l'arbitrage 650+ contre 666 au L117, et l'incompatibilité entre l'impératif au « nous » et la baseline « Prenez part » au « vous » dans le même bloc, au L93. Ni l'un ni l'autre n'était dans le plan.

## Axe 8, avis tranché sur l'arbitrage et les deux objections

Préalable de fait : ni l'arbitrage d'inversion des beats 4 et 5, ni les deux objections ne figurent dans le fichier audité. L'inversion existe seulement en creux, dans l'ordre de la variante C au L202 (0, 1, 2, 5, 4, 3, 6, 7, 8, 9), sans une ligne pour l'argumenter. Avis rendu sur le fond quand même.

**Inverser les beats 4 et 5, la part avant le choix : oui, mais en scindant.** La règle Weco 5 du document, « définition frontale dès qu'un mot est nouveau », impose que la part soit définie avant qu'on s'appuie dessus, donc les 4 faits passent avant le beat 4, tandis que les 3 limites restent après, sinon l'aveu arrive avant la raison et affaiblit la démonstration.

**Objection du pied de page périmé hors périmètre : elle est juste et sous évaluée.** Le pied porte « 100 000 € », chiffre marqué INTERDIT dans `chiffres-autorises.md`, donc basculer la home le 30/08 sans y toucher met un interdit armé en ligne sous la home de campagne : ce n'est pas un point de finition hors périmètre, c'est un bloquant de bascule, et une édition de texte global de cinq minutes à faire autoriser en une ligne à la gate 1.

**Objection du filet pré-engagement qui vide le héros : elle est juste et son correctif est plus lourd que ce que le document prévoit.** Masquer le compteur ne suffit pas, un héros qui affirme et qui compte perd la moitié de sa fonction et son CTA mène à une page qui ne prend pas d'argent, donc le beat 1 a besoin de sa propre variante filet, avec la ligne qui suit le bouton disant ce qui se passe après le clic, et non le seul masquage traité au beat 6.

## Axe 9, forme

Contrôles mécaniques passés sur le fichier.

- Tiret cadratin U+2014 : **0 occurrence**. Demi-cadratin U+2013 : 0 occurrence.
- Lignes commençant par un espace : **0**.
- Liens markdown : 8, **tous entre chevrons**, chemins relatifs à la racine du vault, tous vérifiés existants.
- Longueur : **290 lignes**, dans la fourchette 200 à 300.
- Flèche typographique : employée dans les tableaux et le parcours, alors que le L273 impose la flèche ASCII. La règle vise le corps du registre newsletter et non un tableau de spec, et la question de gate 1b écrit d'ailleurs « vers `/` » en toutes lettres. Pas de constat.

Rien à reprendre sur la forme.

## Verdict par axe

| Axe | Verdict |
|---|---|
| 1. Aucune copy neuve | pass, 1 Nit |
| 2. Fidélité des citations | corriger, 1 Critical et 6 écarts de forme |
| 3. Chiffres et interdits | corriger, 1 Critical de couverture et 1 Nit |
| 4. Intention, preuve, action | corriger, 4 ruptures dont 2 bloquantes pour la maquette B |
| 5. Arborescence, slugs, nav, parcours | pass, 1 correction de compte de clics |
| 6. Complétude vis à vis du plan | corriger, objection manquante et deux renvois morts |
| 7. Trous nommés | pass |
| 8. Arbitrage et objections | hors document, avis rendu ci dessus |
| 9. Forme | pass |

## Score SPECS

| Critère | Poids | Note | Motif |
|---|---:|---:|---|
| Complétude vis à vis de l'intention en 3 lignes, et rien de plus | 20 | 15 | douze sections présentes, gate fidèle, mais objection absente et deux renvois morts |
| Cohérence du parcours, intention, preuve, action | 20 | 13 | CTA unique tenu, mais deux libellés vers `/part-sociale/`, variante B à deux héros, contradiction sur le fondu, compte de clics |
| Logique métier côté serveur | 25 | 18 | aucune logique sensible mise en JS client, donc pas de plafond, mais l'origine de la valeur de production du compteur n'est pas posée et les seuils 5 000 € et 5 ans ne sont pas autorisés |
| Critères d'acceptation testables | 20 | 14 | longueurs cibles, contraste 4,5:1, règle des 404 avec deux moments de vérification, mais aucun bloc de critères consolidé et une action conditionnelle non décidable |
| Plan de retour écrit avant écriture en prod | 15 | 13 | posture correcte à l'étape 1, rien en prod, runbook exigé avant l'étape 3, et `docs/rollback.md` n'a effectivement pas encore sa section Bascule |
| **Total brut** | **100** | **73** | |

Veto fiabilité armé par le Critical des seuils 5 000 € et 5 ans, plafond 75. Le plafond n'est pas mordant, le score brut est déjà en dessous.
Veto slop non armé : le document est spécifique, ancré dans le projet, non interchangeable.
Veto tiret cadratin non armé.

**Score SPECS : 73/100.** Cible 95.

## Corrections requises, par ordre de priorité

1. Trancher la chaîne unique de la formulation de remboursement d'avant délibération, l'aligner entre L137 et L233, et la sourcer honnêtement ou l'assumer comme neuve à valider.
2. Ajouter « moins de 5 000 € » et « jusqu'à 5 ans » à `contenu/pages/chiffres-autorises.md` avec source article 15 et délibération, ou retirer la formulation post-délibération du beat 5.
3. Écrire la section Objections avant les questions fermées, ou retirer les deux renvois morts des L67 et L194.
4. Lever la contradiction de la variante B, un seul héros, un seul emplacement de compteur (L92, L156, L201).
5. Aligner L104 et L201 sur une seule version du moment de scroll en variante B.
6. Arbitrer les deux libellés vers `/part-sociale/` (L89 et L140), un seul libellé ou un seul lien.
7. Reciter les quatre paliers du L150 par cellule, chiffre et statut hors guillemets, et rétablir la liste de cinq briques du L99 comme liste.
8. Corriger le compte de clics du L48 et l'action conditionnelle du L113.

## Objection de l'auditeur

Le document traite le compteur masqué uniquement dans le scénario du filet, jusqu'au 08/09. Il ne dit rien de la fenêtre nominale. Si le tunnel est prêt, la home bascule le 30/08 avec un compteur public vivant, alors que le chiffre exact de départ n'est figé que le 07/09 (L93) et que le lancement n'est que le 07/09. Pendant huit jours, la jauge unique de toute la campagne s'affiche donc devant le public sur une valeur non figée et probablement basse, en contradiction directe avec la vigilance 4 du plan de campagne, « un compteur qui démarre petit décourage », et avec le warm up dont le calendrier court jusqu'au 06/09.

Le trou nommé du beat 6 pose la bonne question pour le filet et laisse le cas nominal entier. Il manque une décision : compteur masqué par défaut jusqu'au 07/09 dans les deux scénarios, ou bascule repoussée après le figeage. C'est une décision de gate 1, pas de gate 3, parce qu'elle change le contenu du héros.

Risque secondaire, à surveiller sans le traiter en passe 1 : le beat 3 affiche 88 900 € au titre de la campagne de dons close, pendant que la page HelloAsso mise à jour affichera environ 135 k€ cumulés selon la section 1 du plan de campagne. Deux montants de dons différents à un clic l'un de l'autre, même problème de lecture que celui que le rédacteur a lui même repéré entre 650+ et 666.

## Passe

Passe **1/3**. Prochaine passe après correction des huit points ci dessus, en priorité les deux Critical et l'objection manquante.

# Passe 2

Document relu en entier, 319 lignes. Sources recontrôlées : landing V1, spec architecture, plan de campagne 14/08, baselines, flyer V1, Weco v1, `voice-dna.md`, `never-say.md`, `contenu/pages/chiffres-autorises.md` au commit 368ceb7.

## Les onze points, un par un

| # | Point | Ligne | État |
|---|---|---|---|
| 1 | Chaîne unique de remboursement, deux états | L133, miroir au L252 | appliqué. L'état d'avant délibération est désormais la citation exacte de la landing bloc 3, « Vous pouvez demander le remboursement de vos parts, à leur valeur d'origine, selon les statuts. », vérifiée au mot près. La variante adjectivale a disparu des deux emplacements, et le L252 arme le veto sur toute autre reformulation |
| 2 | 5 000 € et 5 ans autorisés | L231, L232, L134, L140, L241 | appliqué des deux côtés. Le repo porte les deux lignes au commit 368ceb7, sourcées article 15 plus délibération, statut « autorisé APRÈS délibération, jamais avant », avec en prime la mise en garde sur la confusion avec le délai fiscal IR-PME |
| 3 | Section Objections | L306 à L314, renvois réparés au L67 et au L210 | appliqué. Trois entrées instruites, chacune avec son état. Plus aucun renvoi mort |
| 4 | Ordre tranché, 4 la part, 5 le choix | L127, L142 | appliqué, et propagé : chiffres autorisés (L229, L230, L236), exemption de parallélisme (L292), variantes (L217, L218) |
| 5 | Variante B à un seul héros | L217, cohérent avec L93 et L172 | appliqué. Le beat 1 est explicitement absent de la liste de B, avec la raison écrite |
| 6 | Beat 1, mode avant lancement et filet | L90, avec longueur cible aux deux états au L92 | appliqué |
| 7 | Un seul libellé vers `/part-sociale/` | L89 et L136 | appliqué, et le libellé écarté reste cité avec sa source et le motif |
| 8 | Beat 3 en personnes, 88 900 € sorti | L119, L120, L227 | appliqué |
| 9 | Citations recitées | briques L100 à L105, paliers L161 à L165, bandeau L75 | appliqué. Les paliers citent la colonne « Lecture publique » seule, chiffre et statut hors guillemets, exactement le correctif demandé |
| 10 | Compte de clics | L48 | appliqué au L48, **pas au L22** (voir ci dessous) |
| 11 | Reformulation de l'ancien L122 | L145 | appliqué. Le parallélisme négatif a disparu de la ligne de fonction |

Deux corrections de passe 1 hors liste ont aussi été passées : le comptage de « copropriétaire » est désormais juste au L256 (neuf fois, dont six dans la landing et trois dans la pédago), et « 3 701 184 € » entre dans les interdits au L243.

## Ce qui reste

### Critical: L139, la variante B importe un bloc qui porte deux interdits armés du document

« B tableau don / part compressé (repris de Pédago juin, bloc 2) », sans piège de reprise. Or ce tableau contient deux lignes que le document interdit ailleurs.

Ligne « Récupérable ? | Non | Oui, à sa valeur d'origine, selon les statuts ». C'est à la fois le mot « récupérable » nu, interdit au L252, et une **troisième chaîne de remboursement**, au singulier, distincte des deux seules autorisées. Le L133 dit « Aucune autre chaîne n'est autorisée, ni sur cette page ni en maquette » et le L252 « Toute autre reformulation, y compris adjectivale, est une chaîne neuve et tombe sous le veto ». Le document arme donc un veto puis désigne, quatre lignes plus haut, un bloc à importer qui le déclenche.

Ligne « Avantage fiscal | Oui, 66 % déductibles | Pas d'avantage fiscal au démarrage ». « Au démarrage » implique un avantage à venir, donc une promesse fiscale implicite sur les parts, interdite au L249 tant que l'ESUS n'est pas en main.

Le document est scrupuleux partout ailleurs sur ce mécanisme : il arme un piège pour les 15 % d'apport, pour « Récupérable sur demande. », pour « Soyons clairs, par honnêteté. », pour « une Annécienne sur dix », pour les 300 personnes. Ici il manque, et la conséquence est concrète : la maquette B partirait avec les deux lignes.

Correctif : ajouter au beat 4 un piège de reprise nommant les deux lignes, avec leur traitement. Ligne remboursement, la remplacer par la chaîne autorisée de l'état en vigueur. Ligne avantage fiscal, supprimer « au démarrage » ou retirer la ligne du tableau importé.

Précision de sévérité : ce n'est pas le veto fiabilité qui est armé, les chaînes en cause sont sourcées. C'est le veto que le document arme lui même au L252, retourné contre une de ses propres instructions. Le score n'est donc pas plafonné à 75, mais le point bloque la gate au titre de la vérification de l'étape 1, « le challenger n'a laissé aucun Critical: ».

### L138, la longueur cible du beat 4 est inatteignable dans l'un de ses deux états

« Longueur cible : 70 à 100 mots, les 4 faits compris. » Comptage : les quatre faits verbatim font 73 mots. Plus la chaîne d'avant délibération (15 mots), le beat fait 88 mots, dans la cible. Plus la chaîne d'après délibération (49 mots), il fait 122 mots, au dessus du plafond. Or la délibération du 31/08 est justement visée avant la bascule.

Le beat 1 a reçu le bon traitement au L92, « dans chacun des deux états ». Le beat 4 porte les mêmes deux états et une cible unique.

Correctif : « 85 à 95 mots dans l'état d'avant délibération, 120 à 135 après », ou retirer les quatre faits du décompte.

### L25, L90 et L314, la date d'allumage du compteur reste à 08/09 alors que l'arbitrage est 07/09

Le document porte 08/09 aux trois endroits et nomme lui même la contradiction au L94, « deux dates de lancement circulent, 07/09 au plan de campagne et 08/09 pour l'ouverture du compteur : à aligner avant l'étape copy ». L'arbitrage est rendu, le compteur s'allume le lundi 07/09, jour de lancement du plan et jour du figeage du 666.

Attention en l'appliquant : 07/09 vaut pour le cas nominal. En filet, `/prendre-part/` n'encaisse rien avant le 08/09, donc il n'y a rien à compter avant cette date. Un remplacement global de 08/09 par 07/09 casserait la logique du filet portée au L20, au L51 et au L312.

Correctif : au L25, au L90 et au L314, « allumé le 07/09 en scénario nominal, le 08/09 en filet, à l'ouverture du paiement ». Fermer le trou du L94 en y inscrivant l'arbitrage. Laisser le L20 et le L51 inchangés.

### L22, le compte de clics n'a été corrigé qu'au L48

Les décisions actées portent toujours « Un clic depuis n'importe où sur la home, trois de l'écran 1 au paiement », alors que le L48 dit maintenant, justement, trois écrans à valider dont le troisième est le paiement, donc deux clics de l'écran 1 à l'écran de paiement.

Correctif : aligner le L22 sur le L48.

### `contenu/pages/chiffres-autorises.md` ligne 7, la restriction de placement du 88 900 € n'est pas répercutée

Le document sort le montant de la home au L227, « hors home, FAQ et page financière (décision du 18/08) ». Le fichier du repo, que les auditeurs des étapes suivantes diffent, le laisse « autorisé » sans mention de placement. Un auditeur de copy qui ne lit que le fichier laisserait passer 88 900 € sur la home.

Correctif : porter la restriction dans la colonne statut du fichier du repo, comme cela a été fait pour les deux lignes du commit 368ceb7.

### Nit: L233, le bail de 99 ans est autorisé au beat 2, qui exclut tout chiffre

Le tableau des chiffres autorisés place le bail aux « beats 2, 3 », alors que le L107 dit « aucune donnée chiffrée ici, le beat est descriptif ». Écart présent depuis la passe 1, non relevé alors, ma faute.

Correctif : « beat 3 » seul.

### Nit: L100 à L106, cinq briques et quatre briques, sans arbitrage nommé, contre une règle de listes de trois

Le beat 2 porte la liste de cinq de la landing et la version courte en quatre du flyer, tandis que la règle de rythme 4 du L280 impose « Listes de trois ». Trois formats en présence, aucun arbitrage nommé.

Correctif : ajouter aux trous du beat 2 le choix entre la liste de cinq, la formule en quatre du flyer et une réduction à trois, en notant que la règle de trois cède ici devant la matière validée si Romain le décide.

### Nit: L292, l'exemption de parallélisme négatif couvre quatre occurrences

L'exemption vaut « aux beats 4 et 5 seulement ». En pratique elle couvre une occurrence au beat 4 (« ce n'est pas un don. C'est un apport ») et trois consécutives au beat 5 (les trois limites), soit quatre sur la page. C'est le seuil du tic que la règle vise.

Correctif : écrire le compte, « quatre occurrences au total, une au beat 4 et trois au beat 5, aucune ailleurs », pour que la session copy n'en ajoute pas une cinquième.

## Citations, contrôle complet

76 citations de matière contrôlées au mot près, **76 exactes, zéro écart**. Les huit écarts de la passe 1 sont tous corrigés et revérifiés individuellement : chaîne de remboursement (L133), cinq briques citées en liste (L100 à L105), bandeau complet (L75), quatre paliers cités par cellule (L162 à L165). Les six citations Weco et les deux citations à guillemets imbriqués ont été recontrôlées à la main contre leurs sources, toutes exactes. La citation de `voice-dna.md` ajoutée au L148, trait n° 4 de « Ce qui ne change pas », est exacte.

## Copy neuve

Aucune. Les corrections n'ont introduit aucune phrase de page. Le beat 1, qui aurait pu appeler de la copy pour son nouvel état d'avant lancement, marque explicitement le manque au L90 par « [copy à écrire à l'étape 2 : fonction, deux états du héros, avant lancement et après.] ». C'est le bon réflexe et il mérite d'être signalé.

## Forme

319 lignes, hors de la fourchette 200 à 300 fixée à la passe 1, sans conséquence : la fourchette visait un document qui ne se disperse pas, et les 29 lignes ajoutées sont la section Objections et les citations recitées en liste. Zéro tiret cadratin, zéro demi-cadratin, zéro ligne commençant par un espace, 8 liens tous entre chevrons. Treize sections de premier niveau.

## Verdict par axe, passe 2

| Axe | Passe 1 | Passe 2 |
|---|---|---|
| Aucune copy neuve | pass | pass |
| Fidélité des citations | corriger | pass, 76 sur 76 |
| Chiffres et interdits | corriger | corriger, 1 Critical sur le tableau importé |
| Intention, preuve, action | corriger | corriger, longueur du beat 4 |
| Arborescence, slugs, nav, parcours | pass | pass, reste le L22 |
| Complétude vis à vis du plan | corriger | pass |
| Trous nommés | pass | pass |
| Objections | absentes | pass, trois entrées instruites |
| Forme | pass | pass |

## Score SPECS, passe 2

| Critère | Poids | Passe 1 | Passe 2 | Motif du delta |
|---|---:|---:|---:|---|
| Complétude vis à vis de l'intention | 20 | 15 | 18 | Objections écrites, renvois réparés, arbitrages propagés partout |
| Cohérence du parcours | 20 | 13 | 16 | héros unique en B, fondu tranché, libellé unique, ordre cohérent entre beats et variantes ; restent la longueur du beat 4 et le L22 |
| Logique métier côté serveur | 25 | 18 | 21 | le compteur a désormais une machine à états écrite et la chaîne de remboursement est unique ; l'origine de la valeur de production du compteur reste non posée |
| Critères d'acceptation testables | 20 | 14 | 16 | deux états chiffrés au beat 1 ; une cible reste arithmétiquement fausse au beat 4 |
| Plan de retour avant écriture en prod | 15 | 13 | 13 | inchangé, posture correcte à l'étape 1 |
| **Total** | **100** | **73** | **84** | |

Veto slop non armé. Veto fiabilité non armé, le point du L139 relève du veto propre au document, pas du non sourcé. Veto tiret cadratin non armé.

**Score SPECS : 84/100.** Cible 95.

## Corrections requises, passe 3

1. Piège de reprise au beat 4 sur le tableau don / part de Pédago juin bloc 2, deux lignes à neutraliser (L139).
2. Longueur cible du beat 4 à deux états (L138).
3. Dates du compteur, 07/09 en nominal et 08/09 en filet, trou du L94 fermé (L25, L90, L94, L314).
4. Compte de clics du L22 aligné sur le L48.
5. Restriction de placement du 88 900 € répercutée dans `contenu/pages/chiffres-autorises.md`.
6. Trois Nit : bail au beat 3 seul (L233), arbitrage des briques (L100 à L106), compte des parallélismes négatifs (L292).

## Objection de l'auditeur, passe 2

L'objection de la passe 1 est traitée, et son traitement en produit une plus fine, qui appartient à la gate 2 plutôt qu'à la gate 1.

Le compteur est masqué du 30/08 au lancement pendant que le warm up le remplit, ce qui est la bonne décision. Mais le premier palier de la cascade est 666, et le plan de campagne vise 150 à 250 conversions de warm up d'ici le 06/09. Le jour de l'allumage, la jauge unique de toute la campagne s'affichera donc autour du tiers de son premier cran, avec une règle de relèvement qui ne se déclenche qu'à 90 %. Le compteur ne démarre plus petit en valeur absolue, mais il démarre visiblement loin de sa première marche, et c'est la même vigilance 4 du plan de campagne qui parle, une marche plus haut.

Le document ne dit rien de ce que le lecteur voit le jour du lancement, ni sous quelle forme, barre de progression, fraction affichée, ou nombre nu sans dénominateur. Or c'est exactement là que se joue l'effet, et c'est un choix de copy et de maquette, pas de structure.

Recommandation : inscrire au beat 6 un trou nommé sur la représentation du compteur au jour de l'allumage, avec l'option du nombre nu sans dénominateur tant que le premier palier n'est pas approché. À trancher à la gate 2, pas maintenant.

## Passe

Passe **2/3**. Un Critical subsiste, la gate 1 n'est pas franchie en l'état. Les six corrections ci dessus sont toutes courtes, aucune ne rouvre la structure.

# Passe 3

Document relu en entier, 320 lignes. Dix lignes ont bougé depuis la passe 2 : L22, L25, L90, L94, L138, L139, L173, L227, L257, L315. Chacune vérifiée, plus le repo au commit 4de192a.

## Les six points

| # | Point | Ligne | État |
|---|---|---|---|
| 1 | Compte de clics aligné | L22 | appliqué. « Un clic depuis n'importe où sur la home vers `/prendre-part/`, puis trois écrans à valider, la confirmation venant après le paiement. » Identique en substance au L48, plus aucune contradiction entre les deux |
| 2 | Allumage du compteur par scénario | L25, L90, L315, trou fermé au L94 | appliqué. Nominal 07/09 avec le motif écrit (jour de lancement et jour du figeage du 666), filet 08/09 avec le motif écrit (rien n'est encaissable avant l'ouverture du paiement). Le L20 et le L51, qui décrivent le filet, sont restés inchangés comme demandé. L'item « deux dates circulent » a bien disparu des trous du beat 1 |
| 3 | Longueur cible du beat 4 | L138 | appliqué, et mieux que demandé : la ligne donne la décomposition (73 mots de faits, plus 15 avant délibération ou 49 après). Contrôle arithmétique refait, 88 et 122, les deux tombent dans 85 à 125 |
| 4 | Tableau don / part retiré de la variante B | L139, piège au L257 | appliqué. Le L139 renvoie au piège, le L257 nomme les deux motifs ligne par ligne et fixe le traitement pour la session pédago. Les deux libellés cités, « Récupérable ? » et « Avantage fiscal », sont les libellés exacts du tableau source |
| 5 | Trou sur la représentation du compteur | L173 | appliqué, avec l'arithmétique et une recommandation. Une réserve de forme ci dessous |
| 6 | 88 900 € hors home | L227, et repo au commit 4de192a | appliqué des deux côtés. Le fichier du repo porte désormais « autorisé HORS home (FAQ, page financière) » avec le motif HelloAsso, donc un auditeur qui ne lit que le fichier ne laissera plus passer le montant sur la home |

## Critical

**Aucun.** Le Critical de la passe 2 est levé et bien levé : la variante B ne compresse plus qu'à partir des quatre faits, et le L257 arme le tableau don / part en interdit nommé, avec ses deux motifs distincts, la troisième chaîne de remboursement et la mention fiscale implicite. Le traitement prescrit pour la session pédago est le bon : ligne « Récupérable ? » alignée sur la chaîne unique du beat 4, ligne « Avantage fiscal » supprimée.

## Copy neuve

Une occurrence, la seule du document, introduite par la correction 5.

### Nit: L173, une chaîne d'affichage inventée est écrite entre guillemets sans source

« Recommandation : nombre nu et palier en texte (« prochain palier : 666, autant que les donatrices »), jamais une barre presque vide. »

La chaîne « prochain palier : 666, autant que les donatrices » n'existe dans aucune source. C'est une compression de la cellule du plan, « Déjà autant de coopératrices que de donatrices : celles qui ont donné reprennent leur part du lieu. » Dans ce document, les guillemets signifient matière validée : une session copy qui balaie les guillemets prendra cette chaîne pour de la matière sanctionnée. La règle du L3, « Aucune phrase de copy neuve ici », est absolue et c'est son unique entorse.

Correctif, une main : retirer les guillemets et décrire le format plutôt que le texte, « nombre nu, palier nommé à côté en toutes lettres, jamais une barre presque vide ».

Ne bloque pas la gate. Le reste des lignes modifiées est propre : les 76 citations de la passe 2 sont intactes, « un compteur qui démarre petit décourage » au L315 est exact (minuscule d'insertion en cours de phrase), et les deux libellés du L257 sont exacts.

### Nit: L173, « le jour J » là où le plan écrit « dans les 48 premières heures »

Le plan de campagne, section 3, dit « 150 à 250 pré-engagées converties dans les 48 premières heures ». Le L173 écrit « le warm-up vise 150 à 250 conversions le jour J ». L'écart joue contre le document : au jour J proprement dit, le compteur affichera moins que la fourchette citée, donc une fraction encore plus basse que celle décrite.

Correctif : « dans les 48 premières heures », et la démonstration du trou en sort renforcée.

## Les trois Nit de la passe 2, non repris

Hors des six points demandés, donc non traités. Aucun ne bloque, tous se corrigent en une ligne.

- **L233**, le bail de 99 ans reste autorisé aux « beats 2, 3 » alors que le L107 interdit toute donnée chiffrée au beat 2. Correctif : « beat 3 ».
- **L112**, les trous du beat 2 ne nomment toujours pas l'arbitrage entre la liste de cinq briques de la landing, la version en quatre du flyer et la règle de rythme 4 du L281 qui impose des listes de trois. Trois formats en présence, aucun choix nommé.
- **L293**, l'exemption de parallélisme négatif ne dit toujours pas son compte : une occurrence au beat 4, trois consécutives au beat 5, quatre sur la page. Correctif : écrire le compte pour qu'aucune cinquième ne s'ajoute à l'étape copy.

## Forme

320 lignes. Zéro tiret cadratin, zéro demi-cadratin, zéro ligne commençant par un espace, 8 liens tous entre chevrons, treize sections de premier niveau. Rien à reprendre.

## Score SPECS, passe 3

| Critère | Poids | P1 | P2 | P3 | Motif du delta |
|---|---:|---:|---:|---:|---|
| Complétude vis à vis de l'intention | 20 | 15 | 18 | 19 | tout est en place ; une chaîne d'affichage inventée au L173 est le seul dépassement |
| Cohérence du parcours | 20 | 13 | 16 | 19 | L22 et L48 alignés, héros unique, libellé unique, ordres cohérents, longueur du beat 4 réparée |
| Logique métier côté serveur | 25 | 18 | 21 | 22 | machine à états du compteur complète, deux dates par scénario avec leur motif ; l'origine de la valeur de production du compteur n'est toujours pas posée |
| Critères d'acceptation testables | 20 | 14 | 16 | 18 | la cible du beat 4 est désormais décomposée et vérifiable ; restent les trois Nit |
| Plan de retour avant écriture en prod | 15 | 13 | 13 | 13 | inchangé, correct à l'étape 1 |
| **Total** | **100** | **73** | **84** | **91** | |

Veto slop non armé. Veto fiabilité non armé. Veto tiret cadratin non armé. Aucun plafond déclenché.

**Score SPECS : 91/100.**

Lecture honnête du chiffre, et je ne le gonfle pas pour franchir un gate. La cible de la grille est 95, le document est à 91. Mais le critère de gate de l'étape 1 posé par le plan de session est différent et il est atteint : « le challenger n'a laissé aucun `Critical:` ». Nous sommes à la troisième et dernière passe, la règle est donc l'escalade à Romain avec le blocage précis, pas une quatrième boucle. Les neuf points manquants sont répartis sur cinq retouches d'une ligne chacune, dont aucune ne touche à la structure ni ne conditionne l'écriture de la copy.

## Verdict

**Pass**, avec cinq retouches à passer dans la foulée, à décider par Romain.

1. L173, retirer les guillemets autour de la chaîne d'affichage inventée, décrire le format et non le texte.
2. L173, « dans les 48 premières heures » au lieu de « le jour J », conforme au plan section 3.
3. L233, bail de 99 ans au beat 3 seulement.
4. L112, nommer l'arbitrage des briques, cinq, quatre ou trois.
5. L293, écrire le compte des parallélismes négatifs admis, une au beat 4 et trois au beat 5.

Aucune ne rouvre la structure. La copy peut s'écrire sur ce document.

## Objection de l'auditeur, passe 3

Une seule, et elle naît du correctif lui même. Elle vise l'étape copy, pas la structure.

En scénario nominal, la home bascule le 30/08 avec un `/prendre-part/` v1 qui encaisse, audité le 28/08. Le compteur, lui, ne s'allume que le 07/09. Le beat 1 prescrit donc au héros de porter, entre le 30/08 et le 07/09, « le palier visé et la date d'ouverture des souscriptions » (L25, L90). Or les souscriptions sont déjà ouvertes pendant cette fenêtre, puisque le tunnel encaisse depuis le 30/08 et que le warm-up est précisément censé convertir dans cette période. Le héros annoncerait une ouverture future d'une chose déjà ouverte, avec un bouton qui, juste à côté, prend l'argent tout de suite.

Les deux sorties sont propres et le choix n'appartient pas à l'auditeur.

Soit le héros parle du compteur et non des souscriptions, « le compteur s'allume le 07/09 », et tout se tient : les souscriptions sont ouvertes, seul l'affichage attend le figeage du 666.

Soit le tunnel reste fermé au public jusqu'au 07/09 et sert le seul warm-up par lien direct, ce qui protège le récit du lancement mais retire au filet une partie de sa raison d'être.

Recommandation : la première, et une ligne au beat 1 pour l'inscrire avant que la copy ne s'écrive. C'est un mot dans le héros, mais c'est un mot que la structure doit trancher, pas la rédaction.

## Passe

Passe **3/3**, fin du cycle d'audit. Zéro Critical, score 91, cinq retouches d'une ligne et une objection de formulation à trancher au moment de la copy. Escalade à Romain pour décision de gate 1.
