import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from "react-native";
import axios from "axios";
import React, {Component} from 'react';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Left,
    Right,
    Body,
    Thumbnail,
    Text,
    Title,
    Button,
    Icon
} from 'native-base';
import {CustomerHeader} from "./CustomerHeader";
import {githubQuery, parseNodesToModel} from "../utils/util";
import {emptyUserData, UserModel} from "../model/UserModel";
import {LoadingTheme} from "./LoadingTheme";

export default class FollowerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loadingErr: false,
        }
        this.followers = [new UserModel(emptyUserData)]
        this.navTitle = "Follower"
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

    /**
     * loading data
     */
    loadData() {
        if (!this.setNewUser()){
            return
        }
        this.setState({isLoading: true, loadingErr: false})
        let query = `
        {
          user(login: "${this.currentUser}") {
            login
            bio
            followers(first: 100) {
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
                let userDataArray = response.data.user.followers.nodes
                this.followers = parseNodesToModel(userDataArray, UserModel)
                this.followers.sort(function (a, b) {
                    return a.publicReposCount - b.publicReposCount
                })
                // console.log(this.followers)
                this.setState({isLoading: false, loadingErr: false})
            })
            .catch(error => {
                // console.log(error)
                // return empty model when error
                this.followers = [new UserModel(emptyUserData)]
                this.setState({isLoading: false, loadingErr: true})
            })

    }

    componentDidMount() {
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
                            this.followers.map((user, key) => {
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
                                }
                            )
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}


