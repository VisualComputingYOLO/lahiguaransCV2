var t = 0;
var mult = 1;

function setup() {
  var myCanvas = createCanvas(600, 600);
  myCanvas.parent('warping');
  strokeWeight(3);
}

function draw() {
  background(220);
  
  for(var i=-150;i<100;i+=50){
    push();
    scale(2);
    translate(-50,i);
    drawShape();
    pop();
  }  
  t += mult*0.01;
  if(t > 1 || t < -1){
    mult *= -1;
  }
}

function drawShape(){
  
  // red and blue lines are always the same size
  stroke('red');
  line(100,200,200,200);
  stroke('blue');
  line(200,200,300,200);
  
  // arrows vary with time
  stroke('black');
  line(100,200,100+t*15,200+15);
  line(100,200,100+t*15,200-15);

  line(200,200,200-t*15,200+15);
  line(200,200,200-t*15,200-15);

  line(300,200,300+t*15,200+15);
  line(300,200,300+t*15,200-15);

}
