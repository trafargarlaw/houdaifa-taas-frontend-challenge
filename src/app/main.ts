import { createApp } from "vue";
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import Authentication from "./views/Authentication.vue";
import Profile from "./views/Profile.vue";
import Home from "./views/Home.vue";
import App from "./App.vue";
import "./index.css";
import { createPinia } from "pinia";
import { useAuthentication } from "./stores/authentication";

const ifAuthenticated = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const result = await useAuthentication().checkTokenValidity;
  if (result.status === 200) {
    next();
    return;
  }
  next("/");
};
const ifNotAuthenticated = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const result = await useAuthentication().checkTokenValidity;

  if (result.status !== 200) {
    next();
    return;
  }
  next("/profile");
};
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/authentication",
      component: Authentication,
    },
    { path: "/profile", component: Profile, beforeEnter: ifAuthenticated },
  ],
});
createApp(App).use(createPinia()).use(router).mount("#app");
