class Chicken extends MoveblaObject {
  heigth = 70;
  width = 70;

  imagesWalking = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor(lengthOfLevel) {
    super();
    this.loadImg("assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.imagesWalking);
    this.x = 200 + (lengthOfLevel - 200) * Math.random() - this.width;
    this.y = this.calY(this.heigth, this.overGroundY);
    this.speed = 0.15 + Math.random() * 0.5;
    this.animation();
  }

  animation() {
    this.moveLeft();
    setInterval(() => {
      let i = this.currentImage % this.imagesWalking.length;
      let path = this.imagesWalking[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }

  eat() {
    console.log("eat");
  }
}
