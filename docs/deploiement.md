# Deployer sur maison-audacieuse.fr

Trois choses circulent entre ce depot et le site, et elles ne passent pas par le meme chemin :

| Ce qui change | Chemin | Outil |
| --- | --- | --- |
| Le code du theme et les mu-plugins | voie A (Actions, SSH) ou voie B (zip) | `deploy.yml` ou `build-zip.yml` |
| Le contenu des pages | toujours en local, jamais depuis Actions | `wp-pull.mjs` / `wp-push.mjs` |
| Les reglages WordPress | a la main dans l admin | aucun |

Regle qui ne se discute pas : **aucun appel a l API du site depuis GitHub Actions**. Tiger Protect, la protection d o2switch, bloque tout ce qui ne ressemble pas a un navigateur. Le contenu se lit et s ecrit depuis la machine de Romain, ou les scripts envoient un User-Agent Chrome.

Avant toute operation, le plan de retour se lit en entier : [rollback.md](<rollback.md>).

---

# Voie A : deploiement par GitHub Actions

La voie normale. Elle sauvegarde, envoie, verifie, et se restaure toute seule si la verification est rouge.

## Declencher

1. Ouvrir le depot sur GitHub, onglet **Actions**.
2. Choisir le workflow **Deploiement (theme et mu-plugins)** dans la colonne de gauche.
3. Bouton **Run workflow**, branche `main`, un motif court dans le champ prevu (il reste dans le journal), puis **Run workflow**.

Le declenchement automatique sur push est ecrit dans le fichier mais commente : il ne sera active qu apres un rollback provoque et constate. Tant que la chaine n a pas prouve qu elle sait revenir en arriere, on garde la main sur le depart.

## Ce que le workflow fait, dans l ordre

1. **Tampon de build.** Le SHA court du commit est ecrit dans `theme/kadence-child/build.txt`. Le `functions.php` du theme le lit et l imprime dans l en-tete de chaque page sous la forme `<!-- lma-build: abc1234 -->`. C est ce qui permet de savoir, sans aucun acces, quelle version le site sert vraiment.
2. **Cle SSH.** La cle privee vient du secret `O2_SSH_KEY`, l empreinte du serveur du secret `O2_KNOWN_HOSTS`. La verification de l hote n est jamais desactivee.
3. **Sauvegarde.** Cote serveur, deux archives horodatees dans `~/backups/` : `theme-<horodatage>.tgz` et `mu-<horodatage>.tgz`. Les 5 dernieres de chaque type sont conservees, les plus vieilles partent.
4. **Envoi.** `rsync -az --delete` vers les deux dossiers cibles. Le `--delete` est voulu : le serveur devient le miroir exact du depot, aucun fichier ne survit sur le serveur sans exister dans git.
5. **Smoke test.** La home est appelee avec un User-Agent Chrome et un parametre d URL anti-cache. Deux conditions : code HTTP 200, et tampon de build egal au commit deploye. Trois essais espaces de 8 secondes, le temps que le cache se replace.
6. **Filet.** Si une etape echoue, la sauvegarde de l etape 3 est restauree automatiquement, et le run sort en erreur.
7. **Rappel de purge.** Le runner ne purge pas le cache lui-meme (Tiger Protect). Il affiche la commande a lancer en local.

## Apres un run vert

```
node wp-push.mjs --purge-only
```

Puis verification **en navigation privee**. Un onglet deja ouvert ment : LiteSpeed sert une version en cache et le CSS critique de Jetpack Boost est fige. Une fenetre privee est le seul controle fiable.

## Lire un run rouge

Actions > le run > le job > la premiere etape avec une croix rouge. Le premier message d erreur est le bon, les suivants en decoulent.

