<template>
  <v-app id="app">
    <v-toolbar dark class="primary" xs12 sm6>
      <v-toolbar-title>Hubertus</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/register" v-if="!loginState">Register</v-btn>
        <v-btn flat to="/login" v-if="!loginState">Login</v-btn>
        <v-btn  flat to="/dashboard" v-if="loginState">Reviere
        </v-btn>
        <v-btn flat to="/tagebuch" v-if="loginState">Tagebuch</v-btn>

        <v-menu :nudge-width="100" offset-y v-if="loginState">
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">
              <v-icon dark>account_circle</v-icon>
              <span>Account</span>
            </v-btn>
          </template>

          <v-list>
            <v-list-tile
              v-for="(item, index) in items"
              :key="index"
              @click
              :to="{path: item.path  }"
            >
              <v-list-tile-title :to="item.path">{{item.title}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <router-view></router-view>

    <v-footer class="pa-3" id="footer">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} J-M. Wagner</div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    loginState: state => state.isAuthenticated
  }),
  data: () => ({
    items: [
      { title: "Profil", path: "/profil" },
      { title: "Logout", path: "/logout" }
    ]
  })
};
</script>

<style>
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
#loading {
  position: absolute;
  height: 100px;
  width: 100px;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
  background: url(/link/to/your/image);
  background-size: 100%;
}
</style>
