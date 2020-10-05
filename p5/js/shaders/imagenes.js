let angle = 0;
let angle2 = 0;
let img_01;
let img_02;
let matrixsize;
var matrix;
var w = 60;


function setup() { 
	var myCanvas = createCanvas(1000, 500, WEBGL);
	myCanvas.parent('escala_grices');

    img_01 = loadImage('https://media.mutualart.com/Images/2016_09/29/15/153118365/05c8ca8d-4b50-4dd5-bc9b-888cf9f34cb7_570.Jpeg');
    img_02 = loadImage('https://media.mutualart.com/Images/2016_09/29/15/153118365/05c8ca8d-4b50-4dd5-bc9b-888cf9f34cb7_570.Jpeg');

} 

function draw() {
    background(0);
    noStroke();
	ambientMaterial(255);
    texture(img_01);

    pointLight(255, 255, 255, 0, 0, 1250);
	
	let dx= mouseX-width/2;
	let dy= mouseY-height/2;
  
	//ambientLight(255,0,0);
	pointLight(0,0,255,dx,dy,100);
	//pointLight(255,100,255,-400,0,200);
	pointLight(255,255,255,300,0,0);
	rectMode(CENTER);
    

    translate(0,0);
    push();
	translate(-150 ,0);
    //rotateX(angle);
    rotateY(angle);
    //rotateZ(angle*0.2);
    cylinder(80,250);
	//box(200);
    pop();    

    
    push();
	translate(150 ,0);
    noStroke();
    texture(img_02);
    //rotateX(angle2);
    rotateY(angle2);
    //rotateZ(angle2*0.2);
    cylinder(80,250);
	//box(200);
    pop();


    angle2 += 0.01;
    angle += 0.005;
}


function convolutions()
{
    regresar();
    
    img_02.loadPixels();

	for (let x = 0; x < img_02.width; x++) {
		for (let y = 0; y < img_02.height; y++ ) { 
			let c = convolutionAux(x, y, matrix, matrixsize, img_02);
			let loc = (x + y*img_02.width)*4;

			img_02.pixels[loc] = red(c);
			img_02.pixels[loc+1] = green(c);
			img_02.pixels[loc+2] = blue(c);
			img_02.pixels[loc+3] = alpha(c);
		}
    }
    
    img_02.updatePixels();
}

function convolutionAux(x, y, matrix, matrixsize, img){

	var rtotal = 0;
	var gtotal = 0
	var btotal = 0;
	var atotal = 0;
	for (let i = 0; i < matrixsize; i++){
		for (let j= 0; j < matrixsize; j++){
			var xloc = x+i;
			var yloc = y+j;
			var loc = (xloc + img.width*yloc)*4;

			loc = constrain(loc,0,img.pixels.length-1);
			rtotal += ((img.pixels[loc]) * matrix[i][j]);
			gtotal += ((img.pixels[loc+1]) * matrix[i][j]);
			btotal += ((img.pixels[loc+2]) * matrix[i][j]);
			atotal += ((img.pixels[loc+3]) * matrix[i][j]);
		}
	}

	// Make sure RGB is within range
	rtotal = constrain(rtotal, 0, 255);
	gtotal = constrain(gtotal, 0, 255);
	btotal = constrain(btotal, 0, 255);
	atotal = constrain(atotal, 0, 255);
	// Return the resulting color
	return color(rtotal, gtotal, btotal);
}

function complementary()
{
    regresar();
    let img2 = createImage(570, 252);

	img_02.loadPixels();

    for(var y = 0 ; y < img_02.height; y++)
    {
        for(var x = 0; x < img_02.width; x++)
        {
            let index = (x + y * img_02.width) * 4;

            img_02.pixels[index + 0] = 255 - img_02.pixels[index + 0];
            img_02.pixels[index + 1] = 255 - img_02.pixels[index + 1];
            img_02.pixels[index + 2] = 255 - img_02.pixels[index + 2];

        }
    }

    img_02.updatePixels();
}

function regresar()
{
    img_02.loadPixels();
    img_01.loadPixels();

    for(y = 0; y < 570; y++ )
    {
        for(x = 0; x < img_02.width; x++)
        {
            let index = (y + x*img_02.width)*4;
            img_02.pixels[index + 0] = img_01.pixels[index + 0];
            img_02.pixels[index + 1] = img_01.pixels[index + 1];
            img_02.pixels[index + 2] = img_01.pixels[index + 2];
            img_02.pixels[index + 3] = img_01.pixels[index + 3];
        }
    }

    img_01.updatePixels();
    img_02.updatePixels();
}

