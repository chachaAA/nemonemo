


var mapWidth;
var mapHeight;


function init() {
	
	var map = [];

	mapWidth=20;
	mapHeight=20;

	map = initMapArray(mapWidth, mapHeight);
	/*
	alert(countWidthBlack(map, 0) + "\n" +
		countWidthBlack(map, 1) + "\n" +
		countWidthBlack(map, 2) + "\n" +
		countWidthBlack(map, 3));

	alert(countHeightBlack(map, 0) + "\n" +
		countHeightBlack(map, 1) + "\n" +
		countHeightBlack(map, 2) + "\n" +
		countHeightBlack(map, 3));
	*/
}

function initMapArray(w, h) {
	var mapArray = [];

	for(var i=0; i<h; i++) {
		var tmp = [];
		for(var j=0; j<w; j++) {
			if((i%2 == 0 && j%2 == 0)||(i%2 == 1 && j%2 == 1))
				tmp.push(1);
			else
				tmp.push(0);;
		}
		mapArray.push(tmp);
	}

	return mapArray;
}

function countWidthBlack(mapArray, k) {
	var ret="";
	var count=0;

	for(var i=0; i<mapWidth; i++) {
		if(mapArray[k][i] == 0) {
			if(count == 0)
				ret+="";
			else
				ret+=count+"";
			count = 0;
		} else {
			count += 1;
		}
	}

	if(count != 0) 
		ret += count;


	return ret;
}

function countHeightBlack(mapArray, k) {
	var ret="";
	var count=0;

	for(var i=0; i<mapHeight; i++) {
		if(mapArray[i][k] == 0) {
			if(count == 0)
				ret+="";
			else
				ret+=count+"";
			count = 0;
		} else {
			count += 1;
		}
	}

	if(count != 0)
		ret += count;


	return ret;
}
