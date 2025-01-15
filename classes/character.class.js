class Character extends MoveblaObject {
  heigth = 280;
  width = 120;
  speed = 5;
  world;
  imagesWalk = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];
  walking_sound = new Audio("assets/audio/walking.mp3");

  constructor() {
    super();
    this.loadImg("assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalk);
    this.y = this.calY(this.heigth, this.overGroundY);
    this.animation();
  }

  animation() {
    setInterval(() => {
      this.walking_sound.pause();
      if (
        this.world.keybord.Right &&
        this.x < this.world.level.lengthOfLevel - this.width
      ) {
        this.walking_sound.play();
        this.x += this.speed;
        this.isFlipped = false;
      }
      if (this.world.keybord.Left && this.x > 0) {
        this.walking_sound.play();
        this.x -= this.speed;
        this.isFlipped = true;
      }
      if (this.x < this.world.level.lengthOfLevel - 620) {
        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keybord.Right || this.world.keybord.Left) {
        this.animatedImages(this.imagesWalk);
      }
    }, 100);
  }

  jump() {
    console.log("jump");
  }
}
