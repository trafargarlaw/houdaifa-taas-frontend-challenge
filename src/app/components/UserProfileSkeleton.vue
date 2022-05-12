<template>
  <div class="flex animate-pulse justify-end items-center space-x-4">
    <div
      class="text-gray-200 font-medium h-3 w-20 bg-slate-700 rounded col-span-2"
    ></div>
    <div class="rounded-full bg-slate-700 h-14 w-14"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TheHeadingSkeleton",
});
</script>
