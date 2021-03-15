<template>
  <v-app>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  watch: {
    $route(to) {
      document.title = to.meta.title || "Your Website";
    },
  },
  mounted() {
    let payload = {
      token: localStorage.getItem("token"),
      user: JSON.parse(localStorage.getItem("user")),
      obnl: JSON.parse(localStorage.getItem("obnl")),
    };

    if (payload.token) {
      this.axios.defaults.headers.common["Authorization"] = payload.token;
      this.$store.commit("auth_succes", payload);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
