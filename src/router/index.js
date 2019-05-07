import Vue from "vue";
import Router from "vue-router";

import Dashboard from "@/components/Dashboard";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Tagebuch from "@/components/Tagebuch";
import Home from "@/components/homepage/Home";
import About from "@/components/homepage/About";
import Datenschutz from "@/components/homepage/Datenschutz";
import Impressum from "@/components/homepage/Impressum";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/tagebuch",
      name: "Tagebuch",
      component: Tagebuch
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/impressum",
      name: "Impressum",
      component: Impressum
    },
    {
      path: "/datenschutz",
      name: "Datenschutz",
      component: Datenschutz
    }
  ]
});
