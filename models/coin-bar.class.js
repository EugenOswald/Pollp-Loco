class CoinBar extends DrawableObject {
    IMAGES_COIN_BAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_COIN_BAR[0]); // Es wird super benötigt um alles vom übergeordnetem Ordner zu initalisieren
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setCoinbar()
    }

    setCoinbar() {
        setInterval(() => {


            if (world.collectedCoins.length >= 10) {
                this.loadImage(this.IMAGES_COIN_BAR[5])
            } else if (world.collectedCoins.length >= 8) {
                this.loadImage(this.IMAGES_COIN_BAR[4])
            } else if (world.collectedCoins.length >= 6) {
                this.loadImage(this.IMAGES_COIN_BAR[3])
            } else if (world.collectedCoins.length >= 4) {
                this.loadImage(this.IMAGES_COIN_BAR[2])
            } else if (world.collectedCoins.length >= 2) {
                this.loadImage(this.IMAGES_COIN_BAR[1])
            } else {
                this.loadImage(this.IMAGES_COIN_BAR[0])
            }

        }, 100);

    }
}