class Brain {
    constructor(){
        this.width = 10;
        this.height = 10;
        this.positionX = 50 - this.width/2;
        this.positionY = 0;
        
        // store it in a property instead of const
        this.domElement= null;
        
        // I want it to be created from the Dom
        this.createDomElement();
    }
// when i create a new instance of class Brain I will create a new div in the browser
    createDomElement(){
        const brainElm=document.createElement("div");
        // add content or modify
        brainElm.id="brain";
        brainElm.style.width=this.width+"vw";
        brainElm.style.height=this.height +"vh";
        brainElm.style.left=this.positionY+"vw";
        brainElm.style.bottom=this.positionX +"vh";
        brainElm.innerText="the Brain"
// append to the dom:parentElm.appendChild()

const parentElm=document.getElementById("board");
parentElm.appendChild(brainElm);
    }

    // when brain moves to left/right
    moveLeft(){
        this.positionX=this.PositionX-1; //modify the position
        brainElm.style.bottom=this.positionX +"vh";
    }       
    moveRight(){
        this.positionX=this.PositionX+1; //modify the position
        brainElm.style.left=this.positionY+"vw";
}
}
// instance of class Brain
// i create new div in browser when i create a new class brain
const brain = new Brain();



// when user presses tab brain moves
document.addEventListener("keydown", (event) => {
   //if user presses arrow left we call move left
   // if user presses arrowleft we call move left, if arrow right we call move right
    if (event.code === "ArrowLeft") {
        brain.moveLeft();
    } else if (event.code === "ArrowRight") {
        brain.moveRight();
    }
})


