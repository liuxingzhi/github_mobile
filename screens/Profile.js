import * as React from "react";
import axios from "axios";
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, Linking} from "react-native";
import {Overlay} from "react-native-elements"
import {CustomerHeader} from "./CustomerHeader";
import {Card, Header, Icon, Left, Button, Right, Container} from "native-base";
import {githubQuery} from "../utils/util";
import AnimatedLoader from "react-native-animated-loader";
import {LoadingTheme} from "./LoadingTheme";
import {UserModel, emptyUserData} from "../model/UserModel"

const bannerColor = "#00BFFF"

export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loadingErr: false,
        }
        this.currentUser = ""
        this.user = new UserModel(emptyUserData)
        this.navTitle = "Profile"

    }

    setNewUser() {
        if (this.props.getCurrentUser() !== this.currentUser) {
            this.currentUser = this.props.getCurrentUser()
            return true
        }

        return false
    }

    loadData() {
        if (!this.setNewUser()) {
            return
        }
        this.setState({isLoading: true, loadingErr: false})
        let query = `query { 
                user(login:"${this.currentUser}") { 
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
        }`

        githubQuery(query)
            .then(response => {
                let userData = response.data.user
                this.user = new UserModel(userData)
                this.setState({isLoading: false, loadingErr: false})
            })
            .catch(error => {
                console.log(error)
                this.user = new UserModel(emptyUserData)
                this.setState({isLoading: false, loadingErr: true})
            })

    }

    /**
     * This function request the data from github and add it to the state of the class
     * @returns {JSX.Element}
     */
    componentDidMount() {
        // this._isMounted = true;
        // console.log(2341341, this.props)
        const {navigation} = this.props
        navigation.addListener('focus', () => {
            this.loadData()
        })

        this.loadData()
    }

    // componentWillUnmount() {
    //     this._isMounted = false;
    // }
    /**
     * This function renders the Profile screen.
     * @returns {JSX.Element}
     */
    render() {
        // const {navigate} = this.props.navigation;
        // console.log(111, this.props.testCurrentUserState, this.props.getCurrentUser(), this.state.currentUser)
        return (
            <Container>
                <LoadingTheme visibility={this.state.isLoading}/>
                <View style={styles.header}>
                    <Header style={{backgroundColor: 'transparent', borderBottomColor: 'transparent'}}>
                        {this.props.hasPreviousUser()
                            ? <Left style={{flex: 1, marginLeft: 3}}>
                                <TouchableOpacity onPress={() => {
                                    this.props.returnToPreviousUserHandler()
                                    this.loadData()
                                }}>
                                    <Icon name='arrow-back'/>
                                </TouchableOpacity>
                            </Left>
                            : null
                        }
                    </Header>
                </View>
                <Image style={styles.avatar} source={{uri: this.user.profileImage}}/>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.nickname}>{this.user.name}</Text>
                        <Text style={styles.name}>{this.user.username}</Text>

                        {this.user.website !== ''
                            ? <TouchableOpacity onPress={() => Linking.openURL(this.user.website)}>
                                <Text style={styles.info}>{this.user.website}</Text>
                            </TouchableOpacity>
                            : null}
                        {this.user.email !== '' ? <Text style={styles.info}>{this.user.email}</Text> : null}

                        <Text style={styles.description}>{this.user.bio}{"\n"}
                            Joined Github at {this.user.createDate}</Text>

                        <TouchableOpacity testID="Repo" style={[styles.buttonContainer, {marginTop: 20}]} onPress={() => {
                            this.props.navigation.navigate('Repo')
                        }}>
                            <Text>Repositories: {this.user.publicReposCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity testID="Follower" style={styles.buttonContainer} onPress={() => {
                            this.props.navigation.navigate('Follower')
                        }}>
                            <Text>Follower: {this.user.followersCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity testID="Following" style={styles.buttonContainer} onPress={() => {
                            this.props.navigation.navigate('Following')
                        }}>
                            <Text>Following: {this.user.followingCount}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: bannerColor,
        height: 200,
    },

    avatar: {
        width: 125,
        height: 125,
        borderRadius: 160,
        borderWidth: 2,
        borderColor: "white",
        // marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },


    body: {
        marginTop: 40,
    },

    bodyContent: {
        // flex: 1,
        alignItems: 'center',
        padding: 30,
    },

    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },

    nickname: {
        fontSize: 32,
        color: "#000000",
        fontWeight: "600",
        marginBottom: 2
    },

    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },

    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },

    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: bannerColor,
    },
});
