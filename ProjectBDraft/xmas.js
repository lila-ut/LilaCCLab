let NUM_OF_PARTICLES = 200;
let particles = [];

function setup() {
  let cnv_1 = createCanvas(400, 400);
  cnv_1.parent("canvasWrapper1");
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(25, 25, 112); 
 for (let i = 0; i < particles.length; i++) {
    particles[i].sway();
    particles[i].fall();
    particles[i].display();
    particles[i].reappear();
  }
  
  // Drawung snow at the bottom of the canvas
  fill(255); // White color for the snow
  noStroke();
  rect(0, height - 50, width, 50);
  
  // Drawing a house on the snow
  drawHouse();
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ySpd = random(1, 3);
    this.size = random(3, 6);
    this.noiseOffsetX = random(0, 1000);
    this.noiseOffsetY = random(0, 1000);
  }

  sway() {
    // Using noise to sway to the sides
    let swaySize = map(noise(this.noiseOffsetX), 0, 1, -1, 1);
    this.x += swaySize;
    this.noiseOffsetX += 0.04; // 
  }

  fall() {
    // Falling from the top
    this.y += this.ySpd + 0.2;
  }

  display() {
    stroke(255);
    strokeWeight(this.size * 0.2);
    // snowflake using lines
    push();
    translate(this.x, this.y);
    line(0, -this.size, 0, this.size);
    line(-this.size, 0, this.size, 0);
    line(-this.size / 1.5, -this.size / 1.5, this.size / 1.5, this.size / 1.5);
    line(-this.size / 1.5, this.size / 1.5, this.size / 1.5, -this.size / 1.5);
    pop();
  }

  reappear() {
    if (this.y > height) {
      this.y = -this.size;
      this.x = random(width);
    }
  }
}

function drawHouse() {
  //House
  fill(139,69,19);
  rect(width * 0.5 - 50, height - 120, 100, 70);
  
  //Roof 
  fill(205,133,63);
  triangle(width * 0.5 - 60, height - 120, width * 0.5 + 60, height - 120, width * 0.5, height - 180);
  
  //Door =
  fill(205,133,63);
  rect(width * 0.5 - 15, height - 90, 30, 40);
  
  //Chimney
  fill(205,133,63);
  rect(width * 0.5 + 20, height - 180, 10, 40);

  
}