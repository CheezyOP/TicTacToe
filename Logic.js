const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const statusDisplay = document.querySelector('.game--status');
let gameActive = true;

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Speler ${currentPlayer} heeft het spel gewonnen!`;
const drawMessage = () => `Helaas geen winnaars!`;
const currentPlayerTurn = () => `Het is speler ${currentPlayer} zijn beurt`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(droppedCell, droppedCellIndex) {
    gameState[droppedCellIndex] = currentPlayer;
    droppedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    document.getElementById("drag--cell").innerHTML = document.getElementById("drag--cell").innerHTML === "X" ? "O" : "X";
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    if (gameActive) {
        handlePlayerChange();
    }
}

function drop(droppedCellEvent) {
    const droppedCell = droppedCellEvent.target;

    const droppedCellIndex = parseInt(
        droppedCell.getAttribute('data-cell-index')
    );

    if (gameState[droppedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(droppedCell, droppedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener("dragover", function(event) {
    event.preventDefault();
}));
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener("drop", function(event) {
    drop(event);
}));

document.querySelector('.game--restart').addEventListener('click', handleRestartGame);