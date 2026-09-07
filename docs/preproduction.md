# Monter la preproduction

`preprod.maison-audacieuse.fr` : un site complet, sur le vrai serveur, protege par mot de passe et invisible des moteurs. C est la que se recettent les pages et le tunnel avant la production, et il reste apres la mise en ligne.

Sept etapes, toutes dans cPanel o2switch sauf la derniere. Compter vingt minutes. Rien ici ne touche au site en production.

Regle qui ne bouge pas : **aucun mot de passe, aucune cle privee ne se colle dans une conversation, dans le vault ou dans ce depot.** Les secrets vont dans le `.env` local et dans les secrets GitHub, ou le wizard les met tout seul.

---

## 1. Ouvrir cPanel

Espace client o2switch, bouton **cPanel**. Ou directement `https://maison-audacieuse.fr:2083` si l adresse repond.

## 2. Creer le sous-domaine

1. Chercher **Domaines** dans la barre de recherche en haut de cPanel (sur les versions plus anciennes, la tuile s appelle **Sous-domaines**).
2. Bouton **Creer un domaine**.
3. Champ **Domaine** : `preprod.maison-audacieuse.fr`.
4. **Decocher** la case « Partager le repertoire racine avec... ». C est le point a ne pas rater : la preproduction doit avoir son propre dossier, sinon elle sert les memes fichiers que la production et ne sert plus a rien.
5. Champ **Racine du document** : laisser ce que cPanel propose, en general `preprod.maison-audacieuse.fr`. **Noter ce chemin exact**, il servira a l etape 7.
6. **Envoyer**.

Le sous-domaine est cree, ainsi que l enregistrement DNS qui va avec, puisque la zone est chez o2switch.

## 3. Verifier que le sous-domaine repond

Ouvrir `http://preprod.maison-audacieuse.fr` dans un navigateur. Une page vide ou un index de dossier suffit : ce qu on verifie, c est que le serveur repond et non que le site existe.

Si le navigateur ne trouve pas l adresse, attendre dix minutes et reessayer. La propagation DNS d un sous-domaine chez son propre hebergeur est quasi immediate, mais le cache du poste peut retarder.

## 4. Obtenir le certificat HTTPS

o2switch genere le certificat tout seul, en general dans l heure.

Pour ne pas attendre : chercher **SSL/TLS Status** (ou **Statut SSL/TLS**), cocher la ligne `preprod.maison-audacieuse.fr`, puis **Run AutoSSL**.

Verifier ensuite que `https://preprod.maison-audacieuse.fr` s ouvre sans avertissement de securite.

## 5. Poser le mot de passe

1. Chercher **Confidentialite du repertoire** (ou **Directory Privacy**).
2. Naviguer jusqu au dossier note a l etape 2.
3. Cliquer sur son **nom** (pas sur l icone de dossier, qui ne fait qu entrer dedans).
4. Cocher **Proteger ce repertoire par un mot de passe**, donner un nom parlant comme `Preproduction Maison Audacieuse`, **Enregistrer**.
5. Plus bas, **Creer un utilisateur** : un identifiant et un mot de passe. C est ce couple qui sera donne a l equipe.

Verifier : rouvrir `https://preprod.maison-audacieuse.fr` en navigation privee. Le navigateur doit demander l identifiant.

**Garder ce couple dans le coffre du collectif**, pas ailleurs.

## 6. Brancher l acces SSH

Depuis Git Bash, sur la machine :

```
bash "C:/Users/romai/OneDrive/04 L'univers v2/.claude/scripts/site/wizard-acces.sh"
```

Faire les **etapes 2 et 3** (cle SSH o2switch, secrets GitHub). L etape 1 concerne WordPress, elle peut etre sautee.

Le wizard genere une cle dediee, la depose dans cPanel, ecrit les coordonnees dans le `.env` local et pose les secrets GitHub. Il annonce chaque ecriture avant de la faire.

## 7. Me donner trois informations

De quoi rebrancher le deploiement sur la preproduction. Aucune n est un secret.

| Quoi | Ou le lire |
|---|---|
| Le chemin complet de la racine du document | cPanel > Domaines > la ligne `preprod` |
| Le nom d utilisateur cPanel | en haut a droite de cPanel |
| La version de PHP active | cPanel > **Selectionner la version de PHP** |

La version de PHP sert au tunnel, autant la relever maintenant.

---

## Ce que je fais ensuite, sans toi

Rebrancher le workflow de deploiement sur le dossier de la preproduction, y envoyer le site, verifier qu il s affiche, puis provoquer un retour arriere pour prouver que la chaine sait revenir. Poser le `robots.txt` bloquant et le `noindex`.

## Si ca coince

**Le sous-domaine sert le meme site que la production.** La case « Partager le repertoire racine » est restee cochee a l etape 2. Supprimer le domaine et le recreer en la decochant.

**Le navigateur ne demande pas de mot de passe.** La protection a ete posee sur le mauvais dossier. Verifier le chemin dans Confidentialite du repertoire, il doit correspondre exactement a celui note a l etape 2.

**Avertissement de securite en HTTPS.** Le certificat n est pas encore emis. Relancer AutoSSL, ou attendre une heure.

**Le wizard ne trouve pas le depot.** Lui donner le chemin : `bash wizard-acces.sh --repo C:/Users/romai/dev/maison-audacieuse`.
