var playerCollided = false;

function checkForCollisions(object) {
  collisions = []

	objBbox = new THREE.Box3().setFromObject(object);

	objBounds = {
		xMin: objBbox.min.x,
		xMax: objBbox.max.x,
		yMin: objBbox.min.y,
		yMax: objBbox.max.y,
		zMin: objBbox.min.z,
		zMax: objBbox.max.z
  };

	for(index = 0; index < collidableMeshList.length; index ++) {
    bbox = new THREE.Box3().setFromObject(collidableMeshList[index]);
    bounds = {
    	xMin: bbox.min.x,
    	xMax: bbox.max.x,
    	yMin: bbox.min.y,
    	yMax: bbox.max.y,
    	zMin: bbox.min.z,
    	zMax: bbox.max.z,
    };

    if (collisionCondition(objBounds, bounds)) {
      if(collidableMeshList[index] != object)
        collisions.push(collidableMeshList[index]);
     }
   }

   return collisions;
}

function collisionCondition(bounds1, bounds2) {
  return (
    (bounds1.xMin <= bounds2.xMax && bounds1.xMax >= bounds2.xMin) &&
    (bounds1.yMin <= bounds2.yMax && bounds1.yMax >= bounds2.yMin) &&
    (bounds1.zMin <= bounds2.zMax && bounds1.zMax >= bounds2.zMin)
  );
}

function restorePos() {
  player.obj.position.x = default_player_pos.x;
  player.obj.position.y = default_player_pos.y;
  player.obj.position.z = default_player_pos.z;
}
