<template>
  <div>
    <h1>Inscription</h1> <br>

    <input
      type="username"
      name="username"
      v-model="nouvelUtilisateur.username"
      placeholder="username"
    />
    <br />
    <br />
    <input
      type="email"
      name="email"
      v-model="nouvelUtilisateur.email"
      placeholder="email"
    />
    <br /><br />
    <input
      type="password"
      name="password"
      v-model="nouvelUtilisateur.password"
      placeholder="password"
    />
    <br /><br />
    <input
      type="age"
      name="age"
      v-model="nouvelUtilisateur.age"
      placeholder="age"
    />
    <br /><br />
    <button ref="" type="submit" v-on:click="join">Register</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    nouvelUtilisateur: {
      username: null,
      email: null,
      age: null,
      password: null,
    },
    formulaireValide: true,
    utilsateurNonUnique: false,
  }),
  methods: {
    join() {
      if (this.formulaireValide) {
        let nouvelUtilisateur = this.nouvelUtilisateur;
        this.$store
          .dispatch("join", nouvelUtilisateur)
          .then(() => {
            this.$router.replace("/");
          })
          .catch((error) => {
            if (error.response.status === 409) {
              this.utilsateurNonUnique = true;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
</style>
