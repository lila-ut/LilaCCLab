console.log("js is linked!");
let currentScene = 1;
let startButton;
let escalatorX, escalatorY;

let hotelImage;
let scaleFactor = 0.8;

let suitcases = [];
let deskArea;

let suitcaseImage;
let receptionistImage;
let logoImage;
let storyImage;
let zeroImage;
let guestImage;
let menImage;
let scrollingImage;
let paintingImage;

let elevatorY; // y of the top of elv
let elevatorHeight = 120; //height of elv

let scrollUpMessage = false;
let messageTimer = 0;
const messageDuration = 40;

let bgImage;

let truckX = 700, truckY = 300, truckWidth = 300, truckHeight = 280;

let replayButton;
let backButton;

function preload() {
    hotelImage = loadImage("images/hotel.png");
    suitcaseImage = loadImage("images/luggage.png");
    receptionistImage = loadImage("images/receptionist.png");
    logoImage = loadImage("images/logo.png")
    storyImage = loadImage("images/story.png")
    zeroImage = loadImage("images/zero.png")
    scrollingImage = loadImage("images/guest.png")
    menImage = loadImage("images/men.png")
    paintingImage = loadImage("images/painting.jpg")
    bgImage = loadImage("images/room.jpg")
   
}

class Suitcase {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.isDragging = false;
    }

    display() {
        //display luggaegs
        push();

        noStroke();
        scale(1)
        image(this.img, this.x - 25, this.y - 20, this.w, this.h + 20);
        //scale(0.1);
        pop();
    }

    checkIfInside(x, y) {
        if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {
            this.isDragging = true;
        }
    }

    move(x, y) {
        if (this.isDragging) {
            this.x = x - this.w / 2;
            this.y = y - this.h / 2;
        }
    }

    checkIn() {
        if (this.isDragging && dist(this.x, this.y, deskArea.x, deskArea.y) < deskArea.radius) {
            this.isDragging = false;
            return true; // Check-in done
        }
        return false; // Not checked in yet
    }
}

function setup() {
    let cnv = createCanvas(800, 600);
    cnv.parent("canvasWrapper");

    escalatorX = 50;
    escalatorY = height - 150;

    startButton = createButton('Start');
    let buttonY = height / 2 + 200;
    startButton.position(width / 2 + 280, buttonY);
    startButton.mousePressed(() => {
        currentScene = 2; // 
        startButton.hide(); //disapear
    });

    // desk area for suitcase chekin in
    deskArea = { x: width * 0.5, y: height * 0.65, radius: 100 };

    // suitcases

    for (let i = 0; i < 5; i++) {

        suitcases.push(new Suitcase(60 + i * 110, height - 80, 100, 50, suitcaseImage));
    }

    elevatorY = -elevatorHeight / 2;
    elevatorColor = '#ff6347';

    for (let i = 0; i < 20; i++) {
        boxes.push(new Box(random(width), random(height), 50, 50));
    }
    // replay button
    replayButton = createButton('Replay');
    replayButton.position(width / 2 - replayButton.width / 2, height / 2 + 230);
    replayButton.mousePressed(restartGame); // restartGame function when its clicked

    backButton = createButton('Back');
    backButton.position(width / 2-380, height +10);
    backButton.mousePressed(goToScene6);
}

