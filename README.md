# 🍽️ Resto Bonheur – Application de Réservation

Resto Bonheur est une application web permettant aux clients de réserver une table dans un restaurant, et aux administrateurs de consulter et gérer ces réservations via un tableau de bord sécurisé.

---

## 🧱 Architecture du projet

Ce projet est divisé en deux parties principales :

- `frontend/` → Application cliente en **React.js** (avec Vite)
- `backend/` → Serveur **Node.js** avec **Express** et base de données **MySQL**

---

## 🚀 Fonctionnalités principales

### Côté client (visiteur) :

- Formulaire de réservation (nom, email, date, heure, nombre de personnes)
- Message de confirmation après soumission

### Côté admin :

- Authentification (email + mot de passe)
- Affichage des réservations dans un tableau
- Suppression des réservations
- Déconnexion

---

## 🔐 Sécurité

- Authentification admin via **JWT**
- Mots de passe hachés avec **bcrypt**
- Requêtes sécurisées (aucun accès admin sans token)
- Stockage du token dans le **localStorage**

---

## 🧪 Tests Cypress

- ✔️ Réservation avec données valides
- ✔️ Connexion admin réussie
- ✔️ Connexion admin échouée (mauvais mot de passe)
- ✔️ Suppression d'une réservation

Tous les tests sont situés dans :  
`cypress/e2e/resto.cy.js`

---

## ⚙️ Technologies utilisées

- React + Vite
- Node.js + Express
- MySQL
- JWT
- Bcrypt
- Cypress

---

## 📦 Installation et lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-utilisateur/resto-bonheur.git
cd resto-bonheur
```
