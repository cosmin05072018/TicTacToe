const player = document.querySelector(".nameX");
const errorMessage = document.querySelector(".errorMessage");
const startGame = document.getElementById("startGame");
const formGame = document.querySelector(".formGame");
const game = document.querySelector(".game");
const playerX = document.querySelector(".playerX");
const playerO= document.querySelector(".playerO");
const boardGame = document.querySelector(".boardGame");
const resetBtn = document.getElementById("resetBtn");
const winnerContainer = document.querySelector(".winnerContainer");
const messageWinner = document.querySelector(".message");
const nameX = document.querySelector(".nameX");
const restartGame = document.querySelector(".restartGame");

let scoreX = document.querySelector(".scoreX");
let scoreO = document.querySelector(".scoreO");

let scorePlayerX = 0;
let scorePlayerO = 0;
let gamer = "X";
let computer = "O";
let scoreGamer = 0;
let scoreComputer = 0;
let currentPlayer = gamer;
playerX.classList.add('currentPlayer');

let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

startGame.addEventListener("click", (e) => {
  e.preventDefault();
  let errorMessage = document.querySelector(".errorMessage");
  if (!player.value) {
    errorMessage.classList.add("displayErr");
    errorMessage.innerHTML = "Input required";
  } else {
    errorMessage.classList.remove("displayErr");
    setNamePlayer(player.value);
    formGame.classList.add("hidden");
    game.classList.add("visible");
  }
});

// const cells = document.querySelectorAll(".item");
// cells.forEach((cell) => {
//   cell.addEventListener("click", (e) => {
//     let r = Number(cell.getAttribute("r"));
//     let c = Number(cell.getAttribute("c"));
//     if (!cell.innerHTML) {
//       if (currentPlayer === gamer) {
//         cell.innerHTML = gamer;
//         board[r][c] = gamer;
//         console.log(currentPlayer);
//         currentPlayer = computer;
//         console.log(currentPlayer);
//       }
//       computerMove();
//     }
//     winner();
//   });
// });

// function computerMove() {
//   cells.forEach((cell) => {
//     if (currentPlayer === computer) {
//       currentPlayer = gamer;
//       if (cell != null) {
//         computerTour();
//       }
//     }
//   });
// }

const cells = document.querySelectorAll(".item");
cells.forEach((cell) => {
  cell.addEventListener("click", async (e) => {
    let r = Number(cell.getAttribute("r"));
    let c = Number(cell.getAttribute("c"));
    if (!cell.innerHTML) {
      if (currentPlayer === gamer) {
        cell.innerHTML = gamer;
        board[r][c] = gamer;
        console.log(currentPlayer);
        currentPlayer = computer;
        playerO.classList.add('currentPlayer');
        playerX.classList.remove('currentPlayer');
        console.log(currentPlayer);
      }
      await wait(1000); // Așteaptă 1 secundă
      computerMove();
    }
    winner();
  });
});
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function computerMove() {
  cells.forEach(async (cell) => {
    if (currentPlayer === computer) {
      playerO.classList.remove('currentPlayer');
      playerX.classList.add('currentPlayer');
      currentPlayer = gamer;
      if (cell != null) {
        await wait(400);
        computerTour();
      }
    }
  });
}


function setNamePlayer(name) {
  playerX.innerHTML = `${name}`;
}

function generateCoordonates() {
  return Math.floor(Math.random() * 3);
}

function computerTour() {
  let row, col;
  let foundEmptyCell = false;

  do {
    row = generateCoordonates();
    col = generateCoordonates();

    if (board[row][col] !== "X" && board[row][col] !== "O") {
      foundEmptyCell = true;
    }

    let allCellsFilled = board.every((row) =>
      row.every((cell) => cell === "X" || cell === "O")
    );
    if (allCellsFilled) {
      break;
    }
  } while (!foundEmptyCell);

  if (foundEmptyCell) {
    board[row][col] = computer;
    gasesteElement(row, col);
  }
}

function gasesteElement(row, col) {
  let element = document.querySelector(`div.item[r='${row}'][c='${col}']`);
  element.innerHTML = computer;
}

resetBtn.addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  currentPlayer = gamer;
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });

  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

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
  if (checkCells("O")) {
    setWinner("Computer");
    scoreComputer++;
    scoreO.innerHTML = scoreComputer;
    console.log("scoreComputer");
  } else if (checkCells("X")) {
    setWinner(nameX.value);
    scoreGamer++;
    scoreX.innerHTML = scoreGamer;
    console.log(scoreGamer);
  }
  // else if (isBoardEmpty()) {
  //   draw();
  // }
}

// function draw() {
//   winnerContainer.classList.add("winner");
//   game.classList.remove("visible");
//   messageWinner.innerHTML = "The match ended in a draw.";
// }

function setWinner(player) {
  winnerContainer.classList.add("winner");
  game.classList.remove("visible");
  messageWinner.innerHTML = `<h1 class="title">Congratulations!</h1>
    <p class="messageWon">${player} has won!</p>`;
}

restartGame.addEventListener("click", () => {
  currentPlayer = gamer;
  winnerContainer.classList.remove("winner");
  game.classList.add("visible");
  resetGame();
});
