

var LEVEL_1_PARAMS = {};


LEVEL_1_PARAMS.position = new THREE.Vector3( 3000 , 0 , 0 );

LEVEL_1_PARAMS.note = 'clean6',

LEVEL_1_PARAMS.geo = 'totem'


LEVEL_1_PARAMS.skybox = {

  geo:'totem',
  mat: new THREE.MeshNormalMaterial({ side:THREE.DoubleSide }),
  scale: 100

}

LEVEL_1_PARAMS.crystal = {

  geo:'totem',
  mat: new THREE.MeshNormalMaterial(),
  scale:.3,


}

/*

   Path

*/
LEVEL_1_PARAMS.path = {

  note:'sr1',
  pathDetail: 30,

  markerMat: new THREE.MeshNormalMaterial({blending:THREE.AdditiveBlending,transparent:true, side:THREE.DoubleSide, depthWrite:false}),
  markerGeo: 'totem',
  markerScale: .1,
  initMarkers: function( geo ){


  },

  createGeometry: function( oldPos , newPos ){
    
    var geometry = new THREE.Geometry();

    var dif = newPos.clone().sub( oldPos );

    var chunk = dif.multiplyScalar( 1/this.pathDetail );

    geometry.vertices.push( oldPos );
    for( var i = 0; i < this.pathDetail; i++ ){

      var chunkPos = geometry.vertices[i].clone().add( chunk );

      geometry.vertices.push( chunkPos );
      
    }

    return geometry;

  },

  update: function(){


  },

  addPath: function( levelPath ){


    //for( var i = 0; i < levelPath.markers



  }
    




}
LEVEL_1_PARAMS.newTypes = [

  {
    type: 'heavyBeat',
    note: 'clean1',
    loop: 'clean_heavyBeat',
    geo:  'logoGeo',
    numOf: 1,
    startScore: 10,
    color: new THREE.Color( 0xffffff ),
    instantiate: function( level , dragonFish , note , loop , geo ){

      var m = new THREE.MeshBasicMaterial({color:0xff0000});
      var head = new THREE.Mesh(
          new THREE.CubeGeometry( .6 , .6 ,.6 ),
          m
      );

      var g = new THREE.IcosahedronGeometry(2);
      var m = new THREE.MeshLambertMaterial({ color: this.color.getHex() });
      var m1 = new THREE.Mesh( g , m );

      m1.scale.x = .1;
      m1.scale.y = .1;

      var hooks = [];

      for( var i = 0; i < this.numOf; i++ ){

        var hook = new Hook( dragonFish, level , this.type , {
          head:head,
          m1:m1,
          m2:m1,
          m3:m1,
          m4:m1,
          note:note,
          startScore: this.startScore,
          loop:loop,
          color: this.color,
          power: 1/ this.numOf,
          boss: true
        });

        var id = Math.random();
        hook.id = id;

        hooks.push( hook );
      }
  
      return hooks;
    }
  },

   {
    type: 'shuffleClick',
    note: 'clean1',
    loop: 'clean_shuffleClick',
    geo:  'logoGeo',
    numOf: 4,

    startScore: 0,
    color: new THREE.Color( 0xff0000 ),
    instantiate: function( level , dragonFish , note , loop , geo ){

      var m = new THREE.MeshBasicMaterial({color:0xff0000});
      var head = new THREE.Mesh(
          new THREE.BoxGeometry( 1.6 , 1.6 ,1.6 ),
          m
      );

      var g = new THREE.IcosahedronGeometry(.2);
      var m = new THREE.MeshBasicMaterial({ color: this.color.getHex() });
      var m1 = new THREE.Mesh( g , m );

      var hooks = [];

      for( var i = 0; i < this.numOf; i++ ){

        var hook = new Hook( dragonFish, level , this.type , {
         
          head:head,
          m1:m1,
          m2:m1,
          m3:m1,
          m4:m1,
          note:note,
          loop:loop,
          startScore: this.startScore,
          color: this.color,
          power: 1/ this.numOf
            
        });

        var id = Math.random();
        console.log( id );
        hook.id = id;

        hooks.push( hook );
      }
  
      return hooks;
    }
  },

   {
    type: 'sniperDetail2',
    note: 'clean1',
    loop: 'clean_sniperDetail2',
    geo:  'logoGeo',
    numOf: 4,

    startScore: 0,
    color: new THREE.Color( 0x00ff00 ),
    instantiate: function( level , dragonFish , note , loop , geo ){

      var m = new THREE.MeshBasicMaterial({color:0xff0000});
      var head = new THREE.Mesh(
          new THREE.BoxGeometry( 1.6 , 1.6 ,1.6 ),
          m
      );

      var g = new THREE.IcosahedronGeometry(.2);
      var m = new THREE.MeshBasicMaterial({ color: this.color.getHex() });
      var m1 = new THREE.Mesh( g , m );

      var hooks = [];

      for( var i = 0; i < this.numOf; i++ ){

        var hook = new Hook( dragonFish, level , this.type , {
         
          head:head,
          m1:m1,
          m2:m1,
          m3:m1,
          m4:m1,
          note:note,
          loop:loop,
          startScore: this.startScore,
          color: this.color,
          power: 1/ this.numOf
            
        });

        var id = Math.random();
        console.log( id );
        hook.id = id;

        hooks.push( hook );
      }
  
      return hooks;
    }
  },

   {
    type: 'sniperGlory1',
    note: 'clean1',
    loop: 'clean_sniperGlory1',
    geo:  'logoGeo',
    numOf: 4,

    startScore: 0,
    color: new THREE.Color( 0x00ff00 ),
    instantiate: function( level , dragonFish , note , loop , geo ){

      var m = new THREE.MeshBasicMaterial({color:0xff0000});
      var head = new THREE.Mesh(
          new THREE.BoxGeometry( 1.6 , 1.6 ,1.6 ),
          m
      );

      var g = new THREE.IcosahedronGeometry(.2);
      var m = new THREE.MeshBasicMaterial({ color: this.color.getHex() });
      var m1 = new THREE.Mesh( g , m );

      var hooks = [];

      for( var i = 0; i < this.numOf; i++ ){

        var hook = new Hook( dragonFish, level , this.type , {
         
          head:head,
          m1:m1,
          m2:m1,
          m3:m1,
          m4:m1,
          note:note,
          loop:loop,
          startScore: this.startScore,
          color: this.color,
          power: 1/ this.numOf
            
        });

        var id = Math.random();
        console.log( id );
        hook.id = id;

        hooks.push( hook );
      }
  
      return hooks;
    }
  },



]


