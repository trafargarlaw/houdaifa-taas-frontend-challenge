import axios, { AxiosResponse } from "axios";

export interface Branch {
  name: string;
  default_branch: string;
}
interface IBranchService {
  getBranches(username: string, repository: string): Promise<Array<Branch>>;
}

export class BranchesService implements IBranchService {
  getBranches(username: string, repository: string): Promise<Array<Branch>> {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/repos/${username}/${repository}/branches/`)
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
}
