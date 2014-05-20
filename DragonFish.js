function DragonFish( bait , head , plume , flagella  ){

  this.bait = bait;


  
  /*

     HEAD

  */
 // this.head = this.createHead( head );
 // this.plume    = this.createPlume( plume );
 // this.flagella = this.createFlagella( flagella );
  

  this.leader = new Fish(bait,1, fishSkeleton.head.spine );

  this.spine = [];
  this.tail;
  
  /*
  
     PLUME

  */
  this.initPlume();

  this.initBody();


}

DragonFish.prototype.update = function(){


  for( var i= 0; i< this.spine.length; i++ ){

    var c1 = this.spine[i];

    var dToCam = c1.position.clone().sub( camera.position );
    var lToCam = dToCam.length();


    //if( lToCam < 3 ){


      c1.velocity.set( 0 , 0,0 );
      c1.velocity.add( dToCam.multiplyScalar( 2 / (lToCam *lToCam*lToCam*lToCam ) ) );
      c1.position.add( c1.velocity );

    //}
  }

    this.leader.update();


}

DragonFish.prototype.initPlume = function(){

  for( var j = 0; j < 4; j++ ){

    var f = new Fish( this.leader , 1.9 , fishSkeleton.plume.spine );

    var column1 = [];

    f.timeToChange = 1;
    f.subAttractDist = .4;
   // f.sibRepelDist = 2;
   // f.subAttractDiv = 1000000;
   // f.subAttractPow = 10;
    f.subAttractDist = .1;
    for( var k = 0; k < 1; k++ ){


      var f1;
      if( k === 0 ){           
        f1 = new Fish( f ,  .9 , fishSkeleton.plume.child1 );
      }else{
        f1 = new Fish( column1[k-1] , .3, fishSkeleton.plume.child1 );
      }

      f1.sibRepelDiv = 40;
      f1.sibRepelDist = 2;
      f1.sibRepelPow = 1;
      //f1.sibRepelDist = 2;

      for( var l = 0; l <10; l++ ){
        var f2 = new Fish( f1 , .8 , fishSkeleton.plume.child2);
        //f2.springDistance = 3;
        //
        //f1.sibRepelDist = 2;


        //f2.timeToChange = 100000;
        for( var m = 0; m < 10; m++ ){
          var f3 = new Fish( f2 , .4 , fishSkeleton.plume.spine );
          f3.sibRepelDist = 2;

        }

      }

      column1.push( f1 );

    }

  }

}


DragonFish.prototype.addPrecreatedVertabrae = function( vertabrae ){

  vertabrae.dom = this.spine[ this.spine.length - 1 ];
  vertabrae.dom.sub.push( vertabrae );
  this.spine.push( vertabrae );

}

DragonFish.prototype.createVertabrae = function( dom , s1 , s2 , s3 ){

  var s1 = s1 || 3;
  var s2 = s2 || 2;
  var s3 = s3 || 3;

  var vertabrae = new Fish( dom , .8 , fishSkeleton.flagella.spine );

  vertabrae.position.copy( dom.position );

  for( var i = 0; i < s1; i++ ){
    
    var child1 = new Fish( vertabrae , .6 , fishSkeleton.flagella.child1 );
    child1.position.copy( vertabrae.position );

    for( var j = 0;  j < s2; j++ ){

      var child2 = new Fish( child1 , .4 ,fishSkeleton.flagella.child2);
      child2.position.copy( vertabrae.position );

      for( var k = 0; k < s3; k++ ){

        var fF = fishSkeleton.flagella.child3;
        var child3 = new Fish( child2 , .5, fF );
        child3.position.copy( vertabrae.position );

      }

    }

  }


  return vertabrae


}
DragonFish.prototype.addVertabrae = function( subNum1 , subNum2 , subNum3 ){

  var s1 = subNum1 || 3;
  var s2 = subNum2 || 2;
  var s3 = subNum3 || 3;

  var id = this.spine.length;
  console.log( id );

  var dom = this.spine[ id - 1 ];

  var v = this.createVertabrae( dom , s1 , s2 , s3 );
 
  this.spine.push( v );

  //this.tail = this;



}


DragonFish.prototype.initBody = function(){

  
    var column = [];

    var dir = [
      [1 , 0],
      [-1 , 0],
      [0,1],
      [0,-1]
    ];

    this.spine.push( this.leader );

    for( var i = 0; i < 3; i++ ){

      this.addVertabrae();
    
    }
        
   this.tail = this.spine[ this.spine.length - 1 ];

}
/*
 

TODO:
DragonFish.prototype.column( dom , size , sub ){

  var fish = [];

  for( var i = 0; i < size; i++ ){

    var f;
    if( i == 0 ){
      f = new Fish( dom , 
    }


  }

}

*/
