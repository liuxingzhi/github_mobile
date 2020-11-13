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
import 'jest-fetch-mock'

const fakeUserResponse = JSON.stringify({
    "data": {
        "user": {
            "login": "liuxingzhi",
            "bio": "CS student in UIUC, passionate programmer and Go player.",
            "avatarUrl": "https://avatars2.githubusercontent.com/u/32395973?u=08c9c2f494e92a9bc3f48772fdd314901ba73e50&v=4",
            "websiteUrl": null,
            "createdAt": "2017-09-29T15:55:16Z",
            "name": "pistachio",
            "email": "",
            "repositories": {
                "totalCount": 48
            },
            "followers": {
                "totalCount": 17
            },
            "following": {
                "totalCount": 39
            }
        }
    }
})


test('test profile renders correctly', async () => {
    fetch.mockResponse(() => {
        Promise.resolve(fakeUserResponse)
    })
    const wrapper = mount(<ProfileScreen navigation={{addListener: () => null}}
                                           setCurrentUserHandler={(...args) => null}
                                           returnToPreviousUserHandler={(...args) => null}
                                           hasPreviousUser={(...args) => null}
                                           getCurrentUser={(...args) => null}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
})

test('test profile render when api is down', async () => {
    fetch.mockResponse(() => Promise.reject("API is down"))
    const wrapper = shallow(<ProfileScreen navigation={{addListener: () => null}}
                                           setCurrentUserHandler={(...args) => null}
                                           returnToPreviousUserHandler={(...args) => null}
                                           hasPreviousUser={(...args) => null}
                                           getCurrentUser={(...args) => null}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
})


test('test profile render when api returns bad format data', async () => {
    fetch.mockResponse(() => Promise.resolve({}))
    const wrapper = shallow(<ProfileScreen navigation={{addListener: () => null}}
                                           setCurrentUserHandler={(...args) => null}
                                           returnToPreviousUserHandler={(...args) => null}
                                           hasPreviousUser={(...args) => null}
                                           getCurrentUser={(...args) => null}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
})