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
