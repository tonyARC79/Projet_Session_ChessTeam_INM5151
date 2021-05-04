
<template>
  <div>
    
    <HomePublic v-if="!isAuthenticated" />
    <HomePrivate v-else> </HomePrivate>
  </div>
</template>

<script>
import HomePublic from './HomePublic.vue'
import HomePrivate from './HomePrivate.vue'
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    HomePublic,
    HomePrivate
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
};

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
