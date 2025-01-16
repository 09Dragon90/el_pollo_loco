class Cloud extends MoveableObject {
  x = 0;
  y = 0;
  height = 300;
  width = 720;

  constructor() {
    super().loadImg("assets/img/5_background/layers/4_clouds/full.png");
    this.animation();
  }

  animation() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
