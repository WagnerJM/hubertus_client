import Vue from "vue";
import Vuex from "vuex";
import http from "../axios-instance";

import router from "../router";

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
  };
};

const store = new Vuex.Store({
  modules: {},
  state: {
    isAuthenticated: true,
    loading: false,
    reviere: [
      {
        reviername: "Test Revier",
        positionen: [
          {
            lat: "",
            log: ""
          }
        ],
        ort: "Bochum",
        marker: []
      }
    ],
    tagebuch: [
      {
        eintragsart: "Ansprache",
        beschreibung:
          "Test Beschreibung, wie auch immer das so funktioniert. Ich weiss ja nicht wie der Zeilenumbruch ist.",
        tier: {
          wildArt: "Rehwild",
          unterArt: "Böcke",
          anzahl: 1
        },
        revier: "Test Revier",
        position: {
          lat: "",
          log: ""
        },
        datum: "10.05.19",
        uhrzeit: "08:00",
        foto: false,
        foto_path: ""
      },
      {
        eintragsart: "Abschuss",
        beschreibung: "",
        tier: {
          wildArt: "Rehwild",
          unterArt: "Ricke",
          anzahl: 1
        },
        revier: "",
        position: {
          lat: "",
          log: ""
        },
        datum: "10.05.19",
        uhrzeit: "08:00",
        foto: true,
        foto_path: ""
      },
      {
        eintragsart: "Sonstiges",
        beschreibung: "",
        tier: {
          wildArt: "Rehwild",
          unterArt: "Ricke",
          anzahl: 1
        },
        revier: "",
        position: {
          lat: "",
          log: ""
        },
        datum: "10.05.19",
        uhrzeit: "08:00",
        foto: true,
        foto_path: ""
      }
    ],
    token: "",
    user: {
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
      state.user.email = payload.email;
      if (payload.adresse == null) {
        state.user.adresse = {};
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
    setUserToken: (state, payload) => {
      state.token = payload.token;
      state.user.username = payload.username;
    },
    setServerMessage: (state, payload) => {
      state.serverMesssage = payload.msg;
    },
    resetUserState: state => {
      Object.assign(state.user, getDefaultUserState);
    },
    setUserReveire: (state, payload) => {
      state.reviere = payload.reviere;
    },
    setUserTagebuch: (state, payload) => {
      state.tagebuch = payload.tagebuch;
    }
  },
  actions: {
    REGISTER({ commit }, authData) {
      commit("loading");
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
          commit("loading");
          console.log(res.method);
          console.log("response");
          commit("setServerMessage", res.data);
          router.push({ path: "/login" });
        })
        .catch(error => {
          commit("loading");
          console.log(error);
          console.log("error");
          commit("setServerMessage", error);
          router.push("/register");
        });
    },
    LOGIN({ commit, dispatch }, authData) {
      commit("loading");
      http({
        method: "post",
        url: "/login",
        data: {
          username: authData.username,
          password: authData.password
        }
      })
        .then(res => {
          console.log("response");
          commit("login_success");
          router.push("/dashboard");
          commit("setUserToken", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    LOGOUT({ commit, state }) {
      commit("loading");
      http({
        method: "post",
        url: "/logout"
      })
        .then(() => {
          commit("resetUserState");
          console.log(state.user);
          console.log(state.token);
          commit("loading");
          router.push("/login");
        })
        .catch(error => {
          console.log(error);
        });
    },
    GET_USER_DATA({ commit }) {
      commit("loading");
      http({
        method: "get",
        url: "/user"
      })
        .then(res => {
          commit("setUserData", res.data);
          //dispatch("GET_USER_REVIERE");
          //dispatch("GET_USER_TAGEBUCH");
          console.log(res.data);
          commit("loading");
        })
        .catch(error => {
          console.log(error);
        });
    },
    GET_USER_REVIERE({ commit }) {
      http
        .get("/revier")
        .then(res => {
          console.log(res.data);
          commit("setUserReviere", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    GET_USER_TAGEBUCH({ commit }) {
      http
        .get("/tagebuch")
        .then(res => {
          console.log(res.data);
          commit("setUserTagebuch", res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {
    token({ token }) {
      return token;
    }
  }
});
export default store;
