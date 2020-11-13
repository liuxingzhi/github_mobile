/**
 * default empty data structure for repo
 * @type {{stargazers: {totalCount: number}, name: string, description: string, forkCount: number, url: string, primaryLanguage: {color: string, name: string}, updatedAt: string}}
 */
const emptyRepoData = {
    name: '',
    url: '',
    description: '',
    updatedAt: '',
    primaryLanguage: {
        name: '',
        color: '#FFFFFF', // White, invisible by default
    },
    stargazers: {
        totalCount: 0,
    },
    forkCount: 0
}

/**
 * Class model for repository, used by repo screen
 */
class RepoModel {
    constructor(repoData = emptyRepoData) {
        if (repoData == null){
            repoData = emptyRepoData
        }
        this.name = repoData.name != null ? repoData.name.trim() : ''
        this.url = repoData.url != null ? repoData.url : ''
        this.description = repoData.description != null ? repoData.description : ''
        this.updatedAt = repoData.updatedAt != null ? repoData.updatedAt : ''
        this.primaryLanguage = repoData.primaryLanguage != null ? repoData.primaryLanguage.name : ''
        this.primaryLanguageColor = repoData.primaryLanguage != null ? repoData.primaryLanguage.color : '#ffffff'
        this.starCount = repoData.stargazers != null ? repoData.stargazers.totalCount : 0
        this.forkCount = repoData.forkCount != null ? repoData.forkCount : 0
        this.owner = repoData.owner != null ? repoData.owner.login : ''
    }

    searchKeyCaseInsensitive(key){
        return this.name.toLowerCase().includes(key.toLowerCase());
    }
}

export {RepoModel, emptyRepoData}