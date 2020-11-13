import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow, render, mount} from 'enzyme';
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import {githubQuery} from '../src/utils/util';
import ProfileScreen from "../src/screens/Profile";
import RepositoryScreen from "../src/screens/Repo";
import FollowerScreen from "../src/screens/Following";
import FollowingScreen from "../src/screens/Follower";
import {RepoModel} from "../src/model/RepoModel";
import {UserModel} from "../src/model/UserModel";
import ShallowWrapper from "enzyme/src/ShallowWrapper";

const fakeFollowingResponse = JSON.stringify({
    "data":
        {
            "user":
                {
                    "login":
                        "liuxingzhi",
                    "bio":
                        "CS student in UIUC, passionate programmer and Go player.",
                    "following": {
                        "nodes": [
                            {
                                "login": "yishn",
                                "bio": "(he/him) Software developer, mathematician at heart, wannabe artist, and Go player.",
                                "avatarUrl": "https://avatars2.githubusercontent.com/u/9217349?u=8f87121c9ff64d666a0c43ae34e5de6d36bd0955&v=4",
                                "repositories": {
                                    "totalCount": 48
                                }
                            },
                            {
                                "login": "minweny",
                                "bio": "",
                                "avatarUrl": "https://avatars1.githubusercontent.com/u/25225921?u=ca6e2f79a36f731a5f45853ce1f0425c26005b5f&v=4",
                                "repositories": {
                                    "totalCount": 24
                                }
                            },
                            {
                                "login": "CryoliteZ",
                                "bio": "Open source, Open mind\r\n",
                                "avatarUrl": "https://avatars0.githubusercontent.com/u/13447379?u=381b25ba3481853f08ea1160ed8f285e41b28c96&v=4",
                                "repositories": {
                                    "totalCount": 48
                                }
                            },
                            {
                                "login": "buchijiang",
                                "bio": "",
                                "avatarUrl": "https://avatars1.githubusercontent.com/u/13143897?u=262883b491ebf9566a3427e64dd341168f8ab7de&v=4",
                                "repositories": {
                                    "totalCount": 11
                                }
                            },
                            {
                                "login": "BEWINDOWEB",
                                "bio": "Machine Learning 10% +\r\nJava Web 10% +\r\nDistributed System 80%",
                                "avatarUrl": "https://avatars1.githubusercontent.com/u/6178098?u=a3bcc08dee33b91da3b4e5ef4b75763a48223e83&v=4",
                                "repositories": {
                                    "totalCount": 12
                                }
                            },
                            {
                                "login": "LukeLR",
                                "bio": "",
                                "avatarUrl": "https://avatars0.githubusercontent.com/u/3177243?u=aa20bae8d9ad8f1416a3bdbd452b7efa5da171f9&v=4",
                                "repositories": {
                                    "totalCount": 46
                                }
                            },
                        ]
                    }
                }
        }
})

test('test following renders correctly', async () => {
    fetch.mockResponse(() =>  Promise.resolve(fakeFollowingResponse))
    const wrapper = shallow(<FollowingScreen navigation={{addListener: () => null}}
                                             setCurrentUserHandler={(...args) => null}
                                             getCurrentUser={(...args) => null}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})

test('test following render when api is down', async () => {
    fetch.mockResponse(() => Promise.reject("API is down"))
    const wrapper = shallow(<FollowingScreen navigation={{addListener: () => null}}
                                             setCurrentUserHandler={(...args) => null}
                                             getCurrentUser={(...args) => null}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})

test('test following render when api returns bad format data', async () => {
    fetch.mockResponse(() => Promise.resolve({}))
    const wrapper = shallow(<FollowingScreen navigation={{addListener: () => null}}
                                             setCurrentUserHandler={(...args) => null}
                                             getCurrentUser={(...args) => null}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})