class Cloud extends MoveableObject {
  y = 0;
  height = 300;
  width = 720;

  constructor(x) {
    super().loadImg("assets/img/5_background/layers/4_clouds/full.png");
    this.x = x;
    this.animation();
  }

  animation() {
    this.stoppableInterval(
      setInterval(() => {
        this.moveLeft();
      }, 1000 / 60)
    );
  }
}
