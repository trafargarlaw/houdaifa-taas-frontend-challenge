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
<script setup lang="ts">
import { computed, ComputedRef, onMounted, ref } from "vue";
import { Repository, useRepositories } from "../stores/repositories";

const select = ref<HTMLElement | null>(null);
const repositoriesStore = useRepositories();

repositoriesStore.getRepos().then((result) => {
  if (!result.error) {
    repositoriesStore.repos = result;
  }
});
const matchingRepos: ComputedRef<Repository[]> = computed((): Repository[] =>
  repositoriesStore.repos?.filter((repo: any) =>
    repo.name
      .toLowerCase()
      .includes(repositoriesStore.keywordRepository.toLowerCase())
  )
);
const handleClickOutside = (event: any) => {
  if (select.value == null || select.value.contains(event.target)) return;
  repositoriesStore.showReposList = false;
};
onMounted(() => {
  console.log(select.value);
  window.addEventListener("click", handleClickOutside);
});

const updateSearch = (repo: any) => {
  //update search term and selected repo and hide liste
  repositoriesStore.keywordRepository = repo.name;
  repositoriesStore.selectedRepo = repo.name;
  repositoriesStore.showReposList = false;
};
</script>
