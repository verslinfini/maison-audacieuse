# Plan de retour

Ce document s ecrit avant les incidents, pas pendant. Il se lit **avant** toute operation sur le site, pas au moment ou quelque chose casse.

Principe : rien ne s ecrit en production sans savoir, a l avance, par quel chemin on revient et combien de temps il prend.

## Reflexe des trois premieres minutes

1. **Ne rien reparer tout de suite.** Constater d abord : quelle page, quel symptome, depuis quand.
2. **Ouvrir une fenetre de navigation privee.** Une bonne moitie des paniques sont des caches. Si le site est correct en prive, il n y a pas d incident, il y a un cache.
3. **Identifier le dernier geste.** Un push de contenu, un deploiement, une mise a jour d extension, une modification dans l admin. Le retour se choisit en fonction de ce geste, pas du symptome.
4. **Alors seulement**, prendre la ligne correspondante dans le tableau ci-dessous.

## Qui decide

| Situation | Qui tranche |
| --- | --- |
| Retour d une page a une revision anterieure | Romain, seul, sans consultation |
| Restauration du theme depuis une archive | Romain, seul |
| Restauration complete JetBackup (le site revient a la veille) | Romain, mais previent le collectif : le contenu saisi depuis la sauvegarde est perdu |
| Intervention sur la base de donnees | jamais seul et jamais dans l urgence, o2switch au telephone |

Pendant la campagne (07/09 au 31/12), une seule main sur le site. Un retour arriere decide a deux personnes en meme temps fait plus de degats que l incident.

---

# Par type d incident

## 1. Une page est cassee ou son contenu est faux

**Symptome** : une page affiche un contenu errone, une mise en page eclatee, des blocs vides. Le reste du site va bien.

**Cause la plus probable** : un `wp-push.mjs` qui a envoye un markup abime, ou une edition dans l editeur Gutenberg.

**Retour** : la revision WordPress. Admin WP > Pages > la page concernee > panneau lateral > **Revisions**. Choisir la version d avant, la restaurer, mettre a jour. `wp-push.mjs` affiche l id de la derniere revision juste apres chaque envoi : c est celle-la.

Puis en local, realigner le depot sur ce que le site sert vraiment :

```
node wp-pull.mjs --slug <slug>
```

**Temps** : 2 a 3 minutes. **Perte** : uniquement la modification fautive.

---

## 2. Le theme est casse (site blanc, mise en page effondree)

**Symptome** : ecran blanc, ou site sans aucun style, sur toutes les pages.

**Cause la plus probable** : un deploiement du theme enfant, ou un fichier PHP invalide.

### Voie rapide : revenir au theme parent

Admin WP > Apparence > Themes > activer **Kadence** (le parent). Le site retrouve immediatement une mise en page correcte : le parent est complet, l enfant ne fait qu ajouter.

Attention : les reglages du personnalisateur sont stockes par slug de theme. Repasser de l enfant au parent ne perd rien, le parent garde ses propres reglages. C est le sens inverse qui est delicat, et il est traite dans la sequence de mise en place du theme enfant.

**Temps** : 1 minute. **Perte** : les ajouts specifiques du theme enfant, le temps de comprendre.

Si l admin est inaccessible (ecran blanc partout, y compris `/wp-admin`), passer par le gestionnaire de fichiers du cPanel et renommer le dossier `wp-content/themes/kadence-child` en `kadence-child.casse`. WordPress bascule tout seul sur un theme disponible.

### Voie propre : restaurer l archive

Les archives sont sur le serveur, dans `~/backups/`, cinq de chaque type.

```
ssh -i ~/.ssh/o2switch_lma -p <port> <user>@<hote>
ls -t ~/backups/*.tgz
tar -xzf ~/backups/theme-<horodatage>.tgz -C <chemin WP>/wp-content/themes
```

**Temps** : 5 minutes. **Perte** : aucune, le theme revient exactement a son etat d avant le deploiement.

---

## 3. Un deploiement GitHub Actions est rouge

**Symptome** : le run apparait en rouge dans l onglet Actions.

**Ce qui s est deja passe sans rien faire** : le workflow a restaure la sauvegarde tout seul. Le site est revenu a son etat d avant. Il n y a pas d urgence.

**A faire** :

1. Verifier le site en navigation privee. Il doit etre normal.
2. Lire le journal du run, etape **Restaurer la sauvegarde**, pour confirmer que la restauration a bien eu lieu.
3. Lire la premiere etape rouge pour comprendre la cause. Le tableau de correspondance est dans [deploiement.md](<deploiement.md>).
4. Corriger dans le depot, puis relancer.

