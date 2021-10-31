const application = document.querySelector(".application");
const workInput = document.getElementById("workInput");
const breakInput = document.getElementById("breakInput");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const continueBtn = document.getElementById("continue");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timing");
const textDisplay = document.getElementById("text");
let timeWorkSecond;
let timeBreakSecond;
let interval;
let finishWork = false;
let paused = false;

startBtn.addEventListener("click", startWorkTiming);
pauseBtn.addEventListener("click", pauseTiming);
continueBtn.addEventListener("click", () => {
  continueTiming(finishWork);
});
resetBtn.addEventListener("click", resetTiming);

function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timerDisplay.innerHTML = `
  ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
  `;
}

function startWorkTiming() {
  if (!paused) {
    timeWorkSecond = workInput.value * 60;
  }
  clearInterval(interval);
  displayTime(timeWorkSecond);
  timerDisplay.classList.add("show");
  textDisplay.classList.add("show");
  textDisplay.innerText = "Работаем!";
  startBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
  pauseBtn.removeAttribute("disabled");
  interval = setInterval(() => {
    timeWorkSecond--;
    displayTime(timeWorkSecond);
    if (!timeWorkSecond || timeWorkSecond < 1) {
      audioPlay();
      clearInterval(interval);
      timeWorkSecond = 0;
      finishWork = true;
      paused = false;
      startBreakTiming();
    }
  }, 1000);
}

function startBreakTiming() {
  if (!paused) {
    timeBreakSecond = breakInput.value * 60;
  }
  startBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
  clearInterval(interval);
  displayTime(timeBreakSecond);
  textDisplay.innerText = "Отдыхаем!";
  application.style.backgroundColor = "blue";
  interval = setInterval(() => {
    timeBreakSecond--;
    displayTime(timeBreakSecond);
    if (!timeBreakSecond || timeBreakSecond < 1) {
      audioPlay();
      clearInterval(interval);
      timeBreakSecond = 0;
      timerDisplay.innerHTML = "Время вышло";
      pauseBtn.setAttribute("disabled", "true");
      resetBtn.removeAttribute("disabled");
      textDisplay.innerText = "";
      application.style.backgroundColor = "#3fc244";
    }
  }, 1000);
}

function pauseTiming() {
  clearInterval(interval);
  paused = true;
  continueBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
  resetBtn.removeAttribute("disabled");
}

function continueTiming(finishWork) {
  continueBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
  resetBtn.setAttribute("disabled", "true");
  if (!finishWork) {
    startWorkTiming();
  } else {
    startBreakTiming();
  }
}

function resetTiming() {
  clearInterval(interval);
  workInput.value = 1;
  breakInput.value = 1;
  finishWork = false;
  paused = false;
  timerDisplay.classList.remove("show");
  textDisplay.classList.remove("show");
  continueBtn.classList.add("hide");
  startBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
  resetBtn.setAttribute("disabled", "true");
  application.style.backgroundColor = "#1f1f1f";
  textDisplay.innerText = "";
}

function audioPlay() {
  audio = new Audio("../audio/zvuk.mp3");
  audio.play();
}
