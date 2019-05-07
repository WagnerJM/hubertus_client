import Vue from "vue";
import Router from "vue-router";

import Dashboard from "@/components/Dashboard";
//import Login from "@/components/auth/Login";
//import Register from "@/components/auth/Register";
//import Profile from "@/components/Profile";
//import Tagebuch from "@/components/Tagebuch";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard
    }
  ]
});
