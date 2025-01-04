const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const volumeSlider = document.getElementById("volume-slider");
const playlistItems = document.querySelectorAll(".playlist-item");
const nowPlaying = document.getElementById("now-playing");
const albumCover = document.getElementById("album-cover");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");

let currentSongIndex = 0;

// Play/Pause Toggle
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "⏯";
  }
});

// Update Volume
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

// Play Specific Song from Playlist
playlistItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(item);
    audio.play();
    playPauseBtn.textContent = "⏸";
  });
});

// Load Song
function loadSong(item) {
  const song = item.getAttribute("data-song");
  const artist = item.getAttribute("data-artist");
  const cover = item.getAttribute("data-cover");
  const bgColor = item.getAttribute("data-bg");

  audio.src = song;
  songTitle.textContent = song.split(".")[0];
  artistName.textContent = artist;
  albumCover.src = cover;
  nowPlaying.style.setProperty("--bg-color", bgColor);
}

// Navigate Songs
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
  loadSong(playlistItems[currentSongIndex]);
  audio.play();
  playPauseBtn.textContent = "⏸";
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
  loadSong(playlistItems[currentSongIndex]);
  audio.play();
  playPauseBtn.textContent = "⏸";
});

// Load initial song
loadSong(playlistItems[currentSongIndex]);
