var explosion = {};

function initExplosion( dragonFish ){

  var size = 128;

  var sprite = THREE.ImageUtils.loadTexture( 'lib/flare.png');

  var color = new THREE.Vector3( Math.random() , Math.random() , Math.random());
   
  var id = 1;
  var size = 512;

  var sim = shaders.simulationShaders.curlSim;
  physicsRenderer = new PhysicsRenderer( size , sim , renderer ); 

  uniforms = {
    t_pos:{ type:"t" , value:null },
    t_oPos:{ type:"t" , value:null },
    t_ooPos:{ type:"t" , value:null },
    t_audio:{ type:"t" , value:audioController.texture},
    sprite:{ type:"t" , value:sprite},
    color:{ type:"v3" , value: new THREE.Vector3( 1. ,0., 0.) }
  }
  
  var mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders.vertexShaders.render,
    fragmentShader: shaders.fragmentShaders.render,

    blending: THREE.AdditiveBlending,
    transparent: true,
  depthWrite: false
  })

  var geo = ParticleUtils.createLookupGeometry( size );

  physicsParticles  = new THREE.ParticleSystem( geo , mat );

  physicsRenderer.addBoundTexture( physicsParticles , 't_pos' , 'output' );
  physicsRenderer.addBoundTexture( physicsParticles , 't_oPos' , 'oOutput' );
  physicsRenderer.addBoundTexture( physicsParticles , 't_ooPos' , 'ooOutput' );

  scene.add( physicsParticles );

  var mesh = new THREE.Mesh( new THREE.SphereGeometry( 5 ) );

  var pTexture = ParticleUtils.createPositionsTexture( size , mesh );
  physicsRenderer.reset( pTexture );
  physicsRenderer.addDebugScene( scene );
  physicsRenderer.debugScene.scale.multiplyScalar( .1 );

  physicsRenderer.setUniform( 't_audio' , {
    type:"t" , value: audioController.texture
  });

  physicsRenderer.setUniform( 'uPos' , {
    type:"v3" , value: dragonFish.leader.position 
  });

  physicsRenderer.setUniform( 'uVel' , {
    type:"v3" , value: dragonFish.leader.velocity
  });

  var justHit =  {
    type:"f" , value: 0.0
   };
  physicsRenderer.setUniform( 'justHit' , justHit );


/*  var audioU = { type:"t" , value: audioController.texture }

  var audioLookup = { type:"f" , value: id }

  physicsRenderer.setPosUniform( 't_audio' , audioU );
  physicsRenderer.setVelUniform( 't_audio' , audioU );
  
  physicsRenderer.setVelUniform( 'time'         , time );
  //physicsRenderer.setVelUniform( 'cameraAngle'  , cameraAngle);

  physicsRenderer.setPosUniform( 'audioLookup'  , audioLookup );

  var uPos = { type:"v3" , value:dragonFish.leader.position };
  var uVel = { type:"v3" , value:dragonFish.leader.velocity };

  console.log( uVel.value );
  physicsRenderer.setPosUniform( 'uPos' , uPos );
  physicsRenderer.setPosUniform( 'uVel' , uVel );
  physicsRenderer.setVelUniform( 'uPos' , uPos );
  physicsRenderer.setVelUniform( 'uVel' , uVel );

*/

  //scene.add( physicsParticles );

//  physicsRenderers.push( physicsRenderer );
//  physicsParticleSystems.push( physicsParticles );
          //physicsRenderer.reset( audioController.texture );

  explosion.renderer = physicsRenderer;
  explosion.particles = physicsParticles;
  explosion.justHit = justHit;


}
