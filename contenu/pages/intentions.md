# À quoi sert chaque page, et comment on l'écrit

Document de direction. Il dit, pour chaque page, à qui elle parle, ce qu'elle doit obtenir, dans quel ordre, et où elle s'arrête. Il ne dicte pas les phrases : il dicte le travail à faire avant de les écrire.

Posé le 07/09/2026 après relecture des onze pages construites, sur consigne de Romain.

## Les deux principes

**Le lecteur n'y connaît rien.** Il ne sait pas ce qu'est une part sociale, une SCIC, un collège, des fonds propres. Il ne sait pas non plus qu'il ne sait pas. Chaque mot de vocabulaire coopératif employé sans être défini au moment où il apparaît est un lecteur perdu.

**Le lecteur a trente secondes.** Pas parce qu'il est pressé, parce que c'est ainsi qu'on lit aujourd'hui. Une page de onze mille signes ne se lit pas moins vite qu'une page de quatre mille : elle ne se lit pas du tout. La longueur n'est pas une qualité du contenu, c'est un coût imposé au lecteur.

Ces deux principes ont une conséquence que le site ne tirait pas : **il faut choisir**. Parmi tous les messages vrais, la page en retient trois ou quatre, dans un ordre, et laisse les autres à une page plus profonde ou à une question repliée. Tout dire, c'est ne rien faire retenir.

## Ce que la page doit obtenir

Le site a un seul but : que des gens souscrivent une part. Chaque page y contribue autrement, et une page qui ne sait pas laquelle des cinq marches elle porte finit par les porter toutes mal.

| Marche | Question du lecteur | Page qui y répond |
|---|---|---|
| 1. Envie | c'est quoi, ce lieu ? | accueil, le lieu |
| 2. Confiance | c'est sérieux, ces gens ? | l'équipe, les médias, le projet |
| 3. Compréhension | une part, c'est quoi au juste ? | la part sociale |
| 4. Réassurance | qu'est-ce que je risque ? | la part sociale, les conditions |
| 5. Geste | je fais comment ? | prendre part |

Une page fait monter d'une marche. Elle ne redescend jamais le lecteur, et elle ne saute jamais une marche : une page qui explique le montage financier à quelqu'un qui n'a pas encore eu envie du lieu le perd.

## La règle des trente secondes, en chiffres

Ce que la page dit dans ses **cent premiers mots** est ce que 80 % des lecteurs liront. Le reste sert les 20 % qui creusent, et il a le droit d'être plus long, à condition d'être clairement en dessous.

Cible de hauteur, mesurée sur une fenêtre de 1440 px de large :

| Page | Avant | Cible | Pourquoi |
|---|---|---|---|
| accueil | 6 700 px | inchangée | validée, ne pas y toucher |
| la part sociale | 13 300 px | **5 000 px** | page de confiance, pas de manuel |
| les conditions de souscription | 17 300 px | inchangée | contrat, la longueur y est due |
| la confidentialité | 8 400 px | inchangée | obligation légale |
| le lieu | 6 600 px | 5 500 px | l'image doit prendre la place du texte |
| le projet | 6 100 px | 4 500 px | mécanisme, pas budget |
| prendre part | 4 800 px | 3 500 px | page d'action, tout ce qui n'agit pas nuit |
| l'équipe | 4 300 px | 4 300 px | tenue, mais elle doit changer de nature |
| les médias | 3 700 px | 3 500 px | correcte |
| contacts | 3 500 px | 3 000 px | correcte |
| soutenir | 3 300 px | 3 300 px | correcte |

Une page qui dépasse sa cible n'a pas trop écrit : elle n'a pas choisi.

## Le rendu compte autant que le texte

Constat du 07/09 : les dix feuilles de style des pages intérieures totalisaient zéro vert, zéro terracotta et un kaki, contre dix verts sur la seule page d'accueil. Les pages n'étaient pas grises par goût, le socle ne leur offrait que du blanc, du gris et du violacé.

Le socle porte désormais les fonds de la page d'accueil : `.bloc--aube`, `.bloc--claire`, `.bloc--nappe`, `.bloc--ouvert`, `.bloc--violet`, `.bloc--terracotta`, plus `.bloc--photo` avec son panneau blanc, `.duo`, `.galerie`, `.coupe`, `.annote` et `.reperes`. Ils sont documentés dans `docs/conventions.md`.

Trois règles d'emploi :

**Une seule zone chaude par vue.** Un fond plein, violet ou terracotta, par page, jamais deux. Il porte l'idée qu'on veut faire retenir, jamais un texte long.

**Une image toutes les deux sections au minimum.** Une page de onze mille signes sans image est un mur, quelle que soit la qualité des phrases.

