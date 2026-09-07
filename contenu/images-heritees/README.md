# Images du site WordPress, sorties du site statique

Vingt-huit fichiers que le site WordPress affiche encore et que le site refondu
n appelle plus : anciennes photos de bandeau, vignettes des cinq espaces, logos
de partenaires, captures d articles de presse, un extrait de film de 2,6 Mo.

Ils sont sortis de `src/assets/img/` le 08/09/2026, pas supprimes. Le build
recopie tout `src/assets/`, donc ils partaient sur le serveur a chaque envoi
sans qu aucune page ne les demande : 3,2 Mo de deploiement pour rien.

Ils restent ici parce que le site WordPress vit encore et parce qu on ne
supprime pas. Le jour de la bascule, ce dossier peut suivre en archive.

Les images du site refondu vivent dans `src/assets/img/`, en WebP.
