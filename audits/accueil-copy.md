# Audit COPY, home maison-audacieuse.fr

Fichier audité : `contenu/pages/accueil.md` (proposition v1 du 18/08/2026).
Référentiels : grille COPY de `site-web/references/grilles.md` · doc de beats du 18/08 (gate 1) · `contenu/pages/chiffres-autorises.md` · `voice-dna.md` et `never-say.md` · `m3-page-nouvelle.md` et `anti-slop.md`.
Auditeur distinct du rédacteur. Passe 1/3. Aucune modification apportée à `accueil.md`.

## Verdict d'entrée

Trois faits faux ou périmés survivent dans la copy, au beat 7 et au beat 3, tous vérifiables dans les CR du projet. Le plafond fiabilité est armé : score capé à 75. Le reste de la page est propre mécaniquement, ce qui rend ces lignes d'autant plus visibles : c'est la seule zone où le rédacteur a produit de la matière neuve hors du doc de beats, et c'est exactement là que ça casse.

## Score COPY

| Critère | Points | Note |
|---|---|---|
| Justesse de voix | 20 / 25 | mécanique irréprochable, dérive sur la phrase-choc et la longueur de bloc |
| Clarté | 15 / 20 | jargon non glosé au beat 5, deux ouvertures jumelles, remboursement dit deux fois |
| Structure intention, preuve, action | 12 / 15 | ordre respecté, mais l'état avant lancement est dupliqué et le CTA ne dit pas la suite |
| **Mémorable et incarné (non compensable, seuil 20)** | **20 / 25** | **au seuil exact, zéro marge** |
| Microcopy et états | 10 / 15 | champ newsletter sans microcopy, libellé d'inscription ambigu, alt dédoublé |
| Brut | 77 / 100 | |
| **Après plafond fiabilité** | **75 / 100** | |

Mémorable et incarné : 20/25, seuil franchi de justesse. Le critère tient parce que le beat 2 et le beat 3 sont irréductiblement ce projet là. Il ne tient pas mieux parce que le beat dont la fonction déclarée est d'incarner ne contient aucun visage, aucun prénom, et trois noms d'organisation faux.

## Vetos et plafonds

- **Tiret cadratin : 0 occurrence.** Veto non déclenché. Demi-cadratin : 0 également. Le livrable passe l'examen d'entrée.
- **Slop : pass.** La page n'est pas interchangeable. Cinq lignes le sont (listées plus bas), pas la page. Plafond 70 non appliqué.
- **Fiabilité : FAIL. Plafond 75 appliqué.** Faits en cause : Banjo nommé comme exploitant alors que la structure s'est retirée le 22/06/2026 · « la Maison En-Santé » nommée alors que la formulation « en santé » a été écartée le 20/07/2026 · « la ferme est sous bail pour 99 ans » alors que seule une promesse de bail est signée (06/03/2026), le bail n'intervenant qu'après le permis de construire.

## Mécanique, comptes exacts

Contrôles passés, zéro occurrence : tiret cadratin · demi-cadratin · point d'exclamation dans la copy (les 9 lignes remontées par le grep brut sont des ouvertures de commentaire HTML) · virgule avant « et » · emoji · point-virgule · espace en début de ligne · Title Case · paragraphe de copy collé sans ligne blanche.

