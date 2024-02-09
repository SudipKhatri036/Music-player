const playBtn = document.getElementById("play");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const musicTitle = document.getElementById("title");
const musicArtist = document.getElementById("artist");
const musicImg = document.querySelector("img");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let isPlaying = false;

const songs = [
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
  {
    name: "jahanrahoon",
    displayName: "Mein Jahan Rahoon",
    artist: "Rahat Fateh Ali",
  },
  {
    name: "orepiyare",
    displayName: "O Re Piya Re",
    artist: "Javed Ali",
  },
  {
    name: "terijhukinajar",
    displayName: "Teri Jhuki Najar",
    artist: "Pritam, Shafqat Amanat Ali",
  },
];

// Play Function
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  music.play();
}

// Pause Function
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  music.pause();
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Load Song
function loadSong(song) {
  musicImg.src = `./img/${song.name}.jpg`;
  music.src = `./music/${song.name}.mp3`;
  musicTitle.textContent = song.displayName;
  musicArtist.textContent = song.artist;
}

let songIndex = 0;

// Prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
  console.log(songIndex);
}

// Next Song function
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Load first song
loadSong(songs[songIndex]);

function updateProgressBar(e) {
  if (isPlaying) {
    const { currentTime, duration } = e.srcElement;
    // Update Progress Bar Widht
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Updating Duration time
    let durationMinutes = Math.round(duration / 60);
    let durationSeconds = Math.round(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delaying switching time to avoid NAN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Update currentTime
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}
// Event listener
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
