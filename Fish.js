

  function Fish( dom , level, mesh ){

    
    this.dom  = dom;
    this.level = level;
    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();


    // API
    this.springDistance = 2;
    this.timeToChange = 1000;
    this.springForce = .1;
    this.subAttractPow = 1;
    this.subAttractDiv = 2;
    this.subAttractDist = .1;

    this.connected = true;

    this.sub = [];
  
    this.body = mesh.clone();
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

          var sign = c >= 0 ? 1 : -1;
          var x = sign * Math.abs(Math.pow( c , 3 ))/this.timeToChange;

          c1.velocity.sub( dif.normalize().multiplyScalar( x ) );


        }


      }

      var dif = this.position.clone().sub( c1.position );

      var dL = dif.length();
      var dN = dif.normalize();

      var dist = dL - this.subAttractDist;
      var sign = dist >= 0 ? 1 : -1;

      var pow = Math.pow( dist , this.subAttractPow );
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
