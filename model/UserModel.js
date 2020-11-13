const emptyUserData = {
    avatarUrl: '',
    name: '',
    login: '',
    bio: '',
    websiteUrl: '',
    email: '',
    repositories: {totalCount: ''},
    followers: {totalCount: ''},
    following: {totalCount: ''},
    createDate: '',
}

class UserModel {
    constructor(userData = emptyUserData) {
        if (userData == null){
            userData = emptyUserData;
        }
        this.profileImage = userData.avatarUrl != null ? userData.avatarUrl : ''
        this.name = userData.name != null ? userData.name : ''
        this.username = userData.login != null ? userData.login : ''
        this.bio = userData.bio
        this.website = userData.websiteUrl != null ? userData.websiteUrl : ''
        this.email = userData.email != null ? userData.email : ''
        this.publicReposCount = userData.repositories != null ? userData.repositories.totalCount : 0
        this.followersCount = userData.followers != null ? userData.followers.totalCount : 0
        this.followingCount = userData.following != null ? userData.following.totalCount : 0
        this.createDate = userData.createdAt
    }

    set createDate(createdAt) {
        this._createDate = createdAt != null ? createdAt : ''
    }

    get createDate() {
        return this._createDate.split('T')[0]
    }

    set bio(userBio) {
        this._bio = userBio != null ? userBio : ''
    }

    get bio() {
        return this._bio.trim()
    }

    searchKeyCaseInsensitive(key){
        return this.username.toLowerCase().includes(key.toLowerCase());
    }
}

export {UserModel, emptyUserData}