let opa = 255;
let radio = 50;

function setup() {
  var myCanvas = createCanvas(1000, 600);
  myCanvas.parent('ebbinghaus');
}


function draw() {
  background(220);
  illusion();
}

function illusion() {
  push();
  translate( (width / 4) + 50 , height / 2);
  uno();
  pop();
  push();
  translate( (width / 4) * 3  , height / 2);
  dos();
  pop();
}  

function uno() {
    center();
    var an = (PI / 3);
    var i;
    for(i = 0; i < 6; i++){
      push();
      translate(p5.Vector.fromAngle(i * an, 3.5 * radio));
      exterior1();
      pop();
    }
}

function dos() {
    center();
    var an = ( 2 * PI / 8);
    var i;
    for(i = 0; i < 8; i++){
      push();
      translate(p5.Vector.fromAngle(i * an, 2 * radio));
      exterior2();
      pop();
    }
}

function center(){
  ellipseMode(RADIUS);
  noStroke();
  fill('yellow');
  ellipse(0,0,radio,radio);
}

function exterior1(){
  ellipseMode(RADIUS);
  noStroke();
  fill(155, 0, 215, opa);
  ellipse(0,0,1.5 * radio,1.5 * radio);
}

function exterior2(){
  ellipseMode(RADIUS);
  noStroke();
  fill(155, 0, 215, opa);
  ellipse(0,0,0.5 * radio, 0.5 * radio);
}

function keyPressed() {
  if (key === '0') {
    opa = 255;
  } else if (key === '1') { 
    opa = 0;
  }
}
