/*=====MUSIC=====*/

const audioPlayer = new Audio("audio/song1.mp3");

const playButton = document.getElementById("play-song")
const nextButton = document.getElementById("next-song")
const prevButton = document.getElementById("prev-song")
const songTitle = document.getElementById("song-song")

const playlist = [
    {
        title: "Lo-Fi Track 1",
        file: "audio/song1.mp3"
    },
    {
        title: "Lo-Fi Track 2",
        file: "audio/song2.mp3"
    },
    {
        title: "Lo-Fi Track 3",
        file: "audio/song3.mp3"
    }
];

let currentSong = 0;
let isPlaying = false;

function loadSong(index){
    audioPlayer.src = playlist[index].file;
    songTitle.textContent = playlist[index].title;
}

function playPause(){

    if(isPlaying){
        audioPlayer.pause();
        playButton.textContent = "▶";
    }
    else {
        audioPlayer.play();
        playButton.textContent="⏸"
    }

    isPlaying = !isPlaying;
}

function nextSong(){
    currentSong++;
    if(currentSong >= playlist.length){
        currentSong = 0;
    }

    loadSong(currentSong);

    if(isPlaying){
        audioPlayer.play();
    }
}

function previousSong(){
    currentSong--;
    if(currentSong < 0){
        currentSong = playlist.length - 1;
    }

    loadSong(currentSong);

    if(isPlaying){
        audioPlayer.play();
    }
}

playButton.addEventListener("click", playPause);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", previousSong);

loadSong(currentSong);