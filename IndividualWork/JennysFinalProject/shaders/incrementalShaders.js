/*	Jennifer Fullerton
*	jfullert
*	CMPM 163, Final Project
*	incrementalShaders
*/

// *** PHONG SHADERS *** //
// simple phong lighting model
var jfPhongVert = `
	precision mediump float;

	// *** RAW SHADER GEOMETRY AND CAMERA UNIFORMS *** //
	//		i.e., I Don't Understand Anything Apparently
	// camera uniforms
	uniform mat4 modelMatrix;
	uniform mat4 viewMatrix;
	uniform mat4 projectionMatrix;
	// geometry attributes and uniforms
	attribute vec3 position;
	attribute vec3 normal;

	// *** LIGHTING UNIFORMS *** //
	// light uniforms
	uniform vec3 light1_pos;
	// fragment shader variables
	varying vec3 v_pos;
	varying vec3 N, L1, V;

	void main()
	{
		// vertex position in camera coordinates
		vec4 pos = viewMatrix * modelMatrix * vec4(position, 1.0);

		// normalized vertex normal - camera coordinates
		N = vec3( normalize( viewMatrix * modelMatrix * vec4(normal.xyz, 0.0) ).xyz );

		// send position info to frag shader
		v_pos = pos.xyz;

		// convert light coordinates from world to camera
		vec4 L1_cam = viewMatrix * vec4(light1_pos, 1.0);
		// calculate normalized light direction vector
		L1 = vec3(normalize( L1_cam - pos ).xyz);

		// calculate view vector from position
		V = normalize(-v_pos);

		// cool
		gl_Position = projectionMatrix * pos;
	}`;

var jfPhongFrag = `
	precision mediump float;

	// uniforms
	uniform vec3 ambient;
	uniform vec3 light1_diffuse;
	uniform vec3 light1_specular;

	// scalars and powers
	float spec_intensity = 1.0;

	// varyings
	varying vec3 v_pos;
	varying vec3 N, L1, V;

	void main()
	{
		// default light = 0.0
		vec4 outColor1 = vec4(0.0);

		// *** DIFFUSE *** //
		// calculate diffuse for light 1
		// calculate angle between light and vertex normal
		float diff1 = max(0.0, dot(N, L1));
		outColor1 += vec4((diff1 * light1_diffuse) + ambient, 1.0);

		// *** SPECULAR *** //
		// calculate reflection vector
		vec3 R = normalize( reflect(-L1,N) );
		float S = pow( max( dot(R,V),0.0), spec_intensity );

		// add contribution from specular
		outColor1 += vec4( light1_specular * S, 1.0 );

		gl_FragColor = outColor1;
	}`;


// *** EXPERIMENTAL CIRCLES *** //
var jfDotsVert = `
	precision mediump float;

	// *** RAW SHADER GEOMETRY AND CAMERA UNIFORMS *** //
	//		i.e., I Don't Understand Anything Apparently
	// camera uniforms
	uniform mat4 modelMatrix;
	uniform mat4 viewMatrix;
	uniform mat4 projectionMatrix;
	// geometry attributes and uniforms
	attribute vec3 position;
	attribute vec3 normal;

	// *** LIGHTING UNIFORMS *** //
	// light uniforms
	uniform vec3 light1_pos;
	// fragment shader variables
	varying vec3 v_pos;
	varying vec3 N, L1, V;

	void main()
	{
		// vertex position in camera coordinates
		vec4 pos = viewMatrix * modelMatrix * vec4(position, 1.0);

		// normalized vertex normal - camera coordinates
		N = vec3( normalize( viewMatrix * modelMatrix * vec4(normal.xyz, 0.0) ).xyz );

		// send position info to frag shader
		v_pos = pos.xyz;

		// convert light coordinates from world to camera
		vec4 L1_cam = viewMatrix * vec4(light1_pos, 1.0);
		// calculate normalized light direction vector
		L1 = vec3(normalize( L1_cam - pos ).xyz);

		// calculate view vector from position
		V = normalize(-v_pos);

		// this makes it...stretch
		// v_pos = vec3(projectionMatrix * vec4(v_pos, 1.0)).xyz;

		// cool
		gl_Position = projectionMatrix * pos;
	}`;

