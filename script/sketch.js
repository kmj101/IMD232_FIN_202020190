//original by:https://openprocessing.org/sketch/1494739
//original by:https://openprocessing.org/sketch/704595
let running = true;
let brush;
let count = 0;

function setup() {
  setCanvasContainer('canvas', 2, 2, true);
  imageMode(CENTER);
  background(0);

  brush = createGraphics(width / 50, height);
  brush.colorMode(HSB, 1.0);
  makeBrush();
  ellipse(0, 0, width, height, 0);
  noiseDetail(1, 0);
}

function draw() {
  colorMode(HSB, 1.0);
  if (mouseX != 0 && mouseY != 0 && running) {
    for (let i = 0; i < 55; i++) {
      let x = mouseX + map(noise(count * 0.005, 0.5), 0, 1, -1, 1) * 100;
      let y = mouseY + map(noise(count * 0.005, 2.5), 0, 1, -1, 1) * 100;
      let a = noise(count * 0.001, 3.5) * TWO_PI * 15;
      let s = noise(count * 0.03, 5.5);
      let hue = map(noise(count * 0.01, 5.5), 0.33, 0.66, 0, 1);
      tint(hue, 0.9, 1, noise(count * 0.1, 7.5) * 0.5);

      drawBrush(x, y, a, s);
      drawBrush(width - x, y, -a, s);

      count++;
    }
  }
}

function keyPressed() {
  if (keyCode === 82) {
    background(0);
  } //'r'eset
  if (keyCode === 32) {
    running = !running;
  } //일시정지 스페이스
}

function makeBrush() {
  brush.clear();
  brush.noFill();
  noiseSeed(random(-100000, 100000));
  for (let i = 0; i < 10; i++) {
    brush.strokeWeight(random() * 2);
    brush.stroke(
      random(1.0),
      random(0.5, 1.0),
      random(0.5, 1.0),
      random() * 0.5
    );
    brush.ellipse(
      random(20, brush.width),
      random(0, brush.height),
      random(10, brush.width)
    );
  }
  noStroke();
  fill(0, 0, 0.1, 1);
  ellipse(0, 0, width, height, 0);
}

function drawBrush(x, y, a, s) {
  push();
  translate(x, y);
  rotate(a);
  scale(s, s);
  image(brush, 0, 0);
  pop();
}
