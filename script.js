let countdown; // Holds the countdown interval
let totalTimeInSeconds; // Holds the total countdown time in seconds
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');

// Format time in HH:MM:SS format
function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

// Start the timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;

    // Calculate total time in seconds from inputs
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalTimeInSeconds <= 0) {
      alert("Please enter a valid time.");
      resetTimer();
      return;
    }

    timerDisplay.textContent = formatTime(totalTimeInSeconds);

    countdown = setInterval(() => {
      totalTimeInSeconds--;
      timerDisplay.textContent = formatTime(totalTimeInSeconds);

      // Change color based on time remaining
      if (totalTimeInSeconds > 60) {
        timerDisplay.className = 'timer-green';
      } else if (totalTimeInSeconds > 10) {
        timerDisplay.className = 'timer-yellow';
      } else {
        timerDisplay.className = 'timer-red';
      }

      // Stop timer when it reaches zero
      if (totalTimeInSeconds <= 0) {
        clearInterval(countdown);
        isRunning = false;
      }
    }, 1000);
  }
}

// Pause the timer
function pauseTimer() {
  clearInterval(countdown);
  isRunning = false;
}

// Reset the timer
function resetTimer() {
  clearInterval(countdown);
  isRunning = false;
  totalTimeInSeconds = 0;
  timerDisplay.textContent = "00:00:00";
  timerDisplay.className = ''; // Reset color
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
}
