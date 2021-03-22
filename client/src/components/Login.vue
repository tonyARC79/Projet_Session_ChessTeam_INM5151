<template>
  <div>
    <h1>ChessMess</h1>
    <br />
    <div>
      <form @submit.prevent="login">
        <span class="error text-danger">{{ errors.email }}</span><br>
        <input
          type="email"
          name="name"
          v-model="user.email"
          placeholder="email"
          id="email"
        />
        <br />
        
        <span class="error text-danger">{{ errors.password }}</span><br>
        <input
          type="password"
          name="password"
          v-model="user.password"
          placeholder="password"
          id="pwd"
        />
        <br /><br />

        <button type="submit" ref="#" v-on:click="validateForm">Login</button>
        <span class="error text-danger">{{errors.invalide}}</span>
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
    errors: {},
    formulaireValide: false,
  }),
  methods: {
    validateForm() {
      this.errors = {};
      console.log("testing");

      if (!this.user.email) {
        this.errors.email = "Le courriel est obligatoire";
      }

      if (!this.user.password) {
        this.errors.password = "Le mot de passe est obligatoire";
      }

      if (Object.keys(this.errors).length === 0) {
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
        }).then(() => {
            this.$router.replace("/home");
          })
        .catch((error) => {
          this.formulaireValide = false;
          console.log(error)
          this.errors.invalide = 'courriel ou mot de passe invalide';
          alert('courriel ou mot de passe invalide')

        });

      //this.$router.go(1);
      
      }
    },
    
  },
};
</script>

<style scoped>
</style>
