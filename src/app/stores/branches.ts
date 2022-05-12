import axios from "axios";
import { defineStore } from "pinia";
import { useAuthentication } from "./authentication";
import { useRepositories } from "./repositories";
import { useUser } from "./user";

export interface Branch {
  name: string;
}

export const useBranches = defineStore("branches", {
  state: () => ({
    selectedBranch: "",
    keywordBranch: "",
    default_branch: "",
    branches: [] as Array<Branch>,
  }),

  actions: {
    async getBranches(userLogin: string, repository: string) {
      return axios({
        url: `https://api.github.com/repos/${userLogin}/${repository}/branches`,
        headers: {
          Authorization: `token ${useAuthentication().token}`,
        },
        method: "GET",
      }).then((result) => result.data);
    },
    async refreshBranches() {
      this.selectedBranch = this.default_branch;
      const branches = await this.getBranches(
        useUser().username,
        useRepositories().selectedRepo
      ).catch((err) => {
        useUser().triggerAlert("error", err.response.data.message);
        return;
      });
      if (branches) {
        this.branches = branches;
      } else {
        this.selectedBranch = "";
        this.branches = [];
      }
    },
  },
});
