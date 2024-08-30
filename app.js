let index = 0;
let songPlaying = false;

// DOM
let songName = document.querySelector("#song-name");
let songArtist = document.querySelector("#song-artist");
let songImg = document.querySelector(".song-img");
let playPauseIcon = document.querySelector("#play-icon");
let volumeBar = document.querySelector("#volume-bar");
let volumeMute = document.querySelector("#volume-icon");
let songLength = document.querySelector("#song-length");
let trackGif = document.querySelector("#trackgif");
let playListIcon = document.querySelector("#playlist");
let playlist = document.querySelector(".playlist");
let playListSong = document.querySelectorAll(".playlist-song");

// audio element creation
let track = document.createElement("audio");

// Arrays for songs
let songs = [
  {
    name: "Big Dawgs",
    path: "songs/bigdwags.mp3",
    image: "Images/img.jpeg",
    singer: "Hanumankind",
  },
  {
    name: "Sunflower",
    path: "songs/sunflower.mp3",
    image: "Images/img2.jpeg",
    singer: "Post Malone",
  },
  {
    name: "I wanna be yours",
    path: "songs/iwannabeyours.mp3",
    image: "Images/img3.jpeg",
    singer: "Arctic Monkeys",
  },
  {
    name: "Ecstacy",
    path: "songs/ecstacy.mp3",
    image: "Images/img4.jpeg",
    singer: "Idol",
  },
  {
    name: "Summertime Sadness",
    path: "songs/summertimesadness.mp3",
    image: "Images/img5.jpeg",
    singer: "Lana Del Rey",
  },
  {
    name: "Escapism",
    path: "songs/escapism.mp3",
    image: "Images/img6.jpeg",
    singer: "Raye",
  },
  {
    name: "The Night we met",
    path: "songs/nightwemwt.mp3",
    image: "Images/img7.jpg",
    singer: "Lord Huron",
  },
];

// Function to load all tracks
function loadTrack(index) {
  track.src = songs[index].path;
  songName.innerHTML = songs[index].name;
  songArtist.innerHTML = songs[index].singer;
  songImg.style = ` background-image: url("${songs[index].image}")`;
  volume();
  songDuration();
  setInterval((e) => {
    songLength.max = track.duration;
    songLength.value = track.currentTime;
  }, 1000);
  track.loop = true;
  track.load();
}

loadTrack(index);

// Function to Play Pause Songs
function playPause() {
  if (songPlaying == false) {
    playSong();
  } else {
    pauseSong();
  }
}

// Function to Play Song
function playSong() {
  track.play();
  songPlaying = true;
  playPauseIcon.src = "Images/pause.svg";
  trackGif.style.display = "block";
}

// Function to Pause Songs
function pauseSong() {
  track.pause();
  songPlaying = false;
  playPauseIcon.src = "Images/play.svg";
  trackGif.style.display = "none";
}
// Function to Play Previous Songs
function previous() {
  if (index >= 0) {
    index--;
    loadTrack(index);
    playPauseIcon.src = "Images/play.svg";
  } else {
    index = songs.length - 1;
    loadTrack(index);
    playPauseIcon.src = "Images/play.svg";
  }
}

// Function to Play next Songs
function next() {
  if (index < songs.length - 1) {
    index++;
    loadTrack(index);
    playPauseIcon.src = "Images/play.svg";
  } else {
    index = 0;
    loadTrack(index);
  }
}

// Function to change volume
function volume() {
  track.volume = volumeBar.value / 100;
  if (volumeBar.value == 0) {
    volumeMute.src = "Images/mute.svg";
  } else {
    volumeMute.src = "Images/volume.svg";
  }
}

// Function to chnage song duration
function songDuration() {
  track.currentTime = songLength.value;
}

// Playlist Section
playListIcon.addEventListener("click", () => {
  playlist.classList.toggle("playlist-live");
  if (playlist.classList.contains("playlist-live")) {
    playListIcon.src = "Images/cross.svg";
  } else {
    playListIcon.src = "Images/playlist.svg";
  }
});

// For Each loop in playlist songs
playListSong.forEach((song, index) => {
  song.addEventListener("click", () => {
    loadTrack(index);
    playSong();
    playlist.classList.remove("playlist-live");
    playListIcon.src = "Images/playlist.svg";
  });
});
