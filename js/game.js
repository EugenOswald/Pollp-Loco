let canvas;
let world;
let keyboard = new Keyboard();
let game_over_sound = new Audio("audio/game-over.mp3");
let game_winner_sound = new Audio("audio/you-win.mp3");
let gameFinish = false;
let allIntervals = [];

/**
 *  Starts the game and initiates the levels
 */
function startGame() {
	document.getElementById("canvas").classList.remove("d-none");
	document.getElementById("muteButton").classList.remove("d-none");
	document.getElementById("fullscreenButton").classList.remove("d-none");
	document.getElementById("buttonsLeft").classList.remove("d-none");
	document.getElementById("buttonsRight").classList.remove("d-none");
	document.getElementById("startScreen").classList.add("d-none");
	initLevel();
	init();
}

/**
 * Opens the game instructions
 */
function openHowToPlay() {
	document.getElementById("mainHTP").classList.remove("d-none");
}

/**
 * Close the game instructions
 */
function closeHowToPlay() {
	document.getElementById("mainHTP").classList.add("d-none");
}

/**
 * initiates the Canvas world
 */
function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);
}

/**
 * When the player has won, the winnerscreen comes up and sets gameFinish to True so that no bugs occur.
 */
function gameWinnerScreen() {
	if (gameFinish == false) {
		allIntervals.forEach(clearInterval);
		keyboard.MUTE = true;
		game_winner_sound.play();
		game_winner_sound.volume = 0.4;
		document.getElementById("endFullscreen").classList.add("d-none");
		document.getElementById("fullscreenButton").classList.add("d-none");
		document.getElementById("muteButton").classList.add("d-none");
		document.getElementById("canvas").classList.add("d-none");
		document.getElementById("endMuteButton").classList.add("d-none");
		document.getElementById("buttonsLeft").classList.add("d-none");
		document.getElementById("buttonsRight").classList.add("d-none");
		document.getElementById("gameWinnerScreen").classList.remove("d-none");
		gameFinish = true;
	}
}

/**
 * When the player has lose, the overrscreen comes up and sets gameFinish to True so that no bugs occur.
 */
function gameOverScreen() {
	if (gameFinish == false) {
		allIntervals.forEach(clearInterval);
		keyboard.MUTE = true;
		game_over_sound.play();
		document.getElementById("endFullscreen").classList.add("d-none");
		document.getElementById("fullscreenButton").classList.add("d-none");
		document.getElementById("muteButton").classList.add("d-none");
		document.getElementById("canvas").classList.add("d-none");
		document.getElementById("buttonsLeft").classList.add("d-none");
		document.getElementById("buttonsRight").classList.add("d-none");
		document.getElementById("endMuteButton").classList.add("d-none");
		document.getElementById("gameOverScreen").classList.remove("d-none");
		world.clearcanvas();
		gameFinish = true;
	}
}

/**
 * reloads the page
 */
function backToStartScreen() {
	world.resetGame();
	keyboard.MUTE = false;
	document.getElementById("canvas").classList.add("d-none");
	document.getElementById("muteButton").classList.add("d-none");
	document.getElementById("fullscreenButton").classList.add("d-none");
	document.getElementById("gameOverScreen").classList.add("d-none");
	document.getElementById("buttonsLeft").classList.add("d-none");
	document.getElementById("buttonsRight").classList.add("d-none");
	document.getElementById("gameWinnerScreen").classList.add("d-none");
	document.getElementById("startScreen").classList.remove("d-none");
	gameFinish = false;
}

/**
 * Set the game to mute and change the MuteIcon
 */
function muteGame() {
	document.getElementById("endMuteButton").classList.remove("d-none");
	document.getElementById("muteButton").classList.add("d-none");
	keyboard.MUTE = true;
}

/**
 * Removes the mute and changes the MuteIcon
 */
function endMuteGame() {
	document.getElementById("muteButton").classList.remove("d-none");
	document.getElementById("endMuteButton").classList.add("d-none");
	keyboard.MUTE = false;
}

