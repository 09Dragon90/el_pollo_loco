class Chicken extends MoveblaObject {
  heigth = 70;
  width = 70;
  constructor() {
    super();
    this.loadImg("assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + 500 * Math.random();
    this.y = this.calY(this.heigth, this.overGroundY);
  }
  eat() {
    console.log("eat");
  }
}
