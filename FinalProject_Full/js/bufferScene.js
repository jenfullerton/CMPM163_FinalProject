/* offscreen buffer scene util */

// *** BUFFER OBJECT VARIABLES *** //

//this command creates an off-screen buffer, or frame buffer object (FBO)
// NOTE: change aspect ratio maybe
var bufferObject = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight);
var bufferScene = new THREE.Scene();
var bufferCamera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
var bufferMaterial;

// *** ANIMATION VARIABLES *** //
var clock, controls, listener;
            
var character;
var light;
var textureLoader = new THREE.TextureLoader();
var loader = new THREE.JSONLoader();
var isLoaded = false;
var action = {};
var mixer = new THREE.AnimationMixer();	// will throw useless error otherwise
var activeActionName = "flip";
            
var arrAnimations = [
    'flip',
    'punch',
    'wave',
];
            
var actualAnimation = 0;

// *** BUFFER FUNCTIONS *** //s

// init() - initializes the scene with geometry and links shaders
// called by init in main
function init_BufferScene() {

	clock = new THREE.Clock();
	controls = new THREE.OrbitControls(bufferCamera, renderer.domElement);
	// distable key controls
	controls.keys = {};

    controls.target = new THREE.Vector3(0, 4.5, 0);

	loader.load('models/fredrick3.json', function(geometry, materials){
        materials.forEach(function(material){
            material.skinning = true;
        });

        // Shader Uniforms:
		var shaderInput = { };

		// Material:
		var basicMaterial = new THREE.RawShaderMaterial({
			uniforms:		shaderInput,
			vertexShader:	jfCircVert,		//, jfBasicVert
			fragmentShader:	jfCircFrag			//jfBasicFrag
		});

		// Lisa you were super right and god bless
        character = new THREE.SkinnedMesh(
            geometry, basicMaterial
        );
            
        mixer = new THREE.AnimationMixer(character);
            
        action.flip = mixer.clipAction(geometry.animations[0]);
        action.punch = mixer.clipAction(geometry.animations[2]);
        action.wave = mixer.clipAction(geometry.animations[3]);
        
        action.wave.setEffectiveWeight(1);
        action.flip.setEffectiveWeight(1);
        action.punch.setEffectiveWeight(1);
    
        action.wave.reset();
        action.flip.reset();
        //action.punch.reset();
            
        
        action.wave.setLoop(THREE.LoopRepeat, 100);
        action.wave.clampWhenFinished = true;

        action.wave.enabled = true;
        action.flip.enabled = true;
        action.punch.enabled = true;
        
        bufferScene.add(character);
        
        window.addEventListener('resize', onWindowResize, false);
        window.addEventListener('click', onDoubleClick, false);
        console.log('Double click to change animation');
        animate();
            
        isLoaded = true;
        
        action.wave.play();
        console.log("isrunning " + action.wave.isRunning());
        console.log("action[flip] " + action["wave"]);
        
            
        mixer.addEventListener('loop', function(e){
            console.log("looped");
        });
        mixer.addEventListener('finished', function(e){
            console.log("finished");
    	});
        
    });	// end load character


	bufferCamera.position.y = 7;
	bufferCamera.position.z = 7;

}

// ****************************************************//
//	ANIMATION FUNCTIONS
// ****************************************************//

function fadeAction (name) {
	//THIS IS WHERE THE PROBLEM IS. ACTIVEACTIONNAME IS WAVECYCLE, BUT ACTION[WAVECYCLE] IS UNDEFINED
	console.log("activeActionName " + activeActionName);
	var from = action[ activeActionName ].play();
	console.log("from " + from);

	console.log("name " + name);
	var to = action[ name ].play();

	from.enabled = true;
	to.enabled = true;

	if (to.loop === THREE.LoopOnce) {
	to.reset();
	}

	from.crossFadeTo(to, 0.3);
	activeActionName = name;
}

// resize window
function onWindowResize () {
  bufferCamera.aspect = window.innerWidth / window.innerHeight;
  bufferCamera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// change animation on double-click
var mylatesttap;
function onDoubleClick () {
	var now = new Date().getTime();
	var timesince = now - mylatesttap;
	if ((timesince < 600) && (timesince > 0)) {
		if (actualAnimation == arrAnimations.length - 1) {
		  actualAnimation = 0;
		} else {
		  actualAnimation++;
		}
		fadeAction(arrAnimations[actualAnimation]);
		console.log("actualanimation " + arrAnimations[actualAnimation]);

	} else {
		// too much time to be a doubletap
	}

	mylatesttap = new Date().getTime();
}


// ****************************************************//
//	RENDER FUNCTIONS
// ****************************************************//

function update_BufferScene() {
	// update controls
	controls.update();
}

// called by render
function render_BufferScene() {

	var delta = clock.getDelta();
    mixer.update(delta);

	//render onto our off-screen texture (our FBO)
	renderer.setClearColor( 0x333333 );
	renderer.render(bufferScene,bufferCamera,bufferObject);

	// update animations for this buffer scene
	update_BufferScene();
}