/**
 * Set the game to fullscreen and change the fullscreen icon.
 */
function fullscreenGame() {
	let fullscreen = document.getElementById("fullscreen");
	document.getElementById("endFullscreen").classList.remove("d-none");
	document.getElementById("fullscreenButton").classList.add("d-none");
	enterFullscreen(fullscreen);
}

/**
 * Resets the fullscreeen and changes the icon
 */
function endFullscreenGame() {
	let endfullscreen = document.getElementById("fullscreen");
	document.getElementById("fullscreenButton").classList.remove("d-none");
	document.getElementById("endFullscreen").classList.add("d-none");
	exitFullscreen(endfullscreen);
}

/**
 * Set Fullscreen (Source) https://wiki.selfhtml.org/wiki/JavaScript/Fullscreen
 * @param {HTML-Element} element - HTML-ID Which DIV should become fullscreen
 */
function enterFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.msRequestFullscreen) {
		// for IE11 (remove June 15, 2022)
		element.msRequestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		// iOS Safari
		element.webkitRequestFullscreen();
	}
}

/**
 * Go out of fullscreen mode
 */
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

/**
 * A key operation is simulated and returns true and false
 * @param {Number} keyCode -  keyCode of the pressed key
 * @param {String} type - From event if keydown or keyup
 */
function simulateKeyPressed(keyCode, type) {
	let e = document.createEvent("HTMLEvents");
	e.initEvent(type, true, false);
	e.keyCode = keyCode;
	document.dispatchEvent(e);

	// -------------------------KEYDOWN----------------------

	if (e.keyCode == 39 && type == "keydown") {
		keyboard.RIGHT = true;
	}
	if (e.keyCode == 37 && type == "keydown") {
		keyboard.LEFT = true;
	}
	if (e.keyCode == 32 && type == "keydown") {
		keyboard.SPACE = true;
	}
	if (e.keyCode == 65 && type == "keydown") {
		keyboard.LEFT = true;
	}
	if (e.keyCode == 68 && type == "keydown") {
		keyboard.RIGHT = true;
	}
	if (e.keyCode == 13 && type == "keydown") {
		keyboard.ENTER = true;
	}
	// -------------------------KEYUP----------------------
	if (e.keyCode == 39 && type == "keyup") {
		keyboard.RIGHT = false;
	}
	if (e.keyCode == 37 && type == "keyup") {
		keyboard.LEFT = false;
	}
	if (e.keyCode == 32 && type == "keyup") {
		keyboard.SPACE = false;
	}
	if (e.keyCode == 65 && type == "keyup") {
		keyboard.LEFT = false;
	}
	if (e.keyCode == 68 && type == "keyup") {
		keyboard.RIGHT = false;
	}
	if (e.keyCode == 13 && type == "keyup") {
		keyboard.ENTER = false;
	}
}

/**
 * Returns which key is pressed and returns true
 */
window.addEventListener("keydown", (e) => {
	if (e.keyCode == 39) {
		keyboard.RIGHT = true;
	}
	if (e.keyCode == 37) {
		keyboard.LEFT = true;
	}
	if (e.keyCode == 32) {
		keyboard.SPACE = true;
	}
	if (e.keyCode == 65) {
		keyboard.LEFT = true;
	}
	if (e.keyCode == 68) {
		keyboard.RIGHT = true;
	}
	if (e.keyCode == 13) {
		keyboard.ENTER = true;
	}
});

/**
 * Returns which key is in the Up movement and sets true to false
 */
window.addEventListener("keyup", (e) => {
	if (e.keyCode == 39) {
		keyboard.RIGHT = false;
	}
	if (e.keyCode == 37) {
		keyboard.LEFT = false;
	}
	if (e.keyCode == 32) {
		keyboard.SPACE = false;
	}
	if (e.keyCode == 65) {
		keyboard.LEFT = false;
	}
	if (e.keyCode == 68) {
		keyboard.RIGHT = false;
	}
	if (e.keyCode == 13) {
		keyboard.ENTER = false;
	}
});
