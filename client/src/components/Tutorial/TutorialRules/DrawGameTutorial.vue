<script>
import { chessboard } from "vue-chessboard";
export default {
  name: "drawGameTutorial",
  extends: chessboard,
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
      this.game.move({ from: "c5", to: "b3" });
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
    this.game.load("7k/7p/7P/2n5/8/8/7r/K7 w - - 0 1");
  },
};
</script>

