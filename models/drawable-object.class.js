class DrawableObject {
	img;
	imageCashe = {};
	currentImage = 0;
	x = 120;
	y = 230;
	height = 200;
	width = 100;

	// loadImage('img/testBild.png);
	loadImage(path) {
		this.img = new Image(); // <=>   this.img = document.getElementById('image') <img id="image" src>
		this.img.src = path;
	}

	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	drawFrame(ctx) {
		// Alle Objekte einen Rand geben
		if (
			this instanceof Character ||
			this instanceof Chicken ||
			this instanceof miniChicken ||
			this instanceof Endboss ||
			this instanceof Coin ||
			this instanceof Bottle ||
			this instanceof ThrowableObjects
		) {
			// Nur diese angegebenen Classen erhalten einen boarder
			ctx.beginPath();
			ctx.lineWidth = "1";
			ctx.strokeStyle = "blue";
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
			this.drawOffset(ctx);
		}
	}

	drawOffset(ctx) {
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "red";
		ctx.rect(
			this.x + this.offset.left,
			this.y + this.offset.top,
			this.width - this.offset.left - this.offset.right,
			this.height - this.offset.top - this.offset.bottom
		);
		ctx.stroke();
	}

	/**
	 *
	 * @param {Array} array - ['img/image.1.png','img/image.2.png', ...]
	 */
	loadImages(array) {
		array.forEach((path) => {
			let img = new Image();
			img.src = path;
			img.style = "transform: scaleX(-1)";
			this.imageCashe[path] = img;
		});
	}

	
}
