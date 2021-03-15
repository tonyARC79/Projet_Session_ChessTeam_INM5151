<template>
  <div>
    <h1>ChessMess Login</h1>

    <input type="email" name="name" v-model="email" placeholder="email" id="email" />
    <br> <br>
    <input type="password" name="password" v-model="password" placeholder="password" id="pwd" />
<br><br>

<button ref="">Login</button>
  </div>

  
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped>
</style>
