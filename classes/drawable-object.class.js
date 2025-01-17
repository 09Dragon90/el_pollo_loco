class DrawableObject {
  x;
  y;
  height;
  width;
  img;
  imageCache = {};
  currentImage = 0;

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawBorder(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.hitbox.x,
        this.hitbox.y,
        this.hitbox.width,
        this.hitbox.height
      );
      ctx.stroke();
    }
  }
}
