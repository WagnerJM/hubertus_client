import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {},
  state: {
    isAuthenticated: true,
    reviere: [
      {
        reviername: "Kein Revier",
        ort: ""
      }
    ],
    user: {
      token: "",
      username: ""
    }
  },
  mutations: {},
  actions: {},
  getters: {}
});
export default store;
