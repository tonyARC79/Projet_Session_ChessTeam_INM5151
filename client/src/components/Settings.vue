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
          <label class="float-left settings-input-title" for="input-email">Adresse courriel:</label>
          <b-form-input
            id="input-email"
            v-model="email"
            trim
          ></b-form-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "Settings",
  data() {
    return {
      username: store.getters.username,
      email: store.getters.email,
      age: null,
    };
  },
  mounted() {},
};
</script>