function draw() {
    clear(); // Clearing the canvas
    if (currentScene === 1) {
        sceneOne();
    } else if (currentScene === 2) {
        sceneTwo();
    } else if (currentScene === 3) {
        sceneThree();
    }

    if (currentScene === 3) {
        sceneThree();
    }

    if (currentScene === 4) {
        sceneFour();
        // Check if the elevator has moved past the bottom of the canvas
        if (elevatorY > height) {
            currentScene = 5; // Transition to scene 5
        }
        if (scrollUpMessage && messageTimer > 0) {
            fill(255); // White color for text
            textSize(20);
            textAlign(CENTER, CENTER);
            text("Uh-oh, that's not the right way", width / 2, height / 2);
            messageTimer--;
            if (messageTimer === 0) {
                scrollUpMessage = false; // Reset the flag after message duration
            }
   }
    }

    if (currentScene === 5) {
        sceneFive();
    }
    if (currentScene === 6) {
        sceneSix();

    } else if (currentScene === 7) {
        sceneSeven();
    }
    if (currentScene === 8) {
        sceneEight();
    }
    if (currentScene === 7 || currentScene === 8) {
        // Display replay button in Scene 7 and Scene 8
        replayButton.show();
} else {
    replayButton.hide();
}
if (currentScene === 7 || currentScene === 8) {
    // Display back button in Scene 7 and Scene 8
    backButton.show();
} else {
    backButton.hide();
}
}

function sceneTwo() {
    background("#b97a8b");

    let imageWidth = hotelImage.width * scaleFactor;
    let imageHeight = hotelImage.height * scaleFactor;

    // scaling the hotel
    image(hotelImage, (width - imageWidth) / 2, height - 480, imageWidth, imageHeight);

    // road
    fill(50);
    rect(0, height - 130, width + 100, 400);

    // escelator moving front
    drawEscalator(escalatorX, escalatorY);


    // escalator moving
    escalatorX += 2.5;
    if (escalatorX > width) {
        escalatorX = -200; // Resets to starting position
        currentScene = 3;
    }
}

function drawEscalator(x, y) {
    //
    let EscsegmentWidth = 160;
    let EscsegmentHeight = 160;
    let EscsegmentSpacing = 20; // 

    // drawing the rectangle segemnts of escalato
    for (let i = 0; i < 3; i++) {
        let EscsegmentX = x + i * (EscsegmentWidth + EscsegmentSpacing);

        // the body
        fill('#9a4a3e');
        stroke('#421f29');
        strokeWeight(3);
        rect(EscsegmentX, y - EscsegmentHeight + 20, EscsegmentWidth, EscsegmentHeight);

        // window
        fill('#421f29');
        noStroke();
        rect(EscsegmentX + 15, y - EscsegmentHeight + 35, 130, 85); // Window

        // door?
        fill('#71321e');
        rect(EscsegmentX + 10, y - EscsegmentHeight + 102, 140, 8); // Door

        // //handles
        // fill('#a54c2b'); // 
        // ellipse(EscsegmentX + 53, y - EscsegmentHeight + 87, 5, 5); // Door handle
    }

    // wheels
    fill(0); // Black color for the wheels
    ellipse(x + 20, y + 20, 25, 25); // Front wheel
    ellipse(x + EscsegmentWidth * 3 + EscsegmentSpacing * 2 - 20, y + 20, 25, 25); // Back wheel
}

