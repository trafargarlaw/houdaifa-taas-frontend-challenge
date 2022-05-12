<template>
  <details ref="details" class="details mx-4 inline-block my-4">
    <summary
      class="text-gray-200 bg-gray-800 border space-x-2 border-gray-700 relative inline-block px-4 py-[5px] font-medium whitespace-nowrap align-middle cursor-pointer select-none rounded-md"
      data-hotkey="w"
      title="Switch branches"
      role="button"
    >
      <svg
        text="gray"
        aria-hidden="true"
        height="16"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        data-view-component="true"
        class="inline-block align-middle fill-gray-400"
      >
        <path
          fill-rule="evenodd"
          d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"
        ></path>
      </svg>
      <span class="inline-block text-gray-300">{{
        branchesStore.selectedBranch || "master"
      }}</span>
      <span
        class="inline-block border-gray-400 w-0 h-0 align-middle content-[''] border-t-4 border-r-4 border-b-0 border-l-4 border-r-transparent border-b-transparent border-l-transparent"
      ></span>
    </summary>
    <div
      class="bg-gray-800 z-10 absolute w-72 flex flex-col rounded-md border border-gray-700 mt-2"
    >
      <header class="flex border-b border-gray-700 justify-between px-2 py-1">
        <span class="text-gray-400">Switch branches</span>
      </header>
      <div>
        <div class="px-2 py-1 border-b border-gray-700">
          <input
            type="text"
            class="w-full outline-none rounded-md px-1 py-1"
            placeholder="Find a branch…"
            spellcheck="false"
            v-model="branchesStore.keywordBranch"
          />
        </div>

        <div
          class="text-gray-400 font-medium px-2 pb-1 border-b border-gray-700"
          role="tablist"
        >
          <span>Branches</span>
        </div>
        <div>
          <ul>
            <li
              class="border-b cursor-pointer border-gray-700 hover:bg-gray-600"
              v-for="branch in matchingBranches"
              :key="branch.name"
              @click="updateBranch(branch.name)"
            >
              <button class="flex px-4 py-1 text-gray-400">
                <span>{{ branch.name }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </details>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useBranches, Branch } from "../stores/branches";
import { useCommits } from "../stores/commits";
export default defineComponent({
  name: "BranchSelectMenu",
  setup() {
    const commitsStore = useCommits();
    const branchesStore = useBranches();
    return {
      commitsStore,
      branchesStore,
    };
  },
  watch: {
    async "branchesStore.selectedBranch"() {
      this.commitsStore.refreshCommits();
    },
  },
  mounted() {
    window.addEventListener("click", this.handleClickOutside);
  },
  computed: {
    matchingBranches(): Branch[] {
      return this.branchesStore.branches?.filter((branch: Branch) =>
        branch.name
          .toLowerCase()
          .includes(this.branchesStore.keywordBranch.toLowerCase())
      );
    },
  },
  methods: {
    handleClickOutside: function (event: Event) {
      if (
        this.$refs.details == null ||
        (this.$refs["details"] as HTMLDetailsElement).contains(
          event.target as HTMLElement
        )
      )
        return;
      (this.$refs["details"] as HTMLDetailsElement).removeAttribute("open");
    },
    updateBranch: function (branchName: string) {
      this.branchesStore.selectedBranch = branchName;
      (this.$refs["details"] as HTMLDetailsElement).removeAttribute("open");
    },
  },
});
</script>
