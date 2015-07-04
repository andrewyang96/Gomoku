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
	this.winner = 0;
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

Board.prototype.getWinner = function () {
	return this.winner;
};

Board.prototype.makeMove = function (row, col) {
	if (this.board[row][col] != 0) {
		throw "Cannot place piece on occupied spot " + col + ", " + row;
	} else if (this.winner != 0) {
		if (this.winner == 1) {
			throw "Black has already won";
		} else if (this.winner != 1) {
			throw "White has already won";
		} else {
			throw "Winner has already been determined: not in (-1,0,1)";
		}
	}
	this.board[row][col] = this.turn;
	// Check for 5 in a row
	var blackWin = b.checkWin(1);
	if (blackWin) {
		this.winner = 1;
	} else {
		var whiteWin = b.checkWin(-1);
		if (whiteWin) {
			this.winner = -1;
		} else {
			this.turn *= -1;
		}
	}
};

Board.prototype.getBoard = function () {
	return this.board;
};

// BEGIN WIN CONDITION CODE

Board.prototype.checkWin = function (who) {
	// who == 1 or who == -1
	// Source: http://stackoverflow.com/questions/4312391/board-game-win-situation-searching-algorithm
	/*
	var horiz = this.checkHorizontal(who);
	var vert = this.checkVertical(who);
	var diag = this.checkDiagonal(who);
	if (horiz || vert || diag) console.log(horiz + " " + vert + " " + diag);
	return horiz || vert || diag;
	*/
	return this.checkHorizontal(who) || this.checkVertical(who) || this.checkDiagonal(who);
};

Board.prototype.checkHorizontal = function (who, board) {
	if (who == 1) {
		who = "a";
	} else if (who == -1) {
		who = "x";
	} else {
		throw "who parameter should be 1 or -1";
	}
	if (!board) {
		var board = this.getBoard();
	}
	helperStr = "";
	for (var i = 0; i < this.size; i++) {
		for (var j = 0; j < this.size; j++) {
			if (board[i][j] == 1) {
				helperStr += "a";
			} else if (board[i][j] == -1) {
				helperStr += "x";
			} else {
				helperStr += "o";
			}
		}
		helperStr += "0";
	}
	var regex = who + "{5,}";
	var match = helperStr.match(regex);
	return match != null;
};

Board.prototype.checkVertical = function (who, board) {
	if (!board) {
		var board = this.getBoard();
	}
	return this.checkHorizontal(who, this.transposeBoard(board));
};

Board.prototype.checkDiagonal = function (who, board) {
	if (!board) {
		var board = this.getBoard();
	}
	return this.checkVertical(who, this.diagonalShiftBoard(board, 1)) || this.checkVertical(who, this.diagonalShiftBoard(board, -1));
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

// END WIN CONDITION CODE

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