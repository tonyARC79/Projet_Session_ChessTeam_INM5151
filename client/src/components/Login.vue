<template>
  <div>
    <h1>ChessMess Login</h1>
    <form @submit.prevent="login">
      <input
        type="email"
        name="name"
        v-model="userInfos.email"
        placeholder="email"
        id="email"
      />
      <br />
      <br />
      <input
        type="password"
        name="password"
        v-model="userInfos.password"
        placeholder="password"
        id="pwd"
      />
      <br /><br />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "../utils/apiService/";
export default {
  data() {
    return {
      userInfos: {
        email: '',
        password: '',
      },
      formulaireValide: true,
      utilsateurNonUnique: false,
    };
  },
  methods: {
    async login() {
      const response = await axios.post("/session", {
        email: this.userInfos.email,
        password: this.userInfos.password,
      });

      console.log(response)
      localStorage.setItem('token', response.data.token)

      this.$router.push('/home')
    },
  },
};
</script>

<style scoped>
</style>
