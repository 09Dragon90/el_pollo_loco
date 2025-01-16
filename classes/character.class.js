class Character extends MoveblaObject {
  height = 280;
  width = 120;
  speed = 5;
  ground;
  world;
  speedY = 0;
  acceleration = 2;
  imagesWalk = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  imagesJump = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];
  imagesDead = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];
  imagesIdle = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  imagesHurt = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];
  walking_sound = new Audio("assets/audio/walking.mp3");

  constructor() {
    super();
    this.loadImg(this.imagesIdle[0]);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesWalk);
    this.loadImages(this.imagesJump);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesHurt);
    this.y = this.calY(this.height, this.overGroundY);
    this.ground = this.y;
    this.setHitbox(100, 10, 15, 15);
    this.animation();
    this.applyGravity();
  }

  applyGravity() {
    setInterval(() => {
      if (this.isOverGroung() || this.speedY > 0) {
        this.y -= this.speedY;
        this.hitbox.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isOverGroung() {
    return this.y < this.ground;
  }

  animation() {
    setInterval(() => {
      this.walking_sound.pause();
      if (
        this.world.keybord.Right &&
        this.x < this.world.level.lengthOfLevel - this.width &&
        !this.isDead()
      ) {
        this.walking_sound.play();
        this.isFlipped = false;
        this.moveRight();
      }
      if (this.world.keybord.Left && this.x > 0 && !this.isDead()) {
        this.walking_sound.play();
        this.isFlipped = true;
        this.moveLeft();
      }
      if (this.world.keybord.Space && !this.isOverGroung() && !this.isDead()) {
        this.jump();
      }
      if (this.x < this.world.level.lengthOfLevel - 620) {
        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.animatedImages(this.imagesDead);
      } else if (this.isHurt()) {
        this.animatedImages(this.imagesHurt);
      } else if (this.isOverGroung()) {
        this.animatedImages(this.imagesJump);
      } else if (this.world.keybord.Right || this.world.keybord.Left) {
        this.animatedImages(this.imagesWalk);
      } else {
        this.animatedImages(this.imagesIdle);
      }
    }, 100);
  }
}
