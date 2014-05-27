

var audioNotes = [];
var audioLoops = [];

var notes = [

  "audio/notes/clean1.wav",
  "audio/notes/clean2.wav",
  "audio/notes/clean3.wav",
  "audio/notes/clean4.wav",
  "audio/notes/clean5.wav",
  "audio/notes/clean6.wav",
  //"audio/notes/clean7.mp3",

]


var loops = [

  "audio/loops/clean_heavyBeat.wav",
  "audio/loops/clean_shuffleClick.wav",
  "audio/loops/clean_darkFast.wav",
  "audio/loops/clean_sniperSnare.wav",
  "audio/loops/clean_sniperShivers.wav",
  "audio/loops/clean_sniperDetail1.wav",
  "audio/loops/clean_sniperDetail2.wav",
  "audio/loops/clean_sniperGlory1.wav",


]
function initAudio(){

  NOTE = new LoadedAudio( audioController , "audio/notes/1.mp3" );
  for( var i = 0; i < notes.length; i++ ){

    var note = new LoadedAudio( audioController , notes[i], {
      looping:false 
    });

    audioController.notes.push( note );
    
    audioNotes.push( note );

    NOTE = note;

  }

  for( var i = 0; i < loops.length; i++ ){

    var loop = new LoadedAudio( audioController , loops[i] ,{
      looping: true
    });

    audioController.loops.push( loop );


    audioLoops.push( loop );

  }


}
