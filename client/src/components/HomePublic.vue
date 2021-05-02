
<style scoped>
@import "../assets/home.css";
</style>

<template>
  <div>
    <div
      class="home-container"
      :style="{
        backgroundImage:
          'url(' + require('@/images/homepage-background.jpg') + ')',
      }"
    >
      <div class="home-description">
         
        <h1>Jeu intéractif d'échecs pour les débutants</h1>
        <p>
          ChessMess est un site web qui vous permettra d'apprendre sur le jeu
          classic d'échecs si vous êtes un nouveau joueur. Nous offrons de
          nombreaux tutoriels qui vous permettrons d'apprendre sur les
          diffèrents réglements des échecs. Notre site web ne contient aucun
          élément compétitif et servira uniquement à ce que vous vous améliorer
          aux échecs et ce à chaque partie à l'aide de nos nombreaux outils
          d'apprentissage!
          <br>
          Pour utiliser l&apos;application, vous devez créer un compte
          utilisateur. Inscrivivez vous dès maintenant.
        </p>
      </div>
      <div class="home-register">
        <b-input-group>
          <b-form-input
            type="email"
            name="email"
            placeholder="Entrer un courriel"
            v-model="email"
          ></b-form-input>
          <b-input-group-append>
            <router-link
              :to="{
                name: 'join',
                params: {
                  email: 'test'
                },
              }"
              ><b-button variant="info" v-on:click="register()"
                >S'inscrire</b-button
              ></router-link
            >
          </b-input-group-append>
        </b-input-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePublic",
  data: () => ({
    email: "",
  }),
  methods: {
    register() {
      this.$router.push({
        name: "join",
        params: { email: this.email },
      });
    },
  },
};
</script>

