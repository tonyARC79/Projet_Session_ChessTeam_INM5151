<template>
  <div>
    <h1>ChessMess</h1>
    <br />
    <form @submit.prevent="processLogin">
      <input
        type="email"
        name="name"
        v-model="email"
        placeholder="email"
        id="email"
      />
      <br />
      <br />
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
        id="pwd"
      />
      <br /><br />

      <input
        type="email"
        name="name"
        v-model="email"
        placeholder="email"
        id="email"
      />
      <br />
      <br />
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
        id="pwd"
      />
      <br /><br />

      <button ref="">Login</button>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "../utils/apiService/";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",

      //formulaireValide: true,
      //utilsateurNonUnique: false,
    };
  },
  methods: {
    async processLogin() {
      const response = await axios.post("/session", {
        email: this.email,
        password: this.password,
      });

      //console.log(response)
      localStorage.setItem("token", response.data.token);
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
</style>
