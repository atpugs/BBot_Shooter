//------------------------------------------------------------------------------
//INITIALIZATION
//------------------------------------------------------------------------------

//Enemy variables
var enemies = [];
var enemyProperties = [];
var enemySpeed = 0.0002;
var enemyTemplate = {
  "roller": 0x222222,
  "leye": 0xFF4136,
  "reye": 0xFF4136,
  "shield": 0xFF851B,
  "shooter": 0xFFFFFF,
  "head": 0xCCCCCC
};
var enemyComponentTemplate = {
  "roller": null,
  "leye": null,
  "reye": null,
  "shield": null,
  "shooter": null,
  "head": null
};

//Create enemy
function createEnemy(x, y, z, shooterId) {
  object = entityModel.clone();

  object.name = 'enemy';
  object.shooterId = shooterId;
	object.position.x = x;
	object.position.y = y;
	object.position.z = z;
	object.scale.set(0.75, 0.75, 0.75);
  object.alive = true;

  enemyComponents = deepCopy(enemyComponentTemplate);

  default_enemy_pos = {
    x: object.position.x,
    y: object.position.y,
    z: object.position.z,
    rotateX: object.rotation.x,
    rotateY: object.rotation.y,
    rotateZ: object.rotation.z
  };

  addEnemyTexture(object); //Add enemy color template to enemy

	enemies.push(object);
  collidableMeshList.push(object);

	scene.add(object);
}


//------------------------------------------------------------------------------
//ENEMY CONTROLS
//------------------------------------------------------------------------------

//Turn enemies towards the player
function turnEnemies() {
	for(i = 0; i < enemies.length; i++) {
		enemy = enemies[i];

		enemyPos = enemy.position;
		playerPos = player.obj.position;

		enemy.rotation.y = Math.atan2(
      (playerPos.x - enemyPos.x),
      (playerPos.z - enemyPos.z)
    );
	}
}

//Move enemies towards the player
function moveEnemies() {
  distance = enemySpeed;
  toBeDeleted = [];

  for(i = 0; i < enemies.length; i++) {

    enemy = enemies[i];

    lookAt = objectLookDir(enemy);

    default_enemyPos = {x: enemy.position.x, y: enemy.position.y, z: enemy.position.z};

    enemy.position.x -= lookAt.x * distance;
	enemy.position.z -= lookAt.z * distance;

	action = getEnemyCollisions(enemy);

	if(action == 'halt') {
		enemy.position.x = default_enemyPos.x;
		enemy.position.z = default_enemyPos.z;
	}
	else if(action == 'kill') {
		toBeDeleted.push(enemy);
	}

  }

  for(i = 0; i < toBeDeleted.length; i++) {
	  delete enemies[enemies.indexOf(toBeDeleted[i])];

	  enemies = cleanArray(enemies);
  }
}

//Make enemies shoot
function enemyShoot() {
  if(enemies.length > 0) {
    idx = parseInt(randomRange(0, enemies.length));
    enemy = enemies[idx];

    lookAt = objectLookDir(enemy);

    fireBullet(enemy.position, lookAt, enemy.shooterId);
  }
}


//------------------------------------------------------------------------------
//UTILS
//------------------------------------------------------------------------------

//Add enemy color template to objects
function addEnemyTexture(object) {
  //Traversing through each component
  object.traverse(function(child) {
		if(child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
			child.material = child.material.clone();
      child.material.color.setHex(enemyTemplate[child.name]);
		}
	});
}

// Place enemies randomly on the map
function positionEnemies(map) {
  enemies = [];
  playerPos = {x: 0, y: 0};

  // Finding player position
  for(i = 0; i < map[0].length; i++) {
    for(j = 0; j < map.length; j++) {
      if(map[i][j] == "3") {
      	playerPos.x = i;
      	playerPos.y = j;
      }
    }
  }

  // Placing enemies randomly
	for(i = 0; i < Math.min(enemyCount, 50); i++) {
    do {
  		x = Math.floor(Math.random() * map[0].length);
  		y = Math.floor(Math.random() * map.length);
    } while(distances(x, y, playerPos.x, playerPos.y) <= 3);

		map[x][y] = "2";
	}

	return map;
}

function getEnemyCollisions(enemy) {

	enemyCollisions = checkForCollisions(enemy);

	for(j = 0; j < enemyCollisions.length; j++) {
		if(enemyCollisions[j].name.includes('gate') || enemyCollisions[j].name == 'wall' || enemyCollisions[j].name == 'obstacle') {
        	scene.remove(enemy);
  			delete collidableMeshList[collidableMeshList.indexOf(enemy)];

  			collidableMeshList = cleanArray(collidableMeshList);

			return 'kill';
		}
		if(enemyCollisions[j].name == 'enemy')
			return 'halt';
	}

}
