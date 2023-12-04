document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const gameDisplay = document.querySelector(".game-container");
  const ground = document.querySelector(".ground-moving");
  const collisionSound = document.getElementById("collisionSound");
  const spacebarSound = document.getElementById("spacebarSound");

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;
  let isGameOver = false;
  let gap = 450;
  let lives = 3;

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

  function restartGame() {
    // Reload the page to restart the game
    location.reload();
  }

  function gameOver() {
    clearInterval(gameTimerId);
    console.log("game over");
    isGameOver = true;
    document.removeEventListener("keyup", control);
    ground.classList.add("ground");
    ground.classList.remove("ground-moving");

    // Decrease lives when the game is over
    decreaseLives();
  }

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + "px";
    bird.style.left = birdLeft + "px";
  }
  let gameTimerId = setInterval(startGame, 20);

  function control(e) {
    if (e.keyCode === 32) {
      jump();
      spacebarSound.play();
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
  generateObstacle();

  function gameOver() {
    clearInterval(gameTimerId);
    console.log("game over");
    isGameOver = true;
    document.removeEventListener("keyup", control);
    ground.classList.add("ground");
    ground.classList.remove("ground-moving");
  }
});
