

var LEVEL_2_PARAMS = {};

LEVEL_2_PARAMS.position = new THREE.Vector3( 00 , 300 , 0 );

LEVEL_2_PARAMS.note = 'clean6',

LEVEL_2_PARAMS.oldTypes = [

  'shuffleClick'

]

LEVEL_2_PARAMS.skybox = {

  geo:'jelly',
  note: 'srBeast2',
  mat:  new THREE.MeshNormalMaterial({side:THREE.DoubleSide}),
  scale: 300

}

LEVEL_2_PARAMS.crystal = {

   geo:'jelly',
  mat:  new THREE.MeshNormalMaterial({side:THREE.DoubleSide}),
  scale: 1.5

}

LEVEL_2_PARAMS.stones = {


  geo:'logoGeo',

  init:function( geo  ){

    
    var geo = new THREE.IcosahedronGeometry(10 ,0 );
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
LEVEL_2_PARAMS.path = {

  notes:[ 'srNight1' ,  'srNight2' ,  'srNight3' ,  'srNight4'],
  pathDetail: 30,

  markerMat: new THREE.MeshNormalMaterial(),
  markerGeo: 'jelly',
  markerScale: 1.5,
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

    var geo = new THREE.BoxGeometry( .1 , .1 , .5 );
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
      guide.velocity.sub( dif.normalize().multiplyScalar( .05) );

      guide.position.add( guide.velocity );
     // guide.velocity.multiplyScalar( .9 );

      //guide.position.sub( dif.normalize().multiplyScalar( .1 ) );

      guide.lookAt( guide.position.clone().add( guide.velocity ) );

      if( guide.growing ){
        guide.lifeTime += .1 * guide.lifeSpeed;
      }else{
        guide.lifeTime -= .05 * guide.lifeSpeed;
      }

      if( guide.lifeTime <= 0 ){


        guide.position = this.closestMarker.position.clone();

        guide.velocity = new THREE.Vector3();
        guide.velocity.x = (Math.random() - .5 ) * 1;
        guide.velocity.y = (Math.random() - .5 ) * 1;
        guide.velocity.z = (Math.random() - .5 ) * 1;


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
 


LEVEL_2_PARAMS.newTypes = [

  {
    type: 'test3',
    note: 'clean3',
    loop: 'clean_sniperShivers',
    geo:  'logoGeo',
    numOf: 4,
    startScore: 0,
    color: new THREE.Color( 0x0000ff ),
    instantiate: function( level , dragonFish , note , loop , geo ){

         var m = new THREE.MeshPhongMaterial({color:this.color.getHex()});
      var head = new THREE.Mesh(
          new THREE.BoxGeometry( 1.6 , 1.6 ,1.6 ),
          m
      );



      var g = new THREE.IcosahedronGeometry(.3);
      var m = new THREE.MeshPhongMaterial({ color: this.color.getHex() });
      var m1 = new THREE.Mesh( g , m );

      var hooks = [];

      for( var i = 0; i < this.numOf; i++ ){

        var hook = new Hook( dragonFish , level , this.type , {
          
          head:head.clone(),
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
        hook.id = id;

        hooks.push( hook );

      }
  
      return hooks;
    }
  },
]


