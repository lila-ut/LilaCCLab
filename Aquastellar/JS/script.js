let colors = [];
let numColors = 20;
let angle1 = 0;
let angle2 = Math.PI; // symmetry for the scene 1 stars
let amplitude = 100;
let scene = 1;
let starSize = 30; // the initial star size
let growing = false; // control star growth
let stars = [];


function setup() {
  createCanvas(windowWidth, windowHeight);

  x = width / 2;
  y = height / 2;

  for (let i = 0; i < numColors; i++) {
    let inter = map(i, 0, numColors - 1, 0, 1);
    let gradient = lerpColor(color(0, 51, 102), color(0, 102, 204), inter);
    colors.push(gradient);
  }
}

function draw() {
  fill(139, 69, 19); // Brown color for the sea bed
  
  drawHorizontalGradient(0, 0, width, height,colors);
  // This shows the star positions based on sine and cosine

  if (scene === 1) {
    let x1 = width / 2 + amplitude * cos(angle1);
    let y1 = height / 4 + amplitude * sin(angle1);
    let x2 = width / 2 + amplitude * cos(angle2);
    let y2 = (3 * height) / 4 + amplitude * sin(angle2);

    push();
    fill("yellow");
    // Draing the stars
    drawStar(x1, y1, 20, 70, 5); //
    pop();

    push();
    fill("orange");
    drawStar(x2, y2, 20, 70, 5); //
    pop();

    // Increment angles based on the mouse's horizontal position
    angle1 += map(mouseX, 0, width, 0.02, 0.1);
    angle2 += map(mouseX, 0, width, 0.02, 0.1);
  } else if (scene === 2) {
    let secondstarangle = millis() * 0.001; // Adjust the speed of bumping
    secondstarx = width / 2 + amplitude * cos(secondstarangle);
    secondstary = height / 2 + amplitude * sin(secondstarangle);

    push();

    stroke("orange");
    strokeWeight(5);
    fill(255, 131, 0);
    // the star
    // Draw the single star in the center with bumping effect
    drawStar(x, y, starSize, starSize * 2, 8);
    drawStar(x - 30,y + 20,starSize,starSize * 2.5, 8);
    drawStar(x - 60,y + 40,starSize,starSize * 2, 8);
    drawStar(x - 1300,y + 10,starSize,starSize * 2, 8);
    drawStar(x - 100, y + 20,starSize,starSize * 2, 8);
    drawStar(x + 200, y + 60, starSize,starSize * 4, 6);
    drawStar(x + 140, y + 55, starSize,starSize * 2, 8);
    drawStar(x +300, y + 70,starSize,starSize * 2, 8);
    drawStar(x + 500, y + 90, starSize,starSize * 4, 6);
    drawStar(x + 240, y + 100, starSize,starSize * 2, 8);
    drawStar(x + 210, y + 120, starSize,starSize * 4, 6);
    drawStar(x + 240, y + 100, starSize,starSize * 2, 8);
    // drawStar(x, y, 15, 30, 8);
    // drawStar(x, y, 15, 30, 15);
    // Add bumping effect
    x += random(-1, 1);
    y += random(-1, 1);
    pop();
  }

  if (growing) {
    starSize += 1; // Increase star size when 'g' is pressed
  }
  // Draw  random stars
  for (let star of stars) {
    star.angle += star.speed * 0.01;
    let sx = x + cos(star.angle) * star.radius2;
    let sy = y + sin(star.angle) * star.radius2;
    drawStar(sx, sy, star.radius1, star.radius2, star.points);
  }
}
function mouseClicked() {
  if (scene === 1) {
    // scene 2
    scene = 2;
  }
}
function drawStar(x, y, radius1, radius2, numberof_points) {
  let angle = TWO_PI / numberof_points;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 3; a += angle) {
    let outerx = x + cos(a) * radius2;
    let outery = y + sin(a) * radius2;
    vertex(outerx, outery);
    innerx = x + cos(a + halfAngle) * radius1;
    innery = y + sin(a + halfAngle) * radius1;
    vertex(innerx, innery);
  }

  endShape(CLOSE);
}
function keyPressed() {
  if (key === "1") {
    // Scene 1: Display a single star
    scene = 1;
    starSize = 30; // Reset star size
    stars = []; // Clear the stars array
  } else if (key === "2") {
    // Scene 2: Bumping star
    scene = 2;
    x = width / 2;
    y = height / 2;
    starSize = 30; // Reset star size
  } else if (key === "g") {
    // Start star growth when 'g' key is pressed
    growing = true;
  } else if (key === "s") {
    // Add a random star when 's' key is pressed
    let newStar = {
      radius1: random(10, 30),
      radius2: random(50, 100),
      points: 5,
      angle: random(TWO_PI),
      speed: random(2, 10)
    };
    stars.push(newStar);
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  beginShape();
  let angleIncrement = TWO_PI / npoints;
  for (let angle = -PI / 2; angle < TWO_PI - PI / 2; angle += angleIncrement) {
    let starsx = x + cos(angle) * radius2 + 2;
    let starsy = y + sin(angle) * radius2 + 2;
    vertex(starsx, starsy);
    starsx = x + cos(angle + angleIncrement / 2) * radius1;
    starsy = y + sin(angle + angleIncrement / 2) * radius1;
    vertex(starsx, starsy);
  }
  endShape(CLOSE);
}
function keyReleased() {
  if (key === "g") {
    // Stop star growth when]key is released
    growing = false;
  }
}
function drawHorizontalGradient(x, y, w, h, colorArray) {
  let gradientHeight = h / colorArray.length;
  noStroke();
  for (let i = 0; i < colorArray.length; i++) {
    fill(colorArray[i]);
    rect(x, y + i * gradientHeight, w, gradientHeight);
  }
  push();
  textSize(10);
  fill(255);
  text("1.Click mouse when the stars are alligned to see what happens when they morph together!",10,30);
  text("2.Press g to watch it grow!", 10, 50);
  text("3.Press s to reproduce!", 10, 70);
  pop();
}
