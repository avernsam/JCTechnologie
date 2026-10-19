# JC Technology — site vitrine

Site statique en français, réalisé en HTML, CSS et JavaScript natifs. Aucun framework, serveur ou processus de compilation n’est nécessaire. Ouvrez `index.html` dans un navigateur pour prévisualiser le site.

## Personnalisation

- **Téléphone et WhatsApp :** les boutons d’appel lancent un appel téléphonique normal vers `+243 803 548 088` via `tel:`. WhatsApp reste séparé au `+243 991 085 865` : modifiez la constante `WHATSAPP_NUMBER` en haut de `js/main.js` (format international, sans `+`). Pour changer les numéros, actualisez les liens `tel:`, les liens WhatsApp, l’email et les téléphones du bloc JSON-LD dans `index.html`.
- **Géolocalisation GPS :** la fiche présente les alertes de mouvement ou de choc, l’heure et la position. La coupure moteur, la vidéo et le signalement d’incident sont indiqués comme options conditionnelles au traceur et au système installés. Son visuel est `assets/gps-alert-demo.jpeg`.
- **Photo de climatisation :** `assets/climatisation-photo.jpg`, par Thidapa, sous licence [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), [source Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Room_air_conditioning_unit_above_a_green_curtain.jpg).
- **Photo de toiture solaire :** `assets/solaire-toiture-istock.jpg`, « Solar Panels on Roof of Home », photo de Cindy Shebley, Getty Images/iStock (asset 985363900). Fournie par le propriétaire du site avec licence iStock pour son utilisation sur le site.
- **Carte :** la carte interactive OpenStreetMap est centrée sur le Haut-Katanga et le Lualaba. Elle s’affiche avec une connexion Internet ; le lien sous la carte ouvre l’itinéraire dans Google Maps.
- **Textes :** modifiez les contenus directement dans `index.html`. Les libellés des services du formulaire doivent correspondre à ceux des liens de devis pour sélectionner automatiquement le service.
- **Couleurs :** changez les variables de `:root` au début de `css/style.css`.
- **Mode sombre :** utilisez le bouton soleil/lune dans l’en-tête. Le choix est mémorisé dans le navigateur ; adaptez les couleurs sombres dans le bloc `html[data-theme="dark"]` de `css/style.css`.
- **Logo :** le logo JCT officiel recadré pour l’en-tête, le favicon et l’aperçu de partage est `assets/logo.svg`. L’image complète présentant la marque et ses services dans la section « À propos » est `assets/jct-brand-services.jpeg`. La photo de véhicule est dans `assets/jct-vehicle.jpe`. Les pictogrammes de services extraits de l’image JCT fournie sont dans `assets/service-*.jpg` ; cette image d’origine est conservée dans `assets/jct-brand-services.png`. Les illustrations originales de la section services sont les fichiers `assets/service-*-scene.svg` et `assets/service-air-conditioning.svg`.

## Publication

**Netlify :** créez un nouveau site par glisser-déposer du dossier du projet dans Netlify, ou connectez le dépôt GitHub. La commande de build et le dossier de publication sont tous deux inutiles pour ce site ; si Netlify les demande, laissez la commande vide et publiez la racine du projet.

**GitHub Pages :** ajoutez les fichiers à un dépôt GitHub, puis ouvrez **Settings → Pages**. Sélectionnez **Deploy from a branch**, choisissez la branche et le dossier racine (`/`), puis enregistrez. Le site sera publié à l’adresse affichée dans les paramètres Pages.

## À personnaliser avant publication

- Ajouter des photos réelles et optimisées des installations et de l’équipe, avec des textes alternatifs descriptifs.
- La section « Clients satisfaits » présente un compteur animé de +100 clients, les quatre domaines d’expertise et les quatre villes desservies. Les compteurs s’animent à l’affichage et restent statiques si la réduction des animations est activée.
- Vérifier les coordonnées, les zones desservies, les services proposés et les disponibilités d’intervention.
- Ajouter l’URL du site dans les métadonnées Open Graph lorsque le domaine sera connu.
