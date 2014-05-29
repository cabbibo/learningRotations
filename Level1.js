

var LEVEL_1_PARAMS = {};

LEVEL_1_PARAMS.newTypes = [

  {
    type: 'test1',
    note: 'clean1',
    loop: 'clean_heavyBeat',
    geo:  'logoGeo',
    numOf: 20,
    color: new THREE.Color( 0x00ff00 ),
    instantiate: function( level , dragonFish , note , loop , geo ){

      var m = new THREE.MeshBasicMaterial({color:0xff0000});
      var head = new THREE.Mesh(
          new THREE.CubeGeometry( .6 , .6 ,.6 ),
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
          note:note,
          loop:loop,
          color: this.color
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
    loop: 'clean_shuffleClick',
    geo:  'logoGeo',
    numOf: 20,
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
          note:note,
          loop:loop,
          color: this.color

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
