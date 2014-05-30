

var LEVEL_2_PARAMS = {};

LEVEL_2_PARAMS.position = new THREE.Vector3( 1000 , 300 , 0 );

LEVEL_2_PARAMS.note = 'clean6',

LEVEL_2_PARAMS.oldTypes = [

  //'heavyBeat',
  'sniperGlory1',
  'shuffleClick',
  'sniperDetail2'

]

LEVEL_2_PARAMS.skybox = {

  geo:'logoGeo',
  mat:  new THREE.MeshBasicMaterial(),
  scale: 100

}

LEVEL_2_PARAMS.crystal = {

  geo:'logoGeo',
  mat: new THREE.MeshBasicMaterial({color:0x0000ff}),
  scale:.3,


}
LEVEL_2_PARAMS.path = {

  note:'sr1',
  pathDetail: 30,


  markerMat: new THREE.MeshBasicMaterial(),
  markerGeo:'logoGeo',
  markerScale: .1,

  createPathFollowers: function(){

    for( var i = 0; i < 10; i++ ){


    }


  },

  createGeometry: function( oldPos , newPos ){

    console.log( this );
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
LEVEL_2_PARAMS.newTypes = [

  {
    type: 'test1',
    note: 'clean1',
    loop: 'clean_sniperDetail1',
    geo:  'logoGeo',
    numOf: 4,

    startScore: 0,
    color: new THREE.Color( 0x00ffff ),
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
    type: 'test2',
    note: 'clean2',
    loop: 'clean_sniperSnare',
    geo:  'logoGeo',
    numOf: 4,
    startScore: 4,
    color: new THREE.Color( 0xff0000 ),
    instantiate: function( level , dragonFish , note , loop , geo ){

      var head = new THREE.Object3D();

      var g = new THREE.IcosahedronGeometry(.3);
      var m = new THREE.MeshBasicMaterial({ color: this.color.getHex() });
      var m1 = new THREE.Mesh( g , m );

      var hooks = [];

      for( var i = 0; i < this.numOf; i++ ){

        var hook = new Hook( dragonFish , level , this.type , {
          
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
    type: 'test3',
    note: 'clean3',
    loop: 'clean_sniperShivers',
    geo:  'logoGeo',
    numOf: 4,
    startScore: 8,
    color: new THREE.Color( 0x0000ff ),
    instantiate: function( level , dragonFish , note , loop , geo ){

      var head = new THREE.Object3D();

      var g = new THREE.IcosahedronGeometry(.3);
      var m = new THREE.MeshBasicMaterial({ color: this.color.getHex() });
      var m1 = new THREE.Mesh( g , m );

      var hooks = [];

      for( var i = 0; i < this.numOf; i++ ){

        var hook = new Hook( dragonFish , level , this.type , {
          
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
    type: 'test1',
    note: 'clean1',
    loop: 'clean_darkFast',
    geo:  'logoGeo',
    numOf: 1,
    startScore: 12,
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
        console.log( id );
        hook.id = id;

        hooks.push( hook );
      }
  
      return hooks;
    }
  },

]


