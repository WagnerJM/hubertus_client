import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: "#016d21",
    secondary: "#0097A7",
    accent: "#FF7043",
    error: "#f44336",
    warning: "#fcd32f",
    info: "#2196f3",
    success: "#4caf50"
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