var jfDotsFrag = `
	precision mediump float;

	// uniforms
	uniform vec3 ambient;
	uniform vec3 light1_diffuse;
	uniform vec3 light1_specular;

	// scalars and powers
	const float spec_intensity = 5.0;
	float radius = 1.0;

	// resolution
	uniform float resX;
	uniform float resY;

	// varyings
	varying vec3 v_pos;
	varying vec3 N, L1, V;

	void main()
	{
		// default light = 0.0
		vec4 outColor1 = vec4(0.0);

		// *** DIFFUSE *** //
		// calculate diffuse for light 1
		// calculate angle between light and vertex normal
		float diff1 = max(0.0, dot(N, L1));
		outColor1 += vec4((diff1 * light1_diffuse) + ambient, 1.0);

		// *** SPECULAR *** //
		// calculate reflection vector
		vec3 R = normalize( reflect(-L1,N) );
		float S = pow( max( dot(R,V),0.0), spec_intensity );

		// add contribution from specular
		// outColor1 += vec4( light1_specular * S, 1.0 );

		// change radius based on specular intensity
		radius *= S;

/*
		// draw a circle around each point of geometry
		float dist = length( v_pos.xy );
		if (dist <= radius){
			outColor1 += vec4(light1_specular*S*0.3, 1.0);
		}
*/

		// if specular is visible
		if( S > 0.0){
			if ( sin(gl_FragCoord.x)*radius > 0.0 && sin(gl_FragCoord.y)*radius > 0.0){
				outColor1 += vec4(S*light1_specular, 1.0);
			}
		}

		/*
		if (S > 0.0){
			// this gives it some very crazy lines
			float cx = cos(gl_FragCoord.x*radius);
			float sy = sin(gl_FragCoord.y*radius);

			if( cx*cx +  sy*sy > radius ){
				outColor1 += vec4( light1_specular * S, 1.0 );
			}
		}
*/


		gl_FragColor = outColor1;
	}`;




// *** BASIC *** //
// -- just makes sure eveerything links correctly
// basic vertex shader for Phong lighting model
var jfBasicVert = `
	precision mediump float;
	// i don't know why now suddenly it doesn't like these but OKAY
	/*	given:
		// camera uniforms
		uniform mat4 modelMatrix;
		uniform mat4 viewMatrix;
		uniform mat4 projectionMatrix;
		// geometry attributes and uniforms
		attribute vec3 position;
		attribute vec3 normal;
	*/

	// fragment shader variables
	varying vec3 v_pos;

	void main()
	{
		vec4 pos = viewMatrix * modelMatrix * vec4(position, 1.0);

		// send position info to frag shader
		v_pos = pos.xyz;

		// cool
		gl_Position = projectionMatrix * pos;
	}`;

// basic fragment shader for Phong lighting model
var jfBasicFrag = `
	precision mediump float;

	// uniforms

	// varyings
	varying vec3 v_pos;

	void main()
	{
		gl_FragColor = vec4(v_pos, 1.0);
	}`;


