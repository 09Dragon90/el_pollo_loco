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

  constructor(x, y) {
    super();
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
    this.throw();
    this.applyGravity();
  }

  throw() {
    setInterval(() => {
      this.x += 15;
      this.hitbox.x += 15;
      this.animatedImages(this.imagesRotaition);
    }, 1000 / 25);
  }
}
