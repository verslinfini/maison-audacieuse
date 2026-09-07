# Conventions du site

Comment le site est fait, et comment on lui ajoute quelque chose sans le defaire. Deux ecrans, a lire une fois.

## Le principe

Une page = un fichier de contenu. Tout ce qui l entoure, entete, pied, tete HTML, vient du gabarit. Personne ne recopie un entete.

```
src/
  gabarit.html        la coquille : tete HTML, entete, pied, emplacement du contenu
  partials/           les morceaux communs, un fichier chacun
  pages/              une page = un fichier
  styles/base.css     ce qui sert a plus d une page
  styles/<page>.css   ce qui ne sert qu a une page
  assets/             images, polices, favicon
  scripts/socle.js    le comportement commun
build.mjs             assemble le tout dans dist/
```

`dist/` est produit. On ne l edite jamais, on ne le commite jamais.

## Construire

```
node build.mjs          site de recette, noindex
node build.mjs --prod    site public, indexable
node verif/home-conforme.mjs  la home rend encore comme la maquette validee
node verif/pages.mjs      controle mecanique de toutes les pages
```

## Ajouter une page

1. Copier `docs/modele-de-page.html` dans `src/pages/<nom>.html`.
2. Remplir l entete du fichier : `titre`, `description`, et `sortie` si l adresse ne doit pas etre `/<nom>/`.
3. Creer `src/styles/<nom>.css` avec ce qui n appartient qu a elle.
4. `node build.mjs`.

Le titre et la description sont obligatoires : le build s arrete s ils manquent, plutot que de publier une page muette pour les moteurs.

## Ou va une regle CSS

**Elle sert a deux pages ou plus** : dans `base.css`.
**Elle ne sert qu a une page** : dans la feuille de cette page.

Le jour ou une regle de page sert a une deuxieme page, elle monte dans `base.css`. On ne la duplique jamais. Une regle presente a deux endroits est une regle qui divergera.

`base.css` est charge avant la feuille de page. A specificite egale, la page gagne, ce qui est l ordre voulu.

## Nommer

Classes en francais, en minuscules, mots separes par un tiret : `.jauge__note`, `.bouton--primaire`.

Deux traits bas pour une partie de bloc, deux tirets pour une variante :

```
.jauge            le bloc
.jauge__legende   une partie du bloc
.bouton--primaire une variante du bloc
```

Les identifiants sont reserves aux sections de page, qui servent d ancres : `#le-lieu`, `#prendre-part`.

Une classe decrit ce que la chose **est**, jamais ce a quoi elle ressemble. `.jauge__palier`, pas `.texte-gris-petit`.

## Structure d une page

Chaque ecran est une `<section>` avec un identifiant, dans cet ordre :

```html
<section id="nom-de-l-ecran">
  <div class="grain__voile" aria-hidden="true"></div>
  <div class="contenu">
    <h2>Titre de l ecran</h2>
    ...
  </div>
</section>
```

Un seul `<h1>` par page, dans le premier ecran. Les ecrans suivants ouvrent en `<h2>`, jamais en sautant un niveau.

## Les composants des pages interieures

La home a sa mise en page propre, ecran par ecran. **Toutes les autres pages se montent avec les composants de `base.css`, et rien d autre.** C est ce qui fait qu elles se ressemblent sans que personne n ait a y penser.

| Composant | A quoi il sert |
|---|---|
| `.page-tete` | l en-tete de la page : sur-titre, `h1`, chapo |
| `.bloc` + `--blanc` `--violace` `--gris` `--sombre` | une section = une idee. Les fonds alternent |
| `.bloc__titre`, `.bloc__intro` | le titre et le chapeau d une section |
| `.mesure`, `.prose` | colonne de lecture (68 signes) et espacement du texte courant |
| `.puces`, `.etapes` | liste a puces, liste numerotee d un parcours |
| `.grille--2`, `.grille--3`, `.carte` | grilles de cartes ; `.carte--lien` rend la carte cliquable en entier |
| `.faits`, `.fait__nombre` | des chiffres mis en avant |
| `.tableau-cadre`, `.tableau` | un tableau qui scrolle dans son cadre, jamais la page |
| `.questions`, `.question` | une FAQ en `details`, ouvrable sans JavaScript |
| `.appel` | la porte de fin de page, dans un `.bloc--sombre` |
| `.retour` | le lien de retour vers la page mere |

