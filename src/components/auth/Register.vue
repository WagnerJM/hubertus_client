<template>
  <v-container v-if="this.$store.state.loading">
    <v-progress-circular id="loading" color="primary" indeterminate :size="70" :width="7" ></v-progress-circular>
  </v-container>
  <v-container v-else>
    <h1>Registrieren</h1>

    <br>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="username" :rules="nameRules" label="Username" required></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" :rules="pwRules" :counter="8" label="Password" required></v-text-field>

      <v-checkbox
        v-model="datenschutz"
        :rules="dsRules"
        label="DSGVO"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="primary" @click="register">Register</v-btn>

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
    email: "",
    emailRules: [
      v => !!v || "E-mail ist ein Pflichtfeld",
      v => /.+@.+/.test(v) || "Sie müssen eine gültige E-Mail Adresse eingeben."
    ],
    select: null,
    datenschutz: false,
    pwRules: [
      value => !!value || "Required.",
      v => v.length >= 8 || "Min 8 characters"
    ],
    dsRules: [
      v => !!v || 'Bestätigen zum weiter machen.'
    ],
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
    register() {
      const formData = {
        username: this.username,
        password: this.password,
        email: this.email

      };
      this.$store.dispatch("REGISTER", {
        username: formData.username,
        password: formData.password,
        email: formData.email
      });
    }
  
  }
};
</script>
<style>
</style>
