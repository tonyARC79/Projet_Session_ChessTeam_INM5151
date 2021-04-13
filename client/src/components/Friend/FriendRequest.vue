<template>
  <div>
    <h1 class="mt-4">Invitations reçues</h1>
    <div class="friend-container">
      <div class="friend-search-list">
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action"
            v-for="item in requests"
            :key="item.username"
          >
            <div class="d-flex w-100 justify-content-between">
              <b-icon
                class="h1 mt-2 ml-1"
                icon="person-fill"
                aria-hidden="true"
              ></b-icon>
              <div>
                <p class="mt-3">{{ item.username }}</p>
              </div>
              <b-button
                size="sm"
                variant="primary"
                class="mb-2"
                v-on:click="accepterDemandeAmi(item.username)"
              >
                Accepter demande
              </b-button>
            </div>
          </a>
          <p v-if="noResult">Vous n'avez aucune requête d'ami en ce moment.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    requests: [],
    noResult: false,
  }),

  beforeCreate() {
    this.$store
      .dispatch("getFriendsRequests")
      .then((requests) => {
        this.requests = requests;
        if (requests.length == 0) {
          this.noResult = true;
        } else {
          this.noResult = false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    getRequets() {
      this.$store
        .dispatch("getFriendsRequests")
        .then((requests) => {
          this.requests = requests;
          if (requests.length == 0) {
            this.noResult = true;
          } else {
            this.noResult = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    accepterDemandeAmi(username) {
      this.$store
        .dispatch("accepterDemandeAmi", username)
        .then((resp) => {
          if (resp.status == 201) {
            this.makeToast("Invitation d'ami acceptée");
            this.getRequets();
          } else {
            this.makeToast("Erreur avec le serveur, veuillez réesayer");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    makeToast(message) {
      this.$bvToast.toast(message, {
        title: "Requête d'ami acceptée",
        autoHideDelay: 5000,
        appendToast: true,
        toaster: "b-toaster-top-center",
      });
    },
  },
};
</script>