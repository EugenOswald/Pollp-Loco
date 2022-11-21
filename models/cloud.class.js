class Cloud extends MovableObject {
	y = 0;
	height = 480;
	width = 720;

	/**
	 *  Once a Cloud Object is created, its image path is stored in the src attribute of a newly created image object
	 *  using 'loadImage()' of the super constructor
	 */
	constructor() {
		super().loadImage("img/5_background/layers/4_clouds/1.png");
		this.x = 500 + Math.random() * 2000; // Math.random() generiert nur eine zahl zwischen 0 - 1  z.B. 0,45
		this.animate();
	}

	animate() {
		this.moveLeft();
	}
}
