# maison-audacieuse.fr

Dépôt du site de La Maison Audacieuse (Annecy), hébergé o2switch. Il porte **deux sites** le temps de la bascule.

Le **WordPress en production** sur `www.maison-audacieuse.fr` : thème Kadence, `theme/`, `mu-plugins/`, `contenu/blocs/`, scripts `wp-*` du vault. Il n'a pas bougé.

Le **site statique refondu** sur `preprod.maison-audacieuse.fr` : `src/`, assemblé par `build.mjs`, déployé par `deploie.mjs`, contrôlé par `verif/pages.mjs`. Onze pages au 07/09/2026. Il remplacera le WordPress au module M8, sur décision de Romain.

## Ce que contient ce dépôt

| Dossier | Contenu |
|---|---|
| `theme/kadence-child/` | Thème enfant Kadence déployé en production |
| `mu-plugins/` | Code custom (lma-core) |
| `contenu/pages/` | Copy source des pages, en markdown |
| `contenu/blocs/` | Block markup effectivement poussé sur le site + `manifest.json` |
| `snapshot/` | État constaté du site (pages, plugins, réglages, SEO, redirections) |
| `scripts/` | Helpers propres au site |
| `docs/` | Procédures : déploiement, rollback, accès (sans aucun secret) |
| `.github/workflows/` | Déploiement rsync/SSH, build de zips de release, lint |

## Ce que ce dépôt ne contient jamais

Dumps de base de données (données personnelles), dossier `uploads/`, `wp-config.php` réel, secrets ou identifiants, zips de plugins payants. Les sauvegardes lourdes vivent dans `C:\Users\romai\Sauvegardes\maison-audacieuse\`, hors git et hors OneDrive.

## Qui a la main

Romain Bidot (compte GitHub `verslinfini`). Le site a été créé par Pitch Web Création (Stéphanie) ; pendant la campagne de parts sociales, une seule main sur le site : ce dépôt fait foi pour le code, WordPress fait foi pour le contenu publié.

## Déploiement en bref

**Site statique, vers la préproduction** : `node deploie.mjs`, depuis la machine. Sauvegarde horodatée côté serveur, envoi, synchronisation par rsync là-bas, contrôle par comparaison d'empreintes. `node deploie.mjs --retour` restaure la version précédente, `--liste` montre les dix sauvegardes conservées.

Pas de GitHub Actions : o2switch filtre le SSH par IP et les serveurs de GitHub changent d'adresse en permanence. Deux contournements existent, l'autorisation dynamique par l'API cPanel et le FTPS qui n'est pas filtré, tous deux au prix d'un secret confié à un tiers. Arbitrage de Romain du 07/09/2026.

**WordPress de production** : contenu piloté en local par l'API REST, jamais depuis un runner, le pare-feu o2switch bloquant les robots. Thème et mu-plugins par la chaîne décrite dans `docs/deploiement.md`, avec `docs/rollback.md` pour le retour.

**Les secrets ne sont pas ici.** Ils vivent dans `~/.secrets/maison-audacieuse/.env`, hors OneDrive, et la clé SSH dans `~/.ssh/`.

Le pilotage du projet vit dans le vault Atlas v2 (`02 Projets/LMA - Maison Audacieuse`), l'outillage agent dans le skill `site-web` du même vault.
