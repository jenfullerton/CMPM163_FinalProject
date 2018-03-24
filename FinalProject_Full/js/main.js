// standard global variables
var container, scene, camera, renderer, controls, stats;

// custom global variables
var video, videoImage, videoImageContext, videoTexture;

var draw=new DrawModes();

init();
animate();

// FUNCTIONS 		
function init() 
{
	document.addEventListener( 'keydown', onKeyDown, false );
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);	


	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );
	
	// CONTROLS
	// EVENTS

	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,0,0);
	scene.add(light);
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	// scene.add(skyBox);
	scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
	

	// INITIALIZE OFFSCREEN BUFFER
	init_BufferScene();
	
	//This is a comment!!!
	///////////
	// MOVIE //
	///////////
	
	// Set up Movie and Colored Material Parameters
	videoImage = document.createElement( 'canvas' );
	videoImage.width = 1280;
	videoImage.height = 720;
	var customColor=new THREE.Vector3(0.0,1.0,1.0);
	var textureDimentions = 1024;


	// CREATE MOVIE
	//	set offscreen buffer as texture to render instead of videos
	var movieMaterial = createColoredMaterial(bufferObject.texture,new THREE.Vector2(videoImage.width,videoImage.height),customColor,draw.currentEffect,10.0);

	// the geometry on which the movie will be displayed;
	// 		movie image will be scaled to fit these dimensions.
	var movieGeometry = new THREE.PlaneGeometry( 320, 180, 4, 4 );
	var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
	movieScreen.position.set(0,0,0);
	movieScreen.name="MovieScreen";
	scene.add(movieScreen);
	
	camera.position.set(0,0,300);
	camera.lookAt(movieScreen.position);
				
				
	
}

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	var obj = scene.getObjectByName( "MovieScreen" );
	draw.update(obj);
}

function render() 
{	

	// render and update the buffer scene
	render_BufferScene();
	
	// render the main scene
	renderer.setClearColor(0xcccccc)
	renderer.render( scene, camera );
}

//Use this to rotate terrain????
function onKeyDown(event){
	var obj = scene.getObjectByName( "MovieScreen" );
	if (event.keyCode == '38') {
		//up arrow key
    }
    else if (event.keyCode == '40') {
        // down arrow
    }
    else if (event.keyCode == '37') {
       // left arrow
       draw.previousEffect(obj);
    }
    else if (event.keyCode == '39') {
       // right arrow
       draw.nextEffect(obj);
    }
}