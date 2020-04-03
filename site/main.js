$( document ).ready(function() {
  $.get("/getSongs", function(data) {
    var songs = JSON.parse(data)["songs"];
    for (i = 0; i < songs.length; i++) {

      var sound = document.createElement('audio');
      sound.id = "audio-player";
      sound.controls = 'controls';
      sound.src = '/songs/'+ songs[i];
      sound.type = 'audio/mp3';
      document.getElementById('songList').appendChild(sound);
      var space = document.createElement('br');
      document.getElementById('songList').appendChild(space);
      }
   });
});
