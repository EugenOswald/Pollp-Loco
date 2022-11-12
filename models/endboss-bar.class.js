class EndbossBar extends DrawableObject {
  IMAGES_BOSSHEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  IMAGES_BOSSHEART = ["img/7_statusbars/3_icons/icon_health_endboss.png"];

  constructor() {
    super();
    this.loadImage(this.IMAGES_BOSSHEART[0]); // Es wird super benötigt um alles vom übergeordnetem Ordner zu initalisieren
    this.loadImage(this.IMAGES_BOSSHEALTH[0]);
    this.loadImages(this.IMAGES_BOSSHEALTH);
    this.x = 450;
    this.y = 0;
    this.width = 0;
    this.height = 70;
    this.setBottlebar();
  }

  setBottlebar() {
    setInterval(() => {
      if (world.level.enemies[6].energy >= 25) {
        this.loadImage(this.IMAGES_BOSSHEALTH[5]);
      } else if (world.level.enemies[6].energy >= 20) {
        this.loadImage(this.IMAGES_BOSSHEALTH[4]);
      } else if (world.level.enemies[6].energy >= 15) {
        this.loadImage(this.IMAGES_BOSSHEALTH[3]);
      } else if (world.level.enemies[6].energy >= 10) {
        this.loadImage(this.IMAGES_BOSSHEALTH[2]);
      } else if (world.level.enemies[6].energy >= 5) {
        this.loadImage(this.IMAGES_BOSSHEALTH[1]);
      } else {
        this.loadImage(this.IMAGES_BOSSHEALTH[0]);
      }
    }, 100);
  }
}
