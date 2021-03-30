<template>
  <div>
    <h1>Amis</h1>
    <div class="friend-container">
      <div class="friend-search-list">
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action"
            v-for="item in lesUtilisateurs"
            :key="item.username"
          >
            <div class="d-flex w-100 justify-content-between">
              <b-icon icon="person-fill" aria-hidden="true"></b-icon>
            </div>
            <p class="mb-1">{{ item.username }}</p>
            <small>date register</small>
          </a>
          <p v-if="noResult">Vous n'avez aucune ami</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    lesUtilisateurs: [],
    noResult: false,
  }),

  beforeCreate() {
      this.$store
        .dispatch("getFriends")
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

  }
};
</script>