class Endboss extends MoveableObject {
  height = 350;
  width = 250;

  imagesWalking = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor(lengthOfLevel) {
    super();
    this.loadImg(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.x = lengthOfLevel - this.width - 50;
    this.y = this.calY(this.height, this.overGroundY) + 10;
    this.setHitbox(50, 10, 0, 0);
    this.animation();
  }

  animation() {
    setInterval(() => {
      this.animatedImages(this.imagesWalking);
    }, 200);
  }
}
