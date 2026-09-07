# Audit de contenu des onze pages

Auditeur tiers. Aucune de ces pages n'a été écrite par moi. Lecture faite le 08/09/2026 sur `src/pages/`, onze fichiers.

Référentiels appliqués : `contenu/pages/intentions.md`, `contenu/pages/chiffres-autorises.md`, `00 Pilotage/voix/voice-dna.md`, `never-say.md`, `phrase.md`.

Point de vue : directeur marketing d'une agence de levée de fonds citoyenne. Un seul critère de jugement, celui du commanditaire : est-ce qu'une personne qui n'y connaît rien et qui a trente secondes met 100 €.

## Verdict

Le travail de voix est le meilleur actif du site. Zéro tiret cadratin, zéro point d'exclamation, zéro « je », zéro tutoiement, zéro mot de `never-say.md`, vouvoiement tenu sur onze pages, un aveu de limite sur neuf pages sur onze. Sur ce registre, il n'y a rien à corriger. Je le dis d'entrée parce que le reste du rapport ne le dira pas.

Le veto de fiabilité tient aussi, à quatre exceptions près, et le piège de la division est respecté page par page. La discipline sur les chiffres est réelle.

Ce qui ne tient pas est ailleurs, et c'est plus cher. Le site fait trois promesses qu'il dément lui-même deux pages plus loin : vous êtes copropriétaire du lieu, vous votez à égalité avec les associations, vous payez par carte. Les trois sont fausses au sens strict, les trois sont sur le chemin de l'argent, et les trois sont contredites par une autre page du même site. Un lecteur ordinaire ne verra rien. Un journaliste, un institutionnel ou un souscripteur qui lit les conditions avant de signer verront tout, et c'est exactement le public dont dépend la crédibilité d'une levée citoyenne.

Ensuite, la page qui doit répondre à « c'est sérieux, ces gens » ouvre sur quatre cadres vides et quatre crochets `[À SOURCER]`. Elle ne franchit pas sa marche, elle la fait redescendre.

Enfin, l'événement de conversion le plus rentable de la campagne, la Fête de l'Audace du 19/09, dans onze jours, avec souscription sur place, n'existe sur aucune des onze pages.

Compte : 6 Bloquants, 15 Majeurs, 15 Mineurs.

---

# Bloquants

## B1. « Copropriétaire du lieu » est faux, et le site le dit lui-même

Pages et passages :

`accueil.html` l.202 : « Devenez coopérateur·ice de la Maison Audacieuse et copropriétaire du lieu avec nous. »
`part-sociale.html` l.20 : « vous devenez coopérateur·ice : copropriétaire du lieu, avec une voix dans les décisions. »
`soutenir.html` l.62 : « Vous devenez copropriétaire du lieu et vous pesez dans les décisions à égalité avec tout le monde. »

Démenti, sur le même site :

`le-modele-economique.html` l.138 : « La coopérative ne sera jamais propriétaire des murs. »
`part-sociale.html` l.22, deux lignes après l'affirmation : « les murs restent à la Ville et la coopérative aura l'usage du bâtiment pendant tout ce temps. »

Règle enfreinte : veto de fiabilité. Personne n'est copropriétaire du lieu. La Ville est propriétaire, la coopérative aura l'usage sous promesse de bail, et le souscripteur détient une part du capital d'une société, pas une quote-part d'un immeuble. « Copropriétaire » a de plus un sens juridique précis en droit français, et ce n'est pas celui-là.

Aggravant : sur `/part-sociale/`, l'affirmation et son démenti sont dans les cent premiers mots, à cinquante mots d'écart. C'est la page de la confiance qui se contredit elle-même dans la seule zone que 80 % des lecteurs liront.

Remplacement, à écrire une fois sur `/part-sociale/` l.20 et à reprendre au mot près sur les deux autres pages :

« Une part sociale, c'est un morceau de la coopérative qui va rénover la Ferme de Novel et la faire vivre. Vous en prenez une et vous devenez coopérateur·ice : propriétaire d'une part de la coopérative, avec une voix dans les décisions. »

Puis, en remplacement de l.22, une phrase qui règle la question au lieu de la laisser ouverte :

« La coopérative s'appelle La Coop Audacieuse, elle est immatriculée depuis le 10 juillet 2026. Les murs appartiennent à la Ville d'Annecy et lui appartiendront toujours. La Ville a signé la promesse de bail de 99 ans, et pendant ces 99 ans c'est la coopérative qui a l'usage du bâtiment, donc vous. »

Pour `accueil.html` l.202 : « Devenez coopérateur·ice de la Maison Audacieuse et décidez du lieu avec nous. »
Pour `soutenir.html` l.62 : « Vous devenez coopérateur·ice et vous pesez dans les décisions à égalité avec tout le monde. »
Pour `soutenir.html` l.88, qui s'appuie sur le mot : « Un don ne vous rend pas coopérateur·ice et ne vous donne pas de voix en assemblée générale. »

Réserve : « copropriétaire » est un mot de campagne employé depuis des mois, y compris hors du site. Le retirer partout est un arbitrage du collectif, pas le mien. Ce qui n'est pas un arbitrage : il ne peut pas rester sur une page qui le dément cinquante mots plus loin.

## B2. Le site promet un paiement par carte qui n'existe pas

`part-sociale.html` l.151, question « Comment je souscris ? » : « En ligne, en quelques minutes. Vous choisissez votre nombre de parts, vous adhérez à la coopérative et vous réglez par virement ou par carte. La confirmation arrive par courriel. »

Démentis, sur le même site :

`prendre-part.html` l.17 : « Vous déclarez ici votre intention, nous vous envoyons le bulletin de souscription et vous décidez ensuite. Aucun paiement sur cette page. »
`politique-de-confidentialite-mentions-legales.html` l.186 : « La souscription en ligne de parts sociales n'est pas encore ouverte. »
`cgv-parts-sociales.html` l.175 : « [À SOURCER : moyens de paiement acceptés, coordonnées bancaires de la coopérative...] »
`prendre-part.html` l.99 : le formulaire n'a pas de point d'envoi.

Règle enfreinte : veto de fiabilité, publication d'un fait faux. Et c'est la question la plus lue de la page la plus décisive : « comment je souscris » est celle qu'ouvre quelqu'un qui a déjà décidé.

Remplacement pour `part-sociale.html` l.151 :

« Vous déclarez votre intention en ligne, en deux minutes. Nous vous envoyons ensuite le bulletin de souscription, les statuts et les coordonnées bancaires. Vous signez et vous versez à ce moment-là, pas avant. »

## B3. « Vous votez au même titre que les associations » est faux, et la page le prouve trente lignes plus bas

`lequipe-projet.html` l.89 : « Vous votez à l'assemblée générale au même titre que les associations qui habitent le lieu. »
`lequipe-projet.html` l.119, dans un pli de la même page : « les productrices et salarié·es 35 %, les bénéficiaires 35 %, les partenaires et collectivités 20 %, les soutiens 10 %. »

Un souscripteur citoyen relève du collège des Soutiens (`cgv-parts-sociales.html` l.259). Les associations exploitantes relèvent des Bénéficiaires. Le collège du souscripteur pèse 10 % des voix, celui des associations 35 %. La phrase de la l.89 est donc fausse, et la page fournit elle-même la preuve de sa fausseté.

Règle enfreinte : veto de fiabilité. Et `intentions.md` interdit expressément cette page de publier la pondération : « dire la gouvernance en une phrase compréhensible plutôt qu'en quatre collèges pondérés ».

Remplacement pour l.89 :

« Vous votez à l'assemblée générale, sur les comptes et sur les orientations du lieu. »

Remplacement pour le pli l.117 à l.121, qui retire la pondération de cette page et renvoie au contrat, comme `/part-sociale/` le fait déjà correctement :

« Les associé·es sont réparti·es en quatre familles : celles qui travaillent dans le lieu, celles qui l'utilisent, les collectivités et les partenaires, et les personnes qui soutiennent le projet. Chaque famille pèse un poids fixé par les statuts. À l'intérieur d'une famille, une personne compte pour une voix. »

Puis le lien existant vers `/cgv-parts-sociales/#colleges`, où la table complète est publiée à sa place, sourcée article par article.

## B4. La page des visages n'a pas de visages

