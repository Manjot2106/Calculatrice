const colonnes = 7;
const lignes = 6;
let joueurActuel = 'rouge';
let plateauJeu = [];
let partieTerminee = false;

const elementPlateau = document.getElementById('game-board');
const elementMessage = document.getElementById('message');

// Initialiser le plateau de jeu

function creerPlateau() {
    plateauJeu = [];
    for (let r = 0; r < lignes; r++) {
        const ligne = [];
        for (let c = 0; c < colonnes; c++) {
            const cellule = document.createElement('div');
            cellule.classList.add('cell', 'empty');
            cellule.dataset.colonne = c;
            elementPlateau.appendChild(cellule);
            ligne.push(null);
        }
        plateauJeu.push(ligne);
    }
}

