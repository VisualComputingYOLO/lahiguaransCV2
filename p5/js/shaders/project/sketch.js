let theShader;
let shaderTexture;
let img;
let slider;
let gray = 0;

function preload(){
  img = loadImage('https://cors-anywhere.herokuapp.com/https://i.pinimg.com/originals/97/8c/89/978c89a6ad573b6c7eb38e75b98ec6c2.png');
  theShader = loadShader('texture.vert','texture.frag');
}

function setup() {
  createCanvas(img.width, img.height, WEBGL);
  background(210);
  pixelDensity(1);
  noStroke();
  img.resize(width,0);

  shaderTexture = createGraphics(img.width, img.height, WEBGL);
  shaderTexture.noStroke(); 
}

function draw(){
  push();
  Project();
  pop();
}

function Project() {

  // Se pasa el shader a la capa del createGraphics
  shaderTexture.shader(theShader);

  // Valores uniform para el fragment shader
  theShader.setUniform("u_img", img);
  /* theShader.setUniform("u_key", gray); */
  
  // Renderizar el shader
  shaderTexture.rect(0,0,img.width,img.height);

  //Se pasa el shader como textura
  push();
  //Se pasa el shader del video como textura
  texture(shaderTexture);
  plane(img.width,img.height);
  pop();  


}

/* function keyPressed() {
	if (key === '0') {
	gray = 0;
	} else if (key === '1') { 
	gray = 1;
	} else if (key === '2') {
	gray = 2;
	} else if (key === '3') {
	gray = 3;
	} else if (key === '4') {
	gray = 4;
	}
} */

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


