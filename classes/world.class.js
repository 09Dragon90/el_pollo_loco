class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  backgroundObjects = [
    new BackgroundObject("assets/img/5_background/layers/air.png"),
    new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png"),
    new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png"),
    new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png"),
  ];
  cloud = new Cloud();
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMap(this.cloud);
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(obj) {
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.heigth);
  }

  addObjectsToMap(objArray) {
    objArray.forEach((obj) => {
      this.addToMap(obj);
    });
  }
}
