import React from 'react';
import {Component} from 'react';
import {Button, View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Avatar, Accessory} from 'react-native-elements';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import Moment from 'moment';
import Icon from "react-native-vector-icons";
import ProfileScreen from "./src/screens/Profile";
import FollowerScreen from "./src/screens/Follower";
import FollowingScreen from "./src/screens/Following";
import RepositoryScreen from "./src/screens/Repo";
import {loadFollowerData, loadFollowingData, loadRepoData, loadUserData} from "./src/utils/service"
const Drawer = createDrawerNavigator();
const defaultUsername = 'liuxingzhi'

/**
 * The wrapper of all screens, navigation contained
 * @returns {JSX.Element}
 * @constructor
 */
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUsername: defaultUsername,
        }
        this.userStack = [defaultUsername]
    }

    setCurrentUserHandler(newUsername) {
        if(newUsername !== this.state.currentUsername){
            this.userStack.push(newUsername)
            this.setState({
                currentUsername: newUsername,
            })
        }
    }

    getCurrentUser(){
        return this.userStack[this.userStack.length - 1]
    }

    returnToPreviousUserHandler() {
        if (this.userStack.length > 1) {
            this.userStack.pop()
            let previousUsername = this.userStack[this.userStack.length - 2]
            this.setState({
                currentUsername: previousUsername,
            })
        }
    }

    hasPreviousUser(){
        // console.log(this.userStack)
        return this.userStack.length > 1
    }

    render() {
        // console.log('app 63', this.userStack, this.state.currentUsername)
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Profile">
                        {(props) => <ProfileScreen {...props}
                                                   setCurrentUserHandler={this.setCurrentUserHandler.bind(this)}
                                                   returnToPreviousUserHandler={this.returnToPreviousUserHandler.bind(this)}
                                                   hasPreviousUser={this.hasPreviousUser.bind(this)}
                                                   getCurrentUser={this.getCurrentUser.bind(this)}
                        />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Repo">
                        {(props) => <RepositoryScreen {...props}
                                                      setCurrentUserHandler={this.setCurrentUserHandler.bind(this)}
                                                      getCurrentUser={this.getCurrentUser.bind(this)}
                        />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Follower">
                        {(props) => <FollowerScreen {...props}
                                                    setCurrentUserHandler={this.setCurrentUserHandler.bind(this)}
                                                    getCurrentUser={this.getCurrentUser.bind(this)}
                        />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Following">
                        {(props) => <FollowingScreen {...props}
                                                     setCurrentUserHandler={this.setCurrentUserHandler.bind(this)}
                                                     getCurrentUser={this.getCurrentUser.bind(this)}
                        />}
                    </Drawer.Screen>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

