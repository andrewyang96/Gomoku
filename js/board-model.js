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

Board.prototype.checkWin = function (who) {
	// who == 1 or who == -1
	// Source: http://stackoverflow.com/questions/4312391/board-game-win-situation-searching-algorithm
	return this.checkHorizontal(who) || this.checkVertical(who) || this.checkDiagonal(who);
};

Board.prototype.checkHorizontal = function (who, board) {
	if (!board) {
		var board = this.getBoard();
	}
	helperStr = "";
	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			helperStr += board[i][j];
		}
		helperStr += "0";
	}
	var regex = "(" + who + "){5,}";
	var match = helperStr.match(regex);
	return match != null;
};

Board.prototype.transposeBoard = function (board) {
	// Make deep copy of board
	var board2 = $.extend(true, {}, board);
	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			if (i != j) {
				board2[i][j] = board[j][i];
				board2[j][i] = board[i][j];
			}
		}
	}
	return board2;
};

Board.prototype.checkVertical = function (who, board) {
	if (!board) {
		var board = this.getBoard();
	}
	return this.checkHorizontal(who, this.transposeBoard(board));
};

Board.prototype.diagonalShiftBoard = function (board, dir) {
	// dir == 1 (shift right) or dir == -1 (shift left)
	// Make deep copy of board
	var board2 = $.extend(true, {}, board);
	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			var newJ = j + (i * Math.sign(dir));
			if (newJ < 0) {
				newJ += this.size;
			} else if (newJ >= this.size) {
				newJ -= this.size;
			}
			board2[i][newJ] = board[i][j];
		}
	}
	return board2;
};

Board.prototype.checkDiagonal = function (who, board) {
	if (!board) {
		var board = this.getBoard();
	}
	return this.checkVertical(who, this.diagonalShiftBoard(board, 1)) || this.checkVertical(who, this.diagonalShiftBoard(board, -1));
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