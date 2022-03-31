import axios from "axios";
import { defineStore } from "pinia";
import { useAuthentication } from "./authentication";
import { useBranches } from "./branches";
import { useRepositories } from "./repositories";
import { useUser } from "./user";

export interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  author: {
    date: string;
    avatar_url: string;
    login: string;
  };
}

export const useCommits = defineStore("commits", {
  state: () => ({
    commitsPage: 1,
    commits: [] as Array<Commit[]>,
    isCommitsLastPage: false,
    isCommitsLoading: false,
  }),
  actions: {
    mergeSameDate(array: Commit[]) {
      // merge commits that were made in the same day into separate arrays
      const groupedCommits = array.reduce((acc, commit) => {
        const date = new Date(commit.commit.author.date);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const dateString = `${year}-${month}-${day}`; // we make a string to compare dates
        if (!acc[dateString]) {
          acc[dateString] = []; // if there is no array for this date, we create one
        }
        acc[dateString].push(commit); // push the commit to the array
        return acc;
      }, {} as { [key: string]: Commit[] });

      return Object.values(groupedCommits) as Array<Commit[]>;
    },
    async getCommits(
      userLogin: string,
      repository: string,
      branch?: string,
      page?: number
    ) {
      return await axios({
        url: `https://api.github.com/repos/${userLogin}/${repository}/commits?sha=${
          branch || useBranches().default_branch
        }&page=${page || 1}`,
        headers: {
          Authorization: `token ${useAuthentication().token}`,
        },
        method: "GET",
      }).then((result) => {
        return result.data;
      });
    },
    async refreshCommits() {
      this.isCommitsLastPage = false;
      this.commitsPage = 1;
      const commits = await this.getCommits(
        useUser().username,
        useRepositories().selectedRepo,
        useBranches().selectedBranch
      ).catch((err) => {
        useUser().triggerAlert("error", err.response.data.message);
        return;
      });
      if (commits) {
        this.commits = this.mergeSameDate(commits);
      } else this.commits = [];
    },
  },
});
