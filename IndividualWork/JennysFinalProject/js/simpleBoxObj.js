// Jennifer Fullerton, jfullert
// createBox.js

// general lighting variables
/*
var lights = {
	ambient: new THREE.Vector3(0.1,0.1,0.1),
	light1_pos: new THREE.Vector3(0.0,10.0,2.0),
	light1_diffuse: new THREE.Vector3(1.0,0.0,0.0),
	light1_specular: new THREE.Vector3(1.0,1.0,1.0)
};
*/



// createBox
// creates a simple Box
function createBox(size) {

	// Geometry:
	var cube = new THREE.BoxGeometry(size,size,size);

	// Shader Uniforms:
	var shaderInput = { };

	// Material:
	var material = new THREE.RawShaderMaterial({
		uniforms:		shaderInput,
		vertexShader:	jfCircVert,		//, jfBasicVert
		fragmentShader:	jfCircFrag			//jfBasicFrag
	});

	// Mesh: actual object
	var mesh = new THREE.Mesh(cube, material);

	// *** METHODS *** //

	// Start() - initialize things
	mesh.Start = function() {
		mesh.position.x = -0.5;
		mesh.position.y = 0.5;
	}

	// Update() - change/animate over time
	mesh.Update = function(){
		
		mesh.rotation.x += 0.001;
		mesh.rotation.y += 0.001;

		// var time = performance.now();
		// adjust light positions
		// var lightPosAdjust = Math.sin(time*0.005)*5;
		// light1_pos = 0.0, 10.0, 0.0

		// update uniforms
		/*
		var uni = mesh.material.uniforms;

		uni.light1_pos.value 		= lights.light1_pos;
		uni.light1_diffuse.value	= lights.light1_diffuse;
		uni.light1_specular.value	= lights.light1_specular;
		uni.ambient.value			= lights.ambient;
		*/
		
	}

	return mesh;
}