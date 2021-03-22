<style>
@import "../assets/inscription.css";
</style>

<template>
  <div class="login-container">
    <h1 class="login-title">Connexion</h1>
    <div class="login-form">
      <form @submit.prevent="login">
        <div class="mt-4">
          <span class="error text-danger" v:show="errorEmail">{{ errorEmail }}</span>
          <b-form-input
            v-model="user.email"
            size="15"
            type="email"
            name="email"
            placeholder="Entrer un courriel"
          ></b-form-input>
        </div>

        <div class="mt-4">
          <span class="error text-danger"  v:show="errorPassword">{{ errorPassword }}</span>
          <b-form-input
            id="pwd"
            v-model="user.password"
            size="15"
            type="password"
            name="password"
            placeholder="Entrer un mot de passe"
          ></b-form-input>
        </div>
        <div class="mt-4 mb-4">
          <b-button ref="" type="submit" v-on:click="validateForm"
            >Connexion</b-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    user: {
      email: null,
      password: null,
    },
    errorEmail: null,
    errorPassword: null,
    formulaireValide: false,
  }),
  methods: {
    validateForm() {
      this.formulaireValide = false;
      this.errorEmail = null
      this.errorPassword = null
      if (!this.user.email) {
        this.errorEmail = "Le courriel est obligatoire";
      }

      if (!this.user.password) {
        this.errorPassword = "Le mot de passe est obligatoire";
      }

      if (!this.errorEmail || !this.errorPassword) {
        this.formulaireValide = true;
      }
    },
    login() {
      this.errors = {};
      if (this.formulaireValide) {
        this.$store
          .dispatch("login", {
            email: this.user.email,
            password: this.user.password,
          })
          .then(() => {
            this.$router.replace("/home");
          })
          .catch(() => {
            this.formulaireValide = false;
            this.errorEmail = "courriel ou mot de passe invalide";
          });
      }
    },
  },
};
</script>
