require('jest-fetch-mock').enableMocks()
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Overlay} from "react-native-elements"
import {CustomerHeader} from "./src/screens/CustomerHeader"
import {Card, Header, Icon, Left} from "native-base";
import {Button, Right, Container} from "native-base";


function setupTimeTravelForRNAnimated() {
    const MockDate = require('mockdate');
    const frameTime = 10;
    global.withAnimatedTimeTravelEnabled = (func) => {
        MockDate.set(0);
        jest.useFakeTimers();
        func();
        MockDate.reset();
        jest.useRealTimers();
    }
    global.requestAnimationFrame = (callback) => {
        setTimeout(callback, frameTime);
    }
    global.timeTravel = (time = frameTime) => {
        const tickTravel = () => {
            const now = Date.now();
            MockDate.set(new Date(now + frameTime));
            // Run the timers forward
            jest.advanceTimersByTime(frameTime);
        }
        // Step through each of the frames
        const frames = time / frameTime;
        for (let i = 0; i < frames; i++) {
            tickTravel();
        }
    }
}
setupTimeTravelForRNAnimated();


