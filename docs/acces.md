# Acces au site maison-audacieuse.fr

Ce document dit **qui detient quoi** et **ou vit chaque secret**. Il ne contient aucune valeur : pas un mot de passe, pas une cle, pas un jeton. Le depot est public : rien de ce qui s ecrit ici, dans un commit ou dans un workflow ne doit jamais contenir un secret.

Pour brancher un acces qui manque :

```
bash "<vault>/.claude/scripts/site/wizard-acces.sh"
```

Le wizard guide etape par etape, ecrit dans le `.env` local et dans les secrets GitHub, et met a jour ce fichier pour l etat.

## Ou vivent les secrets

| Endroit | Ce qu il contient | Qui y accede |
| --- | --- | --- |
| `.env` du clone local (`C:\Users\romai\dev\maison-audacieuse\.env`) | mot de passe d application WP, coordonnees SSH, chemin de la cle privee | Romain, sur sa machine |
| `~/.ssh/o2switch_lma` | cle privee de deploiement, dediee, sans passphrase | Romain, sur sa machine |
| Secrets GitHub Actions du depot `verslinfini/maison-audacieuse` | ce dont le workflow de deploiement a besoin | le workflow, en lecture seule et en aveugle |
| Coffre du collectif (`00 Acces`, Nextcloud) | acces partages de l equipe | le collectif |

Ce que cela exclut, sans exception : le vault Atlas, ce depot, un compte-rendu, un mail, un message. Le `.env` est ignore par git (`.gitignore`), il ne peut pas partir par accident.

## Qui detient quoi

| Acces | Detenteur | Etat |
| --- | --- | --- |
| Administrateur WordPress | Romain | en place |
| Hebergement o2switch (cPanel) | Romain | en place |
| Depot GitHub `verslinfini/maison-audacieuse` | Romain (compte `verslinfini`) | en place, prive |
| Nom de domaine `maison-audacieuse.fr` | a confirmer | **a clarifier avec l agence** |
| Licence Kadence Blocks Pro | a confirmer | **a clarifier avec l agence** |
| Compte Brevo (emailing) | Romain | en place |

Les deux lignes a clarifier sont plus urgentes que le reste : sans le domaine, aucune reprise en main du DNS n est possible ; sans la licence Kadence Pro, les blocs Pro deja utilises sur les pages cessent d etre mis a jour.

## Acces techniques a brancher

Etat au moment de la creation du depot. Le wizard met cette section a jour.

| Acces | Variable | Ou | Etat |
| --- | --- | --- | --- |
| Mot de passe d application WP | `WP_APP_USER`, `WP_APP_PASSWORD` | `.env` | a brancher via wizard (etape 1) |
| URL du site | `WP_BASE_URL` | `.env` | a brancher via wizard (etape 1) |
| SSH o2switch | `O2_HOST`, `O2_PORT`, `O2_USER` | `.env` | a brancher via wizard (etape 2) |
| Cle de deploiement | `O2_SSH_KEY_PATH` | `.env` | a brancher via wizard (etape 2) |
| Racine WordPress sur le serveur | `O2_PATH_WP` | `.env` | a brancher via wizard (etape 2) |
| Cle privee pour Actions | `O2_SSH_KEY` | secret GitHub | a brancher via wizard (etape 3) |
| Empreinte du serveur | `O2_KNOWN_HOSTS` | secret GitHub | a brancher via wizard (etape 3) |
| Coordonnees serveur | `O2_HOST`, `O2_PORT`, `O2_USER` | secrets GitHub | a brancher via wizard (etape 3) |
| Chemins de deploiement | `O2_PATH_THEME`, `O2_PATH_MU` | secrets GitHub | a brancher via wizard (etape 3) |

## Revoquer un acces

| Acces | Comment | Effet |
| --- | --- | --- |
| Mot de passe d application WP | admin WP > profil > Mots de passe d application > Revoquer | les scripts locaux s arretent, le compte reste intact |
| Cle SSH de deploiement | cPanel > Acces SSH > Gerer les cles > supprimer | le workflow de deploiement s arrete, la voie B (zip) reste ouverte |
| Secrets GitHub | Settings > Secrets and variables > Actions > supprimer | le workflow s arrete |

Chaque acces est revocable seul, sans toucher aux autres, et sans changer le mot de passe principal de Romain. C est la raison d etre du mot de passe d application et de la cle dediee.

## Delivrabilite email

Trois enregistrements DNS decident si les mails de la campagne arrivent en boite de reception ou en spam : SPF (qui a le droit d envoyer pour le domaine), DKIM (la signature qui prouve l origine), DMARC (la politique en cas d echec des deux premiers).

Cette section est remplie automatiquement par l etape 4 du wizard.

<!-- delivrabilite:debut -->

Releve du 2026-08-17 (wizard-acces.sh, etape 4) :

| Enregistrement | Etat |
| --- | --- |
| SPF (maison-audacieuse.fr) | present |
| DKIM | present (selecteurs : default) |
| DMARC (_dmarc.maison-audacieuse.fr) | present |

<!-- delivrabilite:fin -->
