console.log("js is linked!");

let clickSound; //undefined, but here so it's GLOBAL

let x = 50;
let speed = 2;

// this variable makes sure we interact  
// first with our sketch. onlt that way is the
// website allowed to play the sound 
// see mousePressed function and the if statement in draw 
let readyToStart = false;

function preload(){
    // load sound in preload to make
    // sure it loaded by the time 
    // the sketch starts
    clickSound = loadSound("sounds/beat.mp3")
}


function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");
}

function draw(){
    background(0);

    if(readyToStart==true){
        bouncingCircleWithSound();
    }else{
        // show instructions in the beginning
        fill(255);
        text("click the canvas first to assure the sound will work", 20, height/2)
    }
    
    
}

function bouncingCircleWithSound(){
    circle(x, 200, 50);
    text(speed, width/2, height/2+100)

    if(x > width-25 || x < 25){
        speed = -speed;
        clickSound.play();
    }
    x += speed;

    // get faster exponentially
    if(abs(speed) < 100){
        speed*=1.002
    }

}

function mousePressed(){
    clickSound.play();
    // setting this boolean to true which in
    // turn "unlocks" the actual sketch inside draw
    readyToStart = true;
}