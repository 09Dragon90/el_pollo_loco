class MoveblaObject {
  x = 80;
  overGroundY = 430;
  y;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  isFlipped = false;
  offsety = 0;

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

  calY(height, overGroundY) {
    return overGroundY - height;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 20;
  }

  animatedImages(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  drawBorder(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "green";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.offsety + this.height >= obj.y &&
      this.y + this.offsety <= obj.y + obj.height
    );
  }
}
