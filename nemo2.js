var canvas;
var context;

var mapWidth = 20;
var mapHeight = 20;

var mapPosX = 20;
var mapPosY = 20;

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
	for (var i = 0, tmp = 0; i <= mapWidth && tmp <= canvas.width; i++, tmp += grid) {
		context.moveTo(offset + tmp, offset);
		context.lineTo(offset + tmp, Math.min(offset + mapHeight*grid, canvas.height));
	}
	for (var i = 0, tmp = 0; i <= mapHeight && tmp <= canvas.height; i++, tmp += grid) {
		context.moveTo(offset, offset + tmp);
		context.lineTo(Math.min(offset + mapWidth*grid, canvas.width), offset + tmp);
	}
	context.stroke();

	context.beginPath();
	context.lineWidth = 3;
	for (var i = 0, tmp = 0; i <= mapWidth/5 && tmp <= canvas.width; i++, tmp += grid*5) {
		context.moveTo(offset + tmp, offset);
		context.lineTo(offset + tmp, Math.min(offset + mapHeight*grid, canvas.height));
	}
	for (var i = 0, tmp = 0; i <= mapHeight/5 && tmp <= canvas.height; i++, tmp += grid*5) {
		context.moveTo(offset, offset + tmp);
		context.lineTo(Math.min(offset + mapWidth*grid, canvas.width), offset + tmp);
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
