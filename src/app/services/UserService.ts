import axios, { AxiosResponse } from "axios";

interface IUserService {
  fetchCurrentUser(): Promise<any>;
}

export class UserService implements IUserService {
  fetchCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/user/")
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
}