function sceneOne() {
    background('#FFC0CB');

    let imgX = -120; // 
    let imgY = 70;
    let imgWidth = 1000;
    let imgHeight = 260;
    image(logoImage, imgX, imgY, imgWidth, imgHeight);
    image(storyImage, imgX, imgY + 100, imgWidth, imgHeight);

    fill('#f6da6d');
    rect(width / 2 - 57, 420, 100, 150); // Draw the door rectangle

    // Draw a simple doorknob
    fill('brown'); // A brown color for the doorknob
    ellipse(115, 150, 5, 5); // Draw the doorknob

}
function sceneThree() {

    background('#853b40');

    // the carpet
    fill('#931420');
    rect(0, height * 0.75, width, height * 0.25);

    // // front desk
    // fill('#8b5a2b'); /
    // rect(width * 0.3, height * 0.6, width * 0.4, height * 0.05);

    // // front desk sign
    // fill('#f3e2d9');
    // rect(width * 0.45, height * 0.6, width * 0.1, height * 0.02);


    //the stairs 
    push();
    fill('#964241');
    // stroke('#8c2123');
    strokeWeight(4);
    for (let i = 0; i < 5; i++) {
        rect(width * 0.25 - i * 20, height * 0.75 - i * 20, width * 0.5 + i * 40, 20);
    }
    pop();

    // banisters
    fill('#77182a');

    rect(width * 0.25, height * 0.45, width * 0.5, height * 0.025); // Upper banister

    displayNewImage();
    displayreceptionistImage();

    // Add a speech bubble next to the receptionist

    push();
    fill('#ffbda9');
    rect(500, 150, 200, 90, 50);
    fill('#853b40');
    textSize(13);
    textAlign(CENTER, CENTER);
    text("Welcome! Please give me ", 600, 170);
    text("your luggages to check-in!", 600, 190);
    text("(Drag the luggages", 600, 210);
    text(" to check-in!)", 600, 230);

    pop();


    // front desk sign
    fill('#f3e2d9');
    rect(width * 0.45, height * 0.6, width * 0.1, height * 0.02);

    //  columns 
    for (let i = 0; i < 2; i++) {
        fill('#cc735c');
        rect(i * (width - width * 0.05), height * 0.45, width * 0.05, height * 0.3);
    }

    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    fill('#ffbda9');

    text("C O N C I E R G E", width / 2, 10);

    // each suitcase
    for (let i = suitcases.length - 1; i >= 0; i--) {
        suitcases[i].display();
        if (suitcases[i].checkIn()) {
            suitcases.splice(i, 1); // Removing suitcases from array if its checkedin
        }
    }

    if (suitcases.length === 0) {
        currentScene = 4; // Change to scene 4
    }
}

function displayNewImage() {
    let imgX = 345;
    let imgY = 85;
    let imgWidth = 136;
    let imgHeight = 170;
    image(paintingImage, imgX, imgY, imgWidth, imgHeight);
}

function displayreceptionistImage() {
    let receptionistimgX = 60;
    let receptionistimgY = 5;
    let receptionistimgWidth = 290;
    let receptionistimgHeight = 200;
    image(receptionistImage, receptionistimgX + 182, receptionistimgY + 182, receptionistimgWidth + 60, receptionistimgHeight - 7);
}


function mousePressed() {

    if (currentScene === 5) {
        // Check if the mouse is inside any of the boxes
        for (let box of boxes) {
            box.checkIfInside(mouseX, mouseY);
        }
    }
    // Check if the mouse is inside any of the suitcase
    for (let suitcase of suitcases) {
        suitcase.checkIfInside(mouseX, mouseY);
    }
}

function mouseDragged() {
    // dragging mouse = move the suitase
    for (let suitcase of suitcases) {
        suitcase.move(mouseX, mouseY);
    }

    if (currentScene === 5) {
        for (let box of boxes) {
            box.move(mouseX, mouseY);
        }
    } 
}

function mouseReleased() {
    // 
    for (let suitcase of suitcases) {
        suitcase.isDragging = false;
    }
    if (currentScene === 5) {
        for (let box of boxes) {
            if (box.isDragging) {
                if (box.isInTruck(truckX, truckY, truckWidth, truckHeight)) {
                    box.popped = true;
                    boxesPopped++;
                }
                box.isDragging = false;
            }
        }

        if (boxesPopped >= 5) {
            currentScene = 6; // Change to scene 6 when 5 boxes are in the truck
        }
}
}

function sceneFour() {
    background('#0a0508');

    // elevator shaft
    fill('#891510');
    rect(width / 4 - 35, 0, width / 2 + 100, height);

    // 
    // moving rectangle
    fill('#ad1f0e');
    rect(width / 4 - 10, elevatorY, width / 2 + 50, height + elevatorHeight + 10);
    rect(width / 4 + 20, elevatorY + 300, width / 4 - 230, height + elevatorHeight / 2 - 500);

    drawElevatorFloorKeyPanel();
    image(scrollingImage, width / 4 - 100, elevatorY + 210, 750, 520);

    drawElevatorWire();

    if (elevatorY + elevatorHeight <= 0) {
        scrollUpMessage = true;
        messageTimer = messageDuration;
    }

    fill("#e5a795")
    textFont("New Times Roman")
    textSize(20);
    text("Scroll to go to your floor!", width / 2 - 110, height / 5,)

}

