<template>
  <div>
    <h1>Les tutoriels</h1>
    <p>Chercher parmis les nombreuses leçons présentes</p>
    <div class="tutorial-container">
      <div class="tutorial-search-bar">
        <b-input-group class="mt-3">
          <template #append>
            <b-button class="mb-2">
              <b-icon icon="search" aria-hidden="true"></b-icon>
            </b-button>
          </template>
          <b-form-input v-model="search"></b-form-input>
        </b-input-group>
      </div>
      <div class="tutorial-search-list">
        <div class="list-group">
          <div
            class="d-flex justify-content-between align-items-center"
            v-for="tutorial in filteredList"
            :key="tutorial.title"
          >
            <a
              v-bind:href="tutorial.link"
              class="tutorial-link list-group-item list-group-item-action h-100"
              target="_blank"
            >
              <b-img
                left
                fluid
                width="100"
                height="100"
                v-bind:src="tutorial.img"
              />
              <div class="tutorial-text col-md-6 offset-md-2">
                <p class="mb-1">{{ tutorial.title }}</p>
                <small>{{ tutorial.description }}</small>
              </div>
            </a>
            <p v-if="noResult">
              Aucun utilisateur ne correspond à votre recherche
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tutorials from "./Tutorial.js";
export default {
  name: "Home",
  data() {
    return {
      search: "",
      tutorials: tutorials,
    };
  },
  computed: {
    filteredList() {
      return this.tutorials.filter((tutorial) => {
        return tutorial.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>