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
    }

    searchKeyCaseInsensitive(key){
        return this.name.toLowerCase().includes(key.toLowerCase());
    }
}

export {RepoModel, emptyRepoData}