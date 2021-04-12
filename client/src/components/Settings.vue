<style>
@import "../assets/settings.css";
</style>

<template>
  <div class="settings-container container">
    <div class="mt-2">
      <b-nav>
        <b-nav-item disabled>Accueil</b-nav-item>
        <b-nav-text disabled>/</b-nav-text>
        <b-nav-item disabled>Paramètres</b-nav-item>
      </b-nav>
    </div>
    <div class="settings-title">
      <h1>{{ username }}</h1>
    </div>
    <div class="mt-4">
      <h2>Information de mon compte:</h2>
      <div class="settings-information p-3">
        <div role="group">
          <div v-if="isError" class="mb-2">
            <span class="error text-danger">Problème avec le serveur</span>
          </div>
          <label class="float-left settings-input-title" for="input-email"
            >Adresse courriel:</label
          >
          <b-form-input
            id="input-email"
            v-model="email"
            type="email"
            :state="isEmailValid"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-email-feedback">
            Courriel invalide
          </b-form-invalid-feedback>
          <label
            class="float-left settings-input-title mt-3"
            for="input-birthdate"
            >Date de naissance:</label
          >
          <b-form-datepicker
            id="input-birthdate"
            v-model="birthdate"
          ></b-form-datepicker>
          <label
            class="float-left settings-input-title mt-3"
            for="input-newPassword"
            >Nouveau mot de passe:</label
          >
          <div>
            <b-form-input
              id="input-newPassword"
              type="password"
              v-model="password"
              :state="isNewPasswordCorrect"
              trim
            ></b-form-input>
            <b-form-invalid-feedback id="input-newPassword-feedback">
              Mot de passe invalide
            </b-form-invalid-feedback>
          </div>
          <label
            class="float-left settings-input-title mt-3"
            for="input-confirm"
            >Confirmation de mot de passe:</label
          >
          <div>
          <b-form-input
            id="input-confirm"
            :state="isSamePassword"
            type="password"
            v-model="confirmPassword"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-newPassword-feedback">
            Les deux mot de passe ne sont pas les même
          </b-form-invalid-feedback>
          </div>
        </div>
        <div class="mt-4">
          <b-button ref="" type="submit" v-on:click="modifyAccount"
            >Sauvegarder changement</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "Settings",
  computed: {
    isEmailValid() {
      return this.email && this.email.match(/\S+@\S+\.\S+/) ? null : false;
    },
    isNewPasswordCorrect() {
      return this.password === "" ||
        (this.password != "" && this.password.length > 6)
        ? null
        : false;
    },
    isSamePassword() {
      return this.confirmPassword === "" ||
        this.password == this.confirmPassword
        ? null
        : false;
    },
  },
  data() {
    return {
      birthdate: store.getters.birthdate,
      username: store.getters.username,
      email: store.getters.email,
      password: "",
      confirmPassword: "",
      isError: false,
    };
  },
  methods: {
    modifyAccount() {
      this.isError = false;
      let userInformationToChange = {};
      if (this.email !== store.getters.email && this.isEmailValid === null) {
        userInformationToChange.email = this.email;
      }
      if (this.birthdate !== store.getters.birthdate) {
        userInformationToChange.birthdate = this.birthdate;
      }
      if (
        this.password !== "" &&
        this.isNewPasswordCorrect === null &&
        this.isSamePassword === null
      ) {
        userInformationToChange.password = this.password;
      }
      if (userInformationToChange !== {}) {
        this.$store
          .dispatch("changeUserInformation", userInformationToChange)
          .then(() => {
            this.$router.replace("/user/me");
          })
          .catch((error) => {
            if (error.response.status === 409) {
              this.isError = true;
            }
          });
      }
    },
  },
  mounted() {},
};
</script>