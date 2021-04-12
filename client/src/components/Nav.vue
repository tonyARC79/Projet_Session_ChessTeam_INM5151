<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/home"
        ><img
          src="../images/HomeLogoChessMess.png"
          alt=""
          width="100"
          height="60"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/user/me">Profil</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <a class="nav-link" href="" @click="handleClick">Se déconnecter</a>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/play"
              >Démarer partie
            </router-link>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/join">Inscription </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/tutorial">Tutoriels </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "Nav",
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  data() {
    return {};
  },
  methods: {
    async handleClick() {
      this.$store.dispatch("logout").then(() => {});
    },
  },
};
</script>
