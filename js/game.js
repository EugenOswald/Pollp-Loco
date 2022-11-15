let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
	document.getElementById("canvas").classList.remove("d-none");
	document.getElementById("muteButton").classList.remove("d-none");
	document.getElementById("fullscreen").classList.remove("d-none");
	document.getElementById("startScreen").classList.add("d-none");
	initLevel();
	init();
}

function init() {
	canvas = document.getElementById("canvas");
	world = new World(canvas, keyboard);
}

function gameOverScreen() {
	document.getElementById("canvas").classList.add("d-none");
	document.getElementById("gameOverScreen").classList.remove("d-none");
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
	fullscreen.classList.add("d-none");
	enterFullscreen(fullscreen);
}

function endFullscreenGame() {
	let endfullscreen = document.getElementById("endFullscreen");
  document.getElementById("fullscreen").classList.remove("d-none");
	endfullscreen.classList.add("d-none");
	exitFullscreen();
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

window.addEventListener("keydown", (e) => {
	if (e.keyCode == 39) {
		keyboard.RIGHT = true;
	}
	if (e.keyCode == 37) {
		keyboard.LEFT = true;
	}
	if (e.keyCode == 38) {
		keyboard.UP = true;
	}
	if (e.keyCode == 40) {
		keyboard.DOWN = true;
	}

	if (e.keyCode == 32) {
		keyboard.SPACE = true;
	}

	if (e.keyCode == 65) {
		keyboard.LEFT = true;
	}
	if (e.keyCode == 87) {
		keyboard.UP = true;
	}
	if (e.keyCode == 68) {
		keyboard.RIGHT = true;
	}
	if (e.keyCode == 83) {
		keyboard.DOWN = true;
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
	if (e.keyCode == 38) {
		keyboard.UP = false;
	}
	if (e.keyCode == 40) {
		keyboard.DOWN = false;
	}

	if (e.keyCode == 32) {
		keyboard.SPACE = false;
	}

	if (e.keyCode == 65) {
		keyboard.LEFT = false;
	}
	if (e.keyCode == 87) {
		keyboard.UP = false;
	}
	if (e.keyCode == 68) {
		keyboard.RIGHT = false;
	}
	if (e.keyCode == 83) {
		keyboard.DOWN = false;
	}
	if (e.keyCode == 13) {
		keyboard.ENTER = false;
	}
});
