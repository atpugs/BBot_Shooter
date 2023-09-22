//------------------------------------------------------------------------------
// INITIALIZATION
//------------------------------------------------------------------------------

// Initializing loaders
var manager = new THREE.LoadingManager();

var gltfLoader = new THREE.GLTFLoader(manager);
var textureLoader = new THREE.TextureLoader(manager);
var fileLoader = new THREE.FileLoader(manager);
var audioLoader = new THREE.AudioLoader(manager);

THREE.Cache.enabled = true;

manager.onProgress = function(item, loaded, total) {
  $("#pauseScreen").hide();
  $("#statBox").hide();
  $("#overScreen").hide();
  $("#progress").css("width", (loaded/total * 100) + '%');
}

manager.onLoad = function() {
  $("#loadingScreen").hide();
  $("#pauseScreen").show();
  $("#overScreen").hide();
  init();
  console.log(player.obj.position);
  console.log(playerComponents["roller"].geometry);
}

//------------------------------------------------------------------------------
// LOAD FUNCTIONS
//------------------------------------------------------------------------------

//Load texture
function loadTexture(file, repeatX, repeatY) {
	texture = textureLoader.load(file, function(texture) {
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(repeatX, repeatY);
	});

	return texture;
}

//Load maps to "maps" array
function mapLoader(mapPath, mapCount) {
  for(i = 1; i < mapCount; i++) {
    mapFile = mapPath + 'area' + i + '.map';
    fileLoader.load(mapFile, function(mapData) {
      map = parseMap(mapData);
      maps.push(map);
    });
  }
}

//------------------------------------------------------------------------------
// ASSETS
//------------------------------------------------------------------------------

var entityModel;
var entityPath = 'models/bot.gltf';

var maps = [];
var mapPath = 'maps/';
var mapCount = 11;

gltfLoader.load(entityPath, function(object) {
  entityModel = object.scene;
});

mapLoader(mapPath, mapCount);

var texturePath = 'textures/';
var wallTexture = loadTexture(texturePath + '/wall.jpg', 20, 20);
var floorTexture = loadTexture(texturePath + '/floor.jpg', 20, 20);
var crateTexture = loadTexture(texturePath + '/crate.jpg', 1, 1);
var botTexture = loadTexture(texturePath + 'bot.jpg', 1, 1);
var roughWallTexture = loadTexture(texturePath + '/roughwall.jpg', 1, 1);

var audioPath = "sounds/";
var shootAudio;

audioLoader.load(audioPath + 'shoot.wav', function(buffer){
  shootAudio = buffer;
});

//------------------------------------------------------------------------------
// UTILS
//------------------------------------------------------------------------------

//Parse raw map data
function parseMap(mapData) {
	map = [];
	rows = mapData.split("\n");
  for(i = 0; i < rows.length; i++) {
    row = rows[i].split(" ");
    map.push(row);
  }

	return map;
}
