import {profileScreenCLI, repoScreenCLI, followerScreenCLI, followingScreenCLI} from '../src/screens/ScreensCLI'
import {UserModel} from "../src/model/UserModel";
import {RepoModel} from "../src/model/RepoModel";
import renderer from 'react-test-renderer';

it("test cli of profile screen work", async () => {
    let testUsername = 'liuxingzhi'
    let info = await profileScreenCLI(testUsername)
    expect(info).toBe('name: pistachio\n' +
        'username: liuxingzhi\n' +
        'bio: CS student in UIUC, passionate programmer and Go player.\n' +
        'website: \n' +
        'email: \n' +
        'publicReposCount: 39\n' +
        'followersCount: 18\n' +
        'followingCount: 39\n' +
        'Name: 2017-09-29T15:55:16Z\n')
    // console.log(info)
})

it("test cli of repo screen work", async () => {
    let testUsername = 'liuxingzhi'
    let info = await repoScreenCLI(testUsername)
    expect(info).toContain(
        "owner: liuxingzhi\n" +
        "name: ChromeDriverManager");
    expect(info).toContain(
        "owner: liuxingzhi\n" +
        "name: DB_helpers\n" +
        "description: make python2database more friendly");
    expect(info).toContain(
        "owner: liuxingzhi\n" +
        "name: Shortest_Job_First\n" +
        "description: Self-designed Job Finding Website with advanced information collection system & recommendation system");
})

it("test cli of follower screen work", async () => {
    let testUsername = 'liuxingzhi'
    let info = await followerScreenCLI(testUsername)
    expect(info).toContain(
        "login: chenxinhang12345\n" +
        "name: WeebLIfesMatter");
    expect(info).toContain(
        "login: nocodenonono\n" +
        "name: Qingnian Meng");
})

it("test cli of following screen work", async () => {
    let testUsername = 'liuxingzhi'
    let info = await followingScreenCLI(testUsername)
    expect(info).toContain(
        "login: chenxinhang12345\n" +
        "name: WeebLIfesMatter");
    console.log(info)
})


it("test cli profile bad name", async () => {
    let testUsername = ''
    let info = await profileScreenCLI(testUsername)
    expect(info).toBe('name: \n' +
        'username: \n' +
        'bio: \n' +
        'website: \n' +
        'email: \n' +
        'publicReposCount: \n' +
        'followersCount: \n' +
        'followingCount: \n' +
        'Name: \n')
    console.log(info)
})

it("test cli repo bad name", async () => {
    let testUsername = ''
    let info = await repoScreenCLI(testUsername)
    expect(info).toBe('owner: \n' +
        'name: \n' +
        'description: \n')
})

it("test cli follower bad name", async () => {
    let testUsername = ''
    let info = await followerScreenCLI(testUsername)
    expect(info).toBe('login: \n' +
        'name: \n')
})

it("test cli following", async () => {
    let testUsername = ''
    let info = await followingScreenCLI(testUsername)
    expect(info).toBe('login: \n' +
        'name: \n')
})