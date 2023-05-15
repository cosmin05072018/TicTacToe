const boardGame = document.querySelector(".boardGame");
const resetBtn = document.getElementById("resetBtn"); //resetare din timpul jocurlui
const restartGame = document.querySelector(".restartGame"); //restart joc dupa aflarea rezultatului
const winnerContainer = document.querySelector(".winnerContainer");
const game = document.querySelector(".game");
const scoreX = document.querySelector(".scoreX");
const scoreO = document.querySelector(".scoreO");
const cells = document.querySelectorAll(".item");
const startBtn = document.getElementById("startGame");
const messageWinner = document.querySelector(".message");
const formGame = document.querySelector(".formGame");
const errorMessage = document.querySelector(".errorMessage");
const playerX = document.querySelector(".nameX");
const playerO = document.querySelector(".nameO");

let player = "X";
let scorePlayerX = 0;
let scorePlayerO = 0;

let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function checkCells(val) {
  return (
    (board[0][0] === val && board[1][1] === val && board[2][2] === val) ||
    (board[0][0] === val && board[1][0] === val && board[2][0] === val) ||
    (board[0][0] === val && board[0][1] === val && board[0][2] === val) ||
    (board[0][1] === val && board[1][1] === val && board[2][1] === val) ||
    (board[0][2] === val && board[1][2] === val && board[2][2] === val) ||
    (board[1][0] === val && board[1][1] === val && board[1][2] === val) ||
    (board[2][0] === val && board[2][1] === val && board[2][2] === val) ||
    (board[0][2] === val && board[1][1] === val && board[2][0] === val)
  );
}

function isBoardEmpty() {
  let emptyFields = 0;
  board.forEach((currentRow) => {
    if (currentRow.some((elem) => elem === null)) {
      emptyFields++;
    }
  });

  return !emptyFields;
}

function winner() {
  if (checkCells("X")) {
    setWinner(playerX.value);
    scorePlayerX++;
    scoreX.innerHTML = scorePlayerX;
  } else if (checkCells("O")) {
    setWinner(playerO.value);
    scorePlayerO++;
    scoreO.innerHTML = scorePlayerO;
  } else if (isBoardEmpty()) {
    draw();
  }
}

function setName(name, selector) {
  let spanX = document.querySelector(selector);
  spanX.innerHTML = `${name}`;
}

function setWinner(player) {
  winnerContainer.classList.add("winner");
  game.classList.remove("visible");
  messageWinner.innerHTML = `<h1 class="title">Congratulations!</h1>
    <p class="messageWon">${player} has won!</p>`;
}

function draw() {
  winnerContainer.classList.add("winner");
  game.classList.remove("visible");
  messageWinner.innerHTML = "The match ended in a draw.";
}

function resetGame() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });

  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  player = "X";
}

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    let r = Number(cell.getAttribute("r"));
    let c = Number(cell.getAttribute("c"));
    if (!cell.innerHTML) {
      cell.innerHTML = player;
      board[r][c] = player;
      winner();
      player = player === "X" ? "O" : "X";
    }
  });
});

resetBtn.addEventListener("click", () => {
  resetGame();
});
restartGame.addEventListener("click", () => {
  winnerContainer.classList.remove("winner");
  game.classList.add("visible");
  resetGame();
});

startBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!playerX.value || !playerO.value) {
    errorMessage.classList.add("displayErr");
    errorMessage.innerHTML = "Inputs required";
  } else {
    errorMessage.classList.remove("displayErr");
    setName(playerX.value, ".playerX");
    setName(playerO.value, ".playerO");
    formGame.classList.add("hidden");
    game.classList.add("visible");
  }
});
