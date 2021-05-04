<script>
//NE PAS EVALUER Copier coller de l'exemple fourni avec chessboard.vue
//Le but est simplement de permettre au joueur de terminer sa partie.
import { chessboard } from "vue-chessboard";
import { easyIa } from "./IA.js";
export default {
  name: "newboard",
  extends: chessboard,
  methods: {
    userPlay() {
      return (orig, dest) => {
        if (this.isPromotion(orig, dest)) {
          this.promoteTo = this.onPromotion();
        }
        this.game.move({ from: orig, to: dest, promotion: this.promoteTo }); // promote to queen for simplicity
        this.board.set({
          fen: this.game.fen(),
        });
        this.calculatePromotions();
        this.aiNextMove();
      };
    },
    aiNextMove() {
      console.log("===============TOUR==============")
      if (!this.game.game_over()) {
        var move = easyIa(this.game);
        console.log(move);
        this.game.move(move);
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
      movable: { events: { after: this.userPlay() } },
    });
  },
};
</script>
