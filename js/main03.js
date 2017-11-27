// Set up the scene, camera, and renderer as global variables.
var scene, camera, renderer;
// var shoujoDanceURL = '../models/shoujoDance.dae';

init();
animate();

function init() {
// Make the scene
  scene = new THREE.Scene();
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

// Make renderer
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);

//Make camera
  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
  camera.position.set(50,150,100);
  scene.add(camera);

// Create an event listener that resizes the renderer with the browser window.
  window.addEventListener('resize', function() {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  });

  // Set the background color of the scene.
  //renderer.setClearColor('b7e3ff', 1);

  // Create a light, set its position, and add it to the scene.
  var light = new THREE.PointLight(0xffffff);
  light.position.set(-100,200,100);
  scene.add(light);

  // Load in the mesh and add it to the scene.

  var geometry = new THREE.PlaneBufferGeometry(20000, 20000);
  var material = new THREE.MeshPhongMaterial({shininess: 0.1});
  var ground = new THREE.Mesh(geometry, material);

  ground.position.set(0, -250, 0);
  ground.rotation.x = -Math.PI / 2;

  scene.add(ground);

  var loader = new THREE.ColladaLoader();
  loader.options.convertUpAxis = true;
  loader.load('../models/shoujoDancing3jsproj.dae', function(collada){
    var dae = collada.scene;
    var skin = collada.skins[0];

    dae.position.set(0, 0, 0);
    dae.scale.set(1.5, 1.5, 1.5);

    scene.add(dae);
    // var axes = new THREE.AxisHelper(50);
    // axes.position = dae.position;
    // scene.add(axes);
    // var gridXZ = new THREE.GridHelper(100, 10);
    // gridXZ.setColors( new THREE.Color(0x8f8f8f), new THREE.Color(0x8f8f8f) );
    // gridXZ.position.set(0,0,0 );
    // scene.add(gridXZ);



  });



  // Add OrbitControls so that we can pan around with the mouse.
  controls = new THREE.OrbitControls(camera, renderer.domElement);

}


// Renders the scene and updates the render
function animate() {
  // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
