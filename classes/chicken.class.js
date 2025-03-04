class Chicken extends MoveableObject {
  height = 70;
  width = 70;
  small;

  imagesWalking = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  imagesDead = "assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  imagesWalkingSmall = [
    "assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  imagesDeadSmall =
    "assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  hit_sound = new Audio("assets/audio/chicken.mp3");

  constructor(lengthOfLevel, small) {
    super();
    this.small = small;
    if (this.small) {
      this.createSmall(lengthOfLevel);
    } else {
      this.craeteBig(lengthOfLevel);
    }
    this.speed = 0.15 + Math.random() * 0.5;
    this.setHitbox(0, 0, 0, 0);
    this.animation();
  }

  craeteBig(lengthOfLevel) {
    this.loadImg(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.x = 250 + (lengthOfLevel - 200) * Math.random() - this.width;
    this.y = this.calY(this.height, this.overGroundY);
  }

  createSmall(lengthOfLevel) {
    this.height = this.height / 1.5;
    this.width = this.width / 1.5;
    this.loadImg(this.imagesWalkingSmall[0]);
    this.loadImages(this.imagesWalkingSmall);
    this.x = 250 + (lengthOfLevel - 200) * Math.random() - this.width;
    this.y = this.calY(this.height, this.overGroundY);
  }

  animation() {
    this.stoppableInterval(
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60)
    );
    this.stoppableInterval(
      setInterval(() => {
        if (this.small) {
          this.animatedImages(this.imagesWalkingSmall);
        } else {
          this.animatedImages(this.imagesWalking);
        }
      }, 200)
    );
  }

  hit() {
    this.energy = 0;
    this.deletHitbox();
    this.stopIntervals();
    if (this.small) {
      this.loadImg(this.imagesDeadSmall);
    } else {
      this.loadImg(this.imagesDead);
    }
  }
}
