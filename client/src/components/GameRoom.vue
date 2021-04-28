<template>
  <div>
    <div>
      <div
        id="myBoard"
        style="width: 500px; text-align: center; margin: auto"
      ></div>
      <!-- <label>Status:</label> -->
      <!-- <div id="status"></div>
      <div id="fen"></div> -->
    </div>
    <!-- <div v-else-if=""></div> -->

    <!-- <div v-if="nbPlayer == 1"><br><br>{{waitingMsg}}</div> -->
    <!-- <button v-if="!gameAccepted" class="btn btn-sm btn-primary w-100 ml-2" v-on:click="playerJoinsGame">{{joinMsg}}</button> -->
    <div id="state"></div>
  </div>
</template>

<script>
import Chessboard from "chessboardjs";
import Chess from "chess.js";
import io from "socket.io-client";
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

export default {
  name: "GameRoom",
  data() {
    return {
      nbPlayer: 0,
      waitingMsg: "",
      joinMsg: "Joindre la partie",
      gameAccepted: false,
      socket: io("http://localhost:5000", { transports: ["websocket"] }),
      game: new Chess(),
      color: "white",
      board: null,
      roomId: 0,
      piece: "",
      room: 0,
      config: {},
      play: true,
      players: 0
    };
  },
  methods: {
    // playerJoinsGame(){
    //   this.nbPlayer += 1;
    //   this.waitingMsg = 'Votre adversaire se prépare...';
    //   this.gameAccepted = true;
    // },

    onDragStart(source, piece) {
      //piece = this.piece;
      // do not pick up pieces if the game is over
      if (this.game.game_over()) return false;

      // only pick up pieces for the side to move
      if (
        (this.game.turn() === "w" && piece.search(/^b/) !== -1) ||
        (this.game.turn() === "b" && piece.search(/^w/) !== -1)
      ) {
        return false;
      }
      // if (
      //   this.game.game_over() === true || this.play ||
      //   (this.game.turn() === "w" && piece.search(/^b/) !== -1) ||
      //   (this.game.turn() === "b" && piece.search(/^w/) !== -1) ||
      //   (this.game.turn() === "w" && this.color === "black") ||
      //   (this.game.turn() === "b" && this.color === "white")
      // ) {
      //   return false;
      // }
    },

    onDrop(source, target) {
      // see if the move is legal
      var move = this.game.move({
        from: source,
        to: target,
        promotion: "q", // NOTE: always promote to a queen for example simplicity
      });

      if (this.game.game_over()) {
        this.socket.emit("gameOver", this.roomId);
      }
      // illegal move
      if (move === null) {
        return "snapback";
      } else {
        this.socket.emit("move", {
          move: move,
          board: this.game.fen(),
          room: this.roomId,
        });
      }
    },

    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    onSnapEnd() {
      this.board.position(this.game.fen());
    },

    createBoard(config) {
      return new Chessboard("myBoard", config);
    },
  },

  mounted() {
    /* eslint-disable no-unused-vars */
    var board = null;
    var socket = io("http://localhost:5000", { transports: ["websocket"] });
    //this.socket = socket;

    var color = "white";
    var players;
    var play = true;
    var roomId = 0;


    var game = this.game;

    roomId = this.room;
    
    
    
      this.socket.emit("joined", roomId);
    
    socket.on("full", function (msg) {
      if (roomId == msg) this.$router.replace("/play/full");
    });

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


    // var config = {
    //   orientation: this.color,
    //   pieceTheme: pieceTheme,
    //   draggable: true,
    //   position: "start",
    //   onDragStart: this.onDragStart,
    //   onDrop: this.onDrop,
    //   onSnapEnd: this.onSnapEnd,
    // };
    // this.board = Chessboard("myBoard", config);
    // board = this.board;

    socket.on("play", function (msg) {
      if (msg == roomId) {
        this.play = false;
      }
      console.log(msg);
    });

    socket.on("move", function (msg) {
      if (msg.room == roomId) {
        game.move(msg.move);
        board.position(game.fen());
        console.log("moved : " + msg.move);
      }
    });

    socket.on("player", (msg) => {
      this.color = msg.color;
      this.players = msg.players;
      console.log(this.color);
      if (players == 2) {
        this.play = false;
        socket.emit("play", msg.roomId);
      }
    });

    this.config = {
      orientation: this.color,
      pieceTheme: pieceTheme,
      draggable: true,
      position: "start",
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
      onSnapEnd: this.onSnapEnd,
    };
    this.board = this.createBoard(this.config);
    board = this.board;

    //updateStatus();
  },
};
</script>
<style lang="">
</style>