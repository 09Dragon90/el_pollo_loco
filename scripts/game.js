let canvas;
let world;
let keyboard = new Keyboard();
let muteSound = false;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, muteSound);
  addTouchEvent();
}

window.addEventListener("keydown", (e) => {
  setButton(e.keyCode, true);
});

window.addEventListener("keyup", (e) => {
  setButton(e.keyCode, false);
});

function addTouchEvent() {
  const el = document.getElementsByClassName("button-control");
  for (let i = 0; i < el.length; i++) {
    el[i].addEventListener("touchstart", (e) => {
      setButton(e.currentTarget.id, true);
    });

    el[i].addEventListener("touchend", (e) => {
      setButton(e.currentTarget.id, false);
    });
  }
}

function setButton(keyCode, status) {
  switch (keyCode) {
    case "buttonRight":
    case 39:
    case 68:
      keyboard.Right = status;
      break;
    case "buttonLeft":
    case 37:
    case 65:
      keyboard.Left = status;
      break;
    case "buttonUp":
    case 38:
    case 87:
      keyboard.Up = status;
      break;
    case 40:
    case 83:
      keyboard.Down = status;
      break;
    case "buttonBottle":
    case 32:
      keyboard.Space = status;
      break;
  }
}

function startGame(difficulty) {
  let menuePlayRef = document.getElementById("menue-play");
  animatedBtn(difficulty);
  setTimeout(() => {
    menuePlayRef.classList.add("d-none");
    createdLevel(difficulty);
  }, 1500);
}

function animatedBtn(difficulty) {
  let btnPlayRefs = document.getElementsByClassName("button-play");
  let textRef = document.getElementById("text");
  let menueRef = document.getElementById("menue");
  for (let i = 0; i < btnPlayRefs.length; i++) {
    btnPlayRefs[i].classList.remove("button-play-fade-in");
    textRef.classList.remove("button-play-fade-in");
    menueRef.classList.remove("menue-fade");
    if (btnPlayRefs[i].id == `btn-play-${difficulty}`) {
      btnPlayRefs[i].classList.add("button-play-action");
    } else {
      btnPlayRefs[i].classList.add("button-play-fade-out");
    }
  }
}

function resetBtn() {
  let btnPlayRefs = document.getElementsByClassName("button-play");
  let menuePlayRef = document.getElementById("menue-play");
  let textRef = document.getElementById("text");
  let menueRef = document.getElementById("menue");
  menuePlayRef.classList.remove("d-none");
  textRef.classList.add("button-play-fade-in");
  menueRef.classList.add("menue-fade");
  for (let i = 0; i < btnPlayRefs.length; i++) {
    btnPlayRefs[i].classList.remove("button-play-action");
    btnPlayRefs[i].classList.remove("button-play-fade-out");
    btnPlayRefs[i].classList.add("button-play-fade-in");
  }
  world.overlay = null;
}

function fullscreen() {
  let el = document.getElementById("canvas");
  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  } else {
    el.mozRequestFullScreen();
  }
}

document.getElementById("buttonSound").addEventListener("click", () => {
  muteSound = !muteSound;
  world.muteAllSounds(muteSound);
  let img = document.querySelector("#buttonSound img");
  if (muteSound) {
    img.src = "./assets/icons/volume-mute-solid.svg";
  } else {
    img.src = "./assets/icons/volume-up-solid.svg";
  }
});
