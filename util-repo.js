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
    repositories(first: 100){
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
            forks{
              totalCount
            }
          }
        }
    }
}`, 'b2d8a8e299f6aa94690a341353f8f664a4b38695')
    .then(response => {
        console.log(response.data.user.repositories)

    })
    .catch(error => {
        console.log(error)
    });
