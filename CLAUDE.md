# maison-audacieuse.fr — dépôt du site

Site de La Maison Audacieuse (SCIC La Coop Audacieuse, Annecy), hébergé o2switch. Le dépôt vit dans le vault, sous `02 Projets/LMA - Maison Audacieuse/05 Site web/03 Code/`.

## Deux sites, pour l'instant

**Le site en production est encore WordPress** (thème Kadence), servi sur `www.maison-audacieuse.fr`. Il n'a pas bougé et ne bouge pas sans décision de Romain.

**Le site refondu est statique** : du HTML assemblé par `build.mjs`, servi sur `preprod.maison-audacieuse.fr`. C'est lui qui remplacera le WordPress à la bascule (module M8).

Tant que la bascule n'a pas eu lieu, les deux coexistent. `contenu/blocs/` et les scripts `wp-*` du vault servent le premier, `src/` et `build.mjs` servent le second. Ne pas mélanger les deux mondes.

## Règles dures

- Jamais dans ce dépôt : dump de base, `uploads/`, secrets, données personnelles. **Le `.env` n'y est plus** : les secrets vivent dans `~/.secrets/maison-audacieuse/.env`, hors OneDrive, et la clé SSH dans `~/.ssh/`.
- **Aucun chiffre qui ne soit dans `contenu/pages/chiffres-autorises.md`.** Un chiffre absent de ce fichier est retiré de la page, jamais nuancé. Un chiffre qui manque s'écrit `[À SOURCER : …]` en clair.
- **Aucune promesse fiscale** sur les parts sociales tant que l'agrément ESUS est en instruction.
- Rien ne part en production sans sauvegarde préalable ni plan de retour écrit avant (`docs/rollback.md`).
- Tout script qui parle au site en production envoie un User-Agent navigateur (Tiger Protect o2switch bloque les UA robots).
- Vérification après déploiement en navigation privée.
- Pas de tiret cadratin, pas de point d'exclamation, pas d'espace en début de ligne.

## Le site statique

```
src/gabarit.html      la coquille : tête HTML, entête, pied, emplacement du contenu
src/partials/         les morceaux communs, un fichier chacun
src/pages/            une page = un fichier, avec son en-tête « titre / description / sortie »
src/styles/base.css   ce qui sert à plus d'une page, dont les composants de pages intérieures
src/styles/<page>.css ce qui ne sert qu'à une page
build.mjs             assemble dans dist/
deploie.mjs           envoie en préproduction, avec sauvegarde et retour arrière
verif/pages.mjs       contrôle mécanique de toutes les pages
```

`dist/` est produit. On ne l'édite jamais, on ne le commite jamais.

```
node build.mjs                    site de recette : noindex, robots.txt bloquant
node build.mjs --prod             site public : indexable
node build.mjs --sortie <dossier> construire ailleurs (travaux parallèles)
node verif/pages.mjs              contrôler toutes les pages
node deploie.mjs                  déployer en préproduction
node deploie.mjs --retour         revenir à la version précédente
node deploie.mjs --liste          les sauvegardes du serveur
```

Les conventions d'écriture et le catalogue des composants sont dans `docs/conventions.md`. **Les lire avant d'ajouter une page**, sinon la page ne ressemblera pas aux autres.

## Le déploiement est local, et c'est un choix

GitHub Actions ne peut pas déployer ici : o2switch filtre le SSH par IP et les serveurs de GitHub changent d'adresse en permanence. Deux contournements existent, l'autorisation dynamique par l'API cPanel (module `SshWhitelist`) et le FTPS qui n'est pas filtré, tous deux au prix d'un secret confié à un tiers. Arbitrage de Romain du 07/09/2026 : pour un site qu'on publie à la demande, le gain ne vaut pas ce prix.

`deploie.mjs` sauvegarde l'existant côté serveur avant chaque envoi, garde les dix dernières versions, et compare les empreintes locale et distante après coup. Le contrôle ne passe pas par HTTP : la préproduction demande un mot de passe que le script n'a pas et ne doit pas avoir.

`.htaccess`, `.well-known` et `cgi-bin` sont exclus du `--delete`. Sans cette exclusion, un déploiement emporterait la protection par mot de passe et la validation du certificat.

## Où est quoi

- Skill de travail : `/site-web` dans le vault, fiche du site : `.claude/skills/site-web/sites/maison-audacieuse.fr.md`
- Scripts d'exploitation WordPress : `.claude/scripts/site/` du vault (wp-pull, wp-push, wp-drift, wizard-acces)
- Pilotage projet : `02 Projets/LMA - Maison Audacieuse/CLAUDE.md`
- Architecture, roadmap et procédures : `05 Site web/02 Technique/`
- Beats et copy validée : `05 Site web/01 Contenu/`
- Sauvegardes lourdes : `C:\Users\romai\Sauvegardes\maison-audacieuse\`