`lequipe-projet.html` l.28 à l.57. Sur quatre portraits : quatre « photo à venir », un seul nom (Morgane Craye, l.32), et quatre marqueurs `[À SOURCER]` dont trois disent « prénom, fonction et une ligne ». Le seul nom présent porte lui aussi son crochet l.34 : « [À SOURCER : une ligne sur ce qu'elle fait dans le lieu] ».

Ces marqueurs sont dans les cent premiers mots de la page.

Règle enfreinte : marche 2 du parcours, « c'est sérieux, ces gens ». Un visiteur sceptique arrive ici depuis `/le-projet-architectural/` ou depuis la presse, et lit que le collectif ne sait pas dire qui il est. C'est pire que l'ancienne page de cinq structures, qui au moins affirmait quelque chose.

Ce n'est pas un défaut de rédaction et je ne comble pas le trou. Ce qui est de mon ressort : tant que la matière n'arrive pas, la section ne se publie pas en l'état. Deux options, à trancher par le collectif.

Option A, celle que je recommande. La section « Celles qui ont lancé le projet » est retirée de la page publiée et remise le jour où les portraits arrivent. Elle est remplacée par un seul paragraphe, vrai aujourd'hui :

« Un collectif d'Annéciennes a déposé ce projet à la Ville en 2025 et le conduit depuis. La coopérative est présidée par Morgane Craye. Les portraits arrivent, et ils arriveront ici. »

Option B. La grille reste, avec les seuls noms et fonctions disponibles, sans photo et sans crochet. Un cadre vide sans texte de service se lit comme un choix graphique, un crochet `[À SOURCER]` se lit comme un aveu d'incompétence.

Dans les deux cas, le cartouche WeCo l.210, dont le rôle est marqué `[À SOURCER]` à côté du logo, se retire jusqu'à ce que le rôle soit écrit. Un logo sans fonction dans une liste de métiers pose la question qu'il devait fermer.

## B5. Le site ne dit pas qui l'édite

`politique-de-confidentialite-mentions-legales.html` :

l.103 : « [À SOURCER : laquelle des deux structures édite le site, ou formalisation d'une co-édition.] »
l.104 : « [À SOURCER : numéro de téléphone de l'éditeur, exigé par l'article 6 III de la loi n° 2004-575...] »
l.110 : « [À SOURCER : nom, prénom et qualité de la personne qui assure la direction de la publication...] »
l.119 : téléphone de l'hébergeur manquant.

Règle enfreinte : obligation légale d'identification de l'éditeur, et par ricochet identification du responsable de traitement, puisque la page l.155 renvoie à un éditeur qu'elle ne nomme pas.

Décision, pas rédaction. Les marqueurs sont correctement posés et je ne les comble pas. Ils bloquent la mise en ligne publique, pas la préproduction.

## B6. Le remboursement promis n'a pas d'organe pour le décider

`cgv-parts-sociales.html` l.276 : « Une demande de remboursement partiel [...] est soumise à l'autorisation préalable du Conseil Coopératif (article 15.5). »
`cgv-parts-sociales.html` l.188 : « [À TRANCHER : le Conseil Coopératif n'est pas constitué à ce jour [...]. Tant qu'il n'est pas en place, l'avis qu'il rend sur les admissions et la décision qu'il prend sur les remboursements anticipés ne peuvent pas être exercés.] »

Et l.116 : « [À TRANCHER : régime applicable à l'offre de parts sociales d'une SCIC constituée sous forme de société par actions simplifiée. La qualification de l'offre au regard des articles L. 411-1 et suivants du code monétaire et financier n'a pas été validée...] »

Sept pages du site portent la phrase « Vous pouvez demander le remboursement de vos parts à tout moment ». Le contrat dit que l'organe qui autorise n'existe pas, et que le régime de l'offre n'est pas qualifié. C'est la définition de « empêche d'ouvrir la souscription ».

Décision et travail juridique, pas rédaction. Les deux marqueurs sont bien posés et bien écrits. Je les signale parce qu'ils commandent la date d'ouverture, pas parce qu'il manquerait une phrase.

---

# Majeurs

## M1. La Fête de l'Audace du 19/09 n'existe sur aucune des onze pages

`chiffres-autorises.md` la donne autorisée, lieu et horaire compris : « samedi 19/09/2026, Fête de l'Audace 2, devant la ferme de Novel, à partir de 9 h, premier événement de conversion, souscription sur place ». Recherche sur les onze pages : zéro occurrence. Aucune page ne porte d'agenda, de prochaine date, de « venez nous voir ».

Règle enfreinte : aucune, au sens du référentiel. C'est la perte de conversion la plus chère du site. Dans une levée citoyenne, l'événement physique avec souscription sur place convertit d'un ordre de grandeur au-dessus de la page web, et il alimente la page web pendant les trois semaines qui suivent. Onze jours avant, le site l'ignore.

Remplacement, un bloc à poser sur la page d'accueil dans les portes douces (`accueil.html` l.241, à côté de « Plutôt un don ? »), et repris tel quel en pied de `/prendre-part/`, `/soutenir/` et `/contacts/` :

« Venir nous voir
Samedi 19 septembre, à partir de 9 h, devant la ferme de Novel. On fait visiter, on répond aux questions, et on peut prendre sa part sur place. »

Maintenance datée : ce bloc se retire le 20/09 au matin.

## M2. La page d'accueil ne dit ni le prix ni l'offre dans ses cent premiers mots

Cent premiers mots de `accueil.html` : le quartier, « Et si ce lieu était le nôtre ? », la jauge, « un lieu de vie pour prendre soin, créer du lien et bousculer les inégalités de genre », les deux boutons, puis le début du paragraphe sur les inégalités.

Ce qui n'y est pas : ce qu'on demande au lecteur, et combien. Le mot « 100 € » apparaît au mot 380, l.205. « Part sociale » apparaît sept fois sur la page et n'est jamais défini.

Règle enfreinte : `intentions.md`, la règle des trente secondes. 80 % des lecteurs ne sauront jamais que le geste coûte 100 €.

Arbitrage, pas correction. `intentions.md` classe l'accueil « validée le 03/09, ne pas la modifier ». Je signale le coût de ce gel et je propose la retouche la moins invasive, une ligne ajoutée sous `hero__phrase` l.53, sans toucher au reste :

« Une part vaut 100 €. Une personne vaut une voix. »

Elle tient sur une ligne, elle ne déplace rien, et elle met le prix dans les cent premiers mots.

## M3. La description de la page d'accueil est écrite sans accents, avec « 100 EUR »

`accueil.html` l.3 : « description: Une ferme d'Annecy devient un lieu de vie solidaire. Prenez une part a 100 EUR et devenez cooperatrice ou cooperateur du lieu. »

C'est la seule des onze descriptions dans cet état, les dix autres sont accentuées et portent le symbole €. C'est le texte affiché sous le lien dans les résultats de recherche et dans les partages sur les réseaux, donc le tout premier contact avec le projet, avant même la page.

Remplacement :

« description: Une ferme d'Annecy devient un lieu de vie pour les femmes. Prenez une part à 100 € et devenez coopératrice ou coopérateur du lieu. »

Le titre de la même page mérite le même regard : « Parts sociales d'un lieu solidaire | La Maison Audacieuse » met le produit avant le nom sur la page d'accueil du site. « La Maison Audacieuse | Un lieu pour les femmes à Annecy » est plus cherché et plus cliqué.

## M4. La page de la part sociale ne dit jamais ce qu'une part donne

`part-sociale.html` porte une section « Ce que ce n'est pas » (l.84 à l.112) avec trois dénégations, et aucune section symétrique. Sa propre description l.3 promet pourtant « Ce qu'elle vous donne, ce qu'elle ne vous donne pas ». La moitié promise n'existe pas.

Ce que le site sait déjà dire et qui n'est pas sur cette page : `accueil.html` l.235, « vous pouvez participer aux rencontres et aux prises de décision. Vous recevrez une invitation après votre souscription. »

Règle enfreinte : objection « qu'est-ce que je gagne », non traitée. Dans une levée à 100 €, la contrepartie n'est jamais financière et c'est pour cela qu'elle doit être nommée. Trois dénégations sans contrepartie en face, c'est une page qui demande sans rien offrir.

Remplacement : une section courte insérée avant « Ce que ce n'est pas », l.83, sur fond clair, quatre lignes.

« Ce qu'une part vous donne
Une voix à l'assemblée générale, chaque année, sur les comptes et sur ce que devient le lieu.
Une invitation aux rencontres du projet, dès votre souscription.
Le droit d'entrer dans un lieu qui vous appartient un peu, et de dire ce qui s'y fait. »

## M5. Deux chiffres pour la même chose, à deux clics d'écart

`accueil.html` l.138 : « 120 000 € réunis, dons et mécénat de compétences ».
`soutenir.html` l.47 : « 88 900 € réunis par la campagne de dons ».

Les deux sont autorisés par `chiffres-autorises.md`, et le référentiel explique la différence. Le site ne l'explique nulle part. Un lecteur qui passe de la frise à la page de don voit une somme fondre de 31 100 € sans raison.

Remplacement pour `soutenir.html` l.47, qui rend la différence lisible sans rien ajouter au référentiel :

« 88 900 € de dons, auxquels s'ajoute le mécénat de compétences »

Ou, plus simple et plus fort sur une page de don : reprendre le chiffre de la home, « 120 000 € réunis, dons et mécénat de compétences ». Le choix appartient au collectif, l'écart non expliqué ne peut pas rester.

## M6. Le piège de la division ne fuit pas dans une page, il fuit entre les pages

Page par page, la règle est tenue, et c'est à porter au crédit des rédacteurs. Aucune page ne porte à la fois le coût total et la fraction bancaire.

Mais un lecteur ne lit pas une page, il navigue :

`accueil.html` l.100 : « L'ensemble du projet de rénovation est chiffré à 3,2 millions d'euros. »
`les-medias.html` l.111 : « 3,2 M€, le coût de la rénovation ».
`part-sociale.html` l.126, `le-modele-economique.html` l.78, `soutenir.html` l.64 : « Une banque ne finance que la moitié d'un lieu comme celui-ci. L'autre moitié, c'est nous. »

Le lien « Le projet et son financement » est en pied de la page d'accueil. Deux clics, une division, 1,6 M€, c'est-à-dire l'ordre de grandeur que le référentiel interdit tant que l'hypothèse n'est pas figée.

Aggravant discret sur `le-modele-economique.html` l.23 : « Rénover cette ferme se compte en millions d'euros » cohabite avec « la moitié » l.78, sur la même page. C'est la version floue du piège, et le commentaire de tête de la page l.7 croit précisément l'avoir évité.

Remplacement : ce qui casse la division, c'est la troisième source, que `le-modele-economique.html` sait déjà dire l.52 à l.65. Il suffit de la porter partout où la fraction apparaît. Une phrase, ajoutée après « L'autre moitié, c'est nous » sur les trois pages :

« Cette moitié-là se compose de subventions, de mécénat et de nos parts. »

Et sur `le-modele-economique.html` l.23, remplacer « se compte en millions d'euros » par « coûte plus cher que ce qu'une association peut porter seule ».

## M7. Les cinq espaces portent quatre jeux de noms différents

| Espace | accueil | le lieu | le projet | les médias | l'équipe |
|---|---|---|---|---|---|
| accueil des femmes | Ostara (l.77) | par la fonction (l.81, l.110) | Les bureaux associatifs (l.117) | bureaux d'associations (l.120) | Ostara (l.72) |
| santé | Un pôle santé (l.80) | Le pôle de santé (l.105) | Le pôle de santé (l.118) | une maison de santé (l.120) | le pôle de santé (l.73) |
| café | Café des Audacieuses (l.79) | Café des Audacieuses (l.84) | Le café associatif (l.116) | un café associatif (l.120) | Café des Audacieuses (l.72) |
| créativité | Maison de la créativité (l.83) | L'espace de créativité (l.120) | La maison de la créativité (l.119) | une maison de la créativité (l.120) | l'espace de créativité (l.73) |
| logement | Béguinage (l.78) | Le béguinage (l.115) | Le béguinage (l.120) | un béguinage (l.120) | Le béguinage (l.73) |

Règle enfreinte : deux, en fait. La cohérence, et la règle des structures exploitantes. « Maison de la créativité » est présentée sur l'accueil dans un `<span class="nom-structure">`, exactement comme « Ostara », donc lue comme un nom d'exploitante, alors que le commentaire l.81 de cette même page dit que l'exploitante a quitté le projet et que l'espace doit être nommé par sa fonction. La mise en forme dément le commentaire.

Contradiction supplémentaire : `le-modele-economique.html` l.115 à l.121 liste les cinq espaces comme des locataires qui paient un loyer, quand `lequipe-projet.html` l.73 dit que trois d'entre eux « attendent la structure qui les fera vivre ». Un lecteur qui fait le trajet apprend que le modèle économique repose sur des loyers dont trois payeurs sur cinq n'existent pas.

Remplacement : un lexique unique, par fonction pour les trois espaces sans exploitante certaine, et les deux noms de marque conservés pour les deux qui sont acquis.

- l'accueil et l'accompagnement des femmes victimes de violences, tenu par Ostara
- le pôle de santé
- le Café des Audacieuses
- le béguinage
- l'espace de créativité pour les enfants

Sur `accueil.html` l.83, retirer le `nom-structure` et écrire « Un espace de créativité, d'éveil pour les enfants et les familles. »

Sur `le-modele-economique.html` l.114, remplacer « la coopérative loue les espaces à celles qui les font vivre » par « la coopérative louera les espaces aux structures qui les feront vivre. Deux sont connues, les autres se choisissent maintenant. » Cela dit la vérité, et cela transforme un trou en preuve de sérieux.

## M8. Une date de clôture de campagne qui n'existe pas

`le-modele-economique.html` l.153 : « La campagne court jusqu'au 31 décembre 2026. »
`accueil.html` l.158, la même date, formulée autrement : « Jusqu'au 31 décembre, souscription du plus grand nombre possible de coopérateur·ices. »

`chiffres-autorises.md` autorise le 31/12/2026 comme « date butoir du tour de table citoyen (frise, fin d'année) », sur la home. La coopérative est à capital variable et la souscription n'est pas fermée le 1er janvier. Écrire que « la campagne court jusqu'au » installe une clôture, ce qui a deux effets opposés et tous deux mauvais : cela ne crée pas d'urgence utile en septembre, et cela décourage toute souscription reçue après le 31 décembre.

Remplacement pour `le-modele-economique.html` l.153 :

« Une part à 100 € vous rend coopérateur·ice du lieu. Une personne, une voix, quel que soit le nombre de parts. Nous réunissons le plus grand nombre possible de coopérateur·ices d'ici la fin de l'année. »

## M9. La promesse de remboursement est plus large sur le site que dans le contrat

Sept pages portent la phrase imposée, au mot près, et c'est bien. Le paragraphe qui suit, lui, dit moins que le contrat.

`part-sociale.html` l.68 : « La demande se fait par écrit. Le remboursement porte sur ce que vous avez versé, diminué des pertes que la coopérative aurait constatées à la clôture de l'exercice. »

Ce que la même page ne dit pas et que `cgv-parts-sociales.html` dit :

l.276 : le remboursement partiel est soumis à l'autorisation préalable du Conseil Coopératif.
l.279 et l.312 : le remboursement peut être suspendu ou étalé quand le capital atteint son minimum statutaire.
l.280 : des pertes apparues après la sortie peuvent donner lieu à un reversement.

Règle enfreinte : la réassurance ne doit pas être plus généreuse que le contrat qu'elle résume. Le jour où un souscripteur demande son remboursement et découvre l'écart, il ne le découvre pas seul.

Le seuil de 5 000 € et le délai de 5 ans restent hors ligne, cela n'est pas discuté. Ce qui manque n'est pas un chiffre, c'est une phrase de mécanisme.

Remplacement pour `part-sociale.html` l.68, en ajoutant une phrase :

« La demande se fait par écrit. Le remboursement porte sur ce que vous avez versé, diminué des pertes que la coopérative aurait constatées à la clôture de l'exercice. Les demandes sont traitées dans leur ordre d'arrivée, et le versement peut être étalé si trop de personnes sortent en même temps. »

Formulation à valider par le conseil de la coopérative avant publication : je propose le mécanisme, pas sa rédaction définitive.

## M10. Un crochet `[À SOURCER]` dans les cent premiers mots de deux pages

`prendre-part.html` l.47, au mot 98 : « La réponse part sous [À SOURCER : délai de réponse à une déclaration, à fixer par le collectif]. »
`contacts.html` l.42, au mot 95 : « Vous recevez une réponse sous [À SOURCER : délai de réponse annoncé, à arrêter par le collectif avant la mise en ligne]. »

Les marqueurs sont correctement posés, et `intentions.md` les veut visibles. Le problème n'est pas le marqueur, c'est sa position : sur la page qui exécute le geste et sur la page qui prouve qu'il y a quelqu'un, un crochet dans la zone des trente secondes annule le travail des cent mots.

Décision, pas rédaction : le délai de réponse est un arbitrage du collectif, une phrase de dix mots à trancher en réunion. Tant qu'il n'est pas tranché, la phrase se réécrit sans promesse chiffrée plutôt qu'avec un crochet.

`prendre-part.html` l.47 : « Vous recevez le bulletin de souscription, les statuts de la coopérative et les coordonnées bancaires. »
`contacts.html` l.42 : « Tout arrive dans la même boîte, que le collectif relève lui-même entre deux réunions et deux chantiers. L'objet du message dit qui vous répond. »

Une page qui ne promet pas de délai vaut mieux qu'une page qui annonce qu'elle ne le connaît pas.

## M11. Le doublement des dons n'est pas sur la page des dons

`accueil.html` l.255 : « Le don reste possible. Chaque don est doublé jusqu'au 22 septembre. »
`soutenir.html`, la page qui porte le don, section l.80 à l.111 : rien.

Un visiteur qui clique « Je fais un don » depuis la home perd, en un clic, la seule raison de donner maintenant plutôt qu'en octobre.

Remplacement, à ajouter dans `soutenir.html` après l.87 :

« Jusqu'au 22 septembre, chaque don est doublé. Un don de 50 € en apporte 100 au projet. »

Maintenance datée : cette ligne se retire le 23/09 au matin, sur les deux pages.

## M12. La politique de confidentialité ignore la plateforme que le site utilise

`politique-de-confidentialite-mentions-legales.html` l.181 : « [À SOURCER : plateforme de collecte des dons en service [...]. La version précédente du site désignait HelloAsso.] »
`soutenir.html` l.91 et l.106 : lien actif vers HelloAsso, nommée deux fois.

Règle enfreinte : cohérence, et exactitude d'un texte légal. Le marqueur affirme une ignorance que le site dément sur une autre page.

Remplacement pour l.180 et l.181 :

« La page de don renvoie vers HelloAsso, plateforme de collecte de l'association. Les données que vous y saisissez sont traitées par HelloAsso, selon sa propre politique de confidentialité. Ce site ne les collecte pas lui-même.
[À SOURCER : liste des données que HelloAsso nous retransmet, notamment pour l'établissement des reçus fiscaux.] »

Le marqueur restant est le vrai trou, et il est plus petit.

## M13. Le bouton dit « Je prends ma part », la page dit « Je déclare mon intention »

`entete.html` l.14, `barre-mobile.html` l.2, et onze occurrences dans les pages : « Je prends ma part ».
`prendre-part.html` l.17 : « Vous déclarez ici votre intention ». l.141 : « Je déclare mon intention ». l.144 : « Déclarer votre intention ne vous engage à rien. »

Règle enfreinte : la promesse du bouton et le contenu de la page ne coïncident pas. C'est la fuite classique du tunnel : le lecteur croit finir, il découvre qu'il commence, et le taux de complétion du formulaire s'effondre.

Le libellé du bouton est bon et il ne se change pas, c'est la voix de la campagne. Ce qui se change, c'est la première ligne de la page d'arrivée, pour qu'elle tienne la promesse au lieu de la corriger. Remplacement pour `prendre-part.html` l.16 et l.17 :

« Prendre sa part
Une part vaut 100 €. Première étape en deux minutes : vous nous dites combien de parts vous voulez, nous vous envoyons le bulletin, vous signez et vous versez ensuite. Rien à payer aujourd'hui. »

Le mot « déclaration » sort du titre et de la première phrase, il reste dans le formulaire où il est juste.

## M14. Le bail au présent sur la page d'accueil

`accueil.html` l.100 : « La Ville d'Annecy nous confie le bâtiment pour 99 ans : le foncier ne nous coûte rien, chaque euro finance la rénovation. »

`chiffres-autorises.md` est explicite : « à formuler "la Ville a signé la promesse de bail de 99 ans", jamais "la ferme est sous bail" ». « Nous confie » au présent affirme un bail conclu, alors que la promesse est signée et que le bail vient après le permis. Les cinq autres pages du site emploient toutes la formulation autorisée, seule la home ne le fait pas.

Remplacement, qui garde le rythme et la longueur de la ligne :

« La Ville d'Annecy a signé la promesse de bail de 99 ans : le foncier ne nous coûtera rien, chaque euro finance la rénovation. »

Arbitrage de gel, comme M2 : la home est validée. Je signale que ce point-là n'est pas un choix de style, c'est le veto de fiabilité.

## M15. « Elle ne paye ni une tuile », puis « chaque euro part dans la rénovation »

`le-modele-economique.html` l.98 : « Votre part entre au capital de la coopérative et grossit ce qu'elle a réuni par elle-même. Elle ne paye ni une tuile ni un mètre de mur. »
`le-modele-economique.html` l.99, phrase suivante : « chaque euro réuni part dans la rénovation. »

Un lecteur qui vient de demander « à quoi sert mon argent » lit en trois lignes que son argent ne paie pas les travaux, puis que tout l'argent va aux travaux. Les deux phrases sont vraies dans deux registres différents, comptable et budgétaire, et le lecteur de trente secondes n'a pas ces deux registres.

Remplacement pour l.98 et l.99 :

« Votre part entre au capital de la coopérative. Elle ne sert pas à payer une tuile en particulier : elle est ce que la coopérative met de sa poche, et c'est ce que la banque regarde avant de prêter.
La coopérative n'achète ni le terrain ni les murs, la Ville lui confie la ferme pour 99 ans. Tout l'argent réuni va donc à la rénovation. »

---

# Mineurs

**Mi1. `accueil.html` l.32, jauge à 124.** `chiffres-autorises.md` autorise 812 comme unique chiffre d'exemple en maquette, et déclare tout autre chiffre hors référentiel. 124 n'y figure pas. La garde `data-a-remplir` bloque le build de production, donc le risque est contenu, mais le référentiel et la page ne disent pas la même chose. À aligner dans un sens ou dans l'autre.

**Mi2. Deux noms pour le même appel à projets.** `accueil.html` l.124 « lauréate de l'appel à projets (AMI) » contre `lequipe-projet.html` l.167 « appel à manifestation d'intérêt » et `les-medias.html` l.114 « L'appel Amirale ». AMI ne veut pas dire appel à projets. Remplacement sur la home : « lauréate de l'appel Amirale de la Ville d'Annecy ». C'est le nom que la presse a employé, il est cherchable et il est court.

**Mi3. Trois graphies du siège social.** « 3 impasse des Rochers, 74960 Annecy » (`cgv` l.113 et l.374, `lequipe` l.146), « 3, impasse des Rochers, 74960 Annecy » (`politique` l.96), « 3 impasse des Rochers, 74960 Annecy Cran-Gevrier » (`politique` l.87). Retenir une graphie, celle du Kbis.

**Mi4. Virgule avant « et ».** `lequipe-projet.html` l.3, description : « la coopérative où une personne vaut une voix, et les métiers qui conduisent le chantier ». Règle typographique dure de `never-say.md`, valable tous registres. Retirer la virgule.

**Mi5. La politique déclare une donnée que le formulaire ne collecte pas.** `politique` l.167 : « Le formulaire d'inscription à l'infolettre recueille votre prénom et votre adresse électronique. » Le formulaire de `contacts.html` l.140 à l.149 ne demande que l'adresse. Celui de l'accueil demande les deux. Remplacement : « Le formulaire d'inscription à l'infolettre recueille votre adresse électronique et, sur la page d'accueil, votre prénom. »

**Mi6. L'ESUS mentionné ouvre une attente fiscale.** `part-sociale.html` l.167 et `soutenir.html` l.65 « À ce jour, une part n'ouvre aucun avantage fiscal ». Les deux respectent le veto, et les deux disent au lecteur « revenez, ça viendra peut-être ». Sur `/part-sociale/`, garder la mention de l'instruction, c'est honnête. Sur `/soutenir/` l.65, retirer « À ce jour » : « Une part n'ouvre aucun avantage fiscal. »

**Mi7. « Close » et « ouverte » sur la même page.** `soutenir.html` l.34 « Elle s'est close en avril 2026 » puis l.87 « La page de collecte reste ouverte ». Remplacement l.34 : « Vous arrivez peut-être par un lien vers notre campagne de dons. Elle a atteint son objectif en avril 2026 et elle a financé les études. »

**Mi8. Le reportage France 3 hébergé sur le site.** `les-medias.html` l.68 renvoie vers un `.mp4` hébergé sur `www.maison-audacieuse.fr`. Rediffuser un reportage d'une chaîne publique depuis son propre serveur suppose une autorisation. À vérifier avant mise en ligne, ou remplacer par le lien vers le replay de la chaîne.

**Mi9. Licence de reprise accordée sans preuve de titularité.** `les-medias.html` l.160 : « Photographies du 7 mars 2025, propriété du collectif. Reprise libre pour un usage éditorial. » Le site accorde une licence. Il faut savoir qui a pris les photos et à quel titre avant de le faire.

**Mi10. SIREN, RNA et siège social hors référentiel.** `cgv` l.113, `politique` l.87 à l.100. Ce sont des mentions légales obligatoires et il serait absurde de les retirer. C'est le référentiel qui doit les accueillir, avec la source Kbis et le récépissé de préfecture. À porter dans `chiffres-autorises.md`.

**Mi11. « à l'écran suivant » promet un écran qui n'existe pas.** `part-sociale.html` l.227 : « Vous choisissez votre nombre de parts à l'écran suivant. » L'écran suivant est un formulaire de déclaration. Remplacement : « Vous dites combien de parts vous voulez à l'écran suivant. »

**Mi12. Libellés de navigation et libellés de pied divergents.** « Le lieu » contre « Le lieu et son architecture », « Le projet » contre « Le projet et son financement », « L'équipe » contre « L'équipe projet », « Médias » contre « Les médias », « Contact » contre « Contacts ». Aligner sur les libellés courts de l'entête.

**Mi13. « Soutenir » absente de la navigation principale.** `entete.html` ne porte pas `/soutenir/`, seul le pied la porte. La page existe pour accueillir un trafic entrant de vieux liens, donc l'absence en navigation se défend. Ce qui ne se défend pas : une fois arrivé sur `/soutenir/`, un visiteur ne peut plus y revenir. Ajouter le lien en pied de `/part-sociale/` suffit, et `/prendre-part/` l.163 le fait déjà.

**Mi14. « peut-être » sur `soutenir.html` l.34.** Interdit de registre newsletter, pas interdit global, et la phrase l'emploie correctement pour ne pas présumer d'où vient le lecteur. Je le laisse. Signalé pour mémoire.

**Mi15. La grange sert de fond sur trois pages.** `part-sociale.html` l.120, `le-modele-economique.html` l.92, `lequipe-projet.html` l.66. Le même volume vide porte trois messages différents, dont « qui fait la Maison Audacieuse ». Sur la page des visages, une photo de grange vide dit exactement ce qu'on veut éviter qu'elle dise. Question de rendu autant que de contenu, je la laisse à l'autre auditeur, mais l'effet de sens est un problème de contenu.

---

# Les cent premiers mots, page par page

| Page | Mots | Ce que disent les cent premiers mots | Verdict |
|---|---|---|---|
| accueil | 748 | le quartier, une question, une jauge à 124, la phrase de mission, deux boutons, le début du constat sur les inégalités | s'échauffe. Ni prix, ni offre, ni définition de « part sociale » |
| part-sociale | 884 | la définition frontale, l'immatriculation, la promesse de bail, puis « Cent euros, une voix » | la meilleure ouverture du site, gâchée par « copropriétaire » et son démenti cinquante mots plus loin |
| prendre-part | 458 | le prix, ce qui se passe, rien à payer, puis un crochet `[À SOURCER]` au mot 98 | dit l'essentiel, puis se saborde |
| le lieu | 711 | le siècle, le vide, le bail, ce que le lieu devient, ce qu'on trouve derrière la porte | juste. Fait voir avant d'expliquer, c'est son travail |
| le projet | 586 | « se compte en millions », personne ne met la somme seul, personne ne prête à qui n'a rien réuni, puis 99 ans, juillet 2026, 100 € | juste. Le mécanisme est posé en trois phrases, sans chiffre à diviser |
| l'équipe | 669 | le collectif, la coopérative, les métiers, puis « photo à venir » trois fois et trois `[À SOURCER]` | échoue. La page dit qu'elle ne sait pas répondre à sa propre question |
| les médias | 570 | quatre médias, la période, France 3, puis la liste des parutions | juste. La preuve sociale arrive en cinq secondes |
| contacts | 373 | l'adresse, on répond nous-mêmes, qui relève la boîte, puis un crochet `[À SOURCER]` au mot 95 | presque. Le crochet tombe pile sur la promesse de service |
| soutenir | 393 | la campagne close, l'étape suivante, 88 900 €, 650 donateurs, 100 €, « copropriétaire » | efficace, et porte deux des trois erreurs de fond du site |
| les conditions | 3 474 | ce qui fait foi, les statuts priment, « une part ne s'achète pas, elle se souscrit », le sommaire | exemplaire. La page la mieux écrite du site |
| confidentialité | 1 512 | l'objet de la page, la date de version, le sommaire complet | conforme à son genre, rien à redire |

---

# Le vocabulaire non expliqué

Relevé de tous les termes de finance coopérative, avec leur première occurrence et leur état.

| Terme | Page, première occurrence | Expliqué au moment où il apparaît |
|---|---|---|
| part sociale | accueil l.56, employé 7 fois sur la home | **non**, jamais sur la home. Défini sur `/part-sociale/` l.20, très bien |
| coopérateur·ice | accueil l.14 | **non** sur la home. Défini implicitement sur `/part-sociale/` l.20 |
| capital | accueil l.186, « ouvrir le capital à de gros investisseurs » | **non**. Repris `le-modele-economique` l.98 sans définition |
| emphytéotique | accueil l.131, frise | **non**. Repris `les-medias` l.62 et l.121, jamais glosé nulle part |
| fonds propres | le-modele-economique l.55 | **oui**, « Une banque appelle cela des fonds propres », après avoir dit la chose en français. C'est le modèle à suivre |
| apport | part-sociale l.126 | **oui**, « l'argent que nous mettons nous-mêmes dans le projet » |
| collège | part-sociale l.184 | **à moitié**, « quatre collèges qui correspondent aux quatre familles d'associé·es ». Le mot « associé·e » n'est pas défini |
| associé·e | part-sociale l.184, lequipe l.113 | **non** sur les pages publiques. Employé comme synonyme de coopérateur·ice sans que le lien soit dit |
| assemblée générale | part-sociale l.42 | **oui**, « au moins une fois par an, pour approuver les comptes et fixer les orientations » |
| excédents | part-sociale l.104 | **non**. Employé tel quel, puis `le-modele-economique` l.136 |
| réserves impartageables | le-modele-economique l.136 | **oui**, « ne se partagent ni pendant la vie de la coopérative ni le jour où elle s'arrête » |
| clôture de l'exercice | part-sociale l.68 | **non**. Terme comptable dans la phrase la plus lue de la page, celle du remboursement |
| plus-value | le-modele-economique l.137 | **non** |
| SCIC | cgv l.3, politique l.95 | **oui** sur les deux, forme développée donnée |
| sociétariat | cgv l.3 et 8 fois | **non**, mais c'est une page de conditions, le registre l'autorise |
| levier | nulle part | sans objet, et c'est bien : le mot est dans le lexique de cabinet banni par `phrase.md` |
| agrément ESUS | part-sociale l.167 | **non**, sigle nu. Développé sur `cgv` l.330 seulement |
| maîtrise d'œuvre, maîtrise d'usage | le-projet-architectural l.170, lequipe l.178 et l.186 | **non**. Deux termes de métier du bâtiment employés nus |

Deux corrections tiennent la moitié du problème.

Sur `accueil.html`, la home emploie sept fois « part sociale » sans jamais dire ce que c'est. Le lien « C'est quoi, une part sociale ? » l.56 est bon et il ne suffit pas : il faut la réponse sur la page. Remplacement, dans le bloc « Prendre part au projet » l.203, avant les équations :

« Une part sociale, c'est un morceau de la coopérative qui va rénover la ferme et la faire vivre. »

Sur `part-sociale.html` l.68, « à la clôture de l'exercice » se dit en français dans la phrase du remboursement :

« Le remboursement porte sur ce que vous avez versé, diminué des pertes que la coopérative aurait faites cette année-là. »

Pour « emphytéotique » : le mot n'est utile à personne sur la home. `accueil.html` l.131 devient « signature de la promesse de bail de 99 ans », et le mot reste sur `/les-medias/` où il est dans un titre de presse, et sur `/cgv-parts-sociales/` où il est à sa place.

---

# La cohérence entre les pages

Huit rédacteurs, et cela se voit. Les écarts, classés.

**Contradictions franches, une page dément une autre.**

1. Copropriétaire du lieu (3 pages) contre « la coopérative ne sera jamais propriétaire des murs » (`le-modele-economique` l.138). Voir B1.
2. Paiement par carte (`part-sociale` l.151) contre « aucun paiement » (`prendre-part` l.17) et « la souscription en ligne n'est pas encore ouverte » (`politique` l.186). Voir B2.
3. Vote à égalité avec les associations (`lequipe` l.89) contre la pondération 35/35/20/10 (`lequipe` l.119, `cgv` l.219 à l.250). Voir B3.
4. Cinq espaces loués et payant loyer (`le-modele-economique` l.115 à l.124) contre trois espaces qui « attendent la structure qui les fera vivre » (`lequipe` l.73). Voir M7.
5. Plateforme de dons inconnue (`politique` l.181) contre HelloAsso nommée et liée (`soutenir` l.91). Voir M12.

**Même chose dite autrement, sans que la différence soit expliquée.**

6. 120 000 € (`accueil` l.138) contre 88 900 € (`soutenir` l.47). Voir M5.
7. Quatre jeux de noms pour les cinq espaces. Voir M7.
8. Trois graphies du siège social. Voir Mi3.
9. « appel à projets (AMI) », « appel à manifestation d'intérêt », « l'appel Amirale ». Voir Mi2.
10. Libellés de navigation contre libellés de pied. Voir Mi12.

**Promesse faite ici, absente là.**

11. Le doublement des dons jusqu'au 22/09, sur la home, absent de la page de don. Voir M11.
12. « Vous recevrez une invitation après votre souscription » (`accueil` l.235 et `lequipe` l.133), absent de `/part-sociale/` et de `/prendre-part/`, c'est-à-dire des deux pages où la question se pose.
13. La description de `/part-sociale/` promet « ce qu'elle vous donne », la page ne le dit jamais. Voir M4.

**Formulation imposée respectée cinq fois sur six.**

14. La promesse de bail : formulation exacte sur `/part-sociale/`, `/le-projet-architectural/`, `/le-modele-economique/`, `/lequipe-projet/`, `/contacts/` et `/les-medias/`. Présent affirmatif sur `/accueil/` seulement. Voir M14.

**Ce qui est cohérent, et qui mérite d'être dit.**

La phrase du remboursement est reprise au mot près sur sept pages, sans une variation. « Une personne, une voix » est employée partout avec la même restriction « quel que soit le nombre de parts ». « 100 € » ne varie jamais. La déduction de 66 % n'est jamais rattachée à la part, sur aucune des onze pages. Le mot « acheter » n'apparaît nulle part, et `cgv` l.17 le refuse explicitement. C'est un niveau de discipline qu'on voit rarement sur un site écrit à huit mains.

---

# Le parcours de conversion

## Le visiteur décidé : accueil, part sociale, prendre part

Marche 1, l'envie. Tenue. La jauge, le visuel du lieu rénové, la phrase de mission. Il descend.

Marche 3, la compréhension. Il clique « C'est quoi, une part sociale ? ». Il tombe sur la meilleure ouverture du site, et sur « copropriétaire du lieu ». Il n'est pas gêné, il est content. Cinquante mots plus loin il lit que les murs restent à la Ville. Trois lecteurs sur quatre ne relèvent pas. Le quatrième relève, et c'est celui qui allait prendre dix parts.

Marche 4, la réassurance. Tenue, et bien tenue. « Votre argent reste le vôtre » arrive en position 3, comme le veut la direction, et non en fin de page. Le bloc « Ce que ce n'est pas » est au bon endroit. Ce qui manque à cet endroit précis : ce qu'il gagne. Il vient de lire trois dénégations d'affilée, et rien en face.

Marche 5, le geste. Il clique « Je prends ma part ». Il arrive sur une page qui s'appelle « Devenir coopérateur·ice » et qui lui dit qu'il ne prend rien du tout, qu'il déclare une intention. Deuxième décrochage, et celui-là est mesurable. Puis, au mot 98, un crochet `[À SOURCER]`. Puis, au milieu du formulaire l.138, la ligne « Tant qu'il manque, ce formulaire n'aboutit nulle part ».

Il décroche là. Pas à cause du formulaire cassé, qui est un fait technique et qui sera réparé. À cause de l'enchaînement : le bouton promet un geste, la page annonce une déclaration, la déclaration annonce qu'elle ne part nulle part. Trois désaveux en trente secondes sur la page qui devait exécuter.

Ce qui manque au moment où il se pose la question : au moment de cliquer, il ne sait toujours pas ce qu'il obtient en échange de ses 100 €, et au moment de remplir, il ne sait pas quand on lui répond.

## Le visiteur sceptique : accueil, le lieu, l'équipe, les médias

Marche 1, l'envie. Il clique « Le lieu ». C'est la meilleure page du site pour ce visiteur : le bâtiment vide, sombre, la charpente, la coupe des cinq espaces, la rue intérieure, et l'aveu l.167 « Tout n'est pas arrêté pour autant ». Elle donne exactement ce qu'un sceptique cherche, du concret et une limite avouée. Il monte.

Marche 2, la confiance, premier temps. Il clique « L'équipe ». Il lit « Celles qui ont lancé le projet », puis « photo à venir » quatre fois, et trois fois « [À SOURCER : prénom, fonction et une ligne] ».

Il décroche là. Et il décroche plus fort qu'un lecteur ordinaire, parce que sa question était précisément « qui sont ces gens » et que la réponse est « nous ne savons pas le dire ».

Marche 2, deuxième temps, s'il ne décroche pas. « Les médias » le rattrape entièrement. Quatre médias, six parutions datées et signées, la délibération citée par son numéro, l'immatriculation, et « Les deux pièces sont publiques ». C'est la page la plus convaincante du site pour un sceptique, et elle est en cinquième position dans la navigation.

Ce qui manque au moment où il se pose la question : un visage, un prénom, une phrase de quelqu'un. `/les-medias/` prouve que des tiers ont regardé le projet, `/lequipe-projet/` devait prouver que des personnes le portent, et c'est elle qui manque.

Correction de parcours, indépendante du contenu : tant que `/lequipe-projet/` est dans cet état, le lien qui y mène depuis la page d'accueil l.85, « Découvrir l'équipe et les exploitantes du lieu », envoie le sceptique dans le mur. Le faire pointer vers `/les-medias/` en attendant coûte une ligne et sauve le parcours.

---

# Les six objections d'un lecteur qui hésite

| Objection | Traitée | Où | Assez tôt |
|---|---|---|---|
| Est-ce que je récupère mon argent | oui, très bien | `part-sociale` l.67, en position 3 sur la page, et sur six autres pages | oui |
| Est-ce que ça se fait vraiment | oui, en partie | 99 ans, immatriculation, appel Amirale, presse, permis déposé | oui |
| Qui sont ces gens | non | `/lequipe-projet/` échoue à sa fonction | sans objet |
| À quoi sert mon argent | oui | `part-sociale` l.126, `le-modele-economique` l.98 | oui, mais les deux phrases se contredisent (M15) |
| Qu'est-ce que je gagne | non | trois dénégations, aucune contrepartie nommée | sans objet |
| Et si ça rate | en partie | `part-sociale` l.175, `cgv` partie 5 | oui, mais le permis n'est jamais traité |

Détail sur les deux non et le en partie.

**« Qu'est-ce que je gagne » n'est traité nulle part sur la page qui doit le traiter.** Voir M4. C'est, avec le point suivant, la plus grosse perte de souscriptions du site.

**« Et si ça rate » est traité au niveau du risque financier, jamais au niveau du scénario réel.** `part-sociale` l.175 dit « Vous pouvez perdre le montant de vos parts si le projet échoue ». C'est vrai, c'est bien écrit, et cela ne répond pas à la question que le lecteur se pose vraiment, qui est « qu'est-ce qui pourrait faire échouer le projet ». Le site lui a donné le nom du risque trois fois : le permis. Voir le point de vigilance ci-dessous.

**« Est-ce que ça se fait vraiment » a un trou net : la date d'ouverture.** Recherche sur les onze pages : aucune ne dit quand le lieu ouvre. La frise s'arrête à « Été 2027, début des travaux ». Sur un projet de lieu, « quand est-ce que ça ouvre » est dans les trois premières questions de tout le monde, et le site n'a pas la réponse. Ce n'est pas de la rédaction : la date dépend de BASA et du planning de chantier. Voir la section « ce qui manque ».

---

# La voix

Registre R4 attendu, `voice-dna.md`. Contrôle mécanique sur les onze pages, commentaires HTML exclus.

| Contrôle | Résultat |
|---|---|
| Tiret cadratin | 0 |
| Tiret demi-cadratin hors date | 0 |
| Point d'exclamation | 0 |
| « je » ou « moi » hors libellé de bouton | 0 |
| Tutoiement | 0, vouvoiement tenu sur onze pages |
| Lexique `never-say.md` (écosystème, il convient, par ailleurs, du coup, en parallèle, néanmoins, authentique, clé en main) | 0 |
| Lexique de cabinet `phrase.md` §1.14 (levier, enjeu, structurant, démarche, dynamique, au cœur de, mettre en place) | 0 dans le corps de texte, 1 dans un marqueur interne |
| Flatterie du lecteur | 0 |
| « sans vous le projet ne verra pas le jour » | 0 |
| Statistique de violences faites aux femmes en unité de compte | 0 |
| « acheter » une part | 0, et `cgv` l.17 le refuse explicitement |
| « placement », « rendement », « épargne », « investissement rentable » | 1, `part-sociale` l.99, en dénégation. Voir point de vigilance |
| Virgule avant « et » | 1, `lequipe` l.3 |
| Aveu de limite après l'enthousiasme | présent sur 9 pages sur 11 |

Les aveux de limite, relevés, parce qu'ils sont la signature du registre et qu'ils sont bien faits :

`part-sociale` l.90, « Une part sociale ne fait pas tout. Autant le dire maintenant. »
`part-sociale` l.176, « nous ne l'écrivons pas plus petit qu'il n'est. »
`le-projet-architectural` l.27, « Le résultat est un peu rude. »
`le-projet-architectural` l.167, « Un arbitrage de coût déplacera sans doute encore une ligne. »
`le-modele-economique` l.123, « Il n'y a pas d'autre recette. »
`le-modele-economique` l.125, « L'équilibre ne tient que si les espaces trouvent leurs occupantes. »
`lequipe-projet` l.166, « Rénover ce bâtiment demande des métiers que le collectif n'a pas. »
`les-medias` l.136, « On répond, parfois avec un peu de retard. »
`contacts` l.115, « Il n'y a donc ni bureau, ni accueil, ni permanence. »

Deux pages n'en portent pas : `/accueil/` et `/soutenir/`. Sur la home, gelée, je ne propose rien. Sur `/soutenir/`, la seule phrase qui pourrait en tenir lieu est l.132, « Venir nous rencontrer, sans rien promettre », et elle vise le lecteur, pas le projet. Une ligne suffirait, après l.57 :

« Nous n'y sommes pas encore, et c'est pour cela que cette page existe. »

Sur la construction de phrase, `phrase.md` : la seule infraction est la construction « Ce n'est pas X » employée trois fois en libellés sur `part-sociale` l.95, l.99 et l.103. Elle est prescrite par `intentions.md` et interdite par `phrase.md` §1.6. Voir le point de vigilance, où je tranche.

---

# Les deux points de vigilance

## 1. Ce que la page répond si le permis de construire est refusé

**Faut-il y répondre : oui.**

Trois raisons, dans l'ordre où elles pèsent.

Le site pose la question lui-même, trois fois, et ne la referme jamais. `accueil` l.152 « dépôt du permis de construire », `le-modele-economique` l.64 « pendant que le permis s'instruit », `soutenir` l.87 « le dépôt du permis de construire ». Un lecteur prudent qui vient de lire « qu'est-ce que je risque » et à qui on a dit trois fois qu'un permis est en cours pose la question dans la seconde. Une question posée par la page et laissée ouverte par la page, le lecteur y répond seul, et sa réponse est toujours plus noire que la vraie.

C'est la question que la presse posera, et il vaut mieux que la réponse soit écrite avant qu'on la demande. À Annecy, sur un bâtiment patrimonial, un refus ou un recours de tiers est un scénario que les lecteurs locaux ont déjà vu ailleurs.

Et c'est la seule objection concrète qui manque à un dispositif de réassurance par ailleurs complet. `part-sociale` traite le risque en général, `cgv` partie 5 le traite article par article. Il manque le risque nommé.

**Où : dans « Vos questions », en pli, sur `/part-sociale/`.** Pas dans le flux principal. Le lecteur qui se pose la question ouvre, les autres passent, ce qui est exactement la fonction de la section.

**Ce qu'on peut dire sans engager ce qu'on ne sait pas.** Trois faits, tous déjà vrais et tous déjà publiés ailleurs sur le site : l'instruction est en cours, la phrase du remboursement ne dépend pas de son issue, et les conditions de souscription disent ce qui revient aux associé·es si la coopérative s'arrête (`cgv` l.313).

Rédaction proposée, à insérer après la question « Qu'est-ce que je risque ? » l.179 :

« Et si le permis de construire est refusé ?
Le permis a été déposé en septembre 2026 et il s'instruit. Un refus est possible, comme sur tout projet de rénovation d'un bâtiment ancien, et nous ne l'écrivons pas autrement. Ce qu'il faudrait reprendre pour redéposer dépendrait des motifs du refus, alors nous ne le devinons pas ici.
Deux choses ne dépendent pas de cette instruction. Vous pouvez demander le remboursement de vos parts à tout moment, y compris ce jour-là. Et si la coopérative devait s'arrêter, les conditions de souscription disent article par article ce qui revient aux associé·es. »

Puis le lien existant vers `/cgv-parts-sociales/#risque`.

**Ce qu'il ne faut surtout pas écrire**, et que je n'ai pas écrit : que le refus est peu probable, que la Ville soutiendrait un nouveau dépôt, qu'un calendrier de repli existe, ou que l'argent serait intégralement rendu. Les quatre engagent ce que personne ne sait aujourd'hui, et le quatrième est contredit par `cgv` l.277.

**Ce qui reste un arbitrage du collectif et de son avocate**, et que je ne comble pas : faut-il dire un mot du sort des sommes déjà engagées dans les études au jour d'un refus. C'est la seule partie de la réponse qui touche à des faits comptables et à une qualification juridique. Je la laisse ouverte, et la rédaction ci-dessus fonctionne sans elle.

## 2. « Ce n'est pas un placement », le mot interdit employé en dénégation

**Mon avis : non, ce n'est pas le bon choix, et la section doit rester.**

Trois raisons, professionnelles et pas doctrinales.

La dénégation installe la catégorie qu'elle refuse. « Ce n'est pas un placement » demande au lecteur de convoquer l'idée de placement, puis de la soustraire. En trente secondes, la soustraction est ce qui se perd, et le mot est ce qui reste. C'est le mécanisme le mieux documenté en communication de campagne, et c'est aussi pourquoi un interdit de campagne n'est pas levé par une négation.

La liste des interdits n'existe pas pour empêcher une affirmation, elle existe pour que le mot n'apparaisse jamais à côté du nom du projet. Or il n'apparaît pas seulement dans la phrase : il apparaît dans la capture d'écran, dans l'extrait de recherche, dans le copier-coller d'un journaliste, dans le titre de section quand un lecteur pressé ne lit que les gras. « La Maison Audacieuse : ce n'est pas un placement » est un titre qui s'écrit tout seul contre vous. La négation ne protège rien de tout cela.

Enfin, la dénégation dit moins que le fait. « Ce n'est pas un placement » est une catégorie. « Une part ne rapporte rien » est un fait, il est plus court, plus dur, et il fait davantage pour la confiance, ce qui est précisément le but de la section.

`phrase.md` §1.6 va dans le même sens et interdit la construction « ce n'est pas X » indépendamment du mot choisi. `intentions.md` prescrit l'inverse, en toutes lettres : « Ni un don, ni un placement, ni une action. » Les deux documents de direction se contredisent, et c'est `intentions.md` qui a tort sur ce point précis.

**Ce que je garde :** la section, sa position 4 dans la page, son titre d'aveu, sa phrase d'entrée « Autant le dire maintenant », et les trois items. C'est une bonne section, bien placée, qui fait son travail.

**Ce que je change :** le libellé de chaque item, qui passe de la catégorie au fait. Le corps de chaque item est déjà écrit et ne bouge pas.

Remplacement pour `part-sociale.html` l.89 à l.106 :

« Ce qu'une part ne fait pas
Une part sociale ne fait pas tout. Autant le dire maintenant.

Elle ne remplace pas un don.
Un don est donné pour de bon. Il ouvre une déduction fiscale de 66 %. Une part, elle, reste à vous et son remboursement se demande.

Elle ne rapporte rien.
Une part ne produit aucun intérêt et elle ne prend pas de valeur. Au remboursement, elle vaut au mieux ce que vous avez versé.

Elle n'enrichit personne.
Les excédents restent dans la coopérative et ne sont distribués à personne, ni pendant sa vie ni à sa fin. »

Le mot interdit disparaît, la construction bannie disparaît, la section garde sa force, et le troisième item gagne au change : « ce n'est pas une action » supposait que le lecteur sache ce qu'est une action, « elle n'enrichit personne » ne suppose rien.

---

# Tableau page par page

| Page | Mots | Les cent premiers mots, en une ligne | Termes non expliqués | Chiffres publiés |
|---|---|---|---|---|
| `/` | 748 | Belle envie, aucune offre : ni le prix, ni ce qu'est une part, ni ce qu'on demande | part sociale, coopérateur·ice, capital, emphytéotique | 17 dont 1 hors référentiel (124) |
| `/part-sociale/` | 884 | La meilleure ouverture du site, et elle se contredit en cinquante mots | collège, associé·e, excédents, clôture de l'exercice, ESUS | 4, tous autorisés |
| `/prendre-part/` | 458 | Dit le prix, le parcours et « rien à payer », puis pose un crochet au mot 98 | associé·e | 1, autorisé |
| `/le-projet-architectural/` | 711 | Le siècle, le vide, le bail, ce que le lieu devient : elle fait voir | maîtrise d'œuvre, second œuvre, biosourcés | 4, tous autorisés |
| `/le-modele-economique/` | 586 | Le mécanisme en trois phrases, sans chiffre à diviser : la meilleure page de pédagogie | capital, plus-value, fonds propres (glosé) | 7, tous autorisés, plus « millions d'euros » |
| `/lequipe-projet/` | 669 | Quatre cadres vides et trois crochets là où le lecteur cherche des visages | collège, associé·e, maîtrise d'usage, capital variable | 10 dont 4 hors périmètre de la page (35/35/20/10) |
| `/les-medias/` | 570 | Quatre médias, la période, France 3 : la preuve sociale en cinq secondes | emphytéotique, fonds propres | 15, tous autorisés |
| `/contacts/` | 373 | L'adresse, qui relève la boîte, et un crochet pile sur la promesse de délai | aucun | 3, tous autorisés |
| `/soutenir/` | 393 | Efficace et chiffrée, elle porte deux des trois erreurs de fond du site | copropriétaire, assemblée générale | 5, tous autorisés, 1 en écart avec la home |
| `/cgv-parts-sociales/` | 3 474 | Ce qui fait foi, les statuts priment, « une part ne s'achète pas » : exemplaire | sociétariat, nominal, nantissement, démembrement, usufruitier | environ 20 hors renvois d'articles, dont le SIREN hors référentiel |
| `/politique-...-legales/` | 1 512 | Objet, date de version, sommaire complet : conforme à son genre | RNA, responsable de traitement, sous-traitant | environ 10, dont 2 SIREN et 1 RNA hors référentiel |

---

# Les trois corrections qui rapporteraient le plus de souscriptions

**1. Ajouter à `/part-sociale/` la section « Ce qu'une part vous donne », et réparer le passage vers `/prendre-part/`.**
C'est le même euro qui se perd deux fois. Un lecteur arrive au bouton sans savoir ce qu'il obtient, et il arrive sur la page d'action en croyant finir alors qu'il commence. Les deux correctifs sont écrits ci-dessus (M4 et M13), ils font ensemble une quinzaine de lignes, et ils portent sur les deux pages que traversent 100 % des souscripteurs. C'est le meilleur rapport travail sur souscriptions du site.

**2. Mettre la Fête de l'Audace du 19 septembre sur le site, aujourd'hui.**
Onze jours, un lieu, un horaire, une souscription possible sur place, et zéro occurrence sur onze pages. Un événement physique convertit sans commune mesure avec une page, et il donne au site trois semaines de matière ensuite. C'est un bloc de quatre lignes sur quatre pages, écrit ci-dessus (M1). Si une seule chose se fait cette semaine, c'est celle-là.

**3. Réparer `/lequipe-projet/`, en retirant plutôt qu'en comblant.**
La marche « c'est sérieux, ces gens » est celle qui filtre les souscriptions multiples et les gros donateurs. Aujourd'hui la page la fait redescendre. Tant que les portraits ne sont pas là, le paragraphe de remplacement écrit en B4 vaut mieux que quatre cadres vides, et il coûte une minute. Et faire pointer le lien de la home vers `/les-medias/` sauve le parcours du sceptique jusqu'à ce que la matière arrive.

Les correctifs de fiabilité B1, B2 et B3 ne sont pas dans cette liste parce qu'ils ne rapportent pas de souscriptions : ils évitent d'en perdre plus tard, d'un coup, le jour où quelqu'un relève. Ils passent avant les trois ci-dessus dans l'ordre d'urgence, pas dans l'ordre de rendement.

---

# Ce qui manque au site, et qui n'est pas de la rédaction

**De la matière.**

1. Les prénoms, les fonctions et les portraits du collectif fondateur. Demandé depuis le 07/09. Sans eux, `/lequipe-projet/` ne peut pas exister, et c'est une marche entière du parcours.
2. Une photographie du collectif ensemble, sans personne non consentante. Le site n'a aucune image de personne, sur onze pages. Un lieu porté par des femmes, raconté uniquement par des murs vides.
3. Le kit presse comme fichier. `/les-medias/` le décrit l.129 et ne peut pas le donner.
4. Le crédit de l'illustration de la rue intérieure, à demander à Basa (`le-projet-architectural` l.146).
5. Les crédits des photographies héritées de l'ancien site, que la mention Freepik ne suffit pas à identifier (`politique` l.136).
6. La titularité des droits sur les photographies du 7 mars 2025, avant d'en accorder la reprise libre (`les-medias` l.160).
7. L'autorisation de rediffusion du reportage France 3, ou son lien de replay (`les-medias` l.68).

**Des décisions.**

8. Le délai de réponse annoncé. Deux pages l'attendent, c'est une phrase de dix mots à trancher en réunion.
9. La date d'ouverture du lieu, ou à défaut l'année. Absente des onze pages, et c'est la troisième question de tout le monde.
10. Le point d'envoi du formulaire de déclaration, et celui de l'infolettre Brevo. Deux formulaires qui n'aboutissent nulle part, sur les deux pages qui capturent.
11. La qualification du régime de l'offre au public, et la constitution du Conseil Coopératif. Les deux commandent la date d'ouverture de la souscription (B6).
12. Laquelle des deux structures édite le site, qui dirige la publication, et le numéro de téléphone de l'éditeur (B5).
13. Le sort du mot « copropriétaire » dans toute la campagne, pas seulement sur le site. Il est employé ailleurs, la décision doit être prise une fois.
14. Le sort de « Maison de la créativité » comme nom, tant qu'aucune structure ne le porte.
15. Les modalités de remboursement, dont dépend la publication du seuil et du délai, et dont dépend aussi la phrase de mécanisme proposée en M9.

**Des documents.**

16. Les statuts constitutifs signés, publiés et téléchargeables. `cgv` l.35 les annonce comme condition d'ouverture des souscriptions et n'a pas d'adresse à donner.
17. Le règlement intérieur et les trois chartes annexées, dont la signature conditionne l'admission (`cgv` l.133).
18. Le registre des traitements, dont dépendent quatre durées de conservation manquantes dans le tableau de `politique` l.229 à l.250.

**Une donnée du référentiel elle-même.**

19. `chiffres-autorises.md` porte « 88 900 € » comme total de la campagne de dons. Ce chiffre est publié sur `/soutenir/` l.47 et il entre en écart visible avec les 120 000 € de la home, autorisés eux aussi. Le référentiel autorise deux chiffres qui se contredisent aux yeux d'un lecteur, sans imposer la phrase qui les réconcilie. À trancher au niveau du référentiel, pas au niveau des pages.

---

# Une objection sur le document de direction

**Le piège de la division est spécifié page par page, et ce n'est pas ainsi qu'il se referme.**

`intentions.md` écrit, pour `/le-modele-economique/` : « la page ne porte pas à la fois le coût total et la fraction bancaire. Le lecteur divise, et il obtient un montant que le référentiel interdit de publier. » La consigne d'audit reprend la même unité : « Vérifie page par page. »

Les rédacteurs ont obéi, et le résultat est que la règle est tenue sur onze pages et enfreinte par le site. `3,2 millions d'euros` sur `/accueil/` et sur `/les-medias/`. « Une banque ne finance que la moitié » sur `/part-sociale/`, `/le-modele-economique/` et `/soutenir/`. Le lien qui va de la première à la seconde est en pied de la page d'accueil, et il s'appelle « Le projet et son financement ». Un lecteur ne lit pas une page, il lit un site, et il lui faut deux clics et une division pour obtenir 1,6 M€, c'est-à-dire l'ordre de grandeur que `chiffres-autorises.md` interdit tant que l'hypothèse n'est pas figée.

Une règle qui se vérifie fichier par fichier est une règle qu'un site distribué entre huit rédacteurs satisfera toujours sans jamais la respecter. L'unité de la règle doit être celle du lecteur.

Reformulation proposée pour `intentions.md` :

« Le site ne porte pas à la fois le coût total et la fraction bancaire, quelles que soient les pages où ils figurent. Partout où la fraction apparaît, la phrase qui suit nomme les trois sources de l'autre moitié, ce qui rend la division fausse et la referme : "Cette moitié-là se compose de subventions, de mécénat et de nos parts." »

C'est la seule correction qui règle le problème sans retirer ni le 3,2 M€, qui est autorisé et utile à la presse, ni la phrase du levier, qui est validée et qui est le meilleur outil pédagogique du site. Et `/le-modele-economique/` sait déjà le faire, l.52 à l.65 : il suffit de porter ce qu'elle sait aux deux autres pages.

Deux remarques plus courtes sur le même document.

`intentions.md` prescrit « Ni un don, ni un placement, ni une action » quand « placement » est un interdit d'écriture de la campagne et que `phrase.md` §1.6 bannit la construction. Un rédacteur qui suit la direction enfreint la garde, et c'est arrivé. La ligne se corrige, la solution est écrite plus haut.

`intentions.md` fixe des cibles de hauteur en pixels quand son principe fondateur se compte en mots. Un budget en pixels récompense la suppression d'une image autant que la suppression d'un paragraphe, alors que le document demande par ailleurs « une image toutes les deux sections au minimum ». Les deux règles se combattent. La mesure qui sert le lecteur de trente secondes est le nombre de mots avant le premier appel à l'action, pas la hauteur totale de la page.
