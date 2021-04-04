<script>
import { chessboard }  from 'vue-chessboard'
export default {
  name: 'castlingTutorial',
  extends: chessboard,
  methods: {
    userPlay() {
      return (orig, dest) => {
        this.retourMove = this.game.move({from: orig, to: dest}) // pas de promotion de possible
        this.board.set({
          fen: this.game.fen()
        })
        this.aiNextMove()
      };
    },
    aiNextMove() {
      this.game.move({ from: 'e8', to: 'g8' })

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
  },
  created(){
    this.game.load("rnbqk2r/ppppppbp/5np1/8/8/5NP1/PPPPPPBP/RNBQK2R w Kk - 0 1");
  },
}
</script>