**Si la restauration elle-meme a echoue** (le journal le dit), passer a la voie manuelle du cas 2.

**Temps** : constat 2 minutes, correction variable. **Perte** : aucune.

---

## 4. Le site est entierement inaccessible

**Symptome** : erreur 500 sur tout le site, base de donnees injoignable, ou site remplace par autre chose.

**Retour** : restauration JetBackup depuis le cPanel o2switch. Section **JetBackup** > **Sauvegardes de fichiers** ou **Sauvegardes de bases de donnees** > choisir un point de restauration > restaurer.

Prendre le point de restauration **le plus recent anterieur a l incident**, pas le plus recent tout court.

**Temps** : 15 a 45 minutes selon la taille et la charge du serveur. **Perte** : tout ce qui a ete saisi sur le site depuis ce point de restauration, contenu comme commandes. C est le retour le plus lourd, c est pour cela qu il est le dernier.

Si JetBackup lui-meme est inaccessible : support o2switch, qui repond vite et dispose de ses propres sauvegardes.

---

## 5. Une mise a jour d extension a casse quelque chose

**Symptome** : une fonction precise ne marche plus (un formulaire, l affichage d une section) juste apres une mise a jour.

**Retour** : admin WP > Extensions > desactiver l extension suspecte. Verifier. Si le probleme disparait, l extension est coupable.

Pour revenir a la version d avant : les extensions ne se retrogradent pas depuis l admin. Soit une restauration JetBackup ciblee sur `wp-content/plugins/<extension>`, soit le zip de la version anterieure recupere sur le depot WordPress.org, decompresse par le gestionnaire de fichiers.

`node wp-drift.mjs` dit exactement quelle version a change, en comparant a `snapshot/plugins.json`.

**Temps** : 5 minutes pour la desactivation, 20 pour une retrogradation propre.

**Rappel** : gel des mises a jour du 31/08 au 30/09, sauf correctif de securite. Une extension mise a jour pendant la campagne est un risque pris sans raison.

---

# Les cinq niveaux de sauvegarde

Une operation qui n a pas son niveau de sauvegarde ne part pas.

| Niveau | Ce qu il couvre | Qui le declenche |
| --- | --- | --- |
| JetBackup quotidien | tout le site, fichiers et base | o2switch, automatique |
| Archive `~/backups/*.tgz` | theme et mu-plugins | `deploy.yml`, avant chaque envoi |
| `wp db export` | la base seule | a la main, avant toute operation qui touche la base |
| Revisions WordPress | le contenu d une page | WordPress, a chaque enregistrement |
| Historique git | le code et le contenu source | a chaque commit |

Les trois premiers sont sur le serveur ou chez l hebergeur, les deux derniers chez nous. Un incident qui emporterait le serveur laisserait quand meme le depot : c est pour cela que le contenu des pages est versionne ici et pas seulement en ligne.

---

# Bascule de la home

Ce retour concerne la refonte de la home : la page privee Accueil (slug `accueil`). Partie A, annuler la mise en place avant toute mise en ligne. Partie B, revenir en arriere sur la bascule elle meme, si elle a deja eu lieu. A lire avant de commencer l etape 3, comme le reste de ce document.

## A. Retour de la mise en place (etape 3)

**Quand** : l etape 3 a cree la page privee Accueil (`wp-create.mjs`), l a remplie (`wp-push.mjs`), lui a pose un CSS additionnel scope `.page-id-<id>` par WP-CLI (`wp_update_custom_css_post`), et ses metas Yoast (`_yoast_wpseo_title`, `_yoast_wpseo_metadesc`, puis `wp yoast index --reindex`). Ce retour sert si cette preparation doit etre annulee avant la bascule. La production n a pas bouge : la page 1901 sert toujours l accueil, rien n est visible cote public.

**Decide** : comme un retour de page, Romain seul, sans consultation.

1. Corbeille de la page privee, jamais suppression definitive.

```
ssh -i ~/.ssh/o2switch_lma -p <port> <user>@<hote>
```
```
wp post delete <id>
```

Sans `--force` : `--force` supprime definitivement, a ne jamais utiliser ici. Resultat attendu : statut `trash`. Verifier : `wp post list --post_type=page --post_status=trash --field=ID` liste bien `<id>`, ou admin WP > Pages > Corbeille. Si echec : arret, ne pas relancer avec `--force` pour aller plus vite.

