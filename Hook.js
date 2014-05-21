
  var hooks = [];

  function Hook( head , m1 , m2 , m3 , m4 ){

    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.velocity.x = (Math.random()-.5 ) * .1;
    this.velocity.y = (Math.random()-.5 ) * .1;
    this.velocity.z = (Math.random()-.5 ) * .1;
    this.head = head;

    this.head.position = this.position;
    
    
    hooks.push( this );

    this.reposition();

    this.vertabrae = dragonFish.createVertabrae( this.head , m1 , m2, m3,m4);

  }

  Hook.prototype.createVertabrae = function( mesh ){

    this.vertabrae = dragonFish.createVertabrae( this.head , mesh , materials );

  }


  // Getting Hooked
  Hook.prototype.onHooked = function(){

    console.log( this );

    this.explode();
    //debugger;

  }

  Hook.prototype.explode = function(){

    console.log( 'HEAD' );
    console.log( this.head );

    this.head.visible = false;
    scene.remove( this.head );

    

  }
  // Calling hook 1
  Hook.prototype.hook = function( fish ){

    fish.dom = this.head;


  }

  Hook.prototype.update = function(){


    this.force = new THREE.Vector3();
    
    for( var i = 0; i < hooks.length; i++ ){

      var h1 = hooks[i];

      var dist = this.position.clone().sub( h1.position );
      var l = dist.length();

      this.force.sub( dist.normalize().multiplyScalar(l*.0000001) ); //dist.normalize().multiplyScalar( .1/ l ));

      

    }

    var d = this.position.clone();

    this.force.sub( d.normalize().multiplyScalar( d.length() * .00001 ) );

    this.vertabrae.update();

  }

  Hook.prototype.update2 = function(){

    this.velocity.add( this.force );
    this.position.add( this.velocity );


    this.head.lookAt( this.position.clone().add( this.velocity ) );
    //this.velocity.multiplyScalar( .999 );


  }

  Hook.prototype.reposition = function(){

      this.position.x = (Math.random() -.5 )*100;
      this.position.y = (Math.random() -.5 )*100;
      this.position.z = (Math.random() -.5 )*100;

      this.head.rotation.x = Math.random() * Math.PI * 2;
      this.head.rotation.y = Math.random() * Math.PI * 2;
      this.head.rotation.z = Math.random() * Math.PI * 2;
  
  }
  
