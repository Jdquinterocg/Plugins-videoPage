import MediaPlayer from './MediaPlayer.js';
import Autoplay from './plugins/AutoPlay.js';
import AutoPause from './plugins/AutoPause.js';

//Selecciono el video y el botón
const video = document.querySelector("video");

const player = new MediaPlayer({
    el: video, 
    plugins: [
        new Autoplay(),
        new AutoPause()
    ],
});

const play = document.querySelector("#Play");
// Cuando haga click sobre el botón, reproducirá el video
play.onclick = () => player.action();

// Cuando haga click sobre el botón, le pondrá mute o se o quitará
const sound = document.querySelector("#Sound");
sound.onclick = () => {
    if (player.media.muted) {
      player.unmute();
    } else {
      player.mute();
    }
  };

if ('serviceWorker' in navigator){
  try {
    navigator.serviceWorker.register('/javascript-profesional/sw.js');
  } catch (error) {
    console.log(error.message)
  }
}