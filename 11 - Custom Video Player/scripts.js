const video = document.querySelector('video');
const player = document.querySelector('.player');

const playButton = player.querySelector('.toggle');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const timer = player.querySelector('.timer-time');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function playVideo(e) {
  //console.log(e);
  video.paused ? video.play() : video.pause();
  updateButton();
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  //console.log(icon);
  playButton.textContent = icon;
}

function skipVideo() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function playbackAndVolume() {
  video[this.name] = this.value;
}

function setTime() {
  var minutes = Math.floor(video.currentTime / 60);
  var seconds = Math.floor(video.currentTime - minutes * 60);
  var minuteValue;
  var secondValue;

  if (minutes < 10) {
    minuteValue = '0' + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = '0' + seconds;
  } else {
    secondValue = seconds;
  }

  var videoTime = minuteValue + ':' + secondValue;
  timer.textContent = videoTime;

  var barLength = 100 * (video.currentTime / video.duration);
  progressBar.style.flexBasis = `${barLength}%`;
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

playButton.addEventListener('click', playVideo);
video.addEventListener('click', playVideo);
// video.addEventListener('play', updateButton);
// video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', setTime);
skipButtons.forEach(button => button.addEventListener('click', skipVideo));
ranges.forEach(range => range.addEventListener('change', playbackAndVolume));
ranges.forEach(range => range.addEventListener('mousemove', playbackAndVolume));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));