Never-say : zéro occurrence sur les 25 termes de la liste et sur les compléments (« mindset », « storytelling », « la vérité c'est que », « gagnant-gagnant », « mise en œuvre », « deadline », « feedback », verbes creux). Aucun terme de dissertation, aucun marqueur de génération.

Interdits armés de la campagne : « acheter », « achetez », « achat » 0 · « rendement » 0 · « épargne » 0 · « investir », « investissement » 0 · « référendum » 0 · « à tout moment » 0 · « sur demande » nu 0 (seul « sur simple demande » figure, dans la chaîne d'après délibération citée en commentaire, qui l'autorise) · « réduction d'impôt » 0 · « 15 % d'apport » 0 · aucun multiple de levier chiffré · aucun tableau don contre part.

Comptes non nuls :

- « placement » : 2, dont 1 en copy (beat 5) et 1 en note d'arbitrage. **Bien employé.** La dénégation « Ce n'est pas un placement. » est la matière de juin confirmée par le plan du 14/08, elle ouvre la liste des limites, elle n'est pas suivie d'une promesse et elle porte sa propre justification dans la même ligne. La garder. La note d'arbitrage du rédacteur en fin de fichier est juste et sa recommandation est la bonne.
- « défiscalisé » : 1 (beat 5), dans la dénégation « Ce n'est pas un don défiscalisé ». Aucune promesse fiscale sur les parts sur toute la page. Le 66 % est correctement rattaché au don seul, au beat 8, avec son commentaire de source. **Conforme.**
- « copropriétaire » : 2 en copy (beat 4, palier 1 700 du beat 6). Limite de 3 respectée. Le décompte que le rédacteur donne en fin de fichier est exact.
- « je » : 8 occurrences, toutes en libellé de bouton à la première personne du lecteur. **Conforme.**
- « tu », « toi », « ton », « ta », « tes » : 0 en copy. Les 2 remontées sont « Arbitrages de ton », intertitre de la note de rédaction.
- Flèche typographique U+2192 : 6, toutes dans les lignes `Action :` de spécification. Voir FYI plus bas.

## Fiabilité

### Critical: beat 3, ligne 103. « la ferme est sous bail pour 99 ans » affirme un bail signé qui n'existe pas.

Ce qui est signé au 18/08/2026, c'est la promesse de bail emphytéotique, conclue avec la Ville le 06/03/2026 (CR Cadrage Ville Annecy du 28/05). Le bail lui même n'intervient qu'après validation du permis de construire (CR Finavocat du 15/01), et il figure toujours en pièce à recompresser dans les prochaines étapes du CLAUDE.md projet. `chiffres-autorises.md` autorise « 99 ans » avec la source « conseil municipal du 02/02/2026, promesse signée en mars 2026 » : la source dit promesse, la copy dit bail. Sur une page qui demande de l'argent, c'est le degré de sécurisation du foncier qui est surévalué.

Correctif : « Grâce à elles, l'architecte travaille et la Ville d'Annecy a signé la promesse de bail de 99 ans. »
Le commentaire de source de la ligne 104 doit suivre : « promesse de bail emphytéotique de 99 ans signée le 06/03/2026, conseil municipal du 02/02/2026 ». Cela clôt au passage le trou « date à afficher pour le bail » laissé ouvert par le doc de beats, et il faudra aligner la frise sur la même décision.

### Critical: beat 7, ligne 210. Banjo n'est plus exploitant depuis le 22/06/2026.

« Ostara, Banjo, le Café des Audacieuses, la Maison En-Santé : ce sont elles qui feront vivre les espaces. » Le CR du 22/06 porte « l'espace exploitant laissé vacant par le retrait de Banjo » et le CLAUDE.md projet précise, au 17/08, « aucune des deux exploitantes pressenties n'est sécurisée » pour cet espace. La home annoncerait donc publiquement, pendant toute la campagne, un exploitant parti deux mois plus tôt.

### Critical: beat 7, ligne 210. « la Maison En-Santé » est un nom écarté le 20/07/2026.

CR Valider programmation du 20/07 : « Nom administratif Bulle de soin, plusieurs médecins ayant rejeté la formulation en santé jugée injonctive ; le nom d'usage reste la maison de santé de La Maison Audacieuse. » Nommer sur la home une formulation que les praticien·nes ont refusée est un risque relationnel autant que factuel.

### Critical: beat 7. Les quatre noms d'organisation sortent du périmètre autorisé par le doc de beats.

Le beat 7 du doc de beats liste exactement une preuve autorisée : « Fête de l'Audace, samedi 19/09/2026 ». Aucun nom d'exploitant n'y figure, et aucun n'est dans `chiffres-autorises.md`. Quatre noms d'organisation ont donc été produits en neuf, hors référentiel, à l'endroit précis où le doc de beats n'ouvrait rien. Deux sont justes (Ostara, Café des Audacieuses), deux sont faux.

Correctif, le plus sûr pour la passe 2 : « Ce lieu est porté par des associations annéciennes déjà à l'œuvre. » puis `[TROU: liste des exploitantes à figer au 24/08, Banjo s'est retiré le 22/06 et la formulation « en santé » a été écartée le 20/07]`.
Correctif si Romain veut garder de l'incarnation dès la v1 : ne nommer que les deux structures sûres et dire ce qu'elles font, « Ostara accueille les femmes victimes de violences. Le Café des Audacieuses fera vivre le café. »

### beat 7, ligne 212. « d'économistes » n'est pas soutenu par les sources.

CR du 08/06 : « L'économiste pressenti sur le projet ne sera finalement pas retenu : le chiffrage économique sera réalisé gratuitement en mécénat de compétence. » Et « spécialistes » appliqué à sa propre équipe est une auto-qualification, interdite de registre (never-say §1, R3).

Correctif : « Autour d'elles, des architectes et une équipe de maîtrise d'ouvrage. »

### beat 3, ligne 100. « 650 personnes » durcit une formulation autorisée en « 650+ ».

`chiffres-autorises.md` porte « 650+ | donateurs et donatrices de la campagne de dons » et note que le chiffre exact est 666, à figer au 07/09. Écrire « 650 » sec est à la fois plus affirmatif que la source et inexact par défaut.

Correctif : « Plus de 650 personnes ont déjà donné pour ce lieu. »

### beat 7, ligne 214. La date du 19 septembre n'existe pas dans `chiffres-autorises.md`.

La date est sourcée (plan de campagne du 14/08, sections 5 et 7) et autorisée par le doc de beats, mais la règle armée du fichier référentiel est littérale : ce qui n'y est pas est retiré. Le doc de beats avait anticipé ce cas pour les lignes 5 000 € et 5 ans, pas pour celle ci.

Correctif : ajouter la ligne à `chiffres-autorises.md`, « samedi 19/09/2026 | Fête de l'Audace 2, journées du patrimoine | plan de campagne 14/08 sections 5 et 7 | autorisé ». Sans cet ajout, la date tombe.

### beat 4. Les trois chiffres du beat ne portent aucun commentaire de source.

100 €, « une personne, une voix » et le renvoi aux statuts sont tous autorisés, mais le beat 4 est le seul beat chiffré de la page sans une seule ligne `<!-- source : -->`. La convention tenue partout ailleurs se rompt ici.

Correctif : `<!-- source : 100 € = valeur d'une part et une personne = une voix, statuts constitutifs signés de La Coop Audacieuse, article 15 pour le remboursement -->`.

### Conforme, vérifié ligne à ligne

- Formulation du remboursement, beat 4 : « Vous pouvez demander le remboursement de vos parts, à leur valeur d'origine, selon les statuts. » Chaîne d'avant délibération, **au caractère près**. Aucune reformulation adjectivale nulle part. La chaîne d'après délibération, citée en commentaire ligne 140, est également exacte au caractère près, et le commentaire pose bien l'interdiction du seuil et du délai avant le 31/08. C'est le point le mieux tenu du fichier.
- Cascade : 666 et 1 700 portent leurs lectures actées, reprises du plan. 3 000 et 5 000 portent des lectures neutres et **sont marquées `[TROU: lecture du palier à valider le 24/08]`**. La lecture interdite « une Annécienne sur dix » est absente, ainsi que les 54 000 Annéciennes.
- 88 900 € : absent de la home. 3,2 M€ : absent, avec un arbitrage motivé qui tient. 300 personnes à la fête : absent. Anciens objectifs 80 000 € et 100 000 € : absents.
- 66 % et 34 € : rattachés au don seul, sourcés. Aucune promesse fiscale sur les parts.
- Immatriculation au 10/07/2026, lauréat AMI 2025 avec sa délibération : exacts et sourcés.

## Structure

Un seul H1 (beat 1), sept H2, le pied sans niveau de titre. Ancres cohérentes et en minuscules. Nav conforme au doc de beats, six entrées, cibles exactes, « Newsletter » et « Accueil » bien sortis du menu. Un seul CTA d'intention souscrire, « Je prends ma part », identique en nav, en barre mobile, aux beats 1, 6 et 8, cible `/prendre-part/` partout. Un seul libellé pédago, « C'est quoi, une part sociale ? », aux beats 1 et 4. Deux états du héros présents, celui de campagne avec `{{compteur}}`, celui d'avant lancement sans compteur, sans date et sans annonce d'ouverture. Quinze `[TROU]` recensés, aucun comblé par de l'invention. Ordre intention, preuve, action respecté beat par beat, sans inversion. Les beats 3 et 5 sans action sont conformes à la décision du doc de beats.

