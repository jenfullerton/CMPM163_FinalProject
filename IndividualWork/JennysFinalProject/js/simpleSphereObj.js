// Jennifer Fullerton, jfullert
// createSphere.js

// general lighting variables

// createSphere
// creates a simple sphere
function createSphere(size) {

	// Geometry:
	var sphere = new THREE.SphereGeometry(size, 64, 64);

	// Shader Uniforms:
	var shaderInput = { };

	// Material:
	var material = new THREE.RawShaderMaterial({
		uniforms:		shaderInput,
		vertexShader:	jfCircVert,		//, jfBasicVert
		fragmentShader:	jfCircFrag			//jfBasicFrag
	});

	// Mesh: actual object
	var mesh = new THREE.Mesh(sphere, material);

	// *** METHODS *** //

	// Start() - initialize things
	mesh.Start = function() {
		mesh.position.x = 0.5;
		mesh.position.y = -0.5;
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