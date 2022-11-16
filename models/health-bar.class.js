class HealthBar extends DrawableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  gameOver = new Audio("audio/game-over.mp3");
  percentage = 100;

  constructor() {
    super(); // Es wird super benötigt um alles vom übergeordnetem Ordner zu initalisieren
    this.loadImages(this.IMAGES_HEALTH);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(500);
  }

  setPercentage(percentage) {
    this.percentage = percentage; // => 0...5
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCashe[path];
  }

  resolveImageIndex() {
    if (this.percentage == 500) {
      return 5;
    } else if (this.percentage > 400) {
      return 4;
    } else if (this.percentage > 300) {
      return 3;
    } else if (this.percentage > 200) {
      return 2;
    } else if (this.percentage > 100) {
      return 1;
    } else {
      // this.gameOver.play();
      // gameOverScreen();
      
      return 0;
    }
  }
}
