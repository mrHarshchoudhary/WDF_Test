// Select DOM elements
const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progress");
const timeDisplay = document.getElementById("timeDisplay");
const volumeControl = document.getElementById("volumeControl");
const speedControl = document.getElementById("speedControl");
const fullscreenBtn = document.getElementById("fullscreenBtn");

// Play/Pause toggle
playPauseBtn.addEventListener("click", () => {
  if (video.paused || video.ended) {
    video.play();
    playPauseBtn.textContent = "Pause";
  } else {
    video.pause();
    playPauseBtn.textContent = "Play";
  }
});

// Update progress bar
video.addEventListener("timeupdate", () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.value = progress;

  const currentMinutes = Math.floor(video.currentTime / 60);
  const currentSeconds = Math.floor(video.currentTime % 60);
  const totalMinutes = Math.floor(video.duration / 60);
  const totalSeconds = Math.floor(video.duration % 60);

  timeDisplay.textContent = `${currentMinutes}:${currentSeconds
    .toString()
    .padStart(2, "0")} / ${totalMinutes}:${totalSeconds
    .toString()
    .padStart(2, "0")}`;
});

// Seek video
progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * video.duration;
  video.currentTime = seekTime;
});

// Volume control
volumeControl.addEventListener("input", () => {
  video.volume = volumeControl.value / 100;
});

// Playback speed control
speedControl.addEventListener("change", () => {
  video.playbackRate = parseFloat(speedControl.value);
});

// Fullscreen toggle
fullscreenBtn.addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen(); // Firefox
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen(); // Chrome, Safari, Opera
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen(); // IE/Edge
  }
});
