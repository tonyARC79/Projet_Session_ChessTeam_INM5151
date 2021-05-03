<style>
@import "../assets/chess.css";
</style>

<template>
  <div class="game-container">
    <div class="aside-container"></div>
    <div class="chessboard-container">
      <div id="myBoard" class="chessboard"></div>

      <div id="state" class="message-container">
        <!--mettre div du message board ici-->

        <h3>VS Opponent</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Chessboard from "chessboardjs";
import Chess from "chess.js";
import bPawn from "../static/img/chesspieces/wikipedia/bP.png";
import bKing from "../static/img/chesspieces/wikipedia/bK.png";
import bQueen from "../static/img/chesspieces/wikipedia/bQ.png";
import bBishop from "../static/img/chesspieces/wikipedia/bB.png";
import bKnight from "../static/img/chesspieces/wikipedia/bN.png";
import bRook from "../static/img/chesspieces/wikipedia/bR.png";
import wPawn from "../static/img/chesspieces/wikipedia/wP.png";
import wKing from "../static/img/chesspieces/wikipedia/wK.png";
import wQueen from "../static/img/chesspieces/wikipedia/wQ.png";
import wBishop from "../static/img/chesspieces/wikipedia/wB.png";
import wKnight from "../static/img/chesspieces/wikipedia/wN.png";
import wRook from "../static/img/chesspieces/wikipedia/wR.png";
import { easyIa } from "./IA.js";

export default {
  name: "IaRoom",
  data() {
    return {
      color: "white",
      board: null,
      piece: "",
      config: {},
      iaMove: null,
      position: null,
      orientation: "white",
    };
  },
mounted() {

var board = null
var game = new Chess()

function onDragStart (source, piece) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false

  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false
}

function makeRandomMove () {
  if (!game.game_over()){
      var move = easyIa(game);
      if (move === null) return
      game.move(move)
      board.position(game.fen())
  }
}

function onDrop (source, target) {
  // see if the move is legal

  var move1 = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })
  // illegal move
  if (move1 === null) return 'snapback'
  
  // make random legal move for black
  window.setTimeout(makeRandomMove, 250)
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}
function pieceTheme(piece) {
      //piece = this.pieceTheme;
      // wikipedia theme for white pieces
      if (piece.search(/w/) !== -1) {
        if (piece.charAt(1) == "P") {
          return wPawn;
        } else if (piece.charAt(1) == "K") {
          return wKing;
        } else if (piece.charAt(1) == "Q") {
          return wQueen;
        } else if (piece.charAt(1) == "B") {
          return wBishop;
        } else if (piece.charAt(1) == "N") {
          return wKnight;
        } else if (piece.charAt(1) == "R") {
          return wRook;
        }

        // return "../static/img/chesspieces/wikipedia/" + piece + ".png";
      } else {
        // alpha theme for black pieces
        //return "img/chesspieces/alpha/" + piece + ".png";
        if (piece.charAt(1) == "P") {
          return bPawn;
        } else if (piece.charAt(1) == "K") {
          return bKing;
        } else if (piece.charAt(1) == "Q") {
          return bQueen;
        } else if (piece.charAt(1) == "B") {
          return bBishop;
        } else if (piece.charAt(1) == "N") {
          return bKnight;
        } else if (piece.charAt(1) == "R") {
          return bRook;
        }
      }
    }

var config = {
  orientation: "white",
  pieceTheme: pieceTheme,
  position: "start",
  draggable: true,
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)
}
};
</script>
<style lang="">
</style>

