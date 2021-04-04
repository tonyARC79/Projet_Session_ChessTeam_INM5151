<script>
import { chessboard }  from 'vue-chessboard'
export default {
  name: 'checkTutorial',
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
      console.log(this.retourMove.san);
      if (this.retourMove.san === "Kd2"){
        this.game.move({ from: 'd8', to: 'g5' })
      } else {
        this.game.move({ from: 'd8', to: 'h4' })
      }
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
    this.game.load("rbnqkn2/pppp1p2/4p3/8/8/3P4/PPP1P3/RB1QKBN1 w - - 0 1");
  },
}
</script>

