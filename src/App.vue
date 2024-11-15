<template>
  <main>
    <NavBar />
    <RouterView />
  </main>
</template>


<script>

import { RouterView } from 'vue-router';
import NavBar from '@/components/NavBar.vue';


export default {
  name: 'App',
  data() {
      return {};
  },
  components: {
    RouterView,
    NavBar
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
