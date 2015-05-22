var squaresOnBoard = [];
var player = {
  squares: [[2, 2]],
  head: [2, 2],
  maxLength: 3,
  maxMoves: 8,
  movesMade: 0,
  movesRemaining: function() {
    return this.maxMoves - this.movesMade;
  }
};

var color1 = 'rgb(100,200,100)';
var color2 = 'rgb(200,100,200)';
var color3 = 'rgb(0,100,100)';
var color4 = 'rgb(255,255,60)';

document.addEventListener("DOMContentLoaded", function(event) {
  'use strict';
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');

  var size = 48;
  var space = 10;
  var xMany = Math.floor((canvas.width - space) / (size + space));
  var yMany = Math.floor((canvas.height - space) / (size + space));

  // console.log(xMany, yMany);

  for (var i = 0; i < xMany; i++) {
    for (var j = 0; j < yMany; j++) {
      var x = space + i*(size + space);
      var y = space + j*(size + space);
      squaresOnBoard.push({ x: x, y: y, size: size, loc: [i, j] });
    }
  }
  drawOnCanvas(ctx);
  canvas.addEventListener('click', function(e) {
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;

    var clickedSquare = null;
    for (var i = 0; i < squaresOnBoard.length; i++) {
      var square = squaresOnBoard[i];
      if(square.x < x && square.x + square.size > x && square.y < y && square.y + square.size > y) {
        clickedSquare = square;
        break;
      }
    }
    if(clickedSquare && player.movesRemaining() > 0 && squareNextTo(clickedSquare.loc, player.head)) {
      player.head = clickedSquare.loc;
      player.squares.unshift(clickedSquare.loc);
      player.squares = player.squares.slice(0, player.maxLength);
      player.movesMade++;
    }
    drawOnCanvas(ctx);
    // console.log({ x: x, y: y});
  }, false);
});

function squareNextTo(a, b) {
  return squareDist(a, b) === 1;
}

function drawOnCanvas(ctx) {
  squaresOnBoard.forEach(function(square) {
    if(arrayEqual(player.head, square.loc)) {
      ctx.fillStyle = color3;
    } else if(isInArray(player.squares, square.loc)) {
      ctx.fillStyle = color2;
    } else if(squareDist(square.loc, player.head) <= player.movesRemaining()) {
      ctx.fillStyle = color4;
    } else {
      ctx.fillStyle = color1;
    }
    ctx.fillRect(square.x, square.y, square.size, square.size);
  });
}

function isInArray(arr, val) {
  if(!arr) return false;
  for (var i = 0; i < arr.length; i++) {
    if(arrayEqual(arr[i], val)) return true;
  }
  return false;
}

function arrayEqual(arr1, arr2) {
  if(!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  for (var i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function squareDist(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
