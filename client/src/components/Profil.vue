<style>
@import "../assets/profil.css";
</style>

<template>
  <div class="user-container">
    <div class="user-profil">
      <div class="container mt-5 d-flex">
        <div class="d-flex align-items-center ml-auto mr-5">
          <div class="image">
            <!-- <img
              src=""
              class="rounded"
              width="500"
            /> -->
          </div>
          <div class="ml-3 w-100">
            <h1 class="mb-0 mt-0" v-if="username">{{ username }}</h1>
            <span>{{ email }}</span>
            <div
              class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats"
            >
              <div class="d-flex flex-column">
                <span class="articles">Games</span> <br />
                <span class="number1">25k</span>
              </div>
              <br />
              <div class="d-flex flex-column">
                &nbsp;<span class="followers">Followers</span><br />
                <span class="number2">10</span>
              </div>
              <br />
              <div class="d-flex flex-column">
                &nbsp;<span class="rating">Rating</span> <br />
                <span class="number3">3500</span>
              </div>
            </div>
            <div class="button mt-2 d-flex flex-row align-items-center">
              <!-- <button class="btn btn-sm btn-outline-primary w-100">Envoyer un message</button> -->
              <router-link
                class="btn btn-sm btn-primary w-100 ml-2"
                to="/play/GameRoom"
                >Play Room 1</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-friends-container">
      <div class="container mt-5 d-flex justify-content-left">
        <div class="d-flex align-items-center friends-container">
          <div class="w-100">
            <h4>Amis</h4>
            <b-link href="/friends" class="d-flex w-100 friend-link p-1">
              <div class="h2 mb-0">
                <b-icon icon="person-fill" scale="1"></b-icon>
              </div>
              <span class="ml-3 align-items-center d-inline-flex"
                >Tes amis</span
              >
            </b-link>
            <b-link href="/friends/find" class="d-flex w-100 friend-link p-1">
              <div class="h2 mb-0 ml-1">
                <b-icon icon="person-plus-fill" scale="1"></b-icon>
              </div>
              <span class="ml-3 align-items-center d-inline-flex"
                >Ajouter un ami</span
              >
            </b-link>
            <b-link
              href="/friends/requests"
              class="d-flex w-100 friend-link p-1"
            >
              <div class="h2 mb-0 ml-1">
                <b-icon icon="envelope-fill" scale="1"></b-icon>
              </div>
              <span class="ml-3 align-items-center d-inline-flex"
                >Invitation en attente</span
              >
            </b-link>
          </div>
        </div>
      </div>
    </div>

    <div class="user-friends-container">
      <div class="container mt-5 d-flex justify-content-left">
        <div class="d-flex align-items-center friends-container">
          <div class="w-100">
            <h4>Profil</h4>
            <b-link href="/settings" class="d-flex w-100 friend-link p-1">
              <div class="h2 mb-0">
                <b-icon icon="gear-fill" scale="1"></b-icon>
              </div>
              <span class="ml-3 align-items-center d-inline-flex"
                >Paramètres de compte</span
              >
            </b-link>
            <b-button v-on:click='deleteAccount' class="d-flex w-100 friend-link p-1">
              <div class="h2 mb-0 ml-1">
                <b-icon icon="trash-fill" scale="1"></b-icon>
              </div>
              <span class="ml-3 align-items-center d-inline-flex"
                >Effacer compte</span
              >
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "Profil",
  data() {
    return {
      name: "",
      username: store.getters.username,
      email: store.getters.email,
      birthdate: store.getters.birthdate,
      password: store.getters.password,
    };
  },
  methods: {
    deleteAccount() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy+ "/" + mm + "/" + dd + "/";
      console.log(today)
      let info = {};
      info.date_deleted = today;
      info.username = this.username;
      this.$store
        .dispatch("deleteUserAccount", info)
        .then(() => {
          this.$router.replace("/login");
        })
        .catch((error) => {
          if (error.response.status === 409) {
            this.isError = true;
          }
        });
    },
  },
  mounted() {},
};
</script>