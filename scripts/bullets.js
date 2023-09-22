//------------------------------------------------------------------------------
// INITIALIZATION
//------------------------------------------------------------------------------

// Bullet variables
var bullets = [];
var bulletVelocity = 5;
var bulletLimit = 10;
var bulletMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 8, 8),
  new THREE.MeshPhongMaterial({color: 0xff0000})
);

//------------------------------------------------------------------------------
// BULLET FIRE METHOD
//------------------------------------------------------------------------------

// Fire bullet
function fireBullet(position, lookAt, shooterId) {
	bullet = bulletMesh.clone();
	bullet.name = 'bullet'
  bullet.shooterId = shooterId;
  bullet.scale.set(4, 4, 4);
  bullet.material.emissive.setHex(0xFF0000);

	bullet.position.set(
		position.x,
		position.y,
		position.z
	);

	bullet.velocity = new THREE.Vector3(
		-lookAt.x * bulletVelocity,
		-(lookAt.y - 0.02) * bulletVelocity,
		-lookAt.z * bulletVelocity
   )

	bullets.push(bullet);
	scene.add(bullet);
  playSound(shootAudio, 1);

	collidableMeshList.push(bullet);
  bulletCleanup();

}

// Update bullet trajectory
function updateBullets() {
	for(index = 0; index < bullets.length; index += 1) {
		if(bullets[index] === undefined)
      continue;

		bullets[index].position.add(bullets[index].velocity);
  }
}

//------------------------------------------------------------------------------
// UTILS
//------------------------------------------------------------------------------

// Bullet cleanup
function bulletCleanup() {
  if(bullets.length > bulletLimit) {
    removalBullets = bullets.slice(0, bullets.length - bulletLimit);
    bullets = bullets.slice(bullets.length - bulletLimit, bullets.length);

    for(i = 0; i < removalBullets.length; i++)
      scene.remove(removalBullets[i]);
  }
}

function getBulletCollisions() {
	for(i = 0; i < bullets.length; i++) {
		bulletCollisions = checkForCollisions(bullets[i]);

		for(j = 0; j < bulletCollisions.length; j++) {
      colObj = bulletCollisions[j];
      colObjName = bulletCollisions[j].name;
      colBullet = bullets[i];

      if(colObjName == 'bullet')
        continue;
      else if(colObj.hasOwnProperty('shooterId')) {
        if(colBullet.shooterId == colObj.shooterId)
          continue;
      }

			if(colObjName == 'enemy') {
        if(colBullet.shooterId != colObj.shooterId) {
        	scene.remove(colBullet);
        	scene.remove(colObj);
  				delete collidableMeshList[collidableMeshList.indexOf(colBullet)];
  				delete collidableMeshList[collidableMeshList.indexOf(colObj)];
  				delete enemies[enemies.indexOf(colObj)];
  				delete bullets[i];

				bullets = cleanArray(bullets);
				collidableMeshList = cleanArray(collidableMeshList);
          enemies = cleanArray(enemies);
        }
        break;
			}

			if(colObjName == 'player') {
        if(colBullet.shooterId != colObj.shooterId) {
        	scene.remove(colBullet);
        	scene.remove(colObj);
  				delete collidableMeshList[collidableMeshList.indexOf(colBullet)];
  				delete collidableMeshList[collidableMeshList.indexOf(colObj)];
  				delete player.obj;
  				delete bullets[i];
          //GAME OVER CODE HERE
          pause = true;
          $("#pauseScreen").hide();
          $("#overScreen").show();


			bullets = cleanArray(bullets);
          collidableMeshList = cleanArray(collidableMeshList);
        }
        break;
			}

			else if(colObjName == 'wall' || colObjName == 'obstacle' || colObjName.includes('gate')) {
				scene.remove(colBullet);
				delete bullets[i];

				bullets = cleanArray(bullets);
        break;
      }

		}
	}

}
