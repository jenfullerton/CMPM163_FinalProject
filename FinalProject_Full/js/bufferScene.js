/* offscreen buffer scene util */

// *** BUFFER VARIABLES *** //
var bufferObject = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight); //this command creates an off-screen buffer, or frame buffer object (FBO)
var bufferScene = new THREE.Scene();
var bufferCamera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
var bufferMesh1, bufferMesh2;
var bufferMaterial;

// *** BUFFER FUNCTIONS *** //

// init() - initializes the scene with geometry and links shaders
// called by init
function init_BufferScene() {

	console.log("init_BufferScene");

	// var vs = jfCircVert;
	// var fs = jfCircFrag;

	// container = document.getElementById( 'container' );

	// --- SOME DEFAULT GEOMETRY --- //
	// --- the only thing that really matters is that the
	//		shaders are linked up properly --- //
	var bufferGeometry1 = new THREE.SphereGeometry( 1, 64, 64 );
	var bufferGeometry2 = new THREE.BoxGeometry( 1, 1, 1 );

	var geo_uniforms = {};

	bufferMaterial = new THREE.RawShaderMaterial({
		uniforms: 		geo_uniforms,
		vertexShader:	jfCircVert,
		fragmentShader:	jfCircFrag
	});

	bufferMesh1 = new THREE.Mesh( bufferGeometry1, bufferMaterial );
	bufferMesh1.translateX(1.0);
	bufferMesh1.translateY(-3.14/2.0);
	bufferScene.add( bufferMesh1 );

	bufferMesh2 = new THREE.Mesh( bufferGeometry2, bufferMaterial );
	bufferMesh2.translateX(0.0);
	bufferScene.add( bufferMesh2 );

	bufferCamera.position.z = 7;

}

// animate_BufferScene()
// called by render_BufferScene()
// ****************************************************//
//		put animations here?
// ****************************************************//
function update_BufferScene() {

	var time = performance.now();

	//rotate the geometry in the scene that is rendered to the texture
	bufferMesh1.position.x += (Math.cos(time * 0.0005)/20.0);
	bufferMesh1.position.y += (Math.sin(time * 0.0005)/20.0);

	//rotate the geometry in the scene that is rendered to the texture
	bufferMesh2.rotation.x = time * 0.00005;
	bufferMesh2.rotation.y = time * 0.0005;

}

// called by render
function render_BufferScene() {

	//render onto our off-screen texture (our FBO)
	renderer.setClearColor( 0x333333 );
	renderer.render(bufferScene,bufferCamera,bufferObject);

	// update animations for this buffer scene
	update_BufferScene();
}