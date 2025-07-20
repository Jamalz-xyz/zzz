// DOM Elements
const audio = document.getElementById('audio');
const musicInfo = document.getElementById('music-info');
const cassette = document.getElementById('cassette');
const progress = document.getElementById('progress');
const clock = document.getElementById('clock');
const themeToggle = document.getElementById('themeToggle');
const musicToggle = document.getElementById('musicToggle');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const speedControl = document.getElementById('speedControl');
const progressBar = document.querySelector('.progress-bar');
const menuToggle = document.getElementById('menuToggle');
const navbarMenu = document.querySelector('.navbar-menu');

// Playlist
const playlist = [
  { title: "The Cut That Always Bleeds x WILDFLOWER", url: "https://files.catbox.moe/tk68he.mp3" },
  { title: "Dream, Ivory - welcome and goodbye", url: "https://files.catbox.moe/puyh15.mp3" },
  { title: "Djo - End of Beginning", url: "https://files.catbox.moe/0m4xv1.mp3" }
];

let currentTrack = 0;
let isPlaying = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  
  // Check if music was playing
  const musicState = localStorage.getItem('musicState');
  if (musicState === 'playing') {
    loadTrack(currentTrack);
    musicToggle.checked = true;
  }
  
  // Update clock immediately
  updateClock();
  
  // Set up event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Music toggle
  musicToggle.addEventListener('change', toggleMusic);
  
  // Play button
  if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
  }
  
  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', prevTrack);
  }
  
  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', nextTrack);
  }
  
  // Speed control
  if (speedControl) {
    speedControl.addEventListener('change', changeSpeed);
  }
  
  // Progress bar click
  if (progressBar) {
    progressBar.addEventListener('click', seek);
  }
  
  // Menu toggle for mobile
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }
  
  // Audio events
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', updateDuration);
  audio.addEventListener('play', onPlay);
  audio.addEventListener('pause', onPause);
  audio.addEventListener('ended', onEnd);
}

// Theme functions
function toggleTheme() {
  const html = document.documentElement;
  const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Music player functions
function loadTrack(index) {
  audio.src = playlist[index].url;
  audio.load();
  audio.play().catch(e => console.log("Autoplay prevented:", e));
  musicInfo.textContent = `🎧 Now Playing: ${playlist[index].title}`;
  isPlaying = true;
  localStorage.setItem('musicState', 'playing');
}

function toggleMusic() {
  if (musicToggle.checked) {
    loadTrack(currentTrack);
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
    localStorage.setItem('musicState', 'paused');
  }
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
}

function changeSpeed() {
  audio.playbackRate = parseFloat(speedControl.value);
}

function seek(e) {
  const percent = e.offsetX / this.offsetWidth;
  audio.currentTime = percent * audio.duration;
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
}

function updateDuration() {
  durationDisplay.textContent = formatTime(audio.duration);
}

// Update bagian yang terkait dengan durasi di script.js

// Fungsi formatTime yang lebih robust
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update event listener untuk loadedmetadata
audio.addEventListener('loadedmetadata', function() {
  if (audio.duration) {
    durationDisplay.textContent = formatTime(audio.duration);
  } else {
    durationDisplay.textContent = "0:00";
  }
});

// Update event listener untuk timeupdate
audio.addEventListener('timeupdate', function() {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
  }
});

// Pastikan inisialisasi durasi saat load track
function loadTrack(index) {
  audio.src = playlist[index].url;
  audio.load();
  
  // Reset display saat track baru dimuat
  currentTimeDisplay.textContent = "0:00";
  durationDisplay.textContent = "0:00";
  progress.style.width = "0%";
  
  audio.play().catch(e => console.log("Autoplay prevented:", e));
  musicInfo.textContent = `🎧 Now Playing: ${playlist[index].title}`;
  isPlaying = true;
  localStorage.setItem('musicState', 'playing');
}

function onPlay() {
  cassette.classList.add('playing');
  musicInfo.textContent = `🎧 Now Playing: ${playlist[currentTrack].title}`;
  musicToggle.checked = true;
  isPlaying = true;
  if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  localStorage.setItem('musicState', 'playing');
}

function onPause() {
  cassette.classList.remove('playing');
  musicInfo.textContent = `🎧 Playback paused`;
  musicToggle.checked = false;
  isPlaying = false;
  if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
  localStorage.setItem('musicState', 'paused');
}

function onEnd() {
  nextTrack();
}

// Clock function
function updateClock() {
  const now = new Date();
  const wib = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  const time = wib.toISOString().substr(11, 8);
  clock.innerHTML = `<i class="fas fa-clock"></i> WIB: ${time}`;
}

setInterval(updateClock, 1000);

// Mobile menu function
function toggleMenu() {
  navbarMenu.classList.toggle('active');
}

// Close menu when clicking on a link (mobile)
document.querySelectorAll('.navbar-link').forEach(link => {
  link.addEventListener('click', () => {
    navbarMenu.classList.remove('active');
  });
});