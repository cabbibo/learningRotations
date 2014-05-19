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
    f.subAttractDist = .001;
    for( var k = 0; k < 4; k++ ){


      var f1;
      if( k === 0 ){           
        f1 = new Fish( f ,  .9 , fishSkeleton.plume.child1 );
      }else{
        f1 = new Fish( column1[k-1] , .3, fishSkeleton.plume.child1 );
      }

      f1.sibRepelDiv = 100;
      f1.sibRepelDist = 1;
      f1.sibRepelPow = 3;
      //f1.sibRepelDist = 2;

      for( var l = 0; l <1; l++ ){
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


DragonFish.prototype.initBody = function(){

  
    var column = [];

    var dir = [
      [1 , 0],
      [-1 , 0],
      [0,1],
      [0,-1]
    ]
    for( var i = 0; i < 30; i++ ){

      var fish;

      if( i === 0 ){
        
        fish = new Fish( this.leader , .8 , fishSkeleton.flagella.spine );

      }else{

        fish = new Fish( column[i-1] , .8 , fishSkeleton.flagella.spine );

      }


      for( var j = 0; j < 3; j++ ){

        var subFish = new Fish( fish ,  .6, fishSkeleton.flagella.child1 );
        subFish.position.x = dir[j][0]
        subFish.position.y = dir[j][1]

        //subFish.position.x = Math.random()-.5 * 2;
        //subFish.position.y = Math.random()-.5 * 2;
        //subFish.position.z = Math.random()-.5 * 2;

        for( var k = 0; k < 2; k++ ){

          var subSubFish = new Fish( subFish , .4 ,fishSkeleton.flagella.child2);
          subSubFish.position.x = dir[k][0]
          subSubFish.position.y = dir[k][1]


          for( var l = 0; l < 2; l++ ){


            var subSubSubFish = new Fish( subSubFish , .5,fishSkeleton.flagella.child3 );
            subSubSubFish.position.x = dir[l][0]
            subSubSubFish.position.y = dir[l][1]

            subSubSubFish.sibRepelDiv = 100;
            subSubSubFish.sibRepelPow = 10;
            subSubSubFish.sibRepelDist = 100000;

          }
        }

      }
      column.push( fish );


   }

   this.spine = column;
   this.tail = column[ column.length - 1];

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
