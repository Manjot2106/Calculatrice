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

// Gérer le clic sur une cellule
elementPlateau.addEventListener('click', (e) => {
    if (partieTerminee) return;

    const colonne = e.target.dataset.colonne;
    if (colonne !== undefined) {
        const indiceColonne = parseInt(colonne);
        const indiceLigne = trouverLigneDisponible(indiceColonne);
        if (indiceLigne !== -1) {
            placerPion(indiceLigne, indiceColonne);
            if (verifierVictoire(indiceLigne, indiceColonne)) {
                partieTerminee = true;
                elementMessage.textContent = `${joueurActuel.toUpperCase()} gagne !`;
            } else {
                changerJoueur();
            }
        }
    }
});

// Trouver la ligne la plus basse disponible dans une colonne
function trouverLigneDisponible(indiceColonne) {
    for (let r = lignes - 1; r >= 0; r--) {
        if (plateauJeu[r][indiceColonne] === null) {
            return r;
        }
    }
    return -1;
}

// Placer le pion sur le plateau
function placerPion(indiceLigne, indiceColonne) {
    plateauJeu[indiceLigne][indiceColonne] = joueurActuel;
    const cellule = elementPlateau.children[indiceLigne * colonnes + indiceColonne];
    cellule.classList.remove('empty');
    cellule.classList.add(joueurActuel);
}

// Changer de joueur
function changerJoueur() {
    joueurActuel = joueurActuel === 'rouge' ? 'jaune' : 'rouge';
    elementMessage.textContent = `Joueur actuel : ${joueurActuel.toUpperCase()}`;
}

// Vérifier s'il y a une victoire
function verifierVictoire(indiceLigne, indiceColonne) {
    return verifierDirection(indiceLigne, indiceColonne, 1, 0) ||  // Horizontale
           verifierDirection(indiceLigne, indiceColonne, 0, 1) ||  // Verticale
           verifierDirection(indiceLigne, indiceColonne, 1, 1) ||  // Diagonale droite-bas
           verifierDirection(indiceLigne, indiceColonne, 1, -1);   // Diagonale gauche-bas
}

// Vérifier une direction pour quatre pions d'affilée
function verifierDirection(indiceLigne, indiceColonne, directionLigne, directionColonne) {
    let compteur = 1;
    compteur += compterDansDirection(indiceLigne, indiceColonne, directionLigne, directionColonne);
    compteur += compterDansDirection(indiceLigne, indiceColonne, -directionLigne, -directionColonne);
    return compteur >= 4;
}

// Compter les pions consécutifs dans une direction
function compterDansDirection(indiceLigne, indiceColonne, directionLigne, directionColonne) {
    let compteur = 0;
    let r = indiceLigne + directionLigne;
    let c = indiceColonne + directionColonne;
    while (r >= 0 && r < lignes && c >= 0 && c < colonnes && plateauJeu[r][c] === joueurActuel) {
        compteur++;
        r += directionLigne;
        c += directionColonne;
    }
    return compteur;
}

// Commencer une nouvelle partie
creerPlateau();
elementMessage.textContent = `Joueur actuel : ${joueurActuel.toUpperCase()}`;