Trois regles d usage :

**Alterner les fonds.** Deux blocs de meme fond qui se suivent sont un seul bloc.
**Finir par une porte.** Chaque page se termine sur un `.bloc--sombre` qui porte l appel. Jamais deux appels de meme intention sur une page.
**Le surlignage `.marqueur` est rare.** Un mot ou deux par page au maximum, sinon il ne surligne plus rien.

Un composant qui manque s ecrit dans la feuille de la page. S il ressert une deuxieme fois, il monte dans `base.css` et disparait des deux feuilles.

## Le comportement

`scripts/socle.js` porte ce qui vaut pour tout le site : l entete qui se solidifie, le menu, la detection du mode « version pour ordinateur », la barre d appel.

La barre change de teinte en entrant dans la zone chaude de la page. Cette zone se designe en HTML, par un attribut, et non dans le script :

```html
<section id="agir" data-zone-chaude>
```

Une page sans `data-zone-chaude` garde une barre blanche du haut jusqu en bas. C est le comportement voulu, pas une panne.

## La charte

Fermee. Sept couleurs, deux polices, toutes declarees en variables dans `base.css`. Une couleur qui n y est pas n existe pas.

Le detail et les usages sont dans <charte.md>.

## Les trous nommes

Une information qui manque s ecrit en clair sur la page, dans un `.a-sourcer`, plutot que d etre devinee. Un chiffre absent de `contenu/pages/chiffres-autorises.md`, une clause que les statuts ne portent pas, une date invérifiable : on marque, on ne comble pas.

Trois regles :

**Un marqueur est visible en ligne.** Il ne nomme donc jamais un prestataire, un conseil, un partenaire en negociation, ni une personne. « L avocate du projet », pas son nom.
**Un marqueur dit ce qui manque et ou le trouver**, pas seulement qu il manque. « [A SOURCER : duree de conservation, a fixer avec le registre des traitements] » vaut mieux que « [A SOURCER : duree] ».
**Aucun marqueur ne survit a la mise en ligne.** Le controle en compte le nombre a chaque passage : il doit tomber a zero avant la bascule.

## Ce qui ne se fait pas

Recopier un entete ou un pied dans une page.
Ecrire une couleur en dur plutot que par sa variable.
Editer `dist/`.
Mettre du style dans un attribut `style`.
Dupliquer une regle CSS dans deux feuilles.
Ajouter une dependance sans que le besoin l ait rendue evidente.


## Le catalogue des fonds et des images (07/09/2026)

Ces composants vivent dans `base.css`, section « Fonds de section colores » et suivantes. Ils ont ete ajoutes le 07/09 apres le constat que les pages interieures n avaient acces qu au blanc, au gris et au violace, quand la home disposait de six fonds travailles.

### Les fonds de section

Six variantes s ajoutent aux quatre existantes, avec la meme mecanique : `<section class="bloc bloc--X">`.

| Classe | Ce que ca donne | Quand |
| --- | --- | --- |
| `bloc--blanc` | blanc plein | par defaut, la section de lecture |
| `bloc--violace` | violace plein | alternance simple |
| `bloc--gris` | gris plein | alternance simple |
| `bloc--aube` | menthe, terracotta, lavande sur violace | ouverture de page |
| `bloc--claire` | terracotta, vert, jaune sur blanc | section qui doit trancher |
| `bloc--nappe` | kaki, lavande, nappe blanche au centre | frise, tableau, liste d etapes |
| `bloc--ouvert` | menthe, terracotta, lavande sur blanc | section qui appelle a agir |
| `bloc--violet` | violet plein, texte blanc | l idee a retenir, une par page |
| `bloc--terracotta` | terracotta plein, texte blanc | la couleur chaude, une par page |
| `bloc--sombre` | violet sombre, texte blanc | l appel de fin, toujours en dernier |

Trois regles :

**Une seule zone chaude par vue.** Un fond plein par page, `bloc--violet` ou `bloc--terracotta`, jamais les deux, jamais deux fois.

**Deux fonds identiques qui se suivent sont un seul bloc.** Soit on les fusionne, soit on change l un des deux.

**Le rythme type d une page interieure** : `page-tete` claire, `bloc--blanc`, une image pleine largeur ou un fond plein, `bloc--claire` ou `bloc--nappe`, `bloc--sombre` pour l appel.

