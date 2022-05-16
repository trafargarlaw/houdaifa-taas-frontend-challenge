import axios from "axios";
import { defineStore } from "pinia";
import { UserService } from "../services/UserService";
import { useAlert } from "./alert";
import { useBranches } from "./branches";
import { useCommits } from "./commits";
import { useRepositories } from "./repositories";

const userS = new UserService();

export const useUser = defineStore("user", {
  state: () => ({
    name: "",
    avatar: "",
    username: "",
  }),
  actions: {
    async updateUser() {
      return userS.fetchCurrentUser().then((result) => {
        this.name = result.name;
        this.avatar = result.avatar_url;
        this.username = result.login;
      });
    },
    clearUser() {
      this.$reset();
      useRepositories().clearRepositories();
      useBranches().clearBranches();
      useCommits().clearCommits();
    },
  },
});
