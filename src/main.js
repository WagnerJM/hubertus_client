import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import router from "./router";
import store from "./store";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
//import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";


Vue.config.productionTip = false;

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

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
