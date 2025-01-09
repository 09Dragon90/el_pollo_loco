class BackgroundObject extends MoveblaObject {
  x;
  y = 0;
  heigth = 480;
  width = 720 * 2;
  constructor(ImagePath, x = 0) {
    super().loadImg(ImagePath);
    this.x = x;
  }
}
