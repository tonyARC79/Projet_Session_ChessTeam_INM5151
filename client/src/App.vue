<template>
  <div id="app">
    <Nav :isLoggedOn.sync="isLoggedOn"> </Nav>
    <router-view></router-view>
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
      isLoggedOn: store.getters.isAuthenticated,
    };
  },
  created: function () {
    this.$http.interceptors.response.use(undefined,err => {
      if (
        err.response.status === 401 &&
        err.config &&
        !err.config.__isRetryRequest
      ) {
        this.$store.dispatch("logout").then(() => {
          this.$router.push("/login");
        });
      }
      return Promise.reject(err);
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
