<template>
  <v-container>
    <h1>Registrieren</h1>

    <br>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="username" :rules="nameRules" label="Username" required></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field v-model="password" :rules="rules" :counter="8" label="Password" required></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'Bestätigen zum weiter machen.']"
        label="DSGVO"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="primary" @click="validate">Validate</v-btn>

      <v-btn color="error" @click="reset">Reset Form</v-btn>
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
    checkbox: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    }
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style>
</style>