Sur `bloc--violet` et `bloc--terracotta`, le socle bascule seul les titres au blanc, les liens et le bouton au jaune, les puces au jaune, les cartes en translucide. Rien a reecrire dans la feuille de page.

### La section en photo pleine largeur

```html
<section class="bloc bloc--photo">
  <div class="bloc__fond" aria-hidden="true">
    <img src="/assets/img/voute.jpg" alt="" width="1400" height="1867">
  </div>
  <div class="grain__voile" aria-hidden="true"></div>
  <div class="contenu">
    <div class="panneau">
      <h2 class="bloc__titre">Le titre</h2>
      <p>Deux ou trois paragraphes, pas plus.</p>
    </div>
  </div>
  <p class="bloc__credit">Photo collectif La Maison Audacieuse</p>
</section>
```

L image de fond est decorative, donc `alt=""` et `aria-hidden` sur son conteneur : ce qu elle montre est dit par le panneau. Le panneau est opaque, jamais translucide.

### Le duo image et texte

```html
<div class="duo">
  <figure class="figure">
    <img src="/assets/img/charpente.jpg" alt="La charpente…" width="1400" height="1867">
    <figcaption>Sous les combles, mars 2025.</figcaption>
  </figure>
  <div class="mesure prose">
    <p>…</p>
  </div>
</div>
```

`duo--inverse` place l image a droite sans changer l ordre du HTML : le texte reste premier au clavier et a la lecture d ecran. `duo--texte-large` et `duo--image-large` deforment la grille. Sous 900 px, tout s empile, image en premier.

### La galerie

```html
<div class="galerie">
  <figure><img src="…" alt="…" width="1400" height="1867"><figcaption>…</figcaption></figure>
  <figure><img src="…" alt="…" width="1400" height="1867"><figcaption>…</figcaption></figure>
</div>
```

Trois ou quatre images de meme hauteur. Sous 767 px, la bande defile horizontalement avec accroche plutot que de s empiler sur six ecrans.

### La coupe annotee

```html
<figure class="coupe">
  <img src="/assets/img/coupe-espaces.jpg" alt="Coupe du batiment…" width="2000" height="1009">
  <p class="coupe__etiquette" style="left: 14%; top: 82%">Accueil des femmes<br>victimes de violences</p>
  <p class="coupe__etiquette" style="left: 44%; top: 86%">Pole de sante</p>
  <ul class="coupe__legende">
    <li><b>Rez-de-chaussee</b> accueil, pole de sante, cafe</li>
    <li><b>Premier etage</b> bureaux, beguinage</li>
  </ul>
</figure>
```

Les etiquettes se posent en pourcentage du cadre, elles suivent donc l image a toutes les largeurs. Sous 700 px elles se chevauchent quoi qu on fasse : elles disparaissent et `coupe__legende` prend le relais. **Les deux doivent dire la meme chose**, sinon le lecteur au telephone lit autre chose que celui au bureau.

Raison d etre du composant : la coupe fournie par l agence nomme cinq structures exploitantes, dont une a quitte le projet. Etiqueter par-dessus permet de nommer les espaces par leur fonction, et de corriger sans redemander un fichier.

### L annotation manuscrite

```html
<p class="annote">autant que de participant·es</p>
```

Meow Script, violette sur fond clair, jaune sur fond plein. Une par section au maximum, jamais un titre, jamais une phrase entiere. Elle ne porte jamais une information qu on ne trouve pas ailleurs : une police manuscrite se lit mal, et certains ne la lisent pas du tout.

### Les reperes

```html
<div class="reperes">
  <p><span class="repere__nombre">99 ans</span><span class="repere__quoi">la duree de la promesse de bail</span></p>
  <p><span class="repere__nombre">100 €</span><span class="repere__quoi">le prix d une part sociale</span></p>
</div>
```

Deux ou trois chiffres sur une ligne, entre deux filets. Difference avec `faits` : `faits` est une grille de tuiles quand les chiffres sont le sujet, `reperes` est une ligne quand ils ponctuent un recit.

### La valeur d exemple

Un chiffre de preproduction se declare :

```html
<span data-a-remplir="ce qu il faut mettre a la place">124</span>
```

`node build.mjs --prod` refuse alors de construire tant que l attribut est la. C est le garde-fou du compteur de la home : sans lui, le site s ouvre au public en annoncant un nombre de cooperateur·ices faux, et c est le premier chiffre que voit un visiteur.
