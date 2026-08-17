# maison-audacieuse.fr — dépôt du site

Site WordPress de La Maison Audacieuse (SCIC, Annecy), thème Kadence + Kadence Blocks Pro, hébergé o2switch. Ce dépôt versionne le code et le contenu source ; la production fait foi pour le contenu publié.

## Règles dures

- Jamais dans ce dépôt : dump BDD, `uploads/`, `wp-config.php` réel, secrets, zips de plugins payants. Le `.env` local est ignoré par git.
- Le markdown (`contenu/pages/`) est la source de la copy, jamais du block markup. On ne régénère jamais le markup d'une page Kadence (les `uniqueID` portent les styles) : on pull le markup existant, on substitue la copy à l'intérieur, on diffe, on pushe.
- Rien ne s'écrit en production sans sauvegarde préalable ni plan de retour écrit (`docs/rollback.md`).
- Tout script qui parle au site envoie un User-Agent navigateur (Tiger Protect o2switch bloque les UA robots). URL canonique : `https://www.maison-audacieuse.fr` (l'apex 301 vers www).
- Aucun appel REST au site depuis GitHub Actions : lecture/écriture de contenu toujours en local.
- Vérification post-déploiement en navigation privée (caches LiteSpeed Guest Mode + CSS critique Jetpack Boost).

## Où est quoi

- Skill de travail : `/site-web` dans le vault Atlas v2, fiche du site : `.claude/skills/site-web/sites/maison-audacieuse.fr.md`.
- Scripts d'exploitation : `.claude/scripts/site/` du vault (wp-pull, wp-push, wp-drift, wizard-acces).
- Pilotage projet : vault `02 Projets/LMA - Maison Audacieuse/CLAUDE.md`.
- Sauvegardes lourdes : `C:\Users\romai\Sauvegardes\maison-audacieuse\`.
