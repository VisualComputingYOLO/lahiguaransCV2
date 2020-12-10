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

float grid(vec2 st, float res)
{
  vec2 grid = fract(st*res);
  return (step(res,grid.x) * step(res,grid.y));
}
// Funcion para convertir un color a escala de grises
vec3 orangeColor(vec3 color, float x) {
  vec3 newColor;
  if(x == 1.0){
    newColor = color;
  } else {
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
  }  
  return newColor;
}

void main() {
  vec2 uv = vTexCoord;
  vec3 color;
  float i;
  uv.y = 1.0 - uv.y;
  //Invierte la posicion de la cordenada  para que la imagen no quede alrreves
  vec4 tex = texture2D(u_img, uv);

  vec2 grid_uv = uv.xy * 90.0; // scale
  float x = grid(grid_uv, 0.4);
  color = orangeColor(tex.rgb, x);  

  if((uv.x <= 0.28 || uv.x >= 0.7) || (uv.y <= 0.1 || uv.y >= 0.6)){
    color = tex.rgb;
  }

  gl_FragColor = vec4(color, 1.0);

}