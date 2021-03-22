<template>
  <div>
    <h3 v-if="username">
      Bonjour {{ username }} !
    </h3>

    <h3 v-if="!username">Désolé, vous n'êtes pas authentifié :(</h3>

    

    <img v-if="username" src="../images/fullLogoRed.png" width="25%" height="25%" alt="">

  </div>
</template>

<script>
export default {
  name: "Home",
  props: ["username"],
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
