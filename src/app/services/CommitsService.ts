import { AxiosResponse } from "axios";
import { useBranches } from "../stores/branches";
import axios from "axios";

interface ICommitsService {
  getCommits(
    userLogin: string,
    repository: string,
    branch?: string,
    page?: number
  ): Promise<Array<any>>;
}

export class CommitsService implements ICommitsService {
  getCommits(
    username: string,
    repository: string,
    branch?: string,
    page?: number
  ): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `api/repos/${username}/${repository}/commits?sha=${branch}&page=${
            page || 1
          }`
        )
        .then((res: AxiosResponse) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log("err", err);
          reject(err.message);
        });
    });
  }
}
