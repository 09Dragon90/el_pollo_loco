class Overlay extends DrawableObject {
  imagesGameOver = [
    "assets/img/9_intro_outro_screens/game_over/game over!.png",
    "assets/img/9_intro_outro_screens/game_over/game over.png",
    "assets/img/9_intro_outro_screens/game_over/oh no you lost!.png",
    "assets/img/9_intro_outro_screens/game_over/you lost.png",
  ];
  imagesWin = "assets/img/9_intro_outro_screens/win/win_2.png";

  constructor(GameWin) {
    super();
    if (!GameWin) {
      this.loadWinScreen();
    } else {
      this.loadLoseScreen();
    }
  }

  loadLoseScreen() {
    let index = Math.floor(Math.random() * 4);
    this.loadImg(this.imagesGameOver[index]);
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
  }

  loadWinScreen() {
    this.loadImg(this.imagesWin);
    this.width = 370;
    this.height = 370;
    this.x = this.width / 2;
    this.y = this.height / 2;
  }
}
