function setup() { 
  var myCanvas = createCanvas(windowWidth-300, 400);
  myCanvas.parent('speedMouse');
  background(210);
} 

function draw() {
  // Llame al método variableEllipse () y envíele los parámetros
  // para la posición actual del mouse y la posición anterior del mouse
  variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
}

// El método simple variableEllipse () fue creado específicamente
// para este programa. Calcula la velocidad del mouse
// y dibuja una pequeña elipse si el mouse se mueve lentamente
// y dibuja una elipse grande si el mouse se mueve rápidamente

function variableEllipse(x, y, px, py) {
  let speed = abs(x - px) + abs(y - py);
  stroke(speed);
  fill(random(255),random(255),random(255));
  ellipse(x, y, speed, speed);
}

function windowResized() {
  resizeCanvas(windowWidth-300, 400);
  background(210);
}