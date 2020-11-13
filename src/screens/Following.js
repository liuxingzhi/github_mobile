import {TouchableOpacity, View} from "react-native";
import * as React from "react";
import axios from "axios";
import {Body, Container, Content, Header, Left, List, ListItem, Text, Thumbnail} from "native-base";
import {CustomerHeader} from "./CustomerHeader";
import {emptyUserData, UserModel} from "../model/UserModel";
import {githubQuery, parseNodesToModel} from "../utils/util";
import {LoadingTheme} from "./LoadingTheme";

export default class FollowingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            followers: []
        }
        this.navTitle = "Following"
        this.following = [new UserModel(emptyUserData)]
        this.currentUser = ""
        this.filterCriteria = ""
    }

    setFilterCriteriaHandler(str) {
        this.filterCriteria = str
        this.setState({})
    }

    setNewUser() {
        // console.log('current', this.currentUser, '\tparent', this.props.getCurrentUser())
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
        let query = `
        {
          user(login: "${this.currentUser}") {
            login
            bio
            following(first: 100) {
              nodes {
                login
                bio
                avatarUrl
                repositories {
                  totalCount
                }
              }
            }
          }
        }`

        githubQuery(query)
            .then(response => {
                // put data into data model
                let userDataArray = response.data.user.following.nodes
                this.following = parseNodesToModel(userDataArray, UserModel)
                this.following.sort(function (a, b) {
                    return a.publicReposCount - b.publicReposCount
                })
                // console.log(this.following)
                this.setState({isLoading: false, loadingErr: false})
            })
            .catch(error => {
                // console.log(error)
                // return empty model when error
                this.following = [new UserModel(emptyUserData)]
                this.setState({isLoading: false, loadingErr: true})
            })

    }

    componentDidMount() {
        // this._isMounted = true;
        this.props.navigation.addListener('focus', () => {
            this.loadData()
        })
        this.loadData()
    }


    render() {
        return (
            <Container>
                <LoadingTheme visibility={this.state.isLoading}/>
                <CustomerHeader title={this.navTitle} navigation={this.props.navigation}
                                setFilterCriteriaHandler={this.setFilterCriteriaHandler.bind(this)}/>
                <Content>
                    <List>
                        {
                            this.following.map((user, key) => {

                                return user.searchKeyCaseInsensitive(this.filterCriteria)
                                    ? (
                                        <ListItem avatar key={key}>
                                            <Left>
                                                <TouchableOpacity onPress={() => {
                                                    this.props.setCurrentUserHandler(user.username)
                                                    this.props.navigation.navigate('Profile')
                                                }}>
                                                    <Thumbnail source={{uri: user.profileImage}}/>
                                                </TouchableOpacity>
                                            </Left>
                                            <Body>
                                                <TouchableOpacity onPress={() => {
                                                    this.props.setCurrentUserHandler(user.username)
                                                    this.props.navigation.navigate('Profile')
                                                }}>
                                                    <Text>{user.username}</Text>
                                                </TouchableOpacity>
                                                <Text note>{user.bio}</Text>
                                            </Body>
                                        </ListItem>
                                    )
                                    : null
                            })
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}

