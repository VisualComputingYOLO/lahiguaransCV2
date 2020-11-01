let opa = 255;
let radio = 50;
let angle = 0;
let change = 0;

function setup() {
  var myCanvas = createCanvas(1000, 600);
  myCanvas.parent('kanizsa');
}


function draw() {
  background(220);
  illusion();
}

function illusion() {
  push();
  translate( 320 , 160);
  uno();
  pop();
  push();
  translate( 610 , 160);
  dos();
  pop();
  push();
  translate( 610 , 450);
  uno();
  pop();
  push();
  translate( 320 , 450);
  dos();
  pop();
  angle += change;
}  

function uno() {
  
  var i;
  var j;
  var c = 0;
  for(i = -70; i <= 70; i+=140){
    for(j = -70; j <= 70; j+=140){
      push();
      translate(j,i);
      if(c == 0){
        rotate(HALF_PI * 0 + angle);
        center();
      } else if(c == 1){
        rotate(HALF_PI * 1 - angle);
        center();
      } else if(c == 2){
        rotate(HALF_PI * 3 - angle);
        center();
      } else if(c == 3){
        rotate(HALF_PI * 2 + angle);
        center();
      }
      pop();
      c++;
    }
  }
}

function dos() {
  
  var i;
  var j;
  var c = 0;
  for(i = -70; i <= 70; i+=140){
    for(j = -70; j <= 70; j+=140){
      push();
      translate(j,i);
      if(c == 0){
        rotate(HALF_PI * 2 - angle);
        center2();
      } else if(c == 1){
        rotate(HALF_PI * 3 + angle);
        center2();
      } else if(c == 2){
        rotate(HALF_PI * 1 + angle);
        center2();
      } else if(c == 3){
        rotate(HALF_PI * 0 - angle);
        center2();
      }
      pop();
      c++;
    }
  }
}

function center(){
  stroke('yellow');
  strokeWeight(5);
  fill('red');
  arc(0, 0, 100, 100, PI / 2, ( 2 * PI));
}

function center2(){
  stroke('yellow');
  strokeWeight(5);
  fill('green');
  arc(0, 0, 100, 100, PI / 2, ( 2 * PI));
}

function keyPressed() {
  if (key === '0') {
    change = 0;
  } else if (key === '1') { 
    change = 0.005;
  }
}
