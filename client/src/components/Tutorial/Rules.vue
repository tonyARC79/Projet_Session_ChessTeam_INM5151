<template>
  <div class="container">
    <h1>Effectuez le petit roque en déplaçant le roi</h1>
    <h3>
      Vous ne savez pas comment faire, bougez un pion et regardez les noirs
      jouer
    </h3>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col offset-md-4">
        <castlingTutorial />
      </div>
      <div class="col text-left">
        Après avoir déplacé un pion, cliquez sur le roi et observez les
        déplacements disponibles. Un déplacement normal serait la case à droite
        du roi soit F1. Si vous déplacez directement le roi de deux cases vers la droite, vous
        atteignez G1 et effectuez un roque. Maintenant vous connaissez aussi les
        notations de base des déplacements selon les cases.
      </div>
    </div>
    <h1>Effectuez le grand roque en déplaçant le roi</h1>
    <h3>
      Vous ne savez pas comment faire, bougez un pion et regardez les noirs
      jouer
    </h3>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col offset-md-4">
        <bigCastlingTutorial />
      </div>
      <div class="col text-left">
        Pour effectuer le grand roque, déposez le roi sur C1. Il existe d'autres
        conditions afin de pouvoir effectuer un roque, les voici :
        <ul>
          <li>Les cases séparants le roi et la tour doivent être vide</li>
          <li>
            Aucun déplacement de la tour ou du roi n'a été effectué depuis le
            début de la partie
          </li>
          <li>
            Aucune pièce adverse menace une case entre le roi et la tour,
            incluant un échec au roi
          </li>
        </ul>
      </div>
    </div>
    <h1>Des exemples d'impossibilité d'effectuer le roque</h1>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col offset-md-4">
        <chessboard :fen="currentFen" />
      </div>
    </div>
    <button class="button is-light" @click="loadFen(fens[0])">
      {{ "Menace entre la tour et le roi par le fou" }}
    </button>
    <button class="button is-light" @click="loadFen(fens[1])">
      {{ "Le roi est en échec" }}
    </button>
    <h1>Voici une partie nulle</h1>
    <h3>
      Pour voir une partie nulle, déplacée le roi blanc sur la seule case qui
      lui est disponible
    </h3>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col offset-md-4">
        <drawGameTutorial />
      </div>
      <div class="col text-left">
        La partie est nulle lorsqu'un joueur ne peut plus déplacer aucune pièce
        et que c'est son tour à jouer. Dans notre cas :
        <ul>
          <li>Le pion blanc ne peut pas être déplacé</li>
          <li>
            Le roi aussi n'a aucun case où il peut se déplacer dû à la présence
            du cavalier et de la tour noirs
          </li>
        </ul>
      </div>
    </div>
    <h1>Faire un échec</h1>
    <h3>Bouger une pièce.  Par la suite, esquiver l'échec fait par les noirs</h3>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col offset-md-4">
        <checkTutorial />
      </div>
      <div class="col text-left">
        Après avoir été mis en échec, essayer de déplacer une autre pièce que le
        roi. Comme vous le voyez ceci est impossible. Vous devez absoluement
        mettre votre roi à l'abri avant qu'il soit capturé.
      </div>
    </div>
    <h1>Effectuez la prise en passant avec un pion</h1>
    <h3>Bougez votre pion et assurez-vous d'avoir capturé le pion noir</h3>
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col offset-md-4">
        <enPassantTutorial />
      </div>
      <div class="col text-left">
        Voici les règles pour effectuer la prise en passant:
        <ul>
          <li>
            Votre adversaire avance son pion de deux cases et le pose à côté de
            votre pion
          </li>
          <li>
            Pour le capturer vous déplacer votre pion derrière le pion qui vient
            d'effctuer le déplacement
          </li>
        </ul>
        Si vous n'avez pas capturé le pion, c'est que vous avez déplacé le pion
        droit devant.
      </div>
    </div>
  </div>
</template>

<script>
import { chessboard } from "vue-chessboard";
import "vue-chessboard/dist/vue-chessboard.css";
import castlingTutorial from "./TutorialRules/CastlingTutorial.vue";
import bigCastlingTutorial from "./TutorialRules/BigCastlingTutorial.vue";
import enPassantTutorial from "./TutorialRules/EnPassantTutorial.vue";
import drawGameTutorial from "./TutorialRules/DrawGameTutorial.vue";
import checkTutorial from "./TutorialRules/CheckTutorial.vue";

export default {
  name: "rules",
  components: {
    chessboard,
    castlingTutorial,
    bigCastlingTutorial,
    enPassantTutorial,
    drawGameTutorial,
    checkTutorial,
  },
  data() {
    return {
      currentFen: "",
    };
  },
  methods: {
    loadFen(fen) {
      this.currentFen = fen;
    },
  },
  created() {
    this.fens = [
      "rn1qk2r/p1ppppbp/bp3np1/8/8/4P1PN/PPPP1PBP/RNBQK2R w - - 0 1",
      "rnb1k2r/pp1pppbp/2p2np1/q7/8/3P2PN/PPP1PPBP/RNBQK2R w - - 0 1",
    ];
  },
};
</script>