Métas : `title` 57 caractères, entité en fin, conforme. `description` **124 caractères** et non 122 comme annoncé ligne 17, sous la limite de 155, avec promesse et verbe. Corriger le décompte annoncé.

### Le CTA ne dit pas ce qui se passe après le clic.

Le doc de beats pose la règle en toutes lettres, section Parcours de conversion : « Ce qui se passe après le clic doit être écrit dans le libellé et dans la ligne qui le suit : la personne arrive sur une page qui lui demande un nombre de parts, pas sur un formulaire de contact. » Aucun des trois emplacements du CTA ne porte cette ligne. C'est la seule exigence explicite du doc de beats que la copy laisse entièrement de côté, et elle coûte de la conversion.

Correctif, sous le bouton du beat 8 au minimum, idéalement sous les trois : « Vous choisissez votre nombre de parts à l'écran suivant. »

### L'état avant lancement du héros duplique trois paragraphes au lieu de les référencer.

Lignes 51 à 57 : la ligne d'instruction « Identique, moins la ligne de compteur » est suivie des trois paragraphes recopiés. Deux sources de vérité pour le même texte, dans un fichier qui se donne pour la source unique de la copy (ligne 9). Une correction de Romain sur l'état campagne ne descendra pas dans le duplicata, et l'intégrateur câblera deux textes divergents sur un seul réglage.

Correctif : supprimer les trois paragraphes recopiés et ne garder que la ligne d'instruction.

### Le trou du palier visé n'est pas posé dans le beat 1.

Le doc de beats nomme le trou « palier visé à confirmer pour l'état d'avant lancement ». Il figure bien dans la liste finale du fichier, mais pas dans le beat, où l'intégrateur le lira. Or l'état d'avant lancement est celui qui part en ligne le 30/08, huit jours avant l'allumage du compteur : c'est le premier état publié, et c'est celui dont la ligne de palier manque sans qu'on le voie.

Correctif : ajouter `[TROU: palier visé à afficher dans l'état avant lancement, du 30/08 au 06/09]` dans le corps du beat 1.

### Nit: beat 2, ligne 84. Le libellé de lien s'écarte du libellé validé.

Doc de beats : « Découvrir le projet en détail » (Landing juin, bloc 5). Copy : « Découvrir le projet architectural ». Le libellé neuf rétrécit la promesse à des plans juste après un bloc qui vient de décrire des usages sociaux, et il décalque le slug.

Correctif : « Découvrir le projet en détail ».

### Nit: beat 4, ligne 129. Le titre de section reprend mot pour mot une entrée de nav qui pointe ailleurs.

« La part sociale » est à la fois le H2 du beat 4 et l'entrée de menu vers `/part-sociale/`. Un lecteur qui clique le menu attend l'ancre et change de page.

Correctif : « La part, en quatre faits ».

## Voix

