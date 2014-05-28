
// TODO

function Level( dragonFish, newCrystal , newHookTypes , oldHookTypes , skybox , finishScore , pathway, note ){

  this.dragonFish = dragonFish;


  this.scene = new THREE.Object3D();

  var g = new THREE.IcosahedronGeometry( 1 );
  var m = new THREE.MeshNormalMaterial();
  this.crystal = new THREE.Mesh( g , m );

  this.crystalAdded = false;
  this.active = false;



}

Level.prototype.initialize = function(){


  scene.add( this.crystal );
  this.crystalAdded = true;


}

Level.prototype.addCrystal = function(){

  scene.remove( this.crystal );

}


Level.prototype.onStart = function(){

  // puts the crystal on the head of the dragonfish
  scene.remove( this.crystal );
  dragonFish.leader.add( this.crystal );


  // Remove any unneccesary hooks
  for( var i = 0; i < activeHooks; i++ ){


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


