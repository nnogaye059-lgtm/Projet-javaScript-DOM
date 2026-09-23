/*
 * ============================================================
 * QUIZ RÉSEAUX ET INFORMATIQUE — Mini-projet JavaScript & DOM
 * ============================================================
 * PRINCIPE
 *   Application web interactive de type quiz à choix multiples.
 *   Les questions sont stockées dans un tableau d'objets (données
 *   statiques). JavaScript génère dynamiquement les boutons de
 *   réponse, corrige chaque réponse, met à jour le score et affiche
 *   un bilan final avec les questions à revoir. La page n'est
 *   jamais rechargée.
 *
 * UTILISATION
 *   1. Ouvrir index.html dans un navigateur.
 *   2. Cliquer sur « Commencer le quiz » (l'option « Mélanger »
 *      change l'ordre des questions).
 *   3. Répondre en cliquant sur un choix, ou avec les touches 1 à 4.
 *   4. Lire la correction, puis passer à la question suivante.
 *   5. À la fin, consulter le score et les questions à revoir, puis
 *      rejouer si on le souhaite.
 * ============================================================
 */

"use strict";


/* ------------------------------------------------------------
 * 1. DONNÉES STATIQUES (tableau d'objets)
 * Pour ajouter une question, copier un objet et modifier ses champs.
 * "reponseCorrecte" est l'INDICE du bon choix dans le tableau "choix"
 * (le premier choix a l'indice 0).
 * ------------------------------------------------------------ */
const questions = [
  {
    id: 1,
    categorie: "Réseaux",
    enonce: "Quelle couche du modèle OSI est chargée du routage des paquets ?",
    choix: ["Liaison de données", "Transport", "Réseau", "Session"],
    reponseCorrecte: 2,
    explication: "La couche Réseau (couche 3) s'occupe de l'adressage logique (IP) et du routage."
  },
  {
    id: 2,
    categorie: "Réseaux",
    enonce: "Quel protocole attribue automatiquement une adresse IP à un ordinateur ?",
    choix: ["DNS", "HTTP", "DHCP", "FTP"],
    reponseCorrecte: 2,
    explication: "Le serveur DHCP distribue automatiquement les paramètres IP (adresse, masque, passerelle)."
  },
  {
    id: 3,
    categorie: "Réseaux",
    enonce: "Quel masque de sous-réseau correspond à la notation /24 ?",
    choix: ["255.255.0.0", "255.0.0.0", "255.255.255.128", "255.255.255.0"],
    reponseCorrecte: 3,
    explication: "/24 signifie 24 bits à 1 : 11111111.11111111.11111111.00000000, soit 255.255.255.0."
  },
  {
    id: 4,
    categorie: "Réseaux",
    enonce: "Quel est le port par défaut du protocole HTTPS ?",
    choix: ["21", "80", "443", "3306"],
    reponseCorrecte: 2,
    explication: "HTTPS utilise le port 443. Le port 80 est celui de HTTP, le 21 celui de FTP."
  },
  {
    id: 5,
    categorie: "Réseaux",
    enonce: "Sur quelle information un commutateur (switch) se base-t-il pour transmettre une trame ?",
    choix: ["L'adresse IP", "L'adresse MAC", "Le nom de domaine", "Le numéro de port TCP"],
    reponseCorrecte: 1,
    explication: "Un commutateur travaille au niveau 2 : il utilise sa table d'adresses MAC."
  },
  {
    id: 6,
    categorie: "Réseaux",
    enonce: "De combien de bits est composée une adresse IPv4 ?",
    choix: ["16 bits", "32 bits", "64 bits", "128 bits"],
    reponseCorrecte: 1,
    explication: "Une adresse IPv4 fait 32 bits (4 octets). Les adresses IPv6 en font 128."
  },
  {
    id: 7,
    categorie: "Réseaux",
    enonce: "Quel protocole traduit un nom de domaine en adresse IP ?",
    choix: ["DNS", "DHCP", "ARP", "SMTP"],
    reponseCorrecte: 0,
    explication: "Le DNS (Domain Name System) associe un nom comme exemple.com à une adresse IP."
  },
  {
    id: 8,
    categorie: "Programmation C",
    enonce: "En langage C, quelle fonction de <stdio.h> affiche un texte formaté à l'écran ?",
    choix: ["scanf", "malloc", "strlen", "printf"],
    reponseCorrecte: 3,
    explication: "printf affiche du texte formaté ; scanf lit une saisie ; malloc alloue de la mémoire."
  },
  {
    id: 9,
    categorie: "Architecture",
    enonce: "Que vaut le nombre binaire 1010 en décimal ?",
    choix: ["8", "10", "12", "14"],
    reponseCorrecte: 1,
    explication: "1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10."
  },
  {
    id: 10,
    categorie: "Architecture",
    enonce: "Quel composant exécute les instructions d'un programme ?",
    choix: ["La mémoire RAM", "Le disque dur", "Le processeur (CPU)", "La carte réseau"],
    reponseCorrecte: 2,
    explication: "Le processeur (CPU) lit et exécute les instructions ; la RAM les stocke temporairement."
  }
];


