let stars = [];
let circle;
let score = 0;
let speed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 500; i++) {
    stars.push(new Star());
  }
  circle = new Circle(random(width), random(height), 50);
}

function draw() {
  background(0);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  circle.update();
  circle.show();
  textSize(32);
  fill(255);
  text(`Score: ${score}`, 50, 50);
}

function mousePressed() {
  if (dist(mouseX, mouseY, circle.x, circle.y) < circle.size / 2) {
    circle.clicked();
    score++;
    speed++;
  }
}

class Circle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.x += random(-speed, speed);
    this.y += random(-speed, speed);
    if (this.x < 0) {
      this.x = width;
    }
    if (this.x > width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
    if (this.y > height) {
      this.y = 0;
    }
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  clicked() {
    this.reset();
    speed++;
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(30, 100);
    this.color = color(random(255), random(255), random(255));
  }
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.size = random(1, 5);
    this.speed = map(this.size, 1, 5, 1, 5);
  }

  update() {
    this.z -= this.speed;
    if (this.z < 1) {
      this.z = width;
    }
  }

  show() {
    fill(255);
    noStroke();
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    let r = map(this.z, 0, width, this.size, 0);
    ellipse(sx, sy, r, r);
  }
}
