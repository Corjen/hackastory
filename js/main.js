
var imageName="img/done.png";      var camera, scene, renderer;

var isUserInteracting = false, onMouseDownMouseX = 0, onMouseDownMouseY = 0, lon = 0, onMouseDownLon = 0, lat = 0, onMouseDownLat = 0, phi = 0, theta = 0;

var projector, mouseVector, container, raycaster, mouse;

var cameraPosition = {};

cameraPosition.x = 500;
cameraPosition.y = 500;
cameraPosition.z = 500;

var tar;

init();
animate();

function init() {


  var mesh;

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  container = document.getElementById('container');

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
  camera.target = new THREE.Vector3(0, 0, 0);

  scene = new THREE.Scene();

  var geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

  /* Transparant cubes
     ========================================================================== */

  // var mat = new THREE.MeshBasicMaterial({transparant : true});
  var mat = new THREE.Material({transparant: true});
  var cube;

  // Theater
  var geo = new THREE.BoxGeometry( 13, 1, 1 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "theater";
  cube.position.x = 8;
  scene.add(cube);

  // Box
  geo = new THREE.BoxGeometry( 3, 2, 4 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "box";
  cube.position.x = 18;
  cube.position.y =-6;
  cube.position.z = -16;
  scene.add(cube);

  // Love letter
  geo = new THREE.BoxGeometry( 40, 1, 40 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "loveletter";
  cube.position.x = -80;
  cube.position.y = -100;
  cube.position.z = 190;
  scene.add(cube);

  // Deportation
  geo = new THREE.BoxGeometry( 440, 100, 40 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "deportation";
  cube.position.x = 350;
  cube.position.y = -100;
  cube.position.z = 320;
  scene.add(cube);

  // Portrait
  geo = new THREE.BoxGeometry( 120, 1, 120 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "portrait";
  cube.position.x = -10;
  cube.position.y = -360;
  cube.position.z = -250;
  scene.add(cube);

  tar = cube;

  // Newspaper
  geo = new THREE.BoxGeometry( 20, 1, 15 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "newspaper";
  cube.position.x = -15;
  cube.position.y = -30;
  cube.position.z = 0;
  scene.add(cube);

  // Tel
  geo = new THREE.BoxGeometry( 30, 120, 30 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "tijl";
  cube.position.x = -200;
  cube.position.y = 40;
  cube.position.z = 200;
  scene.add(cube);

  // Tools
  geo = new THREE.BoxGeometry( 50, 30, 100 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "tools";
  cube.position.x = -200;
  cube.position.y = 10;
  cube.position.z = 0;
  scene.add(cube);

  // Window
  geo = new THREE.BoxGeometry( 50, 100, 1 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "window";
  cube.position.x = -80;
  cube.position.y = 50;
  cube.position.z = -250;
  scene.add(cube);

  // Coat
  geo = new THREE.BoxGeometry( 50, 180, 50 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "coat";
  cube.position.x = -260;
  cube.position.y = 50;
  cube.position.z = -120;
  scene.add(cube);

  // Hooks
  geo = new THREE.BoxGeometry( 50, 30, 200 );
  cube = new THREE.Mesh( geo, mat );
  cube.name = "hooks";
  cube.position.x = -240;
  cube.position.y = 100;
  cube.position.z = 80;
  scene.add(cube);



  var material = new THREE.MeshBasicMaterial({
    map : THREE.ImageUtils.loadTexture(imageName)
  });

  mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);



  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  // document.addEventListener('mousewheel', onDocumentMouseWheel, false);
  // document.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);

  //

  document.addEventListener('dragover', function(event) {

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

  }, false);

  document.addEventListener('dragenter', function(event) {

    document.body.style.opacity = 0.5;

  }, false);

  document.addEventListener('dragleave', function(event) {

    document.body.style.opacity = 1;

  }, false);

  document.addEventListener('drop', function(event) {

    event.preventDefault();

    var reader = new FileReader();
    reader.addEventListener('load', function(event) {

      material.map.image.src = event.target.result;
      material.map.needsUpdate = true;

    }, false);
    reader.readAsDataURL(event.dataTransfer.files[0]);

    document.body.style.opacity = 1;

  }, false);

  //

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseDown(event) {

  event.preventDefault();

  isUserInteracting = true;

  onPointerDownPointerX = event.clientX;
  onPointerDownPointerY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  render();



}

function onDocumentMouseMove(event) {

  if (isUserInteracting === true) {

    lon = (onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
    lat = (event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

  }


}

function onDocumentMouseUp(event) {

  isUserInteracting = false;

}

function onDocumentMouseWheel(event) {

  // WebKit

  if (event.wheelDeltaY) {

    camera.fov -= event.wheelDeltaY * 0.05;

    // Opera / Explorer 9

  } else if (event.wheelDelta) {

    camera.fov -= event.wheelDelta * 0.05;

    // Firefox

  } else if (event.detail) {

    camera.fov += event.detail * 1.0;

  }

  camera.updateProjectionMatrix();

}

function animate() {

  requestAnimationFrame(animate);
  update();

}

function logcamera(){
  console.log(camera);
}

function update() {


  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);

    camera.target.x = cameraPosition.x * Math.sin(phi) * Math.cos(theta);
    camera.target.y = cameraPosition.y * Math.cos(phi);
    camera.target.z = cameraPosition.z * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(camera.target);




  /*
   // distortion
   camera.position.copy( camera.target ).negate();
   */

  renderer.render(scene, camera);

}


function render() {

  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera( mouse, camera );

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects( scene.children );


  renderer.render( scene, camera );
  // console.log(intersects)

  var name = intersects[0].object.name;
  console.log(name);
  if(name.length){
    fireEvent(name);
  }
}

var events = [];
events.push({name : 'newspaper', event : 'openOverlay', id : '#newspaper'});
events.push({name : 'coat', event : 'openOverlay', id : '#coat'});
events.push({name : 'tijl', event : 'openOverlay', id : '#tijl'});
events.push({name : 'tools', event : 'openOverlay', id : '#tools'});
events.push({name : 'deportation', event : 'openOverlay', id : '#deportation'});
events.push({name : 'theater', event : 'openOverlay', id : '#forrest'});
events.push({name : 'loveletter', event : 'openOverlay', id : '#love'});
events.push({name : 'portrait', event : 'openOverlay', id : '#intro'});
events.push({name : 'hooks', event : 'openOverlay', id : '#twelve-puppets'});
events.push({name : 'box', event : 'openOverlay', id : '#credits'});

function fireEvent(name){

  for (var i = events.length - 1; i >= 0; i--) {
    if(events[i].name === name){
      /* Fire event */
      if(!overlayOpen) {
        window[events[i].event](events[i].id);
      }
    }
  }

}

function openOverlay(id){
  overlay.open(id);
}



window.addEventListener( 'mousemove', onDocumentMouseMove, false );

// window.requestAnimationFrame(render);


$('#icons').load('img/icons.svg');

var overlayOpen = false;
var overlay = {};
overlay.overlayContainer = $('.overlay');

// Open
overlay.open = function(id){


  this.overlayContainer.fadeIn(500);
  var target = $(id);

  overlayOpen = true;

  $('.modal').hide();

  if(target !== undefined) {
    overlay.overlayContainer.fadeIn(500);
    target.fadeIn();

    var video = target.children('video');

    if(video.length){
      video[0].play();
    }

  }

};

// Close
overlay.close = function(){
  overlay.overlayContainer.fadeOut(500);

  overlayOpen = false;

  $('.modal').fadeOut();

  $('video')[0].pause();
};


$('.js-close-overlay').click(overlay.close);

$(window).keypress(function(event){

  if(event.which === 27) {
    overlay.close();
  }
});

overlay.overlayContainer.click(function(event){
  if(event.target === this) {
    overlay.close();
  }
});


$('.js-switch-view').click(function(){
    // Switch camera position
    cameraPosition.x = -110;
    cameraPosition.y = 35;
    cameraPosition.z = -300;
});


overlay.open('#intro');