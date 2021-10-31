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
continueBtn.addEventListener("click", continueTiming);
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
    timeBreakSecond = breakInput.value * 60;
  }
  clearInterval(interval);
  if(timeWorkSecond < 0 || timeBreakSecond < 0) return;
  displayTime(timeWorkSecond);

  animationShow(timerDisplay);
  animationShow(textDisplay);
  changeText(textDisplay, 'Работаем!');
  hide(startBtn);
  show(pauseBtn)
  removeDisabled(pauseBtn);
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
  hide(startBtn);
  show(pauseBtn)
  clearInterval(interval);
  displayTime(timeBreakSecond);
  changeText(textDisplay, 'Отдыхаем!');
  application.style.backgroundColor = "blue";
  changeBackgroundColor(application, 'blue')
  interval = setInterval(() => {
    timeBreakSecond--;
    displayTime(timeBreakSecond);
    if (!timeBreakSecond || timeBreakSecond < 1) {
      audioPlay();
      clearInterval(interval);
      timeBreakSecond = 0;
      changeText(timerDisplay, 'Время вышло');
      addDisabled(pauseBtn);
      removeDisabled(resetBtn);
      changeText(textDisplay, '');
      changeBackgroundColor(application, '#3fc244')
    }
  }, 1000);
}

function pauseTiming() {
  clearInterval(interval);
  paused = true;
  show(continueBtn);
  hide(pauseBtn);
  removeDisabled(resetBtn);
}

function continueTiming() {
  hide(continueBtn);
  show(pauseBtn);
  addDisabled(resetBtn);
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
  animationHide(timerDisplay);
  animationHide(textDisplay);
  hide(continueBtn);
  show(startBtn);
  hide(pauseBtn);
  addDisabled(resetBtn);
  changeBackgroundColor(application, '#1f1f1f')
  changeText(textDisplay, '');
}

function audioPlay() {
  audio = new Audio("../audio/zvuk.mp3");
  audio.play();
}

function show(nodeEl) {
  nodeEl.classList.remove('hide');
}
function hide(nodeEl) {
  nodeEl.classList.add('hide');
}
function animationShow(nodeEl) {
  nodeEl.classList.add('show');
}
function animationHide(nodeEl) {
  nodeEl.classList.remove('show');
}
function addDisabled(nodeEl) {
  nodeEl.setAttribute("disabled", "true");
}
function removeDisabled(nodeEl) {
  nodeEl.removeAttribute("disabled");
}
function changeText(nodeEl, text) {
  nodeEl.innerText = text;
}
function changeBackgroundColor(nodeEl, color) {
  nodeEl.style.backgroundColor = color;
}
