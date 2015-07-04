$(document).ready(function () {
	b = new Board();

	$("#game-canvas").mouseup(function (event) {
		var offset = $("#game-canvas").offset();
		var mouseX = event.pageX - offset.left;
		var mouseY = event.pageY - offset.top;
		var pos = b.getPos(BOARDSIZEPX, mouseX, mouseY);
		try {
			b.makeMove(pos.row, pos.col);
			drawBoard(b.getBoard());
		} catch (err) {
			console.log(err);
		}
	});

	$("#game-canvas").mousemove(function (event) {
		var offset = $("#game-canvas").offset();
		var mouseX = event.pageX - offset.left;
		var mouseY = event.pageY - offset.top;
		var pos = b.getPos(BOARDSIZEPX, mouseX, mouseY);
		drawBoard(b.getBoard(), pos);
	});

	$("#game-canvas").mouseout(function (event) {
		// Ensure that indicator goes away.
		drawBoard(b.getBoard());
	});
});