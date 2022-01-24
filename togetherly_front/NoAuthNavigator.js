import * as React from "react";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";

const options = {
    ...TransitionPresets.RevealFromBottomAndroid,
};

const NoAuth = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={
                {
                    // ...TransitionPresets.
                }
            }
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={options}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={options}
            />
        </Stack.Navigator>
    );
};

export default NoAuth;
