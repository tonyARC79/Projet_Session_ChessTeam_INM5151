<template>
  <div>
    <h1 class="mt-4">Mes parties</h1>
    <br />
    <div class="friend-container">
      <div class="friend-search-list">
        <div class="list-group">
          <a
            class="list-group-item list-group-item-action"
            v-for="item in gameRequests"
            :key="item.start_date"
          >
            <div class="d-flex w-100 justify-content-between">
              <b-icon
                class="h1 mt-2 ml-1"
                icon="person-fill"
                aria-hidden="true"
              ></b-icon>
              <div>
                <p class="mt-3">{{ username }} VS {{ getOpponent(item) }}</p>
              </div>
              <b-button
                size="sm"
                variant="primary"
                class="mb-2"
                @click="acceptGameRequest(item.game_id, getOpponent(item))"
              >
                Joindre la partie
              </b-button>
            </div>
          </a>
          <p v-if="noResult">
            Vous n'avez aucune requête de parties pour le moment.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store";
export default {
  data: () => ({
    gameRequests: [],
    noResult: false,
    username: store.getters.username,
  }),

  beforeCreate() {
    this.$store
      .dispatch("getGameRequests")
      .then((requests) => {
        this.gameRequests = requests;
        if (requests.length == 0) {
          this.noResult = true;
        } else {
          this.noResult = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getGameRequests() {
      this.$store
        .dispatch("getGameRequests")
        .then((requests) => {
          this.gameRequests = requests;
          if (requests.length == 0) {
            this.noResult = true;
          } else {
            this.noResult = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    acceptGameRequest(game_id, opponent) {
      console.log(game_id);
      this.$store
        .dispatch("acceptGameRequest", game_id)
        .then((resp) => {
          if (resp.status == 201) {
            this.makeToast("Invitation de partie acceptée!");
            this.getGameRequests();
            this.$router.push({
              path: "/play/GameRoom",
              query: {
                opponent: opponent,
                game_id: game_id,
              },
            });
          } else {
            this.makeToast("Erreur avec le serveur, veuillez réesayer");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getOpponent(item){
      if(item.player1 == this.username){
        return item.player2
      } else {
        return item.player1
      }
    },

    makeToast(message) {
      this.$bvToast.toast(message, {
        title: "Requête d'ami acceptée",
        autoHideDelay: 5000,
        appendToast: true,
        toaster: "b-toaster-top-center",
      });
    },
  },
};
</script>