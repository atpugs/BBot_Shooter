//------------------------------------------------------------------------------
// INITIALIZATION
//------------------------------------------------------------------------------

//Light variables
var lightParams = {
  pointColor: 0xffffff,
  pointIntensity: 0.5,
  pointRadius: 150,
  decay: 2,
  ambientColor: 0xffffff,
  ambientIntensity: 0.5,
  shadowNear: 0.1,
  shadowFar: 1000,
  castShadow: true
};
var lightSources = [
  {x: -room.length/2 + 2, y: +room.height/2, z: -90},
  {x: +room.length/2 - 2, y: +room.height/2, z: -90},
  {x: -room.length/2 + 2, y: +room.height/2, z: +90},
  {x: +room.length/2 - 2, y: +room.height/2, z: +90},
  {x: -90, y: +room.height/2, z: -room.breadth/2 + 2},
  {x: +90, y: +room.height/2, z: -room.breadth/2 + 2},
  {x: -90, y: +room.height/2, z: +room.breadth/2 - 2},
  {x: +90, y: +room.height/2, z: +room.breadth/2 - 2}
];

//Initializing lights
function initializeLights() {
  //Placing point lights
	for(i = 0; i < lightSources.length; i++) {
    light = createPointLight(lightParams);
		light.position.set(lightSources[i].x, lightSources[i].y, lightSources[i].z);

    lightBulbGeometry = new THREE.SphereGeometry(5, 32, 32);
    lightBulbMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
    lightBulbMaterial.emissive.setHex(0xffffff);
    lightBulb = new THREE.Mesh(lightBulbGeometry, lightBulbMaterial);
    lightBulb.position.set(lightSources[i].x, lightSources[i].y, lightSources[i].z);

		scene.add(light);
    scene.add(lightBulb);
	}

  //Adding ambient light
	ambientLight = new THREE.AmbientLight(
    lightParams.ambientColor,
    lightParams.ambientIntensity
  )

	scene.add(ambientLight)
}

//------------------------------------------------------------------------------
// UTILS
//------------------------------------------------------------------------------

//Create point light using parameters
function createPointLight(lightParams) {
  light = new THREE.PointLight(
    lightParams.pointColor,
    lightParams.pointIntensity,
    lightParams.pointRadius,
    lightParams.decay
  )
  light.castShadow = lightParams.castShadow;
  light.shadow.camera.near = lightParams.shadowNear;
  light.shadow.camera.far =  lightParams.shadowFar;

  return light
}
