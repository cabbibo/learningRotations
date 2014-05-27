
  var hooks = [];

  var hooksConnected = 0;

  document.getElementById( 'hookCount' ).innerHTML = hooksConnected;
  
  function Hook( dragonFish , params ){
    
    this.params = _.defaults( params || {} , {
    
      color: new THREE.Color( 0xffffff ),
      note: 'clean1.wav',
      loop: 'clean_heavyBeat.wav',
      head: fishSkeleton.flagella.spine,
      m1:   fishSkeleton.flagella.child1,
      m2:   fishSkeleton.flagella.child2,
      m3:   fishSkeleton.flagella.child3,
      m4:   fishSkeleton.flagella.child1,
      startScore: 0,
      repelDistance: 3,
    
    });
    
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    
    /*this.velocity.x = (Math.random()-.5 ) * .1;
    this.velocity.y = (Math.random()-.5 ) * .1;
    this.velocity.z = (Math.random()-.5 ) * .1;*/
    
    this.head = this.params.head;

    this.maxSpeed = .5;

    this.color = this.params.color;
    
    this.note  = this.params.note;
    this.loop = this.params.loop;

    this.head.position = this.position;
   
    
    this.dragonFish = dragonFish;
    
    hooks.push( this );

    this.reposition();

    this.vertabrae = this.dragonFish.createVertabrae( 
      this.head , 
      this.params.m1 , 
      this.params.m2, 
      this.params.m3,
      this.params.m4
    );

  }
    document.getElementById( 'hookCount' ).innerHTML = hooksConnected;

  Hook.prototype.createVertabrae = function( mesh ){

    this.vertabrae = this.dragonFish.createVertabrae( this.head , mesh , materials );

  }


  Hook.prototype.activate = function(){

    scene.add( this.head );
    this.active = true;

  }


  // Getting Hooked
  Hook.prototype.onHooked = function(){

    hooksConnected ++;

    document.getElementById( 'hookCount' ).innerHTML = hooksConnected;
   // console.log( this );

    this.explode();
    //debugger;

  }

  Hook.prototype.explode = function(){

    console.log( this.note );
    this.note.play();
    this.loop.gain.gain.value += .1;
    explosion.renderer.simulationUniforms.justHit.value = 1.;

    console.log( explosion.renderer );
    var c = new THREE.Color();
    c.r = Math.random();
    c.g = Math.random();
    c.b = Math.random();
    
    changeColor( this.color );

  }

  Hook.prototype.updateForces = function(){


    this.force = new THREE.Vector3();
    
    for( var i = 0; i < hooks.length; i++ ){

      var h1 = hooks[i];

      var dist = this.position.clone().sub( h1.position );
      var l = dist.length();

      this.force.sub( dist.normalize().multiplyScalar(l*.0000001) ); //dist.normalize().multiplyScalar( .1/ l ));

    }

    var d = this.position.clone();

    this.force.sub( d.normalize().multiplyScalar( d.length() * d.length() * .0001 ) );



    // Runs from dragonfish
    var dif = this.position.clone().sub( this.dragonFish.leader.position );
    var l = dif.length();

    if( l < this.params.repelDistance ){

      var s = this.dragonFish.leader.velocity.length();
      this.force.add( dif.normalize().multiplyScalar( .008 * s * ( 10/l)) ) ;
    }

    this.vertabrae.update();

  }

  Hook.prototype.updatePosition = function(){

     var aveVol = this.loop.averageVolume / 128;

    this.velocity.add( this.force );//.clone().multiplyScalar( aveVol));
    
    if( this.velocity.length() >= this.maxSpeed ){

      console.log( 'maxHit' );
      this.velocity.normalize().multiplyScalar( this.maxSpeed );

    }
    
    this.position.add( this.velocity.clone().multiplyScalar( aveVol) );



    this.head.lookAt( this.position.clone().add( this.velocity ) );
    //this.velocity.multiplyScalar( .999 );


  }

  Hook.prototype.checkForCollision = function( size , index ){

    var dif = this.position.clone().sub( this.dragonFish.leader.position );

    if( dif.length() <= size ){

      this.dragonFish.addPrecreatedVertabrae( this.vertabrae );

      this.onHooked();
     
      hooks.splice( index , 1 );

    }


  }
  Hook.prototype.reposition = function(){

      this.position.x = (Math.random() -.5 )*100;
      this.position.y = (Math.random() -.5 )*100;
      this.position.z = (Math.random() -.5 )*100;

      this.head.rotation.x = Math.random() * Math.PI * 2;
      this.head.rotation.y = Math.random() * Math.PI * 2;
      this.head.rotation.z = Math.random() * Math.PI * 2;
  
  }
  
