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

  /**
   * Calculat the coordinats of Y
   * @param {number} height - Height of object
   * @param {number} overGroundY - Position over ground
   * @returns Coordinats Y
   */
  calY(height, overGroundY) {
    return overGroundY - height;
  }

  /**
   * Increased the x coordinats
   */
  moveRight() {
    this.x += this.speedX;
    this.hitbox.x += this.speedX;
  }

  /**
   * Decreases the x coordinats
   */
  moveLeft() {
    this.x -= this.speedX;
    this.hitbox.x -= this.speedX;
  }

  /**
   * Starts the jump
   */
  jump() {
    this.currentImage = 0;
    this.speedY = 20;
  }

  /**
   * Starts a bouncer
   */
  bouncer() {
    this.currentImage = 0;
    this.speedY = 10;
  }

  /**
   * Load the image from the cache
   * @param {Array} images - Array of images
   */
  animatedImages(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Load the image from the cache only once time
   * @param {Array} images - Array of images
   */
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

  /**
   * Check if the Object colliding with this Object
   * @param {Object} obj - Object for check
   * @returns - Is Objects colliding
   */
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

  /**
   * Check if the Object colliding from top with this Object
   * @param {Object} obj - Object for check
   * @returns - Is Objects colliding
   */
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

  /**
   * Decrease the energy
   */
  hit() {
    if (!this.isDead() && !this.isHurt()) {
      this.energy -= 5;
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if this object energy below zero
   * @returns If dead
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Check if the object was last hit more than 1 second ago.
   * @returns If object safe
   */
  isHurt() {
    let timeDifference = (new Date().getTime() - this.lastHit) / 1000;
    return timeDifference < 1;
  }

  /**
   * Aktived the gravity after jump or bouncer
   */
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

  /**
   * Check is the object in the air
   * @returns - True or False
   */
  isOverGroung() {
    return this.y < this.ground;
  }

  /**
   * Drops the object from the canvas
   */
  fallOut() {
    this.y -= 100;
    this.stoppableInterval(
      setInterval(() => {
        this.y += 20;
      }, 1000 / 25)
    );
  }

  /**
   * Stopps the intervalls of object and load the dead image
   */
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
