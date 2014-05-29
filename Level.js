
// TODO
// LOOP LOADING 3 TIMES
//
//
function Level(name ,  dragonFish, params ){

  this.name = name;
  this.params = params;

  this.newTypes = params.newTypes || [];
  this.oldTypes = params.oldTypes || [];
  
  this.totalNeededToLoad = 0;
  this.totalLoaded = 0;
  this.fullyLoaded  = false;
  this.prepared     = false;
  this.crystalAdded = false;
  this.active = false;


  this.startScore = 0;
  this.currentScore = 0;
  this.endScore = 0;
  this.length = 0;



  this.dragonFish = dragonFish;
  this.scene = new THREE.Object3D();

  this.scene.position = params.position;

  // TODO: move to initCrystal
  var g = new THREE.IcosahedronGeometry( 1 );
  var m = new THREE.MeshNormalMaterial();
  this.crystal = new THREE.Mesh( g , m );
  this.crystalSize = 1;

  this.hooksOnDeck = [];

  this.hooks = [];

}

Level.prototype.loadNote = function( noteName ){

    if( !NOTES[noteName] ){
    
    var newName = 'audio/notes/' + noteName + '.wav';

    this.totalNeededToLoad ++;
    var note = new LoadedAudio( audioController , newName ,{
      looping: false
    });

    var nn2 = noteName;
    note.onLoad = function(){
      this.onLoad();
    }.bind( this );

    NOTES[ noteName ] = note;

  }

}

Level.prototype.loadLoop = function( loopName ){
    
  if( !LOOPS[loopName] ){
     
    var newName = 'audio/loops/' + loopName + '.wav';

    this.totalNeededToLoad ++;
    var loop = new LoadedAudio( audioController , newName ,{
      looping: true
    });

    loop.onLoad = function(){
      this.onLoad();
    }.bind( this );

    LOOPS[ loopName ] = loop;

  }

}

Level.prototype.loadGeo = function( geoName ){
  if( geoName && !GEOS[geoName] ){

    var newName = 'models/' + geoName + '.obj'; 
    this.totalNeededToLoad ++;

    loader.OBJLoader.load( newName , function( object ){
      object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            GEOS[geoName] = child.geometry;       
          }
      });

      this.onLoad();

    }.bind( this ));

  }

}

// Does the heavy lifting of Loading all the audio
Level.prototype.beginLoading = function(){


  var noteName = this.params.path.note;
  this.loadNote( noteName ); 

  var noteName = this.params.note;
  this.loadNote( noteName ); 


  for( var i = 0; i < this.newTypes.length; i++ ){

    // Loading Loops
    var loopName = this.newTypes[i].loop;
    this.loadLoop( loopName ); 
    // Loading Notes
    var noteName = this.newTypes[i].note;
    this.loadNote( noteName );

    // LoadingGeometry
    var geoName = this.newTypes[i].geo;
    this.loadGeo( geoName );

  }



}

Level.prototype.onLoad = function(){
  
  this.totalLoaded ++;

  console.log( this.name , this.totalLoaded , this.totalNeededToLoad );
  if( this.totalLoaded == this.totalNeededToLoad ){

    console.log( 'FULLY LOADED');
    this.fullyLoaded = true;

    this.instantiate();

  }

}

Level.prototype.startLoops = function(){

  console.log( 'LOOPS STARTED' );

  for( var i = 0; i < this.newTypes.length; i++ ){

    var loop = LOOPS[ this.newTypes[i].loop ];

    if( !loop.playing ){

      loop.play();
      loop.gain.gain.value = 0;

    }


  }

}


Level.prototype.instantiate = function(){


  this.note = NOTES[ this.params.note ];


  for( var  i = 0; i < this.newTypes.length; i++ ){

    var loop = LOOPS[ this.newTypes[i].loop ];
    var note = NOTES[ this.newTypes[i].note ];
    var geo  = GEOS[  this.newTypes[i].geo  ];

    var hooks = this.newTypes[i].instantiate( this , this.dragonFish, note ,loop , geo );

    for( var j = 0; j < hooks.length; j++ ){

      this.hooksOnDeck.push( hooks[j] );

    }

  }


  looper.onNextLoop( this.startLoops.bind( this ) );

  // TODO
  /*
    this.initSkybox();
    this.initStones();
    this.initCrystal();
  */
    
  this.initPath();

  this.prepared = true;

  this.onPrepared();
}

Level.prototype.onPrepared = function(){}


Level.prototype.initPath = function(){

  var oPos;
  if( this.oldLevel ){
    oPos = this.oldLevel.scene.position;
  }else{
    oPos = new THREE.Vector3();
  }

  var pos = this.scene.position;

  var pathGeo = this.params.path.createGeometry( oPos , pos );

  var markers = [];

  for( var i = 0; i < pathGeo.vertices.length; i++ ){

    var g = this.params.path.markerGeo;
    var m = this.params.path.markerMat;
    var mesh = new THREE.Mesh( g , m );

    mesh.position = pathGeo.vertices[i];
    markers.push( mesh );

  }


  this.path = {};

  this.path.note = NOTES[ this.params.path.note ];
  this.path.update = this.params.path.update;
  this.path.markers = markers;


}

