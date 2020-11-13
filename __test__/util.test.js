const {UserModel} = require("../src/model/UserModel")
const {RepoModel} = require("../src/model/RepoModel")
const {githubQuery, parseNodesToModel} = require("../src/utils/util")

it("User test node parsing for User", () => {
    let nodes_count = 5;
    let dataArray = [];
    for(let j = 0; j < nodes_count; j++){
        dataArray.push({
            "login": "someUser",
            "repositories": {
                "totalCount": 48
            },
            "followers": {
                "totalCount": 17
            },
            "following": {
                "totalCount": 39
            }})
    }
    const modelList = parseNodesToModel(
        dataArray, UserModel
    )

    expect(modelList.length).toBe(nodes_count)
})

it("User test node parsing for Repo", () => {
    let nodes_count = 3;
    let dataArray = [];
    for(let j = 0; j < nodes_count; j++){
        dataArray.push({
            "name": "" + j,
            "url": "some_url",
            "description": null,
            "updatedAt": "2020-08-28T02:22:36Z",
            "stargazers": {
                "totalCount": 0
            },
            "forkCount": 0})
    }
    const modelList = parseNodesToModel(
        dataArray, RepoModel
    )

    expect(modelList.length).toBe(nodes_count)
})