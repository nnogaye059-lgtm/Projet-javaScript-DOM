# Quiz réseaux et informatique

Mini-projet JavaScript & DOM — Licence 1 Informatique, Technologie Web.

## Principe

Application web interactive de type quiz à choix multiples, réalisée en HTML, CSS et JavaScript pur (sans framework ni librairie). Les questions proviennent d'un tableau d'objets JavaScript. Le script génère les boutons de réponse, corrige chaque réponse, met à jour le score et affiche un bilan final. La page n'est jamais rechargée.

## Utilisation

1. Ouvrir `index.html` dans un navigateur.
2. Cliquer sur **Commencer le quiz** (l'option « Mélanger l'ordre des questions » est activée par défaut).
3. Répondre en cliquant sur un choix, ou avec les touches **1 à 4** du clavier.
4. Lire la correction, puis cliquer sur **Question suivante** (ou appuyer sur Entrée).
5. À la fin, consulter le score et les questions à revoir, puis **Rejouer** si besoin.

## Structure du projet

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page (trois écrans : accueil, questions, résultat) |
| `style.css` | Mise en forme |
| `script.js` | Logique de l'application |
| `README.md` | Présentation du projet |

## Correspondance avec le cahier des charges

| Exigence | Où la trouver dans `script.js` |
|---|---|
| Événement utilisateur | `addEventListener` sur les boutons (`click`) et sur le document (`keydown`) |
| Mise à jour du DOM | `createElement`, `appendChild`, `textContent`, `classList`, attribut `hidden` |
| Structure conditionnelle | `verifierReponse()` (bonne ou mauvaise réponse), `passerALaSuivante()`, `afficherResultat()` (message selon le score) |
| Boucle | `afficherQuestion()` (génération des boutons), `verifierReponse()` (coloration), `afficherResultat()` (bilan), `melanger()` |
| Fonctions claires | `afficherEcran`, `melanger`, `creerPorts`, `demarrerQuiz`, `afficherQuestion`, `verifierReponse`, `passerALaSuivante`, `afficherResultat`, `gererClavier` |
| Données statiques | Tableau d'objets `questions` en tête de `script.js` |

## Ajouter ou modifier une question

Dans le tableau `questions` de `script.js`, ajouter un objet :

```javascript
{
  id: 11,
  categorie: "Réseaux",
  enonce: "Votre question ?",
  choix: ["Choix A", "Choix B", "Choix C", "Choix D"],
  reponseCorrecte: 0,   // indice du bon choix (0 = premier)
  explication: "Courte explication affichée après la réponse."
}
```

Le nombre de questions, la barre de progression et le bilan s'adaptent automatiquement.

## Publier sur GitHub

```bash
git init
git add .
git commit -m "Mini-projet JavaScript : quiz interactif"
git branch -M main
git remote add origin https://github.com/nnogaye059-lgtm/Projet-javaScript-DOM
git push -u origin main
```
