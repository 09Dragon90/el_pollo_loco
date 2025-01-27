class Endboss extends MoveableObject {
  height = 350;
  width = 250;
  sleep = true;

  imagesWalking = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  imagesAlert = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  imagesAttack = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  imagesHurt = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  imagesDead = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor(lengthOfLevel) {
    super();
    this.loadImg(this.imagesAlert[1]);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.x = lengthOfLevel - this.width - 50;
    this.y = this.calY(this.height, this.overGroundY) + 10;
    this.setHitbox(60, 10, 30, 10);
  }

  animation() {
    this.stoppableInterval(
      setInterval(() => {
        if (this.isDead()) {
          this.playAnimationsDead();
        } else if (this.isHurt()) {
          this.animatedImages(this.imagesHurt);
        } else {
          this.animatedImages(this.imagesWalking);
        }
      }, 200)
    );
  }

  hit() {
    if (this.sleep) this.wakeUp();
    if (!this.isDead() && !this.isHurt()) {
      this.energy -= 10;
      this.lastHit = new Date().getTime();
    }
    if (this.isDead()) this.deletHitbox();
  }

  wakeUp() {
    this.animation();
    this.sleep = false;
  }
}
