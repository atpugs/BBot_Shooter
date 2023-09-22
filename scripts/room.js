function initializeRoom() {
	room.meshWalls = [];
	room.meshGates = [];
  room.wallTexture = wallTexture;
  room.floorTexture = floorTexture;

	room.meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(room.length, room.breadth, 10, 10),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: USE_WIREFRAME, map: room.floorTexture})
	);
	room.meshFloor.rotation.x -= Math.PI / 2;
	room.meshFloor.castShadow = true;
	room.meshFloor.receiveShadow = true;

	scene.add(room.meshFloor)


	room.meshCeil = new THREE.Mesh(
		new THREE.PlaneGeometry(room.length, room.breadth, 10, 10),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: USE_WIREFRAME, map: room.wallTexture})
	);
	room.meshCeil.rotation.x += Math.PI / 2;
	room.meshCeil.position.y += room.height
	room.meshCeil.castShadow = true;
	room.meshCeil.receiveShadow = true;

	scene.add(room.meshCeil);


	room.meshWalls.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.length * 0.375, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshWalls[0].rotation.y -= Math.PI;
	room.meshWalls[0].position.y += room.height/2.
	room.meshWalls[0].position.x -= room.length * 0.3125
	room.meshWalls[0].position.z += room.breadth/2.

	room.meshWalls.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.length * 0.375, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshWalls[1].rotation.y -= Math.PI;
	room.meshWalls[1].position.y += room.height/2.
	room.meshWalls[1].position.x += room.length * 0.3125
	room.meshWalls[1].position.z += room.breadth/2.

	room.meshWalls.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.length * 0.375, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshWalls[2].position.y += room.height/2.
	room.meshWalls[2].position.z -= room.breadth/2.
	room.meshWalls[2].position.x -= room.length * 0.3125

	room.meshWalls.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.length * 0.375, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshWalls[3].position.y += room.height/2.
	room.meshWalls[3].position.z -= room.breadth/2.
	room.meshWalls[3].position.x += room.length * 0.3125

	room.meshWalls.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.breadth * 0.375, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshWalls[4].rotation.y -= Math.PI / 2;
	room.meshWalls[4].position.x += room.length/2.
	room.meshWalls[4].position.y += room.height/2.
	room.meshWalls[4].position.z += room.breadth * 0.3125

	room.meshWalls.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.breadth * 0.375, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshWalls[5].rotation.y -= Math.PI / 2;
	room.meshWalls[5].position.x += room.length/2.
	room.meshWalls[5].position.y += room.height/2.
	room.meshWalls[5].position.z -= room.breadth * 0.3125

	room.meshWalls.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.breadth * 0.375, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshWalls[6].rotation.y += Math.PI / 2;
	room.meshWalls[6].position.x -= room.length/2.
	room.meshWalls[6].position.y += room.height/2.
	room.meshWalls[6].position.z -= room.breadth * 0.3125

	room.meshWalls.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.breadth * 0.375, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshWalls[7].rotation.y += Math.PI / 2;
	room.meshWalls[7].position.x -= room.length/2.
	room.meshWalls[7].position.y += room.height/2.
	room.meshWalls[7].position.z += room.breadth * 0.3125

	for(var i = 0; i < room.meshWalls.length; i++) {
		room.meshWalls[i].castShadow = true;
		room.meshWalls[i].receiveShadow = true;
		room.meshWalls[i].name = 'wall'

		scene.add(room.meshWalls[i])
		collidableMeshList.push(room.meshWalls[i])
	}


	room.meshGates.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.length * 0.25, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0x90a8e0, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshGates[0].rotation.y -= Math.PI;
	room.meshGates[0].position.y += room.height/2.
	room.meshGates[0].position.z += room.breadth/2.
	room.meshGates[0].name = 'gate0'
	room.gateStates.push('open')

	room.meshGates.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.length * 0.25, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0x90a8e0, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshGates[1].position.y += room.height/2.
	room.meshGates[1].position.z -= room.breadth/2.
	room.meshGates[1].name = 'gate1'
	room.gateStates.push('open')

	room.meshGates.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.breadth * 0.25, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0x90a8e0, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshGates[2].rotation.y -= Math.PI / 2;
	room.meshGates[2].position.x += room.length/2.
	room.meshGates[2].position.y += room.height/2.
	room.meshGates[2].name = 'gate2'
	room.gateStates.push('open')

	room.meshGates.push(new THREE.Mesh(
		new THREE.PlaneGeometry(room.breadth * 0.25, room.height, 10, 10),
		new THREE.MeshPhongMaterial({color: 0x90a8e0, wireframe: USE_WIREFRAME, map: room.wallTexture})
	));
	room.meshGates[3].rotation.y += Math.PI / 2;
	room.meshGates[3].position.x -= room.length/2.
	room.meshGates[3].position.y += room.height/2.
	room.meshGates[3].name = 'gate3'
	room.gateStates.push('open')

	room.gateStates[room.closedGate] = 'closed'
	room.meshGates[room.closedGate].castShadow = true;
	room.meshGates[room.closedGate].receiveShadow = true;
	room.meshGates[room.closedGate].name = 'wall'
	room.meshGates[room.closedGate].material.color = {r: 0.5, g: 0.19, b: 0.14};

	for(var i = 0; i < room.meshGates.length; i++) {
		scene.add(room.meshGates[i])
		collidableMeshList.push(room.meshGates[i]);
	}

}

function closeAllGates() {
	for(var i = 0; i < room.meshGates.length; i++) {
		room.gateStates[i] = 'closed'
		room.meshGates[i].castShadow = true;
		room.meshGates[i].receiveShadow = true;
		room.meshGates[i].name = 'wall'
		room.meshGates[i].material.color = {r: 0.5, g: 0.19, b: 0.14};
	}
}
