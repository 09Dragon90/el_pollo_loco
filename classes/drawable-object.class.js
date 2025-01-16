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
}