Level.prototype.initialize = function(){

  scene.add( this.scene );

  if( !this.fullyLoaded || !this.prepared ){

    console.log( 'TOTALLY FUCKED' );

  }else{

    this.startScore   = SCORE;
    this.currentScore = 0;
    this.length       = this.hooksOnDeck.length;


    console.log( 'APATS' );
  
    this.addPath();

    this.scene.add( this.crystal );
    this.crystalAdded = true;


    if( this.nextLevel ){

      console.log( 'I HAVENEXTLEVEL' );
      console.log( this.nextLevel );
      this.nextLevel.beginLoading();
    }

  }


}

Level.prototype.onStart = function(){

  console.log( 'LEVEL  STARTED' );
  // puts the crystal on the head of the dragonfish
  scene.remove( this.crystal );

  // out with the old, in with the new
  if( this.oldLevel ){
    dragonFish.leader.body.remove( this.oldLevel.crystal );
  }

  dragonFish.leader.body.add( this.crystal );

  this.note.play();

  this.removePath();

  this.checkForNewHooks( this.currentScore );

  //TODO: Make sure this works
  // Remove any unneccesary hooks
  /*for( var i = 0; i < dragonFish.spine.length; i++ ){

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

  }*/

  this.startHooks();

  this.active = true;

}

Level.prototype.startHooks = function(){


  for( var i =0; i < this.hooks.length; i++ ){

    var hook = this.hooks[i];

    hook.activate();
    this.dragonFish.addToScene( hook.vertabrae );

  }


}

// Check to see if we should put any more hooks into circulation
Level.prototype.onHook = function( index , hook ){


  SCORE ++;

  this.currentScore = SCORE - this.startScore;

  this.percentComplete = this.currentScore / this.length;

  console.log( this.percentComplete );

  this.checkForNewHooks( this.currentScore );

  document.getElementById( 'hookCount' ).innerHTML = SCORE;

  hook.explode();

  this.hooks.splice( index , 1 );

  if( this.percentComplete == 1 ){

    this.onComplete();



  }


}


Level.prototype.checkForNewHooks = function( score ){

  for( var i = 0; i < this.hooksOnDeck.length; i++ ){

    var hook = this.hooksOnDeck[i];

    if( hook.startScore <= score ){

      this.hooksOnDeck.splice( i , 1 );
      this.hooks.push( hook );

      hook.activate();
      this.dragonFish.addToScene( hook.vertabrae );

      i--;

    }

  }


}

Level.prototype.onComplete = function(){

  console.log( 'MUTHAFUCKIN COMPLETE' );
  //TODO:
  //PLAY FINISH NOISE

  if( this.nextLevel ){
    this.nextLevel.initialize();
  }else{

    console.log( 'TODO: FINISH GAME' );

  }
  CURRENT_LEVEL ++;

}

Level.prototype.onEnd = function(){


}

Level.prototype.update = function(){


  if( this.crystalAdded === true && this.active === false ){
   

    // this.path.update();



    var dif = this.scene.position.clone().sub( this.dragonFish.leader.position );
  
    if( dif.length() <= this.crystalSize ){

      this.onStart();

    }

  }

  if( this.active ){

    this.updateHooks();

  }

}


Level.prototype.updateHooks = function(){

  for( var i = 0; i < this.hooks.length; i++ ){
    this.hooks[i].updateForces( this );
  }

  for( var i= 0; i < this.hooks.length; i++ ){

    this.hooks[i].updatePosition();
    this.hooks[i].checkForCollision( 2 , i );
  }

  //console.log( this.hooks[0].position.x );
  
  if( !paused ){
    this.dragonFish.update();
  }

}


Level.prototype.addPath = function(){


  for( var  i = 0; i < this.path.markers.length; i++ ){

    var marker = this.path.markers[i];

    scene.add( marker );

  
    marker.init = { scale: 0 };
    marker.target = { scale: 1 };

    var tween = new TWEEN.Tween( marker.init ).to( marker.target , (i+1) * 1000 );

    tween.easing( TWEEN.Easing.Quartic.In )
  
    tween.marker = marker;
    tween.note   = this.path.note;

    tween.onUpdate( function(){

      this.scale.x = this.init.scale;
      this.scale.y = this.init.scale;
      this.scale.z = this.init.scale;

    }.bind( marker ));

    tween.onComplete( function(){
      tween.note.play();
    }.bind( tween ));

    tween.start();



  }

}

Level.prototype.removePath = function(){


  for( var  i = 0; i < this.path.markers.length; i++ ){

    var marker = this.path.markers[i];

    scene.add( marker );

  
    marker.init = { scale: 1 };
    marker.target = { scale: 0 };

    var tween = new TWEEN.Tween( marker.init ).to( marker.target , (i+1) * 300 );

    tween.easing( TWEEN.Easing.Quartic.In )
  
    tween.marker = marker;
    tween.note   = this.path.note;

    tween.onUpdate( function(){

      this.scale.x = this.init.scale;
      this.scale.y = this.init.scale;
      this.scale.z = this.init.scale;

    }.bind( marker ));

    tween.onComplete( function(){
      scene.remove( marker ); 
    }.bind( marker ));

    tween.start();



  }

}

/*
    
    - New Hooks - instantiate
    - Clear Hooks - clear all of the unneed hooks that are part of the dragonfish
    - Skybox - Object needs to be loaded
    - Pathway - some sort of representation of how to get to the next level
    - level complete Noise


*/

