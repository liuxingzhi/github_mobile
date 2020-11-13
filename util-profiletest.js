const fetch = require("node-fetch");
async function githubQuery(query, token) {
    let url = 'https://api.github.com/graphql'
    return await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
        }),
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            switch (response.status){
                case 401:
                    throw new Error(`401 Unauthorized`);
                case 403:
                    throw new Error(`403 Forbidden`);
            }
        }
    })
}


githubQuery(`query { 
                user(login:"liuxingzhi") { 
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
            }`, 'b2d8a8e299f6aa94690a341353f8f664a4b38695')
    .then(response => {
        console.log(response.data)
        console.log(response.data.user.followers)
        let user = response.data.user
        console.log({
            profileImage: user.avatarUrl,
            name:user.name,
            username:user.login,
            bio:user.bio,
            website:user.websiteUrl,
            email:user.email,
            publicReposCount:user.repositories.totalCount,
            followerCount:user.followers.totalCount,
            followingCount:user.following.totalCount,
            createDate: user.createdAt
        })
    })
    .catch(error => {
        console.log(error)
    });
