import axios from "axios";
import { defineStore } from "pinia";
import { useAuthentication } from "./authentication";
import { useUser } from "./user";

export interface Repository {
  name: string;
  default_branch: string;
}

export const useRepositories = defineStore("repositories", {
  state: () => ({
    showReposList: false,
    keywordRepository: "",
    selectedRepo: "",
    repos: [] as Array<Repository>,
  }),

  actions: {
    async getRepos() {
      return axios({
        url: "https://api.github.com/user/repos",
        headers: {
          Authorization: `token ${useAuthentication().token}`,
        },
        method: "GET",
      })
        .then((result) => result.data)
        .catch((err) => {
          useUser().triggerAlert("error", err.response.data.message);
          return;
        });
    },
  },
});
