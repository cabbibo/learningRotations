
// TODO
// LOOP LOADING 3 TIMES
//
//
function Level( dragonFish, params ){


  this.newTypes = params.newTypes || [];
  this.oldTypes = params.oldTypes || [];
  
  this.totalNeededToLoad = 0;
  this.totalLoaded = 0;
  this.fullyLoaded = false;
  this.prepared     = false;
  this.crystalAdded = false;
  this.active = false;

  this.dragonFish = dragonFish;
  this.scene = new THREE.Object3D();

  // TODO: move to initCrystal
  var g = new THREE.IcosahedronGeometry( 1 );
  var m = new THREE.MeshNormalMaterial();
  this.crystal = new THREE.Mesh( g , m );
  this.crystalSize = 1;

  this.hooks = {};

}



// Does the heavy lifting of Loading all the audio
Level.prototype.beginLoading = function(){

  for( var i = 0; i < this.newTypes.length; i++ ){

    // Loading Loops
    var loopName = this.newTypes[i].loop;
    
    if( !LOOPS[loopName] ){
     
      console.log( 'LOADING LOOP' );
      var newName = 'audio/loops/' + loopName + '.wav';

      this.totalNeededToLoad ++;
      var loop = new LoadedAudio( audioController , newName ,{
        looping: true
      });
      var nn1 = loopName;

      loop.onLoad = function(){
        console.log( 'THIS' );
        console.log( this );
        this.onLoad();
        console.log( nn1 );
      }.bind( this );

      LOOPS[ loopName ] = loop;

    }


    // Loading Notes
    var noteName = this.newTypes[i].note;

    if( !NOTES[noteName] ){
      
      var newName = 'audio/notes/' + noteName + '.wav';

      this.totalNeededToLoad ++;
      var note = new LoadedAudio( audioController , newName ,{
        looping: false
      });

      var nn2 = noteName;
      note.onLoad = function(){
        this.onLoad();
        console.log( nn2 );
      }.bind( this );

      NOTES[ noteName ] = note;

    }


    // LoadingGeometry
    var geoName = this.newTypes[i].geo;

    
    if( geoName && !GEOS[geoName] ){

      console.log( 'sasssd');
      var newName = 'models/' + geoName + '.obj'; 
      this.totalNeededToLoad ++;

      loader.OBJLoader.load( newName , function( object ){
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              GEOS[geoName] = child.geometry;       
            }
        });

        console.log('LEVEL');
        console.log( this );
        this.onLoad();

      }.bind( this ));

    }


  }



}

Level.prototype.onLoad = function(){

  console.log( 'ON AUDIO LOAD' );
  
  this.totalLoaded ++;

  console.log( this.totalLoaded );
  if( this.totalLoaded == this.totalNeededToLoad ){

    console.log( this.totalLoaded , this.totalNeededToLoad );
    this.fullyLoaded = true;
    //this.birth();

  }

}

Level.prototype.instantiate = function(){

  for( var  i = 0; i < this.newTypes.length; i++ ){

    var loop = LOOPS[ this.newTypes[i].loop ];
    var note = NOTES[ this.newTypes[i].note ];
    var geo  = GEOS[  this.newTypes[i].geo  ];

    this.newTypes[i].instantiate( this , this.dragonFish, loop , note , geo );

  }

  // TODO
  /*
    this.initSkybox();
    this.initStones();
    this.initCrystal();
    this.initPath();
  */

  this.prepared = true;
}

Level.prototype.initialize = function(){

  scene.add( this.scene );

  if( !this.fullyLoaded || !this.prepared ){

    console.log( 'TOTALLY FUCKED' );

  }

  this.scene.add( this.crystal );
  this.crystalAdded = true;


  if( this.nextLevel ){

    this.nextLevel.beginLoading();

  }


}

Level.prototype.addCrystal = function(){

  scene.remove( this.crystal );

}


Level.prototype.onStart = function(){

  // puts the crystal on the head of the dragonfish
  scene.remove( this.crystal );

  if( this.oldLevel ){
    dragonFish.leader.remove( this.oldLevel.crystal );
  }

  dragonFish.leader.add( this.crystal );

  //TODO:
  //Play START NOISE

  // Remove any unneccesary hooks
  for( var i = 0; i < dragonFish.spine.length; i++ ){

    var verta = dragonFish.spine[i];
    for( var j = 0; j < this.oldTypes; j++ ){

      var saved = false;
      if( verta.type == this.oldTypes[j] ){
        saved = true;
      }

      if( !saved ){

        this.dragonFish.removeVertabraeById( i );
        i--;
        
      }

    }

  }

  this.active = true;

}

Level.prototype.onComplete = function(){

  //TODO:
  //PLAY FINISH NOISE
  

}

Level.prototype.onEnd = function(){


}

Level.prototype.update = function(){


  if( this.crystalAdded === true && this.active === false ){
    
    var dif = this.scene.position.clone().sub( this.dragonFish.position );
  
    if( dif.length() <= this.crystalSize ){

      this.onStart();

    }

  }

  if( this.active ){


    this.hooks.update();

  }

}


Level.prototype.updateHooks = function(){

  for( var i = 0; i < this.hooks.length; i++ ){
    this.hooks[i].updateForces();
  }

  for( var i= 0; i < hooks.length; i++ ){
    this.hooks[i].updatePosition();
    this.hooks[i].checkForCollision( 2 , i );
  }
  
  if( !paused ){
    this.dragonFish.update();
  }

}
/*
    
    - New Hooks - instantiate
    - Clear Hooks - clear all of the unneed hooks that are part of the dragonfish
    - Skybox - Object needs to be loaded
    - Pathway - some sort of representation of how to get to the next level
    - level complete Noise


*/

