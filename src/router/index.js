import Vue from "vue";
import Router from "vue-router";
import store from "../store";

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

import Tagebuch from "@/components/Tagebuch";
import Dashboard from "@/components/Dashboard";
import Profil from "@/components/Profil";

import Home from "@/components/homepage/Home";
import About from "@/components/homepage/About";
import Datenschutz from "@/components/homepage/Datenschutz";
import Impressum from "@/components/homepage/Impressum";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
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
    },
    {
      path: "/profil",
      name: "Profil",
      component: Profil
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter(to, from, next) {
        if (store.state.isAuthenticated) {
          next();
        } else {
          next("/");
        }
      }
    },

    {
      path: "/tagebuch",
      name: "Tagebuch",
      component: Tagebuch,
      beforeEnter(to, from, next) {
        if (store.state.isAuthenticated) {
          next();
        } else {
          next("/");
        }
      }
    }
  ]
});
