// Estas son definiciones necesarias que le permiten a la tarjeta gráfica saber cómo representar el sombreador
#ifdef GL_ES
precision mediump float;
#endif
  
varying vec2 vTexCoord;
  // Valores que se pasan desde p5
uniform sampler2D u_img;
uniform int u_key;
vec3 lineColor = vec3(0.8941, 0.3137, 0.0);
float maxMix = (0.6);
float minMix = (0.2);
float lineWidth = 0.008;
float lineWidthHalf = lineWidth/2.0;

// Funcion para convertir un color a escala de grises
vec3 orangeColor(vec3 color) {
  vec3 newColor;
  if(color.r <= 0.3){
    newColor.r = mix(color.r, lineColor.r, minMix);
  } else {
    newColor.r = mix(color.r, lineColor.r, maxMix);
  }
  if(color.g <= 0.3){
    newColor.g = mix(color.g, lineColor.g, minMix);
  } else {
    newColor.g = mix(color.g, lineColor.g, maxMix);
  }
  if(color.b <= 0.3){
    newColor.b = mix(color.b, lineColor.b, minMix);
  } else {
    newColor.b = mix(color.b, lineColor.b, maxMix);
  }
  return newColor;
}

void main() {
  vec2 uv = vTexCoord;
  vec3 color;
  float i;
  //Invierte la posicion de la cordenada  para que la imagen no quede alrreves
  uv.y = 1.0 - uv.y;
  vec4 tex = texture2D(u_img, uv);

  for(i = 0.0; i <= 1.0; i+=0.2){
    vec2 point1 = vec2(i, 1.0 - i);
    vec2 point2 = vec2((i + 0.1),(1.0 - i) + 0.1);

    float m = (point1.y - point2.y)/(point1.x - point2.x);
    float c = point1.y - m*point1.x;
    vec2 line = vec2((uv.y-c)/m, uv.x*m+c);

    if((uv.y > line.y-lineWidthHalf && uv.y < line.y+lineWidthHalf) || (uv.x > line.x-lineWidthHalf && uv.x < line.x+lineWidthHalf)){
      color = orangeColor(tex.rgb);
    } else {
      color = tex.rgb;
    }
  }

  gl_FragColor = vec4(color, 1.0);
}