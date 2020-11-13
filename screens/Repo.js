import axios from "axios";
import React, {Component} from "react";
import {Linking, TouchableOpacity} from "react-native";
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Body,
    ListItem,
    Left,
    Right,
    Thumbnail,
    Icon
} from "native-base";
import TimeAgo from 'react-native-timeago';
import {color} from "react-native-reanimated";
import {StyleSheet} from "react-native";
import {View} from "react-native"
import {CustomerHeader} from "./CustomerHeader";
import * as Constants from "../styles/language-color"
import {githubQuery, parseNodesToModel} from "../utils/util"
import {LoadingTheme} from "./LoadingTheme";
import {RepoModel, emptyRepoData} from "../model/RepoModel"


export default class RepositoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loadingErr: false,
        }
        this.repos = [new RepoModel(emptyRepoData)]
        this.navTitle = "Repositories"
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
        let query = `query {
                        user(login:"${this.currentUser}") {
                            repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}){
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
                                    forkCount
                                }
                            }
                        }
                    }`
        githubQuery(query)
            .then(response => {
                // console.log('gggg response', response)
                let repoDataArray = response.data.user.repositories.nodes
                this.repos = parseNodesToModel(repoDataArray, RepoModel)
                this.setState({isLoading: false, loadingErr: false})
            })
            .catch(error => {
                console.log(error)
                this.repos = [new RepoModel(emptyRepoData)]
                this.setState({
                    isLoading: false,
                    loadingErr: true,
                })
            });
    }

    /**
     * This function request the data from github and add it to the state of the class
     * @returns {JSX.Element}
     */
    componentDidMount() {
        // this._isMounted = true;

        this.props.navigation.addListener('focus', () => {
            // this.setState({isLoading: true, loadingErr: false})
            this.loadData()
        })

        this.loadData()
    }

    render() {
        return (
            <Container>
                <CustomerHeader title={this.navTitle} navigation={this.props.navigation}
                                setFilterCriteriaHandler={this.setFilterCriteriaHandler.bind(this)}/>
                <LoadingTheme visibility={this.state.isLoading}/>
                <Content padder>
                    <Card>
                        {
                            this.repos.map((repo, key) => {
                                return repo.searchKeyCaseInsensitive(this.filterCriteria)
                                    ? (
                                        [
                                            <CardItem header bordered key={'header' + {key}}
                                                      style={{borderBottomWidth: 0, flexWrap: 'wrap'}}>
                                                <TouchableOpacity onPress={() => Linking.openURL(repo.url)}
                                                                  style={{flex: 3.2}}>
                                                    <Text>{repo.name}</Text>
                                                </TouchableOpacity>

                                                <View style={{flexDirection: 'row', flex: 1}}>
                                                    <Icon name='staro' type='AntDesign' style={{marginLeft: 30}}/>
                                                    <Text style={{
                                                        marginTop: 4,
                                                        color: '#000000'
                                                    }}>{repo.starCount}</Text>
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    flex: 1,
                                                    marginLeft: 50,
                                                    marginRight: -10
                                                }}>
                                                    <Icon name='code-fork' type='FontAwesome'/>
                                                    <Text style={{
                                                        marginLeft: -7,
                                                        marginTop: 4,
                                                        color: '#000000'
                                                    }}>{repo.forkCount}</Text>
                                                </View>
                                            </CardItem>,

                                            <CardItem key={'body' + {key}}>
                                                <Text>{repo.description !== '' ? repo.description : 'No description'}</Text>
                                            </CardItem>,

                                            <CardItem footer bordered key={'footer' + {key}}
                                                      style={{borderTopWidth: 0}}>
                                                <Left>
                                                    <Icon name='primitive-dot' type='Octicons'
                                                          style={{color: repo.primaryLanguageColor !== '' ? repo.primaryLanguageColor : '#000000'}}>
                                                    </Icon>
                                                    <Text>{repo.primaryLanguage !== '' ? repo.primaryLanguage : 'unknown'}</Text>
                                                </Left>

                                                <Right>
                                                    <Text>last updated</Text>
                                                    <TimeAgo time={new Date(repo.updatedAt)}/>
                                                </Right>
                                            </CardItem>
                                        ]
                                    )
                                    : null
                            })
                        }
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    number: {
        color: '#000000'
    }
});
