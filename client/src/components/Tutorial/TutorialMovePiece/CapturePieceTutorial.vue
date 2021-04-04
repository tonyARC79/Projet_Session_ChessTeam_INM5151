<script>
//Copier coller des exemples fourni avec chessboard.vue
//Le but est simplement de permettre au joueur de jouer contre l'IA le plus stupide au monde
//afin de leur apprendre toutes les captures possibles.  Ne pas évaluer
import { chessboard }  from 'vue-chessboard'
export default {
  name: 'newboard',
  extends: chessboard,
  methods: {
    userPlay() {
      return (orig, dest) => {
        if (this.isPromotion(orig, dest)) {
          this.promoteTo = this.onPromotion()
        }
        this.game.move({from: orig, to: dest, promotion: this.promoteTo}) // promote to queen for simplicity
        this.board.set({
          fen: this.game.fen()
        })
        this.calculatePromotions()
        this.aiNextMove()
      };
    },
    aiNextMove() {
      let moves = this.game.moves({verbose: true})
      let randomMove = moves[Math.floor(Math.random() * moves.length)]
      this.game.move(randomMove)
      this.board.set({
        fen: this.game.fen(),
        turnColor: this.toColor(),
        movable: {
          color: this.toColor(),
          dests: this.possibleMoves(),
          events: { after: this.userPlay()},
        }
      });
    },
  },
  mounted() {
    this.board.set({
      movable: { events: { after: this.userPlay()} },
    })
  }
}
</script>
