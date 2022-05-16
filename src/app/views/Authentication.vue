<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div class="p-2 rounded-md flex items-center text-gray-300" disabled>
      <BaseLoadingSpinner />
      Processing...
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseLoadingSpinner from "../components/BaseLoadingSpinner.vue";
import { AuthService } from "../services/AuthService";

export default defineComponent({
  name: "profile",
  components: { BaseLoadingSpinner },
  setup() {
    const { authentify } = new AuthService();

    return {
      authentify,
    };
  },
  async mounted() {
    await this.authentify(this.$route.query.code)
      .then(() => {
        this.$router.push("/profile");
      })
      .catch((err) => {
        this.$router.push("/");
      });
  },
});
</script>
