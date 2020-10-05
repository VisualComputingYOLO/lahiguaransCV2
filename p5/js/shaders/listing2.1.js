let toon;

function setup() {
  createCanvas(640, 360, WEBGL);
  noStroke();
  fill(204);
  toon = loadShader("frag.glsl", "vert.glsl");
  toon.set("fraction", 1.0);
}

function draw() {
  shader(toon);
  background(0); 
  let dirY = (mouseY / let(height) - 0.5) * 2;
  let dirX = (mouseX / let(width) - 0.5) * 2;
  directionalLight(204, 204, 204, -dirX, -dirY, -1);
  translate(width/2, height/2);
  sphere(120);
}