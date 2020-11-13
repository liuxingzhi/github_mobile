const {UserModel} = require("../src/model/UserModel")

it("User model test basic", () => {
    const user = new UserModel({
        "login": "someUser",
        "bio": "CS student\n\n",
        "avatarUrl": "https://avatars2.githubusercontent.com/u/32395973?u=08c9c2f494e92a9bc3f48772fdd314901ba73e50&v=4",
        "websiteUrl": null,
        "createdAt": "2017-09-29T15:55:16Z",
        "name": "pistachio",
        "email": "",
        "repositories": {
            "totalCount": 48
        },
        "followers": {
            "totalCount": 17
        },
        "following": {
            "totalCount": 39
        }
    });
    expect(user.profileImage).toBe("https://avatars2.githubusercontent.com/u/32395973?u=08c9c2f494e92a9bc3f48772fdd314901ba73e50&v=4")
    expect(user.name).toBe("pistachio")
    expect(user.username).toBe("someUser")
    expect(user.bio).toBe("CS student")
    expect(user.website).toBe("")
    expect(user.email).toBe("")
    expect(user.publicReposCount).toBe(48)
    expect(user.followersCount).toBe(17)
    expect(user.followingCount).toBe(39)
    expect(user.createDate).toBe("2017-09-29")
})

it("User model test, missing data", () => {
    const user = new UserModel({
    });
    expect(user.profileImage).toBe("")
    expect(user.name).toBe("")
    expect(user.username).toBe("")
    expect(user.bio).toBe("")
    expect(user.website).toBe("")
    expect(user.email).toBe("")
    expect(user.publicReposCount).toBe(0)
    expect(user.followersCount).toBe(0)
    expect(user.followingCount).toBe(0)
    expect(user.createDate).toBe("")
})