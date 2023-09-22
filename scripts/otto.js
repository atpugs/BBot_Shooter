var ottoObj;
var ottoSpeed = 0.5;

function createOtto() {
	ottoObj = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 5, 5),
    new THREE.MeshPhongMaterial({color: 0xFF851B})
  );

  ottoObj.name = 'otto';
	ottoObj.scale.set(20, 20, 20);
  doors = [
    [room.length/2.0, 0],
    [0, room.breadth/2.0],
    [0, -room.breadth/2.0],
    [-room.length/2.0, 0]
  ];
  pos = 0;

  for(i = 0; i < 4; i++) {
	  dist1 = distances(player.obj.x, player.obj.y, doors[i][0], doors[i][1]);
	  dist2 = distances(player.obj.x, player.obj.y, doors[pos][0], doors[pos][1]);

	  if(dist1 > dist2)
		  pos = i;
  }

  position = doors[pos];


  collidableMeshList.push(ottoObj);

	scene.add(ottoObj);
}

//Move turrn towards the player
function turnOtto() {
	ottoPos = ottoObj.position;
	playerPos = player.obj.position;

	ottoObj.rotation.y = Math.atan2(
      (playerPos.x - ottoPos.x),
      (playerPos.z - ottoPos.z)
    );
}

//Move otta towards the player
function moveOtto() {
  distance = ottoSpeed;

	lookAt = objectLookDir(ottoObj);

    ottoObj.position.x -= lookAt.x * distance;
	ottoObj.position.z -= lookAt.z * distance;

}
