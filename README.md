# Mini Projet Frontend

Ce projet est une application frontend développée en **React.js** avec **Vite.js**, utilisant **Bootstrap** et d'autres bibliothèques populaires comme `axios`, `react-router-dom` et `react-toastify`.

## Technologies utilisées

- [React 19](https://react.dev/)
- [Vite 6](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Structure du projet

mini_projet_front
- public/
- src/
 - assets/
 - components/
 - data/
 - Layouts/
 - Pages/
 - Routes/
 - App.jsx
 - index.css
 - main.jsx
- .env
- .eslintrc.cjs
- vite.config.js
- package.json
- README.md
- vite.config.js

## Installation

git clone https://github.com/ton-utilisateur/mini_projet_front.git
cd mini_projet_front
- Installer les dépendances :
npm install
- Configurer les variables d'environnement
Créer un fichier .env à la racine et adapte les valeurs à ton backend:
VITE_API=http://localhost:5000
VITE_URL_IMAGE=http://localhost:5000
- Lancer le projet en développement
npm run dev
- Créer une version de production
npm run build
- Prévisualiser la build
npm run preview
## Fonctionnalités
- Connexion
- Inscription
- Déconnexion
- Ajout produit
- Détail produit
- Modifier produit
- Supprimer
- Liste utilisateur
# Authentification
Le token d'authentification est stocké dans le localStorage sous la clé "token".
## Auteur
*Oumy Laye Kane* https://github.com/OumyLayelay1