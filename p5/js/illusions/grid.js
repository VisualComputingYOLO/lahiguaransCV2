let radio = 10;
let ancho = 10;
let gris = 150;
let opa = 255;

function setup() {
  var myCanvas = createCanvas(1000, 600);
  myCanvas.parent('grid');
}


function draw() {
  background(0);
  illusion();
}

function illusion() {
  push();
  lineas();
  pop();
  push();
  puntos();
  pop();
}  

function lineas() {
    var i;
    for(i = 0; i < width; i+=50){
      push();
      translate(i, 0);
      vertical();
      pop();
    }
    for(i = 0; i < height; i+=50){
      push();
      translate(0, i);
      horizontal();
      pop();
    }
}

function puntos() {
    var m;
    var n;
    for(m = 0; m <= width; m+=50){
      for(n = 0; n <= height; n+=50){
        push();
        translate(m, n);
        center();
        pop();
      }
    }
}

function center(){
  ellipseMode(RADIUS);
  noStroke();
  fill(255,255,255,opa);
  ellipse(0,0,radio,radio);
}

function vertical(){
  stroke(gris);
  strokeWeight(ancho);
  line(0,0,0,height);
}

function horizontal(){
  stroke(gris);
  strokeWeight(ancho);
  line(0,0,width,0);
}

function keyPressed() {
  if (key === '0') {
    opa = 255;
    gris = 150;
  } else if (key === '1') { 
    opa = 0;
    gris = 255;
  }
}
