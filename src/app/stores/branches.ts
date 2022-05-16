import axios from "axios";
import { defineStore } from "pinia";
import { Branch, BranchesService } from "../services/BranchesService";
import { useAlert } from "./alert";
import { useRepositories } from "./repositories";
import { useUser } from "./user";

interface BranchState {
  selectedBranch: string;
  keywordBranch: string;
  default_branch: string;
  branches: Array<Branch>;
}

const BranchesS = new BranchesService();

export const useBranches = defineStore("branches", {
  state: (): BranchState => ({
    selectedBranch: "",
    keywordBranch: "",
    default_branch: "",
    branches: [],
  }),

  actions: {
    async updateBranches() {
      this.selectedBranch = this.default_branch;
      try {
        let username = useUser().username;
        let selectedRepo = useRepositories().selectedRepo;
        const branches = await BranchesS.getBranches(username, selectedRepo);
        this.branches = branches;
      } catch (error) {
        useAlert().triggerAlert("error", error);
      }
    },
    clearBranches() {
      this.$reset();
    },
  },
});
