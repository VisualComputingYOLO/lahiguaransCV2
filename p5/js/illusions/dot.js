let angle=0

function setup() {
  var myCanvas = createCanvas(520, 500);
  myCanvas.parent('dot');
}

function draw() {
  background('blue');
  
  for (let i = 50; i < width - 50; i += 50) {
    for (let j = 50; j < height - 50; j += 50) { 
      push()
      translate(i,j)
      rotate(HALF_PI+i+angle)
      fill('green')
      stroke('blue')
      strokeWeight(3)
      arc(0, 0, 30, 30, 0, PI+j)
      pop()
      
      push()
      translate(i,j)
      rotate(QUARTER_PI+j+angle)
      fill('green')
      strokeWeight(3)
      stroke('cyan')
      arc(0, 0, 30, 30, PI+i, 0)
      pop()
      
      angle+=0.0003
    }
  }
}
//HALF_PI+  //QUARTER_PI+


// 
// 