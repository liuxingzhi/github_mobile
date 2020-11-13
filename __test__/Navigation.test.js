import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, {shallow, render, mount} from 'enzyme';
import toJson from "enzyme-to-json";
import Adapter from 'enzyme-adapter-react-16';
import {Text, View} from 'react-native';
import toJSON from 'enzyme-to-json'
import {TouchableOpacity } from "react-native";
import 'react-native';
import 'jest-enzyme';
import Profile from "../screens/Profile";
import {CustomerHeader} from "../screens/CustomerHeader"
/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target),
    });
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });

const mockNavigation = {
    navigate: jest.fn(),
    addListener: jest.fn()
};

it('test navigation buttons are properly rendered', async () => {
    jest.clearAllMocks();
    const wrapper = mount(<Profile navigation={mockNavigation}
                                               setCurrentUserHandler={(...args) => null}
                                               returnToPreviousUserHandler={(...args) => null}
                                               hasPreviousUser={(...args) => null}
                                               getCurrentUser={(...args) => null}/>);
    expect(wrapper.find('TouchableOpacity').at(0).prop('testID')).toBe('Repo')
    expect(wrapper.find('TouchableOpacity').at(1).prop('testID')).toBe('Follower')
    expect(wrapper.find('TouchableOpacity').at(2).prop('testID')).toBe('Following')
});


it('test profile navigation direct us to the correct page', async () => {
    jest.clearAllMocks();
    const wrapper = shallow(<Profile navigation={mockNavigation}
                                  setCurrentUserHandler={(...args) => null}
                                  returnToPreviousUserHandler={(...args) => null}
                                  hasPreviousUser={(...args) => null}
                                  getCurrentUser={(...args) => null}/>);

    // navigate to repo
    expect(mockNavigation.navigate.mock.calls.length).toBe(0)
    wrapper.find(TouchableOpacity).at(0).dive().simulate('press');
    expect(mockNavigation.navigate.mock.calls.length).toBe(1)

    // navigate to follower
    wrapper.find(TouchableOpacity).at(1).dive().simulate('press');
    expect(mockNavigation.navigate.mock.calls.length).toBe(2)

    // navigate to following
    wrapper.find(TouchableOpacity).at(2).dive().simulate('press');
    expect(mockNavigation.navigate.mock.calls.length).toBe(3)
});

it('test following, follower and repo has navigation header rendered' +
    'navigation header component is reused for following, follower and repo screen', async () => {
    jest.clearAllMocks();
    const wrapper = mount(<CustomerHeader navigation={mockNavigation}/>);

    expect(wrapper.find('TouchableOpacity').at(0).prop('testID')).toBe('Profile')
});

it('test following, follower and repo has navigation header and the button works as intended' +
    'navigation header component is reused for following, follower and repo screen', async () => {
    jest.clearAllMocks();
    const wrapper = shallow(<CustomerHeader navigation={mockNavigation}
                                               setCurrentUserHandler={(...args) => null}
                                               returnToPreviousUserHandler={(...args) => null}
                                               hasPreviousUser={(...args) => null}
                                               getCurrentUser={(...args) => null}/>);

    // navigate to profile
    expect(mockNavigation.navigate.mock.calls.length).toBe(0)
    wrapper.find(TouchableOpacity).at(0).dive().simulate('press');
    expect(mockNavigation.navigate.mock.calls.length).toBe(1)

    // this button should not exists
    wrapper.find(TouchableOpacity).at(1).dive().simulate('press');
    expect(mockNavigation.navigate.mock.calls.length).toBe(1)

    // navigate to profile
    wrapper.find(TouchableOpacity).at(0).dive().simulate('press');
    expect(mockNavigation.navigate.mock.calls.length).toBe(2)
});