/* ------------------------------------------------------------
 * 2. ÉTAT DE L'APPLICATION
 * ------------------------------------------------------------ */
let questionsQuiz = [];      // copie des questions (éventuellement mélangée)
let indiceQuestion = 0;      // position de la question affichée
let score = 0;               // nombre de bonnes réponses
let reponseDonnee = false;   // empêche de répondre deux fois à une question
let erreurs = [];            // questions ratées, pour le bilan final


/* ------------------------------------------------------------
 * 3. SÉLECTION DES ÉLÉMENTS DU DOM
 * ------------------------------------------------------------ */
const ecrans = {
  accueil:  document.getElementById("ecran-accueil"),
  quiz:     document.getElementById("ecran-quiz"),
  resultat: document.getElementById("ecran-resultat")
};

const elNbQuestions = document.getElementById("nb-questions");
const caseMelanger  = document.getElementById("case-melanger");
const btnDemarrer   = document.getElementById("btn-demarrer");

const elCategorie   = document.getElementById("categorie");
const elScore       = document.getElementById("score");
const elPorts       = document.getElementById("ports");
const elProgression = document.getElementById("progression");
const elEnonce      = document.getElementById("enonce");
const elChoix       = document.getElementById("choix");
const elRetour      = document.getElementById("retour");
const btnSuivant    = document.getElementById("btn-suivant");

const elScoreFinal  = document.getElementById("score-final");
const elMessage     = document.getElementById("message-final");
const elBlocRecap   = document.getElementById("bloc-recap");
const elRecap       = document.getElementById("recap");
const btnRejouer    = document.getElementById("btn-rejouer");


/* ------------------------------------------------------------
 * 4. FONCTIONS
 * ------------------------------------------------------------ */

// Affiche un seul écran parmi : "accueil", "quiz", "resultat"
function afficherEcran(nom) {
  for (const cle in ecrans) {
    ecrans[cle].hidden = (cle !== nom);
  }
}

// Renvoie une copie mélangée du tableau (algorithme de Fisher-Yates)
function melanger(tableau) {
  const copie = tableau.slice();
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copie[i];
    copie[i] = copie[j];
    copie[j] = temp;
  }
  return copie;
}

// Crée la rangée de "ports" : un par question
function creerPorts() {
  elPorts.innerHTML = "";
  for (let i = 0; i < questionsQuiz.length; i++) {
    const port = document.createElement("span");
    port.className = "port";
    elPorts.appendChild(port);
  }
}

// Change l'état visuel d'un port : "courant", "juste" ou "faux"
function definirEtatPort(indice, etat) {
  elPorts.children[indice].className = "port " + etat;
}

// Initialise une nouvelle partie
function demarrerQuiz() {
  questionsQuiz = caseMelanger.checked ? melanger(questions) : questions.slice();
  indiceQuestion = 0;
  score = 0;
  erreurs = [];
  creerPorts();
  afficherEcran("quiz");
  afficherQuestion();
}

// Affiche la question courante et génère ses boutons de choix
function afficherQuestion() {
  const question = questionsQuiz[indiceQuestion];
  const total = questionsQuiz.length;

  elCategorie.textContent = question.categorie;
  elScore.textContent = "Score : " + score;
  elProgression.textContent = "Question " + (indiceQuestion + 1) + " sur " + total;
  elEnonce.textContent = question.enonce;
  elRetour.textContent = "";
  elRetour.className = "retour";
  elChoix.innerHTML = "";          // on supprime les anciens boutons
  btnSuivant.hidden = true;
  reponseDonnee = false;
  definirEtatPort(indiceQuestion, "courant");

  // BOUCLE : un bouton par choix possible
  for (let i = 0; i < question.choix.length; i++) {
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "choix-btn";

    const numero = document.createElement("span");
    numero.className = "choix-num";
    numero.textContent = i + 1;

    const texte = document.createElement("span");
    texte.textContent = question.choix[i];

    bouton.append(numero, texte);
    bouton.addEventListener("click", function () {
      verifierReponse(i);          // on transmet l'indice du choix cliqué
    });
    elChoix.appendChild(bouton);
  }
}

