class Overlay extends DrawableObject {
  canvasWidth = 720;
  canvasHeight = 480;
  growing = true;

  imagesGameOver = [
    "assets/img/9_intro_outro_screens/game_over/game over!.png",
    "assets/img/9_intro_outro_screens/game_over/game over.png",
    "assets/img/9_intro_outro_screens/game_over/oh no you lost!.png",
    "assets/img/9_intro_outro_screens/game_over/you lost.png",
  ];
  imagesWin = "assets/img/9_intro_outro_screens/win/win_2.png";

  constructor(GameWin, muteSound) {
    super();
    this.loadSounds();
    this.muteSounds(muteSound);
    if (GameWin) {
      this.loadWinScreen();
      this.sounds.win_sound.play();
      this.animation();
    } else {
      this.loadLoseScreen();
      this.sounds.lose_sound.play();
    }
  }

  /**
   * Load all Sounds
   */
  loadSounds() {
    this.createdSound("assets/audio/gameLose.mp3", "lose_sound");
    this.createdSound("assets/audio/gameWin.mp3", "win_sound");
  }

  /**
   * Load the lose screen
   */
  loadLoseScreen() {
    let index = Math.floor(Math.random() * 4);
    this.loadImg(this.imagesGameOver[index]);
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
  }

  /**
   * Load the win screen
   */
  loadWinScreen() {
    this.loadImg(this.imagesWin);
    this.width = 370;
    this.height = 370;
    this.x = (this.canvasWidth - this.width) / 2;
    this.y = (this.canvasHeight - this.height) / 2;
  }

  /**
   * Play the animations
   */
  animation() {
    const id = setInterval(() => {
      let scaleFactor = 1.1;
      if (this.growing) {
        this.width *= scaleFactor;
        this.height *= scaleFactor;
      } else {
        this.width /= scaleFactor;
        this.height /= scaleFactor;
      }
      if (this.width > this.canvasWidth || this.height > this.canvasHeight) {
        this.growing = false;
      } else if (this.width < 300 || this.height < 300) {
        this.growing = true;
      }
      this.x = (this.canvasWidth - this.width) / 2;
      this.y = (this.canvasHeight - this.height) / 2;
    }, 100);
    this.stopAnimation(id);
  }

  /**
   * Stop the animations
   * @param {number} id - Id of intervall for animation
   */
  stopAnimation(id) {
    setTimeout(() => {
      clearInterval(id);
      resetBtn();
    }, 2000);
  }
}
