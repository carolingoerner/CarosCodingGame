let score = 0;

class Brain {
  constructor() {
    this.width = 25;
    this.height = 25;
    this.positionX = 20 - this.width / 2;
    this.positionY = 0;

    // store it in a property instead of const, so we declare it here instead of in methodcreateDomElement
    this.domElement = null;

    // I want it to be created from the Dom
    this.createDomElement();
  }
  // when i create a new instance of class Brain I will create a new div in the browser
  createDomElement() {
    this.domElement = document.createElement("div");
    
    this.domElement.id = "brain";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionX + "vh";
    this.domElement.style.position = "absolute";
    this.domElement.style.backgroundSize = "contain";

    // append to the dom:parentElm.appendChild()
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElement);
  }

  moveLeft() {
    this.positionX = this.positionX - 3;
    this.domElement.style.left = this.positionX + "vh";
    console.log(this.positionX);
  }
  moveRight() {
    this.positionX = this.positionX + 3; 
    this.domElement.style.left = this.positionX + "vh";
    console.log(this.positionX);
  }
}
class Obstacle {
  constructor() {
    this.width = 10;
    this.height = 8;
    this.positionX = Math.random() * 80;
    this.positionY = 100;
    this.imageArray = [
      "./images/ReferenceError.png",
      "./images/let.png",
      "./images/consoleLog.png",
      "./images/brackets.png",
      "./images/move.png",
      "./images/body.png",
      "./images/classBrain.png",
      "./images/head.png",
      "./images/if.png",
      "./images/elseif.png",
      "./images/curlybrackets.png",
      "./images/const.png",
      "./images/constructor.png",
      "./images/createDomElement.png",
      "./images/function.png",
      "./images/SyntaxError.png",
    ];
    this.domElement = null;
    this.randomIndex = Math.round(Math.random() * this.imageArray.length);
    this.namesArray = [
      "ReferenceError",
      "let",
      "consoleLog",
      "brackets",
      "move",
      "body",
      "classBrain",
      "head",
      "if",
      "elseif",
      "curlyBrackets",
      "const",
      "constructor",
      "createDomElement",
      "function",
      "SyntaxError",
    ];
    this.name = this.namesArray[this.randomIndex];
    this.createDomElement();
  }

  removeElement() {
    this.domElement.remove();
  }

  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionX + "vh";
    this.domElement.style.position = "absolute";

    this.domElement.style.backgroundImage = `url('./images/${this.name}.png')`;
    this.domElement.style.backgroundSize = "contain"; // optimize image size
    this.domElement.style.backgroundRepeat = "no-repeat";
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY = this.positionY - 1.5; // if faster change it to -5
    this.domElement.style.bottom = this.positionY + "vh";
  }
}
class scoreDisplay {
  constructor() {
    this.width = 200;
    this.height = 100;
    this.positionX = 20;
    this.positionY = 20;

    this.domElement = null;
    this.createDomElement();
  }

  createDomElement() {
    this.domElement = document.createElement("div");
    this.domElement.id = "score";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.top = this.positionY + "px";
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElement);
  }
}

//i create new div in browser when i create a new class brain
const brain = new Brain();
const obstaclesArr = []; //will store instances of the class obstacle
const scoreTable = new scoreDisplay();

// create new Obstacle
setInterval(() => {
  const newObstacle = new Obstacle();
  obstaclesArr.push(newObstacle);
  console.log(newObstacle, newObstacle.domElement.style.backgroundImage);
}, 4000);

// move all obstacles
setInterval(() => {
  obstaclesArr.forEach((obstaclesInstance, index) => {
    obstaclesInstance.moveDown();

    if (
      obstaclesInstance.positionX < brain.positionX + brain.width &&
      obstaclesInstance.positionX + obstaclesInstance.width > brain.positionX &&
      obstaclesInstance.positionY < brain.positionY + brain.height &&
      obstaclesInstance.height + obstaclesInstance.positionY > brain.positionY
    ) {
      if (
        obstaclesInstance.name === "ReferenceError" ||
        obstaclesInstance.name === "SyntaxError"
      ) {
        loosePoints(5);
        obstaclesInstance.removeElement();
        obstaclesArr.splice(index, 1);
        updateScore();
      } else {
        earnPoints(5);
        obstaclesInstance.removeElement();
        obstaclesArr.splice(index, 1);
        updateScore();
      }
      console.log(obstaclesArr);
    }
    endGame();
  });
}, 100);

// when user presses tab brain moves
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    brain.moveLeft();
} else if (event.code === "ArrowRight") {
    brain.moveRight();
  }
});

// Score Count
function earnPoints(points) {
  score += points;
  console.log(score);
  return score;
}
function loosePoints(points) {
  score -= points;
  console.log(score);
  return score;
}
function updateScore() {
  console.log("update score");
  document.getElementById("score").innerHTML = score;
}

// show winnerPage
const winnerPage = document.querySelector("#winnerPage");
const scoreHtml = document.querySelector("#score");
const boardGame = document.querySelector("#board");

function endGame() {
  if (score === 50) {
    winnerPage.style.display = "block";
    boardGame.style.display = "none";
  }
}
