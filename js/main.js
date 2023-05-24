class Brain {
    constructor() {
        this.width = 21;
        this.height = 30;
        this.positionX = 20 - this.width / 2;
        this.positionY = 0;
        this.score = 0
        // store it in a property instead of const, so we declare it here instead of in methodcreateDomElement
        // we store a ref to the dom element of the player
        this.domElement = null;

        // I want it to be created from the Dom
        this.createDomElement();
    }
    // when i create a new instance of class Brain I will create a new div in the browser
    createDomElement() {
        this.domElement = document.createElement("div");
        // add content or modify
        this.domElement.id = "brain";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionX + "vh";
        this.domElement.style.position = "absolute";

        // append to the dom:parentElm.appendChild()

        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }

    // when brain moves to left/right
    moveLeft() {
        this.positionX = this.positionX - 1; //modify the position
        this.domElement.style.left = this.positionX + "vh";
        console.log(this.positionX);
    }
    moveRight() {
        this.positionX = this.positionX + 1; //modify the position
        this.domElement.style.left = this.positionX + "vh";
        console.log(this.positionX);
    }
}

class Obstacle {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.positionX = Math.random() * 100;
        this.positionY = 100;
        this.imageArray = ["./images/ReferenceError.png","./images/let.png","./images/consoleLog.png","./images/brackets.png", "./images/move.png","./images/body.png","./images/classBrain.png", "./images/head.png", "./images/if.png", "./images/elseif.png", "./images/curlybrackets.png", "./images/const.png", "./images/constructor.png","./images/createDomElement.png","./images/function.png", "./images/SyntaxError.png"];
        this.domElement = null;
        this.randomIndex = Math.round(Math.random() * this.imageArray.length);
        this.namesArray = ['ReferenceError', 'let', 'consoleLog', 'brackets', 'move', 'body', 'classBrain', 'head', 'if', 'elseif', 'curlyBrackets', 'const', 'constructor', 'createDomElement', 'function', 'syntaxError'];
        this.name=this.namesArray[this.randomIndex];
        this.createDomElement();
    }

    removeElement() {
        this.domElement.remove();
    }

    createDomElement() {
        this.domElement = document.createElement("div");
        // add content or modify
        this.domElement.className = "obstacle";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionX + "vh";
        this.domElement.style.position = "absolute";
       
        this.domElement.style.backgroundImage = `url('../images/${this.name}.png')`;
        this.domElement.style.backgroundSize = "contain"; // optimize image size
        this.domElement.style.backgroundRepeat = "no-repeat"; // obstacle disappears
        const parentElm = document.getElementById("board");
        parentElm.appendChild(this.domElement);
    }
    moveDown() {
        this.positionY = this.positionY - 1; // if faster change it to -5
        this.domElement.style.bottom = this.positionY + "vh";
    }
}

// instance of class Brain
// i create new div in browser when i create a new class brain
const brain = new Brain();
const obstaclesArr = []; //will store instances of the class obstacle

// const obstacleOne= new Obstacle();
// create new Obstacle
setInterval(() => {
    const newObstacle = new Obstacle();
    obstaclesArr.push(newObstacle);
}, 4000);

// move all obstacles
setInterval(() => {
    obstaclesArr.forEach((obstaclesInstance, index) => {; // instance of a class
    obstaclesInstance.moveDown();
    
    if(
    obstaclesInstance.positionX < brain.positionX + brain.width &&
    obstaclesInstance.positionX + obstaclesInstance.width > brain.positionX &&
    obstaclesInstance.positionY < brain.positionY + brain.height &&
    obstaclesInstance.height + obstaclesInstance.positionY > brain.positionY){
    
       // if (obstaclesInstance.name === "../images/ReferenceError.png", "../images/SyntaxError.png" ) { 
       //     loosePoints(); // points increases and update score
       // } else {
       //     earnPoints();
      //  }
       // return updateScore();

    
    earnPoints(5);
    console.log('smart');
    console.log(obstaclesArr);
    obstaclesArr.splice(index, 1);
    obstaclesInstance.removeElement();
    }
   
    });
}, 100);

// when user presses tab brain moves
document.addEventListener("keydown", (event) => {
    //if user presses arrow left we call move left
    // if user presses arrowleft we call move left, if arrow right we call move right
    if (event.code === "ArrowLeft") {
        brain.moveLeft();
    } else if (event.code === "ArrowRight") {
        brain.moveRight();
    }
});


// Initialize the score to 0

function earnPoints(points) {  // Update the score when the player earns points
  score += points;
}

function loosePoints(points) {
    score -= points;
}

function updateScore() {  // Update the score element in the HTML with the new value
  document.getElementById("score").innerHTML = score;
}



