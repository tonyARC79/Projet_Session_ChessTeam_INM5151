<script>
import { chessboard }  from 'vue-chessboard'
import 'vue-chessboard/dist/vue-chessboard.css'
export default {
  name: 'editor',
  extends: chessboard,
  data () {
    return {
     tour: true,
     promote: '',
    }
  },
  methods: {
    userPlay() {
          return (orig, dest) => {
        console.log(this.game.turn());
        if (this.isPromotion(orig, dest)) {
          console.log("salut");
          this.game.move({from: orig, to: dest, promotion: 'q'}) // promote to queen for simplicity
          this.board.set({
            fen: this.game.fen(),
          })
          this.aiNextMove();
            } else {
            console.log("bonjour");
            this.game.move({from: orig, to: dest}) // promote to queen for simplicity
            console.log(this.game.fen());
            this.board.set({
              fen: this.game.fen(),
            })
            this.calculatePromotions ();
            this.aiNextMove();
          }
      };
    },
    aiNextMove() {
      if (this.tour){
       this.game.move({ from: 'a1', to: 'b1' })
       this.tour=false;
      } else { 
        this.game.move({ from: 'b1', to: 'a1' })
        this.tour=true;
      }
      console.log(this.possibleMoves());
      this.board.set({
        fen: this.game.fen(),
        turnColor: 'white',
        movable: {
          color: 'white',
          dests: this.possibleMoves(),
          events: { after: this.userPlay()},
        }
      });
    },
  },
  mounted() {
    this.game.load("8/8/8/8/8/8/PPPPPPPP/r7 w - - 0 1")
    this.board.set({
      fen: this.game.fen(),
      movable: {
        color: 'white',
        events: { after: this.userPlay()}
      }
    });
  }
}
</script>
