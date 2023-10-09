const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");
const storeButton = document.getElementById("storeButton");
const clock = document.getElementById("clock");
const storedTimesList = document.getElementById("storedTimesList");
let startTime = 0;
let pausedTime = 0;
let timer;
const storedTimes = [];
function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecs = milliseconds % 1000;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(millisecs).padStart(3, "0")}`;
}
function updateClockDisplay() {
    const currentTime = Date.now() - startTime + pausedTime;
    clock.textContent = formatTime(currentTime);
    timer = requestAnimationFrame(updateClockDisplay);
}
startButton.addEventListener("click", () => {
    if (!timer) {
        startTime = Date.now() - pausedTime;
        pausedTime = 0;
        updateClockDisplay();
        startButton.disabled = true;
        stopButton.disabled = false;
    }
});
stopButton.addEventListener("click", () => {
    if (timer) {
        cancelAnimationFrame(timer);
        timer = null;
        pausedTime = Date.now() - startTime;
        startButton.disabled = false;
        stopButton.disabled = true;
    }
});
resetButton.addEventListener("click", () => {
    if (timer) {
        cancelAnimationFrame(timer);
        timer = null;
    }
    clock.textContent = formatTime(0);
    startTime = 0;
    pausedTime = 0;
    startButton.disabled = false;
    stopButton.disabled = true;
});
storeButton.addEventListener("click", () => {
    let currentTime;
    if (timer) {
        currentTime = Date.now() - startTime + pausedTime;
    } else {

        currentTime = pausedTime;
    }
    storedTimes.push(currentTime);
    const listItem = document.createElement("li");
    listItem.textContent = formatTime(currentTime);
    storedTimesList.appendChild(listItem);
});
