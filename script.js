const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");


// Songs
const songs = [
    {
        title: "Dream Pop Instrumental",
        artist: "Aster",
        src: "audio/song.mp3"
    },
    {
        title: "Dark Pop Instrumental",
        artist: "Aster",
        src: "audio/song2.mp3"
    }
];

let currentSong = 0;


// Load Song
function loadSong(song) {
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;

    progressBar.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
}


// Play / Pause
playButton.addEventListener("click", () => {

    if (audio.paused) {
        audio.play();
        playButton.textContent = "⏸";
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }

});


// Next Song
nextButton.addEventListener("click", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(songs[currentSong]);

    audio.play();
    playButton.textContent = "⏸";
});


// Previous Song
previousButton.addEventListener("click", () => {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(songs[currentSong]);

    audio.play();
    playButton.textContent = "⏸";
});


// Duration
audio.addEventListener("loadedmetadata", () => {

    progressBar.max = audio.duration;

    duration.textContent = formatTime(audio.duration);

});


// Progress
audio.addEventListener("timeupdate", () => {

    progressBar.value = audio.currentTime;

    currentTime.textContent = formatTime(audio.currentTime);

});


// Progress bar control
progressBar.addEventListener("input", () => {

    audio.currentTime = progressBar.value;

});


// Automatically go to next song
audio.addEventListener("ended", () => {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(songs[currentSong]);

    audio.play();
    playButton.textContent = "⏸";

});


// Format time
function formatTime(time) {

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}


loadSong(songs[currentSong]);