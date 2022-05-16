<template>
  <div class="mx-4 relative" v-click-outside="handleClickOutside">
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
import { useRepositories } from "../stores/repositories";
import { Repository } from "../services/RepositoryService";
import { useUser } from "../stores/user";
//export default to avoid import has no default export error
export default defineComponent({
  name: "TheRepositorySelectMenu",
  setup() {
    const repositoriesStore = useRepositories();
    const branchesStore = useBranches();
    const commitsStore = useCommits();
    const userStore = useUser();
    const select = ref<HTMLElement | null>(null);
    repositoriesStore.updateRepository();
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
        branchesStore.updateBranches();
        commitsStore.updateCommits();
      }
    );
    const handleClickOutside = (event: Event) => {
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
      handleClickOutside,
    };
  },
});
</script>
