import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { UIContext } from "../UIContext";

const LoadingScreen = ({ navigation }) => {
    const { state, dispatch } = React.useContext(UIContext);
    let colors = state.theme;
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.mainSecondaryBackground,
            }}
        >
            <Text>Loading</Text>
        </View>
    );
};

export default LoadingScreen;
