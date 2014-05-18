
  var fishBody;


 
  function initFishBody(){

    /*

       Body

    */
    var geo = new THREE.TetrahedronGeometry( .2 , 0);
    var mat = new THREE.MeshNormalMaterial()

    var mesh = new THREE.Mesh( geo , mat );

       
    var geometry = geo;
    var mat = new THREE.MeshNormalMaterial();
    var newHead = new THREE.Mesh( geometry, mat );

    var geometry = new THREE.Geometry();
    mat = new THREE.MeshPhongMaterial({

      specular:0xffaaaa,
      emissive:0x001111,
      color:0x004499,
      shading: THREE.FlatShading
        

    });

    for( var i = 0; i < 14; i++ ){

      //var mesh = new THREE.Mesh( geo , mat );
         //mesh.position.x = i/1;

      var m = newHead.clone();
      m.rotation.y = Math.random() * Math.PI * 2;

      m.position.z = .4 - ( i / 14 );
      m.position.x =( Math.random()  - .5 ) * .3 * ( (i / 14));
      m.position.y =( Math.random()  - .5 ) * .3 *(  (i / 14));
      m.scale.multiplyScalar( 1 - (i / 14) );
      m.updateMatrix();

      geometry.merge( m.geometry , m.matrix );

    }
    
    
       mat = new THREE.MeshPhongMaterial({

      specular:0xffaaaa,
      emissive:0x001111,
      color:0x004499,
      shading: THREE.FlatShading
        

    });

 
    var newHead = new THREE.Mesh( geometry, mat );

    var mat = new THREE.MeshNormalMaterial();
    var mat = new THREE.MeshPhongMaterial({

      specular:0xffffaa,
      emissive:0x441111,
      color:0xaa9933,
      shading: THREE.FlatShading
        

    });
    var newHead1 = new THREE.Mesh( geometry, mat );

    var mat = new THREE.MeshPhongMaterial({

      specular:0xaaaaff,
      emissive:0x441111,
      color:0xaa4499,
      shading: THREE.FlatShading
        

    });
    var newHead2 = new THREE.Mesh( geometry, mat );

    
    var mat = new THREE.MeshPhongMaterial({

      specular:0xffffff,
      emissive:0x000000,
      color:0xcccccc,
      shading: THREE.FlatShading
        

    });

    //var mat = new THREE.MeshBasicMaterial({color:0x000000})


    var column = new THREE.Mesh( 
        new THREE.IcosahedronGeometry(.1 , 1),
        mat
    );



    return {
      shinyTri1:newHead,
      shinyTri2:newHead1,
      shinyTri3:newHead2,
      column: column
    };

  }


  function Fish( dom , level, meshNum ){

    
    this.dom  = dom;
    this.level = level;
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();

    this.springDistance = 2;
    this.timeToChange = 1000;
    this.springForce = .1;
    this.subAttractPow = 2;
    this.subAttractDiv = 1;

    this.connected = true;

    this.sub = [];
  
    if( !fishBody ){ fishBody = initFishBody(); }

    this.body = fishBody[meshNum].clone();
    this.body.position = this.position;

    scene.add( this.body );

    if( this.dom.sub ){
    
      this.dom.sub.push( this );

    }

    this.counter = 0;

    this.body.scale.multiplyScalar( level );
  }


  Fish.prototype.update = function(){

   // this.oPos.copy( this.pos );

   // this.velocity.set( 0 , 0 , 0 );
   //
   //

    this.counter ++;
    //this.timeToChange = Math.abs( 1000  * Math.sin( this.counter/10 ) );
    if( !this.dom.sub ){


      this.velocity.set( 0 , 0 , 0 );

      var dif = this.dom.position.clone().sub( this.position );

      var dis = dif.length();
      var dir = dif.normalize();

      this.velocity.add( dir.multiplyScalar( dis / 10 ) );

      this.position.add( this.velocity );

      //this.velocity.multiplyScalar( .96 );
    
      this.body.lookAt( this.position.clone().add( this.velocity ));

    }

    for( var i = 0; i < this.sub.length; i++ ){

      var c1 = this.sub[i];

      c1.velocity.set( 0 , 0 , 0 );

      for( var j = 0; j < this.sub.length; j++ ){

        if( i != j ){
          var c2 = this.sub[j];
          var dif = c1.position.clone().sub( c2.position );

          var l = dif.length();

          var c = (l-this.springDistance);
          var x = c * c * c/this.timeToChange;

          c1.velocity.sub( dif.normalize().multiplyScalar( x ) );


        }


      }

      var dif = this.position.clone().sub( c1.position );

      var dL = dif.length();
      var dN = dif.normalize();

      var sign = dL >= 0 ? 1 : -1;

      var pow = Math.pow( dL , this.subAttractPow );
      c1.velocity.add( dif.multiplyScalar( pow * sign / this.subAttractDiv ) ); 

      c1.position.add( c1.velocity );


  

      var d1 = c1.velocity.clone().normalize();
      var d2 = this.position.clone().sub( c1.position.clone() ).normalize();

      //d2.sub( d1.multiplyScalar( .01 ) );


      c1.body.lookAt( c1.position.clone().add(d2) );
      //c1.body.lookAt( this.position );
      //c1.body.lookAt( c1.position.clone().add( c1.velocity.clone().multiplyScalar( 10000 ) ) );

      c1.update();

    }


    //this.position.add( this.velocity );

    //this.velocity.multiplyScalar( .96 );
    
   // this.body.lookAt( this.position.clone().sub( this.velocity ));



  }

  Fish.prototype.connect = function(){
    this.connected = true;
  }

  Fish.prototype.disconnect = function(){
    this.connected = false;
  }
