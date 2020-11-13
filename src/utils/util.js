import * as ENV from "../env.js"
import fetch from 'cross-fetch'
import {emptyUserData, UserModel} from "../model/UserModel.js"

/**
 * A wrap to the github API call
 * @param query
 * @param token
 * @returns {Promise<Response|{}>}
 */
async function githubQuery(query, token) {
    let url = 'https://api.github.com/graphql'
    return await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${ENV.USER_AUTH_TOKEN}`,
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
                    console.log(new Error(`401 Unauthorized`))
                case 403:
                    console.log (new Error(`403 Forbidden`))
                default:
                    return response.json()
            }
        }
    }).catch(error => {
        console.log(error)
        return {}
    })
}

/**
 * A helper function to convert nodes array to corresponding list of model
 * @param nodesArray
 * @param Model: A class instance, the returned model list will be of the class type passed in
 * @returns {[]}
 */
function parseNodesToModel(nodesArray, Model) {
    let modelList = []
    for (const node of nodesArray) {
        modelList.push(new Model(node))
    }
    return modelList
}

export {githubQuery, parseNodesToModel}
