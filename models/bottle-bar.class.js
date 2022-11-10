class BottleBar extends DrawableObject {
    IMAGES_BOTTLEBAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];


    constructor() {
        super().loadImage(this.IMAGES_BOTTLEBAR[0]); // Es wird super benötigt um alles vom übergeordnetem Ordner zu initalisieren
        this.loadImages(this.IMAGES_BOTTLEBAR);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setBottlebar();
    }


    setBottlebar() {
        setInterval(() => {


            if (world.collectedBottles.length >= 10) {
                this.loadImage(this.IMAGES_BOTTLEBAR[5])
            } else if (world.collectedBottles.length >= 8) {
                this.loadImage(this.IMAGES_BOTTLEBAR[4])
            } else if (world.collectedBottles.length >= 6) {
                this.loadImage(this.IMAGES_BOTTLEBAR[3])
            } else if (world.collectedBottles.length >= 4) {
                this.loadImage(this.IMAGES_BOTTLEBAR[2])
            } else if (world.collectedBottles.length >= 1) {
                this.loadImage(this.IMAGES_BOTTLEBAR[1])
            } else {
                this.loadImage(this.IMAGES_BOTTLEBAR[0])
            }

        }, 100);

    }


}