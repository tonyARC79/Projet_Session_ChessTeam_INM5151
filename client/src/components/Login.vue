<template>
  <div>
    <h1>ChessMess</h1>
    <br />
    <div>
    <form @submit.prevent="login">
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

      <button type="submit">Login</button>
    </form>
    </div>
  </div>
</template>

<script>
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
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
</style>
