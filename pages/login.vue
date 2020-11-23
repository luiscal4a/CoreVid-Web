<template>
  <div>
      <topnavbar :logged=false></topnavbar>
      <Login></Login>
  </div>
</template>

<script>
import Login from '~/components/Login.vue'
import topnavbar from '../components/Navbar2.vue'

export default {
  middleware: 'isNotLogged',
  components: {
    Login,
    topnavbar
  }
}
</script>

<style scoped>
</style>