import {loadFollowerData, loadRepoData, loadUserData} from "../utils/service.js";

/**
 * Show profile Screen data via cli
 * @param username
 * @returns {Promise<string>}
 */
async function profileScreenCLI(username) {
    try {
        let any = await loadUserData(username)
        return `name: ${any.name}` + '\n' +
            `username: ${any.username}` + '\n' +
            `bio: ${any.bio}` + '\n' +
            `website: ${any.website}` + '\n' +
            `email: ${any.email}` + '\n' +
            `publicReposCount: ${any.publicReposCount}` + '\n' +
            `followersCount: ${any.followersCount}` + '\n' +
            `followingCount: ${any.followingCount}` + '\n' +
            `Name: ${any._createDate}` + '\n'
    } catch (error) {
        console.log(error)
        return ''
    }
}

/**
 * Show repo Screen data via cli
 * @param username
 * @returns {Promise<string>}
 */
async function repoScreenCLI(username) {
    try {
        let any = await loadRepoData(username)
        let array = []
        for (const repo of any) {
            array.push(`owner: ${repo.owner}` + '\n' +
                `name: ${repo.name}` + '\n' +
                `description: ${repo.description}` + '\n'
            )
        }
        return array.join('\n')
    } catch (error) {
        console.log(error)
        return ''
    }
}

/**
 * Show follower Screen data via cli
 * @param username
 * @returns {Promise<string>}
 */
async function followerScreenCLI(username) {
    try {
        let any = await loadFollowerData(username)
        let array = []
        for (const people of any) {
            array.push(`login: ${people.username}` + '\n' +
                `name: ${people.name}` + '\n'
            )
        }
        return array.join('\n')
    } catch (error) {
        console.log(error)
        return ''
    }
}

/**
 * Show following Screen data via cli
 * @param username
 * @returns {Promise<string>}
 */
async function followingScreenCLI(username) {
    try {
        let any = await loadFollowerData(username)
        let array = []
        for (const people of any) {
            array.push(`login: ${people.username}` + '\n' +
                `name: ${people.name}` + '\n'
            )
        }
        return array.join('\n')
    } catch (error) {
        console.log(error)
        return ''
    }
}

export {profileScreenCLI, repoScreenCLI, followerScreenCLI, followingScreenCLI}