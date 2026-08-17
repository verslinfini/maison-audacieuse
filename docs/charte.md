# Charte graphique La Maison Audacieuse

Source d'autorité : `04 COM/00 Charte graphique/maison audacieuse.pdf` sur le Nextcloud du collectif (chemin local `C:\Users\romai\LMA_La Maison Audacieuse\`), 10 pages, créée par Sophie. Extraction du 2026-08-17 (codes relevés sur la planche palette, page 4). Ce fichier est la copie de référence pour le travail sur le site : la charte est un intrant fermé, elle s'applique, elle ne se rouvre pas.

## Les 7 couleurs

| Code | Couleur | Rôle observé dans la charte |
| --- | --- | --- |
| `#766DA0` | violet principal | logo (maison), titres Meow Script, puces, blocs pleins |
| `#383648` | violet sombre | texte des titres Onest, fonds sombres, tuiles texte |
| `#9D9669` | kaki / olive | mots d'accent Meow Script, surlignage derrière les titres |
| `#5E9E85` | vert | accent, tuiles |
| `#A3716A` | terracotta | accent chaud, tuiles, fonds de tuile |
| `#BAFFE4` | menthe pastel | accent clair, fonds légers |
| `#FFF3A8` | jaune pâle | accent clair, fonds légers |

Une seule zone chaude par vue : les accents (kaki, vert, terracotta, menthe, jaune) se posent un par un, jamais empilés. Le kitsch de la charte se porte par un geste franc, pas par une accumulation.

## Typographies

| Police | Usage | Fichiers |
| --- | --- | --- |
| **Onest** | titres (bold) ET corps de texte (regular). La police de travail du site | Nextcloud `04 COM/00 Charte graphique/Onest/` |
| **Meow Script** | mots d'accent manuscrits (« meet », un mot dans un titre), le lettrage du logo. Jamais un paragraphe, jamais un texte long | Nextcloud `04 COM/00 Charte graphique/Meow_Script,Onest/` |

## Fonds

Deux familles de fonds granuleux (grain photographique marqué, dégradés doux) :

- **Sombre** : dégradé violet `#383648` / violet `#766DA0` vers kaki-olive, pour les tuiles à texte blanc et les pages de garde.
- **Clair pastel** : dégradé bleu pâle / rose / crème, pour les fonds de page et les tuiles douces.

Le logo : maison violette `#766DA0` au lettrage manuscrit blanc, ou maison blanche au lettrage violet sur fond coloré. Il signe chaque support en pied.

## Déclinaison web en production (palette Kadence, relevée le 2026-08-17)

Le site actuel n'exploite que le registre violet de la charte :

| Slot Kadence | Code | Usage |
| --- | --- | --- |
| palette1, palette3 | `#383648` | titres, accents sombres |
| palette2, palette6 | `#766DA0` | violet principal, liens, boutons |
| palette4, palette5 | `#56546B` | texte courant (gris-violet propre au site, absent du PDF) |
| palette7 | `#EDEDF5` | fond léger violacé |
| palette8 | `#F5F5F6` | fond gris clair |
| palette9 | `#FFFFFF` | blanc |

Écart charte / site : les 5 couleurs chaudes du PDF (`#9D9669`, `#5E9E85`, `#A3716A`, `#BAFFE4`, `#FFF3A8`) ne sont pas dans la palette Kadence. La refonte peut les mobiliser (jauges, tuiles, accents de section) en respectant la règle d'une zone chaude par vue. Le `#56546B` du texte est une interpolation web raisonnable entre `#383648` et `#766DA0` : le conserver.
