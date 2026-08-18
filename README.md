# maison-audacieuse.fr

Dépôt du site de La Maison Audacieuse (Annecy) : thème enfant Kadence, code custom, contenu source, scripts d'exploitation et chaîne de déploiement. Le site tourne sous WordPress (thème Kadence + Kadence Blocks version libre, Pro absent, vérifié par WP-CLI le 18/08/2026) chez o2switch.

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

Code (thème enfant, mu-plugins) : GitHub Actions → rsync par SSH vers o2switch, avec sauvegarde tar côté serveur avant, smoke test après, rollback automatique si échec. Voie sans SSH : zips de release téléversables depuis l'admin WP. Contenu : piloté en local par l'API REST (jamais depuis Actions — le pare-feu o2switch bloque les robots). Détail : `docs/deploiement.md` et `docs/rollback.md`.

Le pilotage du projet vit dans le vault Atlas v2 (`02 Projets/LMA - Maison Audacieuse`), l'outillage agent dans le skill `site-web` du même vault.
