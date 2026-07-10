//For background sky image change based on time of day
const roomSky = document.querySelector(".room-sky img");
const hour = new Date().getHours();

if (hour >= 4 && hour <= 7) {
    roomSky.src = "image/background/window-sunset.png";
}
else if (hour >= 8 && hour <= 16) {
    roomSky.src = "image/background/window-day.png";
}
else if (hour >= 17 && hour <= 18) {
    roomSky.src = "image/background/window-sunset.png";
}
else {
    roomSky.src = "image/background/window-night.png";
}

console.log("Current Hour:", hour);
//For live clock and date display
const liveTime = document.getElementById("live-time");
const liveDate = document.getElementById("live-date");
function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    if (hours === 0) hours = 12;
    minutes = minutes.toString().padStart(2, "0");
    liveTime.textContent = `${hours}:${minutes} ${period}`;

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    };

    liveDate.textContent =
        now.toLocaleDateString("en-US", options);

}
setInterval(updateClock, 1000);

/*==============================
        POMODORO
==============================*/
//pomodoro timer
const timerDisplay = document.getElementById("timer-display"); //buttons
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const resetButton = document.getElementById("reset-btn");
//work minutes buttons and display
const workMinusButton = document.getElementById("work-minus");
const workPlusButton = document.getElementById("work-plus");
const workMinutesDisplay = document.getElementById("work-minutes");
//session display
const sessionDisplay = document.getElementById("session-display");
const sessionMinusButton = document.getElementById("session-minus");
const sessionPlusButton = document.getElementById("session-plus");
const sessionCountText = document.getElementById("session-count");
//break minutes buttons and display
const breakMinusButton = document.getElementById("break-minus");
const breakPlusButton = document.getElementById("break-plus");
const breakMinutesDisplay = document.getElementById("break-minutes");
//cancel button
const cancelButton = document.getElementById("cancel-btn");


let timer = null;
let isRunning = false;

let workMinutes = 10;
let seconds = workMinutes * 60;
let breakMinutes = 5;
let maxSessions = 4;
let currentSession = 1;
let isBreak = false;


function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function updateWorkMinutesDisplay() {
    workMinutesDisplay.textContent = workMinutes;
}

function updateSessionDisplay() {
    sessionCountText.textContent = maxSessions;

    sessionDisplay.textContent =
    isBreak
    ? `Break • Session ${currentSession}/${maxSessions}`
    : `Work • Session ${currentSession}/${maxSessions}`;
}

function updateBreakMinutesDisplay() {
    breakMinutesDisplay.textContent = breakMinutes;
}

function startTimer() { //timer flow starts here
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        seconds--;
        updateTimerDisplay();
        if (seconds <= 0) {
            clearInterval(timer);
            isRunning = false;
            if(!isBreak) {//breakmode
                isBreak = true;
                seconds = breakMinutes * 60;
                alert("Work Session Finished! Time for a Break!");

                updateSessionDisplay();
                updateTimerDisplay();

                startTimer(); //Automatically start break timer

                return;

            }

            else { //break detector if finished
                isBreak = false;
                currentSession++;
                if (currentSession > maxSessions) {
                    alert("Pomodoro sessions completed! Great job!");
                    
                    currentSession = 1;

                    seconds = workMinutes * 60;
                    updateSessionDisplay();
                    updateTimerDisplay();

                    return;
                }
                seconds = workMinutes * 60; //Loop session
                alert(`Session ${currentSession} begins! Time to focus!`);
                updateSessionDisplay();
                updateTimerDisplay();

                startTimer(); //Automatically start work timer

                return;
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    seconds = isBreak //breakMinutes > 0 Detect if it's break time or work time and set seconds accordingly
    ? breakMinutes * 60
    : workMinutes * 60;
    updateTimerDisplay();
    updateSessionDisplay();
}

function cancelTimer() {
    clearInterval(timer);
    isRunning = false;
    currentSession = 1;
    isBreak = false;
    seconds = workMinutes * 60;
    updateTimerDisplay();
    updateSessionDisplay();
}


workMinusButton.addEventListener("click", () => {
    if (workMinutes > 0) {
        workMinutes--;
        updateWorkMinutesDisplay();
        resetTimer();
    }
});

workPlusButton.addEventListener("click", () => {
    if (workMinutes < 60) {
        workMinutes++;
        updateWorkMinutesDisplay();
        resetTimer();
    }
});

breakMinusButton.addEventListener("click", () => {
    if (breakMinutes > 0) {
        breakMinutes--;
        
        updateBreakMinutesDisplay();
        resetTimer();
    }
});

breakPlusButton.addEventListener("click", () => {
    if (breakMinutes < 60) {
        breakMinutes++;
        updateBreakMinutesDisplay();
        resetTimer();
    }
});

sessionMinusButton.addEventListener("click", () => {
    if (maxSessions > 1) {
        maxSessions--;
        updateSessionDisplay();
    } 
});

sessionPlusButton.addEventListener("click", () => {
    if (maxSessions < 10) {
        maxSessions++;
        updateSessionDisplay();
    }
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

cancelButton.addEventListener("click", cancelTimer);


updateWorkMinutesDisplay();
updateBreakMinutesDisplay();
updateSessionDisplay();
updateTimerDisplay();




