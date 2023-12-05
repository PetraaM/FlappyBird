`use strict`;

function restartGame() {
  // Reload the page to restart the game
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize DOM elements
  let bird = document.querySelector(".bird");
  let gameDisplay = document.querySelector(".game-container");
  let ground = document.querySelector(".ground-moving");
  let collisionSound = document.getElementById("collisionSound");
  let spacebarSound = document.getElementById("spacebarSound");

  // Global variable declarations
  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 450;
  let lives = 3;
  let gameTimerId;

  function updateLivesDisplay() {
    document.getElementById("lives").innerText = "Lives: " + lives;
  }

  function decreaseLives() {
    lives--;
    updateLivesDisplay();

    if (lives === 0) {
      // If no lives left, show game over popup
      showGameOverPopup();
    }
  }

  function showGameOverPopup() {
    const popup = document.getElementById("gameOverPopup");
    popup.style.display = "block";
  }

  // Define startGame function
  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }
  //   let gameTimerId = setInterval(startGame, 20);

  function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + "px";
    console.log(birdBottom);
  }

  // Define the control function globally
  function control(e) {
    if (e.keyCode === 32) {
      // Spacebar key
      jump();
      spacebarSound.play();
    }
  }
  //   document.addEventListener("keyup", control);

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
        collisionSound.play();
      }
    }

    let timerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }

  function initGame() {
    birdBottom = 100;
    bird.style.bottom = birdBottom + "px";
    isGameOver = false;
    gameTimerId = setInterval(startGame, 20);
    generateObstacle();
  }

  function resetGame() {
    // Clear existing obstacles
    document.querySelectorAll(".obstacle, .topObstacle").forEach((obstacle) => {
      obstacle.remove();
    });

    // Reset bird's position and game variables
    birdLeft = 220;
    birdBottom = 100;
    bird.style.left = birdLeft + "px";
    bird.style.bottom = birdBottom + "px";

    // Restart game
    if (gameTimerId) clearInterval(gameTimerId);
    isGameOver = false;
    gameTimerId = setInterval(startGame, 20);
    generateObstacle();

    // Reattach event listener for control
    document.addEventListener("keyup", control);
  }

  function gameOver() {
    if (isGameOver) return; // Prevent multiple decrements for the same collision

    clearInterval(gameTimerId);
    console.log("game over");
    isGameOver = true;
    document.removeEventListener("keyup", control);
    ground.classList.add("ground");
    ground.classList.remove("ground-moving");

    decreaseLives();

    if (lives > 0) {
      setTimeout(resetGame, 1000); // Reset game after a short delay
    } else {
      showGameOverPopup();
    }
  }

  initGame();
  document.addEventListener("keyup", control);
});
Collap;
