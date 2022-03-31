import axios from "axios";
import { defineStore } from "pinia";
import { LocationQueryValue } from "vue-router";
import { useUser } from "../stores/user";

export const useAuthentication = defineStore("authentication", {
  state: () => ({
    token: localStorage.getItem("user-token"),
  }),
  getters: {
    checkTokenValidity: async (state) => {
      return await axios({
        url: "https://api.github.com/user",
        headers: {
          Authorization: `token ${state.token}`,
        },
        method: "GET",
      }).catch((err) => err);
    },
  },
  actions: {
    clearToken() {
      localStorage.removeItem("user-token");
      this.token = localStorage.getItem("user-token");
      return;
    },
    authentify(code: LocationQueryValue | LocationQueryValue[]) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/api/auth?code=${code}`)
          .then((res: any) => {
            if (res.data.access_token) {
              const token = res.data.access_token;
              localStorage.setItem("user-token", token); // store the token in localstorage
              this.token = localStorage.getItem("user-token");
              resolve(res);
            } else {
              this.clearToken();

              reject(res.data.error);
            }
          })
          .catch((err: any) => {
            this.clearToken();

            reject(err);
          });
      });
    },
  },
});
