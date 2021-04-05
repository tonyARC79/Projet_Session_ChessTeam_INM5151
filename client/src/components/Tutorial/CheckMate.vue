<template>
  <div class="container">
    <h1>Mettez le roi noir échec et mat à l'aide des deux tours</h1>
    <h3>Le tutoriel prend fin si vous mettez les noirs échecs et mat ou si le roi capture vos deux tours</h3>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col offset-md-4">
        <rookCheckMate />
      </div>
      <div class= "col">
          Il est impossible de mettre le roi échec et mat avec une seule tour.  Pour mettre le roi échec et mat, il faut le forcer à se retrouver dans une position où il ne pourra se déplacer sans être attaqué par une autre pièce.
      </div>
    </div>
    <h1>Tentez de mettre les noirs échecs et mat en un seul coup</h1>
    <h3>Si le cavalier noir se déplace c'est que vous avez raté votre occasion</h3>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col offset-md-4">
          <mateInOne />
      </div>
      <div class= "col">
        Pour retenter rafraîchissez la page.    
      </div>
    </div>
    <h1>Terminer une partie contre des coups compètement aléatoire</h1>
    <h3>Le tutoriel prend fin lorsque la partie est terminée</h3>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col offset-md-4">
        <endGame />
      </div>
      <div class= "col">
        Vous avez gagné la partie et fait tous les tutoriels?  Si oui, vous êtes prêt à commencer à jouer des vrais parties.
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-chessboard/dist/vue-chessboard.css'
import rookCheckMate from './TutorialCheckMate/RookCheckMate.vue'
import mateInOne from './TutorialCheckMate/MateInOne.vue'
import endGame from './TutorialCheckMate/EndGame.vue'

export default {
  name: 'checkMate',
  components: {
    rookCheckMate,
    mateInOne,
    endGame,
  },
}
</script>

