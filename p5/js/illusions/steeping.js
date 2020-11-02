let radio = 10;
let ancho = 20;
let opa = 255;
let velocidad = 0;

function setup() {
  var myCanvas = createCanvas(1000, 600);
  myCanvas.parent('steeping');
}


function draw() {
  background(255);
  illusion();
  if(velocidad != (width + (ancho*5/2))){
    velocidad++;
  } else{
    velocidad = 0;
  }
}

function illusion() {
  push();
  lineas();
  pop();
  push();
  rectangulos();
  pop();
}  

function lineas() {
    var i;
    for(i = 0; i < width; i+=(ancho*2)){
      push();
      translate(i, 0);
      vertical();
      pop();
    }
}

function rectangulos() {
    push();
    translate(-(ancho*5/2) + velocidad,(height/4) + 50);
    y();
    pop();
    push();
    translate(-(ancho*5/2) + velocidad,(height * 3 /4) - 50);
    bl();
    pop();
}

function y(){
  noStroke();
  rectMode(CENTER);
  fill('yellow');
  rect(0,0,ancho*6,ancho*2);
}

function bl(){
  noStroke();
  rectMode(CENTER);
  fill('blue');
  rect(0,0,ancho*6,ancho*2);
}

function vertical(){
  stroke(0,0,0,opa);
  strokeWeight(ancho);
  line(0,0,0,height);
}

function keyPressed() {
  if (key === '0') {
    opa = 255;
  } else if (key === '1') { 
    opa = 0;
  }
}
