function initHooks(){

    var m = new THREE.MeshPhongMaterial({color:0xff9933, shading: THREE.FlatShading,blending:THREE.AdditiveBlending,transparent:true,map:audioController.texture,depthwrite:false});

    //var m = new THREE.MeshNormalMaterial();
    var g = new THREE.IcosahedronGeometry( .3,2 );

    var geo = new THREE.CubeGeometry( 1 , 1 , 1 );
    for( var i = 0; i < 40; i++ ){

      var mesh = new THREE.Mesh( logoGeo , m );
      mesh.scale.multiplyScalar( .08 );

     // var head = new THREE.Mesh( jellyGeo , m );

      //head.rotation.x = Math.PI/2;
     // head.scale.multiplyScalar( .9 );
      var headObj = new THREE.Object3D();
      //headObj.add( head );

      hook = new Hook( dragonFish , headObj , mesh );

      //scene.add( head );

    }

}
