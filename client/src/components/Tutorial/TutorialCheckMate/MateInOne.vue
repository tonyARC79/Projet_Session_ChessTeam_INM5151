<script>
import { chessboard } from "vue-chessboard";
export default {
  name: "mateInOne",
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
      this.game.move({ from: "g8", to: "f6" });
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
    this.game.load(
      "r2qkbnr/1bpppppp/1pn5/p7/2B5/4PQ2/PPPP1PPP/RNB1K1NR w - - 0 1"
    );
  },
};
</script>