**Le rythme d'une page** : ouverture claire, une section blanche, une image en pleine largeur ou un fond plein, une section claire, l'appel sombre. Deux fonds identiques qui se suivent sont un seul bloc, et il faut alors les fusionner ou changer l'un des deux.

## Les images disponibles

Sept photographies et deux dessins ont été ajoutés le 07/09, tirés du fonds du projet.

| Fichier | Ce que c'est | Où il sert |
|---|---|---|
| `coupe-espaces.jpg` | coupe perspective des cinq espaces, dessin Basa, 2000 px | le lieu, l'accueil |
| `rue-interieure.jpg` | dessin de la rue intérieure, pleine résolution | le lieu |
| `ferme-rue.jpg` | la ferme vue de la rue, aujourd'hui | le lieu, le projet |
| `voute.jpg` | voûte de brique du rez-de-chaussée | le lieu |
| `charpente.jpg`, `charpente-2.jpg` | la charpente sous les combles | le lieu, l'équipe |
| `grange.jpg` | le grand volume vide de la grange | le lieu, le projet |
| `fenetre.jpg` | une ouverture dans le mur épais | au choix |
| `porte.jpg` | la porte de la cour | au choix |
| `visuel-dauphine-1.jpg` | le lieu une fois rénové, visuel Basa | accueil, soutenir |
| `dessin.jpg` | dessin de la rue intérieure, ancienne résolution | remplacé par `rue-interieure.jpg` |

Les photographies du bâtiment datent du 7 mars 2025. Elles montrent un bâtiment vide, sombre, encombré : **c'est leur intérêt**. Le site raconte une transformation, et il n'a pour l'instant que le côté « après ». Le contraste entre la voûte poussiéreuse d'aujourd'hui et le visuel de Basa fait plus pour la crédibilité du projet qu'un paragraphe de plus.

Elles ne portent aucune personne identifiable, ce qui règle la question du droit à l'image. Les photographies de la Fête de l'Audace, elles, en portent : elles restent hors du site tant que les autorisations ne sont pas purgées.

**La coupe des cinq espaces se réétiquette en HTML** (composant `.coupe`), et c'est délibéré : le dessin d'origine nomme cinq structures exploitantes dont une a quitté le projet et une autre n'est pas figée. Étiqueter par-dessus permet de nommer les espaces par leur fonction et de corriger un nom sans redemander un fichier à l'agence.

## Page par page

### `/` — l'accueil

**Validée le 03/09, ne pas la modifier.** Elle est la référence de tout le reste : c'est le niveau de soin attendu ailleurs.

Un seul point : la jauge du héros avait été masquée, elle est rétablie le 07/09. Le compteur porte une valeur d'exemple déclarée par `data-a-remplir`, et `node build.mjs --prod` refuse désormais de construire tant qu'elle est là.

### `/part-sociale/` — la page de la confiance

**Job** : qu'un lecteur qui n'a jamais entendu le mot « part sociale » comprenne en trente secondes ce que c'est, et se dise « je peux le faire sans risque ».

**Ce n'est pas** un cours de droit coopératif, ni une notice, ni la page des conditions. Tout ce qui relève du contrat vit dans `/cgv-parts-sociales/`, et cette page y renvoie.

L'ordre compte, et c'est celui de la levée d'objection, pas celui de la logique juridique :

1. **Une part, c'est quoi.** Une phrase de définition frontale, avant tout le reste. Pas d'introduction, pas de mise en contexte.
2. **Cent euros, une voix.** Le prix et le pouvoir dans la même respiration. C'est le seul endroit où le montant apparaît en grand.
3. **Votre argent reste le vôtre.** La phrase du remboursement, au mot près, tôt et pas en fin de page. C'est la première objection réelle des gens.
4. **Ce que ce n'est pas.** Ni un don, ni un placement, ni une action. L'aveu de limite fait plus pour la confiance que trois arguments.
5. **Vos questions.** Tout le reste va là, en questions repliées : la fiscalité, les collèges, le décès, la cession, la durée. Un lecteur qui creuse ouvre. Les autres passent.
6. **L'appel.**

Ce qui doit en sortir : les développements sur la gouvernance en quatre collèges pondérés, sur le régime de l'offre au public, sur l'articulation des statuts et du règlement intérieur. Ce sont de vraies informations, elles appartiennent aux conditions de souscription ou à une question repliée.

**Longueur** : cinq mille pixels, la moitié d'aujourd'hui.

### `/prendre-part/` — la page de l'action

**Job** : que quelqu'un qui a décidé le fasse, sans rien qui le ralentisse.

Une page d'action ne convainc pas, elle exécute. Tout ce qui explique y est de trop : le lecteur qui arrive ici a déjà lu ce qu'il voulait lire. Trois choses seulement : ce qui va se passer, le formulaire, ce qu'il advient ensuite de sa déclaration.

