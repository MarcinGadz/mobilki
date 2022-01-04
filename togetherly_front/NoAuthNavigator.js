import * as React from "react";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import StartScreen from "./Screens/StartScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Animated from "react-native-reanimated";

const NoAuth = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                animationEnabled: false,
                transitionConfig: () => ({
                  transitionSpec: {
                    timing: Animated.timing,
                  },
                  screenInterpolator: () => {},
                })
            }}
        >
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
};

export default NoAuth;
