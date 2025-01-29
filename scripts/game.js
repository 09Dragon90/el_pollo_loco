let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 39:
    case 68:
      keyboard.Right = true;
      break;
    case 37:
    case 65:
      keyboard.Left = true;
      break;
    case 38:
    case 87:
      keyboard.Up = true;
      break;
    case 40:
    case 83:
      keyboard.Down = true;
      break;
    case 32:
      keyboard.Space = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 39:
    case 68:
      keyboard.Right = false;
      break;
    case 37:
    case 65:
      keyboard.Left = false;
      break;
    case 38:
    case 87:
      keyboard.Up = false;
      break;
    case 40:
    case 83:
      keyboard.Down = false;
      break;
    case 32:
      keyboard.Space = false;
      break;
  }
});

function startGame(difficulty) {
  let menuePlayRef = document.getElementById("menue-play");
  console.log(difficulty);
  animatedBtn(difficulty);
  setTimeout(() => {
    menuePlayRef.classList.add("d-none");
    createdLevel(difficulty);
  }, 1500);
}

function animatedBtn(difficulty) {
  let btnPlayRefs = document.getElementsByClassName("button-play");
  for (let i = 0; i < btnPlayRefs.length; i++) {
    if (btnPlayRefs[i].id == `btn-play-${difficulty}`) {
      btnPlayRefs[i].classList.add("button-play-action");
    } else {
      btnPlayRefs[i].classList.add("button-play-fade");
    }
  }
}
