<script>
import { chessboard } from "vue-chessboard";
export default {
  name: "enPassantTutorial",
  extends: chessboard,
  data() {
    return {
      retourMove: null,
    };
  },
  methods: {
    userPlay() {
      return (orig, dest) => {
        this.game.move({ from: orig, to: dest }); // pas de promotion de possible
        this.board.set({
          fen: this.game.fen(),
        });
        this.aiNextMove();
      };
    },
    aiNextMove() {
      this.game.move({ from: "b7", to: "b5" });
      this.board.set({
        fen: this.game.fen(),
        turnColor: this.toColor(),
        movable: {
          color: this.toColor(),
          dests: this.possibleMoves(),
          events: { after: this.userPlay() },
        },
      });
    },
  },
  mounted() {
    this.board.set({
      movable: { events: { after: this.userPlay() } },
    });
  },
  created() {
    this.game.load("4k3/1p6/8/8/P7/8/8/8 w - - 0 1");
  },
};
</script>