function drawElevatorWire() {
    let wireWidth = 20;
    let wireColor = '#555';

    fill(wireColor);
    rect(width / 4 + 20, 0, wireWidth, elevatorY);
}

function drawElevatorFloorKeyPanel() {
    let panelX = width / 4 - 10;
    let panelY = elevatorY + 300;
    let panelWidth = 40;
    let panelHeight = 120;
    let buttonDiameter = 10;
    let buttonPadding = 20;
    let numberOfButtons = 5;

    fill('#b71312'); // panel
    rect(panelX, panelY, panelWidth, panelHeight);

    fill('#e5a795'); // buttons
    for (let i = 0; i < numberOfButtons; i++) {
        ellipse(panelX + panelWidth / 2, panelY + buttonPadding + i * buttonPadding, buttonDiameter, buttonDiameter);
    }
}


function mouseWheel(event) {
    // Apply the logic only when in scene 4
    if (currentScene === 4) {
        // Update elevator position based on scroll direction
        elevatorY += event.delta;
    }

    // If not in scene 4, or the condition is not met, do nothing
    return false;
}


class Box {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isDragging = false; // Add this property
        this.popped = false;
        this.color = color('#f99cb1');
    }
    isMouseOver() {
        return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
    }

    display() {
        // if (!this.popped) {
            fill(this.color);
            rect(this.x, this.y, this.w + 20, this.h + 20);
            // ribbon
            fill('#636db4');
            noStroke();
            rect(this.x + this.w / 2 + 5, this.y + this.h / 2 - 25, 10, 70); // 
            rect(this.x + this.w / 2 - 25, this.y + this.h / 2 + 5, 70, 10); // 

        }
    
        checkIfInside(x, y) {
            if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {
                this.isDragging = true;
            }
        }
    
        move(x, y) {
            if (this.isDragging) {
                this.x = x - this.w / 2;
                this.y = y - this.h / 2;
            }
        }

    isInTruck(truckX, truckY, truckWidth, truckHeight) {
        return this.x > truckX && this.x + this.w < truckX + truckWidth &&
               this.y > truckY && this.y + this.h < truckY + truckHeight;
    }
}

let boxes = [];
let boxesPopped = 0;

function sceneFive() {
    background('#e58097');

    image(menImage, width / 2 - 400, height / 2 - 200, 310, 500);

    // text
    fill(0);
    textSize(24);
    textFont('Times New Roman');
    textAlign(CENTER, CENTER);
    text("Oh no, This is the wrong room! You can help them move 5 boxes to the truck!", width / 2, 40);
    text("Then, they can lead you to your room", width / 2, 80);
    // Displaying boxs
    for (let box of boxes) {
        box.display();
    }

    // Check if 5 boxes have been moved to go to the next scene
    if (boxesPopped >= 5) {
        currentScene = 6;
    }

 // Back of Truck pos
 let truckX = width - 100; 
 let truckY = height - 300;
 let truckWidth = 300; 
 let truckHeight = 280;

 // truck
 fill('#df7176'); // Dark grey color for the truck
 rect(truckX, truckY, truckWidth, truckHeight);

 // wheels
 fill('#292237'); // Black color for the wheels
 ellipse(truckX + 40, truckY + truckHeight, 50, 50); // Front wheel (only one visible)

 // back door
 fill('#292237'); // Darker shade for the door
 rect(truckX + 5, truckY + 20, 70, 60); // Open door part attached to the truck
 rect(truckX - 65, truckY + 20, 70, 60); 
}

function mousePressed() {
    if (currentScene === 5) {
        for (let box of boxes) {
            box.checkIfInside(mouseX, mouseY);
        }
    } else {
        // Check if the mouse is inside any of the suitcases
        for (let suitcase of suitcases) {
            suitcase.checkIfInside(mouseX, mouseY);
        }
    }
}


