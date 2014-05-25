
var colors = [ 0xc0ffee, 0xfecc88 , 0xaa77ff ]

function initHooks(){
    for( var i = 0; i < 40; i++ ){

      var colorHex =  colors[ Math.floor( Math.random() * colors.length )];
      var m = new THREE.MeshBasicMaterial({
        color:colorHex,
        shading: THREE.FlatShading,
        blending:THREE.AdditiveBlending,
        transparent:true,
        map:audioController.texture,
        depthwrite:false
      });


      var mesh = new THREE.Mesh( logoGeo , m );
      mesh.scale.multiplyScalar( .08 );

     // var head = new THREE.Mesh( jellyGeo , m );

      //head.rotation.x = Math.PI/2;
     // head.scale.multiplyScalar( .9 );
      var headObj = new THREE.Object3D();
      //headObj.add( head );
    
      var color = new THREE.Color( colorHex );

      var audio = 'a'; // TODO
      hook = new Hook( dragonFish , color , audio ,  headObj , mesh );

      //scene.add( head );

    }

}
