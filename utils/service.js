/**
 * This file contain 4 different kinds of services,
 * loadUserData
 * loadFollowerData
 * loadFollowingData
 * loadRepoData
 */
import {githubQuery, parseNodesToModel} from "./util";
import {emptyUserData, UserModel} from "../model/UserModel";
import {emptyRepoData, RepoModel} from "../model/RepoModel";

function loadUserData(username) {
    let query = `query { 
                user(login:"${username}") { 
                    login
                    bio
                    avatarUrl
                    websiteUrl
                    createdAt
                    name
                    email
                    repositories(first: 100) {
                        totalCount
                    }
                    followers {
                        totalCount
                    }
                    following {
                        totalCount
                    }
                }
        }`

    githubQuery(query)
        .then(response => {
            let userData = response.data.user
            return new UserModel(userData)
        })
        .catch(error => {
            console.log(error)
            return new UserModel(emptyUserData)
        })
}

function loadRepoData(username) {
    let query = `query {
                        user(login:"${username}") {
                            repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}){
                                nodes{
                                    name
                                    url
                                    description
                                    updatedAt
                                    primaryLanguage{
                                        name
                                        color
                                    }
                                    stargazers{
                                        totalCount
                                    }
                                    forkCount
                                }
                            }
                        }
                    }`
    githubQuery(query)
        .then(response => {
            let repoDataArray = response.data.user.repositories.nodes
            let repos = parseNodesToModel(repoDataArray, RepoModel)
            return repos
        })
        .catch(error => {
            console.log(error)
            return [new RepoModel(emptyRepoData)]
        });
}

function loadFollowerData(username) {
    let query = `
        {
          user(login: "${username}") {
            login
            bio
            followers(first: 100) {
              nodes {
                login
                bio
                avatarUrl
                repositories {
                  totalCount
                }
              }
            }
          }
        }`

    githubQuery(query)
        .then(response => {
            // console.log(response.data.user.followers.nodes)
            let userDataArray = response.data.user.followers.nodes
            let userList = parseNodesToModel(userDataArray, UserModel)
            userList.sort(function (a, b) {
                return a.publicReposCount - b.publicReposCount
            })
            return userList
        })
        .catch(error => {
            console.log(error)
            return [new UserModel(emptyUserData)]
        })
}

function loadFollowingData() {
    let query = `
        {
          user(login: "${this.currentUser}") {
            login
            bio
            following(first: 100) {
              nodes {
                login
                bio
                avatarUrl
                repositories {
                  totalCount
                }
              }
            }
          }
        }`

    githubQuery(query)
        .then(response => {
            // console.log(response.data.user.followers.nodes)
            let userDataArray = response.data.user.following.nodes
            let userList = parseNodesToModel(userDataArray, UserModel)
            userList.sort(function (a, b) {
                return a.publicReposCount - b.publicReposCount
            })
            return userList
        })
        .catch(error => {
            console.log(error)
            return [new UserModel(emptyUserData)]
        })
}

export {loadFollowerData, loadFollowingData, loadRepoData, loadUserData}