import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import useToken from "../useToken";
import { UIContext } from "../UIContext";

const FeedScreen = ({ navigation }) => {
    const { token, setToken } = useToken();
    const { signOut } = React.useContext(AuthContext);
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
            <Text>This is feed</Text>
            <Button title="Log out" style="auto" onPress={() => signOut()} />
            <StatusBar style="light" />
        </View>
    );
};

export default FeedScreen;
