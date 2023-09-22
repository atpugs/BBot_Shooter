//------------------------------------------------------------------------------
//KEYBOARD AND MOUSE EVENTS
//------------------------------------------------------------------------------

//Key down event
function keyDown(event) {
	if (event.keyCode == 16) //Shift Key
        player.sprint = 1; //Activating Sprint

	if (event.keyCode == 67) //C Key
		topMode = !topMode;

	if (event.keyCode == 192) //~ Key
		THREEx.FullScreen.request();
}

//Key up event
function keyUp(event) {
	if (event.keyCode == 16) //Shift Key
        player.sprint = 0; //Deactivating Sprint
}

//Mouse click event
function mouseClick(event) {
	if(event.button == 0) {
    lookAt = objectLookDir(player.obj);
		fireBullet(player.obj.position, lookAt, -1);
	}
	else if(event.button == 2) {
		player.aim = !player.aim;
		if(player.aim == true)
			cameraZoom(zoomFactor);
		else
			cameraUnzoom();
	}
}


//------------------------------------------------------------------------------
//PLAYER AND CAMERA MOVEMENT
//------------------------------------------------------------------------------

//Player movement
function movePlayer() {
	distance = player.speed + player.speedup * player.sprint;

	lookAt = objectLookDir(player.obj);
	right = new THREE.Vector3(0, 0, -1);
	right.crossVectors(lookAt, new THREE.Vector3(0,1,0))

	if(keyboard[87]) {//W key
		player.obj.position.x -= lookAt.x * distance;
		player.obj.position.z -= lookAt.z * distance;
	}

	if(keyboard[83]){ //S key
		player.obj.position.x += lookAt.x * distance;
		player.obj.position.z += lookAt.z * distance;
	}

	if(keyboard[68]){ //D key
		player.obj.position.x -= right.x * distance;
		player.obj.position.z -= right.z * distance;
	}

	if(keyboard[65]){ //A key
		player.obj.position.x += right.x * distance;
		player.obj.position.z += right.z * distance;
	}

  updateDefaultPlayerPos(); //Updateing default player parameters

  moveCamera(); //Syncing camera with player movement

  turnEnemies(); //Rotating enemies to point at player

  if(ottoObj != undefined)
    turnOtto();

  if(ottoObj != null) {
	turnOtto();
	}
}

//Player rotation
function rotatePlayer(event) {
	valueX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	valueY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

  euler = new THREE.Euler(0, 0, 0, 'YXZ');
  euler.setFromQuaternion(player.obj.quaternion);
	euler.y -= valueX * 0.002;
	if(topMode)
		euler.x = 0;
	else {
		euler.x += valueY * 0.002;
		euler.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, euler.x));
    euler.x = 0;
	}
	player.obj.quaternion.setFromEuler(euler);

	rotateCamera(); //Rotating camera

  updateDefaultPlayerPos(); //Updateing default player parameters
}


//------------------------------------------------------------------------------
//UTILS
//------------------------------------------------------------------------------

//Update default_player params
function updateDefaultPlayerPos() {
  if(!playerCollided) {
      default_player_pos = {
      x: player.obj.position.x,
      y: player.obj.position.y,
      z: player.obj.position.z,
      rotateX: player.obj.rotation.x,
      rotateY: player.obj.rotation.y,
      rotateZ: player.obj.rotation.z
    };
  }
}
