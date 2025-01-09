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

  constructor() {
    super();
    this.loadImg("assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalk);
    this.y = this.calY(this.heigth, this.overGroundY);
    this.animation();
  }

  animation() {
    setInterval(() => {
      if (
        this.world.keybord.Right &&
        this.x < this.world.level.lengthOfLevel - this.width
      ) {
        this.x += this.speed;
        this.isFlipped = false;
      }
      if (this.world.keybord.Left && this.x > 0) {
        this.x -= this.speed;
        this.isFlipped = true;
      }
      if (this.x < this.world.level.lengthOfLevel - 620) {
        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keybord.Right || this.world.keybord.Left) {
        let i = this.currentImage % this.imagesWalk.length;
        let path = this.imagesWalk[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 100);
  }

  jump() {
    console.log("jump");
  }
}
