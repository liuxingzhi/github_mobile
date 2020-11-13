/**
 * This file contain 4 different kinds of services,
 * loadUserData
 * loadFollowerData
 * loadFollowingData
 * loadRepoData
 */
import {githubQuery, parseNodesToModel} from "./util.js";
import {emptyUserData, UserModel} from "../model/UserModel.js";
import {emptyRepoData, RepoModel} from "../model/RepoModel.js";


async function loadUserData(username) {
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

    try {
        // load data
        let response = await githubQuery(query);
        let userData = response.data.user
        return new UserModel(userData)
    }catch (error){
        // use empty data when error
        // console.log(error)
        return new UserModel(emptyUserData)
    }
}

async function loadRepoData(username) {
    let query = `query {
                        user(login:"${username}") {
                            repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}){
                                nodes{
                                    owner{
                                      login
                                    }
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
    try {
        // load data
        let response = await githubQuery(query);
        let repoDataArray = response.data.user.repositories.nodes
        let repos = parseNodesToModel(repoDataArray, RepoModel)
        return repos
    }catch (error){
        // use empty data when error
        // console.log(error)
        return [new RepoModel(emptyRepoData)]
    }
}

async function loadFollowerData(username) {
    let query = `
        {
          user(login: "${username}") {
            login
            bio
            followers(first: 100) {
              nodes {
                login
                bio
                name
                avatarUrl
                repositories {
                  totalCount
                }
              }
            }
          }
        }`

    try {
        // load data
        let response = await githubQuery(query);
        let userDataArray = response.data.user.followers.nodes
        let userList = parseNodesToModel(userDataArray, UserModel)
        userList.sort(function (a, b) {
            return a.publicReposCount - b.publicReposCount
        })
        return userList
    }catch (error){
        // use empty data when error
        // console.log(error)
        return [new UserModel(emptyUserData)]
    }
}

async function loadFollowingData(username) {
    let query = `
        {
          user(login: "${username}") {
            login
            bio
            following(first: 100) {
              nodes {
                login
                name
                bio
                avatarUrl
                repositories {
                  totalCount
                }
              }
            }
          }
        }`

    try {
        // load data
        let response = await githubQuery(query);
        let userDataArray = response.data.user.following.nodes
        let userList = parseNodesToModel(userDataArray, UserModel)
        userList.sort(function (a, b) {
            return a.publicReposCount - b.publicReposCount
        })
        return userList
    }catch (error){
        // use empty data when error
        // console.log(error)
        return [new UserModel(emptyUserData)]
    }
}

export {loadFollowerData, loadFollowingData, loadRepoData, loadUserData}