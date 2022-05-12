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
    triggerAlert(type: "success" | "error", message: string) {
      if (type === "success") {
        this.successMessage = message;
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
          this.successMessage = "";
        }, 3000);
        return;
      }
      this.errorMessage = message;
      this.showErrorAlert = true;
      setTimeout(() => {
        this.errorMessage = "";
        this.showErrorAlert = false;
      }, 3000);
    },
  },
});
