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
import { AuthService } from "./services/AuthService";
import { useUser } from "./stores/user";
import { useAlert } from "./stores/alert";

const authService = new AuthService();
// middlewares
const ifAuthenticated = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const valid = await authService.checkTokenValidity().catch((err) => err);
  if (valid) {
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
  const valid = await authService.checkTokenValidity().catch((err) => err);
  if (!valid) {
    next();
    return;
  }
  next("/profile");
};
const storeCurrentUser = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  try {
    await useUser().updateUser();

    next();
    // only show alert if the user came from '/authentication' path which means he/she just logged in
    if (_from.path == "/authentication") {
      useAlert().triggerAlert(
        "success",
        "Your Gihub account was successfully authorized"
      );
    }
  } catch (error) {
    next("/");
  }
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
    {
      path: "/profile",
      component: Profile,
      beforeEnter: [ifAuthenticated, storeCurrentUser],
    },
  ],
});
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");

app.directive("click-outside", {
  mounted(el, binding, _vnode) {
    const handler = (e: MouseEvent) => {
      if (el.contains(e.target as Node)) {
        return;
      }
      binding.value(e);
    };
    el.__vueClickOutside__ = handler;
    document.addEventListener("click", handler);
  },
  unmounted(el) {
    document.removeEventListener("click", el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
});
