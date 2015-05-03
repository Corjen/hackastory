var container, stats;

var camera, scene, renderer, objects;
var particleLight;
var dae;
var raycaster, mouse;

/* Load DAE model from file */
// var loader = new THREE.ColladaLoader();
// loader.options.convertUpAxis = true;
// loader.load( 'dae/house2.dae', function ( collada ) {

//   dae = collada.scene;

//   dae.traverse( function ( child ) {

//     if ( child instanceof THREE.SkinnedMesh ) {

//       var animation = new THREE.Animation( child, child.geometry.animation );
//       animation.play();

//     }

//   } );

//   dae.scale.x = dae.scale.y = dae.scale.z = 1;
//   dae.updateMatrix();

//   init();
//   animate();

// });

/* Init */
function init() {

  // Raycaster
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 2000 );
  // camera.position.set( 2, .5, 3.5 );
  camera.position.z = 10;
  camera.position.x = 6;
  camera.position.y = 10;

  scene = new THREE.Scene();

  // Add the COLLADA
  scene.add( dae );

  particleLight = new THREE.Mesh( new THREE.SphereGeometry( 4, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
  scene.add( particleLight );

  // Lights
  var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee );
  directionalLight.position.x = Math.random() - 0.5;
  directionalLight.position.y = Math.random() - 0.5;
  directionalLight.position.z = Math.random() - 0.5;
  directionalLight.position.normalize();
  scene.add( directionalLight );

  var pointLight = new THREE.PointLight( 0xffffff, 4 );
  particleLight.add( pointLight );

  // Controls
  controls = new THREE.TrackballControls( camera );

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = true;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [ 65, 83, 68 ];

  controls.addEventListener( 'change', render );

  // Render
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  //

  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener('mousedown', onMouseDown, false);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

  requestAnimationFrame( animate );
  controls.update();
  render();

}

function render() {

  renderer.render( scene, camera );

}

function onMouseDown(){
  // Raycaster
    raycaster.setFromCamera( mouse, camera );
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( scene.children );
    console.log(intersects[0].object);
}