function filtrosBlancoNegro(gray)
{
    let lightness;

    img_02.loadPixels();
   
	for (let y = 0; y < img_02.height; y++) {
		for (let x = 0; x < img_02.width; x++){ 
            let index = (x+y*img_02.width)*4; // Posicion del pixel
            
            let r=img_02.pixels[index+0]; // Componente Red
            let g=img_02.pixels[index+1]; // Componente Green
            let b=img_02.pixels[index+2]; // Componente Blue
            let a=img_02.pixels[index+3]; // Componente Alpha
			
			if (gray===1){
				let I=(r+g+b)/3; // Promedio de los tres componentes
				lightness = I;
			} else if (gray===2){
				let V= max(r,g,b); // Componente mas grande de un color
				lightness = V;
			} else if (gray===3){
				let L=(max(r,g,b)+min(r,g,b))/2; // Promedio entre el componente mas grande y el mas pequeño
				lightness = L;
			} else if (gray===4){ // Promedio ponderado de RGB con corrección gamma (Luma)
				let Y601= 0.2989*r + 0.5870*g + 0.1140*b; // SDTV
				lightness = Y601;
			} else if (gray===5){ 
				let Y240= 0.212*r + 0.701*g + 0.087*b; // Adobe
				lightness = Y240;
			} else if (gray===6){ 
				let Y709= 0.2126*r + 0.7152*g + 0.0722*b; // HDTV
				lightness = Y709;
			} else if (gray===7){ 
				let Y2020= 0.2627*r + 0.6780*g + 0.0593*b; // UHDTV,HDR
				lightness = Y2020;
			} 
			
			            
			img_02.pixels[index+0]=lightness;
			img_02.pixels[index+1]=lightness;
			img_02.pixels[index+2]=lightness;
			img_02.pixels[index+3]=a;
			
			if (gray===0){ // Imagen original
				pixels[index+0]=r;
				pixels[index+1]=g;
				pixels[index+2]=b;
				pixels[index+3]=a;
			}
		}
	}
	img_02.updatePixels();
	//image(img, 12, 12, img.width *0.26, img.height *0.26);
}


function keyPressed() 
{
    matrixsize = 3;
	if (key === '0') { // Identidad
    matrix = [ [  0,  0,  0 ],
               [  0,  1,  0 ],
               [  0,  0,  0 ] ]; 
        convolutions();
    } else if (key === '1') { // Enfocar. Acentúa los bordes
        matrix = [ [ -1, -1, -1 ],
                [ -1,  9, -1 ],
                [ -1, -1, -1 ] ]; 
        convolutions();
    } else if (key === '2') { // Repujado
        matrix = [ [ -2, -1,  0 ],
                [ -1,  1,  1 ],
                [  0,  1,  2 ] ]; 
        convolutions();
    } else if (key === '3') { // Detección de bordes
        matrix = [ [  1,  0, -1 ],
                [  0,  0,  0 ],
                [ -1,  0,  1 ] ]; 
        convolutions();
    } else if (key === '4') {
        matrix = [ [  0,  1,  0 ],
                [  1, -4,  1 ],
                [  0,  1,  0 ] ]; 
        convolutions();
    } else if (key === '5') {
        matrix = [ [ -1, -1, -1 ],
                [ -1,  8, -1 ],
                [ -1, -1, -1 ] ]; 
        convolutions();
    } else if (key === '6') { // Enfocar
        matrix = [ [  0, -1,  0 ],
                [ -1,  5, -1 ],
                [  0, -1,  0 ] ];
        convolutions();
    } else if (key === '7') { // Desenfoque de cuadro (normalizado)
        matrix = [ [ 1/9, 1/9, 1/9 ],
                [ 1/9, 1/9, 1/9 ],
                [ 1/9, 1/9, 1/9 ] ]; 
        convolutions();
    } else if (key === '8') { // Desenfoque gaussiano 5 × 5 (aproximación)
        matrixsize = 5;
        matrix = [ [ 1/256,  4/256,  6/256,  4/256, 1/256 ],
                [ 4/256, 16/256, 24/256, 16/256, 4/256 ],
                [ 6/256, 24/256, 36/256, 24/256, 6/256 ],
                [ 4/256, 16/256, 24/256, 16/256, 4/256 ],
                [ 1/256,  4/256,  6/256,  4/256, 1/256 ] ];
        convolutions();
    } else if (key === '9') { // Máscara de desenfoque 5 × 5 (sin máscara de imagen)
        matrixsize = 5;
        matrix = [ [ -1/256,  -4/256,  -6/256,  -4/256, -1/256 ],
                [ -4/256, -16/256, -24/256, -16/256, -4/256 ],
                [ -6/256, -24/256, 476/256, -24/256, -6/256 ],
                [ -4/256, -16/256, -24/256, -16/256, -4/256 ],
                [ -1/256,  -4/256,  -6/256,  -4/256, -1/256 ] ];
        convolutions();
    } else if (key == 'c'){
        complementary();
    }else if (key == 'f'){
        regresar();
    }else if (key == 'q'){
        regresar();
        filtrosBlancoNegro(1);
    }else if (key == 'w'){
        regresar();
        filtrosBlancoNegro(2);
    }else if (key == 'e'){
        regresar();
        filtrosBlancoNegro(3);
    }else if (key == 'r'){
        regresar();
        filtrosBlancoNegro(4);
    }else if (key == 't'){
        regresar();
        filtrosBlancoNegro(5);
    }else if (key == 'y'){
        regresar();
        filtrosBlancoNegro(6);
    }else if (key == 'u'){
        regresar();
        filtrosBlancoNegro(7);
    }
}

