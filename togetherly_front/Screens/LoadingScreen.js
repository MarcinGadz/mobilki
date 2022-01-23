import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const LoadingScreen = ({ navigation }) => {
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
