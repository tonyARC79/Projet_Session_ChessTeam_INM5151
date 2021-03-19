<template>
  <div id="app">
    <Nav :isLoggedOn="isLoggedOn"> </Nav>
    <router-view :username="username"></router-view>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import store from "./store";
export default {
  name: "App",
  components: {
    Nav,
  },
  data() {
    return {
      username: store.getters.username,
      isLoggedOn: store.getters.isAuthenticated,
    };
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/");
          });
        }
        throw err;
      });
    });
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
}
</style>