2. Restaurer le CSS additionnel depuis la sauvegarde faite dans le depot avant la pose (`snapshot/custom-css-avant-accueil.css`). Chemin propose par cette section, pas encore une convention posee ailleurs : ce fichier n existe pas tant que l etape 3 ne l a pas cree, et l etape 3 doit y copier le CSS additionnel d avant, juste avant d ecrire le nouveau.

A la main, le plus sur : admin WP > Personnaliser > CSS additionnel, remplacer le contenu par celui du fichier, Publier.

Ou par WP-CLI, en une seule commande locale, pas depuis une session SSH deja ouverte : la redirection lit un fichier du poste de Romain.

```
ssh -i ~/.ssh/o2switch_lma -p <port> <user>@<hote> "wp eval \"wp_update_custom_css_post(file_get_contents('php://stdin'));\"" < snapshot/custom-css-avant-accueil.css
```

Commande non testee en conditions reelles : a essayer a froid avant le 31/08, pas la nuit de la bascule. Resultat attendu : le CSS additionnel redevient celui d avant l etape 3. Verifier : Personnaliser > CSS additionnel affiche le contenu attendu. Si echec : Personnaliser > CSS additionnel > Revisions, remonter a la version d avant la pose. Si le fichier de sauvegarde n existe pas non plus : arret, ne pas improviser un CSS de memoire, chercher la revision WordPress d abord.

3. Metas Yoast : rien a faire separement, elles partent avec la page en corbeille.

4. Realigner le depot.

```
node wp-pull.mjs
```
```
node wp-drift.mjs --baseline
```

Resultat attendu : sondes au vert, `accueil` absent du manifest (page en corbeille, plus renvoyee par l API en statut publish ou private).

**Temps** : 5 minutes. **Perte** : uniquement le travail de preparation, la production n a jamais bouge.

## B. Bascule

**Decide** : Romain seul. Jamais lancee par un agent sans son accord explicite pour cette bascule precise, meme si toutes les sondes sont vertes.

### Prerequis, verifies et coches avant de commencer

1. `/prendre-part/` en ligne et teste. Jamais une home dont le CTA renvoie une 404.
2. Si la home affiche la phrase bordee sur le remboursement, deliberation du Conseil Cooperatif actee au prealable.
3. `node wp-drift.mjs` au vert, les trois sondes.
4. Sauvegarde JetBackup du jour verifiee dans cPanel.
5. Session de verification prete, navigation privee, desktop et mobile.

### Sequence, ordre strict

1. Redirection 301 `/la-maison-audacieuse/` vers `/`, posee avant tout.

Admin WP > Redirection > ajouter une redirection : source `/la-maison-audacieuse/`, cible `/`, type Redirection standard (301). Sans elle, les liens entrants tombent en 404 des que 1901 passe en prive.

Resultat attendu : regle listee et active. Verifier (Tiger Protect exige un user agent de navigateur, sinon 403 au lieu du vrai statut) :

```
curl -I -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" https://www.maison-audacieuse.fr/la-maison-audacieuse/
```

Doit deja repondre 301 vers `/`, alors que 1901 est encore publiee : Redirection intercepte avant WordPress. Si echec, pas de 301 : arret, ne pas continuer la bascule.

Pour les etapes 2 a 5, une seule connexion SSH suffit, WP-CLI ensuite :

```
ssh -i ~/.ssh/o2switch_lma -p <port> <user>@<hote>
```

2. Publier la page privee Accueil.

```
wp post update <id> --post_status=publish
```

Resultat attendu : statut `publish`. Verifier : `wp post get <id> --field=post_status`. Si echec : arret, ne pas passer a l etape 3 avec la page encore privee.

3. Basculer la page d accueil sur la nouvelle page.

```
wp option get show_on_front
```

Doit deja repondre `page` : sinon arret, ce cas n est pas couvert par ce runbook.

```
wp option update page_on_front <id>
```

Resultat attendu : `page_on_front` egal a `<id>`. Verifier : `wp option get page_on_front`. Si echec : arret ; `/` continue de servir 1901, rien n est casse.

4. Page 1901 en prive, jamais supprimee.

```
wp post update 1901 --post_status=private
```

Resultat attendu : statut `private`. Verifier : `wp post get 1901 --field=post_status`. Si echec : arret ; a ce stade `/` sert deja la nouvelle page, corriger avant de purger.

5. Purger LiteSpeed.

