//------------------------------------------------------------------------------
// INITIALIZATION
//------------------------------------------------------------------------------

// Camera variables
var camera;
var topCamera;
var default_camera;
var euler;
var upFactor = 10;

// Initializing camera params
var fov = 80;
var aspect = window.innerWidth/window.innerHeight;
var near = 0.1;
var far = 1000;

// Initializing camera
function initializeCamera() {
  // FPS camera
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 30, -30);
  updateCameraLookAt();
  player.obj.add(camera);

  // Top camera
	topCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	topCamera.position.set(0, 200, -100);
	topCamera.lookAt(new THREE.Vector3(0, 0, -25))
}


//------------------------------------------------------------------------------
//CAMERA CONTROL FUNTIONS
//------------------------------------------------------------------------------

// Move camera with player
function moveCamera() {
  updateDefaultCameraPos(); // Updateing default player parameters
}

// Camera Gimbal Rotation
function rotateCamera() {
  updateCameraLookAt();
  updateDefaultCameraPos(); // Updateing default player parameters
}

// Camera zoom
function cameraZoom(factor) {
	camera.zoom = factor;
  upfactor = -100;
	camera.updateProjectionMatrix();
}

// Camera unzoom
function cameraUnzoom(factor) {
	camera.zoom = 1;
  upfactor = 10;
	camera.updateProjectionMatrix();
}


//------------------------------------------------------------------------------
// UTILS
//------------------------------------------------------------------------------

// Object lookAt vector calcutaor
function objectLookDir(object) {
    vector = new THREE.Vector3(0, 0, -1);
    vector.applyEuler(object.rotation, object.rotation.order);
    return vector;
}

// Update camera lookAt
function updateCameraLookAt() {
  camera.lookAt(
    player.obj.position.x,
    player.obj.position.y + upFactor,
    player.obj.position.z
  );
}

// Update default_camera params
function updateDefaultCameraPos() {
  if(!playerCollided) {
    default_camera_pos = { // Updating camera position
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      rotateX: camera.rotation.x,
      rotateY: camera.rotation.y,
      rotateZ: camera.rotation.z
    };
  }
}
