let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, levels);
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
