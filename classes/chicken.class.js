class Chicken extends MoveblaObject {
  height = 70;
  width = 70;

  imagesWalking = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor(lengthOfLevel) {
    super();
    this.loadImg(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.x = 200 + (lengthOfLevel - 200) * Math.random() - this.width;
    this.y = this.calY(this.height, this.overGroundY);
    this.speed = 0.15 + Math.random() * 0.5;
    this.animation();
  }

  animation() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.animatedImages(this.imagesWalking);
    }, 200);
  }

  eat() {
    console.log("eat");
  }
}
