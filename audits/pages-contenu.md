# Audit contenu des dix pages du site

Auditeur tiers, aucune de ces pages n'a été écrite par moi. Build de référence : `node build.mjs --sortie .previsu/audit-contenu`, 10 pages, le 07/09/2026 à 18 h 53.

Référentiels : `contenu/pages/chiffres-autorises.md`, `00 Pilotage/voix/voice-dna.md`, `never-say.md`, `phrase.md`, plus les sources du projet qui font foi : `02 Projets/LMA - Maison Audacieuse/CLAUDE.md` et `05 Site web/01 Contenu/2026.08.20 - Copy home validée écran par écran - LMA.md`.

Note de périmètre : un fichier `src/pages/soutenir.html` est apparu à 18 h 57, après le build d'audit. Il n'entre pas dans les dix pages jugées ici. Les cinq liens vers `/soutenir/` sont donc comptés comme morts à l'heure de l'audit, et ils ne tiendront que si cette onzième page est livrée.

## Verdict

Le site tient sur ses pages froides et casse sur ses pages chaudes : les deux mieux notées sont les conditions de souscription et le projet architectural, les deux plus mal notées sont la page d'accueil et la page part sociale, c'est-à-dire les deux qui portent l'argent.

16 Critical, 49 Major, 22 Minor. Score moyen 67 sur 100, de 34 à 86.

Trois familles couvrent la moitié des Critical : des chiffres qui n'ont pas la même valeur d'une page à l'autre, un statut de bail raconté au présent ici et au conditionnel là, et une promesse de copropriété qu'une page du site dément explicitement.

Le parcours de conversion est coupé en deux endroits : les trois boutons « Je prends ma part » de la page d'accueil pointent sur des ancres internes alors que `/prendre-part/` existe, et `/prendre-part/` ne renvoie nulle part aux conditions de souscription.

Un seul veto slop, sur `/lequipe-projet/`. Les autres pages passent, certaines de justesse.

### Barème

Score = 100 moins 10 par Critical, 3 par Major, 1 par Minor. Un veto slop plafonne à 70.

Un marqueur `[À SOURCER]`, `[À TRANCHER]` ou `[À BRANCHER]` correctement posé n'est pas compté comme défaut : c'est le travail demandé. Il est trié plus bas. Est compté comme défaut un fait faux, un fait manquant non marqué, un marqueur périmé, ou un marqueur dont l'énoncé est lui-même faux.

| Page | Score | Critical | Major | Minor | Mots |
|---|---|---|---|---|---|
| `/` | 34 | 4 | 8 | 2 | 739 |
| `/part-sociale/` | 42 | 3 | 8 | 4 | 2 312 |
| `/lequipe-projet/` | 62 | 2 | 5 | 3 | 640 |
| `/prendre-part/` | 63 | 2 | 5 | 2 | 689 |
| `/le-modele-economique/` | 65 | 2 | 4 | 3 | 833 |
| `/politique-de-confidentialite-mentions-legales/` | 73 | 1 | 5 | 2 | 1 412 |
| `/les-medias/` | 80 | 1 | 3 | 1 | 505 |
| `/contacts/` | 83 | 1 | 2 | 1 | 386 |
| `/le-projet-architectural/` | 83 | 0 | 5 | 2 | 985 |
| `/cgv-parts-sociales/` | 86 | 0 | 4 | 2 | 3 244 |

---

# Page par page

## `/` , accueil, 34 sur 100

C'est la page la plus lue de la campagne et la plus abîmée du lot. Sa prose est bonne, presque toute validée écran par écran le 20/08 et retouchée le 04/09. Ce qui casse, c'est l'intégration : des chiffres inventés dans le héros, et trois boutons principaux qui ne mènent nulle part.

**Critical. Le compteur affiche une valeur d'exemple.**
Texte fautif : `<span class="jauge__nombre">124</span>`.
La note 5 du document de copy est explicite : « il ne compte QUE les coopérateur·ices, il part donc de zéro le 07/09 ». Le commentaire HTML de la page le répète et appelle 124 « une valeur d'exemple ». Nous sommes le 07/09. Un chiffre fabriqué sur la métrique de tête d'une levée de fonds est le pire endroit possible pour un placeholder.
À écrire : servir l'état sans compteur, prévu par la copy validée (« avant l'allumage du 07/09, le héros vit sans la ligne compteur, rien d'autre ne bouge »), jusqu'à la première souscription réelle.

**Critical. Le palier est faux, et quatre sources donnent quatre valeurs.**
Textes fautifs : `Premier palier&nbsp;: 670` et `près de <strong>670</strong> ont contribué financièrement`.
`chiffres-autorises.md` : « 650+ … 666 = chiffre exact à figer au 07/09 ». Le CLAUDE.md du projet : « la jauge affichera 666 sur 666 ou 666 sur 1 700 ». Le commentaire HTML de cette même page : « Le 667 est le PALIER ». La copy validée : « plus de 650 ont contribué financièrement ». Le site : 670. Personne n'a arrondi vers le haut par malveillance, mais un chiffre gonflé de quatre unités sur la seule preuve sociale de la page est un défaut de fiabilité sec.
À écrire : `Premier palier : 666` et « plus de 650 ont contribué financièrement », verbatim de la copy validée. Et figer 666 partout aujourd'hui, puisque c'était la date prévue pour le faire.

**Critical. Les trois boutons principaux ne mènent nulle part.**
Textes fautifs : `<a class="bouton bouton--primaire" href="#hero" title="Tunnel /prendre-part/ en construction">Je prends ma part</a>`, et les deux mêmes sur `#prendre-part` et `#agir`.
`/prendre-part/` existe et est construit. Le `title` est un marqueur périmé. Un visiteur qui clique sur le bouton d'appel de la page d'accueil, le jour du lancement, remonte en haut de la page.
À écrire : `href="/prendre-part/"` sur les trois, et retirer les trois attributs `title`.

