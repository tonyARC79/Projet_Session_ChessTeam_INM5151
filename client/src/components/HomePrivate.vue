<template>
  <div>
    <h3>Bonjour {{ username }} !</h3>
    <img src="../images/fullLogoRed.png" width="25%" height="25%" alt="" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomePrivate",
  computed: {
    ...mapGetters(["username"]),
  },
};
</script>