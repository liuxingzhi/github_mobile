const {RepoModel} = require("../src/model/RepoModel")

it("Repo model test, basic", () => {
    const repo = new RepoModel({
        "name": "ChromeDriverManager",
        "url": "some_url",
        "description": null,
        "updatedAt": "2020-08-28T02:22:36Z",
        "primaryLanguage": {
        "name": "Python",
            "color": "#3572A5"
    },
        "stargazers": {
        "totalCount": 0
    },
        "forkCount": 0
    });
    expect(repo.name).toBe("ChromeDriverManager")
    expect(repo.url).toBe("some_url")
    expect(repo.description).toBe("")
    expect(repo.updatedAt).toBe("2020-08-28T02:22:36Z")
    expect(repo.primaryLanguage).toBe("Python")
    expect(repo.primaryLanguageColor).toBe("#3572A5")
    expect(repo.starCount).toBe(0)
    expect(repo.forkCount).toBe(0)
})

it("Repo model test, language unknown", () => {
    const repo = new RepoModel({
        "name": "ChromeDriverManager",
        "url": "some_url",
        "description": null,
        "updatedAt": "2020-08-28T02:22:36Z",
        "stargazers": {
            "totalCount": 0
        },
        "forkCount": 0
    });
    expect(repo.primaryLanguage).toBe("")
    expect(repo.primaryLanguageColor).toBe("#ffffff")
})