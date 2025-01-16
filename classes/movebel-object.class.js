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
  hitbox = { x: 0, y: 0, height: 0, width: 0 };
  energy = 100;
  lastHit = 0;

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  calY(height, overGroundY) {
    return overGroundY - height;
  }

  moveRight() {
    this.x += this.speed;
    this.hitbox.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
    this.hitbox.x -= this.speed;
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
      ctx.strokeStyle = "red";
      ctx.rect(
        this.hitbox.x,
        this.hitbox.y,
        this.hitbox.width,
        this.hitbox.height
      );
      ctx.stroke();
    }
  }

  isColliding(obj) {
    return (
      this.hitbox.x + this.hitbox.width >= obj.hitbox.x &&
      this.hitbox.x <= obj.hitbox.x + obj.hitbox.width &&
      this.hitbox.y + this.hitbox.height >= obj.hitbox.y &&
      this.hitbox.y <= obj.hitbox.y + obj.hitbox.height
    );
  }

  setHitbox(offsetYT, offsetYB, offsetXL, offsetXR) {
    this.hitbox = {
      x: this.x + offsetXL,
      width: this.width - offsetXL - offsetXR,
      y: this.y + offsetYT,
      height: this.height - offsetYT - offsetYB,
    };
  }

  hit() {
    if (!this.isDead() && !this.isHurt()) {
      this.energy -= 5;
      this.lastHit = new Date().getTime();
      console.log(this.energy);
    }
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {
    let timeDifference = (new Date().getTime() - this.lastHit) / 1000;
    return timeDifference < 1;
  }
}
