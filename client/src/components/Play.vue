<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col offset-md-4">
        <chessboard />
      </div>
      <div class="col">
        <h3>Durée</h3>
        <b-dropdown id="dropdown-1" :text="dropBoxTitle" class="m-md-2">
          <b-dropdown-item @click="(time = '10'), printTime()"
            >10 minutes</b-dropdown-item
          >
          <b-dropdown-item @click="(time = '20'), printTime()"
            >20 minutes</b-dropdown-item
          >
          <b-dropdown-item @click="(time = '30'), printTime()"
            >30 minutes</b-dropdown-item
          >
        </b-dropdown>
        <br />
        <br />
        <h3>Mode de jeu</h3>
        <b-dropdown id="dropdown-2" :text="gameMode" class="m-md-2">
          <b-dropdown-item @click="gameMode = 'Aléatoire'"
            >Aléatoire</b-dropdown-item
          >
          <b-dropdown-item @click="gameMode = 'Ami'">Ami</b-dropdown-item>
          <b-dropdown-item @click="gameMode = 'Intelligence artificielle'"
            >Intelligence Artificielle</b-dropdown-item
          >
        </b-dropdown>
        <friends v-if="this.gameMode === 'Ami'" @clicked="onClickChild" />
        <br />
        <br />
        <b-button type="submit" v-on:click="launchGame">Jouer</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import { chessboard } from "vue-chessboard";
import friends from "./Friend/Friends.vue";
export default {
  components: {
    chessboard,
    friends,
  },
  data: () => ({
    time: 10,
    dropBoxTitle: "10 minutes",
    gameMode: "Aléatoire",
    userA: "",
    userB: "",
  }),
  mounted() {
    this.userA = this.$store.getters.username;
  },

  methods: {
    printTime() {
      this.dropBoxTitle = this.time + " minutes";
      console.log(this.userA);
    },
    onClickChild(item) {
      this.userB = item;
      this.gameMode = item;
    },
    launchGame() {
      if (this.gameMode === "Ami") {
        console.log(this.userB);
        /* this.$store
          .dispatch("game", {
            time: this.time,
            userA: this.userA,
            userB: this.userB
          }) 
          .then(() => {
            this.$router.replace("/friends");
          }*/
      }
    },
  },
};
</script>
