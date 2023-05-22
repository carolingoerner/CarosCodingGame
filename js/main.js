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
        this.domElement=document.createElement("div");
        // add content or modify
        this.domElement.id="brain";
        this.domElement.style.width=this.width+"vw";
        this.domElement.style.height=this.height +"vh";
        this.domElement.style.left=this.positionX+"vw";
        this.domElement.style.bottom=this.positionX +"vh";
        this.domElement.style.position="absolute";
        this.domElement.style.backgroundColor= "blue";
        this.domElement.style.backgroundImage= "url('../images/brain_light.png')";
    
        this.domElement.innerText="the Brain"
// append to the dom:parentElm.appendChild()

const parentElm=document.getElementById("board");
parentElm.appendChild(this.domElement);
    }

    // when brain moves to left/right
    moveLeft(){
        this.positionX=this.positionX-1; //modify the position
        this.domElement.style.left=this.positionX +"vh";
        console.log(this.positionX);
    }       
    moveRight(){
        this.positionX=this.positionX+1; //modify the position
        this.domElement.style.left=this.positionX+"vh";
        console.log(this.positionX);
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



