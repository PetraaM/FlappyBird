`use strict`;

document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground-moving");

  const playerNameInput = document.querySelector("#playerName");

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 450;
  let score = getStoredScore();
  // let playerName = getStoredPlayerName();
  let playerName = getPlayerName();
  let highestScore = getHighestScore();

  let currentScore = document.querySelector("#currentScore");
  currentScore.textContent = `Current Score: ${score}`;

  function updateScore() {
    score++;
    if (score > highestScore) {
      localStorage.setItem(
        "flappyBirdData",
        JSON.stringify({ playerName, score, highestScore })
      );
    }
    currentScore.textContent = `Current Score: ${score}`;
    alert(
      `Player: ${playerName}\nScore: ${score}\nHighest Score: ${highestScore}`
    );
  }

  function displayHighScore() {
    const storedData = localStorage.getItem("flappyBirdData");
    const highScore = storedData ? JSON.parse(storedData).highestScore || 0 : 0;
    // alert(`High Score: ${highScore}`);
    // Alternatively, you can display the high score on the page:
    const highScoreElement = document.querySelector("#highScore");
    highScoreElement.textContent = `High Score: ${highScore}`;
  }
  displayHighScore();

  function getHighestScore() {
    const storedData = localStorage.getItem("flappyBirdData");
    return storedData ? JSON.parse(storedData).highestScore || 0 : 0;
  }

  function getStoredPlayerName() {
    return localStorage.getItem("flappyBirdData")
      ? JSON.parse(localStorage.getItem("flappyBirdData")).playerName
      : "";
  }

  function getPlayerName() {
    let playerName = prompt("Enter your name:");
    return playerName || "Player"; // Use "Player" as a default if the user cancels or enters an empty name
  }

  function getStoredScore() {
    // let storedScore = localStorage.getItem("flappyBirdScore");

    // return storedScore ? parseInt(storedScore, 10) : 0;
    return localStorage.getItem("flappyBirdData")
      ? JSON.parse(localStorage.getItem("flappyBirdData")).score
      : 0;
  }

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }
  let gameTimerId = setInterval(startGame, 100);

  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
    console.log(birdBottom);
  }
  document.addEventListener("keyup", control);

  function generateObstacle() {
    let obstacleLeft = 500;
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight;
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    if (!isGameOver) {
      obstacle.classList.add("obstacle");
      topObstacle.classList.add("topObstacle");
    }
    gameDisplay.appendChild(obstacle);
    gameDisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    topObstacle.style.bottom = obstacleBottom + gap + "px";

    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";

      if (obstacleLeft === -60) {
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
        updateScore();
      }
      if (
        (obstacleLeft > 200 &&
          obstacleLeft < 280 &&
          birdLeft === 220 &&
          (birdBottom < obstacleBottom + 153 ||
            birdBottom > obstacleBottom + gap - 200)) ||
        birdBottom === 0
      ) {
        gameOver();
        clearInterval(timerId);
      }
    }
    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }
  generateObstacle();

  function gameOver() {
    clearInterval(gameTimerId);
    console.log("game over");
    isGameOver = true;
    document.removeEventListener("keyup", control);
    ground.classList.add("ground");
    ground.classList.remove("ground-moving");
  }

  playerNameInput.addEventListener("input", () => {
    playerName = playerNameInput.value;
  });
});
