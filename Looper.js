
  function Looper( controller ,  timer , params ){

    this.controller = controller;
    this.params = _.defaults( params || {}, {
        
      beatsPerMinute:     120,
      beatsPerMeasure:      4,
      beatType:             4,
      measuresPerLoop:      4, // number of measures in loop

    });

    this.timer = timer;

    this.beatsPerMinute = this.params.beatsPerMinute;
    this.bpm = this.beatsPerMinute;

    this.beatsPerSecond = this.bpm / 60;
    this.bps = this.beatsPerSecond;

    this.secondsPerBeat = 1 / this.bps;
    this.spb = this.secondsPerBeat;

    this.beatsPerMeasure = this.params.beatsPerMeasure;

    this.measureLength = this.spb * this.beatsPerMeasure;

    this.measuresPerLoop = this.params.measuresPerLoop;
    this.mpl = this.measuresPerLoop;

    this.loopLength    = this.measureLength * this.mpl;

    this.measure            = 0;
    this.oMeasure           = 0;

    this.timeInMeasure      = 0;
    this.measureStartTime   = 0;
    this.percentOfMeasure   = 0;
    this.oPercentOfMeasure  = 0;   

    this.timeInLoop         = 0;
    this.loopStartTime      = 0;
    this.percentOfLoop      = 0;
    this.oPercentOfLoop     = 0;

    this.loop = 0;
    this.oLoop = 0;

    this.hits = [];

    this.onNextLoopArray    = [];
    this.onNextMeasureArray = [];

    this.controller.addToUpdateArray( this._update.bind( this ) );


  }

  Looper.prototype._update = function(){

    this.updateTime();
    this.checkHits();

    this.update();
  
  }

  Looper.prototype.update = function(){};


  Looper.prototype.tweenGain = function( gainNode , newValue ){

    var percentTilEnd = 1 - this.percentOfLoop;
    var timeTilEnd = percentTilEnd * this.loopLength;

    console.log( timeTilEnd );

    var endValue = newValue * .6;
    var  i = { gain: gainNode.gain.value }
    var  t = { gain: endValue }
  
    var tween = new TWEEN.Tween( i ).to( t , timeTilEnd * 1000 );

    tween.gainNode = gainNode;
    tween.newValue = newValue;
    tween.endValue = endValue
  
    tween.onUpdate(function( ){

      tween.gainNode.gain.value = i.gain;
      if( Math.abs( i.gain - endValue ) < .01 ){

        console.log( 'END HIT' );
        tween.gainNode.gain.value = newValue

      }  
    }.bind(tween));


    tween.start();

  }

  Looper.prototype.onNextMeasure = function( callback ){

    this.onNextMeasureArray.push( callback )

  }

  Looper.prototype.onNextLoop = function( callback ){

    this.onNextLoopArray.push( callback )

  }



  Looper.prototype.updateTime = function(){
    
    this.newMeasure = false;

    this.oPercentOfMeasure = this.percentOfMeasure;

    this.timeInMeasure = this.timer.value - this.measureStartTime;
    this.percentOfMeasure = this.timeInMeasure / this.measureLength;


    this.timeInLoop    = this.timer.value - this.loopStartTime;
    this.percentOfLoop = this.timeInLoop / this.loopLength; 


    if( this.percentOfLoop >= 1.0 ){
      this._onNewLoop();
    }

    if(  this.percentOfMeasure >= 1.0 ){
      this._onNewMeasure();
    }


  }

  Looper.prototype._onNewLoop = function(){

    console.log( 'NEW LOOP' );

    this.oLoop = this.loop;
    this.loop += 1;
    this.loopStartTime = this.loop * this.loopLength;

    this.newLoop = true;

    for( var i = 0; i < this.onNextLoopArray.length; i++ ){

      this.onNextLoopArray[i]();

    }

    this.onNextLoopArray = [];
    this.onNewLoop();


  }

  Looper.prototype.onNewLoop = function(){}

  Looper.prototype._onNewMeasure = function(){

    console.log( 'NEW MEASURE' );
    this.oMeasure = this.measure;
    this.measure +=1;
    this.measureStartTime = this.measure * this.measureLength;

    this.newMeasure = true;


    for( var i = 0; i < this.onNextMeasureArray.length; i++ ){
      this.onNextMeasureArray[i]();
    }

    this.onNextMeasureArray = [];
    
    this.onNewMeasure();


    //this.measureInLoop = 

  }


  Looper.prototype.onNewMeasure = function(){}

  Looper.prototype.addHit = function( callback , params ){

    var hit = _.defaults( params || {}, {
      
      callback:           callback,
     
      percents:        [ .0 , .25 , .50 , .75 ],
      measureFrequency:   1,
      measureOffset:      0,
      duration:           [ 0 , 1000000000 ],
      
    });


    this.hits.push( hit );

  }

  Looper.prototype.addSequence = function( callback , sequenceLength , hitArray , duration ){

    for( var i = 0; i < hitArray.length; i++ ){

      if( !duration ) duration = [0 , 10000000000 ];
      this.addHit( callback , {

        measureFrequency: sequenceLength,
        measureOffset:    hitArray[i][0],
        percents:         hitArray[i][1],
        duration:         duration

      });

    }



  }

  Looper.prototype.checkHits = function(){

    for( var i = 0; i < this.hits.length; i++ ){

      var hit = this.hits[i];

      var t = this.audio.time;

      // only check if within the duration of hit
      if( t >= hit.duration[0] && t <= hit.duration[1] ){

        // only check if on proper measure
        if( this.measure % hit.measureFrequency == hit.measureOffset ){

          for( var j = 0; j < hit.percents.length; j ++ ){

            var p = hit.percents[j];

            if( 
              this.percentOfMeasure  >= p && 
              this.oPercentOfMeasure < p 
            ){

              
              hit.callback();

            // In this case the percentage is at 0
            }else if( p == 0 && this.newMeasure ){

              hit.callback();

            }

          }

        }

      }

    }


  };

