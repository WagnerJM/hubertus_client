<template>
    <v-container v-if="this.$store.state.loading">
        <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7" ></v-progress-circular>
    </v-container>
    <v-container v-else>

    </v-container>
</template>

<script>
export default {
    created () {
        this.$store.dispatch('LOGOUT')
    }

}
</script>

<style>

</style>
