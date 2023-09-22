//------------------------------------------------------------------------------
//INITIALIZATION
//------------------------------------------------------------------------------

//Stats initialization
var stats = new Stats();
stats.showPanel(0);
$("#statBox").append(stats.dom);

//WebGL variables
var scene;
var renderer;
var USE_WIREFRAME = false;
var aspect = window.innerWidth/window.innerHeight;
var pause = true;

//Audio variables
var listener;
var sound;

//Control variables
var topMode = true;
var keyboard = [];
var zoomFactor = 2;

//Entity variables
var room = {
  length: 300,
  breadth: 300,
  height: 25,
  meshFloor: undefined,
  meshWalls: [],
  meshCeil: undefined,
  meshGates: [],
  gateStates: [],
  closedGate: 2,
  wallTexture: undefined,
  floorTexture: undefined,
  change: 0
};

//Collision list
var collidableMeshList = [];

//Level variables
var level = 8;
var enemyCount = 10;
var shootIntervalMin = 2 * 1000;
var shootIntervalMax = 3 * 1000;
var shootInterval = randomRange(shootIntervalMin, shootIntervalMax);
var ottoAppear = 20 * 1000;
var ottoInterval = 3 * 1000;

//Timer variables
var oldTimer = 0;
var ottoTimer = 0;

function init() {
	scene = new THREE.Scene();

	initializeLights();
	initializePlayer();
	initializeRoom();
  initializeCamera();

  renderMap(level);

  listener = new THREE.AudioListener();
  camera.add(listener);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	document.body.appendChild(renderer.domElement);

	window.addEventListener('click', function() {
		document.body.requestPointerLock();
	});

	document.addEventListener('pointerlockchange', onPointerChange);

	window.addEventListener('resize', onWindowResize);

  animate();
}

function animate(timer) {
  requestAnimationFrame(animate);

  stats.begin();

  if(!pause) {

  	if(room.change == 1) {
  		room.change = 0;
  		collidableMeshList = [];
  		level++;

  		scene = new THREE.Scene();

  		initializeLights();

  		initializePlayer();

  		initializeRoom();

  		initializeCamera();

  		renderMap(level);

      ottoTimer = timer;
      ottoObj = undefined;
  	}

  	updateBullets();

		movePlayer();
    moveEnemies();
    if(ottoObj != undefined)
      moveOtto();

    if(ottoTimer == 0)
      ottoTimer = timer;

    if(!oldTimer || timer - oldTimer >= shootInterval) {
      oldTimer = timer;
      enemyShoot();
      shootInterval = randomRange(shootIntervalMin, shootIntervalMax);
    }

    if(timer - ottoTimer >= ottoInterval && ottoObj == undefined) {
      console.log(timer);
      console.log(ottoTimer);
      createOtto();
    }

  	getPlayerCollisions();

  	getBulletCollisions();

  }

	if(topMode)
		renderer.render(scene, topCamera);
	else
		renderer.render(scene, camera);

  stats.end();

}

function onKeyDown(event) {
	keyboard[event.keyCode] = true;
	keyDown(event);
}

function onKeyUp(event) {
	keyboard[event.keyCode] = false;
	keyUp(event);
}

function onMouseMove(event) {
	rotatePlayer(event);
}

function onMouseClick(event) {
	mouseClick(event);
}

function onWindowResize() {
	camera.aspect = aspect;
	camera.updateProjectionMatrix();

	topCamera.aspect = aspect;
	topCamera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerChange() {

	if(document.pointerLockElement === document.body) {
    pause = false;
    $("#pauseScreen").hide();
    $("#statBox").show();
		window.addEventListener('keyup', onKeyUp);
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mousedown', onMouseClick);
	}
	else {
    pause = true;
    $("#pauseScreen").show();
    $("#statBox").hide();
		window.removeEventListener('keyup', onKeyUp);
		window.removeEventListener('keydown', onKeyDown);
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mousedown', onMouseClick);
	}
}

//------------------------------------------------------------------------------
//UTILS
//------------------------------------------------------------------------------

function playSound(buffer, volume) {
  sound = new THREE.Audio(listener);
  sound.setBuffer(buffer);
  sound.setVolume(0.001);
  sound.play();
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function deepCopy(obj) {
  obj_copy = JSON.parse(JSON.stringify(obj));
  return obj_copy;
}

function distances(x1, y1, x2, y2) {
	dist = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	return dist;
}

function cleanArray(ar) {
  cleanedAr = [];
  for(i = 0; i < ar.length; i++) {
    if(ar[i] != null || ar[i] != undefined)
      cleanedAr.push(ar[i]);
  }
  return cleanedAr;
}
