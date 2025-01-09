class MoveblaObject {
  x = 80;
  overGroundY = 430;
  y;
  heigth = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  isFlipped = false;

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      this.img = new Image();
      this.img.src = path;
      this.imageCache[path] = this.img;
    });
  }

  calY(heigth, overGroundY) {
    return overGroundY - heigth;
  }

  moveRight() {
    console.log("moving Right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
