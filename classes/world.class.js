class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
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
    this.addToMap(this.character);
    this.addToMap(this.cloud);

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
