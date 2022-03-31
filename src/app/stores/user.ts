import axios from "axios";
import { defineStore } from "pinia";
import { useAuthentication } from "./authentication";

export const useUser = defineStore("user", {
  state: () => ({
    name: "",
    avatar: "",
    username: "",
    errorMessage: "",
    successMessage: "",
    showSuccessAlert: false,
    showErrorAlert: false,
    userLoading: true,
  }),
  actions: {
    async getUser() {
      return axios({
        url: "https://api.github.com/user",
        headers: {
          Authorization: `token ${useAuthentication().token}`,
        },
        method: "GET",
      }).then((result) => result.data);
    },
  },
});
