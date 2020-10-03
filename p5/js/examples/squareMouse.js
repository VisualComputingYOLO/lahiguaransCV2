function setup() { 
  var myCanvas = createCanvas(windowWidth-300, 400);
  myCanvas.parent('squareMouse');
} 

function draw() { 
	// Dibuja un nuevo background en cada frame
	background(210);
	stroke(0);
	fill(0,0,255);
	// en modo CENTER, el rectángulo se dibuja en el centro del cursor
	rectMode(CENTER);
	// mouseX y mouseY posición del ratón
	rect(mouseX,mouseY,50,50);
}

function windowResized() {
  resizeCanvas(windowWidth-300, 400);
}