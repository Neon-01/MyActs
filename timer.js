let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;

const display = document.getElementById("display");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// FORMAT TIME
function updateDisplay() {
  let h = String(hours).padStart(2, '0');
  let m = String(minutes).padStart(2, '0');
  let s = String(seconds).padStart(2, '0');

  display.textContent = `${h}:${m}:${s}`;
}

// START TIMER
startBtn.addEventListener("click", function() {
  if (timer !== null) return;

  timer = setInterval(function() {
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    updateDisplay();
  }, 1000);

  statusText.textContent = "Status: Running";
});

// PAUSE TIMER
pauseBtn.addEventListener("click", function() {
  clearInterval(timer);
  timer = null;
  statusText.textContent = "Status: Paused";
});

// RESET TIMER
resetBtn.addEventListener("click", function() {
  clearInterval(timer);
  timer = null;

  seconds = 0;
  minutes = 0;
  hours = 0;

  updateDisplay();
  statusText.textContent = "Status: Reset";
});

// KEYBOARD SHORTCUTS
document.addEventListener("keydown", function(e) {
  if (e.key.toLowerCase() === "s") {
    startBtn.click();
  }

  if (e.key.toLowerCase() === "p") {
    pauseBtn.click();
  }

  if (e.key.toLowerCase() === "r") {
    resetBtn.click();
  }
});