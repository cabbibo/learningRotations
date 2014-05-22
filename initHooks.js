function initHooks(){

    var m = new THREE.MeshPhongMaterial({color:0xfe4b03 , shading: THREE.FlatShading});

    //var m = new THREE.MeshNormalMaterial();
    var g = new THREE.IcosahedronGeometry( .3,2 );

    var geo = new THREE.CubeGeometry( 1 , 1 , 1 );
    for( var i = 0; i < 40; i++ ){

      var mesh = new THREE.Mesh( logoGeo , m );
      var obj = new THREE.Object3D();
      obj.add( mesh );

      obj.scale.multiplyScalar( .7 );

      var head = new THREE.Mesh( jellyGeo , m );

      head.rotation.x = Math.PI/2;
      head.scale.multiplyScalar( .9 );
      var headObj = new THREE.Object3D();
      headObj.add( head );

      hook = new Hook( dragonFish , headObj , obj );

      scene.add( head );

    }

}
