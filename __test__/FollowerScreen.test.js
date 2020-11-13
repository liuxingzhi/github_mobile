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

const fakeFollowerResponse = JSON.stringify({
        "data":
            {
                "user":
                    {
                        "login":
                            "liuxingzhi",
                        "bio":
                            "CS student in UIUC, passionate programmer and Go player.",
                        "followers":
                            {
                                "nodes":
                                    [
                                        {
                                            "login": "Yefenyi",
                                            "bio": "May the force be with you!",
                                            "avatarUrl": "https://avatars1.githubusercontent.com/u/18643167?u=22fff3098c69a0b3f2a36e9fc0d993437661c143&v=4",
                                            "repositories": {
                                                "totalCount": 54
                                            }
                                        },
                                        {
                                            "login": "siyuniu",
                                            "bio": "",
                                            "avatarUrl": "https://avatars3.githubusercontent.com/u/32339155?v=4",
                                            "repositories": {
                                                "totalCount": 22
                                            }
                                        },
                                        {
                                            "login": "YaboLee",
                                            "bio": "SDE, STAT&CS, UIUC",
                                            "avatarUrl": "https://avatars1.githubusercontent.com/u/32345644?u=876bb94d24344ffed4f6ba0d9d2148811932442a&v=4",
                                            "repositories": {
                                                "totalCount": 34
                                            }
                                        }
                                    ]
                            }
                    }
            }
    })

test('test follower renders correctly', async () => {
    fetch.mockResponse(() => {
        Promise.resolve(fakeFollowerResponse)
    })
    const wrapper = shallow(<FollowerScreen navigation={{addListener: () => null}}
                                            setCurrentUserHandler={(...args) => null}
                                            getCurrentUser={(...args) => null}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})

test('test follower render when api is down', async () => {
    fetch.mockResponse(() => Promise.reject("API is down"))
    const wrapper = shallow(<FollowerScreen navigation={{addListener: () => null}}
                                            setCurrentUserHandler={(...args) => null}
                                            getCurrentUser={(...args) => null}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})

test('test follower render when api returns bad format data', async () => {
    fetch.mockResponse(() => Promise.resolve({}))
    const wrapper = shallow(<FollowerScreen navigation={{addListener: () => null}}
                                            setCurrentUserHandler={(...args) => null}
                                            getCurrentUser={(...args) => null}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})