<template>
  <!-- skeleton while loading for fun -->
  <div v-if="userStore.userLoading">
    <UserProfileSkeleton />
  </div>
  <div v-else class="flex justify-end items-center space-x-4">
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
import { useAuthentication } from "../stores/authentication";
import { useUser } from "../stores/user";
import UserProfileSkeleton from "./UserProfileSkeleton.vue";
export default defineComponent({
  name: "TheHeading",
  components: {
    UserProfileSkeleton,
  },
  setup() {
    const authenticationStore = useAuthentication();
    const userStore = useUser();
    const router = useRouter();
    const disconnect = () => {
      authenticationStore.logout();
      router.push("/");
    };
    userStore
      .getUser()
      .then((result) => {
        if (!result.error) {
          userStore.$patch({
            name: result.name,
            avatar: result.avatar_url,
            username: result.login,
          });
        }
      })
      .catch((err) => {
        userStore.triggerAlert("error", err.response.data.message);
        return;
      })
      .finally(() => {
        userStore.triggerAlert(
          "success",
          "Your Gihub account was successfully authorized"
        );
        userStore.userLoading = false;
      });
    return {
      userStore,
      authenticationStore,
      disconnect,
    };
  },
});
</script>
