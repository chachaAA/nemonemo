var canvas;
var context;

var mapWidth = 20;
var mapHeight = 20;

var grid = 30;
var offset = 200;

var gridSizePending = 0;

//-----------------------------------

var mapCurPosX = 0;
var mapCurPosY = 0;

var mapPosX = 0;
var mapPosY = 0;

var mouseDownX;
var mouseDownY;

var mouseMoveX;
var mouseMoveY;

var mouseDown = 0;

//------------------------------------

var mapArray;
var mapTopNums;
var mapLeftNums;

var flag = 0;

function init() {

	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	context.textAlign="center";

	canvas.addEventListener('mousedown', function(event) {
		var x = event.pageX - offset - canvas.offsetLeft,
		y = event.pageY - offset - canvas.offsetTop;

		mouseDown = 1;

		if (x >= 0 && y >= 0) {

			mouseDownX = x;
			mouseDownY = y;

			if (flag == 0) {
				canvas.addEventListener('mousemove', mouseMoveDragHandler, false);
			}
			if (flag == 1) {
				canvas.addEventListener('mousemove', mouseMovePencilHandler, false);
			}
		}

	}, false);
	canvas.addEventListener('mouseup', function(event) {
		mouseDown = 0;

		if (flag == 0) {
			canvas.removeEventListener('mousemove', mouseMoveDragHandler);

			mapPosX = mapCurPosX;
			mapPosY = mapCurPosY;
		}
		if (flag == 1) {
			canvas.removeEventListener('mousemove', mouseMovePencilHandler);

			firstPosX = -1;
			firstPosY = -1;
			curPosX = -1;
			curPosY = -1;
		}

	}, false);

	mapArray = initMapArray(mapWidth, mapHeight);
	mapTopNums = initTopNums();
	mapLeftNums = initLeftNums();

	animate();
}

function initMapArray(w, h) {
	var mapArray= new Array();

	for(var i = 0; i < h; i++)
	{
		var tmp = [];
		for (var j = 0; j < w; j++)
			tmp.push(0);
		mapArray.push(tmp);
	}

	return mapArray;
}

function initTopNums() {
	var topNums = new Array();

	for (var i = 0; i < mapWidth; i++)
	{
		var tmp = [];
		for (var j = 0; j < i%5; j++)
			tmp.push(j + 1);
		if (tmp.length == 0)
			tmp.push(0);
		topNums.push(tmp)
	}

	return topNums;
}

function initLeftNums() {
	var leftNums = new Array();

	for (var i = 0; i < mapHeight; i++)
	{
		var tmp = [];
		for (var j = 0; j < i%5; j++)
			tmp.push(j + 1);
		if (tmp.length == 0)
			tmp.push(0);
		leftNums.push(tmp)
	}

	return leftNums;
}

function moveBtnClick(event) {
	flag = 0;
}

function pencilBtnClick(event) {
	flag = 1;
}

function eraseBtnClick(event) {
	flag = 2;
}

function removeBtnClick(event) {
	flag = 3;
}

function expansionBtnClick(event) {
	gridSizePending += 30;
}

function reductionBtnClick(event) {
	gridSizePending -= 30;
}

function mouseMoveDragHandler(event) {
	var x = event.pageX - offset - canvas.offsetLeft,
		y = event.pageY - offset - canvas.offsetTop;

	mouseMoveX = x;
	mouseMoveY = y;

	mapCurPosX = mapPosX + mouseDownX - mouseMoveX;
	mapCurPosY = mapPosY + mouseDownY - mouseMoveY;
}

var firstPosX = -1;
var firstPosY = -1;

var curPosX = -1;
var curPosY = -1;

function mouseMovePencilHandler(event) {
	var x = event.pageX - offset - canvas.offsetLeft,
		y = event.pageY - offset - canvas.offsetTop;

	var posX = parseInt(x/grid);
	var posY = parseInt(y/grid);

	if (firstPosX < 0 && firstPosY < 0 && posX >= 0 && posY >= 0)
	{
		firstPosX = posX;
		firstPosY = posY;
	}

	if (Math.abs(posX - firstPosX) > Math.abs(posY - firstPosY))
	{
		curPosX = posX;
		curPosY = firstPosY;
	}
	else
	{
		curPosX = firstPosX;
		curPosY = posY;
	}

	console.log('x:' + posX + 'y:' + posY);
}

function drawTop() {

	context.beginPath();
	context.lineWidth = 1;
	for (var i = 0, tmp = -mapCurPosX; i <= mapWidth && tmp <= canvas.width; i++, tmp += grid) {

		if (tmp < -1) continue;

		context.moveTo(offset + tmp, 0);
		context.lineTo(offset + tmp, offset);
	}
	context.stroke();

	context.beginPath();
	context.lineWidth = 3;
	for (var i = 0, tmp = -mapCurPosX; i <= mapWidth/5 && tmp <= canvas.width; i++, tmp += grid*5) {

		if (tmp < -1) continue;

		context.moveTo(offset + tmp, 0);
		context.lineTo(offset + tmp, offset);
	}
	context.stroke();

	context.beginPath();
	context.lineWidth = 5;
	context.moveTo(0, offset);
	context.lineTo(Math.max(offset, Math.min(offset + mapWidth*grid - mapCurPosX, canvas.width)), offset);
	context.stroke();

	context.font = grid/2 + "px Arial";

	for (var i = 0, tx = -mapCurPosX; i < mapWidth && tx <= canvas.width; i++, tx += grid) {

		if (tx + grid < -1) continue;

		for (var j = mapTopNums[i].length - 1, ty = offset; j >= 0 && ty >= 0; j--, ty -= grid*3/4) {
			context.fillText(mapTopNums[i][j], offset + tx + grid/2, ty - grid/4);
		}
	}
}