Vouvoiement tenu sur toute la page, sans une seule échappée. Régime nous et on respecté : « nous » sur l'argent et l'engagement (« nous changeons d'étape », « Nous avons choisi », « notre apport citoyen », « Plus nous sommes nombreuses »), « on » sur les gestes (« ce qu'on appelle l'apport », « On y met de l'argent », « On se retrouve »). Boutons à la première personne du lecteur, trois libellés distincts. Zéro flatterie du lecteur. Zéro impératif de conseil : les seuls impératifs sont dans la zone d'appel et à l'invitation du 19/09. Zéro superlatif, zéro verbe creux, zéro buzzword ESS importé. Féminin en premier sur 7 doublets sur 7. Définition frontale présente deux fois, au beat 4 (« Une part sociale, ce n'est pas un don. C'est un apport... ») et au beat 5 (« C'est ce qu'on appelle l'apport. »), les deux fonctionnent.

**Longueur des phrases : zéro phrase de plus de 25 mots sur toute la page.** C'est tenu au mot près, y compris dans les blocs les plus denses. Rien à corriger.

L'aveu de limite est au bon endroit : les trois « ce que la part n'est pas » ferment le beat 5, après la démonstration et jamais avant, exactement comme le doc de beats l'exige. Le beat se ferme dessus, sans bouton. C'est le meilleur mouvement de la page.

### La phrase-choc isolée est employée à cinq beats sur huit, la règle en autorise deux ou trois.

Recensement : beat 2 « Un lieu pour prendre soin, créer du lien et bousculer les inégalités de genre. » · beat 3 « Le don a lancé les études. La part fait exister le lieu. » · beat 5 « Chaque part en appelle d'autres. » · beat 6 « On ne donne pas à quelque chose, on devient quelque chose. » · beat 8 « Prenez part à la Maison Audacieuse. » Quatre en position de clôture. Le procédé perd sa force à la troisième reprise, et il perd exactement ce qu'il devait donner : le sentiment que la phrase a été posée là parce qu'elle compte. La note de rédaction n'en compte que quatre, elle oublie celle du beat 2.

Correctif : couper la ligne de clôture du beat 2, la plus faible des cinq, et la replier dans le paragraphe qui la précède ou la supprimer. Les trois qui restent (beats 3, 5, 6) sont les bonnes.

### Huit blocs dépassent 25 mots, dont quatre dépassent 30.

Les pires : beat 7 phrase du 19 septembre à 34 mots, beat 3 deuxième paragraphe à 33, beat 7 première phrase à 31, beat 5 troisième paragraphe à 30. La cible R4 est 13 à 17 mots par bloc. Les phrases restent courtes, c'est l'empilement qui gonfle. Les trois blocs les plus longs sont aussi parmi les plus faibles de la page, ce qui n'est pas un hasard.

Correctif au beat 7 : couper après « journées du patrimoine. », faire du reste un bloc à part.

### Nit: beat 6, ligne 178. Le titre reprend le nom interne du beat.

« Où on en est » n'est ni un syntagme nominal ni une question, c'est une complétive. C'est le libellé de travail du doc de beats, promu en H2 public alors que le doc précise « aucune phrase de copy neuve ici ». Les sept autres titres ont bien été réécrits.

Correctif : « Les paliers ». Le registre R4 autoriserait aussi la forme interrogative « Où en sommes-nous ? », attestée au socle.

### La page mélange deux systèmes d'inclusif dans le même bloc.

Beat 1 : « {{compteur}} coopératrices et coopérateurs. Premier palier : autant que de donatrices. » Doublet complet à la première ligne, générique féminin à la seconde. Même chose au beat 6, doublet en ouverture puis « celles qui ont donné », « celles qui ont signé ». Le générique féminin vient du plan du 14/08 et se défend pleinement sur un projet féministe, mais il doit être une décision affichée, pas une alternance non marquée à une ligne d'écart.

Correctif : trancher. Soit « Premier palier : autant que de donatrices et de donateurs. », soit assumer le générique féminin partout et le dire quelque part sur le site.

### FYI: point médian, zéro occurrence.

La page passe par des doublets complets sur toute sa longueur, jamais par « coopérateur·rice ». C'est cohérent de bout en bout, plus lisible à voix haute, et never-say n'interdit que le point simple à la place du point médian, pas le doublet. Rien à corriger. À noter seulement si Romain veut que le site et les newsletters aient la même graphie, celles ci employant le point médian dans 9 documents sur 11.

### FYI: flèches typographiques U+2192, 6 occurrences.

Toutes dans les lignes `Action :`, c'est la notation de spécification que le doc de beats emploie lui même. Aucune n'est en corps de texte. Rien à corriger, à condition qu'aucune ne survive dans la page rendue.

## Clarté

### beat 5, ligne 159. « réserves impartageables » est du jargon non glosé, collé à un paragraphe qui parle d'autre chose.

« Plus notre apport citoyen est solide, plus la banque suit et plus le lieu reste abordable pour toutes et tous. Les statuts affectent l'intégralité des excédents à des réserves impartageables. » Les deux phrases n'ont aucun lien logique. La seconde introduit deux termes techniques d'un coup, « excédents » et « impartageables », dans le seul beat où le lecteur essaie déjà de suivre un raisonnement financier. Et elle redit en jargon ce que le beat 2 a déjà dit en français clair trois écrans plus haut : « Personne ne s'y enrichit, tout y vise l'équilibre et l'utilité. »

Correctif : supprimer la phrase. Le sens est déjà porté, mieux, ailleurs.

### beats 1 et 2. Deux ouvertures jumelles à un écran d'intervalle.

« La Maison Audacieuse, c'est une ferme d'Annecy qui devient un lieu de vie solidaire. » puis « La Maison Audacieuse, c'est une ferme du quartier de Novel, à Annecy. » Même sujet, même tournure présentative, même complément. Le lecteur qui scrolle a l'impression d'être revenu en arrière.

Correctif au beat 2 : « Quartier de Novel, à Annecy. Rénovée, la ferme abritera : ». Cela supprime au passage l'écho entre « sous un même toit » et « Un toit partagé » deux lignes plus bas.

### FYI: le remboursement est dit deux fois, aux beats 4 et 5.

Beat 4 : « Vous pouvez demander le remboursement de vos parts, à leur valeur d'origine, selon les statuts. » Beat 5 : « Ce n'est pas immédiatement disponible. Le remboursement se demande, il suit les règles des statuts. » Les deux sont de la matière validée et le doc de beats les autorise l'une et l'autre, donc aucune correction n'est requise. Mais ce sont deux formulations du même fait à deux écrans d'écart, et c'est la seconde qui est honnête. Si la variante d'après délibération part en ligne le 31/08, le beat 4 gagnera 49 mots sur ce sujet et la redondance deviendra franchement lourde. À reregarder à ce moment là.

## Mémorable et incarné

**La page pourrait elle être celle d'une autre coopérative ?** Non, pas dans son ensemble. Retirez les noms propres et le beat 2 s'effondre : cinq usages précis, un quartier, une ferme, aucun n'est transposable. Le beat 3 est daté, institutionnel, vérifiable. Le beat 5 paie un prix que peu de pages paient. En revanche le beat 4 est du boilerplate SCIC assumé (c'est de la matière validée, donc ce n'est pas un reproche au rédacteur, c'est un constat sur le résultat), la première moitié du beat 5 vaut pour n'importe quelle levée citoyenne, et le beat 6 hors cascade aussi. Et le beat 7, dont la fonction déclarée est d'incarner, ne contient ni prénom, ni visage, ni voix, ni métier : quatre sigles dont deux sont faux, et une équipe décrite par catégories professionnelles.

### Les cinq phrases les plus fortes

1. « Le don a lancé les études. La part fait exister le lieu. » (beat 3) Douze mots qui font tout le pivot de la campagne. Deux propositions parallèles, deux verbes concrets, aucun adjectif. C'est la phrase de Romain et elle s'entend.
2. « On ne donne pas à quelque chose, on devient quelque chose. » (beat 6) Le seul endroit où la page nomme le changement d'identité plutôt que le geste financier. Renversement propre, sans explication après, ce qui est la bonne décision.
3. « Ce n'est pas un placement. Les parts ne rapportent pas d'intérêts, c'est un choix : ici, l'argent sert le projet, pas la rente. » (beat 5) La seule ligne où la page renonce à quelque chose devant le lecteur. « Pas la rente » est le mot le plus tranchant de toute la copy.
4. « Nous avons choisi de ne pas laisser une banque financer plus de la moitié de ce lieu. Moins d'emprunt, ce sont des loyers accessibles. » (beat 5) Transforme une contrainte bancaire en décision politique, puis en donne la conséquence que le lecteur peut se représenter. Le « nous » y est à sa place exacte.
5. « Un refuge pour les femmes qui fuient les violences. » (beat 2) « Fuient » fait un travail qu'aucune abstraction ne ferait. C'est la seule ligne de la page où il y a un corps en mouvement.

### Les cinq phrases les plus faibles

1. « Un lieu solidaire et coopératif, pensé comme un bien commun non spéculatif, au service de l'intérêt général. » (beat 2) Cinq abstractions empilées sans une seule image. La phrase la plus interchangeable de la page : elle irait telle quelle sur n'importe quel site d'ESS de France. C'est de la matière validée de juin, ce qui ne la rend pas meilleure.
2. « Un bien commun appartient à tout le monde. » (beat 6) Tautologie posée en ouverture de beat. Elle ne définit rien, ne prouve rien, et occupe la place la plus visible du bloc.
3. « Autour d'elles, une équipe d'architectes, d'économistes et de spécialistes de l'habitat partagé. » (beat 7) Trois catégories professionnelles, zéro nom, zéro visage, dans le beat censé incarner. En plus, « économistes » n'est pas soutenu par les sources.
4. « Les statuts affectent l'intégralité des excédents à des réserves impartageables. » (beat 5) Jargon non glosé, greffé sur un paragraphe qui parle d'autre chose, et redite d'un point déjà fait en français simple au beat 2.
5. « 3 000 : le palier du poids collectif. » (beat 6) « Poids collectif » est un mot-valise posé en attendant mieux. Il est honnêtement marqué `[TROU]`, donc ce n'est pas une faute, mais tel quel il ne donne au lecteur rien à se représenter, là où 666 et 1 700 lui donnent des personnes.

