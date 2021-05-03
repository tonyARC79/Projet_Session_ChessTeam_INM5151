<template>
  <div>
    <h1>Amis</h1>
    <div class="friend-container">
      <div class="friend-search-list">
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action"
            v-for="item in lesUtilisateurs"
            :key="item.username"
          >
            <div class="d-flex w-100 justify-content-between">
              <b-icon icon="person-fill" aria-hidden="true"></b-icon>
              <div>
              <p class="mb-1">{{ item.username }}</p>
              <small>Rejoint le : {{ item.date_registered | moment }}</small>
              </div>
              <div>
                <img
                  src="../../images/PawnLogo.png"
                  alt=""
                  height="60"
                  width="60"
                  v-on:click="sendFriendGameRequest(item.username)"
                />
                <span>Challenge</span>
              </div>
            </div>
          </a>

          <p v-if="noResult">Vous n'avez aucune ami</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import moment from "moment";
//import store from "../../store";
export default {
  data: () => ({
    lesUtilisateurs: [],
    noResult: false,
    //username_challenger: store.getters.username,
  }),
  filters: {
    moment: function (date) {
      moment.locale("fr");
      return moment(date).format("MMMM Do YYYY");
    },
  },
  methods: {
    sendFriendGameRequest(username) {
      this.$store
        .dispatch("sendFriendGameRequest", username)
        .then((resp) => {
          if (resp.status == 201) {
            this.makeToast(`Requête de partie envoyée à ${username}`);
            this.$router.replace("/user/me");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    makeToast(message) {
      this.$bvToast.toast(message, {
        title: "Requête de partie envoyée",
        autoHideDelay: 5000,
        appendToast: true,
        toaster: "b-toaster-top-center",
      });
    },
  },
  beforeCreate() {
    this.$store
      .dispatch("getFriends")
      .then((lesUtilisateurs) => {
        this.lesUtilisateurs = lesUtilisateurs;
        if (lesUtilisateurs.length == 0) {
          this.noResult = true;
        } else {
          this.noResult = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
