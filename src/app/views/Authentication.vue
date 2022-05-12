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
import { useAuthentication } from "../stores/authentication";

export default defineComponent({
  name: "profile",
  components: { BaseLoadingSpinner },
  setup() {
    const { authentify } = useAuthentication();
    return {
      authentify,
    };
  },
  async mounted() {
    await this.authentify(this.$route.query.code).catch((err) => {
      this.$router.push("/");
    });
    await this.$router.push("/profile");
  },
});
</script>
