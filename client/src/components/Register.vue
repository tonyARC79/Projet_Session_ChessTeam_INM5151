<template>
  <div>
    <h1>ChessMess Login</h1>

    <input type="username" name="username" v-model="username" placeholder="username" id="email" />
    <br> <br>
    <input type="email" name="email" v-model="email" placeholder="email" id="pwd" />
<br><br>
<input type="password" name="password" v-model="password" placeholder="password" id="pwd" />
<br><br>
<input type="age" name="age" v-model="age" placeholder="age" id="pwd" />
<br><br>
<button ref="">Register</button>
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
