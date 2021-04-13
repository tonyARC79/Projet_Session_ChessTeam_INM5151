<script>
import { chessboard } from "vue-chessboard";
export default {
  name: "pawnTutorial",
  extends: chessboard,
  data() {
    return {
      tour: true,
      retourMove: null,
    };
  },
  methods: {
    userPlay() {
      return (orig, dest) => {
        this.retourMove = this.game.move({
          from: orig,
          to: dest,
          promotion: this.promoteTo,
        }); // pas de choix promote Reine
        this.board.set({
          fen: this.game.fen(),
        });
        this.calculatePromotions();
        this.aiNextMove();
      };
    },
    aiNextMove() {
      // La promotion ne peut que donner le flag np dans notre cas
      if (this.retourMove.flags === "np") {
        this.board.stop();
      } else {
        if (this.tour) {
          this.game.move({ from: "a1", to: "b1" });
          this.tour = false;
        } else {
          this.game.move({ from: "b1", to: "a1" });
          this.tour = true;
        }
        this.board.set({
          fen: this.game.fen(),
          turnColor: this.toColor(),
          movable: {
            color: this.toColor(),
            dests: this.possibleMoves(),
            events: { after: this.userPlay() },
          },
        });
      }
    },
  },
  mounted() {
    this.board.set({
      fen: "8/8/8/8/8/8/PPPPPPPP/8",
      movable: { events: { after: this.userPlay() } },
    });
  },
  created() {
    this.game.load("8/8/8/8/8/8/PPPPPPPP/k7 w - - 0 1");
  },
};
</script>
