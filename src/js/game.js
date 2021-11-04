const game = document.getElementById('game');
const colsCount = document.getElementById('cols');
const rowsCount = document.getElementById('rows');
const startBtnGame = document.getElementById('start-game');
const levelText = document.getElementById('level');
const popup = document.getElementById('popup');

let cols = 10;
let rows = 10;
let level = 1;
let smile;
let finish;
let maze;
let mazeCells = [];
let coordinatesSmile;
let coordinatesFinish;
let coordinatesMaze;

startBtnGame.addEventListener('click', createFieldGame);

function createFieldGame() {
  cols = colsCount.value;
  rows = rowsCount.value;

  for(let i = 0; i < (cols * rows); i++) {
    let cell = document.createElement('div');
    cell.style.width = cell.style.height = 500 / rows + 'px';
    game.appendChild(cell);
    cell.classList.add('cell');
  }
  let cell = document.getElementsByClassName('cell');
  let x = 1;
  let y = cols;
  for(let i = 0; i < cell.length; i++) {
    if(x > rows) {
      x = 1;
      y--;
    }
    cell[i].setAttribute('posx', x);
    cell[i].setAttribute('posy', y);
    x++;
  }
  startGame();
}

function startGame() {
  levelText.textContent = `Уровень: ${level}`;
  createSmile();
  createFinish();
  createMaze();
  window.addEventListener('keydown', move);
}

function smileCoordinates() {
  let posX = 1;
  let posY = cols;
  return  [posX, posY];
}

function createSmile() {
  coordinatesSmile = smileCoordinates();
  smile = document.querySelector('[posX = "' + coordinatesSmile[0] + '"][posy = "' + coordinatesSmile[1] + '"]');
  smile.classList.add('smile');
}

function finishCoordinates() {
  let posX = rows;
  let posY = 1;
  return  [posX, posY];
}

function createFinish() {
  coordinatesFinish = finishCoordinates();
  finish = document.querySelector('[posX = "' + coordinatesFinish[0] + '"][posy = "' + coordinatesFinish[1] + '"]');
  finish.classList.add('finish');
}

function randomCoordinatesMaze() {
  let posX = Math.round(Math.random() * (rows - 1) + 1);
  let posY = Math.round(Math.random() * (cols - 1) + 1);
  return [posX, posY];
}

function createMaze() {
  coordinatesMaze = randomCoordinatesMaze();
  maze = document.querySelector('[posX = "' + coordinatesMaze[0] + '"][posy = "' + coordinatesMaze[1] + '"]');

  while(maze.classList.contains('smile') || maze.classList.contains('finish')  || maze.classList.contains('maze')) {
    coordinatesMaze = randomCoordinatesMaze();
    maze = document.querySelector('[posX = "' + coordinatesMaze[0] + '"][posy = "' + coordinatesMaze[1] + '"]');
  }

  maze.classList.add('maze');
  mazeCells.push(maze);
}

function move(e) {
  smile.classList.remove('smile');
  if(e.key == 'ArrowRight') {
    if(coordinatesSmile[0] < rows) {
      coordinatesSmile[0] = coordinatesSmile[0] + 1;
      smile = document.querySelector('[posX = "' + coordinatesSmile[0] + '"][posy = "' + coordinatesSmile[1] + '"]');
    } else {
      gameOver();
    }
  }else if(e.key == 'ArrowLeft') {
    if(coordinatesSmile[0] > 1) {
      coordinatesSmile[0] = coordinatesSmile[0] - 1;
      smile = document.querySelector('[posX = "' + coordinatesSmile[0] + '"][posy = "' + coordinatesSmile[1] + '"]');
    } else {
      gameOver();
    }
  }else if(e.key == 'ArrowUp') {
    if(coordinatesSmile[1] < cols) {
      coordinatesSmile[1] = coordinatesSmile[1] + 1;
      smile = document.querySelector('[posX = "' + coordinatesSmile[0] + '"][posy = "' + coordinatesSmile[1] + '"]');
    } else {
      gameOver();
    }

  }else if(e.key == 'ArrowDown') {
    if(coordinatesSmile[1] > 1) {
      coordinatesSmile[1] = coordinatesSmile[1] - 1;
      smile = document.querySelector('[posX = "' + coordinatesSmile[0] + '"][posy = "' + coordinatesSmile[1] + '"]');
    } else {
      gameOver();
    }
  }
  smile.classList.add('smile');

  if(smile.classList.contains('maze')) {
    smile.classList.remove('smile');
    gameOver();
  }

  if(smile.getAttribute('posX') === finish.getAttribute('posX') && smile.getAttribute('posY') === finish.getAttribute('posY')) {
    finish.classList.remove('finish');
    successLevel();
  }
}

function gameOver() {
  level = 1;
  alert('Конец игры');
  console.log(mazeCells);
  mazeCells.forEach(mazeCell => mazeCell.classList.remove('maze'));
  startGame();
}

function successLevel() {
  level++;
  alert('Уровень пройден');
  startGame();
}