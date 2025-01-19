class MoveableObject extends DrawableObject {
  x = 80;
  y;
  height = 150;
  width = 100;
  overGroundY = 430;
  speedX = 0.15;
  speedY = 0;
  isFlipped = false;
  offsety = 0;
  hitbox = { x: 0, y: 0, height: 0, width: 0 };
  energy = 100;
  lastHit = 0;
  acceleration = 2;

  calY(height, overGroundY) {
    return overGroundY - height;
  }

  moveRight() {
    this.x += this.speedX;
    this.hitbox.x += this.speedX;
  }

  moveLeft() {
    this.x -= this.speedX;
    this.hitbox.x -= this.speedX;
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
    }
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {
    let timeDifference = (new Date().getTime() - this.lastHit) / 1000;
    return timeDifference < 1;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isOverGroung() || this.speedY > 0) {
        this.y -= this.speedY;
        this.hitbox.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isOverGroung() {
    return this.y < this.ground;
  }
}
