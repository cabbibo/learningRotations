
// TODO

function Level( dragonFish, newCrystal , newTypes , oldTypes , skybox , finishScore , pathway, note ){

  this.fullyLoaded = false;

  this.dragonFish = dragonFish;


  this.scene = new THREE.Object3D();

  var g = new THREE.IcosahedronGeometry( 1 );
  var m = new THREE.MeshNormalMaterial();
  this.crystal = new THREE.Mesh( g , m );

  this.crystalAdded = false;
  this.active = false;


  this.hooks = [];

}


Level.prototype.beginLoading = function(){

  for( var i = 0; i < newTypes.length; i++ ){

    var loopName = newTypes[i].loop;
    var noteName = newTypes[i].note;

    var newName = 'audio/loops/' + loopName + '.wav';

    var loop = new LoadedAudio( audioController , newName ,{
      looping: true
    });

    loop.onLoad = function(){

      this.onAudioLoad();

    }.bind( this );

    LOOPS[ loopName ] = loop;

    var noteName = newTypes[i].note;
    var newName = 'audio/notes/' + noteName + '.wav';

    var note = new LoadedAudio( audioController , newName ,{
      looping: false
    });

    note.onLoad = function(){
      this.onAudioLoad();
    }.bind( this );

    NOTES[ noteName ] = note;

  }

}

Level.prototype.onAudioLoaded = function(){

  console.log( 'ON AUDIO LOAD' );
  
  this.audioLoaded ++;
  
  if( this.audioLoaded == this.audioNeededToLoad ){

    this.fullyLoaded = true;
    this.birth();

  }

}

Level.prototype.birth = function(){


  for( var  i = 0; i < this.newTypes.length; i++ ){

    var loop = LOOPS[ this.newTypes[i].loop ];
    var note = NOTES[ this.newTypes[i].note ];

    var hookParams = this.newType[i].instantiate( loop , note );


  }


}

Level.prototype.initialize = function(){


  scene.add( this.crystal );
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

}

Level.prototype.onComplete = function(){


}

Level.prototype.onEnd = function(){


}

Level.prototype.update = function(){


  var dif = this.crystal.position.clone().sub( this.dragonFish.position );
  
  if( dif.length() <= this.crystalSize ){

    this.onStart();

  }

}

    - New Hooks - instantiate
    - Clear Hooks - clear all of the unneed hooks that are part of the dragonfish
    - Skybox - Object needs to be loaded
    - Pathway - some sort of representation of how to get to the next level
    - level complete Noise


