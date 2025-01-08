class MoveblaObject {
  x = 120;
  y = 280;
  heigth = 150;
  width = 100;
  img;

  constructor() {}

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("moving Right");
  }

  moveLeft() {
    console.log("moving Left");
  }
}
