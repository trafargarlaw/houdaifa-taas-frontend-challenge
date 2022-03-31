import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import Authentication from "./views/Authentication.vue";
import Profile from "./views/Profile.vue";
import Home from "./views/Home.vue";
import App from "./App.vue";
import "./index.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
    },
    {
      path: "/authentication",
      component: Authentication,
    },
    { path: "/profile", component: Profile },
  ],
});

createApp(App).use(createPinia()).use(router).mount("#app");
