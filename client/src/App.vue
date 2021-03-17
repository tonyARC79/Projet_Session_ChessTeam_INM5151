<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/home"
        ><Strong>ChessMess</Strong></router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/home"
              >Home <span class="sr-only">(current)</span></router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/join">Inscription</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link
              class="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Jouer!
            </router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="#">Action</router-link>
              <router-link class="dropdown-item" to="#"
                >Another action</router-link
              >
              <router-link class="dropdown-item" to="#"
                >Something else here</router-link
              >
            </div>
          </li>
          <li>
            <form class="form-inline">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Recherche"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Gogogogo!
              </button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
    <br /><br /><br />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to) {
      document.title = to.meta.title || "Your Website";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
