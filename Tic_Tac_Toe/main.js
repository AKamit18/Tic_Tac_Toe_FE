// Initialize game variables
let board = ["", "", "", "", "", "", "", "", ""]; // Represents the 3x3 board
let currentPlayer = "X"; // Player X starts first
let gameActive = true;

// Winning combinations (indices of the board array)
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Diagonal
];

// DOM Elements
const boardElement = document.getElementById("board");
const resetButton = document.getElementById("resetButton");
const winnerPopup = document.getElementById("winnerPopup");
const winnerMessage = document.getElementById("winnerMessage");
const closePopup = document.getElementById("closePopup");
const turnMessage = document.createElement("div"); // Create turn message element
turnMessage.classList.add("turn-message");
document.querySelector(".container").insertBefore(turnMessage, boardElement); // Insert turn message above the board

// Function to create the board dynamically
function createBoard() {
  boardElement.innerHTML = ""; // Clear the board
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.setAttribute("data-index", index);
    cellElement.addEventListener("click", handleCellClick);
    boardElement.appendChild(cellElement);
  });
  updateTurnMessage(); // Update the turn message when the board is created
}

// Function to handle cell clicks
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  // Check if the cell is already occupied or the game is over
  if (board[clickedCellIndex] !== "" || !gameActive) return;

  // Update the board and UI
  board[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.setAttribute("data-value", currentPlayer); // Add data-value for styling

  // Check for a winner
  if (checkWin()) {
    endGame(false);
    return;
  }

  // Check for a draw
  if (board.every((cell) => cell !== "")) {
    endGame(true);
    return;
  }

  // Switch players
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnMessage(); // Update the turn message after switching players
}

// Function to check for a win
function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

// Function to end the game
function endGame(isDraw) {
  gameActive = false;
  if (isDraw) {
    winnerMessage.textContent = "It's a draw!";
  } else {
    winnerMessage.textContent = `Player ${currentPlayer} wins!`;
  }
  winnerPopup.style.display = "flex";
}

// Function to reset the game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  createBoard();
  winnerPopup.style.display = "none";
}

// Function to update the turn message
function updateTurnMessage() {
  turnMessage.textContent = `It's Player ${currentPlayer}'s turn!`;
}

// Event Listeners
resetButton.addEventListener("click", resetGame);
closePopup.addEventListener("click", () => {
  winnerPopup.style.display = "none";
});

// Initialize the board when the page loads
createBoard();