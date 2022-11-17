let canvas;
let world;
let keyboard = new Keyboard();
let game_over_sound = new Audio("audio/game-over.mp3");
let game_winner_sound = new Audio("audio/you-win.mp3");
let gameFinish = false;

function startGame() {
	document.getElementById("canvas").classList.remove("d-none");
	document.getElementById("muteButton").classList.remove("d-none");
	document.getElementById("fullscreenButton").classList.remove("d-none");
	document.getElementById("startScreen").classList.add("d-none");
	initLevel();
	init();
}

function openHowToPlay() {
	document.getElementById("mainHTP").classList.remove("d-none");
}

function closeHowToPlay() {
	document.getElementById("mainHTP").classList.add("d-none");
}
function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);
}

function gameWinnerScreen() {
	if (gameFinish == false) {
		keyboard.MUTE = true;
		game_winner_sound.play();
		game_winner_sound.volume = 0.4;
		document.getElementById("endFullscreen").classList.add("d-none");
		document.getElementById("fullscreenButton").classList.add("d-none");
		document.getElementById("muteButton").classList.add("d-none");
		document.getElementById("canvas").classList.add("d-none");
		document.getElementById("endMuteButton").classList.add("d-none");
		document.getElementById("gameWinnerScreen").classList.remove("d-none");
		gameFinish = true;
	}
}

function gameOverScreen() {
	if (gameFinish == false) {
		keyboard.MUTE = true;
		game_over_sound.play();
		document.getElementById("endFullscreen").classList.add("d-none");
		document.getElementById("fullscreenButton").classList.add("d-none");
		document.getElementById("muteButton").classList.add("d-none");
		document.getElementById("canvas").classList.add("d-none");
		document.getElementById("endMuteButton").classList.add("d-none");
		document.getElementById("gameOverScreen").classList.remove("d-none");
		gameFinish = true;
	}
}

function backToStartScreen() {
	location.reload();
}

function muteGame() {
	document.getElementById("endMuteButton").classList.remove("d-none");
	document.getElementById("muteButton").classList.add("d-none");
	keyboard.MUTE = true;
}

function endMuteGame() {
	document.getElementById("muteButton").classList.remove("d-none");
	document.getElementById("endMuteButton").classList.add("d-none");
	keyboard.MUTE = false;
}

function fullscreenGame() {
	let fullscreen = document.getElementById("fullscreen");
	document.getElementById("endFullscreen").classList.remove("d-none");
	document.getElementById("fullscreenButton").classList.add("d-none");
	enterFullscreen(fullscreen);
}

function endFullscreenGame() {
	let endfullscreen = document.getElementById("fullscreen");
	document.getElementById("fullscreenButton").classList.remove("d-none");
	document.getElementById("endFullscreen").classList.add("d-none");
	exitFullscreen(endfullscreen);
}

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

function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
}

function simulateKeyPressed(keyCode, type) {
	let e = document.createEvent("HTMLEvents"); //Event is created
	e.initEvent(type, true, false); //Event is initialised
	e.keyCode = keyCode; //Event gets the keyCode

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
		keyboard.ENTE = true;
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
		keyboard.ENTE = false;
	}
}

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