**Critical. « Maison En-Santé » est un nom écarté le 20/07/2026.**
Texte fautif : `<span class="nom-structure">Maison En-Santé</span>`.
Ce nom a déjà été relevé en Critical dans <../../maison-audacieuse/audits/accueil-copy.md> (« la formulation « en santé » a été écartée le 20/07/2026 », les médecins l'ayant refusée), corrigé, puis vérifié levé (« En-Santé, en santé et variantes : 0 occurrence »). Il revient. La décision du 04/09 autorise à nommer les cinq structures, elle ne réhabilite pas un nom que la partie concernée a refusé, et le document de copy ne liste aucun des cinq noms.
À écrire : « Un pôle santé » sans nom de structure, jusqu'à confirmation écrite auprès des praticiens. Même correction sur `/lequipe-projet/`.

**Major. Le lien vers le modèle économique pointe sur lui-même.**
Texte fautif : `<a class="lien-texte" href="#les-etapes" title="Page « Prochaines étapes et modèle économique » à créer">`.
La page existe. C'est le seul pont éditorial du site vers `/le-modele-economique/`, qui n'est sinon atteignable que par le pied.
À écrire : `href="/le-modele-economique/"`, sans `title`.

**Major. Le titre de l'écran 2 s'écarte de la copy validée.**
Texte fautif : `Un lieu dédié à l'égalité et à la place des femmes`.
Le 04/09, Romain a arbitré sur maquette : « le verbe du titre passe de « repenser » à « élargir » ». Le document de copy porte « aucune phrase ne se reformule ».
À écrire : « Un lieu pour élargir la place des femmes ».

**Major. « chiffré à » durcit un montant qui est un référentiel, pas un coût.**
Texte fautif : `L'ensemble du projet de rénovation est chiffré à 3,2 millions d'euros.`
La copy validée écrit « estimé à ». Le coût réel estimé en interne est de 3,81 M€, et `chiffres-autorises.md` qualifie le 3,2 M€ de « coût du projet, référentiel public ».
À écrire : « estimé à 3,2 millions d'euros », verbatim de la copy.

**Major. Le 120 000 € n'est pas dans le référentiel et contredit une autre page.**
Texte : `120 000 € réunis, dons<br>et mécénat de compétences`.
La formulation est juste et validée (point 1 fermé le 04/09 : 89 445 € HelloAsso plus 30 000 € de mécénat, soit 119 445 €). Le défaut n'est pas ici, il est double : le chiffre est absent de `chiffres-autorises.md` alors que le point 10 du même document exigeait de l'y porter en miroir, et `/le-projet-architectural/` écrit « Les 88 900 € réunis pendant la campagne de dons ».
À faire : garder la page, mettre le référentiel à jour, aligner la page architecture.

**Major. La phrase « chaque euro finance la rénovation » est connue pour être inexacte.**
Texte : `le foncier ne nous coûte rien, chaque euro finance la rénovation`.
La note du 04/09 dit mot pour mot que cette phrase est « inexact à la ligne comptable », et c'est pour cela que la mise en avant graphique a été déplacée sur « La Ville d'Annecy nous confie le bâtiment pour 99 ans ». La phrase est restée, et `/le-modele-economique/` l'amplifie.
À écrire : « le foncier ne nous coûte rien, l'argent réuni va à la rénovation ».

**Major. Le don doublé au 22 septembre est daté, non sourcé et sans date de retrait visible.**
Texte : `Le don reste possible. Chaque don est doublé jusqu'au 22 septembre.`
Décision validée (Petites Pierres), mais absente de `chiffres-autorises.md`, et la tâche de maintenance « retirer la ligne le 23/09 au matin » ne vit que dans le document de copy.
À faire : porter le 22/09 au référentiel et poser la tâche de retrait ailleurs que dans un document de travail.

**Major. « Premier palier » et sa note réintroduisent un bloc retiré par Romain.**
Textes : `Premier palier` et `autant que de participant·es<br>à la campagne de dons`.
La copy validée dit « prochain palier : 1 700 ». Le bloc qui expliquait d'où viennent les paliers (« 667, autant que de donateur·ices ») a été écrit puis « retiré le jour même à la demande de Romain » le 04/09, parce que le sujet n'a pas été travaillé avec le collectif. La note fléchée du héros le fait rentrer par la fenêtre, en miniature.
À écrire : `Prochain palier : 1 700` et retirer la note.

**Major. Lien mort vers `/soutenir/`.**
Texte : `<a class="lien-texte" href="/soutenir/">Je fais un don</a>`.
La cible attendue par le document de copy est l'URL HelloAsso de collecte.

**Minor.** La frise perd « par plus de 650 contributeur·ices », présent dans la copy validée, alors que Romain a explicitement acté que « les chiffres sont un argument de vente » sur cet écran.

**Minor.** `Rénover un bâtiment tel que celui-ci coûte extrêmement cher.` « Extrêmement » est un adverbe de jugement, banni par `phrase.md` §2.2. C'est du verbatim validé : dette assumée, à signaler à la prochaine passe de copy, pas à corriger seul.

**Slop.** Pas de veto. L'écran 7 (trois gestes numérotés) frôle le gabarit, mais les impératifs sont concrets, les flèches manuscrites cassent la symétrie et l'ensemble est validé verbatim.

---

## `/part-sociale/` , 42 sur 100

Page la plus dense et la mieux documentée du site : chaque affirmation porte son article de statuts. C'est aussi celle qui contient les trois affirmations les plus dangereuses du lot, toutes les trois sur l'argent.

**Critical. Promesse de capital garanti.**
Texte fautif : `Une part souscrite 100 € sera remboursée 100 €, jamais davantage.`
La même page, trente lignes plus haut : « Le remboursement porte sur la valeur d'origine des parts, sous déduction des pertes éventuelles constatées à la clôture de l'exercice ». Et `/cgv-parts-sociales/` : « Si la coopérative connaît des pertes, vous pouvez récupérer moins que ce que vous avez versé. Vous pouvez perdre la totalité de votre apport. » La phrase dit le contraire de l'article qu'elle prétend résumer.
À écrire : « Une part souscrite 100 € ne rapporte rien et ne se revalorise jamais. Au remboursement, elle vaut au mieux 100 €, moins les pertes éventuelles de l'exercice (art 15.1). »

**Critical. Promesse de rendement sur un instrument qui n'existe pas.**
Texte fautif : `Il servira un rendement, ce que la part sociale ne fait pas. Il ne la remplacera pas. L'instrument n'est pas choisi à ce jour, donc il n'a ni date ni taux.`
« Rendement » est un mot interdit par le brief. Le CLAUDE.md du projet est plus dur encore : « discours placement réservé aux titres de janvier ». La page annonce en septembre une rémunération sur un titre qu'elle dit dans la phrase suivante ne pas avoir choisi. C'est la définition d'une promesse non tenable.
À écrire : « Un autre instrument est à l'étude pour 2027. Il n'est ni choisi ni chiffré, alors nous n'en disons rien de plus ici. La part sociale, elle, ne rapporte rien : c'est un choix, et il ne changera pas. »

**Critical. Affirmation fiscale catégorique, démentie par la page conditions et par l'instruction en cours.**
Texte fautif : `Ce n'est pas un don défiscalisé.` puis `La part n'allège pas vos impôts.`
`/cgv-parts-sociales/` §12 écrit : « Le traitement fiscal de votre souscription dépend de l'issue de l'instruction et de votre situation personnelle. » Le dossier ESUS a été déposé le 02/09/2026 auprès de la DDETS 74. Le jour où l'agrément tombe, cette phrase devient fausse et tout souscripteur de septembre peut dire qu'on l'a mal informé. Dans l'autre sens, si l'agrément est refusé, la phrase catégorique n'aura rien apporté que le risque.
À écrire : « Une part sociale n'ouvre aujourd'hui aucun avantage fiscal. Nous n'en annonçons aucun tant que l'instruction est en cours. Si cela change, nous l'écrirons ici. »

**Major. « Copropriétaire du lieu », contredit par `/le-modele-economique/`.**
Texte : `Vous devenez copropriétaire du lieu, avec une voix dans les décisions.`
Voir la section contradictions.

**Major. Trois « Ce n'est pas X » d'affilée.**
Textes : `Ce n'est pas un placement.` / `Ce n'est pas immédiatement disponible.` / `Ce n'est pas un don défiscalisé.`
`phrase.md` §1.6 : « Jamais « ce n'est pas X, c'est Y », ni « plutôt que X ». Dire Y. » Trois fois de suite, en gras, c'est la construction la plus reconnaissable de l'écriture générée. Le marqueur `[À TRANCHER]` de la section ne porte que sur le mot « placement » et propose déjà la bonne forme.
À écrire, sur le modèle de la version de repli déjà rédigée : « Les parts ne rapportent pas d'intérêts, c'est un choix : ici, l'argent sert le projet, pas la rente. » / « Il n'existe pas de marché de ces parts. On ne les revend pas, on en demande le remboursement. » / « La part n'ouvre aujourd'hui aucun avantage fiscal. »

**Major. Un lien « Lire les statuts » qui renvoie sur la section où l'on est.**
Texte : `<a class="lien-texte" href="#gouvernance">Lire les statuts de La Coop Audacieuse</a>`.
Le marqueur juste en dessous dit que l'URL du PDF n'existe pas. Un lien mort explicite vaut mieux qu'un lien qui tourne en rond : le lecteur institutionnel clique, ne trouve rien, et conclut que les statuts ne sont pas publics.
À écrire : retirer le lien, garder le marqueur, et écrire la ligne honnête : « Les statuts ne sont pas encore en ligne. Écrivez-nous, nous vous les envoyons. »

**Major. Deux poids, deux mesures dans l'auto-application du référentiel.**
La page marque `[À SOURCER : le délai de trente jours de l'article 12 ne figure pas dans chiffres-autorises.md]` et publie sans marqueur `Le premier exercice de la coopérative se clôt le 31 décembre 2027`, qui n'y figure pas davantage. Or `/cgv-parts-sociales/` publie le délai de trente jours deux fois, sans marqueur. Une page retient ce que l'autre publie.

**Major. Un marqueur dont l'énoncé est faux.**
Texte fautif : `La pondération ne figure pas non plus en ligne propre dans chiffres-autorises.md.`
Elle y figure : ligne « une personne = une voix », colonne Source, « statuts (4 collèges pondérés 35/35/20/10) ». Et `/cgv-parts-sociales/` publie la table complète, collège par collège. Le trou est déjà bouché ailleurs sur le même site.

**Major. Le statut du don est illisible.**
Textes : `Le don, lui, est déductible à 66 % de vos impôts. Il reste possible en complément d'une part.` et, en marqueur, `URL HelloAsso de la campagne de dons en cours`.
`chiffres-autorises.md` dit « campagne close le 23/04/2026 ». Le CLAUDE.md dit « HelloAsso reste ouvert jusqu'aux travaux ». Le lecteur, lui, lit « campagne en cours » sur une page et « campagne close » nulle part, avec un lien mort au bout.

**Major. Lien mort vers `/soutenir/`.**

**Major. Le nom de l'avocate du projet part en production.**
Quatre marqueurs portent « Ana Etcheverry » (la graphie exacte est Ana Etcheverry-Ezcurra, Finavocat). Un marqueur oublié publie le nom d'un prestataire juridique sur une page de campagne.

**Minor.** Quatre occurrences de la racine « copropri- » sur la page, contre une limite de trois posée par l'audit précédent de la copy.

**Minor.** Une quinzaine d'occurrences de « la part » seule, contre la règle de vocabulaire actée pour tout le site : « on écrit toujours « la part sociale », jamais « la part » seule. Seule exception, le bouton « Je prends ma part ». » Les titres `Ce que la part vous donne` et `Ce que la part n'est pas` sont les plus visibles.

**Minor.** 2 312 mots et 16 marqueurs visibles sur une page dont le rôle est de lever des objections avant paiement.

**Minor.** La FAQ est ouverte en entier (`<details open>` sur les dix questions), ce qui annule l'intérêt de l'accordéon et allonge la page d'autant.

**Slop.** Pas de veto, de justesse. La section « Ce que la part n'est pas » a la forme exacte du gabarit (trois items symétriques, trois négations, trois gras), mais les trois objections sont réellement distinctes et chacune porte son article.

---

## `/prendre-part/` , 63 sur 100

La page est honnête, bien écrite, et sa pédagogie du parcours (« Ce qui se passe, du début à la fin », avec le point de non-retour nommé) est la meilleure idée du site. Elle a deux trous béants au niveau juridique.

**Critical. La page de souscription ne renvoie jamais aux conditions de souscription.**
`/cgv-parts-sociales/` n'est atteignable que depuis le pied de page. La case de consentement ne cite que la politique de confidentialité. On demande à quelqu'un de déclarer une intention de souscrire au capital d'une société sans jamais lui mettre sous les yeux le document qui dit à quoi il s'engage.
À écrire, sous le bouton : « En déclarant votre intention, vous prenez connaissance des <a href="/cgv-parts-sociales/">conditions de souscription des parts sociales</a>. »

**Critical. Le consentement renvoie à un texte qui dit que le traitement n'existe pas.**
Texte : `J'accepte que La Coop Audacieuse enregistre ces informations pour traiter ma déclaration` puis `La durée de conservation et vos droits sont détaillés sur la page confidentialité et mentions légales.`
Cette page écrit : « La souscription en ligne de parts sociales n'est pas encore ouverte », et son tableau des durées ne porte que la ligne « Souscription de parts sociales, à venir ». Aucune ligne ne décrit la déclaration d'intention, qui collecte pourtant nom, prénom, courriel, nombre de parts envisagé et un message libre, dès aujourd'hui.
À faire : ajouter une ligne « Déclaration d'intention de souscription » au tableau de la politique de confidentialité, avec finalité, base légale et durée, avant toute mise en ligne.

**Major. Le seul geste de la page ne fait rien, et il n'a pas de repli.**
Texte : `action="[À BRANCHER : traitement de la déclaration]"`.
Le trou est correctement nommé. Ce qui ne l'est pas, c'est l'absence de solution de repli : aucun `mailto:` de secours, aucune phrase du type « le formulaire ouvre le 8 septembre, en attendant écrivez-nous ». Le jour du lancement, la page de conversion perd tout le monde en silence.

**Major. « Copropriétaire du lieu ».**
Texte : `Vous devenez copropriétaire du lieu avec les autres coopérateur·ices.` Voir contradictions.

**Major. Le bail dit au présent.**
Texte : `Elle fait de vous associé·e de la coopérative à qui la Ville d'Annecy confie la Ferme de Novel.`
Seule la promesse de bail est signée (mars 2026), le bail se signe après le permis. Sur la page qui demande l'argent, le présent de l'indicatif sur ce point précis est le plus coûteux.
À écrire : « à qui la Ville d'Annecy va confier la Ferme de Novel pour 99 ans ».

**Major. Aucune échéance.**
`/le-modele-economique/` annonce « Jusqu'au 31 décembre 2026 : la campagne se ferme à cette date ». La page de souscription ne le dit pas. Le seul argument d'urgence de la campagne est absent de la page qui convertit.

**Major. Lien mort vers `/soutenir/`.**
Texte : `Le don reste ouvert de son côté. <a class="lien-doux" href="/soutenir/">Faire un don</a>`.

**Minor.** « Une part vaut 100 € » trois fois, contre la règle « toujours la part sociale ».

**Minor.** Le calcul du montant total ne s'affiche que si le script tourne, ce que la page assume, mais aucun montant n'apparaît alors nulle part pour qui déclare dix parts.

**À garder tel quel.** `Nos courriels partent tous de maison-audacieuse.fr. Si un message vous demande de virer sur un autre compte, écrivez-nous à contact@maison-audacieuse.fr avant de le faire.` C'est la meilleure phrase du site : utile, concrète, et elle protège des gens.

**Slop.** Pas de veto.

---

## `/lequipe-projet/` , 62 sur 100, VETO SLOP

**Veto slop, section « Celles qui feront vivre le lieu ».** Le déclencheur est l'intro : `Aucune de ces structures n'est née pour l'occasion. Elles accueillent, soignent et animent déjà à Annecy.` Une énumération ternaire de qualités, sans preuve, et fausse pour au moins deux des cinq items de la liste qu'elle introduit. Elle est suivie d'un registre de cinq lignes de même forme, puis, plus bas, d'un second registre de cinq lignes de même forme (rôle, nom, une phrase). Deux blocs de même gabarit d'affilée sur une page de 640 mots : c'est le signal.
À écrire : « Ostara accueille déjà les femmes victimes de violences à Annecy. Le Café des Audacieuses ouvrira avec le lieu. Le béguinage et la maison de la créativité restent à constituer. » Puis la liste, sans phrase de chapeau.

**Critical. « Maison En-Santé », deuxième occurrence sur le site.**
Texte fautif : `<dt>Maison En-Santé</dt>`. Voir la page d'accueil. Le vault ne connaît qu'une « Maison de santé : 6 praticiens conventionnés, structure d'exercice non arrêtée, SISA recommandée plutôt que SCM ». Nommer une structure d'exercice qui n'est pas arrêtée, sous un nom que les praticiens ont refusé, sur la page qui présente l'équipe.
À écrire : `<dt>Le pôle santé</dt>` avec la description existante, et un `[À SOURCER : la structure d'exercice du pôle santé, non arrêtée]`.

**Critical. La Cordée est présentée au présent comme partenaire d'accueil, alors qu'elle est remplacée.**
Texte fautif : `La Cordée, espace de coworking annécien, accueille nos rencontres et nos temps de travail.`
Le CLAUDE.md du projet : « Conciergerie des Passerelles (Karine Lamy) : accueil des réunions bénévoles à partir de septembre 2026, en remplacement de La Cordée dont le partenariat est sous tension ». Nous sommes en septembre 2026. La page remercie publiquement un partenaire avec qui la relation est tendue et qui n'accueille plus rien.
À écrire : soit la Conciergerie des Passerelles si le collectif veut la nommer, soit rien du tout. Un partenariat sous tension ne se règle pas sur un site public.

**Major. Une ligne d'équipe publiée sans son rôle, avec deux sociétés dont une n'existe pas dans les sources du projet.**
Texte fautif : `<dt>[À SOURCER : rôle de WeCo et d'Immolocal]</dt><dd>WeCo et Immolocal — Romain Bidot et Philippine Derycke.</dd>`
Le vault écrit « Weco » et « Weco Invest », jamais « WeCo ». Il rattache systématiquement Philippine Derycke à Weco (« Philippine Derycke (Weco, AMO, coordination) »), jamais à Immolocal, qui n'apparaît que dans la légende d'un fichier logo. Et la ligne publie deux noms de personnes et deux marques sans dire ce qu'elles font, sur une page où les fondatrices du collectif sont, elles, `[À SOURCER]`. Le site nomme ses prestataires et tait ses porteuses.
À faire : retirer la ligne jusqu'à ce que le rôle soit tranché, et traiter d'abord le marqueur « les personnes du collectif fondateur ».

**Major. Le bail dit au présent, deux fois.**
Textes : `Elle signe le bail de 99 ans avec la Ville d'Annecy et elle conduit le chantier.` et, dans la fiche, `Le bâtiment : Bail emphytéotique de 99 ans avec la Ville d'Annecy`.
À écrire : « Elle signera le bail de 99 ans avec la Ville d'Annecy, une fois le permis obtenu. » et « Promesse de bail emphytéotique de 99 ans avec la Ville d'Annecy ».

**Major. Ekolea : nom et rôle non sourcés.**
Texte : `<span class="cartouche__nom">Ekolea</span>Le bureau d'études traite la thermique et la performance du bâtiment rénové.`
Le CLAUDE.md du projet écrit « Écoléa (biodiversité) ». Le fichier logo du dépôt s'appelle `pro_ekola.png`. Trois graphies, et un rôle (thermique) qui n'est pas celui que le vault lui attribue (biodiversité).

**Major. Deux bureaux d'études du projet manquent.**
La page annonce « les métiers qui conduisent le chantier ». Orcadis (structure et fluides) et Archipat (patrimoine), tous deux facturants du projet selon les CR de juillet, n'y sont pas. Le bureau de contrôle non plus.

**Major. Lafaye Consulting Group n'est attesté nulle part.**
Le seul écho dans les sources est la légende du logo : « pro_lafaye.png, monogramme LG, à confirmer ». Publier la raison sociale complète d'un partenaire sur cette base est une prise de risque gratuite.

**Minor.** `[À SOURCER : nom de la présidente]` alors que `/politique-de-confidentialite-mentions-legales/`, sur le même site, écrit « Représentée par Morgane Craye, présidente ».

**Minor.** `[À SOURCER : l'intitulé et le poids de chacun des quatre collèges]` alors que `/cgv-parts-sociales/` publie la table complète.

**Minor.** `Une SCIC réunit des associé·es qui n'ont ni le même métier ni le même intérêt dans le projet.` Double négation en « ni … ni », suivie deux lignes plus bas de « Dix parts ne donnent pas dix voix ». Trois négations en quatre phrases.

---

## `/le-modele-economique/` , 65 sur 100

La page a la meilleure idée du lot (expliquer pourquoi les fonds propres viennent en premier, sans jamais afficher un montant de loyer) et elle porte les deux affirmations les plus risquées vis-à-vis des financeurs.

**Critical. Le bail est dit signé.**
Texte fautif : `<span class="fait__quoi">la durée du bail signé avec la Ville d'Annecy</span>`.
Faux. Promesse signée en mars 2026, bail après le permis. `/le-projet-architectural/` et `/les-medias/` le disent correctement, cette page dit l'inverse, et elle le dit dans un bloc de faits chiffrés, c'est-à-dire à l'endroit où le lecteur cherche la preuve.
À écrire : « la durée de la promesse de bail signée avec la Ville d'Annecy ».

**Critical. La page transforme un raccourci de campagne en engagement de politique financière que le plan de financement contredit.**
Texte fautif : `C'est un choix. Nous ne voulons pas qu'une banque finance plus de la moitié de ce lieu, parce qu'un emprunt se rembourse avec des loyers et que les loyers, ici, doivent rester abordables.`
Le référentiel autorise « une banque ne finance que la moitié » et rien d'autre : c'est une description de contrainte bancaire. La page en fait une volonté du collectif. Or le jalon J8 du projet vise « le bouclage du prêt bancaire (60 à 65 % du plan de financement) ». Le site déclare publiquement refuser ce que le montage prévoit de demander, à la banque qui lira cette page.
À écrire : « Une banque ne finance que la moitié d'un lieu comme celui-ci. L'autre moitié se réunit autrement, et c'est ce que fait cette campagne. »

**Major. « Coûte » au lieu de « estimé à ».**
Texte : `Rénover la Ferme de Novel coûte 3,2 millions d'euros.`
Le 3,2 M€ est le budget référentiel public. Le coût réel estimé en interne est de 3,81 M€. « Coûte » est le seul verbe que ce chiffre ne supporte pas, et il ouvre la page qui parle d'argent.
À écrire : « Rénover la Ferme de Novel est estimé à 3,2 millions d'euros. »

**Major. La date de clôture est un engagement que le référentiel ne porte pas et que les autres pages ignorent.**
Texte : `Chaque part réunie d'ici là entre dans les fonds propres. La campagne se ferme à cette date.`
Le 31/12 n'est pas dans `chiffres-autorises.md` (il devait y être porté en miroir, point 10 du document de copy). Ni `/part-sociale/` ni `/prendre-part/` ne le mentionnent. Et « se ferme » est plus dur que ce que dit le projet, qui prévoit des titres participatifs en janvier 2027.
À écrire : « La campagne de parts sociales court jusqu'au 31 décembre 2026. »

**Major. « Les exploitantes se choisissent maintenant » contredit deux autres pages.**
Texte : `L'équilibre ne tient que si les espaces trouvent leurs occupantes. Les exploitantes se choisissent maintenant, avant les travaux.`
La page d'accueil en nomme cinq, `/lequipe-projet/` les décrit une par une. Ou bien la liste est faite, ou bien elle se fait. Les deux lectures ne peuvent pas coexister sur le même site.

**Major. « Chaque euro réuni part dans la rénovation. »**
Amplification d'une phrase que la note de copy du 04/09 qualifie d'« inexact à la ligne comptable ». Ici la page n'a pas l'excuse du verbatim validé : elle l'a réécrite pour la durcir.
À écrire : « Le foncier ne coûte rien à la coopérative, ce qui laisse l'essentiel de l'argent réuni à la rénovation. »

**Minor.** `Trois piliers, pas un seul` et `Le premier pilier, c'est nous` : deux constructions bannies par `phrase.md` (« X, pas Y » et la clivée). À écrire : « Trois piliers » et « Le premier pilier ».

**Minor.** `[À SOURCER : date d'ouverture visée]` en dernier jalon d'une frise. Une frise qui se termine sur un trou laisse le lecteur sur l'incertitude, à l'endroit exact où il cherchait une projection.

**Minor.** La page n'est atteignable depuis le corps d'aucune autre page (le lien de la home pointe sur elle-même). Défaut imputé à la home, signalé ici pour mémoire.

**Slop.** Pas de veto. Les trois cartes des piliers sont réellement asymétriques (deux portent une note, une non), leurs titres sont nominaux et non des infinitifs, et la taxonomie est réelle.

---

## `/politique-de-confidentialite-mentions-legales/` , 73 sur 100

Page sérieuse, bien découpée, avec un tableau de durées et un vrai travail de sourçage juridique. Elle décrit un site qui n'est pas tout à fait celui qui est livré.

**Critical. Le formulaire le plus important du site n'est pas décrit.**
La déclaration d'intention de `/prendre-part/` collecte nom, prénom, courriel, nombre de parts et un message libre, dès la mise en ligne. La page écrit `La souscription en ligne de parts sociales n'est pas encore ouverte` et son tableau ne porte que « Souscription de parts sociales, à venir ». La case de consentement de `/prendre-part/` renvoie ici pour « la durée de conservation et vos droits », qui n'y sont pas.
À écrire : une ligne de tableau « Déclaration d'intention de souscription : nom, prénom, adresse électronique, nombre de parts envisagé, message. Finalité : préparer le bulletin de souscription et recontacter. Base légale : consentement. Durée : [à fixer]. » Et une section courte au-dessus des dons.

**Major. Brevo est décrit au présent comme sous-traitant, alors que rien n'est branché.**
Texte : `L'envoi est assuré par Brevo, sous-traitant au sens de l'article 28 du règlement général sur la protection des données.`
Le formulaire de `/contacts/` porte `action="[À BRANCHER : point d'envoi Brevo]"` et celui de la home est bloqué au submit par `scripts/socle.js`. Une politique de confidentialité qui nomme un sous-traitant qui ne traite rien.

**Major. La page parle d'une page de don qui n'existe pas.**
Texte : `La page de don renvoie vers une plateforme de collecte extérieure.`

**Major. « Le site ne charge aucune police, aucun script et aucune image depuis un serveur tiers » est démenti par `/les-medias/`.**
Cette page pointe vers `https://www.maison-audacieuse.fr/wp-content/uploads/2026/04/215ISG250081.mp4`, hébergé sur un autre hôte que le site servi. La phrase est le meilleur argument de la page, et une seule vidéo la casse.
À faire : rapatrier le fichier dans `/assets/`, ou nuancer la phrase.

**Major. Morgane Craye porte deux qualités différentes sur la même page.**
Textes : `Représentée par Morgane Craye, co-présidente` (association) et `Représentée par Morgane Craye, présidente` (coopérative).
Le vault confirme « présidente de la SCIC ». La co-présidence de l'association n'est attestée nulle part, et un CR du 08/06 dit au contraire que « l'asso fonctionne en collégiale, sans président unique identifié ».

**Major. Trois mentions obligatoires de la LCEN manquent, et la page le sait.**
Directeur de la publication, téléphone de l'éditeur, téléphone de l'hébergeur : trois marqueurs. Correctement nommés, donc pas comptés en défaut d'écriture, mais ils rendent la page non conforme en l'état. Voir les trous bloquants.

**Minor.** `3 impasse des Rochers, 74960 Annecy Cran-Gevrier` pour l'association, `3, impasse des Rochers, 74960 Annecy` pour la coopérative, `3 impasse des Rochers, 74960 Annecy` dans les CGV. Même adresse, trois graphies.

**Minor.** Le tableau des durées porte trois `[À SOURCER]` sur ses trois lignes : c'est le tableau entier qui est vide de sa donnée utile.

**Slop.** Pas de veto.

---

## `/les-medias/` , 80 sur 100

Bonne page, utile, avec un espace presse qui n'existait pas et un bloc « à reprendre tel quel » qui est la formulation la plus juste du site sur le bail. Un problème de fond, juridique.

**Critical. Cinq articles de presse sont republiés intégralement en JPEG sur le serveur du projet.**
Textes : `<a href="/assets/img/article-_05.jpg">`, `article-_04`, `_03`, `_02`, `_01`, soit Le Dauphiné Libéré (trois fois), L'Essor Savoyard et ODS Mag.
La reproduction intégrale d'un article de presse n'entre pas dans l'exception de courte citation. La même page renvoie vers `/politique-de-confidentialite-mentions-legales/`, qui publie une clause de propriété intellectuelle protégeant les contenus du projet. Le site oppose aux autres ce qu'il ne s'applique pas.
À faire : ne garder que le titre, la date, la signature et un lien vers l'article chez l'éditeur. Si aucun lien n'existe, garder le titre et la date seuls, sans image, avec la mention « article paru dans l'édition papier ».

**Major. Un lien vers un fichier hébergé sur l'ancien site WordPress.**
Texte : `<a href="https://www.maison-audacieuse.fr/wp-content/uploads/2026/04/215ISG250081.mp4" rel="noopener">`.
Requête vers un hôte externe, ce que la politique de confidentialité déclare impossible, et lien qui casse à la bascule du site.
À faire : rapatrier le fichier dans `/assets/`, ou pointer vers le replay France 3.

**Major. Les métadonnées de presse ne sont dans aucun référentiel.**
Six titres, six dates, quatre signatures (Muriel Rottier, Jean-Baptiste Serron deux fois, Alexia Bontron), aucune dans `chiffres-autorises.md`. Le commentaire de la page dit qu'elles ont été vérifiées une par une sur les coupures et que deux légendes de la galerie WordPress étaient fausses : c'est du bon travail, mais il n'est tracé nulle part hors de ce commentaire.
À faire : ouvrir une section « parutions » dans `chiffres-autorises.md`, avec la coupure en source.

**Major. « Amirale » vient d'un titre de presse, pas d'une source du projet.**
Textes : `lauréate de l'appel à manifestation d'intérêt Amirale de la Ville d'Annecy` et `L'appel à manifestation d'intérêt Amirale a été attribué par délibération D.CN.2025-134`.
`chiffres-autorises.md` autorise « lauréat AMI Ville d'Annecy 2025 », sans nom de programme. Le nom « Amirale » n'apparaît dans les sources que dans le titre de l'article du Dauphiné du 6 février 2026. Reprendre le nom d'un dispositif municipal d'après un titre de journal, sur la page destinée aux journalistes, est le contraire de ce que cette page cherche à faire.

**Minor.** `France 3 Alpes, journal de 19/20 — 2025` avec `[À SOURCER : date exacte de diffusion]` : une parution sans date sur une page de preuve sociale affaiblit les cinq autres.

**À garder tel quel.** Le bloc `À reprendre tel quel` : « Le bâtiment appartient à la Ville d'Annecy, qui le confie à La Coop Audacieuse, société coopérative d'intérêt collectif, sous promesse de bail emphytéotique de 99 ans. » C'est la seule formulation du site qui soit exacte, complète et courte à la fois. Elle devrait servir de patron aux neuf autres pages.

**Slop.** Pas de veto. Six cartes de même forme, mais elles portent six parutions réelles avec six contenus distincts.

---

## `/contacts/` , 83 sur 100

Page courte, juste, bien pensée : l'aiguillage par objet de courriel, l'aveu « pas encore de bureau où pousser une porte », le champ piège documenté. Un défaut sérieux, sur la seule action monétaire de la page.

**Critical. Le lien « don » mène à un formulaire d'adhésion.**
Texte fautif : `<p>Le don reste possible et il passe par HelloAsso.</p>` avec `href="https://www.helloasso.com/associations/la-maison-audacieuse/adhesions/adhesion-maison-audacieuse/"`.
C'est l'URL d'adhésion à l'association, pas celle de la collecte. L'URL de don relevée dans le document de copy est `https://www.helloasso.com/associations/la-maison-audacieuse/collectes/la-maison-audacieuse`. Un visiteur qui veut donner remplit un bulletin d'adhésion. Et une cotisation d'adhésion ne suit pas le même régime de reçu fiscal que le don à 66 % que `/part-sociale/` annonce deux pages plus loin.
À faire : pointer l'URL de collecte, après vérification qu'elle est à jour, ou retirer le lien.

**Major. Le bail dit au présent, hors de son contexte.**
Texte : `Le lieu est à Annecy, dans le quartier de Novel. La Ville d'Annecy nous confie le bâtiment pour 99 ans.`
Sur la home, cette phrase est validée et vit dans un écran qui explique le foncier. Ici, isolée dans un bloc « où est la ferme », elle n'apporte rien et se lit comme « le bail est signé ».
À écrire : « Le lieu est à Annecy, dans le quartier de Novel. La Ville d'Annecy le confiera à la coopérative pour 99 ans. »

**Major. Un attribut HTML invalide part en production.**
Texte : `action="[À BRANCHER : point d'envoi Brevo]"`. Le trou est nommé, mais il est nommé dans un attribut, pas dans le texte visible : personne ne le verra à la relecture, et le navigateur postera sur une URL relative absurde.
À faire : retirer l'attribut `action` et poser le marqueur en commentaire, comme la page le fait déjà pour le champ piège.

**Minor.** La page contact ne donne pas d'adresse postale, alors que `/cgv-parts-sociales/` et les mentions légales publient « 3 impasse des Rochers, 74960 Annecy ». Le commentaire explique qu'on ne veut pas donner le numéro de rue de la ferme : c'est juste, mais le siège social est déjà public ailleurs sur le site.

**Slop.** Pas de veto. Les six voies ont chacune une destination différente et des libellés nominaux concrets.

---

## `/le-projet-architectural/` , 83 sur 100

La page la mieux écrite du site. Elle explique une contradiction réelle (un café ouvert et des femmes qui viennent se faire soigner sous le même toit) avant de montrer quoi que ce soit, elle nomme ce qui n'est pas arrêté, et sa phrase sur la charpente est la seule ligne du site qui donne envie de voir le bâtiment. Ses défauts sont tous des noms propres et un chiffre.

**Major. Le montant des dons contredit la page d'accueil.**
Texte : `Les 88 900 € réunis pendant la campagne de dons, close en avril 2026, ont lancé les études d'architecture.`
La home écrit « 120 000 € réunis, dons et mécénat de compétences ». Le point 1 du document de copy, fermé le 04/09, arrête le chiffre HelloAsso à 89 445 €. Le 88 900 € de `chiffres-autorises.md` est donc lui-même périmé.
À écrire : « Les 120 000 € réunis en dons et en mécénat de compétences, pendant la campagne close en avril 2026, ont lancé les études d'architecture. »

**Major. « Chiffré à » sur le montant, dans un bloc consacré au chantier.**
Texte : `Date de travail, à confirmer avec la maîtrise d'œuvre. L'ensemble de la rénovation est chiffré à 3,2 millions d'euros.`
La note de copy est explicite : le 3,2 M€ est celui de l'ensemble du projet, « jamais accroché à la seule rénovation ou au seul chantier ». Ici il est accroché à la rénovation, dans le jalon « Été 2027, l'ouverture du chantier ».
À écrire : « L'ensemble du projet est estimé à 3,2 millions d'euros. »

**Major. Ekolea, nom et rôle non sourcés.**
Texte : `Ekolea traite l'énergie et l'environnement`. Le vault écrit « Écoléa (biodiversité) ». Voir `/lequipe-projet/`.

**Major. Lafaye Consulting Group n'est attesté nulle part.**
Texte : `Lafaye Consulting Group l'économie de la construction`.

**Major. Le marqueur de la coupe transversale est périmé.**
Texte : `[À SOURCER : coupe transversale du bâtiment montrant les cinq espaces et la rue intérieure. La version qui existe nomme les structures exploitantes, elle n'est pas publiable tant que la liste n'est pas figée.]`
La condition est tombée le 04/09 : les cinq structures sont nommées sur la page d'accueil, par décision arbitrée sur maquette. Le marqueur bloque la publication d'un visuel pour une raison qui n'existe plus.

**Minor.** `[À SOURCER : crédit de l'illustration]` sur le dessin de la rue intérieure. La page publie l'image et ne sait pas de qui elle est, sur un site qui affiche une clause de propriété intellectuelle.

**Minor.** Aucun lien vers `/le-modele-economique/`, alors que la page parle de coût et de calendrier de financement.

**À garder tel quel.** `Tout n'est pas arrêté pour autant. Les matériaux se choisissent lot par lot, au moment de consulter les entreprises. Un arbitrage de coût peut encore déplacer une ligne.` C'est exactement l'aveu de limite que la voix demande, au bon endroit, sans excuse.

**Slop.** Pas de veto. Les cinq espaces portent chacun une phrase qui n'est pas interchangeable avec les autres (« une entrée qui ne dit pas pourquoi vous venez », « le seul endroit du bâtiment où le bruit est un bon signe »).

---

## `/cgv-parts-sociales/` , 86 sur 100

La meilleure note du site, et de loin la page la plus rigoureuse : quinze articles, chaque affirmation renvoyée à son article de statuts, un encadré de portée en tête, un article « Le risque » qui dit la vérité sans la maquiller. Elle porte vingt marqueurs, tous légitimes, et c'est précisément ce qui lui vaut sa note : elle n'invente rien.

**Major. La chaîne de remboursement obligatoire est placée là où elle se retourne contre la page.**
Texte : `Votre argent reste le vôtre. Vous pouvez demander le remboursement de vos parts à tout moment.` en ouverture de l'article 9, immédiatement suivi de six conditions restrictives et, deux articles plus loin, de « Vous pouvez perdre la totalité de votre apport ».
La formulation est obligatoire et la page a raison de la porter. Mais sur une page de conditions, en attaque d'article, elle se lit comme une accroche que son propre article dément. Sur les pages de campagne elle rassure, ici elle décrédibilise.
À faire : la garder, en la faisant suivre immédiatement de la transition qui l'assume : « Voici les conditions dans lesquelles ce remboursement se demande et se règle. »

**Major. « Une personne, une voix » et « pas plus de cinq voix » se suivent sans transition.**
Textes : `Une personne, une voix.` (article 7, premier paragraphe) et `Outre sa propre voix, aucun sociétaire ne peut posséder plus de cinq voix (article 23.5).` (quatrième paragraphe du même article).
Les deux sont vrais et ne parlent pas de la même chose (voix propre contre mandats reçus). Le lecteur, lui, lit une contradiction en quatre lignes.
À écrire : « Un·e associé·e peut recevoir des mandats d'autres associé·es pour voter à leur place. En comptant sa propre voix, il ou elle ne peut jamais en porter plus de cinq (article 23.5). »

**Major. Une abstention vaut un oui, et la page ne le signale pas.**
Texte : `Une abstention exprimée dans ce formulaire, ou résultant de l'absence d'indication de vote, est assimilée à un vote favorable à l'adoption de la résolution.`
C'est fidèle aux statuts. C'est aussi la règle la plus contestable de la page pour un lecteur attentif, posée entre deux mentions de procédure comme si elle allait de soi. Une page qui informe avant engagement doit la nommer comme telle.
À écrire, en fin de paragraphe : « Autrement dit, ne rien indiquer sur le formulaire revient à voter pour. »

**Major. La page de conditions ne mène pas à la souscription.**
Elle renvoie vers `/part-sociale/` et vers les mentions légales, jamais vers `/prendre-part/`. Le lecteur qui vient de lire quinze articles et qui est convaincu n'a aucun geste à faire.
À faire : ajouter un bloc d'appel final vers `/prendre-part/`, comme toutes les autres pages du site.

**Minor.** `3 impasse des Rochers, 74960 Annecy` ici, `74960 Annecy Cran-Gevrier` en mentions légales.

**Minor.** La page publie sans marqueur le délai de trente jours de l'article 12, la durée de 99 ans de la société et la table des quatre collèges, que `/part-sociale/` retient comme non publiables. Voir contradictions.

**Slop.** Pas de veto.

---

# Contradictions entre pages

Neuf auteurs, un site. Voici les faits qui n'ont pas la même valeur selon la page où on les lit. C'est la partie du rapport à traiter en premier, parce que chacune de ces lignes est trouvable par n'importe quel lecteur en deux clics.

## 1. Le bail est signé ou il ne l'est pas, selon la page

| Page | Texte | Statut |
|---|---|---|
| `/le-modele-economique/` | « la durée du bail signé avec la Ville d'Annecy » | faux |
| `/lequipe-projet/` | « Elle signe le bail de 99 ans avec la Ville d'Annecy » et « Bail emphytéotique de 99 ans avec la Ville d'Annecy » | faux |
| `/prendre-part/` | « la coopérative à qui la Ville d'Annecy confie la Ferme de Novel » | ambigu |
| `/contacts/` | « La Ville d'Annecy nous confie le bâtiment pour 99 ans » | ambigu |
| `/` | « La Ville d'Annecy nous confie le bâtiment pour 99 ans » | ambigu, mais validé verbatim et contextualisé |
| `/le-projet-architectural/` | « La Ville a signé la promesse de bail de 99 ans. Le bail lui-même se signera une fois le permis obtenu. » | exact |
| `/les-medias/` | « sous promesse de bail emphytéotique de 99 ans » | exact |

La formulation de référence existe déjà, c'est celle du bloc presse. Décision à prendre : la home garde sa phrase validée, parce qu'elle vit dans un écran qui explique le foncier ; les quatre autres pages passent à « promesse de bail » ou au futur. Le cas de `/le-modele-economique/` est le seul qui soit franchement faux, dans un bloc de faits chiffrés.

## 2. Vous devenez copropriétaire, mais la coopérative ne sera jamais propriétaire

| Page | Texte |
|---|---|
| `/` | « Devenez coopérateur·ice de la Maison Audacieuse et copropriétaire du lieu avec nous. » |
| `/part-sociale/` | « Vous devenez copropriétaire du lieu, avec une voix dans les décisions. » et, en tableau, « Copropriétaire, avec une voix » |
| `/prendre-part/` | « Vous devenez copropriétaire du lieu avec les autres coopérateur·ices. » |
| `/le-modele-economique/` | « La coopérative ne sera jamais propriétaire des murs. Au terme du bail, le bâtiment et tout ce que nous y aurons construit reviennent à la Ville d'Annecy. » |
| `/part-sociale/` | « La coopérative n'est pas propriétaire des murs, elle en aura l'usage pendant 99 ans » |

« Copropriétaire » est un mot de campagne validé depuis juin, et je ne propose pas de le retirer : il porte le récit et il a été arbitré. Mais aucune page ne réconcilie les deux énoncés, et `/part-sociale/` les porte tous les deux à quinze lignes d'écart. Le lecteur attentif, le journaliste et l'institutionnel trouveront l'écart, et la réponse doit être écrite avant qu'ils la demandent.
À écrire, une fois, sur `/part-sociale/`, et à référencer ailleurs : « Copropriétaire de quoi, exactement. Vous détenez une part du capital de la coopérative, et la coopérative détient l'usage du bâtiment pour 99 ans. Personne ne détient les murs : ils appartiennent à la Ville d'Annecy et lui reviendront. Ce que vous possédez, c'est une voix sur ce qui se décide là pendant un siècle. »

## 3. Deux montants pour la même campagne de dons

`/` : « Avril 2026 : 120 000 € réunis, dons et mécénat de compétences ».
`/le-projet-architectural/` : « Les 88 900 € réunis pendant la campagne de dons, close en avril 2026 ».
`chiffres-autorises.md` : « 88 900 € levés en dons, campagne close le 23/04/2026 ».
Document de copy, point 1 fermé le 04/09 : « 89 445 € sur HelloAsso plus 30 000 € de mécénat de compétences, soit 119 445 € ».
Trois chiffres pour un fait, dont deux publiés et un référentiel périmé.

## 4. Quatre valeurs pour le nombre de donateurs

666 (`chiffres-autorises.md` et CLAUDE.md), 667 (commentaire HTML de la home et document de copy), 670 (texte de la home, deux fois), « plus de 650 » (copy validée et `chiffres-autorises.md`). Aujourd'hui 07/09 était la date prévue pour figer.

## 5. Le don est ouvert, fermé, doublé, et son lien mène ailleurs

`/` : « Le don reste possible. Chaque don est doublé jusqu'au 22 septembre. » vers `/soutenir/`, mort à l'heure de l'audit.
`/part-sociale/` : « Le don, lui, est déductible à 66 % de vos impôts. Il reste possible en complément d'une part. » vers `/soutenir/`, mort, avec un marqueur qui parle de « la campagne de dons en cours ».
`/prendre-part/` : « Le don reste ouvert de son côté. » vers `/soutenir/`, mort.
`/contacts/` : « Le don reste possible et il passe par HelloAsso. » vers une page d'adhésion, pas de collecte.
`/politique-de-confidentialite-mentions-legales/` : « La page de don renvoie vers une plateforme de collecte extérieure », page qui n'existe pas.
`chiffres-autorises.md` : « campagne close le 23/04/2026 ».
Cinq pages parlent du don, aucune ne mène au bon endroit, et le référentiel dit que la campagne est close.

## 6. La fiscalité de la part est tranchée sur une page et ouverte sur l'autre

`/part-sociale/` : « Ce n'est pas un don défiscalisé. La part n'allège pas vos impôts. »
`/cgv-parts-sociales/` : « Aucun avantage fiscal n'est promis ni garanti au titre de la souscription. […] Le traitement fiscal de votre souscription dépend de l'issue de l'instruction et de votre situation personnelle. »
La seconde est juste, la première est une promesse en creux qui se retournera dans les deux sens possibles de l'instruction ESUS.

## 7. Une page retient ce qu'une autre publie

| Fait | `/part-sociale/` | `/cgv-parts-sociales/` |
|---|---|---|
| Table des quatre collèges et pondération | `[À TRANCHER]`, et le marqueur affirme à tort qu'elle n'est pas au référentiel | publiée en entier, A 35 %, B 35 %, C 20 %, D 10 % |
| Délai de trente jours de l'article 12 | `[À SOURCER]` | publié deux fois, sans marqueur |
| Durée de 99 ans de la société (art 5) | `[À SOURCER]` | publiée en toutes lettres |
| Seuil de 5 000 € et délai de 5 ans (art 15) | `[À TRANCHER]`, retenu | `[À TRANCHER]`, retenu |

Les trois premiers doivent basculer du même côté. Le quatrième est correctement retenu des deux côtés, et il doit le rester tant que le Conseil Coopératif n'a pas délibéré.

## 8. Les exploitantes sont choisies ou en cours de choix

`/` nomme cinq structures. `/lequipe-projet/` les décrit une par une. `/le-modele-economique/` écrit « Les exploitantes se choisissent maintenant, avant les travaux ». `/le-projet-architectural/` retient un visuel au motif que « la liste n'est pas figée ». Quatre pages, trois positions.

## 9. Le site ne charge rien d'externe, sauf une vidéo

`/politique-de-confidentialite-mentions-legales/` : « Le site ne charge aucune police, aucun script et aucune image depuis un serveur tiers. »
`/les-medias/` : lien vers un `.mp4` sur `www.maison-audacieuse.fr`.

## 10. La campagne se ferme le 31 décembre, ou pas

`/le-modele-economique/` : « La campagne se ferme à cette date. »
`/` : « Jusqu'au 31 décembre : souscription du plus grand nombre possible de coopérateur·ices. »
`/part-sociale/` et `/prendre-part/` : rien. La page qui convertit ne connaît pas l'échéance de la campagne.

## Trous de parcours

- Les trois boutons « Je prends ma part » de la page d'accueil pointent sur des ancres internes. C'est la seule page qui reçoive le trafic de campagne.
- `/le-modele-economique/` n'a aucun lien entrant depuis le corps d'une autre page, et n'est pas dans la navigation. Le seul lien prévu, sur la home, pointe sur lui-même.
- `/cgv-parts-sociales/` n'a qu'un lien entrant hors pied de page, depuis les mentions légales. Ni `/part-sociale/` ni `/prendre-part/` n'y mènent, et elle-même ne mène pas à `/prendre-part/`.
- La Fête de l'Audace du 19 septembre, désignée par le plan de campagne comme « le premier événement de conversion avec souscription sur place », n'existe sur aucune des dix pages. Le retrait de la home est une décision assumée du 04/09 (« elle vit en actualité, pas en écran de conversion »), mais l'actualité en question n'existe pas non plus. Douze jours après le lancement, le site ne saura pas où envoyer les gens.
- Une question soulevée et jamais répondue : `/part-sociale/` marque `[À TRANCHER : ce que la page répond si le permis de construire est refusé]`. C'est la première question que pose un souscripteur prudent, et le site entier n'y répond pas.

---

# Trous nommés

59 marqueurs sur les dix pages : 40 `[À SOURCER]`, 17 `[À TRANCHER]`, 2 `[À BRANCHER]`. Répartition : `/cgv-parts-sociales/` 20, `/part-sociale/` 16, `/politique-de-confidentialite-mentions-legales/` 11, `/lequipe-projet/` 6, `/le-projet-architectural/` 2, un chacun sur `/contacts/`, `/le-modele-economique/`, `/les-medias/`, `/prendre-part/`. Zéro sur la page d'accueil, ce qui n'est pas un bon signe : c'est la seule page qui affiche des chiffres inventés sans les marquer.

Le travail de marquage est bon. Les rédacteurs ont préféré nommer plutôt que deviner, et plusieurs marqueurs valent mieux que le contenu qu'ils remplacent (le régime de l'offre au regard du code monétaire et financier, la conservation des données de souscription, l'articulation décès et cession).

## Déjà résolus ailleurs, à fermer aujourd'hui

Sept marqueurs demandent une information qui existe déjà, soit dans le dépôt, soit dans le vault, soit sur une autre page du même site.

1. `/lequipe-projet/` , `[À SOURCER : nom de la présidente]`. **Morgane Craye**, présidente de la SCIC. Source : CLAUDE.md du projet, jalon J3 et section Interlocuteurs. Et `/politique-de-confidentialite-mentions-legales/` l'écrit déjà, sur le même site.
2. `/lequipe-projet/` , `[À SOURCER : l'intitulé et le poids de chacun des quatre collèges]`. **A producteur·rices et salarié·es 35 %, B bénéficiaires 35 %, C partenaires et collectivités 20 %, D soutiens 10 %.** Source : `chiffres-autorises.md`, ligne « une personne = une voix », colonne Source. Et `/cgv-parts-sociales/` publie la table complète.
3. `/part-sociale/` , `[À TRANCHER : la table des quatre collèges … La pondération ne figure pas non plus en ligne propre dans chiffres-autorises.md]`. L'énoncé du marqueur est faux, voir ci-dessus. Reste à trancher la seule vraie question : nommer ou non le collège d'arrivée du grand public. Le plan de campagne recommande de ne pas le nommer sur la home, il ne dit rien pour cette page.
4. `/part-sociale/` , `[À SOURCER : la durée de la coopérative, 99 ans à compter de l'immatriculation (art 5)]`. Publiée sans marqueur par `/cgv-parts-sociales/` §1, et confirmée par le CLAUDE.md.
5. `/part-sociale/` , `[À SOURCER : le délai de trente jours de l'article 12]`. Publié deux fois par `/cgv-parts-sociales/` §6.
6. `/politique-de-confidentialite-mentions-legales/` , `[À SOURCER : plateforme de collecte des dons en service]`. **HelloAsso**, collecte `la-maison-audacieuse`. Sources : CLAUDE.md (« HelloAsso reste ouvert jusqu'aux travaux », « 89 445 € sur HelloAsso »), document de copy, et `/contacts/` qui pointe déjà HelloAsso, avec la mauvaise URL.
7. `/le-projet-architectural/` , `[À SOURCER : coupe transversale … pas publiable tant que la liste n'est pas figée]`. La condition est levée depuis le 04/09 : les cinq structures sont nommées sur la home par arbitrage sur maquette. Reste à vérifier que le visuel ne porte pas « Maison En-Santé », qui doit sortir de partout.

## Bloquants pour une mise en ligne

Ces marqueurs empêchent d'ouvrir la souscription, ou exposent le projet s'ils partent en l'état.

**Juridique et campagne**

- `/cgv-parts-sociales/` , régime applicable à l'offre au regard des articles L. 411-1 et suivants du code monétaire et financier. C'est le seul trou qui peut arrêter la campagne. Publier des conditions de souscription en disant qu'on ne sait pas sous quel régime on offre les titres, c'est publier l'aveu qu'on ne l'a pas vérifié. À trancher avec Finavocat avant d'ouvrir.
- `/cgv-parts-sociales/` , existence et durée d'un droit de rétractation. Dépend du précédent.
- `/cgv-parts-sociales/` et `/part-sociale/` , adresse de consultation des statuts constitutifs signés. Une page qui écrit « seuls les statuts font foi » et ne les fournit pas est inutilisable. À défaut de PDF public, écrire « Écrivez-nous, nous vous les envoyons » et retirer le lien mort.
- `/cgv-parts-sociales/` , où consulter le règlement intérieur et les trois chartes, dont la signature conditionne l'admission. On ne peut pas demander à quelqu'un de signer ce qu'il n'a pas lu.
- `/cgv-parts-sociales/` , moyens de paiement et coordonnées bancaires. Sans elles, l'article 5 décrit un versement impossible.
- `/cgv-parts-sociales/` , adresse postale et électronique de dépôt des candidatures. Deux marqueurs, en article 1 et en pied.

**Mentions légales**

- Directeur de la publication, téléphone de l'éditeur, téléphone de l'hébergeur : trois obligations de l'article 6 III de la LCEN, trois marqueurs. Non conforme en l'état.
- Laquelle des deux structures édite le site. Détermine le responsable de traitement de toute la politique de confidentialité en dessous. Bloquant par conséquence.

**Données personnelles**

- Responsable de traitement, base légale, durée et destinataires des données de souscription (`/cgv-parts-sociales/`), et les trois durées du tableau (`/politique-de-confidentialite-mentions-legales/`). Le formulaire de `/prendre-part/` collecte dès aujourd'hui, sans ligne de traitement correspondante.

**Technique bloquant la conversion**

- `/prendre-part/` , traitement de la déclaration. Aucun repli prévu.
- `/contacts/` , point d'envoi Brevo. Le formulaire de la home est bloqué au submit par `scripts/socle.js`, celui de `/contacts/` postera sur une URL absurde.

## Peuvent attendre

- `/le-modele-economique/` , date d'ouverture visée. Dépend de la durée du chantier, personne ne la connaît.
- `/les-medias/` , date exacte de diffusion France 3.
- `/le-projet-architectural/` , crédit de l'illustration de la rue intérieure. À traiter avant de republier l'image ailleurs.
- `/lequipe-projet/` , photo du collectif et droit à l'image, personnes du collectif fondateur, structure exploitante de la maison de la créativité. Le dernier est correctement retenu : Hub TND a été retenu le 26/06 mais « aucune des deux exploitantes pressenties n'est sécurisée ».
- `/lequipe-projet/` , rôle de WeCo et d'Immolocal. À traiter en retirant la ligne, pas en la complétant.
- `/part-sociale/` , seuil de 5 000 € et délai de 5 ans. Correctement retenu, et il doit le rester : le CLAUDE.md est formel, « à faire acter par délibération du Conseil Coopératif avant tout affichage ».
- `/part-sociale/` , consultation d'orientation, date de la première assemblée générale, question du béguinage, bloc « pas envie de prendre une part », mention neutre de l'ESUS. Cinq arbitrages de contenu, aucun bloquant.
- `/cgv-parts-sociales/` , souscription par mineur ou majeur protégé, plafond de parts, circuit personnes morales, plafond de cinq voix, articulation décès et cession, adhésion à la Confédération Générale des SCOP, opposabilité de la clause d'arbitrage, traitement fiscal post-agrément, admission entre articles 12 et 23.5, bulletin électronique, seuils de l'article 15. Onze marqueurs de fond, tous légitimes, tous à instruire avec le conseil de la coopérative, aucun qui empêche de publier la page tant qu'ils restent visibles.
- `/politique-de-confidentialite-mentions-legales/` , capital social daté, crédits des photographies reprises du site précédent, prestataire de paiement.

## Deux marqueurs à réécrire avant tout

- `/part-sociale/` : quatre marqueurs publient « Ana Etcheverry », le nom de l'avocate du projet. Un marqueur oublié met un prestataire juridique en ligne.
- `/part-sociale/` : le marqueur sur la pondération des collèges affirme une chose fausse sur le référentiel. Un marqueur qui se trompe sur l'état du référentiel est pire qu'une absence de marqueur, parce qu'il ferme la question.

---

# Ce qui est bien

Court et sincère. Ce qui suit marche, et se cassera à la prochaine version si personne ne le sait.

**L'aveu de limite est partout, et il est juste.** « Nous sommes une petite équipe, alors comptez quelques jours. » « On répond, parfois avec un peu de retard. » « Date de travail, à confirmer avec la maîtrise d'œuvre. » « Tout n'est pas arrêté pour autant. » « Nous ne donnons pas de date tant qu'elle n'est pas sûre. » Cinq pages différentes, cinq aveux, aucun superlatif pour compenser. C'est exactement le registre R4, et c'est ce qui rend le reste crédible.

**`/prendre-part/` explique le parcours avant de demander quoi que ce soit.** « Chaque étape dit ce qu'elle engage et jusqu'où vous pouvez encore reculer », avec le point de non-retour nommé (« Vous vous engagez ici. Avant cette étape, un mot suffit pour tout arrêter »). Et l'alerte anti-fraude sur les virements, qui protège des gens réels. Aucun tunnel de collecte citoyenne ne fait ça. À ne pas raccourcir.

**`/cgv-parts-sociales/` sourçe article par article.** Quinze articles, une centaine de renvois aux statuts, et un article « Le risque » qui dit « vous pouvez perdre la totalité de votre apport » sans le maquiller. C'est la page qui fera la différence devant un partenaire institutionnel, l'USH ou une fondation.

**`/le-projet-architectural/` pose la contradiction avant de montrer le rendu.** « Un café ouvert sur le quartier et des femmes qui viennent se faire soigner, sous le même toit, à la même heure. L'architecture répond à cette contradiction avant de répondre à autre chose. » Et « La charpente est ce que ce bâtiment a de plus beau. » C'est de l'écriture, pas de la présentation de projet.

**`/contacts/` refuse l'annuaire.** L'aiguillage par objet de courriel prérempli, l'aveu « pas encore de bureau où pousser une porte. Ni accueil ni permanence », le refus d'une carte tierce, le champ piège documenté en commentaire pour la personne qui reprendra le code. Une page de contact qui a une idée.

**Le bloc « à reprendre tel quel » de `/les-medias/`** est la meilleure synthèse du projet écrite à ce jour, et la seule formulation exacte du bail sur tout le site. Elle devrait devenir le patron.

**La discipline typographique est tenue.** Zéro tiret cadratin sur dix pages, zéro point d'exclamation, un seul `h1` par page, aucun identifiant dupliqué, trois virgules avant « et » sur 11 000 mots. Le vouvoiement est intégral. Le point médian est partout. Personne n'a écrit « chez nous, nous croyons que ». Sur neuf auteurs en parallèle, c'est remarquable.

---

# Objection de fond

Le risque que personne n'a vu n'est pas dans une phrase. Il est dans une soustraction que le site invite le lecteur à faire, et qu'aucune page n'assume.

`/le-modele-economique/` écrit deux choses à quatre écrans d'intervalle. En haut : « Rénover la Ferme de Novel coûte 3,2 millions d'euros. » Plus bas, en titre de section : « Une banque ne finance que la moitié d'un lieu comme celui-ci », suivi de « L'autre moitié, c'est nous » et de « C'est un choix. Nous ne voulons pas qu'une banque finance plus de la moitié de ce lieu ».

Le lecteur fait la division. Il obtient 1,6 million d'euros à réunir, et il l'obtient sur la page officielle du modèle économique, écrit noir sur blanc par le projet lui-même. C'est très exactement le chiffre que `chiffres-autorises.md` interdit : « 1,3 M€ ou 1,7 M€, fonds propres publics, hypothèse 4 du 24/08 non figée, INTERDIT tant que non figé ». L'interdit portait sur l'écriture du montant. Personne n'a vu qu'en publiant ses deux facteurs sur la même page, on publie le produit.

Trois conséquences, dans l'ordre où elles arriveront.

D'abord, la campagne se donne publiquement un objectif qu'elle n'a jamais choisi. Le minimum vital interne est de 400 000 € de parts. Le compteur affichera des coopératrices, pas des euros, et c'était une bonne décision. Mais tout journaliste, tout élu, tout donateur d'avril qui lit cette page saura qu'il faut 1,6 million, et jugera la campagne sur ce nombre. Une levée qui réussit à 400 000 € sera racontée comme une levée qui a atteint le quart de son objectif. On aura fabriqué son propre échec.

Ensuite, la phrase « nous ne voulons pas qu'une banque finance plus de la moitié » n'est pas une description, c'est un engagement. Le jalon J8 du projet prévoit « le bouclage du prêt bancaire, 60 à 65 % du plan de financement ». La banque qui instruira le dossier lira le site : le projet lui demandera 60 à 65 % après avoir écrit publiquement qu'il refuse de dépasser 50 %. Soit on renonce à l'argument, soit on renonce au plan.

Enfin, ce glissement s'est produit parce que le référentiel a cessé d'être tenu. Le point 10 du document de copy validé le 04/09 dit ceci, mot pour mot : « Chiffres autorisés du repo : y ajouter en miroir le 31/12, le 120 000 €, le 22/09, l'horaire de la fête, sans quoi la vérification armée les rejettera à l'intégration. » Ce n'a pas été fait. `chiffres-autorises.md` ignore donc quatre chiffres validés que les pages portent légitimement, et il porte toujours un 88 900 € périmé depuis le 04/09. Un garde-fou qui rejette des chiffres justes cesse d'être lu, et c'est très précisément comme cela qu'un 670 inventé et un nom de structure déjà refusé une fois ont pu traverser neuf relectures.

Ce qu'il faut faire, dans l'ordre : sortir le mot « choix » de la phrase sur la banque et revenir au verbatim autorisé ; ne jamais laisser le 3,2 M€ et la moitié dans la même page, ou alors dire soi-même ce que la soustraction donne et ce qu'on en fait ; et remettre `chiffres-autorises.md` à jour aujourd'hui, avant la mise en ligne, parce que c'est le seul outil qui aurait dû attraper tout le reste de ce rapport.

---

Audit du 07/09/2026. Dix pages, 11 745 mots de contenu, 59 marqueurs triés, 87 défauts relevés.
