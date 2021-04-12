<script>
import { chessboard } from "vue-chessboard";
export default {
  name: "castlingTutorial",
  extends: chessboard,
  methods: {
    userPlay() {
      return (orig, dest) => {
        this.retourMove = this.game.move({ from: orig, to: dest }); // pas de promotion de possible
        this.board.set({
          fen: this.game.fen(),
        });
        this.aiNextMove();
      };
    },
    aiNextMove() {
      this.game.move({ from: "e8", to: "c8" });

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
      "r3kbnr/pbppqppp/1pn1p3/8/8/1PN1P3/PBPPQPPP/R3KBNR w Qq - 0 1"
    );
  },
};
</script>

