
var explosion = {};

function initExplosion( dragonFish ){

  var size = 128;

  var s = THREE.ImageUtils.loadTexture( 'lib/flare.png');

  var c = new THREE.Vector3( Math.random() , Math.random() , Math.random());
   
  var id = 1;

  console.log( dragonFish )

  console.log( 'dragonfish pos vel' );
  console.log( dragonFish.position );
  console.log( dragonFish.velocity );
  
  uniforms = {
    t_pos:{ type:"t" , value:null },
    t_vel:{ type:"t" , value:null },
    t_audio:{ type:"t" , value:audioController.texture },
    sprite:{ type:"t" , value:s },
    color:{ type:"v3" , value:c },
    uPos:{ type:"v3" , value:dragonFish.leader.position },
    uVel:{ type:"v3" , value:dragonFish.leader.velocity },
    id:{ type:"f" , value: id}
  }
  
  var mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: shaders.vertexShaders.render,
    fragmentShader: shaders.fragmentShaders.render,
    transparent:true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  var geo = ParticleUtils.createLookupGeometry( size );
  physicsParticles  = new THREE.ParticleSystem( geo , mat );
 
  var posSim = shaders.simulationShaders.posSim
  var velSim = shaders.simulationShaders.velSim


  physicsRenderer = new PosVelSimulation( size , posSim , velSim , renderer );
  physicsRenderer.addDebugScene( scene );
  physicsRenderer.debugScene.scale.multiplyScalar( .1 );

  /*var side = Math.ceil( Math.sqrt( numOfSpheres ) );

  physicsRenderer.debugScene.position.x = side* 50 * (((i % side)/side)+(.5/side)-.5);
  physicsRenderer.debugScene.position.y = side *50 * ((Math.floor( i / side )/side)+(.5/side)-.5);
  physicsRenderer.debugScene.position.z = -100;*/


  physicsRenderer.addBoundTexture( physicsParticles , 't_pos' , 'outputPos' );
  physicsRenderer.addBoundTexture( physicsParticles , 't_vel' , 'outputVel' );

  var audioU = { type:"t" , value: audioController.texture }

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



  scene.add( physicsParticles );

//  physicsRenderers.push( physicsRenderer );
//  physicsParticleSystems.push( physicsParticles );
          //physicsRenderer.reset( audioController.texture );


  explosion.renderer = physicsRenderer;
  explosion.particles = physicsParticles;

}
