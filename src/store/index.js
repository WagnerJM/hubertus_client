import Vue from "vue";
import Vuex from "vuex";
import http from '../axios-instance';

import router from '../router'

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
    loading: false,
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
      if (payload.adresse == null) {
        state.user.adresse = {}
      } else {
        state.user.adresse.straße = payload.adresse.straße;
        state.user.adresse.postleitzahl = payload.adresse.postleitzahl;
        state.user.adresse.hausnummer = payload.adresse.hausnummer;
      }
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
            console.log(res.method)
            console.log("response")
            commit('setServerMessage', res.data);
            router.push({path: "/login"})
          })
          .catch(error => {
            commit('loading');
            console.log(error)
            console.log("error")
            commit('setServerMessage', error);
           router.push("/register");
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
          console.log("response")
          commit('login_success');
          router.push("/dashboard")
          commit('setUserData', res.data);
        }).catch(error => {
          console.log(error)


        })
      },
      LOGOUT({
        commit, state
      }) {
        commit('loading');
        http({
          method: "post",
          url: "/logout",
          headers: {
            'Authorization ' + state.user.token
          }
        }).then(() => {

          commit('resetUserState');
          commit('loading');
         router.push('/login')
        }).catch(error => {
          console.log(error)
        })
      },
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
