<style>
@import "../assets/inscription.css";
</style>

<template>
  <div class="inscription-form">
    <div class="inscription-title">
      <h1>Inscription</h1>
    </div>

    <form @submit.prevent="join">
      <div class="inscription-input">
        <span class="error text-danger">{{ errors.name }}</span>
        <div v-if="invalidUsername" class="mb-2">
          <span class="error text-danger">{{ invalidUsername }}</span>
        </div>
        <b-form-input
          v-model="newUser.username"
          v-on:keyup="isUsernameValid"
          size="15"
          type="text"
          name="username"
          placeholder="Entrer un nom d'utilisateur"
        ></b-form-input>
      </div>
      <div class="mt-4">
        <div v-if="emailInUse" class="mb-2">
          <span class="error text-danger">Courriel déjà en utilisation</span>
        </div>
        <span class="error text-danger">{{ errors.emailError }}</span>
        <b-form-input
          v-model="newUser.email"
          size="15"
          type="email"
          name="email"
          placeholder="Entrer un courriel"
        ></b-form-input>
      </div>
      <div class="mt-4">
        <span class="error text-danger">{{ errors.password }}</span>
        <b-form-input
          id="pwd"
          v-model="newUser.password"
          size="15"
          type="password"
          name="password"
          placeholder="Entrer un mot de passe"
        ></b-form-input>
      </div>
      <div class="mt-4">
        <b-form-input
          id="confirmPwd"
          v-model="confirmPassword"
          size="15"
          type="password"
          name="password"
          placeholder="Confirmation de mot de passe"
        ></b-form-input>
      </div>
      <div class="mt-4">
        <span class="error text-danger">{{ errors.birthdate }}</span>
        <b-form-datepicker
          id="input-birthdate"
          v-model="newUser.birthdate"
          placeholder="Entre votre date de naissance"
        ></b-form-datepicker>
      </div>
      <div class="mt-4">
        <b-button ref="" type="submit" v-on:click="register"
          >S'inscrire</b-button
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    newUser: {
      username: null,
      email: null,
      birthdate: null,
      password: null,
    },
    confirmPassword: null,
    errors: {},
    emailInUse: false,
    invalidUsername: false,
    formulaireValide: false,
  }),
  methods: {
    isUsernameValid() {
      let username = this.newUser.username;
      if (username !== "") {
        this.$store
          .dispatch("validUsername", username)
          .then((res) => {
            let isValid = res.valid;
            if(isValid) {
              this.invalidUsername = ''
            }
            else {
              this.invalidUsername = res.message;
            }
          })
          .catch((err) => {
            console.log(err);
            this.errors.name = "Erreur avec le serveur";
          });
      } else {
        this.invalidUsername = "";
      }
    },
    register() {
      this.emailInUse = false;
      this.errors = {};
      if (!this.newUser.username) {
        this.errors.name = "Le nom d'utilisateur est obligatoire";
      }
      if (!this.newUser.email) {
        this.errors.emailError = "Le courriel est obligatoire";
      }
      if (this.newUser.email && !this.newUser.email.match(/\S+@\S+\.\S+/)) {
        this.errors.emailError = "Le courriel est invalide";
      }
      if (!this.newUser.password) {
        this.errors.password = "Le mot de passe est obligatoire";
      }
      if (this.newUser.password && this.newUser.password.length < 6) {
        this.errors.password =
          "Le mot de passe doit être plus de 6 charactères";
      }
      if (this.newUser.password !== this.confirmPassword) {
        this.errors.password = "Les mots de passes doivent être identique";
      }
      if (!this.newUser.birthdate) {
        this.errors.birthdate = "L'âge est obligatoire";
      }
      if (Object.keys(this.errors).length === 0) {
        this.formulaireValide = true;
      }
    },
    join() {
      if (this.formulaireValide) {
        let newUser = this.newUser;
        this.$store
          .dispatch("join", newUser)
          .then(() => {
            this.$router.replace("/");
          })
          .catch((error) => {
            if (error.response.status === 409) {
              this.formulaireValide = false;
              this.emailInUse = true;
            }
          });
      }
    },
  },
};
</script>

  <style scoped>
</style>
