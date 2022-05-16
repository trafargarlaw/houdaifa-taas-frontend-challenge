import axios, { AxiosResponse } from "axios";
import { LocationQueryValue } from "vue-router";

interface IAuthService {
  authentify(code: LocationQueryValue | LocationQueryValue[]): Promise<any>;
  checkTokenValidity(): Promise<boolean>;
  logout(): Promise<AxiosResponse<any, any>>;
}

export class AuthService implements IAuthService {
  authentify(code: LocationQueryValue | LocationQueryValue[]) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/auth?code=${code}`)
        .then((res: AxiosResponse) => {
          if (res.data.message === "successful login") {
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async checkTokenValidity(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      axios({
        url: "/api/checkToken/",
        method: "GET",
      })
        .then((_res) => {
          resolve(true);
        })
        .catch((_err) => {
          reject(false);
        });
    });
  }

  async logout() {
    return await axios.get(`/api/logout`);
  }
}
