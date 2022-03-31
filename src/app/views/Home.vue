<template>
  <div class="h-screen w-full flex justify-center items-center">
    <a
      :href="`https://github.com/login/oauth/authorize?scope=repo&client_id=${clientId}`"
      class="bg-blue-500 px-3 py-4 rounded-md text-white"
    >
      Authorize my Github account
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    return {
      clientId: import.meta.env.VITE_CLIENT_ID,
    };
  },
});
</script>
