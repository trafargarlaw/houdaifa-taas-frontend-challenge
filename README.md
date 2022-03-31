# Houdaifa taas frontend challenge

Simple Vue application to overview github repositories and commits history.

## Description

This is a simple application for overviewing github repositories and commits hisitory using Vite, Vue3, pinia, TailwindCSS for the frontend and simple express server for the backend to execute the github authentication request.

- The User authorizes his Github Account then he is able to list repositories with ability to filter by name, with autocomplete.

- The User can select a repository from the list, then it shows the commit history with an infinite scroll related to the selected branch.

- The User can switch the branch, then the commits listing is being refreshed.

## Getting Started

### Installing

- Clone this repository

```
git clone <this repository>
```

- run the following command to install dependencies:

```
npm install
```

- Create an OAuth github application [Tutorial here](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
- set the homepage url to http://localhost:3000 and the callback url to http://localhost:3000/authentication
- Make sure to set the client id and client secret (this one should stay private and secured) env variables from .env.template
- Rename .env.template into .env.local

### Executing program

- Run the following command to start both server and client:

```
npm run dev
```

- or you can run them separately:

```
npm run client:dev
npm run server:dev
```
