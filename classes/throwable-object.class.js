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

  constructor(x, y, muteSound) {
    super();
    this.createdId();
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.ground = 480;
    this.speedY = 20;
    this.setHitbox();
    this.loadImg(this.imagesRotaition[3]);
    this.loadImages(this.imagesRotaition);
    this.loadImages(this.imagesSplash);
    this.loadSounds();
    this.muteSounds(muteSound);
    this.throw();
    this.applyGravity();
  }

  /**
   * Load all Sounds
   */
  loadSounds() {
    this.createdSound("assets/audio/glassBroken.mp3", "splash_sound");
  }

  throw() {
    this.stoppableInterval(
      setInterval(() => {
        this.x += 15;
        this.hitbox.x += 15;
        this.animatedImages(this.imagesRotaition);
      }, 1000 / 25)
    );
  }

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
