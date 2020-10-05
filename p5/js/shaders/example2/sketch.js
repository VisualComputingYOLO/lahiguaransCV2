let theShader;
let shaderTexture;

let theta = 0;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;
let angle=0;
let img;


function preload(){
  img = loadImage('https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png');
  // load the shader
  theShader = loadShader('texture.vert','texture.frag');
  
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(img.width, img.height, WEBGL);
  noStroke();

  // initialize the createGraphics layers
  shaderTexture = createGraphics(img.width, img.height, WEBGL);

  // turn off the createGraphics layers stroke
  shaderTexture.noStroke();

   x = -50;
   y = 0;
}

function draw() {

  // instead of just setting the active shader we are passing it to the createGraphics layer
  shaderTexture.shader(theShader);

  // here we're using setUniform() to send our uniform values to the shader
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_img", img);
  

  // passing the shaderTexture layer geometry to render on
  shaderTexture.rect(0,0,width,height);

  background(210);

  // pass the shader as a texture
  // anything drawn after this will have this texture.
  texture(shaderTexture);

  translate(-110, 0, 0);
  push();
  rotateZ(angle);
  rotateX(angle);
  rotateY(angle);  
  theta += 0.05;
  box(140);
  pop();
  angle+=0.005;

  /* when you put a texture or shader on an ellipse it is rendered in 3d,
     so a fifth parameter that controls the # vertices in it becomes necessary,
     or else you'll have sharp corners. setting it to 100 is smooth. */
  let ellipseFidelity = int(map(mouseX, 0, width, 8, 100));
  ellipse(260, 0, 200, 200, ellipseFidelity);
}