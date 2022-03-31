<template>
  <transition name="alert">
    <BaseAlert />
  </transition>

  <header class="px-4 pt-2 mb-3">
    <UserProfile />
  </header>

  <TheRepositorySelectMenu />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseAlert from "../components/BaseAlert.vue";
import TheRepositorySelectMenu from "../components/TheRepositorySelectMenu.vue";
import UserProfile from "../components/UserProfile.vue";

export default defineComponent({
  name: "Profile",
  components: {
    BaseAlert,
    TheRepositorySelectMenu,
    UserProfile,
  },
});
</script>

<style>
/* enter classes */
.alert-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}
.alert-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.alert-enter-active {
  transition: all 300ms ease;
}
/* leave classes */
.alert-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.alert-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}
.alert-leave-active {
  transition: all 300ms ease;
}
</style>
