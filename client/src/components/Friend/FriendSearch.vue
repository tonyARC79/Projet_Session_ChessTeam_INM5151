<template>
  <div>
    <h1>Chercher des amis</h1>
    <p>chercher des amis selon le nom d'utilisateur</p>
    <div class="friend-container">
      <div class="friend-search-bar">
        <b-input-group class="mt-3">
          <template #append>
            <b-button class="mb-2">
              <b-icon
                v-on:click="findFriends"
                icon="search"
                aria-hidden="true"
              ></b-icon>
            </b-button>
          </template>
          <b-form-input
            v-model="searchQuery"
            v-on:keyup.13="findFriends"
          ></b-form-input>
        </b-input-group>
      </div>
      <div class="friend-search-list">
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action"
            v-for="item in lesUtilisateurs"
            :key="item.username"
          >
            <div class="d-flex w-100 justify-content-between">
              <b-icon
                class="h1 mt-2 ml-1"
                icon="person-fill"
                aria-hidden="true"
              ></b-icon>
              <div>
                <p class="mb-1">{{ item.username }}</p>
                <small>Rejoint le : {{ item.date_registered | moment }}</small>
              </div>
              <b-button size="sm" variant="primary" class="mb-2">
                Ajouter comme ami
              </b-button>
            </div>
          </a>
          <p v-if="noResult">
            Aucun utilisateur ne correspond à votre recherche
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    lesUtilisateurs: [],
    searchQuery: "",
    noResult: false,
  }),
  filters: {
    moment: function (date) {
      return moment(date).format("MMMM Do YYYY");
    },
  },
  methods: {
    findFriends() {
      this.$store
        .dispatch("findFriends", this.searchQuery)
        .then((lesUtilisateurs) => {
          this.lesUtilisateurs = lesUtilisateurs;
          if (lesUtilisateurs.length == 0) {
            this.noResult = true;
          } else {
            this.noResult = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>