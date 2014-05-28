

var LEVEL_1_PARAMS = {};

LEVEL_1_PARAMS.newTypes = [

  {
    type: 'test1',
    note: 'clean1',
    loop: 'clean_heavyBeat',
    geo:  'logoGeo',
    color: new THREE.Color( 0x00ff00 ),
    instantiate: function( level , note , loop , geo ){

      console.log( 'INSTANSIATE CALLED' );
      console.log( this );
      console.log( this.color );
      var head = new THREE.Object3D();

      var g = new THREE.IcosahedronGeometry(.1);
      var m = new THREE.MeshNormalMaterial();
      var m1 = new THREE.Mesh( g , m );

      var hooks = [];

      for( var i = 0; i < this.numOf; i++ ){

        var hook = new Hook( dragonFish , this.type , {
          head:head,
          m1:m1,
          note:note,
          loop:loop,
          color: this.color

        });

      }
  
      return hooks;

    }
  },

]
