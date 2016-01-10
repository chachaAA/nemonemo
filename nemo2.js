var canvas;
var context;

var mapWidth = 20;
var mapHeight = 20;

var mapPosX = 0;
var mapPosY = 0;

var grid = 30;
var offset = 200;

function init() {

	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');

	animate();
}

function drawMap() {

	context.beginPath();
	context.lineWidth = 1;
	for (var i = 0, tmp = -mapPosX; i <= mapWidth && tmp <= canvas.width; i++, tmp += grid) {

		if (tmp < 0) continue;

		context.moveTo(offset + tmp, offset);
		context.lineTo(offset + tmp, Math.min(offset + mapHeight*grid - mapPosY, canvas.height));
	}
	for (var i = 0, tmp = -mapPosY; i <= mapHeight && tmp <= canvas.height; i++, tmp += grid) {

		if (tmp < 0) continue;

		context.moveTo(offset, offset + tmp);
		context.lineTo(Math.min(offset + mapWidth*grid - mapPosX, canvas.width), offset + tmp);
	}
	context.stroke();

	context.beginPath();
	context.lineWidth = 3;
	for (var i = 0, tmp = -mapPosX; i <= mapWidth/5 && tmp <= canvas.width; i++, tmp += grid*5) {

		if (tmp < 0) continue;

		context.moveTo(offset + tmp, offset);
		context.lineTo(offset + tmp, Math.min(offset + mapHeight*grid - mapPosY, canvas.height));
	}
	for (var i = 0, tmp = -mapPosY; i <= mapHeight/5 && tmp <= canvas.height; i++, tmp += grid*5) {

		if (tmp < 0) continue;

		context.moveTo(offset, offset + tmp);
		context.lineTo(Math.min(offset + mapWidth*grid - mapPosX, canvas.width), offset + tmp);
	}
	context.stroke();
}

function animate() {

	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawMap();

	// request new frame
	requestAnimFrame(function() {
		animate();
	});
}
