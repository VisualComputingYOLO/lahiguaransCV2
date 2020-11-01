import * as THREE from '../three.module.js'; 
function main() {
    // Step 4 - Make it move!
    // - Combine geometry into one group
    // - Animate the group's rotation
    // Asignación de la escena donde estaran alojados los objetos para la ilusión
    let scene = new THREE.Scene();
    // El tamaño del objeto en la imagen renderizada se mantiene constante sin importar la distancia de la camara
    let camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000);
    camera.position.set(500, 500, 500)
    camera.lookAt(scene.position);

    // Add our renderer
    // Se usa WebGL
    // WebGLRenderer: motor de rasterización
    const container = document.getElementById( 'c' );
    const resource = document.getElementById( 'canvasthreejs' );
    resource.appendChild( container );

    // const canvas = document.querySelector('#c');
    let renderer = new THREE.WebGLRenderer({ antialias: true, container});
    renderer.setSize(700, 500)
    resource.appendChild(renderer.domElement);


    // Superficie de lambert 
    // Refleja la energía incidente desde una dirección igual en todas las direcciones, al variar el punto de vista, la luminicencia
    // no cambia
    
    let material = new THREE.MeshLambertMaterial({ color: "lightgrey", flatShading: true })

    // Clase geométrica para un cubo rectangular
    // Es centrado en el origen
    // Se asigna la figura a una clase que la representa por sus vertices, aristas y caras
    // Polygon mesh

    let bottomBox = new THREE.BoxGeometry(50, 50, 300)
    let bottomMesh = new THREE.Mesh(bottomBox, material)

    let upBox = new THREE.BoxGeometry(50, 300, 50)
    let upMesh = new THREE.Mesh(upBox, material)
    upMesh.position.set(0, 125, 125)

    let topBox = new THREE.BoxGeometry(150, 50, 50)
    let topMesh = new THREE.Mesh(topBox, material)
    topMesh.position.set(100, 250, 125)

    // Generación de figura plana

    let topPlane = new THREE.PlaneGeometry(50, 50, 32)
    let topPlaneMesh = new THREE.Mesh(topPlane, material)
    topPlaneMesh.position.set(200, 275, 125)
    topPlaneMesh.rotation.x = THREE.Math.degToRad(-90)

    let topTriGeometry = new THREE.Geometry()
    topTriGeometry.vertices.push(new THREE.Vector3(0, 0, 0))
    topTriGeometry.vertices.push(new THREE.Vector3(50, 0, 0))
    topTriGeometry.vertices.push(new THREE.Vector3(50, 50, 0))
    topTriGeometry.faces.push(new THREE.Face3(0, 1, 2))
    topTriGeometry.computeFaceNormals()

    let topTriMesh = new THREE.Mesh(topTriGeometry, material)
    topTriMesh.position.set(225, 275, 150)
    topTriMesh.rotation.z = THREE.Math.degToRad(180)

    let group = new THREE.Group()
    group.add(bottomMesh)
    group.add(upMesh)
    group.add(topMesh)
    group.add(topPlaneMesh)
    group.add(topTriMesh)
    scene.add(group)

    // Animate our group's y rotation
    let tl = new TimelineMax({ repeat: -1, repeatDelay: 0.5 });
    tl.to(group.rotation, 3, { y: THREE.Math.degToRad(360), ease: "rough({strength: 3, points: 50, template: strong.inOut, taper: both, randomize: false})" });
    tl.to(group.rotation, 3, { y: THREE.Math.degToRad(0), ease: "rough({strength: 3, points: 50, template: strong.inOut, taper: both, randomize: false})" });
    scene.add(group)

    // Add a light!
    let light = new THREE.DirectionalLight(0xffffff, 1.8);
    light.position.set(60, 100, 20);
    scene.add(light);

    let render = function () {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
}

main();