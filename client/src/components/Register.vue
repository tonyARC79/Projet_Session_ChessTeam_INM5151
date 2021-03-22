<template>
  <div>
    <h1>ChessMess Inscription</h1>

    <form @submit.prevent="join">
      <div>
        <input
          type="text"
          name="username"
          size="35"
          v-model="newUser.username"
          placeholder="nom utilisateur"
          id="email"
        />
        <br />
        <span class="error text-danger">{{ errors.name }}</span>
      </div>
      <br />
      <div>
        <input
          type="email"
          name="email"
          size="35"
          v-model="newUser.email"
          placeholder="courriel"
          id="pwd"
        />
        <br />
        <span class="error text-danger">{{ errors.email }}</span>
        <span class="error text-danger">{{ errors.email2 }}</span>
        <span class="error text-danger">{{ errors.email3 }}</span>
      </div>
      <br />
      <div>
        <input
          type="password"
          name="password"
          size="35"
          v-model="newUser.password"
          placeholder="mot de passe"
          id="pwd"
        />
        <br />
        <span class="error text-danger">{{ errors.password }}</span>
        <span class="error text-danger">{{ errors.password3 }}</span>
      </div>
      <br />
      <div>
        <input
          type="password"
          name="password"
          size="35"
          v-model="password2"
          placeholder="validation mot de passe"
          id="pwd"
        />
        <br />
        <span class="error text-danger">{{ errors.password2 }}</span>
      </div>
      <br />
      <div>
        <input
          type="number"
          size="35"
          min="8"
          max="140"
          name="age"
          v-model="newUser.age"
          placeholder="age"
          id="pwd"
        />
        <br />
        <span class="error text-danger">{{ errors.age }}</span>
      </div>
      <br /><br />
      <div>
        <button ref="" type="submit" v-on:click="register">S'inscrire</button>
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
      age: null,
      password: null,
    },
    password2: null,
    errors: {},
    formulaireValide: false,
  }),
  methods: {
    register() {
      this.errors = {};
      console.log("testing");
      if (!this.newUser.username) {
        this.errors.name = "Le nom d'utilisateur est obligatoire";
      }
      if (!this.newUser.email) {
        this.errors.email = "Le courriel est obligatoire";
      }
      if (this.newUser.email && !this.newUser.email.match(/\S+@\S+\.\S+/)) {
        this.errors.email2 = "Le courriel est invalide";
      }
      if (!this.newUser.password) {
        this.errors.password = "Le mot de passe est obligatoire";
      }
      if (this.newUser.password && this.newUser.password.length < 7) {
        this.errors.password3 = "Le mot de passe est court";
      }
      if (this.newUser.password !== this.password2) {
        this.errors.password2 = "Les mots de passes doivent être identique";
      }
      if (!this.newUser.age) {
        this.errors.age = "L'âge est obligatoire";
      }
      if (Object.keys(this.errors).length === 0) {
        this.formulaireValide = true;
      }
    },
    join() {
      console.log(this.formulaireValide);
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
              alert("Un autre utilisateur utilise ce courriel!?");
            }
          });
      }
    },
  },
};
</script>

  <style scoped>
</style>
