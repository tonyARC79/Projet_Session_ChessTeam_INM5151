<template>
  <div>
    <h1>Apprenez à déplacer simplement des pions</h1>
    <h3>Le tutoriel prend fin lorsqu'un de vos pions sera promu en reine</h3>
    <div>
      <pawnTutorial />
    </div>
    <h1>Apprenez à déplacer simplement des fous</h1>
    <h3>Le tutoriel prend fin si par malchance le roi capture vos deux fous</h3>
    <div>
      <bishopTutorial />
    </div>
    <h1>Apprenez à déplacer simplement la tour</h1>
    <h3>Le tutoriel prend fin si par malchance le roi capture votre tour</h3>
    <div>
      <rookTutorial />
    </div>
    <h1>Apprenez à déplacer simplement les cavalier</h1>
    <h3>Le tutoriel prend fin si par malchance le roi capture vos cavaliers</h3>
    <div>
      <knightTutorial />
    </div>
    <h1>Apprenez à déplacer simplement la reine</h1>
    <h3>Le tutoriel prend fin si par malchance le roi capture votre reine</h3>
    <div>
      <queenTutorial />
    </div>
     <h1>Apprenez à déplacer simplement le roi</h1>
    <h3>Le tutoriel est interminable</h3>
    <div>
      <kingTutorial />
    </div>
  </div>
</template>

<script>
import 'vue-chessboard/dist/vue-chessboard.css'
import pawnTutorial from './PawnTutorial.vue'
import bishopTutorial from './BishopTutorial.vue'
import rookTutorial from './RookTutorial.vue'
import knightTutorial from './KnightTutorial.vue'
import queenTutorial from './QueenTutorial.vue'
import kingTutorial from './KingTutorial.vue'

export default {
  name: 'app',
  components: {
    pawnTutorial,
    bishopTutorial,
    rookTutorial,
    knightTutorial,
    queenTutorial,
    kingTutorial,
  },
}
</script>
