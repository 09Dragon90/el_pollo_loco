class Character extends MoveblaObject {
  heigth = 280;
  width = 120;
  imagesIdel = [
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
  currentImage = 0;

  constructor() {
    super();
    this.loadImg("assets/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.imagesIdel);
    this.y = this.calY(this.heigth, this.overGroundY);
    this.animation();
  }

  animation() {
    setInterval(() => {
      let i = this.currentImage % this.imagesIdel.length;
      let path = this.imagesIdel[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }

  jump() {
    console.log("jump");
  }
}
