<template>
  <div v-if="branchesStore.branches.length > 0">
    <h1 class="mx-4 text-gray-200 font-semibold mt-4">Repository name</h1>
    <BranchSelectMenu />
    <TheCommitsTimeline />
  </div>
  <div v-else>
    <h1 class="mx-4 text-gray-200 font-semibold mt-4">Select A Repository</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BranchSelectMenu from "./BranchSelectMenu.vue";
import TheCommitsTimeline from "./TheCommitsTimeline.vue";
import { useBranches } from "../stores/branches";
import { useRepositories } from "../stores/repositories";

export default defineComponent({
  name: "Repository",
  components: {
    BranchSelectMenu,
    TheCommitsTimeline,
  },
  setup() {
    const branchesStore = useBranches();
    const repositoriesStore = useRepositories();

    repositoriesStore.getRepos().then((result) => {
      if (!result.error) {
        repositoriesStore.repos = result;
      }
    });
    return {
      branchesStore,
      repositoriesStore,
    };
  },
});
</script>
