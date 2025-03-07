class ThrowableObject extends MoveableObject {
  imagesRotaition = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  imagesSplash = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, offsetW, y, muteSound, isFlipped) {
    super();
    this.createdId();
    this.isFlipped = isFlipped;
    this.calX(x, offsetW);
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.ground = 480;
    this.speedY = 20;
    this.setHitbox();
    this.loadAllImg();
    this.loadSounds(muteSound);
    this.throw();
    this.applyGravity();
  }

  /**
   * Calculated the x coodinats of start for bottle
   * @param {Number} x - X coodinats of character
   * @param {Number} offsetW - Width of character
   */
  calX(x, offsetW) {
    if (this.isFlipped) {
      this.x = x - 20;
    } else {
      this.x = x + offsetW - 50;
    }
  }

  /**
   * Load all images in cache
   */
  loadAllImg() {
    this.loadImg(this.imagesRotaition[3]);
    this.loadImages(this.imagesRotaition);
    this.loadImages(this.imagesSplash);
  }

  /**
   * Load all Sounds
   */
  loadSounds(muteSound) {
    this.createdSound("assets/audio/glassBroken.mp3", "splash_sound");
    this.muteSounds(muteSound);
  }

  /**
   * Throw the bottle
   */
  throw() {
    this.stoppableInterval(
      setInterval(() => {
        if (this.isFlipped) {
          this.throwLeft();
        } else {
          this.throwRight();
        }
        this.animatedImages(this.imagesRotaition);
      }, 1000 / 25)
    );
  }

  /**
   * Throw the bottle to the right
   */
  throwRight() {
    this.x += 15;
    this.hitbox.x += 15;
  }

  /**
   * Throw the bottle to the left
   */
  throwLeft() {
    this.x -= 15;
    this.hitbox.x -= 15;
  }

  /**
   * Splash the bottle
   */
  splash() {
    this.stopIntervals();
    this.deletHitbox();
    this.currentImage = 0;
    this.sounds.splash_sound.play();
    this.stoppableInterval(
      setInterval(() => {
        if (this.animatedImagesOnce(this.imagesSplash)) {
          this.stopIntervals();
        }
      }, 1000 / 15)
    );
  }
}
