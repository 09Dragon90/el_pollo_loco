class Cloud extends MoveblaObject {
  x = 0;
  y = 0;
  heigth = 300;
  width = 720;
  constructor() {
    super().loadImg("assets/img/5_background/layers/4_clouds/full.png");
    this.animation();
  }

  animation() {
    setInterval(() => {
      this.x -= 1;
    }, 1000 / 60);
  }
}
