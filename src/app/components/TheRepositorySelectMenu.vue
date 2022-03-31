<template>
  <div class="mx-4 relative" ref="select">
    <span
      @click="
        repositoriesStore.showReposList = !repositoriesStore.showReposList
      "
      class="absolute right-3 top-1 z-10 cursor-pointer"
      >▼</span
    >
    <input
      v-model="repositoriesStore.keywordRepository"
      placeholder="Search repositories"
      class="w-full px-2 py-1 outline-none relative border-blue-500 border rounded-md"
      type="text"
      @focus="repositoriesStore.showReposList = true"
    />
    <div
      v-if="repositoriesStore.showReposList"
      class="bg-gray-100 rounded-sm absolute w-full z-10"
    >
      <ul>
        <li
          v-for="repo in matchingRepos"
          :key="repo.name"
          @click="updateSearch(repo)"
          class="hover:bg-blue-400 select-none cursor-pointer"
        >
          {{ repo.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted,
  ref,
  watch,
} from "vue";
import { useBranches } from "../stores/branches";
import { useCommits } from "../stores/commits";
import { Repository, useRepositories } from "../stores/repositories";
//export default to avoid import has no default export error
export default defineComponent({
  name: "TheRepositorySelectMenu",
  setup() {
    const repositoriesStore = useRepositories();
    const branchesStore = useBranches();
    const commitsStore = useCommits();
    const select = ref<HTMLElement | null>(null);
    repositoriesStore.getRepos().then((result) => {
      if (!result.error) {
        repositoriesStore.repos = result;
      }
    });
    const matchingRepos: ComputedRef<Repository[]> = computed(
      (): Repository[] =>
        repositoriesStore.repos?.filter((repo: Repository) =>
          repo.name
            .toLowerCase()
            .includes(repositoriesStore.keywordRepository.toLowerCase())
        )
    );
    watch(
      () => repositoriesStore.selectedRepo,
      async () => {
        branchesStore.refreshBranches();
        commitsStore.refreshCommits();
      }
    );
    onMounted(() => {
      window.addEventListener("click", handleClickOutside);
    });
    const handleClickOutside = (event: Event) => {
      if (
        select.value == null ||
        select.value.contains(event.target as HTMLElement)
      )
        return;
      repositoriesStore.showReposList = false;
    };

    const updateSearch = (repo: Repository) => {
      //update search term and selected repo and hide liste
      repositoriesStore.keywordRepository = repo.name;
      repositoriesStore.selectedRepo = repo.name;
      repositoriesStore.showReposList = false;
      branchesStore.default_branch = repo.default_branch;
    };

    return {
      select,
      repositoriesStore,
      matchingRepos,
      updateSearch,
      branchesStore,
      commitsStore,
    };
  },
});
</script>
