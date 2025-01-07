class Chicken extends MoveblaObject {
  constructor() {
    super().loadImg(
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
  }
  eat() {
    console.log("eat");
  }
}
