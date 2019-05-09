<template>
 <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7" ></v-progress-circular>
  </v-container>
  <v-container v-else>
    <h1>Login</h1>

    <br>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="username" :rules="nameRules" label="Username" required></v-text-field>

      <v-text-field v-model="password" :rules="pwRules" :counter="8" type="password" label="Password" required></v-text-field>

      
      <v-btn :disabled="!valid" color="primary" @click="login">Login</v-btn>

      <v-btn color="error" @click="reset">Reset</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    username: "",
    nameRules: [v => !!v || "Der Username ist ein Pflichtfeld."],
    datenschutz: false,
    pwRules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    },
    password: ""
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    login() {
      const formData = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("LOGIN", {
        username: formData.username,
        password: formData.password
      });
    }
  }
};
</script>
<style>
</style>
