<script>
import { chessboard } from "vue-chessboard";
export default {
  name: "kingTutorial",
  extends: chessboard,
  methods: {
    userPlay() {
      return (orig, dest) => {
        this.retourMove = this.game.move({ from: orig, to: dest }); // pas de promotion possible
        this.board.set({
          fen: this.game.fen(),
        });
        this.aiNextMove();
      };
    },
    aiNextMove() {
      let moves = this.game.moves({ verbose: true });
      let randomMove = moves[Math.floor(Math.random() * moves.length)];
      this.game.move(randomMove);

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
    this.game.load("3K4/8/8/8/8/8/8/k7 w - - 0 1");
  },
};
</script>