// *** FUNCTIONING CIRCLES *** //
var jfFuncCircVert = `
	precision mediump float;

	// *** RAW SHADER GEOMETRY AND CAMERA UNIFORMS *** //
	//		i.e., I Don't Understand Anything Apparently
	// camera uniforms
	uniform mat4 modelMatrix;
	uniform mat4 viewMatrix;
	uniform mat4 projectionMatrix;
	// geometry attributes and uniforms
	attribute vec3 position;
	attribute vec3 normal;

	// *** LIGHTING UNIFORMS *** //
	// light uniforms
	uniform vec3 light1_pos;
	// fragment shader variables
	varying vec3 v_pos;
	varying vec3 N, L1, L2, V;

	// second set of lights 
	vec3 light2_pos = vec3 (5.0, 5.0, 5.0);


	void main()
	{
		// vertex position in camera coordinates
		vec4 pos = viewMatrix * modelMatrix * vec4(position, 1.0);

		// normalized vertex normal - camera coordinates
		N = vec3( normalize( viewMatrix * modelMatrix * vec4(normal.xyz, 0.0) ).xyz );

		// send position info to frag shader
		v_pos = pos.xyz;

		// convert light coordinates from world to camera
		// 		LIGHT 1
		vec4 L1_cam = viewMatrix * vec4(light1_pos, 1.0);
		// calculate normalized light direction vector
		L1 = vec3(normalize( L1_cam - pos ).xyz);
		
		//		LIGHT 2
		vec4 L2_cam = viewMatrix * vec4(light2_pos, 1.0);
		L2 = vec3(normalize( L2_cam - pos ).xyz);

		// calculate view vector from position
		V = normalize(-v_pos);

		// this makes it...stretch
		// v_pos = vec3(projectionMatrix * vec4(v_pos, 1.0)).xyz;

		// cool
		gl_Position = projectionMatrix * pos;
	}`;

var jfFuncCircFrag = `
	precision mediump float;

	// uniforms
	uniform vec3 ambient;
	uniform vec3 light1_diffuse;
	uniform vec3 light1_specular;

	// lights 2
	vec3 kd2 = vec3(0.0, 0.0, 0.9);  // dull diffuse
	vec3 ks2 = vec3(0.0, 1.0, 1.0);  // teal specular

	// scalars and powers
	const float spec_intensity = 2.0;
	float radius = 1.0;

	// resolution
	uniform float resX;
	uniform float resY;

	// varyings
	varying vec3 v_pos;
	varying vec3 N, L1, L2, V;

	void main()
	{
		// default light = 0.0
		vec4 outColor1 = vec4(ambient, 1.0);

		// *** DIFFUSE *** //
		// calculate diffuse for light 1
		// calculate angle between light and vertex normal
		float diff1 = max(0.0, dot(N, L1));
		outColor1 += vec4((diff1 * light1_diffuse), 1.0);

		// light 2
		float diff2 = max(0.0, dot(N, L2));
		outColor1 += vec4((diff2 * kd2), 1.0);

		// *** SPECULAR *** //
		// calculate reflection vector
		vec3 R = normalize( reflect(-L1,N) );
		
		float S; // = pow( max( dot(R,V),0.0), spec_intensity );
		float RdotN = dot(R,V);
		// weird specular
		if(RdotN >= 0.0){
			S = pow( max(dot(R,V), 0.0), spec_intensity );
		}
		// weird specular
		else {
			S = pow( max(-dot(R,V), 0.0), spec_intensity );
			S = -S;
		}


		// light 2
		vec3 R2 = normalize( reflect(-L2,N) );
		// set up specular
		float S2; // = pow( max(dot(R2,V), 0.0), spec_intensity );
		float R2dotN = dot(R2, V);

		// normal specular
		if(R2dotN >= 0.0){
			S2 = pow( max(dot(R2,V), 0.0), spec_intensity );
		}
		// weird specular
		else {
			S2 = pow( max(-dot(R2,V), 0.0), spec_intensity );
			S2 = -S2;
		}

		// add contribution from specular
		// outColor1 += vec4( ks2 * S2, 1.0 );

		// change radius based on specular intensity
		float rad1 = radius * S;
		float rad2 = radius * S2;


		/* this would look good if i could figure out WHERE
		 the point is
		// draw a circle around something
		float dist = length( v_pos.xy );
		if (dist <= radius){
			outColor1 += vec4(light1_specular*S*0.3, 1.0);
		}
		*/


		// MAKE THEM 'CIRCLES'
		float cx, sy;


		// normal specular
		// light 1
		if ( S > 0.0 ){
			cx = cos(gl_FragCoord.x)*rad1;
			sy = sin(gl_FragCoord.y)*rad1;

			// smaller threshold = less visible
			// relate to spec intensity?

			if( cx*cx + sy*sy >= rad1 ){
				outColor1 += vec4( light1_specular * S, 1.0 );
			}
		}

		// light 1 - "negative" specular
		if (S < 0.0){
			rad1 = -rad1;	// make it a positive number
			rad1 /= 1.3;	// limit range of radius

			cx = cos(gl_FragCoord.x)*rad1;
			sy = sin(gl_FragCoord.y)*rad1;

			if( cx*cx +  sy*sy >= rad1 ){
				outColor1 += vec4( light1_specular * S, 1.0 );
			}
		}

		// light 2
		if (S2 > 0.0){
			cx = cos(gl_FragCoord.x)*rad2;
			sy = sin(gl_FragCoord.y)*rad2;

			// smaller threshold = less visible
			// relate to spec intensity?

			if( cx*cx +  sy*sy >= rad2 ){
				outColor1 += vec4( ks2 * S2, 1.0 );
			}
		} 

		// "negative" specular
		if (S2 < 0.0){
			rad2 = -rad2;
			rad2 /= 1.3;	// limit range of radius

			cx = cos(gl_FragCoord.x)*rad2;
			sy = sin(gl_FragCoord.y)*rad2;

			// smaller threshold = less visible
			// relate to spec intensity?

			if( cx*cx +  sy*sy >= rad2 ){
				outColor1 += vec4( ks2 * S2, 1.0 );
			}
		} 


		gl_FragColor = outColor1;
	}`;


