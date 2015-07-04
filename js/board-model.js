BOARDSIZE = 19;

var Board = function () {
	this.size = BOARDSIZE;
	this.board = {}
	for (var i = 0; i < this.size; i++) {
		this.board[i] = {}
		for (var j = 0; j < this.size; j++) {
			this.board[i][j] = 0;
		}
	}
	this.turn = 1; // 1 = black, -1 = white
};

Board.prototype.getPos = function (boardSizePx, mouseX, mouseY) {
	var blockSize = boardSizePx / this.size;
	return {row: Math.floor(mouseY / blockSize), col: Math.floor(mouseX / blockSize)};
};

Board.prototype.getPiece = function (row, col) {
	return this.board[row][col];
};

Board.prototype.whoseTurn = function () {
	return this.turn;
};

Board.prototype.makeMove = function (row, col) {
	if (this.board[row][col]) {
		throw "Cannot place piece on occupied spot " + col + ", " + row;
	}
	this.board[row][col] = this.turn;
	this.turn *= -1;
};

Board.prototype.getBoard = function () {
	return this.board;
};

Board.prototype.toString = function () {
	var ret = ""
	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			var sq = this.getPiece(i, j);
			if (sq == -1) {
				ret += (sq + " ");
			} else {
				ret += (" " + sq + " ");
			}
		}
		ret += "\n";
	}
	return ret;
};