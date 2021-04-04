<template>
  <div class="container">
    <h1>Apprenez à déplacer simplement des pions</h1>
    <h3>Le tutoriel prend fin lorsqu'un de vos pions sera promu en reine</h3>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col offset-md-4">
        <pawnTutorial />
      </div>
      <div class= "col">
          Bougez un pion. Par la suite, un roi va apparaître. Vous ne pouvez pas le capturer et il n'est pas en échec.  Les pions peuvent seulement attaquer au devant de leur position et nous verons ce qu'est exactement un échec dans les prochains tutoriels.
      </div>
    </div>
      <h1>Apprenez à capturer des pièces avec des pions</h1>
      <h3>Le pion est la seule pièce qui ne capture pas de la même façon dont il se déplace</h3>
    <div class="row d-flex justify-content-center align-items-center">
        <div class="col offset-md-4">
          <pawnCaptureTutorial />
        </div>
        <div class= "col">
          Le pion avance en ligne droite, mais il capture seulement en diagonale à gauche ou à droite.  Présentement, une seule capture peut être faite.  Par la suite, effectuer la deuxième capture suite au déplacement des noirs.  Après la deuxième capture, le tutoriel prend fin.
      </div>
    </div>
    <h1>Apprenez à déplacer simplement des fous</h1>
    <h3>Le tutoriel prend fin si par malchance le roi capture vos deux fous</h3>
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <bishopTutorial />
      </div>
    </div>
    <h1>Apprenez à déplacer simplement la tour</h1>
    <h3>Le tutoriel prend fin si par malchance le roi capture votre tour</h3>
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <rookTutorial />
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <h1>Apprenez à déplacer simplement les cavalier</h1>
      <h3>Le tutoriel prend fin si par malchance le roi capture vos cavaliers</h3>
      <div class="col-md-4">
        <knightTutorial />
      </div>
    </div>
    <h1>Apprenez à déplacer simplement la reine</h1>
    <h3>Le tutoriel prend fin si par malchance le roi capture votre reine</h3>
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <queenTutorial />
      </div>
    </div>
    <h1>Apprenez à déplacer simplement le roi</h1>
    <h3>Le tutoriel est interminable</h3>
      <div class="row d-flex justify-content-center">
        <div class="col-md-4">
          <kingTutorial />
        </div>
    </div>
    <h1>Apprenez à capturer des pieces contre un joueur qui déplace ces pièces aléatoirement</h1>
    <h3>Il n'est pas nécessaire de terminer la partie, le tout vous sera expliqué dans les tutoriels suivant</h3>
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <capturePieceTutorial />
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-chessboard/dist/vue-chessboard.css'
import pawnTutorial from './TutorialMovePiece/PawnTutorial.vue'
import bishopTutorial from './TutorialMovePiece/BishopTutorial.vue'
import rookTutorial from './TutorialMovePiece/RookTutorial.vue'
import knightTutorial from './TutorialMovePiece/KnightTutorial.vue'
import queenTutorial from './TutorialMovePiece/QueenTutorial.vue'
import kingTutorial from './TutorialMovePiece/KingTutorial.vue'
import pawnCaptureTutorial from './TutorialMovePiece/PawnCaptureTutorial.vue'
import capturePieceTutorial from './TutorialMovePiece/CapturePieceTutorial.vue'

export default {
  name: 'app',
  components: {
    pawnTutorial,
    bishopTutorial,
    rookTutorial,
    knightTutorial,
    queenTutorial,
    kingTutorial,
    pawnCaptureTutorial,
    capturePieceTutorial,
  },
}
</script>
