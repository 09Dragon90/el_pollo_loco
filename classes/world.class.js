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
  keybord;
  camera_x = 0;

  constructor(canvas, keybord) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keybord = keybord;
    this.setWorld();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.cloud);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(obj) {
    if (obj.isFlipped) {
      this.ctx.save();
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(
        obj.img,
        obj.x * -1 - obj.width,
        obj.y,
        obj.width,
        obj.heigth
      );
      this.ctx.restore();
    } else {
      this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.heigth);
    }
  }

  addObjectsToMap(objArray) {
    objArray.forEach((obj) => {
      this.addToMap(obj);
    });
  }
}
