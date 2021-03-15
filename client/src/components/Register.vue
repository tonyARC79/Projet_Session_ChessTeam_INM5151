<template>
  <div>
    <h1>ChessMess Login</h1>

    <input type="username" name="username" v-model="nouvelUtilisateur.username" placeholder="username" id="email" />
    <br> <br>
    <input type="email" name="email" v-model="nouvelUtilisateur.email" placeholder="email" id="pwd" />
<br><br>
<input type="password" name="password" v-model="nouvelUtilisateur.password" placeholder="password" id="pwd" />
<br><br>
<input type="age" name="age" v-model="nouvelUtilisateur.age" placeholder="age" id="pwd" />
<br><br>
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
    }
  },
};

</script>

<style scoped>
</style>