| Message | Ce qui se passe | Correction |
| --- | --- | --- |
| `Permission denied (publickey)` | la cle n est plus autorisee cote cPanel | reautoriser la cle publique dans cPanel > Acces SSH |
| `Host key verification failed` | l empreinte du serveur a change | regenerer `O2_KNOWN_HOSTS` avec `ssh-keyscan -p <port> <hote>` |
| `smoke test rouge`, tampon vide | le theme n imprime pas le tampon | verifier que `functions.php` lit bien `build.txt` |
| `smoke test rouge`, tampon ancien | un cache tres agressif, ou l envoi n a pas pris | purger LiteSpeed a la main puis relancer |
| erreur avant l etape de sauvegarde | rien n a ete envoye au serveur | corriger et relancer, le site n a pas bouge |

Dans tous les cas ou une restauration a eu lieu, le site est revenu a son etat d avant. Ce n est pas une urgence : c est le filet qui a fonctionne.

---

# Voie B : zip de release, sans SSH

Le plan de secours. Il sert quand la cle SSH est revoquee, quand l acces est perdu, ou quand le workflow A refuse de passer et que la campagne n attend pas.

## Fabriquer les zips

```
git tag v1.0.0
git push origin v1.0.0
```

Le workflow `build-zip.yml` se declenche sur le tag, fabrique les deux archives et cree une release GitHub. Elles se recuperent dans l onglet **Releases** du depot.

## Televerser

**Le theme** (`kadence-child-v1.0.0.zip`) : admin WP > Apparence > Themes > Ajouter > Televerser un theme. WordPress propose de remplacer la version installee : accepter. Ne pas changer le theme actif au passage.

**Les mu-plugins** (`lma-core-v1.0.0.zip`) : ils ne passent PAS par le televerseur d extensions. Il faut decompresser le contenu directement dans `wp-content/mu-plugins/`, par le gestionnaire de fichiers du cPanel ou par FTP. Les mu-plugins sont actifs du seul fait d etre presents : un fichier casse deposse la casse tout de suite.

**Avant de televerser quoi que ce soit : une sauvegarde JetBackup.** Cette voie n a pas de filet automatique, contrairement a la voie A.

---

# Le flux contenu

Le contenu ne passe jamais par un deploiement. Il se travaille en local, page par page.

```
node wp-pull.mjs                      recupere les 6 pages et met a jour le manifest
node wp-pull.mjs --slug les-medias    une seule page
```

Chaque page arrive dans `contenu/blocs/<slug>.blocks.html`. C est du block markup Gutenberg/Kadence : les `uniqueID` portent les styles, **on ne les regenere jamais**. On modifie la copy a l interieur du markup existant, rien d autre.

```
node wp-push.mjs --slug les-medias
```

Le push refuse d ecrire si la page a bouge cote WordPress depuis le dernier pull : c est la protection contre le travail perdu. Le message est explicite et le code de sortie vaut 2. Dans ce cas : re-pull, report de la modification sur la version fraiche, puis push. Le `--force` existe mais il ecrase le travail de quelqu un d autre.

Avant de pousser, le script affiche un diff et demande confirmation. Apres, il affiche l id de la derniere revision : c est le retour arriere natif de WordPress, disponible depuis l admin.

## Verifier ou en est le site

```
node wp-drift.mjs
```

Trois sondes : le contenu des pages contre le manifest, le tampon de build contre le dernier commit, l inventaire des extensions et des themes contre la photo de reference. Code de sortie 2 si quelque chose a derive. A lancer au debut de chaque session de travail sur le site.

---

# Purge et verification

| Moyen | Quand |
| --- | --- |
| `node wp-push.mjs --purge-only` | apres un deploiement, ou quand une modification ne se voit pas |
| admin WP > LiteSpeed Cache > Purger tout | quand le REST ne repond pas |

La verification se fait **toujours en navigation privee**, et sur la vraie URL canonique `https://www.maison-audacieuse.fr` (l apex sans `www` redirige en 301).

Trois caches se superposent et se trompent mutuellement : LiteSpeed cote serveur, le Guest Mode de LiteSpeed qui sert une version pre-generee aux visiteurs non connectes, et le CSS critique de Jetpack Boost qui garde une photo de l ancienne mise en page. Une purge suivie d une fenetre privee traite les trois.