Mention : « Le projet existe, il est sur les rails. » (beat 3) est de la matière validée de juin, mais « sur les rails » est un cliché posé juste après deux faits solides, et il les affaiblit plutôt qu'il ne les couronne.

### Le H1

Trois candidats.

- Copy : « Ce lieu, devenons-en coopératrices et coopérateurs. »
- Baseline validée : « Et si ce lieu était le nôtre ? »
- Modèle Weco : « Reprenons nos lieux de vie »

**Avis en une ligne : « Et si ce lieu était le nôtre ? » est le plus fort des trois ici, parce qu'il fait le travail de possession en six mots ordinaires, quand le H1 de la copy trébuche sur « devenons-en » et dépense sa première respiration sur le mot que la page ne définira que quatre écrans plus bas.**

Le coût de ce choix, à mettre dans la balance : la décision actée à gate 1 veut le héros à l'impératif au « nous », et une question en H1 n'est pas un impératif. Si Romain tient l'impératif, la voie est de le garder mais de le débarrasser du jargon, en portant « coopératrices et coopérateurs » à la ligne suivante plutôt qu'au titre. « Reprenons nos lieux de vie » est formellement le plus efficace des trois, mais il appartient à Weco et le doc de beats ne l'a retenu que comme modèle de forme.

## Longueur

| Beat | Cible du doc de beats | Mesuré | Verdict |
|---|---|---|---|
| 1, état campagne | 45 à 70, libellés compris | 63 | dans la cible |
| 1, état avant lancement | 45 à 70 | 53 | dans la cible |
| 2 | 90 à 130 | 110 | dans la cible |
| 3, corps | 80 à 120 | 91 | dans la cible |
| 3, frise | 4 items de 5 à 8 mots | 7, 7, 8, 6 | conforme |
| 4 | 85 à 125 | 105 | dans la cible |
| 5 | 140 à 200 | 161 | dans la cible |
| 6, corps | 70 à 110 | 80 | dans la cible |
| 6, paliers | 4 libellés de 6 à 12 mots | 10, 11, 7, 7 | conforme |
| 7 | 60 à 90 | 82 | dans la cible |
| 8 | 80 à 120 | 83 | dans la cible, au plancher |

Total 832 mots. Les décomptes annoncés par le rédacteur sont cohérents entre eux et avec le total. Aucun beat hors cible. Seul le beat 8 est au plancher de sa fourchette : c'est le beat d'appel, il a de la place pour la ligne « ce qui se passe après le clic » réclamée plus haut, sans sortir de sa cible.

## Microcopy et états

### Le champ newsletter n'a aucune microcopy.

