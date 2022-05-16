import axios, { AxiosResponse } from "axios";

export interface Repository {
  name: string;
  default_branch: string;
}
interface IRepositoryService {
  getRepositories(): Promise<Array<Repository>>;
}

export class RepositoryService implements IRepositoryService {
  getRepositories(): Promise<Array<Repository>> {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/repos/")
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
}
