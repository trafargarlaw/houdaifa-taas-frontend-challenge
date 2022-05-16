<template>
  <BaseAlert />
  <header class="px-4 pt-2 mb-3">
    <UserProfile />
  </header>
  <main>
    <TheRepositorySelectMenu />
    <TheRepositoryContent />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseAlert from "../components/BaseAlert.vue";
import UserProfile from "../components/UserProfile.vue";
import TheRepositorySelectMenu from "../components/TheRepositorySelectMenu.vue";
import TheRepositoryContent from "../components/TheRepositoryContent.vue";

export default defineComponent({
  name: "Profile",
  components: {
    BaseAlert,
    TheRepositorySelectMenu,
    UserProfile,
    TheRepositoryContent,
  },
});
</script>
