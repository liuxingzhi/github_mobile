import {View, StyleSheet} from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import {Container} from "native-base";
import * as React from "react";

/**
 * UI component of loading theme.
 * The isloading variable will be pass as a parameter to visibility, only show up when visibility is true
 * @param visibility
 * @returns {JSX.Element}
 * @constructor
 */
export function LoadingTheme({visibility}) {
    return (
        <View>
            <AnimatedLoader
                animationStyle={styles.lottie}
                visible={visibility}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../../styles/loading-animation.json")}
                speed={1}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    }
})