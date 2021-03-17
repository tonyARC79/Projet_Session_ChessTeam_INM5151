<template>
  <div class="home">
    <h1>Bienvenue sur la plateforme ChessMess!</h1>
  </div>
</template>

<script>
import axios from "../utils/apiService/";
export default {
  name: "Home",
  methods: {
    async loggedIn() {
      const response = await axios.get("/profil", {
        headers: {
          Authorization: localStorage.getItem("token")
        },
      });
      console.log(response);
      
    },
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
