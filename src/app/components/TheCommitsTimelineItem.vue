<template>
  <li class="px-4 py-2 border-b border-b-gray-600 hover:bg-gray-600 space-y-1">
    <span class="text-gray-200" v-html="styledMessage"> </span>
    <div class="flex items-center space-x-2">
      <img :src="avatar_url" class="rounded-[50%] w-5" alt="avatar" />
      <span class="text-gray-200 text-sm">{{ login }}</span>
      <p class="text-gray-400 text-sm">
        committed on
        {{ formatedDate }}
      </p>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheCommitsTimelineItem",
  props: {
    message: {
      type: String,
      required: true,
    },

    avatar_url: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    login: {
      type: String,
      required: true,
    },
  },
  computed: {
    styledMessage() {
      return this.message.replace("`", "<mark>").replace("`", "</mark>");
    },
    formatedDate() {
      return new Date(this.date).toString().slice(0, 15);
    },
  },
});
</script>