Le beat 8 mentionne « Champ email et [Je m'inscris] » dans la ligne `Action :`, mais la copy ne fournit ni libellé de champ, ni placeholder, ni mention de fréquence, ni mention de consentement. Sur un site dont le tunnel est par ailleurs construit autour d'un consentement horodaté, un champ de collecte d'adresse sans une ligne de cadre est une omission visible.

Correctif : ajouter sous le champ `[TROU: mention de consentement et fréquence d'envoi de la newsletter Brevo, à confirmer avant la bascule]`. Ne pas inventer la fréquence, elle n'est dans aucune des sources lues.

### « Je m'inscris » ne dit pas à quoi.

Sur une page de coopérative où l'adhésion fait partie de l'écran 1 du tunnel, « Je m'inscris » peut se lire comme une adhésion. Le libellé doit dire ce qui se passe, c'est la règle anti-slop.

Correctif : « Je suis le chantier ». La ligne qui précède, « laissez-nous votre adresse », est bonne et se garde.

### Nit: beat 8, ligne 237. « vous en coûte 34 » perd son signe euro.

Le verbatim de la landing porte « un don de 100 € vous coûte 34 € ». Un « 34 » nu à côté d'un « 100 € » se lit mal.

Correctif : « un don de 100 € vous en coûte 34 €. »

### Nit: le même fichier image reçoit deux alt différents.

Beat 1, `exterieur3-1.jpg` en variante avec l'alt « La ferme de Novel, à Annecy, longue bâtisse de pierre au grand toit de tuiles ». Beat 2, image 1, le même `exterieur3-1.jpg` avec l'alt « La ferme de Novel aujourd'hui, murs de pierre et grand toit de tuiles ». Deux descriptions du même fichier sur la même page.

Correctif : aligner sur une seule formulation, garder la mention « aujourd'hui » au beat 2 où elle oppose l'image 2.

### Conforme

Alt présents partout où une image est nommée, sans tiret cadratin, formulés en description et non en légende. Le beat 3 n'invente pas d'alt pour une photo non choisie, il donne le format attendu : c'est la bonne discipline. Crédit « © Basa Architecture » visible sous l'image 2 du beat 2, avec son `[TROU]` d'autorisation d'usage web. Les libellés de bouton disent leur action et aucun ne passera à la ligne. Les notes intégrateur distinguent correctement le CTA principal des deux boutons de second niveau. Le pied porte ses huit libellés et l'alt du logo.

Le point de vigilance que le rédacteur signale lui même en fin de fichier, la collision entre le palier « 5 000 » du beat 6 et le seuil « 5 000 € » du beat 4 après délibération, est réel, bien vu, et il faudra le trancher au 31/08. À porter au crédit du livrable.

## Verdict par axe

- Justesse de voix : **corriger**. La mécanique est irréprochable, la dérive est ailleurs, sur l'inflation de la phrase-choc et la longueur des blocs.
- Clarté : **corriger**. Un passage de jargon à supprimer, deux ouvertures jumelles à défaire.
- Structure : **corriger**. Ordre et CTA conformes, mais le duplicata du héros et l'absence de ligne post-clic sont à reprendre.
- Mémorable et incarné : **au seuil, 20/25**. Le critère non compensable est franchi, sans marge. Il retombera sous le seuil si le beat 7 reste vide d'humain.
- Microcopy et états : **corriger**. Le champ newsletter et le libellé d'inscription.

## Verdict global

**corriger.** Plafond fiabilité armé, score 75/100. Quatre `Critical:` à lever avant la passe 2. Aucun veto de renvoi immédiat : la page ne porte pas un seul tiret cadratin et elle n'est pas du slop.

## Objection de l'auditeur

**Les cinq usages du beat 2 sont autorisés par un document de juin que la programmation du 20 juillet a périmé en partie.** Le doc de beats recommande explicitement les cinq briques de la landing, et la copy a raison de les suivre. Mais entre juin et août, Banjo s'est retiré de l'espace créativité (22/06), aucune des deux exploitantes pressenties n'est sécurisée (CLAUDE.md au 17/08), le programme du R+2 est déclaré « non figé, revalidation en septembre », le béguinage est passé de cinq à six logements, et les médecins ont refusé la formulation « en santé ». La home va rester en ligne du 30 août jusqu'à la clôture de la campagne en janvier. Elle promettrait pendant cinq mois « une maison de la créativité pour les enfants et les familles » dont personne ne tient l'exploitation, à des gens à qui l'on demande 100 € pour devenir copropriétaires du lieu. Le risque n'est pas juridique, il est réputationnel, et il tombe au pire moment : au premier article de presse ou à la première question posée à la Fête de l'Audace.

Recommandation : décrire les usages du lieu, jamais les structures qui les portent, tant que les baux ne sont pas signés (le CLAUDE.md porte « aucun bail signé » au 17/08). Et faire revalider la liste des cinq briques par le collectif le 24/08, en même temps que les lectures de paliers, plutôt que de la considérer acquise depuis juin.

**Risque secondaire.** Le gel du site court du 31/08 au 08/09 et la bascule est visée au 30/08. Cela laisse une marge très courte entre la fin de cette boucle d'audit et le verrou. Les `Critical:` de fiabilité du beat 7 ne se corrigent pas par une réécriture : le nom d'usage de la maison de santé et la liste des exploitantes demandent une décision du collectif. Si le 24/08 ne tranche pas ces deux points, la seule sortie sûre est de publier le beat 7 sans aucun nom d'organisation.

---

# Passe 2

Fichier audité : `contenu/pages/accueil.md`, version corrigée du commit `2cd5fb7` (18/08/2026, 19:44), treize corrections annoncées dans son propre journal. Arbre de travail identique à ce commit au moment de l'audit, aucune dérive. Référentiels : les mêmes qu'en passe 1, plus `chiffres-autorises.md` mis à jour (la ligne du 19/09 y a été ajoutée). Auditeur distinct du rédacteur et de l'auditeur de la passe 1. Aucune modification apportée à `accueil.md`.

## Verdict d'entrée

Les trois `Critical:` de la passe 1 sont levés, proprement : plus de « sous bail », plus de Banjo, plus de « Maison En-Santé », les quatre noms d'organisation du beat 7 ont disparu au lieu d'être triés. Mais la correction du beat 3 en a produit un nouveau : la frise affiche désormais « Février 2026 : promesse de bail de 99 ans signée », alors que le commentaire de source deux lignes au-dessus, `chiffres-autorises.md` et le CLAUDE.md du projet convergent tous les trois sur une signature en mars. Le plafond fiabilité reste donc armé, pour un fait différent de celui de la passe 1. Onze des treize corrections annoncées sont propres. Deux produisent un effet de bord : le remplacement du jargon au beat 5 introduit un pronom sans antécédent clair. Le beat 7, en perdant ses deux noms exacts avec les deux faux, retombe très exactement là où la passe 1 avait prévenu qu'il tomberait.

## 1. Critical de la passe 1, vérification

Critical: la frise du beat 3 (ligne 121) contredit sa propre source. « Février 2026 : promesse de bail de 99 ans signée » date la signature en février. Le commentaire juste au-dessus (ligne 110) dit « conseil municipal du 02/02/2026, promesse de bail signée le 06/03/2026 », `chiffres-autorises.md` dit la même chose et le CLAUDE.md du projet confirme « bail validé en conseil municipal le 02/02/2026, promesse de bail emphytéotique signée début mars 2026 ». Trois sources concordent sur mars, la frise dit février. C'est le même mécanisme que le Critical de la passe 1, un fait qui ne correspond pas à ce que sa source autorise, rejoué sur la ligne même que la correction 1 dit avoir « ajustée ».
Correctif : « Mars 2026 : promesse de bail de 99 ans signée ».

« sous bail » : 0 occurrence. Levé.
Banjo : 0 occurrence. Levé.
En-Santé, en santé et variantes : 0 occurrence. Levé.
Ostara, Hub TND, Café des Audacieuses, SISA : 0 occurrence aux beats 2 et 7, comme sur le reste de la page. Le beat 7 dit désormais « Ce lieu est porté par des associations annéciennes déjà à l'œuvre. [TROU: liste des exploitantes à figer au 24/08] », sans aucun nom. Levé, au prix signalé plus bas dans Mémorable et incarné.
Phrase du bail, corps du beat 3 (ligne 109) : « la Ville d'Annecy a signé la promesse de bail de 99 ans », formulation conforme à `chiffres-autorises.md` au mot près. Levé.

Nit: Notes intégrateur du beat 3 (ligne 129), le placeholder d'annotation manuscrite reste « 99 ans de bail », qui répète l'ellipse écartée par le Critical de la passe 1 dans le corps du texte. C'est une instruction de production, pas de la copy publiée, mais si l'intégrateur l'imprime telle quelle sur la photo, l'ellipse revient par la porte de derrière.
Correctif : « 99 ans, promesse de bail ».

## 2. Corrections de la passe 1, vérification

Vérifiées conformes, comptes exacts à l'appui : « Plus de 650 » présent (ligne 106). « à l'écran suivant » présent 2 fois, une par état du héros (lignes 51 et 65). H1 exact, « Et si ce lieu était le nôtre ? » (ligne 36) et « Devenons-en coopératrices et coopérateurs. » présent dans les deux états (lignes 40 et 57). « Les statuts l'interdisent : tout excédent reste dans la coopérative. » présent (ligne 165), réserve ci-dessous. « impartageables », « non spéculatif », « appartient à tout le monde » et « poids collectif » : 0 dans la copie ; les trois occurrences brutes que le grep remonte sont dans le journal « Corrections du 18/08 » en bas de fichier, qui cite les formulations retirées, pas la copie elle-même. Palier 3 000 correctement replié en `[TROU: lecture à valider le 24/08]` (ligne 196). « Quartier de Novel, à Annecy. Rénovée, la ferme abritera : » présent (ligne 80). `[TROU: consentement et fréquence newsletter]` présent (ligne 254). « Je m'inscris » conservé. « économistes » et « spécialistes » : 0. « Ce n'est pas un placement. » présent une fois dans la copie (ligne 171), les deux autres occurrences relevées par le grep sont en note de rédaction. Source du 19/09 en commentaire (ligne 221). La ligne existe désormais dans `chiffres-autorises.md`.

Phrases-chocs isolées : 3, aux beats 3, 5 et 6, exactement la cible. La suppression de celle du beat 2 est propre : le paragraphe qu'elle fermait n'est pas resté orphelin, il se referme sur « Personne ne s'y enrichit, tout y vise l'équilibre et l'utilité. », une ligne descriptive et sourcée, pas une chute. FYI: le beat 8 ouvre toujours sur « Prenez part à la Maison Audacieuse. », mais la passe 1 l'avait déjà exclue du compte des chutes, position d'ouverture et non de clôture : rien à corriger.

« Les statuts l'interdisent : tout excédent reste dans la coopérative. » (ligne 165) est bien débarrassé du jargon, mais le pronom « l' » n'a pas d'antécédent dans la phrase qui précède (« Plus notre apport citoyen est solide, plus la banque suit et plus le lieu reste abordable pour toutes et tous. »). Le lecteur doit deviner ce qui est interdit, au même endroit précis où la passe 1 avait déjà signalé une rupture de fil. Un jargon en moins, un flottement grammatical en plus.
Correctif : « Les statuts interdisent tout enrichissement personnel : l'excédent reste dans la coopérative. »

## 3. Fiabilité

Chaque chiffre, date et montant restant sur la page a été confronté à `chiffres-autorises.md` : 100 €, 650+, 99 ans sous la formulation promesse, 10/07/2026, 2025 et la délibération D.CN.2025-134, la cascade 666 → 1 700 → 3 000 → 5 000, 1 700 signataires, 66 %, samedi 19/09/2026. Tous portent un statut compatible avec un usage home et tous sauf un portent leur commentaire `<!-- source : -->`. L'exception, déjà relevée en passe 1 et toujours ouverte : le beat 4 (lignes 141 à 144) affiche 100 € et « une personne, une voix » sans aucun commentaire de source, dans ses quatre faits comme dans les deux états du héros qui répètent 100 €. Ce n'est pas un fait faux, c'est un fait qui ne porte pas sa preuve à l'endroit où le contrôle de fiabilité la cherche.
Correctif : ajouter sous la liste des quatre faits, `<!-- source : 100 € = valeur d'une part et une personne = une voix, statuts constitutifs signés de La Coop Audacieuse, article 15 pour le remboursement -->`.

88 900 € : absent du texte de la page, la seule occurrence est en note de rédaction (ligne 307), hors copy. Conforme.
Remboursement : « Vous pouvez demander le remboursement de vos parts, à leur valeur d'origine, selon les statuts. » présent une fois, au caractère près (ligne 144). La formule post-délibération, avec « sur simple demande », 5 000 € et 5 ans, ne vit que dans le commentaire HTML de la ligne 146. Conforme, toujours le point le mieux tenu du fichier.
Aucune promesse fiscale sur les parts : le 66 % (ligne 244) et l'« avantage fiscal » (ligne 173) sont rattachés au don dans les deux cas, jamais à la part. Conforme.

Critical: voir la frise du beat 3, section 1. C'est le seul fait de toute la page qui échoue ce contrôle.

## 4. Mécanique, comptes exacts

Zéro sur toute la page : tiret cadratin, demi-cadratin, point d'exclamation hors des marqueurs `<!--`, virgule avant « et », Title Case, emoji. Les 9 occurrences de « → » restent toutes dans des lignes `Action :` de spécification, comme en passe 1 (le compte remonte de 6 à 9 du fait des nouvelles lignes d'action du beat 8, sans qu'aucune ne quitte sa ligne de spec).
Tutoiement : 0 réel. Les 2 occurrences brutes de « tu, ton, ta, tes » sont « ton » dans les intertitres « Arbitrages de ton » et « Arbitrage de ton à valider par Romain », le même faux positif qu'en passe 1.
Interdits armés de la campagne et liste never-say complète : 0 partout, sweep refait terme à terme, rien n'a bougé depuis la passe 1.
« copropriétaire » : 2 dans la copie, beat 4 et palier 1 700 du beat 6 ; la troisième occurrence brute est le propre décompte du rédacteur en note de rédaction. Sous la limite de 3.
« je » : confiné aux libellés de bouton entre crochets et à leurs descriptions, nav, barre CTA mobile, lignes `Action :`, Notes intégrateur. 0 en narration.

## Score COPY

| Critère | Points | Passe 1 | Passe 2 | Ce qui a bougé |
|---|---|---|---|---|
| Justesse de voix | 25 | 20 | 22 | phrase-choc ramenée à 3 occurrences, propre. La longueur des blocs n'a pas été retouchée, aucune correction ne la visait : le paragraphe du 19/09 au beat 7 est toujours à 34 mots au mot près |
| Clarté | 20 | 15 | 18 | jargon « impartageables » supprimé et ouvertures jumelles des beats 1 et 2 défaites, les deux tenues. Coût : un pronom sans antécédent au beat 5, nouveau, à corriger |
| Structure intention, preuve, action | 15 | 12 | 13 | ligne post-clic ajoutée au héros dans ses deux états, c'est le minimum du correctif de la passe 1. La duplication des trois paragraphes du héros et le `[TROU]` de palier absent du corps du beat 1 restent tels quels, aucune correction ne les visait |
| **Mémorable et incarné, non compensable, seuil 20** | **25** | **20** | **20** | le beat 6 perd sa tautologie « un bien commun appartient à tout le monde », léger gain. Le beat 7 perd ses quatre noms, les deux faux comme les deux vrais, sans les remplacer par aucun humain : la passe 1 avait écrit qu'il retomberait sous le seuil s'il restait vide d'humain, il l'est resté, à l'identique. Les deux mouvements s'annulent |
| Microcopy et états | 15 | 10 | 12 | champ newsletter cadré par un `[TROU]` de consentement plutôt que laissé nu, gain net. Le libellé « Je m'inscris » est conservé tel quel, décision assumée et non correction manquée. Les deux `Nit:` de la passe 1, signe € et alt dupliqué, n'ont pas bougé |
| **Brut** | **100** | **77** | **85** | |
| **Après plafond fiabilité** | | **75** | **75** | plafond toujours armé, pour un fait différent |

Mémorable et incarné reste à 20/25, tenu au seuil exact, sans la moindre marge, pour la deuxième fois consécutive. Ce n'est pas un statu quo neutre : la passe 1 avait nommé la condition exacte de son maintien, « il retombera sous le seuil si le beat 7 reste vide d'humain » : c'est précisément ce qui s'est produit. Le critère est non compensable : aucun gain ailleurs sur la page ne peut plus le porter au-dessus de 20. Une seule érosion supplémentaire, n'importe où sur la page, le fait passer sous le seuil et invalide la page entière, quel que soit le score total.

## Vetos et plafonds

Tiret cadratin : 0. Veto non déclenché.
Slop : pass, inchangé.
**Fiabilité : FAIL, plafond 75 maintenu.** Non pour les trois faits de la passe 1, tous corrigés, mais pour un quatrième découvert en passe 2 : la date de signature de la promesse de bail, frise du beat 3, contredite par sa propre source à deux lignes de distance.

## Ce qui reste à corriger

Critical: frise du beat 3 (ligne 121), « Février 2026 : promesse de bail de 99 ans signée » contredit le commentaire de source de la ligne 110 et `chiffres-autorises.md`, qui datent la signature en mars. Remplacement : « Mars 2026 : promesse de bail de 99 ans signée ».

Beat 5 (ligne 165), « Les statuts l'interdisent : tout excédent reste dans la coopérative. », le pronom « l' » n'a pas d'antécédent. Remplacement : « Les statuts interdisent tout enrichissement personnel : l'excédent reste dans la coopérative. »

Beat 4 (lignes 141 à 144), aucun commentaire de source sur 100 € et « une personne, une voix », relevé en passe 1, toujours ouvert. Ajouter `<!-- source : 100 € = valeur d'une part et une personne = une voix, statuts constitutifs signés de La Coop Audacieuse, article 15 pour le remboursement -->`.

Nit: ligne 244, « un don de 100 € vous en coûte 34. » perd son signe €, déjà relevé en passe 1. Remplacement : « un don de 100 € vous en coûte 34 €. »

Nit: `exterieur3-1.jpg` porte deux alt différents entre le beat 1 (ligne 68, « même alt » que celui de `hero1.jpg`) et le beat 2 (ligne 92, avec « aujourd'hui »), déjà relevé en passe 1, toujours ouvert. Aligner le beat 1 sur la formulation du beat 2, qui porte le contraste utile avec l'image 2 du même bloc.

Nit: Notes intégrateur du beat 3 (ligne 129), le placeholder d'annotation manuscrite « 99 ans de bail » répète l'ellipse écartée ailleurs sur la page. Remplacement : « 99 ans, promesse de bail ».

## Verdict par axe

Justesse de voix : **corriger**, 22/25. La phrase-choc est réglée, la longueur des blocs ne l'est pas, aucune correction ne la visait.
Clarté : **corriger**, 18/20. Deux gains propres, un flottement nouveau à reprendre.
Structure : **corriger**, 13/15. Le minimum du correctif post-clic est fait ; la duplication du héros et le `[TROU]` de palier du beat 1 restent entiers, sans correction qui les visait.
Mémorable et incarné : **au seuil, 20/25, sans marge, pour la deuxième fois.** Le critère non compensable est franchi, mais sur une base qui ne s'est pas élargie : ce que le beat 7 a perdu en fausseté, il ne l'a pas regagné en humanité.
Microcopy et états : **corriger**, 12/15. Le champ newsletter est cadré, le libellé du bouton est une décision assumée, deux `Nit:` sans mouvement.

## Verdict global

**corriger.** Plafond fiabilité maintenu, score 75/100, inchangé en valeur mais pour une cause neuve. Zéro `Critical:` hérité de la passe 1, un `Critical:` de fiabilité découvert en passe 2, correction d'une ligne. Aucun veto de renvoi immédiat : la page ne porte toujours pas un seul tiret cadratin et elle n'est pas du slop.

## Objection de l'auditeur

**La correction du beat 7 a soigné la fiabilité et vidé l'incarnation dans le même geste : personne n'y gagne rien.** Le rédacteur a choisi, à raison, le correctif le plus sûr proposé par la passe 1 : retirer les quatre noms plutôt que de trier les deux vrais. C'est la décision qui protège le mieux la campagne d'un article de presse ou d'une question embarrassante à la Fête de l'Audace. Mais elle a un coût que le journal des corrections ne nomme pas : le critère non compensable de la grille COPY, déjà à 20/25 sans marge en passe 1, repose maintenant sur exactement les deux mêmes beats, 2 et 3, qu'avant, puisque le beat 7 ne leur ajoute plus rien, pas même une spécificité fausse. La passe 1 avait écrit noir sur blanc la condition de la chute sous le seuil. Elle ne s'est pas produite, mais seulement parce que le beat 6 a perdu sa tautologie au même moment, un gain qui n'a rien à voir avec le beat 7 et qui ne se reproduira pas deux fois. Si la réunion du 24/08 ne tranche pas des noms réels pour le beat 7, associés à ce qu'ils font plutôt qu'à une catégorie professionnelle, ce critère n'aura plus aucune réserve pour absorber le prochain aléa de rédaction, même un aléa aussi anodin qu'une phrase raccourcie en relecture.

**Deuxième point.** Une correction qui répare un fait peut en introduire un autre : la frise du beat 3 en est la preuve directe, produite par la correction même qui devait clore le Critical du bail. Ce n'est pas un reproche au rédacteur, treize corrections en une seule passe laissent passer une ligne. C'est un argument pour une passe 3 courte, ciblée sur les seules lignes touchées le 18/08 plus le beat 7, plutôt qu'un aller direct en production sur la foi du seul journal de corrections.

**Passe 2/3.**
