#! /usr/bin/env node

const [, , ...args] = process.argv
import {profileScreenCLI, repoScreenCLI, followingScreenCLI, followerScreenCLI} from "./screens/ScreensCLI.js";

let username = process.argv[3]
if (username == null) {
    printUsage()
} else {
    main().then(r => {
    })
}

function printUsage() {
    console.log(
        "Usage:\n" +
        "gh-viewer <screenname> <username>"
    )
}

async function main() {
    switch (process.argv[2]) {
        case "profile":
            console.log(await profileScreenCLI(username))
            break
        case "repo":
            console.log(await repoScreenCLI(username))
            break
        case "follower":
            console.log(await followerScreenCLI(username))
            break
        case "following":
            console.log(await followingScreenCLI(username))
            break
        default:
            printUsage()
    }
}

export {profileScreenCLI, repoScreenCLI, followerScreenCLI, followingScreenCLI}