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
          <li class="nav-item">
            <router-link class="nav-link" to="/user/view_profile"
              >Profil</router-link
            >
          </li>
          <li v-if="isLoggedOn" class="nav-item">
            <a class="nav-link" href="" @click="handleClick">Logout</a>
          </li>
          <li v-if="!isLoggedOn" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="!isLoggedOn" class="nav-item">
            <router-link class="nav-link" to="/join">Inscription </router-link>
          </li>
        </ul>
      </div>
    </nav>

  </div>
</template>


<script>
import store from "../store";
export default {
  name: "Nav",
  data() {
    return {
      isLoggedOn: store.getters.isAuthenticated,
    }
  },
  methods: {
    async handleClick() {
      this.$store.dispatch("logout").then(() => {
        
      });
    },
  }
};
</script>
