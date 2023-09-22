function renderMap(idx) {

	if(idx == maps.length - 1) {
		closeAllGates();
	}

	map = positionPlayer(maps[idx]);
	map = positionEnemies(map, level);
	renderWorld(map);
}

function renderWorld(map) {

	var row = 0, col = 0;
  shooterId = 0;

	for(var i = -room.length/2; i < room.length/2; i += room.length/map[0].length) {
		for(var j = -room.breadth/2; j < room.breadth/2; j += room.breadth/map.length) {

			if(map[row][col] == "1") {
				createCrate(map, i + room.length/(map[0].length * 2), room.height/2, j + room.breadth/(map.length * 2));
			}
			else if(map[row][col] == "2") {
				createEnemy(i + room.length/(map[0].length * 2), 0, j + room.breadth/(map.length * 2), shooterId);
        shooterId += 1;
			}
			else if(map[row][col] == "3") {
				player.obj.position.set(i + room.length/(map[0].length * 2), player.obj.position.y, j + room.breadth/(map.length * 2));
			}

			col++;

		}
		row++;
		if(row >= map.length) {
			break;
		}
		col = 0;
	}

}

function createCrate(map, x, y, z) {
	crate = new THREE.Mesh(
		new THREE.BoxGeometry((room.length * 1.0)/map[0].length, room.height, (room.breadth * 1.0)/map.length),
		new THREE.MeshPhongMaterial({color: 0x701515, wireframe: USE_WIREFRAME, map: roughWallTexture})
	);
	crate.receiveShadow = true;
	crate.castShadow = true;
	crate.position.set(x, y, z);

	crate.name = 'obstacle'

	scene.add(crate);
	collidableMeshList.push(crate)
}
