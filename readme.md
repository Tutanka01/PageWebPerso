# MohTerm - Portfolio Terminal Interactif de Mohamad El Akhal

![MohTerm Screenshot](images/site.png) <!-- Assure-toi que le chemin est correct -->

Bienvenue sur **MohTerm**, une simulation de terminal personnalisée mettant en avant mes compétences en Cybersécurité et Infrastructure/DevOps via une interface interactive unique.

## Concept

Ce projet sert de portfolio dynamique, présentant mon profil, mes compétences techniques, mes projets et mon CV dans l'environnement familier (et stylisé) d'un terminal en ligne de commande.

## Technologies

*   HTML5 (Sémantique, ARIA pour accessibilité basique)
*   CSS3 (Variables, Grid, Flexbox, Animations, Themes)
*   JavaScript (ES6 Modules, DOM Manipulation, Canvas API, LocalStorage)
*   Docker (Nginx pour service statique)

## Fonctionnalités

*   **Interface Terminal Réactive :** Simulation d'un shell avec effets visuels (scanlines, flicker, glow).
*   **Commandes Interactives :**
    *   `aide` / `help`: Affiche le manuel des commandes.
    *   `profil` / `about`: Présente Mohamad El Akhal.
    *   `competences [cat|tout]` / `skills`: Détaille l'expertise technique (par catégorie: `infra`, `secu`, `devops`, `script`, `transverses`).
    *   `projets` / `projects`: Liste des projets notables avec liens.
    *   `cv` / `resume`: Fournit un lien pour télécharger le CV PDF.
    *   `blog`: Lien vers le blog Makhal.fr.
    *   `contact`: Affiche les informations de contact (LinkedIn, GitHub).
    *   `theme [nom]` : Change le thème visuel (ex: `default`, `matrix`, `amber`).
    *   `settings [effet] [on|off]` : Active/désactive des effets visuels (ex: `settings scanlines off`).
    *   `banniere` / `banner`: Réaffiche l'écran d'accueil.
    *   `effacer` / `clear`: Nettoie l'affichage.
    *   `date`: Affiche la date/heure.
    *   `echo [texte]`: Répète le texte.
*   **Historique :** Navigation via les flèches ↑/↓.
*   **Auto-complétion :** Touche [Tab] pour compléter les commandes (gère les préfixes communs).
*   **Thèmes :** Choix entre plusieurs schémas de couleurs.
*   **Paramètres Visuels :** Possibilité d'activer/désactiver certains effets (persistant via `localStorage`).
*   **Responsive Design :** S'adapte aux différentes tailles d'écran.
*   **Déploiement Facile :** Conteneurisé avec Docker et Nginx.

## 🚀 Lancement Rapide (Docker Compose)

Ce projet est servi comme un site statique via Nginx.

1.  **Prérequis :** Assurez-vous d'avoir [Docker](https://docs.docker.com/get-docker/) et [Docker Compose](https://docs.docker.com/compose/install/) installés.
2.  **Structure :** Organisez les fichiers comme indiqué ci-dessus. **Important :** Placez votre CV au format PDF dans `src/cv/MohamadElAkhal_CV.pdf`.
3.  **Lancer le conteneur :** Depuis le dossier racine `mohterm-portfolio/`, exécutez :
    ```bash
    docker compose up -d
    ```
4.  **Accéder au site :** Ouvrez votre navigateur et allez à l'adresse [http://localhost:8080](http://localhost:8080).
5.  **Arrêter le conteneur :**
    ```bash
    docker compose down
    ```

## Améliorations Potentielles Futures

*   Navigation de "système de fichiers" virtuel (`ls`, `cd`, `cat`).
*   Intégration API GitHub pour afficher l'activité récente.
*   Easter eggs ou mini-jeu en mode texte.
*   Vérification plus poussée des contrastes pour l'accessibilité (WCAG).