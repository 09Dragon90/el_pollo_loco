class ThrowableObject extends MoveableObject {
  images = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.ground = 480;
    this.loadImages(this.images);
    this.loadImg(this.images[0]);
    this.throw();
    this.applyGravity();
  }

  throw() {
    setInterval(() => {
      this.x += 20;
    }, 1000 / 25);
  }
}