// *** EXPERIMENTAL CIRCLES *** //
var jfSpecularVert = `
	precision mediump float;

	// *** RAW SHADER GEOMETRY AND CAMERA UNIFORMS *** //
	// if using RawShaderMaterial, we need these uniforms
	// otherwise, okay to delete

	// camera uniforms
	uniform mat4 modelMatrix;
	uniform mat4 viewMatrix;
	uniform mat4 projectionMatrix;
	// geometry attributes and uniforms
	attribute vec3 position;
	attribute vec3 normal;

	// *** LIGHTING UNIFORMS *** //
	// light uniforms
	uniform vec3 light1_pos;
	// fragment shader variables
	varying vec3 v_pos;
	varying vec3 N, L1, L2, V;

	// second set of lights 
	vec3 light2_pos = vec3 (5.0, 5.0, 5.0);


	void main()
	{
		// vertex position in camera coordinates
		vec4 pos = viewMatrix * modelMatrix * vec4(position, 1.0);

		// normalized vertex normal - camera coordinates
		N = vec3( normalize( viewMatrix * modelMatrix * vec4(normal.xyz, 0.0) ).xyz );

		// send position info to frag shader
		v_pos = pos.xyz;

		// convert light coordinates from world to camera
		// 		LIGHT 1
		vec4 L1_cam = viewMatrix * vec4(light1_pos, 1.0);
		// calculate normalized light direction vector
		L1 = vec3(normalize( L1_cam - pos ).xyz);
		
		//		LIGHT 2
		vec4 L2_cam = viewMatrix * vec4(light2_pos, 1.0);
		L2 = vec3(normalize( L2_cam - pos ).xyz);

		// calculate view vector from position
		V = normalize(-v_pos);

		// this makes it...stretch
		// v_pos = vec3(projectionMatrix * vec4(v_pos, 1.0)).xyz;

		// cool
		gl_Position = projectionMatrix * pos;
	}`;

