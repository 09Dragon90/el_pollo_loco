let canvas;
let world;
let keyboard = new Keyboard();
let muteSound;

/**
 * Initalfunction load the world
 */
function init() {
  muteSound = loadFromLocalStorage();
  changeImageButton(muteSound);
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, muteSound);
  addTouchEvent();
}

/**
 * Add the Touchevent to the buttons
 */
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

/**
 * Set the status of the key
 * @param {string/number} keyCode - Code of pressed key
 * @param {boolean} status - key is pressed or released
 */
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

/**
 * Starts a game
 * @param {string} difficulty - difficulty of level
 */
function startGame(difficulty) {
  let menuePlayRef = document.getElementById("menue-play");
  animatedBtn(difficulty);
  setTimeout(() => {
    menuePlayRef.classList.add("d-none");
    createdLevel(difficulty);
  }, 1500);
}

/**
 * Starts the animations of buttons
 * @param {string} difficulty - difficulty of level
 */
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

/**
 * Reset the buttons für replay
 */
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

/**
 * Aktivated the Fullscreen
 */
function fullscreen() {
  let el = document.getElementById("canvas");
  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  } else {
    el.mozRequestFullScreen();
  }
}

// Speichert den Status im LocalStorage
function setStatus(status) {
  localStorage.setItem("setting", JSON.stringify(status));
}

// Liest den Status aus dem LocalStorage, gibt false zurück, wenn nichts gespeichert ist
function loadFromLocalStorage() {
  const status = localStorage.getItem("setting");
  return status ? JSON.parse(status) : false;
}

document.getElementById("buttonSound").addEventListener("click", () => {
  muteSound = !muteSound;
  setStatus(muteSound);
  world.muteAllSounds(muteSound);
  changeImageButton(muteSound);
});

function changeImageButton(muteSound) {
  let img = document.querySelector("#buttonSound img");
  if (muteSound) {
    img.src = "./assets/icons/volume-mute-solid.svg";
  } else {
    img.src = "./assets/icons/volume-up-solid.svg";
  }
}

window.addEventListener("keydown", (e) => {
  setButton(e.keyCode, true);
});

window.addEventListener("keyup", (e) => {
  setButton(e.keyCode, false);
});
