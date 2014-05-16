  
  function RiggedSkeleton( controller , params ){

    var params = params || {};

    this.size = params.size || 1;

    this.controller   = controller;
    this.hand         = new THREE.Object3D();
    this.fingers      = this.createFingers();

    /*
     * IMPORTANT: Basis vectors are columns
     */
    this.leapBasis = new THREE.Matrix4(
        1  , 0  , 0 , 0,
        0  , 1  , 0 , 0,
        0  , 0  , 1 , 0, 
        0  , 0  , 0 , 1
    );
    /*THREE.Matrix4 applyRelativeRotation(Matrix4 myBasis, Matrix4 leapRelativeRotation) {

    }*/

    this.baseMatrix = new THREE.Matrix4(
        0  , 0  , 1 , 0,
        0  , -1 , 0 , 0,
        -1  , 0  , 0 , 0, 
        0  , 0  , 0 , 1
    );



    
    /*this.baseMatrix = new THREE.Matrix4(
        1  , 0  , 0 , 0,
        0  , 1  , 0 , 0,
        0  , 0  , 1 , 0, 
        0  , 0  , 0 , 1
    );*/

    this.tmpMatrix    = new THREE.Matrix4();
    this.tmpQuat      = new THREE.Quaternion();
   


  }


  //1. draw each piece of a right hand using global terms
  //2. do the same thing but use relative terms.

  RiggedSkeleton.prototype.applyRelativeRotation = function( myBasis , leapRelativeRotation ){


  }

  RiggedSkeleton.prototype.addToScene = function( scene ){

    scene.add( this.hand );

  }

 RiggedSkeleton.prototype.removeFromScene = function( scene ){

    scene.remove( this.hand );

  }

  RiggedSkeleton.prototype.createFingers = function(){


    var fingers = [];

    for( var i = 0; i < 5; i++ ){

      var finger = this.createFinger();
      fingers.push( finger );

    }

    return fingers;


  }

  RiggedSkeleton.prototype.createFinger = function(){

    var metacarpal    = new THREE.Object3D();
    var proximal      = new THREE.Object3D();
    var intermediate  = new THREE.Object3D();
    var distal        = new THREE.Object3D();
    var tip           = new THREE.Object3D();

    this.hand.add( metacarpal );
    metacarpal.add( proximal );
    proximal.add( intermediate );
    intermediate.add( distal );
    distal.add( tip );

    var finger = {

      m:metacarpal,
      p:proximal,
      i:intermediate,
      d:distal,
      t:tip

    }

    return finger;

  }

  RiggedSkeleton.prototype.addJointMesh = function( mesh ){

    for( var i = 0; i < this.fingers.length; i++ ){

      var finger = this.fingers[i];

      finger.m.add( mesh.clone() );
      finger.p.add( mesh.clone() );
      finger.i.add( mesh.clone() );
      finger.d.add( mesh.clone() );
      finger.t.add( mesh.clone() );


    }

  }


  RiggedSkeleton.prototype.addHandMesh = function( mesh ){

    this.hand.add( mesh.clone() );

  }

  RiggedSkeleton.prototype.updateFingerRig = function( frameHand , frameFinger , ourFinger ){

    var m = frameFinger.bones[0];
    var p = frameFinger.bones[1];
    var i = frameFinger.bones[2];
    var d = frameFinger.bones[3];

    ourFinger.m.position = this.threeDif( frameHand.palmPosition , m.prevJoint );

    var tmp = ourFinger.m.position.length();
    var quat = new THREE.Quaternion();
    quat.setFromRotationMatrix( this.hand.matrix.clone().transpose() );
    ourFinger.m.position.applyQuaternion( quat ); 

    ourFinger.p.position.z = -m.length;
    ourFinger.i.position.z = -p.length;
    ourFinger.d.position.z = -i.length;
    ourFinger.t.position.z = -d.length;


    //ourFinger.m.rotation.setFromQuaternion( quat );
/*
    ourFinger.m.absoluteMatrix = this.matrixFromBasis( m.basis );

    ourFinger.p.absoluteMatrix = this.matrixFromBasis( p.basis );
    ourFinger.p.relativeMatrix = this.relativeRotationMatrix( ourFinger.p.absoluteMatrix , ourFinger.m.absoluteMatrix );


    ourFinger.p.rotation.setFromRotationMatrix( ourFinger.p.relativeMatrix );
    

    ourFinger.i.absoluteMatrix = this.matrixFromBasis( i.basis );
    ourFinger.i.relativeMatrix = this.relativeRotationMatrix( ourFinger.i.absoluteMatrix , ourFinger.p.absoluteMatrix);

    ourFinger.i.rotation.setFromRotationMatrix( ourFinger.i.relativeMatrix );


    ourFinger.d.absoluteMatrix = this.matrixFromBasis( d.basis );
    ourFinger.d.relativeMatrix = this.relativeRotationMatrix( ourFinger.d.absoluteMatrix , ourFinger.i.absoluteMatrix );
    ourFinger.d.rotation.setFromRotationMatrix( ourFinger.i.relativeMatrix );*/

  }


  RiggedSkeleton.prototype.relativeToHand = function( matrix ){

    var m = this.relativeRotationMatrix( matrix , this.hand.matrix );

    return m;

  }

  RiggedSkeleton.prototype.update = function(){

    this.frame = this.controller.frame();

    if( this.frame.hands[0] ){

      //console.log( this.frame );
      var frameHand = this.frame.hands[0];

      var frameFingers = this.orderFingers( frameHand );

      var r = frameHand._rotation;
    
      var handBasis = [
        [ r[0] , r[3] , r[6] ],
        [ r[1] , r[4] , r[7] ],
        [ r[2] , r[5] , r[8] ]
      ];

      var rotationMatrix  = this.rotationMatrixFromVectors( frameHand.direction, frameHand.palmNormal );
      var rotationMatrix  = this.matrixFromBasis( handBasis );

      rotationMatrix.multiply( this.baseMatrix.clone().transpose() );
      this.hand.rotation.setFromRotationMatrix( rotationMatrix );


      for( var i = 0; i < this.fingers.length; i++ ){
      //for( var i = 1; i < 2; i++ ){

        var frameFinger = frameFingers[i];
        var finger      = this.fingers[i];

        this.updateFingerRig( frameHand ,  frameFinger , finger );


      }

    }

  }


  RiggedSkeleton.prototype.rotFromBasis = function( rotation , b , oB ){

   
    var m1 = this.matrixFromBasis( b );
    var m2 = this.matrixFromBasis( oB );

    var mat = this.relativeRotationMatrix( m1 , m2 );

    rotation.setFromRotationMatrix( mat );

  }

  RiggedSkeleton.prototype.matrixFromBasis = function( b ){
   
    var m = new THREE.Matrix4(

      b[0][0] , b[1][0] , b[2][0] , 0 ,
      b[0][1] , b[1][1] , b[2][1] , 0 ,
      b[0][2] , b[1][2] , b[2][2] , 0 ,
           0  ,      0  ,      0  , 1

    );

    return m;

  }

  RiggedSkeleton.prototype.relativeRotationMatrix = function( m1 , m2 ){
 
    var m = m1.clone();

    m.multiply( m2.clone().transpose() );

    return m;

  
  }

  RiggedSkeleton.prototype.threeDif = function( pos1 , pos2 ){

    var p1 = this.leapToScene( pos1 );
    var p2 = this.leapToScene( pos2 );

    return p2.sub( p1 );

  }

  RiggedSkeleton.prototype.leapToScene = function( position ){

    var p = this.frame.interactionBox.normalizePoint( position );

    var size = this.frame.interactionBox.size;

    //console.log( size );
    p[0] -= .5;
    p[1] -= .5;
    p[2] -= .5;

    p[0] *= size[0];
    p[1] *= size[1];
    p[2] *= size[2];

    var pos = new THREE.Vector3().fromArray( p );

    return pos;

  }


  RiggedSkeleton.prototype.orderFingers = function( hand ){

    var fingers = hand.fingers.sort( function( f1 , f2 ){ 
      return f1.type < f2.type ? -1 : 1 
    });

    return fingers

  }

  RiggedSkeleton.prototype.rotationMatrixFromVectors = function( vec1 , vec2 ){

    var a1 = new THREE.Vector3().fromArray( vec1 );
    var a2 = new THREE.Vector3().fromArray( vec2 );
    var a3 = a1.clone().cross( a2 );

    var matrix = new THREE.Matrix4( 
      a1.x , a2.x , a3.x, 0,
      a1.y , a2.y , a3.y, 0,
      a1.z , a2.z , a3.z, 0,
      0    , 0    , 0   , 1
    )

    return matrix; 

  }

