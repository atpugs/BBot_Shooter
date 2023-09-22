//------------------------------------------------------------------------------
// INITIALIZATION
//------------------------------------------------------------------------------

// Player variable
var player = {
  height: 5,
  speed: 0.2,
  turnSpeed: Math.PI*0.02,
  speedup: 1,
  sprint: 0,
  aim: false,
  obj: undefined,
  canShoot: 0
};
var playerComponents = {
  "roller": null,
  "leye": null,
  "reye": null,
  "shield": null,
  "shooter": null,
  "head": null
};
var playerTemplate = {
  "roller": 0x001f3f,
  "leye": 0xFFFFFF,
  "reye": 0xFFFFFF,
  "shield": 0xFF4136,
  "shooter": 0xFFFFFF,
  "head": 0x222222
};

// Initializing player
function initializePlayer() {
  player.obj = entityModel.clone();

  player.obj.name = 'player';
  player.obj.shooterId = -1;
  player.obj.scale.set(0.75, 0.75, 0.75);

  player.obj.traverse(function(child) {
    if(child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  addPlayerTexture(player.obj);
  mapPlayerComponents(player.obj);
  playerComponents["roller"].material.map = botTexture;
  console.log(playerComponents["roller"]);

  scene.add(player.obj);
  collidableMeshList.push(player.obj);
}

//------------------------------------------------------------------------------
// UTILS
//------------------------------------------------------------------------------

// Add player color template to objects
function addPlayerTexture(object) {
  // Traversing through each component
  object.traverse(function(child) {
		if(child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
			child.material = child.material.clone();
      child.material.color.setHex(playerTemplate[child.name]);
		}
	});
}

// Map player model components to playerComponent object
function mapPlayerComponents(object) {
  object.traverse(function(child) {
    if(child instanceof THREE.Mesh)
      playerComponents[child.name] = child;
  })
}

// Position player based on gate entry
function positionPlayer(map) {
	if(room.closedGate == 0)
		map[map.length/2][map[0].length - 2] = "3";
	else if(room.closedGate == 1)
		map[map.length/2][1] = "3";
	else if(room.closedGate == 2)
		map[map.length - 2][map[0].length/2] = "3";
	else
		map[1][map[0].length/2] = "3";

	return map;
}

function getPlayerCollisions() {
	playerCollisions = checkForCollisions(player.obj);

	for(i = 0; i < playerCollisions.length; i++) {
		if(playerCollisions[i].name.includes('gate')) {
			room.change = 1;
			if(playerCollisions[i].name.charAt(4) == '0')
				room.closedGate = 1;
			else if(playerCollisions[i].name.charAt(4) == '1')
				room.closedGate = 0;
			else if(playerCollisions[i].name.charAt(4) == '2')
				room.closedGate = 3;
			else
				room.closedGate = 2;
			break;
    }
    if(playerCollisions[i].shooterId != -1) {
		playerCollided = true;
		  console.log('YOU LOSE! Credits: ', playerCollisions[i].name);
    }
	}
}