var jfSpecularFrag = `
	precision mediump float;

	// uniforms
	uniform vec3 ambient;
	uniform vec3 light1_diffuse;
	uniform vec3 light1_specular;

	// lights 2
	vec3 kd2 = vec3(0.0, 0.0, 0.9);  // dull diffuse
	vec3 ks2 = vec3(0.0, 1.0, 1.0);  // teal specular

	// scalars and powers
	const float spec_intensity = 5.0;
	float radius = 1.0;

	// resolution
	uniform float resX;
	uniform float resY;

	// varyings
	varying vec3 v_pos;
	varying vec3 N, L1, L2, V;

	// other
	float cx, sy, zWibble, rad1, rad2;

	void main()
	{
		// default light = 0.0
		vec4 outColor1 = vec4(ambient, 1.0);

		// *** DIFFUSE *** //
		// calculate diffuse for light 1
		// calculate angle between light and vertex normal
		float diff1 = max(0.0, dot(N, L1));

		// diffuse threshold
		vec4 kd1Color = vec4(0.0);
		for(float i = 0.0; i<1.0; i+= 0.1){
			// basic toon shading
			if(diff1 >= i){

				cx = cos(gl_FragCoord.x);
				sy = sin(gl_FragCoord.y);

				if( cx*cx + sy*sy >= diff1 ){
					kd1Color = vec4(light1_diffuse * i, 1.0);
				}
			}

		}
		outColor1 += kd1Color;


		// light 2
		float diff2 = max(0.0, dot(N, L2));
		outColor1 += vec4((diff2 * kd2), 1.0);

		// *** SPECULAR *** //
		// calculate reflection vector
		vec3 R = normalize( reflect(-L1,N) );
		
		float S; // = pow( max( dot(R,V),0.0), spec_intensity );
		float RdotN = dot(R,V);
		// weird specular
		if(RdotN >= 0.0){
			S = pow( max(dot(R,V), 0.0), spec_intensity );
		}
		// weird specular
		else {
			S = pow( max(-dot(R,V), 0.0), spec_intensity );
			S = -S;
		}


		// light 2
		vec3 R2 = normalize( reflect(-L2,N) );
		// set up specular
		float S2; // = pow( max(dot(R2,V), 0.0), spec_intensity );
		float R2dotN = dot(R2, V);

		// normal specular
		if(R2dotN >= 0.0){
			S2 = pow( max(dot(R2,V), 0.0), spec_intensity );
		}
		// weird specular
		else {
			S2 = pow( max(-dot(R2,V), 0.0), spec_intensity );
			S2 = -S2;
		}

		// add contribution from specular
		// outColor1 += vec4( ks2 * S2, 1.0 );

		// change radius based on specular intensity
		rad1 = radius * S;
	    rad2 = radius * S2;

		// MAKE THEM 'CIRCLES'

		// normal specular
		// light 1
		if ( S > 0.0 ){
			//rad1 *= 3.14;

			// bigger wibble = bigger blobs
			float zWibble =  3.14*3.14*3.14*3.14;
			

			cx = cos(gl_FragCoord.x/zWibble)*rad1;
			sy = sin(gl_FragCoord.y/zWibble)*rad1;

			//cx = cos(gl_FragCoord.x)*rad1;
			//sy = sin(gl_FragCoord.y)*rad1;

			// smaller threshold = less visible
			// relate to spec intensity?

			if( cx*cx + sy*sy >= rad1 ){
				outColor1 += vec4( light1_specular * S, 1.0 );
			}
		}

		// light 1 - "negative" specular
		if (S < 0.0){
			rad1 = -rad1;	// make it a positive number
			rad1 /= 1.3;	// limit range of radius

			cx = cos(gl_FragCoord.x)*rad1;
			sy = sin(gl_FragCoord.y)*rad1;

			if( cx*cx +  sy*sy >= rad1 ){
				outColor1 += vec4( light1_specular * S, 1.0 );
			}
		}

		// light 2
		if (S2 > 0.0){
			cx = cos(gl_FragCoord.x)*rad2;
			sy = sin(gl_FragCoord.y)*rad2;

			// smaller threshold = less visible
			// relate to spec intensity?

			if( cx*cx +  sy*sy >= rad2 ){
				outColor1 += vec4( ks2 * S2, 1.0 );
			}
		} 

		// "negative" specular
		if (S2 < 0.0){
			rad2 = -rad2;
			rad2 /= 1.3;	// limit range of radius

			cx = cos(gl_FragCoord.x)*rad2;
			sy = sin(gl_FragCoord.y)*rad2;

			if( cx*cx +  sy*sy >= rad2 ){
				outColor1 += vec4( ks2 * S2, 1.0 );
			}
		} 

		gl_FragColor = outColor1;
	}`;