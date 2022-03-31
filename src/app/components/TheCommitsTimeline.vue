<template>
  <div
    class="mx-4 flex relative before:h-full before:bg-gray-800 before:absolute before:-z-10 before:w-[2px] before:content-['']"
    v-for="(day, key) in commitsStore.commits"
    :key="key"
  >
    <div
      class="-ml-[15px] mr-2 mt-2 relative h-4 w-8 rounded-[50%] inline-flex justify-center bg-gray-900"
    >
      <svg
        aria-hidden="true"
        height="16"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        data-view-component="true"
        class="fill-gray-400"
      >
        <path
          fill-rule="evenodd"
          d="M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.001 4.001 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z"
        ></path>
      </svg>
    </div>
    <div class="mt-[3px] w-full">
      <h1 class="text-gray-400 mb-4">
        Commits on
        {{ formatedDate(day[0].commit.author.date) }}
      </h1>
      <ol class="rounded-md border border-gray-400">
        <TheCommitsTimelineItem
          :message="commit.commit.message"
          :avatar_url="commit.author.avatar_url"
          :date="commit.commit.author.date"
          :login="commit.author.login"
          v-for="commit in day"
          :key="commit.sha"
        />
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useBranches } from "../stores/branches";
import { useCommits } from "../stores/commits";
import { useRepositories } from "../stores/repositories";
import { useUser } from "../stores/user";
import BaseLoadingSpinner from "./BaseLoadingSpinner.vue";
import TheCommitsTimelineItem from "./TheCommitsTimelineItem.vue";

export default defineComponent({
  name: "TheCommitsTimeline",
  components: {
    BaseLoadingSpinner,
    TheCommitsTimelineItem,
  },
  data() {
    const commitsStore = useCommits();
    const userStore = useUser();
    const repositoriesStore = useRepositories();
    const branchesStore = useBranches();
    return {
      commitsStore,
      userStore,
      repositoriesStore,
      branchesStore,
    };
  },
  computed: {
    formatedDate() {
      return (date: Date | string) => new Date(date).toString().slice(0, 15);
    },
  },
});
</script>

<style>
mark {
  background-color: hsl(0, 0%, 40%);
  border-radius: 0.2rem;
  padding: 0 0.2rem;
}
</style>
