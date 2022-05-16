<template>
  <div class="flex animate-pulse justify-end items-center space-x-4">
    <div
      class="text-gray-200 font-medium h-3 w-20 bg-slate-700 rounded col-span-2"
    ></div>
    <div class="rounded-full bg-slate-700 h-14 w-14"></div>
  </div>
</template>

<script lang="ts">
// the component is not needed anymore since user is necesserily loaded from middleware before we enter the page,
// and there is no case where we'd want to access the profile page if the user is not loaded

import { defineComponent } from "vue";
export default defineComponent({
  name: "TheHeadingSkeleton",
});
</script>
