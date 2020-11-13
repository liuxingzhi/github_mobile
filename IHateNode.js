// require('jest-fetch-mock').enableMocks()
//
// import 'react-native-gesture-handler/jestSetup';

// jest.mock('react-native-reanimated', () => {
//     const Reanimated = require('react-native-reanimated/mock');
//
//     // The mock for `call` immediately calls the callback which is incorrect
//     // So we override it with a no-op
//     Reanimated.default.call = () => {};
//
//     return Reanimated;
// });

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock('react-native/Libraries/Animated/imgs/NativeAnimatedHelper');

// function setupTimeTravelForRNAnimated() {
//     const MockDate = require('mockdate');
//     const frameTime = 10;
//     global.withAnimatedTimeTravelEnabled = (func) => {
//         MockDate.set(0);
//         jest.useFakeTimers();
//         func();
//         MockDate.reset();
//         jest.useRealTimers();
//     }
//     global.requestAnimationFrame = (callback) => {
//         setTimeout(callback, frameTime);
//     }
//     global.timeTravel = (time = frameTime) => {
//         const tickTravel = () => {
//             const now = Date.now();
//             MockDate.set(new Date(now + frameTime));
//             // Run the timers forward
//             jest.advanceTimersByTime(frameTime);
//         }
//         // Step through each of the frames
//         const frames = time / frameTime;
//         for (let i = 0; i < frames; i++) {
//             tickTravel();
//         }
//     }
// }
// setupTimeTravelForRNAnimated();

// import Adapter from 'enzyme-adapter-react-16'
// import { configure } from 'enzyme'
// import jsdom from 'jsdom'
//
// function setUpDomEnvironment() {
//     const { JSDOM } = jsdom;
//     const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost/'});
//     const { window } = dom;
//
//     global.window = window;
//     global.document = window.document;
//     global.navigator = {
//         userAgent: 'node.js',
//     };
//     copyProps(window, global);
// }
//
// function copyProps(imgs, target) {
//     const props = Object.getOwnPropertyNames(imgs)
//         .filter(prop => typeof target[prop] === 'undefined')
//         .map(prop => Object.getOwnPropertyDescriptor(imgs, prop));
//     Object.defineProperties(target, props);
// }
//
// setUpDomEnvironment();
//
// configure({ adapter: new Adapter() })

import 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

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