Elle porte aujourd'hui un défaut qui n'est pas de rédaction : **aucun point d'envoi n'est branché**, une déclaration se perd en silence. Tant que ce n'est pas réglé, la page doit dire ce qu'elle fait des informations et offrir un repli par courriel. Une page de confiance qui trahit à la première soumission coûte plus qu'elle ne rapporte.

### `/le-projet-architectural/` — le lieu

**Job** : faire voir. C'est la page de l'envie, celle qui donne le sentiment que ce lieu existe déjà.

C'est la page qui doit changer le plus, parce qu'elle est celle où l'image remplace le texte, et qu'elle n'en avait pas.

1. Le bâtiment aujourd'hui : la photo de la rue, la voûte, la charpente. Ce qu'on trouve en poussant la porte.
2. Ce qu'il devient : la coupe des cinq espaces, en pleine largeur, étiquetée par fonction.
3. Chaque espace en trois lignes, pas en trois paragraphes.
4. Ce que la rénovation respecte : le patrimoine, la frugalité, ce qui reste debout.
5. L'appel.

Le libellé du menu passe de « Le projet » à « Le lieu » : la page décrit un bâtiment, pas un projet.

### `/le-modele-economique/` — le projet

**Job** : montrer que ça tient debout. Pas prouver, montrer.

Consigne explicite de Romain : **ne pas assommer de chiffres**. La page contient aujourd'hui plus de nombres qu'un lecteur non financier n'en absorbe. Trois chiffres suffisent, choisis, gros, espacés. Les autres sortent.

Le mécanisme à faire comprendre tient en une phrase, déjà écrite et validée : « une banque ne finance que la moitié d'un lieu comme celui-ci, l'autre moitié, c'est nous ». Tout le reste de la page sert cette phrase ou n'a rien à y faire.

Rappel du garde-fou : la page ne porte pas à la fois le coût total et la fraction bancaire. Le lecteur divise, et il obtient un montant que le référentiel interdit de publier.

Le libellé du menu passe à « Le projet ».

### `/lequipe-projet/` — les visages

**Job** : mettre des visages sur les noms. Qui fait quoi, comment ça se traduit.

Consigne de Romain, et c'est là que la page échoue aujourd'hui : elle présente **cinq structures là où il faudrait des personnes**. Un tableau de descriptions d'associations n'incarne rien, et l'incarnation est justement ce que cette page doit produire.

Ce qui manque est de la matière, pas de la rédaction : les prénoms des fondatrices, une ligne chacune, une photo du collectif. C'est demandé depuis le 07/09 et ce n'est pas arrivé. La page doit donc être **construite pour les accueillir** : les emplacements existent, nommés, et se remplissent le jour où la matière arrive, sans refonte.

En attendant, elle peut faire deux choses qu'elle ne fait pas : donner à voir le lieu où le collectif se réunit, et dire la gouvernance en une phrase compréhensible plutôt qu'en quatre collèges pondérés.

### `/les-medias/` — la preuve

**Job** : preuve sociale et service à la presse, dans cet ordre. Un visiteur ordinaire y passe pour vérifier que le projet existe ailleurs que sur son propre site.

Elle est correcte. Elle gagne une image et de la couleur, elle ne change pas de nature.

### `/contacts/` — la porte

**Job** : qu'on puisse joindre quelqu'un, et qu'on sente qu'il y a quelqu'un.

Correcte. Deux défauts à traiter : le formulaire d'infolettre poste sur une adresse absurde, et la page ne dit pas sous quel délai on répond.

### `/soutenir/` — les trois gestes

**Job** : accueillir ceux qui arrivent par un vieux lien vers la collecte de dons et leur montrer où en est le projet.

Correcte, et son parti pris de trois formes pour trois poids est juste. Elle gagne de la couleur.

### `/cgv-parts-sociales/` et `/politique-de-confidentialite-mentions-legales/`

**Job** : être exactes et trouvables. Rien d'autre.

Elles ne se raccourcissent pas et ne se rendent pas séduisantes. Le seul travail est de tenue : que leur mise en page ne dépareille pas du reste du site, que les questions se replient, que les trous nommés restent visibles.

## Ce qu'on ne fait pas

Ajouter un chiffre qui n'est pas dans `chiffres-autorises.md`, quel qu'en soit le besoin rédactionnel.

Combler un trou nommé en devinant. Un `[À SOURCER]` visible est laid, et c'est son intérêt : il se règle. Une invention plausible ne se règle jamais.

Promettre un avantage fiscal sur les parts. L'agrément ESUS est en instruction.

Écrire « récupérer » son argent. On demande le remboursement, et la phrase se dit au mot près : « Votre argent reste le vôtre. Vous pouvez demander le remboursement de vos parts à tout moment. »

Utiliser une photographie où des personnes sont reconnaissables tant que les autorisations ne sont pas purgées.
