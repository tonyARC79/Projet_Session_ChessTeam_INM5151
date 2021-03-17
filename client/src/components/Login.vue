<template>
  <div>
    <h1>ChessMess</h1><br>
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
  data() {
    return {
      email: "",
      password: "",
    };
  },
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

      //console.log(response)
      localStorage.setItem('token', response.data.token)
      console.log(localStorage.getItem('token'))
      this.$router.push('/home')
    },
  },
};
</script>

<style scoped>
</style>