// Vérifie la réponse, met à jour le score et affiche la correction
function verifierReponse(indiceChoisi) {
  if (reponseDonnee) {
    return;                        // une seule réponse par question
  }
  reponseDonnee = true;

  const question = questionsQuiz[indiceQuestion];
  const boutons = elChoix.children;

  // CONDITION : bonne ou mauvaise réponse ?
  if (indiceChoisi === question.reponseCorrecte) {
    score++;
    elRetour.textContent = "Bonne réponse ! " + question.explication;
    elRetour.classList.add("succes");
    definirEtatPort(indiceQuestion, "juste");
  } else {
    erreurs.push(question);
    elRetour.textContent = "Mauvaise réponse. La bonne réponse était : "
      + question.choix[question.reponseCorrecte] + ". " + question.explication;
    elRetour.classList.add("echec");
    definirEtatPort(indiceQuestion, "faux");
  }

  // BOUCLE : on verrouille les boutons et on les colore
  for (let i = 0; i < boutons.length; i++) {
    boutons[i].disabled = true;
    if (i === question.reponseCorrecte) {
      boutons[i].classList.add("correct");
    } else if (i === indiceChoisi) {
      boutons[i].classList.add("incorrect");
    }
  }

  elScore.textContent = "Score : " + score;

  // Le libellé du bouton change à la dernière question
  if (indiceQuestion === questionsQuiz.length - 1) {
    btnSuivant.textContent = "Voir le résultat";
  } else {
    btnSuivant.textContent = "Question suivante";
  }
  btnSuivant.hidden = false;
  btnSuivant.focus();              // permet de passer à la suite avec Entrée
}

// Passe à la question suivante, ou affiche le résultat final
function passerALaSuivante() {
  indiceQuestion++;
  if (indiceQuestion < questionsQuiz.length) {
    afficherQuestion();
  } else {
    afficherResultat();
  }
}

// Affiche le score final, un message adapté et les questions à revoir
function afficherResultat() {
  const total = questionsQuiz.length;
  const ratio = score / total;
  let message;

  elScoreFinal.textContent = score + " / " + total;

  // CONDITIONS : message selon le score
  if (ratio === 1) {
    message = "Score parfait, bravo !";
  } else if (ratio >= 0.7) {
    message = "Très bien, vous maîtrisez l'essentiel.";
  } else if (ratio >= 0.5) {
    message = "Correct, mais quelques notions sont à consolider.";
  } else {
    message = "Il faut réviser : relisez les corrections ci-dessous.";
  }
  elMessage.textContent = message;

  // Bilan des erreurs
  elRecap.innerHTML = "";
  elBlocRecap.hidden = (erreurs.length === 0);

  // BOUCLE : une ligne par question ratée
  for (let i = 0; i < erreurs.length; i++) {
    const q = erreurs[i];
    const ligne = document.createElement("li");

    const titre = document.createElement("strong");
    titre.textContent = q.enonce;

    const detail = document.createElement("span");
    detail.textContent = "Bonne réponse : " + q.choix[q.reponseCorrecte] + ". " + q.explication;

    ligne.append(titre, detail);
    elRecap.appendChild(ligne);
  }

  afficherEcran("resultat");
}

// Permet de répondre avec les touches 1, 2, 3, 4 du clavier
function gererClavier(evenement) {
  if (ecrans.quiz.hidden || reponseDonnee) {
    return;
  }
  const numero = parseInt(evenement.key, 10);
  const question = questionsQuiz[indiceQuestion];
  if (numero >= 1 && numero <= question.choix.length) {
    verifierReponse(numero - 1);
  }
}


/* ------------------------------------------------------------
 * 5. ÉVÉNEMENTS ET DÉMARRAGE
 * ------------------------------------------------------------ */
btnDemarrer.addEventListener("click", demarrerQuiz);
btnSuivant.addEventListener("click", passerALaSuivante);
btnRejouer.addEventListener("click", demarrerQuiz);
document.addEventListener("keydown", gererClavier);

elNbQuestions.textContent = questions.length;
afficherEcran("accueil");
