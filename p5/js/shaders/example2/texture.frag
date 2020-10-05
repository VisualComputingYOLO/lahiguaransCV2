// These are necessary definitions that let you graphics card know how to render the shader
#ifdef GL_ES
precision mediump float;
#endif

// In this example we care about where on the canvas the pixel is, so we need to know the size of the canvas.
// This is passed in as a uniform from the sketch.js file.
  
  varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform sampler2D u_img;

void main() {
 
  
  vec2 uv = vTexCoord;
  
 
  // Lets use the pixels position on the x-axis as our gradient for the red color
  // Where the position is closer to 0.0 we get black (st.x = 0.0)
  // Where the position is closer to width (defined as 1.0) we get red (st.x = 1.0)
  //gl_FragColor = vec4(st.x,0.0,0.0,1.0); // R,G,B,A
  
  // you can only have one gl_FragColor active at a time, but try commenting the others out
  // try the green channel
  //gl_FragColor = vec4(0.0,st.x,0.0,1.0); 
  
  // try both the x position and the y position
  //gl_FragColor = vec4(st.x,st.y,(st.x+st.y),1.0); 
  gl_FragColor = texture2D(u_img, vTexCoord);
  
}
