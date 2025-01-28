class MoveableObject extends DrawableObject {
  x = 80;
  y;
  height = 150;
  width = 100;
  overGroundY = 430;
  speedX = 0.15;
  speedY = 0;

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
    this.currentImage = 0;
    this.speedY = 20;
  }

  bouncer() {
    this.currentImage = 0;
    this.speedY = 10;
  }

  animatedImages(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  animatedImagesOnce(images) {
    if (this.currentImage < images.length) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
      return false;
    }
    return true;
  }

  isColliding(obj) {
    return (
      this.hitbox.x + this.hitbox.width >= obj.hitbox.x &&
      this.hitbox.x <= obj.hitbox.x + obj.hitbox.width &&
      this.hitbox.y + this.hitbox.height >= obj.hitbox.y &&
      this.hitbox.y <= obj.hitbox.y + obj.hitbox.height &&
      this.hitbox.active == true &&
      obj.hitbox.active == true
    );
  }

  isHittingFromTop(obj) {
    if (this.speedY <= 0 && this.isOverGroung()) {
      return (
        this.hitbox.x <= obj.hitbox.x + obj.hitbox.width &&
        this.hitbox.x + this.hitbox.width >= obj.hitbox.x &&
        this.hitbox.y + this.hitbox.height < obj.hitbox.y + 25 &&
        this.hitbox.y + this.hitbox.height > obj.hitbox.y - 8 &&
        this.hitbox.active == true &&
        obj.hitbox.active == true
      );
    }
    return false;
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
    this.stoppableInterval(
      setInterval(() => {
        if (this.isOverGroung() || this.speedY > 0) {
          this.y -= this.speedY;
          this.hitbox.y -= this.speedY;
          if (this.speedY > -16) this.speedY -= this.acceleration;
        }
      }, 1000 / 25)
    );
  }

  isOverGroung() {
    return this.y < this.ground;
  }

  fallOut() {
    this.y -= 100;
    this.stoppableInterval(
      setInterval(() => {
        this.y += 20;
      }, 1000 / 25)
    );
  }

  playAnimationsDead() {
    this.stopIntervals();
    this.currentImage = 0;
    this.stoppableInterval(
      setInterval(() => {
        if (this.animatedImagesOnce(this.imagesDead)) {
          this.stopIntervals();
          this.fallOut();
          let path = this.imagesDead[this.imagesDead.length - 1];
          this.img = this.imageCache[path];
        }
      }, 1000 / 10)
    );
  }
}
