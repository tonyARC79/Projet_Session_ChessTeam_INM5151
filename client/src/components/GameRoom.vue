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

        <h2>{{ username }} VS {{ this.$route.query.opponent }}</h2>
        Moves: {{ this.updateMoveHistory() }}
      </div>
    </div>
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
import store from "../store";

export default {
  name: "GameRoom",
  data() {
    return {
      username: store.getters.username,
      socket: io("http://localhost:5000", { transports: ["websocket"] }),
      game: new Chess(),
      color: "white",
      board: null,
      roomId: 0,
      piece: "",
      room: 0,
      config: {},
      play: true,
      players: 0,
      nbMove: 0,
      game_id: this.$route.query.game_id
    };
  },
  methods: {
    onDragStart(source, piece) {
      //piece = this.piece;
      // do not pick up pieces if the game is over
      if (this.game.game_over()) return false;

      // only pick up pieces for the side to move
      if (
        (this.game.turn() === "w" && piece.search(/^b/) !== -1) ||
        (this.game.turn() === "b" && piece.search(/^w/) !== -1) ||
        (this.game.turn() === "w" && this.color == "black") ||
        (this.game.turn() === "b" && this.color == "white")
      ) {
        return false;
      }
      console.log(this.color);
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

        let gameResults = {
          game_id: this.game_id,
          winner: this.color + ' ' + username,
          moves: ''
        }
        if (this.color == "white") {
          this.$store
            .dispatch("setGameResult", gameResults)
            .then((resp) => {
              if (resp.status == 201) {
                console.log('Félicitations! Vous avez gagné la partie! :D')
              } else {
                this.makeToast("Erreur avec le serveur, veuillez réesayer");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
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
    updateMoveHistory() {
      console.log("yooo");
      return this.game.history({ verbose: true });
    },

    getOpponentName() {
      this.$store
        .dispatch("getGameInfosById", this.$route.query.game_id)
        .then((infos) => {
          return infos.game_id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    /* eslint-disable no-unused-vars */
    var board = null;
    var socket = this.socket;
    var roomId = 0;

    var game = this.game;

    roomId = this.room;

    socket.emit("joined", { roomId: roomId, username: this.username });

    socket.on("opponent", function (opponent) {
      this.opponent = opponent;
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

    socket.on("play", function (msg) {
      if (msg == this.roomId) {
        this.play = false;
      }
      console.log(msg);
    });

    socket.on("move", function (msg) {
      if (msg.room == roomId) {
        game.move(msg.move);
        board.position(game.fen());
        console.log("moved : " + msg.move.to);
        this.currentMove = game.history({ verbose: true });
        console.log(this.currentMove);
      }
    });

    socket.on("player", (msg) => {
      this.color = msg.color;
      this.players = msg.players;
      console.log(msg);
      if (this.players == 2) {
        this.play = false;
        socket.emit("play", msg.roomId);
      }
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
    });
  },
  // destroyed() {
  //   this.socket.emit("disconnect");
  // },
};
</script>
<style lang="">
</style>