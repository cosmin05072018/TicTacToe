let boardGame = document.querySelector(".boardGame");
let resetBtn = document.getElementById("resetBtn"); //resetare din timpul jocurlui
let restartGame = document.querySelector(".restartGame"); //restart joc dupa aflarea rezultatului
let winnerContainer = document.querySelector(".winnerContainer");
let game = document.querySelector(".game");
let playerX = document.querySelector(".nameX");
let playerO = document.querySelector(".nameO");
let player = "X";
let scorePlayerX = 0;
let scorePlayerO = 0;

let scoreX = document.querySelector(".scoreX");
let scoreO = document.querySelector(".scoreO");

let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        boardGame.innerHTML += `<div class='item'  r='${i}' c ='${j}'></div>`;
    }
}

let cells = document.querySelectorAll(".item");

cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        let r = Number(cell.getAttribute("r"));
        let c = Number(cell.getAttribute("c"));
        cell.classList.add("styleCell");
        if (!cell.innerHTML) {
            cell.innerHTML = player;
            board[r][c] = player;
            winner();
            if (player === "X") {
                player = "O";
            } else {
                player = "X";
            }
        }
        resetBtn.addEventListener("click", () => {
            cell.innerHTML = "";
            resetGame()
        });
        restartGame.addEventListener("click", () => {
            winnerContainer.classList.remove("winner");
            game.classList.add("visible");
            cell.innerHTML = "";
            resetGame()
        });
    });
});

function winner() {
    if (
        (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") ||
        (board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X") ||
        (board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X") ||
        (board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") ||
        (board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X") ||
        (board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X") ||
        (board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X") ||
        (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X")
    ) {
        setWinner(playerX.value);
        scorePlayerX++;
        scoreX.innerHTML = scorePlayerX;
    } else if (
        (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") ||
        (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O") ||
        (board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O") ||
        (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O") ||
        (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O") ||
        (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O") ||
        (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O") ||
        (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")
    ) {
        setWinner(playerO.value);
        scorePlayerO++;
        scoreO.innerHTML = scorePlayerO;
    } else if (
        board[0][0] &&
        board[0][1] &&
        board[0][2] &&
        board[1][0] &&
        board[1][1] &&
        board[1][2] &&
        board[2][0] &&
        board[2][1] &&
        board[2][2]
    ) {
        draw();
    }
}

// ======================

let startBtn = document.getElementById("startGame");

startBtn.addEventListener("click", () => {
    let formGame = document.querySelector(".formGame");
    let game = document.querySelector(".game");
    let errorMessage = document.querySelector(".errorMessage");
    if (!playerX.value || !playerO.value) {
        errorMessage.classList.add("displayErr");
        errorMessage.innerHTML = "Inputs required";
    } else {
        errorMessage.classList.remove("displayErr");
        setNameX(playerX.value);
        setNameO(playerO.value);
        formGame.classList.add("hidden");
        game.classList.add("visible");
    }
});

function setNameX(name) {
    let spanX = document.querySelector(".playerX");
    spanX.innerHTML = `${name}`;
}

function setNameO(name) {
    let spanY = document.querySelector(".playerO");
    spanY.innerHTML = `${name}`;
}

function setWinner(player) {
    winnerContainer.classList.add("winner");
    game.classList.remove("visible");
    let messageWinner = document.querySelector(".message");
    messageWinner.innerHTML = `<h1 class="title">Congratulations!</h1>
    <p class="messageWon">${player} has won!</p>`;
}

function draw() {
    winnerContainer.classList.add("winner");
    game.classList.remove("visible");
    let messageWinner = document.querySelector(".message");
    messageWinner.innerHTML = "The match ended in a draw.";
}


function resetGame() {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    player = "X";
}