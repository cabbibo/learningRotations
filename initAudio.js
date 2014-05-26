

var audioNotes = [];
var audioLoops = [];

var notes = [

  "audio/notes/1.mp3",
  "audio/notes/2.mp3",
  "audio/notes/3.mp3",
   "audio/notes/4.mp3",
  "audio/notes/5.mp3",
  "audio/notes/6.mp3",
   "audio/notes/7.mp3",

]


var loops = [

  "audio/loops/1.wav",
  "audio/loops/2.wav",
  "audio/loops/3.wav",
 // "audio/loops/4.mp3",
 // "audio/loops/5.mp3",
 // "audio/loops/6.mp3",
 // "audio/loops/7.mp3",


]
function initAudio(){

  NOTE = new LoadedAudio( audioController , "audio/notes/1.mp3" );
  for( var i = 0; i < notes.length; i++ ){

    var note = new LoadedAudio( audioController , notes[i], {
      
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
