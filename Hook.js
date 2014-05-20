
  var hooks = [];

  function Hook( mesh ){

    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.velocity.x = (Math.random()-.5 ) * .5;
    this.velocity.y = (Math.random()-.5 ) * .5;
    this.velocity.z = (Math.random()-.5 ) * .5;
    this.mesh = mesh;

    this.mesh.position = this.position;
    hooks.push( this );

    this.reposition();

    this.vertabrae = dragonFish.createVertabrae( this.mesh );



  }

  Hook.prototype.update = function(){


    this.force = new THREE.Vector3();
    
    for( var i = 0; i < hooks.length; i++ ){

      var h1 = hooks[i];

      var dist = this.position.clone().sub( h1.position );
      var l = dist.length();

      this.force.sub( dist.normalize().multiplyScalar(l*.000001) ); //dist.normalize().multiplyScalar( .1/ l ));

      

    }

    var d = this.position.clone();

    this.force.sub( d.normalize().multiplyScalar( d.length() * .0001 ) );

    this.vertabrae.update();

  }

  Hook.prototype.update2 = function(){

    this.velocity.add( this.force );
    this.position.add( this.velocity );


    this.mesh.lookAt( this.position.clone().add( this.velocity ) );
    //this.velocity.multiplyScalar( .999 );


  }

  Hook.prototype.reposition = function(){

      this.position.x = (Math.random() -.5 )*100;
      this.position.y = (Math.random() -.5 )*100;
      this.position.z = (Math.random() -.5 )*100;
/*
      this.mesh.rotation.x = Math.random() * Math.PI * 2;
      this.mesh.rotation.y = Math.random() * Math.PI * 2;
      this.mesh.rotation.z = Math.random() * Math.PI * 2;*/
  }
  
