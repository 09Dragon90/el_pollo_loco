class Character extends MoveblaObject {
  heigth = 280;
  width = 120;
  constructor() {
    super();
    this.loadImg("assets/img/2_character_pepe/2_walk/W-21.png");
    this.y = this.calY(this.heigth, this.overGroundY);
  }

  jump() {
    console.log("jump");
  }
}
