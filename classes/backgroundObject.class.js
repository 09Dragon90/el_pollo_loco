class BackgroundObject extends MoveblaObject {
  x = 0;
  y = 0;
  heigth = 480;
  width = 720;
  constructor(ImagePath) {
    super().loadImg(ImagePath);
  }
}
