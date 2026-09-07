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
node verif/identique.mjs  la home n a pas bouge au refactoring
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