function sceneSix() {
    background('#d5666f');

    let imgX = 23;
    let imgY = 120;
    let imgWidth = 750;
    let imgHeight = 450;
    image(bgImage, imgX, imgY, imgWidth, imgHeight);

    fill(255);
    textSize(25);
    textFont("Times New Roman");
    textAlign(CENTER, CENTER);
    text("Congratulations! You have made it to your room.", width / 2, height / 2 - 250);
    text("Choose your room 1 or 2 to have a restful night!", width / 2, height / 2 - 210);
}

function sceneSeven() {

    background('#FFC0CB');
    
    // bed 
    fill('#c8686c');
    noStroke();
    rect(50, 400, 700, 150); 
    
    // nightstand
    fill('#F5F5DC');
    rect(760, 430, 40, 70);
    
    // lamp
    fill('#FFD700');
    ellipse(780, 420, 20, 20);
    fill('#FFFFE0');
    quad(770, 420, 790, 420, 785, 400, 775, 400);
    
    // window
    fill('#87CEFA');
    rect(300, 100, 200, 150);
    
    // window lines
    stroke('#FFFFFF');
    line(400, 100, 400, 250); 
    line(300, 175, 500, 175); 
    noStroke();
    
    // curtains
    fill('#c8686c');
    rect(280, 90, 20, 170); // Left 
    rect(500, 90, 20, 170); // Right 
    
    // Text 
    fill('#c8686c');
    textStyle('bold')
    textFont('New Times Roman')
    textSize(20);
    textAlign(CENTER, CENTER);
    text("ROSEATE RETREAT", width / 2, 40);
    text("YOU HAVE ARRIVED IN YOUR ROOM, HAVE A GOOD NIGHT", width / 2, 330);
  }


  function keyPressed() {
    if (currentScene === 6) {
        if (key === '1') {
            currentScene = 7;
        } else if (key === '2') {
            currentScene = 8;
        }
    }
}

function sceneEight() {

    background('#a52f3c');
    
    // bed 
    fill('#78172b');
    noStroke();
    rect(50, 400, 700, 150); 
    
    // nightstand
    fill('#F5F5DC');
    rect(760, 430, 40, 70);
    
    // lamp
    fill('#731528');
    ellipse(780, 420, 20, 20);
    fill('#FFFFE0');
    quad(770, 420, 790, 420, 785, 400, 775, 400);
    
    // window
    fill('#87CEFA');
    rect(300, 100, 200, 150);
    
    // window lines
    stroke('#FFFFFF');
    line(400, 100, 400, 250); 
    line(300, 175, 500, 175); 
    noStroke();
    
    // curtains
    fill('#F5F5DC');
    rect(280, 90, 20, 170); // Left 
    rect(500, 90, 20, 170); // Right 
    
    // Text 
    fill('##F5F5DC');
    textStyle('bold')
    textFont('New Times Roman')
    textSize(20);
    textAlign(CENTER, CENTER);
    text("CRIMSON CHAMBER", width / 2, 40);
    text("YOU HAVE ARRIVED IN YOUR ROOM, HAVE A GOOD NIGHT", width / 2, 330);
  }
  function restartGame() {
    // Reset variables and transition to Scene 1
    currentScene = 1;
    suitcases = []; // Clear any suitcases that might have been left
    for (let i = 0; i < 5; i++) {
        suitcases.push(new Suitcase(60 + i * 110, height - 80, 100, 50, suitcaseImage));
    }
    // You may need to reset other variables here if necessary
}
function restartGame() {
    // Reset variables and transition to Scene 1
    currentScene = 1;
    suitcases = []; // Clear any suitcases that might have been left
    for (let i = 0; i < 5; i++) {
        suitcases.push(new Suitcase(60 + i * 110, height - 80, 100, 50, suitcaseImage));
    }
    startButton.show(); // Show the "Start" button
    // You may need to reset other variables here if necessary
}

function goToScene6() {
    currentScene = 6; // back to Scene 6
}



