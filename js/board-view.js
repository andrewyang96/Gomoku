// SGF File Format
BOARDSIZEPX = 684;

function drawBoard(boardData, mousePos) {
	var canvas = document.getElementById("game-canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = BOARDSIZEPX;
	canvas.height = BOARDSIZEPX;
	drawBoardHelper(ctx, BOARDSIZEPX, boardData, mousePos);
}

function drawBoardHelper(ctx, boardSizePx, boardData, mousePos) {
	// Draw 19 x 19 go board
	ctx.strokeStyle = "black";
	ctx.fillStyle = "black";
	ctx.lineWidth = 1;
	var blockSize = boardSizePx / 19;
	var lowLimit = blockSize / 2;
	var hiLimit = boardSizePx - lowLimit;
	for (var i = 0; i < 19; i++) {
		// Draw horizontal line
		ctx.beginPath();
		ctx.moveTo(lowLimit, lowLimit + blockSize * i);
		ctx.lineTo(hiLimit,  lowLimit + blockSize * i);
		ctx.stroke();
		// Draw vertical line
		ctx.beginPath();
		ctx.moveTo(lowLimit + blockSize * i, lowLimit);
		ctx.lineTo(lowLimit + blockSize * i,  hiLimit);
		ctx.stroke();
	}

	// Draw dots
	var dots = [3, 9, 15];
	dots.forEach(function (i) {
		var centerY = lowLimit + blockSize * i;
		dots.forEach(function (j) {
			var centerX = lowLimit + blockSize * j;
			ctx.beginPath();
			ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI, false);
			ctx.fill();
		})
	});

	// Draw pieces and indicator
	if (boardData) {
		for (var i = 0; i < 19; i++) {
			var centerY = lowLimit + blockSize * i;
			for (var j = 0; j < 19; j++) {
				if (boardData[i][j] != 0) {
					var centerX = lowLimit + blockSize * j;
					drawPiece(ctx, centerX, centerY, blockSize, boardData[i][j]);
				}
			}
		}
		if (mousePos) {
			if (!boardData[mousePos.row][mousePos.col]) {
				var centerX = lowLimit + blockSize * mousePos.col;
				var centerY = lowLimit + blockSize * mousePos.row;
				drawIndicator(ctx, centerX, centerY, blockSize);
			}
		}
	}
}

function drawPiece(ctx, centerX, centerY, blockSize, owner) {
	if (owner == 1) {
		ctx.fillStyle = "black";
	} else if (owner == -1) {
		ctx.fillStyle = "white";
	} else {
		ctx.fillStyle = "red";
	}
	ctx.beginPath();
	ctx.arc(centerX, centerY, 0.4 * blockSize, 0, 2 * Math.PI, false);
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = "gray";
	ctx.stroke();
}

function drawIndicator(ctx, centerX, centerY, blockSize) {
	ctx.fillStyle = "green";
	ctx.beginPath();
	ctx.arc(centerX, centerY, 0.4 * blockSize, 0, 2 * Math.PI, false);
	ctx.fill();
}