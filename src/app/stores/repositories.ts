import axios from "axios";
import { defineStore } from "pinia";
import { RepositoryService, Repository } from "../services/RepositoryService";
import { useAlert } from "./alert";

const repositoryS = new RepositoryService();

interface StoreState {
  showReposList: boolean;
  keywordRepository: string;
  selectedRepo: string;
  repos: Array<Repository>;
}

export const useRepositories = defineStore("repositories", {
  state: (): StoreState => ({
    showReposList: false,
    keywordRepository: "",
    selectedRepo: "",
    repos: [],
  }),
  actions: {
    async updateRepository() {
      return repositoryS
        .getRepositories()
        .then((result) => (this.repos = result))
        .catch((err) => {
          useAlert().triggerAlert("error", err);
          return;
        });
    },
    clearRepositories() {
      this.$reset();
    },
  },
});
