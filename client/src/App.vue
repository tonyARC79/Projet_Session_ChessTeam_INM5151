<template>
  <div id="app">
    <Nav :user="user"/>
    <router-view :user="user"></router-view>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import axios from "@/utils/apiService/";
export default {
  name: 'App',
  components: {
    Nav

  },
  data() {
    return {
      user: null,
    };
  },

  async created() {
    const response = await axios.get("/api/profil", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    this.user = response.data;
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || "Your Website";
    },
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
