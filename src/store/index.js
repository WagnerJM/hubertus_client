import Vue from "vue";
import Vuex from "vuex";
import http from '../axios-instance';

Vue.use(Vuex);

const getDefaultUserState = () => {
  return {
    token: "",
    username: "",
    is_admin: false,
    is_active: false,
    free_user: false,
    pro_user: false,
    email: "",
    vorname: "",
    nachname: "",
    adresse: {
      straße: "",
      hausnummer: "",
      postleitzahl: ""
    }
  }
}

const store = new Vuex.Store({
  modules: {},
  state: {
    isAuthenticated: false,
    reviere: [
      {
        reviername: "Kein Revier",
        ort: ""
      }
    ],
    user: {
      token: "",
      username: "",
      is_admin: false,
      is_active: false,
      free_user: false,
      pro_user: false,
      email: "",
      vorname: "",
      nachname: "",
      adresse: {
        straße: "",
        hausnummer: "",
        postleitzahl: ""
      }
    }
  },
  mutations: {
    loading: state => {
      state.loading = !state.loading;
    },
    login_success: state => {
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: state => {
      state.isAuthenticated = false;
    },
    setUserData: (state, payload) => {
      state.user.token = payload.token;
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.user.adresse.straße = payload.adresse.straße;
      state.user.adresse.hausnummer = payload.adresse.hausnummer;
      state.user.adresse.postleitzahl = payload.adresse.postleitzahl;
      state.user.free_user = payload.free_user;
      state.user.pro_user = payload.pro_user;
      state.user.is_active = payload.is_active;
      state.user.is_admin = payload.is_admin;
      state.user.vorname = payload.vorname;
      state.user.nachname = payload.nachname;
    },
    setServerMessage: (state, payload) => {
      state.serverMesssage = payload.msg;
    },
    resetUserState: (state) => {
      Object.assign(state.user, getDefaultUserState);
    }
    
  },
  actions: {
    REGISTER({
        commit
      }, authData) {
        commit('loading');
        http({
            method: "post",
            url: "/register",
            data: {
              username: authData.username,
              password: authData.password,
              email: authData.email,
              datenschutz: authData.dattenschutz
            }
          })
          .then(res => {

            commit('loading');
            commit('setServerMessage', res.data);
            this.$router.push("Login");
          })
          .catch(error => {
            commit('loading');

            commit('setServerMessage', error.data);
            this.$router.push("Register");
          })
      },
      LOGIN({
        commit
      }, authData) {
        commit('loading');
        http({
          method: "post",
          url: "/login",
          data: {
            username: authData.username,
            password: authData.password
          }
        }).then(res => {
          commit('setUserData', res.data);
          commit('login_success');
          this.$router.push("Dashboard")
        }).catch(error => {

          commit('setServerMessage', error.data);
          commit('loading');
          this.$router.push("Login")

        })
      },
      LOGOUT({
        commit
      }) {
        commit('loading');
        http({
          method: "post",
          url: "/logout"
        }).then(() => {

          commit('resetUserState');
          commit('loading');
          this.$router.push('Login')
        }).catch(error => {


          commit('setServerMessage', error.data);
          commit('loading');
          this.$router.push("Login")
        })
      }
  },
  getters: {
    token({
      token
    }) {
      return token;
    },
  }
});
export default store;
