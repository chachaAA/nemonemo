var wh = 600;
var grid = 30;
var offset = 150;
var ctx;
var flag; // 어떤 색을 칠 할 건지 체크


function init() {

	initCanvas();
}


function initCanvas() {
	var canvas=document.getElementById("myCanvas");

	flag = 0;
	ctx = canvas.getContext("2d");

	ctx.lineWidth = 3;
	for (var i=0; i<=wh/grid/5; i++) {
		ctx.moveTo(offset + grid*5*i, offset + 0);
		ctx.lineTo(offset + grid*5*i, offset + wh);
		ctx.moveTo(offset + 0, offset + grid*5*i);
		ctx.lineTo(offset + wh, offset + grid*5*i);
	}
	ctx.stroke();

	ctx.lineWidth = 1;
	for (var i=1; i<=wh/grid; i++) {
		ctx.moveTo(offset + grid*i, offset + 0);
		ctx.lineTo(offset + grid*i, offset + wh);
		ctx.moveTo(offset + 0, offset + grid*i);
		ctx.lineTo(offset + wh, offset + grid*i);
	}
	ctx.stroke();

	canvas.addEventListener('mousedown', function(event) {
		var x = event.pageX - offset,
      	y = event.pageY - offset;

	    var l = Math.floor(x/grid)*grid;
	    var t = Math.floor(y/grid)*grid;

      	if (l >= 0 && t >= 0) {

		    ctx.fillRect(offset + l, offset + t, grid, grid);

			canvas.addEventListener('mousemove', mouseMoveHandler, false);
      	}
	}, false);
	canvas.addEventListener('mouseup', function(event) {
		canvas.removeEventListener('mousemove', mouseMoveHandler);
	}, false);
}

function mouseMoveHandler(event) {
    var x = event.pageX - offset,
      	y = event.pageY - offset;

    var l = Math.floor(x/grid)*grid;
    var t = Math.floor(y/grid)*grid;

	if (l >= 0 && t >= 0) {
		ctx.fillRect(offset + l, offset + t, grid, grid);
	}
}


function pencilBtnClick(event) {
	ctx.fillStyle = "#000000";
	flag = 0;
}

function eraseBtnClick(event) {
	ctx.fillStyle = "#FFFFFF";
	flag = 1;
}

function removeBtnClick(event) {
	flag = 2;
}