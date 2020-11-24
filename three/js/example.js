// https://observablehq.com/@camargo/three-js-utah-teapot-with-a-custom-phong-shader-material@325
export default function define(runtime, observer) {
    const main = runtime.module();
    main.variable(observer()).define(["md"], function(md){return(
  md`# Three.js Utah Teapot with a Custom Phong Shader Material`
  )});
    main.variable(observer()).define(["md"], function(md){return(
  md`This notebook demonstrates how to use [Three.js](https://threejs.org/) to render a [Utah teapot](https://en.wikipedia.org/wiki/Utah_teapot) using a custom vertex shader and fragment shader. The fragment shader uses the [Phong reflection model](https://en.wikipedia.org/wiki/Phong_reflection_model) to shade the surface of the teapot.`
  )});
    main.variable(observer("renderer")).define("renderer", ["THREE","camera","invalidation","width","height","scene"], function*(THREE,camera,invalidation,width,height,scene)
  {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    invalidation.then(() => (controls.dispose(), renderer.dispose()));
    renderer.setSize(width, height);
    renderer.setPixelRatio(devicePixelRatio);
    controls.addEventListener("change", () => renderer.render(scene, camera));
    renderer.render(scene, camera);
    yield renderer.domElement;
  }
  );
    main.variable(observer("teapot")).define("teapot", ["THREE","material"], function(THREE,material)
  {  
    const size = 400;
    const segments = 15;
    const bottom = true;
    const lib = true;
    const body = true;
    const fitLid = true;
    const blinn = true;
    const geometry = new THREE.TeapotBufferGeometry(size, segments, bottom, lib, body, fitLid, blinn);
    return new THREE.Mesh(geometry, material);
  }
  );
    main.variable(observer("material")).define("material", ["THREE"], function(THREE)
  {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        Ka: { value: new THREE.Vector3(0.9, 0.5, 0.3) },
        Kd: { value: new THREE.Vector3(0.9, 0.5, 0.3) },
        Ks: { value: new THREE.Vector3(0.8, 0.8, 0.8) },
        LightIntensity: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
        LightPosition: { value: new THREE.Vector4(0.0, 2000.0, 0.0, 1.0) },
        Shininess: { value: 200.0 }
      },
      vertexShader: `
        varying vec3 Normal;
        varying vec3 Position;
  
        void main() {
          Normal = normalize(normalMatrix * normal);
          Position = vec3(modelViewMatrix * vec4(position, 1.0));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 Normal;
        varying vec3 Position;
  
        uniform vec3 Ka;
        uniform vec3 Kd;
        uniform vec3 Ks;
        uniform vec4 LightPosition;
        uniform vec3 LightIntensity;
        uniform float Shininess;
  
        vec3 phong() {
          vec3 n = normalize(Normal);
          vec3 s = normalize(vec3(LightPosition) - Position);
          vec3 v = normalize(vec3(-Position));
          vec3 r = reflect(-s, n);
  
          vec3 ambient = Ka;
          vec3 diffuse = Kd * max(dot(s, n), 0.0);
          vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);
  
          return LightIntensity * (ambient + diffuse + specular);
        }
  
        void main() {
          gl_FragColor = vec4(phong(), 1.0);
        }
      `
    });
    return material;
  }
  );
    main.variable(observer("camera")).define("camera", ["width","height","THREE"], function(width,height,THREE)
  {
    const fov = 45;
    const aspect = width / height;
    const near = 1;
    const far = 100000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(1000, 1000, 1500);
    return camera;
  }
  );
    main.variable(observer("scene")).define("scene", ["THREE","teapot"], function(THREE,teapot)
  {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f7f9);
    scene.add(teapot);
    return scene;
  }
  );
    main.variable(observer("height")).define("height", function(){return(
  512
  )});
    main.variable(observer("THREE")).define("THREE", ["require"], async function(require)
  {
    const THREE = window.THREE = await require('three@0.105.1/build/three.min.js');
    await require('three@0.105.1/examples/js/controls/OrbitControls.js').catch(() => {});
    await require('three@0.105.1/examples/js/geometries/TeapotBufferGeometry.js').catch(() => {});
    return THREE;
  }
  );
    return main;
  }