function drawLeft() {

	context.beginPath();
	context.lineWidth = 1;
	for (var i = 0, tmp = -mapCurPosY; i <= mapHeight && tmp <= canvas.height; i++, tmp += grid) {

		if (tmp < -1) continue;

		context.moveTo(0, offset + tmp);
		context.lineTo(offset, offset + tmp);
	}
	context.stroke();

	context.beginPath();
	context.lineWidth = 3;
	for (var i = 0, tmp = -mapCurPosY; i <= mapHeight/5 && tmp <= canvas.height; i++, tmp += grid*5) {

		if (tmp < -1) continue;

		context.moveTo(0, offset + tmp);
		context.lineTo(offset, offset + tmp);
	}
	context.stroke();

	context.beginPath();
	context.lineWidth = 5;
	context.moveTo(offset, 0);
	context.lineTo(offset, Math.max(offset, Math.min(offset + mapHeight*grid - mapCurPosY, canvas.height)));
	context.stroke();

	context.font = grid/2 + "px Arial";

	for (var i = 0, ty = -mapCurPosY; i < mapHeight && ty <= canvas.height; i++, ty += grid) {

		if (ty + grid < -1) continue;

		for (var j = mapLeftNums[i].length - 1, tx = offset; j >= 0 && tx >= 0; j--, tx -= grid*3/4) {
			context.fillText(mapLeftNums[i][j], tx - grid/2, offset + ty + grid*3/4);
		}
	}
}

function drawMap() {

	context.globalAlpha = 0.5;
	for (var i = 0, ti = -mapCurPosX; i < mapWidth && ti <= canvas.width; i++, ti += grid) {

		if (ti < -grid) continue;

		for (var j = 0, tj = -mapCurPosY; j < mapHeight && tj <= canvas.height; j++, tj += grid) {

			if (tj < -grid) continue;

			if (i >= Math.min(firstPosX, curPosX) && i <= Math.max(firstPosX, curPosX)
				&& j >= Math.min(firstPosY, curPosY) && j <= Math.max(firstPosY, curPosY))
				context.fillRect(offset + ti, offset + tj, grid, grid);
		}
	}
	context.globalAlpha = 1;

	context.fillStyle="#FFFFFF";
	context.fillRect(0, 0, offset, canvas.height);
	context.fillRect(0, 0, canvas.width, offset);
	context.fillStyle="#000000";

	context.beginPath();
	context.lineWidth = 1;

	for (var i = 0, tmp = -mapCurPosX; i <= mapWidth && tmp <= canvas.width; i++, tmp += grid) {

		if (tmp < -1) continue;

		context.moveTo(offset + tmp, offset);
		context.lineTo(offset + tmp, Math.max(offset, Math.min(offset + mapHeight*grid - mapCurPosY, canvas.height)));
	}
	for (var i = 0, tmp = -mapCurPosY; i <= mapHeight && tmp <= canvas.height; i++, tmp += grid) {

		if (tmp < -1) continue;

		context.moveTo(offset, offset + tmp);
		context.lineTo(Math.max(offset, Math.min(offset + mapWidth*grid - mapCurPosX, canvas.width)), offset + tmp);
	}
	context.stroke();

	context.beginPath();
	context.lineWidth = 3;
	for (var i = 0, tmp = -mapCurPosX; i <= mapWidth/5 && tmp <= canvas.width; i++, tmp += grid*5) {

		if (tmp < -1) continue;

		context.moveTo(offset + tmp, offset);
		context.lineTo(offset + tmp, Math.max(offset, Math.min(offset + mapHeight*grid - mapCurPosY, canvas.height)));
	}
	for (var i = 0, tmp = -mapCurPosY; i <= mapHeight/5 && tmp <= canvas.height; i++, tmp += grid*5) {

		if (tmp < -1) continue;

		context.moveTo(offset, offset + tmp);
		context.lineTo(Math.max(offset, Math.min(offset + mapWidth*grid - mapCurPosX, canvas.width)), offset + tmp);
	}
	context.stroke();
}

function animate() {

	if (mouseDown == 0) {
		if (mapCurPosX > 0 && offset + mapWidth*grid - mapCurPosX < canvas.width)
		{
			var tmp = Math.max(1, (canvas.width - (offset + mapWidth*grid - mapCurPosX))/10);

			mapPosX -= tmp;
			mapCurPosX = mapPosX;
		}
		if (mapCurPosX < 0 && offset + mapWidth*grid - mapCurPosX > canvas.width)
		{
			var tmp = Math.max(1, -mapCurPosX/10);

			mapPosX += tmp;
			mapCurPosX = mapPosX;
		}
		if (mapCurPosY > 0 && offset + mapHeight*grid - mapCurPosY < canvas.height)
		{
			var tmp = Math.max(1, (canvas.height - (offset + mapHeight*grid - mapCurPosY))/10);

			mapPosY -= tmp;
			mapCurPosY = mapPosY;
		}
		if (mapCurPosY < 0 && offset + mapHeight*grid - mapCurPosY > canvas.height)
		{
			var tmp = Math.max(1, -mapCurPosY/10);

			mapPosY += tmp;
			mapCurPosY = mapPosY;
		}
	}

	if (gridSizePending != 0)
	{
		var tmp;

		if (gridSizePending > 0)
			tmp = Math.min(1, Math.round(gridSizePending/5));
		else
			tmp = Math.max(-1, Math.round(gridSizePending/5));

		grid += tmp;
		gridSizePending -= tmp;

		if (grid < 15) grid = 15;
		if (grid > 90) grid = 90;
	}

	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawMap();
	drawTop();
	drawLeft();
	context.clearRect(0, 0, offset - 3, offset - 3);

	// request new frame
	requestAnimFrame(function() {
		animate();
	});
}