```
wp litespeed-purge all
```

Equivalent depuis le poste de Romain :

```
node wp-push.mjs --purge-only
```

Resultat attendu : purge confirmee. Verifier : etape 7. Si echec : admin WP > LiteSpeed Cache > Purger tout, a la main, avant de continuer.

6. Regenerer le CSS critique Jetpack Boost, apres la purge, jamais avant.

Admin WP > Jetpack Boost > regenerer le CSS critique, bouton du tableau de bord. Aucune commande WP-CLI documentee pour cette action, verifie le 19/08/2026 : seule la voie admin existe. Le CSS critique est indexe par URL ; sans cette etape, `/` sert le CSS de l ancienne page pendant des heures.

Resultat attendu : generation terminee, barre de progression du tableau de bord Boost. Verifier : etape 7. Si echec : ne pas laisser la home ouverte aux visiteurs anonymes avec un CSS critique perime ; desactiver temporairement le CSS critique dans Boost plutot que de laisser une mise en page cassee.

7. Verification en navigation privee, 1440 puis 375.

Contenu : `<title>` reel, H1, CTA vers `/prendre-part/` en 200.

```
curl -I -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" https://www.maison-audacieuse.fr/
```

200, pas de redirection.

```
curl -I -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" https://www.maison-audacieuse.fr/la-maison-audacieuse/
```

301 vers `/`.

Console navigateur sans erreur.

Resultat attendu : les quatre controles au vert, sur les deux largeurs. Si echec : arret, ne pas annoncer la bascule terminee ; revenir sur l etape en cause avant de continuer, ne pas empiler une correction sur une verification ratee.

8. Realigner le depot.

```
node wp-pull.mjs
```

Verifier que le `modified` de `la-maison-audacieuse`, id 1901, a change dans `contenu/manifest.json`.

```
node wp-drift.mjs --baseline
```

Resultat attendu : sondes au vert, nouvelle baseline posee. Si echec : ne pas considerer la bascule close tant que le drift n est pas au vert.

**Temps** : 20 a 30 minutes hors generation Boost, variable. **Perte** : aucune si l ordre est respecte, 1901 n est jamais supprimee.

### Retour de la bascule, ordre inverse

Les deux premieres commandes s enchainent sans pause : une page ne doit jamais etre `page_on_front` pendant qu elle est encore privee, la home renverrait une 404 aux visiteurs.

1. Republier 1901 puis lui rendre `page_on_front`, dans cet ordre, sans pause entre les deux.

```
wp post update 1901 --post_status=publish
wp option update page_on_front 1901
```

Resultat attendu : 1901 `publish`, `page_on_front` egal a `1901`. Verifier : `wp post get 1901 --field=post_status`, `wp option get page_on_front`. Si echec : arret avant l etape suivante, ne jamais laisser `page_on_front` pointer sur une page non publiee.

2. Repasser la nouvelle page en prive, jamais supprimee.

```
wp post update <id> --post_status=private
```

Resultat attendu : statut `private`. Verifier : `wp post get <id> --field=post_status`. Si echec : arret, corriger avant de purger.

3. Purger LiteSpeed.

```
wp litespeed-purge all
```

Verifier comme a l etape 7 de la sequence aller.

4. Regenerer le CSS critique Jetpack Boost.

Admin WP > Jetpack Boost > regenerer. Meme remarque qu a l aller : pas de commande WP-CLI documentee.

5. Desactiver la redirection 301, seulement si 1901 redevient l accueil durablement.

Admin WP > Redirection > desactiver ou supprimer la regle `/la-maison-audacieuse/` vers `/`. Si le retour est temporaire, en attendant de corriger puis rebasculer, laisser la regle active : elle ne gene pas 1901, revenue a `/`.

6. Verification en navigation privee, memes controles qu a l etape 7 aller, adaptes.

```
curl -I -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" https://www.maison-audacieuse.fr/
```

200, page 1901 reconnaissable.

```
curl -I -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" https://www.maison-audacieuse.fr/la-maison-audacieuse/
```

301 vers `/` si la redirection est restee active, 200 direct si elle a ete desactivee.

Console sans erreur.

Si echec : arret, ne pas laisser la home instable, reprendre depuis l etape en cause.

7. Realigner le depot.

```
node wp-pull.mjs
```
```
node wp-drift.mjs --baseline
```

**Temps** : 15 minutes. **Perte** : aucune, la nouvelle page est repassee en prive, pas supprimee.
