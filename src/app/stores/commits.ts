import axios from "axios";
import { defineStore } from "pinia";
import { CommitsService } from "../services/CommitsService";
import { useAlert } from "./alert";
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

const commitsS = new CommitsService();

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
    async updateCommits() {
      this.isCommitsLastPage = false;
      this.commitsPage = 1;
      try {
        const commits = await commitsS.getCommits(
          useUser().username,
          useRepositories().selectedRepo,
          useBranches().selectedBranch
        );
        this.commits = this.mergeSameDate(commits);
        if (commits.length < 30) {
          this.isCommitsLastPage = true;
        }
      } catch (err) {
        useAlert().triggerAlert(
          "error",
          "An error occured while getting commits"
        );
        this.commits = [];
      }
    },
    async loadMoreCommits() {
      if (this.isCommitsLastPage) {
        return;
      }
      this.isCommitsLoading = true;
      try {
        const commits = await commitsS.getCommits(
          useUser().username,
          useRepositories().selectedRepo,
          useBranches().selectedBranch,
          this.commitsPage + 1
        );
        this.commits = [...this.commits, ...this.mergeSameDate(commits)];
        this.commitsPage++;
        if (commits.length === 0 || commits.length < 30) {
          this.isCommitsLastPage = true;
        }
      } catch (err) {
        useAlert().triggerAlert("error", err);
      }
      this.isCommitsLoading = false;
    },
    clearCommits() {
      this.$reset();
    },
  },
});
