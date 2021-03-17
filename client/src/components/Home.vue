<template>
  <h3 v-if="user">
    Bonjour {{ user.username }} ! Bienvenue sur ChessMess.com :)
  </h3>
</template>

<script>
import axios from "../utils/apiService/";
export default {
  name: "Home",

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
};

//{"websocket":true,"origins":["*:*"],"cookie_needed":false,"entropy":1051744105}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
