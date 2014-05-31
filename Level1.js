

var LEVEL_1_PARAMS = {};


LEVEL_1_PARAMS.position = new THREE.Vector3( 0 , 0 , -50 );

LEVEL_1_PARAMS.note = 'clean6',

LEVEL_1_PARAMS.geo = 'totem'



LEVEL_1_PARAMS.skybox = {

  geo:'totem',
  note: 'srBeast1',
  mat: new THREE.MeshNormalMaterial({ side:THREE.DoubleSide }),
  scale: 100

}

LEVEL_1_PARAMS.crystal = {

  geo: new THREE.CylinderGeometry( 2,0,5 ),
  mat: new THREE.MeshNormalMaterial(),
  scale:.3,
  rotation: new THREE.Euler( -Math.PI / 2 , 0 , 0 )


}

LEVEL_1_PARAMS.stones = {


  geo:'logoGeo',

  init:function( geo  ){

    
    var geo = new THREE.CubeGeometry( 10 ,10,10 );
    var mat = mat || new THREE.MeshNormalMaterial();
    
    var mat = new THREE.MeshLambertMaterial({
      shading: THREE.FlatShading,
      color:0xffffff,
      map:audioController.texture,
      //wireframe:true,
      depthWrite:false,
      transparent:true,
      //opacity: .1,
      side: THREE.DoubleSide,
      blending:THREE.AdditiveBlending
    });

    var geometry = new THREE.Geometry();

    var placingMatrix = [];
    placingMatrix.push([[0,0,0],[0,0,0],[0,0,0]]);

  
    place(placingMatrix, 0,0,0,0);
    place(placingMatrix, 0,0,0,1);
    place(placingMatrix, 0,0,0,2);
    place(placingMatrix, 0,0,0,3);
    place(placingMatrix, 0,0,0,4);
    place(placingMatrix, 0,0,0,5);
    place(placingMatrix, 10,0,0,0);
    place(placingMatrix, -10,0,0,1);
    place(placingMatrix, 0,10,0,2);
    place(placingMatrix, 0,-10,0,3);
    place(placingMatrix, 0,0,10,4);
    place(placingMatrix, 0,0,-10,5);
    place(placingMatrix, 10,10,0,0);
    place(placingMatrix, -10,10,0,1);
    place(placingMatrix, -10,10,0,2);
    place(placingMatrix, -10,-10,0,3);
    place(placingMatrix, 10,0,10,4);
    place(placingMatrix, 10,0,-10,5);

    for( var i=0; i < placingMatrix.length; i++ ){

      var mesh = new THREE.Mesh( geo , mat );

      var p = placingMatrix[i][0];
      var s = placingMatrix[i][1];
      var r = placingMatrix[i][2];

      mesh.position.set( p[0] , p[1] , p[2] );
      mesh.scale.set( s[0] , s[1] , s[2] );
      mesh.rotation.x = r[0]//,r[1],r[2] );
      mesh.rotation.y = r[1]//,r[1],r[2] );
      mesh.rotation.z = r[2]//,r[1],r[2] );

      mesh.updateMatrix();
      geometry.merge( geo , mesh.matrix );

    }

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    //assignUVs( geometry );
    stones = new THREE.Mesh( geometry , mat );

    return stones 


  }




}
/*

   Path

*/
LEVEL_1_PARAMS.path = {

  notes:['srNight1','srNight2','srNight3','srNight4'],
  pathDetail: 0,

  markerMat: new THREE.MeshNormalMaterial(),
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

  createGuides: function(){

    var guides = [];

    var geo = new THREE.BoxGeometry( .2 , .2 , .5 );
    var mat = new THREE.MeshNormalMaterial();

    for( var  i = 0; i < 300; i++ ){

      var guide = new THREE.Mesh( geo , mat );
      guide.lifeTime = 0;
      guide.lifeSpeed = Math.random() * .5 + .5;
      guide.velocity = new THREE.Vector3();
      guides.push( guide );
    
    }


    return guides;

  },

  update: function(){


    var oClosestMarker = this.closestMarker || this.markers[0];
    this.closestMarker = this.markers[0];


    var closestDistance = 10000000000;
    for( var i = 0; i < this.markers.length; i++ ){


      var dif = this.markers[i].position.clone().sub( this.dragonFish.leader.position );

      var l = dif.length();

      if( l < closestDistance ){

        this.closestMarker = this.markers[i];
        closestDistance = l;

      }

    }

    if( this.closestMarker != oClosestMarker ){

      console.log( 'NEW MARKER HIT' );

      var rand = Math.floor( this.notes.length * Math.random() )
      this.notes[rand].play();

    }
    //console.log( 'HELLO' );

    //console.log( this.guides );
    var guides = this.guides;

    for( var i = 0; i < guides.length; i++ ){

      var guide = guides[i];

      var dif = guide.position.clone().sub( this.scene.position );
      guide.velocity.sub( dif.normalize().multiplyScalar( .01) );

      guide.position.add( guide.velocity );
     // guide.velocity.multiplyScalar( .9 );

      //guide.position.sub( dif.normalize().multiplyScalar( .1 ) );

      guide.lookAt( guide.position.clone().add( guide.velocity ) );

      if( guide.growing ){
        guide.lifeTime += .02 * guide.lifeSpeed;
      }else{
        guide.lifeTime -= .008 * guide.lifeSpeed;
      }

      if( guide.lifeTime <= 0 ){


        guide.position = this.closestMarker.position.clone();

        guide.velocity = new THREE.Vector3();
        guide.velocity.x = (Math.random() - .5 ) * .2;
        guide.velocity.y = (Math.random() - .5 ) * .2;
        guide.velocity.z = (Math.random() - .5 ) * .2;


        /*var rand = new THREE.Vector3();

        rand.x = (Math.random() - .5 ) * 5;
        rand.y = (Math.random() - .5 ) * 5;
        rand.z = (Math.random() - .5 ) * 5;

        guide.position.add( rand );*/

        guide.growing = true;


      }else if( guide.lifeTime >= 1 ){

        guide.growing = false;
        guide.lifeTime = 1;
       // guide.note.play();

      }


      guide.scale.x = guide.lifeTime;
      guide.scale.y = guide.lifeTime;
      guide.scale.z = guide.lifeTime;

    }


  },

  addPath: function( levelPath ){


    //for( var i = 0; i < levelPath.markers



  }
    




}
LEVEL_1_PARAMS.newTypes = [

  {
    type: 'alwaysSafe',
    note: 'clean1',
    loop: 'clean_shuffleClick',
    geo:  'logoGeo',
    numOf: 30,
    startScore: 0,
    color: new THREE.Color( 0xffffff ),
    instantiate: function( level , dragonFish , note , loop , geo ){

      console.log('hello');
      var m = new THREE.MeshPhongMaterial({color:0xff0000});
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

        console.log( 'EHSAS' );
        var hook = new Hook( dragonFish, level , this.type , {
          head:head.clone(),
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
]


