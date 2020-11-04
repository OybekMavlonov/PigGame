/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, sum, activePlayer, global;

newGame();

function RollDice() {
  // Generating random number
  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;

  document.getElementById("dice-1").style.display = "block";
  document.getElementById("dice-2").style.display = "block";
  document.querySelector("#dice-1").src = "dice-" + dice1 + ".png";
  document.querySelector("#dice-2").src = "dice-" + dice2 + ".png";

  var current = dice1 + dice2;
  sum += current;
  document.querySelector("#current-" + activePlayer).textContent = sum;

  if (dice1 == 1 || dice2 == 1) {
    nextPlayer();
  }
}

function Hold() {
  // Add current score to global score
  scores[activePlayer] += sum;

  global = document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  var finalScore = document.querySelector(".final-score").value;

  if (finalScore.length == 0) {
    finalScore = 20;
  }
  // Check if the player won the game
  if (global >= finalScore) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    diceNone();

    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");

    document.querySelector(".btn-roll").disabled = true;
    document.querySelector(".btn-hold").disabled = true;
  } else {
    nextPlayer();
  }
}

function nextPlayer() {
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");

  if (activePlayer === 0) {
    activePlayer = 1;
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("active");
  } else if (activePlayer === 1) {
    activePlayer = 0;
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("active");
  }

  sum = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  diceNone();
}

function newGame() {
  scores = [0, 0];
  activePlayer = 0;
  sum = 0;
  diceNone();

  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  document.querySelector(".btn-roll").disabled = false;
  document.querySelector(".btn-hold").disabled = false;
}

function diceNone() {
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}
