document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = new Audio();
    audioPlayer.preload = "metadata";

    const playButton = document.getElementById("play-song");
    const nextButton = document.getElementById("next-song");
    const prevButton = document.getElementById("prev-song");
    const songTitle = document.getElementById("song-title");

    if (!playButton || !nextButton || !prevButton || !songTitle) return;

    const playlist = [
        { title: "Teto the 31st!", file: "audio/song1.mp3" },
        { title: "Bethoven's Virus", file: "audio/song2.mp3" },
        { title: "Touhou Jazz ~ Hartmann's Youkai Girl", file: "audio/song3.mp3" }
    ];

    let currentSong = 0;
    let isPlaying = false;

    function updatePlayButton() {
        playButton.textContent = isPlaying ? "⏸" : "▶";
    }

    function loadSong(index) {
        const track = playlist[index];
        if (!track) return;

        audioPlayer.src = track.file;
        songTitle.textContent = track.title;
    }

    function playCurrentSong() {
        audioPlayer.play()
            .then(() => {
                isPlaying = true;
                updatePlayButton();
            })
            .catch(() => {
                isPlaying = false;
                updatePlayButton();
                console.warn("Audio could not play. Check file path or browser autoplay rules.");
            });
    }

    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            isPlaying = false;
            updatePlayButton();
        } else {
            playCurrentSong();
        }
    }

    function nextSong() {
        currentSong = (currentSong + 1) % playlist.length;
        loadSong(currentSong);
        if (isPlaying) {
            playCurrentSong();
        }
    }

    function previousSong() {
        currentSong = (currentSong - 1 + playlist.length) % playlist.length;
        loadSong(currentSong);
        if (isPlaying) {
            playCurrentSong();
        }
    }

    playButton.addEventListener("click", togglePlay);
    nextButton.addEventListener("click", nextSong);
    prevButton.addEventListener("click", previousSong);

    audioPlayer.addEventListener("ended", nextSong);

    loadSong(currentSong);
    updatePlayButton();
});