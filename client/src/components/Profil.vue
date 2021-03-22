<template>
  <div id="user-profile">
    <div class="container mt-5 d-flex justify-content-center">
      <div class="">
        <div class="d-flex align-items-center">
          <div class="image">
            <img
              src=""
              class="rounded"
              width="500"
            />
          </div>
          <div class="ml-3 w-100">
            <h1 class="mb-0 mt-0" v-if="username">{{username}}</h1>
            <span >{{email}}</span>
            <div
              class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats"
            >
              <div class="d-flex flex-column">
                <span class="articles">Games</span> <br>
                <span class="number1">25k</span>
              </div> <br>
              <div class="d-flex flex-column">
                &nbsp;<span class="followers">Followers</span><br>
                <span class="number2">10</span>
              </div> <br>
              <div class="d-flex flex-column">
                &nbsp;<span class="rating">Rating</span> <br>
                <span class="number3">3500</span>
              </div>
            </div>
            <!-- <div class="button mt-2 d-flex flex-row align-items-center">
              <button class="btn btn-sm btn-outline-primary w-100">Envoyer un message</button>
              <button class="btn btn-sm btn-primary w-100 ml-2">Suivre</button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "Profil",
  data() {
      return {
          name: '',
          username: store.getters.username,
          email: store.getters.email,
          age: null

      }
  },
  mounted() {
      
  },

};
</script>