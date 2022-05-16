<template>
  <!-- skeleton while loading for fun -->

  <div class="flex justify-end items-center space-x-4">
    <div>
      <span class="text-gray-200 font-medium block">{{ userStore.name }}</span>
      <button class="text-gray-400 font-medium" @click="disconnect()">
        Disconnect
      </button>
    </div>

    <img
      :src="userStore.avatar"
      class="rounded-full border-solid border-white border-2 max-h-14"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "../services/AuthService";
import { useUser } from "../stores/user";
import UserProfileSkeleton from "./UserProfileSkeleton.vue";
export default defineComponent({
  name: "TheHeading",
  components: {
    UserProfileSkeleton,
  },
  setup() {
    const authService = new AuthService();
    const userStore = useUser();
    const router = useRouter();
    const disconnect = () => {
      authService.logout().then(async () => {
        await router.push("/");
        userStore.clearUser();
      });
    };
    return {
      userStore,
      authService,
      disconnect,
    };
  },
});
</script>
