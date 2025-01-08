class MoveblaObject {
  x = 80;
  overGroundY = 430;
  y;
  heigth = 150;
  width = 100;
  img;

  constructor() {}

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  calY(heigth, overGroundY) {
    return overGroundY - heigth;
  }

  moveRight() {
    console.log("moving Right");
  }

  moveLeft() {
    console.log("moving Left");
  }
}
