<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <h1>User Profil</h1>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
