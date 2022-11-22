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
	percentage = 500;

	/**
	 *  Once a Healt-Bar Object is created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor.
	 */
	constructor() {
		super(); // Es wird super benötigt um alles vom übergeordnetem Ordner zu initalisieren
		this.loadImages(this.IMAGES_HEALTH);
		this.x = 20;
		this.y = 0;
		this.width = 200;
		this.height = 60;
		this.setPercentage(500);
	}

	/**
	 * Different images are displayed depending on how many percentages the character has
	 * @param {Number} percentage - How much life has the character
	 */
	setPercentage(percentage) {
		this.percentage = percentage; // => 0...5
		let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
		this.img = this.imageCashe[path];
	}

	/**
	 * Looks how much percent the character has and returns the matching number
	 * @returns a number from 0 - 5
	 */
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
			return 0;
		}
	}
}
