<script>
import { chessboard }  from 'vue-chessboard'
export default {
  name: 'pawnCaptureTutorial',
  extends: chessboard,
  methods: {
    userPlay() {
      return (orig, dest) => {
        this.game.move({from: orig, to: dest}) // pas de promotion de possible
        this.board.set({
          fen: this.game.fen()
        })
        this.aiNextMove()
      };
    },
    aiNextMove() {
      this.game.move({from: 'c8', to: 'b6'})
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
    this.game.load("2n5/8/p7/P4p2/4P3/8/8/8 w - - 0 1");
  },
}
</script>
