import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow, render, mount} from 'enzyme';
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import {githubQuery} from '../utils/util';
import ProfileScreen from "../screens/Profile";
import RepositoryScreen from "../screens/Repo";
import FollowerScreen from "../screens/Following";
import FollowingScreen from "../screens/Follower";
import {RepoModel} from "../model/RepoModel";
import {UserModel} from "../model/UserModel";
import ShallowWrapper from "enzyme/imgs/ShallowWrapper";


const fakeRepoResponse = JSON.stringify(
    {
        "data": {
            "user": {
                "repositories": {
                    "nodes": [
                        {
                            "name": "ChromeDriverManager",
                            "url": "https://github.com/liuxingzhi/ChromeDriverManager",
                            "description": null,
                            "updatedAt": "2020-08-28T02:22:36Z",
                            "primaryLanguage": {
                                "name": "Python",
                                "color": "#3572A5"
                            },
                            "stargazers": {
                                "totalCount": 0
                            },
                            "forkCount": 0
                        },
                        {
                            "name": "course_register",
                            "url": "https://github.com/liuxingzhi/course_register",
                            "description": "crawl uiuc banner info",
                            "updatedAt": "2020-08-28T02:09:55Z",
                            "primaryLanguage": {
                                "name": "HTML",
                                "color": "#e34c26"
                            },
                            "stargazers": {
                                "totalCount": 1
                            },
                            "forkCount": 0
                        },
                        {
                            "name": "my_coursely",
                            "url": "https://github.com/liuxingzhi/my_coursely",
                            "description": null,
                            "updatedAt": "2020-08-28T01:51:41Z",
                            "primaryLanguage": {
                                "name": "Python",
                                "color": "#3572A5"
                            },
                            "stargazers": {
                                "totalCount": 1
                            },
                            "forkCount": 0
                        }
                    ]
                }
            }
        }
    }
)

// jest.setTimeout(60000)
test('test repo renders correctly', async () => {
    fetch.mockResponse(() => Promise.resolve(fakeRepoResponse))
    const wrapper =  shallow(<RepositoryScreen navigation={{addListener: () => null}}
                                              setCurrentUserHandler={(...args) => null}
                                              getCurrentUser={(...args) => null}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
})

test('test repo render when api is down', async () => {
    fetch.mockResponse(() => Promise.reject("API is down"))
    const wrapper = shallow(<RepositoryScreen navigation={{addListener: () => null}}
                                              setCurrentUserHandler={(...args) => null}
                                              getCurrentUser={(...args) => null}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
})

test('test repo render when api returns bad format data', async () => {
    fetch.mockResponse(() => Promise.resolve({}))
    const wrapper = shallow(<RepositoryScreen navigation={{addListener: () => null}}
                                              setCurrentUserHandler={(...args) => null}
                                              getCurrentUser={(...args) => null}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
})