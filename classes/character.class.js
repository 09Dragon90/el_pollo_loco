class Character extends MoveblaObject {
  heigth = 280;
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
  walking_sound = new Audio("assets/audio/walking.mp3");

  constructor() {
    super();
    this.loadImg(this.imagesWalk[0]);
    this.loadImages(this.imagesWalk);
    this.loadImages(this.imagesJump);
    this.y = this.calY(this.heigth, this.overGroundY);
    this.ground = this.y;
    this.animation();
    this.applyGravity();
  }

  applyGravity() {
    setInterval(() => {
      if (this.isOverGroung() || this.speedY > 0) {
        this.y -= this.speedY;
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
        this.x < this.world.level.lengthOfLevel - this.width
      ) {
        this.walking_sound.play();
        this.isFlipped = false;
        this.moveRight();
      }
      if (this.world.keybord.Left && this.x > 0) {
        this.walking_sound.play();
        this.isFlipped = true;
        this.moveLeft();
      }
      if (this.world.keybord.Up && !this.isOverGroung()) {
        this.jump();
      }
      if (this.x < this.world.level.lengthOfLevel - 620) {
        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isOverGroung()) {
        this.animatedImages(this.imagesJump);
      } else {
        if (this.world.keybord.Right || this.world.keybord.Left) {
          this.animatedImages(this.imagesWalk);
        }
      }
    }, 100);
  }
}
