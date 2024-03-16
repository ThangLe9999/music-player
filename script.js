const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const timeline = document.querySelector(".timeline");
const volumeSlider = document.querySelector(".volume-slider");

const title = document.querySelector(".title");
const songName = document.querySelector(".song-name");
const songImg = document.querySelector(".card__music--image img");
const container = document.querySelector(".container");

const facebook = document.querySelector("#facebook");
const tiktok = document.querySelector("#tiktok");
const youtube = document.querySelector("#youtube");

let currentSongIndex = 0;
let audio = new Audio();
let songs;

// "http://localhost:3000/songs"
fetch("songs.json")
  .then((response) => response.json())
  .then((data) => {
    songs = data;
    loadSong(currentSongIndex);
  });

function loadSong(index) {
  const song = songs[index];
  audio.src = song.audioSource;
  title.innerText = song.title;
  songName.innerText = song.songName;
  title.title = song.title;
  songImg.src = song.songImg;
  container.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${song.songImg}) no-repeat center/cover`;
  audio.addEventListener("loadedmetadata", () => {
    timeline.max = audio.duration;
  });
}

function playSong() {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
}

function pauseSong() {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
}

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function playPrevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function updateTime() {
  timeline.value = audio.currentTime;
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  document.querySelector(".time").innerText = formattedTime;
}

function updateVolume() {
  audio.volume = volumeSlider.value / 100;
}

playButton.addEventListener("click", playSong);
pauseButton.addEventListener("click", pauseSong);
prevButton.addEventListener("click", playPrevSong);
nextButton.addEventListener("click", playNextSong);
timeline.addEventListener("input", () => {
  audio.currentTime = timeline.value;
});
volumeSlider.addEventListener("input", updateVolume);
audio.addEventListener("timeupdate", updateTime);
audio.addEventListener("ended", playNextSong);

facebook.addEventListener("click", () => {
  window.open("https://www.facebook.com/LMThangLe");
});
tiktok.addEventListener("click", () => {
  window.open("https://www.tiktok.com/@thanglelelel");
});
youtube.addEventListener("click", () => {
  window.open("https://www.youtube.com/channel/UCVcLbPM5pV-Bs0-6WcdgVsQ");
});
