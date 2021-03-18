<template>
  <div id="app">
    <Nav :username="username"> </Nav>
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
    };
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout").then(() => {
            this.$router.push("/login");
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
  margin-top: 60px;
}
</style>
