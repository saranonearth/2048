var Tile = function (value, column, row, isNew) {
  this.value = value || 0;
  this.row = row || -1;
  this.column = column || -1;
  this.oldRow = -1;
  this.oldColumn = -1;
  this.isMerged = false;
  this.isNew = isNew || true;
};

class Game {
  constructor() {
    this.score = 0;
    this.size = 4;
    this.bestScore = window.localStorage.getItem("bestScore");
    this.bestScore = this.bestScore ? this.bestScore : 0;
    this.gd = this.initNum(this.size);
    for (var i = 0; i < 2; i++) {
      this.checkGameStatusAndAddNum();
    }
    this.setPositions();
  }
  focusGame() {
    document.body.focus();
  }
  initNum(n) {
    var gameMap = [];
    for (var i = 0; i < n; i++) {
      var tmp = [];
      for (var j = 0; j < n; j++) {
        tmp.push({
          value: 0,
          isNew: false,
          isMerged: false,
          row: -1,
          column: -1,
          oldRow: -1,
          oldColumn: -1
        });
      }
      gameMap.push(tmp);
    }
    return gameMap;
  }
  checkGameStatusAndAddNum() {
    var pool = [];
    var state;
    var self = this;
    this.gd.forEach(function (row, keyRow) {
      row.forEach(function (elem, keyCol) {
        if (elem.value >= self.MaxScore) {
          state = true;
        } else if (elem.value === 0) {
          pool.push({
            x: keyCol,
            y: keyRow
          });
        }
      });
    });

    var pos = pool[Math.floor(Math.random() * pool.length)];
    var numValue = this.getRandomValue();
    this.gd[pos.y][pos.x] = this.addTile(numValue);
  }

  getRandomValue() {
    var randomNumValue = Math.random() < 0.5 ? 2 : 4;
    return randomNumValue;
  }

  move(direction) {
    this.clearOldTiles();
    for (var i = 0; i < direction; ++i) {
      this.gd = this.rotateLeft(this.gd);
    }
    var hasChanged = this.moveLeft();
    for (var i = direction; i < 4; ++i) {
      this.gd = this.rotateLeft(this.gd);
    }
    if (hasChanged) {
      this.checkGameStatusAndAddNum();
    }
    this.setPositions();
    return this;
  }

  clearOldTiles() {
    this.gd.forEach(function (row, keyRow) {
      row.forEach(function (elem, keyCol) {
        elem.isNew = false;
        elem.isMerged = false;
      });
    });
  }
  rotateLeft(matrix) {
    var rows = matrix.length;
    var columns = matrix[0].length;
    var res = [];
    for (var row = 0; row < rows; ++row) {
      res.push([]);
      for (var column = 0; column < columns; ++column) {
        res[row][column] = matrix[column][columns - row - 1];
      }
    }
    return res;
  }
  moveLeft() {
    var hasChanged = false;
    for (var row = 0; row < this.size; ++row) {
      var currentRow = this.gd[row].filter(function (tile) {
        return tile.value !== 0;
      });
      var resultRow = [];
      for (var target = 0; target < this.size; ++target) {
        var targetTile = currentRow.length ?
          currentRow.shift() :
          this.addTile();
        if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
          var tile1 = targetTile;
          targetTile = this.addTile(targetTile.value);
          tile1.mergedInto = targetTile;
          var tile2 = currentRow.shift();
          tile2.mergedInto = targetTile;
          targetTile.value += tile2.value;
          targetTile.isNew = false;
          targetTile.isMerged = true;
          this.score += targetTile.value;
          if (this.score > this.bestScore) {
            this.bestScore = this.score;
            window.localStorage.setItem("bestScore", this.bestScore);
          }
        }
        resultRow[target] = targetTile;

        hasChanged |= targetTile.value !== this.gd[row][target].value;
      }
      this.gd[row] = resultRow;
    }
    return hasChanged;
  }
  addTile() {
    var res = new Tile();
    Tile.apply(res, arguments);
    return res;
  }
  setPositions() {
    this.gd.forEach(function (row, rowIndex) {
      row.forEach(function (tile, columnIndex) {
        tile.oldRow = tile.row;
        tile.oldColumn = tile.column;
        tile.row = rowIndex;
        tile.column = columnIndex;
      });
    });
  }
}

export default Game;