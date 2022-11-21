class Bottle extends MovableObject {
	width = 70;
	height = 70;
	offset = {
		top: 10,
		bottom: 10,
		left: 20,
		right: 20,
	};
	BOTTLE_IMAGE = ["img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

	/**
	 *  Once a bottle object with different x coordinates created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor
	 */
	constructor() {
		super().loadImage(this.BOTTLE_IMAGE[0]);
		this.loadImages(this.BOTTLE_IMAGE);
		this.y = 360;
		this.x = Math.random() * 4 * 400;
	}
}
